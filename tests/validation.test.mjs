import test from "node:test";
import assert from "node:assert/strict";
import { validateVideo } from "../lib/validation.ts";
const limit = 500 * 1024 * 1024;
const file = { name: "clip.mp4", type: "video/mp4", size: 1024 };
test("accepts supported video formats and case-insensitive extensions", () => {
  for (const [name, type] of [
    ["clip.MP4", "video/mp4"],
    ["clip.mov", "video/quicktime"],
    ["clip.webm", "video/webm"],
    ["clip.mov", ""],
  ])
    assert.equal(validateVideo({ ...file, name, type }, limit), "");
});
test("rejects unsupported extension or MIME type", () => {
  assert.notEqual(validateVideo({ ...file, name: "clip.exe" }, limit), "");
  assert.notEqual(
    validateVideo({ ...file, type: "application/pdf" }, limit),
    "",
  );
});
test("enforces empty file and upper size boundary", () => {
  assert.notEqual(validateVideo({ ...file, size: 0 }, limit), "");
  assert.equal(validateVideo({ ...file, size: limit }, limit), "");
  assert.notEqual(validateVideo({ ...file, size: limit + 1 }, limit), "");
});
