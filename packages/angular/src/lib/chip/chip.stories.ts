import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ChipComponent } from './chip.component';

const STAR_PATH = 'M8 1.5L9.9 5.4L14.2 6.0L11.1 9.0L11.8 13.3L8 11.3L4.2 13.3L4.9 9.0L1.8 6.0L6.1 5.4L8 1.5Z';
const DISMISS_PATH =
  'M2.58859 2.71569L2.64645 2.64645C2.82001 2.47288 3.08944 2.4536 3.28431 2.58859L3.35355 2.64645L8 7.293L12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645C13.5488 2.84171 13.5488 3.15829 13.3536 3.35355L8.707 8L13.3536 12.6464C13.5271 12.82 13.5464 13.0894 13.4114 13.2843L13.3536 13.3536C13.18 13.5271 12.9106 13.5464 12.7157 13.4114L12.6464 13.3536L8 8.707L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536C2.45118 13.1583 2.45118 12.8417 2.64645 12.6464L7.293 8L2.64645 3.35355C2.47288 3.17999 2.4536 2.91056 2.58859 2.71569L2.64645 2.64645L2.58859 2.71569Z';

type ChipStoryArgs = ChipComponent & Record<string, unknown>;

const meta: Meta<ChipStoryArgs> = {
  title: 'Components/Chip',
  component: ChipComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Chip Component
The Chip family represents compact, interactive elements for input, filtering, recommendations, and actions.

        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChipComponent] })],
  argTypes: {
    type: { control: 'select', options: ['filter', 'input', 'assistive', 'suggestion'], description: 'Chip semantic role in UI', table: { type: { summary: "'filter' | 'input' | 'assistive' | 'suggestion'" }, defaultValue: { summary: "'filter'" } } },
    styleType: { control: 'radio', options: ['outlined', 'elevated'], description: 'Visual treatment: 1px border vs elevation drop-shadow', table: { type: { summary: "'outlined' | 'elevated'" }, defaultValue: { summary: "'outlined'" } } },
    configuration: { control: 'select', options: ['Label only', 'Label and leading icon', 'Label and trailing icon', 'Label and icons', 'Icon only', 'Label and leading branded icon', 'Label and branded icons'], description: 'Slot configuration layout', table: { type: { summary: 'string' }, defaultValue: { summary: '-' } } },
    selected: { control: 'boolean', description: 'Whether chip is in active selected state', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'Disables user interaction and applies muted styling', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    state: { control: 'select', options: [undefined, 'enabled', 'hovered', 'pressed', 'dragged', 'disabled'], description: 'Forced visual state for prototype inspection', table: { type: { summary: "'enabled' | 'hovered' | 'pressed' | 'dragged' | 'disabled'" }, defaultValue: { summary: '-' } } },
    label: { control: 'text', description: 'Label text content', table: { type: { summary: 'node' }, defaultValue: { summary: "'Label'" } } },
    leadingIcon: { control: 'object', description: 'Leading icon: true for default checkmark, or custom React element', table: { type: { summary: 'bool | node' }, defaultValue: { summary: '-' } } },
    trailingIcon: { control: 'object', description: 'Trailing icon: true for default dismiss, or custom React element', table: { type: { summary: 'bool | node' }, defaultValue: { summary: '-' } } },
    iconOnly: { control: 'boolean', description: 'Renders in compact 40px icon-only layout', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    isBranded: { control: 'boolean', description: 'Uses branded document/app icon for leading icon slot', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    onDelete: { control: false, description: 'Callback fired when trailing delete/dismiss icon is clicked', table: { type: { summary: 'func' }, defaultValue: { summary: '-' } } },
    onTrailingClick: { control: false, description: 'Callback fired when trailing icon is clicked', table: { type: { summary: 'func' }, defaultValue: { summary: '-' } } },
    onClick: { control: false, description: 'Click handler for the chip itself', table: { type: { summary: 'func' }, defaultValue: { summary: '-' } } },
    onKeyDown: { control: false, description: 'Key down handler for accessibility', table: { type: { summary: 'func' }, defaultValue: { summary: '-' } } },
    className: { control: 'text', description: 'Additional CSS class names', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    style: { control: 'object', description: 'Inline style overrides', table: { type: { summary: 'object' }, defaultValue: { summary: '{ }' } } },
    id: { control: 'text', description: 'DOM ID', table: { type: { summary: 'string' }, defaultValue: { summary: '-' } } },
    'aria-label': { control: 'text', description: 'ARIA label for screen readers', table: { type: { summary: 'string' }, defaultValue: { summary: '-' } } },
  },
};

export default meta;
type Story = StoryObj<ChipStoryArgs>;

/**
 * 1. Default Interactive Playground
 */
export const Default: Story = {
  args: {
    type: 'filter',
    styleType: 'outlined',
    configuration: 'Label and icons',
    label: 'Label',
    selected: false,
    disabled: false,
    isBranded: false,
  },
  render: (args) => ({
    props: {
      ...args,
      isSelected: args.selected,
      toggle() {
        this['isSelected'] = !this['isSelected'];
      },
    },
    template: `
      <div style="padding: 24px">
        <kpmg-chip ${argsToTemplate(args, { exclude: ['selected'] })} [selected]="isSelected" interactive (chipClick)="toggle()" />
        <div style="margin-top: 16px; font-size: 12px; color: #9090a2">
          Interactive state: {{ isSelected ? 'Selected (Active)' : 'Unselected' }}
        </div>
      </div>`,
  }),
};

/**
 * 2. Complete 80 Variants Matrix for Filter Chips
 * 2 Styles (Outlined, Elevated) x 5 Configurations x 4 States x 2 Selected = 80 Variants
 */
export const FilterChips80VariantsMatrix: Story = {
  render: () => ({
    props: {
      styles: ['outlined', 'elevated'],
      selectedGroups: [false, true],
      configs: [
        { name: 'Icon only', iconOnly: true, label: 'Icon', configuration: undefined },
        { name: 'Label only', configuration: 'Label only', label: 'Label', iconOnly: undefined },
        { name: 'Label & leading icon', configuration: 'Label and leading icon', label: 'Label', iconOnly: undefined },
        { name: 'Label & trailing icon', configuration: 'Label and trailing icon', label: 'Label', iconOnly: undefined },
        { name: 'Label and icons', configuration: 'Label and icons', label: 'Label', iconOnly: undefined },
      ],
      states: ['enabled', 'hovered', 'dragged', 'disabled'],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; padding: 16px">
        @for (style of styles; track style) {
          <div style="border: 1px solid var(--color-neutral-600, #e3e3e8); border-radius: var(--radius-lg, 16px); padding: var(--spacing-6, 24px); background-color: var(--color-surface-light, #fafafb)">
            <h3 style="font-size: var(--font-size-title-lg, 18px); font-weight: var(--font-weight-semibold, 600); margin-bottom: var(--spacing-2, 8px); text-transform: capitalize; color: var(--color-on-surface, #2f2f39)">
              Filter Chips: {{ style }} Style (40 Variants)
            </h3>
            <p style="font-size: var(--font-size-body-sm, 12px); color: var(--color-on-surface-light, #9090a2); margin-bottom: var(--spacing-6, 24px)">
              Showing 5 Configurations across 4 States (Enabled, Hovered, Dragged, Disabled) for Unselected &amp; Selected.
            </p>

            @for (selected of selectedGroups; track selected) {
              <div style="margin-bottom: 32px">
                <div
                  style="display: inline-block; padding: var(--spacing-1, 4px) var(--spacing-3, 10px); border-radius: var(--radius-sm, 8px); font-weight: var(--font-weight-semibold, 600); font-size: var(--font-size-label-md, 12px); margin-bottom: var(--spacing-4, 16px)"
                  [style.background-color]="selected ? 'var(--color-chip-selected-bg, #e9eafc)' : 'var(--color-chip-bg-pressed, #f1f1f3)'"
                  [style.color]="selected ? 'var(--color-primary-on-surface, #1a28c1)' : 'var(--color-chip-text, #454554)'"
                >
                  {{ selected ? '● Selected = True (20 variants)' : '○ Selected = False (20 variants)' }}
                </div>

                <div style="overflow-x: auto">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px">
                    <thead>
                      <tr style="border-bottom: 2px solid #e3e3e8; text-align: left">
                        <th style="padding: 8px 12px; width: 100px; color: #9090a2">State</th>
                        @for (c of configs; track c.name) {
                          <th style="padding: 8px 12px; color: #454554">{{ c.name }}</th>
                        }
                      </tr>
                    </thead>
                    <tbody>
                      @for (state of states; track state) {
                        <tr style="border-bottom: 1px solid #f1f1f3">
                          <td style="padding: 12px; font-weight: 500; color: #9090a2; text-transform: capitalize">{{ state }}</td>
                          @for (config of configs; track config.name) {
                            <td style="padding: 12px">
                              <kpmg-chip
                                type="filter"
                                [styleType]="style"
                                [configuration]="config.configuration"
                                [iconOnly]="!!config.iconOnly"
                                [label]="config.label"
                                [selected]="selected"
                                [state]="$any(state)"
                                [disabled]="state === 'disabled'"
                              />
                            </td>
                          }
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
        }
      </div>`,
  }),
};

const INITIAL_TAGS = () => [
  { id: '1', label: 'Design System', branded: false },
  { id: '2', label: 'Annual_Report_2026.docx', branded: true },
  { id: '3', label: 'Audit_Findings.docx', branded: true },
  { id: '4', label: 'Client Feedback', branded: false },
];

/**
 * 3. Input Chips Showcase
 * Interactive tagging component with dismiss action and document attachments
 */
export const InputChipsShowcase: Story = {
  render: () => ({
    props: {
      tags: INITIAL_TAGS(),
      inputVal: '',
      handleAdd(e: Event) {
        e.preventDefault();
        if (!this['inputVal'].trim()) return;
        this['tags'] = [...this['tags'], { id: String(Date.now()), label: this['inputVal'].trim(), branded: false }];
        this['inputVal'] = '';
      },
      handleRemove(id: string) {
        this['tags'] = this['tags'].filter((t: { id: string }) => t.id !== id);
      },
      reset() {
        this['tags'] = INITIAL_TAGS();
      },
    },
    template: `
      <div style="padding: 24px; max-width: 720px">
        <h3 style="font-size: 18px; font-weight: 600; color: #2f2f39; margin-bottom: 8px">Input Chips</h3>
        <p style="font-size: 13px; color: #9090a2; margin-bottom: 20px">
          Interactive tagging component. Supports normal tags and branded file attachments with dismissible 'X'.
        </p>

        <div style="border: 1px solid #d5d5dc; border-radius: 12px; padding: 12px; background-color: #ffffff; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; min-height: 56px; margin-bottom: 16px">
          @for (tag of tags; track tag.id) {
            <kpmg-chip type="input" styleType="outlined" [label]="tag.label" [isBranded]="tag.branded" [trailingIcon]="true" deletable (chipDelete)="handleRemove(tag.id)" />
          }

          <form (submit)="handleAdd($event)" style="flex-grow: 1; min-width: 140px">
            <input
              type="text"
              placeholder="Type tag & press enter..."
              [value]="inputVal"
              (input)="inputVal = $any($event.target).value"
              style="border: none; outline: none; font-size: 13px; width: 100%; padding: 6px; color: #2f2f39"
            />
          </form>
        </div>

        <button
          type="button"
          (click)="reset()"
          style="padding: 6px 12px; font-size: 12px; border-radius: 6px; border: 1px solid #d5d5dc; background: #ffffff; cursor: pointer; color: #454554"
        >
          Reset Demo Tags
        </button>

        <div style="margin-top: 36px">
          <h4 style="font-size: 14px; font-weight: 600; color: #454554; margin-bottom: 12px">Input Chip Configurations:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
            <kpmg-chip type="input" configuration="Label only" label="Label only" />
            <kpmg-chip type="input" configuration="Label and leading icon" label="Leading icon" [leadingIcon]="true" />
            <kpmg-chip type="input" configuration="Label and trailing icon" label="Trailing icon" [trailingIcon]="true" />
            <kpmg-chip type="input" configuration="Label and icons" label="Both icons" [leadingIcon]="true" [trailingIcon]="true" />
            <kpmg-chip type="input" configuration="Label and leading branded icon" label="Branded leading" [isBranded]="true" />
            <kpmg-chip type="input" configuration="Label and branded icons" label="Branded + dismiss" [isBranded]="true" [trailingIcon]="true" />
          </div>
        </div>
      </div>`,
  }),
};

/**
 * 4. Assistive Chips Showcase
 * Quick action trigger chips in Outlined and Elevated styles
 */
export const AssistiveChipsShowcase: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 28px">
        <div>
          <h3 style="font-size: 18px; font-weight: 600; color: #2f2f39; margin-bottom: 6px">Assistive Chips</h3>
          <p style="font-size: 13px; color: #9090a2">Quick contextual action triggers. Available in Outlined and Elevated styles.</p>
        </div>

        <div>
          <h4 style="font-size: 14px; font-weight: 600; color: #454554; margin-bottom: 12px">Outlined Assistive Chips:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 12px">
            <kpmg-chip type="assistive" styleType="outlined" configuration="Label only" label="Bookmark" />
            <kpmg-chip type="assistive" styleType="outlined" label="Quick Action" [leadingIcon]="true" />
            <kpmg-chip type="assistive" styleType="outlined" label="Open Document" [isBranded]="true" />
            <kpmg-chip type="assistive" styleType="outlined" label="Disabled" [leadingIcon]="true" disabled />
          </div>
        </div>

        <div>
          <h4 style="font-size: 14px; font-weight: 600; color: #454554; margin-bottom: 12px">Elevated Assistive Chips:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 12px">
            <kpmg-chip type="assistive" styleType="elevated" configuration="Label only" label="Bookmark" />
            <kpmg-chip type="assistive" styleType="elevated" label="Quick Action" [leadingIcon]="true" />
            <kpmg-chip type="assistive" styleType="elevated" label="Open Document" [isBranded]="true" />
            <kpmg-chip type="assistive" styleType="elevated" label="Disabled" [leadingIcon]="true" disabled />
          </div>
        </div>
      </div>`,
  }),
};

/**
 * 5. Suggestion Chips Showcase
 * Recommendation pills for AI prompts and search suggestions
 */
export const SuggestionChipsShowcase: Story = {
  render: () => ({
    props: {
      selectedPrompt: 'Quarterly Audit',
      prompts: ['Quarterly Audit', 'Tax Compliance 2026', 'Advisory Pipeline', 'Risk Assessment'],
    },
    template: `
      <div style="padding: 24px">
        <h3 style="font-size: 18px; font-weight: 600; color: #2f2f39; margin-bottom: 6px">Suggestion Chips</h3>
        <p style="font-size: 13px; color: #9090a2; margin-bottom: 20px">
          Single-select recommendation pills for AI prompts and search suggestions.
        </p>

        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px">
          @for (p of prompts; track p) {
            <kpmg-chip
              type="suggestion"
              styleType="outlined"
              [label]="p"
              [selected]="selectedPrompt === p"
              [leadingIcon]="selectedPrompt === p"
              interactive
              (chipClick)="selectedPrompt = p"
            />
          }
        </div>

        <div style="font-size: 13px; color: #454554">Selected Prompt: <strong>{{ selectedPrompt }}</strong></div>
      </div>`,
  }),
};

/**
 * 6. Custom Icons & Custom Styling
 */
export const CustomIconsAndBadges: Story = {
  render: () => ({
    template: `
      <ng-template #starBlue><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${STAR_PATH}" fill="var(--color-blue-300, #2f3de3)" stroke="var(--color-blue-300, #2f3de3)" stroke-width="0.5" stroke-linejoin="round" /></svg></ng-template>
      <ng-template #starRed><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${STAR_PATH}" fill="var(--color-red-300, #fd349c)" stroke="var(--color-red-300, #fd349c)" stroke-width="0.5" stroke-linejoin="round" /></svg></ng-template>
      <ng-template #starAction><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${STAR_PATH}" fill="var(--color-primary-action, #1e49e2)" stroke="var(--color-primary-action, #1e49e2)" stroke-width="0.5" stroke-linejoin="round" /></svg></ng-template>
      <ng-template #dismiss><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${DISMISS_PATH}" fill="currentColor" /></svg></ng-template>
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px">
        <h3 style="font-size: 18px; font-weight: 600; color: #2f2f39">Custom Icons &amp; SVGs</h3>
        <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-3, 12px)">
          <kpmg-chip label="Favorite Filter" [leadingIcon]="starBlue" [trailingIcon]="true" />
          <kpmg-chip styleType="elevated" label="Starred Item" [leadingIcon]="starRed" [selected]="true" />
          <kpmg-chip label="Corporate Report" [isBranded]="true" [trailingIcon]="dismiss" />
          <kpmg-chip [iconOnly]="true" ariaLabel="Filter action" [trailingIcon]="starAction" />
        </div>
      </div>`,
  }),
};
