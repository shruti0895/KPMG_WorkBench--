import type { ComponentDoc } from '../types';

export const dividers: ComponentDoc = {
  overview: {
    what:
      'A divider is a thin line that separates content into groups. It can be horizontal or vertical, full width or inset, and light or dark; a horizontal divider can also carry a short subheader.',
    when: [
      'Separate groups of related content in a list, menu, card or panel.',
      'Use an inset divider to align the line with content that is indented, such as list text.',
      'Use the subheader variant to label the group that follows the line.',
      'Use a vertical divider to separate items that sit side by side, such as toolbar actions.',
      'Avoid dividers where spacing alone is enough to show grouping; use a list with its divided option when every row needs a separator.',
    ],
    anatomy: [
      { part: 'Line', description: 'A 1px rule, horizontal or vertical, in a light (subtle) or dark (high-contrast) colour.' },
      { part: 'Inset', description: 'Optional start or middle spacing (small, medium, large or 16px) that shortens the line.' },
      { part: 'Subheader text', description: 'Optional short label shown beside the line in the "inset middle with text" variant.' },
    ],
  },
  accessibility: [
    'Renders with role="separator" by default, so assistive technology announces a boundary between content groups.',
    'aria-orientation is set to horizontal or vertical to match the orientation.',
    'The divider is not focusable and has no keyboard interaction.',
    'The subheader text is real text in the page, so it is read by screen readers; keep it short and meaningful.',
    'Meaning must not depend on the line alone; do not use a divider as the only cue that two groups differ.',
  ],
  references: [
    { label: 'List', text: 'A list can draw dividers between rows with its divided option.' },
    { label: 'Menu', text: 'Menus have their own divider and group elements for separating items.' },
    { label: 'Cards', text: 'Use cards or tiles to group content in a contained surface instead of a line.' },
  ],
};

export default dividers;
