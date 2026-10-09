import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const ALL_TYPES = [
  { id: 'checked', name: 'Checked' },
  { id: 'unchecked-light', name: 'Unchecked Light' },
  { id: 'indeterminate', name: 'Indeterminate' },
  { id: 'unchecked', name: 'Unchecked' },
  { id: 'error-checked', name: 'Error Checked' },
  { id: 'error-checked-light', name: 'Error Checked Light' },
  { id: 'error-indeterminate', name: 'Error Indeterminate' },
  { id: 'error-unchecked', name: 'Error Unchecked' },
];

const ALL_STATES = ['enabled', 'disabled', 'hovered', 'pressed'];
const ALL_SIZES = ['large', 'small'];

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [moduleMetadata({ imports: [CheckboxComponent] })],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox complete matrix of 64 variants (8 Types × 4 States × 2 Sizes) with token-driven styles, SVG export props, and interactive accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: 'Size scale (Large:  touch container / Small: touch container)',
    },
    type: {
      control: 'select',
      options: ALL_TYPES.map((t) => t.id),
      description: 'Figma type variant (8 choices)',
    },
    state: {
      control: 'select',
      options: ALL_STATES,
      description: 'Interactive state overlay',
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    subtext: { control: 'text' },
  },
  render: (args) => ({ props: args, template: `<kpmg-checkbox ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// Default Basic Story
export const Default: Story = {
  args: {
    label: 'Option label',
    subtext: 'Description or helper text',
    size: 'large',
    type: 'checked',
    state: 'enabled',
  },
};

const btn = 'padding: 6px 12px; border-radius: 4px; cursor: pointer; border: 1px solid #CCC';

// Interactive Controlled State Demo Story
export const InteractiveControlled: Story = {
  render: () => ({
    props: { checked: true, indeterminate: false, error: false },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px">
        <h4 style="font-family: 'Open Sans'; margin: 0">Interactive Checkbox Demo</h4>

        <kpmg-checkbox
          size="large"
          [checked]="checked"
          (checkedChange)="checked = $event"
          [indeterminate]="indeterminate"
          [error]="error"
          label="Enable Feature Notification"
          subtext="Receive instant emails whenever updates are ready"
        />

        <div style="display: flex; gap: 12px; margin-top: 8px">
          <button type="button" (click)="checked = !checked" style="${btn}">
            Toggle Checked ({{ checked ? 'ON' : 'OFF' }})
          </button>
          <button type="button" (click)="indeterminate = !indeterminate" style="${btn}">
            Toggle Indeterminate
          </button>
          <button type="button" (click)="error = !error" style="${btn}">
            Toggle Error
          </button>
        </div>
      </div>
    `,
  }),
};

// Custom SVG Icons Override Props Story
export const CustomSvgPropsOverrides: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center">
        <kpmg-checkbox size="large" label="Custom Blue Checkbox" [icon]="blue" />
        <kpmg-checkbox size="large" label="Custom Green Checkbox" [icon]="green" />
        <kpmg-checkbox size="large" label="Custom Gold Star Placeholder" [icon]="star" />
      </div>
      <ng-template #blue>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#1E49E2" />
          <polyline points="8 12 11 15 16 9" fill="none" stroke="var(--color-checkbox-primary-tick, #FFFFFF)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </ng-template>
      <ng-template #green>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#029A6C" />
          <polyline points="8 12 11 15 16 9" fill="none" stroke="var(--color-checkbox-primary-tick, #FFFFFF)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </ng-template>
      <ng-template #star>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#F4D533">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </ng-template>
    `,
  }),
};

// Complete 64 Variants Matrix Story (Figma Node 1384:63275 Specs)
export const All64VariantsMatrix: Story = {
  render: () => ({
    props: { sizes: ALL_SIZES, states: ALL_STATES, types: ALL_TYPES },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; padding: 12px">
        <header>
          <h3 style="font-family: 'Open Sans'; margin-bottom: 8px">
            Checkbox Figma Specs: Complete 64 Variants Matrix
          </h3>
          <p style="font-family: 'Open Sans'; color: #5D5D6A; font-size: 14px">
            8 Types × 4 States × 2 Sizes (Large 40px & Small 24px)
          </p>
        </header>

        @for (sizeScale of sizes; track sizeScale) {
          <div style="background-color: #FAFAFD; padding: 24px; border-radius: 12px; border: 1px solid #E3E3E8">
            <h4 style="font-family: 'Open Sans'; margin-bottom: 20px; text-transform: capitalize">
              Size: {{ sizeScale }}
            </h4>

            <div style="overflow-x: auto">
              <table style="border-collapse: collapse; width: 100%; text-align: left; font-family: 'Open Sans'; font-size: 13px">
                <thead>
                  <tr style="border-bottom: 2px solid #D5D5DC">
                    <th style="padding: 12px">Variant Type</th>
                    @for (s of states; track s) {
                      <th style="padding: 12px; text-transform: capitalize">{{ s }}</th>
                    }
                  </tr>
                </thead>
                <tbody>
                  @for (typeObj of types; track typeObj.id) {
                    <tr style="border-bottom: 1px solid #E3E3E8">
                      <td style="padding: 12px; font-weight: 600">{{ typeObj.name }}</td>
                      @for (st of states; track st) {
                        <td style="padding: 12px">
                          <kpmg-checkbox [size]="$any(sizeScale)" [type]="$any(typeObj.id)" [state]="$any(st)" />
                        </td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    `,
  }),
};
