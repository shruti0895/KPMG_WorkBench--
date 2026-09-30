import { useState } from 'react';
import { Button } from './components/Button/Button';
import { IconButton } from './components/IconButton/IconButton';
import { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Slider } from './components/Slider/Slider';
import { ProgressIndicator } from './components/ProgressIndicator/ProgressIndicator';
import { FileUploader } from './components/FileUploader/FileUploader';
import { Chip, ChipStarSvg, ChipBrandedDocSvg } from './components/Chip';
import { Badge } from './components/Badge';
import { Banner } from './components/Banner';

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
          Component Specifications: Banners (12 Variants), Badges (12 Variants), Chips (80+ Variants), File Uploaders, Progress Indicators, Sliders, Checkboxes, Buttons &amp; Breadcrumbs.
        </p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
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
            100% token-driven: High-level window status banner featuring robot AI leading icon, label typography, status percentages, and linear progress indicators.
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
            100% token-driven: Small (6px dot), Medium (16px count pill), Large (24px count pill) across Primary and Neutral palettes in Quiet and Loud states.
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
      </main>
    </div>
  );
}

export default App;
