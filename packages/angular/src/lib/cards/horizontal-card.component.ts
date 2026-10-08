import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CardToggleEvent } from './card-events';
import {
  HorizontalCardChevronIconComponent,
  HorizontalCardCheckmarkIconComponent,
  HorizontalCardCircleCheckIconComponent,
  HorizontalCardCircleLightCheckIconComponent,
  HorizontalCardCircleUncheckedIconComponent,
  HorizontalCardMoreIconComponent,
} from './cards-icons.component';

export type HorizontalCardSize = 'Small' | 'Medium' | 'Large' | 'Extra large' | 'Largest';
export type HorizontalCardType =
  | 'Image'
  | 'Image and arrow icon'
  | 'Image and arrow'
  | 'Image and checkmark'
  | 'Image and more icon'
  | 'Image and status';
export type HorizontalCardStyle = 'Outlined' | 'Elevated' | 'Filled' | 'Missing' | 'Warning';
export type HorizontalCardCheckVariant =
  | 'default'
  | 'checked'
  | 'unchecked'
  | 'unchecked-light'
  | 'indeterminate'
  | 'error-checked'
  | 'error-unchecked'
  | 'error-checked-light'
  | 'error-indeterminate'
  | 'primary'
  | 'purple'
  | 'error';
export type HorizontalCardCheckState = 'enabled' | 'hovered' | 'pressed' | 'disabled';

/** Extra props for the checkbox button (React: `checkboxProps`); only `className` and `style` are applied. */
export interface HorizontalCardCheckboxProps {
  className?: string;
  style?: Record<string, string | number>;
}

/** Plain-object description of a HorizontalCard (used by HorizontalCardsRich item lists). */
export interface HorizontalCardItem {
  id?: string | number;
  size?: HorizontalCardSize;
  type?: HorizontalCardType;
  styleVariant?: HorizontalCardStyle;
  title?: string;
  supportingText?: string;
  bodyText?: string;
  imageSrc?: string;
  imageAlt?: string;
  hasImage?: boolean;
  checked?: boolean;
  checkVariant?: HorizontalCardCheckVariant;
  checkState?: HorizontalCardCheckState;
  checkboxShape?: 'circle' | 'square';
  checkColor?: string;
  tickColor?: string;
  showChip?: boolean;
  statusChip?: string;
  statusText1?: string;
  statusText2?: string;
  progress?: number;
  hasProgress?: boolean;
  progressColor?: string;
}

/** Fully-resolved item (every default applied). */
export type ResolvedHorizontalCardItem = HorizontalCardItem &
  Required<Pick<HorizontalCardItem, 'size' | 'type' | 'styleVariant' | 'title' | 'supportingText' | 'bodyText' | 'imageAlt' | 'hasImage' | 'checked' | 'checkVariant' | 'checkState' | 'checkboxShape' | 'tickColor' | 'statusChip' | 'statusText1' | 'statusText2' | 'progress' | 'hasProgress'>>;

/** Default prop values of HorizontalCard, also applied to HorizontalCardsRich items. */
export const HORIZONTAL_CARD_DEFAULTS = {
  size: 'Medium',
  type: 'Image',
  styleVariant: 'Outlined',
  title: 'Header',
  supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  bodyText: 'Description text Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh',
  imageAlt: 'Card thumbnail',
  hasImage: true,
  checked: false,
  checkVariant: 'default',
  checkState: 'enabled',
  checkboxShape: 'circle',
  tickColor: '#ffffff',
  statusChip: 'Label',
  statusText1: 'Supporting line text lorem ipsum',
  statusText2: 'Supporting line text lorem ipsum',
  progress: 65,
  hasProgress: true,
} as const satisfies HorizontalCardItem;

interface CheckboxColors {
  fill: string;
  stroke: string;
  hoverHalo: string;
  pressedHalo: string;
}

/**
 * WorkBench HorizontalCard — mirrors packages/ui/src/components/Cards/Cards.jsx (`HorizontalCard`, 67 Figma variants).
 *
 * Deviations: `onClick` presence is not detectable, so set `clickable` (adds
 * `horizontal-card--clickable`) and listen to `cardClick`; `onCheckChange(e, next)` is the
 * `checkChange` output (`{ event, value }`) and `checked` is a two-way `model()`;
 * `onArrowClick`/`onMoreClick` are the `arrowClick`/`moreClick` outputs; `checkboxProps`
 * only honours `className` and `style`. Quirk kept from React: the circle checkbox's
 * `aria-checked` is derived from `variant.includes('checked')`, which is also true for 'unchecked'.
 */
@Component({
  selector: 'kpmg-horizontal-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    HorizontalCardChevronIconComponent,
    HorizontalCardCheckmarkIconComponent,
    HorizontalCardCircleCheckIconComponent,
    HorizontalCardCircleLightCheckIconComponent,
    HorizontalCardCircleUncheckedIconComponent,
    HorizontalCardMoreIconComponent,
  ],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" (click)="cardClick.emit($event)">
      @if (isStatus()) {
        <div class="horizontal-card__status-layout">
          <div class="horizontal-card__status-content">
            <div class="horizontal-card__status-header">
              <span class="horizontal-card__status-title">{{ title() }}</span>
              @if (shouldRenderChip() && statusChip()) {
                <span class="horizontal-card__status-chip">{{ statusChip() }}</span>
              }
            </div>
            <div class="horizontal-card__status-texts">
              @if (statusText1()) {
                <p class="horizontal-card__status-subtext">{{ statusText1() }}</p>
              }
              @if (statusText2()) {
                <p class="horizontal-card__status-subtext">{{ statusText2() }}</p>
              }
            </div>
            @if (hasProgress()) {
              <div class="horizontal-card__status-progress">
                <div
                  class="horizontal-card__status-progress-fill"
                  [style.width.%]="clampedProgress()"
                  [style.background-color]="progressColor() || null"
                ></div>
              </div>
            }
          </div>
          <div class="horizontal-card__trailing">
            <ng-container [ngTemplateOutlet]="checkboxTpl" />
          </div>
        </div>
      } @else {
        <div class="horizontal-card__inner">
          @if (shouldRenderImage()) {
            <div
              [class]="'horizontal-card__media horizontal-card__media--size-' + thumbSize()"
              [style.width.px]="thumbSize()"
              [style.height.px]="thumbSize()"
              [style.min-width.px]="thumbSize()"
            >
              @if (imageSrc()) {
                <img [src]="imageSrc()" [alt]="imageAlt()" class="horizontal-card__img" />
              } @else {
                <div class="horizontal-card__gradient-box"></div>
              }
            </div>
          }

          <div class="horizontal-card__content">
            <h4 class="horizontal-card__title">{{ title() }}</h4>

            @if (!isSmall() && supportingText()) {
              <p [class]="'horizontal-card__supporting-text horizontal-card__supporting-text--' + sizeSlug()">{{ supportingText() }}</p>
            }

            @if (isLargest()) {
              <hr class="horizontal-card__divider" />
              @if (bodyText()) {
                <p class="horizontal-card__body-text">{{ bodyText() }}</p>
              }
            }

            @if (isExtraLarge() && bodyText()) {
              <p class="horizontal-card__body-text">{{ bodyText() }}</p>
            }
          </div>

          <div class="horizontal-card__trailing">
            @if (type() === 'Image and checkmark') {
              <ng-container [ngTemplateOutlet]="checkboxTpl" />
            }

            @if (type() === 'Image and arrow icon' || type() === 'Image and arrow') {
              <button type="button" class="horizontal-card__icon-btn" (click)="onArrow($event)" aria-label="Open">
                <kpmg-horizontal-card-chevron-icon [size]="20" />
              </button>
            }

            @if (type() === 'Image and more icon') {
              <button type="button" class="horizontal-card__icon-btn" (click)="onMore($event)" aria-label="More options">
                <kpmg-horizontal-card-more-icon [size]="20" />
              </button>
            }
          </div>
        </div>
      }
    </div>

    <ng-template #checkboxTpl>
      @if (checkboxShape() === 'square') {
        <button
          type="button"
          [class]="squareCheckboxClasses()"
          role="checkbox"
          [attr.aria-checked]="isChecked()"
          aria-label="Toggle card selection"
          (click)="onCheckboxClick($event)"
        >
          @if (isChecked()) {
            <kpmg-horizontal-card-checkmark-icon [size]="14" [color]="tickColor()" />
          }
        </button>
      } @else {
        <button
          type="button"
          [class]="circleCheckboxClasses()"
          role="checkbox"
          [attr.aria-checked]="resolvedVariant().includes('checked')"
          aria-label="Toggle card selection"
          [disabled]="checkState() === 'disabled'"
          [style]="circleCheckboxStyle()"
          (click)="onCheckboxClick($event)"
        >
          @switch (resolvedVariant()) {
            @case ('checked') {
              <kpmg-horizontal-card-circle-check-icon [size]="24" [fill]="colors().fill" [tickColor]="tickColor()" />
            }
            @case ('error-checked') {
              <kpmg-horizontal-card-circle-check-icon [size]="24" [fill]="colors().fill" [tickColor]="tickColor()" />
            }
            @case ('unchecked-light') {
              <kpmg-horizontal-card-circle-light-check-icon [size]="24" [stroke]="colors().stroke" />
            }
            @case ('error-checked-light') {
              <kpmg-horizontal-card-circle-light-check-icon [size]="24" [stroke]="colors().stroke" />
            }
            @case ('indeterminate') {
              <ng-container [ngTemplateOutlet]="indeterminateTpl" />
            }
            @case ('error-indeterminate') {
              <ng-container [ngTemplateOutlet]="indeterminateTpl" />
            }
            @default {
              <kpmg-horizontal-card-circle-unchecked-icon [size]="20" [stroke]="colors().stroke" />
            }
          }
        </button>
      }
    </ng-template>

    <ng-template #indeterminateTpl>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" [attr.stroke]="colors().stroke" stroke-width="2" />
        <line x1="7" y1="12" x2="17" y2="12" [attr.stroke]="colors().stroke" stroke-width="2.5" stroke-linecap="round" />
      </svg>
    </ng-template>
  `,
})
export class HorizontalCardComponent {
  readonly size = input<HorizontalCardSize>('Medium');
  readonly type = input<HorizontalCardType>('Image');
  readonly styleVariant = input<HorizontalCardStyle>('Outlined');
  readonly title = input('Header');
  readonly supportingText = input(HORIZONTAL_CARD_DEFAULTS.supportingText as string);
  readonly bodyText = input(HORIZONTAL_CARD_DEFAULTS.bodyText as string);
  readonly imageSrc = input<string | undefined>(undefined);
  readonly imageAlt = input('Card thumbnail');
  readonly hasImage = input(true, { transform: booleanAttribute });
  /** Checked state (two-way). */
  readonly checked = model(false);
  readonly checkVariant = input<HorizontalCardCheckVariant>('default');
  readonly checkState = input<HorizontalCardCheckState>('enabled');
  readonly checkboxShape = input<'circle' | 'square'>('circle');
  readonly checkColor = input<string | undefined>(undefined);
  readonly tickColor = input('#ffffff');
  readonly checkboxProps = input<HorizontalCardCheckboxProps>({});
  /** Defaults to whether `statusChip` is set. */
  readonly showChip = input<boolean | undefined>(undefined);
  readonly statusChip = input('Label');
  readonly statusText1 = input('Supporting line text lorem ipsum');
  readonly statusText2 = input('Supporting line text lorem ipsum');
  readonly progress = input(65);
  readonly hasProgress = input(true, { transform: booleanAttribute });
  readonly progressColor = input<string | undefined>(undefined);
  /** Adds `horizontal-card--clickable` (React: inferred from `onClick`). */
  readonly clickable = input(false, { transform: booleanAttribute });
  readonly className = input('');

  /** Checkbox toggled. React: `onCheckChange(e, next)`. */
  readonly checkChange = output<CardToggleEvent>();
  /** Arrow button click. React: `onArrowClick`. */
  readonly arrowClick = output<MouseEvent>();
  /** More button click. React: `onMoreClick`. */
  readonly moreClick = output<MouseEvent>();
  /** Card body click. React: `onClick`. */
  readonly cardClick = output<MouseEvent>();

  protected readonly isChecked = computed(() => this.checked());
  protected readonly sizeSlug = computed(() => this.size().toLowerCase().replace(/\s+/g, '-'));
  protected readonly isStatus = computed(() => this.type() === 'Image and status');
  protected readonly isLargest = computed(() => this.size() === 'Largest');
  protected readonly isExtraLarge = computed(() => this.size() === 'Extra large');
  protected readonly isSmall = computed(() => this.size() === 'Small');
  protected readonly shouldRenderImage = computed(() => this.hasImage() && !this.isStatus() && this.styleVariant() !== 'Missing');
  protected readonly shouldRenderChip = computed(() => (this.showChip() !== undefined ? Boolean(this.showChip()) : Boolean(this.statusChip())));
  protected readonly clampedProgress = computed(() => Math.min(100, Math.max(0, this.progress())));

  protected readonly thumbSize = computed(() => {
    switch (this.size()) {
      case 'Small':
        return 48;
      case 'Medium':
        return 64;
      case 'Large':
        return 88;
      default:
        return 100;
    }
  });

  private readonly normalizedStyle = computed(() => {
    const s = this.styleVariant();
    return s === 'Missing' || s === 'Warning' ? 'warning' : s.toLowerCase();
  });

  protected readonly classes = computed(() =>
    [
      'horizontal-card',
      `horizontal-card--size-${this.sizeSlug()}`,
      `horizontal-card--style-${this.normalizedStyle()}`,
      this.isStatus() ? 'horizontal-card--status' : '',
      this.clickable() ? 'horizontal-card--clickable' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly resolvedVariant = computed(() => {
    const v = this.checkVariant();
    const checked = this.isChecked();
    if (v && v !== 'default') {
      if (v === 'primary' || v === 'purple') return checked ? 'checked' : 'unchecked';
      if (v === 'error') return checked ? 'error-checked' : 'error-unchecked';
      return v as string;
    }
    return checked ? 'checked' : 'unchecked';
  });

  private readonly isErrorVariant = computed(() => this.resolvedVariant().startsWith('error') || this.checkVariant() === 'error');

  protected readonly colors = computed<CheckboxColors>(() => {
    const isError = this.isErrorVariant();
    const checkColor = this.checkColor();
    if (checkColor) {
      return {
        fill: checkColor,
        stroke: checkColor,
        hoverHalo: isError ? 'var(--color-checkbox-error-hover-layer, #ffcedf)' : 'var(--color-checkbox-hover-layer, #e9eafc)',
        pressedHalo: isError ? 'var(--color-checkbox-error-pressed-layer, #feaac8)' : 'var(--color-checkbox-pressed-layer, #d7d9fa)',
      };
    }
    if (isError) {
      return {
        fill: 'var(--color-checkbox-error-fill, #C00F48)',
        stroke: 'var(--color-checkbox-error-stroke, #C00F48)',
        hoverHalo: 'var(--color-checkbox-error-hover-layer, #ffcedf)',
        pressedHalo: 'var(--color-checkbox-error-pressed-layer, #feaac8)',
      };
    }
    if (this.checkVariant() === 'purple') {
      return { fill: '#5965e9', stroke: '#818aee', hoverHalo: '#e9eafc', pressedHalo: '#d7d9fa' };
    }
    if (this.checkVariant() === 'primary') {
      return {
        fill: 'var(--color-primary-action, #1e49e2)',
        stroke: 'var(--color-primary-action, #1e49e2)',
        hoverHalo: '#e9eafc',
        pressedHalo: '#d7d9fa',
      };
    }
    return {
      fill: 'var(--color-checkbox-primary-fill, #3D405B)',
      stroke: 'var(--color-checkbox-primary-stroke, #3D405B)',
      hoverHalo: 'var(--color-checkbox-hover-layer, #e9eafc)',
      pressedHalo: 'var(--color-checkbox-pressed-layer, #d7d9fa)',
    };
  });

  protected readonly squareCheckboxClasses = computed(() =>
    [
      'horizontal-card__checkbox',
      this.isChecked() ? 'horizontal-card__checkbox--checked' : '',
      this.checkState() !== 'enabled' ? `horizontal-card__checkbox--state-${this.checkState()}` : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly circleCheckboxClasses = computed(() =>
    [
      'horizontal-card__checkbox-btn',
      this.isErrorVariant() ? 'horizontal-card__checkbox-btn--error' : '',
      this.checkState() === 'hovered' ? 'horizontal-card__checkbox-btn--state-hovered' : '',
      this.checkState() === 'pressed' ? 'horizontal-card__checkbox-btn--state-pressed' : '',
      this.checkboxProps()?.className || '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly circleCheckboxStyle = computed(() => {
    const style: Record<string, string | number> = {};
    if (this.checkState() === 'hovered') style['background-color'] = this.colors().hoverHalo;
    if (this.checkState() === 'pressed') style['background-color'] = this.colors().pressedHalo;
    return { ...style, ...(this.checkboxProps()?.style || {}) };
  });

  protected onCheckboxClick(e: MouseEvent): void {
    e.stopPropagation();
    const next = !this.isChecked();
    this.checked.set(next);
    this.checkChange.emit({ event: e, value: next });
  }

  protected onArrow(e: MouseEvent): void {
    e.stopPropagation();
    this.arrowClick.emit(e);
  }

  protected onMore(e: MouseEvent): void {
    e.stopPropagation();
    this.moreClick.emit(e);
  }
}
