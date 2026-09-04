import assert from "node:assert/strict";
import { test } from "node:test";

import { calculateMeetingCost } from "../src/meeting-cost.js";

test("calculates a valid meeting cost", () => {
  assert.equal(calculateMeetingCost(5, 60, 100), 500);
});

test("supports rounding the result to two decimal places", () => {
  assert.equal(calculateMeetingCost(1, 10, 100).toFixed(2), "16.67");
});

test("rejects fewer than one participant", () => {
  assert.throws(() => calculateMeetingCost(0, 60, 100), RangeError);
});

test("rejects a fractional participant count", () => {
  assert.throws(() => calculateMeetingCost(1.5, 60, 100), RangeError);
});

test("rejects non-positive duration", () => {
  assert.throws(() => calculateMeetingCost(1, 0, 100), RangeError);
});

test("rejects negative hourly cost", () => {
  assert.throws(() => calculateMeetingCost(1, 60, -1), RangeError);
});

test("rejects non-finite participants", () => {
  assert.throws(() => calculateMeetingCost(Number.NaN, 60, 100), TypeError);
});

test("rejects non-finite duration", () => {
  assert.throws(
    () => calculateMeetingCost(1, Number.POSITIVE_INFINITY, 100),
    TypeError,
  );
});

test("rejects non-finite hourly cost", () => {
  assert.throws(() => calculateMeetingCost(1, 60, Number.NaN), TypeError);
});
