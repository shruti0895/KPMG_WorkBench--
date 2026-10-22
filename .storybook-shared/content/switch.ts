import type { ComponentDoc } from '../types';

export const switchDoc: ComponentDoc = {
  overview: {
    what:
      'A switch turns a single setting on or off and takes effect immediately. It can show an icon in the thumb, a label and helper text, and the label can be placed before or after the track.',
    when: [
      'Turn a setting on or off where the change applies right away, such as enabling notifications.',
      'Use the label and helper text to say what the setting controls.',
      'Avoid switches in forms that are submitted later; use a checkbox instead.',
      'Avoid switches for choosing between more than two options; use radio buttons or a menu instead.',
    ],
    anatomy: [
      { part: 'Track', description: 'Pill-shaped control that changes appearance between on and off.' },
      { part: 'Thumb', description: 'Circle that moves along the track to show the state.' },
      { part: 'Icon', description: 'Optional check (on) or dismiss (off) icon inside the thumb.' },
      { part: 'Label', description: 'Text naming the setting, placed at the start or end of the track.' },
      { part: 'Helper text', description: 'Optional supporting text below the label.' },
    ],
  },
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
