import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  linkedSignal,
  model,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type TooltipTheme = 'elevated' | 'filled';
export type TooltipVariant =
  | 'single-line'
  | 'multi-line'
  | 'rich-action'
  | 'rich-source'
  | 'rich-alert-small'
  | 'rich-alert-large'
  | 'menu-list'
  | 'menu-icon'
  | 'custom';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'side-l' | 'side-r';
export type TooltipAlign = 'center' | 'left' | 'right' | 'middle' | 'top' | 'bottom';
export type TooltipCaretSize = 'sm' | 'md' | 'lg';
export type TooltipTrigger = 'hover' | 'click' | 'manual';

export interface TooltipAction {
  label: string;
  variant?: 'outline' | 'filled';
  onClick?: () => void;
}

export interface TooltipItem {
  id?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  checked?: boolean;
  divider?: boolean;
}

const DEFAULT_MENU_ITEMS: TooltipItem[] = [
  { id: '1', label: 'Option', checked: true },
  { id: '2', label: 'Option', checked: true, divider: true },
  { id: '3', label: 'Option', checked: true },
  { id: '4', label: 'Option', checked: true },
  { id: '5', label: 'Option', checked: true, divider: true },
  { id: '6', label: 'Option', checked: true },
];
const DEFAULT_SOURCE_ITEMS: TooltipItem[] = [1, 2, 3, 4].map((n) => ({ id: String(n), label: 'Option', checked: true }));
const DEFAULT_ALERT_SMALL: TooltipItem[] = [{ id: '1', title: 'Header', subtitle: 'Supporting line...' }];
const DEFAULT_ALERT_LARGE: TooltipItem[] = [
  { id: '1', title: 'Header', subtitle: 'Supporting line...' },
  { id: '2', title: 'Header', subtitle: 'Supporting line...' },
];

const ACTION_BASE =
  'padding: 6px 14px; border-radius: 1000px; font-size: 12px; font-weight: 500; cursor: pointer;';

let nextId = 0;

/**
 * WorkBench Tooltip — mirrors packages/ui/src/components/Tooltip/Tooltip.jsx
 * (2 themes, 9 variants, 3 caret sizes, hover/click/manual triggers).
 *
 * Deviations: the anchor is projected content; set `static` to render the
 * tooltip on its own (React infers this from the absence of `children`).
 * A custom body is passed as `contentTemplate` (React: a node as `content`).
 */
@Component({
  selector: 'kpmg-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    style: 'display: contents',
    '(document:mousedown)': 'onDocumentMouseDown($event)',
  },
  template: `
    @if (isStatic()) {
      <ng-container [ngTemplateOutlet]="tooltipNode" />
    } @else {
      <div
        class="kpmg-tooltip-wrapper"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
        (focusin)="onFocus()"
        (focusout)="onBlur()"
      >
        <div
          class="kpmg-tooltip-target"
          [attr.aria-describedby]="!isMenuVariant() ? tooltipId() : null"
          [attr.aria-haspopup]="isMenuVariant() ? 'true' : null"
          [attr.aria-expanded]="isMenuVariant() ? (isOpen() ? 'true' : 'false') : null"
          (click)="onClick($event)"
        >
          <ng-content />
        </div>
        <ng-container [ngTemplateOutlet]="tooltipNode" />
      </div>
    }

    <ng-template #tooltipNode>
      <div
        [id]="tooltipId()"
        [attr.role]="isMenuVariant() ? 'menu' : 'tooltip'"
        [attr.aria-hidden]="!isOpen() && !isStatic()"
        [class]="classes()"
      >
        @if (contentTemplate(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          @switch (variant()) {
            @case ('rich-action') {
              <div class="kpmg-tooltip__header">
                @if (title()) { <h4 class="kpmg-tooltip__title">{{ title() }}</h4> }
                @if (content()) { <p class="kpmg-tooltip__body">{{ content() }}</p> }
              </div>
              <div class="kpmg-tooltip__actions">
                @if (actionsTemplate(); as tpl) {
                  <ng-container [ngTemplateOutlet]="tpl" />
                } @else if (actionList(); as list) {
                  @for (act of list; track $index) {
                    <button
                      type="button"
                      (click)="act.onClick?.()"
                      [style]="actionStyle(act.variant === 'outline')"
                    >{{ act.label }}</button>
                  }
                } @else {
                  <button type="button" [style]="actionStyle(false)">Label</button>
                  <button type="button" [style]="actionStyle(true)">Label</button>
                }
              </div>
            }
            @case ('rich-source') {
              <div class="kpmg-tooltip__header">
                @if (title()) { <h4 class="kpmg-tooltip__title">{{ title() }}</h4> }
                @if (content()) { <p class="kpmg-tooltip__body">{{ content() }}</p> }
              </div>
              <div class="kpmg-tooltip__card-list">
                @for (it of items() ?? defaultSourceItems; track it.id ?? $index) {
                  <div
                    style="display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; font-size: 13px"
                    [style.border-bottom]="$index < 3 ? '1px solid var(--color-neutral-600)' : 'none'"
                  >
                    <div style="display: flex; align-items: center; gap: 8px">
                      <ng-container [ngTemplateOutlet]="starIcon" [ngTemplateOutletContext]="{ size: 14 }" />
                      <span>{{ it.label }}</span>
                    </div>
                    @if (it.checked) {
                      <span style="color: var(--color-neutral-200); display: inline-flex">
                        <ng-container [ngTemplateOutlet]="checkIcon" [ngTemplateOutletContext]="{ size: 14 }" />
                      </span>
                    }
                  </div>
                }
              </div>
            }
            @case ('rich-alert-small') {
              <ng-container [ngTemplateOutlet]="alertCards" [ngTemplateOutletContext]="{ fallback: defaultAlertSmall }" />
            }
            @case ('rich-alert-large') {
              <ng-container [ngTemplateOutlet]="alertCards" [ngTemplateOutletContext]="{ fallback: defaultAlertLarge }" />
            }
            @case ('menu-list') {
              <ul class="kpmg-tooltip__menu-list" role="menu">
                @for (item of items() ?? defaultMenuItems; track item.id ?? $index) {
                  <li class="kpmg-tooltip__menu-item" role="menuitem">
                    <div class="kpmg-tooltip__menu-left">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color: var(--color-neutral-000)">
                        <circle cx="12" cy="12" r="10" fill="currentColor" fill-opacity="0.15" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <span>{{ item.label }}</span>
                    </div>
                  </li>
                  @if (item.divider) { <li class="kpmg-tooltip__menu-divider" role="separator"></li> }
                }
              </ul>
            }
            @case ('menu-icon') {
              <ul class="kpmg-tooltip__menu-list" role="menu">
                @for (item of items() ?? defaultMenuItems; track item.id ?? $index) {
                  <li class="kpmg-tooltip__menu-item" role="menuitem">
                    <div class="kpmg-tooltip__menu-left">
                      <span style="color: var(--color-neutral-200); display: inline-flex">
                        <ng-container [ngTemplateOutlet]="starIcon" [ngTemplateOutletContext]="{ size: 16 }" />
                      </span>
                      <span>{{ item.label }}</span>
                    </div>
                    @if (item.checked) {
                      <span style="color: var(--color-neutral-200); display: inline-flex">
                        <ng-container [ngTemplateOutlet]="checkIcon" [ngTemplateOutletContext]="{ size: 14 }" />
                      </span>
                    }
                  </li>
                  @if (item.divider) { <li class="kpmg-tooltip__menu-divider" role="separator"></li> }
                }
              </ul>
            }
            @case ('multi-line') {
              <div class="kpmg-tooltip__body">{{ content() || defaultMultiLine }}</div>
            }
            @default {
              <span>{{ content() || title() || 'Supporting text' }}</span>
            }
          }
        }
        @if (caret()) {
          <span [class]="caretClasses()" aria-hidden="true"></span>
        }
      </div>
    </ng-template>

    <ng-template #alertCards let-fallback="fallback">
      <div class="kpmg-tooltip__header">
        @if (title()) { <h4 class="kpmg-tooltip__title">{{ title() }}</h4> }
        @if (content()) { <p class="kpmg-tooltip__body">{{ content() }}</p> }
      </div>
      @if (sectionLabel()) { <div class="kpmg-tooltip__section-label">{{ sectionLabel() }}</div> }
      <div class="kpmg-tooltip__card-list">
        @for (item of items() ?? fallback; track item.id ?? $index) {
          <div class="kpmg-tooltip__card-item">
            <div class="kpmg-tooltip__card-thumb"></div>
            <div class="kpmg-tooltip__card-info">
              <span class="kpmg-tooltip__card-title">{{ item.title }}</span>
              @if (item.subtitle) { <span class="kpmg-tooltip__card-subtitle">{{ item.subtitle }}</span> }
            </div>
            <button type="button" class="kpmg-tooltip__card-action" aria-label="More options">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
              </svg>
            </button>
          </div>
        }
      </div>
    </ng-template>

    <ng-template #starIcon let-size="size">
      <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </ng-template>

    <ng-template #checkIcon let-size="size">
      <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </ng-template>
  `,
})
export class TooltipComponent {
  /** Header title for rich variants. */
  readonly title = input<string | undefined>(undefined);
  /** Text content. */
  readonly content = input<string | undefined>(undefined);
  /** Custom body (React: a node passed as `content`). */
  readonly contentTemplate = input<TemplateRef<unknown> | null>(null);
  /** elevated (white + shadow) or filled (lavender tint + shadow). */
  readonly theme = input<TooltipTheme>('elevated');
  readonly variant = input<TooltipVariant>('single-line');
  readonly placement = input<TooltipPlacement>('top');
  readonly align = input<TooltipAlign | undefined>(undefined);
  readonly caret = input(true, { transform: booleanAttribute });
  /** sm (12×6), md (18×9), lg (24×12); derived from `variant` if omitted. */
  readonly caretSize = input<TooltipCaretSize | undefined>(undefined);
  readonly trigger = input<TooltipTrigger>('hover');
  /** Open state. Two-way bindable: `[(open)]`. */
  readonly open = model<boolean | undefined>(undefined);
  /** Initial open state when `open` is not bound. */
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  /** Milliseconds before opening on hover. */
  readonly delay = input(150);
  /** Milliseconds before closing on mouseleave. */
  readonly closeDelay = input(150);
  /** Action buttons for `rich-action`: an array, or a template for custom markup. */
  readonly actions = input<TooltipAction[] | TemplateRef<unknown> | undefined>(undefined);
  readonly items = input<TooltipItem[] | undefined>(undefined);
  readonly sectionLabel = input<string | undefined>(undefined);
  /** Render the tooltip on its own, without an anchor wrapper. */
  readonly isStatic = input(false, { alias: 'static', transform: booleanAttribute });
  readonly className = input('');
  /** DOM id of the tooltip element. */
  readonly tooltipIdInput = input<string | undefined>(undefined, { alias: 'tooltipId' });

  protected readonly defaultMenuItems = DEFAULT_MENU_ITEMS;
  protected readonly defaultSourceItems = DEFAULT_SOURCE_ITEMS;
  protected readonly defaultAlertSmall = DEFAULT_ALERT_SMALL;
  protected readonly defaultAlertLarge = DEFAULT_ALERT_LARGE;
  protected readonly defaultMultiLine =
    'Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt.';

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private timer: ReturnType<typeof setTimeout> | undefined;
  private readonly generatedId = `kpmg-tooltip-${nextId++}`;
  private readonly current = linkedSignal(() => this.open() ?? this.defaultOpen());

  protected readonly isOpen = this.current.asReadonly();
  protected readonly tooltipId = computed(() => this.tooltipIdInput() || this.generatedId);

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected readonly isRichVariant = computed(() =>
    ['rich-action', 'rich-source', 'rich-alert-small', 'rich-alert-large'].includes(this.variant()),
  );
  protected readonly isMenuVariant = computed(() => ['menu-list', 'menu-icon'].includes(this.variant()));

  protected readonly actionsTemplate = computed(() => {
    const a = this.actions();
    return a instanceof TemplateRef ? a : null;
  });
  protected readonly actionList = computed(() => {
    const a = this.actions();
    return Array.isArray(a) ? a : null;
  });

  private readonly resolvedCaretSize = computed(
    () =>
      this.caretSize() ??
      (this.variant() === 'single-line' ? 'sm' : this.variant() === 'multi-line' ? 'md' : 'lg'),
  );

  private readonly normalizedPlacement = computed(() => {
    const p = this.placement();
    return p === 'side-l' ? 'left' : p === 'side-r' ? 'right' : p;
  });

  private readonly effectiveAlign = computed(
    () => this.align() ?? (['top', 'bottom'].includes(this.placement()) ? 'center' : 'middle'),
  );

  protected readonly classes = computed(() => {
    const base = this.isRichVariant() ? 'rich' : this.isMenuVariant() ? 'menu' : this.variant();
    const isStatic = this.isStatic();
    return [
      'kpmg-tooltip',
      `kpmg-tooltip--${this.theme()}`,
      `kpmg-tooltip--${base}`,
      !isStatic ? `kpmg-tooltip--placement-${this.normalizedPlacement()}` : '',
      !isStatic ? `kpmg-tooltip--align-${this.effectiveAlign()}` : '',
      this.isOpen() || isStatic ? 'kpmg-tooltip--visible' : '',
      isStatic ? 'kpmg-tooltip--static' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected readonly caretClasses = computed(
    () => `kpmg-tooltip__caret kpmg-tooltip__caret--${this.resolvedCaretSize()}`,
  );

  protected actionStyle(outline: boolean): string {
    return outline
      ? `${ACTION_BASE} border: 1px solid var(--color-blue-200); background: transparent; color: var(--color-blue-200);`
      : `${ACTION_BASE} border: none; background: var(--color-primary-action); color: #ffffff;`;
  }

  private setOpen(next: boolean): void {
    this.current.set(next);
    this.open.set(next);
  }

  protected onMouseEnter(): void {
    if (this.trigger() !== 'hover' || this.isStatic()) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setOpen(true), this.delay());
  }

  protected onMouseLeave(): void {
    if (this.trigger() !== 'hover' || this.isStatic()) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setOpen(false), this.closeDelay());
  }

  protected onClick(event: Event): void {
    if (this.trigger() !== 'click' || this.isStatic()) return;
    event.stopPropagation();
    this.setOpen(!this.isOpen());
  }

  protected onFocus(): void {
    if (this.trigger() === 'hover' && !this.isStatic()) this.setOpen(true);
  }

  protected onBlur(): void {
    if (this.trigger() === 'hover' && !this.isStatic()) this.setOpen(false);
  }

  /** Click-trigger tooltips close on an outside mousedown. */
  protected onDocumentMouseDown(event: MouseEvent): void {
    if (this.trigger() !== 'click' || !this.isOpen() || this.isStatic()) return;
    if (!this.host.nativeElement.contains(event.target as Node)) this.setOpen(false);
  }
}
