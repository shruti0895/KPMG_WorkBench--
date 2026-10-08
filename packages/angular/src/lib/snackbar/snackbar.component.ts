import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Injectable,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type SnackbarSize = 'single-line' | 'two-line' | 'extended' | 'extended-header' | 'extended-media';
export type SnackbarPosition = 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right';

export interface SnackbarMediaItem {
  id?: string | number;
  title?: string;
  subtitle?: string;
  onAction?: (event: Event) => void;
}

export interface SnackbarActionConfig {
  label?: string;
  onClick?: (event: Event) => void;
}

const DEFAULT_DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

/**
 * WorkBench Snackbar — mirrors packages/ui/src/components/Snackbar/Snackbar.jsx.
 *
 * Deviations: `onAction`/`onClose` are outputs `actionClick`/`closed`. `action`
 * accepts a string, `{ label, onClick }` or a `TemplateRef` (React: a node).
 * `message`/`header`/`description` are strings (React: ReactNode). `style` is
 * not ported (use host styling). Unknown sizes fall back to the message layout.
 */
@Component({
  selector: 'kpmg-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { style: 'display: contents' },
  template: `
    @if (visible()) {
      <div
        [class]="classes()"
        [attr.role]="role()"
        [attr.aria-live]="isKnownSize() ? 'polite' : null"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
      >
        @switch (size()) {
          @case ('single-line') {
            <p class="kpmg-snackbar__message">{{ message() || 'Snackbar text goes here' }}</p>
          }
          @case ('two-line') {
            <p class="kpmg-snackbar__message">{{ message() || 'Snackbar text goes here' }}</p>
          }
          @case ('extended') {
            <div class="kpmg-snackbar__content">
              <p class="kpmg-snackbar__description">{{ description() || message() || defaultDescription }}</p>
            </div>
          }
          @case ('extended-header') {
            <div class="kpmg-snackbar__content">
              <h4 class="kpmg-snackbar__header">{{ header() || 'Header' }}</h4>
              <p class="kpmg-snackbar__description">{{ description() || message() || defaultDescription }}</p>
            </div>
          }
          @case ('extended-media') {
            <div class="kpmg-snackbar__content">
              <h4 class="kpmg-snackbar__header">{{ header() || 'Header' }}</h4>
              @if (description() || message()) {
                <p class="kpmg-snackbar__description">{{ description() || message() || defaultDescription }}</p>
              }
              <div class="kpmg-snackbar__media-list">
                @for (item of mediaItems(); track item.id ?? $index) {
                  <div class="kpmg-snackbar__media-item">
                    <div class="kpmg-snackbar__media-thumb"></div>
                    <div class="kpmg-snackbar__media-info">
                      <span class="kpmg-snackbar__media-title">{{ item.title }}</span>
                      @if (item.subtitle) {
                        <span class="kpmg-snackbar__media-subtitle">{{ item.subtitle }}</span>
                      }
                    </div>
                    <button
                      type="button"
                      class="kpmg-snackbar__media-action"
                      (click)="item.onAction?.($event)"
                      aria-label="More media options"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                  </div>
                }
              </div>
            </div>
          }
          @default {
            <p class="kpmg-snackbar__message">{{ message() }}</p>
          }
        }
        @if (hasActions()) {
          <div class="kpmg-snackbar__actions">
            @if (actionTemplate(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else if (resolvedActionLabel()) {
              <button type="button" class="kpmg-snackbar__action-btn" (click)="onActionClick($event)">
                {{ resolvedActionLabel() }}
              </button>
            }
            @if (closeable()) {
              <button type="button" class="kpmg-snackbar__close-btn" (click)="close()" aria-label="Dismiss notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            }
          </div>
        }
      </div>
    }
  `,
})
export class SnackbarComponent {
  protected readonly defaultDescription = DEFAULT_DESCRIPTION;

  readonly open = input(true, { transform: booleanAttribute });
  readonly message = input<string | undefined>(undefined);
  readonly header = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly size = input<SnackbarSize>('single-line');
  /** Border stroke (true) vs. resting elevation shadow (false). */
  readonly outlined = input(false, { transform: booleanAttribute });
  /** Label string, `{ label, onClick }`, or a template that replaces the action button. */
  readonly action = input<string | SnackbarActionConfig | TemplateRef<unknown> | undefined>(undefined);
  readonly actionLabel = input<string | undefined>(undefined);
  readonly closeable = input(true, { transform: booleanAttribute });
  /** Milliseconds before auto-close; `null` disables. Pauses while hovered. */
  readonly autoHideDuration = input<number | null>(null);
  /** Media cards for the `extended-media` size. */
  readonly items = input<SnackbarMediaItem[] | undefined>(undefined);
  readonly role = input('status');
  readonly className = input('');

  /** Action button click (React: `onAction`). */
  readonly actionClick = output<Event>();
  /** Dismissed or auto-hide expired (React: `onClose`). */
  readonly closed = output<void>();

  protected readonly visible = linkedSignal(() => this.open());
  private readonly hovered = signal(false);

  constructor() {
    effect((onCleanup) => {
      const duration = this.autoHideDuration();
      if (!this.visible() || !duration || this.hovered()) return;
      const timer = setTimeout(() => this.close(), duration);
      onCleanup(() => clearTimeout(timer));
    });
  }

  protected readonly isKnownSize = computed(() =>
    ['single-line', 'two-line', 'extended', 'extended-header', 'extended-media'].includes(this.size()),
  );

  protected readonly actionTemplate = computed(() => {
    const a = this.action();
    return a instanceof TemplateRef ? a : null;
  });

  protected readonly resolvedActionLabel = computed(() => {
    const a = this.action();
    if (this.actionLabel()) return this.actionLabel()!;
    if (typeof a === 'string') return a;
    if (a && !(a instanceof TemplateRef)) return a.label ?? null;
    return null;
  });

  protected readonly hasActions = computed(
    () => !!this.resolvedActionLabel() || this.closeable() || !!this.actionTemplate(),
  );

  protected readonly mediaItems = computed<SnackbarMediaItem[]>(
    () =>
      this.items() ??
      (this.size() === 'extended-media'
        ? [
            { id: '1', title: 'Header' },
            { id: '2', title: 'Header' },
            { id: '3', title: 'Header' },
          ]
        : []),
  );

  protected readonly classes = computed(() =>
    [
      'kpmg-snackbar',
      `kpmg-snackbar--${this.size()}`,
      this.outlined() ? 'kpmg-snackbar--outlined' : 'kpmg-snackbar--elevated',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onMouseEnter(): void {
    this.hovered.set(true);
  }

  protected onMouseLeave(): void {
    this.hovered.set(false);
  }

  protected onActionClick(event: Event): void {
    const a = this.action();
    if (a && typeof a === 'object' && !(a instanceof TemplateRef)) a.onClick?.(event);
    this.actionClick.emit(event);
  }

  protected close(): void {
    this.visible.set(false);
    this.closed.emit();
  }
}

/** Fixed viewport container for stacked snackbars — mirrors `SnackbarContainer`. */
@Component({
  selector: 'kpmg-snackbar-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `<div [class]="classes()"><ng-content /></div>`,
})
export class SnackbarContainerComponent {
  readonly position = input<SnackbarPosition>('bottom-left');
  readonly className = input('');

  protected readonly classes = computed(
    () => `kpmg-snackbar-container kpmg-snackbar-container--${this.position()} ${this.className()}`,
  );
}

export interface SnackbarOptions {
  id?: string;
  message?: string;
  header?: string;
  description?: string;
  size?: SnackbarSize;
  outlined?: boolean;
  action?: string | SnackbarActionConfig;
  actionLabel?: string;
  onAction?: (event: Event) => void;
  closeable?: boolean;
  autoHideDuration?: number | null;
  items?: SnackbarMediaItem[];
  role?: string;
  className?: string;
  onClose?: () => void;
}

/** Imperative API — replaces React's `SnackbarProvider` / `useSnackbar`. Render `<kpmg-snackbar-outlet>` once. */
@Injectable({ providedIn: 'root' })
export class SnackbarService {
  readonly snackbars = signal<(SnackbarOptions & { id: string })[]>([]);

  showSnackbar(options: SnackbarOptions): string {
    const id = options.id || Date.now().toString();
    this.snackbars.update((prev) => [...prev, { ...options, id }]);
    return id;
  }

  hideSnackbar(id: string): void {
    this.snackbars.update((prev) => prev.filter((s) => s.id !== id));
  }
}

/** Renders the snackbars queued through `SnackbarService` (React: the container inside `SnackbarProvider`). */
@Component({
  selector: 'kpmg-snackbar-outlet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SnackbarComponent, SnackbarContainerComponent],
  host: { style: 'display: contents' },
  template: `
    <kpmg-snackbar-container [position]="position()">
      @for (s of service.snackbars(); track s.id) {
        <kpmg-snackbar
          [message]="s.message"
          [header]="s.header"
          [description]="s.description"
          [size]="s.size ?? 'single-line'"
          [outlined]="s.outlined ?? false"
          [action]="s.action"
          [actionLabel]="s.actionLabel"
          [closeable]="s.closeable ?? true"
          [autoHideDuration]="s.autoHideDuration ?? null"
          [items]="s.items"
          [role]="s.role ?? 'status'"
          [className]="s.className ?? ''"
          (actionClick)="s.onAction?.($event)"
          (closed)="service.hideSnackbar(s.id); s.onClose?.()"
        />
      }
    </kpmg-snackbar-container>
  `,
})
export class SnackbarOutletComponent {
  protected readonly service = inject(SnackbarService);
  readonly position = input<SnackbarPosition>('bottom-left');
}
