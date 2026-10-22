import type { ComponentDoc } from '../types';

export const slider: ComponentDoc = {
  overview: {
    what:
      'A slider lets the user choose a numeric value from a range by dragging a thumb along a track. It comes in continuous and discrete variants and can show a value indicator and tick marks.',
    when: [
      'Continuous: pick an approximate value where precision is not important, such as volume or opacity.',
      'Discrete: pick one value from a fixed set of steps, optionally with tick marks.',
      'Show the value indicator when the user needs to see the exact value while dragging.',
      'Avoid sliders when an exact value must be typed; use a text field instead.',
      'Avoid sliders for choosing between a few named options; use radio buttons or a menu instead.',
    ],
    anatomy: [
      { part: 'Label and subtext', description: 'Optional text above the track that names the control and gives supporting detail.' },
      { part: 'Track', description: 'Background bar with a filled portion up to the current value.' },
      { part: 'Ticks', description: 'Optional step marks on the discrete variant; marks at or below the value are shown as active.' },
      { part: 'Thumb', description: 'Draggable handle, with an optional icon.' },
      { part: 'Value indicator', description: 'Optional badge with an arrow above the thumb that shows the current value.' },
    ],
  },
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
