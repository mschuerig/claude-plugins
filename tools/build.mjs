#!/usr/bin/env node
// Assemble the BMad module forms from their canonical single sources.
//
// This is the single build implementation. It runs in three contexts:
//   - `make build` / `npm run build` — manual, for humans
//   - npm `prepare` lifecycle — automatically when BMad clones this repo and
//     runs `npm install` to install a custom module from a GitHub URL
//   - CI — to verify every commit assembles cleanly
//
// Dependency-free (Node core only) so it works in any install environment
// without `make` or extra packages.
//
// Single sources of truth (committed):
//   - arc42 capability + knowledge files:
//       plugins/arc42-documentation/skills/arc42-documentation/references/
//   - shared BMad install-time scripts (identical across every module):
//       bmad/_shared/scripts/
// Generated targets (git-ignored) live inside each bmad/<module>/agent-*/.

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => path.join(ROOT, ...s);

const ARC42_SKILL = 'plugins/arc42-documentation/skills/arc42-documentation';
const ARC42_BMAD = 'bmad/arc42-documentation-architect/agent-arc42-documentation-architect';
const MUSIC_BMAD = 'bmad/music-domain-expert/agent-music-domain-expert';
const SHARED_SCRIPTS = 'bmad/_shared/scripts';

function copyDir(src, dest) {
  fs.rmSync(p(dest), { recursive: true, force: true });
  fs.cpSync(p(src), p(dest), { recursive: true });
}

function distributeScripts(targetDir) {
  const destDir = p(targetDir, 'scripts');
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(p(SHARED_SCRIPTS))) {
    if (!file.endsWith('.py')) continue;
    const dest = path.join(destDir, file);
    fs.copyFileSync(p(SHARED_SCRIPTS, file), dest);
    fs.chmodSync(dest, 0o755);
  }
}

console.log('>> arc42: copying canonical references into the BMad module');
copyDir(path.join(ARC42_SKILL, 'references'), path.join(ARC42_BMAD, 'references'));

console.log('>> distributing shared BMad scripts into each module');
distributeScripts(ARC42_BMAD);
distributeScripts(MUSIC_BMAD);

console.log('>> build complete — BMad modules are assembled and installable');
