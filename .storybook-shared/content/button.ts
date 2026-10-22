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
      'Avoid buttons for navigation to another page; use a link. For icon-only actions use an icon button.',
    ],
    anatomy: [
      { part: 'Container', description: 'Rounded button surface whose fill and outline depend on the variant.' },
      { part: 'Leading icon', description: 'Optional icon before the label (iconLeft or icon).' },
      { part: 'Label', description: 'Short action text.' },
      { part: 'Trailing icon', description: 'Optional icon after the label (iconRight).' },
    ],
  },
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
