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
    template: `<div style="width: 360px"><kpmg-file-uploader ${argsToTemplate(args)} /></div>`,
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
        <h4 style="margin: 0">Interactive File Uploader</h4>
        <kpmg-file-uploader size="medium" state="outline" subtext="Try dragging files onto this dropzone" (fileSelect)="add($event)" />
        @if (files.length > 0) {
          <div style="padding: 16px; border-radius: 8px; border: 1px solid #E3E3E8">
            <h5 style="margin: 0 0 8px; font-size: 13px">Selected Files ({{ files.length }}):</h5>
            <ul style="margin: 0; padding-left: 20px; font-size: 12px">
              @for (f of files; track $index) {
                <li>{{ f.name }} ({{ kb(f.size) }} KB)</li>
              }
            </ul>
            <button type="button" style="margin-top: 12px" (click)="files = []">Clear List</button>
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
        { id: 'small', name: 'Small' },
        { id: 'medium', name: 'Medium' },
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
        @for (s of sizes; track s.id) {
          <div style="padding: 24px; border-radius: 12px; border: 1px solid #E3E3E8">
            <h4 style="margin: 0 0 20px">Size: {{ s.name }}</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px">
              @for (st of states; track st.id) {
                <div style="display: flex; flex-direction: column; gap: 8px">
                  <span style="font-size: 12px; font-weight: 600">{{ st.name }}</span>
                  <kpmg-file-uploader [size]="$any(s.id)" [state]="$any(st.id)" />
                </div>
              }
            </div>
          </div>
        }
      </div>
    `,
  }),
};
