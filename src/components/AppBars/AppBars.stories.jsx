import React, { useState } from 'react';
import {
  AppBars,
  AppBarFull,
  AppBarNested,
  AppBarSpecial,
  AppBarStatusItem,
  BottomAppBar,
  BottomAppBarsText,
  BottomAppBarsVoice,
  ChatDockedUI,
} from './AppBars';
import { FigmaWorkbenchExample } from './FigmaWorkbenchExample';

export default {
  title: 'Components/AppBars',
  component: AppBars,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - App Bars Component Family

The **AppBars** component family provides header navigation, search bars, contextual actions, and bottom search/voice bars across all WorkBench workspaces.
Designed according to canonical KPMG Design System 2026 specifications:

- **Top App Bars Full**:
  - \`Default\` : Brand pill popover trigger, breadcrumbs navigation, assistant robot, notification bell, overflow menu, and avatar.
  - \`With Action\` : Primary bar + secondary action container for actions like Save, Submit, and Cancel.
- **Top App Bars Nested**:
  - \`Small\`: Compact view with back button, page title, status badge, and utility icons.
  - \`Large\` : Hero header with subheader category, display title, filter chips, and card layout slot.
  - States: \`Default\` (white surface) and \`Filled\` (subtle container background).
- **Top App Bars Special**:
  - \`Extra small\`  & \`Small\`  with integrated search input.
  - \`Large\`  with welcome greeting, filter chips, and prominent search bar.
- **Bottom App Bars (All Canonical Variants)**:
  - \`Default\` : Search pill with attach filepicker, input, mic, and send.
  - \`With verification\` : Adds KPMG Trusted AI verification footnote.
  - \`With project\` : Includes working project dropdown selector.
  - \`With button\` : Includes contextual action pill button.
  - \`With project and button\` : Combines project selector and action button.
  - \`With prompts\` : Horizontal scrollable suggestion chips row.
- **Voice Modes**:
  - Active pulsing gradient vs Muted gradient with mute toggle.
- **Docked Chat & Voice Panels**:
  - Expandable panel with header drag handle, multi-turn chat stream or audio equalizer transcript, with bottom app bar docked.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      name: 'variant',
      description: 'Primary app bar category variant (Figma component family)',
      control: 'select',
      options: ['full', 'nested', 'special', 'bottom', 'bottom-docked'],
      table: {
        type: { summary: "'full' | 'nested' | 'special' | 'bottom' | 'bottom-docked'" },
        defaultValue: { summary: "'full'" },
      },
    },
    type: {
      name: 'type',
      description: 'Bar layout type (used by "full" variant: "default" 64px or "with-action" 128px)',
      control: 'select',
      options: ['default', 'with-action'],
      table: {
        type: { summary: "'default' | 'with-action'" },
        defaultValue: { summary: "'default'" },
      },
    },
    size: {
      name: 'size',
      description: 'Size scale (used by "nested": "small" | "large"; "special": "extra-small" | "small" | "large")',
      control: 'select',
      options: ['extra-small', 'small', 'large'],
      table: {
        type: { summary: "'extra-small' | 'small' | 'large'" },
        defaultValue: { summary: "'small'" },
      },
    },
    state: {
      name: 'state',
      description: 'Visual state across nested ("default" | "filled"), bottom ("default" | "with-verification" | "with-project" | "with-button" | "with-project-and-button" | "with-prompts"), and voice ("listening" | "muted")',
      control: 'select',
      options: [
        'default',
        'filled',
        'with-verification',
        'with-project',
        'with-button',
        'with-project-and-button',
        'with-prompts',
        'listening',
        'muted',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'default'" },
      },
    },
    brandLabel: {
      name: 'brandLabel',
      description: 'Brand wordmark or label in primary header',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'KPMG'" },
      },
    },
    breadcrumbs: {
      name: 'breadcrumbs',
      description: 'Breadcrumb trail items (array of route strings or item objects)',
      control: 'object',
      table: {
        type: { summary: 'Array<string | object>' },
      },
    },
    showBreadcrumbs: {
      name: 'showBreadcrumbs',
      description: 'Toggle breadcrumbs hierarchy vs single page title mode',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    pageTitle: {
      name: 'pageTitle',
      description: 'Page title displayed when breadcrumbs are hidden or in compact nested view',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      name: 'title',
      description: 'Display title in nested hero bar',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    subheader: {
      name: 'subheader',
      description: 'Subheader category label displayed above nested hero title',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    statusType: {
      name: 'statusType',
      description: 'Status badge type in nested bars',
      control: 'select',
      options: ['configuring', 'completed', 'saved', 'reviewed'],
      table: {
        type: { summary: "'configuring' | 'completed' | 'saved' | 'reviewed'" },
        defaultValue: { summary: "'configuring'" },
      },
    },
    statusProgress: {
      name: 'statusProgress',
      description: 'Linear progress percentage for "configuring" status (0-100)',
      control: { type: 'range', min: 0, max: 100, step: 5 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '60' },
      },
    },
    greeting: {
      name: 'greeting',
      description: 'Personalized dashboard greeting text',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Greeting, name'" },
      },
    },
    welcomeHeader: {
      name: 'welcomeHeader',
      description: 'Hero display welcome title in special bar',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Welcome'" },
      },
    },
    placeholder: {
      name: 'placeholder',
      description: 'Search/prompt input placeholder text across special and bottom bars',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Ask me anything'" },
      },
    },
    withSearch: {
      name: 'withSearch',
      description: 'Whether search pill is visible in special landing bar',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    filterChips: {
      name: 'filterChips',
      description: 'Category or project filter pill tags',
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    enableMic: {
      name: 'enableMic',
      description: 'Enables or disables microphone voice input button',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    enableAttach: {
      name: 'enableAttach',
      description: 'Enables or disables file attachment button',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    buttonLabel: {
      name: 'buttonLabel',
      description: 'Contextual action button label in bottom app bar',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Review Changes'" },
      },
    },
    projectLabel: {
      name: 'projectLabel',
      description: 'Working project headline in bottom app bar project selector',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Working on project headline'" },
      },
    },
    mode: {
      name: 'mode',
      description: 'Bottom app bar or docked panel mode',
      control: 'inline-radio',
      options: ['text', 'voice'],
      table: {
        type: { summary: "'text' | 'voice'" },
        defaultValue: { summary: "'text'" },
      },
    },
    isMuted: {
      name: 'isMuted',
      description: 'Mute toggle state for voice mode',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isOpen: {
      name: 'isOpen',
      description: 'Expanded/collapsed state for docked chat/voice panel',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      name: 'className',
      description: 'Additional custom CSS classes',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

/* ==========================================================================
   INTERACTIVE BASIC STORY (With full Props & Controls table at top)
   ========================================================================== */
export const Basic = {
  name: 'Basic',
  args: {
    variant: 'full',
    type: 'default',
    brandLabel: 'KPMG',
    breadcrumbs: ['WorkBench', 'Enterprise Projects', 'Q3 Analytics'],
    showBreadcrumbs: true,
    pageTitle: '',
    title: 'Global Governance Oversight',
    subheader: 'Advisory Practice / Risk & Compliance',
    statusType: 'configuring',
    statusProgress: 60,
    greeting: 'Greeting, name',
    welcomeHeader: 'Welcome',
    placeholder: 'Ask me anything',
    withSearch: true,
    filterChips: ['Project tag', 'Project tag', 'Project tag'],
    enableMic: true,
    enableAttach: true,
    buttonLabel: 'Review Changes',
    projectLabel: 'Working on project headline',
    mode: 'text',
    isMuted: false,
    isOpen: true,
  },
  render: (args) => <AppBars {...args} />,
};


/* Mock Content Cards for Large Hero Views */
const SampleCardsRow = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '12px' }}>
    {['Financial Audit Model', 'Risk Analysis Engine', 'Tax Compliance Portal', 'Advisory Data Stream'].map((card, i) => (
      <div
        key={i}
        style={{
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--color-neutral-400, #c7c7d1)',
          backgroundColor: 'var(--color-surface, #ffffff)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-neutral-200, #9090a2)', fontWeight: 600 }}>
          Project {i + 1}
        </span>
        <h4 style={{ margin: '6px 0 8px 0', fontSize: '15px', color: 'var(--color-neutral-000, #2f2f39)' }}>
          {card}
        </h4>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-neutral-100, #454554)' }}>
          Active enterprise pipeline with verified audit trails.
        </p>
      </div>
    ))}
  </div>
);

/* ==========================================================================
   1. ALL VARIANTS GALLERY
   ========================================================================== */

export const AllVariantsGallery = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', color: 'var(--color-neutral-000, #2f2f39)' }}>
          1. Top App Bars Full
        </h2>
        <p style={{ marginBottom: '16px', color: 'var(--color-neutral-200, #9090a2)', fontSize: '14px' }}>
          Standard primary header bar in Default  and With Action  states.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant: Full - Default with Reused Breadcrumbs & Figma Slash Forward
            </span>
            <AppBarFull
              brandLabel="KPMG"
              breadcrumbs={['WorkBench', 'Enterprise Projects', 'Q3 Analytics']}
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant: Full - Collapsible Multi-Level Breadcrumbs with Dropdown Menu Card
            </span>
            <AppBarFull
              brandLabel="KPMG"
              breadcrumbs={[
                { id: '1', label: 'WorkBench', href: '#' },
                { id: '2', label: 'Enterprise Division', href: '#', useCircleCheckbox: true, isChecked: true },
                { id: '3', label: 'Global Advisory', href: '#', isStar: true },
                { id: '4', label: 'Fiscal 2026', isCurrent: true },
              ]}
              breadcrumbProps={{ maxItems: 3 }}
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant: Full - Single Page Title Mode with Chevron Forward
            </span>
            <AppBarFull
              brandLabel="KPMG"
              showBreadcrumbs={false}
              pageTitle="Workbench"
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant: Full - With Action
            </span>
            <AppBarFull
              type="with-action"
              brandLabel="KPMG"
              breadcrumbs={['WorkBench', 'Model Configuration']}
              actionButtonSecondary="Discard Changes"
              actionButtonLabel="Deploy Model"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', color: 'var(--color-neutral-000, #2f2f39)' }}>
          2. Top App Bars Nested
        </h2>
        <p style={{ marginBottom: '16px', color: 'var(--color-neutral-200, #9090a2)', fontSize: '14px' }}>
          Contextual app bar for workspaces, file views, and drill-down pages.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant: Nested Small - Default State with Configuring Progress Badge
            </span>
            <AppBarNested
              size="small"
              state="default"
              title="Audit_Pipeline_v2.0"
              statusType="configuring"
              statusProgress={35}
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant: Nested Small - Filled State with Completed Status
            </span>
            <AppBarNested
              size="small"
              state="filled"
              title="Quarterly_Tax_Reconciliation_2026"
              statusType="completed"
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant: Nested Large - Default State with Reused Breadcrumbs & Figma SVGs
            </span>
            <AppBarNested
              size="large"
              state="default"
              breadcrumbs={['Subheader', 'Subheader']}
              title="Header"
              filterChips={['All Frameworks', 'Active Reviews', 'Drafts', 'Archived']}
            >
              <SampleCardsRow />
            </AppBarNested>
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant: Nested Large - Filled State with Multi-Level Breadcrumbs            </span>
            <AppBarNested
              size="large"
              state="filled"
              breadcrumbs={['Advisory Practice', 'Risk & Compliance', 'Governance']}
              title="Global Governance Oversight"
              filterChips={['Overview', 'Controls', 'Exceptions', 'Audit Log']}
            >
              <SampleCardsRow />
            </AppBarNested>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', color: 'var(--color-neutral-000, #2f2f39)' }}>
          3. Top App Bars Special (Dashboard & Search)
        </h2>
        <p style={{ marginBottom: '16px', color: 'var(--color-neutral-200, #9090a2)', fontSize: '14px' }}>
          Portal dashboard headers with personalized greetings and search capabilities.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>

            </span>
            <AppBarSpecial
              size="extra-small"
              greeting="Greeting, name"
              searchPlaceholder="Ask me anything"
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>

            </span>
            <AppBarSpecial
              size="small"
              greeting="Greeting, name"
              searchPlaceholder="Ask me anything"
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant 3: Size=Large, With search=False
            </span>
            <AppBarSpecial
              size="large"
              withSearch={false}
              greeting="Greeting, name"
              welcomeHeader="Welcome"
              filterChips={['Project tag', 'Project tag', 'Project tag']}
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100, #454554)' }}>
              Variant 4: Size=Large, With search=True
            </span>
            <AppBarSpecial
              size="large"
              withSearch={true}
              greeting="Greeting, name"
              welcomeHeader="Welcome"
              searchPlaceholder="Ask me anything"
              filterChips={['Project tag', 'Project tag', 'Project tag']}
            />
          </div>
        </div>
      </div>


      <div>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', color: 'var(--color-neutral-000, #2f2f39)' }}>
          5. Top App Bar Items (Status Badges)
        </h2>
        <p style={{ marginBottom: '16px', color: 'var(--color-neutral-200, #9090a2)', fontSize: '14px' }}>
          Status and progress badges used across nested navigation bars.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
          <AppBarStatusItem type="configuring" progress={30} />
          <AppBarStatusItem type="configuring" progress={75} />
          <AppBarStatusItem type="completed" />
          <AppBarStatusItem type="saved" />
          <AppBarStatusItem type="reviewed" />
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   2. INDIVIDUAL CANONICAL STORIES
   ========================================================================== */

export const FullDefault = () => (
  <AppBarFull
    brandLabel="KPMG"
    breadcrumbs={['WorkBench', 'Advisory', 'Engagement Q4']}
    onBrandClick={() => alert('Brand menu toggled')}
    onAssistantClick={() => alert('Assistant toggled')}
    onNotificationsClick={() => alert('Notifications clicked')}
    onOverflowClick={() => alert('Overflow menu clicked')}
  />
);
FullDefault.storyName = 'Full - Default (64px)';

export const FullWithAction = () => (
  <AppBarFull
    type="with-action"
    brandLabel="KPMG"
    breadcrumbs={['WorkBench', 'Risk Matrix', 'Edit Configuration']}
    actionButtonSecondary="Cancel"
    actionButtonLabel="Save Changes"
    onActionClick={() => alert('Changes saved')}
    onSecondaryActionClick={() => alert('Action cancelled')}
  />
);
FullWithAction.storyName = 'Full - With Action (128px)';

export const FullWithCollapsibleBreadcrumbs = () => {
  const items = [
    { id: '1', label: 'WorkBench', href: '#' },
    { id: '2', label: 'Advisory Practice', href: '#', useCircleCheckbox: true, isChecked: true },
    { id: '3', label: 'Risk & Strategy', href: '#', isStar: true, hasDivider: true },
    { id: '4', label: 'Financial Models', href: '#', isStar: false },
    { id: '5', label: 'Model Portfolio 2026', isCurrent: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--color-neutral-100)' }}>
          Collapsed Breadcrumbs with Dropdown (Click ... to open card with circle checkbox & star bookmarks)
        </h4>
        <AppBarFull
          brandLabel="KPMG"
          breadcrumbs={items}
          breadcrumbProps={{ maxItems: 3, itemsAfterCollapse: 1 }}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--color-neutral-100)' }}>
          Single Page Title Mode with Chevron Forward Separator
        </h4>
        <AppBarFull
          brandLabel="KPMG"
          showBreadcrumbs={false}
          pageTitle="Workbench"
        />
      </div>
    </div>
  );
};
FullWithCollapsibleBreadcrumbs.storyName = 'Full - Breadcrumbs Interactive & Page Title';

export const NestedSmall = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <AppBarNested
      size="small"
      state="default"
      title="Compliance_Model_v3.4"
      statusType="configuring"
      statusProgress={45}
      onBackClick={() => alert('Back clicked')}
    />
    <AppBarNested
      size="small"
      state="filled"
      title="Global_Risk_Register"
      statusType="completed"
      onBackClick={() => alert('Back clicked')}
    />
    <AppBarNested
      size="small"
      state="default"
      title="Statutory_Financials_Draft"
      statusType="saved"
      onBackClick={() => alert('Back clicked')}
    />
  </div>
);
NestedSmall.storyName = 'Nested - Small';

export const NestedLargeDefault = () => (
  <AppBarNested
    size="large"
    state="default"
    breadcrumbs={['Subheader', 'Subheader']}
    title="Header"
    filterChips={['All Assets', 'Active Engagements', 'Pending Review', 'Completed']}
    onSpeakerClick={() => alert('Speaker audio clicked')}
    onBookmarkClick={() => alert('Bookmark clicked')}
    onShareClick={() => alert('Share clicked')}
  >
    <SampleCardsRow />
  </AppBarNested>
);
NestedLargeDefault.storyName = 'Nested - Large Default (472px with Breadcrumbs)';

export const NestedLargeFilled = () => (
  <AppBarNested
    size="large"
    state="filled"
    breadcrumbs={['Audit Practice', 'Assurance Controls', 'Automated Papers']}
    title="Automated Working Papers"
    filterChips={['Worksheets', 'Supporting Evidence', 'Sign-offs', 'Archive']}
  >
    <SampleCardsRow />
  </AppBarNested>
);
NestedLargeFilled.storyName = 'Nested - Large Filled (472px)';

export const NestedWithBreadcrumbs = () => {
  const items = [
    { id: '1', label: 'WorkBench', href: '#' },
    { id: '2', label: 'Enterprise Division', href: '#' },
    { id: '3', label: 'Risk & Strategy', href: '#' },
    { id: '4', label: 'Global Advisory', isCurrent: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--color-neutral-100)' }}>
          Nested Large with Reused Breadcrumbs & Slash Forward Separator
        </h4>
        <AppBarNested
          size="large"
          state="default"
          breadcrumbs={items}
          title="Enterprise Risk Framework 2026"
          filterChips={['All Frameworks', 'Active Reviews', 'Drafts', 'Archived']}
        >
          <SampleCardsRow />
        </AppBarNested>
      </div>

      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--color-neutral-100)' }}>
          Nested Small with Top Bar Breadcrumb Trail
        </h4>
        <AppBarNested
          size="small"
          state="default"
          topBreadcrumbs={['WorkBench', 'Risk Management', 'Compliance Matrix']}
          statusType="configuring"
          statusProgress={60}
        />
      </div>
    </div>
  );
};
NestedWithBreadcrumbs.storyName = 'Nested - Reused Breadcrumbs Integration';

export const SpecialExtraSmall = () => (
  <AppBarSpecial
    size="extra-small"
    greeting="Greeting, name"
    searchPlaceholder="Ask me anything"
    onSearchSubmit={(val) => alert(`Searching for: ${val}`)}
  />
);
SpecialExtraSmall.storyName = 'Special - Size=Extra small, With search=Default';

export const SpecialSmall = () => (
  <AppBarSpecial
    size="small"
    greeting="Greeting, name"
    searchPlaceholder="Ask me anything"
    onSearchSubmit={(val) => alert(`Searching for: ${val}`)}
  />
);
SpecialSmall.storyName = 'Special - Size=Small, With search=Default';

export const SpecialLargeWithoutSearch = () => (
  <AppBarSpecial
    size="large"
    withSearch={false}
    greeting="Greeting, name"
    welcomeHeader="Welcome"
    filterChips={['Project tag', 'Project tag', 'Project tag']}
  />
);
SpecialLargeWithoutSearch.storyName = 'Special - Size=Large, With search=False';

export const SpecialLargeWithSearch = () => (
  <AppBarSpecial
    size="large"
    withSearch={true}
    greeting="Greeting, name"
    welcomeHeader="Welcome"
    searchPlaceholder="Ask me anything"
    filterChips={['Project tag', 'Project tag', 'Project tag']}
  />
);
SpecialLargeWithSearch.storyName = 'Special - Size=Large, With search=True';

// export const SpecialSearchPills = () => (
//   <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '32px', backgroundColor: 'var(--color-neutral-800, #f7f7f8)', borderRadius: '12px' }}>
//     <div>
//       <span style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>
//         Small AI Search Pill (400px x 40px)
//       </span>
//       <AppBarSearchPill
//         size="small"
//         placeholder="Ask me anything"
//         onSubmit={(val) => alert(`Query: ${val}`)}
//       />
//     </div>
//     <div>
//       <span style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>
//         Large AI Search Pill (711px x 68px)
//       </span>
//       <AppBarSearchPill
//         size="large"
//         placeholder="Ask me anything"
//         onSubmit={(val) => alert(`Query: ${val}`)}
//       />
//     </div>
//   </div>
// );
// SpecialSearchPills.storyName = 'Special - AI Search Pills (Small & Large)';


export const StatusItems = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
    <AppBarStatusItem type="configuring" progress={20} />
    <AppBarStatusItem type="configuring" progress={50} />
    <AppBarStatusItem type="configuring" progress={90} />
    <AppBarStatusItem type="completed" />
    <AppBarStatusItem type="saved" />
    <AppBarStatusItem type="reviewed" />
  </div>
);
StatusItems.storyName = 'Status Items (Badges)';

export const FigmaFullLayoutExample = () => (
  <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px' }}>
    <FigmaWorkbenchExample />
  </div>
);
FigmaFullLayoutExample.storyName = 'Examples of using Appbars ';

/* ==========================================================================
   FIGMA SCREEN NODE 964:15496 - BOTTOM APP BARS STORIES
   ========================================================================== */

export const BottomAppBarAllTextStates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', backgroundColor: '#f9f9fb', borderRadius: '12px' }}>
    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
        Default
      </h3>
      <BottomAppBarsText state="default" placeholder="Ask me anything" />
    </div>

    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
        With verification
      </h3>
      <BottomAppBarsText state="with-verification" placeholder="Ask me anything" />
    </div>

    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
        With project
      </h3>
      <BottomAppBarsText state="with-project" placeholder="Ask me anything" />
    </div>

    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
        With button
      </h3>
      <BottomAppBarsText state="with-button" placeholder="Ask me anything" buttonLabel="Review Changes" />
    </div>

    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
        With project and button
      </h3>
      <BottomAppBarsText state="with-project-and-button" placeholder="Ask me anything" buttonLabel="Submit Proposal" />
    </div>

    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
        With prompts
      </h3>
      <BottomAppBarsText
        state="with-prompts"
        placeholder="Ask me anything"
        prompts={['Prompt suggestion', 'Prompt suggestion', 'Prompt']}
        onSend={(payload) => alert(`Immediate send triggered for prompt: "${payload}"`)}
      />
    </div>
  </div>
);
BottomAppBarAllTextStates.storyName = 'Bottom App Bar - All Text Variants';

export const BottomAppBarVoiceModes = () => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', backgroundColor: '#f0f2fd', borderRadius: '12px' }}>
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
          Interactive Voice Bar (Surface Light Theme - Click mic to toggle mute on/off)
        </h3>
        <BottomAppBarsVoice
          mute={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          onExpandClick={() => alert('Expand Voice UI clicked')}
        />
      </div>

      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
          Side-by-Side: Active (Mute=False) vs Muted (Mute=True)
        </h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#6d6d7e', display: 'block', marginBottom: '6px' }}>Active (Surface Light with Pulsing Mic)</span>
            <BottomAppBarsVoice mute={false} />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#6d6d7e', display: 'block', marginBottom: '6px' }}>Muted (Mute Icon)</span>
            <BottomAppBarsVoice mute={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
BottomAppBarVoiceModes.storyName = 'Bottom App Bar - Voice Modes';

export const BottomAppBarInteractiveDockedChat = () => {
  return (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', padding: '24px', backgroundColor: '#e9eafc', borderRadius: '12px' }}>
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
          Docked Chat Panel
        </h3>
        <ChatDockedUI
          mode="text"
          onClose={() => alert('Docked Chat closed')}
        />
      </div>

      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
          Docked Voice Panel
        </h3>
        <ChatDockedUI
          mode="voice"
          onClose={() => alert('Docked Voice closed')}
        />
      </div>
    </div>
  );
};
BottomAppBarInteractiveDockedChat.storyName = 'Bottom App Bar - Docked Chat & Voice UI';

export const UnifiedAppBarsBottomVariant = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', backgroundColor: '#f5f5fe', borderRadius: '12px' }}>
    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
        AppBars with variant="bottom"
      </h3>
      <AppBars variant="bottom" state="with-project-and-button" buttonLabel="Action" />
    </div>

    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
        AppBars with variant="bottom" mode="voice"
      </h3>
      <AppBars variant="bottom" mode="voice" />
    </div>

    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
        AppBars with variant="bottom-docked"
      </h3>
      <AppBars variant="bottom-docked" mode="text" />
    </div>
  </div>
);
UnifiedAppBarsBottomVariant.storyName = 'AppBars (Unified Polymorphic: variant="bottom")';

// export const InteractiveExpandableInput300px = () => {
//   const [demoText, setDemoText] = useState('');

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', backgroundColor: '#f0f2fd', borderRadius: '12px' }}>
//       <div>
//         <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#2f2f39', marginBottom: '6px' }}>
//           Conditional Expand Button (Hidden until text overflows first line)
//         </h3>
//         <p style={{ fontSize: '13px', color: '#6d6d7e', margin: '0 0 16px 0' }}>
//           The expand button is completely hidden when text fits within the first line. Once entered text cannot fit into the first line, the expand button appears next to send. When clicked, it expands the editor to 300px with a collapse button to return to thin &amp; slim mode!
//         </p>

//         <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
//           <button
//             type="button"
//             style={{ padding: '6px 14px', borderRadius: '1000px', border: '1px solid #1e49e2', background: '#1e49e2', color: '#ffffff', fontSize: '12px', cursor: 'pointer' }}
//             onClick={() => setDemoText('Please summarize the key audit findings for our 2026 fiscal compliance review, including risk scores, exception logs, and multi-cloud infrastructure recommendations.')}
//           >
//             Insert Long Text (Causes text to overflow → Expand Button appears)
//           </button>
//           <button
//             type="button"
//             style={{ padding: '6px 14px', borderRadius: '1000px', border: '1px solid #d5d5dc', background: '#ffffff', color: '#2f2f39', fontSize: '12px', cursor: 'pointer' }}
//             onClick={() => setDemoText('Short text')}
//           >
//             Insert Short Text (Fits in first line → Expand Button hidden)
//           </button>
//           <button
//             type="button"
//             style={{ padding: '6px 14px', borderRadius: '1000px', border: '1px solid #d5d5dc', background: '#ffffff', color: '#2f2f39', fontSize: '12px', cursor: 'pointer' }}
//             onClick={() => setDemoText('')}
//           >
//             Clear Text (Expand Button hidden)
//           </button>
//         </div>
//       </div>

//       <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
//         <div style={{ flex: 1, minWidth: '320px', maxWidth: '500px' }}>
//           <span style={{ fontSize: '12px', fontWeight: 600, color: '#454554', display: 'block', marginBottom: '8px' }}>
//             Bottom App Bar (Figma Variant)
//           </span>
//           <BottomAppBarsText
//             state="with-prompts"
//             placeholder="Ask me anything"
//             value={demoText}
//             onChange={(e) => setDemoText(e.target.value)}
//           />
//         </div>

//         <div style={{ flex: 1, minWidth: '320px', maxWidth: '500px' }}>
//           <span style={{ fontSize: '12px', fontWeight: 600, color: '#454554', display: 'block', marginBottom: '8px' }}>
//             Search Pill (Floating / AI Search Bar)
//           </span>
//           <AppBarSearchPill
//             size="large"
//             placeholder="Ask me anything"
//             value={demoText}
//             onChange={(e) => setDemoText(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// InteractiveExpandableInput300px.storyName = 'Interactive - Text Overflow Expand Visibility (300px ↔ Slim)';

export const BottomAppBarConfigurableProps = () => {
  const [enableMic, setEnableMic] = useState(false);
  const [enableAttachment, setEnableAttachment] = useState(false);
  const [enableSend, setEnableSend] = useState(true);
  const [lastSentPayload, setLastSentPayload] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', backgroundColor: '#f5f5fe', borderRadius: '12px' }}>
      <div>
        <p>Attachment and microphone are toggled off by props. Clicking any prompt suggestion chip immediately triggers its text content as payload and sends it right away.</p>
        {/* Live Prop Toggle Controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={enableMic}
              onChange={(e) => setEnableMic(e.target.checked)}
            />
            <span>enableMic: <strong>{enableMic ? 'true' : 'false'}</strong></span>
          </label>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={enableAttachment}
              onChange={(e) => setEnableAttachment(e.target.checked)}
            />
            <span>enableAttachment: <strong>{enableAttachment ? 'true' : 'false'}</strong></span>
          </label>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={enableSend}
              onChange={(e) => setEnableSend(e.target.checked)}
            />
            <span>enableSend: <strong>{enableSend ? 'true' : 'false'}</strong></span>
          </label>
        </div>

        {lastSentPayload && (
          <div style={{ padding: '8px 12px', backgroundColor: '#e9eafc', border: '1px solid #1a28c1', borderRadius: '6px', fontSize: '13px', color: '#1a28c1', marginBottom: '16px' }}>
            <strong>Immediately Sent Payload:</strong> &quot;{lastSentPayload}&quot;
          </div>
        )}
      </div>

      <div style={{ maxWidth: '480px' }}>
        <BottomAppBarsText
          state="with-prompts"
          placeholder="Ask me anything"
          enableMic={enableMic}
          enableAttachment={enableAttachment}
          enableSend={enableSend}
          prompts={['Prompt suggestion', 'Prompt suggestion', 'Prompt']}
          onSend={(payload) => setLastSentPayload(payload)}
        />
      </div>
    </div>
  );
};
BottomAppBarConfigurableProps.storyName = 'Bottom App Bar - Configurable Props & Prompt Suggestions';

