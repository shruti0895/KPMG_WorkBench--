import type { ComponentDoc } from '../types';

export const iconButton: ComponentDoc = {
  overview: {
    what:
      'An icon button is a button that shows only an icon. It has four variants (filled, outline, standard, neutral), three sizes (32, 40 and 52px), circle or square shape, and a selected state for toggles.',
    when: [
      'Offer a common, well-understood action where space is limited, such as close, edit or more options.',
      'Use the selected state for toggle actions, such as favourite or bookmark.',
      'Use filled for the most important icon action and standard or neutral for secondary ones.',
    ],
    whenNot: [
      'An unfamiliar icon or an action that needs explaining: use a Button with a text label.',
      'Several actions that do not fit: group them in a Menu opened by one icon button.',
    ],
    anatomy: [
      { part: 'Container', description: 'Circle or square button surface sized at 32, 40 or 52px; fill and outline depend on the variant.' },
      { part: 'Icon', description: 'The SVG icon or child element centred in the container.' },
      { part: 'Selected indicator', description: 'A distinct selected style applied when selected is true.' },
    ],
  },
  variants: [
    { name: 'Filled', purpose: 'Solid primary background. Use it for the single most important icon action in an area.' },
    { name: 'Outline', purpose: 'Bordered with a transparent background. Use it for a medium-emphasis action.' },
    { name: 'Standard', purpose: 'No background or border until hover. Use it for low-emphasis, frequent actions such as close or more options.' },
    { name: 'Neutral', purpose: 'Neutral tinted background. Use it for secondary actions that should not compete with the primary colour.' },
    { name: 'Circle and square shape', purpose: 'Circle is the default; square matches rectangular controls nearby. Use one shape within a group.' },
    { name: 'Selected', purpose: 'Sets selected and aria-pressed for toggle actions such as favourite.' },
  ],
  formatting: [
    {
      title: 'Sizing',
      points: [
        'Small (sm) is 32px for dense toolbars and tables, medium (md, default) is 40px and large (lg) is 52px for prominent actions.',
        'Use one size within a group of icon buttons.',
      ],
    },
    {
      title: 'Content and placement',
      points: [
        'Use one icon per button, from a consistent icon set, and always set a specific aria-label such as "Close dialog".',
        'Add a Tooltip so sighted users also see the name of the action.',
        'Group related icon buttons together and put the most important one first.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'Clicking calls onClick. Hover and press change the background (and the border for outline).',
        'The button type is "button" unless you set type.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'Tab focuses the button; Enter or Space activates it as a native button.',
      ],
    },
    {
      title: 'States',
      points: [
        'Selected gives a distinct style per variant and sets aria-pressed; the component does not toggle itself, so update selected in onClick.',
        'Disabled uses the native disabled attribute: it ignores input, is skipped by Tab and uses muted colours.',
      ],
    },
  ],
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
