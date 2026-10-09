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
  output,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DropdownItemGroupComponent } from '../menu/dropdown-item-group.component';
import { DropdownGroupDensity, DropdownGroupType, DropdownItem, DropdownItemSelectEvent } from '../menu/menu.types';

export type TooltipTheme = 'elevated' | 'filled';
export type TooltipType = 'base-small' | 'base-large' | 'rich' | 'menu';
export type TooltipPosition = 'top' | 'bottom' | 'side-l' | 'side-r';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlignment = 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom';
export type TooltipCaretSize = 'sm' | 'md' | 'lg';
export type TooltipTrigger = 'hover' | 'click' | 'manual';

export interface TooltipAction {
  label?: string;
  variant?: 'primary' | 'outline';
  onClick?: (event: Event) => void;
}

/** Menu item descriptor (legacy `id`/`checked`/`divider` or DropdownItemGroup `value`/`selected`/`type: 'divider'`). */
export interface TooltipItem {
  id?: string;
  value?: string;
  label?: string;
  checked?: boolean;
  selected?: boolean;
  divider?: boolean;
  type?: 'divider';
  disabled?: boolean;
  onClick?: (event: Event) => void;
}

const DEFAULT_MENU_ITEMS: DropdownItem[] = [
  { label: 'Option', value: 'Option 1', selected: true },
  { type: 'divider' },
  { label: 'Option', value: 'Option 2', selected: true },
  { label: 'Option', value: 'Option 3', selected: true },
  { label: 'Option', value: 'Option 4', selected: true },
  { label: 'Option', value: 'Option 5', selected: true },
  { type: 'divider' },
  { label: 'Option', value: 'Option 6', selected: true },
];

const DEFAULT_ACTIONS: TooltipAction[] = [
  { label: 'Label', variant: 'primary' },
  { label: 'Label', variant: 'outline' },
];

let nextId = 0;

/**
 * WorkBench Tooltip — mirrors packages/ui/src/components/Tooltip/Tooltip.jsx
 * (4 types, 2 themes, 4 caret positions, 3 caret sizes, hover/click/manual triggers).
 *
 * Deviations: the anchor is projected content; set `static` to render the
 * tooltip on its own (React infers this from the absence of `children`).
 * Custom action markup is passed as a template in `actions`.
 * `onItemClick`/`onSelect`/`onOpenChange` map to the `itemClick`/`itemSelect` outputs and `[(open)]`.
 */
@Component({
  selector: 'kpmg-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, DropdownItemGroupComponent],
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
          [attr.aria-describedby]="resolvedType() !== 'menu' ? tooltipId() : null"
          [attr.aria-haspopup]="resolvedType() === 'menu' ? 'true' : null"
          [attr.aria-expanded]="resolvedType() === 'menu' ? (isOpen() ? 'true' : 'false') : null"
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
        [attr.role]="resolvedType() === 'menu' ? 'menu' : 'tooltip'"
        [attr.aria-hidden]="!isOpen() && !isStatic()"
        [class]="classes()"
        [style]="combinedStyles()"
      >
        @if (caret() && resolvedPosition() === 'top') {
          <ng-container [ngTemplateOutlet]="caretTpl" [ngTemplateOutletContext]="{ pos: 'top' }" />
        }
        @if (caret() && resolvedPosition() === 'side-l') {
          <ng-container [ngTemplateOutlet]="caretTpl" [ngTemplateOutletContext]="{ pos: 'side-l' }" />
        }

        <div class="kpmg-tooltip__body-wrap">
          @switch (resolvedType()) {
            @case ('base-small') {
              <div class="kpmg-tooltip__base-small">
                <span class="kpmg-tooltip__base-small-text">{{ content() || text() || description() || title() || 'Tooltip text' }}</span>
              </div>
            }
            @case ('base-large') {
              <div class="kpmg-tooltip__base-large">
                <p class="kpmg-tooltip__base-large-text">{{ content() || description() || text() || defaultBaseLarge }}</p>
              </div>
            }
            @case ('rich') {
              <div class="kpmg-tooltip__rich">
                <div class="kpmg-tooltip__rich-header">
                  @if (displayTitle()) { <h4 class="kpmg-tooltip__rich-title">{{ displayTitle() }}</h4> }
                  @if (displayDesc()) { <p class="kpmg-tooltip__rich-desc">{{ displayDesc() }}</p> }
                </div>
                @if (secondaryText()) {
                  <div class="kpmg-tooltip__divider"></div>
                  <p class="kpmg-tooltip__rich-secondary">{{ secondaryText() }}</p>
                }
                @if (actionTemplate(); as tpl) {
                  <div class="kpmg-tooltip__rich-actions"><ng-container [ngTemplateOutlet]="tpl" /></div>
                } @else if (actionList(); as list) {
                  <div class="kpmg-tooltip__rich-actions">
                    @for (act of list; track $index) {
                      <button
                        type="button"
                        (click)="act.onClick?.($event)"
                        [class]="'kpmg-tooltip__rich-btn kpmg-tooltip__rich-btn--' + (act.variant || 'primary')"
                      >{{ act.label || 'Label' }}</button>
                    }
                  </div>
                }
              </div>
            }
            @case ('menu') {
              <div class="kpmg-tooltip__menu" role="menu">
                <kpmg-dropdown-item-group
                  [density]="menuDensity()"
                  [type]="menuType()"
                  [items]="menuItems()"
                  [selectedValues]="selectedValues()"
                  [defaultSelectedValues]="defaultSelectedValues()"
                  (itemSelect)="onItemSelect($event)"
                />
              </div>
            }
          }
        </div>

        @if (caret() && resolvedPosition() === 'bottom') {
          <ng-container [ngTemplateOutlet]="caretTpl" [ngTemplateOutletContext]="{ pos: 'bottom' }" />
        }
        @if (caret() && resolvedPosition() === 'side-r') {
          <ng-container [ngTemplateOutlet]="caretTpl" [ngTemplateOutletContext]="{ pos: 'side-r' }" />
        }
      </div>
    </ng-template>

    <ng-template #caretTpl let-pos="pos">
      <div
        [class]="'kpmg-tooltip__caret-slot kpmg-tooltip__caret-slot--' + pos + ' kpmg-tooltip__caret-slot--align-' + resolvedAlignment()"
        aria-hidden="true"
      >
        <svg
          [attr.width]="caretGeometry().svgWidth"
          [attr.height]="caretGeometry().svgHeight"
          [attr.viewBox]="'0 0 ' + caretGeometry().svgWidth + ' ' + caretGeometry().svgHeight"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="kpmg-tooltip__caret-svg"
        >
          <path [attr.d]="caretGeometry().path" [attr.fill]="caretColor()" />
        </svg>
      </div>
    </ng-template>
  `,
})
export class TooltipComponent {
  /** Canonical variant type. */
  readonly type = input<TooltipType | undefined>(undefined);
  /** Backward-compatible alias for `type`. */
  readonly variant = input<string | undefined>(undefined);
  /** Edge of the tooltip where the caret is positioned. */
  readonly position = input<TooltipPosition | undefined>(undefined);
  /** Placement relative to the anchor in interactive mode. */
  readonly placement = input<TooltipPlacement | undefined>(undefined);
  /** Caret alignment along the edge. */
  readonly alignment = input<TooltipAlignment | undefined>(undefined);
  /** Backward-compatible alias for `alignment`. */
  readonly align = input<TooltipAlignment | undefined>(undefined);
  readonly theme = input<TooltipTheme>('elevated');
  readonly caret = input(true, { transform: booleanAttribute });
  readonly caretSize = input<TooltipCaretSize | undefined>(undefined);
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly content = input<string | undefined>(undefined);
  readonly text = input<string | undefined>(undefined);
  readonly secondaryText = input<string | undefined>(undefined);
  /** Action buttons for rich tooltips: an array, or a template for custom markup. */
  readonly actions = input<TooltipAction[] | TemplateRef<unknown> | undefined>(undefined);
  /** Items for menu tooltips. */
  readonly items = input<TooltipItem[] | undefined>(undefined);
  readonly menuDensity = input<DropdownGroupDensity>('small');
  readonly menuType = input<DropdownGroupType>('checklist');
  readonly selectedValues = input<string[] | undefined>(undefined);
  readonly defaultSelectedValues = input<string[] | undefined>(undefined);
  readonly trigger = input<TooltipTrigger>('hover');
  /** Open state. Two-way bindable: `[(open)]`. */
  readonly open = model<boolean | undefined>(undefined);
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly delay = input(150);
  readonly closeDelay = input(150);
  /** Render the tooltip on its own, without an anchor wrapper. */
  readonly isStatic = input(false, { alias: 'static', transform: booleanAttribute });
  readonly width = input<string | number | undefined>(undefined);
  readonly minWidth = input<string | number | undefined>(undefined);
  readonly maxWidth = input<string | number | undefined>(undefined);
  readonly className = input('');
  /** DOM id of the tooltip element. */
  readonly tooltipIdInput = input<string | undefined>(undefined, { alias: 'tooltipId' });

  /** A menu item was clicked (React: `onItemClick(item, e)`). */
  readonly itemClick = output<{ item: DropdownItem; event: Event }>();
  /** A menu selection changed (React: `onSelect`). */
  readonly itemSelect = output<DropdownItemSelectEvent>();

  protected readonly defaultBaseLarge =
    'Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private timer: ReturnType<typeof setTimeout> | undefined;
  private readonly generatedId = `kpmg-tooltip-${nextId++}`;
  private readonly current = linkedSignal(() => this.open() ?? this.defaultOpen());

  protected readonly isOpen = this.current.asReadonly();
  protected readonly tooltipId = computed(() => this.tooltipIdInput() || this.generatedId);

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected readonly resolvedType = computed<TooltipType>(() => {
    const raw = (this.type() || this.variant() || 'base-small').toLowerCase();
    if (raw === 'base-large' || raw === 'multi-line') return 'base-large';
    if (raw === 'rich' || raw.startsWith('rich-')) return 'rich';
    if (raw === 'menu' || raw === 'menu-list' || raw === 'menu-icon') return 'menu';
    return 'base-small';
  });

  protected readonly resolvedPosition = computed<TooltipPosition>(() => {
    const pos = this.position();
    if (pos) {
      const p = pos.toLowerCase();
      if (p === 'bottom') return 'bottom';
      if (p === 'side-l' || p === 'left') return 'side-l';
      if (p === 'side-r' || p === 'right') return 'side-r';
      return 'top';
    }
    const pl = this.placement()?.toLowerCase();
    if (pl === 'top') return 'bottom';
    if (pl === 'left') return 'side-r';
    if (pl === 'right') return 'side-l';
    return 'top';
  });

  protected readonly resolvedAlignment = computed(() => {
    const raw = (this.alignment() || this.align() || '').toLowerCase();
    const side = this.resolvedPosition() === 'side-l' || this.resolvedPosition() === 'side-r';
    if (side) return raw === 'top' ? 'top' : raw === 'bottom' ? 'bottom' : 'middle';
    return raw === 'left' ? 'left' : raw === 'right' ? 'right' : 'center';
  });

  private readonly resolvedCaretSize = computed<TooltipCaretSize>(
    () =>
      this.caretSize() ??
      (this.resolvedType() === 'base-small' ? 'sm' : this.resolvedType() === 'rich' ? 'lg' : 'md'),
  );

  protected readonly caretColor = computed(() =>
    this.theme() === 'filled'
      ? 'var(--color-tooltip-filled-bg, #f5f5fe)'
      : 'var(--color-tooltip-elevated-bg, #ffffff)',
  );

  protected readonly caretGeometry = computed(() => {
    const s = this.resolvedCaretSize();
    const w = s === 'sm' ? 12 : s === 'lg' ? 24 : 18;
    const h = s === 'sm' ? 6 : s === 'lg' ? 12 : 9;
    const side = this.resolvedPosition() === 'side-l' || this.resolvedPosition() === 'side-r';
    let path = '';
    switch (this.resolvedPosition()) {
      case 'top': path = `M0 ${h} L${w / 2} 0 L${w} ${h} Z`; break;
      case 'bottom': path = `M0 0 L${w / 2} ${h} L${w} 0 Z`; break;
      case 'side-l': path = `M${h} 0 L0 ${w / 2} L${h} ${w} Z`; break;
      case 'side-r': path = `M0 0 L${h} ${w / 2} L0 ${w} Z`; break;
    }
    return { svgWidth: side ? h : w, svgHeight: side ? w : h, path };
  });

  protected readonly displayTitle = computed(() => (this.title() !== undefined ? this.title() : 'Title'));
  protected readonly displayDesc = computed(
    () =>
      this.description() ||
      this.content() ||
      'Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  );

  protected readonly actionTemplate = computed(() => {
    const a = this.actions();
    return a instanceof TemplateRef ? a : null;
  });
  protected readonly actionList = computed(() => {
    const a = this.actions();
    if (a === undefined) return DEFAULT_ACTIONS;
    return Array.isArray(a) ? a : null;
  });

  protected readonly menuItems = computed<DropdownItem[]>(() => {
    const items = this.items();
    if (!items) return DEFAULT_MENU_ITEMS;
    return items.map((item, idx) => {
      if (item.type === 'divider' || item.divider) return { type: 'divider' } as DropdownItem;
      return {
        label: item.label || 'Option',
        value: item.value || item.id || `opt-${idx}`,
        selected: item.selected !== undefined ? item.selected : (item.checked ?? true),
        disabled: item.disabled,
        onClick: item.onClick,
      };
    });
  });

  protected readonly combinedStyles = computed(() => {
    const w = this.width();
    const px = (v: string | number) => (typeof v === 'number' ? `${v}px` : v);
    const s: Record<string, string> = {};
    if (w) { s['width'] = px(w); s['max-width'] = px(w); }
    const min = this.minWidth();
    if (min) s['min-width'] = px(min);
    const max = this.maxWidth();
    if (max) s['max-width'] = px(max);
    return s;
  });

  protected readonly classes = computed(() => {
    const isStatic = this.isStatic();
    const placement = this.placement();
    return [
      'kpmg-tooltip',
      `kpmg-tooltip--${this.resolvedType()}`,
      `kpmg-tooltip--pos-${this.resolvedPosition()}`,
      `kpmg-tooltip--align-${this.resolvedAlignment()}`,
      `kpmg-tooltip--theme-${this.theme()}`,
      this.isOpen() || isStatic ? 'kpmg-tooltip--visible' : '',
      isStatic ? 'kpmg-tooltip--static' : '',
      !isStatic
        ? placement
          ? `kpmg-tooltip--placement-${placement}`
          : `kpmg-tooltip--anchor-for-${this.resolvedPosition()}`
        : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  private setOpen(next: boolean): void {
    this.current.set(next);
    this.open.set(next);
  }

  protected onItemSelect(e: DropdownItemSelectEvent): void {
    this.itemClick.emit({ item: e.item, event: e.event });
    this.itemSelect.emit(e);
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
