

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../packages/ui/src/**/*.mdx",
    "../apps/react/src/**/*.mdx",
    "../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../apps/react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  // Side nav: first entry under each component is "Overview" (the docs page), then its variants.
  "docs": { "defaultName": "Overview" },
  "framework": "@storybook/react-vite"
};
export default config;