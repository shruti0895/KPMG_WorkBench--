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
    ],
    whenNot: [
      'Primary or standalone actions: use a Button.',
      'Long text or multi-line content: use a List item or a Card.',
      'Counts or status that users cannot interact with: use a Badge.',
      'Choosing from many options: use a Menu.',
    ],
    anatomy: [
      { part: 'Container', description: 'Rounded pill with a 1px outline or an elevation shadow, depending on style.' },
      { part: 'Leading icon', description: 'Optional icon or branded document icon; filter chips show a checkmark when selected.' },
      { part: 'Label', description: 'Short text describing the chip.' },
      { part: 'Trailing icon', description: 'Optional icon, such as a dismiss (×) on input chips.' },
    ],
  },
  variants: [
    { name: 'Filter', purpose: 'Toggles a filter on or off to refine a list. A selected filter chip shows a leading checkmark and uses checkbox semantics.' },
    { name: 'Input', purpose: 'Represents something the user entered or attached, such as a tag or file. Add onDelete to show a removable trailing dismiss button.' },
    { name: 'Assistive', purpose: 'Offers a contextual action. It behaves as a button.' },
    { name: 'Suggestion', purpose: 'Offers a short, optional prompt the user can pick with one click. It behaves as a button.' },
    { name: 'Outlined style', purpose: '1px border on a flat surface. The default; works on busy or tinted backgrounds.' },
    { name: 'Elevated style', purpose: 'Shadow instead of a border. Use it to lift chips off a plain background; keep one style within a group.' },
  ],
  formatting: [
    {
      title: 'Content',
      points: [
        'Keep labels to one or two words; the label never wraps.',
        'Use sentence case and keep chips in a group parallel in wording.',
        'Use an icon-only chip (iconOnly) only for a well-known icon, and always give it an aria-label.',
      ],
    },
    {
      title: 'Sizing and layout',
      points: [
        'A chip is 32px high and as wide as its content; lay chips out in a row that wraps.',
        'Use a leading icon for meaning, such as the selected checkmark or a branded document, and a trailing icon for dismissal.',
        'Do not mix chip types in one group.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'Clicking the chip calls onClick. A chip without onClick has no role and no click behaviour, but is still focusable.',
        'When onDelete or onTrailingClick is set, the trailing icon is a separate button ("Remove <label>"); clicking it does not trigger the chip click.',
        'Hover and press change the background; selected chips use a stronger tint.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'Tab focuses the chip, and Enter or Space activates it like a click.',
        'The trailing button is a second tab stop and is activated like any native button.',
        'A focus ring appears for keyboard focus.',
      ],
    },
    {
      title: 'States',
      points: [
        'The chip does not toggle itself: keep selected in your own state and update it from onClick.',
        'Disabled chips ignore clicks and key presses, are removed from the tab order and use muted colours.',
      ],
    },
  ],
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
