import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { root, validateAudit } from "./audit-lib.mjs";

const execute = promisify(execFile);
const agentBrowserCli = path.join(
  root,
  "node_modules",
  "agent-browser",
  "bin",
  "agent-browser.js",
);

async function runAgentBrowser(args, { json = true } = {}) {
  const finalArgs = json ? [...args, "--json"] : args;
  const { stdout } = await execute(process.execPath, [agentBrowserCli, ...finalArgs], {
    cwd: root,
    maxBuffer: 10 * 1024 * 1024,
  });
  if (!json) return stdout.trim();

  const payload = JSON.parse(stdout);
  if (!payload.success) {
    throw new Error(
      payload.error?.message ?? "agent-browser no pudo completar la acción",
    );
  }
  return { payload, raw: stdout.trim() };
}

const args = process.argv.slice(2);
const outputIndex = args.indexOf("--output");
const requestedOutput = outputIndex >= 0 ? args[outputIndex + 1] : undefined;
if (outputIndex >= 0) args.splice(outputIndex, 2);
const auditDirectory = path.resolve(args[0] ?? "audits/class");

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

const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
const outputDirectory = path.resolve(
  requestedOutput ?? path.join(auditDirectory, "runs", runId),
);
const axeDirectory = path.join(outputDirectory, "axe");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const productRoot = new URL(scope.product.startUrl);
if (!["http:", "https:"].includes(productRoot.protocol)) {
  throw new Error("product.startUrl debe ser una URL pública http o https.");
}
productRoot.hash = "";
productRoot.search = "";
if (!productRoot.pathname.endsWith("/")) {
  productRoot.pathname = productRoot.pathname.replace(/[^/]+$/, "");
}

let session;
try {
  session = await runAgentBrowser(
    ["session", "id", "--scope", "worktree", "--prefix", `audit-${scope.auditId}`],
    { json: false },
  );
  const results = [];
  let userAgent = "unknown";
  let axeVersion = "unknown";

  for (const [index, selected] of sample.views.entries()) {
    const relativePath = selected.path === "/" ? "" : selected.path.replace(/^\/+/, "");
    const targetUrl = new URL(relativePath, productRoot);
    if (
      targetUrl.origin !== productRoot.origin ||
      !targetUrl.pathname.startsWith(productRoot.pathname)
    ) {
      throw new Error(
        `La vista ${selected.id} sale del producto definido en el alcance.`,
      );
    }

    await runAgentBrowser(["--session", session, "open", targetUrl.href]);
    if (index === 0) {
      await runAgentBrowser(["--session", session, "set", "viewport", "1280", "720"]);
      const browserIdentity = await runAgentBrowser([
        "--session",
        session,
        "eval",
        "navigator.userAgent",
      ]);
      userAgent = browserIdentity.payload.data.result;
    }

    for (const action of selected.actions) {
      if (action.type === "click") {
        await runAgentBrowser(["--session", session, "click", action.selector]);
      }
    }

    const audit = await runAgentBrowser(["--session", session, "a11y"]);
    await mkdir(axeDirectory, { recursive: true });
    const fileName = `${selected.id}.json`;
    await writeFile(path.join(axeDirectory, fileName), `${audit.raw}\n`);
    axeVersion = audit.payload.data.axeVersion;
    results.push({
      id: selected.id,
      name: selected.name,
      path: selected.path,
      stateId: selected.stateId,
      file: `axe/${fileName}`,
      counts: audit.payload.data.counts,
    });
  }

  const chromeVersion = userAgent.match(/(?:Headless)?Chrome\/([^ ]+)/)?.[1];
  const manifest = {
    schemaVersion: 1,
    auditId: scope.auditId,
    runId,
    createdAt: new Date().toISOString(),
    tool: {
      name: "agent-browser",
      version: packageJson.devDependencies["agent-browser"],
      auditEngine: { name: "axe-core", version: axeVersion },
    },
    browser: { name: "chromium", version: chromeVersion ?? "unknown" },
    viewport: { width: 1280, height: 720 },
    sampleDecision: sample.decision,
    results,
  };
  await writeFile(
    path.join(outputDirectory, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log(
    `✓ agent-browser y Axe han revisado ${results.length} vista(s) y estado(s)`,
  );
  for (const result of results) {
    console.log(
      `  ${result.id}: ${result.counts.violations} violation(s), ${result.counts.incomplete} incomplete`,
    );
  }
  console.log(`  Evidencia: ${path.relative(root, outputDirectory)}`);
} finally {
  if (session) {
    await runAgentBrowser(["--session", session, "close"], { json: false }).catch(
      () => undefined,
    );
  }
}
