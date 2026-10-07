import type { Preview } from '@storybook/angular';

// Tokens + component CSS from @designkpmg/styles, served via `staticDirs`
// in main.ts. Same stylesheet the React Storybook consumes, so both render
// identically.
function linkStylesheet(id: string, href: string): void {
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

linkStylesheet('kpmg-design-tokens', './index.css');

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
