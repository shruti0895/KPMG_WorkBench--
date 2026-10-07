import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeStyleType = 'primary' | 'neutral';
export type BadgeState = 'loud' | 'quiet';
export type BadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * WorkBench Badge — mirrors packages/ui/src/components/Badge/Badge.jsx.
 *
 * Deviation: Angular can't detect projected content, so set `anchored` when
 * wrapping an element (React infers this from `children`).
 */
@Component({
  selector: 'kpmg-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @if (anchored()) {
      <span class="kpmg-badge-container">
        <ng-content />
        @if (visible()) {
          <span [class]="classes()" [attr.role]="accessibleLabel() ? 'status' : null" [attr.aria-label]="accessibleLabel()">{{ displayContent() }}</span>
        }
      </span>
    } @else if (visible()) {
      <span [class]="classes()" [attr.role]="accessibleLabel() ? 'status' : null" [attr.aria-label]="accessibleLabel()">{{ displayContent() }}</span>
    }
  `,
})
export class BadgeComponent {
  readonly size = input<BadgeSize>('medium');
  readonly styleType = input<BadgeStyleType>('primary');
  /** Alias for `styleType`. */
  readonly variant = input<BadgeStyleType | undefined>(undefined);
  readonly state = input<BadgeState>('loud');
  /** Alias for `state`. */
  readonly intensity = input<BadgeState | undefined>(undefined);
  readonly count = input<number | string | undefined>(undefined);
  readonly maxCount = input(99);
  readonly showZero = input(false, { transform: booleanAttribute });
  readonly dot = input(false, { transform: booleanAttribute });
  readonly label = input<string | undefined>(undefined);
  readonly placement = input<BadgePlacement>('top-right');
  /** Force overlapping mode (defaults to `anchored`). */
  readonly overlap = input<boolean | undefined>(undefined);
  /** Set when projecting an element for the badge to anchor onto. */
  readonly anchored = input(false, { transform: booleanAttribute });
  readonly className = input('');
  readonly ariaLabel = input<string | undefined>(undefined);

  private readonly normalizedSize = computed(() => (this.size() || 'medium').toLowerCase());
  private readonly normalizedStyle = computed(() => (this.variant() || this.styleType() || 'primary').toLowerCase());
  private readonly normalizedState = computed(() => (this.intensity() || this.state() || 'loud').toLowerCase());

  protected readonly isDot = computed(
    () =>
      this.dot() ||
      this.normalizedSize() === 'small' ||
      (this.count() === undefined && this.label() === undefined && !this.anchored()),
  );

  protected readonly displayContent = computed<string | number | null>(() => {
    if (this.isDot() || this.normalizedSize() === 'small') return null;
    const label = this.label();
    if (label !== undefined && label !== null) return label;
    const count = this.count();
    if (typeof count === 'number') {
      return count > this.maxCount() ? `${this.maxCount()}+` : count;
    }
    return count ?? null;
  });

  /** A numeric zero hides the badge unless `showZero` is set. */
  protected readonly visible = computed(() => {
    const count = this.count();
    return !(!this.isDot() && this.label() === undefined && typeof count === 'number' && count === 0 && !this.showZero());
  });

  private readonly isOverlapping = computed(() => this.overlap() ?? this.anchored());

  protected readonly classes = computed(() =>
    [
      'kpmg-badge',
      `kpmg-badge--${this.normalizedSize()}`,
      `kpmg-badge--${this.normalizedStyle()}-${this.normalizedState()}`,
      this.isOverlapping() ? 'kpmg-badge--overlap' : '',
      this.isOverlapping() ? `kpmg-badge--overlap-${this.placement()}` : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly accessibleLabel = computed(() => {
    if (this.ariaLabel()) return this.ariaLabel();
    const count = this.count();
    if (typeof count === 'number') return `${count} notifications`;
    if (typeof this.label() === 'string') return this.label();
    return this.isDot() ? 'New notification' : undefined;
  });
}
