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
      'Avoid app bars for in-page section headings; use a card or a plain heading. Use Breadcrumbs on its own when only the location path is needed.',
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
