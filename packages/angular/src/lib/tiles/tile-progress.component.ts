import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Internal progress indicator used by Tiles (mirrors the subset of
 * packages/ui ProgressIndicator that Tiles consumes: determinate linear and
 * circular). Emits the identical `kpmg-progress*` DOM so the shared CSS applies.
 * Not part of the public API; swap for a standalone ProgressIndicator port when available.
 */
@Component({
  selector: 'kpmg-tile-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      [class]="containerClasses()"
      role="progressbar"
      [attr.aria-valuenow]="rounded()"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-label]="variant() + ' progress indicator'"
    >
      @if (variant() === 'linear') {
        <div class="kpmg-progress__linear-track" [style.height.px]="height()" style="background-color: var(--color-progress-track-inactive, #E3E3E8)">
          <div class="kpmg-progress__linear-fill" [style.width.%]="clamped()" style="background-color: var(--color-progress-track-active, #1E49E2)"></div>
        </div>
      } @else {
        <div class="kpmg-progress__circular-wrapper">
          <div [class]="'kpmg-progress__circular-container kpmg-progress__circular-container--' + size()" [style.width.px]="diameter()" [style.height.px]="diameter()">
            <svg [attr.viewBox]="'0 0 ' + diameter() + ' ' + diameter()" [attr.width]="diameter()" [attr.height]="diameter()" class="kpmg-progress__circular-svg">
              <circle [attr.cx]="diameter() / 2" [attr.cy]="diameter() / 2" [attr.r]="radius()" fill="none" stroke="var(--color-progress-track-inactive, #E3E3E8)" [attr.stroke-width]="strokeWidth()" />
              <circle
                [attr.cx]="diameter() / 2"
                [attr.cy]="diameter() / 2"
                [attr.r]="radius()"
                fill="none"
                stroke="var(--color-progress-track-active, #1E49E2)"
                [attr.stroke-width]="strokeWidth()"
                [attr.stroke-dasharray]="circumference()"
                [attr.stroke-dashoffset]="dashOffset()"
                stroke-linecap="round"
                class="kpmg-progress__circular-arc"
              />
            </svg>
          </div>
        </div>
      }
    </div>
  `,
})
export class TileProgressComponent {
  readonly variant = input<'linear' | 'circular'>('linear');
  readonly progress = input(0);
  readonly size = input<'large' | 'medium' | 'small'>('large');
  readonly height = input(4);

  protected readonly clamped = computed(() => Math.min(Math.max(this.progress(), 0), 100));
  protected readonly rounded = computed(() => Math.round(this.clamped()));
  protected readonly containerClasses = computed(
    () => `kpmg-progress kpmg-progress--${this.variant()} kpmg-progress--determinate kpmg-progress--size-${this.size()}`,
  );
  protected readonly diameter = computed(() => (this.size() === 'medium' ? 48 : this.size() === 'small' ? 24 : 88));
  protected readonly strokeWidth = computed(() => (this.size() === 'medium' ? 4 : this.size() === 'small' ? 2.5 : 6));
  protected readonly radius = computed(() => (this.diameter() - this.strokeWidth()) / 2);
  protected readonly circumference = computed(() => 2 * Math.PI * this.radius());
  protected readonly dashOffset = computed(() => this.circumference() - (this.clamped() / 100) * this.circumference());
}
