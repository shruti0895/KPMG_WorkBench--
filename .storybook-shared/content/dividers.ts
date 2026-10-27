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
    ],
    whenNot: [
      'Grouping that spacing alone makes clear: leave the space and omit the divider.',
      'A separator between every row of a list: use the List divided option.',
      'Separating items inside a menu: use the Menu divider and group elements.',
      'Containing a group of content in its own surface: use Cards or Tiles.',
    ],
    anatomy: [
      { part: 'Line', description: 'A 1px rule, horizontal or vertical, in a light (subtle) or dark (high-contrast) colour.' },
      { part: 'Inset', description: 'Optional start or middle spacing (small, medium, large or 16px) that shortens the line.' },
      { part: 'Subheader text', description: 'Optional short label shown beside the line in the "inset middle with text" variant.' },
    ],
  },
  variants: [
    { name: 'Horizontal, full', purpose: 'Spans the whole container. Use it between major sections.' },
    { name: 'Horizontal, inset', purpose: 'Starts after an indent. Use it to line up with indented content such as list text.' },
    { name: 'Horizontal, inset middle (small, medium, large)', purpose: 'Pulls the line in from both ends by a small, medium or large amount. Use it between items inside a card or panel.' },
    { name: 'Horizontal, inset middle with text', purpose: 'A line with a short subheader. Use it to name the group that follows.' },
    { name: 'Vertical, full', purpose: 'Full-height line between items that sit side by side, such as toolbar actions.' },
    { name: 'Vertical, inset and inset middle', purpose: 'A shorter vertical line, inset from the top (inset) or from both ends (inset middle), so it does not touch the container edges.' },
    { name: 'Light theme', purpose: 'Subtle line for most surfaces.' },
    { name: 'Dark theme', purpose: 'High-contrast line. Use it where the light line is hard to see.' },
  ],
  formatting: [
    {
      title: 'Placement',
      points: [
        'Place a divider between the groups it separates, not at the start or end of a container.',
        'Match the inset to the content beside it: full for page sections, inset or inset middle inside lists and cards.',
        'A vertical divider needs a parent with a defined height to be visible.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Keep the subheader to a word or short phrase.',
        'Use one divider style per surface.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Interaction',
      points: [
        'A divider is static: it has no hover, press or focus state and is not in the tab order.',
        'It is a 1px line; the only styling options are orientation, inset and light or dark theme.',
      ],
    },
  ],
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
