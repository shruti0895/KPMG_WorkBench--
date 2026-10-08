import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, output } from '@angular/core';
import { CardToggleEvent } from './card-events';
import { HorizontalCardCheckboxComponent } from './horizontal-card-checkbox.component';
import { TaskCardUploadIconComponent } from './cards-icons.component';

export type TaskCardType = 'Checked' | 'Unchecked' | 'Loading';
export type TaskCardStyle = 'Outline' | 'Outlined' | 'Elevated' | 'Filled';
export type TaskCardState = 'enabled' | 'hovered' | 'pressed';

/**
 * WorkBench TaskCard (alias `TaskCards`) — mirrors packages/ui/src/components/Cards/Cards.jsx
 * (27 Figma variants: Checked/Unchecked/Loading × Base/With Action/With Uploader × enabled/hovered/pressed).
 *
 * Deviations: `onClick` presence is not detectable, so set `clickable` and listen to `cardClick`;
 * `onCheckChange(e, next)` is the `checkChange` output (`{ event, value }`);
 * `onActionClick`/`onFileUpload` are the `actionClick`/`fileUpload` outputs. `isChecked` stays a plain
 * input (controlled when set, like React) — `defaultChecked` seeds the uncontrolled state.
 */
@Component({
  selector: 'kpmg-task-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HorizontalCardCheckboxComponent, TaskCardUploadIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" (click)="cardClick.emit($event)">
      <div class="task-card__row">
        <div class="task-card__content">
          <div class="task-card__header-line">
            <h4 [class]="'task-card__title ' + (checkedNow() && !isLoading() ? 'task-card__title--checked' : '')">{{ title() }}</h4>
          </div>
          @if (description()) {
            <p class="task-card__description">{{ description() }}</p>
          }

          @if (withAction() && !withFileUploader()) {
            <div class="task-card__action-row">
              <button
                type="button"
                [class]="'task-card__btn ' + (actionVariant() === 'primary' ? 'task-card__btn--primary' : '')"
                (click)="onAction($event)"
              >
                {{ actionText() }}
              </button>
            </div>
          }

          @if (withFileUploader()) {
            <div class="task-card__uploader-wrap">
              <div class="task-card__uploader" (click)="onUpload($event)">
                <kpmg-task-card-upload-icon [size]="20" className="task-card__uploader-icon" />
                <span class="task-card__uploader-text">{{ uploaderText() }}</span>
                @if (uploaderSubtext()) {
                  <span class="task-card__uploader-subtext">{{ uploaderSubtext() }}</span>
                }
                @if (uploadedFiles() && uploadedFiles().length > 0) {
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px">
                    @for (f of uploadedFiles(); track $index) {
                      <span class="task-card__uploaded-file">&#128196; {{ fileName(f) }}</span>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <div class="task-card__control">
          @if (isLoading()) {
            <div class="task-card__spinner" role="status" aria-label="Loading task"></div>
          } @else {
            <kpmg-horizontal-card-checkbox [checked]="checkedNow()" [disabled]="disabled()" checkVariant="primary" (checkChange)="toggle($event)" />
          }
        </div>
      </div>
    </div>
  `,
})
export class TaskCardComponent {
  readonly type = input<TaskCardType>('Unchecked');
  readonly styleVariant = input<TaskCardStyle>('Outline');
  readonly state = input<TaskCardState>('enabled');

  readonly title = input('Task title');
  readonly description = input('Supporting line text lorem ipsum');

  /** Controlled checked state; leave `undefined` for uncontrolled. */
  readonly isChecked = input<boolean | undefined>(undefined);
  readonly defaultChecked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly withAction = input(false, { transform: booleanAttribute });
  readonly actionText = input('Action');
  readonly actionVariant = input<'primary' | 'secondary'>('secondary');

  readonly withFileUploader = input(false, { transform: booleanAttribute });
  readonly uploaderText = input('Drop files here or click to browse');
  readonly uploaderSubtext = input('PDF, DOCX, XLSX up to 25MB');
  readonly uploadedFiles = input<(string | { name: string })[]>([]);

  /** Adds `task-card--clickable` (React: inferred from `onClick`). */
  readonly clickable = input(false, { transform: booleanAttribute });
  readonly className = input('');

  readonly cardClick = output<MouseEvent>();
  /** React: `onCheckChange(e, next)`. */
  readonly checkChange = output<CardToggleEvent>();
  readonly actionClick = output<MouseEvent>();
  readonly fileUpload = output<MouseEvent>();

  private readonly internalChecked = linkedSignal(() => (this.type().toLowerCase() === 'checked' ? true : this.defaultChecked()));

  protected readonly isLoading = computed(() => this.type().toLowerCase() === 'loading');
  protected readonly checkedNow = computed(() => {
    const controlled = this.isChecked();
    if (controlled !== undefined) return controlled;
    return this.type().toLowerCase() === 'checked' ? true : this.internalChecked();
  });

  protected readonly classes = computed(() => {
    const style = this.styleVariant().toLowerCase();
    const configClass = this.withFileUploader()
      ? 'task-card--config-uploader'
      : this.withAction()
        ? 'task-card--config-action'
        : 'task-card--config-base';
    return [
      'task-card',
      `task-card--style-${style === 'outlined' ? 'outline' : style}`,
      configClass,
      `task-card--state-${this.state().toLowerCase()}`,
      this.clickable() ? 'task-card--clickable' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected fileName(f: string | { name: string }): string {
    return typeof f === 'string' ? f : f.name;
  }

  protected toggle(change: CardToggleEvent): void {
    change.event.stopPropagation();
    if (this.isLoading() || this.disabled()) return;
    if (this.isChecked() === undefined) this.internalChecked.set(change.value);
    this.checkChange.emit(change);
  }

  protected onAction(e: MouseEvent): void {
    e.stopPropagation();
    this.actionClick.emit(e);
  }

  protected onUpload(e: MouseEvent): void {
    e.stopPropagation();
    this.fileUpload.emit(e);
  }
}

/** Alias matching the React `TaskCards` export. */
export { TaskCardComponent as TaskCardsComponent };
