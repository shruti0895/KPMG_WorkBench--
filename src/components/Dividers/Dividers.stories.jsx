import React from 'react';
import { Dividers } from './Dividers';

export default {
  title: 'Components/Dividers',
  component: Dividers,
  parameters: {
    docs: {
      description: {
        component: `
# Dividers Component

The KPMG WorkBench Divider is an accessible, token-driven separator component adhering strictly to the KPMG WorkBench Design System specification.

### Key Capabilities
- **18 Canonical Figma Variants**: Full coverage of all 18 variants across 2 themes (Light, Dark), 2 orientations (Horizontal, Vertical), and 6 inset width configurations.
- **Concentric & Calibrated Insets**: Pixel-precise alignment for Full, Inset , Inset middle small , Inset middle medium , and Inset middle large .
- **Subheader Typography**: Integrated title/small subheader text configuration (14px font, 20px line height, regular weight).
- **Flexible Vertical Mode**: Calibrated 17px container with centered 1px line supporting Full, Inset (top), and Inset Middle (top & bottom).
- **WCAG Accessibility**: Standard \`role="separator"\`, \`aria-orientation\`, and semantic token contrast.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'radio' },
      options: ['Horizontal', 'Vertical'],
      description: 'Orientation of the divider',
    },
    theme: {
      control: { type: 'radio' },
      options: ['Light', 'Dark'],
      description: 'Theme variation (Light = subtle line, Dark = high-contrast line)',
    },
    width: {
      control: { type: 'select' },
      options: [
        'Full',
        'Inset',
        'Inset middle small',
        'Inset middle medium',
        'Inset middle large',
        'Inset middle with text',
        'Inset middle',
      ],
      description: 'Inset and width configuration',
    },
    text: {
      control: 'text',
      description: 'Optional subheader text for Inset middle with text variant',
    },
  },
};

/* Helper Badge Component matching Figma frame */

/* ==========================================================================
   STORY 1: ALL 18 CANONICAL FIGMA VARIANTS (EXACT FIGMA 1-18 FRAME)
   ========================================================================== */
export const All18FigmaVariants = () => {
  // Horizontal variants mapping 1-12
  const horizontalPairs = [
    {
      light: { width: 'Full', label: 'Full width' },
      dark: { width: 'Full', label: 'Full width' },
    },
    {
      light: { width: 'Inset', label: 'Inset ' },
      dark: { width: 'Inset', label: 'Inset ' },
    },
    {
      light: { width: 'Inset middle small', label: 'Inset middle small ' },
      dark: { width: 'Inset middle small', label: 'Inset middle small' },
    },
    {
      light: { width: 'Inset middle medium', label: 'Inset middle medium ' },
      dark: { width: 'Inset middle medium', label: 'Inset middle medium ' },
    },
    {
      light: { width: 'Inset middle large', label: 'Inset middle large ' },
      dark: { width: 'Inset middle large', label: 'Inset middle large ' },
    },
    {
      light: { width: 'Inset middle with text', label: 'Inset with text', },
      dark: { width: 'Inset middle with text', label: 'Inset with text', },
    },
  ];

  // Vertical variants mapping 13-18
  const verticalLightVariants = [
    { width: 'Full', label: 'Full' },
    { width: 'Inset', label: 'Inset' },
    { width: 'Inset middle', label: 'Inset middle' },
  ];

  const verticalDarkVariants = [
    { width: 'Full', label: 'Full' },
    { width: 'Inset', label: 'Inset' },
    { width: 'Inset middle', label: 'Inset middle' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
      <div>
        <h2 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-base)', color: 'var(--color-neutral-000)' }}>
          Dividers — All 18 Canonical Figma Variants
        </h2>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)', maxWidth: '900px' }}>
          Exact 18-variant matrix matching the KPMG WorkBench Design System specification.
          Badges 1 through 18 represent the exact numbered items from the canonical documentation frame.
        </p>
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
          maxWidth: '1200px',
        }}
      >
        {/* SECTION A: HORIZONTAL DIVIDERS (BADGES 1 TO 12) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', borderBottom: '1px solid #d5d5dc', paddingBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-neutral-000)', textTransform: 'uppercase' }}>
              Light Theme (Badges 1 – 6)
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-neutral-000)', textTransform: 'uppercase' }}>
              Dark Theme (Badges 7 – 12)
            </span>
          </div>

          {/* 6 Horizontal Variant Rows */}
          {horizontalPairs.map((pair, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                alignItems: 'flex-start',
                paddingBottom: '24px',
                // borderBottom: index < horizontalPairs.length - 1 ? '1px dashed #e3e3e8' : 'none',
              }}
            >
              {/* Light Variant */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#454554' }}>
                    {pair.light.label}
                  </span>
                </div>

                <Dividers
                  state="Horizontal"
                  theme="Light"
                  width={pair.light.width}
                // text={pair.light.text}
                />

              </div>

              {/* Dark Variant */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#454554' }}>
                    {pair.dark.label}
                  </span>
                </div>

                <Dividers
                  state="Horizontal"
                  theme="Dark"
                  width={pair.dark.width}
                  text={pair.dark.text}
                />

              </div>
            </div>
          ))}
        </div>

        {/* SECTION B: VERTICAL DIVIDERS (BADGES 13 TO 18) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', paddingBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-neutral-000)', textTransform: 'uppercase' }}>
              Vertical Dividers — Light Theme
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-neutral-000)', textTransform: 'uppercase' }}>
              Vertical Dividers — Dark Theme
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            {/* Left: 3 Light Vertical Variants */}
            <div style={{ display: 'flex', gap: '32px', justifyContent: 'flex-start', borderRadius: '12px', padding: '32px' }}>
              {verticalLightVariants.map((item) => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <Dividers
                    state="Vertical"
                    theme="Light"
                    width={item.width}
                  />
                  <span style={{ fontSize: '12px', color: '#9090a2', textAlign: 'center' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: 3 Dark Vertical Variants */}
            <div style={{ display: 'flex', gap: '32px', justifyContent: 'flex-start', padding: '32px' }}>
              {verticalDarkVariants.map((item) => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <Dividers
                    state="Vertical"
                    theme="Dark"
                    width={item.width}
                  />
                  <span style={{ fontSize: '12px', color: '#9090a2', textAlign: 'center' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   STORY 2: INTERACTIVE PLAYGROUND
   ========================================================================== */
export const InteractivePlayground = (args) => {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-base)' }}>
          Interactive Dividers Playground
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)' }}>
          Adjust controls to test horizontal and vertical dividers across all themes and inset width configurations.
        </p>
      </div>

      <div
        style={{
          padding: '32px',
          backgroundColor: args.theme === 'Dark' ? '#ffffff' : '#fcfcfe',
          borderRadius: '16px',
          border: '1px solid #ededf2',
          maxWidth: args.state === 'Vertical' ? '300px' : '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Dividers {...args} />
      </div>
    </div>
  );
};

InteractivePlayground.args = {
  state: 'Horizontal',
  theme: 'Light',
  width: 'Inset middle with text',
  text: 'Subheader Section',
};
