---
name: add-calculation-case
description: Use when adding or changing a Meeting Cost CLI calculation rule and verifying its boundary behavior.
---

# Add or change a calculation rule

1. Read `src/meeting-cost.js` and `src/cli.js` before editing.
2. State the rule in terms of accepted values, rejected values, and the expected calculation result.
3. Identify boundary cases for finiteness, numeric range, and integer requirements where applicable.
4. Change the pure domain function in `src/meeting-cost.js`; keep process and terminal effects out of it.
5. Change `src/cli.js` only when argument parsing, user-facing output, or error handling must change.
6. Preserve ESM imports with `.js` extensions and use only native Node.js resources.
7. Verify a representative valid case with the existing `npm start -- <participantes> <minutos> <custo-por-hora>` command.
8. Verify relevant boundary and invalid cases with the same command, checking the message and failing exit status.
9. Confirm that valid output remains clear and invalid output remains actionable.

Do not invent test, lint, typecheck, or build commands. If those scripts do not exist in `package.json`, report their checks as pending.
