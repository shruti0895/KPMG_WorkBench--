import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DataTableTooltipComponent, DataTableTooltipProps } from './data-table-tooltip.component';

export type DataTableCellType = 'Text' | 'Chip' | 'text' | 'chip';
export type DataTableCellState =
  | 'Enabled'
  | 'Hovered'
  | 'Pressed'
  | 'Loading'
  | 'Error'
  | 'Missing'
  | 'Error pressed'
  | 'enabled'
  | 'hovered'
  | 'pressed'
  | 'loading'
  | 'error'
  | 'missing'
  | 'error pressed'
  | 'errorpressed';
export type DataTableDensity = 'default' | 'dense';

/**
 * DataTableCell — mirrors packages/ui/src/components/DataTable/DataTableCell.jsx.
 *
 * Deviations: React `children` is projected with `<ng-content />` (falls back to the
 * cell/chip text); `customTooltip` is a TemplateRef; `tooltipProps` maps onto
 * DataTableTooltip inputs (`customStyle` instead of `style`); `style` is `customStyle`.
 * React sets `tabIndex=0` only when `onClick` is passed; Angular cannot detect an
 * output listener, so set `clickable` to get the same behaviour.
 */
@Component({
  selector: 'kpmg-data-table-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, DataTableTooltipComponent],
  host: { style: 'display: contents' },
  template: `
    <div
      [class]="classes()"
      [style]="customStyle()"
      (click)="cellClick.emit($event)"
      (mouseenter)="cellMouseEnter.emit($event)"
      (mouseleave)="cellMouseLeave.emit($event)"
      role="gridcell"
      [attr.tabindex]="clickable() ? 0 : null"
    >
      @if (isLoading()) {
        <div class="dt-cell-animator" aria-label="Loading content">
          <div class="dt-cell-shimmer-gradient"></div>
        </div>
      } @else if (isChip()) {
        <div [class]="chipClass()">
          <span class="dt-cell-chip-text"><ng-container [ngTemplateOutlet]="body" /></span>
        </div>
      } @else if (isError() || isErrorPressed()) {
        <p class="dt-cell-text dt-cell-text--error" [attr.title]="errorText()">{{ errorText() }}</p>
      } @else if (isMissing()) {
        <p class="dt-cell-text dt-cell-text--missing" [attr.title]="missingText()">{{ missingText() }}</p>
      } @else {
        <p class="dt-cell-text" [attr.title]="cellText()"><ng-container [ngTemplateOutlet]="body" /></p>
      }

      @if (withTooltip()) {
        <div class="dt-cell-tooltip-anchor">
          @if (customTooltip(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            <kpmg-data-table-tooltip
              [title]="tooltipProps().title === undefined ? 'Title' : tooltipProps().title!"
              [supportingText]="tooltipProps().supportingText === undefined ? defaultSupportingText : tooltipProps().supportingText!"
              [secondaryText]="tooltipProps().secondaryText === undefined ? 'Secondary text' : tooltipProps().secondaryText!"
              [cardTitle]="tooltipProps().cardTitle ?? 'Header'"
              [cardImage]="tooltipProps().cardImage ?? null"
              [customContent]="tooltipProps().customContent ?? null"
              [className]="tooltipProps().className ?? ''"
              [customStyle]="tooltipProps().customStyle ?? null"
              (moreClick)="tooltipProps().onMoreClick?.($event)"
            />
          }
        </div>
      }
    </div>

    <ng-template #body><ng-content>{{ fallbackText() }}</ng-content></ng-template>
  `,
})
export class DataTableCellComponent {
  readonly type = input<DataTableCellType>('Text');
  readonly state = input<DataTableCellState>('Enabled');
  readonly cellText = input(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  );
  readonly chipLabel = input('Label');
  readonly errorText = input('Error!');
  readonly missingText = input('Missing data!');
  readonly withTooltip = input(false, { transform: booleanAttribute });
  readonly tooltipProps = input<DataTableTooltipProps>({});
  /** Replaces the default tooltip (React: `customTooltip` node). */
  readonly customTooltip = input<TemplateRef<unknown> | null>(null);
  readonly density = input<DataTableDensity>('default');
  /** Makes the cell focusable (React: set when `onClick` is provided). */
  readonly clickable = input(false, { transform: booleanAttribute });
  readonly className = input('');
  /** Inline styles (React: `style`). */
  readonly customStyle = input<Record<string, string | number> | null>(null);

  readonly cellClick = output<MouseEvent>();
  readonly cellMouseEnter = output<MouseEvent>();
  readonly cellMouseLeave = output<MouseEvent>();

  protected readonly defaultSupportingText =
    'Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  private readonly normalizedType = computed(() => (this.type() || 'Text').toLowerCase());
  private readonly normalizedState = computed(() => (this.state() || 'Enabled').toLowerCase());

  protected readonly isChip = computed(() => this.normalizedType() === 'chip');
  protected readonly isLoading = computed(() => this.normalizedState() === 'loading');
  protected readonly isError = computed(() => this.normalizedState() === 'error');
  protected readonly isMissing = computed(() => this.normalizedState() === 'missing');
  protected readonly isErrorPressed = computed(() => ['error pressed', 'errorpressed'].includes(this.normalizedState()));

  protected readonly classes = computed(() => {
    const s = this.normalizedState();
    let stateModifier = 'dt-cell--enabled';
    if (s === 'hovered') stateModifier = 'dt-cell--hovered';
    else if (s === 'pressed') stateModifier = 'dt-cell--pressed';
    else if (s === 'loading') stateModifier = 'dt-cell--loading';
    else if (s === 'error') stateModifier = 'dt-cell--error';
    else if (s === 'missing') stateModifier = 'dt-cell--missing';
    else if (this.isErrorPressed()) stateModifier = 'dt-cell--error-pressed';
    const densityModifier = this.density() === 'dense' ? 'dt-cell--dense' : 'dt-cell--default';
    const typeModifier = this.isChip() ? 'dt-cell--chip' : 'dt-cell--text';
    return `dt-cell ${typeModifier} ${stateModifier} ${densityModifier} ${this.className()}`;
  });

  protected readonly chipClass = computed(() => {
    let cls = 'dt-cell-chip-badge';
    if (this.isError() || this.isErrorPressed()) cls += ' dt-cell-chip-badge--error';
    else if (this.isMissing()) cls += ' dt-cell-chip-badge--missing';
    return cls;
  });

  /** Text shown when nothing is projected. */
  protected readonly fallbackText = computed(() => {
    if (!this.isChip()) return this.cellText();
    if (this.isError() || this.isErrorPressed()) return this.errorText() || 'Error!';
    if (this.isMissing()) return this.missingText() || 'Missing data!';
    return this.chipLabel() || 'Label';
  });
}
