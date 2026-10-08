import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  MENU_CONTEXT,
  MenuContext,
  MenuDensity,
  MenuPlacement,
  MenuSelectEvent,
  MenuTriggerContext,
  MenuType,
} from './menu.types';

/**
 * WorkBench Menu container — mirrors the `Menu` export of
 * packages/ui/src/components/Menu/Menu.jsx. Popover positioning, Escape /
 * click-outside dismiss, arrow/Home/End keyboard navigation, and the shared
 * context (density, type, closeOnSelect) consumed by `kpmg-menu-item`.
 *
 * Deviations: React's `trigger` (node | render function) is a `TemplateRef`
 * receiving `{ open, toggle }`; set `triggerWrapped` to get React's node-style
 * behaviour (template wrapped in a clickable `role="button"` div). `header` is a
 * string, or a `headerTemplate` for rich content. `style`/`role` are named
 * `menuStyle`/`menuRole` to avoid clashing with host attributes. `onClose` →
 * `closed`, `onSelect` → `itemSelect`. `open` is two-way bindable.
 */
@Component({
  selector: 'kpmg-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  providers: [{ provide: MENU_CONTEXT, useExisting: forwardRef(() => MenuComponent) }],
  host: {
    style: 'display: contents',
    '(document:mousedown)': 'onDocumentMouseDown($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
  template: `
    <ng-template #menuContent>
      <div
        #menuEl
        [class]="menuClasses()"
        [style]="mergedStyle()"
        [attr.role]="menuRole()"
        tabindex="-1"
        (keydown)="onMenuKeydown($event)"
      >
        @if (headerTemplate(); as tpl) {
          <div class="kpmg-menu__header"><ng-container [ngTemplateOutlet]="tpl" /></div>
        } @else if (header()) {
          <div class="kpmg-menu__header">{{ header() }}</div>
        }
        <ng-content />
      </div>
    </ng-template>

    @if (inline()) {
      <ng-container [ngTemplateOutlet]="menuContent" />
    } @else {
      <div class="kpmg-menu-wrapper" #wrapper>
        @if (trigger(); as tpl) {
          @if (triggerWrapped()) {
            <div role="button" tabindex="0" (click)="toggle()" (keydown)="onTriggerKeydown($event)">
              <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="triggerContext()" />
            </div>
          } @else {
            <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="triggerContext()" />
          }
        }
        @if (isOpen()) {
          <ng-container [ngTemplateOutlet]="menuContent" />
        }
      </div>
    }
  `,
})
export class MenuComponent implements MenuContext {
  /** Open state (ignored when `inline`). Two-way bindable: `[(open)]`. */
  readonly open = model(true);
  /** Trigger template; receives `{ open, toggle }`. */
  readonly trigger = input<TemplateRef<MenuTriggerContext> | null>(null);
  /** Wrap the trigger in a clickable `role="button"` div that toggles the menu (React's node trigger). */
  readonly triggerWrapped = input(false, { transform: booleanAttribute });
  readonly placement = input<MenuPlacement>('bottom-left');
  readonly type = input<MenuType>('dropdown');
  readonly density = input<MenuDensity>('medium');
  readonly header = input<string | undefined>(undefined);
  readonly headerTemplate = input<TemplateRef<unknown> | null>(null);
  /** Pixels (number) or any CSS width. */
  readonly width = input<number | string | undefined>(undefined);
  readonly elevation = input(true, { transform: booleanAttribute });
  /** Render as a static container instead of an anchored popover. */
  readonly inline = input(false, { transform: booleanAttribute });
  readonly closeOnSelect = input(true, { transform: booleanAttribute });
  readonly className = input('');
  /** Extra inline styles for the menu element (React: `style`). */
  readonly menuStyle = input<Record<string, string | number> | null>(null);
  /** ARIA role of the menu element (React: `role`). */
  readonly menuRole = input('menu');

  /** An item was selected (React: `onSelect`). */
  readonly itemSelect = output<MenuSelectEvent>();
  /** The menu closed itself (Escape, outside click, select, toggle) (React: `onClose`). */
  readonly closed = output<void>();

  private readonly doc = inject(DOCUMENT);
  private readonly wrapper = viewChild<ElementRef<HTMLElement>>('wrapper');
  private readonly menuEl = viewChild<ElementRef<HTMLElement>>('menuEl');

  protected readonly isOpen = computed(() => this.open());

  protected readonly triggerContext = computed<MenuTriggerContext>(() => ({
    open: this.open(),
    toggle: () => this.toggle(),
  }));

  protected readonly menuClasses = computed(() =>
    [
      'kpmg-menu',
      `kpmg-menu--${this.type()}`,
      this.inline() ? 'kpmg-menu--inline' : `kpmg-menu--popover kpmg-menu--placement-${this.placement()}`,
      !this.elevation() ? 'kpmg-menu--flat' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly mergedStyle = computed(() => {
    const w = this.width();
    const out: Record<string, string> = {};
    if (w) out['width'] = typeof w === 'number' ? `${w}px` : w;
    const extra = this.menuStyle();
    if (extra) for (const [k, v] of Object.entries(extra)) out[k] = String(v);
    return out;
  });

  selectItem(value: unknown, event: Event): void {
    this.itemSelect.emit({ value, event });
    if (!this.inline() && this.closeOnSelect()) this.close();
  }

  private close(): void {
    this.open.set(false);
    this.closed.emit();
  }

  protected toggle(): void {
    const next = !this.open();
    this.open.set(next);
    if (!next) this.closed.emit();
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    // Only when the wrapper itself has focus; a focused inner button already turns Enter/Space into a click.
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  protected onDocumentMouseDown(event: MouseEvent): void {
    if (this.inline() || !this.open()) return;
    const wrapper = this.wrapper()?.nativeElement;
    if (wrapper && !wrapper.contains(event.target as Node)) this.close();
  }

  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (this.inline() || !this.open()) return;
    if (event.key === 'Escape') this.close();
  }

  protected onMenuKeydown(event: KeyboardEvent): void {
    const menu = this.menuEl()?.nativeElement;
    if (!menu) return;
    const items = Array.from(
      menu.querySelectorAll<HTMLElement>('.kpmg-menu-item:not(:disabled):not(.kpmg-menu-item--disabled)'),
    );
    if (!items.length) return;
    const current = items.indexOf(this.doc.activeElement as HTMLElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[current < items.length - 1 ? current + 1 : 0]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[current > 0 ? current - 1 : items.length - 1]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  }
}
