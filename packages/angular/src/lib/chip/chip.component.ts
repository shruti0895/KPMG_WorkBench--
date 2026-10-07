import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ChipBrandedIconComponent } from './chip-branded-icon.component';

export type ChipType = 'filter' | 'input' | 'assistive' | 'suggestion';
export type ChipStyleType = 'outlined' | 'elevated';
export type ChipState = 'enabled' | 'hovered' | 'pressed' | 'dragged' | 'disabled';

/**
 * WorkBench Chip — mirrors packages/ui/src/components/Chip/Chip.jsx.
 *
 * Deviations: Angular can't tell whether an output has listeners, so
 * `interactive` (React: `onClick` present) and `deletable` (React: `onDelete`
 * / `onTrailingClick` present) are explicit inputs. Icons are `<ng-template>`
 * references; `leadingIcon`/`trailingIcon` also accept `true` for the defaults.
 */
@Component({
  selector: 'kpmg-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, ChipBrandedIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div
      [class]="classes()"
      [attr.id]="chipId()"
      [attr.role]="role()"
      [attr.aria-checked]="normalizedType() === 'filter' ? selected() : null"
      [attr.aria-pressed]="normalizedType() !== 'filter' && interactive() ? selected() : null"
      [attr.aria-disabled]="isDisabled() ? true : null"
      [attr.aria-label]="computedAriaLabel()"
      [attr.tabindex]="isDisabled() ? -1 : 0"
      (click)="onClick($event)"
      (keydown)="onKeydown($event)"
    >
      <div class="kpmg-chip__content">
        @if (hasLeading()) {
          <span class="kpmg-chip__leading-icon" aria-hidden="true">
            @if (isBranded() || isBrandedConfig()) {
              <kpmg-chip-branded-icon />
            } @else if (leadingTemplate(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else {
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M13.8639 3.65609C14.0533 3.85704 14.0439 4.17348 13.8429 4.36288L5.91309 11.8368C5.67573 12.0605 5.30311 12.0536 5.07417 11.8213L2.39384 9.10093C2.20003 8.90422 2.20237 8.58765 2.39907 8.39384C2.59578 8.20003 2.91235 8.20237 3.10616 8.39907L5.51192 10.8407L13.1571 3.63516C13.358 3.44577 13.6745 3.45513 13.8639 3.65609Z" fill="currentColor" />
              </svg>
            }
          </span>
        }
        @if (!isIconOnly()) {
          <div class="kpmg-chip__label"><span class="kpmg-chip__label-text">{{ label() }}</span></div>
        }
        @if (hasTrailing()) {
          @if (deletable()) {
            <button
              type="button"
              class="kpmg-chip__trailing-button"
              [disabled]="isDisabled()"
              [attr.aria-label]="'Remove ' + label()"
              [attr.tabindex]="isDisabled() ? -1 : 0"
              (click)="onTrailingClick($event)"
            >
              <ng-container [ngTemplateOutlet]="trailingContent" />
            </button>
          } @else {
            <span class="kpmg-chip__trailing-icon" aria-hidden="true">
              <ng-container [ngTemplateOutlet]="trailingContent" />
            </span>
          }
        }
      </div>
    </div>

    <ng-template #trailingContent>
      @if (trailingTemplate(); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" />
      } @else {
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2.58859 2.71569L2.64645 2.64645C2.82001 2.47288 3.08944 2.4536 3.28431 2.58859L3.35355 2.64645L8 7.293L12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645C13.5488 2.84171 13.5488 3.15829 13.3536 3.35355L8.707 8L13.3536 12.6464C13.5271 12.82 13.5464 13.0894 13.4114 13.2843L13.3536 13.3536C13.18 13.5271 12.9106 13.5464 12.7157 13.4114L12.6464 13.3536L8 8.707L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536C2.45118 13.1583 2.45118 12.8417 2.64645 12.6464L7.293 8L2.64645 3.35355C2.47288 3.17999 2.4536 2.91056 2.58859 2.71569L2.64645 2.64645L2.58859 2.71569Z" fill="currentColor" />
        </svg>
      }
    </ng-template>
  `,
})
export class ChipComponent {
  /** filter (toggleable), input (tags), assistive (quick actions), suggestion (prompt pills). */
  readonly type = input<ChipType>('filter');
  readonly styleType = input<ChipStyleType>('outlined');
  /** Explicit layout: 'icon-only', 'label-only', 'leading-icon', 'trailing-icon', 'both-icons', … */
  readonly configuration = input<string | undefined>(undefined);
  readonly selected = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Force a visual state for previews/testing. */
  readonly state = input<ChipState | undefined>(undefined);
  readonly label = input('Label');
  /** `true` → default checkmark; a template → custom icon; `false` → none. */
  readonly leadingIcon = input<TemplateRef<unknown> | boolean | undefined>(undefined);
  /** `true` → default dismiss icon; a template → custom icon. */
  readonly trailingIcon = input<TemplateRef<unknown> | boolean | undefined>(undefined);
  readonly iconOnly = input(false, { transform: booleanAttribute });
  /** Use the branded product-logo leading icon. */
  readonly isBranded = input(false, { transform: booleanAttribute });
  /** Gives the chip button/checkbox semantics (React: `onClick` provided). */
  readonly interactive = input(false, { transform: booleanAttribute });
  /** Renders the trailing icon as a button emitting `chipDelete` (React: `onDelete`/`onTrailingClick`). */
  readonly deletable = input(false, { transform: booleanAttribute });
  /** DOM id of the chip element (named `chipId` so it isn't duplicated on the host). */
  readonly chipId = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly className = input('');

  /** Chip body click / Enter / Space. Named to avoid colliding with the native `click` event. */
  readonly chipClick = output<Event>();
  /** Trailing icon button click. */
  readonly chipDelete = output<Event>();

  protected readonly normalizedType = computed(() => (this.type() || 'filter').toLowerCase());
  private readonly isElevated = computed(() => (this.styleType() || 'outlined').toLowerCase() === 'elevated');
  protected readonly isIconOnly = computed(() => {
    const c = this.configuration();
    return this.iconOnly() || c === 'icon-only' || c === 'Icon only';
  });
  protected readonly isDisabled = computed(() => this.disabled() || this.state() === 'disabled');
  protected readonly isBrandedConfig = computed(() => !!this.configuration()?.toLowerCase().includes('branded'));

  private readonly resolved = computed(() => {
    let leading = false;
    let trailing = false;
    const configuration = this.configuration();
    if (configuration) {
      const c = configuration.toLowerCase();
      if (c.includes('icon only') || c === 'icon-only') {
        trailing = true;
      } else if (c.includes('icons') || c === 'both-icons' || c === 'both') {
        leading = true;
        trailing = true;
      } else if (c.includes('leading') || c === 'leading-icon') {
        leading = true;
      } else if (c.includes('trailing') || c === 'trailing-icon') {
        trailing = true;
      }
    } else if (this.isIconOnly()) {
      trailing = true;
    } else {
      const lead = this.leadingIcon();
      const trail = this.trailingIcon();
      if (lead !== undefined && lead !== null && lead !== false) leading = true;
      if (trail !== undefined && trail !== null && trail !== false) trailing = true;
      // Filter chips default to a checkmark when selected and leadingIcon is unspecified.
      if (this.normalizedType() === 'filter' && lead === undefined && this.selected()) leading = true;
    }
    return { leading, trailing };
  });
  protected readonly hasLeading = computed(() => this.resolved().leading);
  protected readonly hasTrailing = computed(() => this.resolved().trailing);

  protected readonly leadingTemplate = computed(() => {
    const v = this.leadingIcon();
    return v instanceof TemplateRef ? v : null;
  });
  protected readonly trailingTemplate = computed(() => {
    const v = this.trailingIcon();
    return v instanceof TemplateRef ? v : null;
  });

  protected readonly role = computed(() =>
    this.interactive() ? (this.normalizedType() === 'filter' ? 'checkbox' : 'button') : null,
  );

  protected readonly computedAriaLabel = computed(() => this.ariaLabel() ?? (this.isIconOnly() ? this.label() : null));

  protected readonly classes = computed(() =>
    [
      'kpmg-chip',
      this.isElevated() ? 'kpmg-chip--elevated' : 'kpmg-chip--outlined',
      this.selected() ? 'kpmg-chip--selected' : '',
      this.isDisabled() ? 'kpmg-chip--disabled' : '',
      this.isIconOnly() ? 'kpmg-chip--icon-only' : '',
      this.state() ? `kpmg-chip--state-${this.state()!.toLowerCase()}` : '',
      `kpmg-chip--type-${this.normalizedType()}`,
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClick(event: Event): void {
    if (this.isDisabled()) return;
    this.chipClick.emit(event);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.chipClick.emit(event);
    }
  }

  protected onTrailingClick(event: Event): void {
    event.stopPropagation(); // don't bubble to the chip click
    if (this.isDisabled()) return;
    this.chipDelete.emit(event);
  }
}
