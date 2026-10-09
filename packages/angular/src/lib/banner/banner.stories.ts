import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { BannerComponent } from './banner.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<BannerComponent> = {
  title: 'Components/Banner',
  component: BannerComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Banner Component

Banners display prominent messages at the top of the screen or workspace window, communicating status, background job progress, or alerts without interrupting ongoing user activity.

#### Key Architecture & 12 Variants:
- **2 Core States**:
  - \`default\`: Subtle solid surface container with clean typography and determinate progress bar
  - \`animated\`: Dynamic gradient background with subtle ambient shimmer effect and active progress flow
- **6 Semantic Themes**:
  - \`primary\`: Canonical brand theme with deep KPMG blue accents
  - \`neutral\`: Monochromatic theme for subtle workspace updates
  - \`info\`: Blue theme for system advisories
  - \`success\`: Emerald theme for positive status & task completions
  - \`warning\`: Warm amber theme for warnings and cautionary notices
  - \`critical\`: Crimson theme for critical alerts and error notifications

Total combinations: **6 Semantic Themes × 2 States = 12 Production Variants**
        `,
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'animated'],
      description: 'Visual container state',
      table: {
        type: {
          summary: "'default' | 'animated'",
        },
        defaultValue: {
          summary: "'default'",
        },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'neutral', 'info', 'success', 'warning', 'critical'],
      description: 'Semantic theme variant',
      table: {
        type: {
          summary: "'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'critical'",
        },
        defaultValue: {
          summary: "'primary'",
        },
      },
    },
    title: {
      control: 'text',
      description: 'Primary status text',
      table: {
        type: {
          summary: 'node',
        },
        defaultValue: {
          summary: "'Configuring'",
        },
      },
    },
    detail: {
      control: 'text',
      description: 'Secondary detail or percentage text',
      table: {
        type: {
          summary: 'node',
        },
      },
    },
    progress: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
      description: 'Linear progress bar percentage (0-100)',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    showProgress: {
      control: 'boolean',
      description: 'Toggle linear progress bar visibility',
      table: {
        type: {
          summary: 'bool',
        },
      },
    },
    progressType: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Progress bar mode',
      table: {
        type: {
          summary: "'determinate' | 'indeterminate'",
        },
      },
    },
    icon: {
      control: false,
      description: 'Leading icon component',
      table: {
        type: {
          summary: 'node',
        },
        defaultValue: {
          summary: '<BannerRobotSvg />',
        },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether to show close button',
      table: {
        type: {
          summary: 'bool',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
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
  render: (args) => ({ props: args, template: `<kpmg-banner ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<BannerComponent>;

export const Default: Story = {
  parameters: { docs: { description: { story: 'Interactive Default Story' } } },
};
export const AnimatedState: Story = {
  parameters: { docs: { description: { story: 'Animated Gradient State' } } }, args: { state: 'animated' } };

const variants = [
  { key: 'primary', label: 'Primary (Canonical)', title: 'Configuring system models', detail: '30%', progress: 30 },
  { key: 'neutral', label: 'Neutral', title: 'Indexing document workspace', detail: '45%', progress: 45 },
  { key: 'info', label: 'Info', title: 'Synchronizing KPMG Workbench data', detail: '60%', progress: 60 },
  { key: 'success', label: 'Success', title: 'Transformation completed successfully', detail: '100%', progress: 100 },
  { key: 'warning', label: 'Warning', title: 'Resource allocation near threshold', detail: '85%', progress: 85 },
  { key: 'critical', label: 'Critical', title: 'Pipeline validation error detected', detail: 'Error', progress: 100 },
];

export const Complete12VariantsMatrix: Story = {
  parameters: { docs: { description: { story: 'Complete 12 Variants Matrix' } } },
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
  parameters: { docs: { description: { story: 'Live Progress Simulation' } } },
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
  parameters: { docs: { description: { story: 'Streaming / Indeterminate Progress' } } },
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
  parameters: { docs: { description: { story: 'Dismissible with Actions' } } },
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
