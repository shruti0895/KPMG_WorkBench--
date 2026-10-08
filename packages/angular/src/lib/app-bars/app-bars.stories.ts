import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { AppBarsComponent } from './app-bars.component';
import { AppBarFullComponent } from './app-bar-full.component';
import { AppBarNestedComponent } from './app-bar-nested.component';
import { AppBarSpecialComponent } from './app-bar-special.component';
import { AppBarSearchPillComponent } from './app-bar-search-pill.component';
import { AppBarStatusItemComponent } from './app-bar-status-item.component';
import {
  BottomAppBarComponent,
  BottomAppBarTextComponent,
  BottomAppBarVoiceComponent,
  ChatDockedUiComponent,
} from './bottom-app-bar.component';
import { FigmaWorkbenchExampleComponent } from './figma-workbench-example.component';

const meta: Meta<AppBarsComponent> = {
  title: 'Components/AppBars',
  component: AppBarsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'App Bars family: Top App Bars Full (default / with action), Nested (small / large, default / filled), Special (extra-small / small / large with search), status items, bottom app bars (text variants, voice modes) and docked chat / voice panels.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        AppBarsComponent,
        AppBarFullComponent,
        AppBarNestedComponent,
        AppBarSpecialComponent,
        AppBarSearchPillComponent,
        AppBarStatusItemComponent,
        BottomAppBarComponent,
        BottomAppBarTextComponent,
        BottomAppBarVoiceComponent,
        ChatDockedUiComponent,
        FigmaWorkbenchExampleComponent,
      ],
    }),
  ],
  argTypes: {
    variant: { control: 'select', options: ['full', 'nested', 'special', 'bottom', 'bottom-docked'] },
    type: { control: 'radio', options: ['default', 'with-action'] },
    size: { control: 'select', options: ['extra-small', 'small', 'large'] },
    state: { control: 'text' },
    showBreadcrumbs: { control: 'boolean' },
    withSearch: { control: 'boolean' },
    statusType: { control: 'select', options: [undefined, 'configuring', 'completed', 'saved', 'reviewed'] },
    statusProgress: { control: { type: 'range', min: 0, max: 100 } },
    mode: { control: 'radio', options: ['text', 'voice'] },
    mute: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<AppBarsComponent>;

const LABEL = 'display: block; margin-bottom: 8px; font-size: 12px; font-weight: 600; color: var(--color-neutral-100, #454554)';
const H2 = 'margin-bottom: 8px; font-size: 20px; color: var(--color-neutral-000, #2f2f39)';
const SUB = 'margin-bottom: 16px; color: var(--color-neutral-200, #9090a2); font-size: 14px';
const H3 = 'font-size: 14px; font-weight: 600; color: #2f2f39; margin-bottom: 8px';
const H4 = 'margin-bottom: 10px; font-size: 14px; color: var(--color-neutral-100)';

/** Mock content cards for the large hero views (React: SampleCardsRow). */
const SAMPLE_CARDS = `
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 12px">
    @for (card of sampleCards; track $index) {
      <div style="padding: 16px; border-radius: 8px; border: 1px solid var(--color-neutral-400, #c7c7d1); background-color: var(--color-surface, #ffffff); box-shadow: 0 1px 3px rgba(0,0,0,0.05)">
        <span style="font-size: 11px; text-transform: uppercase; color: var(--color-neutral-200, #9090a2); font-weight: 600">Project {{ $index + 1 }}</span>
        <h4 style="margin: 6px 0 8px 0; font-size: 15px; color: var(--color-neutral-000, #2f2f39)">{{ card }}</h4>
        <p style="margin: 0; font-size: 13px; color: var(--color-neutral-100, #454554)">Active enterprise pipeline with verified audit trails.</p>
      </div>
    }
  </div>`;
const sampleCards = ['Financial Audit Model', 'Risk Analysis Engine', 'Tax Compliance Portal', 'Advisory Data Stream'];
const say = (m: string) => window.alert(m);

export const Basic: Story = {
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
  render: (args) => ({ props: args, template: `<kpmg-app-bars ${argsToTemplate(args)} />` }),
};

export const AllVariantsGallery: Story = {
  name: 'All Variants Gallery',
  render: () => ({
    props: {
      sampleCards,
      collapsibleCrumbs: [
        { id: '1', label: 'WorkBench', href: '#' },
        { id: '2', label: 'Enterprise Division', href: '#', useCircleCheckbox: true, isChecked: true },
        { id: '3', label: 'Global Advisory', href: '#', isStar: true },
        { id: '4', label: 'Fiscal 2026', isCurrent: true },
      ],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; max-width: 1400px; margin: 0 auto">
        <div>
          <h2 style="${H2}">1. Top App Bars Full</h2>
          <p style="${SUB}">Standard primary header bar in Default and With Action states.</p>
          <div style="display: flex; flex-direction: column; gap: 20px">
            <div><span style="${LABEL}">Variant: Full - Default with Reused Breadcrumbs &amp; Slash Forward</span>
              <kpmg-app-bar-full brandLabel="KPMG" [breadcrumbs]="['WorkBench', 'Enterprise Projects', 'Q3 Analytics']" /></div>
            <div><span style="${LABEL}">Variant: Full - Collapsible Multi-Level Breadcrumbs with Dropdown Menu Card</span>
              <kpmg-app-bar-full brandLabel="KPMG" [breadcrumbs]="collapsibleCrumbs" [breadcrumbProps]="{ maxItems: 3 }" /></div>
            <div><span style="${LABEL}">Variant: Full - Single Page Title Mode with Chevron Forward</span>
              <kpmg-app-bar-full brandLabel="KPMG" [showBreadcrumbs]="false" pageTitle="Workbench" /></div>
            <div><span style="${LABEL}">Variant: Full - With Action</span>
              <kpmg-app-bar-full type="with-action" brandLabel="KPMG" [breadcrumbs]="['WorkBench', 'Model Configuration']" actionButtonSecondary="Discard Changes" actionButtonLabel="Deploy Model" /></div>
          </div>
        </div>

        <div>
          <h2 style="${H2}">2. Top App Bars Nested</h2>
          <p style="${SUB}">Contextual app bar for workspaces, file views, and drill-down pages.</p>
          <div style="display: flex; flex-direction: column; gap: 24px">
            <div><span style="${LABEL}">Variant: Nested Small - Default State with Configuring Progress Badge</span>
              <kpmg-app-bar-nested size="small" state="default" title="Audit_Pipeline_v2.0" statusType="configuring" [statusProgress]="35" /></div>
            <div><span style="${LABEL}">Variant: Nested Small - Filled State with Completed Status</span>
              <kpmg-app-bar-nested size="small" state="filled" title="Quarterly_Tax_Reconciliation_2026" statusType="completed" /></div>
            <kpmg-app-bar-nested size="large" state="default" [breadcrumbs]="['Subheader', 'Subheader']" title="Header" [filterChips]="['All Frameworks', 'Active Reviews', 'Drafts', 'Archived']" hasContent>
              ${SAMPLE_CARDS}
            </kpmg-app-bar-nested>
            <div><span style="${LABEL}">Variant: Nested Large - Filled State with Multi-Level Breadcrumbs</span>
              <kpmg-app-bar-nested size="large" state="filled" [breadcrumbs]="['Advisory Practice', 'Risk & Compliance', 'Governance']" title="Global Governance Oversight" [filterChips]="['Overview', 'Controls', 'Exceptions', 'Audit Log']" hasContent>
                ${SAMPLE_CARDS}
              </kpmg-app-bar-nested></div>
          </div>
        </div>

        <div>
          <h2 style="${H2}">3. Top App Bars Special (Dashboard &amp; Search)</h2>
          <p style="${SUB}">Portal dashboard headers with personalized greetings and search capabilities.</p>
          <div style="display: flex; flex-direction: column; gap: 24px">
            <kpmg-app-bar-special size="extra-small" greeting="Greeting, name" searchPlaceholder="Ask me anything" />
            <kpmg-app-bar-special size="small" greeting="Greeting, name" searchPlaceholder="Ask me anything" />
            <div><span style="${LABEL}">Variant 3: Size=Large, With search=False</span>
              <kpmg-app-bar-special size="large" [withSearch]="false" greeting="Greeting, name" welcomeHeader="Welcome" [filterChips]="['Project tag', 'Project tag', 'Project tag']" /></div>
            <div><span style="${LABEL}">Variant 4: Size=Large, With search=True</span>
              <kpmg-app-bar-special size="large" [withSearch]="true" greeting="Greeting, name" welcomeHeader="Welcome" searchPlaceholder="Ask me anything" [filterChips]="['Project tag', 'Project tag', 'Project tag']" /></div>
          </div>
        </div>

        <div>
          <h2 style="${H2}">5. Top App Bar Items (Status Badges)</h2>
          <p style="${SUB}">Status and progress badges used across nested navigation bars.</p>
          <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
            <kpmg-app-bar-status-item type="configuring" [progress]="30" />
            <kpmg-app-bar-status-item type="configuring" [progress]="75" />
            <kpmg-app-bar-status-item type="completed" />
            <kpmg-app-bar-status-item type="saved" />
            <kpmg-app-bar-status-item type="reviewed" />
          </div>
        </div>
      </div>`,
  }),
};

/* ----- Individual canonical stories ----- */

export const FullDefault: Story = {
  name: 'Full',
  render: () => ({
    props: { say },
    template: `<kpmg-app-bar-full brandLabel="KPMG" [breadcrumbs]="['WorkBench', 'Advisory', 'Engagement Q4']"
      (brandClick)="say('Brand menu toggled')" (assistantClick)="say('Assistant toggled')"
      (notificationsClick)="say('Notifications clicked')" (overflowClick)="say('Overflow menu clicked')" />`,
  }),
};

export const FullWithAction: Story = {
  name: 'Full - With Action',
  render: () => ({
    props: { say },
    template: `<kpmg-app-bar-full type="with-action" brandLabel="KPMG" [breadcrumbs]="['WorkBench', 'Risk Matrix', 'Edit Configuration']"
      actionButtonSecondary="Cancel" actionButtonLabel="Save Changes"
      (actionClick)="say('Changes saved')" (secondaryActionClick)="say('Action cancelled')" />`,
  }),
};

export const FullWithCollapsibleBreadcrumbs: Story = {
  name: 'Full - Breadcrumbs Interactive & Page Title',
  render: () => ({
    props: {
      items: [
        { id: '1', label: 'WorkBench', href: '#' },
        { id: '2', label: 'Advisory Practice', href: '#', useCircleCheckbox: true, isChecked: true },
        { id: '3', label: 'Risk & Strategy', href: '#', isStar: true, hasDivider: true },
        { id: '4', label: 'Financial Models', href: '#', isStar: false },
        { id: '5', label: 'Model Portfolio 2026', isCurrent: true },
      ],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px">
        <div><h4 style="${H4}">Collapsed Breadcrumbs with Dropdown (Click ... to open card with circle checkbox &amp; star bookmarks)</h4>
          <kpmg-app-bar-full brandLabel="KPMG" [breadcrumbs]="items" [breadcrumbProps]="{ maxItems: 3, itemsAfterCollapse: 1 }" /></div>
        <div><h4 style="${H4}">Single Page Title Mode with Chevron Forward Separator</h4>
          <kpmg-app-bar-full brandLabel="KPMG" [showBreadcrumbs]="false" pageTitle="Workbench" /></div>
      </div>`,
  }),
};

export const NestedSmall: Story = {
  name: 'Nested - Small',
  render: () => ({
    props: { say },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <kpmg-app-bar-nested size="small" state="default" title="Compliance_Model_v3.4" statusType="configuring" [statusProgress]="45" (navClick)="say('Back clicked')" />
        <kpmg-app-bar-nested size="small" state="filled" title="Global_Risk_Register" statusType="completed" (navClick)="say('Back clicked')" />
        <kpmg-app-bar-nested size="small" state="default" title="Statutory_Financials_Draft" statusType="saved" (navClick)="say('Back clicked')" />
      </div>`,
  }),
};

export const NestedLargeDefault: Story = {
  name: 'Nested - Large Default',
  render: () => ({
    props: { say, sampleCards },
    template: `<kpmg-app-bar-nested size="large" state="default" [breadcrumbs]="['Subheader', 'Subheader']" title="Header"
      [filterChips]="['All Assets', 'Active Engagements', 'Pending Review', 'Completed']" hasContent
      (speakerClick)="say('Speaker audio clicked')" (bookmarkClick)="say('Bookmark clicked')" (shareClick)="say('Share clicked')">
      ${SAMPLE_CARDS}
    </kpmg-app-bar-nested>`,
  }),
};

export const NestedLargeFilled: Story = {
  name: 'Nested - Large Filled',
  render: () => ({
    props: { sampleCards },
    template: `<kpmg-app-bar-nested size="large" state="filled" [breadcrumbs]="['Audit Practice', 'Assurance Controls', 'Automated Papers']"
      title="Automated Working Papers" [filterChips]="['Worksheets', 'Supporting Evidence', 'Sign-offs', 'Archive']" hasContent>
      ${SAMPLE_CARDS}
    </kpmg-app-bar-nested>`,
  }),
};

export const NestedWithBreadcrumbs: Story = {
  name: 'Nested - Reused Breadcrumbs Integration',
  render: () => ({
    props: {
      sampleCards,
      items: [
        { id: '1', label: 'WorkBench', href: '#' },
        { id: '2', label: 'Enterprise Division', href: '#' },
        { id: '3', label: 'Risk & Strategy', href: '#' },
        { id: '4', label: 'Global Advisory', isCurrent: true },
      ],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px">
        <div><h4 style="${H4}">Nested Large with Reused Breadcrumbs &amp; Slash Forward Separator</h4>
          <kpmg-app-bar-nested size="large" state="default" [breadcrumbs]="items" title="Enterprise Risk Framework 2026"
            [filterChips]="['All Frameworks', 'Active Reviews', 'Drafts', 'Archived']" hasContent>
            ${SAMPLE_CARDS}
          </kpmg-app-bar-nested></div>
        <div><h4 style="${H4}">Nested Small with Top Bar Breadcrumb Trail</h4>
          <kpmg-app-bar-nested size="small" state="default" [topBreadcrumbs]="['WorkBench', 'Risk Management', 'Compliance Matrix']" statusType="configuring" [statusProgress]="60" /></div>
      </div>`,
  }),
};

export const SpecialExtraSmall: Story = {
  name: 'Special - Size=Extra small, With search=Default',
  render: () => ({
    props: { say },
    template: `<kpmg-app-bar-special size="extra-small" greeting="Greeting, name" searchPlaceholder="Ask me anything" (searchSubmit)="say('Searching for: ' + $event.value)" />`,
  }),
};

export const SpecialSmall: Story = {
  name: 'Special - Size=Small, With search=Default',
  render: () => ({
    props: { say },
    template: `<kpmg-app-bar-special size="small" greeting="Greeting, name" searchPlaceholder="Ask me anything" (searchSubmit)="say('Searching for: ' + $event.value)" />`,
  }),
};

export const SpecialLargeWithoutSearch: Story = {
  name: 'Special - Size=Large, With search=False',
  render: () => ({
    template: `<kpmg-app-bar-special size="large" [withSearch]="false" greeting="Greeting, name" welcomeHeader="Welcome" [filterChips]="['Project tag', 'Project tag', 'Project tag']" />`,
  }),
};

export const SpecialLargeWithSearch: Story = {
  name: 'Special - Size=Large, With search=True',
  render: () => ({
    template: `<kpmg-app-bar-special size="large" [withSearch]="true" greeting="Greeting, name" welcomeHeader="Welcome" searchPlaceholder="Ask me anything" [filterChips]="['Project tag', 'Project tag', 'Project tag']" />`,
  }),
};

export const StatusItems: Story = {
  name: 'Status Items (Badges)',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px">
        <kpmg-app-bar-status-item type="configuring" [progress]="20" />
        <kpmg-app-bar-status-item type="configuring" [progress]="50" />
        <kpmg-app-bar-status-item type="configuring" [progress]="90" />
        <kpmg-app-bar-status-item type="completed" />
        <kpmg-app-bar-status-item type="saved" />
        <kpmg-app-bar-status-item type="reviewed" />
      </div>`,
  }),
};

export const FigmaFullLayoutExample: Story = {
  name: 'Examples of using Appbars',
  render: () => ({
    template: `<div style="max-width: 1440px; margin: 0 auto; padding: 16px"><kpmg-figma-workbench-example /></div>`,
  }),
};

/* ----- Bottom app bars ----- */

export const BottomAppBarAllTextStates: Story = {
  name: 'Bottom App Bar - All Text Variants',
  render: () => ({
    props: { say },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; background-color: #f9f9fb; border-radius: 12px">
        <div><h3 style="${H3}">Default</h3><kpmg-bottom-app-bar-text state="default" placeholder="Ask me anything" /></div>
        <div><h3 style="${H3}">With verification</h3><kpmg-bottom-app-bar-text state="with-verification" placeholder="Ask me anything" /></div>
        <div><h3 style="${H3}">With project</h3><kpmg-bottom-app-bar-text state="with-project" placeholder="Ask me anything" /></div>
        <div><h3 style="${H3}">With button</h3><kpmg-bottom-app-bar-text state="with-button" placeholder="Ask me anything" buttonLabel="Review Changes" /></div>
        <div><h3 style="${H3}">With project and button</h3><kpmg-bottom-app-bar-text state="with-project-and-button" placeholder="Ask me anything" buttonLabel="Submit Proposal" /></div>
        <div><h3 style="${H3}">With prompts</h3>
          <kpmg-bottom-app-bar-text state="with-prompts" placeholder="Ask me anything" [prompts]="['Prompt suggestion', 'Prompt suggestion', 'Prompt']"
            (send)="say('Immediate send triggered for prompt: &quot;' + $event.text + '&quot;')" /></div>
      </div>`,
  }),
};

export const BottomAppBarVoiceModes: Story = {
  name: 'Bottom App Bar - Voice Modes',
  render: () => ({
    props: { isMuted: false, say },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; background-color: #f0f2fd; border-radius: 12px">
        <div><h3 style="${H3}">Interactive Voice Bar (Surface Light Theme - Click mic to toggle mute on/off)</h3>
          <kpmg-bottom-app-bar-voice [mute]="isMuted" (toggleMute)="isMuted = !isMuted" (expandClick)="say('Expand Voice UI clicked')" /></div>
        <div><h3 style="${H3}">Side-by-Side: Active (Mute=False) vs Muted (Mute=True)</h3>
          <div style="display: flex; gap: 24px; flex-wrap: wrap">
            <div><span style="font-size: 12px; color: #6d6d7e; display: block; margin-bottom: 6px">Active (Surface Light with Pulsing Mic)</span><kpmg-bottom-app-bar-voice [mute]="false" /></div>
            <div><span style="font-size: 12px; color: #6d6d7e; display: block; margin-bottom: 6px">Muted (Mute Icon)</span><kpmg-bottom-app-bar-voice [mute]="true" /></div>
          </div>
        </div>
      </div>`,
  }),
};

export const BottomAppBarInteractiveDockedChat: Story = {
  name: 'Bottom App Bar - Docked Chat & Voice UI',
  render: () => ({
    props: { say },
    template: `
      <div style="display: flex; gap: 32px; flex-wrap: wrap; padding: 24px; background-color: #e9eafc; border-radius: 12px">
        <div><h3 style="${H3}">Docked Chat Panel</h3><kpmg-chat-docked-ui mode="text" closable (closeClick)="say('Docked Chat closed')" /></div>
        <div><h3 style="${H3}">Docked Voice Panel</h3><kpmg-chat-docked-ui mode="voice" closable (closeClick)="say('Docked Voice closed')" /></div>
      </div>`,
  }),
};

export const UnifiedAppBarsBottomVariant: Story = {
  name: 'AppBars (Unified Polymorphic: variant="bottom")',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; background-color: #f5f5fe; border-radius: 12px">
        <div><h3 style="${H3}">AppBars with variant="bottom"</h3><kpmg-app-bars variant="bottom" state="with-project-and-button" buttonLabel="Action" /></div>
        <div><h3 style="${H3}">AppBars with variant="bottom" mode="voice"</h3><kpmg-app-bars variant="bottom" mode="voice" /></div>
        <div><h3 style="${H3}">AppBars with variant="bottom-docked"</h3><kpmg-app-bars variant="bottom-docked" mode="text" /></div>
      </div>`,
  }),
};

export const BottomAppBarConfigurableProps: Story = {
  name: 'Bottom App Bar - Configurable Props & Prompt Suggestions',
  render: () => ({
    props: { enableMic: false, enableAttachment: false, enableSend: true, lastSentPayload: '' },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; background-color: #f5f5fe; border-radius: 12px">
        <div>
          <p>Attachment and microphone are toggled off by props. Clicking any prompt suggestion chip immediately triggers its text content as payload and sends it right away.</p>
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 16px">
            <label style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer">
              <input type="checkbox" [checked]="enableMic" (change)="enableMic = !enableMic" /><span>enableMic: <strong>{{ enableMic }}</strong></span></label>
            <label style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer">
              <input type="checkbox" [checked]="enableAttachment" (change)="enableAttachment = !enableAttachment" /><span>enableAttachment: <strong>{{ enableAttachment }}</strong></span></label>
            <label style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer">
              <input type="checkbox" [checked]="enableSend" (change)="enableSend = !enableSend" /><span>enableSend: <strong>{{ enableSend }}</strong></span></label>
          </div>
          @if (lastSentPayload) {
            <div style="padding: 8px 12px; background-color: #e9eafc; border: 1px solid #1a28c1; border-radius: 6px; font-size: 13px; color: #1a28c1; margin-bottom: 16px">
              <strong>Immediately Sent Payload:</strong> "{{ lastSentPayload }}"
            </div>
          }
        </div>
        <div style="max-width: 480px">
          <kpmg-bottom-app-bar-text state="with-prompts" placeholder="Ask me anything" [enableMic]="enableMic" [enableAttachment]="enableAttachment"
            [enableSend]="enableSend" [prompts]="['Prompt suggestion', 'Prompt suggestion', 'Prompt']" (send)="lastSentPayload = $event.text" />
        </div>
      </div>`,
  }),
};
