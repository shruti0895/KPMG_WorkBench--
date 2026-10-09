import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item.component';

const meta: Meta<ListComponent> = {
  title: 'Components/List',
  component: ListComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - List Component

Lists organize related items in a vertical format. They provide a consistent layout for text, images, controls, and actions.

#### Key Architecture & 12 Variants Matrix:
- **3 Container Styles**:
  - \`outlined\`: Clean container with subtle 1px border (\`--color-list-border-outlined\`)
  - \`elevated\`: Container with soft elevation drop shadow (\`--color-list-elevated-shadow\`)
  - \`filled\`: Subtle tinted container fill (\`--color-list-bg-filled\`)
- **4 Canonical Leading Element Types**:
  - \`Avatar\`: Circular 40px gradient avatar with user initials
  - \`Image\`: Rounded 48px square image / document thumbnail
  - \`Checkbox\`: Selection control with checkmark state
  - \`Radio\`: Single-choice radio indicator
- **Combinations**:
  **4 Leading Types × 3 Container Styles = 12 Production Variants**

#### 3 Density Sizes:
- **Small** (1-line item): Title only
- **Medium** (2-line item): Title + Supporting description
- **Large** (3-line item): Title + Extended description + Secondary metadata
        `,
      },
    },
  },
  subcomponents: {ListItem: ListItemComponent},
  argTypes: {
    styleType: {
      control: 'select',
      options: ['outlined', 'elevated', 'filled'],
      description: 'Visual container treatment',
      table: {
        type: {
          summary: "'outlined' | 'elevated' | 'filled'",
        },
        defaultValue: {
          summary: "'outlined'",
        },
      },
    },
    styleVariant: {
      control: 'radio',
      options: ['outlined', 'elevated', 'filled'],
      description: 'Alias for styleType',
      table: {
        type: {
          summary: "'outlined' | 'elevated' | 'filled'",
        },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Density size of list items',
      table: {
        type: {
          summary: "'small' | 'medium' | 'large'",
        },
        defaultValue: {
          summary: "'medium'",
        },
      },
    },
    divided: {
      control: 'boolean',
      description: 'Whether to show dividers between items',
      table: {
        type: {
          summary: 'bool',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    items: {
      control: false,
      description: 'Data-driven array of list item objects',
      table: {
        type: {
          summary: 'object[]',
        },
      },
    },
  },
  decorators: [moduleMetadata({ imports: [ListComponent, ListItemComponent] })],
  args: { styleType: 'outlined', size: 'medium', divided: false },
  render: (args) => ({
    props: { ...args, rows: [1, 2, 3, 4, 5] },
    template: `
      <div style="max-width: 400px">
        <kpmg-list ${argsToTemplate(args)}>
          @for (r of rows; track r) {
            <kpmg-list-item
              itemTitle="List item"
              supportingText="Supporting line text lorem ipsum dolor sit amet."
              leading="avatar"
              [leadingProps]="{ initials: 'AZ' }"
              trailing="checkbox"
              [trailingProps]="{ checked: true }"
              interactive
            />
          }
        </kpmg-list>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ListComponent>;

export const Default: Story = {
  parameters: { docs: { description: { story: 'Interactive Default Story' } } },
};




export const Complete12VariantsMatrix: Story = {
  parameters: { docs: { description: { story: 'Complete 12 Variants Matrix (4 Leading Types × 3 Container Styles)' } } },
  render: () => ({
    props: {
      styles: [
        { key: 'outlined', label: 'Outlined Style (Bordered)' },
        { key: 'elevated', label: 'Elevated Style (Shadowed)' },
        { key: 'filled', label: 'Filled Style (Tinted Surface)' },
      ],
      rows: [1, 2, 3, 4],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; max-width: 1200px">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600">1. Avatar Leading (Trailing Checkbox)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px">
            @for (s of styles; track s.key) {
              <div>
                <div style="font-size: 12px; font-weight: 600; color: var(--color-primary-on-surface, #1a28c1); margin-bottom: 8px">{{ s.label }}</div>
                <kpmg-list [styleType]="$any(s.key)" size="medium">
                  @for (r of rows; track r) {
                    <kpmg-list-item itemTitle="List item" supportingText="Supporting line text lorem ipsum..." leading="avatar" [leadingProps]="{ initials: 'AZ' }" trailing="checkbox" [trailingProps]="{ checked: true }" />
                  }
                </kpmg-list>
              </div>
            }
          </div>
        </div>
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600">2. Image / Thumbnail Leading</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px">
            @for (s of styles; track s.key) {
              <div>
                <div style="font-size: 12px; font-weight: 600; color: var(--color-primary-on-surface, #1a28c1); margin-bottom: 8px">{{ s.label }}</div>
                <kpmg-list [styleType]="$any(s.key)" size="medium">
                  @for (r of rows; track r) {
                    <kpmg-list-item itemTitle="List item" supportingText="Supporting line text lorem ipsum..." leading="image" trailing="none" />
                  }
                </kpmg-list>
              </div>
            }
          </div>
        </div>
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600">3. Checkbox Leading (Trailing Chevron Arrow)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px">
            @for (s of styles; track s.key) {
              <div>
                <div style="font-size: 12px; font-weight: 600; color: var(--color-primary-on-surface, #1a28c1); margin-bottom: 8px">{{ s.label }}</div>
                <kpmg-list [styleType]="$any(s.key)" size="medium">
                  @for (r of rows; track r) {
                    <kpmg-list-item itemTitle="List item" supportingText="Supporting line text lorem ipsum..." leading="checkbox" [leadingProps]="{ checked: true }" trailing="arrow" />
                  }
                </kpmg-list>
              </div>
            }
          </div>
        </div>
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600">4. Radio Button Leading (Trailing Chevron Arrow)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px">
            @for (s of styles; track s.key) {
              <div>
                <div style="font-size: 12px; font-weight: 600; color: var(--color-primary-on-surface, #1a28c1); margin-bottom: 8px">{{ s.label }}</div>
                <kpmg-list [styleType]="$any(s.key)" size="medium">
                  @for (r of rows; track r) {
                    <kpmg-list-item itemTitle="List item" supportingText="Supporting line text lorem ipsum..." leading="radio" [leadingProps]="{ checked: true }" trailing="arrow" />
                  }
                </kpmg-list>
              </div>
            }
          </div>
        </div>
      </div>
    `,
  }),
};

export const DensitySizes: Story = {
  parameters: { docs: { description: { story: '3 Density Sizes (Small, Medium, Large)' } } },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; max-width: 1100px">
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 15px">Small (1-Line)</h4>
          <kpmg-list styleType="outlined" size="small">
            <kpmg-list-item size="medium" itemTitle="First item headline" leading="avatar" [leadingProps]="{ initials: 'JD' }" trailing="arrow" />
            <kpmg-list-item size="medium" itemTitle="Second item headline" leading="avatar" [leadingProps]="{ initials: 'MK' }" trailing="arrow" />
            <kpmg-list-item size="medium" itemTitle="Third item headline" leading="avatar" [leadingProps]="{ initials: 'SL' }" trailing="arrow" />
          </kpmg-list>
        </div>
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 15px">Medium (2-Line)</h4>
          <kpmg-list styleType="outlined" size="medium">
            <kpmg-list-item size="medium" itemTitle="Account Security" supportingText="Two-factor authentication enabled." leading="avatar" [leadingProps]="{ initials: 'AS' }" trailing="checkbox" />
            <kpmg-list-item size="medium" itemTitle="Billing Preferences" supportingText="Monthly invoice delivered via email." leading="avatar" [leadingProps]="{ initials: 'BP' }" trailing="checkbox" />
            <kpmg-list-item size="medium" itemTitle="Notification Settings" supportingText="Email, push, and desktop alerts." leading="avatar" [leadingProps]="{ initials: 'NS' }" trailing="checkbox" />
          </kpmg-list>
        </div>
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 15px">Large (3-Line)</h4>
          <kpmg-list styleType="outlined" size="large">
            <kpmg-list-item size="medium" itemTitle="Audit Workpaper FY2026" supportingText="Supporting line text lorem ipsum dolor sit amet, consectetur adipiscing elit." secondaryText="Updated 2 hours ago by System Admin" leading="image" trailing="arrow" />
            <kpmg-list-item size="medium" itemTitle="Risk Assessment Summary" supportingText="Supporting line text lorem ipsum dolor sit amet, consectetur adipiscing elit." secondaryText="Pending partner review" leading="image" trailing="arrow" />
          </kpmg-list>
        </div>
      </div>
    `,
  }),
};

export const InteractiveSelection: Story = {
  parameters: { docs: { description: { story: 'Interactive Single & Multi-Selection' } } },
  render: () => ({
    props: {
      radioOptions: [
        { id: 'opt-1', title: 'Option 1', desc: 'Standard configuration preset' },
        { id: 'opt-2', title: 'Option 2', desc: 'High-performance computing cluster' },
        { id: 'opt-3', title: 'Option 3', desc: 'Custom enterprise deployment' },
      ],
      checkOptions: [
        { id: 'chk-1', title: 'Analytics Module', desc: 'Include telemetry and insights' },
        { id: 'chk-2', title: 'Export Capabilities', desc: 'Enable PDF and Excel downloads' },
        { id: 'chk-3', title: 'Audit Trail', desc: 'Record historical event log' },
      ],
      selectedRadio: 'opt-1',
      selectedChecks: ['chk-1', 'chk-3'] as string[],
      toggleCheck(id: string) {
        this['selectedChecks'] = this['selectedChecks'].includes(id)
          ? this['selectedChecks'].filter((i: string) => i !== id)
          : [...this['selectedChecks'], id];
      },
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; max-width: 800px">
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 15px">Single Choice (Radio Control)</h4>
          <kpmg-list styleType="outlined" size="medium">
            @for (o of radioOptions; track o.id) {
              <kpmg-list-item size="medium" [itemTitle]="o.title" [supportingText]="o.desc" leading="radio" [leadingProps]="{ checked: selectedRadio === o.id }" trailing="arrow" [selected]="selectedRadio === o.id" interactive (itemClick)="selectedRadio = o.id" />
            }
          </kpmg-list>
        </div>
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 15px">Multi-Choice (Checkbox Control)</h4>
          <kpmg-list styleType="outlined" size="medium">
            @for (o of checkOptions; track o.id) {
              <kpmg-list-item size="medium" [itemTitle]="o.title" [supportingText]="o.desc" leading="checkbox" [leadingProps]="{ checked: selectedChecks.includes(o.id) }" trailing="arrow" [selected]="selectedChecks.includes(o.id)" interactive (itemClick)="toggleCheck(o.id)" />
            }
          </kpmg-list>
        </div>
      </div>
    `,
  }),
};
