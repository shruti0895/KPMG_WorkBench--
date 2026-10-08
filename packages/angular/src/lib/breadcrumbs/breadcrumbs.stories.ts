import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { BreadcrumbItem, BreadcrumbsComponent } from './breadcrumbs.component';
import {
  CheckmarkIconComponent,
  CircleCheckboxIconComponent,
  StarFilledIconComponent,
} from './breadcrumbs-icons.component';

const circleCheckboxItems: BreadcrumbItem[] = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Option', href: '/option-1', useCircleCheckbox: true },
  { id: '3', label: 'Option', href: '/option-2', useCircleCheckbox: true, hasDivider: true },
  { id: '4', label: 'Option', href: '/option-3', useCircleCheckbox: true },
  { id: '5', label: 'Option', href: '/option-4', useCircleCheckbox: true },
  { id: '6', label: 'Option', href: '/option-5', useCircleCheckbox: true },
  { id: '7', label: 'Option', href: '/option-6', useCircleCheckbox: true, hasDivider: true },
  { id: '8', label: 'Current Page', isCurrent: true },
];

const starBookmarkItems: BreadcrumbItem[] = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Option', href: '/opt-1', isStar: true, isChecked: true },
  { id: '3', label: 'Option', href: '/opt-2', isStar: false, isChecked: true, hasDivider: true },
  { id: '4', label: 'Option', href: '/opt-3', isStar: true, isChecked: true },
  { id: '5', label: 'Option', href: '/opt-4', isStar: false, isChecked: true },
  { id: '6', label: 'Option', href: '/opt-5', isStar: true, isChecked: true },
  { id: '7', label: 'Option', href: '/opt-6', isStar: true, isChecked: true, hasDivider: true },
  { id: '8', label: 'Current Page', isCurrent: true },
];

const meta: Meta<BreadcrumbsComponent> = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    moduleMetadata({
      imports: [BreadcrumbsComponent, CircleCheckboxIconComponent, StarFilledIconComponent, CheckmarkIconComponent],
    }),
  ],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    maxItems: { control: 'number' },
    overflowTrigger: { control: 'select', options: ['click', 'hover'] },
    separator: { control: 'text' },
    circleCheckboxIcon: { control: false },
    starIcon: { control: false },
    checkIcon: { control: false },
  },
  render: (args) => ({ props: args, template: `<kpmg-breadcrumbs ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<BreadcrumbsComponent>;

const wrap = (inner: string) => `<div style="min-height:600px;width:100%;padding:24px;border-radius:8px">${inner}</div>`;

export const Basic: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: 'Breadcrumbs', isCurrent: true },
    ],
    separator: '/',
  },
};

export const CircleCheckboxDropdownList: Story = {
  args: { items: circleCheckboxItems, maxItems: 4, itemsAfterCollapse: 1, separator: '/', overflowTrigger: 'click' },
  render: (args) => ({ props: args, template: wrap(`<kpmg-breadcrumbs ${argsToTemplate(args)} />`) }),
};

export const StarBookmarkDropdownList: Story = {
  args: { items: starBookmarkItems, maxItems: 4, itemsAfterCollapse: 1, separator: '/', overflowTrigger: 'click' },
  render: (args) => ({ props: args, template: wrap(`<kpmg-breadcrumbs ${argsToTemplate(args)} />`) }),
};

export const CustomSvgPropsOverrides: Story = {
  args: { items: circleCheckboxItems, maxItems: 4, itemsAfterCollapse: 1, separator: '/', overflowTrigger: 'click' },
  render: (args) => ({
    props: args,
    template: wrap(`
      <ng-template #circle><kpmg-circle-checkbox-icon color="#1E49E2" [size]="18" /></ng-template>
      <ng-template #star><kpmg-star-filled-icon color="#F4D533" [size]="18" /></ng-template>
      <ng-template #check><kpmg-checkmark-icon color="#029A6C" [size]="16" /></ng-template>
      <kpmg-breadcrumbs ${argsToTemplate(args)} [circleCheckboxIcon]="circle" [starIcon]="star" [checkIcon]="check" />`),
  }),
};

export const SmallSize: Story = {
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

export const AllVariantsMatrix: Story = {
  render: () => ({
    props: { circleCheckboxItems, starBookmarkItems },
    template: `
      <div style="display:flex;flex-direction:column;gap:36px;max-width:750px;width:100%">
        <div>
          <h4 style="margin-bottom:12px">Standard 3-Level Breadcrumbs</h4>
          <kpmg-breadcrumbs separator="/" [items]="[{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Breadcrumbs', isCurrent: true }]" />
        </div>
        <div style="min-height:600px;padding:24px;border-radius:8px">
          <h4 style="margin-bottom:12px">Dropdown Card Spec 1: Circle Checkbox Options List (Click ...)</h4>
          <kpmg-breadcrumbs [items]="circleCheckboxItems" [maxItems]="4" [itemsAfterCollapse]="1" separator="/" overflowTrigger="click" />
        </div>
        <div style="min-height:600px;padding:24px;border-radius:8px">
          <h4 style="margin-bottom:12px">Dropdown Card Spec 2: Star Bookmark + Trailing Checkmark Options List</h4>
          <kpmg-breadcrumbs [items]="starBookmarkItems" [maxItems]="4" [itemsAfterCollapse]="1" separator="/" overflowTrigger="click" />
        </div>
      </div>`,
  }),
};
