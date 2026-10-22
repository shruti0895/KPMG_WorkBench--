import type { ComponentDoc } from '../types';

export const tiles: ComponentDoc = {
  overview: {
    what:
      'A tile is a self-contained block that summarises one topic, such as a to-do list, references or a project tracker, and gives access to more detail. Tiles come in basic and special variants with several content types, including empty and loading states.',
    when: [
      'Build a dashboard or overview where each block summarises one area.',
      'Use the special variant for ready-made content such as a living to-do list, references, learning hub, AI forum or project tracker.',
      'Use the empty and loading types to show a tile that has no content yet or is still loading.',
      'Avoid tiles for long-form content; use a page or a sheet instead.',
      'Avoid tiles for a single piece of grouped content with actions; use a card instead.',
    ],
    anatomy: [
      { part: 'Container', description: 'Surface that holds the tile content, with a regular or full-bleed layout.' },
      { part: 'Header', description: 'Title with an overflow menu button or an arrow action button, in default or filled style.' },
      { part: 'Body', description: 'Content for the tile type, such as task cards, reference cards, a stacked post card, progress or an empty state.' },
      { part: 'Actions', description: 'Controls inside the body, such as task checkboxes and like, wishlist and share toggles.' },
    ],
  },
  accessibility: [
    'The tile title is rendered as a heading (h3), and card titles inside it as h4, which gives the content a heading structure.',
    'The header action button has an accessible name (default "Tile options menu" or "Open tile details"), which actionAriaLabel can override.',
    'Task checkboxes are named "Mark <title> as complete" or "incomplete" to match their state.',
    'Reaction toggles are grouped with role="group" and aria-label "Social reactions", and each has a changing aria-label and aria-pressed.',
    'Decorative icons are hidden with aria-hidden. Active reactions change icon fill as well as colour.',
  ],
  references: [
    { label: 'Cards', text: 'Use a card for a single piece of grouped content and its actions.' },
    { label: 'Sheets', text: 'Use a sheet for secondary content that needs more room.' },
    { label: 'ProgressIndicator', text: 'Progress in task cards uses the progress indicator.' },
    { label: 'Menu', text: 'The overflow button in the header is intended to open a menu.' },
  ],
};

export default tiles;
