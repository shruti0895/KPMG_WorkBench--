import type { ComponentDoc } from '../types';

export const chip: ComponentDoc = {
  overview: {
    what:
      'A chip is a compact, interactive element that represents an input, a filter, a suggestion or an assistive action. Chips come in four types (filter, input, assistive, suggestion) and two styles (outlined, elevated).',
    when: [
      'Filter chips: toggle a filter on or off to refine a list or result set.',
      'Input chips: represent a discrete piece of user input, such as a tag or an attached file, that can be removed.',
      'Assistive chips: offer a smart action related to the current context.',
      'Suggestion chips: offer a short, optional prompt the user can pick with one tap.',
      'Avoid chips for primary actions or long text; use a button or a list item instead.',
    ],
    anatomy: [
      { part: 'Container', description: 'Rounded pill with a 1px outline or an elevation shadow, depending on style.' },
      { part: 'Leading icon', description: 'Optional icon or branded document icon; filter chips show a checkmark when selected.' },
      { part: 'Label', description: 'Short text describing the chip.' },
      { part: 'Trailing icon', description: 'Optional icon, such as a dismiss (×) on input chips.' },
    ],
  },
  accessibility: [
    'Interactive chips are focusable and activated with Enter or Space; disabled chips are removed from the tab order.',
    'Selected state is exposed to assistive technology (aria-pressed / aria-selected for filter chips).',
    'Icon-only chips need an accessible name (aria-label), because there is no visible label.',
    'Selected and unselected states are distinguished by more than colour (fill and checkmark).',
  ],
  references: [
    { label: 'Button', text: 'Use a button for primary or standalone actions.' },
    { label: 'Badge', text: 'Use a badge for counts or status, not for interaction.' },
    { label: 'Menu', text: 'Use a menu when there are more options than fit as chips.' },
  ],
};

export default chip;
