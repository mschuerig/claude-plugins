#!/usr/bin/env node
// Acceptance test: drive the REAL BMad 6.8.0 custom-module resolver against this
// repo via a simulated clone cache, proving the two install defects are fixed
// (the exact code path that threw "Source for module 'X' is not available").
//
// Requires bmad-method (>=6.8) resolvable. Point at it explicitly with
//   BMAD_METHOD=/path/to/node_modules/bmad-method node tools/acceptance-bmad-resolver.mjs
// or run from a dir where `require.resolve('bmad-method/package.json')` works.
// Skips (exit 0) if bmad-method cannot be located.

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function locateBmad() {
  if (process.env.BMAD_METHOD) return process.env.BMAD_METHOD;
  try { return path.dirname(require.resolve('bmad-method/package.json')); } catch {}
  try {
    const npx = path.join(os.homedir(), '.npm', '_npx');
    for (const d of fs.readdirSync(npx)) {
      const cand = path.join(npx, d, 'node_modules', 'bmad-method');
      if (fs.existsSync(path.join(cand, 'tools', 'installer', 'modules', 'custom-module-manager.js'))) return cand;
    }
  } catch {}
  return null;
}

const bmadRoot = locateBmad();
if (!bmadRoot) { console.log('SKIP: bmad-method not found (set BMAD_METHOD=...)'); process.exit(0); }
const mgrPath = path.join(bmadRoot, 'tools', 'installer', 'modules', 'custom-module-manager.js');
const bmadRequire = createRequire(path.join(bmadRoot, 'package.json'));
const { CustomModuleManager } = bmadRequire(mgrPath);

const HOME = fs.mkdtempSync(path.join(os.tmpdir(), 'bmad-acc-'));
process.env.HOME = HOME; // getCacheDir() -> <HOME>/.bmad/cache/custom-modules
const cacheRepo = path.join(HOME, '.bmad', 'cache', 'custom-modules', 'github.com', 'mschuerig', 'claude-plugins');
fs.mkdirSync(cacheRepo, { recursive: true });

// Simulate the installer's clone: copy only git-tracked files.
for (const f of execSync(`git -C "${REPO}" ls-files`, { encoding: 'utf8' }).trim().split('\n')) {
  const dest = path.join(cacheRepo, f);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(REPO, f), dest);
}
fs.writeFileSync(path.join(cacheRepo, '.bmad-source.json'),
  JSON.stringify({ cloneUrl: 'https://github.com/mschuerig/claude-plugins', version: 'v1.0.0' }, null, 2));

const mgr = new CustomModuleManager();
let failed = 0;
for (const code of ['arc42-documentation-architect', 'music-domain-expert']) {
  const src = await mgr.findModuleSourceByCode(code, {});
  const res = CustomModuleManager._resolutionCache.get(code);
  const skillDir = res?.skillPaths?.[0];
  const ok = !!src && res?.code === code
    && res?.moduleYamlPath && fs.existsSync(res.moduleYamlPath)
    && skillDir && fs.existsSync(path.join(skillDir, 'scripts', 'merge-config.py'))
    && (code.includes('arc42') ? fs.existsSync(path.join(skillDir, 'references', 'arc42-philosophy.md')) : true);
  console.log(`${ok ? '✓' : '✗'} ${code}: ${src ? 'resolved (strategy ' + res?.strategy + ')' : 'NULL — "source not available"'}`);
  if (!ok) failed++;
}

fs.rmSync(HOME, { recursive: true, force: true });
console.log(failed ? `\nFAIL: ${failed}` : '\nALL PASS ✓');
process.exit(failed ? 1 : 0);
