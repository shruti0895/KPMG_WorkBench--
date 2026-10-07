import React, { useState } from 'react';
import { Switch, SwitchCheckmarkIcon, SwitchDismissIcon } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `
# Switch Component

The KPMG WorkBench Switch is an accessible, token-driven toggle control adhering strictly to the KPMG WorkBench Design System specification.

### Key Capabilities
- **16 Canonical Variants**: Full coverage of all 16 Figma states across selection states, icon configurations, and interaction states.
- **Micro-Interactions**: Features an expanding thumb (24px default → 28px in pressed/active state) matching the Figma physics model.
- **Fluent Vector Icons**: Integrated 16×16 Fluent Checkmark (when checked) and Dismiss/X (when unchecked) SVG icons with adaptive color tokens.
- **WCAG AA Accessibility**: Standard \`role="switch"\`, \`aria-checked\`, full keyboard navigation (Space / Enter), and focus-visible rings.
- **Form Ergonomics**: Optional label, helper text, and flexible label positioning (\`start\` or \`end\`).
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state of the switch',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state in uncontrolled mode',
    },
    icon: {
      control: 'boolean',
      description: 'Whether the thumb displays inner icons (Checkmark when checked, Dismiss when unchecked)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled and non-interactive',
    },
    state: {
      control: { type: 'select' },
      options: ['Enabled', 'Hovered', 'Pressed', 'Disabled'],
      description: 'Explicit visual state override for design system documentation',
    },
    label: {
      control: 'text',
      description: 'Accompanying label text',
    },
    helperText: {
      control: 'text',
      description: 'Supporting helper text displayed beneath the label',
    },
    labelPlacement: {
      control: { type: 'radio' },
      options: ['end', 'start'],
      description: 'Placement of the label relative to the switch toggle',
    },
  },
};

/* ==========================================================================
   STORY 1: ALL 16 CANONICAL FIGMA VARIANTS (EXACT FIGMA 4x4 MATRIX)
   ========================================================================== */
export const All16FigmaVariants = () => {
  // Variant definition data matching Figma frame
  const variantMatrix = [
    {
      groupTitle: 'Selected (Checked) — Without Icon',
      rowNumber: 'Row 1',
      items: [
        { badge: '1', selected: true, icon: false, state: 'Enabled', label: 'Enabled' },
        { badge: '2', selected: true, icon: false, state: 'Hovered', label: 'Hovered' },
        { badge: '3', selected: true, icon: false, state: 'Pressed', label: 'Pressed' },
        { badge: '4', selected: true, icon: false, state: 'Disabled', label: 'Disabled' },
      ],
    },
    {
      groupTitle: 'Selected (Checked) — With Icon (Checkmark)',
      rowNumber: 'Row 2',
      items: [
        { badge: '5', selected: true, icon: true, state: 'Enabled', label: 'Enabled' },
        { badge: '6', selected: true, icon: true, state: 'Hovered', label: 'Hovered' },
        { badge: '7', selected: true, icon: true, state: 'Pressed', label: 'Pressed' },
        { badge: '8', selected: true, icon: true, state: 'Disabled', label: 'Disabled' },
      ],
    },
    {
      groupTitle: 'Unselected (Unchecked) — Without Icon',
      rowNumber: 'Row 3',
      items: [
        { badge: '9', selected: false, icon: false, state: 'Enabled', label: 'Enabled' },
        { badge: '10', selected: false, icon: false, state: 'Hovered', label: 'Hovered' },
        { badge: '11', selected: false, icon: false, state: 'Pressed', label: 'Pressed' },
        { badge: '12', selected: false, icon: false, state: 'Disabled', label: 'Disabled' },
      ],
    },
    {
      groupTitle: 'Unselected (Unchecked) — With Icon (Dismiss / X)',
      rowNumber: 'Row 4',
      items: [
        { badge: '13', selected: false, icon: true, state: 'Enabled', label: 'Enabled' },
        { badge: '14', selected: false, icon: true, state: 'Hovered', label: 'Hovered' },
        { badge: '15', selected: false, icon: true, state: 'Pressed', label: 'Pressed' },
        { badge: '16', selected: false, icon: true, state: 'Disabled', label: 'Disabled' },
      ],
    },
  ];

  // Canonical initial state mapping
  const initialCheckedState = {
    '1': true, '2': true, '3': true, '4': true,
    '5': true, '6': true, '7': true, '8': true,
    '9': false, '10': false, '11': false, '12': false,
    '13': false, '14': false, '15': false, '16': false,
  };

  const [variantChecked, setVariantChecked] = useState(initialCheckedState);

  const handleToggleVariant = (badge, nextChecked) => {
    setVariantChecked((prev) => ({
      ...prev,
      [badge]: nextChecked,
    }));
  };

  const handleResetDefaults = () => {
    setVariantChecked(initialCheckedState);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-base)', color: 'var(--color-neutral-000)' }}>
            Switch — All 16 Canonical Figma Variants
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)', maxWidth: '850px' }}>
            Exact 4&times;4 matrix of all 16 switch variants defined in the KPMG WorkBench Design System specification.
            Badges 1 through 16 represent the exact states from the canonical documentation frame.
            All switches are directly interactive on click.
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetDefaults}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #d5d5dc',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-neutral-000)',
            fontFamily: 'inherit',
          }}
        >
          Reset to Canonical Defaults
        </button>
      </div>

      <div
        style={{
          backgroundColor: '#fbfbfb',
          borderRadius: '28px',
          padding: '48px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          border: '1px solid #ededf2',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          maxWidth: '1100px',
        }}
      >
        {/* Header Row: Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(4, 1fr)', gap: '24px', borderBottom: '1px solid #d5d5dc', paddingBottom: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#9090a2', textTransform: 'uppercase' }}>Configuration</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#2f2f39', textAlign: 'center' }}>Enabled</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#2f2f39', textAlign: 'center' }}>Hovered</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#2f2f39', textAlign: 'center' }}>Pressed (28px Thumb)</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#2f2f39', textAlign: 'center' }}>Disabled</span>
        </div>

        {/* 4 Rows */}
        {variantMatrix.map((row, rIdx) => (
          <div
            key={row.groupTitle}
            style={{
              display: 'grid',
              gridTemplateColumns: '180px repeat(4, 1fr)',
              gap: '24px',
              alignItems: 'center',
              borderBottom: rIdx < variantMatrix.length - 1 ? '1px dashed #e3e3e8' : 'none',
              paddingBottom: '36px',
            }}
          >
            {/* Row Label */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-neutral-000)' }}>
                {row.rowNumber}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-neutral-100)' }}>
                {row.groupTitle}
              </span>
            </div>

            {/* 4 Variant Cells */}
            {row.items.map((item) => (
              <div
                key={item.badge}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 8px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #f0f0f4',
                }}
              >
                {/* Numbered Circular Badge matching Figma */}
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '1px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: '#000000',
                    fontFamily: 'var(--font-family-base)',
                  }}
                >
                  {item.badge}
                </div>

                {/* Switch Component in Canonical State with Live Interactivity */}
                <Switch
                  checked={variantChecked[item.badge]}
                  onChange={(nextChecked) => handleToggleVariant(item.badge, nextChecked)}
                  icon={item.icon}
                  state={item.state}
                  disabled={item.state === 'Disabled'}
                  aria-label={`Switch variant ${item.badge} (${item.state})`}
                />

                <span style={{ fontSize: '11px', color: '#9090a2', textAlign: 'center' }}>
                  {item.label} &bull; {variantChecked[item.badge] ? 'ON' : 'OFF'}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   STORY 2: INTERACTIVE PLAYGROUND
   ========================================================================== */
export const InteractivePlayground = (args) => {
  const [checked, setChecked] = useState(args.checked ?? true);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-base)' }}>
          Interactive Switch Playground
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)' }}>
          Click the switch toggle to test real-time smooth animation, hover feedback, active thumb expansion, and icon transformations.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', backgroundColor: '#fcfcfe', borderRadius: '16px', border: '1px solid #ededf2', width: 'fit-content' }}>
        <Switch
          {...args}
          checked={checked}
          onChange={(newChecked) => setChecked(newChecked)}
        />
        <span style={{ fontSize: '13px', color: '#9090a2' }}>
          Current state: <strong style={{ color: checked ? '#1e49e2' : '#454554' }}>{checked ? 'ON (Selected)' : 'OFF (Unselected)'}</strong>
        </span>
      </div>
    </div>
  );
};

InteractivePlayground.args = {
  icon: true,
  disabled: false,
  label: 'Enable Automated AI Analysis',
  helperText: 'Run KPMG Trusted AI audits continuously in the background',
  labelPlacement: 'end',
};

/* ==========================================================================
   STORY 3: WITH LABELS & HELPER TEXT
   ========================================================================== */
export const WithLabelsAndHelperText = () => {
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [archiveEnabled, setArchiveEnabled] = useState(false);
  const [disabledOption, setDisabledOption] = useState(false);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '640px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-base)' }}>
          Switches with Labels and Descriptions
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)' }}>
          Settings and configuration forms using standard KPMG typography and layout conventions.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Item 1: Label Right with Helper */}
        <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #ededf2', backgroundColor: '#ffffff' }}>
          <Switch
            checked={syncEnabled}
            onChange={setSyncEnabled}
            icon={true}
            label="Real-time Workspace Synchronization"
            helperText="Sync audit documents with KPMG Central Ledger automatically"
          />
        </div>

        {/* Item 2: Label Left with Helper */}
        <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #ededf2', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-neutral-000)' }}>
              Two-Factor Authentication (2FA)
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-neutral-100)' }}>
              Enforce biometric or SMS security verification upon sign-in
            </span>
          </div>
          <Switch
            checked={mfaEnabled}
            onChange={setMfaEnabled}
            icon={true}
            aria-label="Two-factor authentication"
          />
        </div>

        {/* Item 3: Auto-Archive */}
        <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #ededf2', backgroundColor: '#ffffff' }}>
          <Switch
            checked={archiveEnabled}
            onChange={setArchiveEnabled}
            icon={false}
            label="Automatic Engagement Archival"
            helperText="Archive completed review threads after 90 days of inactivity"
          />
        </div>

        {/* Item 4: Disabled Setting */}
        <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #ededf2', backgroundColor: '#f9f9fb' }}>
          <Switch
            checked={disabledOption}
            onChange={setDisabledOption}
            disabled={true}
            icon={true}
            label="Hardware Security Key Override (Managed Policy)"
            helperText="This setting is enforced by KPMG Enterprise Compliance and cannot be modified"
          />
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   STORY 4: ICON VS PLAIN COMPARISON
   ========================================================================== */
export const IconVsPlainComparison = () => {
  const [plainChecked, setPlainChecked] = useState(true);
  const [iconChecked, setIconChecked] = useState(true);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-base)' }}>
          Icon vs. Plain Switch Comparison
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)' }}>
          Toggle both controls to observe the visual difference between the minimalist plain switch and the icon-assisted switch.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', borderRadius: '12px', border: '1px solid #ededf2', backgroundColor: '#ffffff', minWidth: '240px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#9090a2', textTransform: 'uppercase' }}>Plain Style (\`icon={false}\`)</span>
          <Switch
            checked={plainChecked}
            onChange={setPlainChecked}
            icon={false}
            label={plainChecked ? 'Active' : 'Inactive'}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', borderRadius: '12px', border: '1px solid #ededf2', backgroundColor: '#ffffff', minWidth: '240px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#9090a2', textTransform: 'uppercase' }}>With Icons (\`icon={true}\`)</span>
          <Switch
            checked={iconChecked}
            onChange={setIconChecked}
            icon={true}
            label={iconChecked ? 'Active (Checkmark)' : 'Inactive (Dismiss / X)'}
          />
        </div>
      </div>
    </div>
  );
};
