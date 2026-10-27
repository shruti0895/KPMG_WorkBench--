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
    /** When to use it (and when not to). */
    when: string[];
    /** The component's parts, in visual order. */
    anatomy: AnatomyPart[];
  };
  /** Accessibility behaviour: roles, aria attributes, keyboard support. */
  accessibility: string[];
  /** Short how-to sections (opening, sizing, focus...). Shown under API and listed in the Table of Contents. */
  guides?: Guide[];
  /** Supporting explanation / related guidance. */
  references: { label: string; text: string }[];
}
