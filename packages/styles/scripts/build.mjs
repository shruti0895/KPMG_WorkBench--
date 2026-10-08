/**
 * Aggregates the design system's CSS into framework-agnostic bundles.
 *
 *   dist/tokens.css      — the design-token custom properties
 *   dist/components.css  — every component stylesheet, concatenated
 *   dist/index.css       — tokens + components (single import)
 *
 * Component `.css` files stay co-located with the React components in
 * packages/ui/src/components/<Name>/<Name>.css (their single source of truth).
 * This package collects them so non-React consumers — e.g.
 * @designkpmg/angular — get byte-identical styling.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..', '..', '..');
const distDir = resolve(here, '..', 'dist');

const tokensCssPath = join(repoRoot, 'packages/tokens/dist/tokens.css');
const componentsDir = join(repoRoot, 'packages/ui/src/components');

if (!existsSync(tokensCssPath)) {
  throw new Error('packages/tokens/dist/tokens.css not found — run `npm run build:tokens` first.');
}

mkdirSync(distDir, { recursive: true });

const tokensCss = readFileSync(tokensCssPath, 'utf8');

const componentFiles = readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    readdirSync(join(componentsDir, d.name))
      .filter((f) => f.endsWith('.css'))
      .map((f) => ({ dir: d.name, file: f })),
  )
  .sort((a, b) => `${a.dir}/${a.file}`.localeCompare(`${b.dir}/${b.file}`));

const componentsCss = componentFiles
  .map(({ dir, file }) => `/* ${dir}/${file} */\n${readFileSync(join(componentsDir, dir, file), 'utf8').trim()}\n`)
  .join('\n');

// Tokens carry a Google Fonts @import, which must precede every other rule.
const banner = '/* @designkpmg/styles — generated, do not edit. Source: per-component CSS files under packages/ui/src/components. */\n\n';

writeFileSync(join(distDir, 'tokens.css'), tokensCss);
writeFileSync(join(distDir, 'components.css'), banner + componentsCss);
writeFileSync(join(distDir, 'index.css'), banner + tokensCss + '\n' + componentsCss);

console.log(`@designkpmg/styles: bundled tokens + ${componentFiles.length} component stylesheets → dist/`);
