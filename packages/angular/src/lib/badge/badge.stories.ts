import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from './badge.component';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

const BELL_PATH =
  'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z';
const MAIL_PATH =
  'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z';

type BadgeStoryArgs = BadgeComponent & Record<string, unknown>;

const meta: Meta<BadgeStoryArgs> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Badge Component

The Badge component provides compact visual feedback, notification indicators, and numeric count tags.
Supports all 12 design system variants:
- **3 Sizes**: Small, Medium, Large
- **2 Color Styles**: Primary (brand blue), Neutral (grayscale)
- **2 States / Intensities**: Quiet (subtle container fill), Loud (high contrast fill)
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [BadgeComponent, ButtonComponent, IconButtonComponent] })],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Size of the badge', table: { type: { summary: "'small' | 'medium' | 'large'" }, defaultValue: { summary: "'medium'" } } },
    styleType: { control: 'select', options: ['primary', 'neutral'], description: 'Color theme palette', table: { type: { summary: "'primary' | 'neutral'" }, defaultValue: { summary: "'primary'" } } },
    variant: { control: 'select', options: ['primary', 'neutral'], description: 'Alias for styleType', table: { type: { summary: "'primary' | 'neutral'" }, defaultValue: { summary: '-' } } },
    state: { control: 'select', options: ['quiet', 'loud'], description: 'Visual intensity', table: { type: { summary: "'loud' | 'quiet'" }, defaultValue: { summary: "'loud'" } } },
    intensity: { control: 'select', options: ['loud', 'quiet'], description: 'Alias for state', table: { type: { summary: "'loud' | 'quiet'" }, defaultValue: { summary: '-' } } },
    count: { control: 'number', description: 'Numeric value to display', table: { type: { summary: 'node' }, defaultValue: { summary: '-' } } },
    maxCount: { control: 'number', description: 'Threshold above which ${maxCount}+ is rendered', table: { type: { summary: 'number' }, defaultValue: { summary: '99' } } },
    showZero: { control: 'boolean', description: 'Whether to show badge when count is zero', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    dot: { control: 'boolean', description: 'Renders badge as empty dot indicator', table: { type: { summary: 'bool' }, defaultValue: { summary: 'false' } } },
    label: { control: 'object', description: 'Custom label content', table: { type: { summary: 'node' }, defaultValue: { summary: '-' } } },
    children: { control: 'object', description: 'Child component to anchor the badge onto', table: { type: { summary: 'node' }, defaultValue: { summary: '-' } } },
    placement: { control: 'select', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'], description: 'Corner placement when anchoring to children', table: { type: { summary: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'" }, defaultValue: { summary: "'top-right'" } } },
    overlap: { control: 'boolean', description: 'Force overlapping mode', table: { type: { summary: 'bool' }, defaultValue: { summary: '-' } } },
    className: { control: 'text', description: 'Additional CSS class name', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    style: { control: 'object', description: 'Inline style overrides', table: { type: { summary: 'object' }, defaultValue: { summary: '{ }' } } },
    'aria-label': { control: 'text', description: 'ARIA label for screen readers', table: { type: { summary: 'string' }, defaultValue: { summary: '-' } } },
  },
};

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

/**
 * 1. Default Interactive Playground
 */
export const Default: Story = {
  args: {
    size: 'medium',
    styleType: 'primary',
    state: 'loud',
    count: 5,
    maxCount: 99,
    dot: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: var(--spacing-6, 24px)">
        <kpmg-badge ${argsToTemplate(args)} />
      </div>`,
  }),
};

/**
 * 2. Complete 12 Variants Matrix
 * 3 Sizes (Small, Medium, Large) × 2 Styles (Primary, Neutral) × 2 States (Quiet, Loud) = 12 Variants
 */
export const Complete12VariantsMatrix: Story = {
  render: () => ({
    props: {
      sizes: [
        { id: 'small', label: 'Small (6px Dot)', sample: undefined },
        { id: 'medium', label: 'Medium (16px)', sample: '12' },
        { id: 'large', label: 'Large (24px)', sample: '99+' },
      ],
      variants: [
        { style: 'neutral', state: 'quiet', title: 'Neutral Quiet' },
        { style: 'neutral', state: 'loud', title: 'Neutral Loud' },
        { style: 'primary', state: 'quiet', title: 'Primary Quiet' },
        { style: 'primary', state: 'loud', title: 'Primary Loud' },
      ],
    },
    template: `
      <div style="padding: var(--spacing-6, 24px)">
        <h3 style="font-size: var(--font-size-title-lg, 18px); font-weight: var(--font-weight-semibold, 600); color: var(--color-on-surface, #2f2f39); margin-bottom: var(--spacing-2, 8px)">
          All 12 Badge Variants Matrix
        </h3>
        <p style="font-size: var(--font-size-body-sm, 12px); color: var(--color-on-surface-light, #9090a2); margin-bottom: var(--spacing-6, 24px)">
          Complete design system matrix showing 3 Sizes across Neutral and Primary color styles in Quiet and Loud states.
        </p>

        <div style="overflow-x: auto">
          <table style="width: 100%; max-width: 800px; border-collapse: collapse; border: 1px solid var(--color-neutral-600, #e3e3e8); border-radius: var(--radius-md, 12px); overflow: hidden; background-color: var(--color-surface, #ffffff)">
            <thead>
              <tr style="background-color: var(--color-surface-light, #f7f7f8); border-bottom: 2px solid var(--color-neutral-600, #e3e3e8)">
                <th style="padding: 12px 16px; text-align: left; font-size: 13px; color: var(--color-on-surface, #2f2f39)">
                  Variant (Style &bull; State)
                </th>
                @for (s of sizes; track s.id) {
                  <th style="padding: 12px 16px; text-align: center; font-size: 13px; color: var(--color-on-surface, #2f2f39)">{{ s.label }}</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (v of variants; track v.title) {
                <tr style="border-bottom: 1px solid var(--color-neutral-700, #f1f1f3)">
                  <td style="padding: 16px; font-weight: 500; font-size: 13px; color: var(--color-on-surface, #2f2f39)">{{ v.title }}</td>
                  @for (s of sizes; track s.id) {
                    <td style="padding: 16px; text-align: center">
                      <div style="display: inline-flex; align-items: center; justify-content: center">
                        <kpmg-badge [size]="$any(s.id)" [styleType]="$any(v.style)" [state]="$any(v.state)" [count]="s.sample" />
                      </div>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>`,
  }),
};

/**
 * 3. Overlapping Badges on Buttons & Icons
 */
export const OverlappingBadges: Story = {
  render: () => ({
    props: {
      unreadCount: 3,
      decrement() {
        this['unreadCount'] = Math.max(0, this['unreadCount'] - 1);
      },
      increment() {
        this['unreadCount'] = this['unreadCount'] + 1;
      },
    },
    template: `
      <div style="padding: var(--spacing-6, 24px); display: flex; flex-direction: column; gap: var(--spacing-6, 24px)">
        <div>
          <h3 style="font-size: var(--font-size-title-lg, 18px); font-weight: var(--font-weight-semibold, 600); color: var(--color-on-surface, #2f2f39); margin-bottom: var(--spacing-2, 8px)">
            Anchored Notification Badges
          </h3>
          <p style="font-size: var(--font-size-body-sm, 12px); color: var(--color-on-surface-light, #9090a2); margin-bottom: var(--spacing-4, 16px)">
            Badges seamlessly wrap around interactive elements with automatic offset positioning.
          </p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-6, 24px); align-items: center">
          <kpmg-badge anchored size="small" styleType="primary" state="loud" [dot]="true">
            <kpmg-icon-button variant="outline" ariaLabel="Notifications">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="${BELL_PATH}" /></svg>
            </kpmg-icon-button>
          </kpmg-badge>

          <kpmg-badge anchored size="medium" styleType="primary" state="loud" [count]="unreadCount">
            <kpmg-icon-button variant="outline" ariaLabel="Inbox">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="${MAIL_PATH}" /></svg>
            </kpmg-icon-button>
          </kpmg-badge>

          <kpmg-badge anchored size="large" styleType="primary" state="loud" [count]="12">
            <kpmg-button variant="outline">Pending Approvals</kpmg-button>
          </kpmg-badge>

          <kpmg-badge anchored size="medium" styleType="neutral" state="quiet" count="New">
            <kpmg-button variant="secondary">Feature Preview</kpmg-button>
          </kpmg-badge>

          <div style="display: flex; gap: var(--spacing-2, 8px); align-items: center; margin-left: auto">
            <kpmg-button [size]="$any('small')" variant="outline" (click)="decrement()">- Decrement</kpmg-button>
            <kpmg-button [size]="$any('small')" variant="primary" (click)="increment()">+ Increment</kpmg-button>
          </div>
        </div>
      </div>`,
  }),
};

/**
 * 4. Numeric Threshold & Overflow Demo
 */
export const NumericOverflow: Story = {
  render: () => ({
    template: `
      <div style="padding: var(--spacing-6, 24px); display: flex; flex-direction: column; gap: var(--spacing-4, 16px)">
        <h3 style="font-size: var(--font-size-title-lg, 18px); font-weight: var(--font-weight-semibold, 600); color: var(--color-on-surface, #2f2f39)">
          Count Scaling &amp; Maximum Threshold
        </h3>
        <p style="font-size: var(--font-size-body-sm, 12px); color: var(--color-on-surface-light, #9090a2)">
          Automatically scales from single-digit circle to multi-digit pill, formatting with + symbol when exceeding maxCount.
        </p>

        <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-4, 16px); align-items: center">
          <kpmg-badge size="medium" styleType="primary" state="loud" [count]="1" />
          <kpmg-badge size="medium" styleType="primary" state="loud" [count]="9" />
          <kpmg-badge size="medium" styleType="primary" state="loud" [count]="24" />
          <kpmg-badge size="medium" styleType="primary" state="loud" [count]="99" />
          <kpmg-badge size="medium" styleType="primary" state="loud" [count]="150" [maxCount]="99" />
          <kpmg-badge size="large" styleType="primary" state="loud" [count]="999" [maxCount]="99" />
          <kpmg-badge size="large" styleType="neutral" state="loud" [count]="500" [maxCount]="99" />
        </div>
      </div>`,
  }),
};
