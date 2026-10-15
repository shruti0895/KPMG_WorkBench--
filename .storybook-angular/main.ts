import type { StorybookConfig } from '@storybook/angular';

// TEMPORARY: only these components are shown in Storybook for now (revert this
// commit to show all). Folder names under packages/angular/src/lib.
const VISIBLE_COMPONENTS = [
  'app-bars', 'badge', 'banner', 'button', 'cards', 'checkbox', 'chip',
  'data-table', 'menu', 'modal', 'tab', 'textarea', 'tooltip',
];

const config: StorybookConfig = {
  stories: VISIBLE_COMPONENTS.map((name) => `../packages/angular/src/lib/${name}/*.stories.@(ts|mdx)`),
  addons: ['@storybook/addon-docs'],
  // Serves packages/styles/dist/* at the Storybook server root (e.g. /index.css).
  // The Angular webpack builder doesn't run the app-style CSS pipeline, so the
  // global stylesheet is linked at runtime (see preview.ts) instead of imported.
  staticDirs: ['../packages/styles/dist'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
