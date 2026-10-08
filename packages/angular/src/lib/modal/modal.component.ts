import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ModalIconComponent } from './modal-icon.component';
import { ModalItemComponent } from './modal-item.component';
import { ModalAgentCardComponent, ModalCardComponent, ModalPromptItemComponent } from './modal-parts.component';

const DEFAULT_MODELS = [
  { title: 'KPMG Private LLM', desc: 'Secure enterprise language model tailored for proprietary audits and advisory data.' },
  { title: 'GPT-4o Enterprise', desc: 'High capability model for multimodal analytical reasoning and summarization.' },
  { title: 'Claude 3.5 Sonnet', desc: 'Strong instruction adherence and nuanced context synthesis for complex workflows.' },
  { title: 'Gemini 1.5 Pro', desc: 'Massive context processing for enterprise repository indexing and research.' },
];

const DEFAULT_VOICES = [
  { title: 'Breeze', desc: 'Warm and conversational voice optimized for customer-facing client dialogues.' },
  { title: 'Echo', desc: 'Clear, crisp cadence ideal for executive briefings and synthesized summaries.' },
  { title: 'Alloy', desc: 'Neutral, professional tone balanced for analytical reports and documentation.' },
  { title: 'Onyx', desc: 'Deep, resonant timbre suitable for structured walkthroughs and compliance.' },
];

/**
 * WorkBench Modal — mirrors packages/ui/src/components/Modal/Modal.jsx.
 *
 * Deviations: `onClose`/`onBack`/`onNext` are outputs `modalClose`/`back`/`next`.
 * `children` is default `<ng-content>`. `style` is not ported. The linear progress bar
 * is rendered inline with the identical `kpmg-progress` DOM instead of importing the
 * ProgressIndicator component. `nameValue`/`purposeValue`/`promptValue` are `model()`s
 * (two-way bindable) rather than uncontrolled defaults. Selected model/voice and
 * dropped file names are internal state, as in React.
 */
@Component({
  selector: 'kpmg-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, ModalIconComponent, ModalItemComponent, ModalAgentCardComponent, ModalCardComponent, ModalPromptItemComponent],
  host: { style: 'display: contents', '(window:keydown)': 'onWindowKeydown($event)' },
  template: `
    @if (isOpen()) {
      @if (inline()) {
        <ng-container [ngTemplateOutlet]="dialog" />
      } @else {
        <div class="kpmg-modal-overlay" role="presentation" (click)="modalClose.emit()">
          <ng-container [ngTemplateOutlet]="dialog" />
        </div>
      }
    }

    <ng-template #dialog>
      <div
        [class]="classes()"
        role="dialog"
        [attr.aria-modal]="!inline()"
        aria-labelledby="kpmg-modal-title"
        (click)="$event.stopPropagation()"
      >
        <div class="kpmg-modal__inner">
          <div class="kpmg-modal__header">
            <div class="kpmg-modal__header-bar">
              <h2 id="kpmg-modal-title" class="kpmg-modal__title">{{ title() }}</h2>
              <button type="button" class="kpmg-modal__close-btn" (click)="modalClose.emit()" aria-label="Close modal dialog">
                <kpmg-modal-icon name="close" [size]="24" />
              </button>
            </div>
            <div class="kpmg-modal__divider"></div>
          </div>

          <div class="kpmg-modal__body">
            @if (withProgress()) {
              <div class="kpmg-modal__progress-wrapper">
                <div
                  class="kpmg-progress kpmg-progress--linear kpmg-progress--determinate kpmg-progress--size-large"
                  role="progressbar"
                  [attr.aria-valuenow]="clampedRounded()"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  [attr.aria-label]="'Step progress: ' + progress() + '%'"
                >
                  <div class="kpmg-progress__linear-track" style="height: 4px; background-color: var(--color-progress-track-inactive, #E3E3E8)">
                    <div
                      class="kpmg-progress__linear-fill"
                      [style.width.%]="clamped()"
                      style="background-color: var(--color-progress-track-active, #1E49E2)"
                    ></div>
                  </div>
                </div>
              </div>
            }

            @if (agentModule()) {
              <kpmg-modal-agent-card />
              <div class="kpmg-modal__divider"></div>
            }

            @if (inputModule1()) {
              <kpmg-modal-item label="Name" type="with-edit" size="large" />
              <div class="kpmg-modal__textarea-container">
                <textarea
                  class="kpmg-modal__textarea"
                  [value]="nameValue()"
                  (input)="nameValue.set($any($event.target).value)"
                  placeholder="Enter assistant name..."
                  rows="4"
                ></textarea>
              </div>
              <div class="kpmg-modal__divider"></div>
            }

            @if (inputModule2()) {
              <kpmg-modal-item label="Purpose" type="with-edit" size="large" />
              <div class="kpmg-modal__textarea-container">
                <textarea
                  class="kpmg-modal__textarea"
                  [value]="purposeValue()"
                  (input)="purposeValue.set($any($event.target).value)"
                  placeholder="Describe the purpose of this assistant..."
                  rows="4"
                ></textarea>
                <button type="button" class="kpmg-modal__textarea-mic-btn" aria-label="Voice dictation for purpose">
                  <kpmg-modal-icon name="mic" [size]="16" />
                </button>
              </div>
              <div class="kpmg-modal__divider"></div>
            }

            @if (fileUploaderModule()) {
              <kpmg-modal-item label="Knowledge base" type="with-info" size="large" />
              <input #fileInput type="file" style="display: none" multiple (change)="onFileInput($event)" />
              <div
                [class]="'kpmg-modal__dropzone ' + (isDragOver() ? 'kpmg-modal__dropzone--dragover' : '')"
                role="button"
                tabindex="0"
                (dragover)="onDragOver($event)"
                (dragleave)="isDragOver.set(false)"
                (drop)="onDrop($event)"
                (click)="fileInput.click()"
              >
                <div class="kpmg-modal__dropzone-icon"><kpmg-modal-icon name="upload" [size]="24" /></div>
                <p class="kpmg-modal__dropzone-text">
                  Drag and drop files or{{ ' ' }}<span class="kpmg-modal__dropzone-link">browse on computer</span>
                </p>
                @if (files().length > 0) {
                  <div class="kpmg-modal__file-list">
                    @for (file of files(); track $index) {
                      <span class="kpmg-modal__file-tag">
                        {{ file }}
                        <button type="button" class="kpmg-modal__file-remove-btn" (click)="removeFile($index, $event)" [attr.aria-label]="'Remove file ' + file">✕</button>
                      </span>
                    }
                  </div>
                }
              </div>
              <div class="kpmg-modal__divider"></div>
            }

            @if (inputModule3()) {
              <kpmg-modal-item label="Prompt templates" type="with-edit" size="large" />
              <div class="kpmg-modal__textarea-container">
                <textarea
                  class="kpmg-modal__textarea"
                  [value]="promptValue()"
                  (input)="promptValue.set($any($event.target).value)"
                  placeholder="Enter prompt templates..."
                  rows="4"
                ></textarea>
              </div>
              <div class="kpmg-modal__prompt-list">
                <kpmg-modal-prompt-item title="Header" description="Supporting line text. Lorem ipsum dolor sit amet, consectetur." />
                <kpmg-modal-prompt-item title="Header" description="Supporting line text. Lorem ipsum dolor sit amet, consectetur." />
              </div>
              <div class="kpmg-modal__divider"></div>
            }

            @if (cardModule1()) {
              <kpmg-modal-item label="Model" type="with-info" size="large" />
              <div class="kpmg-modal__card-grid">
                @for (model of models; track $index) {
                  <kpmg-modal-card [title]="model.title" [description]="model.desc" [selected]="selectedModel() === $index" (cardClick)="selectedModel.set($index)" />
                }
              </div>
              <div class="kpmg-modal__divider"></div>
            }

            @if (cardModule2()) {
              <kpmg-modal-item label="Voice" type="with-info" size="large" />
              <div class="kpmg-modal__card-grid">
                @for (voice of voices; track $index) {
                  <kpmg-modal-card
                    [title]="voice.title"
                    [description]="voice.desc"
                    [thumbnail]="voice.title.slice(0, 2).toUpperCase()"
                    [selected]="selectedVoice() === $index"
                    (cardClick)="selectedVoice.set($index)"
                  />
                }
              </div>
              <div class="kpmg-modal__divider"></div>
            }

            <ng-content />
          </div>

          @if (showFooter()) {
            <div class="kpmg-modal__footer">
              <button type="button" class="kpmg-modal__btn kpmg-modal__btn--back" (click)="back.emit($event)">{{ backLabel() }}</button>
              <button type="button" class="kpmg-modal__btn kpmg-modal__btn--next" (click)="next.emit($event)">{{ nextLabel() }}</button>
            </div>
          }
        </div>
      </div>
    </ng-template>
  `,
})
export class ModalComponent {
  readonly isOpen = input(true, { transform: booleanAttribute });
  /** Render in document flow without the fixed overlay (Storybook / embedded). */
  readonly inline = input(false, { transform: booleanAttribute });
  readonly title = input('Create an assistant');
  readonly withProgress = input(false, { transform: booleanAttribute });
  readonly progress = input(80);
  readonly agentModule = input(false, { transform: booleanAttribute });
  readonly inputModule1 = input(false, { transform: booleanAttribute });
  readonly inputModule2 = input(false, { transform: booleanAttribute });
  readonly fileUploaderModule = input(false, { transform: booleanAttribute });
  readonly inputModule3 = input(false, { transform: booleanAttribute });
  readonly cardModule1 = input(false, { transform: booleanAttribute });
  readonly cardModule2 = input(false, { transform: booleanAttribute });
  readonly backLabel = input('Back');
  readonly nextLabel = input('Next');
  readonly showFooter = input(true, { transform: booleanAttribute });
  readonly nameValue = model('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
  readonly purposeValue = model('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor');
  readonly promptValue = model('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
  readonly className = input('');

  /** Dismiss button, Escape key or overlay click (React: `onClose`). */
  readonly modalClose = output<void>();
  readonly back = output<Event>();
  readonly next = output<Event>();

  protected readonly models = DEFAULT_MODELS;
  protected readonly voices = DEFAULT_VOICES;
  protected readonly selectedModel = signal(0);
  protected readonly selectedVoice = signal(0);
  protected readonly files = signal<string[]>([]);
  protected readonly isDragOver = signal(false);

  protected readonly clamped = computed(() => Math.min(Math.max(this.progress(), 0), 100));
  protected readonly clampedRounded = computed(() => Math.round(this.clamped()));

  protected readonly classes = computed(() => `kpmg-modal ${this.inline() ? 'kpmg-modal--inline' : ''} ${this.className()}`);

  protected onWindowKeydown(event: KeyboardEvent): void {
    if (!this.isOpen() || this.inline()) return;
    if (event.key === 'Escape') this.modalClose.emit();
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    const list = event.dataTransfer?.files;
    if (list && list.length > 0) this.files.update((prev) => [...prev, ...Array.from(list).map((f) => f.name)]);
  }

  protected onFileInput(event: Event): void {
    const list = (event.target as HTMLInputElement).files;
    if (list && list.length > 0) this.files.update((prev) => [...prev, ...Array.from(list).map((f) => f.name)]);
  }

  protected removeFile(index: number, event: Event): void {
    event.stopPropagation();
    this.files.update((prev) => prev.filter((_, i) => i !== index));
  }
}
