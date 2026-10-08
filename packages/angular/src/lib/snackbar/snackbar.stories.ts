import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { SnackbarComponent, SnackbarContainerComponent, SnackbarOutletComponent } from './snackbar.component';
import { ButtonComponent } from '../button/button.component';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const meta: Meta<SnackbarComponent> = {
  title: 'Components/Snackbar',
  component: SnackbarComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [moduleMetadata({ imports: [SnackbarComponent, SnackbarContainerComponent, SnackbarOutletComponent, ButtonComponent] })],
  args: { size: 'single-line', outlined: false, message: 'Snackbar text goes here', actionLabel: 'Action', closeable: true },
  argTypes: {
    size: { control: 'select', options: ['single-line', 'two-line', 'extended', 'extended-header', 'extended-media'] },
    outlined: { control: 'boolean' },
    header: { control: 'text' },
    message: { control: 'text' },
    actionLabel: { control: 'text' },
    closeable: { control: 'boolean' },
    action: { control: false },
  },
  render: (args) => ({
    props: args,
    template: `<div style="padding: 32px; background: var(--color-surface-light); display: inline-flex"><kpmg-snackbar ${argsToTemplate(args)} /></div>`,
  }),
};

export default meta;
type Story = StoryObj<SnackbarComponent>;

export const SingleLineElevated: Story = { name: '01. Single-Line - Elevated' };
export const SingleLineOutlined: Story = { name: '02. Single-Line - Outlined', args: { outlined: true } };
export const TwoLineElevated: Story = { name: '03. Two-Line - Elevated', args: { size: 'two-line' } };
export const TwoLineOutlined: Story = { name: '04. Two-Line - Outlined', args: { size: 'two-line', outlined: true } };
export const ExtendedElevated: Story = {
  name: '05. Extended - Elevated',
  args: { size: 'extended', message: undefined, description: LOREM, actionLabel: 'Longer action' },
};
export const ExtendedOutlined: Story = { name: '06. Extended - Outlined', args: { ...ExtendedElevated.args, outlined: true } };
export const ExtendedWithHeaderElevated: Story = {
  name: '07. Extended with Header - Elevated',
  args: { size: 'extended-header', message: undefined, header: 'Header', description: LOREM, actionLabel: 'Longer action' },
};
export const ExtendedWithHeaderOutlined: Story = {
  name: '08. Extended with Header - Outlined',
  args: { ...ExtendedWithHeaderElevated.args, outlined: true },
};
export const ExtendedWithMediaElevated: Story = {
  name: '09. Extended with Media - Elevated',
  args: {
    size: 'extended-media',
    message: undefined,
    header: 'Header',
    description: LOREM,
    actionLabel: 'Longer action',
    items: [
      { id: '1', title: 'Header' },
      { id: '2', title: 'Header' },
      { id: '3', title: 'Header' },
    ],
  },
};
export const ExtendedWithMediaOutlined: Story = {
  name: '10. Extended with Media - Outlined',
  args: { ...ExtendedWithMediaElevated.args, outlined: true },
};

export const All10VariantsMatrix: Story = {
  name: 'Comprehensive 10-Variant Matrix',
  render: () => ({
    props: {
      cells: [
        { l: '01. Single-Line', size: 'single-line', o: false, m: 'Snackbar text goes here', a: 'Action' },
        { l: '02. Single-Line', size: 'single-line', o: true, m: 'Snackbar text goes here', a: 'Action' },
        { l: '03. Two-Line', size: 'two-line', o: false, m: 'Snackbar text goes here', a: 'Action' },
        { l: '04. Two-Line', size: 'two-line', o: true, m: 'Snackbar text goes here', a: 'Action' },
        { l: '05. Extended', size: 'extended', o: false, d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', a: 'Longer action' },
        { l: '06. Extended', size: 'extended', o: true, d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', a: 'Longer action' },
        { l: '07. Extended Header', size: 'extended-header', o: false, h: 'Header', d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', a: 'Longer action' },
        { l: '08. Extended Header', size: 'extended-header', o: true, h: 'Header', d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', a: 'Longer action' },
        { l: '09. Extended Media', size: 'extended-media', o: false, h: 'Header', d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', a: 'Longer action' },
        { l: '10. Extended Media', size: 'extended-media', o: true, h: 'Header', d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', a: 'Longer action' },
      ],
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:32px;background:var(--color-surface)">
        <div>
          <h3 style="font-size:18px;font-weight:600;margin-bottom:8px;color:var(--color-on-surface)">Canonical 10-Variant Matrix</h3>
          <p style="font-size:13px;color:var(--color-neutral-200);margin-bottom:24px">5 layout sizes across Elevated (Resting shadow) and Outlined (Border stroke) treatments.</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(340px, 1fr));gap:24px;max-width:800px">
            @for (c of cells; track c.l + c.o) {
              <div>
                <span style="font-size:12px;font-weight:600;text-transform:uppercase;color:var(--color-neutral-200)">{{ c.l }} &bull; {{ c.o ? 'Outlined' : 'Elevated' }}</span>
                <div style="margin-top:8px">
                  <kpmg-snackbar [size]="$any(c.size)" [outlined]="c.o" [message]="c.m" [header]="c.h" [description]="c.d" [actionLabel]="c.a" />
                </div>
              </div>
            }
          </div>
        </div>
      </div>`,
  }),
};

export const InteractiveToastDemo: Story = {
  name: 'Interactive Viewport Toast Demo',
  render: () => ({
    props: {
      toasts: [] as { id: number; size: string; outlined: boolean }[],
      spawn(this: { toasts: { id: number; size: string; outlined: boolean }[] }, size: string, outlined: boolean) {
        this.toasts = [...this.toasts, { id: Date.now(), size, outlined }];
      },
      remove(this: { toasts: { id: number }[] }, id: number) {
        this.toasts = this.toasts.filter((t) => t.id !== id);
      },
    },
    template: `
      <div style="padding: 32px; background: var(--color-surface); min-height: 300px">
        <p style="font-size: 14px; color: var(--color-neutral-100); margin-bottom: 16px">
          Click below to trigger fixed viewport toast snackbars at the <strong>bottom-left</strong> of the page:
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap">
          <kpmg-button variant="primary" (click)="spawn('single-line', false)">Spawn Single-Line</kpmg-button>
          <kpmg-button variant="outline" (click)="spawn('single-line', true)">Spawn Outlined</kpmg-button>
          <kpmg-button variant="secondary" (click)="spawn('extended-header', false)">Spawn Extended Header</kpmg-button>
          <kpmg-button variant="outline" (click)="spawn('extended-media', true)">Spawn Media Snackbar</kpmg-button>
        </div>
        <kpmg-snackbar-container position="bottom-left">
          @for (t of toasts; track t.id) {
            <kpmg-snackbar [size]="$any(t.size)" [outlined]="t.outlined"
              [header]="t.size.includes('header') || t.size.includes('media') ? 'Sources' : undefined"
              message="Client sample request updated successfully."
              description="New audit documentation was parsed and added to review index."
              actionLabel="Modify" [autoHideDuration]="6000" (closed)="remove(t.id)" />
          }
        </kpmg-snackbar-container>
      </div>`,
  }),
};
