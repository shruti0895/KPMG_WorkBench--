import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { FileUploaderComponent } from './file-uploader.component';

const meta: Meta<FileUploaderComponent> = {
  title: 'Components/FileUploader',
  component: FileUploaderComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [FileUploaderComponent] })],
  parameters: { layout: 'centered' },
  args: { size: 'medium', state: 'outline', label: 'Drag and drop files or ', browseText: 'browse on computer', multiple: true, disabled: false },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    state: { control: 'select', options: ['outline', 'elevated', 'filled'] },
    label: { control: 'text' },
    browseText: { control: 'text' },
    subtext: { control: 'text' },
    accept: { control: 'text' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    icon: { control: false },
  },
  render: (args) => ({
    props: args,
    template: `<kpmg-file-uploader ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<FileUploaderComponent>;

export const DefaultMediumOutline: Story = { args: { subtext: 'Supports PNG, JPG, PDF up to 10MB' } };
export const LargeFilledWithIllustration: Story = {
  args: { size: 'large', state: 'filled', subtext: 'Supports CSV, XLSX up to 25MB' },
};
export const ElevatedCard: Story = { args: { state: 'elevated' } };
export const Disabled: Story = { args: { disabled: true } };

export const InteractiveFileSelection: Story = {
  render: () => ({
    moduleMetadata: { imports: [FileUploaderComponent] },
    props: {
      files: [] as File[],
      add(files: File[]) {
        this['files'] = [...this['files'], ...files];
      },
      kb(size: number) {
        return Math.round(size / 1024);
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; width: 450px">
        <h4 style="font-family: 'Open Sans'; margin: 0">Interactive File Uploader</h4>
        <kpmg-file-uploader size="medium" state="outline" subtext="Try dragging files onto this dropzone" (fileSelect)="add($event)" />
        @if (files.length > 0) {
          <div style="background-color: #FAFAFD; padding: 16px; border-radius: 8px; border: 1px solid #E3E3E8">
            <h5 style="margin: 0 0 8px 0; font-family: 'Open Sans'; font-size: 13px">Selected Files ({{ files.length }}):</h5>
            <ul style="margin: 0; padding-left: 20px; font-family: 'Open Sans'; font-size: 12px; color: #3D405B">
              @for (f of files; track $index) {
                <li>{{ f.name }} ({{ kb(f.size) }} KB)</li>
              }
            </ul>
            <button type="button" style="margin-top: 12px; padding: 4px 10px; font-size: 11px; cursor: pointer; border-radius: 4px; border: 1px solid #CCC" (click)="files = []">Clear List</button>
          </div>
        }
      </div>
    `,
  }),
};

export const All9FigmaVariantsMatrix: Story = {
  render: () => ({
    moduleMetadata: { imports: [FileUploaderComponent] },
    props: {
      sizes: [
        { id: 'small', name: 'Small ' },
        { id: 'medium', name: 'Medium ' },
        { id: 'large', name: 'Large (with Card Illustration)' },
      ],
      states: [
        { id: 'outline', name: 'Outline State' },
        { id: 'elevated', name: 'Elevated State' },
        { id: 'filled', name: 'Filled State' },
      ],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; padding: 16px; max-width: 900px; width: 100%">
        <header>
          <h3 style="font-family: 'Open Sans'; margin-bottom: 8px">File Uploader Figma Specs: Complete 9 Variants Matrix</h3>
          <p style="font-family: 'Open Sans'; color: #5D5D6A; font-size: 14px">3 Sizes (Small, Medium, Large) × 3 Visual States (Outline, Elevated, Filled)</p>
        </header>
        @for (s of sizes; track s.id) {
          <div style="background-color: #FAFAFD; padding: 24px; border-radius: 12px; border: 1px solid #E3E3E8">
            <h4 style="font-family: 'Open Sans'; margin-bottom: 20px; color: #1A28C1">Size: {{ s.name }}</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px">
              @for (st of states; track st.id) {
                <div style="display: flex; flex-direction: column; gap: 8px">
                  <span style="font-size: 12px; font-weight: 600; color: #3D405B">{{ st.name }}</span>
                  <kpmg-file-uploader [size]="$any(s.id)" [state]="$any(st.id)" label="Drag and drop files or " browseText="browse on computer" />
                </div>
              }
            </div>
          </div>
        }
      </div>
    `,
  }),
};
