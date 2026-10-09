import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';

type ButtonStoryArgs = ButtonComponent & { children: string; onClick: unknown };

const ARROW_RIGHT = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" /></svg>';
const ARROW_LEFT = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" /></svg>';
const STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>';

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary Button component for KPMG WorkBench Design System. Supports all Figma variants: Primary/Filled, Tonal, Secondary, Outline, Text, and Elevated, as well as SVG icon props and proper disabled gray borders.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ButtonComponent] })],
  argTypes: {
    children: { control: 'text', description: 'Button contents or label', table: { type: { summary: 'node' }, defaultValue: { summary: "'Button'" } } },
    variant: { control: 'select', options: ['primary', 'tonal', 'secondary', 'outline', 'text', 'elevated'], description: 'The visual style variant of the button', table: { type: { summary: "'primary' | 'tonal' | 'secondary' | 'outline' | 'text' | 'elevated'" }, defaultValue: { summary: "'primary'" } } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'The size scale of the button', table: { type: { summary: "'sm' | 'md' | 'lg'" }, defaultValue: { summary: "'md'" } } },
    disabled: { control: 'boolean', description: 'Disables user interaction and applies gray disabled token styles', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    fullWidth: { control: 'boolean', description: 'Stretches button to 100% width of parent container', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    iconLeft: { control: 'object', description: 'Optional icon (SVG element or component) rendered before text', table: { type: { summary: 'node' }, defaultValue: { summary: '-' } } },
    iconRight: { control: 'object', description: 'Optional icon (SVG element or component) rendered after text', table: { type: { summary: 'node' }, defaultValue: { summary: '-' } } },
    icon: { control: 'object', description: 'Shorthand for iconLeft', table: { type: { summary: 'node' }, defaultValue: { summary: '-' } } },
    onClick: { action: 'clicked', description: 'Optional click handler', table: { type: { summary: 'func' } } },
    type: { control: 'select', options: ['button', 'submit', 'reset'], description: 'HTML button type attribute', table: { type: { summary: "'button' | 'submit' | 'reset'" }, defaultValue: { summary: "'button'" } } },
    className: { control: 'text', description: 'Additional custom CSS class names', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
  },
  render: ({ children, onClick, ...args }) => ({
    props: args,
    template: `<kpmg-button ${argsToTemplate(args)}>${children}</kpmg-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

// Default Primary Story
export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary Action', size: 'md' },
};

// Tonal / Soft (#E9EAFC fill) Variant Story
export const Tonal: Story = {
  args: { variant: 'tonal', children: 'Tonal / Soft Action', size: 'md' },
};

// Secondary Variant Story
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary Action', size: 'md' },
};

// Outline Variant Story
export const Outline: Story = {
  args: { variant: 'outline', children: 'Outlined Action', size: 'md' },
};

// Text Variant Story
export const Text: Story = {
  args: { variant: 'text', children: 'Text Action', size: 'md' },
};

// Elevated Variant Story
export const Elevated: Story = {
  args: { variant: 'elevated', children: 'Elevated Action', size: 'md' },
};

// Disabled States Story (Shows gray border for disabled outline)
export const DisabledStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
        <kpmg-button variant="primary" disabled>Filled Disabled</kpmg-button>
        <kpmg-button variant="tonal" disabled>Tonal Disabled</kpmg-button>
        <kpmg-button variant="outline" disabled>Outline Disabled (Gray Border)</kpmg-button>
        <kpmg-button variant="text" disabled>Text Disabled</kpmg-button>
        <kpmg-button variant="elevated" disabled>Elevated Disabled</kpmg-button>
      </div>`,
  }),
};

// Sizes Showcase Story
export const Sizes: Story = {
  render: ({ children, onClick, size, ...args }) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center">
        <kpmg-button ${argsToTemplate(args)} size="sm">Small (32px)</kpmg-button>
        <kpmg-button ${argsToTemplate(args)} size="md">Medium (40px)</kpmg-button>
        <kpmg-button ${argsToTemplate(args)} size="lg">Large (52px)</kpmg-button>
      </div>`,
  }),
  args: { variant: 'primary' },
};

// SVG Icon Props Story
export const SvgIconProps: Story = {
  render: () => ({
    template: `
      <ng-template #arrowLeft>${ARROW_LEFT}</ng-template>
      <ng-template #arrowRight>${ARROW_RIGHT}</ng-template>
      <ng-template #star>${STAR}</ng-template>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
        <kpmg-button [iconLeft]="arrowLeft">Back</kpmg-button>
        <kpmg-button [iconRight]="arrowRight">Continue</kpmg-button>
        <kpmg-button variant="tonal" [iconLeft]="star" [iconRight]="arrowRight">Star & Link</kpmg-button>
      </div>`,
  }),
};

const MATRIX_ROWS = [
  { variant: 'primary', title: 'Primary / Filled', disabledLabel: 'Disabled' },
  { variant: 'tonal', title: 'Tonal / Soft (#E9EAFC Fill)', disabledLabel: 'Disabled' },
  { variant: 'secondary', title: 'Secondary', disabledLabel: 'Disabled' },
  { variant: 'outline', title: 'Outline', disabledLabel: 'Disabled (Gray Border)' },
  { variant: 'text', title: 'Text', disabledLabel: 'Disabled' },
  { variant: 'elevated', title: 'Elevated', disabledLabel: 'Disabled' },
];

// Complete Variant Matrix Story
export const VariantMatrix: Story = {
  render: () => ({
    props: { rows: MATRIX_ROWS },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px">
        @for (row of rows; track row.variant) {
          <div>
            <h4 style="margin-bottom: 12px; font-family: Open Sans, sans-serif">{{ row.title }}</h4>
            <div style="display: flex; gap: 12px; align-items: center">
              <kpmg-button [variant]="$any(row.variant)" size="sm">Small</kpmg-button>
              <kpmg-button [variant]="$any(row.variant)" size="md">Medium</kpmg-button>
              <kpmg-button [variant]="$any(row.variant)" size="lg">Large</kpmg-button>
              <kpmg-button [variant]="$any(row.variant)" disabled>{{ row.disabledLabel }}</kpmg-button>
            </div>
          </div>
        }
      </div>`,
  }),
};
