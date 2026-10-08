import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { AssistantCardComponent } from './assistant-card.component';
import { AssistantMenuComponent } from './assistant-menu.component';
import { DropdownBaseComponent } from './dropdown-base.component';
import { DropdownItemGroupComponent } from './dropdown-item-group.component';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { MenuDividerComponent } from './menu-divider.component';
import { MenuGroupComponent } from './menu-group.component';
import { MenuIconComponent } from './menu-icon.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuComponent } from './menu.component';
import { NavigationMenuComponent } from './navigation-menu.component';
import { OverflowMenuComponent } from './overflow-menu.component';

const meta: Meta<MenuComponent> = {
  title: 'Components/Menu',
  component: MenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        MenuComponent,
        MenuItemComponent,
        MenuGroupComponent,
        MenuDividerComponent,
        MenuIconComponent,
        DropdownBaseComponent,
        DropdownItemGroupComponent,
        DropdownMenuComponent,
        NavigationMenuComponent,
        OverflowMenuComponent,
        AssistantMenuComponent,
        AssistantCardComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# KPMG WorkBench Menu Component System

Four canonical menu types:
1. **Dropdown Menu** (\`kpmg-dropdown-menu\`): option lists triggered by buttons or cards; Small/Medium/Large densities, checklist and icon lists.
2. **Navigation Menu** (\`kpmg-navigation-menu\`): vertical navigation triggered by the KPMG brand pill or rendered inline, with badges and action buttons.
3. **Overflow Menu** (\`kpmg-overflow-menu\`): contextual actions behind a vertical ellipsis, Small and Large triggers.
4. **Assistant Menu** (\`kpmg-assistant-menu\`): KPMG Trusted AI menu with prompt bar, verification line, assistant cards and a CTA.
        `,
      },
    },
  },
  args: { type: 'dropdown', density: 'medium', placement: 'bottom-left', elevation: true, inline: true, width: 220 },
  argTypes: {
    type: { control: 'select', options: ['dropdown', 'navigation', 'overflow', 'assistant'] },
    density: { control: 'select', options: ['small', 'medium', 'large', 'navigation'] },
    placement: {
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'bottom-center', 'top-left', 'top-right', 'top-center'],
    },
    elevation: { control: 'boolean' },
    inline: { control: 'boolean' },
    trigger: { control: false },
    headerTemplate: { control: false },
  },
  render: (args) => ({
    props: args,
    template: `
      <kpmg-menu ${argsToTemplate(args)}>
        <kpmg-menu-item type="checklist" [selected]="false" label="Option 1" />
        <kpmg-menu-item type="checklist" [selected]="true" label="Option 2" />
        <kpmg-menu-item type="checklist" [selected]="false" label="Option 3" />
        <kpmg-menu-item type="checklist" [selected]="false" label="Option 4" />
        <kpmg-menu-divider />
        <kpmg-menu-item type="checklist" [selected]="false" label="Option 5" />
      </kpmg-menu>`,
  }),
};

export default meta;
type Story = StoryObj<MenuComponent>;

const ICONS = `
  <ng-template #folder><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg></ng-template>
  <ng-template #inbox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg></ng-template>
  <ng-template #send><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></ng-template>
  <ng-template #trash><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></ng-template>
  <ng-template #star><kpmg-menu-icon name="star" [size]="18" /></ng-template>
  <ng-template #check><kpmg-menu-icon name="check" [size]="16" /></ng-template>`;

const LABEL = 'margin: 0; font-size: 14px; color: var(--color-neutral-100)';
const SMALL = 'font-size: 11px; color: var(--color-neutral-200)';

export const Default: Story = {};

export const AllFourMenuTypes: Story = {
  render: () => ({
    template: `
      ${ICONS}
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 16px">
        <h3 style="margin: 0; font-family: var(--font-family-base); color: var(--color-neutral-000)">KPMG WorkBench Menu System — 4 Canonical Types</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start">
          <div style="display: flex; flex-direction: column; gap: 12px">
            <h4 style="${LABEL}">1. Dropdown Menu (Inline View)</h4>
            <kpmg-menu [inline]="true" type="dropdown" [width]="220">
              <kpmg-menu-item type="checklist" [selected]="false" label="Option 1" />
              <kpmg-menu-item type="checklist" [selected]="true" label="Option 2" />
              <kpmg-menu-item type="checklist" [selected]="false" label="Option 3" />
              <kpmg-menu-item type="checklist" [selected]="false" label="Option 4" />
              <kpmg-menu-divider />
              <kpmg-menu-item type="checklist" [selected]="false" label="Option 5" />
            </kpmg-menu>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <h4 style="${LABEL}">2. Navigation Menu</h4>
            <kpmg-navigation-menu
              [inline]="true"
              header="Header"
              activeItem="Inbox"
              [items]="[
                { label: 'Inbox', icon: inbox, badge: '24' },
                { label: 'Outbox', icon: send },
                { label: 'Favorites', icon: star },
                { label: 'Trash', icon: trash },
                { type: 'divider' },
                { type: 'group', title: 'Labels', items: [
                  { label: 'Project Alpha', icon: folder, actionButton: true },
                  { label: 'Tax Advisory', icon: folder, actionButton: true }
                ] }
              ]"
            />
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <h4 style="${LABEL}">3. Overflow Menu</h4>
            <div style="display: flex; gap: 16px; align-items: center">
              <kpmg-overflow-menu
                size="large"
                [items]="[
                  { label: 'Edit details' },
                  { label: 'Duplicate item' },
                  { label: 'Share with team' },
                  { type: 'divider' },
                  { label: 'Delete record', destructive: true }
                ]"
              />
              <span style="font-size: 13px; color: var(--color-neutral-100)">Click 3-dots to open</span>
            </div>
            <div style="margin-top: 16px"><kpmg-dropdown-item-group density="medium" type="checklist" /></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <h4 style="${LABEL}">4. Assistant Menu</h4>
            <kpmg-assistant-menu alignment="right" [defaultOpen]="true" />
          </div>
        </div>
      </div>`,
  }),
};

const baseRow = (style: string, size: string, bg: boolean, label: string, extra = '') => `
  <kpmg-dropdown-base styleType="${style}" size="${size}" [background]="${bg}" [open]="false" label="${label}" />
  <kpmg-dropdown-base styleType="${style}" size="${size}" [background]="${bg}" [open]="true" ${extra} label="${label}" />`;

const baseColumn = (title: string, style: string, bg: boolean, pressed: boolean) => `
  <div style="display: flex; flex-direction: column; gap: 16px">
    <h4 style="margin: 0; font-size: 13px; color: var(--color-neutral-100)">${title}</h4>
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
      <div style="${SMALL}">Small</div>${baseRow(style, 'small', bg, 'Options', pressed ? 'state="pressed"' : '')}
      <div style="${SMALL}; margin-top: 8px">Medium</div>${baseRow(style, 'medium', bg, 'Options', pressed ? 'state="pressed"' : '')}
      <div style="${SMALL}; margin-top: 8px">Large</div>${baseRow(style, 'large', bg, 'Options', pressed ? 'state="pressed"' : '')}
    </div>
  </div>`;

export const DropdownBases: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 16px">
        <div>
          <h3 style="margin: 0; font-family: var(--font-family-base); color: var(--color-neutral-000)">Dropdown Bases — All 24 Canonical Variants</h3>
          <p style="margin: 4px 0 0; font-size: 13px; color: var(--color-neutral-100)">Default Ghost/Pill, Gradient, Branded Pill, Card Outlined/Filled across sizes and open states.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px; align-items: flex-start">
          ${baseColumn('1. Default Ghost (Background=False)', 'default', false, false)}
          ${baseColumn('2. Default Pill (Background=True)', 'default', true, true)}
          ${baseColumn('3. Gradient Blue (Background=False)', 'gradient', false, false)}
          <div style="display: flex; flex-direction: column; gap: 16px">
            <h4 style="margin: 0; font-size: 13px; color: var(--color-neutral-100)">4. Branded Pill &amp; Card Bases</h4>
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
              <div style="${SMALL}">Branded Logo Pill</div>
              <kpmg-dropdown-base styleType="branded" size="branded" [open]="false" label="KPMG" />
              <kpmg-dropdown-base styleType="branded" size="branded" [open]="true" label="KPMG" />
              <div style="${SMALL}; margin-top: 8px">Card Outlined</div>
              <kpmg-dropdown-base styleType="card" state="enabled" [open]="false" label="Header" />
              <kpmg-dropdown-base styleType="card" state="enabled" [open]="true" label="Header" />
              <div style="${SMALL}; margin-top: 8px">Card Filled</div>
              <kpmg-dropdown-base styleType="card" state="filled" [open]="false" label="Header" />
              <kpmg-dropdown-base styleType="card" state="filled" [open]="true" label="Header" />
            </div>
          </div>
        </div>
      </div>`,
  }),
};

export const DropdownItemGroups: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 32px; padding: 16px">
        <kpmg-dropdown-item-group density="small" type="checklist" />
        <kpmg-dropdown-item-group density="medium" type="checklist" />
        <kpmg-dropdown-item-group density="large" type="checklist" />
        <kpmg-dropdown-item-group density="small" type="item-list" />
        <kpmg-dropdown-item-group density="medium" type="item-list" />
        <kpmg-dropdown-item-group density="large" type="item-list" />
      </div>`,
  }),
};

export const MenuItemStates: Story = {
  render: () => ({
    template: `
      ${ICONS}
      <div style="display: flex; flex-wrap: wrap; gap: 32px; padding: 16px">
        <kpmg-menu [inline]="true" [width]="260">
          <kpmg-menu-item label="Enabled" />
          <kpmg-menu-item label="Hovered" state="hovered" />
          <kpmg-menu-item label="Pressed" state="pressed" />
          <kpmg-menu-item label="Selected" [selected]="true" />
          <kpmg-menu-item label="Disabled" [disabled]="true" />
          <kpmg-menu-item label="Error" [error]="true" />
          <kpmg-menu-item label="Destructive" [destructive]="true" />
          <kpmg-menu-item label="With description" description="Supporting text" />
        </kpmg-menu>
        <kpmg-menu [inline]="true" [width]="260">
          <kpmg-menu-item type="icon" label="Icon item" />
          <kpmg-menu-item type="icon" label="Icon selected" [selected]="true" />
          <kpmg-menu-item type="checklist" label="Checklist" />
          <kpmg-menu-item type="checklist" label="Checklist selected" [selected]="true" />
          <kpmg-menu-item label="With badge" [icon]="inbox" badge="24" />
          <kpmg-menu-item label="With action" [icon]="folder" [actionButton]="true" />
          <kpmg-menu-item label="Custom suffix" [suffix]="check" />
        </kpmg-menu>
        <kpmg-menu [inline]="true" type="navigation" header="Group example" [width]="260">
          <kpmg-menu-group title="Labels">
            <kpmg-menu-item label="Project Alpha" [icon]="folder" />
            <kpmg-menu-item label="Tax Advisory" [icon]="folder" />
          </kpmg-menu-group>
        </kpmg-menu>
      </div>`,
  }),
};

export const DropdownMenuInteractive: Story = {
  render: () => ({
    props: {
      selected: ['Option 1', 'Option 3'],
      cardSelected: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
      sampleItems: [
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
        { label: 'Option 4' },
        { type: 'divider' },
        { label: 'Option 5' },
      ],
      toggle(this: { selected: string[] }, e: { value: string }) {
        this.selected = this.selected.includes(e.value) ? this.selected.filter((v) => v !== e.value) : [...this.selected, e.value];
      },
      toggleCard(this: { cardSelected: string[] }, e: { value: string }) {
        this.cardSelected = this.cardSelected.includes(e.value)
          ? this.cardSelected.filter((v) => v !== e.value)
          : [...this.cardSelected, e.value];
      },
    },
    template: `
      <ng-template #check><kpmg-menu-icon name="check" [size]="16" /></ng-template>
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 16px">
        <div>
          <h3 style="margin: 0; font-family: var(--font-family-base); color: var(--color-neutral-000)">Dropdown Menu — Interactive Orientations &amp; Alignments</h3>
          <p style="margin: 4px 0 0; font-size: 13px; color: var(--color-neutral-100)">Alignment (Left, Right, Center) x Orientation (Bottom, Top) x Card Base.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 48px; align-items: flex-start">
          <div style="min-height: 320px">
            <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--color-neutral-100)">Orientation: Bottom, Alignment: Left</div>
            <kpmg-dropdown-menu orientation="bottom" alignment="left" baseStyle="default" [baseBackground]="true" triggerLabel="Options" [selectedValues]="selected" (itemSelect)="toggle($event)" [items]="sampleItems" />
          </div>
          <div style="min-height: 320px; text-align: right">
            <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--color-neutral-100)">Orientation: Bottom, Alignment: Right</div>
            <kpmg-dropdown-menu orientation="bottom" alignment="right" baseStyle="default" [baseBackground]="true" triggerLabel="Options" [selectedValues]="selected" (itemSelect)="toggle($event)" [items]="sampleItems" />
          </div>
          <div style="min-height: 320px; padding-top: 220px">
            <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--color-neutral-100)">Orientation: Top, Alignment: Left</div>
            <kpmg-dropdown-menu orientation="top" alignment="left" baseStyle="gradient" [baseBackground]="false" triggerLabel="Options" [selectedValues]="selected" (itemSelect)="toggle($event)" [items]="sampleItems" />
          </div>
        </div>

        <div>
          <h4 style="margin: 16px 0 8px; font-size: 15px; color: var(--color-neutral-000)">Card Base Trigger Variants</h4>
          <p style="margin: 0 0 24px; font-size: 13px; color: var(--color-neutral-100)">Canonical Card Base Trigger with 6 items (Star + Option + Checkmark) and 2 dividers.</p>
          <div style="display: flex; flex-wrap: wrap; gap: 48px; align-items: flex-start">
            <div style="width: 450px">
              <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--color-neutral-100)">Card Base Trigger (Closed)</div>
              <kpmg-dropdown-menu baseStyle="card" orientation="bottom" alignment="center" triggerLabel="Header" [defaultOpen]="false" [closeOnSelect]="false" [selectedValues]="cardSelected" (itemSelect)="toggleCard($event)"
                [items]="[
                  { label: 'Option', value: 'Option 1', type: 'icon', suffix: check },
                  { type: 'divider' },
                  { label: 'Option', value: 'Option 2', type: 'icon', suffix: check },
                  { label: 'Option', value: 'Option 3', type: 'icon', suffix: check },
                  { label: 'Option', value: 'Option 4', type: 'icon', suffix: check },
                  { label: 'Option', value: 'Option 5', type: 'icon', suffix: check },
                  { type: 'divider' },
                  { label: 'Option', value: 'Option 6', type: 'icon', suffix: check }
                ]" />
            </div>
            <div style="width: 450px; min-height: 420px">
              <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--color-neutral-100)">Card Base Trigger (Orientation: Bottom, Alignment: Center)</div>
              <kpmg-dropdown-menu baseStyle="card" orientation="bottom" alignment="center" triggerLabel="Header" [defaultOpen]="true" [closeOnSelect]="false" [selectedValues]="cardSelected" (itemSelect)="toggleCard($event)"
                [items]="[
                  { label: 'Option', value: 'Option 1', type: 'icon', suffix: check },
                  { type: 'divider' },
                  { label: 'Option', value: 'Option 2', type: 'icon', suffix: check },
                  { label: 'Option', value: 'Option 3', type: 'icon', suffix: check }
                ]" />
            </div>
            <div style="width: 450px; min-height: 420px; padding-top: 340px">
              <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--color-neutral-100)">Card Base Trigger (Orientation: Top, Alignment: Center)</div>
              <kpmg-dropdown-menu baseStyle="card" orientation="top" alignment="center" triggerLabel="Header" [defaultOpen]="true" [closeOnSelect]="false" [selectedValues]="cardSelected" (itemSelect)="toggleCard($event)"
                [items]="[
                  { label: 'Option', value: 'Option 1', type: 'icon', suffix: check },
                  { type: 'divider' },
                  { label: 'Option', value: 'Option 2', type: 'icon', suffix: check },
                  { label: 'Option', value: 'Option 3', type: 'icon', suffix: check }
                ]" />
            </div>
          </div>
        </div>
      </div>`,
  }),
};

export const NavigationMenuStory: Story = {
  name: 'Navigation Menu',
  render: () => ({
    props: {
      selectedNav: 'Inbox',
      lastAction: 'Click any navigation item to trigger its onClick handler',
      select(this: { selectedNav: string }, e: { value: string }) {
        this.selectedNav = e.value;
      },
      log(this: { lastAction: string }, text: string) {
        this.lastAction = text;
      },
    },
    template: `
      ${ICONS}
      <div style="display: flex; flex-direction: column; gap: 28px; padding: 16px">
        <div>
          <h3 style="margin: 0; font-family: var(--font-family-base); color: var(--color-neutral-000)">Navigation Menu — KPMG Sidebar &amp; Brand Pill</h3>
          <p style="margin: 4px 0 0; font-size: 13px; color: var(--color-neutral-100)">Icons, notification badges, action buttons and active selection with item handlers.</p>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 18px; background-color: var(--color-primary-container, #e9eafc); border-radius: var(--radius-sm, 8px); border: 1px solid var(--color-primary-outline, #818aee); color: var(--color-primary-on-container, #1a28c1); font-size: 13px; font-family: var(--font-family-base); flex-wrap: wrap">
          <span style="font-weight: 600">Active Selection:</span><span style="background: var(--color-surface, #fff); color: var(--color-neutral-000, #2f2f39); padding: 3px 10px; border-radius: 4px; border: 1px solid var(--color-neutral-outline, #d5d5dc); font-weight: 500">{{ selectedNav }}</span>
          <span style="margin-left: 12px; font-weight: 600">Last Event:</span><span style="font-style: italic; color: var(--color-neutral-000, #2f2f39)">{{ lastAction }}</span>
        </div>
        <div style="display: flex; gap: 96px; align-items: flex-start; flex-wrap: wrap">
          <div style="min-width: 320px; width: 320px; min-height: 580px">
            <h5 style="margin: 0 0 6px; font-size: 14px; color: var(--color-neutral-000)">Brand Pill Popover Trigger</h5>
            <p style="margin: 0 0 16px; font-size: 12px; color: var(--color-neutral-100)">Click the KPMG brand pill to open/close the anchored popover.</p>
            <kpmg-navigation-menu brandLabel="KPMG" [activeItem]="selectedNav" [closeOnSelect]="false" (itemSelect)="select($event); log('[Brand Pill Popover] selected ' + $event.value)"
              [items]="[
                { label: 'Inbox', icon: inbox, badge: '24' },
                { label: 'Outbox', icon: send },
                { label: 'Favorites', icon: star },
                { label: 'Trash', icon: trash },
                { type: 'divider' },
                { type: 'group', title: 'Workspaces', items: [
                  { label: 'Client Portals', icon: folder, actionButton: true },
                  { label: 'Risk Advisory', icon: folder, actionButton: true },
                  { label: 'Regulatory Docs', icon: folder, actionButton: true }
                ] }
              ]" />
          </div>
          <div style="min-width: 280px; width: 280px">
            <h5 style="margin: 0 0 6px; font-size: 14px; color: var(--color-neutral-000)">Stationary Sidebar Navigation Panel (Inline)</h5>
            <p style="margin: 0 0 16px; font-size: 12px; color: var(--color-neutral-100)">Static sidebar rendered inline.</p>
            <kpmg-navigation-menu [inline]="true" header="Navigation" [activeItem]="selectedNav" (itemSelect)="select($event); log('[Inline Sidebar] selected ' + $event.value)"
              [items]="[
                { label: 'Inbox', icon: inbox, badge: '24' },
                { label: 'Outbox', icon: send },
                { label: 'Favorites', icon: star },
                { label: 'Trash', icon: trash },
                { type: 'divider' },
                { type: 'group', title: 'Workspaces', items: [
                  { label: 'Client Portals', icon: folder, actionButton: true },
                  { label: 'Risk Advisory', icon: folder, actionButton: true }
                ] }
              ]" />
          </div>
        </div>
      </div>`,
  }),
};

export const OverflowMenuStory: Story = {
  name: 'Overflow Menu',
  render: () => ({
    props: {
      selected: ['Option 1', 'Option 3'],
      lastAction: 'Click any trigger to toggle the Dropdown Item Group',
      onSelect(this: { selected: string[]; lastAction: string }, e: { value: string }) {
        this.selected = this.selected.includes(e.value) ? this.selected.filter((v) => v !== e.value) : [...this.selected, e.value];
        this.lastAction = `Toggled item: "${e.value}"`;
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 28px; padding: 16px">
        <div>
          <h3 style="margin: 0; font-family: var(--font-family-base); color: var(--color-neutral-000)">Overflow Menu — Dropdown Item Groups</h3>
          <p style="margin: 4px 0 0; font-size: 13px; color: var(--color-neutral-100)">Vertical-ellipsis trigger opening the canonical Dropdown Item Groups (checklist or item-list).</p>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 10px 16px; background-color: var(--color-primary-container, #e9eafc); border-radius: var(--radius-sm, 8px); border: 1px solid var(--color-primary-outline, #818aee); color: var(--color-primary-on-container, #1a28c1); font-size: 13px; font-family: var(--font-family-base); flex-wrap: wrap">
          <span style="font-weight: 600">Selected Values:</span><span style="background: #fff; padding: 2px 8px; border-radius: 4px; border: 1px solid var(--color-neutral-outline)">{{ selected.length ? selected.join(', ') : 'None' }}</span>
          <span style="margin-left: 12px; font-weight: 600">Last Event:</span><span style="font-style: italic">{{ lastAction }}</span>
        </div>
        <div style="display: flex; gap: 64px; align-items: flex-start; flex-wrap: wrap">
          <div style="min-width: 240px; width: 240px; min-height: 360px">
            <h5 style="margin: 0 0 6px; font-size: 13px; color: var(--color-neutral-000)">Large Trigger (40px) — Checklist</h5>
            <p style="margin: 0 0 12px; font-size: 11px; color: var(--color-neutral-100)">Medium density (298px), circular checkboxes</p>
            <kpmg-overflow-menu size="large" density="medium" groupType="checklist" placement="bottom-left" [defaultOpen]="true" [selectedValues]="selected" (itemSelect)="onSelect($event)" />
          </div>
          <div style="min-width: 240px; width: 240px; min-height: 360px">
            <h5 style="margin: 0 0 6px; font-size: 13px; color: var(--color-neutral-000)">Small Trigger (24px) — Item-List</h5>
            <p style="margin: 0 0 12px; font-size: 11px; color: var(--color-neutral-100)">Medium density (298px), star + checkmark</p>
            <kpmg-overflow-menu size="small" density="medium" groupType="item-list" placement="bottom-left" [defaultOpen]="true" [selectedValues]="selected" (itemSelect)="onSelect($event)" />
          </div>
          <div style="min-width: 240px; width: 240px; min-height: 360px">
            <h5 style="margin: 0 0 6px; font-size: 13px; color: var(--color-neutral-000)">Small Density (250px) — Checklist</h5>
            <p style="margin: 0 0 12px; font-size: 11px; color: var(--color-neutral-100)">Compact 32px items, click to open</p>
            <kpmg-overflow-menu size="large" density="small" groupType="checklist" placement="bottom-left" [selectedValues]="selected" (itemSelect)="onSelect($event)" />
          </div>
          <div style="min-width: 240px; width: 240px; min-height: 380px">
            <h5 style="margin: 0 0 6px; font-size: 13px; color: var(--color-neutral-000)">Large Density (322px) — Item-List</h5>
            <p style="margin: 0 0 12px; font-size: 11px; color: var(--color-neutral-100)">Spacious 44px items, click to open</p>
            <kpmg-overflow-menu size="large" density="large" groupType="item-list" placement="bottom-left" [selectedValues]="selected" (itemSelect)="onSelect($event)" />
          </div>
          <div style="min-width: 160px; width: 160px">
            <h5 style="margin: 0 0 6px; font-size: 13px; color: var(--color-neutral-000)">Disabled State</h5>
            <p style="margin: 0 0 12px; font-size: 11px; color: var(--color-neutral-100)">Trigger is disabled</p>
            <kpmg-overflow-menu [disabled]="true" size="large" />
          </div>
        </div>
      </div>`,
  }),
};

export const AssistantMenuStory: Story = {
  name: 'Assistant Menu',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px">
        <div>
          <h3 style="margin: 0 0 8px; font-family: var(--font-family-base); color: var(--color-neutral-000)">Assistive Menu — Left &amp; Right Robot Trigger Variants</h3>
          <p style="margin: 0; font-size: 14px; color: var(--color-neutral-100)">Click the robot icon to toggle the menu. Variant 1 has a right-aligned trigger; Variant 2 a left-aligned trigger.</p>
        </div>
        <div style="background-color: #fbfbfb; border-radius: 28px; padding: 40px; display: flex; gap: 80px; align-items: flex-start; flex-wrap: wrap; min-height: 920px">
          <div style="display: flex; flex-direction: column; align-items: flex-start; width: 400px">
            <div style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid #000; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #000; font-family: var(--font-family-base); margin-bottom: 24px">1</div>
            <kpmg-assistant-menu alignment="right" [defaultOpen]="true" />
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-start; width: 400px">
            <div style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid #000; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #000; font-family: var(--font-family-base); margin-bottom: 24px">2</div>
            <kpmg-assistant-menu alignment="left" [defaultOpen]="true" />
          </div>
        </div>
      </div>`,
  }),
};

export const AssistantCardStory: Story = {
  name: 'Assistant Card',
  render: () => ({
    template: `<div style="width: 360px; padding: 16px"><kpmg-assistant-card title="Header" subtitle="Supporting line text lorem ipsu..." /></div>`,
  }),
};
