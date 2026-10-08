import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Cards.css';

/* ==========================================================================
   CANONICAL FIGMA SVG ICONS
   Exact vectors extracted from Figma Node 1652:2701
   ========================================================================== */

/** Action Arrow Right (Chevron) Icon (20x20) */
export const HorizontalCardChevronIcon = ({ size = 20, color = 'currentColor', ...props }) => (
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
      d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.88 12l-4.59 4.59a.996.996 0 1 0 1.41 1.41l5.3-5.29a.996.996 0 0 0 0-1.41l-5.3-5.29a.996.996 0 0 0-1.41 0z"
      fill={color}
    />
  </svg>
);

/** Checkmark Icon for Square Checkbox Selection (16x16) */
export const HorizontalCardCheckmarkIcon = ({ size = 16, color = '#ffffff', ...props }) => (
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
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
      fill={color}
    />
  </svg>
);

/** Circular Checked Icon (Solid Fill Circle + Inner Checkmark) (24x24) */
export const HorizontalCardCircleCheckIcon = ({
  size = 24,
  fill = '#2f2f39',
  tickColor = '#ffffff',
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill={fill} />
    <polyline
      points="8 12 11 15 16 9"
      fill="none"
      stroke={tickColor}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Circular Unchecked Icon (Empty Outline Circle) (24x24) */
export const HorizontalCardCircleUncheckedIcon = ({
  size = 24,
  stroke = '#454554',
  strokeWidth = 2,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth={strokeWidth} />
  </svg>
);

/** Circular Light Check Icon (Outline Circle + Inner Checkmark) (24x24) */
export const HorizontalCardCircleLightCheckIcon = ({
  size = 24,
  stroke = '#818aee',
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2" />
    <polyline
      points="8 12 11 15 16 9"
      fill="none"
      stroke={stroke}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


/** 3-Dots Vertical Overflow Menu Icon (20x20) */
export const HorizontalCardMoreIcon = ({ size = 20, color = 'currentColor', ...props }) => (
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
      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill={color}
    />
  </svg>
);


/* ==========================================================================
   HORIZONTAL CARD COMPONENT
   Strictly implemented to Figma Node 1652:2701 (67 Variants)
   ========================================================================== */

/**
 * HorizontalCard - Principal enterprise presentation card component.
 */
export const HorizontalCard = forwardRef(({
  size = 'Medium',
  type = 'Image',
  styleVariant = 'Outlined',
  title = 'Header',
  supportingText = 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  bodyText = 'Description text Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh',
  imageSrc,
  imageAlt = 'Card thumbnail',
  hasImage = true,
  checked = false,
  checkVariant = 'default',
  checkState = 'enabled',
  checkboxShape = 'circle',
  checkColor,
  tickColor = '#ffffff',
  checkboxProps = {},
  onCheckChange,
  onArrowClick,
  onMoreClick,
  showChip,
  statusChip = 'Label',
  statusText1 = 'Supporting line text lorem ipsum',
  statusText2 = 'Supporting line text lorem ipsum',
  progress = 65,
  hasProgress = true,
  progressColor,
  className = '',
  onClick,
  ...props
}, ref) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Sync internal state with controlled prop changes for instant Storybook reactivity
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    const next = !isChecked;
    setIsChecked(next);
    if (onCheckChange) onCheckChange(e, next);
  };

  // Resolve active check variant
  const getResolvedCheckVariant = () => {
    if (checkVariant && checkVariant !== 'default') {
      if (checkVariant === 'primary') return isChecked ? 'checked' : 'unchecked';
      if (checkVariant === 'purple') return isChecked ? 'checked' : 'unchecked';
      if (checkVariant === 'error') return isChecked ? 'error-checked' : 'error-unchecked';
      return checkVariant;
    }
    return isChecked ? 'checked' : 'unchecked';
  };

  const resolvedVariant = getResolvedCheckVariant();
  const isErrorVariant = resolvedVariant.startsWith('error') || checkVariant === 'error';
  const isPurpleVariant = checkVariant === 'purple';
  const isPrimaryVariant = checkVariant === 'primary';

  const getCheckboxColors = () => {
    if (checkColor) {
      return {
        fill: checkColor,
        stroke: checkColor,
        hoverHalo: isErrorVariant ? 'var(--color-checkbox-error-hover-layer, #ffcedf)' : 'var(--color-checkbox-hover-layer, #e9eafc)',
        pressedHalo: isErrorVariant ? 'var(--color-checkbox-error-pressed-layer, #feaac8)' : 'var(--color-checkbox-pressed-layer, #d7d9fa)',
      };
    }
    if (isErrorVariant) {
      return {
        fill: 'var(--color-checkbox-error-fill, #C00F48)',
        stroke: 'var(--color-checkbox-error-stroke, #C00F48)',
        hoverHalo: 'var(--color-checkbox-error-hover-layer, #ffcedf)',
        pressedHalo: 'var(--color-checkbox-error-pressed-layer, #feaac8)',
      };
    }
    if (isPurpleVariant) {
      return {
        fill: '#5965e9',
        stroke: '#818aee',
        hoverHalo: '#e9eafc',
        pressedHalo: '#d7d9fa',
      };
    }
    if (isPrimaryVariant) {
      return {
        fill: 'var(--color-primary-action, #1e49e2)',
        stroke: 'var(--color-primary-action, #1e49e2)',
        hoverHalo: '#e9eafc',
        pressedHalo: '#d7d9fa',
      };
    }
    return {
      fill: 'var(--color-checkbox-primary-fill, #3D405B)',
      stroke: 'var(--color-checkbox-primary-stroke, #3D405B)',
      hoverHalo: 'var(--color-checkbox-hover-layer, #e9eafc)',
      pressedHalo: 'var(--color-checkbox-pressed-layer, #d7d9fa)',
    };
  };

  const renderCheckbox = () => {
    if (checkboxShape === 'square') {
      return (
        <button
          type="button"
          className={`horizontal-card__checkbox ${isChecked ? 'horizontal-card__checkbox--checked' : ''} ${checkState !== 'enabled' ? `horizontal-card__checkbox--state-${checkState}` : ''}`}
          onClick={handleCheckboxClick}
          role="checkbox"
          aria-checked={isChecked}
          aria-label="Toggle card selection"
          {...checkboxProps}
        >
          {isChecked && <HorizontalCardCheckmarkIcon size={14} color={tickColor} />}
        </button>
      );
    }

    const colors = getCheckboxColors();
    const isStateHovered = checkState === 'hovered';
    const isStatePressed = checkState === 'pressed';
    const isStateDisabled = checkState === 'disabled';

    let iconElement = null;
    switch (resolvedVariant) {
      case 'checked':
      case 'error-checked':
        iconElement = (
          <HorizontalCardCircleCheckIcon
            size={24}
            fill={colors.fill}
            tickColor={tickColor}
          />
        );
        break;
      case 'unchecked-light':
      case 'error-checked-light':
        iconElement = (
          <HorizontalCardCircleLightCheckIcon
            size={24}
            stroke={colors.stroke}
          />
        );
        break;
      case 'indeterminate':
      case 'error-indeterminate':
        iconElement = (
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke={colors.stroke} strokeWidth={2} />
            <line x1="7" y1="12" x2="17" y2="12" stroke={colors.stroke} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
        break;
      case 'unchecked':
      case 'error-unchecked':
      default:
        iconElement = (
          <HorizontalCardCircleUncheckedIcon
            size={20}
            stroke={colors.stroke}
          />
        );
        break;
    }

    const stateClasses = [
      'horizontal-card__checkbox-btn',
      isErrorVariant ? 'horizontal-card__checkbox-btn--error' : '',
      isStateHovered ? 'horizontal-card__checkbox-btn--state-hovered' : '',
      isStatePressed ? 'horizontal-card__checkbox-btn--state-pressed' : '',
      checkboxProps?.className || '',
    ].filter(Boolean).join(' ');

    const styleOverrides = {
      ...(isStateHovered ? { backgroundColor: colors.hoverHalo } : {}),
      ...(isStatePressed ? { backgroundColor: colors.pressedHalo } : {}),
      ...(checkboxProps?.style || {}),
    };

    return (
      <button
        type="button"
        className={stateClasses}
        onClick={handleCheckboxClick}
        role="checkbox"
        aria-checked={resolvedVariant.includes('checked')}
        aria-label="Toggle card selection"
        disabled={isStateDisabled}
        style={styleOverrides}
        {...checkboxProps}
      >
        {iconElement}
      </button>
    );
  };

  // Thumbnail dimensions mapping
  const getThumbSize = () => {
    switch (size) {
      case 'Small': return 48;
      case 'Medium': return 64;
      case 'Large': return 88;
      case 'Extra large':
      case 'Largest':
      default:
        return 100;
    }
  };

  const thumbSize = getThumbSize();

  // Normalize style variant
  const normalizedStyle = (styleVariant === 'Missing' || styleVariant === 'Warning') ? 'warning' : styleVariant.toLowerCase();
  const isStatus = type === 'Image and status';
  const isLargest = size === 'Largest';
  const isExtraLarge = size === 'Extra large';
  const isLarge = size === 'Large';
  const isMedium = size === 'Medium';
  const isSmall = size === 'Small';
  const shouldRenderImage = hasImage && !isStatus && styleVariant !== 'Missing';
  const shouldRenderChip = showChip !== undefined ? Boolean(showChip) : Boolean(statusChip);

  return (
    <div
      ref={ref}
      className={`horizontal-card horizontal-card--size-${size.toLowerCase().replace(/\s+/g, '-')} horizontal-card--style-${normalizedStyle} ${isStatus ? 'horizontal-card--status' : ''} ${onClick ? 'horizontal-card--clickable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* 1. STATUS CARD VARIANT */}
      {isStatus ? (
        <div className="horizontal-card__status-layout">
          <div className="horizontal-card__status-content">
            {/* Top row: Header + Suggestion Chip */}
            <div className="horizontal-card__status-header">
              <span className="horizontal-card__status-title">{title}</span>
              {shouldRenderChip && statusChip && (
                <span className="horizontal-card__status-chip">{statusChip}</span>
              )}
            </div>

            {/* Middle row: 2 supporting text lines */}
            <div className="horizontal-card__status-texts">
              {statusText1 && <p className="horizontal-card__status-subtext">{statusText1}</p>}
              {statusText2 && <p className="horizontal-card__status-subtext">{statusText2}</p>}
            </div>

            {/* Bottom row: Linear Progress Bar */}
            {hasProgress && (
              <div className="horizontal-card__status-progress">
                <div
                  className="horizontal-card__status-progress-fill"
                  style={{
                    width: `${Math.min(100, Math.max(0, progress))}%`,
                    ...(progressColor ? { backgroundColor: progressColor } : {})
                  }}
                />
              </div>
            )}
          </div>

          {/* Trailing Checkbox (40x40 Target) */}
          <div className="horizontal-card__trailing">
            {renderCheckbox()}
          </div>
        </div>
      ) : (
        /* 2. STANDARD CARD VARIANT */
        <div className="horizontal-card__inner">
          {/* Left Thumbnail Media */}
          {shouldRenderImage && (
            <div
              className={`horizontal-card__media horizontal-card__media--size-${thumbSize}`}
              style={{ width: `${thumbSize}px`, height: `${thumbSize}px`, minWidth: `${thumbSize}px` }}
            >
              {imageSrc ? (
                <img src={imageSrc} alt={imageAlt} className="horizontal-card__img" />
              ) : (
                <div className="horizontal-card__gradient-box" />
              )}
            </div>
          )}

          {/* Center Content Column */}
          <div className="horizontal-card__content">
            <h4 className="horizontal-card__title">{title}</h4>

            {/* Supporting Text */}
            {!isSmall && supportingText && (
              <p className={`horizontal-card__supporting-text horizontal-card__supporting-text--${size.toLowerCase().replace(/\s+/g, '-')}`}>
                {supportingText}
              </p>
            )}

            {/* Divider & Body text for Largest size */}
            {isLargest && (
              <>
                <hr className="horizontal-card__divider" />
                {bodyText && <p className="horizontal-card__body-text">{bodyText}</p>}
              </>
            )}

            {/* Extra Large body text */}
            {isExtraLarge && bodyText && (
              <p className="horizontal-card__body-text">{bodyText}</p>
            )}
          </div>

          {/* Trailing Action Controls (40x40 container) */}
          <div className="horizontal-card__trailing">
            {type === 'Image and checkmark' && renderCheckbox()}

            {(type === 'Image and arrow icon' || type === 'Image and arrow') && (
              <button
                type="button"
                className="horizontal-card__icon-btn"
                onClick={(e) => { e.stopPropagation(); if (onArrowClick) onArrowClick(e); }}
                aria-label="Open"
              >
                <HorizontalCardChevronIcon size={20} />
              </button>
            )}

            {type === 'Image and more icon' && (
              <button
                type="button"
                className="horizontal-card__icon-btn"
                onClick={(e) => { e.stopPropagation(); if (onMoreClick) onMoreClick(e); }}
                aria-label="More options"
              >
                <HorizontalCardMoreIcon size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

HorizontalCard.displayName = 'HorizontalCard';

HorizontalCard.propTypes = {
  size: PropTypes.oneOf(['Small', 'Medium', 'Large', 'Extra large', 'Largest']),
  type: PropTypes.oneOf([
    'Image',
    'Image and arrow icon',
    'Image and arrow',
    'Image and checkmark',
    'Image and more icon',
    'Image and status',
  ]),
  styleVariant: PropTypes.oneOf(['Outlined', 'Elevated', 'Filled', 'Missing', 'Warning']),
  title: PropTypes.string,
  supportingText: PropTypes.string,
  bodyText: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  hasImage: PropTypes.bool,
  checked: PropTypes.bool,
  checkVariant: PropTypes.oneOf([
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
  ]),
  checkState: PropTypes.oneOf(['enabled', 'hovered', 'pressed', 'disabled']),
  checkboxShape: PropTypes.oneOf(['circle', 'square']),
  checkColor: PropTypes.string,
  tickColor: PropTypes.string,
  checkboxProps: PropTypes.object,
  onCheckChange: PropTypes.func,
  onArrowClick: PropTypes.func,
  onMoreClick: PropTypes.func,
  showChip: PropTypes.bool,
  statusChip: PropTypes.string,
  statusText1: PropTypes.string,
  statusText2: PropTypes.string,
  progress: PropTypes.number,
  hasProgress: PropTypes.bool,
  progressColor: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

/** Section Action Icon (Small Chevron Down/Up) (24x24) */
export const HorizontalCardChevronDownIcon = ({ size = 20, color = 'currentColor', ...props }) => (
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
      d="M4.21967 8.46967C4.51256 8.17678 4.98744 8.17678 5.28033 8.46967L12 15.1893L18.7197 8.46967C19.0126 8.17678 19.4874 8.17678 19.7803 8.46967C20.0732 8.76256 20.0732 9.23744 19.7803 9.53033L12.5303 16.7803C12.2374 17.0732 11.7626 17.0732 11.4697 16.7803L4.21967 9.53033C3.92678 9.23744 3.92678 8.76256 4.21967 8.46967Z"
      fill={color}
    />
  </svg>
);

/* ==========================================================================
   HORIZONTAL CARDS RICH COMPONENT
   Strictly implemented to Figma Node 1673:12549 (9 Variants)
   ========================================================================== */

const DEFAULT_RICH_ITEMS_G1 = [
  {
    id: 'g1-1',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
  {
    id: 'g1-2',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
];

const DEFAULT_RICH_ITEMS_G2 = [
  {
    id: 'g2-1',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
  {
    id: 'g2-2',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
];

const DEFAULT_RICH_ITEMS_LIST = [
  {
    id: 'list-1',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
  {
    id: 'list-2',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
  {
    id: 'list-3',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
  {
    id: 'list-4',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
  {
    id: 'list-5',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
];

const DEFAULT_RICH_ITEMS_ATTACHMENT = [
  {
    id: 'att-1',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
  {
    id: 'att-2',
    size: 'Medium',
    type: 'Image and arrow icon',
    styleVariant: 'Outlined',
    title: 'Header',
    supportingText: 'Supporting line text Lorem ipsum dolor sit amet, consectetuer',
  },
];

/**
 * HorizontalCardsRich - Enterprise compound presentation container.
 * Supports Default (two sectioned groups), List (5-item stack), and Attachment (2-item compact).
 */
export const HorizontalCardsRich = forwardRef(({
  type = 'Default',
  styleVariant = 'Outlined',
  title = 'Header',
  subhead = 'Supporting line text Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  sectionTitle1 = 'Title',
  sectionTitle2 = 'Title',
  defaultOpen1 = true,
  defaultOpen2 = true,
  open1,
  open2,
  onToggle1,
  onToggle2,
  itemsGroup1,
  itemsGroup2,
  listItems,
  attachmentItems,
  onSectionAction1,
  onSectionAction2,
  children,
  className = '',
  ...props
}, ref) => {
  const [internalOpen1, setInternalOpen1] = useState(defaultOpen1);
  const [internalOpen2, setInternalOpen2] = useState(defaultOpen2);

  const isSection1Open = open1 !== undefined ? open1 : internalOpen1;
  const isSection2Open = open2 !== undefined ? open2 : internalOpen2;

  const handleToggle1 = (e) => {
    e.stopPropagation();
    const next = !isSection1Open;
    if (open1 === undefined) {
      setInternalOpen1(next);
    }
    if (onSectionAction1) onSectionAction1(e, next);
    if (onToggle1) onToggle1(next);
  };

  const handleToggle2 = (e) => {
    e.stopPropagation();
    const next = !isSection2Open;
    if (open2 === undefined) {
      setInternalOpen2(next);
    }
    if (onSectionAction2) onSectionAction2(e, next);
    if (onToggle2) onToggle2(next);
  };

  const normalizedStyle = styleVariant.toLowerCase();

  const group1 = itemsGroup1 || DEFAULT_RICH_ITEMS_G1;
  const group2 = itemsGroup2 || DEFAULT_RICH_ITEMS_G2;
  const list = listItems || DEFAULT_RICH_ITEMS_LIST;
  const attachment = attachmentItems || DEFAULT_RICH_ITEMS_ATTACHMENT;

  return (
    <div
      ref={ref}
      className={`horizontal-cards-rich horizontal-cards-rich--type-${type.toLowerCase()} horizontal-cards-rich--style-${normalizedStyle} ${className}`}
      {...props}
    >
      {/* 1. ATTACHMENT TYPE (376x260px) */}
      {type === 'Attachment' ? (
        <div className="horizontal-cards-rich__body">
          <div
            className={`horizontal-cards-rich__section-header ${!isSection1Open ? 'horizontal-cards-rich__section-header--collapsed' : ''}`}
            onClick={handleToggle1}
            role="button"
            tabIndex={0}
            aria-expanded={isSection1Open}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle1(e);
              }
            }}
          >
            <span className="horizontal-cards-rich__section-title">{sectionTitle1}</span>
            <button
              type="button"
              className={`horizontal-cards-rich__section-btn ${!isSection1Open ? 'horizontal-cards-rich__section-btn--collapsed' : ''}`}
              onClick={handleToggle1}
              aria-label={`${sectionTitle1} toggle`}
              aria-expanded={isSection1Open}
              tabIndex={-1}
            >
              <HorizontalCardChevronDownIcon size={20} />
            </button>
          </div>
          {isSection1Open && (
            <div className="horizontal-cards-rich__cards-stack">
              {children || attachment.map((card, idx) => (
                <HorizontalCard
                  key={card.id || idx}
                  {...card}
                  styleVariant={styleVariant === 'Filled' ? 'Outlined' : card.styleVariant || styleVariant}
                />
              ))}
            </div>
          )}
        </div>
      ) : type === 'List' ? (
        /* 2. LIST TYPE (376x689px) */
        <div className="horizontal-cards-rich__body">
          <header className="horizontal-cards-rich__header">
            <h3 className="horizontal-cards-rich__title">{title}</h3>
            {subhead && <p className="horizontal-cards-rich__subhead">{subhead}</p>}
          </header>
          <hr className="horizontal-cards-rich__divider" />
          <div
            className={`horizontal-cards-rich__section-header ${!isSection1Open ? 'horizontal-cards-rich__section-header--collapsed' : ''}`}
            onClick={handleToggle1}
            role="button"
            tabIndex={0}
            aria-expanded={isSection1Open}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle1(e);
              }
            }}
          >
            <span className="horizontal-cards-rich__section-title">{sectionTitle1}</span>
            <button
              type="button"
              className={`horizontal-cards-rich__section-btn ${!isSection1Open ? 'horizontal-cards-rich__section-btn--collapsed' : ''}`}
              onClick={handleToggle1}
              aria-label={`${sectionTitle1} toggle`}
              aria-expanded={isSection1Open}
              tabIndex={-1}
            >
              <HorizontalCardChevronDownIcon size={20} />
            </button>
          </div>
          {isSection1Open && (
            <div className="horizontal-cards-rich__cards-stack">
              {children || list.map((card, idx) => (
                <HorizontalCard
                  key={card.id || idx}
                  {...card}
                  styleVariant={styleVariant === 'Filled' ? 'Outlined' : card.styleVariant || styleVariant}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* 3. DEFAULT TYPE (376x654px) */
        <div className="horizontal-cards-rich__body">
          <header className="horizontal-cards-rich__header">
            <h3 className="horizontal-cards-rich__title">{title}</h3>
            {subhead && <p className="horizontal-cards-rich__subhead">{subhead}</p>}
          </header>
          <hr className="horizontal-cards-rich__divider" />

          {/* Section Group 1 */}
          <div
            className={`horizontal-cards-rich__section-header ${!isSection1Open ? 'horizontal-cards-rich__section-header--collapsed' : ''}`}
            onClick={handleToggle1}
            role="button"
            tabIndex={0}
            aria-expanded={isSection1Open}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle1(e);
              }
            }}
          >
            <span className="horizontal-cards-rich__section-title">{sectionTitle1}</span>
            <button
              type="button"
              className={`horizontal-cards-rich__section-btn ${!isSection1Open ? 'horizontal-cards-rich__section-btn--collapsed' : ''}`}
              onClick={handleToggle1}
              aria-label={`${sectionTitle1} toggle`}
              aria-expanded={isSection1Open}
              tabIndex={-1}
            >
              <HorizontalCardChevronDownIcon size={20} />
            </button>
          </div>
          {isSection1Open && (
            <div className="horizontal-cards-rich__cards-stack">
              {group1.map((card, idx) => (
                <HorizontalCard
                  key={card.id || idx}
                  {...card}
                  styleVariant={styleVariant === 'Filled' ? 'Outlined' : card.styleVariant || styleVariant}
                />
              ))}
            </div>
          )}

          <hr className="horizontal-cards-rich__divider" />

          {/* Section Group 2 */}
          <div
            className={`horizontal-cards-rich__section-header ${!isSection2Open ? 'horizontal-cards-rich__section-header--collapsed' : ''}`}
            onClick={handleToggle2}
            role="button"
            tabIndex={0}
            aria-expanded={isSection2Open}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle2(e);
              }
            }}
          >
            <span className="horizontal-cards-rich__section-title">{sectionTitle2}</span>
            <button
              type="button"
              className={`horizontal-cards-rich__section-btn ${!isSection2Open ? 'horizontal-cards-rich__section-btn--collapsed' : ''}`}
              onClick={handleToggle2}
              aria-label={`${sectionTitle2} toggle`}
              aria-expanded={isSection2Open}
              tabIndex={-1}
            >
              <HorizontalCardChevronDownIcon size={20} />
            </button>
          </div>
          {isSection2Open && (
            <div className="horizontal-cards-rich__cards-stack">
              {group2.map((card, idx) => (
                <HorizontalCard
                  key={card.id || idx}
                  {...card}
                  styleVariant={styleVariant === 'Filled' ? 'Outlined' : card.styleVariant || styleVariant}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

HorizontalCardsRich.displayName = 'HorizontalCardsRich';

HorizontalCardsRich.propTypes = {
  type: PropTypes.oneOf(['Default', 'List', 'Attachment']),
  styleVariant: PropTypes.oneOf(['Outlined', 'Elevated', 'Filled']),
  title: PropTypes.string,
  subhead: PropTypes.string,
  sectionTitle1: PropTypes.string,
  sectionTitle2: PropTypes.string,
  defaultOpen1: PropTypes.bool,
  defaultOpen2: PropTypes.bool,
  open1: PropTypes.bool,
  open2: PropTypes.bool,
  onToggle1: PropTypes.func,
  onToggle2: PropTypes.func,
  itemsGroup1: PropTypes.arrayOf(PropTypes.object),
  itemsGroup2: PropTypes.arrayOf(PropTypes.object),
  listItems: PropTypes.arrayOf(PropTypes.object),
  attachmentItems: PropTypes.arrayOf(PropTypes.object),
  onSectionAction1: PropTypes.func,
  onSectionAction2: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

/* ==========================================================================
   STACKED CARD ICONS (Figma Node 1671:8417 & 1671:9782)
   ========================================================================== */

/** Heart Like Icon (20x20 / 24x24) - outline or filled */
export const StackedCardHeartIcon = ({ size = 20, filled = false, color, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? (color || '#CF0E54') : 'none'}
    stroke={filled ? 'none' : (color || 'currentColor')}
    strokeWidth={filled ? 0 : 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M12.8199 5.57959L11.9991 6.40209L11.1759 5.57884C9.07683 3.47978 5.67357 3.47978 3.5745 5.57884C1.47543 7.67791 1.47543 11.0812 3.5745 13.1802L11.4699 21.0756C11.7628 21.3685 12.2376 21.3685 12.5305 21.0756L20.432 13.1788C22.5264 11.0727 22.53 7.67904 20.4305 5.57959C18.3276 3.4767 14.9228 3.4767 12.8199 5.57959Z" />
  </svg>
);

/** Bookmark Save Icon (20x20 / 24x24) - outline or filled */
export const StackedCardBookmarkIcon = ({ size = 20, filled = false, color, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? (color || '#1e49e2') : 'none'}
    stroke={filled ? 'none' : (color || 'currentColor')}
    strokeWidth={filled ? 0 : 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M6.19054 21.8539C5.6944 22.2109 5.00252 21.8563 5.00252 21.2451V6.24919C5.00252 4.45426 6.4576 2.99919 8.25252 2.99919H15.7509C17.5458 2.99919 19.0009 4.45426 19.0009 6.24919V21.2451C19.0009 21.8563 18.309 22.2109 17.8129 21.8539L12.0017 17.673L6.19054 21.8539Z" />
  </svg>
);

/** Share Forward Icon (20x20 / 24x24) */
export const StackedCardShareIcon = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    color={color}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M6.7467 4H10.2109C10.6251 4 10.9609 4.33579 10.9609 4.75C10.9609 5.1297 10.6788 5.44349 10.3127 5.49315L10.2109 5.5H6.7467C5.55584 5.5 4.58106 6.42516 4.50189 7.59595L4.4967 7.75V17.25C4.4967 18.4409 5.42187 19.4156 6.59266 19.4948L6.7467 19.5H16.2474C17.4383 19.5 18.4131 18.5748 18.4922 17.404L18.4974 17.25V16.7522C18.4974 16.338 18.8332 16.0022 19.2474 16.0022C19.6271 16.0022 19.9409 16.2844 19.9906 16.6504L19.9974 16.7522V17.25C19.9974 19.2543 18.4251 20.8913 16.4466 20.9948L16.2474 21H6.7467C4.74244 21 3.10543 19.4276 3.0019 17.4492L2.9967 17.25V7.75C2.9967 5.74574 4.56907 4.10873 6.54755 4.0052L6.7467 4H10.2109H6.7467ZM14.5007 6.54431V3.75C14.5007 3.12603 15.2075 2.78995 15.6877 3.1398L15.7699 3.20874L21.7645 8.95874C22.0442 9.22709 22.0697 9.65811 21.8408 9.95607L21.7646 10.0412L15.77 15.793C15.3197 16.2251 14.5878 15.9477 14.5078 15.3589L14.5007 15.2519V12.45L14.1799 12.4438C11.5224 12.4359 9.25084 13.5269 7.31507 15.745C6.81946 16.3129 5.8898 15.8769 6.00952 15.1327C6.83651 9.99233 9.60859 7.08828 14.1988 6.57443L14.5007 6.54431V3.75V6.54431Z" />
  </svg>
);

/** Document / Microsoft Word Badge Overlay (32x32) */
export const StackedCardDocBadge = ({ size = 32, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <rect width="32" height="32" rx="6" fill="#185ABD" />
    <path
      d="M19.5 8H12C11.1716 8 10.5 8.67157 10.5 9.5V22.5C10.5 23.3284 11.1716 24 12 24H20C20.8284 24 21.5 23.3284 21.5 22.5V10L19.5 8Z"
      fill="#2374E1"
    />
    <path
      d="M19.5 8V10.5H21.5L19.5 8Z"
      fill="#A3D4FF"
    />
    <rect x="7" y="11" width="10" height="10" rx="2" fill="#103F91" />
    <text
      x="12"
      y="18.5"
      fill="#FFFFFF"
      fontSize="8"
      fontWeight="700"
      fontFamily="sans-serif"
      textAnchor="middle"
    >
      W
    </text>
  </svg>
);

/* ==========================================================================
   STACKED CARD COMPONENT
   Strictly matching Figma Node 1671:8417 (18 Variants)
   3 Types (Media, Assistant, Forum) x 3 Styles (Outline, Elevated, Filled) x 2 Image amounts (1, 2)
   ========================================================================== */

/**
 * StackedCard - Principal enterprise stacked presentation card component.
 * Fully controlled from props to reproduce all 18 Figma variants.
 */
export const StackedCard = forwardRef(({
  type = 'Media',
  styleVariant = 'Outline',
  imageAmount = 1,

  // Header props
  hasHeader = true,
  authorName = 'Author Name',
  authorSubhead = '2 hours ago',
  avatarSrc,
  avatarAlt = 'Author avatar',
  onMoreClick,

  // Media props
  hasMedia = true,
  imageSrc,
  images,
  imageAlt = 'Card media',
  hasMediaBadge = true,
  mediaBadge,

  // Content props
  title = 'Header',
  subhead = 'Supporting line text',
  bodyText = 'Description text Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh',

  // Footer - Media type props
  hasButtons = true,
  primaryButtonText = 'Action',
  secondaryButtonText = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,

  // Footer - Assistant type props
  chips = ['Tag 1', 'Tag 2'],
  onChipClick,
  hasSocialActions = true,
  heartCount = 24,
  isHearted: controlledHearted,
  onHeartClick,
  bookmarkCount = 12,
  isBookmarked: controlledBookmarked,
  onBookmarkClick,
  shareCount = 5,
  onShareClick,

  // Footer - Forum type props
  avatars,
  avatarCount = 3,
  participantLabel = 'participants',

  className = '',
  onClick,
  ...props
}, ref) => {
  const [internalHearted, setInternalHearted] = useState(false);
  const [internalBookmarked, setInternalBookmarked] = useState(false);

  const isHearted = controlledHearted !== undefined ? controlledHearted : internalHearted;
  const isBookmarked = controlledBookmarked !== undefined ? controlledBookmarked : internalBookmarked;

  const handleHeartToggle = (e) => {
    e.stopPropagation();
    const next = !isHearted;
    if (controlledHearted === undefined) setInternalHearted(next);
    if (onHeartClick) onHeartClick(e, next);
  };

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    const next = !isBookmarked;
    if (controlledBookmarked === undefined) setInternalBookmarked(next);
    if (onBookmarkClick) onBookmarkClick(e, next);
  };

  const normalizedStyle = styleVariant.toLowerCase() === 'outlined' ? 'outline' : styleVariant.toLowerCase();
  const normalizedType = type.toLowerCase();
  const numImages = Number(imageAmount) === 2 ? 2 : 1;

  return (
    <div
      ref={ref}
      className={`stacked-card stacked-card--type-${normalizedType} stacked-card--style-${normalizedStyle} stacked-card--images-${numImages} ${onClick ? 'stacked-card--clickable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* 1. TOP HEADER (Avatar + Author + Overflow menu) */}
      {hasHeader && (
        <header className="stacked-card__header">
          <div className="stacked-card__user">
            <div className="stacked-card__avatar">
              {avatarSrc ? (
                <img src={avatarSrc} alt={avatarAlt} className="stacked-card__avatar-img" />
              ) : (
                <div className="stacked-card__avatar-placeholder">
                  {authorName ? authorName.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </div>
            <div className="stacked-card__user-info">
              <span className="stacked-card__user-name">{authorName}</span>
              {authorSubhead && <span className="stacked-card__user-subhead">{authorSubhead}</span>}
            </div>
          </div>
          <button
            type="button"
            className="stacked-card__overflow-btn"
            onClick={(e) => { e.stopPropagation(); if (onMoreClick) onMoreClick(e); }}
            aria-label="More options"
          >
            <HorizontalCardMoreIcon size={20} />
          </button>
        </header>
      )}

      {/* 2. MEDIA SECTION (1 or 2 images) */}
      {hasMedia && (
        <div className="stacked-card__media-container">
          {numImages === 1 ? (
            <div className="stacked-card__media-single">
              {imageSrc ? (
                <img src={imageSrc} alt={imageAlt} className="stacked-card__img" />
              ) : (
                <div className="stacked-card__gradient-box" />
              )}
              {hasMediaBadge && (
                <div className="stacked-card__media-badge">
                  {mediaBadge || <StackedCardDocBadge />}
                </div>
              )}
            </div>
          ) : (
            <div className="stacked-card__media-double">
              <div className="stacked-card__media-item">
                {images && images[0] ? (
                  <img src={images[0]} alt={`${imageAlt} 1`} className="stacked-card__img" />
                ) : (
                  <div className="stacked-card__gradient-box stacked-card__gradient-box--1" />
                )}
              </div>
              <div className="stacked-card__media-item">
                {images && images[1] ? (
                  <img src={images[1]} alt={`${imageAlt} 2`} className="stacked-card__img" />
                ) : (
                  <div className="stacked-card__gradient-box stacked-card__gradient-box--2" />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. CONTENT SECTION (Title, Subhead, Body text) */}
      <div className="stacked-card__content">
        <h4 className="stacked-card__title">{title}</h4>
        {subhead && <span className="stacked-card__subhead">{subhead}</span>}
        {bodyText && <p className="stacked-card__body">{bodyText}</p>}
      </div>

      {/* 4. FOOTER / ACTION SECTION (Conditional by Type) */}
      {type === 'Media' && hasButtons && (
        <footer className="stacked-card__footer stacked-card__footer--media">
          <div className="stacked-card__buttons-row">
            {secondaryButtonText && (
              <button
                type="button"
                className="stacked-card__btn stacked-card__btn--secondary"
                onClick={(e) => { e.stopPropagation(); if (onSecondaryClick) onSecondaryClick(e); }}
              >
                {secondaryButtonText}
              </button>
            )}
            {primaryButtonText && (
              <button
                type="button"
                className="stacked-card__btn stacked-card__btn--primary"
                onClick={(e) => { e.stopPropagation(); if (onPrimaryClick) onPrimaryClick(e); }}
              >
                {primaryButtonText}
              </button>
            )}
          </div>
        </footer>
      )}

      {type === 'Assistant' && (
        <footer className="stacked-card__footer stacked-card__footer--assistant">
          {chips && chips.length > 0 && (
            <div className="stacked-card__chips-row">
              {chips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="stacked-card__chip"
                  onClick={(e) => { e.stopPropagation(); if (onChipClick) onChipClick(e, chip, idx); }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}
          {hasSocialActions && (
            <div className="stacked-card__social-row">
              <button
                type="button"
                className={`stacked-card__social-item ${isHearted ? 'stacked-card__social-item--hearted' : ''}`}
                onClick={handleHeartToggle}
                aria-label="Heart like"
              >
                <StackedCardHeartIcon filled={isHearted} size={20} />
                <span className="stacked-card__social-count">{heartCount}</span>
              </button>
              <button
                type="button"
                className={`stacked-card__social-item ${isBookmarked ? 'stacked-card__social-item--bookmarked' : ''}`}
                onClick={handleBookmarkToggle}
                aria-label="Bookmark save"
              >
                <StackedCardBookmarkIcon filled={isBookmarked} size={20} />
                <span className="stacked-card__social-count">{bookmarkCount}</span>
              </button>
              <button
                type="button"
                className="stacked-card__social-item"
                onClick={(e) => { e.stopPropagation(); if (onShareClick) onShareClick(e); }}
                aria-label="Share"
              >
                <StackedCardShareIcon size={20} />
                <span className="stacked-card__social-count">{shareCount}</span>
              </button>
            </div>
          )}
        </footer>
      )}

      {type === 'Forum' && (
        <footer className="stacked-card__footer stacked-card__footer--forum">
          <div className="stacked-card__avatar-group">
            {(avatars || [0, 1, 2]).slice(0, avatarCount).map((av, idx) => (
              <div key={idx} className="stacked-card__avatar-group-item" style={{ zIndex: 10 - idx }}>
                {typeof av === 'string' && av ? (
                  <img src={av} alt="Participant" className="stacked-card__avatar-img" />
                ) : (
                  <div className={`stacked-card__avatar-placeholder stacked-card__avatar-placeholder--${idx % 3}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                )}
              </div>
            ))}
            {participantLabel && (
              <span className="stacked-card__participant-label">
                +{avatarCount} {participantLabel}
              </span>
            )}
          </div>
        </footer>
      )}
    </div>
  );
});

StackedCard.displayName = 'StackedCard';

StackedCard.propTypes = {
  type: PropTypes.oneOf(['Media', 'Assistant', 'Forum']),
  styleVariant: PropTypes.oneOf(['Outline', 'Outlined', 'Elevated', 'Filled']),
  imageAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([1, 2, '1', '2'])]),
  hasHeader: PropTypes.bool,
  authorName: PropTypes.string,
  authorSubhead: PropTypes.string,
  avatarSrc: PropTypes.string,
  avatarAlt: PropTypes.string,
  onMoreClick: PropTypes.func,
  hasMedia: PropTypes.bool,
  imageSrc: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  imageAlt: PropTypes.string,
  hasMediaBadge: PropTypes.bool,
  mediaBadge: PropTypes.node,
  title: PropTypes.string,
  subhead: PropTypes.string,
  bodyText: PropTypes.string,
  hasButtons: PropTypes.bool,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  onPrimaryClick: PropTypes.func,
  onSecondaryClick: PropTypes.func,
  chips: PropTypes.arrayOf(PropTypes.string),
  onChipClick: PropTypes.func,
  hasSocialActions: PropTypes.bool,
  heartCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isHearted: PropTypes.bool,
  onHeartClick: PropTypes.func,
  bookmarkCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isBookmarked: PropTypes.bool,
  onBookmarkClick: PropTypes.func,
  shareCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onShareClick: PropTypes.func,
  avatars: PropTypes.arrayOf(PropTypes.string),
  avatarCount: PropTypes.number,
  participantLabel: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

// Export alias StackedCards
export const StackedCards = StackedCard;

/* ==========================================================================
   SPECIAL CARD ICONS (Figma Node 1652:22307)
   ========================================================================== */

/** AI Sparkle / Star Icon (24x24 / 48x48) */
export const SpecialCardSparkleIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    color={color}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 2L14.39 8.26L21 9.27L16.5 14.14L17.77 21L12 17.77L6.23 21L7.5 14.14L3 9.27L9.61 8.26L12 2Z" />
  </svg>
);

/** Copy Code to Clipboard Icon (16x16) */
export const SpecialCardCopyIcon = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

/** External Reference Link Icon (14x14) */
export const SpecialCardExternalLinkIcon = ({ size = 14, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/** Info Tooltip Icon (18x18) */
export const SpecialCardInfoIcon = ({ size = 18, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

/** Chip Dismiss / Close Icon (12x12) */
export const SpecialCardCloseIcon = ({ size = 12, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ==========================================================================
   SPECIAL CARD COMPONENT (Figma Node 1652:22307)
   Variants: Slider, Chips, References, Code, Loading, Rich
   Fully controlled from props
   ========================================================================== */

/**
 * SpecialCard - Principal enterprise special purpose presentation card.
 * Reproduces all 6 Figma component set variants from Section 1652:22307.
 */
export const SpecialCard = forwardRef(({
  type = 'Slider', // 'Slider' | 'Chips' | 'References' | 'Code' | 'Loading' | 'Rich'
  styleVariant = 'Outline', // 'Outline' | 'Outlined' | 'Elevated' | 'Filled'

  // Header props (Slider, Chips, References, Code, Rich)
  hasHeader = true,
  title,
  description,
  headerActionText,
  onHeaderActionClick,

  // 1. Slider Type Props
  sliderValue: controlledSliderValue,
  defaultSliderValue = 50,
  min = 0,
  max = 100,
  step = 5,
  sliderLabel = 'Value',
  showSliderIndicator = true,
  onSliderChange,

  // 2. Chips Type Props
  chipsType = 'Filter', // 'Filter' | 'Assistive' | 'Input'
  chips = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer', 'Aerospace'],
  selectedChips: controlledSelectedChips,
  defaultSelectedChips = ['Technology'],
  onChipClick,
  onRemoveChip,

  // 3. References Type Props
  references = [
    { title: 'Global Fiscal Reporting Standards 2026', source: 'KPMG Advisory', url: '#' },
    { title: 'Enterprise AI Governance Framework', source: 'Regulatory Council', url: '#' },
    { title: 'Cloud Infrastructure Economics Analysis', source: 'Tech Insights', url: '#' },
    { title: 'ESG Disclosure Alignment Benchmarks', source: 'Sustainability Forum', url: '#' },
  ],
  onReferenceClick,

  // 4. Code Type Props
  codeSize = 'Small', // 'Small' (112px) | 'Large' (212px)
  code = `// Calculate risk variance\nconst variance = calculateMetrics(auditData);\nconsole.log('Result:', variance);`,
  language = 'TypeScript',
  onCopyCode,

  // 5. Loading Type Props
  loadingSize = 'Medium', // 'Small' (58px) | 'Medium' (128px) | 'Large' (300px)
  mode = 'Light', // 'Light' | 'Dark'
  loadingText,

  // 6. Rich Type Props
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onToggleOpen,
  withTooltip = false,
  tooltipText = 'Configure discrete parameters across all micro-models simultaneously.',
  nestedSliders = [
    { title: 'Temperature', description: 'Randomness & Creativity', value: 70 },
    { title: 'Top-P', description: 'Nucleus sampling threshold', value: 85 },
    { title: 'Penalty', description: 'Frequency penalty coefficient', value: 20 },
  ],

  className = '',
  onClick,
  ...props
}, ref) => {
  // 1. Internal state for Slider
  const [internalSliderVal, setInternalSliderVal] = useState(defaultSliderValue);
  const currentSliderVal = controlledSliderValue !== undefined ? controlledSliderValue : internalSliderVal;

  const handleSliderInput = (e) => {
    const val = Number(e.target.value);
    if (controlledSliderValue === undefined) setInternalSliderVal(val);
    if (onSliderChange) onSliderChange(e, val);
  };

  // 2. Internal state for Chips
  const [internalSelectedChips, setInternalSelectedChips] = useState(defaultSelectedChips);
  const selectedChipsList = controlledSelectedChips !== undefined ? controlledSelectedChips : internalSelectedChips;
  const [internalChipsList, setInternalChipsList] = useState(chips);

  useEffect(() => {
    setInternalChipsList(chips);
  }, [chips]);

  const handleChipClick = (e, chip, idx) => {
    e.stopPropagation();
    if (chipsType === 'Filter') {
      const isSelected = selectedChipsList.includes(chip);
      const next = isSelected
        ? selectedChipsList.filter((c) => c !== chip)
        : [...selectedChipsList, chip];
      if (controlledSelectedChips === undefined) setInternalSelectedChips(next);
      if (onChipClick) onChipClick(e, chip, !isSelected, idx);
    } else {
      if (onChipClick) onChipClick(e, chip, true, idx);
    }
  };

  const handleRemoveChip = (e, chip, idx) => {
    e.stopPropagation();
    const nextList = internalChipsList.filter((_, i) => i !== idx);
    setInternalChipsList(nextList);
    if (onRemoveChip) onRemoveChip(e, chip, idx);
  };

  // 3. Internal state for Code Copy
  const [copied, setCopied] = useState(false);
  const handleCopyCode = (e) => {
    e.stopPropagation();
    if (navigator.clipboard && code) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
    if (onCopyCode) onCopyCode(e, code);
  };

  // 4. Internal state for Rich Accordion Open/Closed
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  const handleToggleOpen = (e) => {
    e.stopPropagation();
    const next = !isOpen;
    if (controlledIsOpen === undefined) setInternalOpen(next);
    if (onToggleOpen) onToggleOpen(e, next);
  };

  // Normalized variants
  const normalizedType = type.toLowerCase();
  const normalizedStyle = styleVariant.toLowerCase() === 'outlined' ? 'outline' : styleVariant.toLowerCase();
  const normalizedMode = mode.toLowerCase();
  const sliderPercentage = Math.min(100, Math.max(0, ((currentSliderVal - min) / (max - min || 1)) * 100));

  // Default Titles by type
  const effectiveTitle = title !== undefined
    ? title
    : type === 'Slider'
      ? 'Model Creativity (Temperature)'
      : type === 'Chips'
        ? 'Filter By Category'
        : type === 'References'
          ? 'Cited References'
          : type === 'Code'
            ? 'Source Implementation'
            : type === 'Rich'
              ? 'Model Hyperparameters'
              : 'Special Card';

  const effectiveDescription = description !== undefined
    ? description
    : type === 'Slider'
      ? 'Fine-tune deterministic versus creative generation'
      : type === 'Chips'
        ? 'Select one or multiple classification tags'
        : type === 'Code'
          ? 'Production code sample with syntax formatting'
          : type === 'Rich'
            ? 'Advanced generation parameters'
            : '';

  const effectiveLoadingText = loadingText !== undefined
    ? loadingText
    : loadingSize === 'Small'
      ? 'Generating response...'
      : loadingSize === 'Medium'
        ? 'AI assistant is analyzing request...'
        : 'Synthesizing document insights and models...';

  // Specific modifier classes
  let sizeModifier = '';
  if (type === 'Code') sizeModifier = `special-card--code-${codeSize.toLowerCase()}`;
  if (type === 'Loading') sizeModifier = `special-card--loading-${loadingSize.toLowerCase()} special-card--mode-${normalizedMode}`;
  if (type === 'Rich') sizeModifier = isOpen ? 'special-card--rich-open' : 'special-card--rich-closed';

  return (
    <div
      ref={ref}
      className={`special-card special-card--type-${normalizedType} special-card--style-${normalizedStyle} ${sizeModifier} ${onClick ? 'special-card--clickable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* 1. CARD HEADER (For Slider, Chips, References, Code, Rich) */}
      {hasHeader && type !== 'Loading' && (
        <>
          <header className="special-card__header">
            <div className="special-card__header-text">
              <div className="special-card__title-row">
                <h4 className="special-card__title">{effectiveTitle}</h4>
                {withTooltip && (
                  <span className="special-card__tooltip-wrapper" title={tooltipText} aria-label={tooltipText}>
                    <SpecialCardInfoIcon size={18} />
                  </span>
                )}
              </div>
              {effectiveDescription && (
                <p className="special-card__description">{effectiveDescription}</p>
              )}
            </div>

            {headerActionText && (
              <button
                type="button"
                className="special-card__header-action"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onHeaderActionClick) onHeaderActionClick(e);
                }}
              >
                {headerActionText}
              </button>
            )}

            {type === 'Rich' && (
              <button
                type="button"
                className="special-card__accordion-toggle"
                onClick={handleToggleOpen}
                aria-label={isOpen ? 'Collapse parameters' : 'Expand parameters'}
              >
                <HorizontalCardChevronDownIcon
                  size={20}
                  className={`special-card__accordion-chevron ${isOpen ? 'special-card__accordion-chevron--open' : ''}`}
                />
              </button>
            )}
          </header>
          <hr className="special-card__divider" />
        </>
      )}

      {/* 2. BODY CONTENT - SLIDER TYPE */}
      {type === 'Slider' && (
        <div className="special-card__slider-container">
          <div className="special-card__slider-track-wrap">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={currentSliderVal}
              onChange={handleSliderInput}
              className="special-card__range-input"
              aria-label={effectiveTitle}
            />
            <div className="special-card__slider-track">
              <div
                className="special-card__slider-fill"
                style={{ width: `${sliderPercentage}%` }}
              />
              <div
                className="special-card__slider-thumb"
                style={{ left: `${sliderPercentage}%` }}
              >
                {showSliderIndicator && (
                  <div className="special-card__slider-indicator">
                    {currentSliderVal}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="special-card__slider-labels">
            <span>{min}</span>
            <span className="special-card__slider-current-label">{sliderLabel}: {currentSliderVal}</span>
            <span>{max}</span>
          </div>
        </div>
      )}

      {/* 3. BODY CONTENT - CHIPS TYPE */}
      {type === 'Chips' && (
        <div className="special-card__chips-grid">
          {internalChipsList.map((chip, idx) => {
            const isSelected = selectedChipsList.includes(chip);
            return (
              <button
                key={idx}
                type="button"
                className={`special-card__chip special-card__chip--${chipsType.toLowerCase()} ${isSelected ? 'special-card__chip--selected' : ''}`}
                onClick={(e) => handleChipClick(e, chip, idx)}
              >
                {chipsType === 'Filter' && isSelected && (
                  <HorizontalCardCheckmarkIcon size={14} color="#ffffff" className="special-card__chip-icon" />
                )}
                {chipsType === 'Assistive' && (
                  <span className="special-card__chip-assistive-dot" />
                )}
                <span className="special-card__chip-label">{chip}</span>
                {chipsType === 'Input' && (
                  <span
                    className="special-card__chip-dismiss"
                    onClick={(e) => handleRemoveChip(e, chip, idx)}
                    aria-label={`Remove ${chip}`}
                  >
                    <SpecialCardCloseIcon size={12} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 4. BODY CONTENT - REFERENCES TYPE */}
      {type === 'References' && (
        <div className="special-card__references-list">
          {references.map((refItem, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <hr className="special-card__divider special-card__divider--item" />}
              <a
                href={refItem.url || '#'}
                className="special-card__reference-item"
                onClick={(e) => {
                  if (onReferenceClick) {
                    e.preventDefault();
                    onReferenceClick(e, refItem, idx);
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="special-card__reference-left">
                  <span className="special-card__reference-badge">[{idx + 1}]</span>
                  <span className="special-card__reference-title">{refItem.title}</span>
                </div>
                <div className="special-card__reference-right">
                  <span className="special-card__reference-source">{refItem.source}</span>
                  <SpecialCardExternalLinkIcon size={14} className="special-card__reference-icon" />
                </div>
              </a>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* 5. BODY CONTENT - CODE TYPE */}
      {type === 'Code' && (
        <div className="special-card__code-container">
          <div className="special-card__code-header">
            <span className="special-card__code-lang">{language}</span>
            <button
              type="button"
              className="special-card__copy-btn"
              onClick={handleCopyCode}
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <HorizontalCardCheckmarkIcon size={14} color="#10b981" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <SpecialCardCopyIcon size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="special-card__code-pre">
            <code>{code}</code>
          </pre>
        </div>
      )}

      {/* 6. BODY CONTENT - LOADING TYPE */}
      {type === 'Loading' && (
        <div className={`special-card__loading-container special-card__loading-container--${loadingSize.toLowerCase()}`}>
          {loadingSize === 'Small' && (
            <div className="special-card__loading-small">
              <SpecialCardSparkleIcon size={20} className="special-card__shimmer-sparkle" />
              <span className="special-card__loading-text">{effectiveLoadingText}</span>
              <div className="special-card__shimmer-line special-card__shimmer-line--flex" />
            </div>
          )}

          {loadingSize === 'Medium' && (
            <div className="special-card__loading-medium">
              <SpecialCardSparkleIcon size={48} className="special-card__shimmer-sparkle" />
              <span className="special-card__loading-text">{effectiveLoadingText}</span>
              <div className="special-card__shimmer-bar" />
            </div>
          )}

          {loadingSize === 'Large' && (
            <div className="special-card__loading-large">
              <div className="special-card__loading-header-row">
                <SpecialCardSparkleIcon size={28} className="special-card__shimmer-sparkle" />
                <span className="special-card__loading-text">{effectiveLoadingText}</span>
              </div>
              <div className="special-card__skeleton-blocks">
                <div className="special-card__skeleton-block special-card__skeleton-block--line-lg" />
                <div className="special-card__skeleton-block special-card__skeleton-block--line-md" />
                <div className="special-card__skeleton-block special-card__skeleton-block--line-sm" />
                <div className="special-card__skeleton-block special-card__skeleton-block--card" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. BODY CONTENT - RICH TYPE (Collapsible Nested Sliders) */}
      {type === 'Rich' && isOpen && (
        <div className="special-card__rich-body">
          {nestedSliders.map((item, idx) => (
            <div key={idx} className="special-card__rich-nested-item">
              <div className="special-card__rich-nested-header">
                <span className="special-card__rich-nested-title">{item.title}</span>
                {item.description && (
                  <span className="special-card__rich-nested-subhead">{item.description}</span>
                )}
              </div>
              <div className="special-card__slider-track-wrap">
                <div className="special-card__slider-track">
                  <div
                    className="special-card__slider-fill"
                    style={{ width: `${item.value}%` }}
                  />
                  <div
                    className="special-card__slider-thumb"
                    style={{ left: `${item.value}%` }}
                  />
                </div>
              </div>
              <div className="special-card__rich-nested-labels">
                <span>0</span>
                <span>{item.value}%</span>
                <span>100</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

SpecialCard.displayName = 'SpecialCard';

SpecialCard.propTypes = {
  type: PropTypes.oneOf(['Slider', 'Chips', 'References', 'Code', 'Loading', 'Rich']),
  styleVariant: PropTypes.oneOf(['Outline', 'Outlined', 'Elevated', 'Filled']),
  hasHeader: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  headerActionText: PropTypes.string,
  onHeaderActionClick: PropTypes.func,
  sliderValue: PropTypes.number,
  defaultSliderValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  sliderLabel: PropTypes.string,
  showSliderIndicator: PropTypes.bool,
  onSliderChange: PropTypes.func,
  chipsType: PropTypes.oneOf(['Filter', 'Assistive', 'Input']),
  chips: PropTypes.arrayOf(PropTypes.string),
  selectedChips: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedChips: PropTypes.arrayOf(PropTypes.string),
  onChipClick: PropTypes.func,
  onRemoveChip: PropTypes.func,
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      source: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  onReferenceClick: PropTypes.func,
  codeSize: PropTypes.oneOf(['Small', 'Large']),
  code: PropTypes.string,
  language: PropTypes.string,
  onCopyCode: PropTypes.func,
  loadingSize: PropTypes.oneOf(['Small', 'Medium', 'Large']),
  mode: PropTypes.oneOf(['Light', 'Dark']),
  loadingText: PropTypes.string,
  isOpen: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onToggleOpen: PropTypes.func,
  withTooltip: PropTypes.bool,
  tooltipText: PropTypes.string,
  nestedSliders: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

// Export alias SpecialCards
export const SpecialCards = SpecialCard;

/* ==========================================================================
   TASK CARD ICONS & COMPONENT (Figma Node 1652:22322)
   ========================================================================== */

/** Task File Upload Arrow Cloud Icon (20x20) */
export const TaskCardUploadIcon = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

/** Square / Default Selection Checkbox Control (20x20) */
export const HorizontalCardCheckbox = ({
  checked = false,
  disabled = false,
  onCheckChange,
  onClick,
  checkVariant = 'primary',
  tickColor = '#ffffff',
  className = '',
  state = 'enabled',
  ...props
}) => {
  const handleClick = (e) => {
    if (disabled) return;
    if (onCheckChange) onCheckChange(e, !checked);
    if (onClick) onClick(e);
  };

  return (
    <button
      type="button"
      className={`horizontal-card__checkbox ${checked ? 'horizontal-card__checkbox--checked' : ''} ${state !== 'enabled' ? `horizontal-card__checkbox--state-${state}` : ''} ${className}`}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      aria-label="Toggle card selection"
      disabled={disabled}
      {...props}
    >
      {checked && <HorizontalCardCheckmarkIcon size={14} color={tickColor} />}
    </button>
  );
};

export const TaskCardCheckbox = HorizontalCardCheckbox;

/**
 * TaskCard - Principal enterprise task presentation card component.
 * Reproduces all 27 Figma variants from Component Set 1676:24689.
 * 3 Types (Checked, Unchecked, Loading) x 3 Configs (Base 80px, With Action 117px, With Uploader 213px) x 3 States (Enabled, Hovered, Pressed).
 * Fully controlled from props.
 */
export const TaskCard = forwardRef(({
  type = 'Unchecked', // 'Checked' | 'Unchecked' | 'Loading'
  styleVariant = 'Outline', // 'Outline' | 'Outlined' | 'Elevated' | 'Filled'
  state = 'enabled', // 'enabled' | 'hovered' | 'pressed'

  // Header content props
  title = 'Task title',
  description = 'Supporting line text lorem ipsum',

  // Checkbox / Loading trailing control props
  isChecked: controlledChecked,
  defaultChecked = false,
  onCheckChange,
  disabled = false,

  // Action button configuration props
  withAction = false,
  actionText = 'Action',
  actionVariant = 'secondary', // 'primary' | 'secondary'
  onActionClick,

  // File uploader configuration props
  withFileUploader = false,
  uploaderText = 'Drop files here or click to browse',
  uploaderSubtext = 'PDF, DOCX, XLSX up to 25MB',
  uploadedFiles = [],
  onFileUpload,

  className = '',
  onClick,
  ...props
}, ref) => {
  // Determine checked state based on prop `type` or `isChecked`
  const initialChecked = type.toLowerCase() === 'checked' ? true : defaultChecked;
  const [internalChecked, setInternalChecked] = useState(initialChecked);

  const isChecked = controlledChecked !== undefined
    ? controlledChecked
    : type.toLowerCase() === 'checked'
      ? true
      : internalChecked;

  const isLoading = type.toLowerCase() === 'loading';

  const handleToggleCheck = (e, explicitNext) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (isLoading || disabled) return;
    const next = explicitNext !== undefined ? explicitNext : !isChecked;
    if (controlledChecked === undefined) setInternalChecked(next);
    if (onCheckChange) onCheckChange(e, next);
  };

  const normalizedStyle = styleVariant.toLowerCase() === 'outlined' ? 'outline' : styleVariant.toLowerCase();
  const normalizedState = state.toLowerCase();

  // Determine configuration class
  let configClass = 'task-card--config-base';
  if (withFileUploader) {
    configClass = 'task-card--config-uploader';
  } else if (withAction) {
    configClass = 'task-card--config-action';
  }

  return (
    <div
      ref={ref}
      className={`task-card task-card--style-${normalizedStyle} ${configClass} task-card--state-${normalizedState} ${onClick ? 'task-card--clickable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="task-card__row">
        {/* Left Column: Title + Description + Optional Action or File Uploader */}
        <div className="task-card__content">
          <div className="task-card__header-line">
            <h4 className={`task-card__title ${isChecked && !isLoading ? 'task-card__title--checked' : ''}`}>
              {title}
            </h4>
          </div>
          {description && (
            <p className="task-card__description">
              {description}
            </p>
          )}

          {/* Action Button Row (Configuration: With Action) */}
          {withAction && !withFileUploader && (
            <div className="task-card__action-row">
              <button
                type="button"
                className={`task-card__btn ${actionVariant === 'primary' ? 'task-card__btn--primary' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onActionClick) onActionClick(e);
                }}
              >
                {actionText}
              </button>
            </div>
          )}

          {/* File Uploader Dropzone (Configuration: With File Uploader) */}
          {withFileUploader && (
            <div className="task-card__uploader-wrap">
              <div
                className="task-card__uploader"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onFileUpload) onFileUpload(e);
                }}
              >
                <TaskCardUploadIcon size={20} className="task-card__uploader-icon" />
                <span className="task-card__uploader-text">{uploaderText}</span>
                {uploaderSubtext && (
                  <span className="task-card__uploader-subtext">{uploaderSubtext}</span>
                )}
                {uploadedFiles && uploadedFiles.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {uploadedFiles.map((f, idx) => (
                      <span key={idx} className="task-card__uploaded-file">
                        📄 {typeof f === 'string' ? f : f.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 40x40 Trailing Target (Checkbox or Circular Progress) */}
        <div className="task-card__control">
          {isLoading ? (
            <div className="task-card__spinner" role="status" aria-label="Loading task" />
          ) : (
            <HorizontalCardCheckbox
              checked={isChecked}
              disabled={disabled}
              onCheckChange={handleToggleCheck}
              checkVariant="primary"
            />
          )}
        </div>
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';

TaskCard.propTypes = {
  type: PropTypes.oneOf(['Checked', 'Unchecked', 'Loading']),
  styleVariant: PropTypes.oneOf(['Outline', 'Outlined', 'Elevated', 'Filled']),
  state: PropTypes.oneOf(['enabled', 'hovered', 'pressed']),
  title: PropTypes.string,
  description: PropTypes.string,
  isChecked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onCheckChange: PropTypes.func,
  disabled: PropTypes.bool,
  withAction: PropTypes.bool,
  actionText: PropTypes.string,
  actionVariant: PropTypes.oneOf(['primary', 'secondary']),
  onActionClick: PropTypes.func,
  withFileUploader: PropTypes.bool,
  uploaderText: PropTypes.string,
  uploaderSubtext: PropTypes.string,
  uploadedFiles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  onFileUpload: PropTypes.func,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

// Export alias TaskCards
export const TaskCards = TaskCard;

export default HorizontalCard;





