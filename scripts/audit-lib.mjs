import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const artifactSchemas = {
  "scope.json": "scope.schema.json",
  "inventory.json": "inventory.schema.json",
  "sample.json": "sample.schema.json",
  "coverage.json": "coverage.schema.json",
  "findings.json": "findings.schema.json",
};

export async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function exists(file) {
  try {
    await readFile(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

export async function validateAudit(auditDirectory, required = []) {
  const directory = path.resolve(auditDirectory);
  const errors = [];
  const artifacts = {};
  const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false });

  for (const [artifactName, schemaName] of Object.entries(artifactSchemas)) {
    const artifactPath = path.join(directory, artifactName);
    if (!(await exists(artifactPath))) {
      if (required.includes(artifactName)) errors.push(`Falta ${artifactName}.`);
      continue;
    }

    try {
      const [artifact, schema] = await Promise.all([
        readJson(artifactPath),
        readJson(path.join(root, "schemas", schemaName)),
      ]);
      artifacts[artifactName] = artifact;
      const validate = ajv.compile(schema);
      if (!validate(artifact)) {
        for (const problem of validate.errors ?? []) {
          errors.push(`${artifactName}${problem.instancePath}: ${problem.message}`);
        }
      }
    } catch (error) {
      errors.push(`${artifactName}: ${error.message}`);
    }
  }

  const auditId = path.basename(directory);
  for (const [name, artifact] of Object.entries(artifacts)) {
    if (artifact.auditId !== auditId) {
      errors.push(`${name}: auditId debe ser "${auditId}".`);
    }
  }

  const inventory = artifacts["inventory.json"];
  if (inventory) {
    const viewIds = new Set();
    const statesByView = new Map();
    for (const view of inventory.views ?? []) {
      if (viewIds.has(view.id))
        errors.push(`inventory.json: vista duplicada ${view.id}.`);
      viewIds.add(view.id);
      const states = new Set();
      for (const state of view.states ?? []) {
        if (states.has(state.id)) {
          errors.push(`inventory.json: estado duplicado ${view.id}/${state.id}.`);
        }
        states.add(state.id);
      }
      statesByView.set(view.id, states);
    }

    for (const process of inventory.processes ?? []) {
      for (const step of process.steps ?? []) {
        if (!statesByView.get(step.viewId)?.has(step.stateId)) {
          errors.push(
            `inventory.json: el proceso ${process.id} referencia ${step.viewId}/${step.stateId}, que no existe.`,
          );
        }
      }
    }
  }

  const sample = artifacts["sample.json"];
  if (sample) {
    const ids = new Set();
    for (const selected of sample.views ?? []) {
      if (ids.has(selected.id))
        errors.push(`sample.json: selección duplicada ${selected.id}.`);
      ids.add(selected.id);
      const inventoryView = inventory?.views?.find((view) => view.id === selected.viewId);
      if (inventory && !inventoryView) {
        errors.push(`sample.json: ${selected.viewId} no aparece en el mapa.`);
      } else if (
        inventoryView &&
        !inventoryView.states.some((state) => state.id === selected.stateId)
      ) {
        errors.push(
          `sample.json: el estado ${selected.viewId}/${selected.stateId} no aparece en el mapa.`,
        );
      }
    }

    if (
      sample.decision === "entire-product" &&
      sample.views?.some((view) => view.selection !== "entire-product")
    ) {
      errors.push(
        'sample.json: una revisión completa debe usar selection "entire-product".',
      );
    }

    if (sample.decision === "representative-sample") {
      const structured = sample.views?.filter(
        (view) => view.selection === "structured",
      ).length;
      const random = sample.views?.filter((view) => view.selection === "random").length;
      if (!structured) errors.push("sample.json: falta la selección estructurada.");
      if (random < Math.ceil(structured * 0.1)) {
        errors.push(
          "sample.json: la selección aleatoria debe ser al menos el 10% de la estructurada.",
        );
      }
    }
  }

  const coverage = artifacts["coverage.json"];
  if (coverage) {
    const criterionIds = new Set();
    for (const criterion of coverage.criteria ?? []) {
      if (criterionIds.has(criterion.id)) {
        errors.push(`coverage.json: criterio duplicado ${criterion.id}.`);
      }
      criterionIds.add(criterion.id);
    }
  }

  const findings = artifacts["findings.json"];
  if (findings) {
    const findingIds = new Set();
    for (const finding of findings.findings ?? []) {
      if (findingIds.has(finding.id)) {
        errors.push(`findings.json: hallazgo duplicado ${finding.id}.`);
      }
      findingIds.add(finding.id);

      const coveredCriterion = coverage?.criteria?.find(
        (criterion) => criterion.id === finding.criterion,
      );
      if (coverage && !coveredCriterion) {
        errors.push(
          `findings.json: el criterio ${finding.criterion} no aparece en coverage.json.`,
        );
      }
      if (finding.status === "confirmed" && coveredCriterion?.outcome !== "failed") {
        errors.push(
          `findings.json: el hallazgo confirmado ${finding.id} necesita resultado failed en coverage.json.`,
        );
      }
    }
  }

  return { directory, artifacts, errors };
}

export async function findMatchingSkills(requiredTerms) {
  const skillsDirectory = path.join(root, "skills");
  const matches = [];
  for (const entry of await readdir(skillsDirectory, { withFileTypes: true })) {
    if (
      !entry.isDirectory() ||
      ["skill-maker", "retrospective-docs"].includes(entry.name)
    ) {
      continue;
    }
    const skillPath = path.join(skillsDirectory, entry.name, "SKILL.md");
    if (!(await exists(skillPath))) continue;
    const contents = (await readFile(skillPath, "utf8")).toLowerCase();
    if (requiredTerms.every((term) => contents.includes(term.toLowerCase()))) {
      matches.push(entry.name);
    }
  }
  return matches;
}

export { root };
