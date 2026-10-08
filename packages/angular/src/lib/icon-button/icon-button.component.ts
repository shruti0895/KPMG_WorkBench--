import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type IconButtonVariant = 'filled' | 'outline' | 'standard' | 'neutral';
export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonShape = 'circle' | 'square';
export type IconButtonType = 'button' | 'submit' | 'reset';

/** WorkBench IconButton — mirrors packages/ui/src/components/IconButton/IconButton.jsx. The icon is projected content. */
@Component({
  selector: 'kpmg-icon-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <button
      [class]="classes()"
      [type]="type()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-pressed]="selected()"
    >
      <ng-content />
    </button>
  `,
})
export class IconButtonComponent {
  readonly variant = input<IconButtonVariant>('filled');
  /** sm: 32px, md: 40px, lg: 52px. */
  readonly size = input<IconButtonSize>('md');
  readonly shape = input<IconButtonShape>('circle');
  /** Toggle/selected state. */
  readonly selected = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Accessible label for screen readers. */
  readonly ariaLabel = input('Icon button');
  readonly type = input<IconButtonType>('button');
  readonly className = input('');

  protected readonly classes = computed(() =>
    [
      'kpmg-icon-button',
      `kpmg-icon-button--${this.variant()}`,
      `kpmg-icon-button--${this.size()}`,
      `kpmg-icon-button--${this.shape()}`,
      this.selected() ? 'kpmg-icon-button--selected' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}
