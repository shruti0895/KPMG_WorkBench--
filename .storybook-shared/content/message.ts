import type { ComponentDoc } from '../types';

export const message: ComponentDoc = {
  overview: {
    what:
      'A message is a single entry in a conversation with the assistant. It can be a user message or a bot reply, in a default or card layout, with optional headline, body, citations, secondary text that can be expanded, and a row of response actions.',
    when: [
      'Show prompts and replies in a chat or assistant experience.',
      'Use the card layout for richer replies with a headline and supporting content.',
      'Use the expandable secondary text for long replies, so the thread stays compact.',
      'Use the thread and chat window components to lay out several messages.',
      'Avoid it for system feedback; use a snackbar or banner instead.',
    ],
    anatomy: [
      { part: 'Avatar', description: 'Marker shown on bot replies.' },
      { part: 'Headline', description: 'Optional title of the message.' },
      { part: 'Body', description: 'The main message text.' },
      { part: 'Citations', description: 'Numbered references to sources.' },
      { part: 'Secondary text', description: 'Additional text that is shortened when minimized and shown in full when expanded.' },
      { part: 'Expand and minimize toggle', description: 'Button that shows or hides the secondary text.' },
      { part: 'Action bar', description: 'Icon buttons for feedback, read aloud, copy and regenerate.' },
    ],
  },
  accessibility: [
    'The action bar has role="toolbar" with the label "Message actions", and each action button has an aria-label such as "Good response" or "Copy to clipboard".',
    'The expand and minimize toggle is a native button with aria-label "Expand message" or "Minimize message".',
    'Headline is rendered as a heading and the body as a paragraph, so the structure is available to assistive technology.',
    'Citations have role="button" and tabIndex 0 so they can be focused; they do not handle Enter or Space on their own, so avoid relying on keyboard activation of citations.',
    'The message does not set a live region, so new replies are not announced automatically; announce them in the host chat area if needed.',
    'Progress inside the status card exposes a label with the completion percentage.',
  ],
  references: [
    { label: 'IconButton', text: 'Action bar controls follow the icon button pattern.' },
    { label: 'ProgressIndicator', text: 'Progress and status cards show completion with a progress indicator.' },
    { label: 'Snackbar', text: 'Use a snackbar for transient system feedback, not for conversation content.' },
    { label: 'Textarea', text: 'Use a textarea to compose the user prompt.' },
  ],
};

export default message;
