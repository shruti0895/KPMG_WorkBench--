import React, { useState, useEffect } from 'react';
import { ProgressIndicator, LinearProgressBarSvg, CircularProgressBarSvg } from './ProgressIndicator';

export default {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ProgressIndicator component features Linear and Circular forms, Determinate and Indeterminate types, 33 exact Figma variants, token-driven styles, and custom SVG helpers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['linear', 'circular'],
      description: 'Indicator form layout',
    },
    type: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Progress type (Fixed % vs Loading Spinner animation)',
    },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: 'Size scale (Circular: 88px Large, 48px Medium, 24px Small)',
    },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
    subtext: { control: 'text' },
  },
};

// 1. Basic Linear Story
export const BasicLinear = {
  args: {
    variant: 'linear',
    type: 'determinate',
    progress: 50,
    showValue: true,
    label: 'Uploading File',
    subtext: '5.2 MB of 10.4 MB uploaded',
  },
};

// 2. Linear Indeterminate Loading Bar
export const LinearIndeterminate = {
  args: {
    variant: 'linear',
    type: 'indeterminate',
    label: 'Processing Data...',
    subtext: 'Please wait while calculations complete',
  },
};

// 3. Circular Progress Ring (Determinate & Indeterminate)
export const CircularLarge = {
  args: {
    variant: 'circular',
    size: 'large',
    type: 'determinate',
    progress: 80,
    showValue: true,
    label: 'Task Progress',
    subtext: 'Almost finished',
  },
};

export const CircularIndeterminateSpinner = {
  args: {
    variant: 'circular',
    size: 'medium',
    type: 'indeterminate',
    label: 'Syncing with Server...',
  },
};

// 4. Interactive Controlled Progress Demo
export const InteractiveControlled = {
  render: () => {
    const [progress, setProgress] = useState(30);
    const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);

    useEffect(() => {
      let interval;
      if (isAutoIncrementing) {
        interval = setInterval(() => {
          setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
        }, 300);
      }
      return () => clearInterval(interval);
    }, [isAutoIncrementing]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '450px' }}>
        <h4 style={{ fontFamily: 'Open Sans', margin: 0 }}>Interactive Progress Demo</h4>

        <ProgressIndicator
          variant="linear"
          progress={progress}
          showValue
          label="File Export Progress"
          subtext={`Status: ${progress === 100 ? 'Completed' : 'Processing...'}`}
        />

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <ProgressIndicator
            variant="circular"
            size="large"
            progress={progress}
            showValue
          />
          <ProgressIndicator
            variant="circular"
            size="medium"
            progress={progress}
            showValue
          />
          <ProgressIndicator
            variant="circular"
            size="small"
            progress={progress}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setIsAutoIncrementing(!isAutoIncrementing)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            {isAutoIncrementing ? 'Pause Auto Progress' : 'Start Auto Progress'}
          </button>
          <button
            type="button"
            onClick={() => setProgress(0)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Reset 0%
          </button>
          <button
            type="button"
            onClick={() => setProgress(50)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Set 50%
          </button>
          <button
            type="button"
            onClick={() => setProgress(100)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Set 100%
          </button>
        </div>
      </div>
    );
  },
};

// 5. Complete 33 Figma Variants Matrix Story
export const All33FigmaVariantsMatrix = {
  render: () => {
    const LINEAR_VARIANTS = [
      { name: 'Progress=0, Type=Determinate', type: 'determinate', progress: 0 },
      { name: 'Progress=10, Type=Determinate', type: 'determinate', progress: 10 },
      { name: 'Progress=30, Type=Determinate', type: 'determinate', progress: 30 },
      { name: 'Progress=50, Type=Determinate', type: 'determinate', progress: 50 },
      { name: 'Progress=80, Type=Determinate', type: 'determinate', progress: 80 },
      { name: 'Progress=100, Type=Determinate', type: 'determinate', progress: 100 },
      { name: 'Progress=N/A, Type=Indeterminate, Step=1', type: 'indeterminate', step: 1 },
      { name: 'Progress=N/A, Type=Indeterminate, Step=2', type: 'indeterminate', step: 2 },
      { name: 'Progress=N/A, Type=Indeterminate, Step=3', type: 'indeterminate', step: 3 },
      { name: 'Progress=N/A, Type=Indeterminate, Step=4', type: 'indeterminate', step: 4 },
    ];

    const CIRCULAR_SIZES = [
      { id: 'large', name: 'Large (88px)' },
      { id: 'medium', name: 'Medium (48px)' },
      { id: 'small', name: 'Small (24px)' },
    ];

    const CIRCULAR_PROGRESSES = [0, 10, 30, 50, 80, 100];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '16px', maxWidth: '750px', width: '100%' }}>
        <header>
          <h3 style={{ fontFamily: 'Open Sans', marginBottom: '8px' }}>
            Progress Indicators Figma Specs: Complete 33 Variants Matrix
          </h3>

        </header>

        {/* 1. Linear Progress Bar (10 Variants) */}
        <div style={{ backgroundColor: '#FAFAFD', padding: '24px', borderRadius: '12px', border: '1px solid #E3E3E8' }}>
          <h4 style={{ fontFamily: 'Open Sans', marginBottom: '20px' }}>1. Linear Progress Bar (10 Variants)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {LINEAR_VARIANTS.map((item, idx) => (
              <div key={`lin-${idx}`} style={{ borderBottom: '1px solid #E3E3E8', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#3D405B', display: 'block', marginBottom: '6px' }}>
                  {item.name}
                </span>
                <ProgressIndicator
                  variant="linear"
                  type={item.type}
                  progress={item.progress}
                  step={item.step}
                  showValue={item.type === 'determinate'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Circular Progress Bar (23 Variants: Large 88px, Medium 48px, Small 24px) */}
        <div style={{ backgroundColor: '#FAFAFD', padding: '24px', borderRadius: '12px', border: '1px solid #E3E3E8' }}>
          <h4 style={{ fontFamily: 'Open Sans', marginBottom: '20px' }}>2. Circular Progress Bar (23 Variants)</h4>

          {CIRCULAR_SIZES.map((sizeObj) => (
            <div key={sizeObj.id} style={{ marginBottom: '28px' }}>
              <h5 style={{ fontFamily: 'Open Sans', marginBottom: '14px', color: '#1A28C1' }}>
                Size: {sizeObj.name}
              </h5>

              {/* Determinate Arc Variants */}
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
                {CIRCULAR_PROGRESSES.map((pct) => (
                  <div key={`${sizeObj.id}-${pct}`} style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#5D5D6A', display: 'block', marginBottom: '4px' }}>
                      {pct}%
                    </span>
                    <ProgressIndicator
                      variant="circular"
                      size={sizeObj.id}
                      type="determinate"
                      progress={pct}
                      showValue={sizeObj.id !== 'small'}
                    />
                  </div>
                ))}
              </div>

              {/* Indeterminate Spinner Variant */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#3D405B' }}>
                  Indeterminate Spinner:
                </span>
                <ProgressIndicator
                  variant="circular"
                  size={sizeObj.id}
                  type="indeterminate"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
