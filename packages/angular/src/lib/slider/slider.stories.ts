import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { SliderComponent } from './slider.component';

const meta: Meta<SliderComponent> = {
  title: 'Components/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Slider component features Continuous and Discrete modes, 15 core variant states, floating tooltip value indicator badges, step tick marks, and custom SVG props.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['continuous', 'discrete'],
      description: 'Slider track mode',
      table: {
        type: {
          summary: "'continuous' | 'discrete'",
        },
        defaultValue: {
          summary: "'continuous'",
        },
      },
    },
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
      description: 'Controlled slider value (number 0-100)',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    defaultValue: {
      control: 'number',
      description: 'Default uncontrolled initial value',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '50',
        },
      },
    },
    min: {
      control: 'number',
      description: 'Minimum slider value',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '0',
        },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum slider value',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '100',
        },
      },
    },
    state: {
      control: 'select',
      options: ['enabled', 'disabled', 'hovered', 'pressed', 'Enabled with indicator'],
      description: 'Explicit Figma variant state',
      table: {
        type: {
          summary: "'enabled' | 'disabled' | 'hovered' | 'pressed' | 'Enabled with indicator' | 'Enabled' | 'Disabled' | 'Hovered' | 'Pressed'",
        },
        defaultValue: {
          summary: "'enabled'",
        },
      },
    },
    showIndicator: {
      control: 'boolean',
      description: 'Display floating value badge above thumb',
      table: {
        type: {
          summary: 'bool',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showTicks: {
      control: 'boolean',
      description: 'Display discrete step tick marks',
      table: {
        type: {
          summary: 'bool',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state flag',
      table: {
        type: {
          summary: 'bool',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    label: {
      control: 'text',
      description: 'Optional label text or Node',
      table: {
        type: {
          summary: 'node',
        },
      },
    },
    subtext: {
      control: 'text',
      description: 'Optional subtext / description',
      table: {
        type: {
          summary: 'node',
        },
      },
    },
    thumbIcon: {
      control: false,
      description: 'Custom SVG Icon to override thumb handle',
      table: {
        type: {
          summary: 'node',
        },
      },
    },
    indicatorIcon: {
      control: false,
      description: 'Custom SVG / Node to override indicator badge',
      table: {
        type: {
          summary: 'node',
        },
      },
    },
  },
  decorators: [moduleMetadata({ imports: [SliderComponent] })],
  args: { variant: 'continuous', defaultValue: 50, min: 0, max: 100, showIndicator: false, disabled: false },
  render: (args) => ({
    props: args,
    template: `<kpmg-slider ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<SliderComponent>;

export const BasicContinuous: Story = {
  args: { label: 'Volume Control', subtext: 'Continuous slider from 0 to 100' },
};
export const DiscreteWithTicks: Story = {
  args: { variant: 'discrete', label: 'Step Ratings', subtext: 'Discrete step intervals (step = 10)', defaultValue: 40, step: 10, showTicks: true },
};
export const WithValueIndicatorTooltip: Story = {
  args: { label: 'Brightness Level', subtext: 'Displays value badge tooltip above thumb', defaultValue: 65, showIndicator: true },
};

export const InteractiveControlled: Story = {
  render: () => ({
    moduleMetadata: { imports: [SliderComponent] },
    props: { val: 50, mode: 'continuous', badge: true },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 450px">
        <h4 style="font-family: 'Open Sans'; margin: 0">Interactive Slider Demo</h4>
        <kpmg-slider
          [variant]="mode"
          [(value)]="val"
          [showIndicator]="badge"
          [step]="mode === 'discrete' ? 10 : 1"
          [label]="'Selected Value: ' + val"
          [subtext]="'Current Mode: ' + mode + ' (0 - 100)'"
        />
        <div style="display: flex; gap: 12px; flex-wrap: wrap">
          <button type="button" style="padding: 6px 12px; border-radius: 4px; cursor: pointer; border: 1px solid #CCC" (click)="mode = mode === 'continuous' ? 'discrete' : 'continuous'">Toggle Mode ({{ mode.toUpperCase() }})</button>
          <button type="button" style="padding: 6px 12px; border-radius: 4px; cursor: pointer; border: 1px solid #CCC" (click)="badge = !badge">Toggle Tooltip Badge ({{ badge ? 'ON' : 'OFF' }})</button>
          <button type="button" style="padding: 6px 12px; border-radius: 4px; cursor: pointer; border: 1px solid #CCC" (click)="val = 0">Set 0%</button>
          <button type="button" style="padding: 6px 12px; border-radius: 4px; cursor: pointer; border: 1px solid #CCC" (click)="val = 50">Set 50%</button>
          <button type="button" style="padding: 6px 12px; border-radius: 4px; cursor: pointer; border: 1px solid #CCC" (click)="val = 100">Set 100%</button>
        </div>
      </div>
    `,
  }),
};

export const All15FigmaVariantsMatrix: Story = {
  render: () => ({
    moduleMetadata: { imports: [SliderComponent] },
    props: {
      sections: [
        { title: '1. Continuous Sliders (15 Variants)', variant: 'continuous', step: undefined, key: 'cont' },
        { title: '2. Discrete Sliders with Ticks (15 Variants)', variant: 'discrete', step: 10, key: 'disc' },
      ],
      items: [
        { label: 'State=Enabled, Progress=0', state: 'enabled', val: 0, badge: false },
        { label: 'State=Enabled, Progress=50', state: 'enabled', val: 50, badge: false },
        { label: 'State=Enabled, Progress=100', state: 'enabled', val: 100, badge: false },
        { label: 'State=Enabled with indicator, Progress=0', state: 'Enabled with indicator', val: 0, badge: true },
        { label: 'State=Enabled with indicator, Progress=50', state: 'Enabled with indicator', val: 50, badge: true },
        { label: 'State=Enabled with indicator, Progress=100', state: 'Enabled with indicator', val: 100, badge: true },
        { label: 'State=Hovered, Progress=0', state: 'hovered', val: 0, badge: false },
        { label: 'State=Hovered, Progress=50', state: 'hovered', val: 50, badge: false },
        { label: 'State=Hovered, Progress=100', state: 'hovered', val: 100, badge: false },
        { label: 'State=Pressed, Progress=0', state: 'pressed', val: 0, badge: false },
        { label: 'State=Pressed, Progress=50', state: 'pressed', val: 50, badge: false },
        { label: 'State=Pressed, Progress=100', state: 'pressed', val: 100, badge: false },
        { label: 'State=Disabled, Progress=0', state: 'disabled', val: 0, badge: false },
        { label: 'State=Disabled, Progress=50', state: 'disabled', val: 50, badge: false },
        { label: 'State=Disabled, Progress=100', state: 'disabled', val: 100, badge: false },
      ],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; padding: 16px; max-width: 650px; width: 100%">
        <header>
          <h3 style="font-family: 'Open Sans'; margin-bottom: 8px">Slider Complete 15 Core Variants Matrix</h3>
          <p style="font-family: 'Open Sans'; color: #5D5D6A; font-size: 14px">Continuous & Discrete Slider Modes</p>
        </header>
        @for (sec of sections; track sec.key) {
          <div style="background-color: #FAFAFD; padding: 24px; border-radius: 12px; border: 1px solid #E3E3E8">
            <h4 style="font-family: 'Open Sans'; margin-bottom: 20px">{{ sec.title }}</h4>
            <div style="display: flex; flex-direction: column; gap: 16px">
              @for (item of items; track item.label) {
                <div style="border-bottom: 1px solid #E3E3E8; padding-bottom: 12px">
                  <span style="font-size: 12px; font-weight: 600; color: #3D405B; display: block; margin-bottom: 4px">{{ item.label }}</span>
                  <kpmg-slider [variant]="sec.variant" [step]="sec.step ?? 1" [state]="item.state" [value]="item.val" [showIndicator]="item.badge" />
                </div>
              }
            </div>
          </div>
        }
      </div>
    `,
  }),
};
