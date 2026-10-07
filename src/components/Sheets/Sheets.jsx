import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import { Slider } from '../Slider/Slider';
import './Sheets.css';

/* ==========================================================================
   CANONICAL FIGMA SVG COMPONENTS FOR SHEETS
   ========================================================================== */

/** Star Outline Icon (20x20) for Section Header Pills */
export const SheetStarIcon = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12 4.248L14.062 8.426L18.674 9.096L15.337 12.349L16.125 16.942L12 14.77L7.875 16.942L8.663 12.349L5.326 9.096L9.938 8.426L12 4.248Z"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Pencil Edit Icon (16x16) */
export const SheetEditIcon = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M14.236 1.76386C13.2123 0.740172 11.5525 0.740171 10.5289 1.76386L2.65722 9.63549C2.28304 10.0097 2.01623 10.4775 1.88467 10.99L1.01571 14.3755C0.971767 14.5467 1.02148 14.7284 1.14646 14.8534C1.27144 14.9783 1.45312 15.028 1.62432 14.9841L5.00978 14.1151C5.52234 13.9836 5.99015 13.7168 6.36433 13.3426L14.236 5.47097C15.2596 4.44728 15.2596 2.78755 14.236 1.76386ZM11.236 2.47097C11.8691 1.8378 12.8957 1.8378 13.5288 2.47097C14.162 3.10413 14.162 4.1307 13.5288 4.76386L12.75 5.54269L10.4571 3.24979L11.236 2.47097ZM9.75002 3.9569L12.0429 6.24979L5.65722 12.6355C5.40969 12.883 5.10023 13.0595 4.76117 13.1465L2.19447 13.8053L2.85327 11.2386C2.9403 10.8996 3.1168 10.5901 3.36433 10.3426L9.75002 3.9569Z"
      fill={color}
    />
  </svg>
);

/** 3-Dots More Vertical Icon (24x24) */
export const SheetMoreVerticalIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12 7.75C11.0335 7.75 10.25 6.9665 10.25 6C10.25 5.0335 11.0335 4.25 12 4.25C12.9665 4.25 13.75 5.0335 13.75 6C13.75 6.9665 12.9665 7.75 12 7.75ZM12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75ZM10.25 18C10.25 18.9665 11.0335 19.75 12 19.75C12.9665 19.75 13.75 18.9665 13.75 18C13.75 17.0335 12.9665 16.25 12 16.25C11.0335 16.25 10.25 17.0335 10.25 18Z"
      fill={color}
    />
  </svg>
);

/** Upload Arrow Icon (24x24) */
export const SheetUploadIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M18.2498 3.50871C18.664 3.50883 19 3.17314 19 2.75892C19 2.34471 18.6644 2.00883 18.2502 2.00871L5.25022 2.00494C4.836 2.00482 4.5 2.34051 4.5 2.75473C4.5 3.16894 4.83557 3.50482 5.24978 3.50494L18.2498 3.50871ZM11.6482 21.9969L11.75 22.0038C12.1297 22.0038 12.4435 21.7216 12.4932 21.3555L12.5 21.2538L12.499 7.56876L16.2208 11.2891C16.4871 11.5553 16.9038 11.5795 17.1974 11.3616L17.2815 11.289C17.5477 11.0227 17.5719 10.606 17.354 10.3124L17.2814 10.2283L12.2837 5.23171C12.0176 4.96562 11.6012 4.94131 11.3076 5.15888L11.2235 5.2314L6.22003 10.228C5.92694 10.5207 5.92661 10.9956 6.21931 11.2887C6.48539 11.5551 6.90204 11.5796 7.1958 11.362L7.27997 11.2894L10.999 7.57576L11 21.2538C11 21.6335 11.2822 21.9473 11.6482 21.9969Z"
      fill={color}
    />
  </svg>
);

/** Word Document Badge Icon (18x18) */
export const SheetWordDocIcon = ({ size = 18, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <rect width="20" height="20" rx="3" fill="#185ABD" />
    <path
      d="M14 4.5H8.5C7.94772 4.5 7.5 4.94772 7.5 5.5V7.5H14C14.5523 7.5 15 7.94772 15 8.5V14.5C15.5523 14.5 16 14.0523 16 13.5V6.5L14 4.5Z"
      fill="#2B7CD3"
    />
    <rect x="4" y="5.5" width="8.5" height="8.5" rx="1.5" fill="#103F91" />
    <text
      x="8.2"
      y="12"
      fontFamily="Open Sans, sans-serif"
      fontSize="7"
      fontWeight="700"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      W
    </text>
  </svg>
);

/** Close X Icon (16x16) */
export const SheetCloseIcon = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M3.29289 3.29289C3.68342 2.90237 4.31658 2.90237 4.70711 3.29289L8 6.58579L11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289C13.0976 3.68342 13.0976 4.31658 12.7071 4.70711L9.41421 8L12.7071 11.2929C13.0976 11.6834 13.0976 12.3166 12.7071 12.7071C12.3166 13.0976 11.6834 13.0976 11.2929 12.7071L8 9.41421L4.70711 12.7071C4.31658 13.0976 3.68342 13.0976 3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929L6.58579 8L3.29289 4.70711C2.90237 4.31658 2.90237 3.68342 3.29289 3.29289Z"
      fill={color}
    />
  </svg>
);

/** Dropdown Chevron Icon (18x18) */
export const SheetChevronDownIcon = ({ size = 18, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ==========================================================================
   SUBCOMPONENT: SHEET HEADER
   ========================================================================== */

export const SheetHeader = ({
  title = 'Title',
  onAction,
  actionAriaLabel = 'Options',
  className = '',
}) => (
  <div className={`kpmg-sheet-header ${className}`}>
    <h3 className="kpmg-sheet-header__title">{title}</h3>
    <button
      type="button"
      className="kpmg-sheet-header__action"
      onClick={onAction}
      aria-label={actionAriaLabel}
    >
      <SheetMoreVerticalIcon size={20} />
    </button>
  </div>
);

SheetHeader.propTypes = {
  title: PropTypes.string,
  onAction: PropTypes.func,
  actionAriaLabel: PropTypes.string,
  className: PropTypes.string,
};

/* ==========================================================================
   SUBCOMPONENT: SHEET PILL HEADER (Collapsible Section Header)
   ========================================================================== */

export const SheetPillHeader = ({
  title = 'Header',
  actionType = 'menu', // 'menu' | 'edit'
  onAction,
  onClick,
  className = '',
}) => (
  <button
    type="button"
    className={`kpmg-sheet-pill-header ${className}`}
    onClick={onClick}
  >
    <div className="kpmg-sheet-pill-header__left">
      <span className="kpmg-sheet-pill-header__star">
        <SheetStarIcon size={18} />
      </span>
      <span className="kpmg-sheet-pill-header__title">{title}</span>
    </div>
    <div className="kpmg-sheet-pill-header__right">
      {actionType === 'edit' ? (
        <SheetEditIcon size={16} />
      ) : (
        <SheetMoreVerticalIcon size={18} />
      )}
    </div>
  </button>
);

SheetPillHeader.propTypes = {
  title: PropTypes.string,
  actionType: PropTypes.oneOf(['menu', 'edit']),
  onAction: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

/* ==========================================================================
   SUBCOMPONENT: SHEET TASK CARD (With Progress Indicator)
   ========================================================================== */

export const SheetTaskCard = ({
  title = 'Item',
  supportingText = 'Supporting line text lorem ipsum',
  progress = 80,
  type = 'indeterminate', // 'determinate' | 'indeterminate'
  className = '',
}) => (
  <div className={`kpmg-sheet-task-card ${className}`}>
    <div className="kpmg-sheet-task-card__info">
      <h4 className="kpmg-sheet-task-card__title">{title}</h4>
      <p className="kpmg-sheet-task-card__desc">{supportingText}</p>
    </div>
    <div className="kpmg-sheet-task-card__progress">
      <ProgressIndicator
        variant="circular"
        type={type}
        progress={progress}
        size="small"
      />
    </div>
  </div>
);

SheetTaskCard.propTypes = {
  title: PropTypes.string,
  supportingText: PropTypes.string,
  progress: PropTypes.number,
  type: PropTypes.oneOf(['determinate', 'indeterminate']),
  className: PropTypes.string,
};

/* ==========================================================================
   SUBCOMPONENT: SHEET CARD
   ========================================================================== */

export const SheetCard = ({
  title = 'Header',
  desc = 'Supporting line text. Lorem ipsum dolor sit amet, labore consectetur.',
  children,
  className = '',
}) => (
  <div className={`kpmg-sheet-card ${className}`}>
    {title && <h4 className="kpmg-sheet-card__title">{title}</h4>}
    {desc && <p className="kpmg-sheet-card__desc">{desc}</p>}
    {children}
  </div>
);

SheetCard.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

/* ==========================================================================
   SUBCOMPONENT: SHEET REFERENCES TABLE (Reference | Page)
   ========================================================================== */

export const SheetReferencesTable = ({
  rows = [
    { title: 'Title', page: '24' },
    { title: 'Title', page: '24' },
    { title: 'Title', page: '48' },
    { title: 'Title', page: '96' },
  ],
  className = '',
}) => (
  <div className={`kpmg-sheet-table-card ${className}`}>
    <div className="kpmg-sheet-table-header">
      <span>Reference</span>
      <span>Page</span>
    </div>
    {rows.map((r, i) => (
      <div key={i} className="kpmg-sheet-table-row">
        <span>{r.title}</span>
        <span>{r.page}</span>
      </div>
    ))}
  </div>
);

SheetReferencesTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      page: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

/* ==========================================================================
   MAIN COMPONENT: SHEETS (ALL FIGMA VARIANTS)
   ========================================================================== */

/**
 * Sheets Component - KPMG WorkBench Design System 2026
 *
 * Implements all Figma canonical variants across Floating and Side Sheets:
 * - Variants:
 *   1. 'floating' (Informational & Inputs)
 *   2. 'side' (Basic & Special: Project, Pages, Assistant)
 * - Types:
 *   - Floating: 'informational' | 'inputs'
 *   - Side: 'basic' | 'project' | 'pages' | 'assistant'
 * - Sizes:
 *   - Floating: 'compact' (400px) | 'large' (486px)
 *   - Side: 'small' (320px) | 'large' (360px)
 * - Surfaces: 'outlined' | 'filled'
 * - Drawer Support: `isDrawer={true}` renders as slide-over drawer with backdrop overlay.
 */
export const Sheets = forwardRef(({
  variant = 'floating', // 'floating' | 'side'
  type = 'informational', // 'informational' | 'inputs' | 'basic' | 'project' | 'pages' | 'assistant'
  size = 'large', // 'compact' | 'small' | 'large'
  style = 'outlined', // 'outlined' | 'filled'
  title,
  isOpen = true,
  isDrawer = false,
  onClose,
  fluid = false,
  progress = 80,
  children,
  className = '',
  ...props
}, ref) => {
  // Removable chips state for input sheet
  const [chips, setChips] = useState([
    { id: '1', label: 'Input chip' },
    { id: '2', label: 'Input chip' },
    { id: '3', label: 'Input chip' },
    { id: '4', label: 'Input chip' },
    { id: '5', label: 'Input chip' },
    { id: '6', label: 'Input chip' },
  ]);

  const removeChip = (id) => {
    setChips((prev) => prev.filter((c) => c.id !== id));
  };

  if (!isOpen) return null;

  // Inferred title if not explicitly passed
  const resolvedTitle = title || (
    type === 'project' ? 'Project' :
    type === 'pages' ? 'File' :
    type === 'assistant' ? 'Assistant' :
    type === 'basic' ? 'Title' :
    type === 'inputs' ? 'Inputs' :
    'Item'
  );

  // Compute container class
  const isFloating = variant === 'floating';
  let sizeClass = '';
  if (isFloating) {
    sizeClass = size === 'compact' ? 'kpmg-sheet--floating-compact' : 'kpmg-sheet--floating-large';
  } else {
    sizeClass = size === 'small' ? 'kpmg-sheet--side-small' : 'kpmg-sheet--side-large';
  }

  const sheetClasses = [
    'kpmg-sheet',
    isFloating ? 'kpmg-sheet--floating' : 'kpmg-sheet--side',
    sizeClass,
    `kpmg-sheet--${style}`,
    fluid ? 'kpmg-sheet--fluid' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <aside ref={ref} className={sheetClasses} {...props}>
      {/* Custom Body Override */}
      {children ? (
        children
      ) : (
        <>
          {/* ==============================================================
             1. FLOATING SHEETS: INFORMATIONAL
             ============================================================== */}
          {isFloating && type === 'informational' && (
            <>
              {/* Top Task Card with Circular ProgressIndicator */}
              <SheetTaskCard
                title="Item"
                supportingText="Supporting line text lorem ipsum"
                progress={progress}
                type="indeterminate"
              />

              {/* Q&A Block 1 */}
              <div className="kpmg-sheet-qa-block">
                <div className="kpmg-sheet-qa-item">
                  <div className="kpmg-sheet-qa-question">
                    <div className="kpmg-sheet-gradient-dot" />
                    <div>
                      <div className="kpmg-sheet-qa-question__text">Sub-question.</div>
                      <div className="kpmg-sheet-qa-question__subtext">
                        Lorem ipsum dolor sit amet, labore consectetur.
                      </div>
                    </div>
                  </div>
                  <div className="kpmg-sheet-qa-answer">
                    Answer. Lorem ipsum dolor sit amet, labore consectet...
                  </div>
                </div>

                {/* Q&A Block 2 */}
                <div className="kpmg-sheet-qa-item">
                  <div className="kpmg-sheet-qa-question">
                    <div className="kpmg-sheet-gradient-dot" />
                    <div>
                      <div className="kpmg-sheet-qa-question__text">Sub-question.</div>
                      <div className="kpmg-sheet-qa-question__subtext">
                        Lorem ipsum dolor sit amet, labore consectetur.
                      </div>
                    </div>
                  </div>
                  <div className="kpmg-sheet-qa-answer">
                    Answer. Lorem ipsum dolor sit amet, labore consectet...
                  </div>
                </div>
              </div>

              {/* Compliance Status Card */}
              <SheetCard
                title="Compliance status"
                desc="Supporting line text. Lorem ipsum dolor sit amet, labore consectetur."
              />

              {/* Score Card with Pill */}
              <SheetCard title="Score" desc="">
                <div className="kpmg-sheet-score-pill">Some code</div>
              </SheetCard>

              {/* References Table Card (Only in Large size or when enabled) */}
              {size !== 'compact' && <SheetReferencesTable />}
            </>
          )}

          {/* ==============================================================
             2. FLOATING SHEETS: INPUTS
             ============================================================== */}
          {isFloating && type === 'inputs' && (
            <>
              {/* Template Dropdown */}
              <div className="kpmg-sheet-field-label">Template</div>
              <div className="kpmg-sheet-dropdown">
                <span>Header</span>
                <SheetChevronDownIcon size={20} color="#454554" />
              </div>

              {/* Word Doc Chips Card */}
              <SheetCard title="Header" desc="Subhead">
                <div className="kpmg-sheet-chip-grid">
                  {chips.map((chip) => (
                    <div key={chip.id} className="kpmg-sheet-input-chip">
                      <SheetWordDocIcon size={18} />
                      <span>{chip.label}</span>
                      <button
                        type="button"
                        className="kpmg-sheet-chip-close"
                        onClick={() => removeChip(chip.id)}
                        aria-label={`Remove ${chip.label}`}
                      >
                        <SheetCloseIcon size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </SheetCard>

              {/* Parameter Slider Card */}
              <SheetCard
                title="Title"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
              >
                <div style={{ marginTop: '16px' }}>
                  <Slider
                    type="discrete"
                    step={1}
                    min={0}
                    max={100}
                    value={100}
                    showValueIndicator={true}
                  />
                </div>
              </SheetCard>

              {/* Header Supporting Text Cards */}
              <div className="kpmg-sheet-field-label">Header</div>
              <SheetCard
                title="Header"
                desc="Supporting line text. Lorem ipsum dolor sit amet, labore consectetur."
              />
              <SheetCard
                title="Header"
                desc="Supporting line text. Lorem ipsum dolor sit amet, labore consectetur."
              />

              {/* Drag and Drop File Uploader */}
              <div className="kpmg-sheet-dropzone">
                <SheetUploadIcon size={28} color="#454554" />
                <div className="kpmg-sheet-dropzone__text">
                  Drag and drop files or <span className="kpmg-sheet-dropzone__link">browse on computer</span>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="kpmg-sheet-action-row">
                <button type="button" className="kpmg-sheet-primary-btn">
                  Longer action
                </button>
              </div>
            </>
          )}

          {/* ==============================================================
             3. SIDE SHEETS: BASIC
             ============================================================== */}
          {!isFloating && type === 'basic' && (
            <>
              <SheetHeader title={resolvedTitle} onAction={onClose} />

              {/* Section 1 with Star Pill & Avatar Cluster */}
              <SheetPillHeader title="Header" actionType="menu" />
              <div className="kpmg-sheet-avatar-cluster">
                {['AZ', 'AZ', 'AZ', 'AZ', 'AZ'].map((initials, idx) => (
                  <div key={idx} className="kpmg-sheet-avatar-cluster__item">
                    {initials}
                  </div>
                ))}
              </div>

              {/* Section 2 */}
              <SheetPillHeader title="Header" actionType="menu" />
              <SheetCard title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />
              <SheetCard title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />
              <SheetCard title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />

              {/* Section 3 */}
              <SheetPillHeader title="Header" actionType="menu" />
              <SheetCard title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />
              <SheetCard title="Header" desc="Supporting line text lorem ipsum dolor sit amet" />
            </>
          )}

          {/* ==============================================================
             4. SIDE SHEETS SPECIAL: PROJECT
             ============================================================== */}
          {!isFloating && type === 'project' && (
            <>
              <SheetHeader title="Project" onAction={onClose} />

              {/* About Section with Tags & Details Card */}
              <SheetPillHeader title="About" actionType="menu" />
              <div style={{ display: 'flex', gap: '8px', margin: '8px 0' }}>
                <span className="kpmg-tile-tag-pill">Project tag</span>
                <span className="kpmg-tile-tag-pill">Project tag</span>
                <span className="kpmg-tile-tag-pill">Project tag</span>
              </div>
              <SheetCard
                title="More project details"
                desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua."
              />
              <button
                type="button"
                className="kpmg-sheet-primary-btn"
                style={{ width: 'fit-content', margin: '8px 0 16px 0' }}
              >
                View project
              </button>

              {/* People Section */}
              <SheetPillHeader title="People" actionType="menu" />
              <SheetCard title="Header" desc="" />
              <SheetCard title="Header" desc="" />

              {/* Summary Section */}
              <SheetPillHeader title="Summary" actionType="menu" />
              <SheetCard
                title="Header"
                desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua."
              />

              {/* Related Projects */}
              <SheetPillHeader title="Related projects" actionType="menu" />
              <SheetCard title="Header" desc="Supporting line text lorem ipsum" />
              <SheetCard title="Header" desc="Supporting line text lorem ipsum" />
            </>
          )}

          {/* ==============================================================
             5. SIDE SHEETS SPECIAL: PAGES / FILE
             ============================================================== */}
          {!isFloating && type === 'pages' && (
            <>
              <SheetHeader title="File" onAction={onClose} />

              <SheetPillHeader title="About" actionType="menu" />
              <SheetCard
                title="Header"
                desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua."
              />

              <SheetPillHeader title="Pages" actionType="menu" />
              <div className="kpmg-sheet-page-preview">
                <span className="kpmg-sheet-page-badge">Selected</span>
              </div>
              <div className="kpmg-sheet-page-preview" />
              <div className="kpmg-sheet-page-preview" />
              <div className="kpmg-sheet-page-preview" />
            </>
          )}

          {/* ==============================================================
             6. SIDE SHEETS SPECIAL: ASSISTANT
             ============================================================== */}
          {!isFloating && type === 'assistant' && (
            <>
              <SheetHeader title="Assistant" onAction={onClose} />

              {/* Purpose with Edit Pencil */}
              <SheetPillHeader title="Purpose" actionType="edit" />
              <SheetCard
                title="Header"
                desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua."
              />

              {/* Knowledge base */}
              <SheetPillHeader title="Knowledge base" actionType="menu" />
              <SheetCard title="Header" desc="" />
              <SheetCard title="Header" desc="" />

              {/* Prompt templates */}
              <SheetPillHeader title="Prompt templates" actionType="menu" />
              <SheetCard title="Header" desc="Supporting line text lorem ipsum" />
              <SheetCard title="Header" desc="Supporting line text lorem ipsum" />

              {/* Model with Edit Pencil */}
              <SheetPillHeader title="Model" actionType="edit" />
              <SheetCard
                title="Header"
                desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua."
              />

              {/* Voice with Edit Pencil */}
              <SheetPillHeader title="Voice" actionType="edit" />
              <SheetCard
                title="Header"
                desc="Supporting line text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua."
              />

              {/* Advanced Settings with Multiple Sliders */}
              <SheetPillHeader title="Advanced settings" actionType="menu" />
              {[1, 2, 3].map((idx) => (
                <SheetCard
                  key={idx}
                  title="Title"
                  desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                >
                  <div style={{ marginTop: '16px' }}>
                    <Slider
                      type="discrete"
                      step={1}
                      min={0}
                      max={100}
                      value={100}
                      showValueIndicator={true}
                    />
                  </div>
                </SheetCard>
              ))}
            </>
          )}
        </>
      )}
    </aside>
  );

  // If drawer mode is activated, wrap in fixed overlay
  if (isDrawer) {
    return (
      <div className="kpmg-sheet-backdrop" onClick={onClose}>
        <div
          className="kpmg-sheet-drawer-container"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    );
  }

  return content;
});

Sheets.displayName = 'Sheets';

Sheets.propTypes = {
  variant: PropTypes.oneOf(['floating', 'side']),
  type: PropTypes.oneOf(['informational', 'inputs', 'basic', 'project', 'pages', 'assistant']),
  size: PropTypes.oneOf(['compact', 'small', 'large']),
  style: PropTypes.oneOf(['outlined', 'filled']),
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  isDrawer: PropTypes.bool,
  onClose: PropTypes.func,
  fluid: PropTypes.bool,
  progress: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Sheets;
