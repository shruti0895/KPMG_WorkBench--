import type { ComponentDoc } from '../types';

export const tiles: ComponentDoc = {
  overview: {
    what:
      'A tile is a self-contained block that summarises one topic, such as a to-do list, references or a project tracker, and gives access to more detail. Tiles come in basic and special variants with several content types, including empty and loading states.',
    when: [
      'Build a dashboard or overview where each block summarises one area.',
      'Use the special variant for ready-made content such as a living to-do list, references, learning hub, AI forum or project tracker.',
      'Use the empty and loading types to show a tile that has no content yet or is still loading.',
    ],
    whenNot: [
      'Do not use tiles for long-form content; use a page or Sheets instead.',
      'Do not use a tile for a single piece of grouped content with actions; use Cards instead.',
      'Do not use a tile when the user only needs to see a state or message; use a Message or Banner instead.',
    ],
    anatomy: [
      { part: 'Container', description: 'Surface that holds the tile content, with a regular or full-bleed layout.' },
      { part: 'Header', description: 'Title with an overflow menu button or an arrow action button, in default or filled style.' },
      { part: 'Body', description: 'Content for the tile type, such as task cards, reference cards, a stacked post card, progress or an empty state.' },
      { part: 'Actions', description: 'Controls inside the body, such as task checkboxes and like, wishlist and share toggles.' },
    ],
  },
  variants: [
    { name: 'Basic', purpose: 'A tile with a header and a simple body: empty, empty with a missing-data alert, configuring (circular progress), or loading. Use it as a placeholder or status block.' },
    { name: 'Special', purpose: 'A tile with ready-made content: living to-do list, references, learning hub, AI forum, project tracker or empty state. Use it for the matching dashboard block.' },
    { name: 'Empty and loading types', purpose: 'Empty, empty-with-missing, empty-full and empty-state show that there is nothing to show yet. Loading and loading-full show a shimmer while content loads. The full types have no header and fill the tile.' },
    { name: 'Outlined, elevated and filled', purpose: 'The style prop sets the tile surface. Use one style across a dashboard so tiles read as a set.' },
    { name: 'Header style and action', purpose: 'Default or filled header (headerStyle). The action is an overflow menu button (with-menu) or an arrow button (with-button); it is inferred from the variant and type unless headerType is set.' },
  ],
  formatting: [
    {
      title: 'Layout',
      points: [
        'Place tiles in a grid and give tiles in the same row the same variant and type so they align. Set fluid for a tile that should fill its container width.',
        'Give every tile a short title that names its topic; otherwise a default title for the type is used.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Show a summary, not the full content, and let the header action lead to the detail.',
        'Use an empty or loading type while data is not available, rather than leaving the body blank.',
        'Pass children to replace the built-in body with your own content.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse',
      points: [
        'The header action button calls onAction; the tile does not open anything by itself.',
        'In the living to-do list, task checkboxes toggle a task as complete, and the tabs switch between three lists.',
        'In the stacked card, the like, wishlist and share toggles change state on click and can be controlled with isLoved, isWishlisted and isShared.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'The header action, checkboxes and reaction toggles are buttons reachable with Tab. The reaction toggles show a focus ring.',
        'The tile itself is not focusable or clickable as a whole.',
      ],
    },
    {
      title: 'States',
      points: [
        'Cards inside tiles, such as task, reference and stacked cards, show a hover style.',
        'Loading types show a shimmer; there is no loading state for tiles with content, so switch type while loading.',
      ],
    },
  ],
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
