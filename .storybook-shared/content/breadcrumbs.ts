import type { ComponentDoc } from '../types';

export const breadcrumbs: ComponentDoc = {
  overview: {
    what:
      'Breadcrumbs show the user\'s location in a hierarchy as a trail of links, and let them move back to a parent level. Long trails can collapse into an overflow menu.',
    when: [
      'Show the path to the current page in deep or multi-level navigation.',
      'Use maxItems to collapse middle levels into a "..." menu when the trail is long.',
      'The overflow menu items can optionally carry a bookmark star or a route checkbox.',
    ],
    whenNot: [
      'Do not use breadcrumbs for a multi-step flow; use ProgressIndicator to show steps.',
      'Do not use breadcrumbs to switch between sibling views; use Tab.',
      'Do not use breadcrumbs for flat navigation with no hierarchy.',
      'Do not use breadcrumbs as a menu of actions; use Menu.',
    ],
    anatomy: [
      { part: 'Link', description: 'Ancestor level, rendered as a link when href is set and as a button otherwise.' },
      { part: 'Separator', description: 'Slash by default; a custom separator node can be supplied.' },
      { part: 'Overflow trigger', description: '"..." button placed before the last item that opens the collapsed levels.' },
      { part: 'Overflow card', description: 'Dropdown listing the collapsed items with optional leading star or checkbox and trailing checkmark.' },
      { part: 'Current page', description: 'Last item, shown as non-interactive text.' },
    ],
  },
  variants: [
    { name: 'Small', purpose: '12px text. Use in dense layouts such as nested app bars or compact page headers.' },
    { name: 'Medium (default)', purpose: '14px text. Use as the standard size in page headers.' },
    { name: 'Click overflow (default)', purpose: 'The "..." menu opens on click. Use it for touch support and when the menu has interactive items.' },
    { name: 'Hover overflow', purpose: 'The "..." menu opens on mouse hover. Use only on pointer-driven interfaces; it is not available by hover on touch.' },
  ],
  formatting: [
    {
      title: 'Placement',
      points: [
        'Place breadcrumbs at the top left of the page content, under the header and above the page title.',
        'Keep one breadcrumb trail per page.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Make each level a short label that matches the page title it links to.',
        'The last item is the current page: it is plain text, not a link.',
        'Set maxItems to collapse middle levels into the "..." menu; the first item and the last itemsAfterCollapse items stay visible.',
        'Our component does not truncate labels and lets the trail wrap onto a new line when space runs out, so use maxItems to keep the trail on one line.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'Clicking a level calls its onClick and onItemClick, or follows its href.',
        'Clicking the "..." button toggles the overflow card; clicking outside closes it, as does choosing an item.',
        'In the overflow card, the star toggles a bookmark and shows a short confirmation; the circle checkbox toggles a route.',
      ],
    },
    {
      title: 'Keyboard',
      points: [
        'Links and the "..." button are reached with Tab and activated with Enter or Space.',
        'The overflow card has no arrow-key navigation and no Escape handling; its items are links reached with Tab.',
      ],
    },
  ],
  accessibility: [
    'The component is a nav element with aria-label="Breadcrumb" containing an ordered list.',
    'The current page is marked with aria-current="page".',
    'Separators are aria-hidden so screen readers do not announce them.',
    'The overflow trigger is a button with aria-label="Show collapsed breadcrumbs" and aria-expanded reflecting the open state.',
    'The overflow card uses role="menu" with role="menuitem" links; it closes on an outside click or when an item is chosen. Arrow-key navigation is not implemented.',
    'Bookmark toasts are announced through role="status".',
  ],
  references: [
    { label: 'AppBars', text: 'App bars embed breadcrumbs for page context.' },
    { label: 'Menu', text: 'Use a menu for general lists of actions.' },
    { label: 'Tab', text: 'Use tabs to switch between sibling views.' },
  ],
};

export default breadcrumbs;
