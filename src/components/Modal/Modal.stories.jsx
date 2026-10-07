import React, { useState } from 'react';
import {
  Modal,
  ModalItem,
  ModalAgentCard,
  ModalCard,
  ModalPromptItem,
  ModalCloseIcon,
  ModalEditIcon,
  ModalInfoIcon,
  ModalHeartIcon,
  ModalBookmarkIcon,
  ModalShareIcon,
  ModalMicIcon,
  ModalMoreVerticalIcon,
  ModalUploadIcon,
} from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Modal Component Family

The **Modal** component family provides structured modal dialogs and configuration panels across WorkBench applications.
Designed according to canonical KPMG WorkBench Design System 2026 specifications:

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
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      name: 'isOpen',
      description: 'Controls the open/closed visibility state of the modal',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    inline: {
      name: 'inline',
      description: 'Renders the modal inline in the document flow without a fixed overlay backdrop',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    title: {
      name: 'title',
      description: 'Modal header display title text',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Create an assistant'" },
      },
    },
    withProgress: {
      name: 'withProgress',
      description: 'Toggles the top linear progress bar indicator',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    progress: {
      name: 'progress',
      description: 'Progress completion percentage (0 - 100)',
      control: { type: 'range', min: 0, max: 100, step: 5 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '80' },
      },
    },
    agentModule: {
      name: 'agentModule',
      description: 'Displays the assistant profile preview card with reactions',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inputModule1: {
      name: 'inputModule1',
      description: 'Displays the Name input section with editable pill header and textarea',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inputModule2: {
      name: 'inputModule2',
      description: 'Displays the Purpose input section with editable pill header, textarea, and mic icon',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    fileUploaderModule: {
      name: 'fileUploaderModule',
      description: 'Displays the Knowledge base drag-and-drop file uploader module',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inputModule3: {
      name: 'inputModule3',
      description: 'Displays the Prompt templates module with textarea and card items',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    cardModule1: {
      name: 'cardModule1',
      description: 'Displays the 2x2 Model selection grid',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    cardModule2: {
      name: 'cardModule2',
      description: 'Displays the 2x2 Voice selection grid with gradient avatars',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showFooter: {
      name: 'showFooter',
      description: 'Whether to display the footer actions container',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    backLabel: {
      name: 'backLabel',
      description: 'Label for secondary outlined back button',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Back'" },
      },
    },
    nextLabel: {
      name: 'nextLabel',
      description: 'Label for primary filled next button',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Next'" },
      },
    },
    nameValue: {
      name: 'nameValue',
      description: 'Default text value for the Name input textarea',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Lorem ipsum dolor sit amet, consectetur adipiscing elit'" },
      },
    },
    purposeValue: {
      name: 'purposeValue',
      description: 'Default text value for the Purpose input textarea',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'" },
      },
    },
    promptValue: {
      name: 'promptValue',
      description: 'Default text value for the Prompt templates textarea',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Lorem ipsum dolor sit amet, consectetur adipiscing elit'" },
      },
    },
    onClose: {
      name: 'onClose',
      description: 'Callback fired when modal dismiss action is triggered',
      action: 'onClose',
      table: {
        type: { summary: 'function' },
      },
    },
    onBack: {
      name: 'onBack',
      description: 'Callback fired when Back button is clicked',
      action: 'onBack',
      table: {
        type: { summary: 'function' },
      },
    },
    onNext: {
      name: 'onNext',
      description: 'Callback fired when Next button is clicked',
      action: 'onNext',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

/**
 * Basic interactive playground story with full controls and props table at the top.
 */
export const Basic = {
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
    nameValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    purposeValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    promptValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
      <Modal {...args} />
    </div>
  ),
};

/**
 * Non-Progress - Compact Input Variant
 * Minimal streamlined layout featuring Header, Purpose input with voice dictation, and Action Footer.
 */
export const NonProgressCompactInput = {
  name: 'Non-Progress - Compact Input',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
      <Modal
        inline
        title="Create an assistant"
        withProgress={false}
        agentModule={false}
        inputModule1={false}
        inputModule2={true}
        fileUploaderModule={false}
        inputModule3={false}
        cardModule1={false}
        cardModule2={false}
        backLabel="Back"
        nextLabel="Next"
      />
    </div>
  ),
};

/**
 * Non-Progress - Template Configuration Variant
 * Dedicated template setup layout featuring Header, Name input, and Prompt Templates with item list.
 */
export const NonProgressTemplateConfiguration = {
  name: 'Non-Progress - Template Configuration',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
      <Modal
        inline
        title="Create an assistant"
        withProgress={false}
        agentModule={false}
        inputModule1={true}
        inputModule2={false}
        fileUploaderModule={false}
        inputModule3={true}
        cardModule1={false}
        cardModule2={false}
        backLabel="Back"
        nextLabel="Next"
      />
    </div>
  ),
};

/**
 * With Progress - Assistant Profile & Setup Variant
 * Initial creation step featuring Linear Progress Bar, Assistant Profile preview card, Name input, and Purpose input.
 */
export const WithProgressAssistantProfile = {
  name: 'With Progress - Assistant Profile & Setup',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
      <Modal
        inline
        title="Create an assistant"
        withProgress={true}
        progress={30}
        agentModule={true}
        inputModule1={true}
        inputModule2={true}
        fileUploaderModule={false}
        inputModule3={false}
        cardModule1={false}
        cardModule2={false}
        backLabel="Back"
        nextLabel="Next"
      />
    </div>
  ),
};

/**
 * With Progress - Multi-Step Assistant Creation Variant
 * Advanced creation step featuring Linear Progress Bar, Assistant Profile card, Name, Purpose, Knowledge Base file uploader, and Prompt Templates.
 */
export const WithProgressMultiStepCreation = {
  name: 'With Progress - Multi-Step Assistant Creation',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
      <Modal
        inline
        title="Create an assistant"
        withProgress={true}
        progress={80}
        agentModule={true}
        inputModule1={true}
        inputModule2={true}
        fileUploaderModule={true}
        inputModule3={true}
        cardModule1={false}
        cardModule2={false}
        backLabel="Back"
        nextLabel="Next"
      />
    </div>
  ),
};

/**
 * Complete Master Modal Variant
 * Complete canonical showcase incorporating all seven modules: Assistant Card, Name, Purpose, Knowledge Base Uploader, Prompt Templates, Model Selection Grid, and Voice Selection Grid.
 */
export const CompleteMasterModal = {
  name: 'Complete Master Modal',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
      <Modal
        inline
        title="Create an assistant"
        withProgress={true}
        progress={100}
        agentModule={true}
        inputModule1={true}
        inputModule2={true}
        fileUploaderModule={true}
        inputModule3={true}
        cardModule1={true}
        cardModule2={true}
        backLabel="Back"
        nextLabel="Next"
      />
    </div>
  ),
};

/**
 * Modal Section Header Items
 * Subcomponent showcase for ModalItem pill section headers across all sizes, states, and action types.
 */
export const ModalSectionHeaderItems = {
  name: 'Modal Section Header Items',
  render: () => (
    <div style={{ maxWidth: '652px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ fontFamily: 'Open Sans', margin: '0 0 8px 0', fontSize: '18px', color: '#2f2f39' }}>
        Large Section Headers
      </h3>
      <ModalItem label="Name" size="large" type="with-edit" state="enabled" />
      <ModalItem label="Purpose" size="large" type="with-edit" state="hovered" />
      <ModalItem label="Knowledge base" size="large" type="with-info" state="enabled" />
      <ModalItem label="Prompt templates" size="large" type="with-edit" state="pressed" />
      <ModalItem label="Model" size="large" type="with-info" selected={true} />
      <ModalItem label="Voice" size="large" type="with-exit" state="enabled" />

      <h3 style={{ fontFamily: 'Open Sans', margin: '24px 0 8px 0', fontSize: '18px', color: '#2f2f39' }}>
        Small Section Headers
      </h3>
      <ModalItem label="Name" size="small" type="with-edit" state="enabled" />
      <ModalItem label="Purpose" size="small" type="with-edit" state="hovered" />
      <ModalItem label="Knowledge base" size="small" type="with-info" state="enabled" />
      <ModalItem label="Prompt templates" size="small" type="with-edit" state="pressed" />
      <ModalItem label="Model" size="small" type="with-info" selected={true} />
      <ModalItem label="Voice" size="small" type="with-exit" state="enabled" />
    </div>
  ),
};

/**
 * Interactive Dialog Demo
 * Live interactive demonstration of the modal triggered by a button, rendered with modal overlay backdrop, Escape key listener, and close handler.
 */
export const InteractiveDialogDemo = {
  name: 'Interactive Dialog Demo',
  parameters: {
    docs: {
      story: {
        iframeHeight: 900,
      },
    },
  },
  render: function InteractiveModalDemo() {
    const [open, setOpen] = useState(false);

    return (
      <div
        style={{
          width: '100%',
          minWidth: '760px',
          minHeight: '880px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '40px 20px',
          textAlign: 'center',
          fontFamily: 'Open Sans',
          boxSizing: 'border-box',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: '#1e49e2',
            color: '#ffffff',
            border: 'none',
            borderRadius: '1000px',
            padding: '12px 28px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(30, 73, 226, 0.25)',
          }}
        >
          Open Assistant Modal
        </button>

        <Modal
          isOpen={open}
          inline={false}
          title="Create an assistant"
          withProgress={true}
          progress={50}
          agentModule={true}
          inputModule1={true}
          inputModule2={true}
          onClose={() => setOpen(false)}
          onBack={() => setOpen(false)}
          onNext={() => alert('Proceeding to next step!')}
        />
      </div>
    );
  },
};

