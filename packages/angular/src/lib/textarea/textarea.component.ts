import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output, signal, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type TextareaVariant = 'outlined' | 'filled';
export type TextareaState = 'enabled' | 'hovered' | 'focused' | 'pressed' | 'error' | 'disabled';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

let nextId = 0;

/**
 * WorkBench Textarea — mirrors packages/ui/src/components/Textarea/Textarea.jsx.
 * `value` is a model: bind `[(value)]`, or use `defaultValue` for uncontrolled usage.
 */
@Component({
  selector: 'kpmg-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { style: 'display: contents' },
  template: `
    <div [class]="wrapperClasses()">
      @if (hasHeader()) {
        <div class="kpmg-textarea__header">
          @if (label()) {
            <label [attr.for]="resolvedId()" class="kpmg-textarea__label">
              {{ label() }}
              @if (required()) {
                <span aria-hidden="true" style="color: var(--color-textarea-label-error); margin-left: 4px">*</span>
              }
            </label>
          } @else {
            <span></span>
          }
          @if (shouldShowCount()) {
            <span [id]="countId()" class="kpmg-textarea__count" aria-live="polite">{{ countText() }}</span>
          }
        </div>
      }
      <div [class]="containerClasses()">
        <textarea
          [id]="resolvedId()"
          [value]="currentValue()"
          [placeholder]="placeholder()"
          [disabled]="isDisabled()"
          [readOnly]="readOnly()"
          [required]="required()"
          [attr.maxlength]="maxLength() ?? null"
          [rows]="rows()"
          [style.resize]="resize()"
          [class]="inputClasses()"
          [attr.aria-invalid]="isError() ? 'true' : 'false'"
          [attr.aria-describedby]="describedBy()"
          (input)="onInput($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
        ></textarea>
        @if (showAction()) {
          <div class="kpmg-textarea__action-wrapper">
            @if (trailingAction(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else {
              <button
                type="button"
                class="kpmg-textarea__action-btn"
                [disabled]="isDisabled()"
                [attr.aria-label]="actionAriaLabel()"
                [attr.tabindex]="isDisabled() ? -1 : 0"
                (click)="actionClick.emit($event)"
              >
                @if (isError()) {
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                } @else {
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                }
              </button>
            }
          </div>
        }
      </div>
      @if (displayHelper()) {
        <div [id]="helperId()" [class]="helperClasses()" [attr.role]="isError() ? 'alert' : 'status'">{{ displayHelper() }}</div>
      }
    </div>
  `,
})
export class TextareaComponent {
  /** Native textarea id; auto-generated if omitted. */
  readonly textareaId = input<string | undefined>(undefined);
  readonly label = input<string | undefined>(undefined);
  /** Current value. Two-way bindable: `[(value)]`. */
  readonly value = model<string | undefined>(undefined);
  /** Initial value when `value` is not bound. */
  readonly defaultValue = input('');
  readonly placeholder = input('Enter text...');
  readonly variant = input<TextareaVariant>('outlined');
  /** Force an interaction state for documentation. */
  readonly state = input<TextareaState>('enabled');
  /** `true` → error styling; a string → error styling plus that message. */
  readonly error = input<boolean | string>(false);
  readonly helperText = input<string | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readOnly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly maxLength = input<number | undefined>(undefined);
  readonly showCount = input<boolean | undefined>(undefined);
  /** Custom counter text: `(currentCount, maxLength) => string`. */
  readonly countFormatter = input<((count: number, max: number | undefined) => string) | undefined>(undefined);
  readonly rows = input(3);
  readonly resize = input<TextareaResize>('vertical');
  /** Show the trailing action button (default: microphone). */
  readonly showAction = input(true, { transform: booleanAttribute });
  /** Replaces the default action button. */
  readonly trailingAction = input<TemplateRef<unknown> | null>(null);
  readonly actionAriaLabel = input('Voice input');
  readonly fullWidth = input(true, { transform: booleanAttribute });
  readonly className = input('');

  readonly actionClick = output<Event>();
  readonly textareaFocus = output<FocusEvent>();
  readonly textareaBlur = output<FocusEvent>();

  private readonly generatedId = `kpmg-textarea-${nextId++}`;
  private readonly isFocused = signal(false);
  private readonly internalValue = linkedSignal(() => this.value() ?? this.defaultValue());

  protected readonly currentValue = this.internalValue.asReadonly();
  protected readonly resolvedId = computed(() => this.textareaId() || this.generatedId);
  protected readonly helperId = computed(() => `${this.resolvedId()}-helper`);
  protected readonly countId = computed(() => `${this.resolvedId()}-count`);

  protected readonly isError = computed(() => this.state() === 'error' || Boolean(this.error()));
  protected readonly isDisabled = computed(() => this.state() === 'disabled' || this.disabled());
  private readonly isHovered = computed(() => this.state() === 'hovered');
  private readonly isFocusedState = computed(
    () => this.state() === 'focused' || this.state() === 'pressed' || this.isFocused(),
  );

  protected readonly shouldShowCount = computed(
    () => this.showCount() ?? (Boolean(this.maxLength()) && Boolean(this.label())),
  );
  protected readonly hasHeader = computed(() => Boolean(this.label()) || this.shouldShowCount());

  protected readonly countText = computed(() => {
    const count = this.currentValue().length;
    const fmt = this.countFormatter();
    if (fmt) return fmt(count, this.maxLength());
    return this.maxLength() !== undefined ? `${count}/${this.maxLength()}` : `${count}`;
  });

  protected readonly displayHelper = computed(() => {
    const err = this.error();
    return (typeof err === 'string' ? err : null) || this.helperText();
  });

  protected readonly describedBy = computed(
    () =>
      [this.displayHelper() ? this.helperId() : null, this.shouldShowCount() ? this.countId() : null]
        .filter(Boolean)
        .join(' ') || null,
  );

  protected readonly wrapperClasses = computed(() =>
    [
      'kpmg-textarea-wrapper',
      this.fullWidth() ? 'kpmg-textarea-wrapper--full-width' : 'kpmg-textarea-wrapper--inline',
      this.isFocusedState() ? 'kpmg-textarea-wrapper--focused' : '',
      this.isHovered() ? 'kpmg-textarea-wrapper--hovered' : '',
      this.isError() ? 'kpmg-textarea-wrapper--error' : '',
      this.isDisabled() ? 'kpmg-textarea-wrapper--disabled' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );
  protected readonly containerClasses = computed(() =>
    [
      'kpmg-textarea__container',
      `kpmg-textarea__container--${this.variant()}`,
      this.isFocusedState() ? 'kpmg-textarea__container--focused' : '',
      this.isHovered() ? 'kpmg-textarea__container--hovered' : '',
      this.isError() ? 'kpmg-textarea__container--error' : '',
      this.isDisabled() ? 'kpmg-textarea__container--disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
  protected readonly inputClasses = computed(() =>
    ['kpmg-textarea__input', !this.showAction() ? 'kpmg-textarea__input--no-action' : ''].filter(Boolean).join(' '),
  );
  protected readonly helperClasses = computed(
    () => `kpmg-textarea__helper ${this.isError() ? 'kpmg-textarea__helper--error' : ''}`.trim(),
  );

  protected onInput(event: Event): void {
    const next = (event.target as HTMLTextAreaElement).value;
    this.internalValue.set(next);
    this.value.set(next);
  }

  protected onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.textareaFocus.emit(event);
  }

  protected onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.textareaBlur.emit(event);
  }
}
