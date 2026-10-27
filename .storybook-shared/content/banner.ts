import type { ComponentDoc } from '../types';

export const banner: ComponentDoc = {
  overview: {
    what:
      'A banner displays a prominent message at the top of a screen or container, such as a status update, configuration progress or system alert, without interrupting what the user is doing.',
    when: [
      'Report ongoing or completed work, such as configuring or saving, optionally with a progress bar.',
      'Surface a persistent message in one of six variants: primary, neutral, info, success, warning or critical.',
      'Use the animated state for work in progress and the default state for static messages.',
      'Add an action or a dismiss button when the user can respond to or clear the message.',
    ],
    whenNot: [
      'Do not use a banner for short-lived feedback; use a Snackbar.',
      'Do not use a banner when the user must respond before continuing; use a Modal.',
      'Do not use a banner for feedback tied to one piece of content; use Message inline.',
      'Do not use a banner only to show progress; use ProgressIndicator.',
    ],
    anatomy: [
      { part: 'Container', description: 'Full-width surface coloured by variant, with a static or animated gradient state.' },
      { part: 'Leading icon', description: 'Icon at the start; a robot icon by default, optionally clickable.' },
      { part: 'Title', description: 'Primary status message.' },
      { part: 'Detail', description: 'Secondary text or percentage, such as "30%".' },
      { part: 'Progress bar', description: 'Determinate (0 to 100) or indeterminate linear bar.' },
      { part: 'Action', description: 'Optional custom action area on the right.' },
      { part: 'Dismiss button', description: 'Close button that calls onClose.' },
    ],
  },
  variants: [
    { name: 'Primary', purpose: 'Brand-coloured default. Use it for general status, such as assistant or configuration progress.' },
    { name: 'Neutral', purpose: 'Low-emphasis information that is not urgent.' },
    { name: 'Info', purpose: 'Helpful information the user should know about.' },
    { name: 'Success', purpose: 'A completed action or a positive outcome.' },
    { name: 'Warning', purpose: 'A condition that needs attention but is not blocking.' },
    { name: 'Critical', purpose: 'An error or a blocking problem. It uses role="alert" so it is announced immediately.' },
    { name: 'Default state', purpose: 'A static banner for messages that do not change.' },
    { name: 'Animated state', purpose: 'An ambient moving gradient. Use it while work is in progress; without a progress value it shows an indeterminate bar.' },
  ],
  formatting: [
    {
      title: 'Placement',
      points: [
        'Place a banner at the top of the screen or container it applies to, spanning the full width.',
        'Show one banner at a time; do not stack several banners.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Write a short title that states the status, and use detail for a percentage or one short supporting phrase.',
        'Use progress (0 to 100) for known progress and progressType="indeterminate" when the duration is unknown.',
        'Provide an action only for a single, relevant next step.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'The dismiss button calls onClose; the banner does not remove itself, so the consumer must hide it.',
        'When onIconClick is set, the leading icon shows a pointer cursor and hover background and calls the handler.',
      ],
    },
    {
      title: 'Keyboard',
      points: [
        'The dismiss button is a native button, reached with Tab and activated with Enter or Space.',
        'The clickable leading icon is focusable but has no key handler, so Enter and Space do not activate it. There is no Escape handling.',
      ],
    },
    {
      title: 'States',
      points: [
        'Progress updates as the progress prop changes; the banner announces politely through aria-live.',
      ],
    },
  ],
  accessibility: [
    'The banner uses role="status" with aria-live="polite" by default; the critical variant uses role="alert". Both can be overridden with role and ariaLive.',
    'The progress bar has role="progressbar" with aria-valuemin, aria-valuemax, an aria-label based on the title and aria-valuenow for determinate progress only.',
    'The dismiss button is a native button with aria-label="Dismiss banner" and is reachable by keyboard.',
    'When the leading icon is clickable it gets role="button" and tabIndex 0, but it has no key handler, so it does not respond to Enter or Space on its own.',
    'Variants are conveyed by title text and icon as well as colour; keep the title meaningful for each variant.',
  ],
  references: [
    { label: 'Message', text: 'Use a message for inline feedback within content.' },
    { label: 'Snackbar', text: 'Use a snackbar for brief, temporary confirmations.' },
    { label: 'ProgressIndicator', text: 'Use a standalone progress indicator when no message is needed.' },
    { label: 'Modal', text: 'Use a modal when a decision is required.' },
  ],
};

export default banner;
