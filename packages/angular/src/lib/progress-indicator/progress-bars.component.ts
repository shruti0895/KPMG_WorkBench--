import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ProgressBarType = 'determinate' | 'indeterminate';
export type CircularProgressSize = 'large' | 'medium' | 'small' | 'Large' | 'Medium' | 'Small';

const clamp = (n: number) => Math.min(Math.max(n, 0), 100);

/** Linear progress track (mirrors `LinearProgressBarSvg`). */
@Component({
  selector: 'kpmg-linear-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      [class]="'kpmg-progress__linear-track ' + (isIndeterminate() ? 'kpmg-progress__linear-track--indeterminate' : '')"
      [style.height.px]="height()"
      [style.backgroundColor]="trackColor()"
    >
      <div
        [class]="'kpmg-progress__linear-fill ' + (isIndeterminate() ? 'kpmg-progress__linear-fill--indeterminate' : '')"
        [style.width]="isIndeterminate() ? '40%' : clamped() + '%'"
        [style.backgroundColor]="fillColor()"
      ></div>
    </div>
  `,
})
export class LinearProgressBarComponent {
  readonly progress = input(0);
  readonly type = input<ProgressBarType>('determinate');
  readonly trackColor = input('var(--color-progress-track-inactive, #E3E3E8)');
  readonly fillColor = input('var(--color-progress-track-active, #1E49E2)');
  readonly height = input(4);

  protected readonly isIndeterminate = computed(() => this.type() === 'indeterminate');
  protected readonly clamped = computed(() => clamp(this.progress()));
}

/** Circular progress ring (mirrors `CircularProgressBarSvg`). */
@Component({
  selector: 'kpmg-circular-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      [class]="'kpmg-progress__circular-container kpmg-progress__circular-container--' + normalizedSize() + (isIndeterminate() ? ' kpmg-progress__circular-container--indeterminate' : '')"
      [style.width.px]="geometry().diameter"
      [style.height.px]="geometry().diameter"
    >
      <svg
        [attr.viewBox]="'0 0 ' + geometry().diameter + ' ' + geometry().diameter"
        [attr.width]="geometry().diameter"
        [attr.height]="geometry().diameter"
        [class]="'kpmg-progress__circular-svg ' + (isIndeterminate() ? 'kpmg-progress__circular-svg--indeterminate' : '')"
      >
        <circle
          [attr.cx]="geometry().diameter / 2"
          [attr.cy]="geometry().diameter / 2"
          [attr.r]="geometry().radius"
          fill="none"
          [attr.stroke]="trackColor()"
          [attr.stroke-width]="geometry().strokeWidth"
        />
        <circle
          [attr.cx]="geometry().diameter / 2"
          [attr.cy]="geometry().diameter / 2"
          [attr.r]="geometry().radius"
          fill="none"
          [attr.stroke]="fillColor()"
          [attr.stroke-width]="geometry().strokeWidth"
          [attr.stroke-dasharray]="geometry().circumference"
          [attr.stroke-dashoffset]="dashOffset()"
          stroke-linecap="round"
          [class]="'kpmg-progress__circular-arc ' + (isIndeterminate() ? 'kpmg-progress__circular-arc--indeterminate' : '')"
        />
      </svg>
      @if (showValue() && !isIndeterminate() && normalizedSize() !== 'small') {
        <span class="kpmg-progress__circular-value">{{ rounded() }}%</span>
      }
    </div>
  `,
})
export class CircularProgressBarComponent {
  /** 'large' (88px) | 'medium' (48px) | 'small' (24px). */
  readonly size = input<CircularProgressSize>('large');
  readonly progress = input(0);
  readonly type = input<ProgressBarType>('determinate');
  readonly trackColor = input('var(--color-progress-track-inactive, #E3E3E8)');
  readonly fillColor = input('var(--color-progress-track-active, #1E49E2)');
  readonly showValue = input(false, { transform: booleanAttribute });

  protected readonly normalizedSize = computed(() => (this.size() || 'large').toLowerCase());
  protected readonly isIndeterminate = computed(() => this.type() === 'indeterminate');
  private readonly clamped = computed(() => clamp(this.progress()));
  protected readonly rounded = computed(() => Math.round(this.clamped()));
  protected readonly geometry = computed(() => {
    let diameter = 88;
    let strokeWidth = 6;
    const s = this.normalizedSize();
    if (s === 'medium') {
      diameter = 48;
      strokeWidth = 4;
    } else if (s === 'small') {
      diameter = 24;
      strokeWidth = 2.5;
    }
    const radius = (diameter - strokeWidth) / 2;
    return { diameter, strokeWidth, radius, circumference: 2 * Math.PI * radius };
  });
  protected readonly dashOffset = computed(() => {
    const { circumference } = this.geometry();
    return this.isIndeterminate() ? circumference * 0.3 : circumference - (this.clamped() / 100) * circumference;
  });
}
