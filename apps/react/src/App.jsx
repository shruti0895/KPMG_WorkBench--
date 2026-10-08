import { useState } from 'react';
import { Button } from '@designkpmg/ui/components/Button/Button';
import { IconButton } from '@designkpmg/ui/components/IconButton/IconButton';
import { Breadcrumbs } from '@designkpmg/ui/components/Breadcrumbs/Breadcrumbs';
import { Checkbox } from '@designkpmg/ui/components/Checkbox/Checkbox';
import { Slider } from '@designkpmg/ui/components/Slider/Slider';
import { ProgressIndicator } from '@designkpmg/ui/components/ProgressIndicator/ProgressIndicator';
import { FileUploader } from '@designkpmg/ui/components/FileUploader/FileUploader';
import { Chip, ChipStarSvg, ChipBrandedDocSvg } from '@designkpmg/ui/components/Chip';
import { Badge } from '@designkpmg/ui/components/Badge';
import { Banner } from '@designkpmg/ui/components/Banner';
import { List, ListItem } from '@designkpmg/ui/components/List';
import { Tab, TabItem } from '@designkpmg/ui/components/Tab';
import { Textarea } from '@designkpmg/ui/components/Textarea';
import { Tooltip } from '@designkpmg/ui/components/Tooltip';
import { Snackbar, SnackbarContainer } from '@designkpmg/ui/components/Snackbar';
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
} from '@designkpmg/ui/components/Menu';
import { Switch } from '@designkpmg/ui/components/Switch';
import { Dividers } from '@designkpmg/ui/components/Dividers';
import {
  AppBars,
  AppBarFull,
  AppBarNested,
  AppBarSpecial,
  AppBarStatusItem,
  AppBarSearchPill,
  FigmaWorkbenchExample,
  BottomAppBar,
  BottomAppBarsText,
  BottomAppBarsVoice,
  ChatDockedUI,
} from '@designkpmg/ui/components/AppBars';
import { Modal, ModalItem } from '@designkpmg/ui/components/Modal';
import { Tiles, TileHeader, TileTaskCard } from '@designkpmg/ui/components/Tiles';
import { Sheets } from '@designkpmg/ui/components/Sheets';
import {
  Message,
  MessageThread,
  MessageStatusCard,
  MessageAudioRich,
  MessageActionIconBar,
} from '@designkpmg/ui/components/Message';



const SettingsIcon = () => (




  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const circleCheckboxItems = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Option', href: '/option-1', useCircleCheckbox: true, isChecked: true },
  { id: '3', label: 'Option', href: '/option-2', useCircleCheckbox: true, isChecked: true, hasDivider: true },
  { id: '4', label: 'Option', href: '/option-3', useCircleCheckbox: true, isChecked: true },
  { id: '5', label: 'Option', href: '/option-4', useCircleCheckbox: true, isChecked: true },
  { id: '6', label: 'Option', href: '/option-5', useCircleCheckbox: true, isChecked: true },
  { id: '7', label: 'Option', href: '/option-6', useCircleCheckbox: true, isChecked: true, hasDivider: true },
  { id: '8', label: 'Current Page', isCurrent: true },
];

const starBookmarkItems = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Option', href: '/opt-1', isStar: true, isChecked: true },
  { id: '3', label: 'Option', href: '/opt-2', isStar: false, isChecked: true, hasDivider: true },
  { id: '4', label: 'Option', href: '/opt-3', isStar: true, isChecked: true },
  { id: '5', label: 'Option', href: '/opt-4', isStar: false, isChecked: true },
  { id: '6', label: 'Option', href: '/opt-5', isStar: true, isChecked: true },
  { id: '7', label: 'Option', href: '/opt-6', isStar: true, isChecked: true, hasDivider: true },
  { id: '8', label: 'Current Page', isCurrent: true },
];

function App() {
  const [count, setCount] = useState(0);
  const [appCheckboxChecked, setAppCheckboxChecked] = useState(true);
  const [sliderVal, setSliderVal] = useState(50);
  const [selectedFilters, setSelectedFilters] = useState(['audit', 'elevated-starred']);
  const [inputTags, setInputTags] = useState([
    { id: '1', label: 'FY2026 Strategy', isBranded: false },
    { id: '2', label: 'Financial_Model.docx', isBranded: true },
    { id: '3', label: 'Risk Analysis', isBranded: false },
  ]);
  const [activeSuggestion, setActiveSuggestion] = useState('Quarterly Audit');
  const [badgeCount, setBadgeCount] = useState(5);
  const [bannerProgress, setBannerProgress] = useState(30);
  const [bannerState, setBannerState] = useState('default');
  const [bannerVariant, setBannerVariant] = useState('primary');
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [showDismissibleBanner, setShowDismissibleBanner] = useState(true);
  const [listStyle, setListStyle] = useState('outlined');
  const [listSize, setListSize] = useState('medium');
  const [listDivided, setListDivided] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('opt-1');
  const [selectedChecks, setSelectedChecks] = useState(['chk-1', 'chk-2']);
  const [tabInteractiveSize, setTabInteractiveSize] = useState('large');
  const [activeTabId, setActiveTabId] = useState('summary');
  const [textareaValue, setTextareaValue] = useState('Antigravity token-driven architecture enables scalable and consistent enterprise design systems.');
  const [textareaVariant, setTextareaVariant] = useState('outlined');
  const [textareaState, setTextareaState] = useState('enabled');
  const [textareaWithHeader, setTextareaWithHeader] = useState(true);
  const [textareaActionStatus, setTextareaActionStatus] = useState('');

  const handleTextareaVoiceClick = () => {
    setTextareaActionStatus('Listening to voice audio...');
    setTimeout(() => {
      setTextareaValue((prev) => prev + ' [Speech transcribed successfully]');
      setTextareaActionStatus('Voice input transcribed into field.');
    }, 800);
  };

  const [tooltipTheme, setTooltipTheme] = useState('elevated');
  const [tooltipVariant, setTooltipVariant] = useState('rich-action');
  const [tooltipPlacement, setTooltipPlacement] = useState('top');

  const [snackbarSize, setSnackbarSize] = useState('single-line');
  const [snackbarOutlined, setSnackbarOutlined] = useState(false);
  const [liveToasts, setLiveToasts] = useState([]);

  const [appSwitchChecked, setAppSwitchChecked] = useState(true);
  const [appSwitchWithIcon, setAppSwitchWithIcon] = useState(true);
  const [appBarDemoTab, setAppBarDemoTab] = useState('full');
  const [bottomAppBarState, setBottomAppBarState] = useState('with-prompts');
  const [bottomAppBarMode, setBottomAppBarMode] = useState('text');
  const [bottomAppBarMute, setBottomAppBarMute] = useState(false);
  const [bottomAppExpandedPanel, setBottomAppExpandedPanel] = useState(false);
  const [bottomAppBarEnableMic, setBottomAppBarEnableMic] = useState(true);
  const [bottomAppBarEnableAttach, setBottomAppBarEnableAttach] = useState(true);
  const [bottomAppBarEnableSend, setBottomAppBarEnableSend] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDemoVariant, setModalDemoVariant] = useState('compact');
  const [tileVariant, setTileVariant] = useState('basic');
  const [tileStyle, setTileStyle] = useState('outlined');
  const [tileType, setTileType] = useState('empty-with-missing');
  const [sheetVariant, setSheetVariant] = useState('floating');
  const [sheetType, setSheetType] = useState('informational');
  const [sheetSize, setSheetSize] = useState('large');
  const [sheetStyle, setSheetStyle] = useState('outlined');
  const [sheetDrawerOpen, setSheetDrawerOpen] = useState(false);
  const [messageDemoView, setMessageDemoView] = useState('bubble'); // 'bubble' | 'thread' | 'audio'
  const [messageSender, setMessageSender] = useState('bot');
  const [messageLayout, setMessageLayout] = useState('default');
  const [messageState, setMessageState] = useState('minimized');
  const [messageThreadType, setMessageThreadType] = useState('default-bot-first');
  const [messageAudioMode, setMessageAudioMode] = useState('light');
  const [messageAudioDropdown, setMessageAudioDropdown] = useState(true);


  const spawnAppToast = (size, outlined) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      size,
      outlined,
      header: size.includes('header') || size.includes('media') ? 'Sources' : undefined,
      message: 'Client sample request updated successfully.',
      description: 'Audit documentation was verified and indexed into the engagement directory.',
      actionLabel: 'Modify',
      onAction: () => alert('Action clicked on snackbar!'),
    };
    setLiveToasts((prev) => [...prev, newToast]);
  };

  const removeAppToast = (id) => {
    setLiveToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const [activeMenuType, setActiveMenuType] = useState('dropdown');
  const [activeMenuDensity, setActiveMenuDensity] = useState('medium');
  const [dropdownBaseStyle, setDropdownBaseStyle] = useState('default-pill');
  const [dropdownBaseSize, setDropdownBaseSize] = useState('medium');
  const [dropdownOrientation, setDropdownOrientation] = useState('bottom');
  const [dropdownAlignment, setDropdownAlignment] = useState('left');
  const [dropdownItemType, setDropdownItemType] = useState('checklist');
  const [selectedDropdownItems, setSelectedDropdownItems] = useState(['Option 2', 'Option 4']);
  const [activeNavSelection, setActiveNavSelection] = useState('Inbox');

  const toggleDropdownSelection = (val) => {
    setSelectedDropdownItems((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleListCheck = (id) => {
    setSelectedChecks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFilter = (key) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const removeInputTag = (id) => {
    setInputTags((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ textAlign: 'left', padding: 'var(--spacing-8) 0' }}>
      <header style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1 style={{ fontSize: 'var(--font-size-headline-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-on-surface)', marginBottom: 'var(--spacing-2)' }}>
          KPMG WorkBench Design System
        </h1>
        <p style={{ fontSize: 'var(--font-size-body-lg)', color: 'var(--color-on-surface-light)' }}>
          Component Specifications: Menu (4 Canonical Types: Dropdown, Navigation, Overflow, Assistant), Snackbar (10 Canonical Variants), Tooltip (36 Positional &amp; 8 Content Variants), Textarea (20 Variants), Tab / Tabs (12 Variants), Lists (12 Variants), Banners (12 Variants), Badges (12 Variants), Chips (80+ Variants), File Uploaders, Progress Indicators, Sliders, Checkboxes, Buttons &amp; Breadcrumbs.
        </p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        {/* Menu Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: 0 }}>
              Menu Component (4 Canonical Types: Dropdown, Navigation, Overflow, Assistant)
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Menu Type:</span>
              {[
                { id: 'dropdown', label: 'Dropdown Menu' },
                { id: 'navigation', label: 'Navigation Menu' },
                { id: 'overflow', label: 'Overflow Menu' },
                { id: 'assistant', label: 'Assistant Menu' },
              ].map((t) => (
                <Button
                  key={t.id}
                  size="small"
                  variant={activeMenuType === t.id ? 'primary' : 'outline'}
                  onClick={() => setActiveMenuType(t.id)}
                >
                  {t.label}
                </Button>
              ))}

              {activeMenuType === 'dropdown' && (
                <>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)', marginLeft: '8px' }}>Density:</span>
                  {[
                    { id: 'small', label: 'Small (32px)' },
                    { id: 'medium', label: 'Medium (40px)' },
                    { id: 'large', label: 'Large (44px)' },
                  ].map((d) => (
                    <Button
                      key={d.id}
                      size="small"
                      variant={activeMenuDensity === d.id ? 'primary' : 'outline'}
                      onClick={() => setActiveMenuDensity(d.id)}
                    >
                      {d.label}
                    </Button>
                  ))}
                </>
              )}
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Implements all 4 canonical paradigms from the KPMG WorkBench design system: Dropdown menus (with Checklist &amp; Icon list items across 3 densities, 24 base variants, and 6 canonical item group assemblies), Navigation menus (with KPMG brand pill trigger, 52px pill items, notification badges, and section dividers), Overflow menus (compact 3-dots action menus), and Assistant menus (KPMG Trusted AI conversational search, verified badge, and rich prompt cards).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            {/* Interactive Showcase Panel for Selected Menu Type */}
            <div style={{ border: '1px solid var(--color-neutral-500)', borderRadius: '12px', padding: '24px', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                  Active Playground: {activeMenuType.toUpperCase()} MENU
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-neutral-200)' }}>
                  Selected Items: <strong>{selectedDropdownItems.join(', ') || 'None'}</strong>
                </span>
              </div>

              {/* 1. Dropdown Menu Playground */}
              {activeMenuType === 'dropdown' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {/* Dropdown Interactive Configurator Bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--color-surface-light)', border: '1px solid var(--color-neutral-outline)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Base Style:</span>
                        {[
                          { id: 'default-pill', label: 'Default Pill' },
                          { id: 'default-ghost', label: 'Default Ghost' },
                          { id: 'gradient', label: 'Gradient' },
                          { id: 'branded', label: 'Branded Logo' },
                          { id: 'card-outlined', label: 'Card Outlined' },
                          { id: 'card-filled', label: 'Card Filled' },
                        ].map((s) => (
                          <Button
                            key={s.id}
                            size="small"
                            variant={dropdownBaseStyle === s.id ? 'primary' : 'outline'}
                            onClick={() => setDropdownBaseStyle(s.id)}
                          >
                            {s.label}
                          </Button>
                        ))}
                      </div>

                      {!dropdownBaseStyle.startsWith('card') && dropdownBaseStyle !== 'branded' && (
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Base Size:</span>
                          {[
                            { id: 'small', label: '32px' },
                            { id: 'medium', label: '36px' },
                            { id: 'large', label: '40px' },
                          ].map((bs) => (
                            <Button
                              key={bs.id}
                              size="small"
                              variant={dropdownBaseSize === bs.id ? 'primary' : 'outline'}
                              onClick={() => setDropdownBaseSize(bs.id)}
                            >
                              {bs.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Orientation:</span>
                        {['bottom', 'top'].map((o) => (
                          <Button
                            key={o}
                            size="small"
                            variant={dropdownOrientation === o ? 'primary' : 'outline'}
                            onClick={() => setDropdownOrientation(o)}
                          >
                            {o.charAt(0).toUpperCase() + o.slice(1)}
                          </Button>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Alignment:</span>
                        {['left', 'center', 'right'].map((a) => (
                          <Button
                            key={a}
                            size="small"
                            variant={dropdownAlignment === a ? 'primary' : 'outline'}
                            onClick={() => setDropdownAlignment(a)}
                          >
                            {a.charAt(0).toUpperCase() + a.slice(1)}
                          </Button>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Item Type:</span>
                        {[
                          { id: 'checklist', label: 'Checklist (Circle)' },
                          { id: 'item-list', label: 'Item List (Star + Check)' },
                        ].map((it) => (
                          <Button
                            key={it.id}
                            size="small"
                            variant={dropdownItemType === it.id ? 'primary' : 'outline'}
                            onClick={() => setDropdownItemType(it.id)}
                          >
                            {it.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Popovers Preview Row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start' }}>
                    <div style={{ minWidth: '220px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
                        Configured Trigger (Click to open menu popover)
                      </div>
                      <div style={{ padding: '8px 0' }}>
                        <DropdownMenu
                          triggerLabel={dropdownBaseStyle.startsWith('card') ? 'Header' : (dropdownBaseStyle === 'branded' ? 'KPMG' : 'Options')}
                          baseStyle={
                            dropdownBaseStyle === 'gradient' ? 'gradient' :
                              dropdownBaseStyle === 'branded' ? 'branded' :
                                dropdownBaseStyle.startsWith('card') ? 'card' : 'default'
                          }
                          baseBackground={
                            dropdownBaseStyle === 'default-pill' || dropdownBaseStyle === 'branded' || dropdownBaseStyle === 'card-filled'
                          }
                          baseSize={
                            dropdownBaseStyle === 'branded' ? 'branded' :
                              dropdownBaseStyle.startsWith('card') ? 'none' : dropdownBaseSize
                          }
                          orientation={dropdownOrientation}
                          alignment={dropdownAlignment}
                          density={activeMenuDensity}
                          selectedValues={selectedDropdownItems}
                          onSelect={toggleDropdownSelection}
                          items={[
                            { label: 'Option 1', type: dropdownItemType === 'item-list' ? 'icon' : 'checklist' },
                            { label: 'Option 2', type: dropdownItemType === 'item-list' ? 'icon' : 'checklist' },
                            { label: 'Option 3', type: dropdownItemType === 'item-list' ? 'icon' : 'checklist' },
                            { label: 'Option 4', type: dropdownItemType === 'item-list' ? 'icon' : 'checklist' },
                            { type: 'divider' },
                            { label: 'Option 5', type: dropdownItemType === 'item-list' ? 'icon' : 'checklist' },
                          ]}
                        />
                      </div>
                    </div>

                    <div style={{ minWidth: '320px', maxWidth: '450px', flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
                        Card Trigger Dropdown (Outlined / Filled Form Factor)
                      </div>
                      <DropdownMenu
                        triggerType="card"
                        triggerLabel="Header"
                        baseBackground={dropdownBaseStyle === 'card-filled'}
                        density={activeMenuDensity}
                        orientation={dropdownOrientation}
                        alignment={dropdownAlignment}
                        selectedValues={selectedDropdownItems}
                        onSelect={toggleDropdownSelection}
                        items={[
                          { label: 'Option 1', type: 'icon' },
                          { label: 'Option 2', type: 'icon' },
                          { label: 'Option 3', type: 'icon' },
                          { label: 'Option 4', type: 'icon' },
                        ]}
                      />
                    </div>
                  </div>

                  {/* 6 Canonical Dropdown Item Groups Showcase */}
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--color-on-surface)' }}>
                      Dropdown Item Groups (6 Canonical Variants: 3 Densities &times; Checklist &amp; Item List)
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '8px' }}>
                          CHECKLIST &bull; SMALL (250px)
                        </div>
                        <DropdownItemGroup density="small" type="checklist" selectedValues={selectedDropdownItems} onSelect={toggleDropdownSelection} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '8px' }}>
                          CHECKLIST &bull; MEDIUM (298px)
                        </div>
                        <DropdownItemGroup density="medium" type="checklist" selectedValues={selectedDropdownItems} onSelect={toggleDropdownSelection} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '8px' }}>
                          CHECKLIST &bull; LARGE (322px)
                        </div>
                        <DropdownItemGroup density="large" type="checklist" selectedValues={selectedDropdownItems} onSelect={toggleDropdownSelection} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '8px' }}>
                          ITEM LIST &bull; SMALL (250px)
                        </div>
                        <DropdownItemGroup density="small" type="item-list" selectedValues={selectedDropdownItems} onSelect={toggleDropdownSelection} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '8px' }}>
                          ITEM LIST &bull; MEDIUM (298px)
                        </div>
                        <DropdownItemGroup density="medium" type="item-list" selectedValues={selectedDropdownItems} onSelect={toggleDropdownSelection} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '8px' }}>
                          ITEM LIST &bull; LARGE (322px)
                        </div>
                        <DropdownItemGroup density="large" type="item-list" selectedValues={selectedDropdownItems} onSelect={toggleDropdownSelection} />
                      </div>
                    </div>
                  </div>

                  {/* Canonical Dropdown Bases Showcase */}
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--color-on-surface)' }}>
                      Dropdown Bases (24 Canonical Variants: 4 Styles &times; Sizes &times; States)
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                      <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '10px' }}>DEFAULT PILL</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                          <DropdownBase styleType="default" background size="small" label="Options" />
                          <DropdownBase styleType="default" background size="medium" label="Options" />
                          <DropdownBase styleType="default" background size="large" label="Options" open />
                        </div>
                      </div>
                      <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '10px' }}>DEFAULT GHOST</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                          <DropdownBase styleType="default" background={false} size="small" label="Options" />
                          <DropdownBase styleType="default" background={false} size="medium" label="Options" />
                          <DropdownBase styleType="default" background={false} size="large" label="Options" open />
                        </div>
                      </div>
                      <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '10px' }}>GRADIENT &amp; BRANDED</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                          <DropdownBase styleType="gradient" size="medium" label="Options" />
                          <DropdownBase styleType="branded" size="branded" label="KPMG" />
                          <DropdownBase styleType="branded" size="branded" label="KPMG" open />
                        </div>
                      </div>
                      <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-200)', marginBottom: '10px' }}>CARD TRIGGERS</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <DropdownBase styleType="card" background={false} label="Header (Outlined)" />
                          <DropdownBase styleType="card" background={true} label="Header (Filled)" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Navigation Menu Playground */}
              {activeMenuType === 'navigation' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
                      KPMG Brand Pill Popover (Click to toggle)
                    </div>
                    <NavigationMenu
                      brandLabel="KPMG"
                      activeItem={activeNavSelection}
                      onSelect={(val) => setActiveNavSelection(val)}
                      items={[
                        { label: 'Inbox', badge: '24' },
                        { label: 'Outbox' },
                        { label: 'Favorites' },
                        { label: 'Trash' },
                        { type: 'divider' },
                        {
                          type: 'group',
                          title: 'Labels',
                          items: [
                            { label: 'Audit 2026', actionButton: true },
                            { label: 'Tax Strategy', actionButton: true },
                            { label: 'Cyber Advisory', actionButton: true },
                          ],
                        },
                      ]}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
                      Stationary Sidebar Panel (Inline)
                    </div>
                    <NavigationMenu
                      inline
                      header="Navigation"
                      activeItem={activeNavSelection}
                      onSelect={(val) => setActiveNavSelection(val)}
                      items={[
                        { label: 'Inbox', badge: '24' },
                        { label: 'Outbox' },
                        { label: 'Favorites' },
                        { label: 'Trash' },
                        { type: 'divider' },
                        {
                          type: 'group',
                          title: 'Labels',
                          items: [
                            { label: 'Audit 2026', actionButton: true },
                            { label: 'Tax Strategy', actionButton: true },
                            { label: 'Cyber Advisory', actionButton: true },
                          ],
                        },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* 3. Overflow Menu Playground */}
              {activeMenuType === 'overflow' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
                      Large Trigger (40px)
                    </div>
                    <OverflowMenu
                      size="large"
                      items={[
                        { label: 'Option 1' },
                        { label: 'Option 2' },
                        { label: 'Option 3' },
                        { type: 'divider' },
                        { label: 'Delete record', destructive: true },
                      ]}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
                      Small Trigger (24px)
                    </div>
                    <OverflowMenu
                      size="small"
                      items={[
                        { label: 'Option 1' },
                        { label: 'Option 2' },
                        { label: 'Option 3' },
                        { type: 'divider' },
                        { label: 'Remove', destructive: true },
                      ]}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
                      Static Overflow Card
                    </div>
                    <Menu inline type="overflow" width={200}>
                      <MenuItem label="Edit details" />
                      <MenuItem label="Duplicate item" />
                      <MenuItem label="Export as CSV" />
                      <MenuDivider />
                      <MenuItem label="Delete record" destructive />
                    </Menu>
                  </div>
                </div>
              )}

              {/* 4. Assistant Menu Playground */}
              {activeMenuType === 'assistant' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
                      Interactive Assistant Trigger (Click sparkle)
                    </div>
                    <AssistantMenu
                      searchPlaceholder="Ask me anything"
                      ctaLabel="Longer action"
                      onCtaClick={() => alert('Starting new chat with KPMG Trusted AI...')}
                      sections={[
                        {
                          title: 'Title',
                          cards: [
                            {
                              title: 'Header',
                              subtitle: 'Supporting line text lorem ipsum...',
                            },
                            {
                              title: 'Header',
                              subtitle: 'Supporting line text lorem ipsum...',
                            },
                            {
                              title: 'Header',
                              subtitle: 'Supporting line text lorem ipsum...',
                            },
                          ],
                        },
                      ]}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-neutral-100)' }}>
                      Static Preview (Figma Prototype View)
                    </div>
                    <Menu inline type="assistant" width={380}>
                      <div className="kpmg-assistant-menu__search-bar">
                        <span className="kpmg-assistant-menu__search-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                        </span>
                        <input
                          type="text"
                          className="kpmg-assistant-menu__search-input"
                          placeholder="Ask me anything"
                          readOnly
                        />
                      </div>
                      <div className="kpmg-assistant-menu__verification">
                        Verified by KPMG Trusted AI
                      </div>
                      <MenuGroup title="Title">
                        <AssistantCard
                          title="Header"
                          subtitle="Supporting line text lorem ipsum..."
                        />
                        <AssistantCard
                          title="Header"
                          subtitle="Supporting line text lorem ipsum..."
                        />
                      </MenuGroup>
                      <div className="kpmg-assistant-menu__footer">
                        <button type="button" className="kpmg-assistant-menu__cta-btn">
                          Longer action
                        </button>
                      </div>
                    </Menu>
                  </div>
                </div>
              )}
            </div>

            {/* 4 Canonical Types Comparison Matrix */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-on-surface)' }}>
                4 Canonical Menu Types Overview
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', alignItems: 'flex-start' }}>
                {/* 1. Dropdown Menu */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    01. Dropdown Menu
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Menu inline type="dropdown" density="small">
                      <MenuItem density="small" type="checklist" selected={false} label="Option 1" />
                      <MenuItem density="small" type="checklist" selected={true} label="Option 2" />
                      <MenuItem density="small" type="checklist" selected={false} label="Option 3" />
                      <MenuDivider />
                      <MenuItem density="small" type="checklist" selected={false} label="Option 4" />
                    </Menu>
                  </div>
                </div>

                {/* 2. Navigation Menu */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    02. Navigation Menu
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <NavigationMenu
                      inline
                      header="Header"
                      activeItem="Inbox"
                      width="100%"
                      items={[
                        { label: 'Inbox', badge: '24' },
                        { label: 'Outbox' },
                        { type: 'divider' },
                        {
                          type: 'group',
                          title: 'Labels',
                          items: [
                            { label: 'Label 1', actionButton: true },
                            { label: 'Label 2', actionButton: true },
                          ],
                        },
                      ]}
                    />
                  </div>
                </div>

                {/* 3. Overflow Menu */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    03. Overflow Menu
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Menu inline type="overflow" width="100%">
                      <MenuItem density="small" label="Option 1" />
                      <MenuItem density="small" label="Option 2" />
                      <MenuItem density="small" label="Option 3" />
                      <MenuDivider />
                      <MenuItem density="small" label="Delete Option" destructive />
                    </Menu>
                  </div>
                </div>

                {/* 4. Assistant Menu */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    04. Assistant Menu
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Menu inline type="assistant" width="100%">
                      <div className="kpmg-assistant-menu__search-bar">
                        <span className="kpmg-assistant-menu__search-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                        </span>
                        <input
                          type="text"
                          className="kpmg-assistant-menu__search-input"
                          placeholder="Ask me anything"
                          readOnly
                          style={{ fontSize: '12px' }}
                        />
                      </div>
                      <div className="kpmg-assistant-menu__verification" style={{ fontSize: '10px' }}>
                        Verified by KPMG Trusted AI
                      </div>
                      <AssistantCard
                        title="Header"
                        subtitle="Supporting line text lorem ipsum..."
                      />
                      <div className="kpmg-assistant-menu__footer">
                        <button type="button" className="kpmg-assistant-menu__cta-btn" style={{ fontSize: '12px', padding: '6px 16px' }}>
                          Longer action
                        </button>
                      </div>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Snackbar Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: 0 }}>
              Snackbar Component (10 Canonical Variants: 5 Layout Form Factors &times; Elevated &amp; Outlined)
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Treatment:</span>
              <Button
                size="small"
                variant={!snackbarOutlined ? 'primary' : 'outline'}
                onClick={() => setSnackbarOutlined(false)}
              >
                Elevated
              </Button>
              <Button
                size="small"
                variant={snackbarOutlined ? 'primary' : 'outline'}
                onClick={() => setSnackbarOutlined(true)}
              >
                Outlined
              </Button>

              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)', marginLeft: '8px' }}>Size:</span>
              {[
                { id: 'single-line', label: 'Single' },
                { id: 'two-line', label: 'Two-Line' },
                { id: 'extended', label: 'Extended' },
                { id: 'extended-header', label: 'Header' },
                { id: 'extended-media', label: 'Media' },
              ].map((s) => (
                <Button
                  key={s.id}
                  size="small"
                  variant={snackbarSize === s.id ? 'primary' : 'outline'}
                  onClick={() => setSnackbarSize(s.id)}
                >
                  {s.label}
                </Button>
              ))}

              <Button
                size="small"
                variant="secondary"
                onClick={() => spawnAppToast(snackbarSize, snackbarOutlined)}
                style={{ marginLeft: '12px' }}
              >
                Spawn Live Toast
              </Button>
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Standard width, border radius, padding, primary action buttons, dismissible close icons, and up to 3 interactive media card items. Includes bottom-left viewport toast support.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            {/* Interactive Live Snackbar Playground */}
            <div style={{ border: '1px solid var(--color-neutral-500)', borderRadius: '12px', padding: '24px', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                  Interactive Playground Preview
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-neutral-200)' }}>
                  Size: <strong>{snackbarSize}</strong> | Treatment: <strong>{snackbarOutlined ? 'Outlined' : 'Elevated'}</strong>
                </span>
              </div>

              <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'flex-start' }}>
                <Snackbar
                  size={snackbarSize}
                  outlined={snackbarOutlined}
                  header="Sources"
                  message="Snackbar text goes here"
                  description="Audit documentation was verified and indexed into the engagement directory."
                  actionLabel={snackbarSize.includes('extended') ? 'Longer action' : 'Action'}
                  onAction={() => alert('Snackbar action clicked')}
                />
              </div>
            </div>

            {/* Canonical 10-Variant Overview Matrix */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-on-surface)' }}>
                Canonical 10-Variant Overview Matrix
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                {/* 1. Single Line Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    01. Single-Line &bull; Elevated
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="single-line" outlined={false} message="Snackbar text goes here" actionLabel="Action" />
                  </div>
                </div>

                {/* 2. Single Line Outlined */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    02. Single-Line &bull; Outlined
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="single-line" outlined={true} message="Snackbar text goes here" actionLabel="Action" />
                  </div>
                </div>

                {/* 3. Two Line Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    03. Two-Line &bull; Elevated
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="two-line" outlined={false} message="Snackbar text goes here" actionLabel="Action" />
                  </div>
                </div>

                {/* 4. Two Line Outlined */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    04. Two-Line &bull; Outlined
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="two-line" outlined={true} message="Snackbar text goes here" actionLabel="Action" />
                  </div>
                </div>

                {/* 5. Extended Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    05. Extended &bull; Elevated
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="extended" outlined={false} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." actionLabel="Longer action" />
                  </div>
                </div>

                {/* 6. Extended Outlined */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    06. Extended &bull; Outlined
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="extended" outlined={true} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." actionLabel="Longer action" />
                  </div>
                </div>

                {/* 7. Extended with Header Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    07. Extended with Header &bull; Elevated
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="extended-header" outlined={false} header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." actionLabel="Longer action" />
                  </div>
                </div>

                {/* 8. Extended with Header Outlined */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    08. Extended with Header &bull; Outlined
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="extended-header" outlined={true} header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." actionLabel="Longer action" />
                  </div>
                </div>

                {/* 9. Extended with Media Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    09. Extended with Media &bull; Elevated
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="extended-media" outlined={false} header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." actionLabel="Longer action" />
                  </div>
                </div>

                {/* 10. Extended with Media Outlined */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    10. Extended with Media &bull; Outlined
                  </span>
                  <div style={{ marginTop: '12px' }}>
                    <Snackbar size="extended-media" outlined={true} header="Header" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." actionLabel="Longer action" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tooltip Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: 0 }}>
              Tooltip Component (36 Positional &amp; 8 Content Variants: Elevated &amp; Filled &times; Carets &times; Rich Formats)
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Theme:</span>
              {['elevated', 'filled'].map((th) => (
                <Button
                  key={th}
                  size="small"
                  variant={tooltipTheme === th ? 'primary' : 'outline'}
                  onClick={() => setTooltipTheme(th)}
                >
                  {th.charAt(0).toUpperCase() + th.slice(1)}
                </Button>
              ))}

              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)', marginLeft: '8px' }}>Placement:</span>
              {['top', 'bottom', 'left', 'right'].map((pl) => (
                <Button
                  key={pl}
                  size="small"
                  variant={tooltipPlacement === pl ? 'primary' : 'outline'}
                  onClick={() => setTooltipPlacement(pl)}
                >
                  {pl.charAt(0).toUpperCase() + pl.slice(1)}
                </Button>
              ))}

              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)', marginLeft: '8px' }}>Type:</span>
              {[
                { id: 'single-line', label: 'Single' },
                { id: 'multi-line', label: 'Multi' },
                { id: 'rich-action', label: 'Action' },
                { id: 'rich-source', label: 'Source' },
                { id: 'rich-alert-large', label: 'Alert' },
                { id: 'menu-list', label: 'Menu' },
              ].map((ty) => (
                <Button
                  key={ty.id}
                  size="small"
                  variant={tooltipVariant === ty.id ? 'primary' : 'outline'}
                  onClick={() => setTooltipVariant(ty.id)}
                >
                  {ty.label}
                </Button>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Features 2 color themes (Elevated white &amp; Filled lavender), 3 caret dimensions (Small 12&times;6, Medium 18&times;9, Large 24&times;12), 12 orientation alignments, interactive hover/click triggers, and full WAI-ARIA compliance.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            {/* Interactive Live Tooltip Playground */}
            <div style={{ border: '1px solid var(--color-neutral-500)', borderRadius: '12px', padding: '32px', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                  Interactive Live Trigger Playground
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-neutral-200)' }}>
                  Theme: <strong>{tooltipTheme}</strong> | Type: <strong>{tooltipVariant}</strong> | Placement: <strong>{tooltipPlacement}</strong>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap', padding: '24px 0' }}>
                <Tooltip
                  theme={tooltipTheme}
                  variant={tooltipVariant}
                  placement={tooltipPlacement}
                  trigger="hover"
                  title="Project Methodology"
                  content="Supporting guidance for audit engagement protocols and verification workflows."
                  sectionLabel="Secondary text"
                >
                  <Button variant="primary">Hover Me (Dynamic Tooltip)</Button>
                </Tooltip>

                <Tooltip
                  theme={tooltipTheme}
                  variant="rich-action"
                  placement={tooltipPlacement}
                  trigger="click"
                  title="Contextual Action Required"
                  content="Review document comparison results before submitting to the client review portal."
                >
                  <Button variant="secondary">Click Me (Rich Action)</Button>
                </Tooltip>

                <Tooltip
                  theme={tooltipTheme}
                  variant="menu-list"
                  placement={tooltipPlacement}
                  trigger="click"
                >
                  <Button variant="outline">Click Me (Action Menu)</Button>
                </Tooltip>
              </div>
            </div>

            {/* Static Variant Showcase Cards */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-on-surface)' }}>
                Canonical Tooltip Formats &amp; Themes Overview
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '20px' }}>
                {/* 1. Single Line Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    01. Single-Line &bull; Elevated
                  </span>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Tooltip static theme="elevated" variant="single-line" placement="top" content="Supporting text" />
                  </div>
                </div>

                {/* 2. Single Line Filled */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    02. Single-Line &bull; Filled
                  </span>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Tooltip static theme="filled" variant="single-line" placement="top" content="Supporting text" />
                  </div>
                </div>

                {/* 3. Multi Line Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    03. Multi-Line &bull; Elevated
                  </span>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Tooltip static theme="elevated" variant="multi-line" placement="top" content="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit." />
                  </div>
                </div>

                {/* 4. Multi Line Filled */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    04. Multi-Line &bull; Filled
                  </span>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Tooltip static theme="filled" variant="multi-line" placement="top" content="Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit." />
                  </div>
                </div>

                {/* 5. Rich Action Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    05. Rich Action &bull; Elevated
                  </span>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Tooltip static theme="elevated" variant="rich-action" placement="top" title="Title" content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt." />
                  </div>
                </div>

                {/* 6. Rich Action Filled */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    06. Rich Action &bull; Filled
                  </span>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Tooltip static theme="filled" variant="rich-action" placement="top" title="Title" content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt." />
                  </div>
                </div>

                {/* 7. Rich Alert Large Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    07. Rich Alert &bull; Elevated
                  </span>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Tooltip static theme="elevated" variant="rich-alert-large" placement="top" title="Citation" content="Supporting text. Lorem ipsum dolor sit amet, consectetur elit." sectionLabel="Source files" />
                  </div>
                </div>

                {/* 8. Menu List Elevated */}
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    08. Menu List &bull; Elevated
                  </span>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Tooltip static theme="elevated" variant="menu-list" placement="top" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Textarea Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: 0 }}>
              Textarea Component (20 Production Variants: Outlined &amp; Filled &times; With/Without Header &times; 5 States)
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Style:</span>
              {['outlined', 'filled'].map((v) => (
                <Button
                  key={v}
                  size="small"
                  variant={textareaVariant === v ? 'primary' : 'outline'}
                  onClick={() => setTextareaVariant(v)}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Button>
              ))}

              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)', marginLeft: '8px' }}>State:</span>
              {['enabled', 'hovered', 'focused', 'error', 'disabled'].map((st) => (
                <Button
                  key={st}
                  size="small"
                  variant={textareaState === st ? 'primary' : 'outline'}
                  onClick={() => setTextareaState(st)}
                >
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </Button>
              ))}

              <Button
                size="small"
                variant={textareaWithHeader ? 'primary' : 'outline'}
                onClick={() => setTextareaWithHeader(!textareaWithHeader)}
                style={{ marginLeft: '8px' }}
              >
                {textareaWithHeader ? 'With Header' : 'Without Header'}
              </Button>
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Supports Outlined and Filled visual styles, live character count (0/100), trailing speech-to-text action button, and full WAI-ARIA form validation.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            {/* Live Interactive Textarea */}
            <div style={{ border: '1px solid var(--color-neutral-500)', borderRadius: '12px', padding: '24px', backgroundColor: 'var(--color-surface)', maxWidth: '640px' }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                  Interactive Playground (Live Speech &amp; Dynamic State)
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-neutral-200)' }}>
                  Active State: <strong>{textareaState}</strong> | Style: <strong>{textareaVariant}</strong>
                </span>
              </div>

              <Textarea
                label={textareaWithHeader ? 'Project Notes & Methodology' : undefined}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                variant={textareaVariant}
                state={textareaState}
                disabled={textareaState === 'disabled'}
                maxLength={200}
                showCount={textareaWithHeader}
                placeholder="Enter project specifications or click microphone for voice transcription..."
                onActionClick={handleTextareaVoiceClick}
                helperText={textareaActionStatus || (textareaState === 'error' ? 'Validation Error: Character limits or required parameters violated.' : 'Press speech action icon to dictate commentary.')}
              />
            </div>

            {/* 20 Variants Canonical Grid Preview */}
            <div style={{ marginTop: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px', color: 'var(--color-on-surface)' }}>
                Canonical 20-Variant Overview Matrix
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {/* 1. Outlined Without Header */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    01. Outlined &bull; Without Header &bull; Enabled
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="outlined" state="enabled" placeholder="Outlined Resting" />
                  </div>
                </div>

                {/* 2. Outlined Without Header Hovered */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    02. Outlined &bull; Without Header &bull; Hovered
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="outlined" state="hovered" placeholder="Outlined Hovered" />
                  </div>
                </div>

                {/* 3. Outlined Without Header Focused */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    03. Outlined &bull; Without Header &bull; Focused
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="outlined" state="focused" placeholder="Outlined Focused" />
                  </div>
                </div>

                {/* 4. Outlined Without Header Error */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    04. Outlined &bull; Without Header &bull; Error
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="outlined" state="error" placeholder="Outlined Error" helperText="Error feedback" />
                  </div>
                </div>

                {/* 5. Outlined Without Header Disabled */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    05. Outlined &bull; Without Header &bull; Disabled
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="outlined" state="disabled" placeholder="Outlined Disabled" disabled />
                  </div>
                </div>

                {/* 6. Filled Without Header Enabled */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    06. Filled &bull; Without Header &bull; Enabled
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="filled" state="enabled" placeholder="Filled Resting" />
                  </div>
                </div>

                {/* 7. Filled Without Header Hovered */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    07. Filled &bull; Without Header &bull; Hovered
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="filled" state="hovered" placeholder="Filled Hovered" />
                  </div>
                </div>

                {/* 8. Filled Without Header Focused */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    08. Filled &bull; Without Header &bull; Focused
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="filled" state="focused" placeholder="Filled Focused" />
                  </div>
                </div>

                {/* 9. Filled Without Header Error */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    09. Filled &bull; Without Header &bull; Error
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="filled" state="error" placeholder="Filled Error" helperText="Error feedback" />
                  </div>
                </div>

                {/* 10. Filled Without Header Disabled */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    10. Filled &bull; Without Header &bull; Disabled
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea variant="filled" state="disabled" placeholder="Filled Disabled" disabled />
                  </div>
                </div>

                {/* 11. Outlined With Header Enabled */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    11. Outlined &bull; With Header &bull; Enabled
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="outlined" state="enabled" placeholder="Placeholder" />
                  </div>
                </div>

                {/* 12. Outlined With Header Hovered */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    12. Outlined &bull; With Header &bull; Hovered
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="outlined" state="hovered" placeholder="Placeholder" />
                  </div>
                </div>

                {/* 13. Outlined With Header Focused */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    13. Outlined &bull; With Header &bull; Focused
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="outlined" state="focused" placeholder="Placeholder" />
                  </div>
                </div>

                {/* 14. Outlined With Header Error */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    14. Outlined &bull; With Header &bull; Error
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="outlined" state="error" placeholder="Placeholder" helperText="Input validation error" />
                  </div>
                </div>

                {/* 15. Outlined With Header Disabled */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    15. Outlined &bull; With Header &bull; Disabled
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="outlined" state="disabled" placeholder="Placeholder" disabled />
                  </div>
                </div>

                {/* 16. Filled With Header Enabled */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    16. Filled &bull; With Header &bull; Enabled
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="filled" state="enabled" placeholder="Placeholder" />
                  </div>
                </div>

                {/* 17. Filled With Header Hovered */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    17. Filled &bull; With Header &bull; Hovered
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="filled" state="hovered" placeholder="Placeholder" />
                  </div>
                </div>

                {/* 18. Filled With Header Focused */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    18. Filled &bull; With Header &bull; Focused
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="filled" state="focused" placeholder="Placeholder" />
                  </div>
                </div>

                {/* 19. Filled With Header Error */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    19. Filled &bull; With Header &bull; Error
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="filled" state="error" placeholder="Placeholder" helperText="Input validation error" />
                  </div>
                </div>

                {/* 20. Filled With Header Disabled */}
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', backgroundColor: 'var(--color-surface)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-200)', textTransform: 'uppercase' }}>
                    20. Filled &bull; With Header &bull; Disabled
                  </span>
                  <div style={{ marginTop: '8px' }}>
                    <Textarea label="Label" maxLength={100} showCount variant="filled" state="disabled" placeholder="Placeholder" disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab (Tabs / Tab Bar) Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: 0 }}>
              Tab Component (12 Production Variants: Small &amp; Large &times; Default &amp; With Badge &times; States)
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Container Size:</span>
              {['small', 'large'].map((sz) => (
                <Button
                  key={sz}
                  size="small"
                  variant={tabInteractiveSize === sz ? 'primary' : 'outline'}
                  onClick={() => setTabInteractiveSize(sz)}
                >
                  {sz.charAt(0).toUpperCase() + sz.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Compact height for widgets/tiles and 65px Top App Bar with trailing action controls. Features full WAI-ARIA tablist accessibility, keyboard navigation, and complete Light &amp; Dark theme token support.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            {/* Interactive Live Preview */}
            <div style={{ border: '1px solid var(--color-neutral-500)', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--color-neutral-500)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-surface-light)' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                  Interactive Live Workspace (Active Tab: {activeTabId})
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-neutral-100)' }}>
                  Keyboard navigable (Arrow keys, Home, End)
                </span>
              </div>
              <Tab
                size={tabInteractiveSize}
                value={activeTabId}
                onChange={(tabId) => setActiveTabId(tabId)}
              >
                <TabItem id="summary" label="Summary" badge="4" />
                <TabItem id="projects" label="Projects" badge="12" />
                <TabItem id="analytics" label="Analytics" />
                <TabItem id="reports" label="Audit Reports" />
                <TabItem id="archive" label="Archived" disabled />
              </Tab>
              <div style={{ padding: '24px', minHeight: '100px' }}>
                {activeTabId === 'summary' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '4px' }}>Overview &amp; Summary</h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)' }}>
                      Interactive navigation synchronized across responsive tabs with tokenized active background fills.
                    </p>
                  </div>
                )}
                {activeTabId === 'projects' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '4px' }}>Active Projects (12)</h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)' }}>
                      High-priority audit and advisory engagements in progress with real-time badge counters.
                    </p>
                  </div>
                )}
                {activeTabId === 'analytics' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '4px' }}>Performance Analytics</h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)' }}>
                      Predictive engagement telemetry displaying 99.4% on-schedule milestone delivery.
                    </p>
                  </div>
                )}
                {activeTabId === 'reports' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '4px' }}>Audit Reports</h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-neutral-100)' }}>
                      Governance documentation verified against KPMG compliance standards.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Complete 12 Canonical Variants Matrix */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-title-sm)', marginBottom: 'var(--spacing-3)', color: 'var(--color-on-surface)' }}>
                All 12 Canonical Design System Variants
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>1. Small - Default - Inactive</div>
                  <Tab size="small">
                    <TabItem id="1" label="Tab" state="enabled" />
                    <TabItem id="2" label="Tab" state="enabled" />
                    <TabItem id="3" label="Tab" state="enabled" />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>2. Small - Default - Active (Selected)</div>
                  <Tab size="small" defaultValue="1">
                    <TabItem id="1" label="Tab" selected />
                    <TabItem id="2" label="Tab" />
                    <TabItem id="3" label="Tab" />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>3. Small - Default - Hovered</div>
                  <Tab size="small">
                    <TabItem id="1" label="Tab" state="hovered" />
                    <TabItem id="2" label="Tab" />
                    <TabItem id="3" label="Tab" />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>4. Small - Default - Disabled</div>
                  <Tab size="small">
                    <TabItem id="1" label="Tab" disabled />
                    <TabItem id="2" label="Tab" disabled />
                    <TabItem id="3" label="Tab" disabled />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>5. Small - With Badge - Inactive</div>
                  <Tab size="small">
                    <TabItem id="1" label="Tab" badge="4" state="enabled" />
                    <TabItem id="2" label="Tab" badge="4" state="enabled" />
                    <TabItem id="3" label="Tab" badge="4" state="enabled" />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>6. Small - With Badge - Active (Selected)</div>
                  <Tab size="small" defaultValue="1">
                    <TabItem id="1" label="Tab" badge="4" selected />
                    <TabItem id="2" label="Tab" badge="4" />
                    <TabItem id="3" label="Tab" badge="4" />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>7. Small - With Badge - Hovered</div>
                  <Tab size="small">
                    <TabItem id="1" label="Tab" badge="4" state="hovered" />
                    <TabItem id="2" label="Tab" badge="4" />
                    <TabItem id="3" label="Tab" badge="4" />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>8. Small - With Badge - Disabled</div>
                  <Tab size="small">
                    <TabItem id="1" label="Tab" badge="4" disabled />
                    <TabItem id="2" label="Tab" badge="4" disabled />
                    <TabItem id="3" label="Tab" badge="4" disabled />
                  </Tab>
                </div>
              </div>

              {/* Large Bar Variants */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>9. Large - Default - Active with Trailing Actions</div>
                  <Tab size="large" defaultValue="1">
                    <TabItem id="1" label="Tab" selected />
                    <TabItem id="2" label="Tab" />
                    <TabItem id="3" label="Tab" />
                    <TabItem id="4" label="Tab" />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>10. Large - With Badge - Active with Trailing Actions</div>
                  <Tab size="large" defaultValue="1">
                    <TabItem id="1" label="Tab" badge="4" selected />
                    <TabItem id="2" label="Tab" badge="4" />
                    <TabItem id="3" label="Tab" badge="4" />
                    <TabItem id="4" label="Tab" badge="4" />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>11. Large - Clean - Without Trailing Actions</div>
                  <Tab size="large" actions={<span />} defaultValue="1">
                    <TabItem id="1" label="Tab" selected />
                    <TabItem id="2" label="Tab" />
                    <TabItem id="3" label="Tab" />
                    <TabItem id="4" label="Tab" />
                  </Tab>
                </div>

                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-neutral-500)', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)', marginBottom: '10px' }}>12. Large - Mixed Badges - With Trailing Actions</div>
                  <Tab size="large" defaultValue="1">
                    <TabItem id="1" label="Tab" selected />
                    <TabItem id="2" label="Tab" badge="8" />
                    <TabItem id="3" label="Tab" badge="3" />
                    <TabItem id="4" label="Tab" disabled />
                  </Tab>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* List Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: 0 }}>
              List Component (12 Variants: 4 Leading Types &times; 3 Container Styles)
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['outlined', 'elevated', 'filled'].map((st) => (
                <Button
                  key={st}
                  size="small"
                  variant={listStyle === st ? 'primary' : 'outline'}
                  onClick={() => setListStyle(st)}
                >
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Vertical collection layout with Outlined, Elevated, and Filled container treatments. Supports Avatar, Image Thumbnail, Checkbox, and Radio button rows in Small (1-line), Medium (2-line), and Large (3-line) densities.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            {/* Interactive Customizer */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ fontSize: 'var(--font-size-title-sm)', margin: 0, color: 'var(--color-on-surface)' }}>
                  Interactive Preview (Style: {listStyle}, Density: {listSize}, Dividers: {listDivided ? 'Yes' : 'No'})
                </h3>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Density:</span>
                  {['small', 'medium', 'large'].map((sz) => (
                    <Button
                      key={sz}
                      size="small"
                      variant={listSize === sz ? 'tonal' : 'text'}
                      onClick={() => setListSize(sz)}
                    >
                      {sz}
                    </Button>
                  ))}
                  <Button
                    size="small"
                    variant={listDivided ? 'filled' : 'outline'}
                    onClick={() => setListDivided(!listDivided)}
                  >
                    {listDivided ? 'Dividers On' : 'Dividers Off'}
                  </Button>
                </div>
              </div>

              <div style={{ maxWidth: '480px' }}>
                <List styleType={listStyle} size={listSize} divided={listDivided}>
                  <ListItem
                    title="Audit Workpaper FY2026"
                    supportingText="Supporting line text lorem ipsum dolor sit amet."
                    secondaryText="Last modified today at 10:45 AM"
                    leading="avatar"
                    leadingProps={{ initials: 'AW' }}
                    trailing="checkbox"
                    trailingProps={{ checked: true }}
                    onClick={() => alert('Clicked Audit Workpaper')}
                  />
                  <ListItem
                    title="Financial Forecasting Document"
                    supportingText="Supporting line text lorem ipsum dolor sit amet."
                    secondaryText="Pending team review"
                    leading="image"
                    trailing="arrow"
                    onClick={() => alert('Clicked Financial Forecasting')}
                  />
                  <ListItem
                    title="Cloud Security Compliance"
                    supportingText="Supporting line text lorem ipsum dolor sit amet."
                    secondaryText="ISO 27001 standard approved"
                    leading="checkbox"
                    leadingProps={{ checked: selectedChecks.includes('chk-1') }}
                    trailing="arrow"
                    selected={selectedChecks.includes('chk-1')}
                    onClick={() => toggleListCheck('chk-1')}
                  />
                  <ListItem
                    title="Executive Board Summary"
                    supportingText="Supporting line text lorem ipsum dolor sit amet."
                    secondaryText="Ready for quarterly presentation"
                    leading="radio"
                    leadingProps={{ checked: selectedRadio === 'opt-1' }}
                    trailing="arrow"
                    selected={selectedRadio === 'opt-1'}
                    onClick={() => setSelectedRadio('opt-1')}
                  />
                </List>
              </div>
            </div>

            {/* Complete 12 Variants Matrix */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-title-sm)', marginBottom: 'var(--spacing-3)', color: 'var(--color-on-surface)' }}>
                Complete 12-Variant Matrix (4 Leading Control Types &times; 3 Container Styles)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                {/* 1. Avatar Leading (Outlined, Elevated, Filled) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary-on-surface)' }}>
                    1. AVATAR LEADING
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Outlined Style</div>
                  <List styleType="outlined" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ip..." leading="avatar" leadingProps={{ initials: 'AZ' }} trailing="checkbox" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ip..." leading="avatar" leadingProps={{ initials: 'AZ' }} trailing="checkbox" />
                  </List>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Elevated Style</div>
                  <List styleType="elevated" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ip..." leading="avatar" leadingProps={{ initials: 'AZ' }} trailing="checkbox" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ip..." leading="avatar" leadingProps={{ initials: 'AZ' }} trailing="checkbox" />
                  </List>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Filled Style</div>
                  <List styleType="filled" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ip..." leading="avatar" leadingProps={{ initials: 'AZ' }} trailing="checkbox" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ip..." leading="avatar" leadingProps={{ initials: 'AZ' }} trailing="checkbox" />
                  </List>
                </div>

                {/* 2. Image Thumbnail Leading (Outlined, Elevated, Filled) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary-on-surface)' }}>
                    2. IMAGE / THUMBNAIL LEADING
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Outlined Style</div>
                  <List styleType="outlined" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ipsum d..." leading="image" trailing="none" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ipsum d..." leading="image" trailing="none" />
                  </List>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Elevated Style</div>
                  <List styleType="elevated" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ipsum d..." leading="image" trailing="none" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ipsum d..." leading="image" trailing="none" />
                  </List>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Filled Style</div>
                  <List styleType="filled" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ipsum d..." leading="image" trailing="none" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ipsum d..." leading="image" trailing="none" />
                  </List>
                </div>

                {/* 3. Checkbox Leading (Outlined, Elevated, Filled) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary-on-surface)' }}>
                    3. CHECKBOX LEADING
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Outlined Style</div>
                  <List styleType="outlined" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="checkbox" leadingProps={{ checked: true }} trailing="arrow" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="checkbox" leadingProps={{ checked: true }} trailing="arrow" />
                  </List>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Elevated Style</div>
                  <List styleType="elevated" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="checkbox" leadingProps={{ checked: true }} trailing="arrow" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="checkbox" leadingProps={{ checked: true }} trailing="arrow" />
                  </List>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Filled Style</div>
                  <List styleType="filled" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="checkbox" leadingProps={{ checked: true }} trailing="arrow" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="checkbox" leadingProps={{ checked: true }} trailing="arrow" />
                  </List>
                </div>

                {/* 4. Radio Leading (Outlined, Elevated, Filled) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary-on-surface)' }}>
                    4. RADIO BUTTON LEADING
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Outlined Style</div>
                  <List styleType="outlined" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="radio" leadingProps={{ checked: true }} trailing="arrow" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="radio" leadingProps={{ checked: true }} trailing="arrow" />
                  </List>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Elevated Style</div>
                  <List styleType="elevated" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="radio" leadingProps={{ checked: true }} trailing="arrow" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="radio" leadingProps={{ checked: true }} trailing="arrow" />
                  </List>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-light)' }}>Filled Style</div>
                  <List styleType="filled" size="medium">
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="radio" leadingProps={{ checked: true }} trailing="arrow" />
                    <ListItem title="List item" supportingText="Supporting line text lorem ips..." leading="radio" leadingProps={{ checked: true }} trailing="arrow" />
                  </List>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: 0 }}>
              Banner Component (12 Variants: 6 Semantic Themes &times; 2 States)
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                size="small"
                variant={bannerState === 'default' ? 'primary' : 'outline'}
                onClick={() => setBannerState('default')}
              >
                Default State
              </Button>
              <Button
                size="small"
                variant={bannerState === 'animated' ? 'primary' : 'outline'}
                onClick={() => setBannerState('animated')}
              >
                Animated State
              </Button>
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            High-level window status banner featuring robot AI leading icon, label typography, status percentages, and linear progress indicators.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            {/* Interactive Live Banner */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-title-sm)', marginBottom: 'var(--spacing-3)', color: 'var(--color-on-surface)' }}>
                Interactive Preview (State: {bannerState}, Theme: {bannerVariant})
              </h3>
              <Banner
                state={bannerState}
                variant={bannerVariant}
                title="Configuring"
                detail={isIndeterminate ? 'Streaming...' : `${bannerProgress}%`}
                progress={isIndeterminate ? undefined : bannerProgress}
                progressType={isIndeterminate ? 'indeterminate' : 'determinate'}
                action={
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setBannerProgress((p) => (p >= 100 ? 0 : p + 25))}
                  >
                    +25%
                  </Button>
                }
              />

              {/* Controls bar */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Theme:</span>
                  {['primary', 'neutral', 'info', 'success', 'warning', 'critical'].map((t) => (
                    <Button
                      key={t}
                      size="small"
                      variant={bannerVariant === t ? 'tonal' : 'text'}
                      onClick={() => setBannerVariant(t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Progress:</span>
                  {[0, 30, 50, 75, 100].map((val) => (
                    <Button
                      key={val}
                      size="small"
                      variant={bannerProgress === val && !isIndeterminate ? 'filled' : 'outline'}
                      onClick={() => {
                        setBannerProgress(val);
                        setIsIndeterminate(false);
                      }}
                    >
                      {val}%
                    </Button>
                  ))}
                  <Button
                    size="small"
                    variant={isIndeterminate ? 'filled' : 'outline'}
                    onClick={() => setIsIndeterminate(!isIndeterminate)}
                  >
                    Indeterminate
                  </Button>
                </div>
              </div>
            </div>

            {/* Complete 12 Variants Matrix */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-title-sm)', marginBottom: 'var(--spacing-3)', color: 'var(--color-on-surface)' }}>
                Complete 12-Variant Matrix (6 Semantic Themes in Default &amp; Animated States)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '16px' }}>
                {/* Column 1: Default State */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-primary-on-surface)' }}>
                    STATE: DEFAULT (STATIC CONTAINER)
                  </div>
                  <Banner state="default" variant="primary" title="Primary Theme" detail="30%" progress={30} />
                  <Banner state="default" variant="neutral" title="Neutral Theme" detail="45%" progress={45} />
                  <Banner state="default" variant="info" title="Info Theme" detail="60%" progress={60} />
                  <Banner state="default" variant="success" title="Success Theme" detail="100%" progress={100} />
                  <Banner state="default" variant="warning" title="Warning Theme" detail="80%" progress={80} />
                  <Banner state="default" variant="critical" title="Critical Theme" detail="Error" progress={100} />
                </div>

                {/* Column 2: Animated State */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-primary-on-surface)' }}>
                    STATE: ANIMATED (DYNAMIC GRADIENT)
                  </div>
                  <Banner state="animated" variant="primary" title="Primary Theme" detail="30%" progress={30} />
                  <Banner state="animated" variant="neutral" title="Neutral Theme" detail="45%" progress={45} />
                  <Banner state="animated" variant="info" title="Info Theme" detail="60%" progress={60} />
                  <Banner state="animated" variant="success" title="Success Theme" detail="100%" progress={100} />
                  <Banner state="animated" variant="warning" title="Warning Theme" detail="80%" progress={80} />
                  <Banner state="animated" variant="critical" title="Critical Theme" detail="Error" progress={100} />
                </div>
              </div>
            </div>

            {/* Dismissible & Actionable Example */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-title-sm)', marginBottom: 'var(--spacing-3)', color: 'var(--color-on-surface)' }}>
                Dismissible Banner with Actions
              </h3>
              {showDismissibleBanner ? (
                <Banner
                  state="default"
                  variant="info"
                  title="Workspace migration in progress"
                  detail="12.4 MB / 18.0 MB"
                  progress={68}
                  dismissible
                  onClose={() => setShowDismissibleBanner(false)}
                  action={
                    <Button size="small" variant="text" onClick={() => alert('Viewing pipeline details')}>
                      View Details
                    </Button>
                  }
                />
              ) : (
                <Button size="small" onClick={() => setShowDismissibleBanner(true)}>
                  Restore Dismissed Banner
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Badge Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-2)' }}>
            Badge Component (12 Variants: 3 Sizes &times; 2 Styles &times; 2 Intensities)
          </h2>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Small, Medium, Large  across Primary and Neutral palettes in Quiet and Loud states.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            {/* Standalone Variants Row */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-3)' }}>
                Standalone Badges (Primary vs Neutral in Loud &amp; Quiet)
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-light)' }}>Primary Loud:</span>
                  <Badge size="small" styleType="primary" state="loud" />
                  <Badge size="medium" styleType="primary" state="loud" count={badgeCount} />
                  <Badge size="large" styleType="primary" state="loud" count="99+" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginLeft: 'var(--spacing-4)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-light)' }}>Primary Quiet:</span>
                  <Badge size="small" styleType="primary" state="quiet" />
                  <Badge size="medium" styleType="primary" state="quiet" count={badgeCount} />
                  <Badge size="large" styleType="primary" state="quiet" count="99+" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginLeft: 'var(--spacing-4)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-light)' }}>Neutral Loud:</span>
                  <Badge size="small" styleType="neutral" state="loud" />
                  <Badge size="medium" styleType="neutral" state="loud" count={badgeCount} />
                  <Badge size="large" styleType="neutral" state="loud" count="99+" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginLeft: 'var(--spacing-4)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-light)' }}>Neutral Quiet:</span>
                  <Badge size="small" styleType="neutral" state="quiet" />
                  <Badge size="medium" styleType="neutral" state="quiet" count={badgeCount} />
                  <Badge size="large" styleType="neutral" state="quiet" count="99+" />
                </div>
              </div>
            </div>

            {/* Overlapping Badges on Buttons & Actions */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-3)' }}>
                Anchored / Overlapping Badges on Action Elements
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', alignItems: 'center' }}>
                <Badge size="small" styleType="primary" state="loud" dot>
                  <IconButton variant="outline" icon={<SettingsIcon />} aria-label="Settings" />
                </Badge>

                <Badge size="medium" styleType="primary" state="loud" count={badgeCount}>
                  <Button variant="outline">Inbox</Button>
                </Badge>

                <Badge size="large" styleType="primary" state="loud" count={badgeCount > 99 ? '99+' : badgeCount}>
                  <Button variant="primary">Notifications</Button>
                </Badge>

                <Badge size="medium" styleType="neutral" state="quiet" count="New">
                  <Button variant="secondary">Advisory Portal</Button>
                </Badge>

                <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center', marginLeft: 'auto' }}>
                  <Button size="small" variant="outline" onClick={() => setBadgeCount((c) => Math.max(0, c - 1))}>
                    - Decrement
                  </Button>
                  <Button size="small" variant="primary" onClick={() => setBadgeCount((c) => c + 1)}>
                    + Increment Count ({badgeCount})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chip Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-2)' }}>
            Chips Component (80+ Variants: Filter, Input, Assistive, Suggestion)
          </h2>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Fully token-driven with Outlined &amp; Elevated styles, standard 32px height, 1000px pill radius, and interactive states.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            {/* 1. Filter Chips (Interactive Toggle) */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-3)' }}>
                Filter Chips (Interactive Multi-Select &bull; Outlined &amp; Elevated)
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', alignItems: 'center' }}>
                <Chip
                  type="filter"
                  styleType="outlined"
                  label="Audit & Assurance"
                  selected={selectedFilters.includes('audit')}
                  onClick={() => toggleFilter('audit')}
                />
                <Chip
                  type="filter"
                  styleType="outlined"
                  label="Tax Consulting"
                  selected={selectedFilters.includes('tax')}
                  onClick={() => toggleFilter('tax')}
                />
                <Chip
                  type="filter"
                  styleType="elevated"
                  label="Starred Advisory"
                  leadingIcon={<ChipStarSvg fill="var(--color-blue-300)" />}
                  trailingIcon={true}
                  selected={selectedFilters.includes('elevated-starred')}
                  onClick={() => toggleFilter('elevated-starred')}
                />
                <Chip
                  type="filter"
                  styleType="elevated"
                  label="Elevated Filter"
                  selected={selectedFilters.includes('elevated')}
                  onClick={() => toggleFilter('elevated')}
                />
                <Chip
                  type="filter"
                  styleType="outlined"
                  iconOnly={true}
                  aria-label="Filter Icon Only"
                  selected={selectedFilters.includes('icon-only')}
                  onClick={() => toggleFilter('icon-only')}
                />
                <Chip
                  type="filter"
                  styleType="outlined"
                  label="Disabled Filter"
                  disabled={true}
                />
              </div>
            </div>

            {/* 2. Input Chips (Tags with Dismissible 'X' & Branded File Tag) */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-3)' }}>
                Input Chips (Tags with Dismissible &times; Action &amp; Branded File Icons)
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', alignItems: 'center' }}>
                {inputTags.map((tag) => (
                  <Chip
                    key={tag.id}
                    type="input"
                    styleType="outlined"
                    label={tag.label}
                    isBranded={tag.isBranded}
                    trailingIcon={true}
                    onDelete={() => removeInputTag(tag.id)}
                  />
                ))}
                {inputTags.length === 0 && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={() =>
                      setInputTags([
                        { id: '1', label: 'FY2026 Strategy', isBranded: false },
                        { id: '2', label: 'Financial_Model.docx', isBranded: true },
                        { id: '3', label: 'Risk Analysis', isBranded: false },
                      ])
                    }
                  >
                    + Restore Tags
                  </Button>
                )}
              </div>
            </div>

            {/* 3. Assistive & Suggestion Chips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
              <div>
                <h3 style={{ fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-3)' }}>
                  Assistive Chips (Action Triggers)
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', alignItems: 'center' }}>
                  <Chip type="assistive" styleType="outlined" label="Quick Action" leadingIcon={true} />
                  <Chip type="assistive" styleType="elevated" label="Open In Word" isBranded={true} />
                  <Chip type="assistive" styleType="outlined" label="Bookmark" />
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-3)' }}>
                  Suggestion Chips (Single-Select Prompts)
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', alignItems: 'center' }}>
                  {['Quarterly Audit', 'Tax 2026', 'Risk Matrix'].map((prompt) => (
                    <Chip
                      key={prompt}
                      type="suggestion"
                      styleType="outlined"
                      label={prompt}
                      selected={activeSuggestion === prompt}
                      leadingIcon={activeSuggestion === prompt}
                      onClick={() => setActiveSuggestion(prompt)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* File Uploader Showcase (Figma Node 1003:54273) */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>
            File Uploader Component (9 Figma Variants: Small, Medium, Large × Outline, Elevated, Filled)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-6)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-2)' }}>Outline Variant (Large)</h3>
              <FileUploader
                size="large"
                variant="outline"
                title="Drag and Drop file here"
                onFilesSelected={(files) => console.log('Selected files (Large Outline):', files)}
              />
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-2)' }}>Elevated Variant (Medium)</h3>
              <FileUploader
                size="medium"
                variant="elevated"
                title="Drag and Drop file here"
                onFilesSelected={(files) => console.log('Selected files (Medium Elevated):', files)}
              />
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-2)' }}>Filled Variant (Small)</h3>
              <FileUploader
                size="small"
                variant="filled"
                title="Drag and Drop file here"
                onFilesSelected={(files) => console.log('Selected files (Small Filled):', files)}
              />
            </div>
          </div>
        </section>

        {/* Progress Indicators Showcase (Figma Node 964:63787) */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>
            Progress Indicators (Linear & Circular Modes - 33 Figma Variants)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            <ProgressIndicator
              variant="linear"
              progress={sliderVal}
              showValue
              label="Linear Progress Bar"
              subtext="Controlled percentage"
            />
            <div style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center', flexWrap: 'wrap' }}>
              <ProgressIndicator
                variant="circular"
                size="large"
                progress={sliderVal}
                showValue
                label="Large Circular (88px)"
              />
              <ProgressIndicator
                variant="circular"
                size="medium"
                progress={sliderVal}
                showValue
                label="Medium Circular (48px)"
              />
              <ProgressIndicator
                variant="circular"
                size="small"
                progress={sliderVal}
                label="Small Circular (24px)"
              />
              <ProgressIndicator
                variant="circular"
                size="medium"
                type="indeterminate"
                label="Indeterminate Loading Spinner"
              />
            </div>
          </div>
        </section>
        {/* Slider Showcase (Figma Node 964:63925) */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>
            Slider Component (Continuous & Discrete Modes - 15 Figma Variants)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
            <Slider
              variant="continuous"
              value={sliderVal}
              showIndicator
              label={`Continuous Slider (${sliderVal}%)`}
              subtext="Drag or click to adjust"
              onChange={(e, val) => setSliderVal(val)}
            />
            <Slider
              variant="discrete"
              step={10}
              defaultValue={40}
              showTicks
              label="Discrete Slider with Step Ticks"
              subtext="Interval step = 10"
            />
            <Slider
              variant="continuous"
              defaultValue={50}
              disabled
              label="Disabled Slider (50%)"
              subtext="Muted state"
            />
          </div>
        </section>

        {/* Checkbox Showcase (Figma Node 1384:63275) */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>
            Checkbox Component (64 Figma Variants Supported)
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', alignItems: 'center' }}>
            <Checkbox
              size="large"
              checked={appCheckboxChecked}
              label="Checked Large"
              subtext="Click to toggle"
              onChange={(e) => setAppCheckboxChecked(e.target.checked)}
            />
            <Checkbox size="large" type="unchecked-light" label="Unchecked Light" />
            <Checkbox size="large" type="indeterminate" label="Indeterminate" />
            <Checkbox size="large" type="unchecked" label="Unchecked" />
            <Checkbox size="large" type="error-checked" label="Error Checked" />
            <Checkbox size="large" type="error-unchecked-light" label="Error Unchecked Light" />
            <Checkbox size="large" type="checked" disabled label="Disabled Checked" />
            <Checkbox size="small" type="checked" label="Checked Small (24px)" />
          </div>
        </section>

        {/* Breadcrumbs Spec 1: Circle Checkbox List */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)', minHeight: '600px' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>
            Breadcrumbs Dropdown Spec 1: Circle Checkbox Options List (Click ...)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <Breadcrumbs
              items={circleCheckboxItems}
              maxItems={4}
              itemsAfterCollapse={1}
              separator="/"
              overflowTrigger="click"
            />
          </div>
        </section>

        {/* Breadcrumbs Spec 2: Star Bookmark + Trailing Checkmark List */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)', minHeight: '600px' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>
            Breadcrumbs Dropdown Spec 2: Star Bookmark & Trailing Checkmark List (Click ... - Stars trigger toast popup)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <Breadcrumbs
              items={starBookmarkItems}
              maxItems={4}
              itemsAfterCollapse={1}
              separator="/"
              overflowTrigger="click"
            />
          </div>
        </section>

        {/* Common Action Buttons */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>Common Action Buttons</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center' }}>
            <Button variant="primary" onClick={() => setCount((c) => c + 1)}>
              Primary: {count}
            </Button>
            <Button variant="tonal">Tonal (#E9EAFC Fill)</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
            <Button variant="elevated">Elevated</Button>
            <Button variant="outline" disabled>Disabled Outline (Gray Border)</Button>
          </div>
        </section>

        {/* Standalone Icon Buttons */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>Standalone Icon Buttons</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center' }}>
            <IconButton variant="filled" icon={<SettingsIcon />} aria-label="Filled Settings" />
            <IconButton variant="outline" icon={<SettingsIcon />} aria-label="Outline Settings" />
            <IconButton variant="standard" icon={<SettingsIcon />} aria-label="Standard Settings" />
            <IconButton variant="neutral" icon={<SettingsIcon />} aria-label="Neutral Settings" />
            <IconButton variant="outline" disabled icon={<SettingsIcon />} aria-label="Disabled Settings" />
          </div>
        </section>

        {/* Switch Component — 16 Canonical Variants */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-2)' }}>Switch Toggle Component (16 Canonical Variants)</h2>
            <p style={{ color: 'var(--color-neutral-100)', fontSize: 'var(--font-size-body-sm)', margin: 0 }}>
              KPMG WorkBench toggle switch featuring Fluent Checkmark / Dismiss vector icons, active 28px thumb expansion, and complete token-driven theming.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', alignItems: 'center', padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-neutral-outline)' }}>
            <Switch
              checked={appSwitchChecked}
              onChange={setAppSwitchChecked}
              icon={appSwitchWithIcon}
              label="Live Interactive Switch"
              helperText={`Current state: ${appSwitchChecked ? 'ON (Selected)' : 'OFF (Unselected)'}`}
            />
            <Button size="small" variant="outline" onClick={() => setAppSwitchWithIcon(!appSwitchWithIcon)}>
              Toggle Icons: {appSwitchWithIcon ? 'With Icons (Check/X)' : 'Plain (No Icon)'}
            </Button>
          </div>

          {/* Canonical 4-State Quick Gallery */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)' }}>
            <div style={{ padding: 'var(--spacing-4)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-neutral-outline)', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)' }}>Checked &bull; Enabled</span>
              <Switch defaultChecked={true} icon={true} />
            </div>
            <div style={{ padding: 'var(--spacing-4)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-neutral-outline)', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)' }}>Checked &bull; Hovered</span>
              <Switch defaultChecked={true} icon={true} state="Hovered" />
            </div>
            <div style={{ padding: 'var(--spacing-4)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-neutral-outline)', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)' }}>Unchecked &bull; Enabled</span>
              <Switch defaultChecked={false} icon={true} />
            </div>
            <div style={{ padding: 'var(--spacing-4)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-neutral-outline)', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-100)' }}>Disabled State</span>
              <Switch defaultChecked={true} icon={true} disabled={true} />
            </div>
          </div>
        </section>

        {/* Dividers Component — 18 Canonical Variants */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-2)' }}>Dividers Component (18 Canonical Variants)</h2>
            <p style={{ color: 'var(--color-neutral-100)', fontSize: 'var(--font-size-body-sm)', margin: 0 }}>
              KPMG WorkBench token-driven dividers supporting horizontal and vertical orientations, calibrated insets, subheaders, and light/dark theme contrast.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-6)' }}>
            {/* Card 1: Horizontal Dividers */}
            <div style={{ padding: 'var(--spacing-5)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-neutral-outline)', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)' }}>Horizontal Insets & Subheaders</span>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-100)' }}>Full Width</span>
                <Dividers width="Full" />
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-100)' }}>Inset (16px Left)</span>
                <Dividers width="Inset" />
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-100)' }}>Inset Middle Small (8px Both Sides)</span>
                <Dividers width="Inset middle small" />
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-100)' }}>Inset Middle with Subheader</span>
                <Dividers width="Inset middle with text" text="Audit Section Breakdown" />
              </div>
            </div>

            {/* Card 2: Vertical Dividers & Toolbar Integration */}
            <div style={{ padding: 'var(--spacing-5)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-neutral-outline)', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)' }}>Vertical Dividers (Toolbar Layout)</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: 'var(--spacing-3)', backgroundColor: 'var(--color-surface-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-neutral-outline)' }}>
                <Button size="small" variant="standard">Dashboard</Button>
                <Dividers state="Vertical" width="Full" style={{ height: '32px', minHeight: '32px' }} />
                <Button size="small" variant="standard">Analytics</Button>
                <Dividers state="Vertical" width="Inset middle" style={{ height: '32px', minHeight: '32px' }} />
                <Button size="small" variant="standard">Settings</Button>
              </div>

              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', marginTop: '8px' }}>Dark Theme High-Contrast</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Dividers theme="Dark" width="Full" />
                <Dividers theme="Dark" width="Inset middle with text" text="High-Contrast Dark Subheader" />
              </div>
            </div>
          </div>
        </section>

        {/* AppBars Component - Comprehensive Figma Suite */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-2)' }}>AppBars Component Suite</h2>
            <p style={{ color: 'var(--color-neutral-100)', fontSize: 'var(--font-size-body-sm)', margin: 0 }}>
              Covers Full AppBars (Default &amp; With Action), Nested AppBars (Small &amp; Large in Default/Filled states with Status Badges), Special Search AppBars (Extra-Small, Small, &amp; Large), and Chat/Voice Header Panels.
            </p>
          </div>

          {/* Interactive Variant Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-neutral-outline)', paddingBottom: '12px', flexWrap: 'wrap' }}>
            {[
              { id: 'full', label: 'Full App Bars' },
              { id: 'nested', label: 'Nested App Bars' },
              { id: 'special', label: 'Special (Search & Dashboard)' },
              { id: 'chat', label: 'Chat & Voice Panels' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAppBarDemoTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: appBarDemoTab === tab.id ? 'var(--color-primary-action, #1a28c1)' : 'var(--color-surface)',
                  color: appBarDemoTab === tab.id ? '#ffffff' : 'var(--color-neutral-000)',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  border: appBarDemoTab === tab.id ? 'none' : '1px solid var(--color-neutral-400, #c7c7d1)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Full App Bars */}
          {appBarDemoTab === 'full' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Full App Bar - Default with Reused Breadcrumbs &amp; Figma Slash Forward (Height: 64px)
                </span>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '8px', overflow: 'hidden' }}>
                  <AppBarFull
                    brandLabel="KPMG"
                    breadcrumbs={['WorkBench', 'Audit & Assurance', 'Global Risk 2026']}
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Full App Bar - Collapsible Multi-Level Breadcrumbs (Click ... for Dropdown Menu)
                </span>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '8px', overflow: 'hidden' }}>
                  <AppBarFull
                    brandLabel="KPMG"
                    breadcrumbs={[
                      { id: '1', label: 'WorkBench', href: '#' },
                      { id: '2', label: 'Advisory Practice', href: '#', useCircleCheckbox: true, isChecked: true },
                      { id: '3', label: 'Risk Governance', href: '#', isStar: true },
                      { id: '4', label: 'Audit Analytics 2026', isCurrent: true },
                    ]}
                    breadcrumbProps={{ maxItems: 3 }}
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Full App Bar - Single Page Title Mode with Chevron Forward Separator (Height: 64px)
                </span>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '8px', overflow: 'hidden' }}>
                  <AppBarFull
                    brandLabel="KPMG"
                    showBreadcrumbs={false}
                    pageTitle="Workbench"
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Full App Bar - With Action Secondary Bar (Height: 128px)
                </span>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '8px', overflow: 'hidden' }}>
                  <AppBarFull
                    type="with-action"
                    brandLabel="KPMG"
                    breadcrumbs={['WorkBench', 'Model Parameters', 'Version 3.4.1']}
                    actionButtonSecondary="Discard Draft"
                    actionButtonLabel="Deploy to Production"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Nested App Bars */}
          {appBarDemoTab === 'nested' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Nested App Bar - Small Default with Configuring Status Badge (Height: 64px)
                </span>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '8px', overflow: 'hidden' }}>
                  <AppBarNested
                    size="small"
                    state="default"
                    title="Audit_Pipeline_v2.0"
                    statusType="configuring"
                    statusProgress={40}
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Nested App Bar - Small Filled with Completed Status (Height: 64px)
                </span>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '8px', overflow: 'hidden' }}>
                  <AppBarNested
                    size="small"
                    state="filled"
                    title="Tax_Compliance_Report_Q4"
                    statusType="completed"
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Nested App Bar - Large Hero Header with Reused Breadcrumbs &amp; Figma Action Icons (Height: 472px)
                </span>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '8px', overflow: 'hidden' }}>
                  <AppBarNested
                    size="large"
                    state="default"
                    breadcrumbs={['Subheader', 'Subheader']}
                    title="Header"
                    filterChips={['All Controls', 'Active Audits', 'Exceptions', 'Documentation']}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '8px' }}>
                      {['Access Governance', 'Encryption Protocols', 'Vulnerability Assessment', 'Audit Trail Analysis'].map((item, idx) => (
                        <div key={idx} style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--color-neutral-400)', backgroundColor: 'var(--color-surface)' }}>
                          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-neutral-200)', fontWeight: 600 }}>Policy {idx + 1}</span>
                          <h4 style={{ margin: '4px 0 6px 0', fontSize: '14px', color: 'var(--color-neutral-000)' }}>{item}</h4>
                          <span style={{ fontSize: '12px', color: '#1a8754', fontWeight: 600 }}>98.6% Compliant</span>
                        </div>
                      ))}
                    </div>
                  </AppBarNested>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Special App Bars (4 Canonical Variants) */}
          {appBarDemoTab === 'special' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Variant 1: Size=Extra small, With search=Default (Height: 64px)
                </span>
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <AppBarSpecial
                    size="extra-small"
                    greeting="Greeting, name"
                    searchPlaceholder="Ask me anything"
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Variant 2: Size=Small, With search=Default (Height: 88px)
                </span>
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <AppBarSpecial
                    size="small"
                    greeting="Greeting, name"
                    searchPlaceholder="Ask me anything"
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Variant 3: Size=Large, With search=False (Height: 434px)
                </span>
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <AppBarSpecial
                    size="large"
                    withSearch={false}
                    greeting="Greeting, name"
                    welcomeHeader="Welcome"
                    filterChips={['Project tag', 'Project tag', 'Project tag']}
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '8px' }}>
                  Variant 4: Size=Large, With search=True (Height: 466px + 711px Floating AI Search Bar)
                </span>
                <div style={{ borderRadius: '12px' }}>
                  <AppBarSpecial
                    size="large"
                    withSearch={true}
                    greeting="Greeting, name"
                    welcomeHeader="Welcome"
                    searchPlaceholder="Ask me anything"
                    filterChips={['Project tag', 'Project tag', 'Project tag']}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Chat & Voice Panels */}
          {appBarDemoTab === 'chat' && (
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-000)', display: 'block', marginBottom: '12px' }}>
                Chat &amp; Voice Header Panels (Width: 450px, Height: 66px, Default &amp; With Drag Handle)
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '12px 12px 0 0', overflow: 'hidden', maxWidth: '450px' }}>

                </div>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '12px 12px 0 0', overflow: 'hidden', maxWidth: '450px' }}>

                </div>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '12px 12px 0 0', overflow: 'hidden', maxWidth: '450px' }}>

                </div>
                <div style={{ border: '1px solid var(--color-neutral-outline)', borderRadius: '12px 12px 0 0', overflow: 'hidden', maxWidth: '450px' }}>

                </div>
              </div>
            </div>
          )}
        </section>

        {/* ================================================================
            FIGMA FULL LAYOUT EXAMPLE (Node 1537-6788)
            A combined usage demo matching the Figma reference screen exactly,
            composing AppBarFull, NavigationMenu (inline), AppBarSearchPill,
            OverflowMenu, and content cards using all design tokens.
        ================================================================ */}
        <section style={{
          backgroundColor: 'var(--color-surface-light)',
          padding: 'var(--spacing-6)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-neutral-outline)',
          marginTop: 'var(--spacing-8)',
        }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-2)' }}>
            Figma Reference Layout — Full Workbench Example
          </h2>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Pixel-faithful composition of AppBarFull, NavigationMenu (inline sidebar), AppBarSearchPill (floating AI search),
            OverflowMenu (action dropdown), and content cards — assembled exactly as specified in the KPMG Design System.
          </p>

          <FigmaWorkbenchExample />
        </section>

        {/* ================================================================
            FIGMA BOTTOM APP BARS SECTION (Node 964:15496)
            All 6 text variants, voice modes with mute on/off, filepicker,
            suggestion chips, project dropdown, and expand docked chat UI.
        ================================================================ */}
        <section style={{
          backgroundColor: 'var(--color-surface-light)',
          padding: 'var(--spacing-6)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-neutral-outline)',
          marginTop: 'var(--spacing-8)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: 'var(--spacing-4)' }}>
            <div>
              <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: '0 0 6px 0' }}>
                Bottom App Bars — All Variants (Figma Node 964:15496)
              </h2>
              <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', margin: 0 }}>
                Bottom App Bars featuring interactive filepicker, mic on/off (mute toggle), project selector, prompt suggestions, and expandable docked chat/voice UI.
              </p>
            </div>

            {/* Interactive Mode & Panel Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <Button
                variant={bottomAppBarMode === 'text' ? 'primary' : 'outlined'}
                size="small"
                onClick={() => setBottomAppBarMode('text')}
              >
                Text Mode
              </Button>
              <Button
                variant={bottomAppBarMode === 'voice' ? 'primary' : 'outlined'}
                size="small"
                onClick={() => setBottomAppBarMode('voice')}
              >
                Voice Mode
              </Button>
              {bottomAppBarMode === 'voice' && (
                <Button
                  variant={bottomAppBarMute ? 'critical' : 'secondary'}
                  size="small"
                  onClick={() => setBottomAppBarMute(!bottomAppBarMute)}
                >
                  {bottomAppBarMute ? 'Unmute' : 'Mute Mic'}
                </Button>
              )}
              <Button
                variant={bottomAppExpandedPanel ? 'primary' : 'tonal'}
                size="small"
                onClick={() => setBottomAppExpandedPanel(!bottomAppExpandedPanel)}
              >
                {bottomAppExpandedPanel ? 'Collapse Chat UI' : 'Expand Chat UI'}
              </Button>
            </div>
          </div>

          {/* Interactive Live Playground */}
          <div style={{
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid var(--color-neutral-400)',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '450px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-000)' }}>
                Live Interactive Component:
              </span>
              {bottomAppBarMode === 'text' && (
                <select
                  value={bottomAppBarState}
                  onChange={(e) => setBottomAppBarState(e.target.value)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-neutral-outline)',
                    fontSize: '12px',
                    color: 'var(--color-neutral-000)',
                    background: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  <option value="default">State: Default (100px)</option>
                  <option value="with-verification">State: With verification (126px)</option>
                  <option value="with-project">State: With project (176px)</option>
                  <option value="with-button">State: With button (176px)</option>
                  <option value="with-project-and-button">State: With project & button (176px)</option>
                  <option value="with-prompts">State: With prompts (226px)</option>
                </select>
              )}
            </div>

            {/* Prop Configuration Toggles */}
            {bottomAppBarMode === 'text' && (
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '450px', padding: '6px 12px', backgroundColor: 'var(--color-surface-light)', borderRadius: '8px', border: '1px solid var(--color-neutral-outline)' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-100)' }}>Configurable Props:</span>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={bottomAppBarEnableMic}
                    onChange={(e) => setBottomAppBarEnableMic(e.target.checked)}
                  />
                  <span>Mic</span>
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={bottomAppBarEnableAttach}
                    onChange={(e) => setBottomAppBarEnableAttach(e.target.checked)}
                  />
                  <span>Attach</span>
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={bottomAppBarEnableSend}
                    onChange={(e) => setBottomAppBarEnableSend(e.target.checked)}
                  />
                  <span>Send</span>
                </label>
              </div>
            )}

            <div style={{ maxWidth: '450px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#6d6d7e', background: 'var(--color-blue-800, #e9eafc)', padding: '4px 10px', borderRadius: '6px' }}>
                💡 <strong>Expand Visibility</strong>: Expand button is hidden until text overflows the first line! Clicking any prompt suggestion sends payload immediately.
              </span>
            </div>

            {/* Render Live Expanded Docked Panel or Standalone Bottom App Bar */}
            {bottomAppExpandedPanel ? (
              <ChatDockedUI
                mode={bottomAppBarMode}
                onClose={() => setBottomAppExpandedPanel(false)}
                onModeToggle={(m) => setBottomAppBarMode(m)}
              />
            ) : (
              <BottomAppBar
                mode={bottomAppBarMode}
                state={bottomAppBarState}
                mute={bottomAppBarMute}
                enableMic={bottomAppBarEnableMic}
                enableAttachment={bottomAppBarEnableAttach}
                enableSend={bottomAppBarEnableSend}
                prompts={['Prompt suggestion', 'Prompt suggestion', 'Prompt']}
                onToggleMute={() => setBottomAppBarMute(!bottomAppBarMute)}
                onModeChange={(m) => setBottomAppBarMode(m)}
                onExpandClick={() => setBottomAppExpandedPanel(true)}
                onSend={(msg, files) => {
                  spawnAppToast('single-line', false);
                  alert(`Sent prompt: "${msg}" with ${files ? files.length : 0} file(s) attached.`);
                }}
              />
            )}
          </div>

          {/* Section: All Canonical Text Variants Side-by-Side */}
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: 'var(--color-neutral-000)' }}>
            Canonical Text Variants (Figma Node 1380:6133)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
            marginBottom: '36px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)' }}>
                Default (100px min-height)
              </span>
              <BottomAppBarsText state="default" placeholder="Ask me anything" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)' }}>
                With verification (126px min-height)
              </span>
              <BottomAppBarsText state="with-verification" placeholder="Ask me anything" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)' }}>
                With project (176px min-height)
              </span>
              <BottomAppBarsText state="with-project" placeholder="Ask me anything" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)' }}>
                With button (176px min-height)
              </span>
              <BottomAppBarsText state="with-button" placeholder="Ask me anything" buttonLabel="Save Draft" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)' }}>
                With project &amp; button (176px min-height)
              </span>
              <BottomAppBarsText state="with-project-and-button" placeholder="Ask me anything" buttonLabel="Review" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)' }}>
                With prompts (226px min-height)
              </span>
              <BottomAppBarsText
                state="with-prompts"
                placeholder="Ask me anything"
                prompts={['Prompt suggestion', 'Prompt suggestion', 'Prompt']}
                onSend={(msg) => alert(`Immediate prompt triggered: "${msg}"`)}
              />
            </div>
          </div>

          {/* Section: Voice Variants & Docked Panels */}
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: 'var(--color-neutral-000)' }}>
            Voice Modes &amp; Docked Panels (Figma Nodes 1883:52191, 1324:157533, 1451:12212)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)', display: 'block', marginBottom: '8px' }}>
                  Voice Bar: Active / Pulsing (Mute=False)
                </span>
                <BottomAppBarsVoice mute={false} />
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)', display: 'block', marginBottom: '8px' }}>
                  Voice Bar: Muted (Mute=True)
                </span>
                <BottomAppBarsVoice mute={true} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)' }}>
                Docked Chat UI (Node 1324:157533)
              </span>
              <ChatDockedUI mode="text" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-200)' }}>
                Docked Voice UI (Node 1451:12212)
              </span>
              <ChatDockedUI mode="voice" />
            </div>
          </div>
        </section>

        {/* Modal Component Showcase */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: 0 }}>
              Modal Component Family (Progress &amp; Non-Progress Variants)
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-neutral-100)' }}>Variant:</span>
              {[
                { id: 'compact', label: 'Compact Input' },
                { id: 'template', label: 'Template Config' },
                { id: 'step1', label: 'Step 1 Profile (Progress)' },
                { id: 'multistep', label: 'Multi-Step (Progress)' },
                { id: 'master', label: 'Complete Master' },
              ].map((v) => (
                <Button
                  key={v.id}
                  size="small"
                  variant={modalDemoVariant === v.id ? 'primary' : 'outline'}
                  onClick={() => setModalDemoVariant(v.id)}
                >
                  {v.label}
                </Button>
              ))}

              <Button
                size="small"
                variant="primary"
                onClick={() => setModalOpen(true)}
                style={{ marginLeft: '12px' }}
              >
                Open in Overlay Dialog
              </Button>
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            700px canonical dialog system matching KPMG Design System 2026. Supports linear progress indicators, avatar preview cards, pill headers, multi-line textareas with voice dictation, drag-and-drop file uploaders, 2x2 model selection grids, and 2x2 voice selection grids.
          </p>

          {/* Inline Preview of the Selected Modal Variant */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
            {modalDemoVariant === 'compact' && (
              <Modal
                inline
                title="Create an assistant"
                withProgress={false}
                inputModule2={true}
              />
            )}
            {modalDemoVariant === 'template' && (
              <Modal
                inline
                title="Create an assistant"
                withProgress={false}
                inputModule1={true}
                inputModule3={true}
              />
            )}
            {modalDemoVariant === 'step1' && (
              <Modal
                inline
                title="Create an assistant"
                withProgress={true}
                progress={30}
                agentModule={true}
                inputModule1={true}
                inputModule2={true}
              />
            )}
            {modalDemoVariant === 'multistep' && (
              <Modal
                inline
                title="Create an assistant"
                withProgress={true}
                progress={80}
                agentModule={true}
                inputModule1={true}
                inputModule2={true}
                fileUploaderModule={true}
                inputModule3={true}
              />
            )}
            {modalDemoVariant === 'master' && (
              <Modal
                inline
                title="Create an assistant"
                withProgress={true}
                progress={100}
                agentModule={true}
                inputModule1={true}
                inputModule2={true}
                fileUploaderModule={true}
                inputModule3={true}
                cardModule1={true}
                cardModule2={true}
              />
            )}
          </div>
        </section>

        {/* 19. Tiles Showcase */}
        <section className="component-section" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Tiles Component Family</h2>
            <p style={{ color: 'var(--color-on-surface, #454554)', fontSize: '15px' }}>
              Modular surface containers across Basic (420px) and Special (380px - 700px) layouts, supporting Outlined, Elevated, and Filled styles with progress tracking.
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', padding: '16px', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Family:</span>
              <Button
                variant={tileVariant === 'basic' ? 'filled' : 'outlined'}
                size="small"
                onClick={() => {
                  setTileVariant('basic');
                  setTileType('empty-with-missing');
                }}
              >
                Basic Tiles
              </Button>
              <Button
                variant={tileVariant === 'special' ? 'filled' : 'outlined'}
                size="small"
                onClick={() => {
                  setTileVariant('special');
                  setTileType('living-todo-list');
                }}
              >
                Special Tiles
              </Button>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Surface:</span>
              {['outlined', 'elevated', 'filled'].map((s) => (
                <Button
                  key={s}
                  variant={tileStyle === s ? 'filled' : 'outlined'}
                  size="small"
                  onClick={() => setTileStyle(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Type:</span>
              <select
                value={tileType}
                onChange={(e) => setTileType(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid #d5d5dc',
                  fontSize: '14px',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {tileVariant === 'basic' ? (
                  <>
                    <option value="empty-with-missing">Empty with missing</option>
                    <option value="empty">Empty</option>
                    <option value="empty-full">Empty Full Bleed</option>
                    <option value="configuring">Configuring (Progress)</option>
                    <option value="loading">Loading Shimmer</option>
                    <option value="loading-full">Loading Full Bleed</option>
                  </>
                ) : (
                  <>
                    <option value="living-todo-list">Living To Do List</option>
                    <option value="references">References</option>
                    <option value="learning-hub">Learning Hub</option>
                    <option value="ai-forum">AI Forum</option>
                    <option value="project-tracker">Project Tracker</option>
                    <option value="empty-state">Empty State</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Render Tile Container */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
            <Tiles
              variant={tileVariant}
              style={tileStyle}
              type={tileType}
              progress={80}
            />
          </div>
        </section>

        {/* 20. Sheets Showcase */}
        <section className="component-section" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Sheets Component Family</h2>
            <p style={{ color: 'var(--color-on-surface, #454554)', fontSize: '15px' }}>
              Companion surfaces across Floating Sheets (Informational & Inputs) and Side Sheets (Basic, Project, File/Pages, Assistant) with drawer overlay capability.
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', padding: '16px', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Variant:</span>
              <Button
                variant={sheetVariant === 'floating' ? 'filled' : 'outlined'}
                size="small"
                onClick={() => {
                  setSheetVariant('floating');
                  setSheetType('informational');
                  setSheetSize('large');
                }}
              >
                Floating Sheets
              </Button>
              <Button
                variant={sheetVariant === 'side' ? 'filled' : 'outlined'}
                size="small"
                onClick={() => {
                  setSheetVariant('side');
                  setSheetType('basic');
                  setSheetSize('large');
                }}
              >
                Side Sheets
              </Button>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Type:</span>
              <select
                value={sheetType}
                onChange={(e) => setSheetType(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid #d5d5dc',
                  fontSize: '14px',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {sheetVariant === 'floating' ? (
                  <>
                    <option value="informational">Informational</option>
                    <option value="inputs">Inputs & Controls</option>
                  </>
                ) : (
                  <>
                    <option value="basic">Basic (Items List)</option>
                    <option value="project">Project Details</option>
                    <option value="pages">Pages / File</option>
                    <option value="assistant">Assistant Config</option>
                  </>
                )}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Size:</span>
              {sheetVariant === 'floating' ? (
                <>
                  <Button
                    variant={sheetSize === 'compact' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setSheetSize('compact')}
                  >
                    Compact (400px)
                  </Button>
                  <Button
                    variant={sheetSize === 'large' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setSheetSize('large')}
                  >
                    Large (486px)
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={sheetSize === 'small' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setSheetSize('small')}
                  >
                    Small (320px)
                  </Button>
                  <Button
                    variant={sheetSize === 'large' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setSheetSize('large')}
                  >
                    Large (360px)
                  </Button>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Surface:</span>
              {['outlined', 'filled'].map((s) => (
                <Button
                  key={s}
                  variant={sheetStyle === s ? 'filled' : 'outlined'}
                  size="small"
                  onClick={() => setSheetStyle(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>

            <Button
              variant="tonal"
              size="small"
              onClick={() => setSheetDrawerOpen(true)}
            >
              Open as Drawer
            </Button>
          </div>

          {/* Render Sheet Preview */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
            <Sheets
              variant={sheetVariant}
              type={sheetType}
              size={sheetSize}
              style={sheetStyle}
              progress={80}
            />
          </div>

          {/* Drawer Mode Instance */}
          <Sheets
            variant={sheetVariant}
            type={sheetType}
            size={sheetSize}
            style={sheetStyle}
            isDrawer={true}
            isOpen={sheetDrawerOpen}
            onClose={() => setSheetDrawerOpen(false)}
          />
        </section>

        {/* Message Component Showcase */}
        <section className="component-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--font-size-headline-sm)', margin: 0 }}>
              Message Component (Assistant Reply, Human Sent, Audio Transcripts &amp; Conversation Threads)
            </h2>
          </div>
          <p style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-on-surface-light)', marginBottom: 'var(--spacing-6)' }}>
            Canonical Figma Node 1364:49461 specification. 100% token-driven message system supporting bot assistant replies with avatar gradient dots, user sent lavender bubbles, citations, collapsible secondary text, attachments, 3-image media galleries with popovers, integrated workflow status tracking reusing ProgressIndicator, bottom action icon bars, and multi-turn conversational streams.
          </p>

          {/* Interactive Controls Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '24px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--color-surface-light)', border: '1px solid var(--color-neutral-outline)' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>View:</span>
              <Button
                variant={messageDemoView === 'bubble' ? 'filled' : 'outlined'}
                size="small"
                onClick={() => setMessageDemoView('bubble')}
              >
                Individual Bubble
              </Button>
              <Button
                variant={messageDemoView === 'thread' ? 'filled' : 'outlined'}
                size="small"
                onClick={() => setMessageDemoView('thread')}
              >
                Conversation Stream
              </Button>
              <Button
                variant={messageDemoView === 'audio' ? 'filled' : 'outlined'}
                size="small"
                onClick={() => setMessageDemoView('audio')}
              >
                Audio Message
              </Button>
            </div>

            {messageDemoView === 'bubble' && (
              <>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Sender:</span>
                  <Button
                    variant={messageSender === 'bot' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setMessageSender('bot')}
                  >
                    Assistant (Bot)
                  </Button>
                  <Button
                    variant={messageSender === 'user' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setMessageSender('user')}
                  >
                    Human (User)
                  </Button>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Layout:</span>
                  <Button
                    variant={messageLayout === 'default' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setMessageLayout('default')}
                  >
                    Default
                  </Button>
                  <Button
                    variant={messageLayout === 'card' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setMessageLayout('card')}
                  >
                    Card
                  </Button>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>State:</span>
                  <Button
                    variant={messageState === 'minimized' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setMessageState('minimized')}
                  >
                    Minimized
                  </Button>
                  <Button
                    variant={messageState === 'expanded' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setMessageState('expanded')}
                  >
                    Expanded
                  </Button>
                </div>
              </>
            )}

            {messageDemoView === 'thread' && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Stream Type:</span>
                <select
                  value={messageThreadType}
                  onChange={(e) => setMessageThreadType(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-neutral-outline)',
                    fontSize: '14px',
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  <option value="default-bot-first">Default Bot First</option>
                  <option value="card-bot-first">Card Bot First</option>
                  <option value="default-human-first">Default Human First</option>
                  <option value="card-human-first">Card Human First</option>
                </select>
              </div>
            )}

            {messageDemoView === 'audio' && (
              <>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Mode:</span>
                  <Button
                    variant={messageAudioMode === 'light' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setMessageAudioMode('light')}
                  >
                    Light
                  </Button>
                  <Button
                    variant={messageAudioMode === 'dark' ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setMessageAudioMode('dark')}
                  >
                    Dark
                  </Button>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Button
                    variant={messageAudioDropdown ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => setMessageAudioDropdown(!messageAudioDropdown)}
                  >
                    {messageAudioDropdown ? 'Hide Project Dropdown' : 'Show Project Dropdown'}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Render Active View */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
            {messageDemoView === 'bubble' && (
              <div style={{ width: '100%', maxWidth: '600px' }}>
                <Message
                  sender={messageSender}
                  layout={messageLayout}
                  state={messageState}
                  headline="This headline text"
                  body="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur."
                  secondaryText={
                    messageSender === 'user'
                      ? '"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit, sit amet, consectetur adipiscing elit."'
                      : 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit.'
                  }
                  citations={messageSender === 'bot' ? ['2', '2', '2', '2'] : []}
                  attachments={['Attachment']}
                  mediaCards={[{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]}
                  statusCard={
                    messageSender === 'bot'
                      ? {
                        title: 'Status',
                        header: 'Header',
                        subhead: 'Subhead',
                        progress: 30,
                        steps: [
                          { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
                          { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
                          { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'pending' },
                          { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'in-progress' },
                        ],
                        code: 'Some code',
                        sources: [
                          { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
                          { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
                        ],
                      }
                      : null
                  }
                  showActions={messageSender === 'bot'}
                />
              </div>
            )}

            {messageDemoView === 'thread' && (
              <div style={{ width: '100%', maxWidth: '680px' }}>
                <MessageThread type={messageThreadType} />
              </div>
            )}

            {messageDemoView === 'audio' && (
              <div style={{ width: '100%', maxWidth: '486px' }}>
                <MessageAudioRich
                  mode={messageAudioMode}
                  withProjectDropdown={messageAudioDropdown}
                  projectHeadline="Project headline"
                />
              </div>
            )}
          </div>
        </section>

        {/* Live Modal Dialog Popup */}
        <Modal
          isOpen={modalOpen}
          inline={false}
          title="Create an assistant"
          withProgress={modalDemoVariant === 'step1' || modalDemoVariant === 'multistep' || modalDemoVariant === 'master'}
          progress={modalDemoVariant === 'step1' ? 30 : modalDemoVariant === 'multistep' ? 80 : 100}
          agentModule={modalDemoVariant !== 'compact' && modalDemoVariant !== 'template'}
          inputModule1={modalDemoVariant !== 'compact'}
          inputModule2={modalDemoVariant !== 'template'}
          fileUploaderModule={modalDemoVariant === 'multistep' || modalDemoVariant === 'master'}
          inputModule3={modalDemoVariant === 'template' || modalDemoVariant === 'multistep' || modalDemoVariant === 'master'}
          cardModule1={modalDemoVariant === 'master'}
          cardModule2={modalDemoVariant === 'master'}
          onClose={() => setModalOpen(false)}
          onBack={() => setModalOpen(false)}
          onNext={() => {
            alert('Next step clicked!');
            setModalOpen(false);
          }}
        />

      </main>



      {/* Viewport Toast Notifications Container */}
      <SnackbarContainer position="bottom-left">
        {liveToasts.map((toast) => (
          <Snackbar
            key={toast.id}
            {...toast}
            autoHideDuration={6000}
            onClose={() => removeAppToast(toast.id)}
          />
        ))}
      </SnackbarContainer>
    </div>
  );
}

export default App;



