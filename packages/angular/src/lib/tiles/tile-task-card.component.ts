import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { TileCheckboxIconComponent } from './tile-icons.component';
import { TileProgressComponent } from './tile-progress.component';

/**
 * WorkBench TileTaskCard — mirrors the `TileTaskCard` export of packages/ui/src/components/Tiles/Tiles.jsx.
 *
 * Deviation: `completed` is a two-way `model()` (React: `completed` initial value
 * + `onToggle(next)`); listen to `completedChange` instead of `onToggle`.
 */
@Component({
  selector: 'kpmg-tile-task-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TileCheckboxIconComponent, TileProgressComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <div class="kpmg-tile-task-card__header">
        <h4 class="kpmg-tile-task-card__title">{{ title() }}</h4>
        <button
          type="button"
          class="kpmg-tile-task-card__checkbox"
          (click)="toggle()"
          [attr.aria-label]="'Mark ' + title() + ' as ' + (completed() ? 'incomplete' : 'complete')"
        >
          <kpmg-tile-checkbox-icon [size]="24" [color]="completed() ? 'var(--color-primary-action, #1e49e2)' : '#454554'" />
        </button>
      </div>
      <div class="kpmg-tile-task-card__body">
        @for (line of lines(); track $index) {
          <div>{{ line }}</div>
        }
      </div>
      <div class="kpmg-tile-task-card__progress">
        <kpmg-tile-progress variant="linear" [progress]="completed() ? 100 : progress()" [height]="4" />
      </div>
    </div>
  `,
})
export class TileTaskCardComponent {
  readonly title = input('Header');
  readonly supportingText = input('Supporting line text lorem ipsum\nSupporting line text lorem ipsum');
  readonly progress = input(30);
  /** Checked state (two-way). */
  readonly completed = model(true);
  readonly className = input('');

  protected readonly lines = computed(() => this.supportingText().split('\n'));
  protected readonly classes = computed(() => ['kpmg-tile-task-card', this.className()].filter(Boolean).join(' '));

  protected toggle(): void {
    this.completed.set(!this.completed());
  }
}
