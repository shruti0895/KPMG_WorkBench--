import type { ComponentDoc } from '../types';

export const cards: ComponentDoc = {
  overview: {
    what:
      'Cards group related content and actions into a single contained surface. WorkBench provides horizontal, stacked, special and task cards, each in several styles such as outlined, elevated and filled.',
    when: [
      'Horizontal card: a row with a thumbnail, title and supporting text, with an optional checkmark, arrow, more icon or status and progress.',
      'Stacked card: a vertical card with a header, media, text and a footer of buttons, chips, social actions or participants.',
      'Special card: a specialised card for sliders, chips, references, code snippets, loading states or rich nested content.',
      'Task card: a checkable task with a title, description, optional action button or file uploader, and a loading state.',
      'Avoid cards for simple lists; use a list. Use a tile for compact selectable items.',
    ],
    anatomy: [
      { part: 'Container', description: 'Surface with an outline, elevation or fill depending on style.' },
      { part: 'Media', description: 'Optional image or gradient placeholder.' },
      { part: 'Header', description: 'Title, with supporting line or author information.' },
      { part: 'Body', description: 'Description text or variant-specific content such as a slider, chips or code.' },
      { part: 'Trailing control', description: 'Checkbox, arrow, more icon or spinner, depending on the card type.' },
      { part: 'Footer', description: 'Buttons, chips, social counts or participant avatars.' },
    ],
  },
  accessibility: [
    'Card titles use heading elements (h3 and h4), and images take their alt text from imageAlt and avatarAlt.',
    'The checkmark control on horizontal and task cards has role="checkbox" with aria-checked and aria-label="Toggle card selection".',
    'Icon buttons carry labels such as "Open", "More options", "Heart like", "Bookmark save", "Share" and "Copy code to clipboard".',
    'Collapsible sections in the rich card use role="button", tabIndex 0, aria-expanded and respond to Enter and Space.',
    'The task card loading spinner uses role="status" with aria-label="Loading task".',
    'Selected and error states are shown with icons as well as colour.',
  ],
  references: [
    { label: 'Tiles', text: 'Use tiles for compact, selectable items.' },
    { label: 'List', text: 'Use a list for simple, repeated rows of text.' },
    { label: 'Checkbox', text: 'Use a checkbox for a standalone selection control.' },
    { label: 'Chip', text: 'Chips appear in the footer of stacked and special cards.' },
  ],
};

export default cards;
