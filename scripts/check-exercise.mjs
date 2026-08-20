import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { findMatchingSkills, validateAudit } from "./audit-lib.mjs";

const exercise = Number(process.argv[2]);
const directory = process.argv[3] ?? "audits/class";
const configuration = {
  1: { files: ["scope.json"], terms: ["scope.json"] },
  2: {
    files: ["scope.json", "inventory.json", "sample.json"],
    terms: ["inventory.json", "sample.json"],
  },
  3: { files: ["scope.json", "inventory.json", "sample.json"], terms: ["audit:axe"] },
}[exercise];

if (!configuration) {
  console.error("El ejercicio debe ser 1, 2 o 3.");
  process.exit(1);
}

const result = await validateAudit(directory, configuration.files);
const errors = [...result.errors];
const skills = await findMatchingSkills(configuration.terms);
if (skills.length === 0) {
  errors.push(
    `No encuentro una skill del alumnado que mencione ${configuration.terms.join(" y ")}.`,
  );
}

if (exercise >= 2 && result.artifacts["scope.json"]?.status !== "approved") {
  errors.push("La ficha de alcance necesita aprobación humana antes del ejercicio 2.");
}
if (exercise === 3 && result.artifacts["sample.json"]?.status !== "approved") {
  errors.push("La selección necesita aprobación humana antes de ejecutar Axe.");
}

if (exercise === 3 && errors.length === 0) {
  const runsDirectory = path.resolve(directory, "runs");
  let runs = [];
  try {
    runs = (await readdir(runsDirectory, { withFileTypes: true })).filter((entry) =>
      entry.isDirectory(),
    );
  } catch {
    errors.push("No encuentro ninguna ejecución de Axe.");
  }

  if (runs.length > 0) {
    const latest = runs
      .map((entry) => entry.name)
      .sort()
      .at(-1);
    try {
      const manifest = JSON.parse(
        await readFile(path.join(runsDirectory, latest, "manifest.json"), "utf8"),
      );
      const expected = result.artifacts["sample.json"].views.length;
      if (manifest.results?.length !== expected) {
        errors.push(
          `La última ejecución contiene ${manifest.results?.length ?? 0} resultados; se esperaban ${expected}.`,
        );
      }
    } catch (error) {
      errors.push(`No puedo leer el manifiesto de la última ejecución: ${error.message}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`El ejercicio ${exercise} todavía necesita atención:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`✓ Ejercicio ${exercise} preparado para la puesta en común`);
  console.log(`  Skill encontrada: ${skills.join(", ")}`);
}
