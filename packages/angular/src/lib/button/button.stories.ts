import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';

type ButtonStoryArgs = ButtonComponent & { children: string };

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ButtonComponent] })],
  args: { children: 'Button', variant: 'primary', size: 'md', disabled: false, fullWidth: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'tonal', 'secondary', 'outline', 'text', 'elevated'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconLeft: { control: false },
    icon: { control: false },
    iconRight: { control: false },
  },
  render: ({ children, ...args }) => ({
    props: args,
    template: `<kpmg-button ${argsToTemplate(args)}>${children}</kpmg-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Primary: Story = {};
export const Tonal: Story = { args: { variant: 'tonal' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Text: Story = { args: { variant: 'text' } };
export const Elevated: Story = { args: { variant: 'elevated' } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

export const WithIcons: Story = {
  render: () => ({
    template: `
      <ng-template #left><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></ng-template>
      <ng-template #right><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></ng-template>
      <div style="display: flex; gap: 12px">
        <kpmg-button [iconLeft]="left">Favourite</kpmg-button>
        <kpmg-button variant="outline" [iconRight]="right">Continue</kpmg-button>
      </div>`,
  }),
};
