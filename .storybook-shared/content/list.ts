import type { ComponentDoc } from '../types';

export const list: ComponentDoc = {
  overview: {
    what:
      'A list is a vertical collection of rows used to present related information, choices or navigation. Lists come in three container styles (outlined, elevated, filled) and three row densities (small, medium, large).',
    when: [
      'Show a set of related items, each with a title and optional supporting text.',
      'Use leading avatars, thumbnails, checkboxes, radio buttons or icons to help users scan or select rows.',
      'Use trailing elements, such as a checkmark, chevron or badge, to show state or the next step.',
      'Avoid lists for tabular data with several columns; use a data table instead.',
      'Avoid lists for transient action choices; use a menu instead.',
    ],
    anatomy: [
      { part: 'Container', description: 'The list surface, outlined, elevated or filled, with optional dividers between rows.' },
      { part: 'Leading element', description: 'Optional avatar, thumbnail, checkbox, radio, icon or custom content.' },
      { part: 'Title', description: 'Main text of the row.' },
      { part: 'Supporting and secondary text', description: 'Optional lines of description that set the row to two or three lines.' },
      { part: 'Trailing element', description: 'Optional checkmark, chevron, badge or custom action.' },
    ],
  },
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
