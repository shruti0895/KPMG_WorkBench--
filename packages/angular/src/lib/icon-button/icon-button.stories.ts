import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { IconButtonComponent } from './icon-button.component';

const SETTINGS_ICON =
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>';

type IconButtonStoryArgs = IconButtonComponent & Record<string, unknown>;

const meta: Meta<IconButtonStoryArgs> = {
  title: 'Components/IconButton',
  component: IconButtonComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Standalone Icon Button component scaffolded from Figma Icon buttons section (971:89961). Uses Settings/Gear icon for consistent visual representation across all variants.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [IconButtonComponent] })],
  argTypes: {
    icon: { control: false, description: 'SVG element or icon component', table: { type: { summary: 'node' }, defaultValue: { summary: '-' } } },
    children: { control: 'object', description: 'Alternative children node for icon', table: { type: { summary: 'node' }, defaultValue: { summary: '-' } } },
    variant: { control: 'select', options: ['filled', 'outline', 'standard', 'neutral'], description: 'Visual variant style matching Figma Icon buttons', table: { type: { summary: "'filled' | 'outline' | 'standard' | 'neutral'" }, defaultValue: { summary: "'filled'" } } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Scale sizing (sm: 32px, md: 40px, lg: 52px)', table: { type: { summary: "'sm' | 'md' | 'lg'" }, defaultValue: { summary: "'md'" } } },
    shape: { control: 'select', options: ['circle', 'square'], description: 'Button shape', table: { type: { summary: "'circle' | 'square'" }, defaultValue: { summary: "'circle'" } } },
    selected: { control: 'boolean', description: 'Toggle/selected state', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'Disabled state', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    'aria-label': { control: 'text', description: 'Accessible label for screen readers', table: { type: { summary: 'string' }, defaultValue: { summary: '-' } } },
    onClick: { action: 'clicked', description: 'Click handler', table: { type: { summary: 'func' } } },
    type: { control: 'select', options: ['button', 'submit', 'reset'], description: 'HTML button type', table: { type: { summary: "'button' | 'submit' | 'reset'" }, defaultValue: { summary: "'button'" } } },
    className: { control: 'text', description: 'Additional CSS class names', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
  },
  render: ({ onClick, ...args }) => ({
    props: args,
    template: `<kpmg-icon-button ${argsToTemplate(args)}>${SETTINGS_ICON}</kpmg-icon-button>`,
  }),
};

export default meta;
type Story = StoryObj<IconButtonStoryArgs>;

export const Filled: Story = { args: { variant: 'filled', ariaLabel: 'Settings' } };
export const Outline: Story = { args: { variant: 'outline', ariaLabel: 'Settings' } };
export const Standard: Story = { args: { variant: 'standard', ariaLabel: 'Settings' } };
export const Neutral: Story = { args: { variant: 'neutral', ariaLabel: 'Settings' } };

export const Toggleable: Story = {
  render: () => ({
    props: { selected: false },
    template: `
      <div style="display: flex; gap: 16px; align-items: center">
        <kpmg-icon-button variant="filled" [selected]="selected" (click)="selected = !selected" ariaLabel="Toggle Settings">${SETTINGS_ICON}</kpmg-icon-button>
        <kpmg-icon-button variant="outline" [selected]="selected" (click)="selected = !selected" ariaLabel="Toggle Settings">${SETTINGS_ICON}</kpmg-icon-button>
        <span>State: {{ selected ? 'Toggled ON' : 'Toggled OFF' }}</span>
      </div>`,
  }),
};

export const AllVariantsMatrix: Story = {
  render: () => ({
    props: { variants: [['filled', 'Filled'], ['outline', 'Outline'], ['standard', 'Standard'], ['neutral', 'Neutral']] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px">
        @for (v of variants; track v[0]) {
          <div>
            <h4 style="margin-bottom: 12px; font-family: Open Sans">{{ v[1] }}</h4>
            <div style="display: flex; gap: 12px; align-items: center">
              <kpmg-icon-button [variant]="$any(v[0])" size="sm" ariaLabel="Settings small">${SETTINGS_ICON}</kpmg-icon-button>
              <kpmg-icon-button [variant]="$any(v[0])" size="md" ariaLabel="Settings medium">${SETTINGS_ICON}</kpmg-icon-button>
              <kpmg-icon-button [variant]="$any(v[0])" size="lg" ariaLabel="Settings large">${SETTINGS_ICON}</kpmg-icon-button>
              <kpmg-icon-button [variant]="$any(v[0])" size="md" disabled ariaLabel="Settings disabled">${SETTINGS_ICON}</kpmg-icon-button>
            </div>
          </div>
        }
      </div>`,
  }),
};
