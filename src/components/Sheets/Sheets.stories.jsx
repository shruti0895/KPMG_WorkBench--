import React, { useState } from 'react';
import {
  Sheets,
  SheetHeader,
  SheetPillHeader,
  SheetTaskCard,
  SheetCard,
  SheetReferencesTable,
} from './Sheets';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Sheets',
  component: Sheets,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Sheets Component Family

The **Sheets** component family provides structured overlay and companion panels across WorkBench applications.
Designed in accordance with KPMG WorkBench Design System 2026 specifications:

- **Floating Sheets**:
  - **Informational**: Header task status card with circular progress tracking, Q&A message items with gradient dots, compliance status card, code score badge, and reference citation table.
  - **Inputs**: Template dropdown selector, editable Word document input chips, parameter range sliders, drag-and-drop file upload dropzone, and primary action buttons.
- **Side Sheets**:
  - **Basic**: Title header with overflow action, collapsible section header pills with star indicator, collaborative avatar cluster, and interactive item list cards.
  - **Special Layouts**:
    - **Project**: Project detail overview, tag chips, "View project" call-to-action, people list, summary, and related projects.
    - **File / Pages**: File metadata overview and interactive page preview cards with selected status badges.
    - **Assistant**: Configuration sheet with editable purpose, knowledge base items, prompt templates, model selection, voice dictation, and advanced parameter slider controls.
- **Drawer Support**: Can be rendered inline or as a slide-over companion drawer with background backdrop.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      name: 'variant',
      description: 'The layout family variant of the sheet: Floating overlay card or Side companion sheet',
      control: 'select',
      options: ['floating', 'side'],
      table: {
        type: { summary: "'floating' | 'side'" },
        defaultValue: { summary: "'floating'" },
      },
    },
    type: {
      name: 'type',
      description: 'Functional content type for the sheet',
      control: 'select',
      options: ['informational', 'inputs', 'basic', 'project', 'pages', 'assistant'],
      table: {
        type: { summary: "'informational' | 'inputs' | 'basic' | 'project' | 'pages' | 'assistant'" },
        defaultValue: { summary: "'informational'" },
      },
    },
    size: {
      name: 'size',
      description: 'Dimensional sizing tier (compact/small vs large)',
      control: 'select',
      options: ['compact', 'small', 'large'],
      table: {
        type: { summary: "'compact' | 'small' | 'large'" },
        defaultValue: { summary: "'large'" },
      },
    },
    style: {
      name: 'style',
      description: 'Surface styling treatment: Outlined (1px border) or Filled (tinted background)',
      control: 'select',
      options: ['outlined', 'filled'],
      table: {
        type: { summary: "'outlined' | 'filled'" },
        defaultValue: { summary: "'outlined'" },
      },
    },
    title: {
      name: 'title',
      description: 'Header display title text',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Item'" },
      },
    },
    progress: {
      name: 'progress',
      description: 'Progress completion percentage for the circular loading indicator (0 - 100)',
      control: { type: 'range', min: 0, max: 100, step: 5 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '80' },
      },
    },
    isDrawer: {
      name: 'isDrawer',
      description: 'Whether the sheet renders as a slide-over drawer with backdrop overlay',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fluid: {
      name: 'fluid',
      description: 'Whether the sheet stretches to fill 100% of its parent container width',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isOpen: {
      name: 'isOpen',
      description: 'Controls visibility state when rendered as a drawer',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onClose: {
      name: 'onClose',
      description: 'Callback fired when dismiss or close action is triggered',
      action: 'onClose',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

/* ==========================================================================
   PRIMARY INTERACTIVE STORY (AUTODOCS PROPS TABLE AT TOP)
   ========================================================================== */

export const Basic = {
  name: 'Basic Interactive Playground',
  args: {
    variant: 'floating',
    type: 'informational',
    size: 'large',
    style: 'outlined',
    title: 'Item',
    progress: 80,
    isDrawer: false,
    fluid: false,
    isOpen: true,
  },
  render: (args) => <Sheets {...args} />,
};

/* ==========================================================================
   FLOATING SHEETS - INFORMATIONAL
   ========================================================================== */

export const FloatingInformationalLargeOutlined = {
  name: 'Floating Sheet Informational Large Outlined',
  args: {
    variant: 'floating',
    type: 'informational',
    size: 'large',
    style: 'outlined',
  },
  render: (args) => <Sheets {...args} />,
};

export const FloatingInformationalLargeFilled = {
  name: 'Floating Sheet Informational Large Filled',
  args: {
    variant: 'floating',
    type: 'informational',
    size: 'large',
    style: 'filled',
  },
  render: (args) => <Sheets {...args} />,
};

export const FloatingInformationalCompactOutlined = {
  name: 'Floating Sheet Informational Compact Outlined',
  args: {
    variant: 'floating',
    type: 'informational',
    size: 'compact',
    style: 'outlined',
  },
  render: (args) => <Sheets {...args} />,
};

export const FloatingInformationalCompactFilled = {
  name: 'Floating Sheet Informational Compact Filled',
  args: {
    variant: 'floating',
    type: 'informational',
    size: 'compact',
    style: 'filled',
  },
  render: (args) => <Sheets {...args} />,
};

/* ==========================================================================
   FLOATING SHEETS - INPUTS
   ========================================================================== */

export const FloatingInputsLargeOutlined = {
  name: 'Floating Sheet Inputs Large Outlined',
  args: {
    variant: 'floating',
    type: 'inputs',
    size: 'large',
    style: 'outlined',
  },
  render: (args) => <Sheets {...args} />,
};

export const FloatingInputsLargeFilled = {
  name: 'Floating Sheet Inputs Large Filled',
  args: {
    variant: 'floating',
    type: 'inputs',
    size: 'large',
    style: 'filled',
  },
  render: (args) => <Sheets {...args} />,
};

export const FloatingInputsCompactOutlined = {
  name: 'Floating Sheet Inputs Compact Outlined',
  args: {
    variant: 'floating',
    type: 'inputs',
    size: 'compact',
    style: 'outlined',
  },
  render: (args) => <Sheets {...args} />,
};

export const FloatingInputsCompactFilled = {
  name: 'Floating Sheet Inputs Compact Filled',
  args: {
    variant: 'floating',
    type: 'inputs',
    size: 'compact',
    style: 'filled',
  },
  render: (args) => <Sheets {...args} />,
};

/* ==========================================================================
   SIDE SHEETS - BASIC
   ========================================================================== */

export const SideSheetBasicLargeOutlined = {
  name: 'Side Sheet Basic Large Outlined',
  args: {
    variant: 'side',
    type: 'basic',
    size: 'large',
    style: 'outlined',
  },
  render: (args) => <Sheets {...args} />,
};

export const SideSheetBasicLargeFilled = {
  name: 'Side Sheet Basic Large Filled',
  args: {
    variant: 'side',
    type: 'basic',
    size: 'large',
    style: 'filled',
  },
  render: (args) => <Sheets {...args} />,
};

export const SideSheetBasicSmallOutlined = {
  name: 'Side Sheet Basic Small Outlined',
  args: {
    variant: 'side',
    type: 'basic',
    size: 'small',
    style: 'outlined',
  },
  render: (args) => <Sheets {...args} />,
};

export const SideSheetBasicSmallFilled = {
  name: 'Side Sheet Basic Small Filled',
  args: {
    variant: 'side',
    type: 'basic',
    size: 'small',
    style: 'filled',
  },
  render: (args) => <Sheets {...args} />,
};

/* ==========================================================================
   SIDE SHEETS - SPECIAL VARIANTS
   ========================================================================== */

export const SideSheetSpecialProjectOutlined = {
  name: 'Side Sheet Special Project Outlined',
  args: {
    variant: 'side',
    type: 'project',
    size: 'large',
    style: 'outlined',
  },
  render: (args) => <Sheets {...args} />,
};

export const SideSheetSpecialProjectFilled = {
  name: 'Side Sheet Special Project Filled',
  args: {
    variant: 'side',
    type: 'project',
    size: 'large',
    style: 'filled',
  },
  render: (args) => <Sheets {...args} />,
};

export const SideSheetSpecialPagesOutlined = {
  name: 'Side Sheet Special Pages Outlined',
  args: {
    variant: 'side',
    type: 'pages',
    size: 'large',
    style: 'outlined',
  },
  render: (args) => <Sheets {...args} />,
};

export const SideSheetSpecialPagesFilled = {
  name: 'Side Sheet Special Pages Filled',
  args: {
    variant: 'side',
    type: 'pages',
    size: 'large',
    style: 'filled',
  },
  render: (args) => <Sheets {...args} />,
};

export const SideSheetSpecialAssistantOutlined = {
  name: 'Side Sheet Special Assistant Outlined',
  args: {
    variant: 'side',
    type: 'assistant',
    size: 'large',
    style: 'outlined',
  },
  render: (args) => <Sheets {...args} />,
};

export const SideSheetSpecialAssistantFilled = {
  name: 'Side Sheet Special Assistant Filled',
  args: {
    variant: 'side',
    type: 'assistant',
    size: 'large',
    style: 'filled',
  },
  render: (args) => <Sheets {...args} />,
};

/* ==========================================================================
   INTERACTIVE DRAWER DEMO
   ========================================================================== */

export const InteractiveDrawerDemo = {
  name: 'Interactive Side Sheet Drawer Demo',
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <p style={{ marginBottom: '16px', color: '#454554' }}>
          Click the button below to toggle the side sheet companion drawer overlay.
        </p>
        <Button onClick={() => setOpen(true)}>Open Side Sheet Drawer</Button>

        <Sheets
          variant="side"
          type="assistant"
          size="large"
          isDrawer={true}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
