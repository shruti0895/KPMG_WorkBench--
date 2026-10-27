import type { ComponentDoc } from '../types';

export const dataTable: ComponentDoc = {
  overview: {
    what:
      'A data table presents structured records in rows and columns. It supports sortable columns, row selection, text and chip cells, loading, error and missing-data states, tooltips, density options and pagination.',
    when: [
      'Show many records with the same attributes so users can scan and compare them.',
      'Enable sorting on columns where order matters, and selection when users act on several rows at once.',
      'Use the loading state to show shimmer placeholders while data is fetched.',
      'Use the dense density to fit more rows on screen.',
    ],
    whenNot: [
      'A handful of items, or content with a single attribute: use a List.',
      'Content that is not tabular, or needs a rich layout per item: use Cards or Tiles.',
    ],
    anatomy: [
      { part: 'Selection column', description: 'Optional column of checkbox icons with a select-all control in the header.' },
      { part: 'Column header', description: 'Title with an action button (sort, checkmark, star or robot icon); the sort button cycles ascending, descending and none.' },
      { part: 'Cell', description: 'Text or chip content, with enabled, hovered, pressed, loading, error and missing states.' },
      { part: 'Tooltip', description: 'Optional tooltip shown on the active or tooltip-enabled cell.' },
      { part: 'Empty message', description: 'Text shown when there are no records.' },
      { part: 'Pagination', description: 'Entry count, Previous and Next buttons and a page indicator.' },
    ],
  },
  variants: [
    { name: 'Default density', purpose: '88px rows. Use it when cells hold wrapped text or chips and readability matters more than volume.' },
    { name: 'Dense density', purpose: '48px rows. Use it to show more records at once when cell content is short.' },
    { name: 'Text column', purpose: 'Shows the value as text, clamped to three lines. The full text is available in the cell title.' },
    { name: 'Chip column (type: chip)', purpose: 'Shows the value as a chip. Use it for short categorical values such as a status.' },
    { name: 'Sortable column', purpose: 'Set sortable on a column to give its header a sort button. Other columns can show a checkmark, star or robot header action, or none.' },
    { name: 'Selectable table', purpose: 'Set selectable to add a checkbox column with a select-all control in the header.' },
  ],
  formatting: [
    {
      title: 'Content',
      points: [
        'Keep column titles short; a title that does not fit is cut with an ellipsis.',
        'Keep the same type and format of data within a column.',
        'Write an emptyMessage that tells users why there are no records.',
        'Use chip cells for a few short categories, not free text.',
      ],
    },
    {
      title: 'Layout and sizing',
      points: [
        'Give important columns more width with width or flex; each column has a minimum width of 120px.',
        'Set scrollable when the columns need more width than the container.',
        'Use pagination for long data sets; with serverSide pagination, pass only the current page of data and the total.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse',
      points: [
        'Clicking a sort button cycles ascending, descending, then no sort. The table sorts the data itself unless you control sortColumn, sortDirection and onSort.',
        'Clicking a row checkbox toggles that row; clicking the header checkbox selects or clears all rows. Selection can be controlled with selectedRowKeys and onSelectionChange.',
        'Clicking a cell calls onCellClick and makes it active (pressed) with a tooltip; clicking it again clears it.',
      ],
    },
    {
      title: 'Keyboard',
      points: [
        'Header action buttons and the Previous and Next buttons are native buttons, reachable with Tab and activated with Enter or Space.',
        'Selection checkboxes and clickable cells have no key handlers, so rows cannot be selected from the keyboard. There is no arrow-key navigation between cells.',
      ],
    },
    {
      title: 'States',
      points: [
        'Loading replaces cells with shimmer placeholders (loadingRowCount rows, default 6).',
        'Cells can be set to hovered, pressed, error or missing with cellStateGetter or a column cellState. Error and missing cells show text such as "Error!" and "Missing data!".',
        'With no data, the empty message is shown in the first column.',
        'Previous is disabled on the first page and Next on the last.',
      ],
    },
  ],
  accessibility: [
    'The table, header group, column headers and cells are exposed with role="table", "rowgroup", "columnheader" and "gridcell".',
    'Header action buttons are native buttons with aria-pressed and an aria-label of the form "<title> action", so sorting is available from the keyboard.',
    'Sorting is not announced through aria-sort; the sort icon and pressed state show the current direction visually.',
    'Selection checkboxes and clickable cells are click targets only: clickable cells get tabIndex 0 but have no Enter or Space handler, and the selection control has no keyboard handler, so keyboard row selection is not supported.',
    'The loading shimmer is labelled "Loading content", and Previous and Next are native buttons that are disabled at the first and last page.',
    'Error and missing states show text such as "Error!" and "Missing data!" as well as colour.',
  ],
  references: [
    { label: 'Checkbox', text: 'Use a checkbox for selection outside a table.' },
    { label: 'Chip', text: 'Chip cells use a compact label style similar to chips.' },
    { label: 'Tooltip', text: 'Cell tooltips follow the Tooltip pattern.' },
    { label: 'List', text: 'Use a list for simple, single-column content.' },
  ],
};

export default dataTable;
