import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { TAB_CONTEXT, TabId, TabItemState } from './tab-context';

const optionalBoolean = (v: unknown): boolean | undefined => (v === undefined || v === null ? undefined : booleanAttribute(v));

/**
 * WorkBench Tab.Item — mirrors `TabItem` in packages/ui/src/components/Tab/Tab.jsx.
 * Must be placed inside `<kpmg-tab>` (or rendered by its `items` input).
 *
 * Deviations: the React `id` prop is `tabId` (so it isn't duplicated on the host
 * element; `value` is kept as its alias); `badge` is a string/number; projected
 * content is rendered before `label` (React showed `children || label`, so use one
 * or the other); React `onClick` is the `itemClick` output.
 */
@Component({
  selector: 'kpmg-tab-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <button
      type="button"
      [attr.role]="role()"
      [class]="classes()"
      [disabled]="disabled()"
      [attr.aria-selected]="isSelected()"
      [attr.aria-disabled]="disabled()"
      [attr.aria-controls]="ariaControls()"
      [attr.tabindex]="tabIndex() ?? (isSelected() ? 0 : -1)"
      [attr.data-tab-id]="resolvedId()"
      (click)="onClick($event)"
    >
      <span class="kpmg-tab__item-label"><ng-content />{{ label() }}</span>
      @if (hasBadge()) {
        <span class="kpmg-tab__badge" aria-hidden="true">{{ badge() }}</span>
      }
    </button>
  `,
})
export class TabItemComponent {
  /** Unique identifier for the tab. */
  readonly tabId = input<TabId | undefined>(undefined);
  /** Alias for `tabId`. */
  readonly value = input<TabId | undefined>(undefined);
  readonly label = input<string | undefined>(undefined);
  readonly badge = input<string | number | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Explicit selected flag; when unset the parent tab's active id decides. */
  readonly selected = input<boolean | undefined, unknown>(undefined, { transform: optionalBoolean });
  /** Force a visual state for previews/testing. */
  readonly state = input<TabItemState | undefined>(undefined);
  readonly role = input('tab');
  readonly tabIndex = input<number | undefined>(undefined);
  readonly ariaControls = input<string | undefined>(undefined);
  readonly className = input('');

  /** Click on an enabled tab (fires after the parent tab's selection). */
  readonly itemClick = output<Event>();

  private readonly context = inject(TAB_CONTEXT, { optional: true });

  protected readonly resolvedId = computed(() => this.tabId() ?? this.value());
  protected readonly isSelected = computed(() => {
    const selected = this.selected();
    if (selected !== undefined) return selected;
    const active = this.context?.activeId();
    return active !== undefined && active === this.resolvedId();
  });
  protected readonly hasBadge = computed(() => {
    const b = this.badge();
    return b !== undefined && b !== null && b !== '';
  });

  protected readonly classes = computed(() =>
    [
      'kpmg-tab__item',
      this.hasBadge() ? 'kpmg-tab__item--with-badge' : '',
      this.isSelected() ? 'kpmg-tab__item--selected' : '',
      this.disabled() ? 'kpmg-tab__item--disabled' : '',
      this.state() ? `kpmg-tab__item--state-${this.state()!.toLowerCase()}` : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    const id = this.resolvedId();
    this.context?.select(id, { id, label: this.label(), badge: this.badge(), disabled: this.disabled() }, event);
    this.itemClick.emit(event);
  }
}
