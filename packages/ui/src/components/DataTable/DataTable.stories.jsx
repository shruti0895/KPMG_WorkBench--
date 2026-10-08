import React, { useState } from 'react';
import { DataTable } from './DataTable';
import { DataTableHeader } from './DataTableHeader';
import { DataTableCell } from './DataTableCell';
import { DataTableTooltip } from './DataTableTooltip';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  subcomponents: { DataTableHeader, DataTableCell, DataTableTooltip },
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
    (Story) => {
      const containerRef = React.useRef(null);

      React.useLayoutEffect(() => {
        if (!containerRef.current) return;

        const getPreviewEl = () => {
          const local = containerRef.current.closest('.sbdocs-preview');
          if (local) return local;
          try {
            if (window.parent && window.parent.document) {
              return window.parent.document.querySelector('.sb-anchor[id*="components-datatable"] .sbdocs-preview');
            }
          } catch (e) {
            // cross-origin fallback
          }
          return null;
        };

        const previewEl = getPreviewEl();
        if (previewEl) {
          previewEl.style.width = '100%';
          previewEl.style.minWidth = '100%';
          previewEl.style.maxWidth = '100%';
          previewEl.style.height = 'auto';
          previewEl.style.minHeight = 'fit-content';
          previewEl.style.overflow = 'visible';
          previewEl.style.boxSizing = 'border-box';
        }

        try {
          const win = window.parent && window.parent.document ? window.parent : window;
          const docsContainers = win.document.querySelectorAll('.sbdocs-content, .sbdocs-wrapper');
          docsContainers.forEach((el) => {
            el.style.maxWidth = '100%';
            el.style.width = '100%';
            el.style.padding = '16px';
          });
        } catch (e) { }
      }, []);

      return (
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: 'auto',
            minHeight: 'fit-content',
            padding: '16px',
            boxSizing: 'border-box',
            background: '#fcfcfd',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    width: {
      name: 'width',
      description: 'Width of the table container (defaults to 100%)',
      control: 'text',
      defaultValue: '100%',
    },
    height: {
      name: 'height',
      description: 'Height of the table container (defaults to 100%)',
      control: 'text',
      defaultValue: '100%',
    },
    density: {
      name: 'density',
      description: 'Controls vertical row padding and spacing',
      control: 'select',
      options: ['default', 'dense'],
    },
    selectable: {
      name: 'selectable',
      description: 'Enables row selection checkboxes',
      control: 'boolean',
    },
    loading: {
      name: 'loading',
      description: 'Activates full table shimmer loading state',
      control: 'boolean',
    },
    hoverable: {
      name: 'hoverable',
      description: 'Highlights cells on mouse hover',
      control: 'boolean',
    },
  },
};

// Realistic mock data scaled flexibly with minWidths preventing cell collapse
const enterpriseColumns = [
  { id: 'proj', key: 'project', label: 'Project Name', type: 'text', headerType: 'star', minWidth: '140px', sortable: true },
  { id: 'stat', key: 'status', label: 'Status', type: 'chip', headerType: 'checkmark', minWidth: '110px' },
  { id: 'cat', key: 'category', label: 'Domain', type: 'chip', headerType: 'checkmark', minWidth: '110px' },
  { id: 'ai', key: 'aiAssistance', label: 'AI Review', type: 'text', headerType: 'robot', minWidth: '140px', sortable: true },
  { id: 'risk', key: 'riskScore', label: 'Risk Level', type: 'chip', headerType: 'checkmark', minWidth: '100px' },
  { id: 'owner', key: 'owner', label: 'Lead Auditor', type: 'text', headerType: 'checkmark', minWidth: '130px' },
  { id: 'due', key: 'dueDate', label: 'Target Date', type: 'text', headerType: 'sort', minWidth: '110px', sortable: true },
  { id: 'actions', key: 'summary', label: 'Overview', type: 'text', headerType: 'checkmark', minWidth: '140px' },
];

const enterpriseRows = [
  {
    id: 'row-1',
    project: 'Global Audit Alpha',
    status: 'In Progress',
    category: 'Assurance',
    aiAssistance: 'Automated scan 98% complete',
    riskScore: 'Low',
    owner: 'Eleanor Vance',
    dueDate: '2026-11-15',
    summary: 'Consolidated statutory filing across primary EU jurisdictions.',
  },
  {
    id: 'row-2',
    project: 'Cloud Security Mesh',
    status: 'Approved',
    category: 'Technology',
    aiAssistance: 'Zero critical vulnerabilities',
    riskScore: 'Minimal',
    owner: 'Marcus Sterling',
    dueDate: '2026-10-30',
    summary: 'Identity perimeter evaluation and access tokens migration.',
  },
  {
    id: 'row-3',
    project: 'Tax Governance Review',
    status: 'Under Review',
    category: 'Taxation',
    aiAssistance: 'Cross-border treaty analysis',
    riskScore: 'Medium',
    owner: 'Sophia Lin',
    dueDate: '2026-12-01',
    summary: 'OECD Pillar Two operational impacts and reporting alignment.',
  },
  {
    id: 'row-4',
    project: 'ESG Assurance Baseline',
    status: 'In Progress',
    category: 'Advisory',
    aiAssistance: 'Carbon emissions verification',
    riskScore: 'Low',
    owner: 'Julian Rossi',
    dueDate: '2026-11-20',
    summary: 'Scope 1-3 audit trail reconciliation with IoT sensor streams.',
  },
  {
    id: 'row-5',
    project: 'Treasury Flow Automation',
    status: 'Completed',
    category: 'Financial',
    aiAssistance: 'Smart matching verified',
    riskScore: 'Minimal',
    owner: 'Clara Oswald',
    dueDate: '2026-10-18',
    summary: 'Daily liquidity sweeps and automated FX hedging procedures.',
  },
  {
    id: 'row-6',
    project: 'Vendor Risk Assessment',
    status: 'Action Required',
    category: 'Compliance',
    aiAssistance: 'Compliance gap detected',
    riskScore: 'Elevated',
    owner: 'David Thorne',
    dueDate: '2026-11-05',
    summary: 'Third-party supply chain compliance and SLA validation.',
  },
];

// 1. Default Story
export const Default = {
  render: (args) => (
    <DataTable columns={enterpriseColumns} data={enterpriseRows} {...args} />
  ),
};

// 2. Interactive Selection Story
export const InteractiveSelection = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState(['row-2']);

    return (
      <div style={{ width: '100%', height: 'auto', minHeight: 'fit-content', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#2f2f39' }}>
            Multi-Row Checkbox Selection
          </h3>
          <span style={{ fontSize: '13px', color: '#454554', fontWeight: 500 }}>
            {selectedKeys.length} of {enterpriseRows.length} rows selected
          </span>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <DataTable
            columns={enterpriseColumns}
            data={enterpriseRows}
            selectable={true}
            selectedRowKeys={selectedKeys}
            onSelectionChange={(keys) => setSelectedKeys(keys)}
          />
        </div>
      </div>
    );
  },
};

// 3. Header Types & States Matrix
export const HeaderTypesAndStates = {
  render: () => {
    const [pressedStates, setPressedStates] = useState({
      checkmark: false,
      star: false,
      robot: false,
      sort: false,
    });

    const toggleState = (key) => {
      setPressedStates((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#2f2f39' }}>
            Header Component Types (Enabled State)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader title="Checkmark Type" type="Checkmark" state="Enabled" />
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader title="Star Type" type="Star" state="Enabled" />
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader title="Robot AI Type" type="Robot" state="Enabled" />
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader title="Sort Type" type="Sort" state="Enabled" sortDirection="asc" />
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#2f2f39' }}>
            Header Component Types (Pressed Active State)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader title="Checkmark Pressed" type="Checkmark" state="Pressed" pressed={true} />
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader title="Star Pressed" type="Star" state="Pressed" pressed={true} />
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader title="Robot Pressed" type="Robot" state="Pressed" pressed={true} />
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader title="Sort Pressed" type="Sort" state="Pressed" pressed={true} sortDirection="desc" />
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#2f2f39' }}>
            Interactive Toggle Headers (Click action button to test state switch)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader
                title="Toggle Checkmark"
                type="Checkmark"
                pressed={pressedStates.checkmark}
                onActionClick={() => toggleState('checkmark')}
              />
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader
                title="Toggle Star"
                type="Star"
                pressed={pressedStates.star}
                onActionClick={() => toggleState('star')}
              />
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader
                title="Toggle AI Robot"
                type="Robot"
                pressed={pressedStates.robot}
                onActionClick={() => toggleState('robot')}
              />
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <DataTableHeader
                title="Toggle Sort"
                type="Sort"
                pressed={pressedStates.sort}
                sortDirection={pressedStates.sort ? 'desc' : 'asc'}
                onActionClick={() => toggleState('sort')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// 4. All Cell States Matrix
export const CellStatesMatrix = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#2f2f39' }}>
          Text Cell Variants Matrix
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Enabled</span>
            <DataTableCell type="Text" state="Enabled" cellText="Quarterly compliance ledger and statutory balances" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Hovered</span>
            <DataTableCell type="Text" state="Hovered" cellText="Quarterly compliance ledger and statutory balances" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Pressed</span>
            <DataTableCell type="Text" state="Pressed" cellText="Quarterly compliance ledger and statutory balances" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Loading (Shimmer)</span>
            <DataTableCell type="Text" state="Loading" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Error</span>
            <DataTableCell type="Text" state="Error" errorText="Error!" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Missing</span>
            <DataTableCell type="Text" state="Missing" missingText="Missing data!" />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#2f2f39' }}>
          Chip Cell Variants Matrix
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Enabled</span>
            <DataTableCell type="Chip" state="Enabled" chipLabel="Completed" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Hovered</span>
            <DataTableCell type="Chip" state="Hovered" chipLabel="In Review" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Pressed</span>
            <DataTableCell type="Chip" state="Pressed" chipLabel="Selected" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Loading (Shimmer)</span>
            <DataTableCell type="Chip" state="Loading" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Error</span>
            <DataTableCell type="Chip" state="Error" errorText="Error!" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', marginBottom: '6px' }}>Missing</span>
            <DataTableCell type="Chip" state="Missing" missingText="Missing data!" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// 5. With Tooltips Popover
export const WithTooltips = {
  render: () => {
    const [activeKey, setActiveKey] = useState('row-1_stat');

    const columnsWithTooltip = [
      { id: 'proj', key: 'project', label: 'Project Name', type: 'text', minWidth: '130px' },
      { id: 'stat', key: 'status', label: 'Status (With Tooltip)', type: 'chip', minWidth: '130px' },
      { id: 'cat', key: 'category', label: 'Domain', type: 'chip', minWidth: '100px' },
      { id: 'err', key: 'errorCheck', label: 'Validation Flag', type: 'text', minWidth: '120px' },
      { id: 'owner', key: 'owner', label: 'Lead Auditor', type: 'text', minWidth: '120px' },
    ];

    const tooltipRows = [
      {
        id: 'row-1',
        project: 'Audit Alpha Review',
        status: 'In Progress',
        category: 'Assurance',
        errorCheck: 'Error!',
        owner: 'Eleanor Vance',
      },
      {
        id: 'row-2',
        project: 'Cloud Infrastructure',
        status: 'Approved',
        category: 'Technology',
        errorCheck: 'Verified',
        owner: 'Marcus Sterling',
      },
    ];

    return (
      <div style={{ width: '100%', height: 'auto', minHeight: 'fit-content', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#454554', flexShrink: 0 }}>
          Click on any cell to toggle the rich popover tooltip displaying metadata, audit trail, and connected resources.
        </p>
        <div style={{ flex: 1, minHeight: 0 }}>
          <DataTable
            columns={columnsWithTooltip}
            data={tooltipRows}
            activeCellKey={activeKey}
            onActiveCellChange={(key) => setActiveKey(key)}
            cellStateGetter={(row, col) => {
              if (col.id === 'err' && row.errorCheck === 'Error!') return 'Error';
              return 'Enabled';
            }}
            tooltipGetter={(row, col) => {
              if (col.id === 'stat') {
                return {
                  title: `${row.project} Details`,
                  supportingText: `Current execution status: ${row.status}. Automated checklist completed with zero blockers.`,
                  secondaryText: `Assigned Lead: ${row.owner}`,
                  cardTitle: 'Audit Reference Doc #402',
                };
              }
              if (col.id === 'err' && row.errorCheck === 'Error!') {
                return {
                  title: 'Validation Exception',
                  supportingText: 'Missing secondary signature from enterprise governance council.',
                  secondaryText: 'Severity: High Priority',
                  cardTitle: 'Exception Resolution Guidelines',
                };
              }
              return null;
            }}
          />
        </div>
      </div>
    );
  },
};

// 6. Loading Skeleton Story
export const LoadingSkeleton = {
  render: () => (
    <div style={{ width: '100%', height: 'auto', minHeight: 'fit-content', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#2f2f39', flexShrink: 0 }}>
        Full Table Shimmer Loading State
      </h3>
      <div style={{ flex: 1, minHeight: 0 }}>
        <DataTable
          columns={enterpriseColumns}
          loading={true}
          loadingRowCount={6}
        />
      </div>
    </div>
  ),
};

// 7. Dense Layout Story
export const DenseLayout = {
  render: () => (
    <div style={{ width: '100%', height: 'auto', minHeight: 'fit-content', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#2f2f39', flexShrink: 0 }}>
        Compact Density Layout
      </h3>
      <div style={{ flex: 1, minHeight: 0 }}>
        <DataTable
          columns={enterpriseColumns}
          data={enterpriseRows}
          density="dense"
          selectable={true}
        />
      </div>
    </div>
  ),
};

// 8. Pagination and Sorting Story
export const PaginationAndSorting = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 3;

    return (
      <div style={{ width: '100%', height: 'auto', minHeight: 'fit-content', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#2f2f39', flexShrink: 0 }}>
          Interactive Sorting & Pagination
        </h3>
        <div style={{ flex: 1, minHeight: 0 }}>
          <DataTable
            columns={enterpriseColumns}
            data={enterpriseRows}
            selectable={true}
            pagination={{
              page,
              pageSize,
              total: enterpriseRows.length,
              onPageChange: (newPage) => setPage(newPage),
            }}
          />
        </div>
      </div>
    );
  },
};

// 9. Playground Story
export const Playground = {
  args: {
    density: 'default',
    selectable: true,
    loading: false,
    hoverable: true,
  },
  render: (args) => (
    <div style={{ width: '100%', height: 'auto', minHeight: 'fit-content' }}>
      <DataTable
        columns={enterpriseColumns}
        data={enterpriseRows}
        {...args}
      />
    </div>
  ),
};
