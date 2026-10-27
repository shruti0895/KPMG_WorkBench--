import type { ComponentDoc } from '../types';

export const button: ComponentDoc = {
  overview: {
    what:
      'A button triggers an action or submits a form. It comes in six variants (primary, tonal, secondary, outline, text, elevated) and three sizes (small, medium, large), with optional leading and trailing icons.',
    when: [
      'Use a primary button for the single most important action on a view.',
      'Use tonal, secondary or outline buttons for supporting actions, and a text button for low-emphasis actions.',
      'Use an elevated button when the button needs separation from a busy or patterned background.',
      'Use fullWidth when the button should fill its container, such as in narrow layouts.',
    ],
    whenNot: [
      'Do not use a button to navigate to another page; use a link.',
      'Do not use a button for an icon-only action; use IconButton.',
      'Do not use a button for filters, tags or suggestions; use Chip.',
      'Do not use a button when several actions share one trigger; use Menu.',
    ],
    anatomy: [
      { part: 'Container', description: 'Rounded button surface whose fill and outline depend on the variant.' },
      { part: 'Leading icon', description: 'Optional icon before the label (iconLeft or icon).' },
      { part: 'Label', description: 'Short action text.' },
      { part: 'Trailing icon', description: 'Optional icon after the label (iconRight).' },
    ],
  },
  variants: [
    { name: 'Primary', purpose: 'Filled with the brand colour. Use for the single most important action on a view.' },
    { name: 'Tonal', purpose: 'Soft tinted fill. Use for a supporting action next to a primary button.' },
    { name: 'Secondary', purpose: 'Neutral filled style. Use for an alternative action of medium emphasis.' },
    { name: 'Outline', purpose: 'Border with no fill. Use for supporting actions that should not compete with the primary action.' },
    { name: 'Text', purpose: 'No fill or border. Use for low-emphasis actions such as Cancel or inline actions.' },
    { name: 'Elevated', purpose: 'Filled with a shadow. Use when the button must stand out from a busy or patterned background.' },
  ],
  formatting: [
    {
      title: 'Sizing',
      points: [
        'Small (32px) fits dense layouts such as toolbars and table rows.',
        'Medium (40px, default) fits most forms and dialogs.',
        'Large (52px) fits prominent calls to action.',
        'Use fullWidth to fill the container in narrow layouts.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Start the label with a verb and keep it short, for example "Save" or "Add member".',
        'The label never wraps; keep it short enough to fit its container.',
        'Use at most one primary button per view and order the group so the primary action stands out.',
        'Use an icon only when it adds meaning; the icon is decorative and the label carries the name.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'Each variant has a hover and a pressed style while enabled.',
        'onClick fires on click or tap.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'The button is focusable with Tab and activated with Enter or Space.',
        'A visible focus ring shows on keyboard focus.',
      ],
    },
    {
      title: 'States',
      points: [
        'Disabled buttons use the native disabled attribute: they ignore clicks, leave the tab order and show a disabled style.',
        'There is no loading state; show progress elsewhere and disable the button while work runs.',
      ],
    },
  ],
  accessibility: [
    'The component renders a native button element, so it is focusable and activated with Enter or Space.',
    'The type attribute defaults to "button" to avoid accidental form submission; set it to "submit" or "reset" when needed.',
    'Disabled buttons use the native disabled attribute and are removed from the tab order.',
    'Leading and trailing icons are aria-hidden; the label provides the accessible name.',
    'Extra attributes such as aria-label are passed through to the button element.',
  ],
  references: [
    { label: 'IconButton', text: 'Use an icon button for actions without a text label.' },
    { label: 'Chip', text: 'Use a chip for filters, tags and suggestions.' },
    { label: 'Menu', text: 'Use a menu when several actions share one trigger.' },
  ],
};

export default button;
