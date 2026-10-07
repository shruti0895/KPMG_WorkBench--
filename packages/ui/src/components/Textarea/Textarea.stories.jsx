import React, { useState } from 'react';
import { Textarea, MicIcon, AlertCircleIcon } from './Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Textarea Component

The **Textarea** component is a robust, multi-line text input field crafted for forms, commentary fields, conversational prompts, and data entry workflows. It integrates seamlessly into the KPMG WorkBench token architecture, supporting both high-contrast light and dark themes.

#### Key Architectural Highlights & 20 Production Variants:
- **100% Token-Driven Architecture**: Fully tied to KPMG WorkBench CSS design tokens (\`--color-textarea-*\`, \`--size-textarea-*\`, \`--spacing-textarea-*\`, \`--radius-textarea\`) with zero hardcoded hex colors or arbitrary pixel values.
- **2 Container Visual Variants**:
  - \`outlined\`: Clean white card surface with structural border strokes (\`--color-textarea-outlined-*\`).
  - \`filled\`: Subtle tinted container surface without resting borders (\`--color-textarea-filled-*\`).
- **2 Header Bar Layouts**:
  - \`Without Header Bar\`: Standalone compact multi-line container (min-height 108px) featuring a bottom-right trailing action button.
  - \`With Header Bar\`: Includes an integrated top bar showing the field label on the left and dynamic live word/character count (\`0/100\`) on the right.
- **5 Canonical Interaction States**:
  - \`enabled\`: Default resting state ready for user interaction.
  - \`hovered\`: Interactive hover elevation and border darkening.
  - \`focused / pressed\`: Primary highlight focus ring and active label treatment.
  - \`error\`: High-visibility critical feedback border, label color shift, and error indicator.
  - \`disabled\`: Inactive/locked state with muted typography and pointer lock.
- **Trailing Action Slot**: Built-in support for speech-to-text microphone button, clear action, or custom interactive controls.
- **WAI-ARIA Accessibility**: Complete accessible labeling (\`htmlFor\`, \`id\`, \`aria-invalid\`, \`aria-describedby\`, and live character count announcements).
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'Container treatment style: outlined or filled',
    },
    state: {
      control: 'select',
      options: ['enabled', 'hovered', 'focused', 'pressed', 'error', 'disabled'],
      description: 'Override state for visual inspection and static documentation',
    },
    label: {
      control: 'text',
      description: 'Field label displayed in the top header bar',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when field is empty',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum permitted characters and denominator for count display',
    },
    showCount: {
      control: 'boolean',
      description: 'Explicit toggle to display character count in header',
    },
    error: {
      control: 'boolean',
      description: 'Flag to apply error styling or provide an error message string',
    },
    helperText: {
      control: 'text',
      description: 'Supplementary guidance or description text displayed below the field',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables input and trailing action',
    },
    showAction: {
      control: 'boolean',
      description: 'Show trailing circular action button (default microphone / speech-to-text)',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'CSS resize handle behavior',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the component expands to 100% of container width',
    },
  },
};

const StoryContainer = ({ children, width = '360px' }) => (
  <div style={{ padding: '24px', background: 'var(--color-surface)', maxWidth: width }}>
    {children}
  </div>
);

// ============================================================================
// PART 1: 10 Variants WITHOUT Header Bar (Outlined & Filled x 5 States)
// ============================================================================

export const WithoutHeaderOutlinedEnabled = {
  name: '01. Without Header - Outlined - Enabled',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="outlined"
        state="enabled"
        placeholder="Enter your message..."
      />
    </StoryContainer>
  ),
};

export const WithoutHeaderOutlinedHovered = {
  name: '02. Without Header - Outlined - Hovered',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="outlined"
        state="hovered"
        placeholder="Enter your message..."
      />
    </StoryContainer>
  ),
};

export const WithoutHeaderOutlinedFocused = {
  name: '03. Without Header - Outlined - Focused / Pressed',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="outlined"
        state="focused"
        placeholder="Enter your message..."
      />
    </StoryContainer>
  ),
};

export const WithoutHeaderOutlinedError = {
  name: '04. Without Header - Outlined - Error',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="outlined"
        state="error"
        placeholder="Enter your message..."
        helperText="Please enter a valid input"
      />
    </StoryContainer>
  ),
};

export const WithoutHeaderOutlinedDisabled = {
  name: '05. Without Header - Outlined - Disabled',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="outlined"
        state="disabled"
        placeholder="Input disabled"
        disabled
      />
    </StoryContainer>
  ),
};

export const WithoutHeaderFilledEnabled = {
  name: '06. Without Header - Filled - Enabled',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="filled"
        state="enabled"
        placeholder="Enter your message..."
      />
    </StoryContainer>
  ),
};

export const WithoutHeaderFilledHovered = {
  name: '07. Without Header - Filled - Hovered',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="filled"
        state="hovered"
        placeholder="Enter your message..."
      />
    </StoryContainer>
  ),
};

export const WithoutHeaderFilledFocused = {
  name: '08. Without Header - Filled - Focused / Pressed',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="filled"
        state="focused"
        placeholder="Enter your message..."
      />
    </StoryContainer>
  ),
};

export const WithoutHeaderFilledError = {
  name: '09. Without Header - Filled - Error',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="filled"
        state="error"
        placeholder="Enter your message..."
        helperText="Please resolve this field"
      />
    </StoryContainer>
  ),
};

export const WithoutHeaderFilledDisabled = {
  name: '10. Without Header - Filled - Disabled',
  render: () => (
    <StoryContainer>
      <Textarea
        variant="filled"
        state="disabled"
        placeholder="Input disabled"
        disabled
      />
    </StoryContainer>
  ),
};

// ============================================================================
// PART 2: 10 Variants WITH Header Bar (Label + 0/100 Count) (Outlined & Filled x 5 States)
// ============================================================================

export const WithHeaderOutlinedEnabled = {
  name: '11. With Header - Outlined - Enabled',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="outlined"
        state="enabled"
        placeholder="Placeholder"
      />
    </StoryContainer>
  ),
};

export const WithHeaderOutlinedHovered = {
  name: '12. With Header - Outlined - Hovered',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="outlined"
        state="hovered"
        placeholder="Placeholder"
      />
    </StoryContainer>
  ),
};

export const WithHeaderOutlinedFocused = {
  name: '13. With Header - Outlined - Focused / Pressed',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="outlined"
        state="focused"
        placeholder="Placeholder"
      />
    </StoryContainer>
  ),
};

export const WithHeaderOutlinedError = {
  name: '14. With Header - Outlined - Error',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="outlined"
        state="error"
        placeholder="Placeholder"
        helperText="Error: Description exceeds boundary conditions"
      />
    </StoryContainer>
  ),
};

export const WithHeaderOutlinedDisabled = {
  name: '15. With Header - Outlined - Disabled',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="outlined"
        state="disabled"
        placeholder="Placeholder"
        disabled
      />
    </StoryContainer>
  ),
};

export const WithHeaderFilledEnabled = {
  name: '16. With Header - Filled - Enabled',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="filled"
        state="enabled"
        placeholder="Placeholder"
      />
    </StoryContainer>
  ),
};

export const WithHeaderFilledHovered = {
  name: '17. With Header - Filled - Hovered',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="filled"
        state="hovered"
        placeholder="Placeholder"
      />
    </StoryContainer>
  ),
};

export const WithHeaderFilledFocused = {
  name: '18. With Header - Filled - Focused / Pressed',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="filled"
        state="focused"
        placeholder="Placeholder"
      />
    </StoryContainer>
  ),
};

export const WithHeaderFilledError = {
  name: '19. With Header - Filled - Error',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="filled"
        state="error"
        placeholder="Placeholder"
        helperText="Error: Input contains invalid characters"
      />
    </StoryContainer>
  ),
};

export const WithHeaderFilledDisabled = {
  name: '20. With Header - Filled - Disabled',
  render: () => (
    <StoryContainer>
      <Textarea
        label="Label"
        maxLength={100}
        showCount
        variant="filled"
        state="disabled"
        placeholder="Placeholder"
        disabled
      />
    </StoryContainer>
  ),
};

// ============================================================================
// PART 3: Comprehensive 20-Variant Comparison Matrix
// ============================================================================

export const All20VariantsMatrix = {
  name: 'Comprehensive 20-Variant Matrix',
  render: () => {
    const states = ['enabled', 'hovered', 'focused', 'error', 'disabled'];

    return (
      <div style={{ padding: '32px', background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-on-surface)' }}>
            Section A: Standalone Container (Without Header Bar)
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-neutral-200)', marginBottom: '24px' }}>
            Ten variants spanning Outlined and Filled visual styles across all 5 interaction states.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {states.map((st) => (
              <div key={`no-header-outlined-${st}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                  Outlined &bull; {st}
                </span>
                <Textarea
                  variant="outlined"
                  state={st}
                  placeholder={`Outlined (${st})`}
                  disabled={st === 'disabled'}
                />
              </div>
            ))}

            {states.map((st) => (
              <div key={`no-header-filled-${st}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                  Filled &bull; {st}
                </span>
                <Textarea
                  variant="filled"
                  state={st}
                  placeholder={`Filled (${st})`}
                  disabled={st === 'disabled'}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-on-surface)' }}>
            Section B: Structured Field (With Header Bar & Live Counter)
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-neutral-200)', marginBottom: '24px' }}>
            Ten variants featuring label bar with character count constraint (0/100) across Outlined and Filled styles.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {states.map((st) => (
              <div key={`with-header-outlined-${st}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                  Outlined &bull; {st}
                </span>
                <Textarea
                  label="Label"
                  maxLength={100}
                  showCount
                  variant="outlined"
                  state={st}
                  placeholder={`Outlined (${st})`}
                  disabled={st === 'disabled'}
                />
              </div>
            ))}

            {states.map((st) => (
              <div key={`with-header-filled-${st}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-neutral-200)' }}>
                  Filled &bull; {st}
                </span>
                <Textarea
                  label="Label"
                  maxLength={100}
                  showCount
                  variant="filled"
                  state={st}
                  placeholder={`Filled (${st})`}
                  disabled={st === 'disabled'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// PART 4: Live Interactive Showcase (Controlled with Speech Action Click)
// ============================================================================

export const InteractiveLiveDemo = {
  name: 'Interactive Live Controlled Demo',
  render: () => {
    const [text, setText] = useState('Antigravity design systems make scalable UI rapid and reliable.');
    const [actionStatus, setActionStatus] = useState('');
    const [variant, setVariant] = useState('outlined');
    const [hasError, setHasError] = useState(false);

    const handleVoiceClick = () => {
      setActionStatus('Listening for voice input...');
      setTimeout(() => {
        setText((prev) => prev + ' [Transcribed speech segment]');
        setActionStatus('Speech recognized and inserted.');
      }, 900);
    };

    return (
      <div style={{ padding: '32px', background: 'var(--color-surface)', maxWidth: '540px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => setVariant(variant === 'outlined' ? 'filled' : 'outlined')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid var(--color-neutral-300)',
              background: 'var(--color-surface)',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Toggle Variant: <strong>{variant}</strong>
          </button>

          <button
            type="button"
            onClick={() => setHasError(!hasError)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid var(--color-neutral-300)',
              background: 'var(--color-surface)',
              cursor: 'pointer',
              fontSize: '13px',
              color: hasError ? 'var(--color-red-600)' : 'inherit',
            }}
          >
            Toggle Error: <strong>{hasError ? 'ON' : 'OFF'}</strong>
          </button>
        </div>

        <Textarea
          label="Project Description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant={variant}
          error={hasError ? 'Description contains validation errors' : false}
          maxLength={200}
          showCount
          placeholder="Type your notes here or tap mic to speak..."
          onActionClick={handleVoiceClick}
          helperText={actionStatus || 'Type directly or use voice input to append speech notes.'}
        />
      </div>
    );
  },
};
