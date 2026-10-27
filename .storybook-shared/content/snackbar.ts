import type { ComponentDoc } from '../types';

export const snackbar: ComponentDoc = {
  overview: {
    what:
      'A snackbar shows a brief, non-blocking message about a process that has happened or is happening. It comes in several sizes, in elevated or outlined style, and can include an action, a close button and an auto-hide timer.',
    when: [
      'Confirm the result of a user action, such as saving or sending.',
      'Offer one optional follow-up action, such as Undo, with the message.',
      'Use the larger sizes when a header, description or a short list of media items is needed.',
    ],
    whenNot: [
      'Do not use a snackbar for errors or decisions that block the user; use a Modal instead.',
      'Do not use a snackbar for persistent information; use a Banner for page-level messages or a Message for inline status.',
      'Do not rely on a snackbar for the only record of important information, because it can disappear.',
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
  variants: [
    { name: 'Single-line', purpose: 'One line of text, with an optional action and close button. Use it for a short confirmation such as "Saved".' },
    { name: 'Two-line', purpose: 'Same content as single-line in a taller container. Use it when the message is slightly longer and needs a second line.' },
    { name: 'Extended', purpose: 'Longer description text with an optional action. Use it when the message needs a sentence or two of explanation.' },
    { name: 'Extended with header', purpose: 'Adds a bold header above the description. Use it when the message needs a clear title as well as detail.' },
    { name: 'Extended with media', purpose: 'Header, optional description and up to a short list of media items, each with a thumbnail, title, subtitle and more-options button. Use it to confirm or summarise a few files or items.' },
    { name: 'Elevated and outlined', purpose: 'Elevated (default) uses a shadow; outlined (outlined prop) uses a border. Pick one style and use it consistently; the choice does not change behaviour.' },
  ],
  formatting: [
    {
      title: 'Content',
      points: [
        'Write the message as a plain statement of what happened, for example "Document saved". Keep single-line messages to one short sentence.',
        'Use at most one action, and make its label a verb such as Undo.',
        'Move to a larger size only when the message needs a title, more text or media items.',
      ],
    },
    {
      title: 'Placement',
      points: [
        'Render snackbars inside SnackbarContainer, which fixes them to a corner or edge of the viewport. Positions are bottom-left (default), bottom-center, bottom-right, top-left, top-center and top-right.',
        'Use the same position across the product.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse',
      points: [
        'The action button calls onAction. The close button hides the snackbar and calls onClose.',
        'When autoHideDuration is set, the snackbar closes after that time. Hovering it stops the timer, and leaving restarts the full duration. Without autoHideDuration it stays until closed.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'The action, close and media options buttons are native buttons, reachable with Tab and activated with Enter or Space.',
        'There is no Escape handler, focus is not moved to the snackbar when it appears, and the auto-hide timer does not pause on keyboard focus.',
      ],
    },
    {
      title: 'States',
      points: [
        'Buttons and media items show hover backgrounds, and the action and close buttons show a focus ring.',
        'The close button is shown by default; set closeable to false to remove it. Use SnackbarProvider and useSnackbar to show and hide snackbars from code.',
      ],
    },
  ],
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
