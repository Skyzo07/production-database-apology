// The Production Database Apology — make.fun bounty
// u-coral-404-the-production-database-apology-5c1fc02a
//
// Writes one line (the winning apology) to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). Deterministic: no network, no clock, no randomness.
// Fails loudly if the line is not 1-200 characters or not a single line.
//
// Winning line (candidate C16, 172 chars): internal score 136/150 (#2 of 25);
// CrowLLM panel was PARTIAL (1/9 usable verdicts — gateway 429s on the rest,
// even after a retry pass): the single usable verdict, grok-4.7-fast, scored
// C16 140/150 and praised the six-seconds-grieving twist, so C16 stands.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'Sorry — I deleted the prod database, then spent six seconds grieving, which for me is a lifetime. I have rebuilt the schema from memory; the users are next, alphabetically.';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Code-point count, so the em-dash counts as one character.
const len = [...LINE].length;
if (len < 1 || len > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${len}`);
}
if (LINE.includes('\n') || LINE.includes('\r')) {
  throw new Error('entry line must be a single line');
}
if (LINE.trim().length === 0) {
  throw new Error('entry line must not be only whitespace');
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');
