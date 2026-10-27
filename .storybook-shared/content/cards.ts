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
    ],
    whenNot: [
      'Do not use cards for simple repeated rows of text; use List.',
      'Do not use cards for compact selectable items; use Tiles.',
      'Do not use cards for table-like data; use DataTable.',
      'Do not use a card as a dialog or overlay surface; use Modal or Sheets.',
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
  variants: [
    { name: 'Horizontal card', purpose: 'A row with a thumbnail and text. Use for list-like items such as documents, with optional checkmark, arrow, more icon or status. Sizes run from Small to Largest.' },
    { name: 'Stacked card', purpose: 'A vertical card with media, text and a footer. Types are Media for content with images (one or two), Assistant for assistant responses and Forum for discussions.' },
    { name: 'Special card', purpose: 'A card for specific content. Types are Slider, Chips, References, Code, Loading and Rich.' },
    { name: 'Task card', purpose: 'A checkable task with a title and description. Use for to-do items; it can include an action button or a file uploader and has a Loading type.' },
    { name: 'Outlined', purpose: 'A border and no shadow. Use as the default on a plain background.' },
    { name: 'Elevated', purpose: 'A shadow instead of a border. Use to lift a card above the page; elevated cards respond to hover.' },
    { name: 'Filled', purpose: 'A tinted background with no border. Use to group cards on a white page.' },
  ],
  formatting: [
    {
      title: 'Content',
      points: [
        'Keep titles short; use the supporting line or description for detail.',
        'Keep to one primary action per card.',
        'Show only the controls the card needs; do not fill every slot.',
      ],
    },
    {
      title: 'Layout',
      points: [
        'Use the same card type and style within a group.',
        'Use stacked cards in grids and horizontal cards in single columns.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'Pass onClick to make a whole card clickable; it then shows a pointer and hover style, and inner buttons do not trigger it.',
        'The checkmark, arrow, more icon, chips and footer buttons have their own callbacks.',
        'Heart and bookmark on stacked cards toggle on click.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'Inner controls such as buttons and checkboxes are reached with Tab.',
        'A clickable card surface is not focusable and has no key handler, so keyboard users reach only its inner controls.',
        'Rich card section headers open and close with Enter and Space.',
        'There is no Escape handling.',
      ],
    },
    {
      title: 'States',
      points: [
        'Task cards support a disabled prop and a Loading type that replaces the checkbox with a spinner.',
        'Horizontal cards support Warning and Missing styles, which show an icon as well as colour.',
      ],
    },
  ],
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
