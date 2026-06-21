#!/usr/bin/env node
// Guard the two defects that broke BMad installation (see the 6.8.0 installer's
// custom-module resolver). Dependency-free; runs in CI.
//
// Defect 1: the BMad installer scans the repo-ROOT .claude-plugin/marketplace.json
//   and resolves a module by matching a single-skill plugin whose
//   skills[0]/assets/module.yaml `code` equals the BMad module code
//   (PluginResolver "Strategy 3"). Every bmad/<module> must have such a root entry.
// Defect 2: the installer's clone does NOT run `npm install`/`prepare`, so the
//   generated references/ and scripts/ must be committed (present on disk).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => path.join(ROOT, ...s);
const fail = [];

const market = JSON.parse(fs.readFileSync(p('.claude-plugin', 'marketplace.json'), 'utf8'));
const plugins = market.plugins || [];

// Discover BMad agent dirs: bmad/<module>/agent-* containing assets/module.yaml
const bmadDir = p('bmad');
for (const moduleName of fs.readdirSync(bmadDir)) {
  if (moduleName.startsWith('_') || moduleName.startsWith('.')) continue;
  const moduleDir = path.join(bmadDir, moduleName);
  if (!fs.statSync(moduleDir).isDirectory()) continue;

  const agentDir = fs.readdirSync(moduleDir).map((d) => path.join(moduleDir, d))
    .find((d) => fs.existsSync(path.join(d, 'assets', 'module.yaml')));
  if (!agentDir) { fail.push(`${moduleName}: no agent dir with assets/module.yaml`); continue; }

  const rel = path.relative(ROOT, agentDir);
  const yaml = fs.readFileSync(path.join(agentDir, 'assets', 'module.yaml'), 'utf8');
  const code = (yaml.match(/^code:\s*"?([^"\n]+?)"?\s*$/m) || [])[1];
  if (!code) { fail.push(`${rel}: module.yaml has no code`); continue; }

  // Strategy-3 prerequisite: module-help.csv beside module.yaml.
  if (!fs.existsSync(path.join(agentDir, 'assets', 'module-help.csv')))
    fail.push(`${rel}: missing assets/module-help.csv (required by resolver)`);

  // Defect 1: a root plugin whose single skill points at this agent dir.
  const norm = (s) => path.normalize(s.replace(/^\.\//, ''));
  const entry = plugins.find((pl) => Array.isArray(pl.skills)
    && pl.skills.length === 1 && norm(pl.skills[0]) === norm(rel));
  if (!entry) fail.push(`${rel}: no root marketplace plugin with skills:["./${rel}"] — module code '${code}' will not resolve ("source not available")`);

  // Defect 2: generated artifacts committed/present.
  if (!fs.existsSync(path.join(agentDir, 'scripts', 'merge-config.py')))
    fail.push(`${rel}: missing scripts/ (generated; must be committed)`);
  if (moduleName.includes('arc42') && !fs.existsSync(path.join(agentDir, 'references', 'arc42-philosophy.md')))
    fail.push(`${rel}: missing references/ (generated; must be committed)`);

  if (entry && !fail.some((f) => f.startsWith(rel)))
    console.log(`✓ ${moduleName} → code '${code}' resolvable via root plugin '${entry.name}'`);
}

if (fail.length) {
  console.error('\nBMad marketplace check FAILED:');
  for (const f of fail) console.error('  ✗ ' + f);
  process.exit(1);
}
console.log('\nBMad marketplace check passed ✓');
