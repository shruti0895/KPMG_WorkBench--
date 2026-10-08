import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuDividerComponent } from './menu-divider.component';
import { MenuGroupComponent } from './menu-group.component';
import { MenuIconComponent } from './menu-icon.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuItemSelectEvent, MenuPlacement, MenuTriggerContext, NavigationMenuItem } from './menu.types';

/**
 * WorkBench NavigationMenu — mirrors `NavigationMenu` in Menu.jsx: a vertical
 * navigation panel / dropdown with a KPMG brand-pill trigger, badges and
 * section dividers.
 *
 * Deviations: `children` → projected content, which replaces `items` when
 * present. `customTrigger` is a `TemplateRef` receiving `{ open, toggle }`.
 * `header` is a string (or `headerTemplate`). `onSelect(value, item)` →
 * `itemSelect`, `onClose` → `closed`. A function `actionButton` on an item
 * renders the plus icon and is called on click. `open` is two-way bindable.
 */
@Component({
  selector: 'kpmg-navigation-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MenuComponent, MenuItemComponent, MenuGroupComponent, MenuDividerComponent, MenuIconComponent],
  host: { style: 'display: contents' },
  template: `
    <kpmg-menu
      type="navigation"
      density="navigation"
      [open]="inline() ? true : isOpen()"
      (closed)="onMenuClose()"
      [trigger]="hasTrigger() ? triggerTpl : null"
      [triggerWrapped]="true"
      [inline]="inline()"
      [placement]="placement()"
      [width]="width()"
      [header]="header()"
      [headerTemplate]="headerTemplate()"
      [className]="className()"
      [closeOnSelect]="closeOnSelect()"
    >
      <ng-content>
        @for (item of items(); track $index) {
          @if (item.type === 'divider') {
            <kpmg-menu-divider />
          } @else if (item.type === 'group') {
            <kpmg-menu-group [title]="item.title">
              @for (sub of item.items ?? []; track $index) {
                <ng-container [ngTemplateOutlet]="navItem" [ngTemplateOutletContext]="{ $implicit: sub }" />
              }
            </kpmg-menu-group>
          } @else {
            <ng-container [ngTemplateOutlet]="navItem" [ngTemplateOutletContext]="{ $implicit: item }" />
          }
        }
      </ng-content>
    </kpmg-menu>

    <ng-template #navItem let-item>
      <kpmg-menu-item
        [label]="item.label"
        [icon]="item.icon"
        [prefix]="item.prefix || item.icon"
        [suffix]="item.suffix"
        [badge]="item.badge"
        [actionButton]="actionOf(item)"
        [selected]="isActive(item)"
        [disabled]="!!item.disabled"
        density="navigation"
        (actionClick)="onActionClick(item, $event)"
        (itemClick)="onItemClick(item, $event)"
      />
    </ng-template>

    <ng-template #triggerTpl>
      @if (customTrigger(); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="triggerContext()" />
      } @else {
        <button type="button" class="kpmg-nav-brand-pill" aria-haspopup="menu" [attr.aria-expanded]="isOpen()" (click)="toggle()">
          <span>{{ brandLabel() }}</span>
          <kpmg-menu-icon name="chevron" [direction]="isOpen() ? 'up' : 'down'" [size]="18" />
        </button>
      }
    </ng-template>
  `,
})
export class NavigationMenuComponent {
  readonly brandLabel = input('KPMG');
  /** 'brand-pill' | 'custom' | 'none' (inline). */
  readonly triggerType = input<'brand-pill' | 'custom' | 'none'>('brand-pill');
  readonly customTrigger = input<TemplateRef<MenuTriggerContext> | null>(null);
  readonly header = input<string | undefined>('Header');
  readonly headerTemplate = input<TemplateRef<unknown> | null>(null);
  readonly inline = input(false, { transform: booleanAttribute });
  /** Open state. Two-way bindable: `[(open)]`. */
  readonly open = model<boolean | undefined>(undefined);
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly closeOnSelect = input(true, { transform: booleanAttribute });
  readonly items = input<NavigationMenuItem[]>([]);
  /** Value (or label) of the active item. */
  readonly activeItem = input<string | undefined>(undefined);
  readonly placement = input<MenuPlacement>('bottom-left');
  readonly width = input<number | string>(263);
  readonly className = input('');

  /** An item from `items` was clicked (React: `onSelect`). */
  readonly itemSelect = output<MenuItemSelectEvent<NavigationMenuItem>>();
  /** The menu closed (React: `onClose`). */
  readonly closed = output<void>();

  private readonly current = linkedSignal(() => this.open() ?? this.defaultOpen());
  protected readonly isOpen = this.current.asReadonly();

  protected readonly hasTrigger = computed(() => !(this.inline() || this.triggerType() === 'none'));
  protected readonly triggerContext = computed<MenuTriggerContext>(() => ({
    open: this.isOpen(),
    toggle: () => this.toggle(),
  }));

  private setOpen(next: boolean): void {
    this.current.set(next);
    this.open.set(next);
  }

  protected toggle(): void {
    const next = !this.isOpen();
    this.setOpen(next);
    if (!next) this.closed.emit();
  }

  protected onMenuClose(): void {
    if (!this.isOpen()) return;
    this.setOpen(false);
    this.closed.emit();
  }

  protected isActive(item: NavigationMenuItem): boolean {
    return this.activeItem() === (item.value || item.label);
  }

  protected actionOf(item: NavigationMenuItem): boolean | TemplateRef<unknown> | undefined {
    const a = item.actionButton;
    return typeof a === 'function' ? true : a;
  }

  protected onActionClick(item: NavigationMenuItem, event: Event): void {
    if (typeof item.actionButton === 'function') item.actionButton(event);
  }

  protected onItemClick(item: NavigationMenuItem, event: Event): void {
    item.onClick?.(event);
    this.itemSelect.emit({ value: item.value || item.label || '', item });
  }
}
