import {
  Tiles,
  TileHeader,
} from './Tiles';

export default {
  title: 'Components/Tiles',
  component: Tiles,
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
  tags: ['autodocs'],
  argTypes: {
    variant: {
      name: 'variant',
      description: 'The layout family variant of the tile',
      control: 'select',
      options: ['basic', 'special'],
      table: {
        type: { summary: "'basic' | 'special'" },
        defaultValue: { summary: "'basic'" },
      },
    },
    style: {
      name: 'style',
      description: 'Surface styling treatment: Outlined, Elevated, or Filled container',
      control: 'select',
      options: ['outlined', 'elevated', 'filled'],
      table: {
        type: { summary: "'outlined' | 'elevated' | 'filled'" },
        defaultValue: { summary: "'outlined'" },
      },
    },
    type: {
      name: 'type',
      description: 'Functional content type for the tile',
      control: 'select',
      options: [
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
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'empty-with-missing'" },
      },
    },
    title: {
      name: 'title',
      description: 'Display title for the tile header',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Header'" },
      },
    },
    headerStyle: {
      name: 'headerStyle',
      description: 'Header style: Default (44px transparent) or Filled (76px tinted background)',
      control: 'select',
      options: ['default', 'filled'],
      table: {
        type: { summary: "'default' | 'filled'" },
        defaultValue: { summary: "'default'" },
      },
    },
    headerType: {
      name: 'headerType',
      description: 'Header action button type: overflow menu (3 dots) or arrow right button',
      control: 'select',
      options: ['with-menu', 'with-button'],
      table: {
        type: { summary: "'with-menu' | 'with-button'" },
        defaultValue: { summary: "'with-menu'" },
      },
    },
    progress: {
      name: 'progress',
      description: 'Progress percentage (0 - 100) for configuring ring or linear task progress',
      control: { type: 'range', min: 0, max: 100, step: 5 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '80' },
      },
    },
    alertMessage: {
      name: 'alertMessage',
      description: 'Message displayed in the alert notification banner',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Project data missing'" },
      },
    },
    emptyMessage: {
      name: 'emptyMessage',
      description: 'Message displayed below empty state thumbnail',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Empty state message'" },
      },
    },
    fluid: {
      name: 'fluid',
      description: 'Whether tile occupies 100% parent container width instead of fixed canonical width',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onAction: {
      name: 'onAction',
      description: 'Callback fired when header action button is clicked',
      action: 'onAction',
      table: {
        type: { summary: 'function' },
      },
    },
    onLoveToggle: {
      name: 'onLoveToggle',
      description: 'Callback fired when love (heart) reaction is clicked/unclicked',
      action: 'onLoveToggle',
      table: {
        type: { summary: 'function' },
      },
    },
    onWishlistToggle: {
      name: 'onWishlistToggle',
      description: 'Callback fired when wishlist (bookmark) reaction is clicked/unclicked',
      action: 'onWishlistToggle',
      table: {
        type: { summary: 'function' },
      },
    },
    onShareToggle: {
      name: 'onShareToggle',
      description: 'Callback fired when share reaction is clicked/unclicked',
      action: 'onShareToggle',
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
    variant: 'basic',
    style: 'outlined',
    type: 'empty-with-missing',
    title: 'Header',
    headerStyle: 'default',
    headerType: 'with-menu',
    progress: 80,
    alertMessage: 'Project data missing',
    emptyMessage: 'Empty state message',
    fluid: false,
  },
  render: (args) => <Tiles {...args} />,
};

/* ==========================================================================
   BASIC TILES - CANONICAL TYPES & STYLES
   ========================================================================== */

export const BasicEmptyWithMissingOutlined = {
  name: 'Basic Empty With Missing Outlined',
  args: {
    variant: 'basic',
    style: 'outlined',
    type: 'empty-with-missing',
    title: 'Header',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicEmptyWithMissingElevated = {
  name: 'Basic Empty With Missing Elevated',
  args: {
    variant: 'basic',
    style: 'elevated',
    type: 'empty-with-missing',
    title: 'Header',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicEmptyWithMissingFilled = {
  name: 'Basic Empty With Missing Filled',
  args: {
    variant: 'basic',
    style: 'filled',
    type: 'empty-with-missing',
    title: 'Header',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicEmptyOutlined = {
  name: 'Basic Empty Outlined',
  args: {
    variant: 'basic',
    style: 'outlined',
    type: 'empty',
    title: 'Header',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicEmptyElevated = {
  name: 'Basic Empty Elevated',
  args: {
    variant: 'basic',
    style: 'elevated',
    type: 'empty',
    title: 'Header',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicEmptyFilled = {
  name: 'Basic Empty Filled',
  args: {
    variant: 'basic',
    style: 'filled',
    type: 'empty',
    title: 'Header',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicEmptyFullBleedOutlined = {
  name: 'Basic Empty Full Bleed Outlined',
  args: {
    variant: 'basic',
    style: 'outlined',
    type: 'empty-full',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicEmptyFullBleedElevated = {
  name: 'Basic Empty Full Bleed Elevated',
  args: {
    variant: 'basic',
    style: 'elevated',
    type: 'empty-full',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicEmptyFullBleedFilled = {
  name: 'Basic Empty Full Bleed Filled',
  args: {
    variant: 'basic',
    style: 'filled',
    type: 'empty-full',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicConfiguringOutlined = {
  name: 'Basic Configuring Outlined',
  args: {
    variant: 'basic',
    style: 'outlined',
    type: 'configuring',
    title: 'Header',
    progress: 80,
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicConfiguringElevated = {
  name: 'Basic Configuring Elevated',
  args: {
    variant: 'basic',
    style: 'elevated',
    type: 'configuring',
    title: 'Header',
    progress: 80,
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicConfiguringFilled = {
  name: 'Basic Configuring Filled',
  args: {
    variant: 'basic',
    style: 'filled',
    type: 'configuring',
    title: 'Header',
    progress: 80,
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicLoadingOutlined = {
  name: 'Basic Loading Outlined',
  args: {
    variant: 'basic',
    style: 'outlined',
    type: 'loading',
    title: 'Header',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicLoadingElevated = {
  name: 'Basic Loading Elevated',
  args: {
    variant: 'basic',
    style: 'elevated',
    type: 'loading',
    title: 'Header',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicLoadingFilled = {
  name: 'Basic Loading Filled',
  args: {
    variant: 'basic',
    style: 'filled',
    type: 'loading',
    title: 'Header',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicLoadingFullBleedOutlined = {
  name: 'Basic Loading Full Bleed Outlined',
  args: {
    variant: 'basic',
    style: 'outlined',
    type: 'loading-full',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicLoadingFullBleedElevated = {
  name: 'Basic Loading Full Bleed Elevated',
  args: {
    variant: 'basic',
    style: 'elevated',
    type: 'loading-full',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicLoadingFullBleedFilled = {
  name: 'Basic Loading Full Bleed Filled',
  args: {
    variant: 'basic',
    style: 'filled',
    type: 'loading-full',
  },
  render: (args) => <Tiles {...args} />,
};

export const BasicSurfaceShowcase = {
  name: 'Basic Surface Styles Comparison',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Tiles
        variant="basic"
        style="outlined"
        type="empty-with-missing"
        title="Outlined Surface"
      />
      <Tiles
        variant="basic"
        style="elevated"
        type="empty-with-missing"
        title="Elevated Surface"
      />
      <Tiles
        variant="basic"
        style="filled"
        type="empty-with-missing"
        title="Filled Surface"
      />
    </div>
  ),
};

/* ==========================================================================
   SPECIAL TILES - CANONICAL TYPES & STYLES
   ========================================================================== */

export const SpecialLivingToDoListOutlined = {
  name: 'Special Living To Do List Outlined',
  args: {
    variant: 'special',
    style: 'outlined',
    type: 'living-todo-list',
    title: 'Living to do list',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialLivingToDoListElevated = {
  name: 'Special Living To Do List Elevated',
  args: {
    variant: 'special',
    style: 'elevated',
    type: 'living-todo-list',
    title: 'Living to do list',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialLivingToDoListFilled = {
  name: 'Special Living To Do List Filled',
  args: {
    variant: 'special',
    style: 'filled',
    type: 'living-todo-list',
    title: 'Living to do list',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialReferencesOutlined = {
  name: 'Special References Outlined',
  args: {
    variant: 'special',
    style: 'outlined',
    type: 'references',
    title: 'Tile title',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialReferencesElevated = {
  name: 'Special References Elevated',
  args: {
    variant: 'special',
    style: 'elevated',
    type: 'references',
    title: 'Tile title',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialReferencesFilled = {
  name: 'Special References Filled',
  args: {
    variant: 'special',
    style: 'filled',
    type: 'references',
    title: 'Tile title',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialLearningHubOutlined = {
  name: 'Special Learning Hub Outlined',
  args: {
    variant: 'special',
    style: 'outlined',
    type: 'learning-hub',
    title: 'Learning hub',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialLearningHubElevated = {
  name: 'Special Learning Hub Elevated',
  args: {
    variant: 'special',
    style: 'elevated',
    type: 'learning-hub',
    title: 'Learning hub',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialLearningHubFilled = {
  name: 'Special Learning Hub Filled',
  args: {
    variant: 'special',
    style: 'filled',
    type: 'learning-hub',
    title: 'Learning hub',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialAIForumOutlined = {
  name: 'Special AI Forum Outlined',
  args: {
    variant: 'special',
    style: 'outlined',
    type: 'ai-forum',
    title: 'AI forum',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialAIForumElevated = {
  name: 'Special AI Forum Elevated',
  args: {
    variant: 'special',
    style: 'elevated',
    type: 'ai-forum',
    title: 'AI forum',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialAIForumFilled = {
  name: 'Special AI Forum Filled',
  args: {
    variant: 'special',
    style: 'filled',
    type: 'ai-forum',
    title: 'AI forum',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialProjectTrackerOutlined = {
  name: 'Special Project Tracker Outlined',
  args: {
    variant: 'special',
    style: 'outlined',
    type: 'project-tracker',
    title: 'Project tracker',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialProjectTrackerElevated = {
  name: 'Special Project Tracker Elevated',
  args: {
    variant: 'special',
    style: 'elevated',
    type: 'project-tracker',
    title: 'Project tracker',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialProjectTrackerFilled = {
  name: 'Special Project Tracker Filled',
  args: {
    variant: 'special',
    style: 'filled',
    type: 'project-tracker',
    title: 'Project tracker',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialEmptyStateOutlined = {
  name: 'Special Empty State Outlined',
  args: {
    variant: 'special',
    style: 'outlined',
    type: 'empty-state',
    title: 'Tile title',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialEmptyStateElevated = {
  name: 'Special Empty State Elevated',
  args: {
    variant: 'special',
    style: 'elevated',
    type: 'empty-state',
    title: 'Tile title',
  },
  render: (args) => <Tiles {...args} />,
};

export const SpecialEmptyStateFilled = {
  name: 'Special Empty State Filled',
  args: {
    variant: 'special',
    style: 'filled',
    type: 'empty-state',
    title: 'Tile title',
  },
  render: (args) => <Tiles {...args} />,
};

/* ==========================================================================
   SUBCOMPONENT STORIES: TILE HEADERS
   ========================================================================== */

export const HeaderDefaultWithMenu = {
  name: 'Tile Header Default With Menu',
  render: () => (
    <div style={{ width: '420px', padding: '16px', background: '#ffffff', borderRadius: '12px' }}>
      <TileHeader title="Header" type="with-menu" style="default" />
    </div>
  ),
};

export const HeaderDefaultWithButton = {
  name: 'Tile Header Default With Button',
  render: () => (
    <div style={{ width: '420px', padding: '16px', background: '#ffffff', borderRadius: '12px' }}>
      <TileHeader title="Tile title" type="with-button" style="default" />
    </div>
  ),
};

export const HeaderFilledWithMenu = {
  name: 'Tile Header Filled With Menu',
  render: () => (
    <div style={{ width: '420px', background: '#ffffff', borderRadius: '12px', overflow: 'hidden' }}>
      <TileHeader title="Header" type="with-menu" style="filled" />
    </div>
  ),
};

export const HeaderFilledWithButton = {
  name: 'Tile Header Filled With Button',
  render: () => (
    <div style={{ width: '420px', background: '#ffffff', borderRadius: '12px', overflow: 'hidden' }}>
      <TileHeader title="Tile title" type="with-button" style="filled" />
    </div>
  ),
};
