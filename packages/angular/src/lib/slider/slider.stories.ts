import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { SliderComponent } from './slider.component';

const meta: Meta<SliderComponent> = {
  title: 'Components/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SliderComponent] })],
  parameters: { layout: 'centered' },
  args: { variant: 'continuous', defaultValue: 50, min: 0, max: 100, showIndicator: false, disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['continuous', 'discrete'] },
    state: { control: 'select', options: ['enabled', 'disabled', 'hovered', 'pressed', 'Enabled with indicator'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    showIndicator: { control: 'boolean' },
    showTicks: { control: 'boolean' },
    disabled: { control: 'boolean' },
    thumbIcon: { control: false },
    indicatorIcon: { control: false },
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 360px"><kpmg-slider ${argsToTemplate(args)} /></div>`,
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
        <h4 style="margin: 0">Interactive Slider Demo</h4>
        <kpmg-slider
          [variant]="mode"
          [(value)]="val"
          [showIndicator]="badge"
          [step]="mode === 'discrete' ? 10 : 1"
          [label]="'Selected Value: ' + val"
          [subtext]="'Current Mode: ' + mode + ' (0 - 100)'"
        />
        <div style="display: flex; gap: 12px; flex-wrap: wrap">
          <button type="button" (click)="mode = mode === 'continuous' ? 'discrete' : 'continuous'">Toggle Mode ({{ mode.toUpperCase() }})</button>
          <button type="button" (click)="badge = !badge">Toggle Tooltip Badge ({{ badge ? 'ON' : 'OFF' }})</button>
          <button type="button" (click)="val = 0">Set 0%</button>
          <button type="button" (click)="val = 50">Set 50%</button>
          <button type="button" (click)="val = 100">Set 100%</button>
        </div>
      </div>
    `,
  }),
};

export const All15FigmaVariantsMatrix: Story = {
  render: () => ({
    moduleMetadata: { imports: [SliderComponent] },
    props: {
      variants: ['continuous', 'discrete'],
      states: [
        { label: 'Enabled', state: 'enabled', badge: false },
        { label: 'Enabled with indicator', state: 'Enabled with indicator', badge: true },
        { label: 'Hovered', state: 'hovered', badge: false },
        { label: 'Pressed', state: 'pressed', badge: false },
        { label: 'Disabled', state: 'disabled', badge: false },
      ],
      progress: [0, 50, 100],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; padding: 16px; max-width: 650px; width: 100%">
        @for (v of variants; track v) {
          <div style="padding: 24px; border: 1px solid #E3E3E8; border-radius: 12px">
            <h4 style="margin: 0 0 20px">{{ v }} sliders (15 variants)</h4>
            <div style="display: flex; flex-direction: column; gap: 16px">
              @for (s of states; track s.label) {
                @for (p of progress; track p) {
                  <div style="border-bottom: 1px solid #E3E3E8; padding-bottom: 12px">
                    <span style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px">State={{ s.label }}, Progress={{ p }}</span>
                    <kpmg-slider [variant]="v" [step]="v === 'discrete' ? 10 : undefined" [state]="s.state" [value]="p" [showIndicator]="s.badge" />
                  </div>
                }
              }
            </div>
          </div>
        }
      </div>
    `,
  }),
};
