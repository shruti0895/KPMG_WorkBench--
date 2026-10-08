import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DataTableCellComponent, DataTableCellState, DataTableDensity } from './data-table-cell.component';
import { DataTableHeaderComponent, DataTableHeaderState, DataTableHeaderType } from './data-table-header.component';
import { DataTableCheckboxIconComponent, DataTableSortDirection } from './data-table-icons.component';
import { DataTableTooltipProps } from './data-table-tooltip.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataTableRow = Record<string, any>;
export type DataTableRowKey = string | number;

/** Context for `DataTableColumn.cellTemplate` (React: `renderCell(value, row, rowIndex, column)`). */
export interface DataTableCellContext {
  $implicit: unknown;
  row: DataTableRow;
  rowIndex: number;
  column: DataTableColumn;
}

/** Context for `DataTableColumn.headerTemplate` (React: `renderHeader(column)`). */
export interface DataTableHeaderContext {
  $implicit: DataTableColumn;
}

export interface DataTableColumn {
  id?: string;
  key: string;
  label?: string;
  type?: 'text' | 'chip' | 'Text' | 'Chip';
  headerType?: DataTableHeaderType;
  headerState?: DataTableHeaderState;
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  flex?: string;
  style?: Record<string, string | number>;
  cellState?: DataTableCellState | ((row: DataTableRow, rowIndex: number) => DataTableCellState);
  chipLabel?: string;
  errorText?: string;
  missingText?: string;
  tooltipProps?: DataTableTooltipProps;
  onActionClick?: (event: MouseEvent) => void;
  /** Custom header (React: `renderHeader`). */
  headerTemplate?: TemplateRef<DataTableHeaderContext>;
  /** Custom cell content (React: `renderCell`). */
  cellTemplate?: TemplateRef<DataTableCellContext>;
}

export interface DataTablePagination {
  page: number;
  pageSize: number;
  total?: number;
  serverSide?: boolean;
  onPageChange?: (page: number) => void;
}

export interface DataTableSelectionChange {
  keys: DataTableRowKey[];
  rows: DataTableRow[];
}
export interface DataTableSortChange {
  column: string | null;
  direction: DataTableSortDirection;
}
export interface DataTableCellClickEvent {
  value: unknown;
  row: DataTableRow;
  column: DataTableColumn;
  rowIndex: number;
  event: MouseEvent;
}
export interface DataTableActiveCellChange {
  key: string | null;
  value: unknown;
  row: DataTableRow;
  column: DataTableColumn;
  rowIndex: number;
}

const PLACEHOLDER_COLUMNS: DataTableColumn[] = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  id: `col${n}`,
  key: `col${n}`,
  label: `Header ${n}`,
  width: '168px',
}));

/**
 * WorkBench DataTable — mirrors packages/ui/src/components/DataTable/DataTable.jsx.
 *
 * Deviations:
 * - Controlled/uncontrolled state is preserved: bind `selectedRowKeys`, `sortColumn`/`sortDirection`
 *   or `activeCellKey` to control them (leave `undefined` for internal state).
 * - Callbacks become outputs: `selectionChange`, `sortChange`, `cellClick`, `activeCellChange`, `pageChange`
 *   (`pagination.onPageChange` is also still called). `onRowClick` is not ported (React never invokes it).
 * - `renderHeader`/`renderCell` become `headerTemplate`/`cellTemplate` TemplateRefs on the column.
 * - `style` is `customStyle`. `hoverable` is accepted but, as in React, has no visual effect.
 */
@Component({
  selector: 'kpmg-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, DataTableHeaderComponent, DataTableCellComponent, DataTableCheckboxIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'dt-root-wrapper ' + className()" [style]="rootStyle()">
      <div [class]="'dt-scroll-container ' + (scrollable() ? 'dt-scroll-container--scrollable' : '')">
        <div class="dt-table" role="table">
          <div class="dt-columns-wrapper" role="rowgroup">
            @if (selectable()) {
              <div class="dt-column dt-column--selection" style="width: 48px; flex-shrink: 0">
                <div class="dt-header-cell dt-header-cell--selection" (click)="handleSelectAll()" role="columnheader" aria-label="Select all rows">
                  <kpmg-data-table-checkbox-icon [checked]="isAllSelected()" [size]="20" color="#454554" />
                </div>
                <div class="dt-column-items">
                  @if (loading()) {
                    @for (n of loadingRows(); track n) {
                      <div class="dt-cell dt-cell--selection">
                        <kpmg-data-table-checkbox-icon [checked]="false" [size]="20" color="#b8b8c4" />
                      </div>
                    }
                  } @else {
                    @for (row of processedData(); track rowKeyAt(row, $index)) {
                      @let rowId = rowKeyAt(row, $index);
                      @let isSelected = selectedKeys().includes(rowId);
                      <div [class]="'dt-cell dt-cell--selection ' + (isSelected ? 'dt-cell--selected' : '')" (click)="handleSelectRow(rowId, $event)">
                        <kpmg-data-table-checkbox-icon [checked]="isSelected" [size]="20" [color]="isSelected ? '#1e49e2' : '#454554'" />
                      </div>
                    }
                  }
                </div>
              </div>
            }

            @for (col of effectiveColumns(); track $index; let colIdx = $index) {
              @let id = colId(col, colIdx);
              @let isColSorted = sortColumnValue() === id;
              <div class="dt-column" [style]="columnStyle(col)">
                @if (col.headerTemplate; as tpl) {
                  <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{ $implicit: col }" />
                } @else {
                  <kpmg-data-table-header
                    [title]="col.label || 'Header ' + (colIdx + 1)"
                    [type]="col.headerType || (col.sortable ? 'sort' : 'checkmark')"
                    [state]="col.headerState || (isColSorted ? 'Pressed' : 'Enabled')"
                    [pressed]="col.headerState === 'Pressed' || isColSorted"
                    [sortDirection]="isColSorted ? sortDirectionValue() : null"
                    [hasSortHandler]="!!col.sortable"
                    (sort)="handleSort(col)"
                    (actionClick)="col.onActionClick?.($event)"
                  />
                }

                <div class="dt-column-items">
                  @if (loading()) {
                    @for (n of loadingRows(); track n) {
                      <kpmg-data-table-cell state="loading" [density]="density()" />
                    }
                  } @else if (processedData().length === 0) {
                    @if (colIdx === 0) {
                      <div class="dt-empty-placeholder">{{ emptyMessage() }}</div>
                    }
                  } @else {
                    @for (row of processedData(); track rowKeyAt(row, $index); let rIdx = $index) {
                      @let rowId = rowKeyAt(row, rIdx);
                      @let cellKey = rowId + '_' + id;
                      @let rawValue = row[col.key];
                      @let isCellActive = activeCellKeyValue() === cellKey;
                      @let dynamicTooltip = tooltipGetter()?.(row, col, rIdx);
                      @if (col.cellTemplate; as cellTpl) {
                        <kpmg-data-table-cell
                          [type]="col.type || 'text'"
                          [state]="isCellActive ? 'Pressed' : cellStateFor(row, col, rIdx)"
                          [cellText]="rawValue !== undefined && rawValue !== null ? '' + rawValue : ''"
                          [chipLabel]="rawValue !== undefined && rawValue !== null ? '' + rawValue : col.chipLabel || 'Label'"
                          [errorText]="col.errorText || 'Error!'"
                          [missingText]="col.missingText || 'Missing data!'"
                          [withTooltip]="isCellActive || !!dynamicTooltip"
                          [tooltipProps]="dynamicTooltip || col.tooltipProps || {}"
                          [density]="density()"
                          [clickable]="true"
                          (cellClick)="handleCellClick(rawValue, row, col, rIdx, colIdx, $event)"
                        >
                          <ng-container [ngTemplateOutlet]="cellTpl" [ngTemplateOutletContext]="{ $implicit: rawValue, row: row, rowIndex: rIdx, column: col }" />
                        </kpmg-data-table-cell>
                      } @else {
                        <kpmg-data-table-cell
                          [type]="col.type || 'text'"
                          [state]="isCellActive ? 'Pressed' : cellStateFor(row, col, rIdx)"
                          [cellText]="rawValue !== undefined && rawValue !== null ? '' + rawValue : ''"
                          [chipLabel]="rawValue !== undefined && rawValue !== null ? '' + rawValue : col.chipLabel || 'Label'"
                          [errorText]="col.errorText || 'Error!'"
                          [missingText]="col.missingText || 'Missing data!'"
                          [withTooltip]="isCellActive || !!dynamicTooltip"
                          [tooltipProps]="dynamicTooltip || col.tooltipProps || {}"
                          [density]="density()"
                          [clickable]="true"
                          (cellClick)="handleCellClick(rawValue, row, col, rIdx, colIdx, $event)"
                        />
                      }
                    }
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      @if (pagination(); as pg) {
        <div class="dt-pagination-container">
          <div class="dt-pagination-info">
            Showing {{ paginationFrom() }} to {{ paginationTo() }} of {{ paginationTotal() }} entries
          </div>
          <div class="dt-pagination-controls">
            <button type="button" class="dt-pagination-btn" [disabled]="pg.page <= 1" (click)="goToPage(pg.page - 1)">Previous</button>
            <span class="dt-pagination-page-indicator">Page {{ pg.page }} of {{ pageCount() || 1 }}</span>
            <button type="button" class="dt-pagination-btn" [disabled]="pg.page >= pageCount()" (click)="goToPage(pg.page + 1)">Next</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class DataTableComponent {
  readonly columns = input<DataTableColumn[]>([]);
  readonly data = input<DataTableRow[]>([]);
  readonly rowKey = input<string | ((row: DataTableRow, index: number) => DataTableRowKey)>('id');
  readonly selectable = input(false, { transform: booleanAttribute });
  /** Controlled selection; leave `undefined` for internal state. */
  readonly selectedRowKeys = input<DataTableRowKey[] | undefined>(undefined);
  /** Controlled sort column; leave `undefined` for internal (client-side) sort. */
  readonly sortColumn = input<string | null | undefined>(undefined);
  readonly sortDirection = input<DataTableSortDirection | undefined>(undefined);
  readonly loading = input(false, { transform: booleanAttribute });
  readonly loadingRowCount = input(6);
  readonly density = input<DataTableDensity>('default');
  readonly hoverable = input(true, { transform: booleanAttribute });
  readonly cellStateGetter = input<((row: DataTableRow, col: DataTableColumn, rowIndex: number) => DataTableCellState | null | undefined) | undefined>(undefined);
  readonly tooltipGetter = input<((row: DataTableRow, col: DataTableColumn, rowIndex: number) => DataTableTooltipProps | null | undefined) | undefined>(undefined);
  /** Controlled active cell key (`<rowKey>_<columnId>`); leave `undefined` for internal state. */
  readonly activeCellKey = input<string | null | undefined>(undefined);
  readonly pagination = input<DataTablePagination | undefined>(undefined);
  readonly emptyMessage = input('No records available.');
  readonly width = input('100%');
  readonly height = input('100%');
  readonly scrollable = input(false, { transform: booleanAttribute });
  readonly className = input('');
  /** Inline styles for the root (React: `style`). */
  readonly customStyle = input<Record<string, string | number>>({});
  readonly tableWidth = input<string | undefined>(undefined);

  readonly selectionChange = output<DataTableSelectionChange>();
  readonly sortChange = output<DataTableSortChange>();
  readonly cellClick = output<DataTableCellClickEvent>();
  readonly activeCellChange = output<DataTableActiveCellChange>();
  readonly pageChange = output<number>();

  private readonly internalSelectedKeys = linkedSignal<DataTableRowKey[] | undefined, DataTableRowKey[]>({
    source: this.selectedRowKeys,
    computation: (src, prev) => src ?? prev?.value ?? [],
  });
  private readonly internalSortColumn = linkedSignal<string | null | undefined, string | null>({
    source: this.sortColumn,
    computation: (src, prev) => src ?? prev?.value ?? null,
  });
  private readonly internalSortDirection = linkedSignal<DataTableSortDirection | undefined, DataTableSortDirection>({
    source: this.sortDirection,
    computation: (src, prev) => src ?? prev?.value ?? null,
  });
  private readonly internalActiveCellKey = linkedSignal<string | null | undefined, string | null>({
    source: this.activeCellKey,
    computation: (src, prev) => src ?? prev?.value ?? null,
  });

  private readonly isSelectionControlled = computed(() => this.selectedRowKeys() !== undefined);
  private readonly isSortControlled = computed(() => this.sortColumn() !== undefined);
  private readonly isActiveCellControlled = computed(() => this.activeCellKey() !== undefined);

  protected readonly selectedKeys = computed(() => (this.isSelectionControlled() ? this.selectedRowKeys()! : this.internalSelectedKeys()));
  protected readonly sortColumnValue = computed(() => (this.isSortControlled() ? (this.sortColumn() ?? null) : this.internalSortColumn()));
  protected readonly sortDirectionValue = computed(() => (this.isSortControlled() ? (this.sortDirection() ?? null) : this.internalSortDirection()));
  protected readonly activeCellKeyValue = computed(() => (this.isActiveCellControlled() ? (this.activeCellKey() ?? null) : this.internalActiveCellKey()));

  protected readonly loadingRows = computed(() => Array.from({ length: this.loadingRowCount() }, (_, i) => i));

  protected readonly effectiveColumns = computed(() => (this.columns().length > 0 ? this.columns() : PLACEHOLDER_COLUMNS));

  protected readonly allRowKeys = computed(() => this.data().map((row, idx) => this.rowKeyAt(row, idx)));
  protected readonly isAllSelected = computed(() => {
    const keys = this.allRowKeys();
    return keys.length > 0 && keys.every((k) => this.selectedKeys().includes(k));
  });

  protected readonly processedData = computed<DataTableRow[]>(() => {
    const data = this.data();
    if (!data || data.length === 0) return [];
    let items = [...data];
    const sortCol = this.sortColumnValue();
    const dir = this.sortDirectionValue();
    if (!this.isSortControlled() && sortCol && dir) {
      const currentCol = this.columns().find((c) => (c.id || c.key) === sortCol);
      if (currentCol) {
        items.sort((a, b) => {
          const valA = a[currentCol.key];
          const valB = b[currentCol.key];
          if (valA === valB) return 0;
          if (valA === undefined || valA === null) return 1;
          if (valB === undefined || valB === null) return -1;
          const result = valA > valB ? 1 : -1;
          return dir === 'asc' ? result : -result;
        });
      }
    }
    const pg = this.pagination();
    if (pg && pg.page && pg.pageSize && !pg.serverSide) {
      const start = (pg.page - 1) * pg.pageSize;
      items = items.slice(start, start + pg.pageSize);
    }
    return items;
  });

  protected readonly rootStyle = computed(() => {
    const width = this.width();
    const height = this.height();
    const tableWidth = this.tableWidth();
    return {
      width: width || '100%',
      height: height === '100%' ? 'auto' : height || 'auto',
      minHeight: 'fit-content',
      ...(tableWidth ? { maxWidth: tableWidth } : {}),
      ...this.customStyle(),
    };
  });

  protected readonly paginationTotal = computed(() => {
    const pg = this.pagination();
    return pg ? pg.total || this.data().length : 0;
  });
  protected readonly paginationFrom = computed(() => {
    const pg = this.pagination();
    return pg ? Math.min((pg.page - 1) * pg.pageSize + 1, this.paginationTotal()) : 0;
  });
  protected readonly paginationTo = computed(() => {
    const pg = this.pagination();
    return pg ? Math.min(pg.page * pg.pageSize, this.paginationTotal()) : 0;
  });
  protected readonly pageCount = computed(() => {
    const pg = this.pagination();
    return pg ? Math.ceil(this.paginationTotal() / pg.pageSize) : 0;
  });

  protected rowKeyAt(row: DataTableRow, index: number): DataTableRowKey {
    const rk = this.rowKey();
    if (typeof rk === 'function') return rk(row, index);
    if (typeof row === 'object' && row !== null && rk in row) return row[rk];
    return index;
  }

  protected colId(col: DataTableColumn, index: number): string {
    return col.id || col.key || `col-${index}`;
  }

  protected columnStyle(col: DataTableColumn): Record<string, string | number> {
    const flex = col.flex || (col.width ? `1 1 ${col.width}` : '1 1 0%');
    return { flex, minWidth: col.minWidth || '120px', ...col.style };
  }

  protected cellStateFor(row: DataTableRow, col: DataTableColumn, rowIndex: number): DataTableCellState {
    const getter = this.cellStateGetter();
    if (getter) return getter(row, col, rowIndex) || 'Enabled';
    if (col.cellState) return typeof col.cellState === 'function' ? col.cellState(row, rowIndex) : col.cellState;
    return 'Enabled';
  }

  private emitSelection(nextKeys: DataTableRowKey[]): void {
    if (!this.isSelectionControlled()) this.internalSelectedKeys.set(nextKeys);
    const rows = this.data().filter((r, idx) => nextKeys.includes(this.rowKeyAt(r, idx)));
    this.selectionChange.emit({ keys: nextKeys, rows });
  }

  protected handleSelectAll(): void {
    this.emitSelection(this.isAllSelected() ? [] : [...this.allRowKeys()]);
  }

  protected handleSelectRow(key: DataTableRowKey, event: Event): void {
    event.stopPropagation();
    const current = this.selectedKeys();
    this.emitSelection(current.includes(key) ? current.filter((k) => k !== key) : [...current, key]);
  }

  protected handleSort(column: DataTableColumn): void {
    const colId = column.id || column.key;
    let next: DataTableSortDirection = 'asc';
    if (this.sortColumnValue() === colId) {
      if (this.sortDirectionValue() === 'asc') next = 'desc';
      else if (this.sortDirectionValue() === 'desc') next = null;
    }
    if (!this.isSortControlled()) {
      this.internalSortColumn.set(next ? colId : null);
      this.internalSortDirection.set(next);
    }
    this.sortChange.emit({ column: colId, direction: next });
  }

  protected handleCellClick(value: unknown, row: DataTableRow, col: DataTableColumn, rowIdx: number, colIdx: number, event: MouseEvent): void {
    const cellKey = `${this.rowKeyAt(row, rowIdx)}_${col.id || col.key || colIdx}`;
    const nextActive = this.activeCellKeyValue() === cellKey ? null : cellKey;
    if (!this.isActiveCellControlled()) this.internalActiveCellKey.set(nextActive);
    this.activeCellChange.emit({ key: nextActive, value, row, column: col, rowIndex: rowIdx });
    this.cellClick.emit({ value, row, column: col, rowIndex: rowIdx, event });
  }

  protected goToPage(page: number): void {
    this.pagination()?.onPageChange?.(page);
    this.pageChange.emit(page);
  }
}
