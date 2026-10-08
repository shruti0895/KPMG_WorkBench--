import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { SheetIconComponent } from './sheet-icon.component';

/** Sheet title bar with overflow action — mirrors `SheetHeader`. `onAction` → `actionClick`. */
@Component({
  selector: 'kpmg-sheet-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SheetIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <h3 class="kpmg-sheet-header__title">{{ title() }}</h3>
      <button type="button" class="kpmg-sheet-header__action" (click)="actionClick.emit($event)" [attr.aria-label]="actionAriaLabel()">
        <kpmg-sheet-icon name="more-vertical" [size]="20" />
      </button>
    </div>
  `,
})
export class SheetHeaderComponent {
  readonly title = input('Title');
  readonly actionAriaLabel = input('Options');
  readonly className = input('');

  readonly actionClick = output<Event>();

  protected readonly classes = computed(() => `kpmg-sheet-header ${this.className()}`);
}

export type SheetPillActionType = 'menu' | 'edit';

/** Collapsible section header pill — mirrors `SheetPillHeader`. `onClick` → `pillClick` (React `onAction` is unused there and not ported). */
@Component({
  selector: 'kpmg-sheet-pill-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SheetIconComponent],
  host: { style: 'display: contents' },
  template: `
    <button type="button" [class]="classes()" (click)="pillClick.emit($event)">
      <div class="kpmg-sheet-pill-header__left">
        <span class="kpmg-sheet-pill-header__star"><kpmg-sheet-icon name="star" [size]="18" /></span>
        <span class="kpmg-sheet-pill-header__title">{{ title() }}</span>
      </div>
      <div class="kpmg-sheet-pill-header__right">
        @if (actionType() === 'edit') {
          <kpmg-sheet-icon name="edit" [size]="16" />
        } @else {
          <kpmg-sheet-icon name="more-vertical" [size]="18" />
        }
      </div>
    </button>
  `,
})
export class SheetPillHeaderComponent {
  readonly title = input('Header');
  readonly actionType = input<SheetPillActionType>('menu');
  readonly className = input('');

  readonly pillClick = output<Event>();

  protected readonly classes = computed(() => `kpmg-sheet-pill-header ${this.className()}`);
}

export type SheetTaskCardType = 'determinate' | 'indeterminate';

/**
 * Task card with a small circular progress indicator — mirrors `SheetTaskCard`.
 * Deviation: the 24px circular ProgressIndicator DOM is rendered inline (identical
 * `kpmg-progress` markup) rather than importing the ProgressIndicator component.
 */
@Component({
  selector: 'kpmg-sheet-task-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <div class="kpmg-sheet-task-card__info">
        <h4 class="kpmg-sheet-task-card__title">{{ title() }}</h4>
        <p class="kpmg-sheet-task-card__desc">{{ supportingText() }}</p>
      </div>
      <div class="kpmg-sheet-task-card__progress">
        <div
          [class]="progressClasses()"
          role="progressbar"
          [attr.aria-valuenow]="isIndeterminate() ? null : clampedRounded()"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="circular progress indicator"
        >
          <div class="kpmg-progress__circular-wrapper">
            <div [class]="containerClasses()" style="width: 24px; height: 24px">
              <svg viewBox="0 0 24 24" width="24" height="24" [class]="'kpmg-progress__circular-svg ' + (isIndeterminate() ? 'kpmg-progress__circular-svg--indeterminate' : '')">
                <circle cx="12" cy="12" [attr.r]="radius" fill="none" stroke="var(--color-progress-track-inactive, #E3E3E8)" [attr.stroke-width]="strokeWidth" />
                <circle
                  cx="12"
                  cy="12"
                  [attr.r]="radius"
                  fill="none"
                  stroke="var(--color-progress-track-active, #1E49E2)"
                  [attr.stroke-width]="strokeWidth"
                  [attr.stroke-dasharray]="circumference"
                  [attr.stroke-dashoffset]="dashOffset()"
                  stroke-linecap="round"
                  [class]="'kpmg-progress__circular-arc ' + (isIndeterminate() ? 'kpmg-progress__circular-arc--indeterminate' : '')"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SheetTaskCardComponent {
  readonly title = input('Item');
  readonly supportingText = input('Supporting line text lorem ipsum');
  readonly progress = input(80);
  readonly type = input<SheetTaskCardType>('indeterminate');
  readonly className = input('');

  protected readonly strokeWidth = 2.5;
  protected readonly radius = (24 - 2.5) / 2;
  protected readonly circumference = 2 * Math.PI * this.radius;

  protected readonly isIndeterminate = computed(() => this.type() === 'indeterminate');
  private readonly clamped = computed(() => Math.min(Math.max(this.progress(), 0), 100));
  protected readonly clampedRounded = computed(() => Math.round(this.clamped()));
  protected readonly dashOffset = computed(() =>
    this.isIndeterminate() ? this.circumference * 0.3 : this.circumference - (this.clamped() / 100) * this.circumference,
  );

  protected readonly classes = computed(() => `kpmg-sheet-task-card ${this.className()}`);
  protected readonly progressClasses = computed(
    () => `kpmg-progress kpmg-progress--circular kpmg-progress--${this.isIndeterminate() ? 'indeterminate' : 'determinate'} kpmg-progress--size-small`,
  );
  protected readonly containerClasses = computed(
    () => `kpmg-progress__circular-container kpmg-progress__circular-container--small ${this.isIndeterminate() ? 'kpmg-progress__circular-container--indeterminate' : ''}`,
  );
}

/** Generic card — mirrors `SheetCard`. `children` is default `<ng-content>`. */
@Component({
  selector: 'kpmg-sheet-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      @if (title()) {
        <h4 class="kpmg-sheet-card__title">{{ title() }}</h4>
      }
      @if (desc()) {
        <p class="kpmg-sheet-card__desc">{{ desc() }}</p>
      }
      <ng-content />
    </div>
  `,
})
export class SheetCardComponent {
  readonly title = input('Header');
  readonly desc = input('Supporting line text. Lorem ipsum dolor sit amet, labore consectetur.');
  readonly className = input('');

  protected readonly classes = computed(() => `kpmg-sheet-card ${this.className()}`);
}

export interface SheetReferenceRow {
  title: string;
  page: string;
}

/** Reference | Page table — mirrors `SheetReferencesTable`. */
@Component({
  selector: 'kpmg-sheet-references-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <div class="kpmg-sheet-table-header">
        <span>Reference</span>
        <span>Page</span>
      </div>
      @for (r of rows(); track $index) {
        <div class="kpmg-sheet-table-row">
          <span>{{ r.title }}</span>
          <span>{{ r.page }}</span>
        </div>
      }
    </div>
  `,
})
export class SheetReferencesTableComponent {
  readonly rows = input<SheetReferenceRow[]>([
    { title: 'Title', page: '24' },
    { title: 'Title', page: '24' },
    { title: 'Title', page: '48' },
    { title: 'Title', page: '96' },
  ]);
  readonly className = input('');

  protected readonly classes = computed(() => `kpmg-sheet-table-card ${this.className()}`);
}

/**
 * Internal slider used by the Sheets inputs/assistant layouts. Renders the same DOM the React
 * `<Slider type="discrete" value={100} …>` call produces (that call passes the unsupported `type`
 * prop, so it renders the continuous variant with no ticks/indicator, pinned at 100).
 */
@Component({
  selector: 'kpmg-sheet-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="kpmg-slider kpmg-slider--continuous kpmg-slider--state-enabled">
      <div class="kpmg-slider__wrapper">
        <div class="kpmg-slider__track-bg">
          <div class="kpmg-slider__track-fill" [style.width.%]="percentage()"></div>
        </div>
        <div class="kpmg-slider__thumb" [style.left.%]="percentage()" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="var(--color-slider-thumb-fill, #1E49E2)" />
          </svg>
        </div>
        <input type="range" min="0" max="100" step="1" [value]="value()" [attr.aria-valuenow]="value()" aria-valuemin="0" aria-valuemax="100" aria-label="Slider" class="kpmg-slider__input" />
      </div>
    </div>
  `,
})
export class SheetSliderComponent {
  readonly value = input(100);
  protected readonly percentage = computed(() => Math.min(Math.max(this.value(), 0), 100));
}

