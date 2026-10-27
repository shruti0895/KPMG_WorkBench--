import type { ComponentDoc } from '../types';

export const checkbox: ComponentDoc = {
  overview: {
    what:
      'A checkbox lets users select one or more options, or toggle a single setting. It supports checked, unchecked and indeterminate values, an error appearance, two sizes and an optional label and subtext.',
    when: [
      'Select zero or more items from a list of options.',
      'Toggle a single option that is applied on submit, such as accepting terms.',
      'Use indeterminate for a parent checkbox when only some child options are selected.',
      'Use the error appearance to flag a required checkbox that is not satisfied.',
    ],
    whenNot: [
      'Settings that take effect immediately: use a Switch.',
      'Choosing exactly one option from a set: use a radio group (WorkBench has no radio component yet).',
      'Triggering an action: use a Button.',
    ],
    anatomy: [
      { part: 'Touch target', description: 'Large (40px) or small (24px) area that carries the state layer for hover and press.' },
      { part: 'Box', description: 'Circular indicator that is empty, filled with a tick, or shows a dash when indeterminate.' },
      { part: 'Label', description: 'Optional text beside the box.' },
      { part: 'Subtext', description: 'Optional supporting text below the label.' },
    ],
  },
  variants: [
    { name: 'Large', purpose: 'Default 40px touch target. Use it in forms and lists, for pointer and touch input.' },
    { name: 'Small', purpose: '24px touch target. Use it only in dense layouts such as table rows or compact lists.' },
    { name: 'Unchecked', purpose: 'The option is not selected.' },
    { name: 'Checked', purpose: 'The option is selected.' },
    { name: 'Indeterminate', purpose: 'A parent option whose children are only partly selected. Shown with the indeterminate prop; it is a visual state only.' },
    { name: 'Error', purpose: 'Applies error colours to any of the values above (error prop). Use it to show that a required checkbox is not satisfied.' },
  ],
  formatting: [
    {
      title: 'Sizing',
      points: [
        'Use large by default and small only where space is tight.',
        'Use one size within a group of related checkboxes.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Write labels as short statements in sentence case.',
        'Use subtext for a brief clarification, not for long terms or instructions.',
        'Keep labels in a group parallel in grammar and length.',
      ],
    },
    {
      title: 'Placement and layout',
      points: [
        'Stack a group of checkboxes vertically so every label stays visible.',
        'The box sits before its label, and the whole label is part of the click target.',
        'Place a parent checkbox above its children when using the indeterminate value.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'Clicking the box, label or subtext toggles the checkbox.',
        'Hover and press show a tinted circle behind the box; the tint is red when the checkbox is in error.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'Tab moves focus to the checkbox and Space toggles it.',
        'A focus ring appears on the box only for keyboard focus.',
      ],
    },
    {
      title: 'States',
      points: [
        'Disabled checkboxes ignore input, are skipped by Tab, show the not-allowed cursor and are dimmed.',
        'The checked prop sets the value; read the new value in onChange.',
      ],
    },
  ],
  accessibility: [
    'A native input of type checkbox is rendered visually hidden inside a label, so clicking the label or box toggles it and form submission works as normal.',
    'It is focusable and toggled with Space, and the native disabled attribute removes disabled checkboxes from the tab order.',
    'The visual box is aria-hidden; the native input and the label text provide the accessible name and checked state.',
    'Error and indeterminate states are shown with a different icon shape as well as colour. The indeterminate value is visual only and is not set on the input\'s indeterminate property.',
    'Standard attributes such as id, name, value and aria-* are passed to the input.',
  ],
  references: [
    { label: 'Switch', text: 'Use a switch for settings that apply immediately.' },
    { label: 'List', text: 'Checkboxes are commonly used in list rows.' },
    { label: 'Cards', text: 'Cards can include a selection checkmark.' },
  ],
};

export default checkbox;
