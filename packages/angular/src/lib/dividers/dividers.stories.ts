import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { DividersComponent } from './dividers.component';

const meta: Meta<DividersComponent> = {
  title: 'Components/Dividers',
  component: DividersComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [DividersComponent] })],
  argTypes: {
    state: { control: { type: 'radio' }, options: ['Horizontal', 'Vertical'] },
    theme: { control: { type: 'radio' }, options: ['Light', 'Dark'] },
    width: {
      control: { type: 'select' },
      options: ['Full', 'Inset', 'Inset middle small', 'Inset middle medium', 'Inset middle large', 'Inset middle with text', 'Inset middle'],
    },
    text: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DividersComponent>;

const horizontal = [
  { width: 'Full', label: 'Full width' },
  { width: 'Inset', label: 'Inset' },
  { width: 'Inset middle small', label: 'Inset middle small' },
  { width: 'Inset middle medium', label: 'Inset middle medium' },
  { width: 'Inset middle large', label: 'Inset middle large' },
  { width: 'Inset middle with text', label: 'Inset with text' },
];
const vertical = [
  { width: 'Full', label: 'Full' },
  { width: 'Inset', label: 'Inset' },
  { width: 'Inset middle', label: 'Inset middle' },
];

export const All18FigmaVariants: Story = {
  render: () => ({
    props: { horizontal, vertical },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:24px">
        <h2 style="margin:0">Dividers — All 18 Canonical Figma Variants</h2>
        <div style="background:#fbfbfb;border-radius:28px;padding:48px;border:1px solid #ededf2;display:flex;flex-direction:column;gap:48px;max-width:1200px">
          <div style="display:flex;flex-direction:column;gap:24px">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;border-bottom:1px solid #d5d5dc;padding-bottom:16px">
              <span style="font-size:14px;font-weight:600;text-transform:uppercase">Light Theme (Badges 1 – 6)</span>
              <span style="font-size:14px;font-weight:600;text-transform:uppercase">Dark Theme (Badges 7 – 12)</span>
            </div>
            @for (h of horizontal; track h.width) {
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:flex-start;padding-bottom:24px">
                @for (t of ['Light', 'Dark']; track t) {
                  <div style="display:flex;flex-direction:column;gap:12px">
                    <span style="font-size:13px;font-weight:600;color:#454554">{{ h.label }}</span>
                    <kpmg-dividers state="Horizontal" [theme]="t" [width]="h.width" />
                  </div>
                }
              </div>
            }
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px">
            @for (t of ['Light', 'Dark']; track t) {
              <div style="display:flex;gap:32px;padding:32px">
                @for (v of vertical; track v.width) {
                  <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
                    <kpmg-dividers state="Vertical" [theme]="t" [width]="v.width" />
                    <span style="font-size:12px;color:#9090a2;text-align:center">{{ v.label }}</span>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>`,
  }),
};

export const InteractivePlayground: Story = {
  args: { state: 'Horizontal', theme: 'Light', width: 'Inset middle with text', text: 'Subheader Section' },
  render: (args) => ({
    props: { ...args, maxWidth: args.state === 'Vertical' ? '300px' : '600px' },
    template: `
      <div style="padding:32px">
        <div [style.maxWidth]="maxWidth" [style.background]="theme === 'Dark' ? '#ffffff' : '#fcfcfe'" style="padding:32px;border-radius:16px;border:1px solid #ededf2;display:flex;align-items:center;justify-content:center">
          <kpmg-dividers ${argsToTemplate(args)} />
        </div>
      </div>`,
  }),
};
