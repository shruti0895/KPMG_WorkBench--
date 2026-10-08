import React from 'react';
import { HorizontalCard, HorizontalCardsRich, StackedCard, SpecialCard, TaskCard } from './Cards';

export default {
  title: 'Components/Cards',
  component: HorizontalCard,
  subcomponents: { HorizontalCardsRich, StackedCard, SpecialCard, TaskCard },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Card Family

Enterprise presentation card components engineered to KPMG WorkBench specifications:

1. **Horizontal Card**:
   - **Sizes**: Small , Medium, Large, Extra large, Largest.
   - **Interactive Types**: Image, Image and checkmark, Image and arrow icon, Image and more icon, Image and status.
   - **Styles**: Outlined, Elevated, Filled, Warning / Missing.

2. **Horizontal Card Rich**:
   - **Types**: Default, List, Attachment.
   - **Styles**: Outlined, Elevated, Filled.

3. **Stacked Cards**:
   - **Types**:
     - **Media**: Top author header, media image(s) with document badge, content block, and action buttons footer.
     - **Assistant**: Top author header, media image(s), content block, filter chips, and interactive social counters (Heart, Bookmark, Share).
     - **Forum**: Top author header, media image(s), content block, and avatar group footer.
   - **Styles**: Outline (1px neutral border), Elevated (drop shadow), Filled (tinted blue surface).
   - **Image amount**: 1 (single hero image) or 2 (two side-by-side images).

4. **Special Cards (30 Variants)**:
   - **Slider**: parameter card with interactive discrete slider.
   - **Chips**: categorical selection card with Filter, Assistive, or Input chips.
   - **References**: citation card with linked resources and domain tags.
   - **Code**:  syntax container in Small and Large  with one-click copy.
   - **Loading**:  AI thinking/synthesis cards in Small , Medium , and Large  across Light & Dark modes.
   - **Rich**:  collapsible parameter accordion with tooltip and nested micro-model sliders.
   - **Styles**: Outline, Elevated, Filled.

5. **Task Cards ( 27 Variants)**:
   - **Types**: Unchecked (default empty checkbox), Checked (strikethrough title + filled checkmark), Loading (spinning circular progress ring).
   - **Configurations**:
     - Base : Title, supporting description, trailing 40x40 touch target.
     - With Action: Title, supporting description, pill action button, trailing target.
     - With File Uploader: Title, supporting description, dashed drag-and-drop file uploader, trailing target.
   - **Styles**: Outline (1px neutral border), Elevated (drop shadow), Filled (tinted blue surface).
   - **States**: Enabled, Hovered, Pressed.
        `,
      },
    },
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Vertical card height and thumbnail scale',
      control: 'select',
      options: ['Small', 'Medium', 'Large', 'Extra large', 'Largest'],
      table: {
        type: { summary: "'Small' | 'Medium' | 'Large' | 'Extra large' | 'Largest'" },
        defaultValue: { summary: "'Medium'" },
      },
    },
    type: {
      name: 'type',
      description: 'Interactive trailing element and layout configuration',
      control: 'select',
      options: ['Image', 'Image and checkmark', 'Image and arrow icon', 'Image and more icon', 'Image and status'],
      table: {
        type: { summary: "'Image' | 'Image and checkmark' | 'Image and arrow icon' | 'Image and more icon' | 'Image and status'" },
        defaultValue: { summary: "'Image'" },
      },
    },
    styleVariant: {
      name: 'styleVariant',
      description: 'Surface style and elevation',
      control: 'select',
      options: ['Outlined', 'Elevated', 'Filled', 'Missing'],
      table: {
        type: { summary: "'Outlined' | 'Elevated' | 'Filled' | 'Missing'" },
        defaultValue: { summary: "'Outlined'" },
      },
    },
    title: {
      name: 'title',
      description: 'Primary headline text',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: "'Header'" } },
    },
    supportingText: {
      name: 'supportingText',
      description: 'Supporting description text',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    bodyText: {
      name: 'bodyText',
      description: 'Extended description text under divider (Largest / Extra large)',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    checked: {
      name: 'checked',
      description: 'Checked state for checkmark type',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    hasImage: {
      name: 'hasImage',
      description: 'Whether thumbnail image box is displayed',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    statusChip: {
      name: 'statusChip',
      description: 'Status badge label text',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: "'Label'" } },
    },
    showChip: {
      name: 'showChip',
      description: 'Toggle status badge chip visibility (true = show, false = hide)',
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    progress: {
      name: 'progress',
      description: 'Progress bar fill percentage (0-100)',
      control: { type: 'range', min: 0, max: 100, step: 5 },
      table: { type: { summary: 'number' }, defaultValue: { summary: '65' } },
    },
    hasProgress: {
      name: 'hasProgress',
      description: 'Toggle linear progress bar container visibility',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    progressColor: {
      name: 'progressColor',
      description: 'Custom progress fill bar color',
      control: 'color',
      table: { type: { summary: 'string' } },
    },
    checkboxShape: {
      name: 'checkboxShape',
      description: 'Selection indicator shape: circle (Figma standard) or square',
      control: 'radio',
      options: ['circle', 'square'],
      table: { type: { summary: "'circle' | 'square'" }, defaultValue: { summary: "'circle'" } },
    },
    checkVariant: {
      name: 'checkVariant',
      description: 'Selection indicator variant type (Figma Checkbox component specification)',
      control: 'select',
      options: [
        'default',
        'checked',
        'unchecked',
        'unchecked-light',
        'indeterminate',
        'error-checked',
        'error-unchecked',
        'error-checked-light',
        'error-indeterminate',
        'primary',
        'purple',
        'error',
      ],
      table: { type: { summary: 'string' }, defaultValue: { summary: "'default'" } },
    },
    checkState: {
      name: 'checkState',
      description: 'Interactive state layer: enabled, hovered, pressed, disabled',
      control: 'select',
      options: ['enabled', 'hovered', 'pressed', 'disabled'],
      table: { type: { summary: "'enabled' | 'hovered' | 'pressed' | 'disabled'" }, defaultValue: { summary: "'enabled'" } },
    },
    checkColor: {
      name: 'checkColor',
      description: 'Custom indicator fill and stroke color override',
      control: 'color',
      table: { type: { summary: 'string' } },
    },
  },
};

/* ==========================================================================
   DEFAULT PLAYGROUND STORY
   ========================================================================== */

export const Default = {
  args: {
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
    bodyText: 'Description text Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh',
    checked: false,
    hasImage: true,
  },
};

/* ==========================================================================
   COMPLETE FIGMA MATRIX GALLERY (Matches Attached Design Exactly)
   ========================================================================== */

export const CompleteFigmaMatrix = () => {
  const renderRow = (size, styleVariant) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 340px)', gap: '16px', marginBottom: '16px' }}>
      <HorizontalCard
        size={size}
        type="Image"
        styleVariant={styleVariant}
        title="Header"
      />
      <HorizontalCard
        size={size}
        type="Image and checkmark"
        styleVariant={styleVariant}
        title="Header"
        checked={true}
      />
      <HorizontalCard
        size={size}
        type="Image and arrow icon"
        styleVariant={styleVariant}
        title="Header"
      />
      <HorizontalCard
        size={size}
        type="Image and more icon"
        styleVariant={styleVariant}
        title="Header"
      />
    </div>
  );

  const renderStatus = (styleVariant) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 340px)', gap: '16px', marginBottom: '32px' }}>
      <HorizontalCard
        size="Large"
        type="Image and status"
        styleVariant={styleVariant}
        title="Header"
        statusChip="Label"
        statusText1="Supporting line text lorem ipsum"
        statusText2="Supporting line text lorem ipsum"
        progress={65}
        checked={true}
      />
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* 1. OUTLINED STYLE GROUP */}
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>1. Outlined Style Matrix</h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#9090a2' }}>
          White background with 1px neutral border (#d5d5dc).
        </p>
        {renderRow('Largest', 'Outlined')}
        {renderRow('Extra large', 'Outlined')}
        {renderRow('Large', 'Outlined')}
        {renderRow('Medium', 'Outlined')}
        {renderRow('Small', 'Outlined')}
        {renderStatus('Outlined')}
      </div>

      {/* 2. ELEVATED STYLE GROUP */}
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>2. Elevated Style Matrix</h3>

        {renderRow('Largest', 'Elevated')}
        {renderRow('Extra large', 'Elevated')}
        {renderRow('Large', 'Elevated')}
        {renderRow('Medium', 'Elevated')}
        {renderRow('Small', 'Elevated')}
        {renderStatus('Elevated')}
      </div>

      {/* 3. FILLED STYLE GROUP */}
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>3. Filled Style Matrix</h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#9090a2' }}>
          Tinted container background fill (#f5f5fe).
        </p>
        {renderRow('Largest', 'Filled')}
        {renderRow('Extra large', 'Filled')}
        {renderRow('Large', 'Filled')}
        {renderRow('Medium', 'Filled')}
        {renderRow('Small', 'Filled')}
        {renderStatus('Filled')}
      </div>

      {/* 4. MISSING / WARNING STYLE GROUP */}
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>4. Missing / Warning Single Line Style</h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#9090a2' }}>
          Single-line headline container with warning background (#fffbeb) without thumbnail image.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 340px)', gap: '16px' }}>
          <HorizontalCard
            size="Small"
            type="Image and arrow icon"
            styleVariant="Missing"
            title="Project Structuring"
            hasImage={false}
          />
          <HorizontalCard
            size="Small"
            type="Image and checkmark"
            styleVariant="Missing"
            title="Project Structuring"
            hasImage={false}
            checked={true}
          />
          <HorizontalCard
            size="Small"
            type="Image and arrow icon"
            styleVariant="Missing"
            title="Project Structuring"
            hasImage={false}
          />
          <HorizontalCard
            size="Small"
            type="Image and more icon"
            styleVariant="Missing"
            title="Project Structuring"
            hasImage={false}
          />
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   INDIVIDUAL SIZE SHOWCASE
   ========================================================================== */

export const LargestSize = {
  args: {
    size: 'Largest',
    type: 'Image and checkmark',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
    bodyText: 'Description text Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh',
    checked: true,
  },
};

export const ExtraLargeSize = {
  args: {
    size: 'Extra large',
    type: 'Image and more icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
    bodyText: 'Description text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  },
};

export const LargeSize = {
  args: {
    size: 'Large',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
};

export const MediumSize = {
  args: {
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
};

export const SmallSize = {
  args: {
    size: 'Small',
    type: 'Image and checkmark',
    styleVariant: 'Outlined',
    title: 'Header',
    checked: true,
  },
};

export const StatusCard = {
  args: {
    size: 'Large',
    type: 'Image and status',
    styleVariant: 'Outlined',
    title: 'Header',
    showChip: false,
    statusChip: 'Label',
    statusText1: 'Supporting line text lorem ipsum',
    statusText2: 'Supporting line text lorem ipsum',
    progress: 25,
    hasProgress: true,
    checked: true,
    checkboxShape: 'circle',
    checkVariant: 'default',
    checkState: 'enabled',
  },
};

/* ==========================================================================
   CHECKED & STATUS VARIANTS GALLERY (Exact 7x4 Figma Node Matrix)
   ========================================================================== */

export const CheckedStatusVariantsGallery = () => {
  // Matrix data corresponding directly to user screenshot
  const rows = [
    // Row 1: Header + Label chip variants
    [
      { styleVariant: 'Outlined', showChip: true, checked: true, progress: 0 },
      { styleVariant: 'Filled', showChip: true, checked: true, progress: 25 },
      { styleVariant: 'Filled', showChip: true, checked: true, progress: 25 },
      { styleVariant: 'Outlined', showChip: false, checked: false, progress: 0 },
    ],
    // Row 2: Header without chip (Col 0 highlighted as active Figma component)
    [
      { styleVariant: 'Outlined', showChip: false, checked: true, progress: 25, isFigmaSelected: true },
      { styleVariant: 'Filled', showChip: false, checked: true, progress: 25 },
      { styleVariant: 'Filled', showChip: false, checked: true, progress: 25 },
      { styleVariant: 'Outlined', showChip: false, checked: false, progress: 10 },
    ],
    // Row 3: Standard Checked & Unchecked Status cards
    [
      { styleVariant: 'Outlined', showChip: false, checked: true, progress: 25 },
      { styleVariant: 'Filled', showChip: false, checked: true, progress: 25 },
      { styleVariant: 'Filled', showChip: false, checked: true, progress: 25 },
      { styleVariant: 'Outlined', showChip: false, checked: false, progress: 25 },
    ],
    // Row 4: Unchecked variants + Error unchecked outline
    [
      { styleVariant: 'Outlined', showChip: false, checked: false, progress: 25 },
      { styleVariant: 'Filled', showChip: false, checked: false, progress: 25 },
      { styleVariant: 'Filled', showChip: false, checkVariant: 'error-unchecked', checked: false, progress: 0 },
      { styleVariant: 'Outlined', showChip: false, checked: false, progress: 40 },
    ],
    // Row 5: Hovered state layers (Primary hover #e9eafc & Error hover #ffcedf)
    [
      { styleVariant: 'Outlined', showChip: false, checked: false, checkState: 'hovered', progress: 25 },
      { styleVariant: 'Filled', showChip: false, checked: false, checkState: 'hovered', progress: 25 },
      { styleVariant: 'Filled', showChip: false, checkVariant: 'error-unchecked', checkState: 'hovered', checked: false, progress: 0 },
      { styleVariant: 'Outlined', showChip: false, checked: false, progress: 65 },
    ],
    // Row 6: Pressed state layers (Primary pressed #d7d9fa & Error pressed #feaac8)
    [
      { styleVariant: 'Outlined', showChip: false, checked: false, checkState: 'pressed', progress: 25 },
      { styleVariant: 'Filled', showChip: false, checked: false, checkState: 'pressed', progress: 25 },
      { styleVariant: 'Filled', showChip: false, checkVariant: 'error-unchecked', checkState: 'pressed', checked: false, progress: 25 },
      { styleVariant: 'Outlined', showChip: false, checked: true, progress: 85 },
    ],
    // Row 7: Solid Purple checked & Error solid checked with halos
    [
      { styleVariant: 'Outlined', showChip: false, checkVariant: 'purple', checked: true, checkState: 'hovered', progress: 25 },
      { styleVariant: 'Filled', showChip: false, checkVariant: 'purple', checked: true, checkState: 'pressed', progress: 25 },
      { styleVariant: 'Filled', showChip: false, checkVariant: 'error-checked', checked: true, checkState: 'hovered', progress: 25 },
    ],
  ];

  return (
    <div style={{ background: '#f5f5f7', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '32px', width: 'fit-content' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          Horizontal Card Checked & Status Gallery
        </h3>
        <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#68687a' }}>
          Configurable circular selection format (40x40 touch target) supporting all states, chips, colors, and progress fills.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 340px)', gap: '20px', alignItems: 'start' }}>
            {row.map((item, colIndex) => {
              const cardElement = (
                <HorizontalCard
                  key={`${rowIndex}-${colIndex}`}
                  size="Large"
                  type="Image and status"
                  styleVariant={item.styleVariant}
                  title="Header"
                  showChip={item.showChip}
                  statusChip="Label"
                  statusText1="Supporting line text lorem ipsum"
                  statusText2="Supporting line text lorem ipsum"
                  progress={item.progress}
                  checked={item.checked}
                  checkVariant={item.checkVariant || 'default'}
                  checkState={item.checkState || 'enabled'}
                  checkboxShape="circle"
                />
              );

              if (item.isFigmaSelected) {
                return (
                  <div key={`${rowIndex}-${colIndex}`} style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '-24px',
                        left: 0,
                        background: '#7c3aed',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        zIndex: 2,
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 12l10 10 10-10L12 2z" />
                      </svg>
                      Horizontal card
                    </div>
                    <div style={{ outline: '2px solid #7c3aed', outlineOffset: '2px', borderRadius: '12px' }}>
                      {cardElement}
                    </div>
                  </div>
                );
              }

              return cardElement;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   HORIZONTAL CARDS RICH STORIES (9 Variants - Figma Node 1673:12549)
   ========================================================================== */

export const AllRichVariantsMatrix = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1200px' }}>
    <div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>1. Outlined Rich Cards</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#9090a2' }}>
        White surface with 1px neutral border (#d5d5dc).
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(376px, 1fr))', gap: '24px', alignItems: 'start' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#454554' }}>Default Type</h4>
          <HorizontalCardsRich type="Default" styleVariant="Outlined" />
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#454554' }}>List Type</h4>
          <HorizontalCardsRich type="List" styleVariant="Outlined" />
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#454554' }}>Attachment Type</h4>
          <HorizontalCardsRich type="Attachment" styleVariant="Outlined" />
        </div>
      </div>
    </div>

    <div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>2. Elevated Rich Cards</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(376px, 1fr))', gap: '24px', alignItems: 'start' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#454554' }}>Default Type</h4>
          <HorizontalCardsRich type="Default" styleVariant="Elevated" />
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#454554' }}>List Type</h4>
          <HorizontalCardsRich type="List" styleVariant="Elevated" />
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#454554' }}>Attachment Type</h4>
          <HorizontalCardsRich type="Attachment" styleVariant="Elevated" />
        </div>
      </div>
    </div>

    <div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>3. Filled Rich Cards</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#9090a2' }}>
        Tinted container background fill (#f5f5fe).
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(376px, 1fr))', gap: '24px', alignItems: 'start' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#454554' }}>Default Type</h4>
          <HorizontalCardsRich type="Default" styleVariant="Filled" />
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#454554' }}>List Type</h4>
          <HorizontalCardsRich type="List" styleVariant="Filled" />
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#454554' }}>Attachment Type</h4>
          <HorizontalCardsRich type="Attachment" styleVariant="Filled" />
        </div>
      </div>
    </div>
  </div>
);

export const RichDefaultOutlined = {
  render: (args) => <HorizontalCardsRich {...args} />,
  args: {
    type: 'Default',
    styleVariant: 'Outlined',
    title: 'Header',
    subhead: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
    sectionTitle1: 'Title',
    sectionTitle2: 'Title',
  },
};

export const RichDefaultElevated = {
  render: (args) => <HorizontalCardsRich {...args} />,
  args: {
    type: 'Default',
    styleVariant: 'Elevated',
    title: 'Header',
    subhead: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
    sectionTitle1: 'Title',
    sectionTitle2: 'Title',
  },
};

export const RichDefaultFilled = {
  render: (args) => <HorizontalCardsRich {...args} />,
  args: {
    type: 'Default',
    styleVariant: 'Filled',
    title: 'Header',
    subhead: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
    sectionTitle1: 'Title',
    sectionTitle2: 'Title',
  },
};

export const RichListOutlined = {
  render: (args) => <HorizontalCardsRich {...args} />,
  args: {
    type: 'List',
    styleVariant: 'Outlined',
    title: 'Header',
    subhead: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
    sectionTitle1: 'Title',
  },
};

export const RichListElevated = {
  render: (args) => <HorizontalCardsRich {...args} />,
  args: {
    type: 'List',
    styleVariant: 'Elevated',
    title: 'Header',
    subhead: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
    sectionTitle1: 'Title',
  },
};

export const RichListFilled = {
  render: (args) => <HorizontalCardsRich {...args} />,
  args: {
    type: 'List',
    styleVariant: 'Filled',
    title: 'Header',
    subhead: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
    sectionTitle1: 'Title',
  },
};

export const RichAttachmentOutlined = {
  render: (args) => <HorizontalCardsRich {...args} />,
  args: {
    type: 'Attachment',
    styleVariant: 'Outlined',
    sectionTitle1: 'Attachments',
  },
};

export const RichAttachmentElevated = {
  render: (args) => <HorizontalCardsRich {...args} />,
  args: {
    type: 'Attachment',
    styleVariant: 'Elevated',
    sectionTitle1: 'Attachments',
  },
};

export const RichAttachmentFilled = {
  render: (args) => <HorizontalCardsRich {...args} />,
  args: {
    type: 'Attachment',
    styleVariant: 'Filled',
    sectionTitle1: 'Attachments',
  },
};

/* ==========================================================================
   STACKED CARDS STORIES (Figma Node 1671:8417 - 18 Variants)
   Fully controlled from props
   ========================================================================== */

export const StackedCardPlayground = {
  render: (args) => <StackedCard {...args} />,
  args: {
    type: 'Media',
    styleVariant: 'Outline',
    imageAmount: 1,
    authorName: 'Cameron Williamson',
    authorSubhead: '2 hours ago',
    title: 'Modern Enterprise Architecture',
    subhead: 'Research & Strategy',
    bodyText: 'Comprehensive overview of scalable enterprise system design and micro-frontend patterns.',
    primaryButtonText: 'Action',
    secondaryButtonText: 'Cancel',
    hasMediaBadge: true,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Media', 'Assistant', 'Forum'],
      description: 'Stacked card variant type',
    },
    styleVariant: {
      control: 'select',
      options: ['Outline', 'Elevated', 'Filled'],
      description: 'Card container surface style',
    },
    imageAmount: {
      control: 'radio',
      options: [1, 2],
      description: 'Amount of media images (1 hero or 2 side-by-side)',
    },
    authorName: { control: 'text' },
    authorSubhead: { control: 'text' },
    title: { control: 'text' },
    subhead: { control: 'text' },
    bodyText: { control: 'text' },
    hasHeader: { control: 'boolean' },
    hasMedia: { control: 'boolean' },
    hasMediaBadge: { control: 'boolean' },
  },
};

export const StackedCardAssistant = {
  render: (args) => <StackedCard {...args} />,
  args: {
    type: 'Assistant',
    styleVariant: 'Elevated',
    imageAmount: 1,
    authorName: 'AI Strategy Assistant',
    authorSubhead: 'Generated yesterday',
    title: 'Financial Analysis Q4',
    subhead: 'Audit & Assurance',
    bodyText: 'Automated breakdown of global fiscal reporting, variance analysis, and key compliance benchmarks.',
    chips: ['Audit', 'Finance', 'Compliance'],
    heartCount: 42,
    bookmarkCount: 18,
    shareCount: 9,
  },
};

export const StackedCardForum = {
  render: (args) => <StackedCard {...args} />,
  args: {
    type: 'Forum',
    styleVariant: 'Filled',
    imageAmount: 1,
    authorName: 'Innovation Forum',
    authorSubhead: 'Active discussion',
    title: 'Design System Governance 2026',
    subhead: 'Community Discussion',
    bodyText: 'Collaborative thread on token synchronizations and accessibility parity.',
    avatarCount: 4,
    participantLabel: 'participants',
  },
};

export const StackedCardTwoImages = {
  render: (args) => <StackedCard {...args} />,
  args: {
    type: 'Media',
    styleVariant: 'Outline',
    imageAmount: 2,
    authorName: 'Asset Repository',
    authorSubhead: 'Updated 10m ago',
    title: 'Dual Media Showcase',
    subhead: 'Brand Assets',
    bodyText: 'Side-by-side asset comparison with dual square thumbnails for rapid visual inspection.',
    primaryButtonText: 'Download',
    secondaryButtonText: 'Details',
  },
};

/* ==========================================================================
   COMPLETE STACKED CARDS FIGMA MATRIX (All 18 Variants - Node 1671:8417)
   ========================================================================== */

export const AllStackedCardVariantsMatrix = () => {
  const styles = ['Outline', 'Elevated', 'Filled'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', maxWidth: '1200px' }}>
      {/* 1. MEDIA TYPE GROUP (6 Variants) */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          1. Stacked Cards - Media Type (6 Variants)
        </h3>
        <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#68687a' }}>
          Featuring user header, single or double media thumbnails, document badge overlay, and action buttons footer.
        </p>

        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#454554' }}>Image Amount = 1</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 340px))', gap: '24px', marginBottom: '32px' }}>
          {styles.map((style) => (
            <div key={`media-1-${style}`}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                Style: {style}
              </div>
              <StackedCard
                type="Media"
                styleVariant={style}
                imageAmount={1}
                title="Financial Assessment Report"
                subhead="Audit & Advisory"
                authorName="Devon Lane"
                authorSubhead="3 hours ago"
              />
            </div>
          ))}
        </div>

        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#454554' }}>Image Amount = 2</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 340px))', gap: '24px' }}>
          {styles.map((style) => (
            <div key={`media-2-${style}`}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                Style: {style}
              </div>
              <StackedCard
                type="Media"
                styleVariant={style}
                imageAmount={2}
                title="Brand Imagery Package"
                subhead="Marketing & Design"
                authorName="Devon Lane"
                authorSubhead="3 hours ago"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. ASSISTANT TYPE GROUP (6 Variants) */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          2. Stacked Cards - Assistant Type (6 Variants)
        </h3>
        <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#68687a' }}>
          Featuring user header, media thumbnails, content description, filter chips, and interactive social counters (Heart, Bookmark, Share).
        </p>

        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#454554' }}>Image Amount = 1</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 340px))', gap: '24px', marginBottom: '32px' }}>
          {styles.map((style) => (
            <div key={`assistant-1-${style}`}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                Style: {style}
              </div>
              <StackedCard
                type="Assistant"
                styleVariant={style}
                imageAmount={1}
                title="AI Tax Optimization Guidance"
                subhead="Tax & Regulatory"
                authorName="Tax Copilot"
                authorSubhead="Automated Insight"
                chips={['Tax', 'Regulatory']}
                heartCount={35}
                bookmarkCount={14}
                shareCount={7}
              />
            </div>
          ))}
        </div>

        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#454554' }}>Image Amount = 2</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 340px))', gap: '24px' }}>
          {styles.map((style) => (
            <div key={`assistant-2-${style}`}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                Style: {style}
              </div>
              <StackedCard
                type="Assistant"
                styleVariant={style}
                imageAmount={2}
                title="Comparative Scenario Model"
                subhead="Forecasting"
                authorName="Tax Copilot"
                authorSubhead="Automated Insight"
                chips={['Model', 'Fiscal']}
                heartCount={28}
                bookmarkCount={9}
                shareCount={3}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. FORUM TYPE GROUP (6 Variants) */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          3. Stacked Cards - Forum Type (6 Variants)
        </h3>
        <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#68687a' }}>
          Featuring user header, media thumbnails, content description, and avatar group indicating participant engagement.
        </p>

        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#454554' }}>Image Amount = 1</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 340px))', gap: '24px', marginBottom: '32px' }}>
          {styles.map((style) => (
            <div key={`forum-1-${style}`}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                Style: {style}
              </div>
              <StackedCard
                type="Forum"
                styleVariant={style}
                imageAmount={1}
                title="WorkBench System Architecture"
                subhead="Engineering Channel"
                authorName="Courtney Henry"
                authorSubhead="Yesterday at 4:32 PM"
                avatarCount={3}
              />
            </div>
          ))}
        </div>

        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#454554' }}>Image Amount = 2</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 340px))', gap: '24px' }}>
          {styles.map((style) => (
            <div key={`forum-2-${style}`}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                Style: {style}
              </div>
              <StackedCard
                type="Forum"
                styleVariant={style}
                imageAmount={2}
                title="Design System Component Critique"
                subhead="Design Practice"
                authorName="Courtney Henry"
                authorSubhead="Yesterday at 4:32 PM"
                avatarCount={4}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   SPECIAL CARDS STORIES (Figma Node 1652:22307 - 30 Variants)
   Fully controlled from props
   ========================================================================== */

export const SpecialCardPlayground = {
  render: (args) => <SpecialCard {...args} />,
  args: {
    type: 'Slider',
    styleVariant: 'Outline',
    title: 'Model Creativity (Temperature)',
    description: 'Fine-tune deterministic versus creative generation',
    sliderValue: 65,
    min: 0,
    max: 100,
    step: 5,
    sliderLabel: 'Creativity',
    showSliderIndicator: true,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Slider', 'Chips', 'References', 'Code', 'Loading', 'Rich'],
      description: 'Special card variant ',
    },
    styleVariant: {
      control: 'select',
      options: ['Outline', 'Elevated', 'Filled'],
      description: 'Card container surface style',
    },
    title: { control: 'text' },
    description: { control: 'text' },
    sliderValue: { control: { type: 'range', min: 0, max: 100, step: 5 } },
    chipsType: {
      control: 'select',
      options: ['Filter', 'Assistive', 'Input'],
    },
    codeSize: {
      control: 'select',
      options: ['Small', 'Large'],
    },
    loadingSize: {
      control: 'select',
      options: ['Small', 'Medium', 'Large'],
    },
    mode: {
      control: 'select',
      options: ['Light', 'Dark'],
    },
    withTooltip: { control: 'boolean' },
    isOpen: { control: 'boolean' },
  },
};

export const SpecialCardSlider = {
  render: (args) => <SpecialCard {...args} />,
  args: {
    type: 'Slider',
    styleVariant: 'Elevated',
    title: 'Confidence Threshold',
    description: 'Minimum classification confidence percentage required for auto-approval',
    sliderValue: 80,
    min: 0,
    max: 100,
    step: 5,
    sliderLabel: 'Approval Threshold',
    showSliderIndicator: true,
  },
};

export const SpecialCardChips = {
  render: (args) => <SpecialCard {...args} />,
  args: {
    type: 'Chips',
    styleVariant: 'Outline',
    chipsType: 'Filter',
    title: 'Industry Sector Focus',
    description: 'Filter transaction alerts across relevant regulatory domains',
    chips: ['Banking', 'Life Sciences', 'Energy', 'Technology', 'Healthcare', 'Automotive'],
    defaultSelectedChips: ['Banking', 'Technology'],
  },
};

export const SpecialCardReferences = {
  render: (args) => <SpecialCard {...args} />,
  args: {
    type: 'References',
    styleVariant: 'Outline',
    title: 'Cited Statutory Sources',
    headerActionText: '4 citations',
    references: [
      { title: 'Global Fiscal Reporting Standards 2026', source: 'KPMG Advisory Research', url: '#' },
      { title: 'Enterprise AI Governance Framework', source: 'Regulatory Compliance Council', url: '#' },
      { title: 'Cloud Infrastructure Economics Analysis', source: 'Technology Insights Group', url: '#' },
      { title: 'ESG Disclosure Alignment Benchmarks', source: 'Sustainability Forum', url: '#' },
    ],
  },
};

export const SpecialCardCode = {
  render: (args) => <SpecialCard {...args} />,
  args: {
    type: 'Code',
    styleVariant: 'Filled',
    codeSize: 'Large',
    title: 'Validation Script',
    language: 'TypeScript',
    code: `// Verify portfolio variance constraints\nexport function validateThresholds(portfolio: Portfolio): boolean {\n  const exposure = portfolio.calculateMaxDrawdown();\n  return exposure < 0.15 && portfolio.isCompliant();\n}`,
  },
};

export const SpecialCardLoading = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '420px' }}>
      <SpecialCard
        type="Loading"
        loadingSize="Small"
        mode="Light"
        loadingText="Generating response..."
      />
      <SpecialCard
        type="Loading"
        loadingSize="Medium"
        mode="Light"
        loadingText="Analyzing uploaded tax documentation..."
      />
      <SpecialCard
        type="Loading"
        loadingSize="Medium"
        mode="Dark"
        loadingText="Synthesizing multi-agent insights..."
      />
    </div>
  ),
};

export const SpecialCardRichAccordion = {
  render: (args) => <SpecialCard {...args} />,
  args: {
    type: 'Rich',
    styleVariant: 'Outline',
    title: 'Model Hyperparameters',
    description: 'Configure multi-model parameters and inference thresholds',
    defaultOpen: true,
    withTooltip: true,
    tooltipText: 'Changes apply immediately across all micro-service pipelines.',
    nestedSliders: [
      { title: 'Creativity (Temperature)', description: 'Controls randomness of generative reasoning', value: 70 },
      { title: 'Top-P Sampling', description: 'Cumulative probability threshold for token candidate pool', value: 85 },
      { title: 'Frequency Penalty', description: 'Penalizes repeated phrases and lexical repetition', value: 30 },
    ],
  },
};

/* ==========================================================================
   COMPLETE SPECIAL CARDS FIGMA MATRIX (Node 1652:22307)
   ========================================================================== */

export const AllSpecialCardVariantsMatrix = () => {
  const styles = ['Outline', 'Elevated', 'Filled'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', maxWidth: '1400px' }}>
      {/* 1. SLIDER CARDS (3 Variants) */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          1. Special Cards - Slider (3 Variants)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 340px))', gap: '24px' }}>
          {styles.map((style) => (
            <div key={`slider-${style}`}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                Style: {style}
              </div>
              <SpecialCard
                type="Slider"
                styleVariant={style}
                title="Creativity Threshold"
                description="Deterministic vs generative output balancing"
                sliderValue={style === 'Outline' ? 40 : style === 'Elevated' ? 70 : 85}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. CHIPS CARDS (9 Variants) */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          2. Special Cards - Chips (9 Variants, 428px)
        </h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#68687a' }}>
          Categorical selection cards featuring 2x3 chip grids across Filter, Assistive, and Input chip types.
        </p>

        {['Filter', 'Assistive', 'Input'].map((cType) => (
          <div key={cType} style={{ marginBottom: '28px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#454554' }}>Chip Type: {cType}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(428px, 428px))', gap: '20px' }}>
              {styles.map((style) => (
                <div key={`${cType}-${style}`}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                    Type: {cType} | Style: {style}
                  </div>
                  <SpecialCard
                    type="Chips"
                    chipsType={cType}
                    styleVariant={style}
                    title={`${cType} Categorization`}
                    description={`Interactive ${cType.toLowerCase()} chips grid with selection states`}
                    chips={['Advisory', 'Tax', 'Audit', 'Strategy', 'Risk', 'Consulting']}
                    defaultSelectedChips={['Advisory', 'Strategy']}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. REFERENCES CARDS (3 Variants) */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          3. Special Cards - References (3 Variants, 435px)
        </h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#68687a' }}>
          Source citation cards with linked statutory references, badges, and external destination links.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(435px, 435px))', gap: '24px' }}>
          {styles.map((style) => (
            <div key={`ref-${style}`}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                Style: {style}
              </div>
              <SpecialCard
                type="References"
                styleVariant={style}
                title="Statutory Citations"
                headerActionText="4 sources"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. CODE CARDS (6 Variants) */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          4. Special Cards - Code (6 Variants, 435px)
        </h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#68687a' }}>
          Formatted code snippets with language badge and one-click clipboard copy action in Small (112px) and Large (212px).
        </p>

        {['Small', 'Large'].map((cSize) => (
          <div key={cSize} style={{ marginBottom: '28px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#454554' }}>Size: {cSize}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(435px, 435px))', gap: '20px' }}>
              {styles.map((style) => (
                <div key={`code-${cSize}-${style}`}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                    Size: {cSize} | Style: {style}
                  </div>
                  <SpecialCard
                    type="Code"
                    codeSize={cSize}
                    styleVariant={style}
                    title="Audit Verification Query"
                    language="SQL"
                    code={cSize === 'Small'
                      ? "SELECT id, status, total FROM transactions WHERE variance > 0.05;"
                      : "-- Calculate quarterly exposure delta\nWITH baseline AS (\n  SELECT quarter, SUM(amount) AS total\n  FROM revenue GROUP BY quarter\n)\nSELECT * FROM baseline;"
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 5. LOADING CARDS (6 Variants) */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          5. Special Cards - Loading (6 Variants)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(414px, 414px))', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
              Size: Small | Mode: Light
            </div>
            <SpecialCard type="Loading" loadingSize="Small" mode="Light" />
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
              Size: Small | Mode: Dark
            </div>
            <SpecialCard type="Loading" loadingSize="Small" mode="Dark" />
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
              Size: Medium | Mode: Light
            </div>
            <SpecialCard type="Loading" loadingSize="Medium" mode="Light" />
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
              Size: Medium | Mode: Dark
            </div>
            <SpecialCard type="Loading" loadingSize="Medium" mode="Dark" />
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
              Size: Large | Mode: Light
            </div>
            <SpecialCard type="Loading" loadingSize="Large" mode="Light" />
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
              Size: Large | Mode: Dark
            </div>
            <SpecialCard type="Loading" loadingSize="Large" mode="Dark" />
          </div>
        </div>
      </div>

      {/* 6. RICH SLIDER ACCORDION (3 Variants) */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e1e24' }}>
          6. Special Cards - Rich Accordion (3 Variants)
        </h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#68687a' }}>
          Collapsible cards with header tooltip and nested micro-model sliders.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(376px, 376px))', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
              State: Closed | With tooltip: False
            </div>
            <SpecialCard
              type="Rich"
              styleVariant="Outline"
              defaultOpen={false}
              withTooltip={false}
            />
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
              State: Open | With tooltip: False
            </div>
            <SpecialCard
              type="Rich"
              styleVariant="Elevated"
              defaultOpen={true}
              withTooltip={false}
            />
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
              State: Open | With tooltip: True
            </div>
            <SpecialCard
              type="Rich"
              styleVariant="Filled"
              defaultOpen={true}
              withTooltip={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   TASK CARDS STORIES (Figma Node 1652:22322 - Component Set 1676:24689)
   ========================================================================== */

export const TaskCardPlayground = {
  render: (args) => <TaskCard {...args} />,
  args: {
    type: 'Unchecked',
    styleVariant: 'Outline',
    state: 'enabled',
    title: 'Review entity provision calculation',
    description: 'Verify state apportionment factor workpapers and ledger ties.',
    withAction: false,
    actionText: 'Action',
    actionVariant: 'secondary',
    withFileUploader: false,
    uploaderText: 'Drop files here or click to browse',
    uploaderSubtext: 'PDF, DOCX, XLSX up to 25MB',
    uploadedFiles: [],
    disabled: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Unchecked', 'Checked', 'Loading'],
      description: 'Card interaction type: Unchecked (empty checkbox), Checked (strikethrough title), Loading (circular spinner)',
    },
    styleVariant: {
      control: 'select',
      options: ['Outline', 'Elevated', 'Filled'],
      description: 'Surface styling variant',
    },
    state: {
      control: 'select',
      options: ['enabled', 'hovered', 'pressed'],
      description: 'Card interactive state modifier',
    },
    withAction: {
      control: 'boolean',
      description: 'Enables configuration with bottom action pill button (117px height)',
    },
    withFileUploader: {
      control: 'boolean',
      description: 'Enables configuration with dashed file uploader dropzone (213px height)',
    },
    actionVariant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Action button appearance',
    },
  },
};

export const TaskCardChecked = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#2f2f39' }}>
        Task Cards - Checked State
      </h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#9090a2' }}>
        Completed tasks display strikethrough styling on title with a filled checkmark control.
      </p>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Outline Style
        </div>
        <TaskCard
          type="Checked"
          styleVariant="Outline"
          title="Review entity provision calculation"
          description="Verify state apportionment factor workpapers and ledger ties."
        />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Elevated Style
        </div>
        <TaskCard
          type="Checked"
          styleVariant="Elevated"
          title="Review entity provision calculation"
          description="Verify state apportionment factor workpapers and ledger ties."
        />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Filled Style
        </div>
        <TaskCard
          type="Checked"
          styleVariant="Filled"
          title="Review entity provision calculation"
          description="Verify state apportionment factor workpapers and ledger ties."
        />
      </div>
    </div>
  </div>
);

export const TaskCardWithAction = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#2f2f39' }}>
        Task Cards - Configuration: With Action (117px height)
      </h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#9090a2' }}>
        Contains a 60×32px action pill button below the description.
      </p>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Unchecked • Secondary Action
        </div>
        <TaskCard
          type="Unchecked"
          styleVariant="Outline"
          withAction={true}
          actionText="Action"
          actionVariant="secondary"
          title="Validate quarterly return schedule"
          description="Supporting line text lorem ipsum dolor sit amet"
        />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Unchecked • Primary Action
        </div>
        <TaskCard
          type="Unchecked"
          styleVariant="Elevated"
          withAction={true}
          actionText="Start"
          actionVariant="primary"
          title="Validate quarterly return schedule"
          description="Supporting line text lorem ipsum dolor sit amet"
        />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Checked • Secondary Action
        </div>
        <TaskCard
          type="Checked"
          styleVariant="Filled"
          withAction={true}
          actionText="Review"
          actionVariant="secondary"
          title="Validate quarterly return schedule"
          description="Supporting line text lorem ipsum dolor sit amet"
        />
      </div>
    </div>
  </div>
);

export const TaskCardWithFileUploader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#2f2f39' }}>
        Task Cards - Configuration: With File Uploader (213px height)
      </h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#9090a2' }}>
        Includes an interactive dashed drag-and-drop file upload target container.
      </p>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Outline • Empty Uploader
        </div>
        <TaskCard
          type="Unchecked"
          styleVariant="Outline"
          withFileUploader={true}
          title="Attach audit workpaper documentation"
          description="Supporting line text lorem ipsum"
          uploaderText="Drop files here or click to browse"
          uploaderSubtext="PDF, DOCX, XLSX up to 25MB"
        />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Elevated • With Uploaded Files
        </div>
        <TaskCard
          type="Unchecked"
          styleVariant="Elevated"
          withFileUploader={true}
          title="Attach audit workpaper documentation"
          description="Supporting line text lorem ipsum"
          uploadedFiles={['Q3_Tax_Workpaper.xlsx', 'Engagement_Letter.pdf']}
        />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Filled • Checked
        </div>
        <TaskCard
          type="Checked"
          styleVariant="Filled"
          withFileUploader={true}
          title="Attach audit workpaper documentation"
          description="Supporting line text lorem ipsum"
          uploadedFiles={['Signed_Confirmation.pdf']}
        />
      </div>
    </div>
  </div>
);

export const TaskCardLoading = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#2f2f39' }}>
        Task Cards - Loading Type
      </h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#9090a2' }}>
        Shows a 24×24px spinning circular progress indicator in place of the checkbox.
      </p>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          Base Configuration (80px)
        </div>
        <TaskCard
          type="Loading"
          styleVariant="Outline"
          title="Generating tax variance model"
          description="Synchronizing ledger entries..."
        />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          With Action Configuration (117px)
        </div>
        <TaskCard
          type="Loading"
          styleVariant="Elevated"
          withAction={true}
          actionText="Cancel"
          title="Executing automated compliance check"
          description="Running KPMG Clara rules engine"
        />
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#00338d', marginBottom: '8px' }}>
          With Uploader Configuration (213px)
        </div>
        <TaskCard
          type="Loading"
          styleVariant="Filled"
          withFileUploader={true}
          title="Analyzing uploaded documentation"
          description="OCR extraction in progress"
          uploadedFiles={['Trial_Balance_2026.xlsx']}
        />
      </div>
    </div>
  </div>
);

export const AllTaskCardVariantsMatrix = () => {
  const configs = [
    { key: 'base', label: 'Base Configuration (Height: 80px)', props: {} },
    { key: 'action', label: 'Configuration: With Action (Height: 117px)', props: { withAction: true, actionText: 'Action' } },
    { key: 'uploader', label: 'Configuration: With File Uploader (Height: 213px)', props: { withFileUploader: true } },
  ];

  const types = ['Unchecked', 'Checked', 'Loading'];
  const states = ['enabled', 'hovered', 'pressed'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1300px' }}>
      <div>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: '700', color: '#2f2f39' }}>
          Task Cards - Complete 27 Variant Matrix
        </h2>
        <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#9090a2', lineHeight: '1.5' }}>
          3 Types (Unchecked, Checked, Loading) × 3 Configurations (Base, With action, With file uploader) × 3 States (Enabled, Hovered, Pressed).
          Each card maintains a fixed 378px width with charcoal `#2f2f39` title and grey `#9090a2` text.
        </p>
      </div>

      {configs.map((config) => (
        <div key={config.key} style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '40px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '17px', fontWeight: '600', color: '#00338d' }}>
            {config.label}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {types.map((type) => (
              <div key={type}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '12px' }}>
                  Type: <span style={{ color: type === 'Checked' ? '#0070ad' : type === 'Loading' ? '#7c3aed' : '#2f2f39' }}>{type}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
                  {states.map((st) => (
                    <div key={st}>
                      <div style={{ fontSize: '11px', fontWeight: '500', color: '#9090a2', marginBottom: '6px', textTransform: 'capitalize' }}>
                        State: {st}
                      </div>
                      <TaskCard
                        type={type}
                        state={st}
                        styleVariant={st === 'enabled' ? 'Outline' : st === 'hovered' ? 'Elevated' : 'Filled'}
                        title={`Task title (${type})`}
                        description="Supporting line text lorem ipsum"
                        {...config.props}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};




