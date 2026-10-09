import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { SheetsComponent } from './sheets.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<SheetsComponent> = {
  title: 'Components/Sheets',
  component: SheetsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Sheets Component Family

The **Sheets** component family provides structured overlay and companion panels across WorkBench applications.
Designed in accordance with KPMG WorkBench Design System specifications:

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
  argTypes: {
    variant: {
      control: 'select',
      options: ['floating', 'side'],
      description: 'The layout family variant of the sheet: Floating overlay card or Side companion sheet',
      table: {
        type: {
          summary: "'floating' | 'side'",
        },
        defaultValue: {
          summary: "'floating'",
        },
      },
    },
    type: {
      control: 'select',
      options: ['informational', 'inputs', 'basic', 'project', 'pages', 'assistant'],
      description: 'Functional content type for the sheet',
      table: {
        type: {
          summary: "'informational' | 'inputs' | 'basic' | 'project' | 'pages' | 'assistant'",
        },
        defaultValue: {
          summary: "'informational'",
        },
      },
    },
    size: {
      control: 'select',
      options: ['compact', 'small', 'large'],
      description: 'Dimensional sizing tier (compact/small vs large)',
      table: {
        type: {
          summary: "'compact' | 'small' | 'large'",
        },
        defaultValue: {
          summary: "'large'",
        },
      },
    },
    sheetStyle: {
      name: 'style',
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'Surface styling treatment: Outlined (1px border) or Filled (tinted background)',
      table: {
        type: {
          summary: "'outlined' | 'filled'",
        },
        defaultValue: {
          summary: "'outlined'",
        },
      },
    },
    title: {
      control: 'text',
      description: 'Header display title text',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Item'",
        },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls visibility state when rendered as a drawer',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    isDrawer: {
      control: 'boolean',
      description: 'Whether the sheet renders as a slide-over drawer with backdrop overlay',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    fluid: {
      control: 'boolean',
      description: 'Whether the sheet stretches to fill 100% of its parent container width',
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
      description: 'Progress completion percentage for the circular loading indicator (0 - 100)',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '80',
        },
      },
    },
  },
  decorators: [moduleMetadata({ imports: [SheetsComponent, ButtonComponent] })],
  args: {
    variant: 'floating',
    type: 'informational',
    size: 'large',
    sheetStyle: 'outlined',
    title: 'Item',
    progress: 80,
    isDrawer: false,
    fluid: false,
    isOpen: true,
  },
  render: (args) => ({ props: args, template: `<kpmg-sheets ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<SheetsComponent>;

export const Basic: Story = { name: 'Basic Interactive Playground' };

const f = (variant: 'floating' | 'side', type: NonNullable<Story['args']>['type'], size: NonNullable<Story['args']>['size'], sheetStyle: 'outlined' | 'filled'): Story['args'] => ({
  variant,
  type,
  size,
  sheetStyle,
});

export const FloatingInformationalLargeOutlined: Story = { name: 'Floating Sheet Informational Large Outlined', args: f('floating', 'informational', 'large', 'outlined') };
export const FloatingInformationalLargeFilled: Story = { name: 'Floating Sheet Informational Large Filled', args: f('floating', 'informational', 'large', 'filled') };
export const FloatingInformationalCompactOutlined: Story = { name: 'Floating Sheet Informational Compact Outlined', args: f('floating', 'informational', 'compact', 'outlined') };
export const FloatingInformationalCompactFilled: Story = { name: 'Floating Sheet Informational Compact Filled', args: f('floating', 'informational', 'compact', 'filled') };
export const FloatingInputsLargeOutlined: Story = { name: 'Floating Sheet Inputs Large Outlined', args: f('floating', 'inputs', 'large', 'outlined') };
export const FloatingInputsLargeFilled: Story = { name: 'Floating Sheet Inputs Large Filled', args: f('floating', 'inputs', 'large', 'filled') };
export const FloatingInputsCompactOutlined: Story = { name: 'Floating Sheet Inputs Compact Outlined', args: f('floating', 'inputs', 'compact', 'outlined') };
export const FloatingInputsCompactFilled: Story = { name: 'Floating Sheet Inputs Compact Filled', args: f('floating', 'inputs', 'compact', 'filled') };
export const SideSheetBasicLargeOutlined: Story = { name: 'Side Sheet Basic Large Outlined', args: f('side', 'basic', 'large', 'outlined') };
export const SideSheetBasicLargeFilled: Story = { name: 'Side Sheet Basic Large Filled', args: f('side', 'basic', 'large', 'filled') };
export const SideSheetBasicSmallOutlined: Story = { name: 'Side Sheet Basic Small Outlined', args: f('side', 'basic', 'small', 'outlined') };
export const SideSheetBasicSmallFilled: Story = { name: 'Side Sheet Basic Small Filled', args: f('side', 'basic', 'small', 'filled') };
export const SideSheetSpecialProjectOutlined: Story = { name: 'Side Sheet Special Project Outlined', args: f('side', 'project', 'large', 'outlined') };
export const SideSheetSpecialProjectFilled: Story = { name: 'Side Sheet Special Project Filled', args: f('side', 'project', 'large', 'filled') };
export const SideSheetSpecialPagesOutlined: Story = { name: 'Side Sheet Special Pages Outlined', args: f('side', 'pages', 'large', 'outlined') };
export const SideSheetSpecialPagesFilled: Story = { name: 'Side Sheet Special Pages Filled', args: f('side', 'pages', 'large', 'filled') };
export const SideSheetSpecialAssistantOutlined: Story = { name: 'Side Sheet Special Assistant Outlined', args: f('side', 'assistant', 'large', 'outlined') };
export const SideSheetSpecialAssistantFilled: Story = { name: 'Side Sheet Special Assistant Filled', args: f('side', 'assistant', 'large', 'filled') };

export const InteractiveDrawerDemo: Story = {
  name: 'Interactive Side Sheet Drawer Demo',
  render: () => ({
    props: { open: false },
    template: `
      <div style="padding: 24px; text-align: center">
        <p style="margin-bottom: 16px; color: #454554">Click the button below to toggle the side sheet companion drawer overlay.</p>
        <kpmg-button (click)="open = true">Open Side Sheet Drawer</kpmg-button>
        <kpmg-sheets variant="side" type="assistant" size="large" [isDrawer]="true" [isOpen]="open" (sheetClose)="open = false" />
      </div>`,
  }),
};
