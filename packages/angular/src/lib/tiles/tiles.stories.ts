import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { TilesComponent } from './tiles.component';
import { TileHeaderComponent } from './tile-header.component';
import { TileTaskCardComponent } from './tile-task-card.component';
import { TileReferenceCardComponent } from './tile-reference-card.component';
import { TileStackedCardComponent } from './tile-stacked-card.component';

const TYPES = [
  'empty-with-missing',
  'empty',
  'empty-full',
  'configuring',
  'loading',
  'loading-full',
  'living-todo-list',
  'references',
  'learning-hub',
  'ai-forum',
  'project-tracker',
  'empty-state',
];

const meta: Meta<TilesComponent> = {
  title: 'Components/Tiles',
  component: TilesComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Tiles Component Family

The **Tiles** component family provides modular surface containers for dashboard cards, interactive widgets, task workflows, and content discovery panels.
Architected in accordance with KPMG WorkBench Design System specifications:

- **Surface Styles**: Outlined, Elevated (card drop shadow), and Filled (tinted container background).
- **Basic Tiles**:
  - **Empty with missing**: Header, alert box notification, gradient thumbnail, and empty state message.
  - **Empty**: Header, inner card container with gradient thumbnail, and empty state message.
  - **Empty Full Bleed**: Headerless full-bleed card with centered gradient thumbnail.
  - **Configuring**: Circular progress indicator with percentage completion and status subtext.
  - **Loading**: Inner container with continuous gradient shimmer skeleton.
  - **Loading Full Bleed**: Full-bleed container with continuous gradient shimmer skeleton.
- **Special Tiles**:
  - **Living To Do List**: Header, tab bar filter, task cards with checkbox controls and linear progress bars.
  - **References**: Header, document reference cards with thumbnail previews and supporting text.
  - **Learning Hub**: Header, 2-column cards with author avatar, Microsoft Word badge banner, tags, and reaction counters.
  - **AI Forum**: Header, 2-column discussion cards with author avatar, media banner, and collaborative avatar cluster.
  - **Project Tracker**: Header with navigation action, high-impact gradient milestone status panels.
  - **Empty State**: Header with navigation action, dual large empty state panels.
- **Header Subcomponent**: Default and Filled header bars supporting overflow menus and arrow action triggers.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'special'],
      description: 'The layout family variant of the tile',
      table: {
        type: {
          summary: "'basic' | 'special'",
        },
        defaultValue: {
          summary: "'basic'",
        },
      },
    },
    styleType: {
      name: 'style',
      control: 'select',
      options: ['outlined', 'elevated', 'filled'],
      description: 'Surface styling treatment: Outlined, Elevated, or Filled container',
      table: {
        type: {
          summary: "'outlined' | 'elevated' | 'filled'",
        },
        defaultValue: {
          summary: "'outlined'",
        },
      },
    },
    type: {
      control: 'select',
      options: ['empty-with-missing', 'empty', 'empty-full', 'configuring', 'loading', 'loading-full', 'living-todo-list', 'references', 'learning-hub', 'ai-forum', 'project-tracker', 'empty-state'],
      description: 'Functional content type for the tile',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'empty-with-missing'",
        },
      },
    },
    title: {
      control: 'text',
      description: 'Display title for the tile header',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Header'",
        },
      },
    },
    headerStyle: {
      control: 'select',
      options: ['default', 'filled'],
      description: 'Header style: Default (44px transparent) or Filled (76px tinted background)',
      table: {
        type: {
          summary: "'default' | 'filled'",
        },
        defaultValue: {
          summary: "'default'",
        },
      },
    },
    headerType: {
      control: 'select',
      options: ['with-menu', 'with-button'],
      description: 'Header action button type: overflow menu (3 dots) or arrow right button',
      table: {
        type: {
          summary: "'with-menu' | 'with-button'",
        },
        defaultValue: {
          summary: "'with-menu'",
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
      description: 'Progress percentage (0 - 100) for configuring ring or linear task progress',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '80',
        },
      },
    },
    alertMessage: {
      control: 'text',
      description: 'Message displayed in the alert notification banner',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Project data missing'",
        },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message displayed below empty state thumbnail',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'Empty state message'",
        },
      },
    },
    fluid: {
      control: 'boolean',
      description: 'Whether tile occupies 100% parent container width instead of fixed canonical width',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    custom: {
      table: {
        disable: true,
      },
    },
    action: {
      action: 'action',
      table: {
        disable: true,
      },
    },
    loveToggle: {
      action: 'loveToggle',
      table: {
        disable: true,
      },
    },
    wishlistToggle: {
      action: 'wishlistToggle',
      table: {
        disable: true,
      },
    },
    shareToggle: {
      action: 'shareToggle',
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TilesComponent, TileHeaderComponent, TileTaskCardComponent, TileReferenceCardComponent, TileStackedCardComponent],
    }),
  ],
  args: {
    variant: 'basic',
    styleType: 'outlined',
    type: 'empty-with-missing',
    title: 'Header',
    headerStyle: 'default',
    headerType: 'with-menu',
    progress: 80,
    alertMessage: 'Project data missing',
    emptyMessage: 'Empty state message',
    fluid: false,
  },
  render: (args) => ({ props: args, template: `<kpmg-tiles ${argsToTemplate(args)} />` }),
};

export default meta;
type Story = StoryObj<TilesComponent>;

export const Basic: Story = { name: 'Basic Interactive Playground' };

const basic = (type: string, styleType: 'outlined' | 'elevated' | 'filled', title?: string): Story => ({
  args: { variant: 'basic', styleType, type: type as any, ...(title ? { title } : {}) },
});
const special = (type: string, styleType: 'outlined' | 'elevated' | 'filled', title: string): Story => ({
  args: { variant: 'special', styleType, type: type as any, title, headerType: undefined },
});

// Basic tiles
export const BasicEmptyWithMissingOutlined: Story = basic('empty-with-missing', 'outlined', 'Header');
export const BasicEmptyWithMissingElevated: Story = basic('empty-with-missing', 'elevated', 'Header');
export const BasicEmptyWithMissingFilled: Story = basic('empty-with-missing', 'filled', 'Header');
export const BasicEmptyOutlined: Story = basic('empty', 'outlined', 'Header');
export const BasicEmptyElevated: Story = basic('empty', 'elevated', 'Header');
export const BasicEmptyFilled: Story = basic('empty', 'filled', 'Header');
export const BasicEmptyFullBleedOutlined: Story = basic('empty-full', 'outlined');
export const BasicEmptyFullBleedElevated: Story = basic('empty-full', 'elevated');
export const BasicEmptyFullBleedFilled: Story = basic('empty-full', 'filled');
export const BasicConfiguringOutlined: Story = basic('configuring', 'outlined', 'Header');
export const BasicConfiguringElevated: Story = basic('configuring', 'elevated', 'Header');
export const BasicConfiguringFilled: Story = basic('configuring', 'filled', 'Header');
export const BasicLoadingOutlined: Story = basic('loading', 'outlined', 'Header');
export const BasicLoadingElevated: Story = basic('loading', 'elevated', 'Header');
export const BasicLoadingFilled: Story = basic('loading', 'filled', 'Header');
export const BasicLoadingFullBleedOutlined: Story = basic('loading-full', 'outlined');
export const BasicLoadingFullBleedElevated: Story = basic('loading-full', 'elevated');
export const BasicLoadingFullBleedFilled: Story = basic('loading-full', 'filled');

export const BasicSurfaceShowcase: Story = {
  name: 'Basic Surface Styles Comparison',
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap">
        <kpmg-tiles variant="basic" styleType="outlined" type="empty-with-missing" title="Outlined Surface" />
        <kpmg-tiles variant="basic" styleType="elevated" type="empty-with-missing" title="Elevated Surface" />
        <kpmg-tiles variant="basic" styleType="filled" type="empty-with-missing" title="Filled Surface" />
      </div>`,
  }),
};

// Special tiles
export const SpecialLivingToDoListOutlined: Story = special('living-todo-list', 'outlined', 'Living to do list');
export const SpecialLivingToDoListElevated: Story = special('living-todo-list', 'elevated', 'Living to do list');
export const SpecialLivingToDoListFilled: Story = special('living-todo-list', 'filled', 'Living to do list');
export const SpecialReferencesOutlined: Story = special('references', 'outlined', 'Tile title');
export const SpecialReferencesElevated: Story = special('references', 'elevated', 'Tile title');
export const SpecialReferencesFilled: Story = special('references', 'filled', 'Tile title');
export const SpecialLearningHubOutlined: Story = special('learning-hub', 'outlined', 'Learning hub');
export const SpecialLearningHubElevated: Story = special('learning-hub', 'elevated', 'Learning hub');
export const SpecialLearningHubFilled: Story = special('learning-hub', 'filled', 'Learning hub');
export const SpecialAIForumOutlined: Story = special('ai-forum', 'outlined', 'AI forum');
export const SpecialAIForumElevated: Story = special('ai-forum', 'elevated', 'AI forum');
export const SpecialAIForumFilled: Story = special('ai-forum', 'filled', 'AI forum');
export const SpecialProjectTrackerOutlined: Story = special('project-tracker', 'outlined', 'Project tracker');
export const SpecialProjectTrackerElevated: Story = special('project-tracker', 'elevated', 'Project tracker');
export const SpecialProjectTrackerFilled: Story = special('project-tracker', 'filled', 'Project tracker');
export const SpecialEmptyStateOutlined: Story = special('empty-state', 'outlined', 'Tile title');
export const SpecialEmptyStateElevated: Story = special('empty-state', 'elevated', 'Tile title');
export const SpecialEmptyStateFilled: Story = special('empty-state', 'filled', 'Tile title');

// Tile header sub-component
export const HeaderDefaultWithMenu: Story = {
  name: 'Tile Header Default With Menu',
  render: () => ({
    template: `<div style="width: 420px; padding: 16px; background: #ffffff; border-radius: 12px"><kpmg-tile-header title="Header" type="with-menu" styleType="default" /></div>`,
  }),
};
export const HeaderDefaultWithButton: Story = {
  name: 'Tile Header Default With Button',
  render: () => ({
    template: `<div style="width: 420px; padding: 16px; background: #ffffff; border-radius: 12px"><kpmg-tile-header title="Tile title" type="with-button" styleType="default" /></div>`,
  }),
};
export const HeaderFilledWithMenu: Story = {
  name: 'Tile Header Filled With Menu',
  render: () => ({
    template: `<div style="width: 420px; background: #ffffff; border-radius: 12px; overflow: hidden"><kpmg-tile-header title="Header" type="with-menu" styleType="filled" /></div>`,
  }),
};
export const HeaderFilledWithButton: Story = {
  name: 'Tile Header Filled With Button',
  render: () => ({
    template: `<div style="width: 420px; background: #ffffff; border-radius: 12px; overflow: hidden"><kpmg-tile-header title="Tile title" type="with-button" styleType="filled" /></div>`,
  }),
};
