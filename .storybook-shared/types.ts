export interface AnatomyPart {
  /** Name of the part, e.g. "Container", "Leading icon". */
  part: string;
  description: string;
}

export interface Guide {
  /** Anchor id suffix; the section id becomes `guide-<id>`. */
  id: string;
  title: string;
  /** Short explanatory paragraphs. */
  paragraphs: string[];
  /** Optional code sample per framework; the page shows the one for the current Storybook. */
  code?: { react?: string; angular?: string };
  /** Optional callout shown under the code. */
  note?: string;
}

export interface ComponentDoc {
  overview: {
    /** What the component is. */
    what: string;
    /** When to use it. */
    when: string[];
    /** When not to use it, naming the component to use instead where there is one. */
    whenNot?: string[];
    /** The component's parts, in visual order. */
    anatomy: AnatomyPart[];
  };
  /** What each variant is for, in plain words (shown as a table above the variant stories). */
  variants?: { name: string; purpose: string }[];
  /** Formatting and content rules: sizing, placement, labelling, truncation, spacing... One titled group per topic. */
  formatting?: { title: string; points: string[] }[];
  /** How it behaves: mouse, keyboard, touch, states. One titled group per input type. */
  behaviors?: { title: string; points: string[] }[];
  /** Accessibility behaviour: roles, aria attributes, keyboard support. */
  accessibility: string[];
  /** Short how-to sections (opening, sizing, focus...). Shown under API and listed in the Table of Contents. */
  guides?: Guide[];
  /** Supporting explanation / related guidance. */
  references: { label: string; text: string }[];
}
