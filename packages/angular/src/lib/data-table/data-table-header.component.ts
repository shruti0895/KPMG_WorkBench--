import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import {
  DataTableCheckmarkIconComponent,
  DataTableRobotIconComponent,
  DataTableSortDirection,
  DataTableSortIconComponent,
  DataTableStarIconComponent,
} from './data-table-icons.component';

export type DataTableHeaderType = 'Checkmark' | 'Star' | 'Robot' | 'Sort' | 'None' | 'checkmark' | 'star' | 'robot' | 'sort' | 'none';
export type DataTableHeaderState = 'Enabled' | 'Pressed' | 'enabled' | 'pressed';

/**
 * DataTableHeader — mirrors packages/ui/src/components/DataTable/DataTableHeader.jsx.
 *
 * Deviations: React `children` (overrides title) is projected via `<ng-content />`
 * (falls back to `title` when empty); `onSort`/`onActionClick`/`onClick` become the
 * `sort`/`actionClick`/`headerClick` outputs. React only calls `onSort` for sort
 * headers when a handler exists, otherwise `onActionClick`; Angular outputs cannot
 * be probed, so set `hasSortHandler` (the DataTable does this for sortable columns).
 */
@Component({
  selector: 'kpmg-data-table-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DataTableCheckmarkIconComponent,
    DataTableStarIconComponent,
    DataTableRobotIconComponent,
    DataTableSortIconComponent,
  ],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" [style]="customStyle()" (click)="headerClick.emit($event)" role="columnheader">
      <div class="dt-header-content">
        <span class="dt-header-text" [attr.title]="title()"><ng-content>{{ title() }}</ng-content></span>
        @if (hasActionButton()) {
          <button
            type="button"
            [class]="buttonClasses()"
            (click)="onButtonClick($event)"
            [attr.aria-pressed]="isPressed()"
            [attr.aria-label]="title() + ' action'"
          >
            @switch (normalizedType()) {
              @case ('checkmark') { <kpmg-data-table-checkmark-icon [size]="16" [color]="iconColor()" /> }
              @case ('star') { <kpmg-data-table-star-icon [size]="16" [color]="iconColor()" /> }
              @case ('robot') { <kpmg-data-table-robot-icon [size]="16" [color]="iconColor()" /> }
              @case ('sort') { <kpmg-data-table-sort-icon [size]="16" [direction]="sortDirection()" [color]="iconColor()" /> }
            }
          </button>
        }
      </div>
    </div>
  `,
})
export class DataTableHeaderComponent {
  readonly title = input('Header');
  readonly type = input<DataTableHeaderType>('Checkmark');
  readonly state = input<DataTableHeaderState>('Enabled');
  readonly pressed = input(false, { transform: booleanAttribute });
  readonly sortDirection = input<DataTableSortDirection>(null);
  /** Set when a sort handler is attached so Sort headers emit `sort` instead of `actionClick`. */
  readonly hasSortHandler = input(false, { transform: booleanAttribute });
  readonly className = input('');
  /** Inline styles for the header cell (React: `style`). */
  readonly customStyle = input<Record<string, string | number> | null>(null);

  readonly actionClick = output<MouseEvent>();
  readonly sort = output<MouseEvent>();
  readonly headerClick = output<MouseEvent>();

  protected readonly isPressed = computed(() => this.pressed() || this.state() === 'Pressed' || this.state() === 'pressed');
  protected readonly normalizedType = computed(() => (this.type() || 'None').toLowerCase());
  protected readonly hasActionButton = computed(() => this.normalizedType() !== 'none');
  protected readonly iconColor = computed(() => (this.isPressed() ? '#ffffff' : '#454554'));

  protected readonly classes = computed(
    () => `dt-header-cell ${this.isPressed() ? 'dt-header-cell--pressed' : 'dt-header-cell--enabled'} ${this.className()}`,
  );
  protected readonly buttonClasses = computed(
    () => `dt-header-action-btn ${this.isPressed() ? 'dt-header-action-btn--pressed' : 'dt-header-action-btn--enabled'}`,
  );

  protected onButtonClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.normalizedType() === 'sort' && this.hasSortHandler()) {
      this.sort.emit(event);
    } else {
      this.actionClick.emit(event);
    }
  }
}
