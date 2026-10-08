import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChipComponent] })],
  args: { type: 'filter', styleType: 'outlined', label: 'Label', selected: false, disabled: false, interactive: true },
  argTypes: {
    type: { control: 'select', options: ['filter', 'input', 'assistive', 'suggestion'] },
    styleType: { control: 'radio', options: ['outlined', 'elevated'] },
    state: { control: 'select', options: [undefined, 'enabled', 'hovered', 'pressed', 'dragged', 'disabled'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    isBranded: { control: 'boolean' },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  render: (args) => ({ props: args, template: `<kpmg-chip ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<ChipComponent>;

export const Filter: Story = {};
export const FilterSelected: Story = { args: { selected: true } };
export const Elevated: Story = { args: { styleType: 'elevated' } };
export const Disabled: Story = { args: { disabled: true } };
export const Branded: Story = { args: { type: 'assistive', leadingIcon: true, isBranded: true, label: 'Ask KPMG' } };

export const InputWithDelete: Story = {
  args: { type: 'input', label: 'Tag', trailingIcon: true, deletable: true },
};

export const CustomLeadingIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-template #star><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></ng-template>
      <kpmg-chip type="suggestion" label="Favourites" [leadingIcon]="star" [interactive]="true" />`,
  }),
};
