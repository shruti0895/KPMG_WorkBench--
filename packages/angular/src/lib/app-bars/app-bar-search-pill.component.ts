import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { AppBarIconComponent } from './app-bar-icons.component';

export type AppBarSearchPillSize = 'small' | 'large';

export interface AppBarSearchSubmit {
  value: string;
  event: Event;
}

/**
 * AppBarSearchPill — mirrors `AppBarSearchPill` in AppBars.jsx (small 400x40 / large 711x68, expandable editor).
 *
 * Deviations: `onChange(e)` is `valueChange` (the new string); `onSubmit(value, e)` / `onSendClick(value, e)` are
 * `searchSubmit` / `sendClick` ({ value, event }); `onAttachClick`/`onMicClick`/`onExpandToggle(bool)` are
 * `attachClick`/`micClick`/`expandToggle`. `value` and `expanded` are controlled when bound, otherwise internal.
 * `showAttachment`/`showMicrophone`/`showSend`/`showExpand` must be bound as `[showX]="bool"` (omit for the
 * `enableX` fallback). `ref`/`...props` are omitted.
 */
@Component({
  selector: 'kpmg-app-bar-search-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppBarIconComponent],
  host: { style: 'display: contents' },
  template: `
    <form role="search" (submit)="handleSubmit($event)" [class]="classes()">
      @if (!isExpanded()) {
        @if (canAttach()) {
          <button type="button" class="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--attach" (click)="attachClick.emit($event)" aria-label="Attach file" title="Attach file">
            <kpmg-app-bar-icon name="attach" [size]="iconSize()" />
          </button>
        }

        <div class="kpmg-appbar-search-pill__input-wrapper">
          <input
            #inputEl
            type="text"
            [value]="currentVal()"
            (input)="handleChange($event)"
            [attr.placeholder]="placeholder()"
            class="kpmg-appbar-search-pill__input"
            [attr.aria-label]="placeholder()"
          />
        </div>

        <div class="kpmg-appbar-search-pill__actions">
          @if (canMic()) {
            <button type="button" class="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--mic" (click)="micClick.emit($event)" aria-label="Voice search" title="Voice search">
              <kpmg-app-bar-icon name="mic" [size]="iconSize()" />
            </button>
          }
          @if (canSend()) {
            <button type="submit" class="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--send" aria-label="Send query" title="Send query">
              <kpmg-app-bar-icon name="arrow-up" [size]="iconSize()" />
            </button>
          }
          @if (canExpand() && isOverflowing()) {
            <button type="button" class="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--expand" (click)="handleToggleExpand()" aria-label="Expand editor (300px)" title="Expand editor (300px)">
              <kpmg-app-bar-icon name="bottom-expand" [size]="iconSize()" />
            </button>
          }
        </div>
      } @else {
        <textarea
          #textareaEl
          [value]="currentVal()"
          (input)="handleChange($event)"
          [attr.placeholder]="placeholder()"
          class="kpmg-appbar-search-pill__textarea"
          (keydown)="onTextareaKeydown($event)"
          [attr.aria-label]="placeholder()"
        ></textarea>

        <div class="kpmg-appbar-search-pill__expanded-footer">
          <div class="kpmg-appbar-search-pill__actions">
            @if (canAttach()) {
              <button type="button" class="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--attach" (click)="attachClick.emit($event)" aria-label="Attach file" title="Attach file">
                <kpmg-app-bar-icon name="attach" [size]="iconSize()" />
              </button>
            }
          </div>

          <div class="kpmg-appbar-search-pill__actions">
            @if (canMic()) {
              <button type="button" class="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--mic" (click)="micClick.emit($event)" aria-label="Voice search" title="Voice search">
                <kpmg-app-bar-icon name="mic" [size]="iconSize()" />
              </button>
            }
            @if (canSend()) {
              <button type="submit" class="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--send" aria-label="Send query" title="Send query">
                <kpmg-app-bar-icon name="arrow-up" [size]="iconSize()" />
              </button>
            }
            @if (canExpand()) {
              <button type="button" class="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--expand" (click)="handleToggleExpand()" aria-label="Collapse editor (thin & slim mode)" title="Collapse editor (thin & slim mode)">
                <kpmg-app-bar-icon name="bottom-minimize" [size]="iconSize()" />
              </button>
            }
          </div>
        </div>
      }
    </form>
  `,
})
export class AppBarSearchPillComponent {
  readonly size = input<AppBarSearchPillSize>('small');
  /** Controlled value; leave `undefined` for internal state. */
  readonly value = input<string | undefined>(undefined);
  readonly defaultValue = input('');
  readonly placeholder = input('Ask me anything');
  readonly showAttachment = input<boolean | undefined>(undefined);
  readonly enableAttachment = input(true, { transform: booleanAttribute });
  readonly showMicrophone = input<boolean | undefined>(undefined);
  readonly enableMic = input(true, { transform: booleanAttribute });
  readonly showSend = input<boolean | undefined>(undefined);
  readonly enableSend = input(true, { transform: booleanAttribute });
  readonly showExpand = input<boolean | undefined>(undefined);
  readonly enableExpand = input(true, { transform: booleanAttribute });
  readonly floating = input(false, { transform: booleanAttribute });
  /** Controlled expanded state; leave `undefined` for internal state. */
  readonly expanded = input<boolean | undefined>(undefined);
  readonly defaultExpanded = input(false, { transform: booleanAttribute });
  readonly className = input('');

  readonly valueChange = output<string>();
  readonly searchSubmit = output<AppBarSearchSubmit>();
  readonly attachClick = output<MouseEvent>();
  readonly micClick = output<MouseEvent>();
  readonly sendClick = output<AppBarSearchSubmit>();
  readonly expandToggle = output<boolean>();

  private readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  private readonly textareaEl = viewChild<ElementRef<HTMLTextAreaElement>>('textareaEl');

  private readonly internalVal = linkedSignal(() => this.defaultValue());
  private readonly internalExpanded = linkedSignal(() => this.defaultExpanded());
  protected readonly isOverflowing = signal(false);

  protected readonly canAttach = computed(() => this.showAttachment() ?? this.enableAttachment());
  protected readonly canMic = computed(() => this.showMicrophone() ?? this.enableMic());
  protected readonly canSend = computed(() => this.showSend() ?? this.enableSend());
  protected readonly canExpand = computed(() => this.showExpand() ?? this.enableExpand());
  protected readonly currentVal = computed(() => this.value() ?? this.internalVal());
  private readonly isExpandControlled = computed(() => this.expanded() !== undefined);
  protected readonly isExpanded = computed(() => (this.isExpandControlled() ? !!this.expanded() : this.internalExpanded()));
  protected readonly iconSize = computed(() => (this.size() === 'large' ? 28 : 16));
  protected readonly classes = computed(
    () =>
      `kpmg-appbar-search-pill kpmg-appbar-search-pill--${this.size()} ${this.floating() ? 'kpmg-appbar-search-pill--floating' : ''} ${this.isExpanded() ? 'kpmg-appbar-search-pill--expanded' : ''} ${this.className()}`,
  );

  constructor() {
    // Re-check single-line overflow whenever the value changes (after render so element metrics are current).
    afterRenderEffect(() => {
      const val = this.currentVal();
      const el = this.inputEl()?.nativeElement;
      if (!val) {
        this.isOverflowing.set(false);
      } else if (val.includes('\n')) {
        this.isOverflowing.set(true);
      } else if (el) {
        this.isOverflowing.set(el.scrollWidth > el.clientWidth + 2 || val.length > 32);
      } else {
        this.isOverflowing.set(val.length > 32);
      }
    });

    // Keep focus when switching between the thin input and the expanded editor.
    afterRenderEffect(() => {
      const expanded = this.isExpanded();
      const textarea = this.textareaEl()?.nativeElement;
      const input = this.inputEl()?.nativeElement;
      if (expanded && textarea) {
        textarea.focus();
        textarea.selectionStart = textarea.value.length;
        textarea.selectionEnd = textarea.value.length;
      } else if (!expanded && input) {
        input.focus();
      }
    });
  }

  protected handleToggleExpand(): void {
    const next = !this.isExpanded();
    if (!this.isExpandControlled()) this.internalExpanded.set(next);
    this.expandToggle.emit(next);
  }

  protected handleChange(event: Event): void {
    const el = event.target as HTMLInputElement | HTMLTextAreaElement;
    const val = el.value;
    if (this.value() === undefined) this.internalVal.set(val);
    this.valueChange.emit(val);
    this.isOverflowing.set(Boolean(val && (val.includes('\n') || el.scrollWidth > el.clientWidth + 2 || val.length > 32)));
  }

  protected handleSubmit(event: Event): void {
    event.preventDefault();
    const value = this.currentVal();
    this.searchSubmit.emit({ value, event });
    this.sendClick.emit({ value, event });
    if (!this.isExpandControlled()) this.internalExpanded.set(false);
  }

  protected onTextareaKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSubmit(event);
    }
  }
}

/**
 * AppBarSpecialCard — mirrors `AppBarSpecialCard` (glassmorphic horizontal card, 308x136).
 * `onClick` is the `cardClick` output; `...props` is omitted.
 */
@Component({
  selector: 'kpmg-app-bar-special-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppBarIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-appbar-special-card ' + className()" (click)="cardClick.emit($event)">
      <div class="kpmg-appbar-special-card__top">
        <span class="kpmg-appbar-special-card__header">{{ header() }}</span>
        @if (isChecked()) {
          <div class="kpmg-appbar-special-card__badge" aria-label="Completed badge">
            <kpmg-app-bar-icon name="checkmark-circle" [size]="24" />
          </div>
        }
      </div>

      <div class="kpmg-appbar-special-card__body">
        @if (supportingText()) {
          <p class="kpmg-appbar-special-card__text">{{ supportingText() }}</p>
        }
        @if (supportingTextSecondary()) {
          <p class="kpmg-appbar-special-card__text">{{ supportingTextSecondary() }}</p>
        }
      </div>

      <div class="kpmg-appbar-special-card__progress-track" role="progressbar" [attr.aria-valuenow]="progress()" aria-valuemin="0" aria-valuemax="100">
        <div class="kpmg-appbar-special-card__progress-fill" [style.width]="clampedWidth()"></div>
      </div>
    </div>
  `,
})
export class AppBarSpecialCardComponent {
  readonly header = input('Header');
  readonly supportingText = input<string | null>('Supporting line text');
  readonly supportingTextSecondary = input<string | null>('Supporting line text');
  readonly progress = input(31);
  readonly isChecked = input(true, { transform: booleanAttribute });
  readonly className = input('');
  readonly cardClick = output<MouseEvent>();

  protected readonly clampedWidth = computed(() => `${Math.min(100, Math.max(0, this.progress()))}%`);
}
