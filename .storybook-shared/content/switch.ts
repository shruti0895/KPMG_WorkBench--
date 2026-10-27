import type { ComponentDoc } from '../types';

export const switchDoc: ComponentDoc = {
  overview: {
    what:
      'A switch turns a single setting on or off and takes effect immediately. It can show an icon in the thumb, a label and helper text, and the label can be placed before or after the track.',
    when: [
      'Turn a setting on or off where the change applies right away, such as enabling notifications.',
      'Use the label and helper text to say what the setting controls.',
    ],
    whenNot: [
      'Do not use a switch in a form that is submitted later; use a Checkbox instead.',
      'Do not use a switch to choose between more than two options; use a Menu instead.',
      'Do not use a switch to trigger an action; use a Button instead.',
      'Do not use a switch to toggle a filter on a list; use a filter Chip instead.',
    ],
    anatomy: [
      { part: 'Track', description: 'Pill-shaped control that changes appearance between on and off.' },
      { part: 'Thumb', description: 'Circle that moves along the track to show the state.' },
      { part: 'Icon', description: 'Optional check (on) or dismiss (off) icon inside the thumb.' },
      { part: 'Label', description: 'Text naming the setting, placed at the start or end of the track.' },
      { part: 'Helper text', description: 'Optional supporting text below the label.' },
    ],
  },
  variants: [
    { name: 'Without icon', purpose: 'Plain thumb. Use it by default; on and off are told apart by thumb position and track colour.' },
    { name: 'With icon', purpose: 'Shows a check in the thumb when on and a dismiss mark when off (icon prop). Use it when the state should be clearer without relying on colour. Custom icons can replace the defaults.' },
    { name: 'Label at end or start', purpose: 'The label sits after the track by default (labelPlacement end). Use start when the switch is right-aligned in a row, such as a settings list.' },
  ],
  formatting: [
    {
      title: 'Labels',
      points: [
        'Name the setting, not the action: "Notifications" rather than "Turn on notifications".',
        'Keep labels short and make sure the label reads correctly in both the on and off state.',
        'Use helper text for a short explanation of what the setting changes.',
      ],
    },
    {
      title: 'Behaviour of the setting',
      points: [
        'Apply the change immediately when the switch is toggled; do not wait for a Save button.',
        'Use one switch per setting. Group related switches in a list with consistent label placement.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse',
      points: [
        'Clicking the track or the label and helper text toggles the switch.',
        'Hover and pressed styles are applied to the track, thumb and icon; while pressed the thumb expands.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'The track is a button reached with Tab. Space toggles it, and Enter toggles it through the native button.',
        'A focus ring is shown for keyboard focus.',
      ],
    },
    {
      title: 'States',
      points: [
        'Disabled switches are dimmed, use disabled colours, ignore clicks and keys, and are removed from the tab order.',
        'The component works controlled (checked) or uncontrolled (defaultChecked). onChange receives the new checked value and the event.',
        'When name is set, a hidden input submits value (or "on") when the switch is on and an empty value when it is off.',
      ],
    },
  ],
  accessibility: [
    'The track is a button with role="switch" and aria-checked that reflects the on or off state.',
    'The accessible name comes from aria-label, aria-labelledby or the label text; aria-describedby is supported for helper text.',
    'The switch is focusable and toggles with Space (and Enter, through the native button). Clicking the label also toggles it.',
    'Disabled switches set aria-disabled and are removed from the tab order.',
    'On and off are distinguished by thumb position and the optional icon, not by colour alone.',
  ],
  references: [
    { label: 'Checkbox', text: 'Use a checkbox for choices that are saved on submit.' },
    { label: 'Chip', text: 'Use a filter chip to toggle a filter on a list.' },
    { label: 'Button', text: 'Use a button to trigger an action rather than set a state.' },
  ],
};

export default switchDoc;
