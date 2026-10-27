import type { ComponentDoc } from '../types';

export const appBars: ComponentDoc = {
  overview: {
    what:
      'App bars are the top-of-screen containers that carry navigation, page context and global actions. WorkBench provides five variants: full, nested, special, search pill and status item.',
    when: [
      'Full app bar: the global header with a brand menu, breadcrumbs, page title and icon actions (assistant, notifications, more, avatar), optionally with an action row of buttons.',
      'Nested app bar: a page-level header with a navigation or back icon, title, optional breadcrumbs, filter chips and contextual icon actions.',
      'Special app bar: a landing or home header with a greeting, welcome title, optional search and filter chips.',
      'Search pill: a compact prompt field with attach, voice, send and expand actions, either inline or floating.',
    ],
    whenNot: [
      'Do not use an app bar for in-page section headings; use a Card or a plain heading.',
      'Do not use an app bar when only the location path is needed; use Breadcrumbs on its own.',
      'Do not use an app bar to switch between peer views of the same content; use Tab.',
    ],
    anatomy: [
      { part: 'Brand pill', description: 'Brand label with a chevron that opens the navigation menu (full app bar).' },
      { part: 'Navigation icon', description: 'Menu or back icon button at the start of the nested app bar.' },
      { part: 'Breadcrumbs', description: 'Optional location path rendered with the Breadcrumbs component.' },
      { part: 'Title', description: 'Page title or header; the nested and special variants render it as a large heading.' },
      { part: 'Action icons', description: 'Icon buttons on the right, such as assistant, notifications, bookmark, share, more options and the avatar.' },
      { part: 'Chips', description: 'Optional filter chips under the title in the nested and special variants.' },
      { part: 'Search pill', description: 'Prompt field with attach, voice, send and expand controls.' },
      { part: 'Status item', description: 'Label with a progress bar, used for configuring, completed, saved and reviewed states.' },
    ],
  },
  variants: [
    { name: 'Full (default)', purpose: 'The global header: brand pill, breadcrumbs, page title and icon actions. Use once at the top of the application.' },
    { name: 'Full (with action)', purpose: 'The full header plus a row of action buttons under the title. Use when the page has one or two primary page-level actions.' },
    { name: 'Nested', purpose: 'A page-level header with a menu or back icon, title and optional breadcrumbs, status item, filter chips and contextual icons. Use inside a section or detail page. Size is small or large; state is default or filled.' },
    { name: 'Special', purpose: 'A landing or home header with greeting, welcome title, optional search and filter chips. Size is extra-small, small or large.' },
    { name: 'Search pill', purpose: 'A compact prompt field with attach, voice and send actions. Use it for assistant-style input; set floating to place it over content, and use the small or large size.' },
    { name: 'Status item', purpose: 'A label with a progress bar for configuring, completed, saved or reviewed states. Use it to show the progress of work on the current page.' },
  ],
  formatting: [
    {
      title: 'Placement',
      points: [
        'Place the full app bar once, at the top of the screen; do not stack two full app bars.',
        'Place the nested app bar directly under the full app bar, above the page content it describes.',
        'Use the floating search pill when the prompt must stay visible over scrolling content; otherwise keep it inline.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Keep the page title short; the nested and special variants render it as a large heading.',
        'Keep filter chip labels short and limit the row to a few chips so it stays on one line.',
        'Show breadcrumbs only when the page sits in a hierarchy; hide them with showBreadcrumbs={false} on the full app bar.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'The brand pill, icon buttons, action buttons and chips call their callbacks on click or tap (onBrandClick, onAssistantClick, onNotificationsClick, onOverflowClick, onAvatarClick, onNavClick, onChipClick and similar).',
        'Clicking a filter chip makes it the active chip; the active chip is set with activeChip.',
      ],
    },
    {
      title: 'Keyboard',
      points: [
        'All controls are native buttons or inputs, so they are reachable with Tab and activated with Enter or Space.',
        'In the search pill, Enter submits the prompt and Shift+Enter inserts a new line in the expanded textarea.',
        'There is no Escape handling and no arrow-key navigation between chips.',
      ],
    },
  ],
  accessibility: [
    'The full app bar is a header element with role="banner"; the search pill is exposed with role="search".',
    'Icon-only buttons carry aria-label values such as "Notifications", "More options", "Go back", "Attach file" and "Send query".',
    'Decorative icons are marked aria-hidden, so only the labelled button is announced.',
    'Progress indicators in the status item and special card use role="progressbar" with aria-valuenow, aria-valuemin and aria-valuemax.',
    'Filter chips are rendered as a tablist; each chip has role="tab" and aria-selected reflecting the active chip.',
    'The search input and the expanded textarea are labelled with the placeholder text through aria-label.',
  ],
  references: [
    { label: 'Breadcrumbs', text: 'Used inside the full and nested app bars to show the location path.' },
    { label: 'Menu', text: 'The brand pill and the more-options button open menus.' },
    { label: 'Chip', text: 'Use chips for filters shown beneath the title.' },
    { label: 'Tab', text: 'Use tabs when switching between peer views of the same content.' },
  ],
};

export default appBars;
