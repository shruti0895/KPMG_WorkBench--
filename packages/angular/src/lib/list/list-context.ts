import { InjectionToken, Signal } from '@angular/core';

/** Container configuration passed to nested list items (React: `ListContext`). */
export interface ListContext {
  readonly size: Signal<string>;
}

export const LIST_CONTEXT = new InjectionToken<ListContext>('KPMG_LIST_CONTEXT');
