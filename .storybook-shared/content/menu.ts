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
    ],
    whenNot: [
      "Primary actions that should always be visible: use a button instead.",
      "A single action: use a button or icon button instead.",
      "Content that stays on the page, such as a set of rows to browse or select: use a list instead.",
      "Switching between views of the same content: use tabs instead.",
    ],
    anatomy: [
      { part: 'Trigger', description: 'The button, pill or icon that opens and closes the menu.' },
      { part: 'Panel', description: 'The popover container, positioned by placement, with optional header and elevation.' },
      { part: 'Group', description: 'Optional titled set of related items.' },
      { part: 'Item', description: 'A row with optional prefix, label, description, badge, action button or suffix.' },
      { part: 'Divider', description: 'A rule between groups of items.' },
    ],
  },
  variants: [
    { name: "Dropdown menu", purpose: "Choose from a set of options. Rows are either checklist items for multiple selection or item rows with a leading icon and a trailing checkmark on the selected row." },
    { name: "Overflow menu", purpose: "Secondary actions behind a three-dot trigger, in large or small trigger size. Use it where space is tight, such as in a toolbar or a row of actions." },
    { name: "Navigation menu", purpose: "Moves between areas of the product from a brand pill trigger. Items can have sub-items and the active item is marked." },
    { name: "Assistant menu", purpose: "Starts assistant tasks. It combines a search field with attach, voice and send controls, a verification note, assistant cards and a call to action." },
    { name: "Small, medium and large density", purpose: "Row height of items. Use small for long lists, medium by default and large when rows carry a description. The navigation menu uses its own row height." },
    { name: "Item types", purpose: "Item: plain row. Checklist: row with a circular checkbox for multiple selection. Icon: row with a leading icon and a trailing checkmark when selected. Navigation: row for moving between areas." },
    { name: "Item add-ons", purpose: "Description for a second line, badge for a count or status, action button for a secondary action inside the row, and error or destructive styling for risky actions." },
  ],
  formatting: [
    {
      title: "Placement",
      points: [
        "Place the menu next to its trigger. Choose bottom or top and left, right or center alignment with placement (bottom-left is the default), so the panel stays inside the viewport; the menu does not reposition itself.",
        "Use the inline option to render the panel in the page flow, without a trigger or dismiss behaviour.",
      ],
    },
    {
      title: "Content",
      points: [
        "Keep item labels short and start with a verb for actions, such as \"Rename\" or \"Delete\".",
        "Order items by how often they are used and separate groups with a divider or a titled group.",
        "Use destructive or error styling only for items that remove data, and place them last.",
        "Keep menus short. Long labels are shortened with an ellipsis in single-line items.",
      ],
    },
    {
      title: "Sizing",
      points: [
        "Set a width on the panel when labels or descriptions need more room; otherwise the panel sizes to the menu type.",
        "Use one density within a menu.",
      ],
    },
  ],
  behaviors: [
    {
      title: "Mouse and touch",
      points: [
        "Clicking the trigger opens and closes the menu. Clicking outside the panel closes it.",
        "Selecting an item calls onSelect and, by default, closes the menu (closeOnSelect). Overflow menus stay open after a selection unless closeOnSelect is set, so checklist items can be changed one after another.",
        "Items show hover and pressed backgrounds; selected items show a darker background on hover.",
      ],
    },
    {
      title: "Keyboard and focus",
      points: [
        "The trigger opens and closes the menu with Enter or Space.",
        "Inside the panel, ArrowDown and ArrowUp move focus between enabled items and wrap around; Home and End go to the first and last item.",
        "Escape closes the menu. Focus is not moved into the panel when it opens and is not returned to the trigger when it closes.",
        "Type-ahead search by letter is not supported.",
        "Items show a focus ring when focused with the keyboard.",
      ],
    },
    {
      title: "States",
      points: [
        "Disabled items are dimmed, ignore clicks and are skipped by arrow-key navigation.",
        "Error and destructive items use error colours, including on hover.",
        "The overflow trigger can be disabled; it then does not open.",
        "Selected state is set by the page or by the dropdown item group; checklist items expose it as aria-checked.",
      ],
    },
  ],
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
