import type { ComponentDoc } from '../types';

export const list: ComponentDoc = {
  overview: {
    what:
      'A list is a vertical collection of rows used to present related information, choices or navigation. Lists come in three container styles (outlined, elevated, filled) and three row densities (small, medium, large).',
    when: [
      'Show a set of related items, each with a title and optional supporting text.',
      'Use leading avatars, thumbnails, checkboxes, radio buttons or icons to help users scan or select rows.',
      'Use trailing elements, such as a checkmark, chevron or badge, to show state or the next step.',
    ],
    whenNot: [
      "Tabular data with several columns to compare or sort: use a data table instead.",
      "A short set of actions that opens on demand: use a menu instead.",
      "Content that is not a repeated set of rows, such as a summary or a grouped block of information: use cards or tiles instead.",
    ],
    anatomy: [
      { part: 'Container', description: 'The list surface, outlined, elevated or filled, with optional dividers between rows.' },
      { part: 'Leading element', description: 'Optional avatar, thumbnail, checkbox, radio, icon or custom content.' },
      { part: 'Title', description: 'Main text of the row.' },
      { part: 'Supporting and secondary text', description: 'Optional lines of description that set the row to two or three lines.' },
      { part: 'Trailing element', description: 'Optional checkmark, chevron, badge or custom action.' },
    ],
  },
  variants: [
    { name: "Outlined", purpose: "Bordered container on the page background. The default; use it when the list sits among other content on a plain surface." },
    { name: "Elevated", purpose: "Container with a shadow. Use it when the list should stand out from the page, for example as a floating panel." },
    { name: "Filled", purpose: "Container with a tinted background and no border. Use it to group a list inside a larger surface without adding more lines." },
    { name: "Small density", purpose: "One line: title only. Use it for short labels and simple choices. Supporting text is not shown." },
    { name: "Medium density", purpose: "Two lines: title and one line of supporting text. The default for most lists." },
    { name: "Large density", purpose: "Three lines: title, supporting text (up to two lines) and secondary text. Use it when rows need extra detail." },
    { name: "Leading avatar or image", purpose: "Identifies people or items. Use an avatar for people and a thumbnail for files, products or pages." },
    { name: "Leading checkbox or radio", purpose: "Makes rows selectable. Use a checkbox when several rows can be chosen and a radio when exactly one can be chosen." },
    { name: "Leading icon", purpose: "Adds a small icon to describe the type of row." },
    { name: "Trailing checkmark, chevron or badge", purpose: "Shows state or what happens next: a checkmark for a selected row, a chevron for a row that opens more, a badge for a count or status." },
  ],
  formatting: [
    {
      title: "Sizing",
      points: [
        "Choose the density from the amount of text in each row: small for a title only, medium for title and description, large when secondary text is needed.",
        "Rows are at least 56px (small), 68px (medium) or 88px (large) tall. Use one density throughout a list.",
        "Set size on the list to apply it to every row, or on a single item to override it.",
      ],
    },
    {
      title: "Content",
      points: [
        "Keep titles short and unique so rows can be scanned. Titles stay on one line and are truncated with an ellipsis.",
        "Supporting and secondary text is also single-line and truncated, except in large density where supporting text can wrap to two lines.",
        "Use one leading type and one trailing type consistently within a list.",
      ],
    },
    {
      title: "Layout",
      points: [
        "Turn on divided to draw a thin line between rows; it is not drawn after the last row.",
        "Use a list for one column of rows. Place several lists side by side only when they hold different groups of content.",
      ],
    },
  ],
  behaviors: [
    {
      title: "Mouse and touch",
      points: [
        "Rows with an onClick handler show a hover background and a pressed background, and the chevron trailing element changes on hover.",
        "Rows without onClick are static and show no hover or pressed state.",
        "Selected rows keep the selected background. The checkbox and radio leading elements show the checked state; they are indicators only, so the row onClick handler must update the selection.",
      ],
    },
    {
      title: "Keyboard and focus",
      points: [
        "Rows with onClick are focusable and show a focus ring (focus-visible). Enter and Space activate the row.",
        "Arrow-key navigation between rows is not supported. Each interactive row is a separate tab stop.",
      ],
    },
    {
      title: "States",
      points: [
        "Disabled rows are dimmed and ignore pointer input; they do not call onClick.",
        "Selected rows set aria-selected; the list does not manage selection itself and does not limit it to one row.",
      ],
    },
  ],
  accessibility: [
    'The container is a ul with role="list" and each row is an li with role="listitem"; both roles can be overridden.',
    'Rows with an onClick handler are focusable (tabIndex 0) and activate with Enter or Space.',
    'Selected rows set aria-selected and disabled rows set aria-disabled; disabled rows do not respond to clicks.',
    'Decorative icons in rows are hidden from assistive technology (aria-hidden).',
    'Selection is shown by more than colour, through the checkbox, radio or checkmark indicator.',
    'The list does not provide arrow-key navigation between rows; each interactive row is a separate tab stop.',
  ],
  references: [
    { label: 'Menu', text: 'Use a menu for a short list of actions that opens on demand.' },
    { label: 'Checkbox', text: 'Use checkbox leading elements for multiple selection.' },
    { label: 'DataTable', text: 'Use a data table for structured, multi-column data.' },
    { label: 'Dividers', text: 'Use dividers to separate groups of rows.' },
  ],
};

export default list;
