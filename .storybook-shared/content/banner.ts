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
      'Avoid banners for short-lived feedback; use a snackbar. Use a modal when the user must respond before continuing.',
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
