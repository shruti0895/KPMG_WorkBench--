import type { ComponentDoc } from '../types';

export const sheets: ComponentDoc = {
  overview: {
    what:
      'A sheet is a surface that holds supplementary content or inputs next to the main view. Sheets come as floating panels or side panels, in outlined or filled style, and can be shown inline or as a slide-over drawer with a backdrop.',
    when: [
      'Floating sheets: show short informational content or a small set of inputs on top of the current view.',
      'Side sheets: show project details, page previews, assistant content or other secondary content that sits beside the main view.',
      'Use the drawer option when the sheet should slide over the page and close when the backdrop is clicked.',
      'Avoid sheets for blocking decisions or confirmations; use a modal instead.',
      'Avoid sheets for short, transient feedback; use a snackbar instead.',
    ],
    anatomy: [
      { part: 'Container', description: 'Panel with an outlined or filled surface. Floating sheets are compact (400px) or large (486px); side sheets are small (320px) or large (360px).' },
      { part: 'Header', description: 'Title with an optional action button (menu or edit), or a pill header with a leading star icon.' },
      { part: 'Body', description: 'Cards, task items, form fields, chips, a file drop zone or custom content passed as children.' },
      { part: 'Backdrop', description: 'Overlay behind the sheet when it is used as a drawer. Clicking it calls onClose.' },
    ],
  },
  accessibility: [
    'The sheet renders as an aside element, so it is exposed as a complementary landmark.',
    'Header action buttons and removable chips have accessible names through aria-label (for example "Remove <chip label>").',
    'Decorative icons are hidden from assistive technology with aria-hidden.',
    'The drawer closes on backdrop click only. It does not trap focus or close on Escape, so provide a visible close control and manage focus in the page when needed.',
  ],
  references: [
    { label: 'Modal', text: 'Use a modal for content that must be dealt with before the user continues.' },
    { label: 'Snackbar', text: 'Use a snackbar for brief, non-blocking feedback.' },
    { label: 'Tiles', text: 'Use tiles for dashboard-style summaries that open into more detail.' },
    { label: 'Menu', text: 'Use a menu for a short list of actions instead of a full panel.' },
  ],
};

export default sheets;
