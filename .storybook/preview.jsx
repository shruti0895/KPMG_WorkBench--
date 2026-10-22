import '../packages/tokens/src/tokens.css';
import { GuidelinePage } from '../.storybook-shared/guideline-page';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    docs: { page: GuidelinePage },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo"
    }
  },
};

export default preview;