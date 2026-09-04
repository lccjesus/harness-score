import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const hookPath = fileURLToPath(
  new URL("../.cursor/hooks/shell-gate.js", import.meta.url),
);

/**
 * @param {string} input
 * @returns {{ permission: string }}
 */
function runGate(input) {
  const result = spawnSync(process.execPath, [hookPath], {
    input,
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test("allows common commands", () => {
  for (const command of ["npm test", "git status", "node --version"]) {
    assert.equal(runGate(JSON.stringify({ command })).permission, "allow");
  }
});

test("denies destructive commands", () => {
  const commands = [
    "npm publish",
    "git push origin main --force",
    "git reset --hard",
    "rm -rf /",
    "rm -r ~",
    "rm -rf $HOME",
    "Remove-Item -Recurse -Force ./output",
    "Remove-Item -Recurse C:\\\\",
  ];

  for (const command of commands) {
    assert.equal(
      runGate(JSON.stringify({ command })).permission,
      "deny",
      command,
    );
  }
});

test("asks when the payload is malformed", () => {
  assert.equal(runGate("not-json").permission, "ask");
});
