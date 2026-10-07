import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type ButtonVariant = 'primary' | 'tonal' | 'secondary' | 'outline' | 'text' | 'elevated';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

/** WorkBench Button — mirrors packages/ui/src/components/Button/Button.jsx. */
@Component({
  selector: 'kpmg-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { style: 'display: contents' },
  template: `
    <button [class]="classes()" [type]="type()" [disabled]="disabled()">
      @if (leadingIcon(); as icon) {
        <span class="kpmg-button__icon kpmg-button__icon--left" aria-hidden="true">
          <ng-container [ngTemplateOutlet]="icon" />
        </span>
      }
      <span class="kpmg-button__label"><ng-content /></span>
      @if (iconRight(); as icon) {
        <span class="kpmg-button__icon kpmg-button__icon--right" aria-hidden="true">
          <ng-container [ngTemplateOutlet]="icon" />
        </span>
      }
    </button>
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Full width block modifier. */
  readonly fullWidth = input(false, { transform: booleanAttribute });
  /** Icon rendered before the label, passed as an `<ng-template>` reference. */
  readonly iconLeft = input<TemplateRef<unknown> | null>(null);
  /** Shorthand for `iconLeft`. */
  readonly icon = input<TemplateRef<unknown> | null>(null);
  /** Icon rendered after the label. */
  readonly iconRight = input<TemplateRef<unknown> | null>(null);
  readonly type = input<ButtonType>('button');
  /** Additional CSS class names. */
  readonly className = input('');

  protected readonly leadingIcon = computed(() => this.iconLeft() ?? this.icon());

  protected readonly classes = computed(() =>
    [
      'kpmg-button',
      `kpmg-button--${this.variant()}`,
      `kpmg-button--${this.size()}`,
      this.fullWidth() ? 'kpmg-button--full-width' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}
