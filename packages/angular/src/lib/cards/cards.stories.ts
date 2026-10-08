import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { HorizontalCardComponent } from './horizontal-card.component';
import { HorizontalCardsRichComponent } from './horizontal-cards-rich.component';
import { StackedCardComponent } from './stacked-card.component';
import { SpecialCardComponent } from './special-card.component';
import { TaskCardComponent } from './task-card.component';

const SUPPORTING = 'Supporting line text Lorem ipsum dolor sit amet, consectetuer';
const BODY = 'Description text Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh';
const STYLES = ['Outlined', 'Elevated', 'Filled'];
const SIZES = ['Largest', 'Extra large', 'Large', 'Medium', 'Small'];
const label = (text: string) => `<div style="font-size: 12px; font-weight: 600; color: #00338d; margin-bottom: 8px">${text}</div>`;

const meta: Meta<HorizontalCardComponent> = {
  title: 'Components/Cards',
  component: HorizontalCardComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [HorizontalCardComponent, HorizontalCardsRichComponent, StackedCardComponent, SpecialCardComponent, TaskCardComponent],
    }),
  ],
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large', 'Extra large', 'Largest'] },
    type: {
      control: 'select',
      options: ['Image', 'Image and arrow icon', 'Image and arrow', 'Image and checkmark', 'Image and more icon', 'Image and status'],
    },
    styleVariant: { control: 'select', options: ['Outlined', 'Elevated', 'Filled', 'Missing', 'Warning'] },
    checkVariant: {
      control: 'select',
      options: [
        'default',
        'checked',
        'unchecked',
        'unchecked-light',
        'indeterminate',
        'error-checked',
        'error-unchecked',
        'error-checked-light',
        'error-indeterminate',
        'primary',
        'purple',
        'error',
      ],
    },
    checkState: { control: 'select', options: ['enabled', 'hovered', 'pressed', 'disabled'] },
    checkboxShape: { control: 'radio', options: ['circle', 'square'] },
    checked: { control: 'boolean' },
    hasImage: { control: 'boolean' },
    hasProgress: { control: 'boolean' },
    showChip: { control: 'boolean' },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    checkboxProps: { control: false },
  },
  render: (args) => ({ props: args, template: `<kpmg-horizontal-card ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<HorizontalCardComponent>;
// Stories for the other card components render different selectors, so their args are loosely typed.
type AnyStory = StoryObj<any>;

/* ---------------------------------------------------------------- Horizontal card */

export const Default: Story = {
  args: {
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: SUPPORTING,
    bodyText: BODY,
    checked: false,
    hasImage: true,
  },
};

const matrixRow = (size: string, style: string) => `
  <div style="display: grid; grid-template-columns: repeat(4, 340px); gap: 16px; margin-bottom: 16px">
    <kpmg-horizontal-card size="${size}" type="Image" styleVariant="${style}" title="Header" supportingText="${SUPPORTING}" bodyText="${BODY}" />
    <kpmg-horizontal-card size="${size}" type="Image and arrow icon" styleVariant="${style}" title="Header" supportingText="${SUPPORTING}" bodyText="${BODY}" />
    <kpmg-horizontal-card size="${size}" type="Image and checkmark" styleVariant="${style}" title="Header" supportingText="${SUPPORTING}" bodyText="${BODY}" [checked]="true" />
    <kpmg-horizontal-card size="${size}" type="Image and more icon" styleVariant="${style}" title="Header" supportingText="${SUPPORTING}" bodyText="${BODY}" />
  </div>`;

export const CompleteFigmaMatrix: Story = {
  render: () => ({
    template: `<div>${SIZES.map((s) => STYLES.map((st) => matrixRow(s, st)).join('')).join('')}</div>`,
  }),
};

export const LargestSize: Story = {
  args: { size: 'Largest', type: 'Image and checkmark', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING, bodyText: BODY, checked: true },
};
export const ExtraLargeSize: Story = {
  args: {
    size: 'Extra large',
    type: 'Image and more icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: SUPPORTING,
    bodyText: 'Description text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  },
};
export const LargeSize: Story = {
  args: { size: 'Large', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
};
export const MediumSize: Story = {
  args: { size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
};
export const SmallSize: Story = {
  args: { size: 'Small', type: 'Image and checkmark', styleVariant: 'Outlined', title: 'Header', checked: true },
};
export const StatusCard: Story = {
  args: {
    size: 'Large',
    type: 'Image and status',
    styleVariant: 'Outlined',
    title: 'Header',
    showChip: false,
    statusChip: 'Label',
    statusText1: 'Supporting line text lorem ipsum',
    statusText2: 'Supporting line text lorem ipsum',
    progress: 25,
    hasProgress: true,
    checked: true,
    checkboxShape: 'circle',
    checkVariant: 'default',
    checkState: 'enabled',
  },
};

const CHECK_VARIANTS = [
  'checked',
  'unchecked',
  'unchecked-light',
  'indeterminate',
  'error-checked',
  'error-unchecked',
  'error-checked-light',
  'error-indeterminate',
];
const CHECK_STATES = ['enabled', 'hovered', 'pressed', 'disabled'];

export const CheckedStatusVariantsGallery: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px">
        ${CHECK_VARIANTS.map(
          (v) => `
          <div>
            ${label(v)}
            <div style="display: grid; grid-template-columns: repeat(4, 340px); gap: 16px">
              ${CHECK_STATES.map(
                (st) =>
                  `<kpmg-horizontal-card size="Large" type="Image and status" styleVariant="Outlined" title="${st}" checkVariant="${v}" checkState="${st}" [showChip]="false" [progress]="45" />`,
              ).join('')}
            </div>
          </div>`,
        ).join('')}
      </div>`,
  }),
};

/* ---------------------------------------------------------------- Horizontal cards rich */

const richArgs = (type: string, styleVariant: string, extra: any = {}) => ({
  render: (args: any) => ({ props: args, template: `<kpmg-horizontal-cards-rich ${argsToTemplate(args)} />` }),
  args: { type, styleVariant, ...extra },
});
const richDefault = {
  title: 'Header',
  subhead: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  sectionTitle1: 'Title',
};

export const AllRichVariantsMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start">
        ${['Default', 'List', 'Attachment']
          .map((t) => STYLES.map((s) => `<kpmg-horizontal-cards-rich type="${t}" styleVariant="${s}" sectionTitle1="${t === 'Attachment' ? 'Attachments' : 'Title'}" />`).join(''))
          .join('')}
      </div>`,
  }),
};
export const RichDefaultOutlined: AnyStory = richArgs('Default', 'Outlined', { ...richDefault, sectionTitle2: 'Title' });
export const RichDefaultElevated: AnyStory = richArgs('Default', 'Elevated', { ...richDefault, sectionTitle2: 'Title' });
export const RichDefaultFilled: AnyStory = richArgs('Default', 'Filled', { ...richDefault, sectionTitle2: 'Title' });
export const RichListOutlined: AnyStory = richArgs('List', 'Outlined', richDefault);
export const RichListElevated: AnyStory = richArgs('List', 'Elevated', richDefault);
export const RichListFilled: AnyStory = richArgs('List', 'Filled', richDefault);
export const RichAttachmentOutlined: AnyStory = richArgs('Attachment', 'Outlined', { sectionTitle1: 'Attachments' });
export const RichAttachmentElevated: AnyStory = richArgs('Attachment', 'Elevated', { sectionTitle1: 'Attachments' });
export const RichAttachmentFilled: AnyStory = richArgs('Attachment', 'Filled', { sectionTitle1: 'Attachments' });

/* ---------------------------------------------------------------- Stacked card */

const stacked = (args: any, argTypes: any = {}): AnyStory => ({
  render: (a: any) => ({ props: a, template: `<kpmg-stacked-card ${argsToTemplate(a)} />` }),
  args,
  argTypes: {
    type: { control: 'select', options: ['Media', 'Assistant', 'Forum'] },
    styleVariant: { control: 'select', options: ['Outline', 'Elevated', 'Filled'] },
    imageAmount: { control: 'radio', options: [1, 2] },
    ...argTypes,
  },
});

export const StackedCardPlayground: AnyStory = stacked(
  {
    type: 'Media',
    styleVariant: 'Outline',
    imageAmount: 1,
    authorName: 'Cameron Williamson',
    authorSubhead: '2 hours ago',
    title: 'Modern Enterprise Architecture',
    subhead: 'Research & Strategy',
    bodyText: 'Comprehensive overview of scalable enterprise system design and micro-frontend patterns.',
    primaryButtonText: 'Action',
    secondaryButtonText: 'Cancel',
    hasMediaBadge: true,
  },
  {
    authorName: { control: 'text' },
    authorSubhead: { control: 'text' },
    title: { control: 'text' },
    subhead: { control: 'text' },
    bodyText: { control: 'text' },
    hasHeader: { control: 'boolean' },
    hasMedia: { control: 'boolean' },
    hasMediaBadge: { control: 'boolean' },
  },
);
export const StackedCardAssistant: AnyStory = stacked({
  type: 'Assistant',
  styleVariant: 'Elevated',
  imageAmount: 1,
  authorName: 'AI Strategy Assistant',
  authorSubhead: 'Generated yesterday',
  title: 'Financial Analysis Q4',
  subhead: 'Audit & Assurance',
  bodyText: 'Automated breakdown of global fiscal reporting, variance analysis, and key compliance benchmarks.',
  chips: ['Audit', 'Finance', 'Compliance'],
  heartCount: 42,
  bookmarkCount: 18,
  shareCount: 9,
});
export const StackedCardForum: AnyStory = stacked({
  type: 'Forum',
  styleVariant: 'Filled',
  imageAmount: 1,
  authorName: 'Innovation Forum',
  authorSubhead: 'Active discussion',
  title: 'Design System Governance 2026',
  subhead: 'Community Discussion',
  bodyText: 'Collaborative thread on token synchronizations and accessibility parity.',
  avatarCount: 4,
  participantLabel: 'participants',
});
export const StackedCardTwoImages: AnyStory = stacked({
  type: 'Media',
  styleVariant: 'Outline',
  imageAmount: 2,
  authorName: 'Asset Repository',
  authorSubhead: 'Updated 10m ago',
  title: 'Dual Media Showcase',
  subhead: 'Brand Assets',
  bodyText: 'Side-by-side asset comparison with dual square thumbnails for rapid visual inspection.',
  primaryButtonText: 'Download',
  secondaryButtonText: 'Details',
});

export const AllStackedCardVariantsMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px">
        ${['Media', 'Assistant', 'Forum']
          .map(
            (t) => `
          <div>
            ${label(t)}
            <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start">
              ${['Outline', 'Elevated', 'Filled']
                .map((s) => [1, 2].map((n) => `<kpmg-stacked-card type="${t}" styleVariant="${s}" [imageAmount]="${n}" />`).join(''))
                .join('')}
            </div>
          </div>`,
          )
          .join('')}
      </div>`,
  }),
};

/* ---------------------------------------------------------------- Special card */

const special = (args: any, argTypes: any = {}): AnyStory => ({
  render: (a: any) => ({ props: a, template: `<kpmg-special-card ${argsToTemplate(a)} />` }),
  args,
  argTypes: {
    type: { control: 'select', options: ['Slider', 'Chips', 'References', 'Code', 'Loading', 'Rich'] },
    styleVariant: { control: 'select', options: ['Outline', 'Elevated', 'Filled'] },
    ...argTypes,
  },
});

export const SpecialCardPlayground: AnyStory = special(
  {
    type: 'Slider',
    styleVariant: 'Outline',
    title: 'Model Creativity (Temperature)',
    description: 'Fine-tune deterministic versus creative generation',
    sliderValue: 65,
    min: 0,
    max: 100,
    step: 5,
    sliderLabel: 'Creativity',
    showSliderIndicator: true,
  },
  {
    title: { control: 'text' },
    description: { control: 'text' },
    sliderValue: { control: { type: 'range', min: 0, max: 100, step: 5 } },
    chipsType: { control: 'select', options: ['Filter', 'Assistive', 'Input'] },
    codeSize: { control: 'select', options: ['Small', 'Large'] },
    loadingSize: { control: 'select', options: ['Small', 'Medium', 'Large'] },
    mode: { control: 'select', options: ['Light', 'Dark'] },
    withTooltip: { control: 'boolean' },
    isOpen: { control: 'boolean' },
  },
);
export const SpecialCardSlider: AnyStory = special({
  type: 'Slider',
  styleVariant: 'Elevated',
  title: 'Confidence Threshold',
  description: 'Minimum classification confidence percentage required for auto-approval',
  sliderValue: 80,
  min: 0,
  max: 100,
  step: 5,
  sliderLabel: 'Approval Threshold',
  showSliderIndicator: true,
});
export const SpecialCardChips: AnyStory = special({
  type: 'Chips',
  styleVariant: 'Outline',
  chipsType: 'Filter',
  title: 'Industry Sector Focus',
  description: 'Filter transaction alerts across relevant regulatory domains',
  chips: ['Banking', 'Life Sciences', 'Energy', 'Technology', 'Healthcare', 'Automotive'],
  defaultSelectedChips: ['Banking', 'Technology'],
});
export const SpecialCardReferences: AnyStory = special({
  type: 'References',
  styleVariant: 'Outline',
  title: 'Cited Statutory Sources',
  headerActionText: '4 citations',
  references: [
    { title: 'Global Fiscal Reporting Standards 2026', source: 'KPMG Advisory Research', url: '#' },
    { title: 'Enterprise AI Governance Framework', source: 'Regulatory Compliance Council', url: '#' },
    { title: 'Cloud Infrastructure Economics Analysis', source: 'Technology Insights Group', url: '#' },
    { title: 'ESG Disclosure Alignment Benchmarks', source: 'Sustainability Forum', url: '#' },
  ],
});
export const SpecialCardCode: AnyStory = special({
  type: 'Code',
  styleVariant: 'Filled',
  codeSize: 'Large',
  title: 'Validation Script',
  language: 'TypeScript',
  code: `// Verify portfolio variance constraints\nexport function validateThresholds(portfolio: Portfolio): boolean {\n  const exposure = portfolio.calculateMaxDrawdown();\n  return exposure < 0.15 && portfolio.isCompliant();\n}`,
});
export const SpecialCardLoading: AnyStory = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 420px">
        <kpmg-special-card type="Loading" loadingSize="Small" mode="Light" loadingText="Generating response..." />
        <kpmg-special-card type="Loading" loadingSize="Medium" mode="Light" loadingText="Analyzing uploaded tax documentation..." />
        <kpmg-special-card type="Loading" loadingSize="Medium" mode="Dark" loadingText="Synthesizing multi-agent insights..." />
      </div>`,
  }),
};
export const SpecialCardRichAccordion: AnyStory = special({
  type: 'Rich',
  styleVariant: 'Outline',
  title: 'Model Hyperparameters',
  description: 'Configure multi-model parameters and inference thresholds',
  defaultOpen: true,
  withTooltip: true,
  tooltipText: 'Changes apply immediately across all micro-service pipelines.',
  nestedSliders: [
    { title: 'Creativity (Temperature)', description: 'Controls randomness of generative reasoning', value: 70 },
    { title: 'Top-P Sampling', description: 'Cumulative probability threshold for token candidate pool', value: 85 },
    { title: 'Frequency Penalty', description: 'Penalizes repeated phrases and lexical repetition', value: 30 },
  ],
});

export const AllSpecialCardVariantsMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px">
        ${['Outline', 'Elevated', 'Filled']
          .map(
            (s) => `
          <div>
            ${label(s)}
            <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start">
              <kpmg-special-card type="Slider" styleVariant="${s}" />
              <kpmg-special-card type="Chips" styleVariant="${s}" chipsType="Filter" />
              <kpmg-special-card type="Chips" styleVariant="${s}" chipsType="Assistive" />
              <kpmg-special-card type="Chips" styleVariant="${s}" chipsType="Input" />
              <kpmg-special-card type="References" styleVariant="${s}" />
              <kpmg-special-card type="Code" styleVariant="${s}" codeSize="Small" />
              <kpmg-special-card type="Code" styleVariant="${s}" codeSize="Large" />
              <kpmg-special-card type="Rich" styleVariant="${s}" [defaultOpen]="false" />
              <kpmg-special-card type="Rich" styleVariant="${s}" [defaultOpen]="true" [withTooltip]="true" />
            </div>
          </div>`,
          )
          .join('')}
        <div>
          ${label('Loading')}
          <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start">
            ${['Small', 'Medium', 'Large'].map((z) => ['Light', 'Dark'].map((m) => `<kpmg-special-card type="Loading" loadingSize="${z}" mode="${m}" />`).join('')).join('')}
          </div>
        </div>
      </div>`,
  }),
};

/* ---------------------------------------------------------------- Task card */

const task = (args: any, argTypes: any = {}): AnyStory => ({
  render: (a: any) => ({ props: a, template: `<kpmg-task-card ${argsToTemplate(a)} />` }),
  args,
  argTypes: {
    type: { control: 'select', options: ['Unchecked', 'Checked', 'Loading'] },
    styleVariant: { control: 'select', options: ['Outline', 'Elevated', 'Filled'] },
    state: { control: 'select', options: ['enabled', 'hovered', 'pressed'] },
    withAction: { control: 'boolean' },
    withFileUploader: { control: 'boolean' },
    actionVariant: { control: 'select', options: ['primary', 'secondary'] },
    ...argTypes,
  },
});

export const TaskCardPlayground: AnyStory = task({
  type: 'Unchecked',
  styleVariant: 'Outline',
  state: 'enabled',
  title: 'Review entity provision calculation',
  description: 'Verify state apportionment factor workpapers and ledger ties.',
  withAction: false,
  actionText: 'Action',
  actionVariant: 'secondary',
  withFileUploader: false,
  uploaderText: 'Drop files here or click to browse',
  uploaderSubtext: 'PDF, DOCX, XLSX up to 25MB',
  uploadedFiles: [],
  disabled: false,
});

const TASK_TITLE = 'Review entity provision calculation';
const TASK_DESC = 'Verify state apportionment factor workpapers and ledger ties.';
const taskStyleRow = (inner: (style: string) => string) => `
  <div style="display: flex; flex-wrap: wrap; gap: 20px">
    ${['Outline', 'Elevated', 'Filled'].map((s) => `<div>${label(s + ' Style')}${inner(s)}</div>`).join('')}
  </div>`;

export const TaskCardChecked: Story = {
  render: () => ({
    template: taskStyleRow((s) => `<kpmg-task-card type="Checked" styleVariant="${s}" title="${TASK_TITLE}" description="${TASK_DESC}" />`),
  }),
};
export const TaskCardWithAction: Story = {
  render: () => ({
    template: taskStyleRow(
      (s) => `
      <div style="display: flex; flex-direction: column; gap: 12px">
        <kpmg-task-card type="Unchecked" styleVariant="${s}" [withAction]="true" actionVariant="secondary" actionText="Action" title="${TASK_TITLE}" description="${TASK_DESC}" />
        <kpmg-task-card type="Unchecked" styleVariant="${s}" [withAction]="true" actionVariant="primary" actionText="Action" title="${TASK_TITLE}" description="${TASK_DESC}" />
      </div>`,
    ),
  }),
};
export const TaskCardWithFileUploader: Story = {
  render: () => ({
    template: taskStyleRow(
      (s) => `
      <div style="display: flex; flex-direction: column; gap: 12px">
        <kpmg-task-card type="Unchecked" styleVariant="${s}" [withFileUploader]="true" title="${TASK_TITLE}" description="${TASK_DESC}" />
        <kpmg-task-card type="Unchecked" styleVariant="${s}" [withFileUploader]="true" [uploadedFiles]="['ledger-q4.xlsx', 'workpapers.pdf']" title="${TASK_TITLE}" description="${TASK_DESC}" />
      </div>`,
    ),
  }),
};
export const TaskCardLoading: Story = {
  render: () => ({
    template: taskStyleRow((s) => `<kpmg-task-card type="Loading" styleVariant="${s}" title="${TASK_TITLE}" description="${TASK_DESC}" />`),
  }),
};

export const AllTaskCardVariantsMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px">
        ${['Checked', 'Unchecked', 'Loading']
          .map(
            (t) => `
          <div>
            ${label(t)}
            <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start">
              ${[
                '',
                '[withAction]="true"',
                '[withFileUploader]="true"',
              ]
                .map((cfg) =>
                  ['enabled', 'hovered', 'pressed']
                    .map((st) => `<kpmg-task-card type="${t}" styleVariant="Outline" state="${st}" ${cfg} />`)
                    .join(''),
                )
                .join('')}
            </div>
          </div>`,
          )
          .join('')}
      </div>`,
  }),
};
