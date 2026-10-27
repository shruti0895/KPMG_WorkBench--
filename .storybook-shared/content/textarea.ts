import type { ComponentDoc } from '../types';

export const textarea: ComponentDoc = {
  overview: {
    what:
      'A textarea lets the user enter multiple lines of text. It comes in outlined and filled variants and supports a label, helper text, error state, a character count and an optional trailing action.',
    when: [
      'Collect longer free-form input, such as comments, descriptions or messages.',
      'Show a character count when the input has a maximum length.',
      'Use the trailing action for a related control, such as sending or clearing.',
    ],
    whenNot: [
      'Do not use a textarea for a short single-line value; use a text input instead.',
      'Do not use a textarea when the options are known; use a Menu or Checkbox instead.',
      'Do not use a textarea to collect a file; use a FileUploader instead.',
    ],
    anatomy: [
      { part: 'Label', description: 'Text above the field; a required marker is added when required is set.' },
      { part: 'Character count', description: 'Optional counter in the header, shown when showCount is set.' },
      { part: 'Input area', description: 'Multi-line field with an outlined or filled container and optional resize handle.' },
      { part: 'Trailing action', description: 'Optional icon button inside the field.' },
      { part: 'Helper or error text', description: 'Supporting text below the field; replaced by the error message in the error state.' },
    ],
  },
  variants: [
    { name: 'Outlined', purpose: 'A border around the field (default). Use it on plain backgrounds and as the standard form style.' },
    { name: 'Filled', purpose: 'A tinted background with no full outline. Use it where a filled field fits the surrounding surface better; keep one variant per form.' },
  ],
  formatting: [
    {
      title: 'Sizing',
      points: [
        'Set rows (3 by default) so the field shows about as much text as users usually enter.',
        'Resize is vertical by default. Set resize to none, horizontal or both to change it, and use fullWidth (on by default) to fill the container.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Use a short label that names the field. A required marker is added when required is set.',
        'Use helper text for format or length guidance. Write error text as what to fix, for example "Enter at least 20 characters".',
        'Set maxLength to limit input. The character count appears with it when a label is present, in the form 12/200, or use showCount and countFormatter to control it.',
        'The default trailing action is a voice input button. Set showAction to false if the field has no action, or pass trailingAction to replace it.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and focus',
      points: [
        'Clicking the field focuses it and shows the focus border. Hover changes the border or background.',
        'The trailing action button calls onActionClick; the field itself does not submit anything.',
      ],
    },
    {
      title: 'Keyboard',
      points: [
        'Tab moves into the field and, if shown, to the action button. Enter adds a new line as in a native textarea.',
        'maxLength is enforced by the native textarea, which stops further typing.',
      ],
    },
    {
      title: 'States',
      points: [
        'Error (error as true or as a message string) changes the border, label and count colour, swaps the action icon for an alert icon and shows the message in place of the helper text.',
        'Disabled fields and their action are dimmed and not focusable. readOnly keeps the text focusable and selectable but not editable.',
        'The component works controlled (value) or uncontrolled (defaultValue).',
      ],
    },
  ],
  accessibility: [
    'The label is associated with the native textarea through htmlFor and id.',
    'The field sets aria-invalid in the error state and aria-describedby to point at the helper or error text and the count.',
    'Helper text uses role="alert" when it is an error and role="status" otherwise; the character count is an aria-live="polite" region.',
    'The required marker is visual only (aria-hidden); the required attribute on the field communicates the requirement.',
    'The trailing action needs an accessible name through actionAriaLabel. Disabled fields and actions are removed from the tab order.',
    'The error state is conveyed by text as well as colour.',
  ],
  references: [
    { label: 'Button', text: 'Use a button to submit the entered text.' },
    { label: 'IconButton', text: 'The trailing action follows icon button behaviour.' },
    { label: 'Message', text: 'Use a message for feedback that is not tied to a single field.' },
  ],
};

export default textarea;
