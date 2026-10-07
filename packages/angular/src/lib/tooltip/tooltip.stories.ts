import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { TooltipComponent } from './tooltip.component';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [TooltipComponent] })],
  parameters: { layout: 'padded' },
  args: { variant: 'single-line', theme: 'elevated', placement: 'top', caret: true, trigger: 'hover', content: 'Supporting text' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['single-line', 'multi-line', 'rich-action', 'rich-source', 'rich-alert-small', 'rich-alert-large', 'menu-list', 'menu-icon'],
    },
    theme: { control: 'radio', options: ['elevated', 'filled'] },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right', 'side-l', 'side-r'] },
    trigger: { control: 'radio', options: ['hover', 'click', 'manual'] },
    caretSize: { control: 'radio', options: [undefined, 'sm', 'md', 'lg'] },
    caret: { control: 'boolean' },
    contentTemplate: { control: false },
    actions: { control: false },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 120px 160px">
        <kpmg-tooltip ${argsToTemplate(args)}>
          <button type="button" style="padding: 8px 16px">Hover or focus me</button>
        </kpmg-tooltip>
      </div>`,
  }),
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const SingleLine: Story = {};
export const MultiLine: Story = { args: { variant: 'multi-line', content: undefined } };
export const Filled: Story = { args: { theme: 'filled' } };
export const Click: Story = { args: { trigger: 'click', content: 'Click outside to close' } };
export const RichAction: Story = { args: { variant: 'rich-action', title: 'Heading', content: 'Supporting copy for the action.' } };
export const RichSource: Story = { args: { variant: 'rich-source', title: 'Sources' } };
export const RichAlert: Story = { args: { variant: 'rich-alert-large', title: 'Alerts', sectionLabel: 'Secondary text' } };
export const MenuList: Story = { args: { variant: 'menu-list', trigger: 'click' } };
export const MenuIcon: Story = { args: { variant: 'menu-icon', trigger: 'click' } };

/** `static` renders the tooltip on its own, e.g. for documentation previews. */
export const Static: Story = {
  render: (args) => ({
    props: args,
    template: `<kpmg-tooltip static ${argsToTemplate(args)} />`,
  }),
};
