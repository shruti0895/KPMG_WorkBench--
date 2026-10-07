import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [TextareaComponent] })],
  parameters: { layout: 'padded' },
  args: { label: 'Description', placeholder: 'Enter text...', variant: 'outlined', rows: 3, showAction: true },
  argTypes: {
    variant: { control: 'radio', options: ['outlined', 'filled'] },
    state: { control: 'select', options: ['enabled', 'hovered', 'focused', 'pressed', 'error', 'disabled'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    error: { control: 'text' },
    maxLength: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    showAction: { control: 'boolean' },
    trailingAction: { control: false },
    countFormatter: { control: false },
  },
  render: (args) => ({ props: args, template: `<kpmg-textarea ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Outlined: Story = {};
export const Filled: Story = { args: { variant: 'filled' } };
export const WithCounter: Story = { args: { maxLength: 100, helperText: 'Keep it short' } };
export const ErrorMessage: Story = { args: { error: 'This field is required', required: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Cannot edit' } };
export const NoAction: Story = { args: { showAction: false } };
