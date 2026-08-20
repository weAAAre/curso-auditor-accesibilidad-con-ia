import { validateAudit } from "./audit-lib.mjs";

const directory = process.argv[2] ?? "audits/class";
const result = await validateAudit(directory);

if (Object.keys(result.artifacts).length === 0) {
  console.error("Todavía no hay documentos de auditoría que validar.");
  process.exitCode = 1;
} else if (result.errors.length > 0) {
  console.error("La auditoría necesita atención:");
  for (const error of result.errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `✓ ${Object.keys(result.artifacts).length} documento(s) válidos en ${result.directory}`,
  );
}
