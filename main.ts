// bounty-entrants-02 entry program (Node 22, standard library only).
//
// The entry itself is the set of make.fun bounties named in BOUNTY.json:
// the house counts their paying entrants in its own database. This program
// has exactly one job — hand BOUNTY.json to the grader unchanged. It reads
// the file from the repository root, validates its shape, and writes the
// original bytes to the output directory. It never touches the network,
// never reads a clock, and writes the same bytes on every run.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function fail(message) {
  console.error(`bounty-entrants entry: ${message}`);
  process.exit(1);
}

let raw;
try {
  raw = readFileSync(join(botDir, 'BOUNTY.json'));
} catch (err) {
  fail(`cannot read BOUNTY.json in ${botDir}: ${err.message}`);
}

// The gate caps BOUNTY.json at 16384 bytes; refuse early with a clear word
// instead of handing the grader a file it would reject on size alone.
if (raw.length > 16384) {
  fail(`BOUNTY.json is ${raw.length} bytes, over the 16384-byte cap`);
}

let parsed;
try {
  parsed = JSON.parse(raw.toString('utf8'));
} catch (err) {
  fail(`BOUNTY.json is not valid JSON: ${err.message}`);
}

if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
  fail('BOUNTY.json must be a JSON object');
}
if ('url' in parsed && 'bounties' in parsed) {
  fail('BOUNTY.json must name either "bounties" or "url", not both');
}

const list = parsed.bounties;
if (!Array.isArray(list) || list.length < 1 || list.length > 100) {
  fail('BOUNTY.json must list between 1 and 100 bounties');
}
for (const item of list) {
  if (typeof item !== 'string' || item.length === 0 || item.length > 2048) {
    fail('every bounty entry must be a non-empty string of at most 2048 characters');
  }
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'BOUNTY.json'), raw);
