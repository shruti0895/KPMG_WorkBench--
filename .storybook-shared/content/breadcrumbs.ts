import type { ComponentDoc } from '../types';

export const breadcrumbs: ComponentDoc = {
  overview: {
    what:
      'Breadcrumbs show the user\'s location in a hierarchy as a trail of links, and let them move back to a parent level. Long trails can collapse into an overflow menu.',
    when: [
      'Show the path to the current page in deep or multi-level navigation.',
      'Use maxItems to collapse middle levels into a "..." menu when the trail is long.',
      'The overflow menu items can optionally carry a bookmark star or a route checkbox.',
      'Avoid breadcrumbs for flat navigation or for step-by-step flows; use tabs or a stepper pattern instead.',
    ],
    anatomy: [
      { part: 'Link', description: 'Ancestor level, rendered as a link when href is set and as a button otherwise.' },
      { part: 'Separator', description: 'Slash by default; a custom separator node can be supplied.' },
      { part: 'Overflow trigger', description: '"..." button placed before the last item that opens the collapsed levels.' },
      { part: 'Overflow card', description: 'Dropdown listing the collapsed items with optional leading star or checkbox and trailing checkmark.' },
      { part: 'Current page', description: 'Last item, shown as non-interactive text.' },
    ],
  },
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
