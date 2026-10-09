import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ModalItemComponent } from './modal-item.component';
import { ModalAgentCardComponent, ModalCardComponent, ModalPromptItemComponent } from './modal-parts.component';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Modal Component Family

The **Modal** component family provides structured modal dialogs and configuration panels across WorkBench applications.
Designed according to canonical KPMG WorkBench Design System specifications:

- **Header & Navigation**: Title display  with a circular dismiss action button.
- **Linear Progress Indicator**: Integrated linear progress bar track for multi-step assistant wizard flows.
- **Modular Section Layouts**:
  - **Agent Preview Card**: Avatar, Title, Subhead, Assistant status tag, description, and social reactions (Heart, Bookmark, Share).
  - **Pill Section Headers**: Reusable pill headers with contextual edit, info, and exit action buttons.
  - **Name & Purpose Inputs**: Structured multi-line textareas with voice dictation mic trigger.
  - **Knowledge Base Uploader**: Drag-and-drop dropzone supporting local file attachment with removable tag badges.
  - **Prompt Templates**: Template configuration with editable prompt textarea and side-sheet list items.
  - **Action Footer**: Right-aligned secondary outlined Back button and primary filled Next button.
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the open/closed visibility state of the modal',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    inline: {
      control: 'boolean',
      description: 'Renders the modal inline in the document flow without a fixed overlay backdrop',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    title: {
      control: 'text',
      description: 'Modal header display title text',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Create an assistant'",
        },
      },
    },
    withProgress: {
      control: 'boolean',
      description: 'Toggles the top linear progress bar indicator',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    progress: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 5,
      },
      description: 'Progress completion percentage (0 - 100)',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '80',
        },
      },
    },
    agentModule: {
      control: 'boolean',
      description: 'Displays the assistant profile preview card with reactions',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    inputModule1: {
      control: 'boolean',
      description: 'Displays the Name input section with editable pill header and textarea',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    inputModule2: {
      control: 'boolean',
      description: 'Displays the Purpose input section with editable pill header, textarea, and mic icon',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    fileUploaderModule: {
      control: 'boolean',
      description: 'Displays the Knowledge base drag-and-drop file uploader module',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    inputModule3: {
      control: 'boolean',
      description: 'Displays the Prompt templates module with textarea and card items',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    cardModule1: {
      control: 'boolean',
      description: 'Displays the 2x2 Model selection grid',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    cardModule2: {
      control: 'boolean',
      description: 'Displays the 2x2 Voice selection grid with gradient avatars',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    backLabel: {
      control: 'text',
      description: 'Label for secondary outlined back button',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Back'",
        },
      },
    },
    nextLabel: {
      control: 'text',
      description: 'Label for primary filled next button',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Next'",
        },
      },
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to display the footer actions container',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    nameValue: {
      control: 'text',
      description: 'Default text value for the Name input textarea',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Lorem ipsum dolor sit amet, consectetur adipiscing elit'",
        },
      },
    },
    purposeValue: {
      control: 'text',
      description: 'Default text value for the Purpose input textarea',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'",
        },
      },
    },
    promptValue: {
      control: 'text',
      description: 'Default text value for the Prompt templates textarea',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Lorem ipsum dolor sit amet, consectetur adipiscing elit'",
        },
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ModalComponent, ModalItemComponent, ModalAgentCardComponent, ModalCardComponent, ModalPromptItemComponent],
    }),
  ],
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
  render: (args) => ({
    props: args,
    template: `<div style="display: flex; justify-content: center; padding: 24px"><kpmg-modal ${argsToTemplate(args)} /></div>`,
  }),
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Basic: Story = {
  parameters: { docs: { description: { story: 'Basic interactive playground story with full controls and props table at the top.' } } },
};

export const NonProgressCompactInput: Story = {
  parameters: { docs: { description: { story: 'Non-Progress - Compact Input Variant\nMinimal streamlined layout featuring Header, Purpose input with voice dictation, and Action Footer.' } } }, name: 'Non-Progress - Compact Input' };

export const NonProgressTemplateConfiguration: Story = {
  parameters: { docs: { description: { story: 'Non-Progress - Template Configuration Variant\nDedicated template setup layout featuring Header, Name input, and Prompt Templates with item list.' } } },
  name: 'Non-Progress - Template Configuration',
  args: { inputModule1: true, inputModule2: false, inputModule3: true },
};

export const WithProgressAssistantProfile: Story = {
  parameters: { docs: { description: { story: 'With Progress - Assistant Profile & Setup Variant\nInitial creation step featuring Linear Progress Bar, Assistant Profile preview card, Name input, and Purpose input.' } } },
  name: 'With Progress - Assistant Profile & Setup',
  args: { withProgress: true, progress: 30, agentModule: true, inputModule1: true, inputModule2: true },
};

export const WithProgressMultiStepCreation: Story = {
  parameters: { docs: { description: { story: 'With Progress - Multi-Step Assistant Creation Variant\nAdvanced creation step featuring Linear Progress Bar, Assistant Profile card, Name, Purpose, Knowledge Base file uploader, and Prompt Templates.' } } },
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
  parameters: { docs: { description: { story: 'Complete Master Modal Variant\nComplete canonical showcase incorporating all seven modules: Assistant Card, Name, Purpose, Knowledge Base Uploader, Prompt Templates, Model Selection Grid, and Voice Selection Grid.' } } },
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
  parameters: { docs: { description: { story: 'Modal Section Header Items\nSubcomponent showcase for ModalItem pill section headers across all sizes, states, and action types.' } } },
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
  parameters: {
    docs: {
      story: { iframeHeight: 900 },
      description: { story: 'Interactive Dialog Demo\nLive interactive demonstration of the modal triggered by a button, rendered with modal overlay backdrop, Escape key listener, and close handler.' },
    },
  },
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
