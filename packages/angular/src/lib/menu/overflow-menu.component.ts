import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, linkedSignal, model, output } from '@angular/core';
import { DropdownItemGroupComponent } from './dropdown-item-group.component';
import { MenuIconComponent } from './menu-icon.component';
import { DropdownGroupDensity, DropdownGroupType, DropdownItem, DropdownItemSelectEvent } from './menu.types';

/**
 * WorkBench OverflowMenu — mirrors `OverflowMenu` in Menu.jsx: a vertical
 * ellipsis trigger (small 24px / large 40px) opening a DropdownItemGroup.
 *
 * Deviations: `children` → projected content, which replaces the default
 * item group. `type` (alias of `groupType`) is kept. `onSelect` → `itemSelect`,
 * `onClose` → `closed`. `open` is two-way bindable; `defaultOpen` seeds it.
 * `placement` accepts the Menu placements (React lists four).
 */
@Component({
  selector: 'kpmg-overflow-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownItemGroupComponent, MenuIconComponent],
  host: {
    style: 'display: contents',
    '(document:mousedown)': 'onDocumentMouseDown($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
  template: `
    <div [class]="wrapperClasses()">
      <button
        type="button"
        [class]="triggerClasses()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        aria-haspopup="menu"
        [attr.aria-expanded]="isOpen()"
        (click)="toggle()"
      >
        <kpmg-menu-icon name="ellipsis" [size]="size() === 'small' ? 16 : 20" />
      </button>

      @if (isOpen()) {
        <div [class]="'kpmg-menu-overflow-popover kpmg-menu--placement-' + placement()">
          <ng-content>
            <kpmg-dropdown-item-group
              [density]="density()"
              [type]="resolvedGroupType()"
              [items]="items()"
              [selectedValues]="selectedValues()"
              [defaultSelectedValues]="defaultSelectedValues()"
              (itemSelect)="onItemSelect($event)"
            />
          </ng-content>
        </div>
      }
    </div>
  `,
})
export class OverflowMenuComponent {
  /** small (24px) or large (40px) trigger. */
  readonly size = input<'small' | 'large'>('large');
  readonly density = input<DropdownGroupDensity>('medium');
  readonly groupType = input<DropdownGroupType>('checklist');
  /** Alias for `groupType`. */
  readonly type = input<DropdownGroupType | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly items = input<DropdownItem[] | undefined>(undefined);
  readonly selectedValues = input<string[] | undefined>(undefined);
  readonly defaultSelectedValues = input<string[] | undefined>(undefined);
  readonly placement = input<'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'>('bottom-left');
  /** Open state. Two-way bindable: `[(open)]`. */
  readonly open = model<boolean | undefined>(undefined);
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly closeOnSelect = input(false, { transform: booleanAttribute });
  readonly className = input('');
  readonly ariaLabel = input('More options');

  /** An item was toggled (React: `onSelect`). */
  readonly itemSelect = output<DropdownItemSelectEvent>();
  /** The menu closed (React: `onClose`). */
  readonly closed = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly current = linkedSignal(() => this.open() ?? this.defaultOpen());
  protected readonly isOpen = this.current.asReadonly();

  protected readonly resolvedGroupType = computed<DropdownGroupType>(() => this.type() || this.groupType() || 'checklist');

  protected readonly wrapperClasses = computed(() => `kpmg-menu-wrapper ${this.className()}`);
  protected readonly triggerClasses = computed(() =>
    [
      'kpmg-menu-overflow-trigger',
      `kpmg-menu-overflow-trigger--${this.size()}`,
      this.isOpen() ? 'kpmg-menu-overflow-trigger--open' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  private setOpen(next: boolean): void {
    this.current.set(next);
    this.open.set(next);
  }

  private close(): void {
    this.setOpen(false);
    this.closed.emit();
  }

  protected toggle(): void {
    if (this.disabled()) return;
    const next = !this.isOpen();
    this.setOpen(next);
    if (!next) this.closed.emit();
  }

  protected onItemSelect(event: DropdownItemSelectEvent): void {
    this.itemSelect.emit(event);
    if (this.closeOnSelect()) this.close();
  }

  protected onDocumentMouseDown(event: MouseEvent): void {
    if (!this.isOpen()) return;
    if (!this.host.nativeElement.contains(event.target as Node)) this.close();
  }

  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (this.isOpen() && event.key === 'Escape') this.close();
  }
}
