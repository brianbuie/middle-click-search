import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

import pkg from './package.json' with { type: 'json' };
import manifest from './public/manifest.json' with { type: 'json' };

const next = parseInt(pkg.version, 10) + 1;
const tag = `v${next}`;

console.log(`Releasing ${tag}...`);

pkg.version = String(next);
writeFileSync('package.json', JSON.stringify(pkg, null, 2));

manifest.version = String(next);
writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 2));

const run = (cmd: string) => execSync(cmd, { stdio: 'inherit' });
run('git add package.json public/manifest.json');
run(`git commit -m "Release ${tag}"`);
run(`git tag ${tag}`);
run('git push --follow-tags');

console.log(`Done. Tag ${tag} pushed.`);
