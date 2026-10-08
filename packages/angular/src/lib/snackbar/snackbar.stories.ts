import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { SnackbarComponent, SnackbarContainerComponent, SnackbarOutletComponent } from './snackbar.component';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const meta: Meta<SnackbarComponent> = {
  title: 'Components/Snackbar',
  component: SnackbarComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SnackbarComponent, SnackbarContainerComponent, SnackbarOutletComponent] })],
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
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; max-width: 800px; padding: 32px; background: var(--color-surface)">
        @for (o of [false, true]; track o) {
          <kpmg-snackbar size="single-line" [outlined]="o" message="Snackbar text goes here" actionLabel="Action" />
          <kpmg-snackbar size="two-line" [outlined]="o" message="Snackbar text goes here" actionLabel="Action" />
          <kpmg-snackbar size="extended" [outlined]="o" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." actionLabel="Longer action" />
          <kpmg-snackbar size="extended-header" [outlined]="o" header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." actionLabel="Longer action" />
          <kpmg-snackbar size="extended-media" [outlined]="o" header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." actionLabel="Longer action" />
        }
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
        <div style="display: flex; gap: 12px; flex-wrap: wrap">
          <button type="button" (click)="spawn('single-line', false)">Spawn Single-Line</button>
          <button type="button" (click)="spawn('single-line', true)">Spawn Outlined</button>
          <button type="button" (click)="spawn('extended-header', false)">Spawn Extended Header</button>
          <button type="button" (click)="spawn('extended-media', true)">Spawn Media Snackbar</button>
        </div>
        <kpmg-snackbar-container position="bottom-left">
          @for (t of toasts; track t.id) {
            <kpmg-snackbar [size]="$any(t.size)" [outlined]="t.outlined"
              [header]="t.size === 'single-line' ? undefined : 'Sources'"
              message="Client sample request updated successfully."
              description="New audit documentation was parsed and added to review index."
              actionLabel="Modify" [autoHideDuration]="6000" (closed)="remove(t.id)" />
          }
        </kpmg-snackbar-container>
      </div>`,
  }),
};
