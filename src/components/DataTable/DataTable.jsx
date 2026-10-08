import React, { useState, useMemo } from 'react';
import DataTableHeader from './DataTableHeader';
import DataTableCell from './DataTableCell';
import { DataTableCheckboxIcon } from './DataTableIcons';
import './DataTable.css';

/**
 * DataTable Component
 * Enterprise scalable data table component engineered to KPMG WorkBench specifications.
 * Highly configurable through props with complete support for all Figma headers, cells, shimmer loaders, and tooltips.
 */
export const DataTable = ({
  columns = [],
  data = [],
  rowKey = 'id',
  selectable = false,
  selectedRowKeys: controlledSelectedKeys,
  onSelectionChange,
  sortColumn: controlledSortColumn,
  sortDirection: controlledSortDirection,
  onSort,
  loading = false,
  loadingRowCount = 6,
  density = 'default', // 'default' | 'dense'
  hoverable = true,
  onRowClick,
  onCellClick,
  cellStateGetter,
  tooltipGetter,
  activeCellKey: controlledActiveCellKey,
  onActiveCellChange,
  pagination,
  emptyMessage = 'No records available.',
  width = '100%',
  height = '100%',
  scrollable = false,
  className = '',
  style = {},
  tableWidth,
}) => {
  // Internal state for uncontrolled usage
  const [internalSelectedKeys, setInternalSelectedKeys] = useState([]);
  const [internalSortColumn, setInternalSortColumn] = useState(null);
  const [internalSortDirection, setInternalSortDirection] = useState(null);
  const [internalActiveCellKey, setInternalActiveCellKey] = useState(null);
  const [hoveredRowKey, setHoveredRowKey] = useState(null);
  const [hoveredCellKey, setHoveredCellKey] = useState(null);

  const isSelectionControlled = controlledSelectedKeys !== undefined;
  const selectedRowKeys = isSelectionControlled ? controlledSelectedKeys : internalSelectedKeys;

  const isSortControlled = controlledSortColumn !== undefined;
  const sortColumn = isSortControlled ? controlledSortColumn : internalSortColumn;
  const sortDirection = isSortControlled ? controlledSortDirection : internalSortDirection;

  const isActiveCellControlled = controlledActiveCellKey !== undefined;
  const activeCellKey = isActiveCellControlled ? controlledActiveCellKey : internalActiveCellKey;

  // Row Key helper
  const getRowKey = (row, index) => {
    if (typeof rowKey === 'function') return rowKey(row, index);
    if (typeof row === 'object' && row !== null && rowKey in row) return row[rowKey];
    return index;
  };

  // Selection handlers
  const allRowKeys = useMemo(() => {
    return data.map((row, idx) => getRowKey(row, idx));
  }, [data, rowKey]);

  const isAllSelected = allRowKeys.length > 0 && allRowKeys.every((key) => selectedRowKeys.includes(key));
  const isPartiallySelected = !isAllSelected && allRowKeys.some((key) => selectedRowKeys.includes(key));

  const handleSelectAll = () => {
    const nextKeys = isAllSelected ? [] : [...allRowKeys];
    if (!isSelectionControlled) {
      setInternalSelectedKeys(nextKeys);
    }
    if (onSelectionChange) {
      const selectedRows = data.filter((row, idx) => nextKeys.includes(getRowKey(row, idx)));
      onSelectionChange(nextKeys, selectedRows);
    }
  };

  const handleSelectRow = (key, row, e) => {
    e.stopPropagation();
    let nextKeys;
    if (selectedRowKeys.includes(key)) {
      nextKeys = selectedRowKeys.filter((k) => k !== key);
    } else {
      nextKeys = [...selectedRowKeys, key];
    }

    if (!isSelectionControlled) {
      setInternalSelectedKeys(nextKeys);
    }
    if (onSelectionChange) {
      const selectedRows = data.filter((r, idx) => nextKeys.includes(getRowKey(r, idx)));
      onSelectionChange(nextKeys, selectedRows);
    }
  };

  // Sort handler
  const handleSort = (column) => {
    const colId = column.id || column.key;
    let nextDirection = 'asc';

    if (sortColumn === colId) {
      if (sortDirection === 'asc') nextDirection = 'desc';
      else if (sortDirection === 'desc') nextDirection = null;
    }

    if (!isSortControlled) {
      setInternalSortColumn(nextDirection ? colId : null);
      setInternalSortDirection(nextDirection);
    }
    if (onSort) {
      onSort(colId, nextDirection);
    }
  };

  // Cell click handler
  const handleCellClick = (val, row, col, rowIdx, colIdx, e) => {
    const cellKey = `${getRowKey(row, rowIdx)}_${col.id || col.key || colIdx}`;
    const nextActiveKey = activeCellKey === cellKey ? null : cellKey;

    if (!isActiveCellControlled) {
      setInternalActiveCellKey(nextActiveKey);
    }
    if (onActiveCellChange) {
      onActiveCellChange(nextActiveKey, { value: val, row, column: col, rowIndex: rowIdx });
    }
    if (onCellClick) {
      onCellClick(val, row, col, rowIdx, e);
    }
  };

  // Sorted and Paginated data
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    let items = [...data];

    // Local client-side sort if not controlled and column marked sortable
    if (!isSortControlled && sortColumn && sortDirection) {
      const currentCol = columns.find((c) => (c.id || c.key) === sortColumn);
      if (currentCol) {
        items.sort((a, b) => {
          const valA = a[currentCol.key];
          const valB = b[currentCol.key];
          if (valA === valB) return 0;
          if (valA === undefined || valA === null) return 1;
          if (valB === undefined || valB === null) return -1;
          const result = valA > valB ? 1 : -1;
          return sortDirection === 'asc' ? result : -result;
        });
      }
    }

    // Local pagination if provided
    if (pagination && pagination.page && pagination.pageSize && !pagination.serverSide) {
      const start = (pagination.page - 1) * pagination.pageSize;
      items = items.slice(start, start + pagination.pageSize);
    }

    return items;
  }, [data, isSortControlled, sortColumn, sortDirection, columns, pagination]);

  // Loading skeleton placeholder columns
  const effectiveColumns = columns.length > 0 ? columns : [
    { id: 'col1', key: 'col1', label: 'Header 1', width: '168px' },
    { id: 'col2', key: 'col2', label: 'Header 2', width: '168px' },
    { id: 'col3', key: 'col3', label: 'Header 3', width: '168px' },
    { id: 'col4', key: 'col4', label: 'Header 4', width: '168px' },
    { id: 'col5', key: 'col5', label: 'Header 5', width: '168px' },
    { id: 'col6', key: 'col6', label: 'Header 6', width: '168px' },
    { id: 'col7', key: 'col7', label: 'Header 7', width: '168px' },
    { id: 'col8', key: 'col8', label: 'Header 8', width: '168px' },
  ];

  return (
    <div
      className={`dt-root-wrapper ${className}`}
      style={{
        width: width || '100%',
        height: height === '100%' ? 'auto' : (height || 'auto'),
        minHeight: 'fit-content',
        ...(tableWidth ? { maxWidth: tableWidth } : {}),
        ...style,
      }}
    >
      <div className={`dt-scroll-container ${scrollable ? 'dt-scroll-container--scrollable' : ''}`}>
        <div className="dt-table" role="table">
          {/* Column Layout Header Row */}
          <div className="dt-columns-wrapper" role="rowgroup">
            {selectable && (
              <div className="dt-column dt-column--selection" style={{ width: '48px', flexShrink: 0 }}>
                <div
                  className="dt-header-cell dt-header-cell--selection"
                  onClick={handleSelectAll}
                  role="columnheader"
                  aria-label="Select all rows"
                >
                  <DataTableCheckboxIcon
                    checked={isAllSelected}
                    size={20}
                    color="#454554"
                  />
                </div>
                <div className="dt-column-items">
                  {loading
                    ? Array.from({ length: loadingRowCount }).map((_, idx) => (
                        <div key={`skel-sel-${idx}`} className="dt-cell dt-cell--selection">
                          <DataTableCheckboxIcon checked={false} size={20} color="#b8b8c4" />
                        </div>
                      ))
                    : processedData.map((row, rIdx) => {
                        const rowId = getRowKey(row, rIdx);
                        const isSelected = selectedRowKeys.includes(rowId);
                        return (
                          <div
                            key={`sel-${rowId}`}
                            className={`dt-cell dt-cell--selection ${isSelected ? 'dt-cell--selected' : ''}`}
                            onClick={(e) => handleSelectRow(rowId, row, e)}
                          >
                            <DataTableCheckboxIcon
                              checked={isSelected}
                              size={20}
                              color={isSelected ? '#1e49e2' : '#454554'}
                            />
                          </div>
                        );
                      })}
                </div>
              </div>
            )}

            {/* Standard Columns */}
            {effectiveColumns.map((col, colIdx) => {
              const colId = col.id || col.key || `col-${colIdx}`;
              const colType = col.type || 'text';
              const isColSorted = sortColumn === colId;
              const colFlex = col.flex || (col.width ? `1 1 ${col.width}` : '1 1 0%');

              return (
                <div
                  key={colId}
                  className="dt-column"
                  style={{ flex: colFlex, minWidth: col.minWidth || '120px', ...col.style }}
                >
                  {/* Column Header */}
                  {col.renderHeader ? (
                    col.renderHeader(col)
                  ) : (
                    <DataTableHeader
                      title={col.label || `Header ${colIdx + 1}`}
                      type={col.headerType || (col.sortable ? 'sort' : 'checkmark')}
                      state={col.headerState || (isColSorted ? 'Pressed' : 'Enabled')}
                      pressed={col.headerState === 'Pressed' || isColSorted}
                      sortDirection={isColSorted ? sortDirection : null}
                      onSort={col.sortable ? () => handleSort(col) : undefined}
                      onActionClick={col.onActionClick}
                    />
                  )}

                  {/* Column Items */}
                  <div className="dt-column-items">
                    {loading ? (
                      Array.from({ length: loadingRowCount }).map((_, rIdx) => (
                        <DataTableCell
                          key={`loading-${colId}-${rIdx}`}
                          state="loading"
                          density={density}
                        />
                      ))
                    ) : processedData.length === 0 ? (
                      colIdx === 0 ? (
                        <div className="dt-empty-placeholder">{emptyMessage}</div>
                      ) : null
                    ) : (
                      processedData.map((row, rIdx) => {
                        const rowId = getRowKey(row, rIdx);
                        const cellKey = `${rowId}_${colId}`;
                        const rawValue = row[col.key];

                        // Determine dynamic cell state
                        let cellState = 'Enabled';
                        if (cellStateGetter) {
                          cellState = cellStateGetter(row, col, rIdx) || 'Enabled';
                        } else if (col.cellState) {
                          cellState = typeof col.cellState === 'function'
                            ? col.cellState(row, rIdx)
                            : col.cellState;
                        }

                        // Determine tooltip props if any
                        const isCellActive = activeCellKey === cellKey;
                        const dynamicTooltip = tooltipGetter ? tooltipGetter(row, col, rIdx) : null;
                        const hasTooltip = isCellActive || Boolean(dynamicTooltip);

                        // If active, force pressed state
                        const effectiveState = isCellActive ? 'Pressed' : cellState;

                        return (
                          <DataTableCell
                            key={cellKey}
                            type={colType}
                            state={effectiveState}
                            cellText={rawValue !== undefined && rawValue !== null ? String(rawValue) : ''}
                            chipLabel={rawValue !== undefined && rawValue !== null ? String(rawValue) : col.chipLabel || 'Label'}
                            errorText={col.errorText || 'Error!'}
                            missingText={col.missingText || 'Missing data!'}
                            withTooltip={hasTooltip}
                            tooltipProps={dynamicTooltip || col.tooltipProps || {}}
                            density={density}
                            onClick={(e) => handleCellClick(rawValue, row, col, rIdx, colIdx, e)}
                            onMouseEnter={() => {
                              if (hoverable) setHoveredCellKey(cellKey);
                            }}
                            onMouseLeave={() => {
                              if (hoverable && hoveredCellKey === cellKey) setHoveredCellKey(null);
                            }}
                          >
                            {col.renderCell ? col.renderCell(rawValue, row, rIdx, col) : undefined}
                          </DataTableCell>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {pagination && (
        <div className="dt-pagination-container">
          <div className="dt-pagination-info">
            Showing {Math.min((pagination.page - 1) * pagination.pageSize + 1, pagination.total || data.length)} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total || data.length)} of{' '}
            {pagination.total || data.length} entries
          </div>
          <div className="dt-pagination-controls">
            <button
              type="button"
              className="dt-pagination-btn"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange && pagination.onPageChange(pagination.page - 1)}
            >
              Previous
            </button>
            <span className="dt-pagination-page-indicator">
              Page {pagination.page} of {Math.ceil((pagination.total || data.length) / pagination.pageSize) || 1}
            </span>
            <button
              type="button"
              className="dt-pagination-btn"
              disabled={
                pagination.page >= Math.ceil((pagination.total || data.length) / pagination.pageSize)
              }
              onClick={() => pagination.onPageChange && pagination.onPageChange(pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
