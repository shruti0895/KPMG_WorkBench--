import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { SheetIconComponent } from './sheet-icon.component';
import {
  SheetCardComponent,
  SheetHeaderComponent,
  SheetPillHeaderComponent,
  SheetReferencesTableComponent,
  SheetSliderComponent,
  SheetTaskCardComponent,
} from './sheet-parts.component';

export type SheetVariant = 'floating' | 'side';
export type SheetType = 'informational' | 'inputs' | 'basic' | 'project' | 'pages' | 'assistant';
export type SheetSize = 'compact' | 'small' | 'large';
export type SheetStyle = 'outlined' | 'filled';

/**
 * WorkBench Sheets — mirrors packages/ui/src/components/Sheets/Sheets.jsx.
 *
 * Deviations: the React `style` prop ('outlined' | 'filled') is the `sheetStyle` input (a
 * component input named `style` would clash with the native attribute). `onClose` is the
 * `sheetClose` output. React `children` replaces the default body via `<ng-content>`
 * fallback content (projecting anything overrides the built-in layout). The primary buttons
 * ("Longer action", "View project") have no handler in React; they emit `primaryAction`.
 * ProgressIndicator/Slider are rendered as inline DOM with identical class names.
 */
@Component({
  selector: 'kpmg-sheets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    SheetIconComponent,
    SheetCardComponent,
    SheetHeaderComponent,
    SheetPillHeaderComponent,
    SheetReferencesTableComponent,
    SheetSliderComponent,
    SheetTaskCardComponent,
  ],
  host: { style: 'display: contents' },
  template: `
    @if (isOpen()) {
      @if (isDrawer()) {
        <div class="kpmg-sheet-backdrop" (click)="sheetClose.emit()">
          <div class="kpmg-sheet-drawer-container" (click)="$event.stopPropagation()">
            <ng-container [ngTemplateOutlet]="sheet" />
          </div>
        </div>
      } @else {
        <ng-container [ngTemplateOutlet]="sheet" />
      }
    }

    <ng-template #sheet>
      <aside [class]="classes()">
        <ng-content>
          @if (isFloating()) {
            @if (type() === 'informational') {
              <kpmg-sheet-task-card title="Item" supportingText="Supporting line text lorem ipsum" [progress]="progress()" type="indeterminate" />
              <div class="kpmg-sheet-qa-block">
              <div class="kpmg-sheet-qa-item">
                <div class="kpmg-sheet-qa-question">
                  <div class="kpmg-sheet-gradient-dot"></div>
                  <div>
                    <div class="kpmg-sheet-qa-question__text">Sub-question.</div>
                    <div class="kpmg-sheet-qa-question__subtext">Lorem ipsum dolor sit amet, labore consectetur.</div>
                  </div>
                </div>
                <div class="kpmg-sheet-qa-answer">Answer. Lorem ipsum dolor sit amet, labore consectet...</div>
              </div>
              <div class="kpmg-sheet-qa-item">
                <div class="kpmg-sheet-qa-question">
                  <div class="kpmg-sheet-gradient-dot"></div>
                  <div>
                    <div class="kpmg-sheet-qa-question__text">Sub-question.</div>
                    <div class="kpmg-sheet-qa-question__subtext">Lorem ipsum dolor sit amet, labore consectetur.</div>
                  </div>
                </div>
                <div class="kpmg-sheet-qa-answer">Answer. Lorem ipsum dolor sit amet, labore consectet...</div>
              </div>
              </div>
              <kpmg-sheet-card title="Compliance status" desc="Supporting line text. Lorem ipsum dolor sit amet, labore consectetur." />
              <kpmg-sheet-card title="Score" desc="">
                <div class="kpmg-sheet-score-pill">Some code</div>
              </kpmg-sheet-card>
              @if (size() !== 'compact') {
                <kpmg-sheet-references-table />
              }
            }
            @if (type() === 'inputs') {
              <div class="kpmg-sheet-field-label">Template</div>
              <div class="kpmg-sheet-dropdown">
                <span>Header</span>
                <kpmg-sheet-icon name="chevron-down" [size]="20" color="#454554" />
              </div>
              <kpmg-sheet-card title="Header" desc="Subhead">
                <div class="kpmg-sheet-chip-grid">
                  @for (chip of chips(); track chip.id) {
                    <div class="kpmg-sheet-input-chip">
                      <kpmg-sheet-icon name="word-doc" [size]="18" />
                      <span>{{ chip.label }}</span>
                      <button type="button" class="kpmg-sheet-chip-close" (click)="removeChip(chip.id)" [attr.aria-label]="'Remove ' + chip.label">
                        <kpmg-sheet-icon name="close" [size]="12" />
                      </button>
                    </div>
                  }
                </div>
              </kpmg-sheet-card>
              <kpmg-sheet-card title="Title" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor">
                <div style="margin-top: 16px"><kpmg-sheet-slider [value]="100" /></div>
              </kpmg-sheet-card>
              <div class="kpmg-sheet-field-label">Header</div>
              <kpmg-sheet-card title="Header" desc="Supporting line text. Lorem ipsum dolor sit amet, labore consectetur." />
              <kpmg-sheet-card title="Header" desc="Supporting line text. Lorem ipsum dolor sit amet, labore consectetur." />
              <div class="kpmg-sheet-dropzone">
                <kpmg-sheet-icon name="upload" [size]="28" color="#454554" />
                <div class="kpmg-sheet-dropzone__text">
                  Drag and drop files or <span class="kpmg-sheet-dropzone__link">browse on computer</span>
                </div>
              </div>
              <div class="kpmg-sheet-action-row">
                <button type="button" class="kpmg-sheet-primary-btn" (click)="primaryAction.emit($event)">Longer action</button>
              </div>
            }
          } @else {
            @if (type() === 'basic') {
              <kpmg-sheet-header [title]="resolvedTitle()" (actionClick)="sheetClose.emit()" />
              <kpmg-sheet-pill-header title="Header" actionType="menu" />
              <div class="kpmg-sheet-avatar-cluster">
                @for (initials of avatars; track $index) {
                  <div class="kpmg-sheet-avatar-cluster__item">{{ initials }}</div>
                }
              </div>
              <kpmg-sheet-pill-header title="Header" actionType="menu" />
              <kpmg-sheet-card title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />
              <kpmg-sheet-card title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />
              <kpmg-sheet-card title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />
              <kpmg-sheet-pill-header title="Header" actionType="menu" />
              <kpmg-sheet-card title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />
              <kpmg-sheet-card title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />
            }
            @if (type() === 'project') {
              <kpmg-sheet-header title="Project" (actionClick)="sheetClose.emit()" />
              <kpmg-sheet-pill-header title="About" actionType="menu" />
              <div style="display: flex; gap: 8px; margin: 8px 0">
                <span class="kpmg-tile-tag-pill">Project tag</span>
                <span class="kpmg-tile-tag-pill">Project tag</span>
                <span class="kpmg-tile-tag-pill">Project tag</span>
              </div>
              <kpmg-sheet-card title="More project details" desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua." />
              <button type="button" class="kpmg-sheet-primary-btn" style="width: fit-content; margin: 8px 0 16px 0" (click)="primaryAction.emit($event)">View project</button>
              <kpmg-sheet-pill-header title="People" actionType="menu" />
              <kpmg-sheet-card title="Header" desc="" />
              <kpmg-sheet-card title="Header" desc="" />
              <kpmg-sheet-pill-header title="Summary" actionType="menu" />
              <kpmg-sheet-card title="Header" desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua." />
              <kpmg-sheet-pill-header title="Related projects" actionType="menu" />
              <kpmg-sheet-card title="Header" desc="Supporting line text lorem ipsum" />
              <kpmg-sheet-card title="Header" desc="Supporting line text lorem ipsum" />
            }
            @if (type() === 'pages') {
              <kpmg-sheet-header title="File" (actionClick)="sheetClose.emit()" />
              <kpmg-sheet-pill-header title="About" actionType="menu" />
              <kpmg-sheet-card title="Header" desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua." />
              <kpmg-sheet-pill-header title="Pages" actionType="menu" />
              <div class="kpmg-sheet-page-preview"><span class="kpmg-sheet-page-badge">Selected</span></div>
              <div class="kpmg-sheet-page-preview"></div>
              <div class="kpmg-sheet-page-preview"></div>
              <div class="kpmg-sheet-page-preview"></div>
            }
            @if (type() === 'assistant') {
              <kpmg-sheet-header title="Assistant" (actionClick)="sheetClose.emit()" />
              <kpmg-sheet-pill-header title="Purpose" actionType="edit" />
              <kpmg-sheet-card title="Header" desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua." />
              <kpmg-sheet-pill-header title="Knowledge base" actionType="menu" />
              <kpmg-sheet-card title="Header" desc="" />
              <kpmg-sheet-card title="Header" desc="" />
              <kpmg-sheet-pill-header title="Prompt templates" actionType="menu" />
              <kpmg-sheet-card title="Header" desc="Supporting line text lorem ipsum" />
              <kpmg-sheet-card title="Header" desc="Supporting line text lorem ipsum" />
              <kpmg-sheet-pill-header title="Model" actionType="edit" />
              <kpmg-sheet-card title="Header" desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua." />
              <kpmg-sheet-pill-header title="Voice" actionType="edit" />
              <kpmg-sheet-card title="Header" desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua." />
              <kpmg-sheet-pill-header title="Advanced settings" actionType="menu" />
              @for (i of [1, 2, 3]; track i) {
                <kpmg-sheet-card title="Title" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor">
                  <div style="margin-top: 16px"><kpmg-sheet-slider [value]="100" /></div>
                </kpmg-sheet-card>
              }
            }
          }
        </ng-content>
      </aside>
    </ng-template>
  `,
})
export class SheetsComponent {
  readonly variant = input<SheetVariant>('floating');
  readonly type = input<SheetType>('informational');
  readonly size = input<SheetSize>('large');
  /** Surface treatment (React prop `style`). */
  readonly sheetStyle = input<SheetStyle>('outlined');
  readonly title = input<string | undefined>(undefined);
  readonly isOpen = input(true, { transform: booleanAttribute });
  readonly isDrawer = input(false, { transform: booleanAttribute });
  readonly fluid = input(false, { transform: booleanAttribute });
  readonly progress = input(80);
  readonly className = input('');

  /** Header overflow action or drawer backdrop click (React: `onClose`). */
  readonly sheetClose = output<void>();
  /** Primary action buttons ("Longer action" / "View project"). */
  readonly primaryAction = output<Event>();

  protected readonly avatars = ['AZ', 'AZ', 'AZ', 'AZ', 'AZ'];
  protected readonly chips = signal(
    ['1', '2', '3', '4', '5', '6'].map((id) => ({ id, label: 'Input chip' })),
  );

  protected readonly isFloating = computed(() => this.variant() === 'floating');

  protected readonly resolvedTitle = computed(() => {
    const t = this.type();
    return (
      this.title() ||
      (t === 'project' ? 'Project' : t === 'pages' ? 'File' : t === 'assistant' ? 'Assistant' : t === 'basic' ? 'Title' : t === 'inputs' ? 'Inputs' : 'Item')
    );
  });

  protected readonly classes = computed(() => {
    const floating = this.isFloating();
    const size = this.size();
    const sizeClass = floating
      ? size === 'compact' ? 'kpmg-sheet--floating-compact' : 'kpmg-sheet--floating-large'
      : size === 'small' ? 'kpmg-sheet--side-small' : 'kpmg-sheet--side-large';
    return [
      'kpmg-sheet',
      floating ? 'kpmg-sheet--floating' : 'kpmg-sheet--side',
      sizeClass,
      `kpmg-sheet--${this.sheetStyle()}`,
      this.fluid() ? 'kpmg-sheet--fluid' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected removeChip(id: string): void {
    this.chips.update((prev) => prev.filter((c) => c.id !== id));
  }
}
