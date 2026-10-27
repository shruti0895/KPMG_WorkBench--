import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionSkeleton } from './index';
import { Button } from '../Button/Button';

const ITEMS = [
  { title: 'Choose your plan', body: 'Compare the available plans and pick the one that fits your team. You can change it later from the billing settings.' },
  { title: 'Add team members', body: 'Invite colleagues by email. Each person receives a link to join the workspace and set up their profile.' },
  { title: 'Set payment details', body: 'Enter a payment method for the plan. Charges start once the trial period ends.' },
  { title: 'Review and confirm', body: 'Check the summary of your plan, team and payment details, then confirm to finish setting up.' },
];

const renderItems = (itemProps = {}) =>
  ITEMS.map((item, index) => (
    <AccordionItem key={item.title} title={item.title} {...(typeof itemProps === 'function' ? itemProps(index) : itemProps)}>
      {item.body}
    </AccordionItem>
  ));

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem, AccordionSkeleton },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Accordion Component

An **Accordion** is a vertical list of headings that each show or hide a panel of related content, so long pages can be scanned and read in parts. Build it from \`Accordion\` and \`AccordionItem\`, and use \`AccordionSkeleton\` while content loads.

- **Sizes**: \`sm\` (32px), \`md\` (40px, default) and \`lg\` (48px) headings.
- **Alignment**: the chevron sits at the end of the heading by default, or at the start with \`align="start"\`. \`isFlush\` removes the horizontal padding.
- **Controlled and uncontrolled**: items manage their own open state; pass \`open\` to drive them from outside.
- **Accessible**: each heading is a button with \`aria-expanded\` and \`aria-controls\`, and each panel is a \`region\` labelled by its heading.
        `,
      },
    },
  },
  tags: ['autodocs'],
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
    children: {
      control: false,
      description: 'AccordionItem elements (each takes title, open, defaultOpen, disabled, onHeadingClick and className)',
      table: { type: { summary: 'node' } },
    },
  },
  args: { align: 'end', isFlush: false, size: 'md', disabled: false },
};

export const Default = {
  name: 'Default',
  render: (args) => <Accordion {...args}>{renderItems()}</Accordion>,
};

export const Controlled = {
  name: 'Controlled',
  render: (args) => {
    const [openStates, setOpenStates] = useState(ITEMS.map(() => false));
    const setAll = (value) => setOpenStates(ITEMS.map(() => value));
    return (
      <div>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-5)' }}>
          <Button variant="outline" size="sm" onClick={() => setAll(true)}>Open all</Button>
          <Button variant="outline" size="sm" onClick={() => setAll(false)}>Close all</Button>
        </div>
        <Accordion {...args}>
          {renderItems((index) => ({
            open: openStates[index],
            onHeadingClick: ({ isOpen }) =>
              setOpenStates((states) => states.map((value, i) => (i === index ? isOpen : value))),
          }))}
        </Accordion>
      </div>
    );
  },
};

export const SkeletonState = {
  name: 'Skeleton state',
  render: (args) => <AccordionSkeleton align={args.align} isFlush={args.isFlush} />,
};

export const AlignStart = {
  name: 'Align start',
  args: { align: 'start' },
  render: (args) => <Accordion {...args}>{renderItems()}</Accordion>,
};

export const Flush = {
  name: 'Flush',
  args: { isFlush: true },
  render: (args) => <Accordion {...args}>{renderItems()}</Accordion>,
};

export const Sizes = {
  name: 'Sizes',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-7)' }}>
      {['sm', 'md', 'lg'].map((size) => (
        <div key={size}>
          <p style={{ margin: '0 0 var(--spacing-2)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-on-surface)' }}>{size}</p>
          <Accordion {...args} size={size}>
            {renderItems((i) => ({ defaultOpen: i === 0 })).slice(0, 3)}
          </Accordion>
        </div>
      ))}
    </div>
  ),
};

export const DisabledItems = {
  name: 'Disabled items',
  render: (args) => (
    <Accordion {...args}>
      {renderItems((i) => ({ disabled: i === 1 || i === 2 }))}
    </Accordion>
  ),
};
