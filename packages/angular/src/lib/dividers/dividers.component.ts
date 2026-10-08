import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type DividerOrientation = 'Horizontal' | 'Vertical' | 'horizontal' | 'vertical';
export type DividerTheme = 'Light' | 'Dark' | 'light' | 'dark';
export type DividerWidth =
  | 'Full'
  | 'Inset'
  | 'Inset middle small'
  | 'Inset middle medium'
  | 'Inset middle large'
  | 'Inset middle with text'
  | 'Inset middle'
  | 'full'
  | 'inset'
  | 'inset-middle-small'
  | 'inset-middle-medium'
  | 'inset-middle-large'
  | 'inset-middle-with-text'
  | 'inset-middle';

/**
 * WorkBench Dividers — mirrors packages/ui/src/components/Dividers/Dividers.jsx.
 *
 * Deviations: the React `style`/`...restProps` passthrough is omitted (style the
 * host element instead); `text` is a plain string rather than a ReactNode.
 */
@Component({
  selector: 'kpmg-dividers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @if (hasText()) {
      <div [attr.role]="role()" [attr.aria-orientation]="ariaOrientation()" [class]="classes()">
        <div class="kpmg-divider-line-wrapper"><div class="kpmg-divider-line"></div></div>
        @if (text()) {
          <div class="kpmg-divider-text-container"><p class="kpmg-divider-text">{{ text() }}</p></div>
        }
      </div>
    } @else {
      <div [attr.role]="role()" [attr.aria-orientation]="ariaOrientation()" [class]="classes()">
        <div class="kpmg-divider-line"></div>
      </div>
    }
  `,
})
export class DividersComponent {
  /** Orientation (alias: `orientation`). */
  readonly state = input<DividerOrientation>('Horizontal');
  /** Alias for `state`; takes precedence when set. */
  readonly orientation = input<DividerOrientation | undefined>(undefined);
  readonly theme = input<DividerTheme>('Light');
  readonly width = input<DividerWidth>('Full');
  /** Alias for `width`; takes precedence when set. */
  readonly variant = input<string | undefined>(undefined);
  /** Subheader text for the 'Inset middle with text' variant. */
  readonly text = input<string | undefined>('Subheader');
  readonly className = input('');
  readonly role = input('separator');
  readonly ariaOrientationOverride = input<'horizontal' | 'vertical' | undefined>(undefined, { alias: 'aria-orientation' });

  private readonly isVertical = computed(() => (this.orientation() || this.state() || 'Horizontal').toLowerCase() === 'vertical');
  private readonly effectiveOrientation = computed(() => (this.isVertical() ? 'vertical' : 'horizontal'));
  private readonly effectiveTheme = computed(() => ((this.theme() || 'Light').toLowerCase() === 'dark' ? 'dark' : 'light'));

  private readonly resolved = computed(() => {
    const rawWidth = this.variant() || this.width() || 'Full';
    const normalized = rawWidth.toLowerCase().replace(/\s+/g, '-');
    let modifier = 'kpmg-divider--full';
    let hasText = false;
    if (this.isVertical()) {
      if (normalized.includes('inset-middle')) modifier = 'kpmg-divider--inset-middle';
      else if (normalized.includes('inset')) modifier = 'kpmg-divider--inset';
    } else if (normalized.includes('with-text') || (this.text() && rawWidth.toLowerCase().includes('text'))) {
      modifier = 'kpmg-divider--inset-middle-with-text';
      hasText = true;
    } else if (normalized.includes('large')) modifier = 'kpmg-divider--inset-middle-large';
    else if (normalized.includes('medium')) modifier = 'kpmg-divider--inset-middle-medium';
    else if (normalized.includes('small')) modifier = 'kpmg-divider--inset-middle-small';
    else if (normalized === 'inset') modifier = 'kpmg-divider--inset';
    return { modifier, hasText };
  });

  protected readonly hasText = computed(() => this.resolved().hasText);
  protected readonly ariaOrientation = computed(() => this.ariaOrientationOverride() || this.effectiveOrientation());
  protected readonly classes = computed(() => {
    const orientation = this.resolved().hasText ? 'horizontal' : this.effectiveOrientation();
    return `kpmg-divider kpmg-divider--${orientation} kpmg-divider--theme-${this.effectiveTheme()} ${this.resolved().modifier} ${this.className()}`.trim();
  });
}

/** Convenient singular alias (React: `Divider`). */
export const DividerComponent = DividersComponent;
