import type { ComponentDoc } from '../types';

export const tab: ComponentDoc = {
  overview: {
    what:
      'Tabs organise related content into sections that share the same space, so the user can switch between views without leaving the page. They come in small and large sizes, with optional badges and trailing actions.',
    when: [
      'Switch between peer views of the same content, such as Overview, Activity and Settings.',
      'Use a badge to show a count or status on a tab.',
      'Keep labels short and limit the number of tabs so they fit in one row.',
      'Avoid tabs for step-by-step flows; use a stepper or sequential pages instead.',
      'Avoid tabs for site-level navigation; use the app bar or breadcrumbs instead.',
    ],
    anatomy: [
      { part: 'Tab list', description: 'Row of tabs, optionally with a bottom border and full-width layout.' },
      { part: 'Tab', description: 'One selectable item. The selected tab is highlighted.' },
      { part: 'Label', description: 'Short text naming the tab.' },
      { part: 'Badge', description: 'Optional number or text next to the label.' },
      { part: 'Actions', description: 'Optional controls at the end of the row, such as list view and link actions.' },
    ],
  },
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
