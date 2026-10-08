import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  MenuGroup,
  MenuDivider,
  DropdownMenu,
  DropdownBase,
  DropdownItemGroup,
  NavigationMenu,
  OverflowMenu,
  AssistantMenu,
  AssistantCard,
  MenuCheckIcon,
  MenuStarIcon,
  MenuPlusIcon,
  MenuSparkleIcon,
  MenuRobotIcon,
  MenuEllipsisIcon,
} from './Menu';

export default {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# KPMG WorkBench Menu Component System

A scalable, principal-engineered menu system implementing all **4 canonical types of menus**:
1. **Dropdown Menu**: Options lists triggered by action buttons or cards, supporting densities (Small, Medium, Large), Checklist and Icon lists, and full state matrices (Enabled, Hovered, Pressed, Selected, Disabled, Error).
2. **Navigation Menu**: Vertical panel navigation triggered by the KPMG brand pill or rendered inline, featuring pill navigation items with notification counters and action buttons.
3. **Overflow Menu**: Contextual action menus triggered by vertical ellipsis (\`⋮\`) in Small and Large sizes with non-destructive and destructive actions.
4. **Assistant Menu**: KPMG Trusted AI assistant menu featuring an AI prompt search bar, verification badge, rich assistant cards with purple-blue gradient thumbnails, and primary CTA actions.

        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['dropdown', 'navigation', 'overflow', 'assistant'],
      description: 'The canonical menu type',
    },
    density: {
      control: 'select',
      options: ['small', 'medium', 'large', 'navigation'],
      description: 'Item density height',
    },
    placement: {
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'bottom-center', 'top-left', 'top-right', 'top-center'],
      description: 'Popover placement relative to trigger',
    },
    elevation: {
      control: 'boolean',
      description: 'Whether the menu card has an elevated drop shadow',
    },
    inline: {
      control: 'boolean',
      description: 'Render inline as a static menu container instead of an anchored popover',
    },
  },
};

// Generic sample icons
const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const InboxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

/* ==========================================================================
   STORY 1: ALL 4 CANONICAL MENU TYPES SHOWCASE
   ========================================================================== */
export const AllFourMenuTypes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '16px' }}>
      <h3 style={{ margin: 0, fontFamily: 'var(--font-family-base)', color: 'var(--color-neutral-000)' }}>
        KPMG WorkBench Menu System — 4 Canonical Types
      </h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start' }}>
        {/* 1. Dropdown Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)' }}>1. Dropdown Menu (Inline View)</h4>
          <Menu inline type="dropdown" width={220}>
            <MenuItem type="checklist" selected={false} label="Option 1" />
            <MenuItem type="checklist" selected={true} label="Option 2" />
            <MenuItem type="checklist" selected={false} label="Option 3" />
            <MenuItem type="checklist" selected={false} label="Option 4" />
            <MenuDivider />
            <MenuItem type="checklist" selected={false} label="Option 5" />
          </Menu>
        </div>

        {/* 2. Navigation Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)' }}>2. Navigation Menu</h4>
          <NavigationMenu
            inline
            header="Header"
            activeItem="Inbox"
            items={[
              { label: 'Inbox', icon: <InboxIcon />, badge: '24' },
              { label: 'Outbox', icon: <SendIcon /> },
              { label: 'Favorites', icon: <MenuStarIcon size={18} /> },
              { label: 'Trash', icon: <TrashIcon /> },
              { type: 'divider' },
              {
                type: 'group',
                title: 'Labels',
                items: [
                  { label: 'Project Alpha', icon: <FolderIcon />, actionButton: true },
                  { label: 'Tax Advisory', icon: <FolderIcon />, actionButton: true },
                ],
              },
            ]}
          />
        </div>

        {/* 3. Overflow Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)' }}>3. Overflow Menu</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <OverflowMenu
              size="large"
              items={[
                { label: 'Edit details' },
                { label: 'Duplicate item' },
                { label: 'Share with team' },
                { type: 'divider' },
                { label: 'Delete record', destructive: true },
              ]}
            />
            <span style={{ fontSize: '13px', color: 'var(--color-neutral-100)' }}>Click 3-dots to open</span>
          </div>
          <div style={{ marginTop: '16px' }}>
            <DropdownItemGroup density="medium" type="checklist" />
          </div>
        </div>

        {/* 4. Assistant Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)' }}>4. Assistant Menu</h4>
          <AssistantMenu alignment="right" defaultOpen={true} />
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   STORY 2: DROPDOWN BASES (ALL 24 CANONICAL VARIANTS)
   ========================================================================== */
export const DropdownBases = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-family-base)', color: 'var(--color-neutral-000)' }}>
          Dropdown Bases — All 24 Canonical Variants
        </h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--color-neutral-100)' }}>
          4 Styles (Default Ghost/Pill, Gradient, Branded Pill, Card Outlined/Filled) &times; 3 Sizes (Small, Medium, Large, Branded, Card) &times; Open States (False / True).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', alignItems: 'flex-start' }}>
        {/* Column 1: Default Ghost (Background=False) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--color-neutral-100)' }}>1. Default Ghost (Background=False)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)' }}>Small </div>
            <DropdownBase styleType="default" size="small" background={false} open={false} label="Options" />
            <DropdownBase styleType="default" size="small" background={false} open={true} label="Options" />

            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)', marginTop: '8px' }}>Medium </div>
            <DropdownBase styleType="default" size="medium" background={false} open={false} label="Options" />
            <DropdownBase styleType="default" size="medium" background={false} open={true} label="Options" />

            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)', marginTop: '8px' }}>Large </div>
            <DropdownBase styleType="default" size="large" background={false} open={false} label="Options" />
            <DropdownBase styleType="default" size="large" background={false} open={true} label="Options" />
          </div>
        </div>

        {/* Column 2: Default Pill (Background=True) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--color-neutral-100)' }}>2. Default Pill (Background=True)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)' }}>Small </div>
            <DropdownBase styleType="default" size="small" background={true} open={false} label="Options" />
            <DropdownBase styleType="default" size="small" background={true} open={true} state="pressed" label="Options" />

            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)', marginTop: '8px' }}>Medium </div>
            <DropdownBase styleType="default" size="medium" background={true} open={false} label="Options" />
            <DropdownBase styleType="default" size="medium" background={true} open={true} state="pressed" label="Options" />

            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)', marginTop: '8px' }}>Large </div>
            <DropdownBase styleType="default" size="large" background={true} open={false} label="Options" />
            <DropdownBase styleType="default" size="large" background={true} open={true} state="pressed" label="Options" />
          </div>
        </div>

        {/* Column 3: Gradient Text (Background=False) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--color-neutral-100)' }}>3. Gradient Blue (Background=False)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)' }}>Small </div>
            <DropdownBase styleType="gradient" size="small" background={false} open={false} label="Options" />
            <DropdownBase styleType="gradient" size="small" background={false} open={true} label="Options" />

            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)', marginTop: '8px' }}>Medium </div>
            <DropdownBase styleType="gradient" size="medium" background={false} open={false} label="Options" />
            <DropdownBase styleType="gradient" size="medium" background={false} open={true} label="Options" />

            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)', marginTop: '8px' }}>Large </div>
            <DropdownBase styleType="gradient" size="large" background={false} open={false} label="Options" />
            <DropdownBase styleType="gradient" size="large" background={false} open={true} label="Options" />
          </div>
        </div>

        {/* Column 4: Branded Pill & Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--color-neutral-100)' }}>4. Branded Pill &amp; Card Bases</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)' }}>Branded Logo Pill </div>
            <DropdownBase styleType="branded" size="branded" open={false} label="KPMG" />
            <DropdownBase styleType="branded" size="branded" open={true} label="KPMG" />

            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)', marginTop: '8px' }}>Card Outlined </div>
            <DropdownBase styleType="card" state="enabled" open={false} label="Header" />
            <DropdownBase styleType="card" state="enabled" open={true} label="Header" />

            <div style={{ fontSize: '11px', color: 'var(--color-neutral-200)', marginTop: '8px' }}>Card Filled </div>
            <DropdownBase styleType="card" state="filled" open={false} label="Header" />
            <DropdownBase styleType="card" state="filled" open={true} label="Header" />
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================================================
   STORY 3: DROPDOWN ITEM GROUPS (ALL 6 CANONICAL VARIANTS)
   ========================================================================== */
export const DropdownItemGroups = (args) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', padding: '16px' }}>
      <DropdownItemGroup {...args} density="small" type="checklist" />
      <DropdownItemGroup {...args} density="medium" type="checklist" />
      <DropdownItemGroup {...args} density="large" type="checklist" />
      <DropdownItemGroup {...args} density="small" type="item-list" />
      <DropdownItemGroup {...args} density="medium" type="item-list" />
      <DropdownItemGroup {...args} density="large" type="item-list" />
    </div>
  );
};

/* ==========================================================================
   STORY 5: DROPDOWN MENU INTERACTIVE (ORIENTATIONS & ALIGNMENTS)
   ========================================================================== */
export const DropdownMenuInteractive = () => {
  const [selectedItems, setSelectedItems] = useState(['Option 1', 'Option 3']);

  const handleToggle = (val) => {
    setSelectedItems((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const sampleItems = [
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { type: 'divider' },
    { label: 'Option 5' },
  ];

  const cardCanonicalItems = [
    { label: 'Option', value: 'Option 1', type: 'icon', suffix: <MenuCheckIcon size={16} /> },
    { type: 'divider' },
    { label: 'Option', value: 'Option 2', type: 'icon', suffix: <MenuCheckIcon size={16} /> },
    { label: 'Option', value: 'Option 3', type: 'icon', suffix: <MenuCheckIcon size={16} /> },
    { label: 'Option', value: 'Option 4', type: 'icon', suffix: <MenuCheckIcon size={16} /> },
    { label: 'Option', value: 'Option 5', type: 'icon', suffix: <MenuCheckIcon size={16} /> },
    { type: 'divider' },
    { label: 'Option', value: 'Option 6', type: 'icon', suffix: <MenuCheckIcon size={16} /> },
  ];

  const [cardSelected, setCardSelected] = useState([
    'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'
  ]);

  const handleCardToggle = (val) => {
    setCardSelected((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-family-base)', color: 'var(--color-neutral-000)' }}>
          Dropdown Menu — Interactive Orientations &amp; Alignments
        </h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--color-neutral-100)' }}>
          Testing Popover Placements from Figma: Alignment (Left, Right, Center) &times; Orientation (Bottom, Top) &times; Card Base.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'flex-start' }}>
        {/* 1. Orientation: Bottom, Alignment: Left */}
        <div style={{ minHeight: '320px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
            Orientation: Bottom, Alignment: Left
          </div>
          <DropdownMenu
            orientation="bottom"
            alignment="left"
            baseStyle="default"
            baseBackground={true}
            triggerLabel="Options"
            selectedValues={selectedItems}
            onSelect={handleToggle}
            items={sampleItems}
          />
        </div>

        {/* 2. Orientation: Bottom, Alignment: Right */}
        <div style={{ minHeight: '320px', textAlign: 'right' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
            Orientation: Bottom, Alignment: Right
          </div>
          <DropdownMenu
            orientation="bottom"
            alignment="right"
            baseStyle="default"
            baseBackground={true}
            triggerLabel="Options"
            selectedValues={selectedItems}
            onSelect={handleToggle}
            items={sampleItems}
          />
        </div>

        {/* 3. Orientation: Top, Alignment: Left */}
        <div style={{ minHeight: '320px', paddingTop: '220px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
            Orientation: Top, Alignment: Left
          </div>
          <DropdownMenu
            orientation="top"
            alignment="left"
            baseStyle="gradient"
            baseBackground={false}
            triggerLabel="Options"
            selectedValues={selectedItems}
            onSelect={handleToggle}
            items={sampleItems}
          />
        </div>
      </div>

      {/* Card Base Trigger Section matching Figma specifications (450px wide) */}
      <div>
        <h4 style={{ margin: '16px 0 8px 0', fontSize: '15px', color: 'var(--color-neutral-000)' }}>
          Card Base Trigger Variants
        </h4>
        <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: 'var(--color-neutral-100)' }}>
          Canonical Card Base Trigger with 6 items (Star + Option + Checkmark) and 2 dividers.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'flex-start' }}>
          {/* Card Base Trigger: Closed State */}
          <div style={{ width: '450px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
              Card Base Trigger (Closed)
            </div>
            <DropdownMenu
              baseStyle="card"
              orientation="bottom"
              alignment="center"
              triggerLabel="Header"
              defaultOpen={false}
              closeOnSelect={false}
              selectedValues={cardSelected}
              onSelect={handleCardToggle}
              items={cardCanonicalItems}
            />
          </div>

          {/* Card Base Trigger: Orientation Bottom, Alignment Center */}
          <div style={{ width: '450px', minHeight: '420px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
              Card Base Trigger (Orientation: Bottom, Alignment: Center)
            </div>
            <DropdownMenu
              baseStyle="card"
              orientation="bottom"
              alignment="center"
              triggerLabel="Header"
              defaultOpen={true}
              closeOnSelect={false}
              selectedValues={cardSelected}
              onSelect={handleCardToggle}
              items={cardCanonicalItems}
            />
          </div>

          {/* Card Base Trigger: Orientation Top, Alignment Center */}
          <div style={{ width: '450px', minHeight: '420px', paddingTop: '340px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
              Card Base Trigger (Orientation: Top, Alignment: Center)
            </div>
            <DropdownMenu
              baseStyle="card"
              orientation="top"
              alignment="center"
              triggerLabel="Header"
              defaultOpen={true}
              closeOnSelect={false}
              selectedValues={cardSelected}
              onSelect={handleCardToggle}
              items={cardCanonicalItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   STORY 3: NAVIGATION MENU
   ========================================================================== */
export const NavigationMenuStory = () => {
  const [selectedNav, setSelectedNav] = useState('Inbox');
  const [lastAction, setLastAction] = useState('Click any navigation item to trigger its onClick handler');

  const createNavItems = (origin = '') => [
    {
      label: 'Inbox',
      icon: <InboxIcon />,
      badge: '24',
      onClick: (e) => setLastAction(`${origin} — onClick triggered for "Inbox" (badge: 24)`),
    },
    {
      label: 'Outbox',
      icon: <SendIcon />,
      onClick: (e) => setLastAction(`${origin} — onClick triggered for "Outbox"`),
    },
    {
      label: 'Favorites',
      icon: <MenuStarIcon size={18} />,
      onClick: (e) => setLastAction(`${origin} — onClick triggered for "Favorites"`),
    },
    {
      label: 'Trash',
      icon: <TrashIcon />,
      onClick: (e) => setLastAction(`${origin} — onClick triggered for "Trash"`),
    },
    { type: 'divider' },
    {
      type: 'group',
      title: 'Workspaces',
      items: [
        {
          label: 'Client Portals',
          icon: <FolderIcon />,
          actionButton: (e) => setLastAction(`${origin} — Action button (+) clicked for "Client Portals"`),
          onClick: (e) => setLastAction(`${origin} — onClick triggered for workspace "Client Portals"`),
        },
        {
          label: 'Risk Advisory',
          icon: <FolderIcon />,
          actionButton: (e) => setLastAction(`${origin} — Action button (+) clicked for "Risk Advisory"`),
          onClick: (e) => setLastAction(`${origin} — onClick triggered for workspace "Risk Advisory"`),
        },
        {
          label: 'Regulatory Docs',
          icon: <FolderIcon />,
          actionButton: (e) => setLastAction(`${origin} — Action button (+) clicked for "Regulatory Docs"`),
          onClick: (e) => setLastAction(`${origin} — onClick triggered for workspace "Regulatory Docs"`),
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-family-base)', color: 'var(--color-neutral-000)' }}>
          Navigation Menu — KPMG Sidebar &amp; Brand Pill
        </h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--color-neutral-100)' }}>
          Supports passing icons as props with labels, notification badges, action buttons, and active selection with interactive onClick handlers.
        </p>
      </div>

      {/* Live Interactive Event Status Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 18px',
          backgroundColor: 'var(--color-primary-container, #e9eafc)',
          borderRadius: 'var(--radius-sm, 8px)',
          border: '1px solid var(--color-primary-outline, #818aee)',
          color: 'var(--color-primary-on-container, #1a28c1)',
          fontSize: '13px',
          fontFamily: 'var(--font-family-base)',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontWeight: 600 }}>Active Selection:</span>
        <span
          style={{
            background: 'var(--color-surface, #ffffff)',
            color: 'var(--color-neutral-000, #2f2f39)',
            padding: '3px 10px',
            borderRadius: '4px',
            border: '1px solid var(--color-neutral-outline, #d5d5dc)',
            fontWeight: 500,
          }}
        >
          {selectedNav}
        </span>
        <span style={{ marginLeft: '12px', fontWeight: 600 }}>Last Event:</span>
        <span style={{ fontStyle: 'italic', color: 'var(--color-neutral-000, #2f2f39)' }}>
          {lastAction}
        </span>
      </div>

      {/* Side-by-side columns with generous 96px gap to avoid overlap */}
      <div style={{ display: 'flex', gap: '96px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* 1. Brand Pill Popover Trigger */}
        <div style={{ minWidth: '320px', width: '320px', minHeight: '580px' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', color: 'var(--color-neutral-000)' }}>
            Brand Pill Popover Trigger
          </h5>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: 'var(--color-neutral-100)' }}>
            Click the KPMG brand pill below to open/close the anchored popover navigation menu.
          </p>
          <NavigationMenu
            brandLabel="KPMG"
            activeItem={selectedNav}
            closeOnSelect={false}
            onSelect={(val) => setSelectedNav(val)}
            items={createNavItems('[Brand Pill Popover]')}
          />
        </div>

        {/* 2. Stationary Sidebar Navigation Panel (Inline) */}
        <div style={{ minWidth: '280px', width: '280px' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', color: 'var(--color-neutral-000)' }}>
            Stationary Sidebar Navigation Panel (Inline)
          </h5>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: 'var(--color-neutral-100)' }}>
            Static sidebar layout rendered inline with navigation items and action buttons.
          </p>
          <NavigationMenu
            inline
            header="Navigation"
            activeItem={selectedNav}
            onSelect={(val) => setSelectedNav(val)}
            items={createNavItems('[Inline Sidebar]')}
          />
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   STORY 4: OVERFLOW MENU
   ========================================================================== */
export const OverflowMenuStory = () => {
  const [selectedItems, setSelectedItems] = useState(['Option 1', 'Option 3']);
  const [lastAction, setLastAction] = useState('Click any trigger (⋮) to toggle the Dropdown Item Group');

  const handleSelect = (val) => {
    setSelectedItems((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
    setLastAction(`Toggled item: "${val}"`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-family-base)', color: 'var(--color-neutral-000)' }}>
          Overflow Menu — Dropdown Item Groups
        </h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--color-neutral-100)' }}>
          Triggered by vertical ellipsis (&#8942;), opening the exact canonical Dropdown Item Groups menu (Checklist with circular checkboxes or Item-List with star + checkmark).
        </p>
      </div>

      {/* Interactive Selection Tracker */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 16px',
          backgroundColor: 'var(--color-primary-container, #e9eafc)',
          borderRadius: 'var(--radius-sm, 8px)',
          border: '1px solid var(--color-primary-outline, #818aee)',
          color: 'var(--color-primary-on-container, #1a28c1)',
          fontSize: '13px',
          fontFamily: 'var(--font-family-base)',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontWeight: 600 }}>Selected Values:</span>
        <span style={{ background: '#ffffff', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--color-neutral-outline)' }}>
          {selectedItems.length ? selectedItems.join(', ') : 'None'}
        </span>
        <span style={{ marginLeft: '12px', fontWeight: 600 }}>Last Event:</span>
        <span style={{ fontStyle: 'italic', color: 'var(--color-neutral-000, #2f2f39)' }}>
          {lastAction}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* 1. Large Trigger (40px) with Checklist Dropdown Item Group (Open by default) */}
        <div style={{ minWidth: '240px', width: '240px', minHeight: '360px' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--color-neutral-000)' }}>
            Large Trigger (40px) — Checklist
          </h5>
          <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: 'var(--color-neutral-100)' }}>
            Medium density (298px), circular checkboxes
          </p>
          <OverflowMenu
            size="large"
            density="medium"
            groupType="checklist"
            placement="bottom-left"
            defaultOpen={true}
            selectedValues={selectedItems}
            onSelect={handleSelect}
          />
        </div>

        {/* 2. Small Trigger (24px) with Item-List Dropdown Item Group */}
        <div style={{ minWidth: '240px', width: '240px', minHeight: '360px' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--color-neutral-000)' }}>
            Small Trigger (24px) — Item-List
          </h5>
          <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: 'var(--color-neutral-100)' }}>
            Medium density (298px), star + checkmark
          </p>
          <OverflowMenu
            size="small"
            density="medium"
            groupType="item-list"
            placement="bottom-left"
            defaultOpen={true}
            selectedValues={selectedItems}
            onSelect={handleSelect}
          />
        </div>

        {/* 3. Small Density (250px) Trigger */}
        <div style={{ minWidth: '240px', width: '240px', minHeight: '360px' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--color-neutral-000)' }}>
            Small Density (250px) — Checklist
          </h5>
          <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: 'var(--color-neutral-100)' }}>
            Compact 32px items, click &#8942; to open
          </p>
          <OverflowMenu
            size="large"
            density="small"
            groupType="checklist"
            placement="bottom-left"
            defaultOpen={false}
            selectedValues={selectedItems}
            onSelect={handleSelect}
          />
        </div>

        {/* 4. Large Density (322px) Trigger */}
        <div style={{ minWidth: '240px', width: '240px', minHeight: '380px' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--color-neutral-000)' }}>
            Large Density (322px) — Item-List
          </h5>
          <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: 'var(--color-neutral-100)' }}>
            Spacious 44px items, click &#8942; to open
          </p>
          <OverflowMenu
            size="large"
            density="large"
            groupType="item-list"
            placement="bottom-left"
            defaultOpen={false}
            selectedValues={selectedItems}
            onSelect={handleSelect}
          />
        </div>

        {/* 5. Disabled State */}
        <div style={{ minWidth: '160px', width: '160px' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--color-neutral-000)' }}>
            Disabled State
          </h5>
          <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: 'var(--color-neutral-100)' }}>
            Trigger is disabled
          </p>
          <OverflowMenu
            disabled
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   STORY 5: ASSISTANT MENU
   ========================================================================== */
export const AssistantMenuStory = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-base)', color: 'var(--color-neutral-000)' }}>
          Assistive Menu — Left & Right Robot Trigger Variants
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-100)' }}>
          Click the little robot icon on either variant to toggle the menu open/closed. Variant 1 features a right-aligned robot trigger; Variant 2 features a left-aligned robot trigger.
        </p>
      </div>

      <div
        style={{
          backgroundColor: '#fbfbfb',
          borderRadius: '28px',
          padding: '40px',
          display: 'flex',
          gap: '80px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          minHeight: '920px',
        }}
      >
        {/* Variant 1: Robot Trigger on Right */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '400px' }}>
          {/* Badge 1 */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 400,
              color: '#000000',
              fontFamily: 'var(--font-family-base)',
              marginBottom: '24px',
            }}
          >
            1
          </div>
          <AssistantMenu
            alignment="right"
            defaultOpen={true}
          />
        </div>

        {/* Variant 2: Robot Trigger on Left */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '400px' }}>
          {/* Badge 2 */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 400,
              color: '#000000',
              fontFamily: 'var(--font-family-base)',
              marginBottom: '24px',
            }}
          >
            2
          </div>
          <AssistantMenu
            alignment="left"
            defaultOpen={true}
          />
        </div>
      </div>
    </div>
  );
};

