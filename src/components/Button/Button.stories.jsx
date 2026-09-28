import React from 'react';
import { Button } from './Button';

const ArrowRightSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const ArrowLeftSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const StarSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary Button component for KPMG WorkBench Design System. Supports all Figma variants: Primary/Filled, Tonal (#E9EAFC), Secondary, Outline, Text, and Elevated, as well as SVG icon props and proper disabled gray borders.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'tonal', 'secondary', 'outline', 'text', 'elevated'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size scale of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction and applies gray disabled token styles',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches button to 100% width of parent container',
    },
    onClick: { action: 'clicked' },
  },
};

// Default Primary Story
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Action',
    size: 'md',
  },
};

// Tonal / Soft (#E9EAFC fill) Variant Story
export const Tonal = {
  args: {
    variant: 'tonal',
    children: 'Tonal / Soft Action',
    size: 'md',
  },
};

// Secondary Variant Story
export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Action',
    size: 'md',
  },
};

// Outline Variant Story
export const Outline = {
  args: {
    variant: 'outline',
    children: 'Outlined Action',
    size: 'md',
  },
};

// Text Variant Story
export const Text = {
  args: {
    variant: 'text',
    children: 'Text Action',
    size: 'md',
  },
};

// Elevated Variant Story
export const Elevated = {
  args: {
    variant: 'elevated',
    children: 'Elevated Action',
    size: 'md',
  },
};

// Disabled States Story (Shows gray border for disabled outline)
export const DisabledStates = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary" disabled>Filled Disabled</Button>
      <Button variant="tonal" disabled>Tonal Disabled</Button>
      <Button variant="outline" disabled>Outline Disabled (Gray Border)</Button>
      <Button variant="text" disabled>Text Disabled</Button>
      <Button variant="elevated" disabled>Elevated Disabled</Button>
    </div>
  ),
};

// Sizes Showcase Story
export const Sizes = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button {...args} size="sm">Small (32px)</Button>
      <Button {...args} size="md">Medium (40px)</Button>
      <Button {...args} size="lg">Large (52px)</Button>
    </div>
  ),
  args: {
    variant: 'primary',
  },
};

// SVG Icon Props Story
export const SvgIconProps = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button iconLeft={<ArrowLeftSvg />}>Back</Button>
      <Button iconRight={<ArrowRightSvg />}>Continue</Button>
      <Button variant="tonal" iconLeft={<StarSvg />} iconRight={<ArrowRightSvg />}>
        Star & Link
      </Button>
    </div>
  ),
};

// Complete Variant Matrix Story
export const VariantMatrix = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans, sans-serif' }}>Primary / Filled</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans, sans-serif' }}>Tonal / Soft (#E9EAFC Fill)</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="tonal" size="sm">Small</Button>
          <Button variant="tonal" size="md">Medium</Button>
          <Button variant="tonal" size="lg">Large</Button>
          <Button variant="tonal" disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans, sans-serif' }}>Secondary</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="secondary" size="sm">Small</Button>
          <Button variant="secondary" size="md">Medium</Button>
          <Button variant="secondary" size="lg">Large</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans, sans-serif' }}>Outline</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="outline" size="sm">Small</Button>
          <Button variant="outline" size="md">Medium</Button>
          <Button variant="outline" size="lg">Large</Button>
          <Button variant="outline" disabled>Disabled (Gray Border)</Button>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans, sans-serif' }}>Text</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="text" size="sm">Small</Button>
          <Button variant="text" size="md">Medium</Button>
          <Button variant="text" size="lg">Large</Button>
          <Button variant="text" disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans, sans-serif' }}>Elevated</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="elevated" size="sm">Small</Button>
          <Button variant="elevated" size="md">Medium</Button>
          <Button variant="elevated" size="lg">Large</Button>
          <Button variant="elevated" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
};
