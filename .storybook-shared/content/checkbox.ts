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
      'Avoid checkboxes for settings that take effect immediately; use a switch. For choosing exactly one option use a radio group.',
    ],
    anatomy: [
      { part: 'Touch target', description: 'Large (40px) or small (24px) area that carries the state layer for hover and press.' },
      { part: 'Box', description: 'Circular indicator that is empty, filled with a tick, or shows a dash when indeterminate.' },
      { part: 'Label', description: 'Optional text beside the box.' },
      { part: 'Subtext', description: 'Optional supporting text below the label.' },
    ],
  },
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
