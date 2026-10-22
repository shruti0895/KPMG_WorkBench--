import type { ComponentDoc } from '../types';

export const iconButton: ComponentDoc = {
  overview: {
    what:
      'An icon button is a button that shows only an icon. It has four variants (filled, outline, standard, neutral), three sizes (32, 40 and 52px), circle or square shape, and a selected state for toggles.',
    when: [
      'Offer a common, well-understood action where space is limited, such as close, edit or more options.',
      'Use the selected state for toggle actions, such as favourite or bookmark.',
      'Use filled for the most important icon action and standard or neutral for secondary ones.',
      'Avoid it when the icon is unfamiliar; use a button with a text label instead.',
    ],
    anatomy: [
      { part: 'Container', description: 'Circle or square button surface sized at 32, 40 or 52px; fill and outline depend on the variant.' },
      { part: 'Icon', description: 'The SVG icon or child element centred in the container.' },
      { part: 'Selected indicator', description: 'A distinct selected style applied when selected is true.' },
    ],
  },
  accessibility: [
    'Renders a native button element, so it is focusable and activated with Enter or Space.',
    'Always has an accessible name through aria-label; if none is supplied it falls back to "Icon button", so provide a specific label.',
    'aria-pressed reflects the selected prop, announcing the toggle state.',
    'Disabled uses the native disabled attribute, which removes it from the tab order.',
    'Selected state is shown by a style change as well as aria-pressed; do not rely on colour alone in your icon choice.',
  ],
  references: [
    { label: 'Button', text: 'Use a button when a text label is needed.' },
    { label: 'Tooltip', text: 'Add a tooltip to explain what an icon button does.' },
    { label: 'Menu', text: 'An icon button commonly opens a menu, for example an overflow menu.' },
  ],
};

export default iconButton;
