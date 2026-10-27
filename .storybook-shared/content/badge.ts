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
    ],
    whenNot: [
      'Do not use a badge as an interactive control; use a Chip or a Button.',
      'Do not use a badge for long text; use a Chip or put the text in the surrounding content.',
      'Do not use a badge to deliver a message or status explanation; use Message or Banner.',
    ],
    anatomy: [
      { part: 'Container', description: 'Small rounded shape in small (6px dot), medium (16px) or large (24px) size.' },
      { part: 'Content', description: 'Count or short label; omitted for the dot.' },
      { part: 'Anchor element', description: 'Optional wrapped child. The badge is placed at the top-right, top-left, bottom-right or bottom-left corner.' },
    ],
  },
  variants: [
    { name: 'Small', purpose: 'A 6px dot with no content. Use it to signal that something is new without giving a number.' },
    { name: 'Medium', purpose: 'A 16px pill with a count or short label. Use it for counts on icons, tabs and avatars.' },
    { name: 'Large', purpose: 'A 24px pill with a count or short label. Use it where the badge stands on its own or needs more prominence.' },
    { name: 'Primary', purpose: 'Brand colour. Use it for the information users most need to notice.' },
    { name: 'Neutral', purpose: 'Grey colour. Use it for lower-priority information.' },
    { name: 'Loud', purpose: 'High-contrast fill. Use it when the badge must stand out.' },
    { name: 'Quiet', purpose: 'Subtle tint. Use it when the badge should support, not compete with, nearby content.' },
  ],
  formatting: [
    {
      title: 'Content',
      points: [
        'Keep labels to a few characters; a number or a one-word label fits best.',
        'Counts above maxCount (99 by default) display as "99+".',
        'A count of zero renders nothing unless showZero is set.',
        'The small size always renders as a dot, even if a count or label is passed.',
      ],
    },
    {
      title: 'Placement',
      points: [
        'Wrap the element to annotate; the badge sits at the top-right corner by default.',
        'Use placement to move it to top-left, bottom-right or bottom-left when the corner collides with other content.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'States',
      points: [
        'A badge is display only: it has no hover, pressed, focus or disabled state and no click handler.',
        'Any interaction comes from the wrapped element, such as an icon button or tab.',
      ],
    },
  ],
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
