import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, model, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type CheckboxSize = 'large' | 'small';
export type CheckboxState = 'enabled' | 'disabled' | 'hovered' | 'pressed';
export type CheckboxType =
  | 'checked'
  | 'unchecked-light'
  | 'indeterminate'
  | 'unchecked'
  | 'error-checked'
  | 'error-checked-light'
  | 'error-indeterminate'
  | 'error-unchecked';

const CHECKED_TYPES: readonly string[] = ['checked', 'unchecked-light', 'error-checked', 'error-checked-light'];
const DISABLED_COLOR = 'var(--color-checkbox-disabled-stroke, #9090A2)';

/**
 * WorkBench Checkbox — mirrors packages/ui/src/components/Checkbox/Checkbox.jsx
 * (8 types × 4 states × 2 sizes). `checked` is a model: bind `[(checked)]`
 * or listen to `(checkedChange)`.
 */
@Component({
  selector: 'kpmg-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { style: 'display: contents' },
  template: `
    <label [class]="classes()">
      <input
        type="checkbox"
        class="kpmg-checkbox__native-input"
        [attr.id]="inputId()"
        [attr.name]="name()"
        [attr.value]="value()"
        [checked]="isChecked()"
        [disabled]="isDisabled()"
        (change)="onChange($event)"
      />
      <span class="kpmg-checkbox__box" aria-hidden="true">
        @if (icon(); as customIcon) {
          <ng-container [ngTemplateOutlet]="customIcon" />
        } @else {
        @switch (activeType()) {
          @case ('checked') {
            <svg [attr.width]="iconPx()" [attr.height]="iconPx()" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" [attr.fill]="isDisabled() ? disabledColor : 'var(--color-checkbox-primary-fill, #3D405B)'" />
              <polyline points="8 12 11 15 16 9" fill="none" stroke="var(--color-checkbox-primary-tick, #FFFFFF)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          }
          @case ('unchecked-light') {
            <svg [attr.width]="iconPx()" [attr.height]="iconPx()" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-primary-stroke, #3D405B)'" stroke-width="2" />
              <polyline points="8 12 11 15 16 9" fill="none" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-primary-stroke, #3D405B)'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          }
          @case ('indeterminate') {
            <svg [attr.width]="subIconPx()" [attr.height]="subIconPx()" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-primary-stroke, #3D405B)'" stroke-width="2" />
              <line x1="7" y1="12" x2="17" y2="12" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-primary-stroke, #3D405B)'" stroke-width="2.5" stroke-linecap="round" />
            </svg>
          }
          @case ('unchecked') {
            <svg [attr.width]="subIconPx()" [attr.height]="subIconPx()" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-primary-stroke, #3D405B)'" stroke-width="2" />
            </svg>
          }
          @case ('error-checked') {
            <svg [attr.width]="iconPx()" [attr.height]="iconPx()" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" [attr.fill]="isDisabled() ? disabledColor : 'var(--color-checkbox-error-fill, #C00F48)'" />
              <polyline points="8 12 11 15 16 9" fill="none" stroke="var(--color-checkbox-primary-tick, #FFFFFF)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          }
          @case ('error-checked-light') {
            <svg [attr.width]="iconPx()" [attr.height]="iconPx()" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-error-stroke, #C00F48)'" stroke-width="2" />
              <polyline points="8 12 11 15 16 9" fill="none" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-error-stroke, #C00F48)'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          }
          @case ('error-indeterminate') {
            <svg [attr.width]="subIconPx()" [attr.height]="subIconPx()" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-error-stroke, #C00F48)'" stroke-width="2" />
              <line x1="7" y1="12" x2="17" y2="12" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-error-stroke, #C00F48)'" stroke-width="2.5" stroke-linecap="round" />
            </svg>
          }
          @default {
            <svg [attr.width]="subIconPx()" [attr.height]="subIconPx()" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" [attr.stroke]="isDisabled() ? disabledColor : 'var(--color-checkbox-error-stroke, #C00F48)'" stroke-width="2" />
            </svg>
          }
        }
        }
      </span>
      @if (label() || subtext()) {
        <span class="kpmg-checkbox__label-container">
          @if (label()) { <span class="kpmg-checkbox__label">{{ label() }}</span> }
          @if (subtext()) { <span class="kpmg-checkbox__subtext">{{ subtext() }}</span> }
        </span>
      }
    </label>
  `,
})
export class CheckboxComponent {
  /** large = 40px touch container, small = 24px. */
  readonly size = input<CheckboxSize>('large');
  /** Explicit Figma variant; overrides `checked`/`indeterminate`/`error`. */
  readonly type = input<CheckboxType | undefined>(undefined);
  readonly state = input<CheckboxState>('enabled');
  /** Checked status. Two-way bindable: `[(checked)]`. */
  readonly checked = model<boolean | undefined>(undefined);
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly error = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly label = input<string | undefined>(undefined);
  readonly subtext = input<string | undefined>(undefined);
  /** Native input id (named `inputId` so it isn't duplicated on the host element). */
  readonly inputId = input<string | undefined>(undefined);
  readonly name = input<string | undefined>(undefined);
  readonly value = input<string | undefined>(undefined);
  /** Custom icon template that replaces the default SVG. */
  readonly icon = input<TemplateRef<unknown> | null>(null);
  readonly className = input('');

  /** Native change event. */
  readonly changed = output<Event>();

  protected readonly disabledColor = DISABLED_COLOR;

  private readonly normalizedSize = computed(() => (this.size() || 'large').toLowerCase());
  protected readonly isDisabled = computed(() => this.disabled() || this.state() === 'disabled');
  private readonly normalizedState = computed(() => (this.isDisabled() ? 'disabled' : (this.state() || 'enabled').toLowerCase()));

  protected readonly activeType = computed<string>(() => {
    const explicit = this.type();
    if (explicit) return explicit;
    const prefix = this.error() ? 'error-' : '';
    if (this.indeterminate()) return `${prefix}indeterminate`;
    return `${prefix}${this.checked() ? 'checked' : 'unchecked'}`;
  });

  protected readonly isChecked = computed(() => this.checked() ?? CHECKED_TYPES.includes(this.activeType()));

  protected readonly iconPx = computed(() => (this.normalizedSize() === 'small' ? 16 : 24));
  protected readonly subIconPx = computed(() => (this.normalizedSize() === 'small' ? 14 : 20));

  protected readonly classes = computed(() =>
    [
      'kpmg-checkbox',
      `kpmg-checkbox--${this.normalizedSize()}`,
      `kpmg-checkbox--state-${this.normalizedState()}`,
      `kpmg-checkbox--type-${this.activeType().toLowerCase().replace(/\s+/g, '-')}`,
      this.isDisabled() ? 'kpmg-checkbox--disabled' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
    this.changed.emit(event);
  }
}
