import React, { useState, useEffect } from 'react';
import { Banner, BannerRobotSvg } from './Banner';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Banner Component

Banners display prominent messages at the top of the screen or workspace window, communicating status, background job progress, or alerts without interrupting ongoing user activity.

#### Key Architecture & 12 Variants:
- **2 Core States**:
  - \`default\`: Subtle solid surface container with clean typography and determinate progress bar
  - \`animated\`: Dynamic gradient background with subtle ambient shimmer effect and active progress flow
- **6 Semantic Themes**:
  - \`primary\`: Canonical brand theme with deep KPMG blue accents
  - \`neutral\`: Monochromatic theme for subtle workspace updates
  - \`info\`: Blue theme for system advisories
  - \`success\`: Emerald theme for positive status & task completions
  - \`warning\`: Warm amber theme for warnings and cautionary notices
  - \`critical\`: Crimson theme for critical alerts and error notifications

Total combinations: **6 Semantic Themes × 2 States = 12 Production Variants**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'animated'],
      description: 'Visual container state',
    },
    variant: {
      control: 'select',
      options: ['primary', 'neutral', 'info', 'success', 'warning', 'critical'],
      description: 'Semantic theme variant',
    },
    title: {
      control: 'text',
      description: 'Primary status text',
    },
    detail: {
      control: 'text',
      description: 'Secondary detail or percentage text',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Linear progress bar percentage (0-100)',
    },
    showProgress: {
      control: 'boolean',
      description: 'Toggle linear progress bar visibility',
    },
    progressType: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Progress bar mode',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether to show close button',
    },
  },
};

/** Interactive Default Story */
export const Default = {
  args: {
    state: 'default',
    variant: 'primary',
    title: 'Configuring',
    detail: '30%',
    progress: 30,
    showProgress: true,
    progressType: 'determinate',
    dismissible: false,
  },
};

/** Animated Gradient State */
export const AnimatedState = {
  args: {
    state: 'animated',
    variant: 'primary',
    title: 'Configuring',
    detail: '30%',
    progress: 30,
    showProgress: true,
    progressType: 'determinate',
    dismissible: false,
  },
};

/** Complete 12 Variants Matrix */
export const Complete12VariantsMatrix = () => {
  const variants = [
    { key: 'primary', label: 'Primary (Canonical)', title: 'Configuring system models', detail: '30%' },
    { key: 'neutral', label: 'Neutral', title: 'Indexing document workspace', detail: '45%' },
    { key: 'info', label: 'Info', title: 'Synchronizing KPMG Workbench data', detail: '60%' },
    { key: 'success', label: 'Success', title: 'Transformation completed successfully', detail: '100%' },
    { key: 'warning', label: 'Warning', title: 'Resource allocation near threshold', detail: '85%' },
    { key: 'critical', label: 'Critical', title: 'Pipeline validation error detected', detail: 'Error' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          State: Default (Static Surface) — 6 Semantic Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {variants.map((v) => (
            <div key={`default-${v.key}`}>
              <div style={{ fontSize: '12px', color: 'var(--color-on-surface-light, #9090a2)', marginBottom: '4px' }}>
                Variant: <strong>{v.label}</strong> (Default State)
              </div>
              <Banner
                state="default"
                variant={v.key}
                title={v.title}
                detail={v.detail}
                progress={v.key === 'critical' ? 100 : parseInt(v.detail) || 50}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          State: Animated (Dynamic Ambient Gradient) — 6 Semantic Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {variants.map((v) => (
            <div key={`animated-${v.key}`}>
              <div style={{ fontSize: '12px', color: 'var(--color-on-surface-light, #9090a2)', marginBottom: '4px' }}>
                Variant: <strong>{v.label}</strong> (Animated State)
              </div>
              <Banner
                state="animated"
                variant={v.key}
                title={v.title}
                detail={v.detail}
                progress={v.key === 'critical' ? 100 : parseInt(v.detail) || 50}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Live Progress Simulation */
export const LiveProgressSimulation = () => {
  const [progress, setProgress] = useState(15);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
    }, 400);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px' }}>
      <Banner
        state={isRunning ? 'animated' : 'default'}
        variant="primary"
        title={progress === 100 ? 'Configuring complete' : 'Configuring'}
        detail={`${progress}%`}
        progress={progress}
        action={
          <Button
            size="small"
            variant="text"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Resume'}
          </Button>
        }
      />
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button size="small" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause Simulation' : 'Resume Simulation'}
        </Button>
        <Button size="small" variant="outlined" onClick={() => setProgress(0)}>
          Reset
        </Button>
        <span style={{ fontSize: '14px', color: 'var(--color-on-surface-light, #9090a2)' }}>
          Current progress: {progress}%
        </span>
      </div>
    </div>
  );
};

/** Streaming / Indeterminate Progress */
export const IndeterminateProgress = {
  args: {
    state: 'animated',
    variant: 'primary',
    title: 'Obtaining approval for external share',
    detail: 'Streaming...',
    showProgress: true,
    progressType: 'indeterminate',
    dismissible: true,
  },
};

/** Dismissible with Actions */
export const DismissibleWithActions = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div style={{ padding: '20px' }}>
        <Button size="small" onClick={() => setVisible(true)}>
          Re-open Banner
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <Banner
        state="default"
        variant="info"
        title="Workspace synchronization requested"
        detail="5.2 MB / 8.0 MB"
        progress={65}
        dismissible
        onClose={() => setVisible(false)}
        action={
          <Button size="small" variant="text" onClick={() => alert('Viewing details')}>
            View Details
          </Button>
        }
      />
    </div>
  );
};
