---
description: Preserve the Meeting Cost CLI domain invariants and separation between calculation and terminal I/O.
paths:
  - "src/**"
---

# Source domain rules

- Keep `calculateMeetingCost` pure and exported from `src/meeting-cost.js`.
- Keep argument reading, numeric conversion, terminal output, and exit status in `src/cli.js`.
- Require participants to be finite, integer, and at least 1.
- Require duration in minutes to be finite and greater than zero.
- Require hourly cost to be finite and non-negative; zero is valid.
- Calculate the total as `participants * (durationMinutes / 60) * hourlyCost`.
- Preserve actionable CLI errors and a failing exit status for invalid input.
