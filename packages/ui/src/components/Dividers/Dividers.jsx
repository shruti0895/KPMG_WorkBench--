import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Dividers.css';

/**
 * KPMG WorkBench Dividers Component
 *
 * Implements all 18 canonical Figma variants:
 * - 2 Orientations: Horizontal, Vertical
 * - 2 Themes: Light, Dark
 * - Inset Configurations:
 *   - Horizontal (12 variants): Full, Inset (16px), Inset middle small (8px),
 *     Inset middle medium (10px), Inset middle large (18px), Inset middle with text ("Subheader")
 *   - Vertical (6 variants): Full, Inset (16px top), Inset middle (16px top & bottom)
 */
export const Dividers = forwardRef(({
  state = 'Horizontal',
  orientation,
  theme = 'Light',
  width = 'Full',
  variant,
  text = 'Subheader',
  className = '',
  style = {},
  role = 'separator',
  'aria-orientation': ariaOrientationProp,
  ...restProps
}, ref) => {
  // Normalize orientation: prop `orientation` takes precedence if passed, otherwise `state`
  const rawOrientation = orientation || state || 'Horizontal';
  const isVertical = rawOrientation.toLowerCase() === 'vertical';
  const effectiveOrientation = isVertical ? 'vertical' : 'horizontal';

  // Normalize theme: Light vs Dark
  const isDark = (theme || 'Light').toLowerCase() === 'dark';
  const effectiveTheme = isDark ? 'dark' : 'light';

  // Normalize width / inset variant
  const rawWidth = variant || width || 'Full';
  const normalizedWidth = rawWidth
    .toLowerCase()
    .replace(/\s+/g, '-');

  // Determine width modifier class
  let widthModifierClass = 'kpmg-divider--full';
  let hasText = false;

  if (isVertical) {
    if (normalizedWidth.includes('inset-middle') || normalizedWidth === 'inset-middle') {
      widthModifierClass = 'kpmg-divider--inset-middle';
    } else if (normalizedWidth.includes('inset')) {
      widthModifierClass = 'kpmg-divider--inset';
    } else {
      widthModifierClass = 'kpmg-divider--full';
    }
  } else {
    if (normalizedWidth.includes('with-text') || (text && rawWidth.toLowerCase().includes('text'))) {
      widthModifierClass = 'kpmg-divider--inset-middle-with-text';
      hasText = true;
    } else if (normalizedWidth.includes('large')) {
      widthModifierClass = 'kpmg-divider--inset-middle-large';
    } else if (normalizedWidth.includes('medium')) {
      widthModifierClass = 'kpmg-divider--inset-middle-medium';
    } else if (normalizedWidth.includes('small')) {
      widthModifierClass = 'kpmg-divider--inset-middle-small';
    } else if (normalizedWidth === 'inset') {
      widthModifierClass = 'kpmg-divider--inset';
    } else {
      widthModifierClass = 'kpmg-divider--full';
    }
  }

  const ariaOrientation = ariaOrientationProp || effectiveOrientation;

  if (hasText) {
    return (
      <div
        ref={ref}
        role={role}
        aria-orientation={ariaOrientation}
        className={`kpmg-divider kpmg-divider--horizontal kpmg-divider--theme-${effectiveTheme} ${widthModifierClass} ${className}`}
        style={style}
        {...restProps}
      >
        <div className="kpmg-divider-line-wrapper">
          <div className="kpmg-divider-line" />
        </div>
        {text && (
          <div className="kpmg-divider-text-container">
            <p className="kpmg-divider-text">{text}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role={role}
      aria-orientation={ariaOrientation}
      className={`kpmg-divider kpmg-divider--${effectiveOrientation} kpmg-divider--theme-${effectiveTheme} ${widthModifierClass} ${className}`}
      style={style}
      {...restProps}
    >
      <div className="kpmg-divider-line" />
    </div>
  );
});

Dividers.displayName = 'Dividers';

Dividers.propTypes = {
  /** Orientation state: Horizontal or Vertical */
  state: PropTypes.oneOf(['Horizontal', 'Vertical', 'horizontal', 'vertical']),
  /** Alias for state */
  orientation: PropTypes.oneOf(['Horizontal', 'Vertical', 'horizontal', 'vertical']),
  /** Theme styling: Light (subtle neutral line) or Dark (high-contrast line) */
  theme: PropTypes.oneOf(['Light', 'Dark', 'light', 'dark']),
  /** Inset / width configuration matching canonical Figma variants */
  width: PropTypes.oneOf([
    'Full',
    'Inset',
    'Inset middle small',
    'Inset middle medium',
    'Inset middle large',
    'Inset middle with text',
    'Inset middle',
    'full',
    'inset',
    'inset-middle-small',
    'inset-middle-medium',
    'inset-middle-large',
    'inset-middle-with-text',
    'inset-middle',
  ]),
  /** Alias for width */
  variant: PropTypes.string,
  /** Optional subheader text for 'Inset middle with text' variant */
  text: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Inline CSS styles */
  style: PropTypes.object,
  /** ARIA role (default: separator) */
  role: PropTypes.string,
  /** ARIA orientation */
  'aria-orientation': PropTypes.oneOf(['horizontal', 'vertical']),
};

// Convenient singular alias
export const Divider = Dividers;

export default Dividers;
