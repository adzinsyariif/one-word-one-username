// One Word, One Username, One Reward — entry program.
//
// The bounty asks for exactly one thing: the entrant's own make.fun
// username, sent as a single word and nothing else. There is no pitch to
// write, no link to attach and no explanation to add — the handle itself
// is the whole entry, and the judge reads it exactly as it is written.
//
// This program therefore does one small, careful job: it takes the
// entrant's handle, checks it against every rule the gate publishes
// (UTF-8 text, 1 to 30 characters, not only white space, a single word
// with no spaces and no padding), and writes it — byte for byte, with no
// trailing newline and nothing else — to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entrant's own make.fun handle. One word, twelve characters.
const HANDLE = "adzinsyariif";

// Where the grader expects the entry. A local run may point somewhere
// else with ENTRY_OUTPUT, but the default is the path the rules name.
const OUTPUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

// The gate's published limits: 1 to 30 characters, not only white space.
const MIN_LENGTH = 1;
const MAX_LENGTH = 30;

/**
 * Check the handle against the gate's published rules and return it
 * unchanged when it passes. Anything that fails is a build-time error:
 * an invalid entry never reaches the judge, so we refuse to write one.
 */
function validateHandle(handle: string): string {
  if (handle.length < MIN_LENGTH || handle.length > MAX_LENGTH) {
    throw new Error(
      `handle must be ${MIN_LENGTH} to ${MAX_LENGTH} characters, got ${handle.length}`,
    );
  }
  if (handle.trim().length === 0) {
    throw new Error("handle must not be only white space");
  }
  if (/\s/.test(handle)) {
    throw new Error("handle must be a single word with no spaces");
  }
  if (handle !== handle.trim()) {
    throw new Error("handle must carry no leading or trailing padding");
  }
  // The gate reads the file as UTF-8 text, so prove the word survives a
  // UTF-8 round trip unchanged before anything is written.
  const roundTripped = new TextDecoder("utf-8", { fatal: true }).decode(
    new TextEncoder().encode(handle),
  );
  if (roundTripped !== handle) {
    throw new Error("handle is not clean UTF-8 text");
  }
  return handle;
}

function main(): void {
  const entry = validateHandle(HANDLE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: the file holds the word and nothing else, so
  // its byte count is the word's byte count and the judge reads the
  // handle exactly as the entrant wears it.
  writeFileSync(OUTPUT_PATH, entry, "utf8");
  // Read the file back and prove it holds exactly the validated word.
  // A write that silently landed wrong would hand the judge a different
  // text, so the program refuses to report success until the bytes on
  // disk match the entry it meant to write.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== entry) {
    throw new Error(
      `read-back mismatch: wrote ${JSON.stringify(entry)} but disk holds ${JSON.stringify(written)}`,
    );
  }
  console.log(
    `wrote ${entry.length} characters (${new TextEncoder().encode(entry).length} bytes) to ${OUTPUT_PATH}`,
  );
}

main();
