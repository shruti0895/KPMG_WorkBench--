import React from 'react';
import { IconButton } from './IconButton';

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Standalone Icon Button component scaffolded from Figma Icon buttons section (971:89961). Uses Settings/Gear icon for consistent visual representation across all variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'standard', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    selected: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export const Filled = {
  args: {
    variant: 'filled',
    icon: <SettingsIcon />,
    'aria-label': 'Settings',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    icon: <SettingsIcon />,
    'aria-label': 'Settings',
  },
};

export const Standard = {
  args: {
    variant: 'standard',
    icon: <SettingsIcon />,
    'aria-label': 'Settings',
  },
};

export const Neutral = {
  args: {
    variant: 'neutral',
    icon: <SettingsIcon />,
    'aria-label': 'Settings',
  },
};

export const Toggleable = {
  render: () => {
    const [selected, setSelected] = React.useState(false);
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <IconButton
          variant="filled"
          selected={selected}
          onClick={() => setSelected(!selected)}
          icon={<SettingsIcon />}
          aria-label="Toggle Settings"
        />
        <IconButton
          variant="outline"
          selected={selected}
          onClick={() => setSelected(!selected)}
          icon={<SettingsIcon />}
          aria-label="Toggle Settings"
        />
        <span>State: {selected ? 'Toggled ON' : 'Toggled OFF'}</span>
      </div>
    );
  },
};

export const AllVariantsMatrix = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans' }}>Filled</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <IconButton variant="filled" size="sm" icon={<SettingsIcon />} aria-label="Settings small" />
          <IconButton variant="filled" size="md" icon={<SettingsIcon />} aria-label="Settings medium" />
          <IconButton variant="filled" size="lg" icon={<SettingsIcon />} aria-label="Settings large" />
          <IconButton variant="filled" size="md" disabled icon={<SettingsIcon />} aria-label="Settings disabled" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans' }}>Outline</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <IconButton variant="outline" size="sm" icon={<SettingsIcon />} aria-label="Settings small" />
          <IconButton variant="outline" size="md" icon={<SettingsIcon />} aria-label="Settings medium" />
          <IconButton variant="outline" size="lg" icon={<SettingsIcon />} aria-label="Settings large" />
          <IconButton variant="outline" size="md" disabled icon={<SettingsIcon />} aria-label="Settings disabled" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans' }}>Standard</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <IconButton variant="standard" size="sm" icon={<SettingsIcon />} aria-label="Settings small" />
          <IconButton variant="standard" size="md" icon={<SettingsIcon />} aria-label="Settings medium" />
          <IconButton variant="standard" size="lg" icon={<SettingsIcon />} aria-label="Settings large" />
          <IconButton variant="standard" size="md" disabled icon={<SettingsIcon />} aria-label="Settings disabled" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'Open Sans' }}>Neutral</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <IconButton variant="neutral" size="sm" icon={<SettingsIcon />} aria-label="Settings small" />
          <IconButton variant="neutral" size="md" icon={<SettingsIcon />} aria-label="Settings medium" />
          <IconButton variant="neutral" size="lg" icon={<SettingsIcon />} aria-label="Settings large" />
          <IconButton variant="neutral" size="md" disabled icon={<SettingsIcon />} aria-label="Settings disabled" />
        </div>
      </div>
    </div>
  ),
};
