import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { TabComponent } from './tab.component';
import { TabItemComponent } from './tab-item.component';

const meta: Meta<TabComponent> = {
  title: 'Components/Tab',
  component: TabComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [TabComponent, TabItemComponent] })],
  args: { size: 'small', bordered: true, fullWidth: false },
  argTypes: {
    size: { control: 'select', options: ['small', 'large'] },
    bordered: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    items: { control: false },
    actions: { control: false },
  },
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

const wrap = (inner: string) => `<div style="padding: 24px">${inner}</div>`;

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
  name: '9. Large - Default - With Actions',
  render: () => ({
    template: `<kpmg-tab size="large" defaultValue="overview"><kpmg-tab-item tabId="overview" label="Overview" /><kpmg-tab-item tabId="analytics" label="Analytics" /><kpmg-tab-item tabId="reports" label="Reports" /></kpmg-tab>`,
  }),
};
export const LargeWithBadgeWithActions: Story = {
  name: '10. Large - With Badge - With Actions',
  render: () => ({
    template: `<kpmg-tab size="large" defaultValue="inbox"><kpmg-tab-item tabId="inbox" label="Inbox" badge="12" /><kpmg-tab-item tabId="sent" label="Sent" badge="3" /><kpmg-tab-item tabId="drafts" label="Drafts" /></kpmg-tab>`,
  }),
};
export const LargeCleanNoActions: Story = {
  name: '11. Large - Clean',
  render: () => ({
    template: `
      <kpmg-tab size="large" defaultValue="tab1">
        <kpmg-tab-item tabId="tab1" label="Dashboard" />
        <kpmg-tab-item tabId="tab2" label="Integrations" />
        <kpmg-tab-item tabId="tab3" label="Security" />
        <kpmg-tab-item tabId="tab4" label="Audit Log" />
      </kpmg-tab>
    `,
  }),
};
export const LargeMixedBadgesWithActions: Story = {
  name: '12. Large - Mixed Badges & Interactive Actions',
  render: () => ({
    template: `
      <ng-template #acts>
        <div style="display: flex; gap: 8px; align-items: center">
          <span style="font-size: 13px">Actions:</span>
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
    `,
    props: { alert: (m: string) => window.alert(m) },
  }),
};

export const DataDriven: Story = {
  render: () => ({
    props: {
      items: [
        { id: 'a', label: 'Overview' },
        { id: 'b', label: 'Tasks', badge: 7 },
        { id: 'c', label: 'Archived', disabled: true },
      ],
    },
    template: wrap(`<kpmg-tab [items]="items" />`),
  }),
};

export const InteractiveTabbedPanels: Story = {
  render: () => ({
    props: { active: 'overview' },
    template: wrap(`
      <kpmg-tab size="small" [(value)]="active">
        <kpmg-tab-item tabId="overview" label="Overview" ariaControls="panel-overview" />
        <kpmg-tab-item tabId="activity" label="Activity" badge="5" ariaControls="panel-activity" />
        <kpmg-tab-item tabId="settings" label="Settings" ariaControls="panel-settings" />
      </kpmg-tab>
      <div style="padding: 16px" role="tabpanel">Active panel: <strong>{{ active }}</strong></div>
    `),
  }),
};
