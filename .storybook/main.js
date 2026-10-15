

// TEMPORARY: only these components are shown in Storybook for now (revert this
// commit to show all). Folder names under packages/ui/src/components.
const VISIBLE_COMPONENTS = [
  'AppBars', 'Badge', 'Banner', 'Button', 'Cards', 'Checkbox', 'Chip',
  'DataTable', 'Menu', 'Modal', 'Tab', 'Textarea', 'Tooltip',
];

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../packages/ui/src/**/*.mdx",
    "../apps/react/src/**/*.mdx",
    ...VISIBLE_COMPONENTS.map(
      (name) => `../packages/ui/src/components/${name}/*.stories.@(js|jsx|mjs|ts|tsx)`,
    ),
    "../apps/react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite"
};
export default config;