import { ChangeDetectionStrategy, Component, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DataTableCaretIconComponent, DataTableMoreIconComponent } from './data-table-icons.component';

/**
 * DataTableTooltip — mirrors packages/ui/src/components/DataTable/DataTableTooltip.jsx.
 *
 * Deviations: `customContent` is a TemplateRef (React: a node); React `children`
 * are projected with `<ng-content />` (not shown when `customContent` is set);
 * the React `style` object prop is `customStyle`; `onMoreClick` is the `moreClick` output.
 */
@Component({
  selector: 'kpmg-data-table-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, DataTableCaretIconComponent, DataTableMoreIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'dt-tooltip-container ' + className()" [style]="customStyle()">
      <div class="dt-tooltip-caret-wrapper">
        <kpmg-data-table-caret-icon [width]="24" [height]="12" color="#ffffff" />
      </div>
      <div class="dt-tooltip-card">
        @if (customContent(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          @if (title()) {
            <div class="dt-tooltip-title-section">
              <h4 class="dt-tooltip-title">{{ title() }}</h4>
            </div>
          }
          @if (supportingText()) {
            <div class="dt-tooltip-text-section">
              <p class="dt-tooltip-supporting-text">{{ supportingText() }}</p>
            </div>
          }
          <div class="dt-tooltip-divider"></div>
          @if (secondaryText()) {
            <div class="dt-tooltip-text-section">
              <p class="dt-tooltip-secondary-text">{{ secondaryText() }}</p>
            </div>
          }
          <div class="dt-tooltip-mini-card">
            <div class="dt-tooltip-mini-card-thumb">
              @if (cardImage()) {
                <img [src]="cardImage()" alt="" class="dt-tooltip-thumb-img" />
              } @else {
                <div class="dt-tooltip-thumb-gradient"></div>
              }
            </div>
            <div class="dt-tooltip-mini-card-body">
              <span class="dt-tooltip-mini-card-title">{{ cardTitle() }}</span>
            </div>
            <button type="button" class="dt-tooltip-mini-card-more-btn" (click)="moreClick.emit($event)" aria-label="More options">
              <kpmg-data-table-more-icon [size]="16" color="#454554" />
            </button>
          </div>
          <ng-content />
        }
      </div>
    </div>
  `,
})
export class DataTableTooltipComponent {
  readonly title = input<string | null>('Title');
  readonly supportingText = input<string | null>(
    'Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  );
  readonly secondaryText = input<string | null>('Secondary text');
  readonly cardTitle = input('Header');
  readonly cardImage = input<string | null>(null);
  /** Replaces the default body (React: `customContent` node). */
  readonly customContent = input<TemplateRef<unknown> | null>(null);
  readonly className = input('');
  /** Inline styles for the container (React: `style`). */
  readonly customStyle = input<Record<string, string | number> | null>(null);
  readonly moreClick = output<MouseEvent>();
}

/** Props accepted by a cell's tooltip (React `tooltipProps`). */
export interface DataTableTooltipProps {
  title?: string | null;
  supportingText?: string | null;
  secondaryText?: string | null;
  cardTitle?: string;
  cardImage?: string | null;
  customContent?: TemplateRef<unknown> | null;
  className?: string;
  customStyle?: Record<string, string | number> | null;
  onMoreClick?: (event: MouseEvent) => void;
}
