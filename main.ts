// One Word From Grandma — make.fun bounty
// One original word: the single word my grandma would text about AI.
// Writes the word to /output/entry.txt (no trailing newline).

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "Nosey";

const OUTPUT_PATH = process.env.ENTRY_OUTPUT || "/output/entry.txt";

// The turn: AI knows everything about everybody — your birthday, your
// shopping, what you asked it yesterday — so of course grandma would
// call it nosey. It is the exact word she already uses for anyone who
// knows too much about her business, aimed at the machine that knows
// the most. Warm, a little baffled, one word, no explanation needed.
function validateWord(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`Word must be 1-30 characters, got ${word.length}.`);
  }

  if (/\s/.test(word)) {
    throw new Error("Word must be exactly one word (no whitespace).");
  }

  // Control characters would break the plain-text contract even without
  // whitespace, and punctuation tricks are out: one plain word only.
  if (/[\u0000-\u001f\u007f]/.test(word)) {
    throw new Error("Word must not contain control characters.");
  }

  // A grandma's one-word text is letters only — digits or symbols would
  // read as a code, not a word she would actually send.
  if (/[^A-Za-z]/.test(word)) {
    throw new Error("Word must contain letters only.");
  }

  if (word.trim().length === 0) {
    throw new Error("Word must not be only whitespace.");
  }
}

validateWord(WORD);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, WORD, "utf8");
chmodSync(OUTPUT_PATH, 0o644);

console.log(`Wrote ${WORD.length} characters to ${OUTPUT_PATH}`);
