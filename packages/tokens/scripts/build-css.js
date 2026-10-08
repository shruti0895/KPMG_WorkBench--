/**
 * Builds packages/tokens/dist/tokens.css from the source token sheet.
 * WorkBench tokens are authored directly as CSS custom properties
 * (extracted from Figma), so this step validates and copies them to dist/.
 */
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, '../src/tokens.css');
const distDir = resolve(here, '../dist');

if (!/:root\s*{/.test(readFileSync(src, 'utf8'))) {
  throw new Error('packages/tokens/src/tokens.css has no :root block');
}

mkdirSync(distDir, { recursive: true });
copyFileSync(src, resolve(distDir, 'tokens.css'));
console.log('@designkpmg/tokens: tokens.css → dist/');
