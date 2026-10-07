import React, { useState } from 'react';
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
### KPMG WorkBench Design System - Tooltip Component

The **Tooltip** component provides supplementary contextual feedback, explanatory descriptions, interactive options, or rich previews anchored to interactive triggers. Designed according to KPMG WorkBench 2026 specifications, it features a 100% token-driven architecture supporting both high-contrast light and dark themes.

#### Key Architectural Highlights & Canonical Variants:
- **100% Token-Driven Architecture**: Mapped to design tokens (\`--color-tooltip-*\`, \`--radius-tooltip-*\`, \`--spacing-tooltip-*\`, \`--size-tooltip-caret-*\`) with zero hardcoded visual styles.
- **2 Visual Themes**:
  - \`elevated\`: Crisp white card background (\`--color-surface\`), delicate neutral border stroke, and refined elevation drop shadow.
  - \`filled\`: Lavender tinted background (\`--color-primary-container\`), borderless resting elevation, and high-contrast text.
- **8 Content Variants**:
  - \`single-line\`: Compact 32px height pill for button labels, icons, or concise hints (8px radius, small 12x6 caret).
  - \`multi-line\`: 300px width multi-line body text container for extended guidance (12px radius, medium 18x9 caret).
  - \`rich-action\`: Title, descriptive body, and paired action buttons (18px radius, large 24x12 caret).
  - \`rich-source\`: Title, body, and interactive citation/source checklist.
  - \`rich-alert-small\`: Title, body, secondary label, and single card item with thumbnail, title, and action.
  - \`rich-alert-large\`: Title, body, secondary label, and dual card items with thumbnails and subtitle lines.
  - \`menu-list\`: Action dropdown menu with options, dividers, and circular check indicators.
  - \`menu-icon\`: Dropdown menu with star bookmark icons, option labels, and checkmarks.
- **3 Caret Sizes & 12 Positional Alignments**:
  - Carets: Small (\`12×6px\`), Medium (\`18×9px\`), and Large (\`24×12px\`).
  - Placements: \`top\`, \`bottom\`, \`left\` (Side L), \`right\` (Side R).
  - Alignments: \`left\`, \`center\`, \`right\` for top/bottom; \`top\`, \`middle\`, \`bottom\` for side placements.
- **Interaction Modes**: Supports \`hover\` (with configurable enter/leave delays), \`click\` (for menus/rich cards), and controlled \`manual\` display.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['elevated', 'filled'],
      description: 'Color theme: elevated (white card) or filled (lavender tint)',
    },
    variant: {
      control: 'select',
      options: [
        'single-line',
        'multi-line',
        'rich-action',
        'rich-source',
        'rich-alert-small',
        'rich-alert-large',
        'menu-list',
        'menu-icon',
      ],
      description: 'Structural format of the tooltip content',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position relative to the target anchor',
    },
    align: {
      control: 'select',
      options: ['center', 'left', 'right', 'middle', 'top', 'bottom'],
      description: 'Alignment along the placement axis',
    },
    caret: {
      control: 'boolean',
      description: 'Whether to show the pointer arrow caret',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'manual'],
      description: 'Trigger mechanism to display tooltip',
    },
  },
};

const StaticWrapper = ({ children }) => (
  <div style={{ padding: '36px', background: 'var(--color-surface)', display: 'inline-flex' }}>
    {children}
  </div>
);

// ============================================================================
// 1. Plain Tooltips (Single Line & Multi Line)
// ============================================================================

export const SingleLineElevated = {
  name: '01. Single-Line - Elevated',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="elevated"
        variant="single-line"
        placement="top"
        content="Supporting text"
      />
    </StaticWrapper>
  ),
};

export const SingleLineFilled = {
  name: '02. Single-Line - Filled',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="filled"
        variant="single-line"
        placement="top"
        content="Supporting text"
      />
    </StaticWrapper>
  ),
};

export const MultiLineElevated = {
  name: '03. Multi-Line - Elevated',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="elevated"
        variant="multi-line"
        placement="top"
        content="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt."
      />
    </StaticWrapper>
  ),
};

export const MultiLineFilled = {
  name: '04. Multi-Line - Filled',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="filled"
        variant="multi-line"
        placement="top"
        content="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt."
      />
    </StaticWrapper>
  ),
};

// ============================================================================
// 2. Rich Tooltips (Action & Source)
// ============================================================================

export const RichActionElevated = {
  name: '05. Rich Action - Elevated',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="elevated"
        variant="rich-action"
        placement="top"
        title="Title"
        content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichActionFilled = {
  name: '06. Rich Action - Filled',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="filled"
        variant="rich-action"
        placement="top"
        title="Title"
        content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichSourceElevated = {
  name: '07. Rich Source - Elevated',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="elevated"
        variant="rich-source"
        placement="top"
        title="Title"
        content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

export const RichSourceFilled = {
  name: '08. Rich Source - Filled',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="filled"
        variant="rich-source"
        placement="top"
        title="Title"
        content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </StaticWrapper>
  ),
};

// ============================================================================
// 3. Rich Alert Card Tooltips (Small & Large)
// ============================================================================

export const RichAlertSmallElevated = {
  name: '09. Rich Alert Small - Elevated',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="elevated"
        variant="rich-alert-small"
        placement="top"
        title="Title"
        content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        sectionLabel="Secondary text"
      />
    </StaticWrapper>
  ),
};

export const RichAlertLargeElevated = {
  name: '10. Rich Alert Large - Elevated',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="elevated"
        variant="rich-alert-large"
        placement="top"
        title="Title"
        content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        sectionLabel="Secondary text"
      />
    </StaticWrapper>
  ),
};

export const RichAlertLargeFilled = {
  name: '11. Rich Alert Large - Filled',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="filled"
        variant="rich-alert-large"
        placement="top"
        title="Title"
        content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        sectionLabel="Secondary text"
      />
    </StaticWrapper>
  ),
};

// ============================================================================
// 4. Menu Tooltips (List & Icon)
// ============================================================================

export const MenuListElevated = {
  name: '12. Menu List - Elevated',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="elevated"
        variant="menu-list"
        placement="top"
      />
    </StaticWrapper>
  ),
};

export const MenuIconElevated = {
  name: '13. Menu Icon - Elevated',
  render: () => (
    <StaticWrapper>
      <Tooltip
        static
        theme="elevated"
        variant="menu-icon"
        placement="top"
      />
    </StaticWrapper>
  ),
};

// ============================================================================
// 5. Placements & Caret Alignments Matrix
// ============================================================================

export const PlacementsMatrix = {
  name: '14. Placements & Caret Alignments Matrix',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '32px', background: 'var(--color-surface)' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Top Placements (Left, Center, Right)</h3>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Tooltip static theme="elevated" variant="single-line" placement="top" align="left" content="Top Left Caret" />
            <Tooltip static theme="elevated" variant="single-line" placement="top" align="center" content="Top Center Caret" />
            <Tooltip static theme="elevated" variant="single-line" placement="top" align="right" content="Top Right Caret" />
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Bottom Placements (Left, Center, Right)</h3>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Tooltip static theme="elevated" variant="single-line" placement="bottom" align="left" content="Bottom Left Caret" />
            <Tooltip static theme="elevated" variant="single-line" placement="bottom" align="center" content="Bottom Center Caret" />
            <Tooltip static theme="elevated" variant="single-line" placement="bottom" align="right" content="Bottom Right Caret" />
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Side Placements (Left & Right with Middle Caret)</h3>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <Tooltip static theme="elevated" variant="multi-line" placement="left" align="middle" content="Side Left Tooltip with Caret pointing right." />
            <Tooltip static theme="elevated" variant="multi-line" placement="right" align="middle" content="Side Right Tooltip with Caret pointing left." />
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// 6. Interactive Live Trigger Demonstration
// ============================================================================

export const InteractiveDemo = {
  name: '15. Interactive Trigger Demo (Hover & Click)',
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center', padding: '64px 32px', background: 'var(--color-surface)', flexWrap: 'wrap' }}>
        {/* Hover Single Line */}
        <Tooltip content="Hover tooltip hint" placement="top">
          <Button variant="outline">Hover over me</Button>
        </Tooltip>

        {/* Hover Multi-Line Filled */}
        <Tooltip
          theme="filled"
          variant="multi-line"
          placement="bottom"
          content="This filled multi-line tooltip automatically appears on hover and focus."
        >
          <Button variant="primary">Hover for Filled</Button>
        </Tooltip>

        {/* Click Rich Action */}
        <Tooltip
          trigger="click"
          variant="rich-action"
          placement="top"
          title="Project Methodology"
          content="Select an action to proceed with the audit workflow."
        >
          <Button variant="secondary">Click for Rich Action</Button>
        </Tooltip>

        {/* Click Menu List */}
        <Tooltip
          trigger="click"
          variant="menu-list"
          placement="bottom"
        >
          <Button variant="outline">Click for Menu</Button>
        </Tooltip>
      </div>
    );
  },
};
