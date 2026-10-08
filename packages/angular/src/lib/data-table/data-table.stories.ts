import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import {
  DataTableColumn,
  DataTableComponent,
  DataTableRow,
} from './data-table.component';
import { DataTableHeaderComponent } from './data-table-header.component';
import { DataTableCellComponent } from './data-table-cell.component';
import { DataTableTooltipComponent } from './data-table-tooltip.component';

// Realistic mock data scaled flexibly with minWidths preventing cell collapse
const enterpriseColumns: DataTableColumn[] = [
  { id: 'proj', key: 'project', label: 'Project Name', type: 'text', headerType: 'star', minWidth: '140px', sortable: true },
  { id: 'stat', key: 'status', label: 'Status', type: 'chip', headerType: 'checkmark', minWidth: '110px' },
  { id: 'cat', key: 'category', label: 'Domain', type: 'chip', headerType: 'checkmark', minWidth: '110px' },
  { id: 'ai', key: 'aiAssistance', label: 'AI Review', type: 'text', headerType: 'robot', minWidth: '140px', sortable: true },
  { id: 'risk', key: 'riskScore', label: 'Risk Level', type: 'chip', headerType: 'checkmark', minWidth: '100px' },
  { id: 'owner', key: 'owner', label: 'Lead Auditor', type: 'text', headerType: 'checkmark', minWidth: '130px' },
  { id: 'due', key: 'dueDate', label: 'Target Date', type: 'text', headerType: 'sort', minWidth: '110px', sortable: true },
  { id: 'actions', key: 'summary', label: 'Overview', type: 'text', headerType: 'checkmark', minWidth: '140px' },
];

const enterpriseRows: DataTableRow[] = [
  { id: 'row-1', project: 'Global Audit Alpha', status: 'In Progress', category: 'Assurance', aiAssistance: 'Automated scan 98% complete', riskScore: 'Low', owner: 'Eleanor Vance', dueDate: '2026-11-15', summary: 'Consolidated statutory filing across primary EU jurisdictions.' },
  { id: 'row-2', project: 'Cloud Security Mesh', status: 'Approved', category: 'Technology', aiAssistance: 'Zero critical vulnerabilities', riskScore: 'Minimal', owner: 'Marcus Sterling', dueDate: '2026-10-30', summary: 'Identity perimeter evaluation and access tokens migration.' },
  { id: 'row-3', project: 'Tax Governance Review', status: 'Under Review', category: 'Taxation', aiAssistance: 'Cross-border treaty analysis', riskScore: 'Medium', owner: 'Sophia Lin', dueDate: '2026-12-01', summary: 'OECD Pillar Two operational impacts and reporting alignment.' },
  { id: 'row-4', project: 'ESG Assurance Baseline', status: 'In Progress', category: 'Advisory', aiAssistance: 'Carbon emissions verification', riskScore: 'Low', owner: 'Julian Rossi', dueDate: '2026-11-20', summary: 'Scope 1-3 audit trail reconciliation with IoT sensor streams.' },
  { id: 'row-5', project: 'Treasury Flow Automation', status: 'Completed', category: 'Financial', aiAssistance: 'Smart matching verified', riskScore: 'Minimal', owner: 'Clara Oswald', dueDate: '2026-10-18', summary: 'Daily liquidity sweeps and automated FX hedging procedures.' },
  { id: 'row-6', project: 'Vendor Risk Assessment', status: 'Action Required', category: 'Compliance', aiAssistance: 'Compliance gap detected', riskScore: 'Elevated', owner: 'David Thorne', dueDate: '2026-11-05', summary: 'Third-party supply chain compliance and SLA validation.' },
];

const columnsWithTooltip: DataTableColumn[] = [
  { id: 'proj', key: 'project', label: 'Project Name', type: 'text', minWidth: '130px' },
  { id: 'stat', key: 'status', label: 'Status (With Tooltip)', type: 'chip', minWidth: '130px' },
  { id: 'cat', key: 'category', label: 'Domain', type: 'chip', minWidth: '100px' },
  { id: 'err', key: 'errorCheck', label: 'Validation Flag', type: 'text', minWidth: '120px' },
  { id: 'owner', key: 'owner', label: 'Lead Auditor', type: 'text', minWidth: '120px' },
];

const tooltipRows: DataTableRow[] = [
  { id: 'row-1', project: 'Audit Alpha Review', status: 'In Progress', category: 'Assurance', errorCheck: 'Error!', owner: 'Eleanor Vance' },
  { id: 'row-2', project: 'Cloud Infrastructure', status: 'Approved', category: 'Technology', errorCheck: 'Verified', owner: 'Marcus Sterling' },
];

const meta: Meta<DataTableComponent> = {
  title: 'Components/DataTable',
  component: DataTableComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System — Data Table

Enterprise-grade, prop-driven tabular component engineered for complex data visualization and workflow governance:

- **Headers**: Supports multiple semantic types (Checkmark, Star, Robot AI Touch, and Sort) across Enabled and Pressed active states with primary blue interaction layers.
- **Cells**: Comprehensive state coverage for both Text and Chip cell types:
  - **Enabled**: Standard neutral presentation with clear typography.
  - **Hovered**: Subtle surface tint for interactive feedback.
  - **Pressed**: Brand primary outline with violet surface background.
  - **Loading**: Multi-band animated linear gradient shimmer.
  - **Error**: Alert pink container with red warning outline and messaging.
  - **Missing**: Warning amber container with gold border and missing data status.
  - **With Tooltip**: Rich popover display featuring header, description, divider, and mini resource preview card.
- **Table Controls**: Full multi-row selection, client or server sorting, multi-page pagination, and flexible density layouts.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DataTableComponent, DataTableHeaderComponent, DataTableCellComponent, DataTableTooltipComponent],
    }),
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `<div style="width:100%;height:auto;min-height:fit-content;padding:16px;box-sizing:border-box;background:#fcfcfd">${story.template}</div>`,
      };
    },
  ],
  argTypes: {
    width: { name: 'width', description: 'Width of the table container (defaults to 100%)', control: 'text' },
    height: { name: 'height', description: 'Height of the table container (defaults to 100%)', control: 'text' },
    density: { name: 'density', description: 'Controls vertical row padding and spacing', control: 'select', options: ['default', 'dense'] },
    selectable: { name: 'selectable', description: 'Enables row selection checkboxes', control: 'boolean' },
    loading: { name: 'loading', description: 'Activates full table shimmer loading state', control: 'boolean' },
    hoverable: { name: 'hoverable', description: 'Highlights cells on mouse hover', control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<DataTableComponent>;

// 1. Default
export const Default: Story = {
  render: (args) => ({
    props: { ...args, columns: enterpriseColumns, data: enterpriseRows },
    template: `<kpmg-data-table [columns]="columns" [data]="data" ${argsToTemplate(args)} />`,
  }),
};

// 2. Interactive Selection
export const InteractiveSelection: Story = {
  render: () => ({
    props: { columns: enterpriseColumns, data: enterpriseRows, selectedKeys: ['row-2'], total: enterpriseRows.length },
    template: `
      <div style="width:100%;height:auto;min-height:fit-content;display:flex;flex-direction:column;gap:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
          <h3 style="margin:0;font-size:18px;font-weight:600;color:#2f2f39">Multi-Row Checkbox Selection</h3>
          <span style="font-size:13px;color:#454554;font-weight:500">{{ selectedKeys.length }} of {{ total }} rows selected</span>
        </div>
        <div style="flex:1;min-height:0">
          <kpmg-data-table [columns]="columns" [data]="data" [selectable]="true" [selectedRowKeys]="selectedKeys" (selectionChange)="selectedKeys = $event.keys" />
        </div>
      </div>`,
  }),
};

// 3. Header Types & States Matrix
export const HeaderTypesAndStates: Story = {
  render: () => ({
    props: { pressed: { checkmark: false, star: false, robot: false, sort: false } },
    template: `<div style="display:flex;flex-direction:column;gap:32px"><div><h3 style="margin:0 0 16px 0;font-size:16px;font-weight:600;color:#2f2f39">Header Component Types (Enabled State)</h3><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Checkmark Type" type="Checkmark" state="Enabled" /></div><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Star Type" type="Star" state="Enabled" /></div><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Robot AI Type" type="Robot" state="Enabled" /></div><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Sort Type" type="Sort" state="Enabled" sortDirection="asc" /></div></div></div><div><h3 style="margin:0 0 16px 0;font-size:16px;font-weight:600;color:#2f2f39">Header Component Types (Pressed Active State)</h3><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Checkmark Pressed" type="Checkmark" state="Pressed" [pressed]="true" /></div><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Star Pressed" type="Star" state="Pressed" [pressed]="true" /></div><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Robot Pressed" type="Robot" state="Pressed" [pressed]="true" /></div><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Sort Pressed" type="Sort" state="Pressed" [pressed]="true" sortDirection="desc" /></div></div></div><div><h3 style="margin:0 0 16px 0;font-size:16px;font-weight:600;color:#2f2f39">Interactive Toggle Headers (Click action button to test state switch)</h3><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Toggle Checkmark" type="Checkmark" [pressed]="pressed.checkmark" (actionClick)="pressed.checkmark = !pressed.checkmark" /></div><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Toggle Star" type="Star" [pressed]="pressed.star" (actionClick)="pressed.star = !pressed.star" /></div><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Toggle AI Robot" type="Robot" [pressed]="pressed.robot" (actionClick)="pressed.robot = !pressed.robot" /></div><div style="flex:1;min-width:180px"><kpmg-data-table-header title="Toggle Sort" type="Sort" [pressed]="pressed.sort" [sortDirection]="pressed.sort ? 'desc' : 'asc'" (actionClick)="pressed.sort = !pressed.sort" /></div></div></div></div>`,
  }),
};

// 4. All Cell States Matrix
export const CellStatesMatrix: Story = {
  render: () => ({
    template: `<div style="display:flex;flex-direction:column;gap:32px"><div><h3 style="margin:0 0 16px 0;font-size:16px;font-weight:600;color:#2f2f39">Text Cell Variants Matrix</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px"><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Enabled</span><kpmg-data-table-cell type="Text" state="Enabled" cellText="Quarterly compliance ledger and statutory balances" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Hovered</span><kpmg-data-table-cell type="Text" state="Hovered" cellText="Quarterly compliance ledger and statutory balances" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Pressed</span><kpmg-data-table-cell type="Text" state="Pressed" cellText="Quarterly compliance ledger and statutory balances" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Loading (Shimmer)</span><kpmg-data-table-cell type="Text" state="Loading" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Error</span><kpmg-data-table-cell type="Text" state="Error" errorText="Error!" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Missing</span><kpmg-data-table-cell type="Text" state="Missing" missingText="Missing data!" /></div></div></div><div><h3 style="margin:0 0 16px 0;font-size:16px;font-weight:600;color:#2f2f39">Chip Cell Variants Matrix</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px"><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Enabled</span><kpmg-data-table-cell type="Chip" state="Enabled" chipLabel="Completed" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Hovered</span><kpmg-data-table-cell type="Chip" state="Hovered" chipLabel="In Review" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Pressed</span><kpmg-data-table-cell type="Chip" state="Pressed" chipLabel="Selected" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Loading (Shimmer)</span><kpmg-data-table-cell type="Chip" state="Loading" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Error</span><kpmg-data-table-cell type="Chip" state="Error" errorText="Error!" /></div><div><span style="font-size:12px;color:#9090a2;display:block;margin-bottom:6px">Missing</span><kpmg-data-table-cell type="Chip" state="Missing" missingText="Missing data!" /></div></div></div></div>`,
  }),
};

// 5. With Tooltips Popover
export const WithTooltips: Story = {
  render: () => ({
    props: {
      columns: columnsWithTooltip,
      data: tooltipRows,
      activeKey: 'row-1_stat',
      cellStateGetter: (row: DataTableRow, col: DataTableColumn) =>
        col.id === 'err' && row['errorCheck'] === 'Error!' ? 'Error' : 'Enabled',
      tooltipGetter: (row: DataTableRow, col: DataTableColumn) => {
        if (col.id === 'stat') {
          return {
            title: `${row['project']} Details`,
            supportingText: `Current execution status: ${row['status']}. Automated checklist completed with zero blockers.`,
            secondaryText: `Assigned Lead: ${row['owner']}`,
            cardTitle: 'Audit Reference Doc #402',
          };
        }
        if (col.id === 'err' && row['errorCheck'] === 'Error!') {
          return {
            title: 'Validation Exception',
            supportingText: 'Missing secondary signature from enterprise governance council.',
            secondaryText: 'Severity: High Priority',
            cardTitle: 'Exception Resolution Guidelines',
          };
        }
        return null;
      },
    },
    template: `
      <div style="width:100%;height:auto;min-height:fit-content;display:flex;flex-direction:column;gap:16px">
        <p style="margin:0;font-size:14px;color:#454554;flex-shrink:0">Click on any cell to toggle the rich popover tooltip displaying metadata, audit trail, and connected resources.</p>
        <div style="flex:1;min-height:0">
          <kpmg-data-table [columns]="columns" [data]="data" [activeCellKey]="activeKey" (activeCellChange)="activeKey = $event.key" [cellStateGetter]="cellStateGetter" [tooltipGetter]="tooltipGetter" />
        </div>
      </div>`,
  }),
};

// 6. Loading Skeleton
export const LoadingSkeleton: Story = {
  render: () => ({
    props: { columns: enterpriseColumns },
    template: `<div style="width:100%;height:auto;min-height:fit-content;display:flex;flex-direction:column;gap:16px"><h3 style="margin:0;font-size:18px;font-weight:600;color:#2f2f39;flex-shrink:0">Full Table Shimmer Loading State</h3><div style="flex:1;min-height:0"><kpmg-data-table [columns]="columns" [loading]="true" [loadingRowCount]="6" /></div></div>`,
  }),
};

// 7. Dense Layout
export const DenseLayout: Story = {
  render: () => ({
    props: { columns: enterpriseColumns, data: enterpriseRows },
    template: `<div style="width:100%;height:auto;min-height:fit-content;display:flex;flex-direction:column;gap:16px"><h3 style="margin:0;font-size:18px;font-weight:600;color:#2f2f39;flex-shrink:0">Compact Density Layout</h3><div style="flex:1;min-height:0"><kpmg-data-table [columns]="columns" [data]="data" density="dense" [selectable]="true" /></div></div>`,
  }),
};

// 8. Pagination and Sorting
export const PaginationAndSorting: Story = {
  render: () => ({
    props: { columns: enterpriseColumns, data: enterpriseRows, page: 1, pageSize: 3, total: enterpriseRows.length },
    template: `<div style="width:100%;height:auto;min-height:fit-content;display:flex;flex-direction:column;gap:16px"><h3 style="margin:0;font-size:18px;font-weight:600;color:#2f2f39;flex-shrink:0">Interactive Sorting &amp; Pagination</h3><div style="flex:1;min-height:0"><kpmg-data-table [columns]="columns" [data]="data" [selectable]="true" [pagination]="{ page: page, pageSize: pageSize, total: total }" (pageChange)="page = $event" /></div></div>`,
  }),
};

// 9. Playground
export const Playground: Story = {
  args: { density: 'default', selectable: true, loading: false, hoverable: true },
  render: (args) => ({
    props: { ...args, columns: enterpriseColumns, data: enterpriseRows },
    template: `
      <div style="width:100%;height:auto;min-height:fit-content">
        <kpmg-data-table [columns]="columns" [data]="data" ${argsToTemplate(args)} />
      </div>`,
  }),
};
