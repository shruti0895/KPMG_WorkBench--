import React, { useState } from 'react';
import {
  Checkbox,
  CheckboxCheckedIconSvg,
  CheckboxUncheckedLightIconSvg,
  CheckboxIndeterminateIconSvg,
  CheckboxUncheckedIconSvg,
  CheckboxErrorCheckedIconSvg,
  CheckboxErrorCheckedLightIconSvg,
  CheckboxErrorIndeterminateIconSvg,
  CheckboxErrorUncheckedIconSvg,
} from './Checkbox';

const ALL_TYPES = [
  { id: 'checked', name: 'Checked' },
  { id: 'unchecked-light', name: 'Unchecked Light' },
  { id: 'indeterminate', name: 'Indeterminate' },
  { id: 'unchecked', name: 'Unchecked' },
  { id: 'error-checked', name: 'Error Checked' },
  { id: 'error-checked-light', name: 'Error Checked Light' },
  { id: 'error-indeterminate', name: 'Error Indeterminate' },
  { id: 'error-unchecked', name: 'Error Unchecked' },
];

const ALL_STATES = ['enabled', 'disabled', 'hovered', 'pressed'];
const ALL_SIZES = ['large', 'small'];

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox complete matrix of 64 variants (8 Types × 4 States × 2 Sizes) with token-driven styles, SVG export props, and interactive accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: 'Size scale (Large:  touch container / Small: touch container)',
    },
    type: {
      control: 'select',
      options: ALL_TYPES.map((t) => t.id),
      description: 'Figma type variant (8 choices)',
    },
    state: {
      control: 'select',
      options: ALL_STATES,
      description: 'Interactive state overlay',
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    subtext: { control: 'text' },
  },
};

// Default Basic Story
export const Default = {
  args: {
    label: 'Option label',
    subtext: 'Description or helper text',
    size: 'large',
    type: 'checked',
    state: 'enabled',
  },
};

// Interactive Controlled State Demo Story
export const InteractiveControlled = {
  render: () => {
    const [checked, setChecked] = useState(true);
    const [indeterminate, setIndeterminate] = useState(false);
    const [error, setError] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <h4 style={{ fontFamily: 'Open Sans', margin: 0 }}>Interactive Checkbox Demo</h4>

        <Checkbox
          size="large"
          checked={checked}
          indeterminate={indeterminate}
          error={error}
          label="Enable Feature Notification"
          subtext="Receive instant emails whenever updates are ready"
          onChange={(e) => setChecked(e.target.checked)}
        />

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={() => setChecked(!checked)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Toggle Checked ({checked ? 'ON' : 'OFF'})
          </button>
          <button
            type="button"
            onClick={() => setIndeterminate(!indeterminate)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Toggle Indeterminate
          </button>
          <button
            type="button"
            onClick={() => setError(!error)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #CCC' }}
          >
            Toggle Error
          </button>
        </div>
      </div>
    );
  },
};

// Custom SVG Icons Override Props Story
export const CustomSvgPropsOverrides = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Checkbox
        size="large"
        label="Custom Blue Checkbox"
        icon={<CheckboxCheckedIconSvg fill="#1E49E2" size={24} />}
      />
      <Checkbox
        size="large"
        label="Custom Green Checkbox"
        icon={<CheckboxCheckedIconSvg fill="#029A6C" size={24} />}
      />
      <Checkbox
        size="large"
        label="Custom Gold Star Placeholder"
        icon={
          <svg viewBox="0 0 24 24" width={24} height={24} fill="#F4D533">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        }
      />
    </div>
  ),
};

// Complete 64 Variants Matrix Story (Figma Node 1384:63275 Specs)
export const All64VariantsMatrix = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '12px' }}>
      <header>
        <h3 style={{ fontFamily: 'Open Sans', marginBottom: '8px' }}>
          Checkbox Figma Specs: Complete 64 Variants Matrix
        </h3>
        <p style={{ fontFamily: 'Open Sans', color: '#5D5D6A', fontSize: '14px' }}>
          8 Types × 4 States × 2 Sizes (Large 40px & Small 24px)
        </p>
      </header>

      {ALL_SIZES.map((sizeScale) => (
        <div key={sizeScale} style={{ backgroundColor: '#FAFAFD', padding: '24px', borderRadius: '12px', border: '1px solid #E3E3E8' }}>
          <h4 style={{ fontFamily: 'Open Sans', marginBottom: '20px', textTransform: 'capitalize' }}>
            Size: {sizeScale}
          </h4>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left', fontFamily: 'Open Sans', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #D5D5DC' }}>
                  <th style={{ padding: '12px' }}>Variant Type</th>
                  {ALL_STATES.map((s) => (
                    <th key={s} style={{ padding: '12px', textTransform: 'capitalize' }}>
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_TYPES.map((typeObj) => (
                  <tr key={typeObj.id} style={{ borderBottom: '1px solid #E3E3E8' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{typeObj.name}</td>
                    {ALL_STATES.map((st) => (
                      <td key={st} style={{ padding: '12px' }}>
                        <Checkbox size={sizeScale} type={typeObj.id} state={st} aria-label={`${typeObj.name} ${st} ${sizeScale}`} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  ),
};
