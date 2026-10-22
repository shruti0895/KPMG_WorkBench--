import type { ComponentDoc } from '../types';

export const menu: ComponentDoc = {
  overview: {
    what:
      'A menu is a temporary surface that presents a list of choices or actions when the user opens it. The family includes a base menu, dropdown, navigation, overflow and assistant menus, built from items, groups and dividers.',
    when: [
      'Dropdown menu: let users choose one or more options from a set, with item or checklist rows.',
      'Overflow menu: collect secondary actions behind a three-dot trigger.',
      'Navigation menu: switch between areas of the product.',
      'Assistant menu: start AI assistant actions with attach, voice and send controls.',
      'Avoid menus for primary actions that should always be visible; use buttons instead.',
    ],
    anatomy: [
      { part: 'Trigger', description: 'The button, pill or icon that opens and closes the menu.' },
      { part: 'Panel', description: 'The popover container, positioned by placement, with optional header and elevation.' },
      { part: 'Group', description: 'Optional titled set of related items.' },
      { part: 'Item', description: 'A row with optional prefix, label, description, badge, action button or suffix.' },
      { part: 'Divider', description: 'A rule between groups of items.' },
    ],
  },
  accessibility: [
    'The panel has role="menu"; groups use role="group" and dividers use role="separator".',
    'Triggers of the dropdown, navigation, overflow and assistant menus set aria-haspopup="menu" and aria-expanded to show the open state.',
    'Items are native buttons that can be focused with Tab; checklist items expose aria-checked and disabled items set aria-disabled and leave the tab order.',
    'Inside the panel, ArrowDown and ArrowUp move focus between enabled items and wrap around; Home and End jump to the first and last item.',
    'Escape and a click outside close the menu.',
    'Icon-only triggers and assistant controls carry aria-label values; decorative icons are aria-hidden.',
  ],
  references: [
    { label: 'IconButton', text: 'Icon buttons are common triggers for overflow menus.' },
    { label: 'List', text: 'Use a list for content that stays on the page.' },
    { label: 'Button', text: 'Use a button for a single action.' },
    { label: 'Tooltip', text: 'Use a tooltip to label an icon-only trigger.' },
  ],
};

export default menu;
