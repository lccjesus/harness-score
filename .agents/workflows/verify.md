# Verify the Meeting Cost CLI

Run this workflow when verification is explicitly requested after a repository change.

1. Read `package.json` and run only scripts declared there.
2. Run a valid example with `npm start -- 5 60 100`.
3. Confirm that the command succeeds and prints `Custo total da reunião: 500.00`.
4. When source behavior changed, run relevant invalid or boundary inputs through the same `npm start --` script and confirm an actionable error and a nonzero exit status.
5. Inspect the changed files and confirm that no unrelated file was modified.

## Pending sensors

- Tests are pending because no test script or test configuration exists.
- Lint is pending because no lint script or linter configuration exists.
- Typecheck is pending because no typecheck script or typecheck configuration exists.
- Do not invent commands for pending sensors.
