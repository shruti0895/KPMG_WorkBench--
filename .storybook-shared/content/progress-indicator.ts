import type { ComponentDoc } from '../types';

export const progressIndicator: ComponentDoc = {
  overview: {
    what:
      'A progress indicator shows how far a task has advanced or that work is in progress. It is available as a linear bar or a circle, in determinate (0 to 100 percent) or indeterminate form, and in large, medium and small sizes.',
    when: [
      'Determinate: show known progress, such as an upload or a step in a flow.',
      'Indeterminate: show that something is loading when the duration is unknown.',
      'Use linear for tasks inside a page, card or dialog, and circular for compact or centred loading states.',
      'Add a label, percentage and subtext to explain what is progressing.',
    ],
    whenNot: [
      "Very short waits: show nothing, or use inline feedback, instead.",
      "A value the user sets or adjusts, such as volume: use a slider instead.",
      "A choice between sections or views: use tabs instead.",
      "Reporting the result of a finished task: use a snackbar or banner instead.",
    ],
    anatomy: [
      { part: 'Header', description: 'Linear only: optional label and percentage value above the bar.' },
      { part: 'Track and fill', description: 'The bar or ring and its filled portion; indeterminate animates a looping segment.' },
      { part: 'Centre value', description: 'Circular only: percentage text inside the ring in large and medium sizes.' },
      { part: 'Label and subtext', description: 'Optional text describing the task, below the bar or beside the ring.' },
    ],
  },
  variants: [
    { name: "Linear", purpose: "A horizontal bar. Use it inside a page, card or dialog, where there is width to spare. It supports a label and percentage above the bar and subtext below it." },
    { name: "Circular", purpose: "A ring with the label and subtext beside it. Use it for compact or centred loading states and for small status indicators." },
    { name: "Determinate", purpose: "Fills from 0 to 100 percent. Use it when the amount of work is known, such as an upload or a step in a flow." },
    { name: "Indeterminate", purpose: "Animates a looping segment with no value. Use it when the duration is unknown." },
    { name: "Large, medium and small (circular)", purpose: "88px, 48px and 24px rings. Use large for a main loading state, medium inside cards, and small next to text or in a list row. The percentage inside the ring shows in large and medium only." },
  ],
  formatting: [
    {
      title: "Sizing",
      points: [
        "The linear bar is 4px high and fills the width of its container; control the width with the container.",
        "Size applies to the circular variant. The linear variant has one size.",
      ],
    },
    {
      title: "Content",
      points: [
        "Write a label that names what is progressing, such as \"Uploading file\", and keep it short.",
        "Use subtext for detail that changes, such as the number of files or the time left.",
        "Set showValue for determinate progress when users need the exact figure. It is not shown for indeterminate progress.",
      ],
    },
    {
      title: "Placement",
      points: [
        "Put the indicator next to the content it describes. For a task that blocks a section, show it in place of that section.",
      ],
    },
  ],
  behaviors: [
    {
      title: "States",
      points: [
        "Determinate: progress is clamped between 0 and 100 and rounded for display.",
        "Indeterminate: the bar or ring animates continuously until you remove it. There is no value, and no completion state.",
        "The component is not interactive. It has no hover, focus or pressed state and takes no keyboard input.",
        "It does not change when progress reaches 100; replace or remove it, and report the result, in the page.",
      ],
    },
  ],
  accessibility: [
    'The container has role="progressbar" with aria-valuemin 0 and aria-valuemax 100.',
    'aria-valuenow carries the rounded percentage for determinate progress and is omitted when indeterminate.',
    'The accessible name comes from aria-label, then the label text if it is a string, then a generic fallback; provide a specific label.',
    'Progress is also shown as text when showValue is set, so the value does not rely on the bar alone.',
    'The component does not set a live region, so value changes are not announced automatically.',
  ],
  references: [
    { label: 'FileUploader', text: 'Pair with the file uploader to show upload progress.' },
    { label: 'Modal', text: 'Modals use a linear progress indicator to show the current step.' },
    { label: 'Snackbar', text: 'Use a snackbar to report the result when the task completes.' },
  ],
};

export default progressIndicator;
