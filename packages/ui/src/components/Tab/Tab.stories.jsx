import React, { useState } from 'react';
import { Tab, TabItem } from './Tab';

export default {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
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
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Tab bar size: small (compact 41px) or large (top app bar 65px)',
    },
    bordered: {
      control: 'boolean',
      description: 'Show bottom border/divider in large mode',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch the tab bar to 100% container width',
    },
  },
};

// ----------------------------------------------------------------------------
// 1. Small Variants (Default & With Badge across States)
// ----------------------------------------------------------------------------

export const SmallDefaultInactive = {
  name: '1. Small - Default - Inactive',
  render: () => (
    <div style={{ padding: '24px', background: 'var(--color-surface)' }}>
      <Tab size="small">
        <TabItem id="1" label="Tab" state="enabled" />
        <TabItem id="2" label="Tab" state="enabled" />
        <TabItem id="3" label="Tab" state="enabled" />
      </Tab>
    </div>
  ),
};

export const SmallDefaultActive = {
  name: '2. Small - Default - Active (Selected)',
  render: () => (
    <div style={{ padding: '24px', background: 'var(--color-surface)' }}>
      <Tab size="small" defaultValue="1">
        <TabItem id="1" label="Tab" selected />
        <TabItem id="2" label="Tab" />
        <TabItem id="3" label="Tab" />
      </Tab>
    </div>
  ),
};

export const SmallDefaultHovered = {
  name: '3. Small - Default - Hovered',
  render: () => (
    <div style={{ padding: '24px', background: 'var(--color-surface)' }}>
      <Tab size="small">
        <TabItem id="1" label="Tab" state="hovered" />
        <TabItem id="2" label="Tab" />
        <TabItem id="3" label="Tab" />
      </Tab>
    </div>
  ),
};

export const SmallDefaultDisabled = {
  name: '4. Small - Default - Disabled',
  render: () => (
    <div style={{ padding: '24px', background: 'var(--color-surface)' }}>
      <Tab size="small">
        <TabItem id="1" label="Tab" disabled />
        <TabItem id="2" label="Tab" disabled />
        <TabItem id="3" label="Tab" disabled />
      </Tab>
    </div>
  ),
};

export const SmallWithBadgeInactive = {
  name: '5. Small - With Badge - Inactive',
  render: () => (
    <div style={{ padding: '24px', background: 'var(--color-surface)' }}>
      <Tab size="small">
        <TabItem id="1" label="Tab" badge="4" state="enabled" />
        <TabItem id="2" label="Tab" badge="4" state="enabled" />
        <TabItem id="3" label="Tab" badge="4" state="enabled" />
      </Tab>
    </div>
  ),
};

export const SmallWithBadgeActive = {
  name: '6. Small - With Badge - Active (Selected)',
  render: () => (
    <div style={{ padding: '24px', background: 'var(--color-surface)' }}>
      <Tab size="small" defaultValue="1">
        <TabItem id="1" label="Tab" badge="4" selected />
        <TabItem id="2" label="Tab" badge="4" />
        <TabItem id="3" label="Tab" badge="4" />
      </Tab>
    </div>
  ),
};

export const SmallWithBadgeHovered = {
  name: '7. Small - With Badge - Hovered',
  render: () => (
    <div style={{ padding: '24px', background: 'var(--color-surface)' }}>
      <Tab size="small">
        <TabItem id="1" label="Tab" badge="4" state="hovered" />
        <TabItem id="2" label="Tab" badge="4" />
        <TabItem id="3" label="Tab" badge="4" />
      </Tab>
    </div>
  ),
};

export const SmallWithBadgeDisabled = {
  name: '8. Small - With Badge - Disabled',
  render: () => (
    <div style={{ padding: '24px', background: 'var(--color-surface)' }}>
      <Tab size="small">
        <TabItem id="1" label="Tab" badge="4" disabled />
        <TabItem id="2" label="Tab" badge="4" disabled />
        <TabItem id="3" label="Tab" badge="4" disabled />
      </Tab>
    </div>
  ),
};

// ----------------------------------------------------------------------------
// 2. Large Variants (App Bar with Trailing Actions & Badges)
// ----------------------------------------------------------------------------

export const LargeDefaultWithActions = {
  name: '9. Large - Default - Active with Trailing Actions',
  render: () => (
    <div style={{ width: '100%', background: 'var(--color-surface)' }}>
      <Tab size="large" defaultValue="overview">
        <TabItem id="overview" label="Overview" />
        <TabItem id="analytics" label="Analytics" />
        <TabItem id="reports" label="Reports" />
        <TabItem id="settings" label="Settings" />
      </Tab>
    </div>
  ),
};

export const LargeWithBadgeWithActions = {
  name: '10. Large - With Badge - Active with Trailing Actions',
  render: () => (
    <div style={{ width: '100%', background: 'var(--color-surface)' }}>
      <Tab size="large" defaultValue="inbox">
        <TabItem id="inbox" label="Inbox" badge="12" />
        <TabItem id="assigned" label="Assigned" badge="4" />
        <TabItem id="completed" label="Completed" badge="8" />
        <TabItem id="archive" label="Archive" />
      </Tab>
    </div>
  ),
};

export const LargeCleanNoActions = {
  name: '11. Large - Clean - Without Trailing Actions',
  render: () => (
    <div style={{ width: '100%', background: 'var(--color-surface)' }}>
      <Tab size="large" actions={<span />} defaultValue="tab1">
        <TabItem id="tab1" label="Dashboard" />
        <TabItem id="tab2" label="Integrations" />
        <TabItem id="tab3" label="Security" />
        <TabItem id="tab4" label="Audit Log" />
      </Tab>
    </div>
  ),
};

export const LargeMixedBadgesWithActions = {
  name: '12. Large - Mixed Badges & Interactive Actions',
  render: () => (
    <div style={{ width: '100%', background: 'var(--color-surface)' }}>
      <Tab
        size="large"
        defaultValue="all"
        actions={
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-neutral-100)' }}>Actions:</span>
            <button
              type="button"
              className="kpmg-tab__action-btn"
              title="Filter records"
              onClick={() => alert('Filter clicked')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
            <button
              type="button"
              className="kpmg-tab__action-btn"
              title="Download reports"
              onClick={() => alert('Export clicked')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        }
      >
        <TabItem id="all" label="All Tasks" badge="28" />
        <TabItem id="in_review" label="In Review" badge="6" />
        <TabItem id="pending" label="Pending" badge="3" />
        <TabItem id="archived" label="Archived" disabled />
      </Tab>
    </div>
  ),
};

// ----------------------------------------------------------------------------
// 3. Complete 12-Variant Matrix Showcase
// ----------------------------------------------------------------------------

export const AllTwelveVariantsMatrix = {
  name: 'Complete 12-Variant Matrix',
  render: () => {
    const variants = [
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
      { id: 11, title: '11. Large - Clean - Without Trailing Actions', size: 'large', actions: <span />, items: [{ label: 'Tab', selected: true }, { label: 'Tab' }, { label: 'Tab' }, { label: 'Tab' }] },
      { id: 12, title: '12. Large - Mixed Badges - With Trailing Actions', size: 'large', items: [{ label: 'Tab', selected: true }, { label: 'Tab', badge: 8 }, { label: 'Tab', badge: 3 }, { label: 'Tab', disabled: true }] },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px', background: 'var(--color-surface)' }}>
        <div style={{ borderBottom: '1px solid var(--color-neutral-600)', paddingBottom: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
            Tab Component: All 12 Canonical Variants Matrix
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)', marginTop: '4px' }}>
            Demonstrating all 12 design system variant configurations with 100% token fidelity.
          </p>
        </div>

        {variants.map((v) => (
          <div
            key={v.id}
            style={{
              padding: '16px 20px',
              borderRadius: '8px',
              border: '1px solid var(--color-neutral-500)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '12px' }}>
              {v.title}
            </div>
            <Tab
              size={v.size}
              actions={v.actions}
              items={v.items}
            />
          </div>
        ))}
      </div>
    );
  },
};

// ----------------------------------------------------------------------------
// 4. Live Interactive Panel Navigation Demo
// ----------------------------------------------------------------------------

export const InteractiveTabbedPanels = {
  name: 'Interactive Live Panel Navigation',
  render: () => {
    const [activeTab, setActiveTab] = useState('summary');

    return (
      <div style={{ border: '1px solid var(--color-neutral-500)', borderRadius: '12px', overflow: 'hidden', background: 'var(--color-surface)' }}>
        <Tab
          size="large"
          value={activeTab}
          onChange={(tabId) => setActiveTab(tabId)}
          actions={
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="kpmg-tab__action-btn"
                title="Refresh data"
                onClick={() => alert('Data refreshed')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6"></path>
                  <path d="M1 20v-6h6"></path>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
              </button>
            </div>
          }
        >
          <TabItem id="summary" label="Summary" badge="3" aria-controls="panel-summary" />
          <TabItem id="transactions" label="Transactions" badge="142" aria-controls="panel-transactions" />
          <TabItem id="analytics" label="Analytics" aria-controls="panel-analytics" />
          <TabItem id="settings" label="Settings" aria-controls="panel-settings" />
        </Tab>

        <div style={{ padding: '24px' }}>
          {activeTab === 'summary' && (
            <div id="panel-summary" role="tabpanel">
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Executive Summary</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)', marginTop: '8px' }}>
                Active project portfolio consists of 3 high-priority initiatives nearing completion.
              </p>
            </div>
          )}
          {activeTab === 'transactions' && (
            <div id="panel-transactions" role="tabpanel">
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Recent Transactions</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)', marginTop: '8px' }}>
                142 verified transactions processed within the current billing cycle.
              </p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div id="panel-analytics" role="tabpanel">
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Predictive Analytics</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)', marginTop: '8px' }}>
                AI-driven workload optimization shows a 24.8% efficiency gain across workstreams.
              </p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div id="panel-settings" role="tabpanel">
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Workspace Settings</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)', marginTop: '8px' }}>
                Manage team permissions, webhook endpoints, and notification preferences.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
};
