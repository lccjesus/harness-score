# Verify the Meeting Cost CLI

Run this workflow when verification is explicitly requested after a repository change.

1. Run the complete local verification with `npm run check`.
2. Run `npm run format` only when formatting changes are requested or need to be applied.
3. Run a valid manual example with `npm start -- 5 60 100` when CLI behavior changes.
4. Inspect the changed files and confirm that no unrelated file was modified.

Use only scripts declared in `package.json`; do not invent additional verification commands.
