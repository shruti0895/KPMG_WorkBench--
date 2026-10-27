import { InjectionToken, Signal } from '@angular/core';

export type AccordionAlign = 'start' | 'end';
export type AccordionSize = 'sm' | 'md' | 'lg';

/** Payload of the `headingClick` output (React: the `onHeadingClick` argument). */
export interface AccordionHeadingClick {
  /** The open state the item is moving to. */
  isOpen: boolean;
  event: Event;
}

/** Shares alignment, size and group-level disabled with the items (React: `AccordionContext`). */
export interface AccordionContext {
  readonly align: Signal<AccordionAlign>;
  readonly size: Signal<AccordionSize>;
  readonly disabled: Signal<boolean>;
}

export const ACCORDION_CONTEXT = new InjectionToken<AccordionContext>('KPMG_ACCORDION_CONTEXT');
