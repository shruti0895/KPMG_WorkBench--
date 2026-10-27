import type { ComponentDoc } from '../types';

export const sheets: ComponentDoc = {
  overview: {
    what:
      'A sheet is a surface that holds supplementary content or inputs next to the main view. Sheets come as floating panels or side panels, in outlined or filled style, and can be shown inline or as a slide-over drawer with a backdrop.',
    when: [
      'Floating sheets: show short informational content or a small set of inputs on top of the current view.',
      'Side sheets: show project details, page previews, assistant content or other secondary content that sits beside the main view.',
      'Use the drawer option when the sheet should slide over the page and close when the backdrop is clicked.',
    ],
    whenNot: [
      "Blocking decisions or confirmations: use a modal instead.",
      "Short, transient feedback: use a snackbar instead.",
      "A short list of actions: use a menu instead.",
      "Summary content on a dashboard that opens into more detail: use tiles instead.",
    ],
    anatomy: [
      { part: 'Container', description: 'Panel with an outlined or filled surface. Floating sheets are compact (400px) or large (486px); side sheets are small (320px) or large (360px).' },
      { part: 'Header', description: 'Title with an optional action button (menu or edit), or a pill header with a leading star icon.' },
      { part: 'Body', description: 'Cards, task items, form fields, chips, a file drop zone or custom content passed as children.' },
      { part: 'Backdrop', description: 'Overlay behind the sheet when it is used as a drawer. Clicking it calls onClose.' },
    ],
  },
  variants: [
    { name: "Floating, informational", purpose: "A compact panel for read-only content such as a task with progress, answers, status cards and a references table. Use it to show results on top of the current view." },
    { name: "Floating, inputs", purpose: "A panel with a template selector, removable file chips, a slider, a file drop zone and an action button. Use it to collect a small set of inputs without leaving the page." },
    { name: "Side, basic", purpose: "A panel with a title, sections with pill headers and cards. Use it for general secondary content beside the main view." },
    { name: "Side, project", purpose: "Project details: tags, description, people, summary and related projects." },
    { name: "Side, pages", purpose: "File details and page previews, with the selected page marked." },
    { name: "Side, assistant", purpose: "Assistant settings: purpose, knowledge base, prompt templates, model, voice and advanced settings with sliders." },
    { name: "Outlined and filled", purpose: "Outlined has a border on the page background; filled has a tinted background. Use filled to separate the sheet from a white page." },
    { name: "Drawer", purpose: "Slides in from the right over the page with a backdrop. Use it when the sheet should be temporary rather than part of the layout." },
    { name: "Custom content", purpose: "Pass children to replace the built-in body and fill the sheet with your own content." },
  ],
  formatting: [
    {
      title: "Sizing",
      points: [
        "Floating sheets are compact (400px) or large (486px). The references table is only shown in the large informational sheet.",
        "Side sheets are small (320px) or large (360px).",
        "Set fluid to make the sheet fill the width of its container instead.",
        "The sheet body scrolls vertically when the content is taller than the sheet.",
      ],
    },
    {
      title: "Placement",
      points: [
        "Place side sheets beside the main view, at the edge of the page. The drawer is anchored to the right edge and spans the full height.",
        "Place floating sheets over the current view, close to the content they relate to.",
      ],
    },
    {
      title: "Content",
      points: [
        "Give the sheet a short title; if you omit it, a default title is chosen from the type.",
        "Group related content under pill headers in side sheets and keep one topic per section.",
      ],
    },
  ],
  behaviors: [
    {
      title: "Mouse and touch",
      points: [
        "In drawer mode, clicking the backdrop calls onClose; clicking inside the sheet does not.",
        "The three-dot button in a side sheet header calls onClose in the built-in layouts, so wire onClose to close the sheet.",
        "Removing an input chip in the floating inputs sheet removes it from the sheet immediately.",
        "The sheet opens with a short fade and slide animation in drawer mode.",
      ],
    },
    {
      title: "Keyboard and focus",
      points: [
        "Escape does not close the sheet and focus is not trapped or restored; provide a visible close control and manage focus in the page.",
        "Buttons and chips inside are native buttons that work with Tab, Enter and Space.",
      ],
    },
    {
      title: "States",
      points: [
        "Set isOpen to false to hide the sheet; it renders nothing when closed. Visibility is controlled by the page.",
      ],
    },
  ],
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
