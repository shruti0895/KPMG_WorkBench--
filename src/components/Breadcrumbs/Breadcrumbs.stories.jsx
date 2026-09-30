import React from 'react';
import {
  Breadcrumbs,
  CircleCheckboxIconSvg,
  StarOutlineIconSvg,
  StarFilledIconSvg,
  CheckmarkIconSvg,
} from './Breadcrumbs';

const circleCheckboxItems = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Option', href: '/option-1', useCircleCheckbox: true },
  { id: '3', label: 'Option', href: '/option-2', useCircleCheckbox: true, hasDivider: true },
  { id: '4', label: 'Option', href: '/option-3', useCircleCheckbox: true },
  { id: '5', label: 'Option', href: '/option-4', useCircleCheckbox: true },
  { id: '6', label: 'Option', href: '/option-5', useCircleCheckbox: true },
  { id: '7', label: 'Option', href: '/option-6', useCircleCheckbox: true, hasDivider: true },
  { id: '8', label: 'Current Page', isCurrent: true },
];

const starBookmarkItems = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Option', href: '/opt-1', isStar: true, isChecked: true },
  { id: '3', label: 'Option', href: '/opt-2', isStar: false, isChecked: true, hasDivider: true },
  { id: '4', label: 'Option', href: '/opt-3', isStar: true, isChecked: true },
  { id: '5', label: 'Option', href: '/opt-4', isStar: false, isChecked: true },
  { id: '6', label: 'Option', href: '/opt-5', isStar: true, isChecked: true },
  { id: '7', label: 'Option', href: '/opt-6', isStar: true, isChecked: true, hasDivider: true },
  { id: '8', label: 'Current Page', isCurrent: true },
];

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumbs component formatted to match Figma dropdown card specs. Features top-left tooltip arrow caret, Circle Checkbox list (Image 1 spec), Star/Bookmark & Checkmark list (Image 2 spec), and custom SVG props.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    maxItems: {
      control: 'number',
    },
    overflowTrigger: {
      control: 'select',
      options: ['click', 'hover'],
    },
  },
};

export const Basic = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: 'Breadcrumbs', isCurrent: true },
    ],
    separator: '/',
  },
};

// Image 1 Spec: Circle Checkbox List with Dividers
export const CircleCheckboxDropdownList = {
  args: {
    items: circleCheckboxItems,
    maxItems: 4,
    itemsAfterCollapse: 1,
    separator: '/',
    overflowTrigger: 'click',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '600px', width: '100%', padding: '24px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

// Image 2 Spec: Star/Bookmark + Trailing Checkmark List with Dividers
export const StarBookmarkDropdownList = {
  args: {
    items: starBookmarkItems,
    maxItems: 4,
    itemsAfterCollapse: 1,
    separator: '/',
    overflowTrigger: 'click',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '600px', width: '100%', padding: '24px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

// Custom SVG Icons Overrides Story
export const CustomSvgPropsOverrides = {
  args: {
    items: circleCheckboxItems,
    maxItems: 4,
    itemsAfterCollapse: 1,
    separator: '/',
    overflowTrigger: 'click',
    circleCheckboxIcon: <CircleCheckboxIconSvg color="#1E49E2" size={18} />,
    starIcon: <StarFilledIconSvg color="#F4D533" size={18} />,
    checkIcon: <CheckmarkIconSvg color="#029A6C" size={16} />,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '600px', width: '100%', padding: '24px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SmallSize = {
  args: {
    size: 'sm',
    items: [
      { label: 'Root', href: '/' },
      { label: 'Library', href: '/lib' },
      { label: 'Current Item', isCurrent: true },
    ],
    separator: '/',
  },
};

export const AllVariantsMatrix = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', maxWidth: '750px', width: '100%' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans' }}>Standard 3-Level Breadcrumbs</h4>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Components', href: '/components' },
            { label: 'Breadcrumbs', isCurrent: true },
          ]}
          separator="/"
        />
      </div>

      <div style={{ minHeight: '600px', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans' }}>
          Dropdown Card Spec 1: Circle Checkbox Options List (Click ...)
        </h4>
        <Breadcrumbs
          items={circleCheckboxItems}
          maxItems={4}
          itemsAfterCollapse={1}
          separator="/"
          overflowTrigger="click"
        />
      </div>

      <div style={{ minHeight: '600px', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans' }}>
          Dropdown Card Spec 2: Star Bookmark + Trailing Checkmark Options List (Click ... - Stars trigger toast popup)
        </h4>
        <Breadcrumbs
          items={starBookmarkItems}
          maxItems={4}
          itemsAfterCollapse={1}
          separator="/"
          overflowTrigger="click"
        />
      </div>
    </div>
  ),
};
