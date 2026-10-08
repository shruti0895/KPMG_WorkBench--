import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ProgressIndicatorComponent } from './progress-indicator.component';

const meta: Meta<ProgressIndicatorComponent> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicatorComponent,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [moduleMetadata({ imports: [ProgressIndicatorComponent] })],
  argTypes: {
    variant: { control: 'select', options: ['linear', 'circular'] },
    type: { control: 'select', options: ['determinate', 'indeterminate'] },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'select', options: ['large', 'medium', 'small'] },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
    subtext: { control: 'text' },
  },
  render: (args) => ({ props: args, template: `<kpmg-progress-indicator ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<ProgressIndicatorComponent>;

export const BasicLinear: Story = {
  args: {
    variant: 'linear',
    type: 'determinate',
    progress: 50,
    showValue: true,
    label: 'Uploading File',
    subtext: '5.2 MB of 10.4 MB uploaded',
  },
};

export const LinearIndeterminate: Story = {
  args: {
    variant: 'linear',
    type: 'indeterminate',
    label: 'Processing Data...',
    subtext: 'Please wait while calculations complete',
  },
};

export const CircularLarge: Story = {
  args: { variant: 'circular', size: 'large', type: 'determinate', progress: 80, showValue: true, label: 'Task Progress', subtext: 'Almost finished' },
};

export const CircularIndeterminateSpinner: Story = {
  args: { variant: 'circular', size: 'medium', type: 'indeterminate', label: 'Syncing with Server...' },
};

export const InteractiveControlled: Story = {
  render: () => ({
    props: {
      progress: 30,
      auto: false,
      timer: undefined as ReturnType<typeof setInterval> | undefined,
      toggle() {
        this['auto'] = !this['auto'];
        clearInterval(this['timer']);
        if (this['auto']) {
          this['timer'] = setInterval(() => (this['progress'] = this['progress'] >= 100 ? 0 : this['progress'] + 5), 300);
        }
      },
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;width:450px">
        <h4 style="font-family:'Open Sans';margin:0">Interactive Progress Demo</h4>
        <kpmg-progress-indicator variant="linear" [progress]="progress" [showValue]="true" label="File Export Progress"
          [subtext]="'Status: ' + (progress === 100 ? 'Completed' : 'Processing...')" />
        <div style="display:flex;gap:16px;align-items:center">
          <kpmg-progress-indicator variant="circular" size="large" [progress]="progress" [showValue]="true" />
          <kpmg-progress-indicator variant="circular" size="medium" [progress]="progress" [showValue]="true" />
          <kpmg-progress-indicator variant="circular" size="small" [progress]="progress" />
        </div>
        <div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap">
          <button type="button" style="padding:6px 12px;border-radius:4px;cursor:pointer;border:1px solid #CCC" (click)="toggle()">{{ auto ? 'Pause Auto Progress' : 'Start Auto Progress' }}</button>
          <button type="button" style="padding:6px 12px;border-radius:4px;cursor:pointer;border:1px solid #CCC" (click)="progress = 0">Reset 0%</button>
          <button type="button" style="padding:6px 12px;border-radius:4px;cursor:pointer;border:1px solid #CCC" (click)="progress = 50">Set 50%</button>
          <button type="button" style="padding:6px 12px;border-radius:4px;cursor:pointer;border:1px solid #CCC" (click)="progress = 100">Set 100%</button>
        </div>
      </div>`,
  }),
};

const linearVariants = [
  ...[0, 10, 30, 50, 80, 100].map((p) => ({ name: `Progress=${p}, Type=Determinate`, type: 'determinate', progress: p, step: undefined as number | undefined })),
  ...[1, 2, 3, 4].map((s) => ({ name: `Progress=N/A, Type=Indeterminate, Step=${s}`, type: 'indeterminate', progress: 0, step: s })),
];
const circularSizes = [
  { id: 'large', name: 'Large (88px)' },
  { id: 'medium', name: 'Medium (48px)' },
  { id: 'small', name: 'Small (24px)' },
];

export const All33FigmaVariantsMatrix: Story = {
  render: () => ({
    props: { linearVariants, circularSizes, percents: [0, 10, 30, 50, 80, 100] },
    template: `
      <div style="display:flex;flex-direction:column;gap:48px;padding:16px;max-width:750px;width:100%">
        <header><h3 style="font-family:'Open Sans';margin-bottom:8px">Progress Indicators Figma Specs: Complete 33 Variants Matrix</h3></header>
        <div style="background:#FAFAFD;padding:24px;border-radius:12px;border:1px solid #E3E3E8">
          <h4 style="font-family:'Open Sans';margin-bottom:20px">1. Linear Progress Bar (10 Variants)</h4>
          <div style="display:flex;flex-direction:column;gap:16px">
            @for (item of linearVariants; track item.name) {
              <div style="border-bottom:1px solid #E3E3E8;padding-bottom:12px">
                <span style="font-size:12px;font-weight:600;color:#3D405B;display:block;margin-bottom:6px">{{ item.name }}</span>
                <kpmg-progress-indicator variant="linear" [type]="$any(item.type)" [progress]="item.progress" [step]="item.step" [showValue]="item.type === 'determinate'" />
              </div>
            }
          </div>
        </div>
        <div style="background:#FAFAFD;padding:24px;border-radius:12px;border:1px solid #E3E3E8">
          <h4 style="font-family:'Open Sans';margin-bottom:20px">2. Circular Progress Bar (23 Variants)</h4>
          @for (s of circularSizes; track s.id) {
            <div style="margin-bottom:28px">
              <h5 style="font-family:'Open Sans';margin-bottom:14px;color:#1A28C1">Size: {{ s.name }}</h5>
              <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;margin-bottom:16px">
                @for (pct of percents; track pct) {
                  <div style="text-align:center">
                    <span style="font-size:11px;color:#5D5D6A;display:block;margin-bottom:4px">{{ pct }}%</span>
                    <kpmg-progress-indicator variant="circular" [size]="$any(s.id)" type="determinate" [progress]="pct" [showValue]="s.id !== 'small'" />
                  </div>
                }
              </div>
              <div style="display:flex;gap:12px;align-items:center">
                <span style="font-size:11px;font-weight:600;color:#3D405B">Indeterminate Spinner:</span>
                <kpmg-progress-indicator variant="circular" [size]="$any(s.id)" type="indeterminate" />
              </div>
            </div>
          }
        </div>
      </div>`,
  }),
};
