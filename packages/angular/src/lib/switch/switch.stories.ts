import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { SwitchComponent } from './switch.component';

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  decorators: [moduleMetadata({ imports: [SwitchComponent] })],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `


The KPMG WorkBench Switch is an accessible, token-driven toggle control adhering strictly to the KPMG WorkBench Design System specification. 
### Key Capabilities
- **16 Canonical Variants**: Full coverage of all 16 Figma states across selection states, icon configurations, and interaction states.
- **Micro-Interactions**: Features an expanding thumb in pressed/active state) matching the Figma physics model.
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
  render: (args) => ({ props: args, template: `<kpmg-switch ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<SwitchComponent>;

/* STORY 1: ALL 16 CANONICAL FIGMA VARIANTS (EXACT FIGMA 4x4 MATRIX) */
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

const initialCheckedState: Record<string, boolean> = {
  '1': true, '2': true, '3': true, '4': true,
  '5': true, '6': true, '7': true, '8': true,
  '9': false, '10': false, '11': false, '12': false,
  '13': false, '14': false, '15': false, '16': false,
};

export const All16FigmaVariants: Story = {
  render: () => ({
    props: {
      variantMatrix,
      variantChecked: { ...initialCheckedState },
      handleResetDefaults() {
        (this as any).variantChecked = { ...initialCheckedState };
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px">
          <div>
            <h2 style="margin: 0 0 8px 0; font-family: var(--font-family-base); color: var(--color-neutral-000)">
              Switch — All 16 Canonical Figma Variants
            </h2>
            <p style="margin: 0; font-size: 14px; color: var(--color-neutral-100); max-width: 850px">
              Exact 4&times;4 matrix of all 16 switch variants defined in the KPMG WorkBench Design System specification.
              Badges 1 through 16 represent the exact states from the canonical documentation frame.
              All switches are directly interactive on click.
            </p>
          </div>
          <button
            type="button"
            (click)="handleResetDefaults()"
            style="padding: 8px 16px; background-color: #ffffff; border: 1px solid #d5d5dc; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; color: var(--color-neutral-000); font-family: inherit"
          >
            Reset to Canonical Defaults
          </button>
        </div>

        <div style="background-color: #fbfbfb; border-radius: 28px; padding: 48px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); border: 1px solid #ededf2; display: flex; flex-direction: column; gap: 48px; max-width: 1100px">
          <div style="display: grid; grid-template-columns: 180px repeat(4, 1fr); gap: 24px; border-bottom: 1px solid #d5d5dc; padding-bottom: 16px">
            <span style="font-size: 13px; font-weight: 600; color: #9090a2; text-transform: uppercase">Configuration</span>
            <span style="font-size: 13px; font-weight: 600; color: #2f2f39; text-align: center">Enabled</span>
            <span style="font-size: 13px; font-weight: 600; color: #2f2f39; text-align: center">Hovered</span>
            <span style="font-size: 13px; font-weight: 600; color: #2f2f39; text-align: center">Pressed (28px Thumb)</span>
            <span style="font-size: 13px; font-weight: 600; color: #2f2f39; text-align: center">Disabled</span>
          </div>

          @for (row of variantMatrix; track row.groupTitle; let rIdx = $index; let last = $last) {
            <div
              style="display: grid; grid-template-columns: 180px repeat(4, 1fr); gap: 24px; align-items: center; padding-bottom: 36px"
              [style.border-bottom]="last ? 'none' : '1px dashed #e3e3e8'"
            >
              <div style="display: flex; flex-direction: column; gap: 4px">
                <span style="font-size: 14px; font-weight: 600; color: var(--color-neutral-000)">{{ row.rowNumber }}</span>
                <span style="font-size: 12px; color: var(--color-neutral-100)">{{ row.groupTitle }}</span>
              </div>

              @for (item of row.items; track item.badge) {
                <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 16px 8px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid #f0f0f4">
                  <div style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid #000000; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 400; color: #000000; font-family: var(--font-family-base)">
                    {{ item.badge }}
                  </div>

                  <kpmg-switch
                    [checked]="variantChecked[item.badge]"
                    (checkedChange)="variantChecked[item.badge] = $event"
                    [icon]="item.icon"
                    [state]="$any(item.state)"
                    [disabled]="item.state === 'Disabled'"
                    [ariaLabel]="'Switch variant ' + item.badge + ' (' + item.state + ')'"
                  />

                  <span style="font-size: 11px; color: #9090a2; text-align: center">
                    {{ item.label }} &bull; {{ variantChecked[item.badge] ? 'ON' : 'OFF' }}
                  </span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    `,
  }),
};

/* STORY 2: INTERACTIVE PLAYGROUND */
export const InteractivePlayground: Story = {
  args: {
    icon: true,
    disabled: false,
    label: 'Enable Automated AI Analysis',
    helperText: 'Run KPMG Trusted AI audits continuously in the background',
    labelPlacement: 'end',
  },
  render: (args) => {
    const { checked, ...rest } = args;
    return {
      props: { ...rest, checked: checked ?? true },
      template: `
        <div style="padding: 32px; display: flex; flex-direction: column; gap: 24px">
          <div>
            <h3 style="margin: 0 0 8px 0; font-family: var(--font-family-base)">
              Interactive Switch Playground
            </h3>
            <p style="margin: 0; font-size: 14px; color: var(--color-neutral-100)">
              Click the switch toggle to test real-time smooth animation, hover feedback, active thumb expansion, and icon transformations.
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 24px; padding: 24px; background-color: #fcfcfe; border-radius: 16px; border: 1px solid #ededf2; width: fit-content">
            <kpmg-switch ${argsToTemplate(rest)} [checked]="checked" (checkedChange)="checked = $event" />
            <span style="font-size: 13px; color: #9090a2">
              Current state: <strong [style.color]="checked ? '#1e49e2' : '#454554'">{{ checked ? 'ON (Selected)' : 'OFF (Unselected)' }}</strong>
            </span>
          </div>
        </div>
      `,
    };
  },
};

/* STORY 3: WITH LABELS & HELPER TEXT */
export const WithLabelsAndHelperText: Story = {
  render: () => ({
    props: { syncEnabled: true, mfaEnabled: true, archiveEnabled: false, disabledOption: false },
    template: `
      <div style="padding: 32px; display: flex; flex-direction: column; gap: 32px; max-width: 640px">
        <div>
          <h3 style="margin: 0 0 8px 0; font-family: var(--font-family-base)">
            Switches with Labels and Descriptions
          </h3>
          <p style="margin: 0; font-size: 14px; color: var(--color-neutral-100)">
            Settings and configuration forms using standard KPMG typography and layout conventions.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px">
          <div style="padding: 16px; border-radius: 12px; border: 1px solid #ededf2; background-color: #ffffff">
            <kpmg-switch
              [checked]="syncEnabled"
              (checkedChange)="syncEnabled = $event"
              [icon]="true"
              label="Real-time Workspace Synchronization"
              helperText="Sync audit documents with KPMG Central Ledger automatically"
            />
          </div>

          <div style="padding: 16px; border-radius: 12px; border: 1px solid #ededf2; background-color: #ffffff; display: flex; justify-content: space-between; align-items: center">
            <div style="display: flex; flex-direction: column; gap: 2px">
              <span style="font-size: 14px; font-weight: 600; color: var(--color-neutral-000)">
                Two-Factor Authentication (2FA)
              </span>
              <span style="font-size: 12px; color: var(--color-neutral-100)">
                Enforce biometric or SMS security verification upon sign-in
              </span>
            </div>
            <kpmg-switch
              [checked]="mfaEnabled"
              (checkedChange)="mfaEnabled = $event"
              [icon]="true"
              ariaLabel="Two-factor authentication"
            />
          </div>

          <div style="padding: 16px; border-radius: 12px; border: 1px solid #ededf2; background-color: #ffffff">
            <kpmg-switch
              [checked]="archiveEnabled"
              (checkedChange)="archiveEnabled = $event"
              [icon]="false"
              label="Automatic Engagement Archival"
              helperText="Archive completed review threads after 90 days of inactivity"
            />
          </div>

          <div style="padding: 16px; border-radius: 12px; border: 1px solid #ededf2; background-color: #f9f9fb">
            <kpmg-switch
              [checked]="disabledOption"
              (checkedChange)="disabledOption = $event"
              [disabled]="true"
              [icon]="true"
              label="Hardware Security Key Override (Managed Policy)"
              helperText="This setting is enforced by KPMG Enterprise Compliance and cannot be modified"
            />
          </div>
        </div>
      </div>
    `,
  }),
};

/* STORY 4: ICON VS PLAIN COMPARISON */
export const IconVsPlainComparison: Story = {
  render: () => ({
    props: {
      plainChecked: true,
      iconChecked: true,
      // The React story renders these literally, backslashes included.
      plainTitle: 'Plain Style (\\`icon=\\`)',
      iconTitle: 'With Icons (\\`icon=\\`)',
    },
    template: `
      <div style="padding: 32px; display: flex; flex-direction: column; gap: 28px">
        <div>
          <h3 style="margin: 0 0 8px 0; font-family: var(--font-family-base)">
            Icon vs. Plain Switch Comparison
          </h3>
          <p style="margin: 0; font-size: 14px; color: var(--color-neutral-100)">
            Toggle both controls to observe the visual difference between the minimalist plain switch and the icon-assisted switch.
          </p>
        </div>

        <div style="display: flex; gap: 48px; align-items: flex-start">
          <div style="display: flex; flex-direction: column; gap: 12px; padding: 24px; border-radius: 12px; border: 1px solid #ededf2; background-color: #ffffff; min-width: 240px">
            <span style="font-size: 13px; font-weight: 600; color: #9090a2; text-transform: uppercase">{{ plainTitle }}</span>
            <kpmg-switch
              [checked]="plainChecked"
              (checkedChange)="plainChecked = $event"
              [icon]="false"
              [label]="plainChecked ? 'Active' : 'Inactive'"
            />
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; padding: 24px; border-radius: 12px; border: 1px solid #ededf2; background-color: #ffffff; min-width: 240px">
            <span style="font-size: 13px; font-weight: 600; color: #9090a2; text-transform: uppercase">{{ iconTitle }}</span>
            <kpmg-switch
              [checked]="iconChecked"
              (checkedChange)="iconChecked = $event"
              [icon]="true"
              [label]="iconChecked ? 'Active (Checkmark)' : 'Inactive (Dismiss / X)'"
            />
          </div>
        </div>
      </div>
    `,
  }),
};
