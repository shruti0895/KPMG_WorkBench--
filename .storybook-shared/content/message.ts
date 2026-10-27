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
    ],
    whenNot: [
      "System feedback or confirmation of an action: use a snackbar or banner instead.",
      "Static content that is not part of a conversation: use cards or tiles instead.",
      "Collecting input from the user: use a textarea; messages only display content.",
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
  variants: [
    { name: "Bot reply", purpose: "A response from the assistant. It shows the avatar, citations, attachments, media, a workflow status card and the response action bar." },
    { name: "User message", purpose: "A message sent by the user. It is shown in a bubble and has no avatar, citations, status card or action bar." },
    { name: "Default layout", purpose: "A plain reply or message. Use it for most conversation turns." },
    { name: "Card layout", purpose: "A reply with card styling. Use it for richer replies with a headline and supporting content." },
    { name: "Minimized", purpose: "Secondary text is shortened to a limited number of lines and attachments are limited to one. Use it to keep the thread compact." },
    { name: "Expanded", purpose: "Secondary text is shown in full, with citations below it and up to two attachments. Use it for the message the user is reading." },
    { name: "Optional parts", purpose: "Headline, body, citations, divider, secondary text with toggle, attachments, media gallery, status card and action bar can each be turned off." },
  ],
  formatting: [
    {
      title: "Content",
      points: [
        "Keep headlines short and put the answer in the body; keep secondary text for detail the user can skip.",
        "Use citations only on bot replies, one per source.",
        "Use the status card for multi-step work with a progress value and step list; it can be collapsed.",
      ],
    },
    {
      title: "Layout",
      points: [
        "Messages have a maximum width (about 550px) and are intended to be stacked in a thread or chat window.",
        "Alternate bot replies and user messages in the order they happened; the thread component shows bot-first and user-first orders.",
        "Show the action bar on bot replies only.",
      ],
    },
  ],
  behaviors: [
    {
      title: "Mouse and touch",
      points: [
        "The toggle button expands and minimizes the secondary text. The state set with the state prop is the starting point; the user can then toggle it.",
        "Action bar buttons toggle good and bad response (choosing one clears the other), read aloud on and off, copy (shows a copied state for two seconds) and regenerate (shows a short working state).",
        "Citations, attachment cards and media cards show hover styles. The status card has its own collapse button.",
      ],
    },
    {
      title: "Keyboard and focus",
      points: [
        "Toggle and action buttons are native buttons that work with Tab, Enter and Space.",
        "Citations are focusable but do not respond to Enter or Space by themselves.",
        "The message does not announce new replies to assistive technology.",
      ],
    },
    {
      title: "States",
      points: [
        "Minimized and expanded are the two display states of secondary text.",
        "Media cards support enabled, hovered, pressed and disabled states.",
      ],
    },
  ],
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
