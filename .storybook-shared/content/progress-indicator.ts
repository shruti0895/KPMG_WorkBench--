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
      'Avoid it for very short waits; show nothing or use inline feedback instead.',
    ],
    anatomy: [
      { part: 'Header', description: 'Linear only: optional label and percentage value above the bar.' },
      { part: 'Track and fill', description: 'The bar or ring and its filled portion; indeterminate animates a looping segment.' },
      { part: 'Centre value', description: 'Circular only: percentage text inside the ring in large and medium sizes.' },
      { part: 'Label and subtext', description: 'Optional text describing the task, below the bar or beside the ring.' },
    ],
  },
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
