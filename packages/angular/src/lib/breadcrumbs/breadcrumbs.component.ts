import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  linkedSignal,
  OnDestroy,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  CheckmarkIconComponent,
  CircleCheckboxIconComponent,
  SlashForwardIconComponent,
  StarFilledIconComponent,
  StarOutlineIconComponent,
} from './breadcrumbs-icons.component';

export type BreadcrumbsSize = 'sm' | 'md';
export type BreadcrumbsOverflowTrigger = 'click' | 'hover';

export interface BreadcrumbItem {
  id?: string | number;
  label: string;
  href?: string;
  isCurrent?: boolean;
  /** Custom leading icon (dropdown items only). */
  leadingIcon?: TemplateRef<unknown>;
  /** Custom trailing icon (dropdown items only). */
  trailingIcon?: TemplateRef<unknown>;
  useCircleCheckbox?: boolean;
  isCheckbox?: boolean;
  isStar?: boolean;
  isChecked?: boolean;
  hasDivider?: boolean;
  onClick?: (event: Event) => void;
}

export interface BreadcrumbItemClickEvent {
  item: BreadcrumbItem;
  event: Event;
}
export interface BreadcrumbRouteToggleEvent {
  item: BreadcrumbItem;
  checked: boolean;
}
export interface BreadcrumbBookmarkToggleEvent {
  item: BreadcrumbItem;
  starred: boolean;
}

/**
 * WorkBench Breadcrumbs — mirrors packages/ui/src/components/Breadcrumbs/Breadcrumbs.jsx.
 *
 * Deviations: ReactNode props (`separator`, `circleCheckboxIcon`, `starIcon`,
 * `checkIcon`, item `leadingIcon`/`trailingIcon`) are `TemplateRef`s (`separator`
 * may also be a plain string). Callbacks are outputs: `itemClick`,
 * `routeToggle`, `bookmarkToggle`. Item-level `onClick` functions still work.
 * The icon SVGs are exported as `kpmg-*-icon` components.
 */
@Component({
  selector: 'kpmg-breadcrumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    CheckmarkIconComponent,
    CircleCheckboxIconComponent,
    SlashForwardIconComponent,
    StarFilledIconComponent,
    StarOutlineIconComponent,
  ],
  host: {
    style: 'display: contents',
    '(document:mousedown)': 'onDocumentMouseDown($event)',
  },
  template: `
    <nav aria-label="Breadcrumb" [class]="classes()">
      @if (toastMessage(); as msg) {
        <div class="kpmg-breadcrumbs__toast" role="status">{{ msg }}</div>
      }

      <ol class="kpmg-breadcrumbs__list">
        @for (item of parts().start; track item.id ?? $index; let i = $index) {
          <li class="kpmg-breadcrumbs__item">
            <ng-container [ngTemplateOutlet]="link" [ngTemplateOutletContext]="{ item: item, isLast: !parts().collapsed && i === parts().start.length - 1 }" />
          </li>
          @if (parts().collapsed || i !== parts().start.length - 1) {
            <ng-container [ngTemplateOutlet]="sep" />
          }
        }

        @if (parts().collapsed) {
          <li
            class="kpmg-breadcrumbs__item"
            (mouseenter)="overflowTrigger() === 'hover' && isOverflowOpen.set(true)"
            (mouseleave)="overflowTrigger() === 'hover' && isOverflowOpen.set(false)"
          >
            <button
              type="button"
              aria-label="Show collapsed breadcrumbs"
              [attr.aria-expanded]="isOverflowOpen()"
              [class]="'kpmg-breadcrumbs__overflow-trigger ' + (isOverflowOpen() ? 'kpmg-breadcrumbs__overflow-trigger--open' : '')"
              (click)="isOverflowOpen.set(!isOverflowOpen())"
            >
              ...
            </button>

            @if (isOverflowOpen()) {
              <ul class="kpmg-breadcrumbs__dropdown-card" role="menu">
                @for (ci of parts().collapsedItems; track ci.id ?? $index) {
                  @let isBookmarked = !!ci.isStar;
                  @let isChecked = ci.isChecked !== false;
                  @let isCircle = !!(ci.useCircleCheckbox || ci.isCheckbox);
                  @if (ci.hasDivider) {
                    <li class="kpmg-breadcrumbs__dropdown-divider" aria-hidden="true"></li>
                  }
                  <li role="none">
                    <a [attr.href]="ci.href || '#'" class="kpmg-breadcrumbs__dropdown-item" role="menuitem" (click)="onDropdownItemClick($event, ci)">
                      <span class="kpmg-breadcrumbs__dropdown-left">
                        @if (isCircle) {
                          <span class="kpmg-breadcrumbs__circle-checkbox" [attr.title]="isChecked ? 'Uncheck route' : 'Check route'" (click)="onCircleCheckClick($event, ci)">
                            @if (ci.leadingIcon; as tpl) {
                              <ng-container [ngTemplateOutlet]="tpl" />
                            } @else if (circleCheckboxIcon(); as tpl) {
                              <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{ $implicit: isChecked }" />
                            } @else {
                              <kpmg-circle-checkbox-icon [checked]="isChecked" />
                            }
                          </span>
                        } @else {
                          <span
                            [class]="'kpmg-breadcrumbs__star-button ' + (isBookmarked ? 'kpmg-breadcrumbs__star-button--active' : '')"
                            [attr.title]="isBookmarked ? 'Remove bookmark' : 'Bookmark route'"
                            (click)="onBookmarkClick($event, ci)"
                          >
                            @if (ci.leadingIcon; as tpl) {
                              <ng-container [ngTemplateOutlet]="tpl" />
                            } @else if (starIcon(); as tpl) {
                              <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{ $implicit: isBookmarked }" />
                            } @else if (isBookmarked) {
                              <kpmg-star-filled-icon />
                            } @else {
                              <kpmg-star-outline-icon />
                            }
                          </span>
                        }
                        <span>{{ ci.label }}</span>
                      </span>

                      @if (ci.trailingIcon || (isChecked && !ci.useCircleCheckbox)) {
                        <span class="kpmg-breadcrumbs__dropdown-right">
                          <span class="kpmg-breadcrumbs__trailing-check">
                            @if (ci.trailingIcon; as tpl) {
                              <ng-container [ngTemplateOutlet]="tpl" />
                            } @else if (checkIcon(); as tpl) {
                              <ng-container [ngTemplateOutlet]="tpl" />
                            } @else {
                              <kpmg-checkmark-icon />
                            }
                          </span>
                        </span>
                      }
                    </a>
                  </li>
                }
              </ul>
            }
          </li>
          @if (parts().end.length > 0) {
            <ng-container [ngTemplateOutlet]="sep" />
          }
        }

        @for (item of parts().end; track item.id ?? $index; let i = $index) {
          <li class="kpmg-breadcrumbs__item">
            <ng-container [ngTemplateOutlet]="link" [ngTemplateOutletContext]="{ item: item, isLast: i === parts().end.length - 1 }" />
          </li>
          @if (i !== parts().end.length - 1) {
            <ng-container [ngTemplateOutlet]="sep" />
          }
        }
      </ol>
    </nav>

    <ng-template #sep>
      <li class="kpmg-breadcrumbs__separator" aria-hidden="true">
        @if (separatorTemplate(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else if (separatorText() !== null) {
          {{ separatorText() }}
        } @else {
          <kpmg-slash-forward-icon [size]="size() === 'sm' ? 16 : 20" />
        }
      </li>
    </ng-template>

    <ng-template #link let-item="item" let-isLast="isLast">
      @if (isLast || item.isCurrent) {
        <span class="kpmg-breadcrumbs__link kpmg-breadcrumbs__link--current" aria-current="page">{{ item.label }}</span>
      } @else if (item.href) {
        <a [attr.href]="item.href" class="kpmg-breadcrumbs__link" (click)="onLinkClick(item, $event)">{{ item.label }}</a>
      } @else {
        <button type="button" class="kpmg-breadcrumbs__link" (click)="onLinkClick(item, $event)">{{ item.label }}</button>
      }
    </ng-template>
  `,
})
export class BreadcrumbsComponent implements OnDestroy {
  /** Strings or item objects. */
  readonly items = input<(string | BreadcrumbItem)[]>([]);
  readonly maxItems = input<number | undefined>(undefined);
  readonly itemsBeforeCollapse = input<number | undefined>(undefined);
  readonly itemsAfterCollapse = input(1);
  /** Separator: string, template, or omit for the default slash icon. */
  readonly separator = input<string | TemplateRef<unknown> | undefined>(undefined);
  readonly size = input<BreadcrumbsSize>('md');
  readonly overflowTrigger = input<BreadcrumbsOverflowTrigger>('click');
  readonly circleCheckboxIcon = input<TemplateRef<unknown> | undefined>(undefined);
  readonly starIcon = input<TemplateRef<unknown> | undefined>(undefined);
  readonly checkIcon = input<TemplateRef<unknown> | undefined>(undefined);
  readonly className = input('');

  /** A (non-current) breadcrumb link was clicked. */
  readonly itemClick = output<BreadcrumbItemClickEvent>();
  /** A route circle-checkbox in the overflow dropdown was toggled. */
  readonly routeToggle = output<BreadcrumbRouteToggleEvent>();
  /** A bookmark star in the overflow dropdown was toggled. */
  readonly bookmarkToggle = output<BreadcrumbBookmarkToggleEvent>();

  protected readonly isOverflowOpen = signal(false);
  protected readonly toastMessage = signal<string | null>(null);
  private toastTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Local copy of the items so toggles can update state (resets when `items` changes). */
  private readonly itemsState = linkedSignal<BreadcrumbItem[]>(() =>
    (this.items() || []).map((item, idx) => (typeof item === 'string' ? { id: `item-${idx}`, label: item } : item)),
  );

  protected readonly separatorTemplate = computed(() => {
    const s = this.separator();
    return s instanceof TemplateRef ? s : null;
  });
  protected readonly separatorText = computed(() => {
    const s = this.separator();
    return typeof s === 'string' ? s : null;
  });

  protected readonly parts = computed(() => {
    const list = this.itemsState();
    const total = list.length;
    const max = this.maxItems();
    const after = this.itemsAfterCollapse();
    const collapsed = !!max && total > max && total > 1 + after;
    if (!collapsed) return { collapsed: false, start: list, collapsedItems: [] as BreadcrumbItem[], end: [] as BreadcrumbItem[] };
    const endCount = after || 1;
    const before = this.itemsBeforeCollapse();
    const startCount = typeof before === 'number' ? before : Math.max(1, total - endCount - (total - max));
    return {
      collapsed: true,
      start: list.slice(0, startCount),
      collapsedItems: list.slice(startCount, total - endCount),
      end: list.slice(total - endCount),
    };
  });

  protected readonly classes = computed(() =>
    ['kpmg-breadcrumbs', `kpmg-breadcrumbs--${this.size()}`, this.className()].filter(Boolean).join(' '),
  );

  ngOnDestroy(): void {
    clearTimeout(this.toastTimer);
  }

  protected onDocumentMouseDown(event: Event): void {
    if (!this.isOverflowOpen()) return;
    const target = event.target as Node | null;
    const trigger = this.host.nativeElement.querySelector('.kpmg-breadcrumbs__overflow-trigger');
    const li = trigger?.closest('li');
    if (li && target && li.contains(target)) return;
    this.isOverflowOpen.set(false);
  }

  protected onLinkClick(item: BreadcrumbItem, event: Event): void {
    item.onClick?.(event);
    this.itemClick.emit({ item, event });
  }

  protected onDropdownItemClick(event: Event, item: BreadcrumbItem): void {
    item.onClick?.(event);
    this.isOverflowOpen.set(false);
  }

  private indexOf(item: BreadcrumbItem): number {
    return this.itemsState().findIndex((i) => (i.id ? i.id === item.id : i.label === item.label));
  }

  protected onCircleCheckClick(event: Event, item: BreadcrumbItem): void {
    event.stopPropagation();
    const idx = this.indexOf(item);
    if (idx === -1) return;
    const updated = [...this.itemsState()];
    const checked = updated[idx].isChecked === false;
    updated[idx] = { ...updated[idx], isChecked: checked };
    this.itemsState.set(updated);
    this.routeToggle.emit({ item: updated[idx], checked });
  }

  protected onBookmarkClick(event: Event, item: BreadcrumbItem): void {
    event.stopPropagation();
    const idx = this.indexOf(item);
    if (idx === -1) return;
    const updated = [...this.itemsState()];
    const starred = !updated[idx].isStar;
    updated[idx] = { ...updated[idx], isStar: starred };
    this.itemsState.set(updated);
    this.showToast(starred ? `★ Bookmarked "${item.label}"` : `Removed bookmark for "${item.label}"`);
    this.bookmarkToggle.emit({ item: updated[idx], starred });
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastMessage.set(null), 2500);
  }
}
