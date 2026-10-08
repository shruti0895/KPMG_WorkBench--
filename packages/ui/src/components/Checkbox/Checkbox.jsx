import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

/* ==========================================================================
   EXPORTED SVG ICONS FOR ALL CHECKBOX VARIANTS
   ========================================================================== */

/** 1. Checked (Solid Fill Circle + Inner Checkmark Tick) */
export const CheckboxCheckedIconSvg = ({
  size = 24,
  fill = 'var(--color-checkbox-primary-fill, #3D405B)',
  tickColor = 'var(--color-checkbox-primary-tick, #FFFFFF)',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="10" fill={fill} />
    <polyline points="8 12 11 15 16 9" fill="none" stroke={tickColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 2. Unchecked Light (Outline Circle + Inner Checkmark Tick) */
export const CheckboxUncheckedLightIconSvg = ({
  size = 24,
  stroke = 'var(--color-checkbox-primary-stroke, #3D405B)',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2" />
    <polyline points="8 12 11 15 16 9" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 3. Indeterminate (Outline Circle + Horizontal Minus Dash) */
export const CheckboxIndeterminateIconSvg = ({
  size = 20,
  stroke = 'var(--color-checkbox-primary-stroke, #3D405B)',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2" />
    <line x1="7" y1="12" x2="17" y2="12" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/** 4. Unchecked (Empty Outline Circle) */
export const CheckboxUncheckedIconSvg = ({
  size = 20,
  stroke = 'var(--color-checkbox-primary-stroke, #3D405B)',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2" />
  </svg>
);

/** 5. Error Checked (Solid Red Fill Circle + Inner White Checkmark Tick) */
export const CheckboxErrorCheckedIconSvg = ({
  size = 24,
  fill = 'var(--color-checkbox-error-fill, #C00F48)',
  tickColor = 'var(--color-checkbox-error-tick, #FFFFFF)',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="10" fill={fill} />
    <polyline points="8 12 11 15 16 9" fill="none" stroke={tickColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 6. Error Checked Light (Red Outline Circle + Inner Red Checkmark Tick) */
export const CheckboxErrorCheckedLightIconSvg = ({
  size = 24,
  stroke = 'var(--color-checkbox-error-stroke, #C00F48)',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2" />
    <polyline points="8 12 11 15 16 9" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 7. Error Indeterminate (Red Outline Circle + Inner Red Horizontal Dash) */
export const CheckboxErrorIndeterminateIconSvg = ({
  size = 20,
  stroke = 'var(--color-checkbox-error-stroke, #C00F48)',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2" />
    <line x1="7" y1="12" x2="17" y2="12" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/** 8. Error Unchecked (Red Empty Outline Circle) */
export const CheckboxErrorUncheckedIconSvg = ({
  size = 20,
  stroke = 'var(--color-checkbox-error-stroke, #C00F48)',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2" />
  </svg>
);


/* ==========================================================================
   MAIN CHECKBOX COMPONENT (64 VARIANTS MATRIX SUPPORT)
   ========================================================================== */

/**
 * Checkbox Component - KPMG WorkBench Design System
 * 64 Figma Variants (8 Types × 4 States × 2 Sizes).
 * Formatted directly to Figma specifications with token design system integration and custom SVG props support.
 */
export const Checkbox = forwardRef(({
  size = 'large', // 'large' (40px touch container) | 'small' (24px touch container)
  type, // 'checked' | 'unchecked-light' | 'indeterminate' | 'unchecked' | 'error-checked' | 'error-checked-light' | 'error-indeterminate' | 'error-unchecked'
  state = 'enabled', // 'enabled' | 'disabled' | 'hovered' | 'pressed'
  checked,
  indeterminate,
  error = false,
  disabled = false,
  label,
  subtext,
  icon: customIconProp,
  onChange,
  className = '',
  id,
  name,
  value,
  ...props
}, ref) => {
  // Normalize size parameter ('large' / 'Large', 'small' / 'Small')
  const normalizedSize = (size || 'large').toLowerCase();
  
  // Normalize disabled state
  const isComponentDisabled = disabled || state === 'disabled' || state === 'Disabled';
  const normalizedState = isComponentDisabled ? 'disabled' : (state || 'enabled').toLowerCase();

  // Resolve active type variant based on props (support both explicit `type` prop and boolean flags)
  let activeType = type;

  if (!activeType) {
    if (error) {
      if (indeterminate) activeType = 'error-indeterminate';
      else if (checked) activeType = 'error-checked';
      else activeType = 'error-unchecked';
    } else {
      if (indeterminate) activeType = 'indeterminate';
      else if (checked) activeType = 'checked';
      else activeType = 'unchecked';
    }
  }

  // Icon dimension per size scale
  const iconPixelSize = normalizedSize === 'small' ? 16 : 24;
  const smallSubIconPixelSize = normalizedSize === 'small' ? 14 : 20;

  // Render SVG Icon per active variant type
  const renderIcon = () => {
    if (customIconProp) return customIconProp;

    const isDisabled = isComponentDisabled;
    const primaryDisabledColor = 'var(--color-checkbox-disabled-stroke, #9090A2)';

    switch (activeType) {
      case 'checked':
      case 'Checked':
        return (
          <CheckboxCheckedIconSvg
            size={iconPixelSize}
            fill={isDisabled ? primaryDisabledColor : 'var(--color-checkbox-primary-fill, #3D405B)'}
          />
        );

      case 'unchecked-light':
      case 'Unchecked light':
      case 'unchecked_light':
        return (
          <CheckboxUncheckedLightIconSvg
            size={iconPixelSize}
            stroke={isDisabled ? primaryDisabledColor : 'var(--color-checkbox-primary-stroke, #3D405B)'}
          />
        );

      case 'indeterminate':
      case 'Indeterminate':
        return (
          <CheckboxIndeterminateIconSvg
            size={smallSubIconPixelSize}
            stroke={isDisabled ? primaryDisabledColor : 'var(--color-checkbox-primary-stroke, #3D405B)'}
          />
        );

      case 'unchecked':
      case 'Unchecked':
        return (
          <CheckboxUncheckedIconSvg
            size={smallSubIconPixelSize}
            stroke={isDisabled ? primaryDisabledColor : 'var(--color-checkbox-primary-stroke, #3D405B)'}
          />
        );

      case 'error-checked':
      case 'Error checked':
      case 'error_checked':
        return (
          <CheckboxErrorCheckedIconSvg
            size={iconPixelSize}
            fill={isDisabled ? primaryDisabledColor : 'var(--color-checkbox-error-fill, #C00F48)'}
          />
        );

      case 'error-checked-light':
      case 'Error checked light':
      case 'error_checked_light':
        return (
          <CheckboxErrorCheckedLightIconSvg
            size={iconPixelSize}
            stroke={isDisabled ? primaryDisabledColor : 'var(--color-checkbox-error-stroke, #C00F48)'}
          />
        );

      case 'error-indeterminate':
      case 'Error indeterminate':
      case 'error_indeterminate':
        return (
          <CheckboxErrorIndeterminateIconSvg
            size={smallSubIconPixelSize}
            stroke={isDisabled ? primaryDisabledColor : 'var(--color-checkbox-error-stroke, #C00F48)'}
          />
        );

      case 'error-unchecked':
      case 'Error unchecked':
      case 'error_unchecked':
      default:
        return (
          <CheckboxErrorUncheckedIconSvg
            size={smallSubIconPixelSize}
            stroke={isDisabled ? primaryDisabledColor : 'var(--color-checkbox-error-stroke, #C00F48)'}
          />
        );
    }
  };

  const isCheckedState =
    activeType === 'checked' ||
    activeType === 'Checked' ||
    activeType === 'unchecked-light' ||
    activeType === 'Unchecked light' ||
    activeType === 'error-checked' ||
    activeType === 'Error checked' ||
    activeType === 'error-checked-light' ||
    activeType === 'Error checked light';

  const containerClasses = [
    'kpmg-checkbox',
    `kpmg-checkbox--${normalizedSize}`,
    `kpmg-checkbox--state-${normalizedState}`,
    `kpmg-checkbox--type-${String(activeType).toLowerCase().replace(/\s+/g, '-')}`,
    isComponentDisabled ? 'kpmg-checkbox--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={containerClasses}>
      {/* Hidden native checkbox input for accessibility and form integration */}
      <input
        type="checkbox"
        ref={ref}
        id={id}
        name={name}
        value={value}
        checked={checked !== undefined ? checked : isCheckedState}
        disabled={isComponentDisabled}
        onChange={onChange}
        className="kpmg-checkbox__native-input"
        {...props}
      />

      {/* Visual Touch Target Box & State Layer Overlay */}
      <span className="kpmg-checkbox__box" aria-hidden="true">
        {renderIcon()}
      </span>

      {/* Optional Label & Subtext */}
      {(label || subtext) && (
        <span className="kpmg-checkbox__label-container">
          {label && <span className="kpmg-checkbox__label">{label}</span>}
          {subtext && <span className="kpmg-checkbox__subtext">{subtext}</span>}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  /** Size variant scale ('large' = 40px outer container, 'small' = 24px outer container) */
  size: PropTypes.oneOf(['large', 'small', 'Large', 'Small']),
  /** Explicit Figma variant type (8 choices) */
  type: PropTypes.oneOf([
    'checked',
    'Checked',
    'unchecked-light',
    'Unchecked light',
    'indeterminate',
    'Indeterminate',
    'unchecked',
    'Unchecked',
    'error-checked',
    'Error checked',
    'error-checked-light',
    'Error checked light',
    'error-indeterminate',
    'Error indeterminate',
    'error-unchecked',
    'Error unchecked',
  ]),
  /** Explicit interactive state ('enabled', 'disabled', 'hovered', 'pressed') */
  state: PropTypes.oneOf(['enabled', 'disabled', 'hovered', 'pressed', 'Enabled', 'Disabled', 'Hovered', 'Pressed']),
  /** Controlled checked status */
  checked: PropTypes.bool,
  /** Controlled indeterminate status */
  indeterminate: PropTypes.bool,
  /** Error state flag */
  error: PropTypes.bool,
  /** Disabled state flag */
  disabled: PropTypes.bool,
  /** Label text or Node */
  label: PropTypes.node,
  /** Subtext description below label */
  subtext: PropTypes.node,
  /** Custom SVG Icon prop override */
  icon: PropTypes.node,
  /** Change event handler callback */
  onChange: PropTypes.func,
  /** Custom CSS class name */
  className: PropTypes.string,
  /** HTML input id attribute */
  id: PropTypes.string,
  /** HTML input name attribute */
  name: PropTypes.string,
  /** HTML input value attribute */
  value: PropTypes.string,
};

export default Checkbox;
