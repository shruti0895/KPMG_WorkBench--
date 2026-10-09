import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { TabComponent } from './tab.component';
import { TabItemComponent } from './tab-item.component';

const meta: Meta<TabComponent> = {
  title: 'Components/Tab',
  component: TabComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Tab Component

The **Tab** (Tabs / Tab Bar) component organizes and facilitates navigation between groups of related content that exist at the same level of hierarchy. It helps users switch between different sections or views quickly and efficiently without leaving the current page context.

#### Key Architectural Highlights & 12 Production Variants:
- **2 Canonical Sizes**:
  - \`small\`: Compact height with pill-shaped tabs, designed for inline card navigation, modal dialogs, and dashboard tiles.
  - \`large\`: Full-width application top bar with border divider, left-aligned tab navigation, and right-aligned trailing actions.
- **2 Tab Content Types**:
  - \`default\`: Standard clean text label with optimal internal padding.
  - \`with-badge\`: Text label paired with a circular count badge showing live notifications or item totals.
- **4 Canonical Interaction States**:
  - \`enabled\`: Default resting state with neutral typography and transparent container.
  - \`hovered\`: Interactive hover state featuring subtle lavender tinting (\`--color-primary-surface\`).
  - \`pressed / active\`: Selected state featuring container fill (\`--color-primary-container\`) and high-contrast badge styling.
  - \`disabled\`: Inactive/non-interactive state with muted contrast and pointer lock.
- **Full ARIA & Keyboard Navigation**: Full compliance with WAI-ARIA tablist pattern (\`role="tablist"\`, \`role="tab"\`, \`aria-selected\`, \`aria-disabled\`) with ArrowLeft/ArrowRight, Home, and End keyboard controls.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Tab bar size: small (compact 41px) or large (top app bar 65px)',
      table: {
        type: {
          summary: "'small' | 'large'",
        },
        defaultValue: {
          summary: "'small'",
        },
      },
    },
    items: {
      control: false,
      description: 'Data-driven tab items list',
      table: {
        type: {
          summary: 'object[]',
          detail: '[{\n  id: string | number,\n  value: string | number,\n  label: node,\n  badge: number | string | node,\n  disabled: bool,\n  selected: bool,\n  state: \'enabled\' | \'hovered\' | \'pressed\' | \'disabled\',\n  onClick: func,\n  ariaControls: string\n}]',
        },
      },
    },
    actions: {
      control: false,
      description: 'Custom trailing actions element or renderer for Large Top Bar',
      table: {
        type: {
          summary: 'node',
        },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Show bottom border/divider in large mode',
      table: {
        type: {
          summary: 'bool',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch the tab bar to 100% container width',
      table: {
        type: {
          summary: 'bool',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  decorators: [moduleMetadata({ imports: [TabComponent, TabItemComponent] })],
  args: { size: 'small', bordered: true, fullWidth: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px">
        <kpmg-tab ${argsToTemplate(args)}>
          <kpmg-tab-item tabId="1" label="Tab" />
          <kpmg-tab-item tabId="2" label="Tab" />
          <kpmg-tab-item tabId="3" label="Tab" />
        </kpmg-tab>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<TabComponent>;

const wrap = (inner: string) => `<div style="padding: 24px; background: var(--color-surface)">${inner}</div>`;
const wrapFull = (inner: string) => `<div style="width: 100%; background: var(--color-surface)">${inner}</div>`;

export const SmallDefaultInactive: Story = {
  name: '1. Small - Default - Inactive',
  render: () => ({
    template: wrap(`<kpmg-tab size="small"><kpmg-tab-item tabId="1" label="Tab" state="enabled" /><kpmg-tab-item tabId="2" label="Tab" state="enabled" /><kpmg-tab-item tabId="3" label="Tab" state="enabled" /></kpmg-tab>`),
  }),
};
export const SmallDefaultActive: Story = {
  name: '2. Small - Default - Active (Selected)',
  render: () => ({
    template: wrap(`<kpmg-tab size="small" defaultValue="1"><kpmg-tab-item tabId="1" label="Tab" selected /><kpmg-tab-item tabId="2" label="Tab" /><kpmg-tab-item tabId="3" label="Tab" /></kpmg-tab>`),
  }),
};
export const SmallDefaultHovered: Story = {
  name: '3. Small - Default - Hovered',
  render: () => ({
    template: wrap(`<kpmg-tab size="small"><kpmg-tab-item tabId="1" label="Tab" state="hovered" /><kpmg-tab-item tabId="2" label="Tab" /><kpmg-tab-item tabId="3" label="Tab" /></kpmg-tab>`),
  }),
};
export const SmallDefaultDisabled: Story = {
  name: '4. Small - Default - Disabled',
  render: () => ({
    template: wrap(`<kpmg-tab size="small"><kpmg-tab-item tabId="1" label="Tab" disabled /><kpmg-tab-item tabId="2" label="Tab" disabled /><kpmg-tab-item tabId="3" label="Tab" disabled /></kpmg-tab>`),
  }),
};
export const SmallWithBadgeInactive: Story = {
  name: '5. Small - With Badge - Inactive',
  render: () => ({
    template: wrap(`<kpmg-tab size="small"><kpmg-tab-item tabId="1" label="Tab" badge="4" state="enabled" /><kpmg-tab-item tabId="2" label="Tab" badge="4" state="enabled" /><kpmg-tab-item tabId="3" label="Tab" badge="4" state="enabled" /></kpmg-tab>`),
  }),
};
export const SmallWithBadgeActive: Story = {
  name: '6. Small - With Badge - Active (Selected)',
  render: () => ({
    template: wrap(`<kpmg-tab size="small" defaultValue="1"><kpmg-tab-item tabId="1" label="Tab" badge="4" selected /><kpmg-tab-item tabId="2" label="Tab" badge="4" /><kpmg-tab-item tabId="3" label="Tab" badge="4" /></kpmg-tab>`),
  }),
};
export const SmallWithBadgeHovered: Story = {
  name: '7. Small - With Badge - Hovered',
  render: () => ({
    template: wrap(`<kpmg-tab size="small"><kpmg-tab-item tabId="1" label="Tab" badge="4" state="hovered" /><kpmg-tab-item tabId="2" label="Tab" badge="4" /><kpmg-tab-item tabId="3" label="Tab" badge="4" /></kpmg-tab>`),
  }),
};
export const SmallWithBadgeDisabled: Story = {
  name: '8. Small - With Badge - Disabled',
  render: () => ({
    template: wrap(`<kpmg-tab size="small"><kpmg-tab-item tabId="1" label="Tab" badge="4" disabled /><kpmg-tab-item tabId="2" label="Tab" badge="4" disabled /><kpmg-tab-item tabId="3" label="Tab" badge="4" disabled /></kpmg-tab>`),
  }),
};
export const LargeDefaultWithActions: Story = {
  name: '9. Large - Default - Active with Trailing Actions',
  render: () => ({
    template: wrapFull(`<kpmg-tab size="large" defaultValue="overview"><kpmg-tab-item tabId="overview" label="Overview" /><kpmg-tab-item tabId="analytics" label="Analytics" /><kpmg-tab-item tabId="reports" label="Reports" /><kpmg-tab-item tabId="settings" label="Settings" /></kpmg-tab>`),
  }),
};
export const LargeWithBadgeWithActions: Story = {
  name: '10. Large - With Badge - Active with Trailing Actions',
  render: () => ({
    template: wrapFull(`<kpmg-tab size="large" defaultValue="inbox"><kpmg-tab-item tabId="inbox" label="Inbox" badge="12" /><kpmg-tab-item tabId="assigned" label="Assigned" badge="4" /><kpmg-tab-item tabId="completed" label="Completed" badge="8" /><kpmg-tab-item tabId="archive" label="Archive" /></kpmg-tab>`),
  }),
};
export const LargeCleanNoActions: Story = {
  name: '11. Large - Clean - Without Trailing Actions',
  render: () => ({
    template: wrapFull(`
      <ng-template #none><span></span></ng-template>
      <kpmg-tab size="large" [actions]="none" defaultValue="tab1">
        <kpmg-tab-item tabId="tab1" label="Dashboard" />
        <kpmg-tab-item tabId="tab2" label="Integrations" />
        <kpmg-tab-item tabId="tab3" label="Security" />
        <kpmg-tab-item tabId="tab4" label="Audit Log" />
      </kpmg-tab>
    `),
  }),
};
export const LargeMixedBadgesWithActions: Story = {
  name: '12. Large - Mixed Badges & Interactive Actions',
  render: () => ({
    template: wrapFull(`
      <ng-template #acts>
        <div style="display: flex; gap: 8px; align-items: center">
          <span style="font-size: 13px; color: var(--color-neutral-100)">Actions:</span>
          <button type="button" class="kpmg-tab__action-btn" title="Filter records" (click)="alert('Filter clicked')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          </button>
          <button type="button" class="kpmg-tab__action-btn" title="Download reports" (click)="alert('Export clicked')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </button>
        </div>
      </ng-template>
      <kpmg-tab size="large" defaultValue="all" [actions]="acts">
        <kpmg-tab-item tabId="all" label="All Tasks" badge="28" />
        <kpmg-tab-item tabId="in_review" label="In Review" badge="6" />
        <kpmg-tab-item tabId="pending" label="Pending" badge="3" />
        <kpmg-tab-item tabId="archived" label="Archived" disabled />
      </kpmg-tab>
    `),
    props: { alert: (m: string) => window.alert(m) },
  }),
};

export const AllTwelveVariantsMatrix: Story = {
  name: 'Complete 12-Variant Matrix',
  render: () => ({
    props: {
      variants: [
        { id: 1, title: '1. Small - Default - Inactive', size: 'small', items: [{ label: 'Tab' }, { label: 'Tab' }, { label: 'Tab' }] },
        { id: 2, title: '2. Small - Default - Active', size: 'small', items: [{ label: 'Tab', selected: true }, { label: 'Tab' }, { label: 'Tab' }] },
        { id: 3, title: '3. Small - Default - Hovered', size: 'small', items: [{ label: 'Tab', state: 'hovered' }, { label: 'Tab' }, { label: 'Tab' }] },
        { id: 4, title: '4. Small - Default - Disabled', size: 'small', items: [{ label: 'Tab', disabled: true }, { label: 'Tab', disabled: true }, { label: 'Tab', disabled: true }] },
        { id: 5, title: '5. Small - With Badge - Inactive', size: 'small', items: [{ label: 'Tab', badge: 4 }, { label: 'Tab', badge: 4 }, { label: 'Tab', badge: 4 }] },
        { id: 6, title: '6. Small - With Badge - Active', size: 'small', items: [{ label: 'Tab', badge: 4, selected: true }, { label: 'Tab', badge: 4 }, { label: 'Tab', badge: 4 }] },
        { id: 7, title: '7. Small - With Badge - Hovered', size: 'small', items: [{ label: 'Tab', badge: 4, state: 'hovered' }, { label: 'Tab', badge: 4 }, { label: 'Tab', badge: 4 }] },
        { id: 8, title: '8. Small - With Badge - Disabled', size: 'small', items: [{ label: 'Tab', badge: 4, disabled: true }, { label: 'Tab', badge: 4, disabled: true }, { label: 'Tab', badge: 4, disabled: true }] },
        { id: 9, title: '9. Large - Default - Active with Trailing Actions', size: 'large', items: [{ label: 'Tab', selected: true }, { label: 'Tab' }, { label: 'Tab' }, { label: 'Tab' }] },
        { id: 10, title: '10. Large - With Badge - Active with Trailing Actions', size: 'large', items: [{ label: 'Tab', badge: 4, selected: true }, { label: 'Tab', badge: 4 }, { label: 'Tab', badge: 4 }, { label: 'Tab', badge: 4 }] },
        { id: 11, title: '11. Large - Clean - Without Trailing Actions', size: 'large', clean: true, items: [{ label: 'Tab', selected: true }, { label: 'Tab' }, { label: 'Tab' }, { label: 'Tab' }] },
        { id: 12, title: '12. Large - Mixed Badges - With Trailing Actions', size: 'large', items: [{ label: 'Tab', selected: true }, { label: 'Tab', badge: 8 }, { label: 'Tab', badge: 3 }, { label: 'Tab', disabled: true }] },
      ],
    },
    template: `
      <ng-template #none><span></span></ng-template>
      <div style="display: flex; flex-direction: column; gap: 28px; padding: 16px; background: var(--color-surface)">
        <div style="border-bottom: 1px solid var(--color-neutral-600); padding-bottom: 12px">
          <h2 style="font-size: 18px; font-weight: 600; color: var(--color-on-surface)">Tab Component: All 12 Canonical Variants Matrix</h2>
          <p style="font-size: 14px; color: var(--color-neutral-100); margin-top: 4px">Demonstrating all 12 design system variant configurations with 100% token fidelity.</p>
        </div>
        @for (v of variants; track v.id) {
          <div style="padding: 16px 20px; border-radius: 8px; border: 1px solid var(--color-neutral-500); background-color: var(--color-surface)">
            <div style="font-size: 13px; font-weight: 600; color: var(--color-neutral-100); margin-bottom: 12px">{{ v.title }}</div>
            <kpmg-tab [size]="$any(v.size)" [actions]="v.clean ? none : null" [items]="$any(v.items)" />
          </div>
        }
      </div>
    `,
  }),
};



export const InteractiveTabbedPanels: Story = {
  name: 'Interactive Live Panel Navigation',
  render: () => ({
    props: { active: 'summary', alert: (m: string) => window.alert(m) },
    template: `
      <ng-template #acts>
        <div style="display: flex; gap: 8px">
          <button type="button" class="kpmg-tab__action-btn" title="Refresh data" (click)="alert('Data refreshed')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          </button>
        </div>
      </ng-template>
      <div style="border: 1px solid var(--color-neutral-500); border-radius: 12px; overflow: hidden; background: var(--color-surface)">
        <kpmg-tab size="large" [(value)]="active" [actions]="acts">
          <kpmg-tab-item tabId="summary" label="Summary" badge="3" ariaControls="panel-summary" />
          <kpmg-tab-item tabId="transactions" label="Transactions" badge="142" ariaControls="panel-transactions" />
          <kpmg-tab-item tabId="analytics" label="Analytics" ariaControls="panel-analytics" />
          <kpmg-tab-item tabId="settings" label="Settings" ariaControls="panel-settings" />
        </kpmg-tab>
        <div style="padding: 24px">
          @if (active === 'summary') {
            <div id="panel-summary" role="tabpanel">
              <h3 style="font-size: 16px; font-weight: 600; color: var(--color-on-surface)">Executive Summary</h3>
              <p style="font-size: 14px; color: var(--color-neutral-100); margin-top: 8px">Active project portfolio consists of 3 high-priority initiatives nearing completion.</p>
            </div>
          }
          @if (active === 'transactions') {
            <div id="panel-transactions" role="tabpanel">
              <h3 style="font-size: 16px; font-weight: 600; color: var(--color-on-surface)">Recent Transactions</h3>
              <p style="font-size: 14px; color: var(--color-neutral-100); margin-top: 8px">142 verified transactions processed within the current billing cycle.</p>
            </div>
          }
          @if (active === 'analytics') {
            <div id="panel-analytics" role="tabpanel">
              <h3 style="font-size: 16px; font-weight: 600; color: var(--color-on-surface)">Predictive Analytics</h3>
              <p style="font-size: 14px; color: var(--color-neutral-100); margin-top: 8px">AI-driven workload optimization shows a 24.8% efficiency gain across workstreams.</p>
            </div>
          }
          @if (active === 'settings') {
            <div id="panel-settings" role="tabpanel">
              <h3 style="font-size: 16px; font-weight: 600; color: var(--color-on-surface)">Workspace Settings</h3>
              <p style="font-size: 14px; color: var(--color-neutral-100); margin-top: 8px">Manage team permissions, webhook endpoints, and notification preferences.</p>
            </div>
          }
        </div>
      </div>
    `,
  }),
};
