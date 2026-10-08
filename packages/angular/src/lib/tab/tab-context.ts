import { InjectionToken, Signal } from '@angular/core';

export type TabId = string | number;
export type TabItemState = 'enabled' | 'hovered' | 'pressed' | 'disabled';

/** Payload describing the tab that was selected (React: the `tabItem` callback argument). */
export interface TabSelection {
  id: TabId | undefined;
  label: string | undefined;
  badge: string | number | undefined;
  disabled: boolean;
}

/** Coordinates the active tab between `<kpmg-tab>` and its `<kpmg-tab-item>`s (React: `TabContext`). */
export interface TabContext {
  readonly activeId: Signal<TabId | undefined>;
  select(tabId: TabId | undefined, item: TabSelection, event: Event): void;
}

export const TAB_CONTEXT = new InjectionToken<TabContext>('KPMG_TAB_CONTEXT');
