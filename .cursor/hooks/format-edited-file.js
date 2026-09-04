import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const supportedExtensions = new Set([
  ".js",
  ".mjs",
  ".cjs",
  ".jsx",
  ".json",
  ".jsonc",
]);

let input = "";
process.stdin.setEncoding("utf8");

for await (const chunk of process.stdin) {
  input += chunk;
}

try {
  const payload = JSON.parse(input);
  if (
    typeof payload !== "object" ||
    payload === null ||
    typeof payload.file_path !== "string"
  ) {
    throw new TypeError("Expected a file_path string.");
  }

  const repositoryRoot = path.resolve(process.cwd());
  const filePath = path.resolve(payload.file_path);
  const relativePath = path.relative(repositoryRoot, filePath);
  const isLocal =
    relativePath !== "" &&
    relativePath !== ".." &&
    !relativePath.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relativePath);

  if (
    isLocal &&
    supportedExtensions.has(path.extname(filePath).toLowerCase())
  ) {
    const biomeCli = path.join(
      repositoryRoot,
      "node_modules",
      "@biomejs",
      "biome",
      "bin",
      "biome",
    );
    const result = spawnSync(
      process.execPath,
      [biomeCli, "format", "--write", filePath],
      { cwd: repositoryRoot, encoding: "utf8" },
    );

    if (result.status !== 0) {
      process.stderr.write(
        "Biome formatting guidance failed; rely on npm run check and CI.\n",
      );
    }
  }
} catch {
  process.stderr.write(
    "File-edit formatting guidance skipped because the payload was invalid.\n",
  );
}

process.stdout.write("{}\n");
