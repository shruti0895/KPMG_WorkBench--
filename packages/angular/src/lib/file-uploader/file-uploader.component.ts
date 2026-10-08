import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, input, output, signal, TemplateRef, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type FileUploaderSize = 'small' | 'medium' | 'large' | 'Small' | 'Medium' | 'Large';
export type FileUploaderState = 'outline' | 'elevated' | 'filled' | 'Outline' | 'Elevated' | 'Filled';

export interface FileUploaderDropEvent {
  event: DragEvent;
  files: File[];
}

/** Small/medium upload arrow icon (React: `FileUploaderArrowIconSvg`). */
@Component({
  selector: 'kpmg-file-uploader-arrow-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" [attr.stroke]="color()" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="12" y1="19" x2="12" y2="7" />
      <polyline points="5 12 12 5 19 12" />
      <line x1="5" y1="2" x2="19" y2="2" />
    </svg>
  `,
})
export class FileUploaderArrowIconComponent {
  readonly size = input(20);
  readonly color = input('#454554');
}

/** Large upload card illustration (React: `FileUploaderIllustrationIconSvg`). */
@Component({
  selector: 'kpmg-file-uploader-illustration-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg viewBox="0 0 64 64" [attr.width]="width()" [attr.height]="height()" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="kpmg-uploader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#AAB0F4" />
          <stop offset="50%" stop-color="#818AEE" />
          <stop offset="100%" stop-color="#5965E9" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#kpmg-uploader-grad)" />
    </svg>
  `,
})
export class FileUploaderIllustrationIconComponent {
  readonly width = input(64);
  readonly height = input(64);
}

/**
 * WorkBench FileUploader — mirrors packages/ui/src/components/FileUploader/FileUploader.jsx
 * (3 sizes x 3 states, click-to-browse and drag & drop).
 *
 * Deviations: `label` is a string (React: ReactNode) and `subtext` a string;
 * `icon` is an `<ng-template>` reference; React's `onFileSelect(files)` and
 * `onDrop(event, files)` are the `fileSelect` and `fileDrop` outputs; the input
 * id is `inputId` (so it isn't duplicated on the host element).
 */
@Component({
  selector: 'kpmg-file-uploader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, FileUploaderArrowIconComponent, FileUploaderIllustrationIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div
      [class]="containerClasses()"
      role="button"
      [attr.tabindex]="disabled() ? -1 : 0"
      [attr.aria-disabled]="disabled()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
      (click)="onBrowseClick()"
      (keydown)="onKeydown($event)"
    >
      <input
        #fileInput
        type="file"
        class="kpmg-uploader__input"
        [attr.id]="inputId()"
        [attr.name]="name()"
        [attr.accept]="accept()"
        [multiple]="multiple()"
        [disabled]="disabled()"
        aria-hidden="true"
        (click)="$event.stopPropagation()"
        (change)="onInputChange($event)"
      />

      <div class="kpmg-uploader__icon-wrapper" aria-hidden="true">
        @if (icon(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else if (normalizedSize() === 'large') {
          <kpmg-file-uploader-illustration-icon [width]="64" [height]="64" />
        } @else if (normalizedSize() === 'small') {
          <kpmg-file-uploader-arrow-icon [size]="18" color="#454554" />
        } @else {
          <kpmg-file-uploader-arrow-icon [size]="24" color="#3D405B" />
        }
      </div>

      <div class="kpmg-uploader__content">
        <span class="kpmg-uploader__prompt">
          <span class="kpmg-uploader__label-text">{{ label() }}</span>
          <span class="kpmg-uploader__link-text">{{ browseText() }}</span>
        </span>
        @if (subtext()) {
          <span class="kpmg-uploader__subtext">{{ subtext() }}</span>
        }
      </div>
    </div>
  `,
})
export class FileUploaderComponent {
  readonly size = input<FileUploaderSize>('medium');
  readonly state = input<FileUploaderState>('outline');
  readonly label = input('Drag and drop files or ');
  readonly browseText = input('browse on computer');
  readonly subtext = input<string | undefined>(undefined);
  /** Accepted file formats, e.g. '.png,.jpg,.pdf'. */
  readonly accept = input<string | undefined>(undefined);
  readonly multiple = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Custom icon template overriding the size-based default. */
  readonly icon = input<TemplateRef<unknown> | null>(null);
  readonly className = input('');
  /** Native file input id (named `inputId` so it isn't duplicated on the host element). */
  readonly inputId = input<string | undefined>(undefined);
  readonly name = input<string | undefined>(undefined);

  /** Fires with the selected or dropped files. */
  readonly fileSelect = output<File[]>();
  /** Fires on drop with the event and files (before `fileSelect`). */
  readonly fileDrop = output<FileUploaderDropEvent>();

  private readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  private readonly isDragOver = signal(false);

  protected readonly normalizedSize = computed(() => (this.size() || 'medium').toLowerCase());
  protected readonly normalizedState = computed(() => (this.state() || 'outline').toLowerCase());

  protected readonly containerClasses = computed(() =>
    [
      'kpmg-uploader',
      `kpmg-uploader--size-${this.normalizedSize()}`,
      `kpmg-uploader--state-${this.normalizedState()}`,
      this.isDragOver() ? 'kpmg-uploader--drag-over' : '',
      this.disabled() ? 'kpmg-uploader--disabled' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onBrowseClick(): void {
    if (this.disabled()) return;
    this.fileInput().nativeElement.click();
  }

  /** Deviation: React has no keyboard activation on this role="button"; Enter/Space opens the picker. */
  protected onKeydown(event: KeyboardEvent): void {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onBrowseClick();
    }
  }

  protected onInputChange(event: Event): void {
    if (this.disabled()) return;
    const input = event.target as HTMLInputElement;
    this.fileSelect.emit(Array.from(input.files ?? []));
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled()) this.isDragOver.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    if (this.disabled()) return;
    const files = Array.from(event.dataTransfer?.files ?? []);
    this.fileDrop.emit({ event, files });
    this.fileSelect.emit(files);
  }
}
