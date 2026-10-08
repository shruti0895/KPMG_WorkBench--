import React, { useState } from 'react';
import { Slider, SliderThumbIconSvg, SliderIndicatorBadgeSvg } from './Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Slider component features Continuous and Discrete modes, 15 core variant states, floating tooltip value indicator badges, step tick marks, and custom SVG props.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['continuous', 'discrete'],
      description: 'Slider track mode',
    },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    state: {
      control: 'select',
      options: ['enabled', 'disabled', 'hovered', 'pressed', 'Enabled with indicator'],
      description: 'Explicit Figma variant state',
    },
    showIndicator: { control: 'boolean' },
    showTicks: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    subtext: { control: 'text' },
  },
};

// 1. Basic Continuous Story
export const BasicContinuous = {
  args: {
    variant: 'continuous',
    label: 'Volume Control',
    subtext: 'Continuous slider from 0 to 100',
    defaultValue: 50,
  },
};

// 2. Discrete Slider Story
export const DiscreteWithTicks = {
  args: {
    variant: 'discrete',
    label: 'Step Ratings',
    subtext: 'Discrete step intervals (step = 10)',
    defaultValue: 40,
    step: 10,
    showTicks: true,
  },
};

// 3. Floating Tooltip Value Indicator Badge Story
export const WithValueIndicatorTooltip = {
  args: {
    variant: 'continuous',
    label: 'Brightness Level',
    subtext: 'Displays value badge tooltip above thumb',
    defaultValue: 65,
    showIndicator: true,
  },
};

// 4. Interactive Controlled Slider Demo
export const InteractiveControlled = {
  render: () => {
    const [val, setVal] = useState(50);
    const [variant, setVariant] = useState('continuous');
    const [showBadge, setShowBadge] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '450px' }}>
        <h4 style={{ fontFamily: 'Open Sans', margin: 0 }}>Interactive Slider Demo</h4>

        <Slider
          variant={variant}
          value={val}
          showIndicator={showBadge}
          step={variant === 'discrete' ? 10 : 1}
          label={`Selected Value: ${val}`}
          subtext={`Current Mode: ${variant} (0 - 100)`}
          onChange={(e, newVal) => setVal(newVal)}
        />

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setVariant(variant === 'continuous' ? 'discrete' : 'continuous')}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Toggle Mode ({variant.toUpperCase()})
          </button>
          <button
            type="button"
            onClick={() => setShowBadge(!showBadge)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Toggle Tooltip Badge ({showBadge ? 'ON' : 'OFF'})
          </button>
          <button
            type="button"
            onClick={() => setVal(0)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Set 0%
          </button>
          <button
            type="button"
            onClick={() => setVal(50)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Set 50%
          </button>
          <button
            type="button"
            onClick={() => setVal(100)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Set 100%
          </button>
        </div>
      </div>
    );
  },
};


// 6. Complete 15 Core Figma Variants Matrix Story
export const All15FigmaVariantsMatrix = {
  render: () => {
    const MATRIX_STATES = [
      { id: 'enabled-0', label: 'State=Enabled, Progress=0', state: 'enabled', val: 0, badge: false },
      { id: 'enabled-50', label: 'State=Enabled, Progress=50', state: 'enabled', val: 50, badge: false },
      { id: 'enabled-100', label: 'State=Enabled, Progress=100', state: 'enabled', val: 100, badge: false },
      { id: 'indicator-0', label: 'State=Enabled with indicator, Progress=0', state: 'Enabled with indicator', val: 0, badge: true },
      { id: 'indicator-50', label: 'State=Enabled with indicator, Progress=50', state: 'Enabled with indicator', val: 50, badge: true },
      { id: 'indicator-100', label: 'State=Enabled with indicator, Progress=100', state: 'Enabled with indicator', val: 100, badge: true },
      { id: 'hovered-0', label: 'State=Hovered, Progress=0', state: 'hovered', val: 0, badge: false },
      { id: 'hovered-50', label: 'State=Hovered, Progress=50', state: 'hovered', val: 50, badge: false },
      { id: 'hovered-100', label: 'State=Hovered, Progress=100', state: 'hovered', val: 100, badge: false },
      { id: 'pressed-0', label: 'State=Pressed, Progress=0', state: 'pressed', val: 0, badge: false },
      { id: 'pressed-50', label: 'State=Pressed, Progress=50', state: 'pressed', val: 50, badge: false },
      { id: 'pressed-100', label: 'State=Pressed, Progress=100', state: 'pressed', val: 100, badge: false },
      { id: 'disabled-0', label: 'State=Disabled, Progress=0', state: 'disabled', val: 0, badge: false },
      { id: 'disabled-50', label: 'State=Disabled, Progress=50', state: 'disabled', val: 50, badge: false },
      { id: 'disabled-100', label: 'State=Disabled, Progress=100', state: 'disabled', val: 100, badge: false },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '16px', maxWidth: '650px', width: '100%' }}>
        <header>
          <h3 style={{ fontFamily: 'Open Sans', marginBottom: '8px' }}>
            Slider Complete 15 Core Variants Matrix
          </h3>
          <p style={{ fontFamily: 'Open Sans', color: '#5D5D6A', fontSize: '14px' }}>
            Continuous & Discrete Slider Modes
          </p>
        </header>

        {/* Continuous Sliders Section */}
        <div style={{ backgroundColor: '#FAFAFD', padding: '24px', borderRadius: '12px', border: '1px solid #E3E3E8' }}>
          <h4 style={{ fontFamily: 'Open Sans', marginBottom: '20px' }}>1. Continuous Sliders (15 Variants)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MATRIX_STATES.map((item) => (
              <div key={`cont-${item.id}`} style={{ borderBottom: '1px solid #E3E3E8', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#3D405B', display: 'block', marginBottom: '4px' }}>
                  {item.label}
                </span>
                <Slider
                  variant="continuous"
                  state={item.state}
                  value={item.val}
                  showIndicator={item.badge}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Discrete Sliders Section */}
        <div style={{ backgroundColor: '#FAFAFD', padding: '24px', borderRadius: '12px', border: '1px solid #E3E3E8' }}>
          <h4 style={{ fontFamily: 'Open Sans', marginBottom: '20px' }}>2. Discrete Sliders with Ticks (15 Variants)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MATRIX_STATES.map((item) => (
              <div key={`disc-${item.id}`} style={{ borderBottom: '1px solid #E3E3E8', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#3D405B', display: 'block', marginBottom: '4px' }}>
                  {item.label}
                </span>
                <Slider
                  variant="discrete"
                  step={10}
                  state={item.state}
                  value={item.val}
                  showIndicator={item.badge}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
