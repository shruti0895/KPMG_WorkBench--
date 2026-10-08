import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DropdownBaseComponent } from './dropdown-base.component';
import { MenuComponent } from './menu.component';
import { MenuDividerComponent } from './menu-divider.component';
import { MenuItemComponent } from './menu-item.component';
import {
  DropdownBaseSize,
  DropdownBaseState,
  DropdownBaseStyle,
  DropdownGroupDensity,
  DropdownItem,
  MenuItemSelectEvent,
  MenuItemType,
  MenuPlacement,
  MenuTriggerContext,
} from './menu.types';

/**
 * WorkBench DropdownMenu — mirrors `DropdownMenu` in Menu.jsx: a DropdownBase
 * (or custom) trigger that opens a popover Menu.
 *
 * Deviations: `children` → projected content, which replaces the `items` list
 * when present. `customTrigger` is a `TemplateRef` receiving `{ open, toggle }`.
 * `header` is a string (or `headerTemplate`). `onSelect(value, item)` →
 * `itemSelect`, `onClose` → `closed`. `open` is two-way bindable; `defaultOpen`
 * seeds the uncontrolled state.
 */
@Component({
  selector: 'kpmg-dropdown-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MenuComponent, MenuItemComponent, MenuDividerComponent, DropdownBaseComponent],
  host: { style: 'display: contents' },
  template: `
    <kpmg-menu
      type="dropdown"
      [open]="isOpen()"
      (closed)="onMenuClose()"
      [trigger]="triggerTpl"
      [triggerWrapped]="true"
      [density]="density()"
      [placement]="computedPlacement()"
      [width]="menuWidth()"
      [header]="header()"
      [headerTemplate]="headerTemplate()"
      [className]="menuClass()"
      [closeOnSelect]="closeOnSelect()"
    >
      <ng-content>
        @for (item of items(); track $index) {
          @if (item.type === 'divider') {
            <kpmg-menu-divider />
          } @else {
            <kpmg-menu-item
              [label]="item.label"
              [description]="item.description"
              [type]="itemType(item)"
              [prefix]="item.prefix || item.icon || undefined"
              [suffix]="item.suffix || undefined"
              [showTrailingIcon]="item.type === 'icon'"
              [selected]="isSelected(item)"
              [disabled]="!!item.disabled"
              [error]="!!item.error"
              (itemClick)="onItemClick(item, $event)"
            />
          }
        }
      </ng-content>
    </kpmg-menu>

    <ng-template #triggerTpl>
      @if (customTrigger(); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="triggerContext()" />
      } @else {
        <kpmg-dropdown-base
          [styleType]="resolvedStyle()"
          [size]="resolvedSize()"
          [background]="baseBackground()"
          [state]="isOpen() ? 'pressed' : baseState()"
          [open]="isOpen()"
          [label]="triggerLabel() || (isCard() ? 'Header' : 'Options')"
          (baseClick)="toggle()"
        />
      }
    </ng-template>
  `,
})
export class DropdownMenuComponent {
  readonly triggerLabel = input('Options');
  /** Backward compatibility: 'default' | 'card' | 'custom'. */
  readonly triggerType = input<'default' | 'card' | 'custom' | undefined>(undefined);
  /** Backward compatibility: overrides `baseSize`. */
  readonly triggerDensity = input<DropdownGroupDensity | undefined>(undefined);
  readonly baseStyle = input<DropdownBaseStyle>('default');
  readonly baseSize = input<DropdownBaseSize>('medium');
  readonly baseBackground = input(true, { transform: booleanAttribute });
  readonly baseState = input<DropdownBaseState>('enabled');
  readonly orientation = input<'bottom' | 'top'>('bottom');
  readonly alignment = input<'left' | 'right' | 'center'>('left');
  /** Replaces the DropdownBase trigger; receives `{ open, toggle }`. */
  readonly customTrigger = input<TemplateRef<MenuTriggerContext> | null>(null);
  readonly density = input<DropdownGroupDensity>('medium');
  readonly items = input<DropdownItem[]>([]);
  readonly selectedValues = input<string[]>([]);
  /** Overrides the placement derived from orientation + alignment. */
  readonly placement = input<MenuPlacement | undefined>(undefined);
  readonly width = input<number | string | undefined>(undefined);
  readonly header = input<string | undefined>(undefined);
  readonly headerTemplate = input<TemplateRef<unknown> | null>(null);
  /** Open state. Two-way bindable: `[(open)]`. */
  readonly open = model<boolean | undefined>(undefined);
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly closeOnSelect = input(true, { transform: booleanAttribute });
  readonly className = input('');

  /** An item from `items` was clicked (React: `onSelect`). */
  readonly itemSelect = output<MenuItemSelectEvent<DropdownItem>>();
  /** The menu closed (React: `onClose`). */
  readonly closed = output<void>();

  private readonly current = linkedSignal(() => this.open() ?? this.defaultOpen());
  protected readonly isOpen = this.current.asReadonly();

  protected readonly resolvedStyle = computed<DropdownBaseStyle>(() =>
    this.triggerType() === 'card' ? 'card' : this.baseStyle() || 'default',
  );
  protected readonly isCard = computed(() => this.resolvedStyle() === 'card');
  protected readonly resolvedSize = computed<DropdownBaseSize>(
    () => this.triggerDensity() || this.baseSize() || (this.isCard() ? 'none' : 'medium'),
  );
  protected readonly computedPlacement = computed<MenuPlacement>(
    () => this.placement() || (`${this.orientation()}-${this.alignment()}` as MenuPlacement),
  );
  protected readonly menuWidth = computed(() => this.width() || (this.isCard() ? 450 : undefined));
  protected readonly menuClass = computed(() =>
    this.isCard() ? `kpmg-menu--dropdown-card ${this.className()}`.trim() : this.className(),
  );
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
    if (!this.isOpen()) return; // already closed through the trigger
    this.setOpen(false);
    this.closed.emit();
  }

  protected itemType(item: DropdownItem): MenuItemType {
    return item.type && item.type !== 'divider' ? item.type : 'checklist';
  }

  protected isSelected(item: DropdownItem): boolean {
    return this.selectedValues().includes(item.value || item.label || '');
  }

  protected onItemClick(item: DropdownItem, event: Event): void {
    item.onClick?.(event);
    this.itemSelect.emit({ value: item.value || item.label || '', item });
  }
}
