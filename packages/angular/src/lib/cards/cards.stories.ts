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
const h3 = (fs: number, mb: number, text: string, color = '', fw = 'bold') =>
  `<h3 style="margin: 0 0 ${mb}px 0; font-size: ${fs}px; font-weight: ${fw};${color ? ` color: ${color};` : ''}">${text}</h3>`;
const para = (mb: number, color: string, text: string, fs = 13) =>
  `<p style="margin: 0 0 ${mb}px 0; font-size: ${fs}px; color: ${color}">${text}</p>`;
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
    <kpmg-horizontal-card size="${size}" type="Image" styleVariant="${style}" title="Header" />
    <kpmg-horizontal-card size="${size}" type="Image and checkmark" styleVariant="${style}" title="Header" [checked]="true" />
    <kpmg-horizontal-card size="${size}" type="Image and arrow icon" styleVariant="${style}" title="Header" />
    <kpmg-horizontal-card size="${size}" type="Image and more icon" styleVariant="${style}" title="Header" />
  </div>`;

const matrixStatus = (style: string) => `
  <div style="display: grid; grid-template-columns: repeat(4, 340px); gap: 16px; margin-bottom: 32px">
    <kpmg-horizontal-card size="Large" type="Image and status" styleVariant="${style}" title="Header" statusChip="Label" statusText1="Supporting line text lorem ipsum" statusText2="Supporting line text lorem ipsum" [progress]="65" [checked]="true" />
  </div>`;

const matrixGroup = (heading: string, desc: string | null, style: string) => `
  <div>
    ${h3(18, 8, heading)}
    ${desc ? para(20, '#9090a2', desc) : ''}
    ${SIZES.map((sz) => matrixRow(sz, style)).join('')}
    ${matrixStatus(style)}
  </div>`;

const missingCard = (type: string, checked: boolean) =>
  `<kpmg-horizontal-card size="Small" type="${type}" styleVariant="Missing" title="Project Structuring" [hasImage]="false"${checked ? ' [checked]="true"' : ''} />`;

export const CompleteFigmaMatrix: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-direction: column; gap: 48px">
      ${matrixGroup('1. Outlined Style Matrix', 'White background with 1px neutral border (#d5d5dc).', 'Outlined')}
      ${matrixGroup('2. Elevated Style Matrix', null, 'Elevated')}
      ${matrixGroup('3. Filled Style Matrix', 'Tinted container background fill (#f5f5fe).', 'Filled')}
      <div>
        ${h3(18, 8, '4. Missing / Warning Single Line Style')}
        ${para(20, '#9090a2', 'Single-line headline container with warning background (#fffbeb) without thumbnail image.')}
        <div style="display: grid; grid-template-columns: repeat(4, 340px); gap: 16px">
          ${missingCard('Image and arrow icon', false)}
          ${missingCard('Image and checkmark', true)}
          ${missingCard('Image and arrow icon', false)}
          ${missingCard('Image and more icon', false)}
        </div>
      </div>
    </div>`,
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

interface GalleryItem {
  styleVariant: string;
  showChip: boolean;
  checked: boolean;
  progress: number;
  checkVariant?: string;
  checkState?: string;
  isFigmaSelected?: boolean;
}
const gi = (styleVariant: string, showChip: boolean, checked: boolean, progress: number, extra: Partial<GalleryItem> = {}): GalleryItem => ({
  styleVariant,
  showChip,
  checked,
  progress,
  ...extra,
});
const GALLERY_ROWS: GalleryItem[][] = [
  [gi('Outlined', true, true, 0), gi('Filled', true, true, 25), gi('Filled', true, true, 25), gi('Outlined', false, false, 0)],
  [gi('Outlined', false, true, 25, { isFigmaSelected: true }), gi('Filled', false, true, 25), gi('Filled', false, true, 25), gi('Outlined', false, false, 10)],
  [gi('Outlined', false, true, 25), gi('Filled', false, true, 25), gi('Filled', false, true, 25), gi('Outlined', false, false, 25)],
  [gi('Outlined', false, false, 25), gi('Filled', false, false, 25), gi('Filled', false, false, 0, { checkVariant: 'error-unchecked' }), gi('Outlined', false, false, 40)],
  [
    gi('Outlined', false, false, 25, { checkState: 'hovered' }),
    gi('Filled', false, false, 25, { checkState: 'hovered' }),
    gi('Filled', false, false, 0, { checkVariant: 'error-unchecked', checkState: 'hovered' }),
    gi('Outlined', false, false, 65),
  ],
  [
    gi('Outlined', false, false, 25, { checkState: 'pressed' }),
    gi('Filled', false, false, 25, { checkState: 'pressed' }),
    gi('Filled', false, false, 25, { checkVariant: 'error-unchecked', checkState: 'pressed' }),
    gi('Outlined', false, true, 85),
  ],
  [
    gi('Outlined', false, true, 25, { checkVariant: 'purple', checkState: 'hovered' }),
    gi('Filled', false, true, 25, { checkVariant: 'purple', checkState: 'pressed' }),
    gi('Filled', false, true, 25, { checkVariant: 'error-checked', checkState: 'hovered' }),
  ],
];

const galleryCard = (item: GalleryItem) => {
  const card = `<kpmg-horizontal-card size="Large" type="Image and status" styleVariant="${item.styleVariant}" title="Header" [showChip]="${item.showChip}" statusChip="Label" statusText1="Supporting line text lorem ipsum" statusText2="Supporting line text lorem ipsum" [progress]="${item.progress}" [checked]="${item.checked}" checkVariant="${item.checkVariant || 'default'}" checkState="${item.checkState || 'enabled'}" checkboxShape="circle" />`;
  if (!item.isFigmaSelected) return card;
  return `
    <div style="position: relative">
      <div style="position: absolute; top: -24px; left: 0; background: #7c3aed; color: #ffffff; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; z-index: 2">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2z" /></svg>
        Horizontal card
      </div>
      <div style="outline: 2px solid #7c3aed; outline-offset: 2px; border-radius: 12px">${card}</div>
    </div>`;
};

export const CheckedStatusVariantsGallery: Story = {
  render: () => ({
    template: `
    <div style="background: #f5f5f7; padding: 32px; border-radius: 16px; display: flex; flex-direction: column; gap: 32px; width: fit-content">
      <div>
        ${h3(20, 8, 'Horizontal Card Checked &amp; Status Gallery', '#1e1e24')}
        ${para(8, '#68687a', 'Configurable circular selection format (40x40 touch target) supporting all states, chips, colors, and progress fills.')}
      </div>
      <div style="display: flex; flex-direction: column; gap: 20px">
        ${GALLERY_ROWS.map(
          (row) => `
        <div style="display: grid; grid-template-columns: repeat(4, 340px); gap: 20px; align-items: start">
          ${row.map(galleryCard).join('')}
        </div>`,
        ).join('')}
      </div>
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

const h4 = (fs: number, mb: number, color: string, text: string) =>
  `<h4 style="margin: 0 0 ${mb}px 0; font-size: ${fs}px; color: ${color}">${text}</h4>`;
const richGroup = (heading: string, desc: string | null, style: string) => `
  <div>
    ${h3(18, 8, heading)}
    ${desc ? para(20, '#9090a2', desc) : ''}
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(376px, 1fr)); gap: 24px; align-items: start">
      ${['Default', 'List', 'Attachment']
        .map(
          (t) => `
      <div>
        ${h4(14, 12, '#454554', t + ' Type')}
        <kpmg-horizontal-cards-rich type="${t}" styleVariant="${style}" />
      </div>`,
        )
        .join('')}
    </div>
  </div>`;

export const AllRichVariantsMatrix: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-direction: column; gap: 48px; max-width: 1200px">
      ${richGroup('1. Outlined Rich Cards', 'White surface with 1px neutral border (#d5d5dc).', 'Outlined')}
      ${richGroup('2. Elevated Rich Cards', null, 'Elevated')}
      ${richGroup('3. Filled Rich Cards', 'Tinted container background fill (#f5f5fe).', 'Filled')}
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

const STYLE_TAG = (text: string) => `<div style="font-size: 12px; font-weight: 600; color: #7c3aed; margin-bottom: 8px">${text}</div>`;
const STACKED_GROUPS = [
  {
    type: 'Media',
    heading: '1. Stacked Cards - Media Type (6 Variants)',
    desc: 'Featuring user header, single or double media thumbnails, document badge overlay, and action buttons footer.',
    author: ['Devon Lane', '3 hours ago'],
    one: ['Financial Assessment Report', 'Audit &amp; Advisory', ''],
    two: ['Brand Imagery Package', 'Marketing &amp; Design', ''],
  },
  {
    type: 'Assistant',
    heading: '2. Stacked Cards - Assistant Type (6 Variants)',
    desc: 'Featuring user header, media thumbnails, content description, filter chips, and interactive social counters (Heart, Bookmark, Share).',
    author: ['Tax Copilot', 'Automated Insight'],
    one: ['AI Tax Optimization Guidance', 'Tax &amp; Regulatory', '[chips]="[\'Tax\', \'Regulatory\']" [heartCount]="35" [bookmarkCount]="14" [shareCount]="7"'],
    two: ['Comparative Scenario Model', 'Forecasting', '[chips]="[\'Model\', \'Fiscal\']" [heartCount]="28" [bookmarkCount]="9" [shareCount]="3"'],
  },
  {
    type: 'Forum',
    heading: '3. Stacked Cards - Forum Type (6 Variants)',
    desc: 'Featuring user header, media thumbnails, content description, and avatar group indicating participant engagement.',
    author: ['Courtney Henry', 'Yesterday at 4:32 PM'],
    one: ['WorkBench System Architecture', 'Engineering Channel', '[avatarCount]="3"'],
    two: ['Design System Component Critique', 'Design Practice', '[avatarCount]="4"'],
  },
];
const stackedBlock = (g: (typeof STACKED_GROUPS)[number], n: 1 | 2) => {
  const [title, subhead, extra] = n === 1 ? g.one : g.two;
  return `
    ${h4(15, 16, '#454554', 'Image Amount = ' + n)}
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 340px)); gap: 24px;${n === 1 ? ' margin-bottom: 32px' : ''}">
      ${['Outline', 'Elevated', 'Filled']
        .map(
          (st) => `
      <div>
        ${STYLE_TAG('Style: ' + st)}
        <kpmg-stacked-card type="${g.type}" styleVariant="${st}" [imageAmount]="${n}" title="${title}" subhead="${subhead}" authorName="${g.author[0]}" authorSubhead="${g.author[1]}" ${extra} />
      </div>`,
        )
        .join('')}
    </div>`;
};

export const AllStackedCardVariantsMatrix: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-direction: column; gap: 56px; max-width: 1200px">
      ${STACKED_GROUPS.map(
        (g) => `
      <div>
        ${h3(20, 6, g.heading, '#1e1e24')}
        ${para(24, '#68687a', g.desc)}
        ${stackedBlock(g, 1)}
        ${stackedBlock(g, 2)}
      </div>`,
      ).join('')}
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

const SPECIAL_STYLES = ['Outline', 'Elevated', 'Filled'];
const specialGrid = (minW: number, gap: number, inner: string) =>
  `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(${minW}px, ${minW}px)); gap: ${gap}px">${inner}</div>`;
const specialH3 = (text: string) => h3(20, 6, text, '#1e1e24');
const SQL_SMALL = 'SELECT id, status, total FROM transactions WHERE variance > 0.05;';
const SQL_LARGE = '-- Calculate quarterly exposure delta\nWITH baseline AS (\n  SELECT quarter, SUM(amount) AS total\n  FROM revenue GROUP BY quarter\n)\nSELECT * FROM baseline;';
const SLIDER_VALUES: Record<string, number> = { Outline: 40, Elevated: 70, Filled: 85 };

export const AllSpecialCardVariantsMatrix: Story = {
  render: () => ({
    props: { sqlSmall: SQL_SMALL, sqlLarge: SQL_LARGE, matrixChips: ['Advisory', 'Tax', 'Audit', 'Strategy', 'Risk', 'Consulting'], matrixSelected: ['Advisory', 'Strategy'] },
    template: `
    <div style="display: flex; flex-direction: column; gap: 64px; max-width: 1400px">
      <div>
        ${specialH3('1. Special Cards - Slider (3 Variants)')}
        ${specialGrid(
          340,
          24,
          SPECIAL_STYLES.map(
            (st) => `
          <div>
            ${STYLE_TAG('Style: ' + st)}
            <kpmg-special-card type="Slider" styleVariant="${st}" title="Creativity Threshold" description="Deterministic vs generative output balancing" [sliderValue]="${SLIDER_VALUES[st]}" />
          </div>`,
          ).join(''),
        )}
      </div>

      <div>
        ${specialH3('2. Special Cards - Chips (9 Variants, 428px)')}
        ${para(20, '#68687a', 'Categorical selection cards featuring 2x3 chip grids across Filter, Assistive, and Input chip types.')}
        ${['Filter', 'Assistive', 'Input']
          .map(
            (c) => `
        <div style="margin-bottom: 28px">
          ${h4(15, 12, '#454554', 'Chip Type: ' + c)}
          ${specialGrid(
            428,
            20,
            SPECIAL_STYLES.map(
              (st) => `
            <div>
              ${STYLE_TAG(`Type: ${c} | Style: ${st}`)}
              <kpmg-special-card type="Chips" chipsType="${c}" styleVariant="${st}" title="${c} Categorization" description="Interactive ${c.toLowerCase()} chips grid with selection states" [chips]="matrixChips" [defaultSelectedChips]="matrixSelected" />
            </div>`,
            ).join(''),
          )}
        </div>`,
          )
          .join('')}
      </div>

      <div>
        ${specialH3('3. Special Cards - References (3 Variants, 435px)')}
        ${para(20, '#68687a', 'Source citation cards with linked statutory references, badges, and external destination links.')}
        ${specialGrid(
          435,
          24,
          SPECIAL_STYLES.map(
            (st) => `
          <div>
            ${STYLE_TAG('Style: ' + st)}
            <kpmg-special-card type="References" styleVariant="${st}" title="Statutory Citations" headerActionText="4 sources" />
          </div>`,
          ).join(''),
        )}
      </div>

      <div>
        ${specialH3('4. Special Cards - Code (6 Variants, 435px)')}
        ${para(20, '#68687a', 'Formatted code snippets with language badge and one-click clipboard copy action in Small (112px) and Large (212px).')}
        ${['Small', 'Large']
          .map(
            (z) => `
        <div style="margin-bottom: 28px">
          ${h4(15, 12, '#454554', 'Size: ' + z)}
          ${specialGrid(
            435,
            20,
            SPECIAL_STYLES.map(
              (st) => `
            <div>
              ${STYLE_TAG(`Size: ${z} | Style: ${st}`)}
              <kpmg-special-card type="Code" codeSize="${z}" styleVariant="${st}" title="Audit Verification Query" language="SQL" [code]="${z === 'Small' ? 'sqlSmall' : 'sqlLarge'}" />
            </div>`,
            ).join(''),
          )}
        </div>`,
          )
          .join('')}
      </div>

      <div>
        ${specialH3('5. Special Cards - Loading (6 Variants)')}
        ${specialGrid(
          414,
          24,
          ['Small', 'Medium', 'Large']
            .map((z) =>
              ['Light', 'Dark']
                .map(
                  (m) => `
          <div>
            ${STYLE_TAG(`Size: ${z} | Mode: ${m}`)}
            <kpmg-special-card type="Loading" loadingSize="${z}" mode="${m}" />
          </div>`,
                )
                .join(''),
            )
            .join(''),
        )}
      </div>

      <div>
        ${specialH3('6. Special Cards - Rich Accordion (3 Variants)')}
        ${para(20, '#68687a', 'Collapsible cards with header tooltip and nested micro-model sliders.')}
        ${specialGrid(
          376,
          24,
          [
            ['State: Closed | With tooltip: False', 'Outline', false, false],
            ['State: Open | With tooltip: False', 'Elevated', true, false],
            ['State: Open | With tooltip: True', 'Filled', true, true],
          ]
            .map(
              ([lbl, st, open, tip]) => `
          <div>
            ${STYLE_TAG(lbl as string)}
            <kpmg-special-card type="Rich" styleVariant="${st}" [defaultOpen]="${open}" [withTooltip]="${tip}" />
          </div>`,
            )
            .join(''),
        )}
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

const TASK_LABEL = (text: string) => `<div style="font-size: 12px; font-weight: 600; color: #00338d; margin-bottom: 8px">${text}</div>`;
const taskPage = (heading: string, desc: string, cards: string[][]) => `
  <div style="display: flex; flex-direction: column; gap: 24px">
    <div>
      ${h3(16, 8, heading, '#2f2f39', '600')}
      ${para(16, '#9090a2', desc)}
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 20px">
      ${cards.map(([lbl, card]) => `<div>${TASK_LABEL(lbl)}${card}</div>`).join('')}
    </div>
  </div>`;

export const TaskCardChecked: Story = {
  render: () => ({
    template: taskPage(
      'Task Cards - Checked State',
      'Completed tasks display strikethrough styling on title with a filled checkmark control.',
      ['Outline', 'Elevated', 'Filled'].map((s) => [
        `${s} Style`,
        `<kpmg-task-card type="Checked" styleVariant="${s}" title="Review entity provision calculation" description="Verify state apportionment factor workpapers and ledger ties." />`,
      ]),
    ),
  }),
};
export const TaskCardWithAction: Story = {
  render: () => ({
    template: taskPage('Task Cards - Configuration: With Action (117px height)', 'Contains a 60×32px action pill button below the description.', [
      ['Unchecked • Secondary Action', `<kpmg-task-card type="Unchecked" styleVariant="Outline" [withAction]="true" actionText="Action" actionVariant="secondary" title="Validate quarterly return schedule" description="Supporting line text lorem ipsum dolor sit amet" />`],
      ['Unchecked • Primary Action', `<kpmg-task-card type="Unchecked" styleVariant="Elevated" [withAction]="true" actionText="Start" actionVariant="primary" title="Validate quarterly return schedule" description="Supporting line text lorem ipsum dolor sit amet" />`],
      ['Checked • Secondary Action', `<kpmg-task-card type="Checked" styleVariant="Filled" [withAction]="true" actionText="Review" actionVariant="secondary" title="Validate quarterly return schedule" description="Supporting line text lorem ipsum dolor sit amet" />`],
    ]),
  }),
};
export const TaskCardWithFileUploader: Story = {
  render: () => ({
    props: {
      files1: ['Q3_Tax_Workpaper.xlsx', 'Engagement_Letter.pdf'],
      files2: ['Signed_Confirmation.pdf'],
    },
    template: taskPage('Task Cards - Configuration: With File Uploader (213px height)', 'Includes an interactive dashed drag-and-drop file upload target container.', [
      ['Outline • Empty Uploader', `<kpmg-task-card type="Unchecked" styleVariant="Outline" [withFileUploader]="true" title="Attach audit workpaper documentation" description="Supporting line text lorem ipsum" uploaderText="Drop files here or click to browse" uploaderSubtext="PDF, DOCX, XLSX up to 25MB" />`],
      ['Elevated • With Uploaded Files', `<kpmg-task-card type="Unchecked" styleVariant="Elevated" [withFileUploader]="true" title="Attach audit workpaper documentation" description="Supporting line text lorem ipsum" [uploadedFiles]="files1" />`],
      ['Filled • Checked', `<kpmg-task-card type="Checked" styleVariant="Filled" [withFileUploader]="true" title="Attach audit workpaper documentation" description="Supporting line text lorem ipsum" [uploadedFiles]="files2" />`],
    ]),
  }),
};
export const TaskCardLoading: Story = {
  render: () => ({
    props: { files: ['Trial_Balance_2026.xlsx'] },
    template: taskPage('Task Cards - Loading Type', 'Shows a 24×24px spinning circular progress indicator in place of the checkbox.', [
      ['Base Configuration (80px)', `<kpmg-task-card type="Loading" styleVariant="Outline" title="Generating tax variance model" description="Synchronizing ledger entries..." />`],
      ['With Action Configuration (117px)', `<kpmg-task-card type="Loading" styleVariant="Elevated" [withAction]="true" actionText="Cancel" title="Executing automated compliance check" description="Running KPMG Clara rules engine" />`],
      ['With Uploader Configuration (213px)', `<kpmg-task-card type="Loading" styleVariant="Filled" [withFileUploader]="true" title="Analyzing uploaded documentation" description="OCR extraction in progress" [uploadedFiles]="files" />`],
    ]),
  }),
};

const TASK_CONFIGS = [
  { label: 'Base Configuration (Height: 80px)', attrs: '' },
  { label: 'Configuration: With Action (Height: 117px)', attrs: '[withAction]="true" actionText="Action"' },
  { label: 'Configuration: With File Uploader (Height: 213px)', attrs: '[withFileUploader]="true"' },
];
const TASK_TYPE_COLOR: Record<string, string> = { Unchecked: '#2f2f39', Checked: '#0070ad', Loading: '#7c3aed' };
const TASK_STATE_STYLE: Record<string, string> = { enabled: 'Outline', hovered: 'Elevated', pressed: 'Filled' };

export const AllTaskCardVariantsMatrix: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-direction: column; gap: 48px; max-width: 1300px">
      <div>
        <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #2f2f39">Task Cards - Complete 27 Variant Matrix</h2>
        <p style="margin: 0 0 24px 0; font-size: 14px; color: #9090a2; line-height: 1.5">
          3 Types (Unchecked, Checked, Loading) × 3 Configurations (Base, With action, With file uploader) × 3 States (Enabled, Hovered, Pressed).
          Each card maintains a fixed 378px width with charcoal \`#2f2f39\` title and grey \`#9090a2\` text.
        </p>
      </div>
      ${TASK_CONFIGS.map(
        (c) => `
      <div style="border-bottom: 1px solid #e0e0e0; padding-bottom: 40px">
        ${h3(17, 20, c.label, '#00338d', '600')}
        <div style="display: flex; flex-direction: column; gap: 28px">
          ${['Unchecked', 'Checked', 'Loading']
            .map(
              (t) => `
          <div>
            <div style="font-size: 13px; font-weight: 600; color: #555; margin-bottom: 12px">Type: <span style="color: ${TASK_TYPE_COLOR[t]}">${t}</span></div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 20px">
              ${['enabled', 'hovered', 'pressed']
                .map(
                  (st) => `
              <div>
                <div style="font-size: 11px; font-weight: 500; color: #9090a2; margin-bottom: 6px; text-transform: capitalize">State: ${st}</div>
                <kpmg-task-card type="${t}" state="${st}" styleVariant="${TASK_STATE_STYLE[st]}" title="Task title (${t})" description="Supporting line text lorem ipsum" ${c.attrs} />
              </div>`,
                )
                .join('')}
            </div>
          </div>`,
            )
            .join('')}
        </div>
      </div>`,
      ).join('')}
    </div>`,
  }),
};
