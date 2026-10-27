import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionSkeletonComponent } from './accordion-skeleton.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  subcomponents: { AccordionItemComponent, AccordionSkeletonComponent },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Accordion Component

An **Accordion** is a vertical list of headings that each show or hide a panel of related content, so long pages can be scanned and read in parts. Build it from \`kpmg-accordion\` and \`kpmg-accordion-item\`, and use \`kpmg-accordion-skeleton\` while content loads.

- **Sizes**: \`sm\` (32px), \`md\` (40px, default) and \`lg\` (48px) headings.
- **Alignment**: the chevron sits at the end of the heading by default, or at the start with \`align="start"\`. \`isFlush\` removes the horizontal padding.
- **Controlled and uncontrolled**: items manage their own open state; bind \`[(open)]\` or \`[open]\` to drive them from outside.
- **Accessible**: each heading is a button with \`aria-expanded\` and \`aria-controls\`, and each panel is a \`region\` labelled by its heading.
        `,
      },
    },
  },
  argTypes: {
    align: {
      control: { type: 'radio' },
      options: ['end', 'start'],
      description: 'Side of the heading where the chevron is placed',
      table: { type: { summary: "'start' | 'end'" }, defaultValue: { summary: "'end'" } },
    },
    isFlush: {
      control: 'boolean',
      description: 'Remove the horizontal padding so the text lines up with surrounding content (ignored when align is "start")',
      table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Heading height: sm (32px), md (40px) or lg (48px)',
      table: { type: { summary: "'sm' | 'md' | 'lg'" }, defaultValue: { summary: "'md'" } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable every item in the accordion',
      table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names for the container',
      table: { type: { summary: 'string' } },
    },
  },
  args: { align: 'end', isFlush: false, size: 'md', disabled: false },
  decorators: [moduleMetadata({ imports: [AccordionComponent, AccordionItemComponent, AccordionSkeletonComponent, ButtonComponent] })],
};

export default meta;
type Story = StoryObj<AccordionComponent>;

const ITEMS = [
  { title: 'Choose your plan', body: 'Compare the available plans and pick the one that fits your team. You can change it later from the billing settings.' },
  { title: 'Add team members', body: 'Invite colleagues by email. Each person receives a link to join the workspace and set up their profile.' },
  { title: 'Set payment details', body: 'Enter a payment method for the plan. Charges start once the trial period ends.' },
  { title: 'Review and confirm', body: 'Check the summary of your plan, team and payment details, then confirm to finish setting up.' },
];

const items = (attrs: (index: number) => string = () => '', count = ITEMS.length) =>
  ITEMS.slice(0, count)
    .map((item, i) => `<kpmg-accordion-item title="${item.title}" ${attrs(i)}>${item.body}</kpmg-accordion-item>`)
    .join('\n');

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `<kpmg-accordion ${argsToTemplate(args)}>${items()}</kpmg-accordion>`,
  }),
};

export const Controlled: Story = {
  name: 'Controlled',
  render: (args) => ({
    props: { ...args, states: [false, false, false, false], setAll(value: boolean) { this['states'] = [value, value, value, value]; } },
    template: `
      <div>
        <div style="display: flex; gap: var(--spacing-4); margin-bottom: var(--spacing-5)">
          <kpmg-button variant="outline" size="sm" (click)="setAll(true)">Open all</kpmg-button>
          <kpmg-button variant="outline" size="sm" (click)="setAll(false)">Close all</kpmg-button>
        </div>
        <kpmg-accordion ${argsToTemplate(args)}>${items((i) => `[(open)]="states[${i}]"`)}</kpmg-accordion>
      </div>
    `,
  }),
};

export const SkeletonState: Story = {
  name: 'Skeleton state',
  render: (args) => ({
    props: args,
    template: `<kpmg-accordion-skeleton [align]="align" [isFlush]="isFlush" />`,
  }),
};

export const AlignStart: Story = {
  name: 'Align start',
  args: { align: 'start' },
  render: (args) => ({
    props: args,
    template: `<kpmg-accordion ${argsToTemplate(args)}>${items()}</kpmg-accordion>`,
  }),
};

export const Flush: Story = {
  name: 'Flush',
  args: { isFlush: true },
  render: (args) => ({
    props: args,
    template: `<kpmg-accordion ${argsToTemplate(args)}>${items()}</kpmg-accordion>`,
  }),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: (args) => {
    const { size: _size, ...rest } = args;
    return {
      props: rest,
      template: `
        <div style="display: flex; flex-direction: column; gap: var(--spacing-7)">
          ${['sm', 'md', 'lg']
            .map(
              (s) => `
            <div>
              <p style="margin: 0 0 var(--spacing-2); font-weight: var(--font-weight-semibold); color: var(--color-on-surface)">${s}</p>
              <kpmg-accordion ${argsToTemplate(rest)} size="${s}">${items((i) => (i === 0 ? 'defaultOpen' : ''), 3)}</kpmg-accordion>
            </div>`,
            )
            .join('')}
        </div>
      `,
    };
  },
};

export const DisabledItems: Story = {
  name: 'Disabled items',
  render: (args) => ({
    props: args,
    template: `<kpmg-accordion ${argsToTemplate(args)}>${items((i) => (i === 1 || i === 2 ? 'disabled' : ''))}</kpmg-accordion>`,
  }),
};
