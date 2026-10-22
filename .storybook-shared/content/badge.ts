import type { ComponentDoc } from '../types';

export const badge: ComponentDoc = {
  overview: {
    what:
      'A badge is a small indicator that shows a count, a short label or a status dot. It can be used on its own or anchored to the corner of another element such as a button, icon or avatar.',
    when: [
      'Show an unread or pending count on an icon, tab or avatar.',
      'Show a dot to signal that something is new without giving a number.',
      'Use the primary style for brand emphasis and the neutral style for lower-priority information; quiet is a subtle tint and loud is a high-contrast fill.',
      'Counts above the maximum (99 by default) are shown as "99+"; a count of zero is hidden unless showZero is set.',
      'Avoid badges for interactive actions or long text; use a chip or a button instead.',
    ],
    anatomy: [
      { part: 'Container', description: 'Small rounded shape in small (6px dot), medium (16px) or large (24px) size.' },
      { part: 'Content', description: 'Count or short label; omitted for the dot.' },
      { part: 'Anchor element', description: 'Optional wrapped child. The badge is placed at the top-right, top-left, bottom-right or bottom-left corner.' },
    ],
  },
  accessibility: [
    'A badge with an accessible name is given role="status" and an aria-label.',
    'The label defaults to "N notifications" for counts, the label text for text badges and "New notification" for dots; pass aria-label to override it.',
    'Pass a more specific aria-label when the default is not accurate for the context.',
    'The badge is not focusable; keyboard behaviour comes from the element it is attached to.',
    'Primary and neutral, quiet and loud styles differ in contrast, so do not rely on colour alone to convey meaning; include text or a count.',
  ],
  references: [
    { label: 'Chip', text: 'Use a chip when the element must be interactive.' },
    { label: 'IconButton', text: 'A common anchor for a badge to show notifications.' },
    { label: 'Tab', text: 'Badges can annotate tabs with counts.' },
  ],
};

export default badge;
