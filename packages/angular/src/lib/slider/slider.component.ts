import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type SliderVariant = 'continuous' | 'discrete';
export type SliderState =
  | 'enabled'
  | 'disabled'
  | 'hovered'
  | 'pressed'
  | 'Enabled with indicator'
  | 'enabled_with_indicator'
  | 'Enabled'
  | 'Disabled'
  | 'Hovered'
  | 'Pressed';

export interface SliderChangeEvent {
  event: Event;
  value: number;
}

/** Default circle thumb handle (React: `SliderThumbIconSvg`). */
@Component({
  selector: 'kpmg-slider-thumb-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" [attr.fill]="fill()" />
    </svg>
  `,
})
export class SliderThumbIconComponent {
  readonly size = input(16);
  readonly fill = input('var(--color-slider-thumb-fill, #1E49E2)');
}

/** Tooltip value indicator badge (React: `SliderIndicatorBadgeSvg`). Projected content overrides `value`. */
@Component({
  selector: 'kpmg-slider-indicator-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="kpmg-slider__indicator-badge">
      <span class="kpmg-slider__indicator-text">{{ value() }}<ng-content /></span>
      <span class="kpmg-slider__indicator-arrow" aria-hidden="true"></span>
    </div>
  `,
})
export class SliderIndicatorBadgeComponent {
  readonly value = input<number | string | undefined>(undefined);
}

/**
 * WorkBench Slider — mirrors packages/ui/src/components/Slider/Slider.jsx.
 * `value` is a model: bind `[(value)]`, or use `defaultValue` for uncontrolled usage.
 *
 * Deviations: `label`/`subtext` are strings (React: ReactNode); `thumbIcon` /
 * `indicatorIcon` are `<ng-template>` references; the React `onChange(e, value)`
 * callback is the `sliderChange` output ({ event, value }); the input id is
 * `sliderId` (so it isn't duplicated on the host); the "Enabled with indicator"
 * state maps to the `enabled` state class (React produced an invalid class name).
 */
@Component({
  selector: 'kpmg-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, SliderThumbIconComponent, SliderIndicatorBadgeComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="containerClasses()">
      @if (label() || subtext()) {
        <div class="kpmg-slider__header">
          @if (label()) { <span class="kpmg-slider__label">{{ label() }}</span> }
          @if (subtext()) { <span class="kpmg-slider__subtext">{{ subtext() }}</span> }
        </div>
      }
      <div class="kpmg-slider__wrapper">
        <div class="kpmg-slider__track-bg">
          <div class="kpmg-slider__track-fill" [style.width.%]="percentage()"></div>
          @if (shouldShowTicks() && tickPositions().length > 0) {
            <div class="kpmg-slider__ticks" aria-hidden="true">
              @for (tick of tickPositions(); track tick.value) {
                <span [class]="'kpmg-slider__tick' + (tick.percent <= percentage() ? ' kpmg-slider__tick--active' : '')" [style.left.%]="tick.percent"></span>
              }
            </div>
          }
        </div>

        @if (shouldShowIndicator()) {
          <div class="kpmg-slider__indicator-container" [style.left.%]="percentage()">
            @if (indicatorIcon(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else {
              <kpmg-slider-indicator-badge [value]="roundedValue()" />
            }
          </div>
        }

        <div class="kpmg-slider__thumb" [style.left.%]="percentage()" aria-hidden="true">
          @if (thumbIcon(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            <kpmg-slider-thumb-icon [size]="thumbSize()" [fill]="thumbFill()" />
          }
        </div>

        <input
          type="range"
          class="kpmg-slider__input"
          [attr.id]="sliderId()"
          [attr.name]="name()"
          [min]="min()"
          [max]="max()"
          [step]="activeStep()"
          [value]="clampedValue()"
          [disabled]="isDisabled()"
          [attr.aria-label]="ariaLabel() || label() || 'Slider'"
          [attr.aria-valuenow]="clampedValue()"
          [attr.aria-valuemin]="min()"
          [attr.aria-valuemax]="max()"
          (input)="onInput($event)"
        />
      </div>
    </div>
  `,
})
export class SliderComponent {
  readonly variant = input<SliderVariant>('continuous');
  /** Current value. Two-way bindable: `[(value)]`. */
  readonly value = model<number | undefined>(undefined);
  /** Initial value when `value` is not bound. */
  readonly defaultValue = input(50);
  readonly min = input(0);
  readonly max = input(100);
  /** Step increment (default 1 continuous, 10 discrete). */
  readonly step = input<number | undefined>(undefined);
  readonly state = input<SliderState>('enabled');
  /** Floating value badge above the thumb. */
  readonly showIndicator = input(false, { transform: booleanAttribute });
  /** Step tick marks; auto-enabled for the discrete variant unless set explicitly. */
  readonly showTicks = input<boolean | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly label = input<string | undefined>(undefined);
  readonly subtext = input<string | undefined>(undefined);
  readonly thumbIcon = input<TemplateRef<unknown> | null>(null);
  readonly indicatorIcon = input<TemplateRef<unknown> | null>(null);
  readonly className = input('');
  /** Native range input id (named `sliderId` so it isn't duplicated on the host element). */
  readonly sliderId = input<string | undefined>(undefined);
  readonly name = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined);

  /** Fires on every user change (React: `onChange(e, value)`). */
  readonly sliderChange = output<SliderChangeEvent>();

  private readonly current = linkedSignal(() => this.value() ?? this.defaultValue());

  protected readonly isDiscrete = computed(() => this.variant() === 'discrete');
  protected readonly activeStep = computed(() => this.step() ?? (this.isDiscrete() ? 10 : 1));
  protected readonly clampedValue = computed(() => Math.min(Math.max(this.current(), this.min()), this.max()));
  protected readonly roundedValue = computed(() => Math.round(this.clampedValue()));
  protected readonly percentage = computed(() =>
    this.max() > this.min() ? ((this.clampedValue() - this.min()) / (this.max() - this.min())) * 100 : 0,
  );

  protected readonly isDisabled = computed(() => this.disabled() || this.state() === 'disabled' || this.state() === 'Disabled');
  protected readonly normalizedState = computed(() => {
    if (this.isDisabled()) return 'disabled';
    const s = (this.state() || 'enabled').toLowerCase();
    return s === 'enabled with indicator' || s === 'enabled_with_indicator' ? 'enabled' : s;
  });
  protected readonly shouldShowIndicator = computed(
    () => this.showIndicator() || this.state() === 'Enabled with indicator' || this.state() === 'enabled_with_indicator',
  );
  protected readonly shouldShowTicks = computed(() => this.showTicks() ?? this.isDiscrete());

  protected readonly tickPositions = computed(() => {
    const ticks: { value: number; percent: number }[] = [];
    const min = this.min();
    const max = this.max();
    const step = this.activeStep();
    if (this.shouldShowTicks() && max > min && step > 0) {
      const totalSteps = Math.floor((max - min) / step);
      for (let i = 0; i <= totalSteps; i++) {
        const v = min + i * step;
        ticks.push({ value: v, percent: ((v - min) / (max - min)) * 100 });
      }
    }
    return ticks;
  });

  protected readonly thumbSize = computed(() => (this.normalizedState() === 'pressed' || this.normalizedState() === 'hovered' ? 22 : 16));
  protected readonly thumbFill = computed(() =>
    this.isDisabled() ? 'var(--color-slider-disabled-thumb, #9090A2)' : 'var(--color-slider-thumb-fill, #1E49E2)',
  );

  protected readonly containerClasses = computed(() =>
    [
      'kpmg-slider',
      `kpmg-slider--${this.variant()}`,
      `kpmg-slider--state-${this.normalizedState()}`,
      this.isDisabled() ? 'kpmg-slider--disabled' : '',
      this.shouldShowIndicator() ? 'kpmg-slider--has-indicator' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onInput(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.current.set(val);
    this.value.set(val);
    this.sliderChange.emit({ event, value: val });
  }
}
