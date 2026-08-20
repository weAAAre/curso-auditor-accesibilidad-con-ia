import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";
import { root, validateAudit } from "./audit-lib.mjs";

const args = process.argv.slice(2);
const outputIndex = args.indexOf("--output");
const requestedOutput = outputIndex >= 0 ? args[outputIndex + 1] : undefined;
if (outputIndex >= 0) args.splice(outputIndex, 2);
const auditDirectory = path.resolve(args[0] ?? "audits/demo");

const validation = await validateAudit(auditDirectory, [
  "scope.json",
  "inventory.json",
  "sample.json",
]);
if (validation.errors.length > 0) {
  console.error("No se puede ejecutar Axe porque el expediente no es válido:");
  for (const error of validation.errors) console.error(`- ${error}`);
  process.exit(1);
}

const scope = validation.artifacts["scope.json"];
const sample = validation.artifacts["sample.json"];
if (scope.status !== "approved" || sample.status !== "approved") {
  console.error(
    "El alcance y la selección necesitan aprobación humana antes de ejecutar Axe.",
  );
  process.exit(1);
}

const fixtureRoot = path.join(root, "fixtures", "demo-site");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = createServer(async (request, response) => {
  try {
    const requestedPath = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const relativePath = requestedPath === "/" ? "index.html" : requestedPath.slice(1);
    const file = path.resolve(fixtureRoot, relativePath);
    if (!file.startsWith(`${fixtureRoot}${path.sep}`))
      throw new Error("Ruta no permitida");
    if (!(await stat(file)).isFile()) throw new Error("No es un archivo");
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(file)] ?? "application/octet-stream",
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("No encontrado");
  }
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});

const address = server.address();
const baseUrl = `http://127.0.0.1:${address.port}`;
const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
const outputDirectory = path.resolve(
  requestedOutput ?? path.join(auditDirectory, "runs", runId),
);
const axeDirectory = path.join(outputDirectory, "axe");
await mkdir(axeDirectory, { recursive: true });

let browser;
try {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const results = [];

  for (const selected of sample.views) {
    const page = await context.newPage();
    const url = new URL(selected.path, baseUrl).href;
    await page.goto(url, { waitUntil: "networkidle" });
    for (const action of selected.actions) {
      if (action.type === "click") await page.locator(action.selector).click();
    }

    const axeResult = await new AxeBuilder({ page }).analyze();
    const fileName = `${selected.id}.json`;
    await writeFile(
      path.join(axeDirectory, fileName),
      `${JSON.stringify(axeResult, null, 2)}\n`,
    );
    results.push({
      id: selected.id,
      name: selected.name,
      path: selected.path,
      state: selected.state,
      file: `axe/${fileName}`,
      counts: {
        violations: axeResult.violations.length,
        incomplete: axeResult.incomplete.length,
        passes: axeResult.passes.length,
        inapplicable: axeResult.inapplicable.length,
      },
    });
    await page.close();
  }

  const manifest = {
    schemaVersion: 1,
    auditId: scope.auditId,
    runId,
    createdAt: new Date().toISOString(),
    tool: {
      name: results.length > 0 ? "axe-core" : "unknown",
      version:
        results.length > 0
          ? JSON.parse(
              await readFile(
                path.join(axeDirectory, results[0].file.split("/").at(-1)),
                "utf8",
              ),
            ).testEngine.version
          : "unknown",
    },
    browser: { name: "chromium", version: browser.version() },
    viewport: { width: 1280, height: 720 },
    sampleDecision: sample.decision,
    results,
  };
  await writeFile(
    path.join(outputDirectory, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log(`✓ Axe ha revisado ${results.length} vista(s) y estado(s)`);
  for (const result of results) {
    console.log(
      `  ${result.id}: ${result.counts.violations} violation(s), ${result.counts.incomplete} incomplete`,
    );
  }
  console.log(`  Evidencia: ${path.relative(root, outputDirectory)}`);
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
