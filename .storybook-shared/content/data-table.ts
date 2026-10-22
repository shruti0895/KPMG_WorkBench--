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
      'Avoid data tables for a handful of items or content that is not tabular; use a list or cards.',
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
