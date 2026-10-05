import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Switch.css';

/* ==========================================================================
   CANONICAL FLUENT SVG ICONS
   ========================================================================== */

/**
 * Switch Checkmark SVG Icon (16x16)
 * Official Fluent checkmark icon used inside the switch thumb when checked
 */
export const SwitchCheckmarkIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M13.8639 3.65609C14.0533 3.85704 14.0439 4.17348 13.8429 4.36288L5.91309 11.8368C5.67573 12.0605 5.30311 12.0536 5.07417 11.8213L2.39384 9.10093C2.20003 8.90422 2.20237 8.58765 2.39907 8.39384C2.59578 8.20003 2.91235 8.20237 3.10616 8.39907L5.51192 10.8407L13.1571 3.63516C13.358 3.44577 13.6745 3.45513 13.8639 3.65609Z"
      fill="currentColor"
    />
  </svg>
);

SwitchCheckmarkIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

/**
 * Switch Dismiss (X) SVG Icon (16x16)
 * Official Fluent dismiss icon used inside the switch thumb when unchecked
 */
export const SwitchDismissIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M2.58859 2.71569L2.64645 2.64645C2.82001 2.47288 3.08944 2.4536 3.28431 2.58859L3.35355 2.64645L8 7.293L12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645C13.5488 2.84171 13.5488 3.15829 13.3536 3.35355L8.707 8L13.3536 12.6464C13.5271 12.82 13.5464 13.0894 13.4114 13.2843L13.3536 13.3536C13.18 13.5271 12.9106 13.5464 12.7157 13.4114L12.6464 13.3536L8 8.707L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536C2.45118 13.1583 2.45118 12.8417 2.64645 12.6464L7.293 8L2.64645 3.35355C2.47288 3.17999 2.4536 2.91056 2.58859 2.71569L2.64645 2.64645L2.58859 2.71569Z"
      fill="currentColor"
    />
  </svg>
);

SwitchDismissIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

/* ==========================================================================
   SWITCH COMPONENT IMPLEMENTATION
   ========================================================================== */

/**
 * KPMG WorkBench Switch Component
 *
 * Implements all 16 canonical Figma variants across:
 * - 2 Selection States: Selected (Checked) / Unselected (Unchecked)
 * - 2 Icon Configurations: With Icon (Checkmark / Dismiss) / Without Icon
 * - 4 States: Enabled, Hovered, Pressed (with 28px expanded thumb), Disabled
 */
export const Switch = forwardRef(({
  checked,
  defaultChecked = false,
  onChange,
  onClick,
  icon = false,
  state: stateProp,
  disabled = false,
  label,
  labelPlacement = 'end',
  helperText,
  required = false,
  name,
  value,
  id,
  className = '',
  style = {},
  customCheckIcon,
  customDismissIcon,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...restProps
}, ref) => {
  // Controlled vs Uncontrolled state
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;

  // Active / Pressed micro-state for realistic mouse interaction
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isControlled) {
      setInternalChecked(checked);
    }
  }, [checked, isControlled]);

  // Resolve state string: explicit stateProp takes precedence, otherwise dynamic
  const isDisabled = disabled || stateProp === 'Disabled' || stateProp === 'disabled';
  const effectiveState = stateProp
    ? stateProp.toLowerCase()
    : isDisabled
      ? 'disabled'
      : isPressed
        ? 'pressed'
        : isHovered
          ? 'hovered'
          : 'enabled';

  // Single authoritative toggle handler
  const handleToggle = (event) => {
    if (isDisabled) return;

    const nextChecked = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    if (onChange) {
      onChange(nextChecked, event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event) => {
    if (isDisabled) return;
    if (event.key === ' ') {
      event.preventDefault(); // Prevent page scroll
      handleToggle(event);
    }
  };

  const handleMouseDown = () => {
    if (!isDisabled && !stateProp) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (!isDisabled && !stateProp) {
      setIsPressed(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isDisabled && !stateProp) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isDisabled && !stateProp) {
      setIsHovered(false);
      setIsPressed(false);
    }
  };

  // State class modifiers
  const checkedClass = isChecked ? 'kpmg-switch-track--checked' : 'kpmg-switch-track--unchecked';
  const thumbCheckedClass = isChecked ? 'kpmg-switch-thumb--checked' : 'kpmg-switch-thumb--unchecked';
  const iconCheckedClass = isChecked ? 'kpmg-switch-icon--checked' : 'kpmg-switch-icon--unchecked';

  const stateClass = `kpmg-switch-track--${effectiveState}`;
  const thumbStateClass = `kpmg-switch-thumb--${effectiveState}`;
  const iconStateClass = `kpmg-switch-icon--${effectiveState}`;

  const generatedId = id || (name ? `kpmg-switch-${name}` : undefined);

  // Render Thumb Icon
  const renderIcon = () => {
    if (!icon) return null;

    if (isChecked) {
      return customCheckIcon || <SwitchCheckmarkIcon size={16} />;
    }

    return customDismissIcon || <SwitchDismissIcon size={16} />;
  };

  const switchVisual = (
    <button
      ref={ref}
      type="button"
      id={generatedId}
      className={`kpmg-switch-track ${checkedClass} ${stateClass}`}
      role="switch"
      aria-checked={isChecked}
      aria-disabled={isDisabled}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggle}
      {...restProps}
    >
      <span className={`kpmg-switch-thumb ${thumbCheckedClass} ${thumbStateClass}`}>
        {icon && (
          <span className={`kpmg-switch-icon ${iconCheckedClass} ${iconStateClass}`}>
            {renderIcon()}
          </span>
        )}
      </span>
    </button>
  );

  return (
    <div
      className={`kpmg-switch-root ${isDisabled ? 'kpmg-switch-root--disabled' : ''} ${labelPlacement === 'start' ? 'kpmg-switch-root--label-start' : ''} ${className}`}
      style={style}
    >
      {name && (
        <input
          type="hidden"
          name={name}
          value={isChecked ? (value || 'on') : ''}
          disabled={isDisabled}
          required={required}
        />
      )}
      {switchVisual}
      {(label || helperText) && (
        <div
          className="kpmg-switch-content"
          onClick={handleToggle}
          role="presentation"
        >
          {label && <span className="kpmg-switch-label">{label}</span>}
          {helperText && <span className="kpmg-switch-helper">{helperText}</span>}
        </div>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

Switch.propTypes = {
  /** Controlled checked status */
  checked: PropTypes.bool,
  /** Initial checked state in uncontrolled mode */
  defaultChecked: PropTypes.bool,
  /** Callback fired when switch state changes: (checked: boolean, event: Event) => void */
  onChange: PropTypes.func,
  /** Callback fired on click: (event: Event) => void */
  onClick: PropTypes.func,
  /** Whether the thumb displays an inner icon (Checkmark when checked, Dismiss/X when unchecked) */
  icon: PropTypes.bool,
  /** Explicit state override for design system documentation */
  state: PropTypes.oneOf(['Enabled', 'Hovered', 'Pressed', 'Disabled', 'enabled', 'hovered', 'pressed', 'disabled']),
  /** Whether the switch is disabled */
  disabled: PropTypes.bool,
  /** Accompanying label text or component */
  label: PropTypes.node,
  /** Label positioning relative to switch */
  labelPlacement: PropTypes.oneOf(['start', 'end']),
  /** Optional supporting helper text below label */
  helperText: PropTypes.node,
  /** Whether the switch is a required form field */
  required: PropTypes.bool,
  /** Native input name attribute */
  name: PropTypes.string,
  /** Native input value attribute */
  value: PropTypes.string,
  /** Native input ID */
  id: PropTypes.string,
  /** Optional className */
  className: PropTypes.string,
  /** Optional inline styles */
  style: PropTypes.object,
  /** Custom React element for checked state icon */
  customCheckIcon: PropTypes.node,
  /** Custom React element for unchecked state icon */
  customDismissIcon: PropTypes.node,
  /** Accessible label */
  'aria-label': PropTypes.string,
  /** Accessible labelled-by element ID */
  'aria-labelledby': PropTypes.string,
  /** Accessible described-by element ID */
  'aria-describedby': PropTypes.string,
};

export default Switch;
