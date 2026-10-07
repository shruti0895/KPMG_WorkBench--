import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { IconButtonComponent } from './icon-button.component';

const meta: Meta<IconButtonComponent> = {
  title: 'Components/IconButton',
  component: IconButtonComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [IconButtonComponent] })],
  args: { variant: 'filled', size: 'md', shape: 'circle', selected: false, disabled: false, ariaLabel: 'Favourite' },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outline', 'standard', 'neutral'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    shape: { control: 'radio', options: ['circle', 'square'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<kpmg-icon-button ${argsToTemplate(args)}><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></kpmg-icon-button>`,
  }),
};

export default meta;
type Story = StoryObj<IconButtonComponent>;

export const Filled: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
export const Standard: Story = { args: { variant: 'standard' } };
export const Neutral: Story = { args: { variant: 'neutral' } };
export const Square: Story = { args: { shape: 'square' } };
export const Selected: Story = { args: { selected: true } };
export const Disabled: Story = { args: { disabled: true } };
