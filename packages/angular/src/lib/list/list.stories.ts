import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item.component';

const meta: Meta<ListComponent> = {
  title: 'Components/List',
  component: ListComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ListComponent, ListItemComponent] })],
  args: { styleType: 'outlined', size: 'medium', divided: false },
  argTypes: {
    styleType: { control: 'select', options: ['outlined', 'elevated', 'filled'] },
    styleVariant: { control: 'select', options: [undefined, 'outlined', 'elevated', 'filled'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    divided: { control: 'boolean' },
    items: { control: false },
  },
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

export const Default: Story = {};
export const Divided: Story = { args: { divided: true } };

export const DataDriven: Story = {
  render: () => ({
    props: {
      items: [
        { id: 1, title: 'Account Security', supportingText: 'Two-factor authentication enabled.', leading: 'avatar', leadingProps: { initials: 'AS' }, trailing: 'arrow' },
        { id: 2, title: 'Billing Preferences', supportingText: 'Monthly invoice delivered via email.', leading: 'avatar', leadingProps: { initials: 'BP' }, trailing: 'arrow', selected: true },
        { id: 3, title: 'Disabled item', supportingText: 'Not available.', leading: 'avatar', disabled: true },
      ],
    },
    template: `<div style="max-width: 400px"><kpmg-list [items]="items" divided /></div>`,
  }),
};

export const Complete12VariantsMatrix: Story = {
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
          <h3 style="margin: 0 0 16px">1. Avatar Leading (Trailing Checkbox)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px">
            @for (s of styles; track s.key) {
              <div>
                <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px">{{ s.label }}</div>
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
          <h3 style="margin: 0 0 16px">2. Image / Thumbnail Leading</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px">
            @for (s of styles; track s.key) {
              <div>
                <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px">{{ s.label }}</div>
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
          <h3 style="margin: 0 0 16px">3. Checkbox Leading (Trailing Chevron Arrow)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px">
            @for (s of styles; track s.key) {
              <div>
                <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px">{{ s.label }}</div>
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
          <h3 style="margin: 0 0 16px">4. Radio Button Leading (Trailing Chevron Arrow)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px">
            @for (s of styles; track s.key) {
              <div>
                <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px">{{ s.label }}</div>
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
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; max-width: 1100px">
        <div>
          <h4 style="margin: 0 0 12px">Small (1-Line)</h4>
          <kpmg-list styleType="outlined" size="small">
            <kpmg-list-item itemTitle="First item headline" leading="avatar" [leadingProps]="{ initials: 'JD' }" trailing="arrow" />
            <kpmg-list-item itemTitle="Second item headline" leading="avatar" [leadingProps]="{ initials: 'MK' }" trailing="arrow" />
            <kpmg-list-item itemTitle="Third item headline" leading="avatar" [leadingProps]="{ initials: 'SL' }" trailing="arrow" />
          </kpmg-list>
        </div>
        <div>
          <h4 style="margin: 0 0 12px">Medium (2-Line)</h4>
          <kpmg-list styleType="outlined" size="medium">
            <kpmg-list-item itemTitle="Account Security" supportingText="Two-factor authentication enabled." leading="avatar" [leadingProps]="{ initials: 'AS' }" trailing="checkbox" />
            <kpmg-list-item itemTitle="Billing Preferences" supportingText="Monthly invoice delivered via email." leading="avatar" [leadingProps]="{ initials: 'BP' }" trailing="checkbox" />
            <kpmg-list-item itemTitle="Notification Settings" supportingText="Email, push, and desktop alerts." leading="avatar" [leadingProps]="{ initials: 'NS' }" trailing="checkbox" />
          </kpmg-list>
        </div>
        <div>
          <h4 style="margin: 0 0 12px">Large (3-Line)</h4>
          <kpmg-list styleType="outlined" size="large">
            <kpmg-list-item itemTitle="Audit Workpaper FY2026" supportingText="Supporting line text lorem ipsum dolor sit amet, consectetur adipiscing elit." secondaryText="Updated 2 hours ago by System Admin" leading="image" trailing="arrow" />
            <kpmg-list-item itemTitle="Risk Assessment Summary" supportingText="Supporting line text lorem ipsum dolor sit amet, consectetur adipiscing elit." secondaryText="Pending partner review" leading="image" trailing="arrow" />
          </kpmg-list>
        </div>
      </div>
    `,
  }),
};

export const InteractiveSelection: Story = {
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
          <h4 style="margin: 0 0 12px">Single Choice (Radio Control)</h4>
          <kpmg-list styleType="outlined" size="medium">
            @for (o of radioOptions; track o.id) {
              <kpmg-list-item [itemTitle]="o.title" [supportingText]="o.desc" leading="radio" [leadingProps]="{ checked: selectedRadio === o.id }" trailing="arrow" [selected]="selectedRadio === o.id" interactive (itemClick)="selectedRadio = o.id" />
            }
          </kpmg-list>
        </div>
        <div>
          <h4 style="margin: 0 0 12px">Multi-Choice (Checkbox Control)</h4>
          <kpmg-list styleType="outlined" size="medium">
            @for (o of checkOptions; track o.id) {
              <kpmg-list-item [itemTitle]="o.title" [supportingText]="o.desc" leading="checkbox" [leadingProps]="{ checked: selectedChecks.includes(o.id) }" trailing="arrow" [selected]="selectedChecks.includes(o.id)" interactive (itemClick)="toggleCheck(o.id)" />
            }
          </kpmg-list>
        </div>
      </div>
    `,
  }),
};
