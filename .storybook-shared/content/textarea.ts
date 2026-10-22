import type { ComponentDoc } from '../types';

export const textarea: ComponentDoc = {
  overview: {
    what:
      'A textarea lets the user enter multiple lines of text. It comes in outlined and filled variants and supports a label, helper text, error state, a character count and an optional trailing action.',
    when: [
      'Collect longer free-form input, such as comments, descriptions or messages.',
      'Show a character count when the input has a maximum length.',
      'Use the trailing action for a related control, such as sending or clearing.',
      'Avoid textareas for short, single-line values; use a text field instead.',
      'Avoid textareas when the options are known; use a menu, radio buttons or checkboxes instead.',
    ],
    anatomy: [
      { part: 'Label', description: 'Text above the field; a required marker is added when required is set.' },
      { part: 'Character count', description: 'Optional counter in the header, shown when showCount is set.' },
      { part: 'Input area', description: 'Multi-line field with an outlined or filled container and optional resize handle.' },
      { part: 'Trailing action', description: 'Optional icon button inside the field.' },
      { part: 'Helper or error text', description: 'Supporting text below the field; replaced by the error message in the error state.' },
    ],
  },
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
