import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CheckboxComponent] })],
  args: { size: 'large', state: 'enabled', checked: false, indeterminate: false, error: false, disabled: false, label: 'Label' },
  argTypes: {
    size: { control: 'radio', options: ['large', 'small'] },
    state: { control: 'select', options: ['enabled', 'disabled', 'hovered', 'pressed'] },
    type: {
      control: 'select',
      options: [
        undefined,
        'checked',
        'unchecked-light',
        'indeterminate',
        'unchecked',
        'error-checked',
        'error-checked-light',
        'error-indeterminate',
        'error-unchecked',
      ],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({ props: args, template: `<kpmg-checkbox ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Error: Story = { args: { error: true, subtext: 'This field is required' } };
export const ErrorChecked: Story = { args: { error: true, checked: true } };
export const Disabled: Story = { args: { disabled: true, checked: true } };
export const Small: Story = { args: { size: 'small', checked: true } };
