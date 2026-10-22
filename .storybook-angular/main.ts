import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../packages/angular/src/**/*.stories.@(ts|mdx)'],
  addons: ['@storybook/addon-docs'],
  // Side nav: first entry under each component is "Overview" (the docs page), then its variants.
  docs: { defaultName: 'Overview' },
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
