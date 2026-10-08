import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ModalItemComponent } from './modal-item.component';
import { ModalAgentCardComponent, ModalCardComponent, ModalPromptItemComponent } from './modal-parts.component';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ModalComponent, ModalItemComponent, ModalAgentCardComponent, ModalCardComponent, ModalPromptItemComponent],
    }),
  ],
  parameters: { layout: 'padded' },
  args: {
    isOpen: true,
    inline: true,
    title: 'Create an assistant',
    withProgress: false,
    progress: 80,
    agentModule: false,
    inputModule1: false,
    inputModule2: true,
    fileUploaderModule: false,
    inputModule3: false,
    cardModule1: false,
    cardModule2: false,
    showFooter: true,
    backLabel: 'Back',
    nextLabel: 'Next',
  },
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 5 } },
    isOpen: { control: 'boolean' },
    inline: { control: 'boolean' },
    withProgress: { control: 'boolean' },
    agentModule: { control: 'boolean' },
    inputModule1: { control: 'boolean' },
    inputModule2: { control: 'boolean' },
    fileUploaderModule: { control: 'boolean' },
    inputModule3: { control: 'boolean' },
    cardModule1: { control: 'boolean' },
    cardModule2: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    nameValue: { control: 'text' },
    purposeValue: { control: 'text' },
    promptValue: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `<div style="display: flex; justify-content: center; padding: 24px"><kpmg-modal ${argsToTemplate(args)} /></div>`,
  }),
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Basic: Story = {};

export const NonProgressCompactInput: Story = { name: 'Non-Progress - Compact Input' };

export const NonProgressTemplateConfiguration: Story = {
  name: 'Non-Progress - Template Configuration',
  args: { inputModule1: true, inputModule2: false, inputModule3: true },
};

export const WithProgressAssistantProfile: Story = {
  name: 'With Progress - Assistant Profile & Setup',
  args: { withProgress: true, progress: 30, agentModule: true, inputModule1: true, inputModule2: true },
};

export const WithProgressMultiStepCreation: Story = {
  name: 'With Progress - Multi-Step Assistant Creation',
  args: {
    withProgress: true,
    progress: 80,
    agentModule: true,
    inputModule1: true,
    inputModule2: true,
    fileUploaderModule: true,
    inputModule3: true,
  },
};

export const CompleteMasterModal: Story = {
  name: 'Complete Master Modal',
  args: {
    withProgress: true,
    progress: 100,
    agentModule: true,
    inputModule1: true,
    inputModule2: true,
    fileUploaderModule: true,
    inputModule3: true,
    cardModule1: true,
    cardModule2: true,
  },
};

export const ModalSectionHeaderItems: Story = {
  name: 'Modal Section Header Items',
  render: () => ({
    template: `
      <div style="max-width: 652px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px">
        <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #2f2f39">Large Section Headers</h3>
        <kpmg-modal-item label="Name" size="large" type="with-edit" state="enabled" />
        <kpmg-modal-item label="Purpose" size="large" type="with-edit" state="hovered" />
        <kpmg-modal-item label="Knowledge base" size="large" type="with-info" state="enabled" />
        <kpmg-modal-item label="Prompt templates" size="large" type="with-edit" state="pressed" />
        <kpmg-modal-item label="Model" size="large" type="with-info" [selected]="true" />
        <kpmg-modal-item label="Voice" size="large" type="with-exit" state="enabled" />
        <h3 style="margin: 24px 0 8px 0; font-size: 18px; color: #2f2f39">Small Section Headers</h3>
        <kpmg-modal-item label="Name" size="small" type="with-edit" state="enabled" />
        <kpmg-modal-item label="Purpose" size="small" type="with-edit" state="hovered" />
        <kpmg-modal-item label="Knowledge base" size="small" type="with-info" state="enabled" />
        <kpmg-modal-item label="Prompt templates" size="small" type="with-edit" state="pressed" />
        <kpmg-modal-item label="Model" size="small" type="with-info" [selected]="true" />
        <kpmg-modal-item label="Voice" size="small" type="with-exit" state="enabled" />
      </div>`,
  }),
};

export const InteractiveDialogDemo: Story = {
  name: 'Interactive Dialog Demo',
  parameters: { docs: { story: { iframeHeight: 900 } } },
  render: () => ({
    props: { open: false },
    template: `
      <div style="min-width: 760px; min-height: 880px; display: flex; flex-direction: column; align-items: center; padding: 40px 20px">
        <button type="button" (click)="open = true"
          style="background: #1e49e2; color: #fff; border: none; border-radius: 1000px; padding: 12px 28px; font-size: 15px; font-weight: 600; cursor: pointer">
          Open Assistant Modal
        </button>
        <kpmg-modal [isOpen]="open" [inline]="false" title="Create an assistant" [withProgress]="true" [progress]="50"
          [agentModule]="true" [inputModule1]="true" [inputModule2]="true"
          (modalClose)="open = false" (back)="open = false" (next)="open = false" />
      </div>`,
  }),
};
