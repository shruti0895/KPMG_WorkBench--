import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { ProgressIndicatorComponent } from '../progress-indicator/progress-indicator.component';
import { MessageIconComponent } from './message-icons.component';

/* ==========================================================================
   Citation
   ========================================================================== */

/**
 * Citation footnote badge — mirrors `MessageCitation` in Message.jsx.
 * `onClick` is the `citationClick` output.
 */
@Component({
  selector: 'kpmg-message-citation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <span
      class="kpmg-message__citation"
      (click)="citationClick.emit($event)"
      [attr.title]="'Citation reference ' + number()"
      role="button"
      tabindex="0"
    >{{ number() }}</span>
  `,
})
export class MessageCitationComponent {
  readonly number = input<string | number>('2');
  readonly citationClick = output<MouseEvent>();
}

/* ==========================================================================
   Action icon bar
   ========================================================================== */

/**
 * Action icon bar — mirrors `MessageActionIconBar` in Message.jsx.
 * Callbacks become outputs: `onLike(bool)` -> `likeChange`, `onDislike(bool)` -> `dislikeChange`,
 * `onSpeak(bool)` -> `speakChange`, `onCopy` -> `copyClick`, `onRegenerate` -> `regenerateClick`.
 */
@Component({
  selector: 'kpmg-message-action-icon-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MessageIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-message__action-bar ' + className()" role="toolbar" aria-label="Message actions">
      <button type="button" [class]="btnClass(liked())" (click)="handleLike()" title="Good response" aria-label="Good response">
        <kpmg-message-icon name="thumbs-up" [size]="20" />
      </button>
      <button type="button" [class]="btnClass(disliked())" (click)="handleDislike()" title="Bad response" aria-label="Bad response">
        <kpmg-message-icon name="thumbs-down" [size]="20" />
      </button>
      <button type="button" [class]="btnClass(speaking())" (click)="handleSpeak()" title="Read aloud" aria-label="Read aloud">
        <kpmg-message-icon name="speaker" [size]="20" />
      </button>
      <button type="button" [class]="btnClass(copied())" (click)="handleCopy()" [attr.title]="copied() ? 'Copied!' : 'Copy to clipboard'" aria-label="Copy to clipboard">
        <kpmg-message-icon name="copy" [size]="20" />
      </button>
      <button
        type="button"
        class="kpmg-message__action-btn"
        (click)="handleRegenerate()"
        title="Regenerate response"
        aria-label="Regenerate response"
        [style.transform]="regenerating() ? 'rotate(180deg)' : 'none'"
        style="transition: transform 0.4s ease"
      >
        <kpmg-message-icon name="regenerate" [size]="20" />
      </button>
    </div>
  `,
})
export class MessageActionIconBarComponent {
  readonly className = input('');

  readonly likeChange = output<boolean>();
  readonly dislikeChange = output<boolean>();
  readonly speakChange = output<boolean>();
  readonly copyClick = output<void>();
  readonly regenerateClick = output<void>();

  protected readonly liked = signal(false);
  protected readonly disliked = signal(false);
  protected readonly speaking = signal(false);
  protected readonly copied = signal(false);
  protected readonly regenerating = signal(false);

  private readonly timers = new Set<ReturnType<typeof setTimeout>>();

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach((t) => clearTimeout(t)));
  }

  protected btnClass(active: boolean): string {
    return `kpmg-message__action-btn ${active ? 'kpmg-message__action-btn--active' : ''}`;
  }

  private later(fn: () => void, ms: number): void {
    const t = setTimeout(() => {
      this.timers.delete(t);
      fn();
    }, ms);
    this.timers.add(t);
  }

  protected handleLike(): void {
    const next = !this.liked();
    this.liked.set(next);
    if (next) this.disliked.set(false);
    this.likeChange.emit(next);
  }

  protected handleDislike(): void {
    const next = !this.disliked();
    this.disliked.set(next);
    if (next) this.liked.set(false);
    this.dislikeChange.emit(next);
  }

  protected handleSpeak(): void {
    const next = !this.speaking();
    this.speaking.set(next);
    this.speakChange.emit(next);
  }

  protected handleCopy(): void {
    this.copied.set(true);
    this.later(() => this.copied.set(false), 2000);
    this.copyClick.emit();
  }

  protected handleRegenerate(): void {
    this.regenerating.set(true);
    this.later(() => this.regenerating.set(false), 800);
    this.regenerateClick.emit();
  }
}

/* ==========================================================================
   Attachment card
   ========================================================================== */

/** Horizontal attachment card — mirrors `MessageAttachmentCard`. `onAction` is the `action` output. */
@Component({
  selector: 'kpmg-message-attachment-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MessageIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-message__attachment ' + className()">
      <div class="kpmg-message__attachment-thumb"></div>
      <div class="kpmg-message__attachment-content">
        <p class="kpmg-message__attachment-title">{{ title() }}</p>
      </div>
      <button type="button" class="kpmg-message__attachment-action" (click)="action.emit($event)" title="Attachment options" aria-label="Attachment options">
        <kpmg-message-icon name="more-vertical" [size]="20" />
      </button>
    </div>
  `,
})
export class MessageAttachmentCardComponent {
  readonly title = input('Attachment');
  readonly className = input('');
  readonly action = output<MouseEvent>();
}

/* ==========================================================================
   Media card + gallery
   ========================================================================== */

export type MessageMediaCardState = 'enabled' | 'hovered' | 'disabled' | 'pressed';
export type MessageMediaOrientation = 'left' | 'right' | 'default';

export interface MessageMediaCardClick {
  open: boolean;
  event: Event;
}

const DEFAULT_MEDIA_OPTIONS = ['Option', 'Option', 'Option', 'Option', 'Option', 'Option'];

/**
 * Interactive media card with popover menu — mirrors `MessageMediaCard`.
 * Controlled (`open` bound) / uncontrolled (internal, closes on outside mousedown) like React.
 * `onClick(nextOpen, e)` is the `cardClick` output.
 */
@Component({
  selector: 'kpmg-message-media-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MessageIconComponent],
  host: { style: 'display: contents', '(document:mousedown)': 'onDocumentMouseDown($event)' },
  template: `
    <div
      [class]="classes()"
      (click)="handleClick($event)"
      role="button"
      [attr.tabindex]="state() === 'disabled' ? -1 : 0"
      aria-haspopup="true"
      [attr.aria-expanded]="isOpen()"
    >
      @if (isOpen()) {
        <div [class]="'kpmg-message__media-popover kpmg-message__media-popover--' + orientation()" (click)="$event.stopPropagation()">
          <div class="kpmg-message__media-popover-caret"></div>
          <h4 class="kpmg-message__media-popover-title">Title</h4>
          <p class="kpmg-message__media-popover-desc">
            Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div class="kpmg-message__divider"></div>
          <div class="kpmg-message__media-popover-list">
            @for (opt of resolvedOptions(); track $index) {
              <div class="kpmg-message__media-popover-item">
                <kpmg-message-icon name="star" [size]="16" />
                <span>{{ opt }}</span>
                <span class="kpmg-message__media-popover-item-check">✓</span>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class MessageMediaCardComponent {
  readonly state = input<MessageMediaCardState>('enabled');
  /** Controlled open state; leave `undefined` for uncontrolled. */
  readonly open = input<boolean | undefined>(undefined);
  readonly orientation = input<MessageMediaOrientation>('left');
  readonly options = input<string[] | undefined>(undefined);

  readonly cardClick = output<MessageMediaCardClick>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly internalOpen = signal(false);
  private readonly isControlled = computed(() => this.open() !== undefined);

  protected readonly isOpen = computed(() => (this.isControlled() ? !!this.open() : this.internalOpen()));
  protected readonly resolvedOptions = computed(() => this.options() ?? DEFAULT_MEDIA_OPTIONS);
  protected readonly classes = computed(
    () =>
      `kpmg-message__media-card ${this.state() === 'disabled' ? 'kpmg-message__media-card--disabled' : ''} ${this.state() === 'pressed' ? 'kpmg-message__media-card--pressed' : ''}`,
  );

  protected handleClick(event: MouseEvent): void {
    if (this.state() === 'disabled') return;
    const next = !this.isOpen();
    if (!this.isControlled()) this.internalOpen.set(next);
    this.cardClick.emit({ open: next, event });
  }

  protected onDocumentMouseDown(event: MouseEvent): void {
    if (this.isControlled() || !this.internalOpen()) return;
    if (!this.host.nativeElement.contains(event.target as Node)) this.internalOpen.set(false);
  }
}

/** Per-card config for `MessageMediaGallery`/`Message` (React: props spread onto MessageMediaCard). */
export interface MessageMediaCardConfig {
  state?: MessageMediaCardState;
  open?: boolean;
  orientation?: MessageMediaOrientation;
  options?: string[];
  onClick?: (open: boolean, event: Event) => void;
}

export interface MessageMediaGalleryCardClick {
  index: number;
  open: boolean;
  event: Event;
}

/**
 * Media gallery — mirrors `MessageMediaGallery`; only one popover open at a time,
 * dismissed on outside mousedown. `onCardClick(idx, open, e)` is the `cardClick` output.
 * The initially-open card is read from `cards[i].open`; changing the `cards` array resets it.
 */
@Component({
  selector: 'kpmg-message-media-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MessageMediaCardComponent],
  host: { style: 'display: contents', '(document:mousedown)': 'onDocumentMouseDown($event)' },
  template: `
    <div class="kpmg-message__media-gallery">
      @for (c of cards(); track $index) {
        <kpmg-message-media-card
          [state]="c.state ?? 'enabled'"
          [options]="c.options"
          [orientation]="c.orientation || defaultOrientation($index)"
          [open]="openIndex() === $index"
          (cardClick)="handleCardToggle($index, c, $event)"
        />
      }
    </div>
  `,
})
export class MessageMediaGalleryComponent {
  readonly cards = input<MessageMediaCardConfig[]>([{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]);

  readonly cardClick = output<MessageMediaGalleryCardClick>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly openIndex = linkedSignal<MessageMediaCardConfig[], number | null>({
    source: this.cards,
    computation: (cards) => {
      const i = cards.findIndex((c) => c && c.open);
      return i !== -1 ? i : null;
    },
  });

  protected defaultOrientation(idx: number): MessageMediaOrientation {
    const len = this.cards().length;
    return idx > 0 && idx === len - 1 ? 'right' : 'left';
  }

  protected handleCardToggle(idx: number, card: MessageMediaCardConfig, e: MessageMediaCardClick): void {
    this.openIndex.update((prev) => (prev === idx ? null : idx));
    card.onClick?.(e.open, e.event);
    this.cardClick.emit({ index: idx, open: e.open, event: e.event });
  }

  protected onDocumentMouseDown(event: MouseEvent): void {
    if (this.openIndex() === null) return;
    if (!this.host.nativeElement.contains(event.target as Node)) this.openIndex.set(null);
  }
}

/* ==========================================================================
   Status card
   ========================================================================== */

export type MessageStepStatus = 'completed' | 'pending' | 'in-progress';

export interface MessageStatusStep {
  name?: string;
  desc?: string;
  status?: MessageStepStatus;
}

export interface MessageStatusSource {
  header?: string;
  subhead?: string;
}

/** Props accepted by the status card (also the shape of `Message`'s `statusCard`). */
export interface MessageStatusCardProps {
  title?: string;
  header?: string;
  subhead?: string;
  progress?: number;
  steps?: MessageStatusStep[];
  code?: string | null;
  sources?: MessageStatusSource[] | null;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

const DEFAULT_STEPS: MessageStatusStep[] = [
  { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
  { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
  { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'pending' },
  { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'in-progress' },
];
const DEFAULT_SOURCES: MessageStatusSource[] = [
  { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
  { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
];

/**
 * Workflow status card — mirrors `MessageStatusCard`. Inputs left `undefined` fall back to the
 * React defaults; `code`/`sources` set to `null` hide those sections.
 */
@Component({
  selector: 'kpmg-message-status-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MessageIconComponent, ProgressIndicatorComponent],
  host: { style: 'display: contents' },
  template: `
    <div class="kpmg-message__status-card">
      <div class="kpmg-message__status-top">
        <span class="kpmg-message__status-top-title">{{ resolvedTitle() }}</span>
        @if (resolvedCollapsible()) {
          <button
            type="button"
            class="kpmg-message__status-top-btn"
            (click)="isExpanded.set(!isExpanded())"
            [attr.aria-label]="isExpanded() ? 'Collapse status' : 'Expand status'"
          >
            @if (isExpanded()) {
              <kpmg-message-icon name="chevron-up" [size]="18" />
            } @else {
              <kpmg-message-icon name="chevron-down" [size]="18" />
            }
          </button>
        }
      </div>

      @if (isExpanded()) {
        <div class="kpmg-message__divider"></div>

        <div class="kpmg-message__status-header-row">
          <div class="kpmg-message__status-header-info">
            <h4 class="kpmg-message__status-header-title">{{ resolvedHeader() }}</h4>
            <span class="kpmg-message__status-header-subhead">{{ resolvedSubhead() }}</span>
          </div>
          <button type="button" class="kpmg-message__attachment-action" title="More options" aria-label="More options">
            <kpmg-message-icon name="more-vertical" [size]="20" />
          </button>
        </div>

        <div class="kpmg-message__divider"></div>

        <div class="kpmg-message__steps-section">
          <h5 class="kpmg-message__steps-title">Steps</h5>
          <kpmg-progress-indicator variant="linear" type="determinate" [progress]="resolvedProgress()" [ariaLabel]="'Workflow completion: ' + resolvedProgress() + '%'" />

          <div class="kpmg-message__steps-list">
            @for (st of resolvedSteps(); track $index) {
              <div class="kpmg-message__step-item">
                <div class="kpmg-message__step-info">
                  <span class="kpmg-message__step-name">{{ st.name }}</span>
                  <span class="kpmg-message__step-desc">{{ st.desc }}</span>
                </div>
                <div class="kpmg-message__step-indicator">
                  @if (st.status === 'completed') {
                    <kpmg-message-icon name="step-check" [size]="22" />
                  }
                  @if (st.status === 'pending') {
                    <div class="kpmg-message__step-circle-pending"></div>
                  }
                  @if (st.status === 'in-progress') {
                    <kpmg-progress-indicator variant="circular" size="small" type="indeterminate" ariaLabel="Step in progress" />
                  }
                </div>
              </div>
            }
          </div>

          @if (resolvedCode(); as codeText) {
            <div class="kpmg-message__code-card">
              <h5 class="kpmg-message__code-title">Header</h5>
              <div class="kpmg-message__code-box">
                <code>{{ codeText }}</code>
              </div>
            </div>
          }
        </div>

        @if (resolvedSources(); as srcs) {
          @if (srcs.length > 0) {
            <div class="kpmg-message__sources-section">
              <div class="kpmg-message__divider"></div>
              <h5 class="kpmg-message__sources-title">Sources</h5>
              @for (src of srcs; track $index) {
                <div class="kpmg-message__source-card">
                  <div class="kpmg-message__source-thumb"></div>
                  <div class="kpmg-message__source-content">
                    <span class="kpmg-message__source-header">{{ src.header }}</span>
                    <span class="kpmg-message__source-subhead">{{ src.subhead }}</span>
                  </div>
                  <button type="button" class="kpmg-message__attachment-action" title="Source options" aria-label="Source options">
                    <kpmg-message-icon name="more-vertical" [size]="20" />
                  </button>
                </div>
              }
            </div>
          }
        }
      }
    </div>
  `,
})
export class MessageStatusCardComponent {
  readonly title = input<string | undefined>(undefined);
  readonly header = input<string | undefined>(undefined);
  readonly subhead = input<string | undefined>(undefined);
  readonly progress = input<number | undefined>(undefined);
  readonly steps = input<MessageStatusStep[] | undefined>(undefined);
  readonly code = input<string | null | undefined>(undefined);
  readonly sources = input<MessageStatusSource[] | null | undefined>(undefined);
  readonly collapsible = input<boolean | undefined>(undefined);
  readonly defaultExpanded = input<boolean | undefined>(undefined);

  protected readonly isExpanded = linkedSignal(() => this.defaultExpanded() ?? true);

  protected readonly resolvedTitle = computed(() => this.title() ?? 'Status');
  protected readonly resolvedHeader = computed(() => this.header() ?? 'Header');
  protected readonly resolvedSubhead = computed(() => this.subhead() ?? 'Subhead');
  protected readonly resolvedProgress = computed(() => this.progress() ?? 30);
  protected readonly resolvedSteps = computed(() => this.steps() ?? DEFAULT_STEPS);
  protected readonly resolvedCode = computed(() => (this.code() === undefined ? 'Some code' : this.code()));
  protected readonly resolvedSources = computed(() => (this.sources() === undefined ? DEFAULT_SOURCES : this.sources()));
  protected readonly resolvedCollapsible = computed(() => this.collapsible() ?? true);
}

/* ==========================================================================
   Audio rich
   ========================================================================== */

/** Audio / voice message transcript — mirrors `MessageAudioRich`. `onProjectClick` is `projectClick`. */
@Component({
  selector: 'kpmg-message-audio-rich',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MessageIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-message-audio kpmg-message-audio--' + mode() + ' ' + className()">
      @if (withProjectDropdown()) {
        <div class="kpmg-message-audio__dropdown-row">
          <span class="kpmg-message-audio__label">Working on</span>
          <button type="button" class="kpmg-message-audio__pill" (click)="projectClick.emit($event)" [attr.aria-label]="'Select project: ' + projectHeadline()">
            <span>{{ projectHeadline() }}</span>
            <kpmg-message-icon name="chevron-down" [size]="16" />
          </button>
        </div>
      }
      <p class="kpmg-message-audio__transcript">{{ transcript() }}</p>
    </div>
  `,
})
export class MessageAudioRichComponent {
  readonly mode = input<'light' | 'dark'>('light');
  readonly withProjectDropdown = input(false, { transform: booleanAttribute });
  readonly projectHeadline = input('Project headline');
  readonly transcript = input(
    'This is a multi-line text string that captures a transcript of the audio message from your AI assistant. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit.',
  );
  readonly className = input('');
  readonly projectClick = output<MouseEvent>();
}

/* ==========================================================================
   Expand / Minimize buttons
   ========================================================================== */

/** Centered expand button — mirrors `MessageExpandButton`. `onClick` is `buttonClick`. */
@Component({
  selector: 'kpmg-message-expand-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MessageIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-message__toggle-container ' + className()">
      <button type="button" class="kpmg-message__toggle-btn" (click)="buttonClick.emit($event)" title="Expand message" aria-label="Expand message">
        <kpmg-message-icon name="chevron-down" [size]="24" />
      </button>
    </div>
  `,
})
export class MessageExpandButtonComponent {
  readonly className = input('');
  readonly buttonClick = output<MouseEvent>();
}

/** Centered minimize button — mirrors `MessageMinimizeButton`. `onClick` is `buttonClick`. */
@Component({
  selector: 'kpmg-message-minimize-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MessageIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-message__toggle-container ' + className()">
      <button type="button" class="kpmg-message__toggle-btn" (click)="buttonClick.emit($event)" title="Minimize message" aria-label="Minimize message">
        <kpmg-message-icon name="chevron-up" [size]="24" />
      </button>
    </div>
  `,
})
export class MessageMinimizeButtonComponent {
  readonly className = input('');
  readonly buttonClick = output<MouseEvent>();
}
