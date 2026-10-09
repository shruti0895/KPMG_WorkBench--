import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  decorators: [moduleMetadata({ imports: [TextareaComponent] })],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Textarea Component

The **Textarea** component is a robust, multi-line text input field crafted for forms, commentary fields, conversational prompts, and data entry workflows. It integrates seamlessly into the KPMG WorkBench.

#### Key Architectural Highlights & 20 Production Variants:
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
    variant: { control: 'select', options: ['outlined', 'filled'], description: 'Container treatment style: outlined or filled' },
    state: {
      control: 'select',
      options: ['enabled', 'hovered', 'focused', 'pressed', 'error', 'disabled'],
      description: 'Override state for visual inspection and static documentation',
    },
    label: { control: 'text', description: 'Field label displayed in the top header bar' },
    placeholder: { control: 'text', description: 'Placeholder text shown when field is empty' },
    maxLength: { control: 'number', description: 'Maximum permitted characters and denominator for count display' },
    showCount: { control: 'boolean', description: 'Explicit toggle to display character count in header' },
    error: { control: 'boolean', description: 'Flag to apply error styling or provide an error message string' },
    helperText: { control: 'text', description: 'Supplementary guidance or description text displayed below the field' },
    disabled: { control: 'boolean', description: 'Disables input and trailing action' },
    showAction: { control: 'boolean', description: 'Show trailing circular action button (default microphone / speech-to-text)' },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'CSS resize handle behavior',
    },
    fullWidth: { control: 'boolean', description: 'Whether the component expands to 100% of container width' },
  },
  render: (args) => ({ props: args, template: `<kpmg-textarea ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<TextareaComponent>;

const wrap = (inner: string) =>
  `<div style="padding: 24px; background: var(--color-surface); max-width: 360px">${inner}</div>`;

export const WithoutHeaderOutlinedEnabled: Story = {
  name: '01. Without Header - Outlined - Enabled',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="outlined" state="enabled" placeholder="Enter your message..." />`),
  }),
};

export const WithoutHeaderOutlinedHovered: Story = {
  name: '02. Without Header - Outlined - Hovered',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="outlined" state="hovered" placeholder="Enter your message..." />`),
  }),
};

export const WithoutHeaderOutlinedFocused: Story = {
  name: '03. Without Header - Outlined - Focused / Pressed',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="outlined" state="focused" placeholder="Enter your message..." />`),
  }),
};

export const WithoutHeaderOutlinedError: Story = {
  name: '04. Without Header - Outlined - Error',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="outlined" state="error" placeholder="Enter your message..." helperText="Please enter a valid input" />`),
  }),
};

export const WithoutHeaderOutlinedDisabled: Story = {
  name: '05. Without Header - Outlined - Disabled',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="outlined" state="disabled" placeholder="Input disabled" [disabled]="true" />`),
  }),
};

export const WithoutHeaderFilledEnabled: Story = {
  name: '06. Without Header - Filled - Enabled',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="filled" state="enabled" placeholder="Enter your message..." />`),
  }),
};

export const WithoutHeaderFilledHovered: Story = {
  name: '07. Without Header - Filled - Hovered',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="filled" state="hovered" placeholder="Enter your message..." />`),
  }),
};

export const WithoutHeaderFilledFocused: Story = {
  name: '08. Without Header - Filled - Focused / Pressed',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="filled" state="focused" placeholder="Enter your message..." />`),
  }),
};

export const WithoutHeaderFilledError: Story = {
  name: '09. Without Header - Filled - Error',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="filled" state="error" placeholder="Enter your message..." helperText="Please resolve this field" />`),
  }),
};

export const WithoutHeaderFilledDisabled: Story = {
  name: '10. Without Header - Filled - Disabled',
  render: () => ({
    template: wrap(`<kpmg-textarea variant="filled" state="disabled" placeholder="Input disabled" [disabled]="true" />`),
  }),
};

export const WithHeaderOutlinedEnabled: Story = {
  name: '11. With Header - Outlined - Enabled',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="outlined" state="enabled" placeholder="Placeholder" />`),
  }),
};

export const WithHeaderOutlinedHovered: Story = {
  name: '12. With Header - Outlined - Hovered',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="outlined" state="hovered" placeholder="Placeholder" />`),
  }),
};

export const WithHeaderOutlinedFocused: Story = {
  name: '13. With Header - Outlined - Focused / Pressed',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="outlined" state="focused" placeholder="Placeholder" />`),
  }),
};

export const WithHeaderOutlinedError: Story = {
  name: '14. With Header - Outlined - Error',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="outlined" state="error" placeholder="Placeholder" helperText="Error: Description exceeds boundary conditions" />`),
  }),
};

export const WithHeaderOutlinedDisabled: Story = {
  name: '15. With Header - Outlined - Disabled',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="outlined" state="disabled" placeholder="Placeholder" [disabled]="true" />`),
  }),
};

export const WithHeaderFilledEnabled: Story = {
  name: '16. With Header - Filled - Enabled',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="filled" state="enabled" placeholder="Placeholder" />`),
  }),
};

export const WithHeaderFilledHovered: Story = {
  name: '17. With Header - Filled - Hovered',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="filled" state="hovered" placeholder="Placeholder" />`),
  }),
};

export const WithHeaderFilledFocused: Story = {
  name: '18. With Header - Filled - Focused / Pressed',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="filled" state="focused" placeholder="Placeholder" />`),
  }),
};

export const WithHeaderFilledError: Story = {
  name: '19. With Header - Filled - Error',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="filled" state="error" placeholder="Placeholder" helperText="Error: Input contains invalid characters" />`),
  }),
};

export const WithHeaderFilledDisabled: Story = {
  name: '20. With Header - Filled - Disabled',
  render: () => ({
    template: wrap(`<kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" variant="filled" state="disabled" placeholder="Placeholder" [disabled]="true" />`),
  }),
};

const sectionTitle = 'font-size: 20px; font-weight: 600; margin-bottom: 8px; color: var(--color-on-surface)';
const sectionDesc = 'font-size: 14px; color: var(--color-neutral-200); margin-bottom: 24px';
const grid = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px';
const cell = 'display: flex; flex-direction: column; gap: 8px';
const cap = 'font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-neutral-200)';

export const All20VariantsMatrix: Story = {
  name: 'Comprehensive 20-Variant Matrix',
  render: () => ({
    props: { states: ['enabled', 'hovered', 'focused', 'error', 'disabled'], variants: ['outlined', 'filled'] },
    template: `
      <div style="padding: 32px; background: var(--color-surface); display: flex; flex-direction: column; gap: 48px">
        <div>
          <h2 style="${sectionTitle}">Section A: Standalone Container (Without Header Bar)</h2>
          <p style="${sectionDesc}">Ten variants spanning Outlined and Filled visual styles across all 5 interaction states.</p>
          <div style="${grid}">
            @for (v of variants; track v) {
              @for (st of states; track st) {
                <div style="${cell}">
                  <span style="${cap}">{{ v === 'outlined' ? 'Outlined' : 'Filled' }} &bull; {{ st }}</span>
                  <kpmg-textarea [variant]="$any(v)" [state]="$any(st)" [placeholder]="(v === 'outlined' ? 'Outlined (' : 'Filled (') + st + ')'" [disabled]="st === 'disabled'" />
                </div>
              }
            }
          </div>
        </div>

        <div>
          <h2 style="${sectionTitle}">Section B: Structured Field (With Header Bar & Live Counter)</h2>
          <p style="${sectionDesc}">Ten variants featuring label bar with character count constraint (0/100) across Outlined and Filled styles.</p>
          <div style="${grid}">
            @for (v of variants; track v) {
              @for (st of states; track st) {
                <div style="${cell}">
                  <span style="${cap}">{{ v === 'outlined' ? 'Outlined' : 'Filled' }} &bull; {{ st }}</span>
                  <kpmg-textarea label="Label" [maxLength]="100" [showCount]="true" [variant]="$any(v)" [state]="$any(st)" [placeholder]="(v === 'outlined' ? 'Outlined (' : 'Filled (') + st + ')'" [disabled]="st === 'disabled'" />
                </div>
              }
            }
          </div>
        </div>
      </div>
    `,
  }),
};

const toggleBtn = 'padding: 6px 14px; border-radius: 6px; border: 1px solid var(--color-neutral-300); background: var(--color-surface); cursor: pointer; font-size: 13px';

export const InteractiveLiveDemo: Story = {
  name: 'Interactive Live Controlled Demo',
  render: () => ({
    props: {
      text: 'Antigravity design systems make scalable UI rapid and reliable.',
      actionStatus: '',
      variant: 'outlined',
      hasError: false,
      handleVoiceClick() {
        const self = this as any;
        self.actionStatus = 'Listening for voice input...';
        setTimeout(() => {
          self.text = self.text + ' [Transcribed speech segment]';
          self.actionStatus = 'Speech recognized and inserted.';
        }, 900);
      },
    },
    template: `
      <div style="padding: 32px; background: var(--color-surface); max-width: 540px">
        <div style="display: flex; gap: 12px; margin-bottom: 20px">
          <button type="button" (click)="variant = variant === 'outlined' ? 'filled' : 'outlined'" style="${toggleBtn}">
            Toggle Variant: <strong>{{ variant }}</strong>
          </button>
          <button type="button" (click)="hasError = !hasError" style="${toggleBtn}" [style.color]="hasError ? 'var(--color-red-600)' : 'inherit'">
            Toggle Error: <strong>{{ hasError ? 'ON' : 'OFF' }}</strong>
          </button>
        </div>

        <kpmg-textarea
          label="Project Description"
          [value]="text"
          (valueChange)="text = $event"
          [variant]="variant"
          [error]="hasError ? 'Description contains validation errors' : false"
          [maxLength]="200"
          [showCount]="true"
          placeholder="Type your notes here or tap mic to speak..."
          (actionClick)="handleVoiceClick()"
          [helperText]="actionStatus || 'Type directly or use voice input to append speech notes.'"
        />
      </div>
    `,
  }),
};
