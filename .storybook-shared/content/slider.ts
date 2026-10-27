import type { ComponentDoc } from '../types';

export const slider: ComponentDoc = {
  overview: {
    what:
      'A slider lets the user choose a numeric value from a range by dragging a thumb along a track. It comes in continuous and discrete variants and can show a value indicator and tick marks.',
    when: [
      'Continuous: pick an approximate value where precision is not important, such as volume or opacity.',
      'Discrete: pick one value from a fixed set of steps, optionally with tick marks.',
      'Show the value indicator when the user needs to see the exact value while dragging.',
    ],
    whenNot: [
      'Do not use a slider when an exact value must be typed; use a text input instead.',
      'Do not use a slider to choose between a few named options; use a Menu instead.',
      'Do not use a slider for an on or off setting; use a Switch instead.',
      'Do not use a slider to show progress the user does not control; use a ProgressIndicator instead.',
    ],
    anatomy: [
      { part: 'Label and subtext', description: 'Optional text above the track that names the control and gives supporting detail.' },
      { part: 'Track', description: 'Background bar with a filled portion up to the current value.' },
      { part: 'Ticks', description: 'Optional step marks on the discrete variant; marks at or below the value are shown as active.' },
      { part: 'Thumb', description: 'Draggable handle, with an optional icon.' },
      { part: 'Value indicator', description: 'Optional badge with an arrow above the thumb that shows the current value.' },
    ],
  },
  variants: [
    { name: 'Continuous', purpose: 'Picks an approximate value anywhere in the range, in steps of 1 by default, with no tick marks. Use it for volume, opacity or similar values where precision is not important.' },
    { name: 'Discrete', purpose: 'Snaps to fixed steps (10 by default, set with step) and shows tick marks for them. Use it when only specific values are valid and the user should see how many there are.' },
  ],
  formatting: [
    {
      title: 'Range and steps',
      points: [
        'Set min and max (0 and 100 by default) so the range matches the values the user can actually choose.',
        'Set step on the discrete variant so every tick is a meaningful value. Ticks can be turned on or off with showTicks on either variant.',
        'The value is clamped to the range; a value outside min and max is shown at the nearest end.',
      ],
    },
    {
      title: 'Label and value',
      points: [
        'Use a short label that names what the slider controls, and subtext for units or supporting detail.',
        'Turn on the value indicator when the exact value matters. It shows the current value rounded to a whole number.',
        'Without a label the accessible name falls back to "Slider", so always pass a label or aria-label.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'Drag the thumb, or click or tap the track, to change the value. The native range input covers the whole control.',
        'onChange is called with the event and the new numeric value on every change while dragging.',
        'The thumb enlarges only when the state prop is set to hovered or pressed; pointer hover alone does not change its size.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'The slider takes focus with Tab. The arrow keys, Home, End, Page Up and Page Down adjust the value, as for a native range input.',
        'A focus ring is drawn around the thumb for keyboard focus only (focus-visible).',
      ],
    },
    {
      title: 'States',
      points: [
        'Disabled sliders are dimmed, use the not-allowed cursor, show the fill in grey and cannot be focused or changed.',
        'The component works controlled (value) or uncontrolled (defaultValue, 50 by default).',
      ],
    },
  ],
  accessibility: [
    'The control is a native range input, so it is focusable and supports keyboard adjustment with the arrow keys, Home, End, Page Up and Page Down.',
    'The input exposes aria-valuenow, aria-valuemin and aria-valuemax, and takes its accessible name from aria-label or, if absent, the label text.',
    'Disabled sliders are disabled on the native input and cannot be focused or changed.',
    'The decorative thumb, ticks and indicator arrow are hidden with aria-hidden; the current value is also shown as visible text when the indicator is on.',
  ],
  references: [
    { label: 'Textarea', text: 'Use form fields such as the textarea when free-form input is needed.' },
    { label: 'Switch', text: 'Use a switch for an on or off setting.' },
    { label: 'ProgressIndicator', text: 'Use a progress indicator to show progress that the user does not control.' },
  ],
};

export default slider;
