import { lstat, mkdir, readlink, rm, symlink } from "node:fs/promises";
import path from "node:path";
import { root } from "./audit-lib.mjs";

const checkOnly = process.argv.includes("--check");
const source = path.join(root, "skills");
const targets = [
  path.join(root, ".agents", "skills"),
  path.join(root, ".claude", "skills"),
];

for (const target of targets) {
  const relativeSource = path.relative(path.dirname(target), source);
  if (checkOnly) {
    try {
      const metadata = await lstat(target);
      const destination = metadata.isSymbolicLink() ? await readlink(target) : undefined;
      if (!metadata.isSymbolicLink() || destination !== relativeSource) {
        throw new Error("no apunta al directorio canónico");
      }
    } catch (error) {
      throw new Error(
        `${path.relative(root, target)} no está preparado (${error.message}). Ejecuta pnpm setup fuera del agente.`,
      );
    }
    continue;
  }

  await mkdir(path.dirname(target), { recursive: true });
  await rm(target, { recursive: true, force: true });
  await symlink(
    process.platform === "win32" ? source : relativeSource,
    target,
    process.platform === "win32" ? "junction" : "dir",
  );
}

console.log(
  checkOnly
    ? "✓ Skills enlazadas desde ambos agentes"
    : `✓ Skills preparadas para Codex y Claude Code`,
);
