import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, output, untracked } from '@angular/core';
import { MenuDividerComponent } from './menu-divider.component';
import { MenuItemComponent } from './menu-item.component';
import { DropdownGroupDensity, DropdownGroupType, DropdownItem, DropdownItemSelectEvent } from './menu.types';

export const DEFAULT_DROPDOWN_GROUP_ITEMS: DropdownItem[] = [
  { label: 'Option 1', value: 'Option 1', selected: true },
  { type: 'divider' },
  { label: 'Option 2', value: 'Option 2', selected: true },
  { label: 'Option 3', value: 'Option 3', selected: true },
  { label: 'Option 4', value: 'Option 4', selected: true },
  { label: 'Option 5', value: 'Option 5', selected: true },
  { type: 'divider' },
  { label: 'Option 6', value: 'Option 6', selected: true },
];

/**
 * WorkBench DropdownItemGroup — mirrors `DropdownItemGroup` in Menu.jsx
 * (6 canonical variants: 3 densities x checklist / item-list).
 *
 * Deviations: `onSelect(val, next, item, e)` → `itemSelect` with a single
 * `DropdownItemSelectEvent`. Selection is controlled when `selectedValues` is
 * provided, otherwise uncontrolled (seeded from `defaultSelectedValues` or the
 * items' `selected` flags). `destructive` items are styled as errors.
 */
@Component({
  selector: 'kpmg-dropdown-item-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuItemComponent, MenuDividerComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" role="group">
      @for (item of groupItems(); track $index) {
        @if (item.type === 'divider') {
          <kpmg-menu-divider />
        } @else {
          <kpmg-menu-item
            [label]="item.label"
            [value]="itemValue(item)"
            [density]="density()"
            [type]="isItemList() ? 'icon' : 'checklist'"
            [showTrailingIcon]="isItemList()"
            [selected]="isSelected(item)"
            [disabled]="!!item.disabled"
            [error]="!!item.error || !!item.destructive"
            (itemClick)="onItemClick(item, $event)"
          />
        }
      }
    </div>
  `,
})
export class DropdownItemGroupComponent {
  readonly density = input<DropdownGroupDensity>('medium');
  readonly type = input<DropdownGroupType>('checklist');
  readonly items = input<DropdownItem[] | undefined>(undefined);
  /** Controlled selection. */
  readonly selectedValues = input<string[] | undefined>(undefined);
  /** Initial selection when uncontrolled. */
  readonly defaultSelectedValues = input<string[] | undefined>(undefined);
  readonly className = input('');

  /** An item was toggled (React: `onSelect`). */
  readonly itemSelect = output<DropdownItemSelectEvent>();

  protected readonly isItemList = computed(() => this.type() === 'item-list');
  protected readonly groupItems = computed(() => this.items() ?? DEFAULT_DROPDOWN_GROUP_ITEMS);

  private readonly internal = linkedSignal<string[]>(
    () =>
      this.defaultSelectedValues() ??
      untracked(() =>
        this.groupItems()
          .filter((i) => i.type !== 'divider' && !i.disabled && i.selected !== false)
          .map((i) => i.value || i.label || ''),
      ),
  );
  private readonly current = computed(() => this.selectedValues() ?? this.internal());

  protected readonly classes = computed(
    () => `kpmg-dropdown-item-group kpmg-dropdown-item-group--${this.density()} ${this.className()}`,
  );

  protected itemValue(item: DropdownItem): string {
    return item.value || item.label || '';
  }

  protected isSelected(item: DropdownItem): boolean {
    return this.current().includes(this.itemValue(item));
  }

  protected onItemClick(item: DropdownItem, event: Event): void {
    if (item.disabled) return;
    const val = this.itemValue(item);
    const cur = this.current();
    const next = cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val];
    if (this.selectedValues() === undefined) this.internal.set(next);
    this.itemSelect.emit({ value: val, selectedValues: next, item, event });
    item.onClick?.(event);
  }
}
