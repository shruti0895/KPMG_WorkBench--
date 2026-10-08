import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { BannerComponent } from './banner.component';

const meta: Meta<BannerComponent> = {
  title: 'Components/Banner',
  component: BannerComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [BannerComponent] })],
  args: {
    state: 'default',
    variant: 'primary',
    title: 'Configuring',
    detail: '30%',
    progress: 30,
    showProgress: true,
    progressType: 'determinate',
    dismissible: false,
  },
  argTypes: {
    state: { control: 'select', options: ['default', 'animated'] },
    variant: { control: 'select', options: ['primary', 'neutral', 'info', 'success', 'warning', 'critical'] },
    title: { control: 'text' },
    detail: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    showProgress: { control: 'boolean' },
    progressType: { control: 'select', options: ['determinate', 'indeterminate'] },
    dismissible: { control: 'boolean' },
    icon: { control: false },
  },
  render: (args) => ({ props: args, template: `<kpmg-banner ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<BannerComponent>;

export const Default: Story = {};
export const AnimatedState: Story = { args: { state: 'animated' } };

const variants = [
  { key: 'primary', title: 'Configuring system models', detail: '30%', progress: 30 },
  { key: 'neutral', title: 'Indexing document workspace', detail: '45%', progress: 45 },
  { key: 'info', title: 'Synchronizing KPMG Workbench data', detail: '60%', progress: 60 },
  { key: 'success', title: 'Transformation completed successfully', detail: '100%', progress: 100 },
  { key: 'warning', title: 'Resource allocation near threshold', detail: '85%', progress: 85 },
  { key: 'critical', title: 'Pipeline validation error detected', detail: 'Error', progress: 100 },
];

export const Complete12VariantsMatrix: Story = {
  render: () => ({
    props: { variants },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;max-width:1000px">
        @for (s of ['default', 'animated']; track s) {
          <div>
            <h3 style="margin:0 0 16px;font-size:18px;font-weight:600">State: {{ s }} — 6 Semantic Variants</h3>
            <div style="display:flex;flex-direction:column;gap:12px">
              @for (v of variants; track v.key) {
                <kpmg-banner [state]="s" [variant]="v.key" [title]="v.title" [detail]="v.detail" [progress]="v.progress" />
              }
            </div>
          </div>
        }
      </div>`,
  }),
};

export const LiveProgressSimulation: Story = {
  render: () => ({
    props: {
      progress: 15,
      running: true,
      timer: null as unknown,
      init() {
        if (this['timer']) return;
        this['timer'] = setInterval(() => {
          if (this['running']) this['progress'] = this['progress'] >= 100 ? 0 : this['progress'] + 5;
        }, 400);
      },
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;max-width:1000px" #host>
        {{ init() }}
        <kpmg-banner [state]="running ? 'animated' : 'default'" variant="primary"
          [title]="progress === 100 ? 'Configuring complete' : 'Configuring'"
          [detail]="progress + '%'" [progress]="progress" [hasAction]="true">
          <button bannerAction type="button" (click)="running = !running">{{ running ? 'Pause' : 'Resume' }}</button>
        </kpmg-banner>
        <div style="display:flex;gap:10px;align-items:center">
          <button type="button" (click)="running = !running">{{ running ? 'Pause Simulation' : 'Resume Simulation' }}</button>
          <button type="button" (click)="progress = 0">Reset</button>
          <span style="font-size:14px">Current progress: {{ progress }}%</span>
        </div>
      </div>`,
  }),
};

export const IndeterminateProgress: Story = {
  args: {
    state: 'animated',
    title: 'Obtaining approval for external share',
    detail: 'Streaming...',
    progress: undefined,
    progressType: 'indeterminate',
    dismissible: true,
  },
};

export const DismissibleWithActions: Story = {
  render: () => ({
    props: { visible: true },
    template: `
      @if (visible) {
        <div style="max-width:1000px">
          <kpmg-banner state="default" variant="info" title="Workspace synchronization requested"
            detail="5.2 MB / 8.0 MB" [progress]="65" [dismissible]="true" [hasAction]="true" (bannerClose)="visible = false">
            <button bannerAction type="button">View Details</button>
          </kpmg-banner>
        </div>
      } @else {
        <button type="button" (click)="visible = true">Re-open Banner</button>
      }`,
  }),
};
