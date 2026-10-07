import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { SwitchComponent } from './switch.component';

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SwitchComponent] })],
  args: { checked: false, icon: false, disabled: false, label: 'Notifications', labelPlacement: 'end' },
  argTypes: {
    checked: { control: 'boolean' },
    icon: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: { control: 'select', options: [undefined, 'enabled', 'hovered', 'pressed', 'disabled'] },
    labelPlacement: { control: 'radio', options: ['start', 'end'] },
    customCheckIcon: { control: false },
    customDismissIcon: { control: false },
  },
  render: (args) => ({ props: args, template: `<kpmg-switch ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Off: Story = {};
export const On: Story = { args: { checked: true } };
export const WithIcon: Story = { args: { icon: true, checked: true } };
export const WithHelperText: Story = { args: { helperText: 'Receive email updates' } };
export const LabelStart: Story = { args: { labelPlacement: 'start' } };
export const Disabled: Story = { args: { disabled: true, checked: true } };
