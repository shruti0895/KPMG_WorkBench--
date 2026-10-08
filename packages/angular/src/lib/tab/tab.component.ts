import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, inject, input, linkedSignal, model, output, TemplateRef, viewChild } from '@angular/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { TAB_CONTEXT, TabContext, TabId, TabItemState, TabSelection } from './tab-context';
import { TabItemComponent } from './tab-item.component';

export type TabSize = 'small' | 'large';

/** Data-driven tab definition for the `items` input. */
export interface TabItemData {
  id?: TabId;
  value?: TabId;
  label: string;
  badge?: string | number;
  disabled?: boolean;
  selected?: boolean;
  state?: TabItemState;
  ariaControls?: string;
  onClick?: (event: Event) => void;
}

/** Payload of the `tabChange` output (React: `onChange(activeId, tabItem, event)`). */
export interface TabChangeEvent {
  id: TabId | undefined;
  item: TabSelection;
  event: Event;
}

/**
 * WorkBench Tab — mirrors packages/ui/src/components/Tab/Tab.jsx.
 * Use `<kpmg-tab-item>` children or the data-driven `items` input. The active
 * tab is a model: bind `[(value)]`, or use `defaultValue` for uncontrolled usage
 * (defaults to the first item's id in `items` mode).
 *
 * Deviations: React's `onChange` is the `tabChange` output; `actions` is an
 * `<ng-template>` reference (the render-function form is not supported).
 */
@Component({
  selector: 'kpmg-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, TabItemComponent],
  providers: [{ provide: TAB_CONTEXT, useExisting: forwardRef(() => TabComponent) }],
  host: { style: 'display: contents' },
  template: `
    <div [class]="containerClasses()">
      <div class="kpmg-tab__nav">
        <div #list class="kpmg-tab__list" [attr.role]="role()" [attr.aria-label]="ariaLabel()" (keydown)="onKeydown($event)">
          @if (resolvedItems(); as list) {
            @for (item of list; track item.resolvedId) {
              <kpmg-tab-item
                [tabId]="item.resolvedId"
                [label]="item.label"
                [badge]="item.badge"
                [disabled]="!!item.disabled"
                [selected]="item.selected"
                [state]="item.state"
                [ariaControls]="item.ariaControls"
                (itemClick)="item.onClick?.($event)"
              />
            }
          } @else {
            <ng-content />
          }
        </div>
      </div>

      @if (actions() || normalizedSize() === 'large') {
        <div class="kpmg-tab__actions">
          @if (actions(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            <button type="button" class="kpmg-tab__action-btn" aria-label="List view" title="List view">
              <span class="kpmg-tab__action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </span>
            </button>
            <button type="button" class="kpmg-tab__action-btn" aria-label="Link actions" title="Link actions">
              <span class="kpmg-tab__action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </span>
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class TabComponent implements TabContext {
  /** small (compact, for tiles/dialogs) | large (app bar with trailing actions). */
  readonly size = input<TabSize>('small');
  /** Active tab id. Two-way bindable: `[(value)]`. */
  readonly value = model<TabId | undefined>(undefined);
  /** Initial active tab id when `value` is not bound. */
  readonly defaultValue = input<TabId | undefined>(undefined);
  /** Data-driven tab list; omit to project `<kpmg-tab-item>` children. */
  readonly items = input<TabItemData[] | undefined>(undefined);
  /** Custom trailing actions (large size shows default list/link buttons when omitted). */
  readonly actions = input<TemplateRef<unknown> | null>(null);
  /** Bottom divider in large size. */
  readonly bordered = input(true, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });
  readonly className = input('');
  readonly role = input('tablist');
  readonly ariaLabel = input('Navigation Tabs');

  /** Fires when the user selects a tab. */
  readonly tabChange = output<TabChangeEvent>();

  private readonly listRef = viewChild.required<ElementRef<HTMLElement>>('list');
  private readonly document = inject(DOCUMENT);

  protected readonly normalizedSize = computed(() => (this.size() || 'small').toLowerCase());

  protected readonly resolvedItems = computed(() =>
    this.items()?.map((item, index) => ({ ...item, resolvedId: (item.id ?? item.value ?? index) as TabId })),
  );

  private readonly active = linkedSignal<TabId | undefined>(() => {
    const v = this.value();
    if (v !== undefined) return v;
    const d = this.defaultValue();
    if (d !== undefined) return d;
    return this.resolvedItems()?.[0]?.resolvedId;
  });

  /** Active tab id, shared with child tab items through `TAB_CONTEXT`. */
  readonly activeId = this.active.asReadonly();

  /** @internal Called by child tab items on click. */
  select(tabId: TabId | undefined, item: TabSelection, event: Event): void {
    this.active.set(tabId);
    this.value.set(tabId);
    this.tabChange.emit({ id: tabId, item, event });
  }

  protected readonly containerClasses = computed(() =>
    [
      'kpmg-tab',
      `kpmg-tab--${this.normalizedSize()}`,
      this.normalizedSize() === 'large' && this.bordered() ? 'kpmg-tab--bordered' : '',
      this.fullWidth() ? 'kpmg-tab--full-width' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  /** ArrowLeft / ArrowRight / Home / End move focus and select across enabled tabs. */
  protected onKeydown(event: KeyboardEvent): void {
    const buttons = Array.from(this.listRef().nativeElement.querySelectorAll<HTMLElement>('.kpmg-tab__item:not(:disabled)'));
    if (!buttons.length) return;
    const current = buttons.findIndex((b) => b === this.document.activeElement);

    let next = -1;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next = current < buttons.length - 1 ? current + 1 : 0;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      next = current > 0 ? current - 1 : buttons.length - 1;
    } else if (event.key === 'Home') {
      event.preventDefault();
      next = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      next = buttons.length - 1;
    }

    if (next !== -1 && buttons[next]) {
      buttons[next].focus();
      buttons[next].click();
    }
  }
}
