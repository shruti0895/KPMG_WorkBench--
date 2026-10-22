export interface AnatomyPart {
  /** Name of the part, e.g. "Container", "Leading icon". */
  part: string;
  description: string;
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
  /** Supporting explanation / related guidance. */
  references: { label: string; text: string }[];
}
