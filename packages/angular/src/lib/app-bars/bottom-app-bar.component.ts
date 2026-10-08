import {
  afterRenderEffect,
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
  viewChild,
} from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuItemComponent } from '../menu/menu-item.component';
import { MenuDividerComponent } from '../menu/menu-divider.component';
import { AppBarIconComponent } from './app-bar-icons.component';

export const DEFAULT_BOTTOM_PROMPTS: string[] = ['Prompt suggestion', 'Prompt suggestion', 'Prompt'];
export const DEFAULT_BOTTOM_PROJECTS: string[] = ['Project headline', 'Audit Automation 2026', 'Tax Analytics Engine', 'Advisory Intelligence'];

export type BottomAppBarState =
  | 'default'
  | 'with-verification'
  | 'with-project'
  | 'with-button'
  | 'with-project-and-button'
  | 'with-prompts';

/** A project entry: a label, `'-'` / `{ type: 'divider' }` for a divider, or `{ label | name }`. */
export type BottomAppBarProject = string | { label?: string; name?: string; type?: string };

export interface BottomAppBarFile {
  name: string;
  size?: number;
  type?: string;
}

/** Emitted by `send` (React: `onSend(text, files)`). */
export interface BottomAppBarSend {
  text: string;
  files: BottomAppBarFile[];
}

/**
 * Text-bar inputs that can be forwarded through `BottomAppBar` / `ChatDockedUI.bottomAppBarProps`
 * (React spreads `...textProps` / `bottomAppBarProps`).
 */
export interface BottomAppBarTextProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  selectedProject?: string;
  projects?: BottomAppBarProject[];
  buttonLabel?: string;
  prompts?: string[];
  suggestions?: string[];
  suggestionList?: string[];
  showVerification?: boolean;
  enableFilePicker?: boolean;
  enableAttachment?: boolean;
  showAttachment?: boolean;
  enableMic?: boolean;
  showMicrophone?: boolean;
  enableSend?: boolean;
  showSend?: boolean;
  enableExpand?: boolean;
  showExpand?: boolean;
  initialFiles?: BottomAppBarFile[];
  className?: string;
  customStyle?: Record<string, string | number> | null;
  expanded?: boolean;
  defaultExpanded?: boolean;
}

/* ==========================================================================
   BottomAppBarsText
   ========================================================================== */

/**
 * BottomAppBarsText — mirrors `BottomAppBarsText` in AppBars.jsx (6 state variants, thin pill / 300px expanded editor,
 * file attachments, project dropdown, prompt chips).
 *
 * Deviations: callbacks are outputs — `onChange(e)` -> `valueChange` (string), `onSend(text, files)` -> `send`,
 * `onMicClick` -> `micClick`, `onExpandClick(bool)` -> `expandClick`, `onExpandToggle(bool)` -> `expandToggle`,
 * `onSelectProject(label)` -> `selectProject`, `onButtonClick` -> `buttonClick`, `onSelectPrompt(text)` -> `selectPrompt`.
 * `style` is `customStyle`. `value`/`expanded`/`selectedProject` are controlled when bound. The `show*` flags must be
 * bound as `[showX]="bool"` (they override the matching `enable*`). `ref`/`...props` are omitted.
 */
@Component({
  selector: 'kpmg-bottom-app-bar-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuComponent, MenuItemComponent, MenuDividerComponent, AppBarIconComponent],
  host: {
    style: 'display: contents',
    '(window:resize)': 'checkOverflow()',
    '(document:mousedown)': 'onDocumentMouseDown($event)',
  },
  template: `
    <div [class]="classes()" [style]="customStyle()" role="region" aria-label="Bottom Application Bar">
      @if (canAttach()) {
        <input #fileInput type="file" multiple style="display: none" (change)="handleFileChange($event)" aria-hidden="true" />
      }

      @if (hasPrompts() && promptsList().length > 0) {
        <div class="kpmg-bottom-appbar__prompts-row" role="group" aria-label="Suggested prompts">
          @for (promptText of promptsList(); track $index) {
            <button type="button" class="kpmg-bottom-appbar__suggestion-chip" (click)="handleSuggestionClick(promptText)" [attr.title]="'Send: &quot;' + promptText + '&quot;'">
              {{ promptText }}
            </button>
          }
        </div>
      }

      @if (hasProject() || hasButton()) {
        <div [class]="'kpmg-bottom-appbar__header-row ' + (hasProject() ? '' : 'kpmg-bottom-appbar__header-row--end')">
          @if (hasProject()) {
            <div #projectGroup class="kpmg-bottom-appbar__project-group">
              <span class="kpmg-bottom-appbar__project-label">Working on</span>
              <div class="kpmg-bottom-appbar__project-anchor" style="position: relative; display: inline-flex">
                <button
                  type="button"
                  class="kpmg-bottom-appbar__project-pill"
                  (click)="isProjectMenuOpen.set(!isProjectMenuOpen())"
                  [attr.aria-expanded]="isProjectMenuOpen()"
                  aria-haspopup="true"
                >
                  <span class="kpmg-bottom-appbar__project-pill-text">{{ selectedProject() }}</span>
                  <span [class]="'kpmg-bottom-appbar__project-chevron ' + (isProjectMenuOpen() ? 'kpmg-bottom-appbar__project-chevron--open' : '')">
                    <kpmg-app-bar-icon name="bottom-chevron" [size]="16" />
                  </span>
                </button>

                @if (isProjectMenuOpen()) {
                  <div class="kpmg-bottom-appbar__project-dropdown-container">
                    <kpmg-menu [inline]="true" type="dropdown" [width]="240">
                      @for (proj of projects(); track $index) {
                        @if (isDivider(proj)) {
                          <kpmg-menu-divider />
                        } @else {
                          @let label = projectLabel(proj);
                          <kpmg-menu-item type="checklist" [selected]="label === selectedProject()" [label]="label" (itemClick)="handleProjectSelect(label)" />
                        }
                      }
                    </kpmg-menu>
                  </div>
                }
              </div>
            </div>
          }

          @if (hasButton()) {
            <button type="button" class="kpmg-bottom-appbar__action-btn" (click)="buttonClick.emit($event)">
              <span class="kpmg-bottom-appbar__action-btn-icon"><kpmg-app-bar-icon name="bottom-checkmark" [size]="16" /></span>
              <span class="kpmg-bottom-appbar__action-btn-text">{{ buttonLabel() }}</span>
            </button>
          }
        </div>
      }

      @if (canAttach() && attachedFiles().length > 0) {
        <div class="kpmg-bottom-appbar__files-row" aria-label="Attached files">
          @for (file of attachedFiles(); track $index) {
            <div class="kpmg-bottom-appbar__file-chip">
              <kpmg-app-bar-icon name="bottom-attach" [size]="14" />
              <span>{{ file.name }}</span>
              <button type="button" class="kpmg-bottom-appbar__file-chip-remove" (click)="handleRemoveFile($index)" [attr.aria-label]="'Remove file ' + file.name">×</button>
            </div>
          }
        </div>
      }

      @if (!isExpanded()) {
        <div class="kpmg-bottom-appbar__input-pill">
          @if (canAttach()) {
            <button type="button" class="kpmg-bottom-appbar__pill-btn" (click)="handlePaperclipClick()" title="Attach file" aria-label="Attach file">
              <kpmg-app-bar-icon name="bottom-attach" [size]="20" />
            </button>
          }

          <div class="kpmg-bottom-appbar__pill-input-wrap">
            <input
              #inputEl
              type="text"
              class="kpmg-bottom-appbar__pill-input"
              [attr.placeholder]="placeholder()"
              [value]="currentText()"
              (input)="handleInputChange($event)"
              (keydown)="handleKeyDown($event)"
              [attr.aria-label]="placeholder()"
            />
          </div>

          <div class="kpmg-bottom-appbar__pill-actions">
            @if (canMic()) {
              <button type="button" class="kpmg-bottom-appbar__pill-btn" (click)="micClick.emit($event)" title="Voice input" aria-label="Voice input">
                <kpmg-app-bar-icon name="bottom-mic" [size]="20" />
              </button>
            }
            @if (canSend()) {
              <button type="button" class="kpmg-bottom-appbar__pill-btn" (click)="handleSend()" title="Send prompt" aria-label="Send prompt">
                <kpmg-app-bar-icon name="bottom-arrow-up" [size]="20" />
              </button>
            }
            @if (canExpand() && isOverflowing()) {
              <button type="button" class="kpmg-bottom-appbar__pill-btn kpmg-bottom-appbar__pill-btn--expand" (click)="handleToggleExpand()" title="Expand editor (300px)" aria-label="Expand editor to 300px">
                <kpmg-app-bar-icon name="bottom-expand" [size]="20" />
              </button>
            }
          </div>
        </div>
      } @else {
        <div class="kpmg-bottom-appbar__input-pill kpmg-bottom-appbar__input-pill--expanded">
          <textarea
            #textareaEl
            class="kpmg-bottom-appbar__pill-textarea"
            [attr.placeholder]="placeholder()"
            [value]="currentText()"
            (input)="handleInputChange($event)"
            (keydown)="handleKeyDown($event)"
            [attr.aria-label]="placeholder()"
          ></textarea>

          <div class="kpmg-bottom-appbar__pill-expanded-footer">
            <div class="kpmg-bottom-appbar__pill-expanded-left">
              @if (canAttach()) {
                <button type="button" class="kpmg-bottom-appbar__pill-btn" (click)="handlePaperclipClick()" title="Attach file" aria-label="Attach file">
                  <kpmg-app-bar-icon name="bottom-attach" [size]="20" />
                </button>
              }
              @if (canAttach() && attachedFiles().length > 0) {
                <span style="font-size: 12px; color: var(--color-primary-action, #1a28c1); font-weight: 600">
                  {{ attachedFiles().length }} file{{ attachedFiles().length > 1 ? 's' : '' }} attached
                </span>
              }
            </div>

            <div class="kpmg-bottom-appbar__pill-expanded-right">
              @if (canMic()) {
                <button type="button" class="kpmg-bottom-appbar__pill-btn" (click)="micClick.emit($event)" title="Voice input" aria-label="Voice input">
                  <kpmg-app-bar-icon name="bottom-mic" [size]="20" />
                </button>
              }
              @if (canSend()) {
                <button type="button" class="kpmg-bottom-appbar__pill-btn" (click)="handleSend()" title="Send prompt" aria-label="Send prompt">
                  <kpmg-app-bar-icon name="bottom-arrow-up" [size]="20" />
                </button>
              }
              @if (canExpand()) {
                <button type="button" class="kpmg-bottom-appbar__pill-btn kpmg-bottom-appbar__pill-btn--collapse" (click)="handleToggleExpand()" title="Collapse editor (thin & slim mode)" aria-label="Collapse editor to thin & slim mode">
                  <kpmg-app-bar-icon name="bottom-minimize" [size]="20" />
                </button>
              }
            </div>
          </div>
        </div>
      }

      @if (hasVerification()) {
        <div class="kpmg-bottom-appbar__verification">Verified by KPMG Trusted AI</div>
      }
    </div>
  `,
})
export class BottomAppBarTextComponent {
  readonly state = input<BottomAppBarState>('default');
  readonly placeholder = input('Ask me anything');
  /** Controlled text; leave `undefined` for internal state. */
  readonly value = input<string | undefined>(undefined);
  readonly defaultValue = input('');
  /** Controlled project; leave `undefined` to select internally. */
  readonly selectedProjectInput = input<string | undefined>(undefined, { alias: 'selectedProject' });
  readonly projects = input<BottomAppBarProject[]>(DEFAULT_BOTTOM_PROJECTS);
  readonly buttonLabel = input('Label');
  readonly prompts = input<string[]>(DEFAULT_BOTTOM_PROMPTS);
  readonly suggestions = input<string[] | undefined>(undefined);
  readonly suggestionList = input<string[] | undefined>(undefined);
  readonly showVerification = input(false, { transform: booleanAttribute });
  readonly enableFilePicker = input(true, { transform: booleanAttribute });
  readonly enableAttachment = input(true, { transform: booleanAttribute });
  readonly showAttachment = input<boolean | undefined>(undefined);
  readonly enableMic = input(true, { transform: booleanAttribute });
  readonly showMicrophone = input<boolean | undefined>(undefined);
  readonly enableSend = input(true, { transform: booleanAttribute });
  readonly showSend = input<boolean | undefined>(undefined);
  readonly enableExpand = input(true, { transform: booleanAttribute });
  readonly showExpand = input<boolean | undefined>(undefined);
  readonly initialFiles = input<BottomAppBarFile[]>([]);
  readonly className = input('');
  /** Inline styles for the root (React: `style`). */
  readonly customStyle = input<Record<string, string | number> | null>(null);
  /** Controlled expanded editor; leave `undefined` for internal state. */
  readonly expanded = input<boolean | undefined>(undefined);
  readonly defaultExpanded = input(false, { transform: booleanAttribute });

  readonly valueChange = output<string>();
  readonly send = output<BottomAppBarSend>();
  readonly micClick = output<MouseEvent>();
  readonly expandClick = output<boolean>();
  readonly expandToggle = output<boolean>();
  readonly selectProject = output<string>();
  readonly buttonClick = output<MouseEvent>();
  readonly selectPrompt = output<string>();

  private readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  private readonly textareaEl = viewChild<ElementRef<HTMLTextAreaElement>>('textareaEl');
  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  private readonly projectGroup = viewChild<ElementRef<HTMLElement>>('projectGroup');

  private readonly internalValue = linkedSignal(() => this.defaultValue());
  private readonly internalExpanded = linkedSignal(() => this.defaultExpanded());
  protected readonly isOverflowing = signal(false);
  protected readonly isProjectMenuOpen = signal(false);
  protected readonly attachedFiles = linkedSignal<BottomAppBarFile[]>(() => this.initialFiles());
  protected readonly selectedProject = linkedSignal<string | undefined, string>({
    source: this.selectedProjectInput,
    computation: (src, prev) => {
      if (src !== undefined) return src;
      if (prev) return prev.value;
      const first = this.projects()[0];
      return (first !== undefined ? this.projectLabel(first) : '') || 'Project headline';
    },
  });

  private readonly isControlled = computed(() => this.value() !== undefined);
  private readonly isExpandControlled = computed(() => this.expanded() !== undefined);
  protected readonly currentText = computed(() => (this.isControlled() ? this.value()! : this.internalValue()));
  protected readonly isExpanded = computed(() => (this.isExpandControlled() ? !!this.expanded() : this.internalExpanded()));

  protected readonly canAttach = computed(() => (this.showAttachment() ?? this.enableAttachment()) && this.enableFilePicker());
  protected readonly canMic = computed(() => this.showMicrophone() ?? this.enableMic());
  protected readonly canSend = computed(() => this.showSend() ?? this.enableSend());
  protected readonly canExpand = computed(() => this.showExpand() ?? this.enableExpand());
  protected readonly promptsList = computed(() => this.suggestions() || this.suggestionList() || this.prompts() || DEFAULT_BOTTOM_PROMPTS);

  protected readonly hasVerification = computed(() => this.state() === 'with-verification' || this.showVerification());
  protected readonly hasProject = computed(() => ['with-project', 'with-project-and-button', 'with-prompts'].includes(this.state()));
  protected readonly hasButton = computed(() => ['with-button', 'with-project-and-button', 'with-prompts'].includes(this.state()));
  protected readonly hasPrompts = computed(() => this.state() === 'with-prompts');

  protected readonly classes = computed(
    () => `kpmg-bottom-appbar kpmg-bottom-appbar--${this.state()} ${this.isExpanded() ? 'kpmg-bottom-appbar--expanded-input' : ''} ${this.className()}`,
  );

  constructor() {
    afterRenderEffect(() => {
      this.currentText();
      this.checkOverflow();
    });
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

  protected checkOverflow(): void {
    const text = this.currentText();
    if (!text) {
      this.isOverflowing.set(false);
      return;
    }
    if (text.includes('\n')) {
      this.isOverflowing.set(true);
      return;
    }
    const el = this.inputEl()?.nativeElement;
    this.isOverflowing.set(el ? el.scrollWidth > el.clientWidth + 2 || text.length > 32 : text.length > 32);
  }

  protected isDivider(proj: BottomAppBarProject): boolean {
    return proj === '-' || (typeof proj === 'object' && proj?.type === 'divider');
  }

  protected projectLabel(proj: BottomAppBarProject): string {
    return typeof proj === 'string' ? proj : proj.label || proj.name || '';
  }

  protected handleProjectSelect(label: string): void {
    this.selectedProject.set(label);
    this.isProjectMenuOpen.set(false);
    this.selectProject.emit(label);
  }

  protected onDocumentMouseDown(event: MouseEvent): void {
    if (!this.isProjectMenuOpen()) return;
    const group = this.projectGroup()?.nativeElement;
    if (group && !group.contains(event.target as Node)) this.isProjectMenuOpen.set(false);
  }

  protected handleToggleExpand(): void {
    const next = !this.isExpanded();
    if (!this.isExpandControlled()) this.internalExpanded.set(next);
    this.expandToggle.emit(next);
    this.expandClick.emit(next);
  }

  protected handleInputChange(event: Event): void {
    const el = event.target as HTMLInputElement | HTMLTextAreaElement;
    const val = el.value;
    if (!this.isControlled()) this.internalValue.set(val);
    this.valueChange.emit(val);
    this.isOverflowing.set(Boolean(val && (val.includes('\n') || el.scrollWidth > el.clientWidth + 2 || val.length > 32)));
  }

  protected handlePaperclipClick(): void {
    this.fileInput()?.nativeElement.click();
  }

  protected handleFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const added = Array.from(files).map((f) => ({ name: f.name, size: f.size, type: f.type }));
      this.attachedFiles.update((prev) => [...prev, ...added]);
    }
  }

  protected handleRemoveFile(index: number): void {
    this.attachedFiles.update((prev) => prev.filter((_, i) => i !== index));
  }

  protected handleSend(): void {
    this.send.emit({ text: this.currentText(), files: this.attachedFiles() });
    if (!this.isControlled()) this.internalValue.set('');
    if (!this.isExpandControlled()) this.internalExpanded.set(false);
  }

  protected handleSuggestionClick(promptText: string): void {
    if (!this.isControlled()) this.internalValue.set(promptText);
    this.selectPrompt.emit(promptText);
    this.send.emit({ text: promptText, files: this.attachedFiles() });
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();
    }
  }
}

/* ==========================================================================
   BottomAppBarsVoice
   ========================================================================== */

/**
 * BottomAppBarsVoice — mirrors `BottomAppBarsVoice` (active pulsing / muted voice pill; "Touch to return to search"
 * swaps to the default text bar). `onToggleMute` -> `toggleMute`, `onReturnToSearch` -> `returnToSearch`,
 * `onExpandClick` -> `expandClick`. `style` is `customStyle`; `...props` is omitted.
 */
@Component({
  selector: 'kpmg-bottom-app-bar-voice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BottomAppBarTextComponent, AppBarIconComponent],
  host: { style: 'display: contents' },
  template: `
    @if (!isVoice()) {
      <kpmg-bottom-app-bar-text
        state="default"
        placeholder="Ask me anything"
        [className]="className()"
        [customStyle]="customStyle()"
        (micClick)="isVoice.set(true)"
      />
    } @else {
      <div [class]="'kpmg-bottom-appbar kpmg-bottom-appbar--voice ' + className()" [style]="customStyle()" role="region" aria-label="Voice Bottom Bar">
        <div [class]="'kpmg-bottom-appbar__voice-pill ' + (mute() ? 'kpmg-bottom-appbar__voice-pill--muted' : '')">
          <button
            type="button"
            [class]="'kpmg-bottom-appbar__voice-btn ' + (!mute() ? 'kpmg-bottom-appbar__voice-btn--pulse' : '')"
            (click)="toggleMute.emit($event)"
            [attr.title]="mute() ? 'Unmute microphone' : 'Mute microphone'"
            [attr.aria-label]="mute() ? 'Unmute microphone' : 'Mute microphone'"
            [attr.aria-pressed]="mute()"
          >
            @if (mute()) {
              <kpmg-app-bar-icon name="bottom-mute" [size]="24" />
            } @else {
              <kpmg-app-bar-icon name="bottom-mic" [size]="22" />
            }
          </button>

          <button type="button" class="kpmg-bottom-appbar__voice-text-btn" (click)="handleReturnToSearch($event)">{{ voiceText() }}</button>

          <button type="button" class="kpmg-bottom-appbar__voice-btn" (click)="expandClick.emit($event)" title="Expand Voice UI" aria-label="Expand Voice UI">
            <kpmg-app-bar-icon name="bottom-expand" [size]="20" />
          </button>
        </div>
      </div>
    }
  `,
})
export class BottomAppBarVoiceComponent {
  readonly mute = input(false, { transform: booleanAttribute });
  readonly voiceText = input('Touch to return to search');
  readonly className = input('');
  readonly customStyle = input<Record<string, string | number> | null>(null);

  readonly toggleMute = output<MouseEvent>();
  readonly returnToSearch = output<MouseEvent>();
  readonly expandClick = output<MouseEvent>();

  protected readonly isVoice = signal(true);

  protected handleReturnToSearch(event: MouseEvent): void {
    this.returnToSearch.emit(event);
    this.isVoice.set(false);
  }
}

/* ==========================================================================
   Unified BottomAppBar
   ========================================================================== */

export type BottomAppBarMode = 'text' | 'voice';

/**
 * Unified BottomAppBar — mirrors `BottomAppBar` (`mode="text" | "voice"`). Text-bar props are forwarded through
 * the typed `textProps` object (React: `...textProps`); `onModeChange(mode)` -> `modeChange`;
 * `onToggleMute` -> `toggleMute`.
 */
@Component({
  selector: 'kpmg-bottom-app-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BottomAppBarTextComponent, BottomAppBarVoiceComponent],
  host: { style: 'display: contents' },
  template: `
    @if (mode() === 'voice') {
      <kpmg-bottom-app-bar-voice
        [mute]="mute()"
        [className]="textProps().className ?? ''"
        [customStyle]="textProps().customStyle ?? null"
        (toggleMute)="toggleMute.emit($event)"
        (returnToSearch)="modeChange.emit('text')"
      />
    } @else {
      <kpmg-bottom-app-bar-text
        [state]="state()"
        [placeholder]="textProps().placeholder ?? 'Ask me anything'"
        [value]="textProps().value"
        [defaultValue]="textProps().defaultValue ?? ''"
        [selectedProject]="textProps().selectedProject"
        [projects]="textProps().projects ?? defaultProjects"
        [buttonLabel]="textProps().buttonLabel ?? 'Label'"
        [prompts]="textProps().prompts ?? defaultPrompts"
        [suggestions]="textProps().suggestions"
        [suggestionList]="textProps().suggestionList"
        [showVerification]="textProps().showVerification ?? false"
        [enableFilePicker]="textProps().enableFilePicker ?? true"
        [enableAttachment]="textProps().enableAttachment ?? true"
        [showAttachment]="textProps().showAttachment"
        [enableMic]="textProps().enableMic ?? true"
        [showMicrophone]="textProps().showMicrophone"
        [enableSend]="textProps().enableSend ?? true"
        [showSend]="textProps().showSend"
        [enableExpand]="textProps().enableExpand ?? true"
        [showExpand]="textProps().showExpand"
        [initialFiles]="textProps().initialFiles ?? []"
        [className]="textProps().className ?? ''"
        [customStyle]="textProps().customStyle ?? null"
        [expanded]="textProps().expanded"
        [defaultExpanded]="textProps().defaultExpanded ?? false"
        (micClick)="modeChange.emit('voice')"
        (valueChange)="valueChange.emit($event)"
        (send)="send.emit($event)"
        (selectProject)="selectProject.emit($event)"
        (buttonClick)="buttonClick.emit($event)"
        (selectPrompt)="selectPrompt.emit($event)"
        (expandToggle)="expandToggle.emit($event)"
      />
    }
  `,
})
export class BottomAppBarComponent {
  readonly mode = input<BottomAppBarMode>('text');
  readonly mute = input(false, { transform: booleanAttribute });
  readonly state = input<BottomAppBarState>('default');
  readonly textProps = input<BottomAppBarTextProps>({});

  readonly modeChange = output<BottomAppBarMode>();
  readonly toggleMute = output<MouseEvent>();
  readonly valueChange = output<string>();
  readonly send = output<BottomAppBarSend>();
  readonly selectProject = output<string>();
  readonly buttonClick = output<MouseEvent>();
  readonly selectPrompt = output<string>();
  readonly expandToggle = output<boolean>();

  protected readonly defaultProjects = DEFAULT_BOTTOM_PROJECTS;
  protected readonly defaultPrompts = DEFAULT_BOTTOM_PROMPTS;
}

/* ==========================================================================
   ChatDockedUI
   ========================================================================== */

export interface ChatDockedMessage {
  id: string | number;
  sender: 'assistant' | 'user';
  text: string;
}

const DEFAULT_DOCKED_MESSAGES: ChatDockedMessage[] = [
  { id: 1, sender: 'assistant', text: 'Hello! I am your KPMG Workbench AI Assistant. How can I help you today?' },
  { id: 2, sender: 'user', text: 'Can you summarize the recent audit compliance requirements?' },
  { id: 3, sender: 'assistant', text: 'Certainly! According to the guidelines, compliance requires automated trail auditing and end-to-end data encryption.' },
];

/** Props forwarded to the docked footer bar (text props plus voice `mute`/`voiceText`). */
export interface ChatDockedBottomBarProps extends BottomAppBarTextProps {
  mute?: boolean;
  voiceText?: string;
}

/**
 * ChatDockedUI — mirrors `ChatDockedUI` (expanded chat or voice docked panel with a bottom app bar footer).
 *
 * Deviations: `onClose` -> `closeClick`; because outputs cannot be detected, set `closable` to render the close
 * button (React: only when `onClose` is passed). `onModeToggle(mode)` -> `modeToggle`. `bottomAppBarProps`
 * is a typed subset (text props + `mute`/`voiceText`); handler overrides are not supported. `style` is `customStyle`.
 * Messages are internal state seeded from `initialMessages`; sending appends the user message and a simulated reply.
 */
@Component({
  selector: 'kpmg-chat-docked-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BottomAppBarTextComponent, BottomAppBarVoiceComponent, AppBarIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div
      [class]="'kpmg-bottom-docked-panel ' + (isVoice() ? 'kpmg-bottom-docked-panel--voice' : '') + ' ' + className()"
      [style]="customStyle()"
      role="dialog"
      [attr.aria-label]="isVoice() ? 'Voice Assistant' : 'Chat Assistant'"
    >
      <div class="kpmg-bottom-docked-header">
        <div class="kpmg-bottom-docked-header__drag" aria-hidden="true"></div>

        <div class="kpmg-bottom-docked-header__actions">
          <button
            type="button"
            class="kpmg-bottom-appbar__pill-btn"
            style="width: 32px; height: 32px"
            (click)="toggleMode()"
            [attr.title]="isVoice() ? 'Switch to Chat' : 'Switch to Voice'"
            [attr.aria-label]="isVoice() ? 'Switch to Chat' : 'Switch to Voice'"
          >
            @if (isVoice()) {
              <kpmg-app-bar-icon name="bottom-attach" [size]="16" />
            } @else {
              <kpmg-app-bar-icon name="bottom-mic" [size]="16" />
            }
          </button>

          <button type="button" class="kpmg-bottom-appbar__pill-btn" style="width: 32px; height: 32px" title="More Options" aria-label="More Options">
            <kpmg-app-bar-icon name="bottom-more-vertical" [size]="16" />
          </button>

          @if (closable()) {
            <button type="button" class="kpmg-bottom-appbar__pill-btn" style="width: 32px; height: 32px" (click)="closeClick.emit($event)" title="Close panel" aria-label="Close panel">
              <kpmg-app-bar-icon name="bottom-close" [size]="16" />
            </button>
          }
        </div>
      </div>

      @if (!isVoice()) {
        <div class="kpmg-bottom-docked-body">
          @for (m of messages(); track m.id) {
            <div [class]="'kpmg-bottom-docked-message ' + (m.sender === 'user' ? 'kpmg-bottom-docked-message--user' : 'kpmg-bottom-docked-message--assistant')">{{ m.text }}</div>
          }
        </div>
      } @else {
        <div class="kpmg-bottom-docked-transcript">
          <div class="kpmg-bottom-docked-audio-bars">
            <span class="kpmg-bottom-docked-audio-bar" style="animation-delay: 0.1s"></span>
            <span class="kpmg-bottom-docked-audio-bar" style="animation-delay: 0.3s"></span>
            <span class="kpmg-bottom-docked-audio-bar" style="animation-delay: 0.5s"></span>
            <span class="kpmg-bottom-docked-audio-bar" style="animation-delay: 0.2s"></span>
            <span class="kpmg-bottom-docked-audio-bar" style="animation-delay: 0.4s"></span>
            <span class="kpmg-bottom-docked-audio-bar" style="animation-delay: 0.6s"></span>
          </div>
          <p class="kpmg-bottom-docked-transcript__text">
            This is a multi-line text string that captures a transcript of the audio message from your AI assistant. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit.
          </p>
        </div>
      }

      <div class="kpmg-bottom-docked-footer">
        @if (isVoice()) {
          <kpmg-bottom-app-bar-voice
            [mute]="barProps().mute ?? isVoiceMuted()"
            [voiceText]="barProps().voiceText ?? 'Touch to return to search'"
            [className]="barProps().className ?? ''"
            [customStyle]="barProps().customStyle ?? null"
            (toggleMute)="isVoiceMuted.set(!isVoiceMuted())"
            (returnToSearch)="dockedMode.set('text')"
          />
        } @else {
          <kpmg-bottom-app-bar-text
            state="with-project"
            [placeholder]="barProps().placeholder ?? 'Ask me anything'"
            [value]="barProps().value"
            [defaultValue]="barProps().defaultValue ?? ''"
            [selectedProject]="barProps().selectedProject"
            [projects]="barProps().projects ?? defaultProjects"
            [buttonLabel]="barProps().buttonLabel ?? 'Label'"
            [prompts]="barProps().prompts ?? defaultPrompts"
            [suggestions]="barProps().suggestions"
            [suggestionList]="barProps().suggestionList"
            [showVerification]="barProps().showVerification ?? false"
            [enableFilePicker]="barProps().enableFilePicker ?? true"
            [enableAttachment]="barProps().enableAttachment ?? true"
            [showAttachment]="barProps().showAttachment"
            [enableMic]="barProps().enableMic ?? true"
            [showMicrophone]="barProps().showMicrophone"
            [enableSend]="barProps().enableSend ?? true"
            [showSend]="barProps().showSend"
            [enableExpand]="barProps().enableExpand ?? true"
            [showExpand]="barProps().showExpand"
            [initialFiles]="barProps().initialFiles ?? []"
            [className]="barProps().className ?? ''"
            [customStyle]="barProps().customStyle ?? null"
            [expanded]="barProps().expanded"
            [defaultExpanded]="barProps().defaultExpanded ?? false"
            (send)="handleSendMessage($event)"
            (micClick)="dockedMode.set('voice')"
          />
        }
      </div>
    </div>
  `,
})
export class ChatDockedUiComponent {
  readonly mode = input<BottomAppBarMode>('text');
  readonly closable = input(false, { transform: booleanAttribute });
  readonly bottomAppBarProps = input<ChatDockedBottomBarProps>({});
  readonly initialMessages = input<ChatDockedMessage[]>(DEFAULT_DOCKED_MESSAGES);
  readonly className = input('');
  readonly customStyle = input<Record<string, string | number> | null>(null);

  readonly closeClick = output<MouseEvent>();
  readonly modeToggle = output<BottomAppBarMode>();

  protected readonly messages = linkedSignal<ChatDockedMessage[]>(() => this.initialMessages());
  protected readonly dockedMode = linkedSignal<BottomAppBarMode>(() => this.mode());
  protected readonly isVoiceMuted = signal(false);
  protected readonly isVoice = computed(() => this.dockedMode() === 'voice');
  protected readonly barProps = computed(() => this.bottomAppBarProps() ?? {});
  protected readonly defaultProjects = DEFAULT_BOTTOM_PROJECTS;
  protected readonly defaultPrompts = DEFAULT_BOTTOM_PROMPTS;

  private readonly timers = new Set<ReturnType<typeof setTimeout>>();

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach((t) => clearTimeout(t)));
  }

  protected toggleMode(): void {
    const next: BottomAppBarMode = this.dockedMode() === 'text' ? 'voice' : 'text';
    this.dockedMode.set(next);
    this.modeToggle.emit(next);
  }

  protected handleSendMessage({ text, files }: BottomAppBarSend): void {
    if (!text && (!files || files.length === 0)) return;
    const newMsg: ChatDockedMessage = {
      id: Date.now(),
      sender: 'user',
      text: text + (files && files.length > 0 ? ` [Attached: ${files.map((f) => f.name).join(', ')}]` : ''),
    };
    this.messages.update((prev) => [...prev, newMsg]);

    const timer = setTimeout(() => {
      this.timers.delete(timer);
      this.messages.update((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: `Processed your request regarding "${text.slice(0, 30)}...". All checks passed.`,
        },
      ]);
    }, 600);
    this.timers.add(timer);
  }
}
