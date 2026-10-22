import type { ComponentDoc } from '../types';

export const snackbar: ComponentDoc = {
  overview: {
    what:
      'A snackbar shows a brief, non-blocking message about a process that has happened or is happening. It comes in several sizes, in elevated or outlined style, and can include an action, a close button and an auto-hide timer.',
    when: [
      'Confirm the result of a user action, such as saving or sending.',
      'Offer one optional follow-up action, such as Undo, with the message.',
      'Use the larger sizes when a header, description or a short list of media items is needed.',
      'Avoid snackbars for errors or decisions that block the user; use a modal or a banner instead.',
      'Avoid snackbars for persistent information; use a message or banner instead.',
    ],
    anatomy: [
      { part: 'Container', description: 'Elevated or outlined surface, sized by the size prop.' },
      { part: 'Header', description: 'Optional bold title in the larger sizes.' },
      { part: 'Message or description', description: 'The text of the notification.' },
      { part: 'Media items', description: 'Optional list of items with thumbnail, title, subtitle and a more-options button in the extended-media size.' },
      { part: 'Action', description: 'Optional text button, such as Undo.' },
      { part: 'Close button', description: 'Optional dismiss button, shown when closeable is set.' },
    ],
  },
  accessibility: [
    'The snackbar has role="status" by default; the role prop can be set to "alert" for urgent messages. The text-bearing sizes also set aria-live="polite".',
    'The close button has the accessible name "Dismiss notification" and the media options button is named "More media options".',
    'The auto-hide timer pauses while the pointer is over the snackbar. Keyboard users get no pause, so use a long duration or no auto-hide for messages that contain an action.',
    'Message text is always visible; icons are hidden with aria-hidden and do not carry meaning alone.',
  ],
  references: [
    { label: 'Banner', text: 'Use a banner for persistent messages at the top of a page or section.' },
    { label: 'Message', text: 'Use a message for inline status within content.' },
    { label: 'Modal', text: 'Use a modal when the user must respond before continuing.' },
    { label: 'Button', text: 'The snackbar action follows text button behaviour.' },
  ],
};

export default snackbar;
