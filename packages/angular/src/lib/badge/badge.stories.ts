import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [BadgeComponent] })],
  args: { size: 'medium', styleType: 'primary', state: 'loud', count: 5, maxCount: 99, showZero: false, dot: false },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    styleType: { control: 'radio', options: ['primary', 'neutral'] },
    state: { control: 'radio', options: ['loud', 'quiet'] },
    placement: { control: 'select', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'] },
    count: { control: 'number' },
    maxCount: { control: 'number' },
    showZero: { control: 'boolean' },
    dot: { control: 'boolean' },
  },
  render: (args) => ({ props: args, template: `<kpmg-badge ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const PrimaryLoud: Story = {};
export const PrimaryQuiet: Story = { args: { state: 'quiet' } };
export const NeutralLoud: Story = { args: { styleType: 'neutral' } };
export const NeutralQuiet: Story = { args: { styleType: 'neutral', state: 'quiet' } };
export const Large: Story = { args: { size: 'large', count: 120 } };
export const Dot: Story = { args: { size: 'small' } };

export const AnchoredToElement: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kpmg-badge anchored [count]="count" [size]="size" [styleType]="styleType" [state]="state">
        <button type="button" style="padding: 8px 16px">Inbox</button>
      </kpmg-badge>`,
  }),
};
