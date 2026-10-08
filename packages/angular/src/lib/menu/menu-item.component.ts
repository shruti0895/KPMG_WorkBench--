import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MENU_CONTEXT, MenuDensity, MenuItemState, MenuItemType, MenuSlot } from './menu.types';
import { MenuIconComponent } from './menu-icon.component';

/**
 * WorkBench MenuItem — mirrors the `MenuItem` export of
 * packages/ui/src/components/Menu/Menu.jsx. Inherits density from a parent
 * `kpmg-menu`.
 *
 * Deviations: ReactNode props (`icon`, `prefix`, `suffix`, `badge`,
 * `actionButton`) take a `TemplateRef` (or plain text/number). The label is the
 * `label` input or, when omitted, the projected content (React `label || children`).
 * `onClick` → `itemClick`; a function `actionButton` becomes `actionButton = true`
 * plus the `actionClick` output. `role` → `itemRole`. `className`/`style` map to
 * `className`/`itemStyle`.
 */
@Component({
  selector: 'kpmg-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MenuIconComponent],
  host: { style: 'display: contents' },
  template: `
    <button
      type="button"
      [class]="classes()"
      [style]="itemStyle()"
      [disabled]="isDisabled()"
      [attr.aria-checked]="isChecklist() ? isSelected() : null"
      [attr.aria-disabled]="isDisabled()"
      [attr.role]="resolvedRole()"
      [attr.tabindex]="isDisabled() ? -1 : 0"
      (click)="onClick($event)"
    >
      @if (isChecklist()) {
        @if (showCheckmark()) {
          <span class="kpmg-menu-item__checkbox-indicator" aria-hidden="true">
            @if (isSelected()) {
              <kpmg-menu-icon name="checkbox-circle" [size]="16" />
            } @else {
              <kpmg-menu-icon name="checkbox-unchecked" [size]="16" />
            }
          </span>
        }
      } @else if (type() === 'icon') {
        @if (showLeadingIcon()) {
          <span class="kpmg-menu-item__prefix" aria-hidden="true">
            @if (itemPrefix()) {
              <ng-container [ngTemplateOutlet]="slot" [ngTemplateOutletContext]="{ $implicit: itemPrefix() }" />
            } @else {
              <kpmg-menu-icon name="star" [size]="16" />
            }
          </span>
        }
      } @else if (itemPrefix()) {
        <span class="kpmg-menu-item__prefix" aria-hidden="true">
          <ng-container [ngTemplateOutlet]="slot" [ngTemplateOutletContext]="{ $implicit: itemPrefix() }" />
        </span>
      }

      <span class="kpmg-menu-item__content">
        <span class="kpmg-menu-item__label">
          @if (label()) { {{ label() }} } @else { <ng-content /> }
        </span>
        @if (descriptionTemplate(); as tpl) {
          <span class="kpmg-menu-item__description"><ng-container [ngTemplateOutlet]="tpl" /></span>
        } @else if (description()) {
          <span class="kpmg-menu-item__description">{{ description() }}</span>
        }
      </span>

      @if (badge() !== undefined && badge() !== null) {
        <span class="kpmg-menu-item__badge">
          <ng-container [ngTemplateOutlet]="slot" [ngTemplateOutletContext]="{ $implicit: badge() }" />
        </span>
      } @else if (actionButton()) {
        <span class="kpmg-menu-item__action-btn" (click)="onActionClick($event)">
          @if (actionTemplate(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            <kpmg-menu-icon name="plus" [size]="16" />
          }
        </span>
      } @else if (suffix()) {
        <span class="kpmg-menu-item__suffix" aria-hidden="true">
          <ng-container [ngTemplateOutlet]="slot" [ngTemplateOutletContext]="{ $implicit: suffix() }" />
        </span>
      } @else if (type() === 'icon' && showTrailingIcon() && isSelected()) {
        <span class="kpmg-menu-item__suffix" aria-hidden="true">
          <kpmg-menu-icon name="check" [size]="16" />
        </span>
      }
    </button>

    <ng-template #slot let-v>
      @if (asTemplate(v); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" />
      } @else {
        {{ v }}
      }
    </ng-template>
  `,
})
export class MenuItemComponent {
  /** Item text; when omitted the projected content is used. */
  readonly label = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  /** Rich description (React: node `description`). */
  readonly descriptionTemplate = input<TemplateRef<unknown> | null>(null);
  readonly icon = input<MenuSlot>(undefined);
  /** Leading content; falls back to `icon` when undefined. */
  readonly prefix = input<MenuSlot>(undefined);
  readonly suffix = input<MenuSlot>(undefined);
  /** Inherits from the parent menu when omitted (navigation menus → 'navigation'). */
  readonly density = input<MenuDensity | undefined>(undefined);
  readonly type = input<MenuItemType>('item');
  readonly selected = input(false, { transform: booleanAttribute });
  readonly state = input<MenuItemState>('enabled');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly error = input(false, { transform: booleanAttribute });
  readonly destructive = input(false, { transform: booleanAttribute });
  /** Notification counter or custom content. `0` is displayed. */
  readonly badge = input<string | number | TemplateRef<unknown> | null | undefined>(undefined);
  /** `true` → plus icon; a template → custom content. Clicks emit `actionClick`. */
  readonly actionButton = input<boolean | TemplateRef<unknown> | null | undefined>(undefined);
  /** Value passed to the parent menu on select (defaults to the label). */
  readonly value = input<unknown>(undefined);
  readonly className = input('');
  /** Extra inline styles for the button (React: `style`). */
  readonly itemStyle = input<Record<string, string> | null>(null);
  /** ARIA role override (React: `role`). */
  readonly itemRole = input<string | undefined>(undefined);
  readonly showCheckmark = input(true, { transform: booleanAttribute });
  readonly showLeadingIcon = input(true, { transform: booleanAttribute });
  readonly showTrailingIcon = input(true, { transform: booleanAttribute });

  /** Item clicked (React: `onClick`). */
  readonly itemClick = output<Event>();
  /** Action button clicked (does not trigger `itemClick`). */
  readonly actionClick = output<Event>();

  private readonly context = inject(MENU_CONTEXT, { optional: true });

  protected readonly resolvedDensity = computed(
    () => this.density() || (this.context?.type() === 'navigation' ? 'navigation' : this.context?.density()) || 'medium',
  );
  protected readonly isChecklist = computed(() => this.type() === 'checklist');
  protected readonly isSelected = computed(() => this.selected());
  protected readonly isDisabled = computed(() => this.disabled() || this.state() === 'disabled');
  private readonly isError = computed(() => this.error() || this.destructive() || this.state() === 'error');
  protected readonly itemPrefix = computed(() => {
    const p = this.prefix();
    return p !== undefined ? p : this.icon();
  });
  protected readonly resolvedRole = computed(() => this.itemRole() || (this.isChecklist() ? 'menuitemcheckbox' : 'menuitem'));
  protected readonly actionTemplate = computed(() => {
    const a = this.actionButton();
    return a instanceof TemplateRef ? a : null;
  });

  protected readonly classes = computed(() =>
    [
      'kpmg-menu-item',
      `kpmg-menu-item--${this.resolvedDensity()}`,
      `kpmg-menu-item--type-${this.type()}`,
      this.isSelected() ? 'kpmg-menu-item--selected' : '',
      this.state() === 'hovered' ? 'kpmg-menu-item--hovered' : '',
      this.state() === 'pressed' ? 'kpmg-menu-item--pressed' : '',
      this.isDisabled() ? 'kpmg-menu-item--disabled' : '',
      this.isError() ? 'kpmg-menu-item--error' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected asTemplate(v: unknown): TemplateRef<unknown> | null {
    return v instanceof TemplateRef ? v : null;
  }

  protected onClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    this.itemClick.emit(event);
    const v = this.value();
    this.context?.selectItem(v !== undefined ? v : this.label(), event);
  }

  protected onActionClick(event: Event): void {
    event.stopPropagation();
    this.actionClick.emit(event);
  }
}
