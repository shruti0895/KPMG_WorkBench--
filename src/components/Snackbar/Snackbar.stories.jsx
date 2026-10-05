import React, { useState } from 'react';
import { Snackbar, SnackbarContainer } from './Snackbar';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Snackbar',
  component: Snackbar,
  parameters: {
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Snackbar Component

The **Snackbar** component provides brief, temporary notifications or contextual status updates anchored to the interface without disrupting current user workflows. Designed in compliance with KPMG WorkBench 2026 specifications, it features a 100% token-driven architecture supporting both high-contrast light and dark themes.

#### Key Architectural Highlights & 10 Canonical Variants:
- **100% Token-Driven Architecture**: Fully tied to KPMG WorkBench design tokens (\`--color-snackbar-*\`, \`--radius-snackbar\`, \`--spacing-snackbar-*\`, \`--width-snackbar\`) with zero hardcoded hex colors or arbitrary pixel values.
- **5 Form Factor Sizes**:
  - \`Single-line\` (64px min-height): Compact text message paired with an action button and close dismiss control.
  - \`Two-line\` (76px min-height): Accommodates two lines of descriptive message before actions.
  - \`Extended\` (154px min-height): Multi-line body text container with right-justified action buttons at bottom.
  - \`Extended with header\` (194px min-height): Adds an overarching header title above the descriptive text body.
  - \`Extended with media\` (464px min-height): Features a header, description, and up to 3 interactive media card items with thumbnails and overflow menus.
- **2 Container Outline Treatments**:
  - \`Elevated\` (\`outlined={false}\`): Clean surface with delicate resting drop shadow (\`--shadow-300\`).
  - \`Outlined\` (\`outlined={true}\`): Structural container with border stroke (\`--color-neutral-outline\`).
- **Interactive Action & Dismiss**: Supports primary action pills ("Action", "Longer action", "Modify") and dismissible close controls.
- **WAI-ARIA Accessibility**: Complies with \`role="status"\` and \`aria-live="polite"\` notification patterns.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [
        'single-line',
        'two-line',
        'extended',
        'extended-header',
        'extended-media',
      ],
      description: 'Layout size format of the snackbar',
    },
    outlined: {
      control: 'boolean',
      description: 'Whether to show a border outline (true) or resting elevation shadow (false)',
    },
    header: {
      control: 'text',
      description: 'Header title text for extended variants',
    },
    message: {
      control: 'text',
      description: 'Main notification message text',
    },
    actionLabel: {
      control: 'text',
      description: 'Text label for the primary action button',
    },
    closeable: {
      control: 'boolean',
      description: 'Whether to display the close (X) dismiss button',
    },
  },
};

const StoryWrapper = ({ children }) => (
  <div style={{ padding: '32px', background: 'var(--color-surface-light)', display: 'inline-flex' }}>
    {children}
  </div>
);

// ============================================================================
// 1. Single Line Variants (Elevated & Outlined)
// ============================================================================

export const SingleLineElevated = {
  name: '01. Single-Line - Elevated',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="single-line"
        outlined={false}
        message="Snackbar text goes here"
        actionLabel="Action"
      />
    </StoryWrapper>
  ),
};

export const SingleLineOutlined = {
  name: '02. Single-Line - Outlined',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="single-line"
        outlined={true}
        message="Snackbar text goes here"
        actionLabel="Action"
      />
    </StoryWrapper>
  ),
};

// ============================================================================
// 2. Two Line Variants (Elevated & Outlined)
// ============================================================================

export const TwoLineElevated = {
  name: '03. Two-Line - Elevated',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="two-line"
        outlined={false}
        message="Snackbar text goes here"
        actionLabel="Action"
      />
    </StoryWrapper>
  ),
};

export const TwoLineOutlined = {
  name: '04. Two-Line - Outlined',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="two-line"
        outlined={true}
        message="Snackbar text goes here"
        actionLabel="Action"
      />
    </StoryWrapper>
  ),
};

// ============================================================================
// 3. Extended Variants (Elevated & Outlined)
// ============================================================================

export const ExtendedElevated = {
  name: '05. Extended - Elevated',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="extended"
        outlined={false}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        actionLabel="Longer action"
      />
    </StoryWrapper>
  ),
};

export const ExtendedOutlined = {
  name: '06. Extended - Outlined',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="extended"
        outlined={true}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        actionLabel="Longer action"
      />
    </StoryWrapper>
  ),
};

// ============================================================================
// 4. Extended with Header Variants (Elevated & Outlined)
// ============================================================================

export const ExtendedWithHeaderElevated = {
  name: '07. Extended with Header - Elevated',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="extended-header"
        outlined={false}
        header="Header"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        actionLabel="Longer action"
      />
    </StoryWrapper>
  ),
};

export const ExtendedWithHeaderOutlined = {
  name: '08. Extended with Header - Outlined',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="extended-header"
        outlined={true}
        header="Header"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        actionLabel="Longer action"
      />
    </StoryWrapper>
  ),
};

// ============================================================================
// 5. Extended with Media Variants (Elevated & Outlined)
// ============================================================================

export const ExtendedWithMediaElevated = {
  name: '09. Extended with Media - Elevated',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="extended-media"
        outlined={false}
        header="Header"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        actionLabel="Longer action"
        items={[
          { id: '1', title: 'Header' },
          { id: '2', title: 'Header' },
          { id: '3', title: 'Header' },
        ]}
      />
    </StoryWrapper>
  ),
};

export const ExtendedWithMediaOutlined = {
  name: '10. Extended with Media - Outlined',
  render: () => (
    <StoryWrapper>
      <Snackbar
        size="extended-media"
        outlined={true}
        header="Header"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        actionLabel="Longer action"
        items={[
          { id: '1', title: 'Header' },
          { id: '2', title: 'Header' },
          { id: '3', title: 'Header' },
        ]}
      />
    </StoryWrapper>
  ),
};

// ============================================================================
// 6. Complete 10-Variant Matrix Showcase
// ============================================================================

export const All10VariantsMatrix = {
  name: 'Comprehensive 10-Variant Matrix',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '32px', background: 'var(--color-surface)' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-on-surface)' }}>
            Canonical 10-Variant Matrix
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-neutral-200)', marginBottom: '24px' }}>
            5 layout sizes across Elevated (Resting shadow) and Outlined (Border stroke) treatments.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', maxWidth: '800px' }}>
            {/* Single Line */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                01. Single-Line &bull; Elevated
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="single-line" outlined={false} message="Snackbar text goes here" actionLabel="Action" />
              </div>
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                02. Single-Line &bull; Outlined
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="single-line" outlined={true} message="Snackbar text goes here" actionLabel="Action" />
              </div>
            </div>

            {/* Two Line */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                03. Two-Line &bull; Elevated
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="two-line" outlined={false} message="Snackbar text goes here" actionLabel="Action" />
              </div>
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                04. Two-Line &bull; Outlined
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="two-line" outlined={true} message="Snackbar text goes here" actionLabel="Action" />
              </div>
            </div>

            {/* Extended */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                05. Extended &bull; Elevated
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="extended" outlined={false} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." actionLabel="Longer action" />
              </div>
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                06. Extended &bull; Outlined
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="extended" outlined={true} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." actionLabel="Longer action" />
              </div>
            </div>

            {/* Extended with Header */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                07. Extended Header &bull; Elevated
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="extended-header" outlined={false} header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." actionLabel="Longer action" />
              </div>
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                08. Extended Header &bull; Outlined
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="extended-header" outlined={true} header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." actionLabel="Longer action" />
              </div>
            </div>

            {/* Extended with Media */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                09. Extended Media &bull; Elevated
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="extended-media" outlined={false} header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." actionLabel="Longer action" />
              </div>
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                10. Extended Media &bull; Outlined
              </span>
              <div style={{ marginTop: '8px' }}>
                <Snackbar size="extended-media" outlined={true} header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." actionLabel="Longer action" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// 7. Interactive Toast Notification Demo (Bottom-Left Viewport)
// ============================================================================

export const InteractiveToastDemo = {
  name: 'Interactive Viewport Toast Demo',
  render: () => {
    const [toasts, setToasts] = useState([]);

    const triggerToast = (size, outlined) => {
      const id = Date.now().toString();
      const newToast = {
        id,
        size,
        outlined,
        header: size.includes('header') || size.includes('media') ? 'Sources' : undefined,
        message: 'Client sample request updated successfully.',
        description: 'New audit documentation was parsed and added to review index.',
        actionLabel: 'Modify',
        onAction: () => alert('Action clicked!'),
      };
      setToasts((prev) => [...prev, newToast]);
    };

    const removeToast = (id) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
      <div style={{ padding: '32px', background: 'var(--color-surface)', minHeight: '300px' }}>
        <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)', marginBottom: '16px' }}>
          Click below to trigger fixed viewport toast snackbars at the <strong>bottom-left</strong> of the page:
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => triggerToast('single-line', false)}>
            Spawn Single-Line
          </Button>
          <Button variant="outline" onClick={() => triggerToast('single-line', true)}>
            Spawn Outlined
          </Button>
          <Button variant="secondary" onClick={() => triggerToast('extended-header', false)}>
            Spawn Extended Header
          </Button>
          <Button variant="outline" onClick={() => triggerToast('extended-media', true)}>
            Spawn Media Snackbar
          </Button>
        </div>

        {/* Viewport fixed toast container */}
        <SnackbarContainer position="bottom-left">
          {toasts.map((toast) => (
            <Snackbar
              key={toast.id}
              {...toast}
              autoHideDuration={6000}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </SnackbarContainer>
      </div>
    );
  },
};
