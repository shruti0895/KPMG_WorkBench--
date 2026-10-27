import type { ComponentDoc } from '../types';

export const tab: ComponentDoc = {
  overview: {
    what:
      'Tabs organise related content into sections that share the same space, so the user can switch between views without leaving the page. They come in small and large sizes, with optional badges and trailing actions.',
    when: [
      'Switch between peer views of the same content, such as Overview, Activity and Settings.',
      'Use a badge to show a count or status on a tab.',
      'Keep labels short and limit the number of tabs so they fit in one row.',
    ],
    whenNot: [
      'Do not use tabs for site-level navigation; use AppBars instead, or Breadcrumbs to show location.',
      'Do not use tabs for step-by-step flows; use sequential pages so the user cannot skip steps.',
      'Do not use tabs when there are more views than fit in one row; use a Menu instead.',
    ],
    anatomy: [
      { part: 'Tab list', description: 'Row of tabs, optionally with a bottom border and full-width layout.' },
      { part: 'Tab', description: 'One selectable item. The selected tab is highlighted.' },
      { part: 'Label', description: 'Short text naming the tab.' },
      { part: 'Badge', description: 'Optional number or text next to the label.' },
      { part: 'Actions', description: 'Optional controls at the end of the row, such as list view and link actions.' },
    ],
  },
  variants: [
    { name: 'Small', purpose: 'Compact tabs for use inside a tile, card or dialog to switch views of that block of content.' },
    { name: 'Large', purpose: 'Full-width tab row for the top of a page. It includes a trailing actions area, and an optional bottom border (bordered, on by default).' },
    { name: 'With badge', purpose: 'A number or short text next to the label (badge on an item). Use it for counts or status, such as unread items.' },
  ],
  formatting: [
    {
      title: 'Sizing and layout',
      points: [
        'Use small for tabs nested inside other content and large for page-level views.',
        'Set fullWidth to stretch the tab list to its container.',
        'On large tabs, pass actions to replace the default trailing buttons. The default List view and Link actions buttons have no click behaviour of their own.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Keep labels to one or two words and name the content of the panel.',
        'Use two to six tabs. The list scrolls horizontally if the tabs do not fit, but the scrollbar is hidden, so avoid relying on it.',
        'Do not put important counts only in the badge, because it is hidden from assistive technology.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse',
      points: [
        'Clicking a tab selects it and calls onChange with the id, the item and the event. Clicking a disabled tab does nothing.',
        'Hover and pressed styles apply to enabled tabs; the selected tab is highlighted.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'Only the selected tab is in the tab order. Left and Right Arrow move to the previous and next enabled tab and wrap around at the ends. Home and End go to the first and last.',
        'Moving with the arrow keys also selects the tab, so the panel changes as focus moves.',
        'Disabled tabs are skipped. A focus ring is shown on the focused tab.',
      ],
    },
    {
      title: 'States',
      points: [
        'Uncontrolled tabs select the first item by default; use defaultValue or value to choose another.',
        'The page must show and hide the matching panels; the component only manages the tab row.',
      ],
    },
  ],
  accessibility: [
    'The container has role="tablist" with an aria-label (default "Navigation Tabs"); each item has role="tab" with aria-selected and aria-disabled.',
    'Only the selected tab is in the tab order (tabindex 0); the others use -1. Left and Right Arrow move between tabs and Home and End jump to the first and last, skipping disabled tabs.',
    'Items can link to their panel with aria-controls (ariaControls); the page is responsible for the matching tabpanel role and ids.',
    'Disabled tabs cannot be selected or focused.',
    'The badge is hidden from assistive technology, so include any important count in the label.',
  ],
  references: [
    { label: 'Breadcrumbs', text: 'Use breadcrumbs to show location in a hierarchy.' },
    { label: 'AppBars', text: 'Use an app bar for top-level navigation.' },
    { label: 'Badge', text: 'Badges follow the same count and status conventions.' },
    { label: 'Menu', text: 'Use a menu when there are more options than fit in a tab row.' },
  ],
};

export default tab;
