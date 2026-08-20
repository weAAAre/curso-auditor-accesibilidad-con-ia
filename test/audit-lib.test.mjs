import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { root, validateAudit } from "../scripts/audit-lib.mjs";

test("acepta un expediente válido", async () => {
  const result = await validateAudit(path.join(root, "test/fixtures/valid-audit"), [
    "scope.json",
    "inventory.json",
    "sample.json",
  ]);
  assert.deepEqual(result.errors, []);
});

test("rechaza una selección completa etiquetada como muestra", async () => {
  const source = path.join(root, "test/fixtures/valid-audit");
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "a11y-audit-"));
  const auditDirectory = path.join(temporaryRoot, "valid-audit");
  await import("node:fs/promises").then(({ cp }) =>
    cp(source, auditDirectory, { recursive: true }),
  );

  try {
    const samplePath = path.join(auditDirectory, "sample.json");
    const sample = JSON.parse(await readFile(samplePath, "utf8"));
    sample.views[0].selection = "structured";
    await writeFile(samplePath, JSON.stringify(sample));

    const result = await validateAudit(auditDirectory, ["sample.json"]);
    assert.ok(result.errors.some((error) => error.includes("entire-product")));
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});
