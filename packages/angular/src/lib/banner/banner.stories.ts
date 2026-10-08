import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { BannerComponent } from './banner.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<BannerComponent> = {
  title: 'Components/Banner',
  component: BannerComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [moduleMetadata({ imports: [BannerComponent, ButtonComponent] })],
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
  { key: 'primary', label: 'Primary (Canonical)', title: 'Configuring system models', detail: '30%', progress: 30 },
  { key: 'neutral', label: 'Neutral', title: 'Indexing document workspace', detail: '45%', progress: 45 },
  { key: 'info', label: 'Info', title: 'Synchronizing KPMG Workbench data', detail: '60%', progress: 60 },
  { key: 'success', label: 'Success', title: 'Transformation completed successfully', detail: '100%', progress: 100 },
  { key: 'warning', label: 'Warning', title: 'Resource allocation near threshold', detail: '85%', progress: 85 },
  { key: 'critical', label: 'Critical', title: 'Pipeline validation error detected', detail: 'Error', progress: 100 },
];

export const Complete12VariantsMatrix: Story = {
  render: () => ({
    props: { variants },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;max-width:1000px">
        @for (s of [{k:'default',h:'State: Default (Static Surface) — 6 Semantic Variants',n:'Default'}, {k:'animated',h:'State: Animated (Dynamic Ambient Gradient) — 6 Semantic Variants',n:'Animated'}]; track s.k) {
          <div>
            <h3 style="margin:0 0 16px 0;font-size:18px;font-weight:600">{{ s.h }}</h3>
            <div style="display:flex;flex-direction:column;gap:12px">
              @for (v of variants; track v.key) {
                <div>
                  <div style="font-size:12px;color:var(--color-on-surface-light, #9090a2);margin-bottom:4px">Variant: <strong>{{ v.label }}</strong> ({{ s.n }} State)</div>
                  <kpmg-banner [state]="s.k" [variant]="v.key" [title]="v.title" [detail]="v.detail" [progress]="v.progress" />
                </div>
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
          <kpmg-button bannerAction [size]="$any('small')" variant="text" (click)="running = !running">{{ running ? 'Pause' : 'Resume' }}</kpmg-button>
        </kpmg-banner>
        <div style="display:flex;gap:10px;align-items:center">
          <kpmg-button [size]="$any('small')" (click)="running = !running">{{ running ? 'Pause Simulation' : 'Resume Simulation' }}</kpmg-button>
          <kpmg-button [size]="$any('small')" variant="outline" (click)="progress = 0">Reset</kpmg-button>
          <span style="font-size:14px;color:var(--color-on-surface-light, #9090a2)">Current progress: {{ progress }}%</span>
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
            <kpmg-button bannerAction [size]="$any('small')" variant="text">View Details</kpmg-button>
          </kpmg-banner>
        </div>
      } @else {
        <div style="padding:20px"><kpmg-button [size]="$any('small')" (click)="visible = true">Re-open Banner</kpmg-button></div>
      }`,
  }),
};
