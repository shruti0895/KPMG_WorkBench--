import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { SheetsComponent } from './sheets.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<SheetsComponent> = {
  title: 'Components/Sheets',
  component: SheetsComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SheetsComponent, ButtonComponent] })],
  parameters: { layout: 'padded' },
  args: {
    variant: 'floating',
    type: 'informational',
    size: 'large',
    sheetStyle: 'outlined',
    title: 'Item',
    progress: 80,
    isDrawer: false,
    fluid: false,
    isOpen: true,
  },
  argTypes: {
    variant: { control: 'select', options: ['floating', 'side'] },
    type: { control: 'select', options: ['informational', 'inputs', 'basic', 'project', 'pages', 'assistant'] },
    size: { control: 'select', options: ['compact', 'small', 'large'] },
    sheetStyle: { control: 'select', options: ['outlined', 'filled'] },
    title: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 100, step: 5 } },
    isDrawer: { control: 'boolean' },
    fluid: { control: 'boolean' },
    isOpen: { control: 'boolean' },
  },
  render: (args) => ({ props: args, template: `<kpmg-sheets ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<SheetsComponent>;

export const Basic: Story = { name: 'Basic Interactive Playground' };

const f = (variant: 'floating' | 'side', type: NonNullable<Story['args']>['type'], size: NonNullable<Story['args']>['size'], sheetStyle: 'outlined' | 'filled'): Story['args'] => ({
  variant,
  type,
  size,
  sheetStyle,
});

export const FloatingInformationalLargeOutlined: Story = { name: 'Floating Sheet Informational Large Outlined', args: f('floating', 'informational', 'large', 'outlined') };
export const FloatingInformationalLargeFilled: Story = { name: 'Floating Sheet Informational Large Filled', args: f('floating', 'informational', 'large', 'filled') };
export const FloatingInformationalCompactOutlined: Story = { name: 'Floating Sheet Informational Compact Outlined', args: f('floating', 'informational', 'compact', 'outlined') };
export const FloatingInformationalCompactFilled: Story = { name: 'Floating Sheet Informational Compact Filled', args: f('floating', 'informational', 'compact', 'filled') };
export const FloatingInputsLargeOutlined: Story = { name: 'Floating Sheet Inputs Large Outlined', args: f('floating', 'inputs', 'large', 'outlined') };
export const FloatingInputsLargeFilled: Story = { name: 'Floating Sheet Inputs Large Filled', args: f('floating', 'inputs', 'large', 'filled') };
export const FloatingInputsCompactOutlined: Story = { name: 'Floating Sheet Inputs Compact Outlined', args: f('floating', 'inputs', 'compact', 'outlined') };
export const FloatingInputsCompactFilled: Story = { name: 'Floating Sheet Inputs Compact Filled', args: f('floating', 'inputs', 'compact', 'filled') };
export const SideSheetBasicLargeOutlined: Story = { name: 'Side Sheet Basic Large Outlined', args: f('side', 'basic', 'large', 'outlined') };
export const SideSheetBasicLargeFilled: Story = { name: 'Side Sheet Basic Large Filled', args: f('side', 'basic', 'large', 'filled') };
export const SideSheetBasicSmallOutlined: Story = { name: 'Side Sheet Basic Small Outlined', args: f('side', 'basic', 'small', 'outlined') };
export const SideSheetBasicSmallFilled: Story = { name: 'Side Sheet Basic Small Filled', args: f('side', 'basic', 'small', 'filled') };
export const SideSheetSpecialProjectOutlined: Story = { name: 'Side Sheet Special Project Outlined', args: f('side', 'project', 'large', 'outlined') };
export const SideSheetSpecialProjectFilled: Story = { name: 'Side Sheet Special Project Filled', args: f('side', 'project', 'large', 'filled') };
export const SideSheetSpecialPagesOutlined: Story = { name: 'Side Sheet Special Pages Outlined', args: f('side', 'pages', 'large', 'outlined') };
export const SideSheetSpecialPagesFilled: Story = { name: 'Side Sheet Special Pages Filled', args: f('side', 'pages', 'large', 'filled') };
export const SideSheetSpecialAssistantOutlined: Story = { name: 'Side Sheet Special Assistant Outlined', args: f('side', 'assistant', 'large', 'outlined') };
export const SideSheetSpecialAssistantFilled: Story = { name: 'Side Sheet Special Assistant Filled', args: f('side', 'assistant', 'large', 'filled') };

export const InteractiveDrawerDemo: Story = {
  name: 'Interactive Side Sheet Drawer Demo',
  render: () => ({
    props: { open: false },
    template: `
      <div style="padding: 24px; text-align: center">
        <p style="margin-bottom: 16px; color: #454554">Click the button below to toggle the side sheet companion drawer overlay.</p>
        <kpmg-button (click)="open = true">Open Side Sheet Drawer</kpmg-button>
        <kpmg-sheets variant="side" type="assistant" size="large" [isDrawer]="true" [isOpen]="open" (sheetClose)="open = false" />
      </div>`,
  }),
};
