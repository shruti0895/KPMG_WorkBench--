import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CircularProgressBarComponent, LinearProgressBarComponent } from './progress-bars.component';

export type ProgressIndicatorVariant = 'linear' | 'circular' | 'Linear' | 'Circular';
export type ProgressIndicatorType = 'determinate' | 'indeterminate' | 'Determinate' | 'Indeterminate';
export type ProgressIndicatorSize = 'large' | 'medium' | 'small' | 'Large' | 'Medium' | 'Small';

/**
 * WorkBench ProgressIndicator — mirrors packages/ui/src/components/ProgressIndicator/ProgressIndicator.jsx.
 *
 * Deviations: `label`/`subtext` are strings (React: ReactNode); the
 * `...props` passthrough is omitted. `step` is accepted for API parity but,
 * as in React, has no rendering effect. The host element is `display: contents`;
 * the `id` input is applied to the inner progressbar element.
 */
@Component({
  selector: 'kpmg-progress-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LinearProgressBarComponent, CircularProgressBarComponent],
  host: { style: 'display: contents' },
  template: `
    <div
      [class]="classes()"
      [attr.id]="indicatorId()"
      role="progressbar"
      [attr.aria-valuenow]="isIndeterminate() ? null : rounded()"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-label]="computedAriaLabel()"
    >
      @if ((label() || showValue()) && isLinear()) {
        <div class="kpmg-progress__header">
          @if (label()) {
            <span class="kpmg-progress__label">{{ label() }}</span>
          }
          @if (showValue() && !isIndeterminate()) {
            <span class="kpmg-progress__value-text">{{ rounded() }}%</span>
          }
        </div>
      }

      @if (isLinear()) {
        <kpmg-linear-progress-bar [progress]="clamped()" [type]="isIndeterminate() ? 'indeterminate' : 'determinate'" />
      } @else {
        <div class="kpmg-progress__circular-wrapper">
          <kpmg-circular-progress-bar
            [size]="normalizedSize()"
            [progress]="clamped()"
            [type]="isIndeterminate() ? 'indeterminate' : 'determinate'"
            [showValue]="showValue()"
          />
          @if (label() || subtext()) {
            <div class="kpmg-progress__circular-labels">
              @if (label()) {
                <span class="kpmg-progress__label">{{ label() }}</span>
              }
              @if (subtext()) {
                <span class="kpmg-progress__subtext">{{ subtext() }}</span>
              }
            </div>
          }
        </div>
      }

      @if (subtext() && isLinear()) {
        <span class="kpmg-progress__subtext">{{ subtext() }}</span>
      }
    </div>
  `,
})
export class ProgressIndicatorComponent {
  readonly variant = input<ProgressIndicatorVariant>('linear');
  readonly type = input<ProgressIndicatorType>('determinate');
  /** 0–100. */
  readonly progress = input(0);
  readonly size = input<ProgressIndicatorSize>('large');
  /** Indeterminate step (Figma 1..5); no rendering effect. */
  readonly step = input<number | string | undefined>(undefined);
  readonly showValue = input(false, { transform: booleanAttribute });
  readonly label = input<string | undefined>(undefined);
  readonly subtext = input<string | undefined>(undefined);
  readonly className = input('');
  /** DOM id of the progressbar element (named `indicatorId` so it isn't duplicated on the host). */
  readonly indicatorId = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined);

  protected readonly isLinear = computed(() => this.variant() === 'linear' || this.variant() === 'Linear');
  protected readonly isIndeterminate = computed(() => this.type() === 'indeterminate' || this.type() === 'Indeterminate');
  protected readonly clamped = computed(() => Math.min(Math.max(this.progress(), 0), 100));
  protected readonly rounded = computed(() => Math.round(this.clamped()));
  protected readonly normalizedSize = computed(() => (this.size() || 'large').toLowerCase() as 'large' | 'medium' | 'small');
  protected readonly computedAriaLabel = computed(() => this.ariaLabel() || this.label() || `${this.variant()} progress indicator`);
  protected readonly classes = computed(() =>
    [
      'kpmg-progress',
      `kpmg-progress--${this.isLinear() ? 'linear' : 'circular'}`,
      `kpmg-progress--${this.isIndeterminate() ? 'indeterminate' : 'determinate'}`,
      `kpmg-progress--size-${this.normalizedSize()}`,
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}
