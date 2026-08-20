import { cp, mkdir, readdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { root } from "./audit-lib.mjs";

const checkOnly = process.argv.includes("--check");
const source = path.join(root, "skills");
const targets = [
  path.join(root, ".agents", "skills"),
  path.join(root, ".claude", "skills"),
];
const skillNames = (await readdir(source, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const target of targets) {
  await mkdir(target, { recursive: true });
  for (const skillName of skillNames) {
    const sourceFile = path.join(source, skillName, "SKILL.md");
    const targetDirectory = path.join(target, skillName);
    const targetFile = path.join(targetDirectory, "SKILL.md");

    if (checkOnly) {
      let targetContents;
      try {
        targetContents = await readFile(targetFile, "utf8");
      } catch {
        throw new Error(`Falta el adaptador ${path.relative(root, targetFile)}.`);
      }
      if ((await readFile(sourceFile, "utf8")) !== targetContents) {
        throw new Error(`${path.relative(root, targetFile)} no está sincronizado.`);
      }
      continue;
    }

    await rm(targetDirectory, { recursive: true, force: true });
    await cp(path.join(source, skillName), targetDirectory, { recursive: true });
  }
}

console.log(
  checkOnly
    ? `✓ ${skillNames.length} skills sincronizadas`
    : `✓ Skills preparadas para Codex y Claude Code`,
);
