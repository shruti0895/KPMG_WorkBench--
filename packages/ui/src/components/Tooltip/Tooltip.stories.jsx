import { useState } from 'react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Tooltip Component Family

The **Tooltip** component family provides modular contextual descriptions, interactive option dropdowns, and rich preview overlays anchored to UI triggers.
Architected in accordance with KPMG WorkBench Design System canonical specifications (Figma Component Set):

- **4 Core Variant Types**:
  - **Base Small**: Single-line compact label container with centered or offset caret.
  - **Base Large**: Multi-line description container supporting 4-directional carets (Top, Bottom, Side Left, Side Right).
  - **Rich**: High-density informative card featuring Title, Descriptive body, and paired Action buttons.
  - **Menu**: Action dropdown list featuring interactive checkboxes, options, and dividers.
- **Surface Themes**:
  - **Elevated**: Crisp surface container with soft drop shadow.
  - **Filled**: Tinted container with soft drop shadow.
- **Directional Positions & Alignments**:
  - **Top & Bottom**: Left, Center, Right alignments.
  - **Side Left & Side Right**: Top, Middle, Bottom alignments.
- **Token-Driven Architecture**: All widths, heights, radii, paddings, and colors are bound to design system CSS tokens.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      name: 'type',
      description: 'Canonical tooltip variant type',
      control: 'select',
      options: ['base-small', 'base-large', 'rich', 'menu'],
      table: {
        type: { summary: "'base-small' | 'base-large' | 'rich' | 'menu'" },
        defaultValue: { summary: "'base-small'" },
      },
    },
    position: {
      name: 'position',
      description: 'Caret edge position on the tooltip container',
      control: 'select',
      options: ['top', 'bottom', 'side-l', 'side-r'],
      table: {
        type: { summary: "'top' | 'bottom' | 'side-l' | 'side-r'" },
        defaultValue: { summary: "'top'" },
      },
    },
    alignment: {
      name: 'alignment',
      description: 'Caret alignment along the container edge',
      control: 'select',
      options: ['left', 'center', 'right', 'top', 'middle', 'bottom'],
      table: {
        type: { summary: "'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'" },
        defaultValue: { summary: "'center'" },
      },
    },
    theme: {
      name: 'theme',
      description: 'Surface styling treatment: elevated (white card) or filled (tinted card)',
      control: 'select',
      options: ['elevated', 'filled'],
      table: {
        type: { summary: "'elevated' | 'filled'" },
        defaultValue: { summary: "'elevated'" },
      },
    },
    caret: {
      name: 'caret',
      description: 'Whether to display the directional arrow caret',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    title: {
      name: 'title',
      description: 'Header title text for Rich variant',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      name: 'description',
      description: 'Body description text for Rich or Base Large variants',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    text: {
      name: 'text',
      description: 'Label text for Base Small variant',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    trigger: {
      name: 'trigger',
      description: 'Interactive mode for trigger anchor: hover, click, or manual',
      control: 'select',
      options: ['hover', 'click', 'manual'],
      table: {
        type: { summary: "'hover' | 'click' | 'manual'" },
        defaultValue: { summary: "'hover'" },
      },
    },
  },
};

const StaticWrapper = ({ children }) => (
  <div style={{ padding: '40px', background: 'var(--color-surface, #ffffff)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </div>
);

/* ==========================================================================
   PRIMARY INTERACTIVE PLAYGROUND STORY (AUTODOCS TOP)
   ========================================================================== */

export const DefaultPlayground = {
  args: {
    type: 'base-small',
    position: 'top',
    alignment: 'center',
    theme: 'elevated',
    text: 'Tooltip text',
    static: true,
  },
  render: (args) => (
    <StaticWrapper>
      <Tooltip {...args} />
    </StaticWrapper>
  ),
};

/* ==========================================================================
   SECTION 1: BASE SMALL CANONICAL VARIANTS (6 VARIANTS)
   ========================================================================== */

export const BaseSmallTopLeft = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="base-small" position="top" alignment="left" text="Tooltip text" />
    </StaticWrapper>
  ),
};

export const BaseSmallTopCenter = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="base-small" position="top" alignment="center" text="Tooltip text" />
    </StaticWrapper>
  ),
};

export const BaseSmallTopRight = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="base-small" position="top" alignment="right" text="Tooltip text" />
    </StaticWrapper>
  ),
};

export const BaseSmallBottomLeft = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="base-small" position="bottom" alignment="left" text="Tooltip text" />
    </StaticWrapper>
  ),
};

export const BaseSmallBottomCenter = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="base-small" position="bottom" alignment="center" text="Tooltip text" />
    </StaticWrapper>
  ),
};

export const BaseSmallBottomRight = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="base-small" position="bottom" alignment="right" text="Tooltip text" />
    </StaticWrapper>
  ),
};

/* ==========================================================================
   SECTION 2: BASE LARGE CANONICAL VARIANTS (12 VARIANTS)
   ========================================================================== */

export const BaseLargeTopLeft = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="top"
        alignment="left"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeTopCenter = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="top"
        alignment="center"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeTopRight = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="top"
        alignment="right"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeBottomLeft = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="bottom"
        alignment="left"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeBottomCenter = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="bottom"
        alignment="center"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeBottomRight = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="bottom"
        alignment="right"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeSideLeftTop = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="side-l"
        alignment="top"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeSideLeftMiddle = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="side-l"
        alignment="middle"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeSideLeftBottom = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="side-l"
        alignment="bottom"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeSideRightTop = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="side-r"
        alignment="top"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeSideRightMiddle = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="side-r"
        alignment="middle"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const BaseLargeSideRightBottom = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="base-large"
        position="side-r"
        alignment="bottom"
        description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

/* ==========================================================================
   SECTION 3: RICH CANONICAL VARIANTS (12 VARIANTS)
   ========================================================================== */

export const RichTopLeft = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="top"
        alignment="left"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichTopCenter = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="top"
        alignment="center"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichTopRight = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="top"
        alignment="right"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichBottomLeft = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="bottom"
        alignment="left"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichBottomCenter = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="bottom"
        alignment="center"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichBottomRight = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="bottom"
        alignment="right"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichSideLeftTop = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="side-l"
        alignment="top"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichSideLeftMiddle = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="side-l"
        alignment="middle"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichSideLeftBottom = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="side-l"
        alignment="bottom"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichSideRightTop = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="side-r"
        alignment="top"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichSideRightMiddle = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="side-r"
        alignment="middle"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichSideRightBottom = {
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        type="rich"
        position="side-r"
        alignment="bottom"
        title="Title"
        description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

/* ==========================================================================
   SECTION 4: MENU CANONICAL VARIANTS (6 VARIANTS)
   ========================================================================== */

export const MenuTopLeft = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="menu" position="top" alignment="left" />
    </StaticWrapper>
  ),
};

export const MenuTopCenter = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="menu" position="top" alignment="center" />
    </StaticWrapper>
  ),
};

export const MenuTopRight = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="menu" position="top" alignment="right" />
    </StaticWrapper>
  ),
};

export const MenuBottomLeft = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="menu" position="bottom" alignment="left" />
    </StaticWrapper>
  ),
};

export const MenuBottomCenter = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="menu" position="bottom" alignment="center" />
    </StaticWrapper>
  ),
};

export const MenuBottomRight = {
  render: () => (
    <StaticWrapper>
      <Tooltip static type="menu" position="bottom" alignment="right" />
    </StaticWrapper>
  ),
};

/* ==========================================================================
   SECTION 5: THEME COMPARISONS (Elevated vs Filled)
   ========================================================================== */

export const ThemeComparison = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '32px', background: '#fafafb', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#68687a' }}>Elevated Surface</span>
        <Tooltip static theme="elevated" type="rich" position="top" alignment="center" title="Elevated Theme" description="Crisp white surface container with soft drop shadow." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#68687a' }}>Filled Surface</span>
        <Tooltip static theme="filled" type="rich" position="top" alignment="center" title="Filled Theme" description="Tinted lavender surface container with soft drop shadow." />
      </div>
    </div>
  ),
};

/* ==========================================================================
   SECTION 6: INTERACTIVE TRIGGER STORIES
   ========================================================================== */

export const InteractiveHoverTrigger = {
  render: () => (
    <div style={{ padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip
        type="base-small"
        placement="top"
        text="Interactive button tooltip"
        trigger="hover"
      >
        <Button variant="primary">Hover Over Me</Button>
      </Tooltip>
    </div>
  ),
};

export const InteractiveClickMenuTrigger = {
  render: () => {
    const [selectedId, setSelectedId] = useState('1');
    const menuItems = [
      { id: '1', label: 'Option 1', checked: selectedId === '1' },
      { id: 'div-1', divider: true },
      { id: '2', label: 'Option 2', checked: selectedId === '2' },
      { id: '3', label: 'Option 3', checked: selectedId === '3' },
      { id: '4', label: 'Option 4', checked: selectedId === '4' },
      { id: 'div-2', divider: true },
      { id: '5', label: 'Option 5', checked: selectedId === '5' },
    ];

    return (
      <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
        <Tooltip
          type="menu"
          placement="bottom"
          trigger="click"
          items={menuItems}
          onItemClick={(it) => setSelectedId(it.id)}
        >
          <Button variant="outline">Click To Open Menu</Button>
        </Tooltip>
      </div>
    );
  },
};

export const InteractiveRichTrigger = {
  render: () => (
    <div style={{ padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip
        type="rich"
        placement="bottom"
        trigger="click"
        title="Project Configuration"
        description="Review all settings before applying adjustments to your environment."
        actions={[
          { label: 'Confirm', variant: 'primary', onClick: () => alert('Confirmed!') },
          { label: 'Dismiss', variant: 'outline', onClick: () => alert('Dismissed') },
        ]}
      >
        <IconButton aria-label="Project Information" icon="ℹ️" />
      </Tooltip>
    </div>
  ),
};

/* ==========================================================================
   SECTION 7: COMPLETE CANONICAL VARIANTS GALLERY
   ========================================================================== */

export const AllCanonicalVariantsGallery = {
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px', background: '#f8f8fa' }}>
      {/* 1. Base Small Gallery */}
      <section>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2f2f39', marginBottom: '16px' }}>Base Small Variants</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Top Left</span>
            <Tooltip static type="base-small" position="top" alignment="left" text="Tooltip text" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Top Center</span>
            <Tooltip static type="base-small" position="top" alignment="center" text="Tooltip text" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Top Right</span>
            <Tooltip static type="base-small" position="top" alignment="right" text="Tooltip text" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Bottom Left</span>
            <Tooltip static type="base-small" position="bottom" alignment="left" text="Tooltip text" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Bottom Center</span>
            <Tooltip static type="base-small" position="bottom" alignment="center" text="Tooltip text" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Bottom Right</span>
            <Tooltip static type="base-small" position="bottom" alignment="right" text="Tooltip text" />
          </div>
        </div>
      </section>

      {/* 2. Base Large Gallery */}
      <section>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2f2f39', marginBottom: '16px' }}>Base Large Variants</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Top Center</span>
            <Tooltip static type="base-large" position="top" alignment="center" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit." />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Bottom Center</span>
            <Tooltip static type="base-large" position="bottom" alignment="center" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit." />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Side Left Middle</span>
            <Tooltip static type="base-large" position="side-l" alignment="middle" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit." />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Side Right Middle</span>
            <Tooltip static type="base-large" position="side-r" alignment="middle" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit." />
          </div>
        </div>
      </section>

      {/* 3. Rich Gallery */}
      <section>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2f2f39', marginBottom: '16px' }}>Rich Variants</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Top Center</span>
            <Tooltip static type="rich" position="top" alignment="center" title="Title" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit." />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Bottom Center</span>
            <Tooltip static type="rich" position="bottom" alignment="center" title="Title" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit." />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Side Left Middle</span>
            <Tooltip static type="rich" position="side-l" alignment="middle" title="Title" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit." />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Side Right Middle</span>
            <Tooltip static type="rich" position="side-r" alignment="middle" title="Title" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit." />
          </div>
        </div>
      </section>

      {/* 4. Menu Gallery */}
      <section>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2f2f39', marginBottom: '16px' }}>Menu Variants</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Top Center</span>
            <Tooltip static type="menu" position="top" alignment="center" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Bottom Center</span>
            <Tooltip static type="menu" position="bottom" alignment="center" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Top Left</span>
            <Tooltip static type="menu" position="top" alignment="left" />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#68687a', display: 'block', marginBottom: '8px' }}>Bottom Right</span>
            <Tooltip static type="menu" position="bottom" alignment="right" />
          </div>
        </div>
      </section>
    </div>
  ),
};
