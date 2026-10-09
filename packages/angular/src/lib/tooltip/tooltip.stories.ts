import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { TooltipComponent } from './tooltip.component';

const STATIC_WRAPPER_STYLE =
  'padding: 40px; background: var(--color-surface, #ffffff); display: inline-flex; align-items: center; justify-content: center';

/** React `StaticWrapper`. */
const wrap = (inner: string): string => `<div style="${STATIC_WRAPPER_STYLE}">${inner}</div>`;

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  decorators: [moduleMetadata({ imports: [TooltipComponent, ButtonComponent, IconButtonComponent] })],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Tooltip Component Family

The **Tooltip** component family provides modular contextual descriptions, interactive option dropdowns, and rich preview overlays anchored to UI triggers.
Architected in accordance with KPMG WorkBench Design System canonical specifications (Figma Component Set):

- **4 Core Variant Types**:
  - **Base Small**: Single-line compact label container with centered or offset caret.
  - **Base Large**: Multi-line description container supporting 4-directional carets (Top, Bottom, Side Left, Side Right).
  - **Rich**: High-density informative card featuring Title, Descriptive body, and paired Action buttons.
  - **Menu**: Action dropdown list featuring interactive checkboxes, options, and dividers.
- **Surface Themes**:
  - **Elevated**: Crisp surface container with soft drop shadow.
  - **Filled**: Tinted container with soft drop shadow.
- **Directional Positions & Alignments**:
  - **Top & Bottom**: Left, Center, Right alignments.
  - **Side Left & Side Right**: Top, Middle, Bottom alignments.
- **Token-Driven Architecture**: All widths, heights, radii, paddings, and colors are bound to design system CSS tokens.
        `,
      },
    },
  },
  tags: ['autodocs'],
  // Declares the arg keys in React's prop-table order so the Docs table lists them identically.
  args: {
    children: undefined,
    type: undefined,
    variant: undefined,
    position: undefined,
    placement: undefined,
    alignment: undefined,
    align: undefined,
    theme: undefined,
    caret: undefined,
    caretSize: undefined,
    title: undefined,
    description: undefined,
    content: undefined,
    text: undefined,
    secondaryText: undefined,
    actions: undefined,
    items: undefined,
    onItemClick: undefined,
    menuDensity: undefined,
    menuType: undefined,
    selectedValues: undefined,
    defaultSelectedValues: undefined,
    onSelect: undefined,
    menuProps: undefined,
    trigger: undefined,
    open: undefined,
    defaultOpen: undefined,
    onOpenChange: undefined,
    delay: undefined,
    closeDelay: undefined,
    static: undefined,
    width: undefined,
    minWidth: undefined,
    maxWidth: undefined,
    className: undefined,
    style: undefined,
    id: undefined,
  } as unknown as Meta<TooltipComponent>['args'],
  // Mirrors the React argTypes/propTypes table (incl. React-only props such as children/style).
  argTypes: {
    children: {
      description: 'The anchor trigger element that invokes the tooltip',
      control: 'object',
      table: {
        type: { summary: 'node' },
      },
    },
    type: {
      name: 'type',
      description: 'Canonical tooltip variant type',
      control: 'select',
      options: ['base-small', 'base-large', 'rich', 'menu'],
      table: {
        type: { summary: "'base-small' | 'base-large' | 'rich' | 'menu'" },
        defaultValue: { summary: "'base-small'" },
      },
    },
    variant: {
      description: 'Backward-compatible alias for type',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    position: {
      name: 'position',
      description: 'Caret edge position on the tooltip container',
      control: 'select',
      options: ['top', 'bottom', 'side-l', 'side-r'],
      table: {
        type: { summary: "'top' | 'bottom' | 'side-l' | 'side-r'" },
        defaultValue: { summary: "'top'" },
      },
    },
    placement: {
      description: 'Placement relative to target trigger element in interactive mode: \'top\' | \'bottom\' | \'left\' | \'right\'',
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
      table: {
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
      },
    },
    alignment: {
      name: 'alignment',
      description: 'Caret alignment along the container edge',
      control: 'select',
      options: ['left', 'center', 'right', 'top', 'middle', 'bottom'],
      table: {
        type: { summary: "'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'" },
        defaultValue: { summary: "'center'" },
      },
    },
    align: {
      description: 'Backward-compatible alias for alignment',
      control: 'select',
      options: ['left', 'center', 'right', 'top', 'middle', 'bottom'],
      table: {
        type: { summary: "'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'" },
      },
    },
    theme: {
      name: 'theme',
      description: 'Surface styling treatment: elevated (white card) or filled (tinted card)',
      control: 'select',
      options: ['elevated', 'filled'],
      table: {
        type: { summary: "'elevated' | 'filled'" },
        defaultValue: { summary: "'elevated'" },
      },
    },
    caret: {
      name: 'caret',
      description: 'Whether to display the directional arrow caret',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    caretSize: {
      description: 'Size of caret arrow: sm (12x6), md (18x9), lg (24x12)',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    title: {
      name: 'title',
      description: 'Header title text for Rich variant',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      name: 'description',
      description: 'Body description text for Rich or Base Large variants',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    content: {
      description: 'Content text or node for tooltips',
      control: 'object',
      table: {
        type: { summary: 'node' },
      },
    },
    text: {
      name: 'text',
      description: 'Label text for Base Small variant',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    secondaryText: {
      description: 'Secondary section text for rich tooltips',
      control: 'object',
      table: {
        type: { summary: 'node' },
      },
    },
    actions: {
      description: 'Action buttons array or custom node for rich tooltips',
      control: 'object',
      table: {
        type: { summary: 'array | node' },
      },
    },
    items: {
      description: 'Items list array for menu tooltips',
      control: 'object',
      table: {
        type: { summary: 'object[]' },
      },
    },
    onItemClick: {
      description: 'Callback fired when a menu item is clicked',
      control: false,
      table: {
        type: { summary: 'func' },
      },
    },
    menuDensity: {
      description: 'Menu density for menu tooltip variant (\'small\' | \'medium\' | \'large\')',
      control: 'radio',
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: "'small'" },
      },
    },
    menuType: {
      description: 'Menu type for menu tooltip variant (\'checklist\' | \'item-list\')',
      control: 'radio',
      options: ['checklist', 'item-list'],
      table: {
        type: { summary: "'checklist' | 'item-list'" },
        defaultValue: { summary: "'checklist'" },
      },
    },
    selectedValues: {
      description: 'Selected values array for menu tooltip',
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    defaultSelectedValues: {
      description: 'Default selected values array for menu tooltip',
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    onSelect: {
      description: 'Callback fired when a menu item selection changes',
      control: false,
      table: {
        type: { summary: 'func' },
      },
    },
    menuProps: {
      description: 'Additional props passed to DropdownItemGroup',
      control: 'object',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{ }' },
      },
    },
    trigger: {
      name: 'trigger',
      description: 'Interactive mode for trigger anchor: hover, click, or manual',
      control: 'select',
      options: ['hover', 'click', 'manual'],
      table: {
        type: { summary: "'hover' | 'click' | 'manual'" },
        defaultValue: { summary: "'hover'" },
      },
    },
    open: {
      description: 'Controlled open state',
      control: 'boolean',
      table: {
        type: { summary: 'bool' },
      },
    },
    defaultOpen: {
      description: 'Initial open state when uncontrolled',
      control: 'boolean',
      table: {
        type: { summary: 'bool' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      description: 'Callback fired when open state changes',
      control: false,
      table: {
        type: { summary: 'func' },
      },
    },
    delay: {
      description: 'Milliseconds delay before opening on hover',
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '150' },
      },
    },
    closeDelay: {
      description: 'Milliseconds delay before closing on mouseleave',
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '150' },
      },
    },
    static: {
      description: 'Render as a static inline element without target wrapper',
      control: 'boolean',
      table: {
        type: { summary: 'bool' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      description: 'Explicit container width override',
      control: 'object',
      table: {
        type: { summary: 'string | number' },
      },
    },
    minWidth: {
      description: 'Explicit container min-width override',
      control: 'object',
      table: {
        type: { summary: 'string | number' },
      },
    },
    maxWidth: {
      description: 'Explicit container max-width override',
      control: 'object',
      table: {
        type: { summary: 'string | number' },
      },
    },
    className: {
      description: 'Additional CSS class',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    style: {
      description: 'Inline style overrides',
      control: 'object',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{ }' },
      },
    },
    id: {
      description: 'Explicit HTML ID',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  } as unknown as Meta<TooltipComponent>['argTypes'],
};

export default meta;
type Story = StoryObj<TooltipComponent>;

/* ==========================================================================
   PRIMARY INTERACTIVE PLAYGROUND STORY (AUTODOCS TOP)
   ========================================================================== */

export const DefaultPlayground: Story = {
  args: {
    type: 'base-small',
    position: 'top',
    alignment: 'center',
    theme: 'elevated',
    text: 'Tooltip text',
    static: true,
  } as Story['args'],
  render: (allArgs) => {
    const { static: _static, ...args } = allArgs as Record<string, unknown>;
    return {
    props: args,
    template: wrap(`<kpmg-tooltip static ${argsToTemplate(args)} />`),
    };
  },
};

// SECTION 1: BASE SMALL

export const BaseSmallTopLeft: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-small" position="top" alignment="left" text="Tooltip text" />`) }),
};

export const BaseSmallTopCenter: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-small" position="top" alignment="center" text="Tooltip text" />`) }),
};

export const BaseSmallTopRight: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-small" position="top" alignment="right" text="Tooltip text" />`) }),
};

export const BaseSmallBottomLeft: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-small" position="bottom" alignment="left" text="Tooltip text" />`) }),
};

export const BaseSmallBottomCenter: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-small" position="bottom" alignment="center" text="Tooltip text" />`) }),
};

export const BaseSmallBottomRight: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-small" position="bottom" alignment="right" text="Tooltip text" />`) }),
};

// SECTION 2: BASE LARGE

export const BaseLargeTopLeft: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="top" alignment="left" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeTopCenter: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="top" alignment="center" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeTopRight: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="top" alignment="right" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeBottomLeft: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="bottom" alignment="left" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeBottomCenter: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="bottom" alignment="center" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeBottomRight: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="bottom" alignment="right" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeSideLeftTop: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="side-l" alignment="top" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeSideLeftMiddle: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="side-l" alignment="middle" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeSideLeftBottom: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="side-l" alignment="bottom" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeSideRightTop: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="side-r" alignment="top" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeSideRightMiddle: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="side-r" alignment="middle" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const BaseLargeSideRightBottom: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="base-large" position="side-r" alignment="bottom" description="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

// SECTION 3: RICH

export const RichTopLeft: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="top" alignment="left" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichTopCenter: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="top" alignment="center" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichTopRight: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="top" alignment="right" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichBottomLeft: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="bottom" alignment="left" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichBottomCenter: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="bottom" alignment="center" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichBottomRight: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="bottom" alignment="right" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichSideLeftTop: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="side-l" alignment="top" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichSideLeftMiddle: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="side-l" alignment="middle" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichSideLeftBottom: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="side-l" alignment="bottom" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichSideRightTop: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="side-r" alignment="top" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichSideRightMiddle: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="side-r" alignment="middle" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

export const RichSideRightBottom: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="rich" position="side-r" alignment="bottom" [title]="'Title'" description="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />`) }),
};

// SECTION 4: MENU

export const MenuTopLeft: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="menu" position="top" alignment="left" />`) }),
};

export const MenuTopCenter: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="menu" position="top" alignment="center" />`) }),
};

export const MenuTopRight: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="menu" position="top" alignment="right" />`) }),
};

export const MenuBottomLeft: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="menu" position="bottom" alignment="left" />`) }),
};

export const MenuBottomCenter: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="menu" position="bottom" alignment="center" />`) }),
};

export const MenuBottomRight: Story = {
  render: () => ({ template: wrap(`<kpmg-tooltip static type="menu" position="bottom" alignment="right" />`) }),
};

/* ==========================================================================
   SECTION 5: THEME COMPARISONS (Elevated vs Filled)
   ========================================================================== */

export const ThemeComparison: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; padding: 32px; background: #fafafb; align-items: flex-start">
        <div style="display: flex; flex-direction: column; gap: 16px; align-items: center">
          <span style="font-size: 13px; font-weight: 600; color: #68687a">Elevated Surface</span>
          <kpmg-tooltip static theme="elevated" type="rich" position="top" alignment="center" [title]="'Elevated Theme'" description="Crisp white surface container with soft drop shadow." />
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px; align-items: center">
          <span style="font-size: 13px; font-weight: 600; color: #68687a">Filled Surface</span>
          <kpmg-tooltip static theme="filled" type="rich" position="top" alignment="center" [title]="'Filled Theme'" description="Tinted lavender surface container with soft drop shadow." />
        </div>
      </div>`,
  }),
};

/* ==========================================================================
   SECTION 6: INTERACTIVE TRIGGER STORIES
   ========================================================================== */

export const InteractiveHoverTrigger: Story = {
  render: () => ({
    template: `
      <div style="padding: 80px 40px; display: flex; justify-content: center">
        <kpmg-tooltip type="base-small" placement="top" text="Interactive button tooltip" trigger="hover">
          <kpmg-button variant="primary">Hover Over Me</kpmg-button>
        </kpmg-tooltip>
      </div>`,
  }),
};

const buildMenuItems = (selectedId: string) => [
  { id: '1', label: 'Option 1', checked: selectedId === '1' },
  { id: 'div-1', divider: true },
  { id: '2', label: 'Option 2', checked: selectedId === '2' },
  { id: '3', label: 'Option 3', checked: selectedId === '3' },
  { id: '4', label: 'Option 4', checked: selectedId === '4' },
  { id: 'div-2', divider: true },
  { id: '5', label: 'Option 5', checked: selectedId === '5' },
];

export const InteractiveClickMenuTrigger: Story = {
  render: () => ({
    props: {
      selectableItems: buildMenuItems('1'),
      onItemClick(this: { selectableItems: unknown[] }, e: { item: { value?: string } }) {
        this.selectableItems = buildMenuItems(e.item.value ?? '1');
      },
    },
    template: `
      <div style="padding: 40px; display: flex; justify-content: center">
        <kpmg-tooltip type="menu" placement="bottom" trigger="click" [items]="selectableItems" (itemClick)="onItemClick($event)">
          <kpmg-button variant="outline">Click To Open Menu</kpmg-button>
        </kpmg-tooltip>
      </div>`,
  }),
};

export const InteractiveRichTrigger: Story = {
  render: () => ({
    props: {
      actions: [
        { label: 'Confirm', variant: 'primary', onClick: () => alert('Confirmed!') },
        { label: 'Dismiss', variant: 'outline', onClick: () => alert('Dismissed') },
      ],
    },
    template: `
      <div style="padding: 80px 40px; display: flex; justify-content: center">
        <kpmg-tooltip
          type="rich"
          placement="bottom"
          trigger="click"
          [title]="'Project Configuration'"
          description="Review all settings before applying adjustments to your environment."
          [actions]="actions"
        >
          <kpmg-icon-button ariaLabel="Project Information">ℹ️</kpmg-icon-button>
        </kpmg-tooltip>
      </div>`,
  }),
};

/* ==========================================================================
   SECTION 7: COMPLETE CANONICAL VARIANTS GALLERY
   ========================================================================== */

const galleryItem = (label: string, tooltip: string): string => `
          <div>
            <span style="font-size: 12px; color: #68687a; display: block; margin-bottom: 8px">${label}</span>
            ${tooltip}
          </div>`;

const gallerySection = (heading: string, items: string[]): string => `
      <section>
        <h3 style="font-size: 18px; font-weight: 700; color: #2f2f39; margin-bottom: 16px">${heading}</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start">${items.join('')}
        </div>
      </section>`;

const GAL_LARGE = 'Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit.';
const GAL_RICH = 'Supporting text. Lorem ipsum dolor sit amet, consectetur elit.';
const gtt = (type: string, position: string, alignment: string, extra = ''): string =>
  `<kpmg-tooltip static type="${type}" position="${position}" alignment="${alignment}"${extra} />`;

export const AllCanonicalVariantsGallery: Story = {
  render: () => ({
    template: `
    <div style="padding: 32px; display: flex; flex-direction: column; gap: 48px; background: #f8f8fa">
      ${gallerySection('Base Small Variants', [
        galleryItem('Top Left', gtt('base-small', 'top', 'left', ' text="Tooltip text"')),
        galleryItem('Top Center', gtt('base-small', 'top', 'center', ' text="Tooltip text"')),
        galleryItem('Top Right', gtt('base-small', 'top', 'right', ' text="Tooltip text"')),
        galleryItem('Bottom Left', gtt('base-small', 'bottom', 'left', ' text="Tooltip text"')),
        galleryItem('Bottom Center', gtt('base-small', 'bottom', 'center', ' text="Tooltip text"')),
        galleryItem('Bottom Right', gtt('base-small', 'bottom', 'right', ' text="Tooltip text"')),
      ])}
      ${gallerySection('Base Large Variants', [
        galleryItem('Top Center', gtt('base-large', 'top', 'center', ` description="${GAL_LARGE}"`)),
        galleryItem('Bottom Center', gtt('base-large', 'bottom', 'center', ` description="${GAL_LARGE}"`)),
        galleryItem('Side Left Middle', gtt('base-large', 'side-l', 'middle', ` description="${GAL_LARGE}"`)),
        galleryItem('Side Right Middle', gtt('base-large', 'side-r', 'middle', ` description="${GAL_LARGE}"`)),
      ])}
      ${gallerySection('Rich Variants', [
        galleryItem('Top Center', gtt('rich', 'top', 'center', ` [title]="'Title'" description="${GAL_RICH}"`)),
        galleryItem('Bottom Center', gtt('rich', 'bottom', 'center', ` [title]="'Title'" description="${GAL_RICH}"`)),
        galleryItem('Side Left Middle', gtt('rich', 'side-l', 'middle', ` [title]="'Title'" description="${GAL_RICH}"`)),
        galleryItem('Side Right Middle', gtt('rich', 'side-r', 'middle', ` [title]="'Title'" description="${GAL_RICH}"`)),
      ])}
      ${gallerySection('Menu Variants', [
        galleryItem('Top Center', gtt('menu', 'top', 'center')),
        galleryItem('Bottom Center', gtt('menu', 'bottom', 'center')),
        galleryItem('Top Left', gtt('menu', 'top', 'left')),
        galleryItem('Bottom Right', gtt('menu', 'bottom', 'right')),
      ])}
    </div>`,
  }),
};
