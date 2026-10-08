import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type BannerState = 'default' | 'animated';
export type BannerVariant = 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'critical';
export type BannerProgressType = 'determinate' | 'indeterminate';
export type BannerAriaLive = 'off' | 'polite' | 'assertive';

/**
 * WorkBench Banner — mirrors packages/ui/src/components/Banner/Banner.jsx.
 *
 * Deviations: Angular can't detect projected content or output listeners, so
 * `hasAction` (React: `action` present), `dismissible` (React: `dismissible`
 * or `onClose`) and `iconClickable` (React: `onIconClick`) are explicit inputs.
 * `icon` is a `TemplateRef` (omit / `true` → default robot icon, `false` → none).
 * React `children` → default `<ng-content />`; `action` → `<ng-content select="[bannerAction]" />`.
 * The React `style` prop is omitted (use the host element's style/class).
 */
@Component({
  selector: 'kpmg-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" [attr.role]="computedRole()" [attr.aria-live]="ariaLive()">
      <div class="kpmg-banner__lead">
        @if (showIcon()) {
          <div
            [class]="'kpmg-banner__icon-container ' + (iconClickable() ? 'kpmg-banner__icon-container--clickable' : '')"
            [attr.role]="iconClickable() ? 'button' : null"
            [attr.tabindex]="iconClickable() ? 0 : null"
            [attr.aria-label]="iconClickable() ? 'Banner leading icon' : null"
            (click)="iconClick.emit($event)"
          >
            <div class="kpmg-banner__icon-wrapper">
              @if (iconTemplate(); as tpl) {
                <ng-container [ngTemplateOutlet]="tpl" />
              } @else {
                <svg viewBox="0 0 14.0579 18" width="14" height="18" fill="currentColor" aria-hidden="true">
                  <g>
                    <path d="M3.03279 8.92737H11.0889C11.9279 8.92737 12.6109 8.24437 12.6109 7.40541V1.52195C12.6109 0.682997 11.9279 0 11.0889 0H3.03279C2.19384 0 1.51084 0.682997 1.51084 1.52195V7.40541C1.51084 8.24437 2.19384 8.92737 3.03279 8.92737ZM2.58643 1.52195C2.58643 1.27457 2.78541 1.07559 3.03279 1.07559H11.0889C11.3363 1.07559 11.5353 1.27457 11.5353 1.52195V7.40541C11.5353 7.6528 11.3363 7.85178 11.0889 7.85178H3.03279C2.78541 7.85178 2.58643 7.6528 2.58643 7.40541V1.52195Z" />
                    <path d="M4.87184 5.27543C5.32359 5.27543 5.68929 4.90973 5.68929 4.45799C5.68929 4.00624 5.32359 3.64054 4.87184 3.64054C4.42009 3.64054 4.05439 4.00624 4.05439 4.45799C4.05439 4.90973 4.42009 5.27543 4.87184 5.27543Z" />
                    <path d="M9.05016 5.27543C9.50191 5.27543 9.86761 4.90973 9.86761 4.45799C9.86761 4.00624 9.50191 3.64054 9.05016 3.64054C8.59841 3.64054 8.23271 4.00624 8.23271 4.45799C8.23271 4.90973 8.59841 5.27543 9.05016 5.27543Z" />
                    <path d="M7.0666 10.8204C2.64056 10.8204 0 12.7619 0 16.0101V16.6447C0.00537793 17.403 0.693753 18 1.56498 18H12.4123C13.3265 18 14.0525 17.3761 14.0579 16.5748V15.9456C14.0579 12.735 11.4442 10.8204 7.07198 10.8204H7.0666ZM12.9769 16.5694C12.9769 16.7362 12.7296 16.9244 12.4069 16.9244H1.56498C1.28533 16.9244 1.08096 16.7738 1.07559 16.6394V16.0101C1.07559 13.3965 3.25903 11.896 7.0666 11.896C9.27155 11.896 12.9769 12.4231 12.9769 15.9456V16.5694Z" />
                  </g>
                </svg>
              }
            </div>
          </div>
        }

        <div class="kpmg-banner__status-group">
          @if (title()) {
            <p class="kpmg-banner__text-title">{{ title() }}</p>
          }
          @if (displayDetail()) {
            <p class="kpmg-banner__text-detail">{{ displayDetail() }}</p>
          }
          <ng-content />
        </div>
      </div>

      @if (hasTrailing()) {
        <div class="kpmg-banner__trailing">
          @if (isProgressVisible()) {
            <div
              class="kpmg-banner__progress-frame"
              role="progressbar"
              [attr.aria-valuenow]="isIndeterminate() ? null : numericProgress()"
              aria-valuemin="0"
              aria-valuemax="100"
              [attr.aria-label]="title() + ' progress'"
            >
              <div [class]="'kpmg-banner__progress-track ' + (isIndeterminate() ? 'kpmg-banner__progress-track--indeterminate' : '')">
                <div class="kpmg-banner__progress-fill" [style.width]="isIndeterminate() ? null : numericProgress() + '%'"></div>
              </div>
            </div>
          }

          @if (hasAction()) {
            <div class="kpmg-banner__actions"><ng-content select="[bannerAction]" /></div>
          }

          @if (dismissible()) {
            <button type="button" class="kpmg-banner__close-btn" aria-label="Dismiss banner" (click)="bannerClose.emit($event)">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class BannerComponent {
  readonly state = input<BannerState>('default');
  readonly variant = input<BannerVariant>('primary');
  readonly title = input<string>('Configuring');
  /** Secondary detail or percentage text (e.g. '30%'). */
  readonly detail = input<string | undefined>(undefined);
  /** Progress value 0–100. */
  readonly progress = input<number | undefined>(undefined);
  readonly showProgress = input<boolean | undefined, boolean | string | undefined>(undefined, {
    transform: (v) => (v === undefined ? undefined : booleanAttribute(v)),
  });
  readonly progressType = input<BannerProgressType | undefined>(undefined);
  /** Custom leading icon template; omit / `true` for the default robot icon, `false` for none. */
  readonly icon = input<TemplateRef<unknown> | boolean | undefined>(undefined);
  /** Makes the leading icon a focusable button emitting `iconClick` (React: `onIconClick`). */
  readonly iconClickable = input(false, { transform: booleanAttribute });
  /** Renders the `[bannerAction]` projected content (React: `action`). */
  readonly hasAction = input(false, { transform: booleanAttribute });
  /** Shows the dismiss button (React: `dismissible` or `onClose`). */
  readonly dismissible = input(false, { transform: booleanAttribute });
  readonly role = input('status');
  readonly ariaLive = input<BannerAriaLive>('polite');
  readonly className = input('');

  /** Leading icon clicked (only meaningful with `iconClickable`). */
  readonly iconClick = output<Event>();
  /** Dismiss button clicked. */
  readonly bannerClose = output<Event>();

  protected readonly normalizedState = computed(() => (this.state() || 'default').toLowerCase());
  protected readonly normalizedVariant = computed(() => (this.variant() || 'primary').toLowerCase());
  protected readonly hasExplicitProgress = computed(() => this.progress() !== undefined && this.progress() !== null);
  protected readonly isProgressVisible = computed(() => {
    const show = this.showProgress();
    return show !== undefined ? show : this.hasExplicitProgress() || this.detail() !== undefined;
  });
  protected readonly numericProgress = computed(() => {
    const p = this.progress();
    const detail = this.detail();
    if (this.hasExplicitProgress()) return Math.min(Math.max(Number(p) || 0, 0), 100);
    if (typeof detail === 'string' && detail.endsWith('%')) {
      const parsed = parseFloat(detail);
      if (!isNaN(parsed)) return Math.min(Math.max(parsed, 0), 100);
    }
    return 0;
  });
  protected readonly isIndeterminate = computed(
    () =>
      this.progressType() === 'indeterminate' ||
      (!this.hasExplicitProgress() && this.normalizedState() === 'animated' && !this.detail()),
  );
  protected readonly displayDetail = computed(() => {
    const detail = this.detail();
    if (detail !== undefined) return detail;
    return this.hasExplicitProgress() ? `${this.numericProgress()}%` : null;
  });
  protected readonly hasTrailing = computed(() => this.isProgressVisible() || this.hasAction() || this.dismissible());
  protected readonly showIcon = computed(() => this.icon() !== false);
  protected readonly iconTemplate = computed(() => {
    const v = this.icon();
    return v instanceof TemplateRef ? v : null;
  });
  protected readonly computedRole = computed(() => (this.normalizedVariant() === 'critical' ? 'alert' : this.role()));
  protected readonly classes = computed(() =>
    ['kpmg-banner', `kpmg-banner--state-${this.normalizedState()}`, `kpmg-banner--${this.normalizedVariant()}`, this.className()]
      .filter(Boolean)
      .join(' '),
  );
}
