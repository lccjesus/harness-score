import process from "node:process";

const deniedCommands = [
  {
    pattern: /(?:^|[;&|]\s*)npm(?:\.cmd)?\s+publish(?:\s|$)/i,
    reason: "Publishing packages is not allowed.",
  },
  {
    pattern:
      /(?:^|[;&|]\s*)git\s+push\b[^\r\n;&|]*(?:--force(?:-with-lease)?|-f(?:\s|$))/i,
    reason: "Force-pushing is not allowed.",
  },
  {
    pattern: /(?:^|[;&|]\s*)git\s+reset\s+--hard(?:\s|$)/i,
    reason: "Destructive Git resets are not allowed.",
  },
];

const rootOrHome =
  /(?:^|\s)(?:\/(?:["']?)(?=\s|$)|~(?:[\\/"']|\s|$)|\$HOME(?:[\\/"']|\s|$)|\$\{HOME\}(?:[\\/"']|\s|$)|%USERPROFILE%(?:[\\/"']|\s|$)|\$env:USERPROFILE(?:[\\/"']|\s|$)|[a-z]:[\\/]+(?:["']?)(?=\s|$))/i;

/**
 * @param {string} command
 * @returns {{ permission: "allow" | "deny", user_message?: string, agent_message?: string }}
 */
function decide(command) {
  for (const denied of deniedCommands) {
    if (denied.pattern.test(command)) {
      return {
        permission: "deny",
        user_message: denied.reason,
        agent_message: denied.reason,
      };
    }
  }

  const shellRemoval =
    /(?:^|[;&|]\s*)rm\s+(?=[^;&|\r\n]*(?:-[a-z]*r|--recursive))[^;&|\r\n]*/i.exec(
      command,
    );
  if (shellRemoval && rootOrHome.test(shellRemoval[0])) {
    return {
      permission: "deny",
      user_message:
        "Recursive removal of a filesystem root or home is not allowed.",
      agent_message:
        "Recursive removal of a filesystem root or home is not allowed.",
    };
  }

  const powershellRemoval = /(?:^|[;&|]\s*)Remove-Item\b[^;&|\r\n]*/i.exec(
    command,
  );
  if (
    powershellRemoval &&
    ((/-Recurse\b/i.test(powershellRemoval[0]) &&
      /-Force\b/i.test(powershellRemoval[0])) ||
      (/-Recurse\b/i.test(powershellRemoval[0]) &&
        rootOrHome.test(powershellRemoval[0])))
  ) {
    return {
      permission: "deny",
      user_message: "Destructive PowerShell Remove-Item usage is not allowed.",
      agent_message: "Destructive PowerShell Remove-Item usage is not allowed.",
    };
  }

  return { permission: "allow" };
}

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
    typeof payload.command !== "string"
  ) {
    throw new TypeError("Expected a command string.");
  }
  process.stdout.write(`${JSON.stringify(decide(payload.command))}\n`);
} catch {
  process.stdout.write(
    `${JSON.stringify({
      permission: "ask",
      user_message: "The shell hook payload could not be interpreted.",
      agent_message:
        "Ask the user because the shell hook payload was malformed.",
    })}\n`,
  );
}
