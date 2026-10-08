import { InjectionToken, Signal, TemplateRef } from '@angular/core';

export type MenuType = 'dropdown' | 'navigation' | 'overflow' | 'assistant';
export type MenuDensity = 'small' | 'medium' | 'large' | 'navigation';
export type MenuPlacement =
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'top-left'
  | 'top-right'
  | 'top-center';
export type MenuItemType = 'item' | 'checklist' | 'icon' | 'navigation';
export type MenuItemState = 'enabled' | 'hovered' | 'pressed' | 'disabled' | 'error';

/** Content slot (React: ReactNode): a template reference, plain text, or nothing. */
export type MenuSlot = TemplateRef<unknown> | string | number | null | undefined;

/** Context handed to trigger templates (React: `trigger({ open, toggle })`). Use `let-open="open" let-toggle="toggle"`. */
export interface MenuTriggerContext {
  open: boolean;
  toggle: () => void;
}

/** Shared state a `kpmg-menu` provides to its items (React: MenuContext). */
export interface MenuContext {
  closeOnSelect: Signal<boolean>;
  density: Signal<MenuDensity>;
  type: Signal<MenuType>;
  selectItem(value: unknown, event: Event): void;
}

export const MENU_CONTEXT = new InjectionToken<MenuContext>('KPMG_MENU_CONTEXT');

export type DropdownBaseStyle = 'default' | 'gradient' | 'branded' | 'card';
export type DropdownBaseSize = 'small' | 'medium' | 'large' | 'branded' | 'none';
export type DropdownBaseState = 'enabled' | 'pressed' | 'filled';
export type DropdownGroupDensity = 'small' | 'medium' | 'large';
export type DropdownGroupType = 'checklist' | 'item-list';

/** Item descriptor for `kpmg-dropdown-item-group`, `kpmg-dropdown-menu` and `kpmg-overflow-menu`. */
export interface DropdownItem {
  /** `'divider'` renders a separator; for DropdownMenu any MenuItemType picks the item type (default 'checklist'). */
  type?: 'divider' | MenuItemType;
  label?: string;
  value?: string;
  description?: string;
  prefix?: MenuSlot;
  icon?: MenuSlot;
  suffix?: MenuSlot;
  /** Initial selection for DropdownItemGroup (`false` = start unselected). */
  selected?: boolean;
  disabled?: boolean;
  error?: boolean;
  destructive?: boolean;
  onClick?: (event: Event) => void;
}

/** Item descriptor for `kpmg-navigation-menu`. */
export interface NavigationMenuItem {
  type?: 'divider' | 'group' | 'item';
  label?: string;
  value?: string;
  /** Group title (type 'group'). */
  title?: string;
  /** Group children (type 'group'). */
  items?: NavigationMenuItem[];
  icon?: MenuSlot;
  prefix?: MenuSlot;
  suffix?: MenuSlot;
  badge?: string | number | TemplateRef<unknown>;
  /** `true` → plus icon; a template → custom content; a function → plus icon that calls it on click. */
  actionButton?: boolean | TemplateRef<unknown> | ((event: Event) => void);
  disabled?: boolean;
  onClick?: (event: Event) => void;
}

export interface AssistantCardData {
  title?: string;
  subtitle?: string;
  thumbnail?: TemplateRef<unknown>;
  onClick?: (event: Event) => void;
  onActionClick?: (event: Event) => void;
}

export interface AssistantSection {
  title?: string;
  cards?: AssistantCardData[];
}

/** Emitted by `kpmg-menu` when an item inside it is selected. */
export interface MenuSelectEvent {
  value: unknown;
  event: Event;
}

/** Emitted by `kpmg-dropdown-item-group` / `kpmg-overflow-menu` (React: `onSelect(val, nextSelected, item, e)`). */
export interface DropdownItemSelectEvent {
  value: string;
  selectedValues: string[];
  item: DropdownItem;
  event: Event;
}

/** Emitted by `kpmg-dropdown-menu` / `kpmg-navigation-menu` (React: `onSelect(value, item)`). */
export interface MenuItemSelectEvent<T> {
  value: string;
  item: T;
}
