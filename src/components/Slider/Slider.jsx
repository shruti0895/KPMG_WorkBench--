import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

/* ==========================================================================
   EXPORTED SVG COMPONENTS FOR SLIDER
   ========================================================================== */

/** Default Circle Thumb Handle SVG */
export const SliderThumbIconSvg = ({
  size = 16,
  fill = 'var(--color-slider-thumb-fill, #1E49E2)',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="10" fill={fill} />
  </svg>
);

/** Tooltip Value Indicator Badge SVG Pointer */
export const SliderIndicatorBadgeSvg = ({
  value,
  children,
  ...props
}) => (
  <div className="kpmg-slider__indicator-badge" {...props}>
    <span className="kpmg-slider__indicator-text">{children !== undefined ? children : value}</span>
    <span className="kpmg-slider__indicator-arrow" aria-hidden="true" />
  </div>
);

/* ==========================================================================
   MAIN SLIDER COMPONENT (CONTINUOUS & DISCRETE + 15 FIGMA VARIANTS)
   ========================================================================== */

/**
 * Slider Component - KPMG WorkBench Design System
 * Formatted directly to Figma Specs (Node 964:63925).
 * Supports Continuous & Discrete modes, 15 core variant states,
 * Tooltip value indicator badges, step tick marks, and custom SVG props.
 */
export const Slider = forwardRef(({
  variant = 'continuous', // 'continuous' | 'discrete'
  value: controlledValue,
  defaultValue = 50,
  min = 0,
  max = 100,
  step,
  state = 'enabled', // 'enabled' | 'disabled' | 'hovered' | 'pressed'
  showIndicator = false, // Floating tooltip value indicator badge above thumb
  showTicks, // Auto-enabled for discrete, or explicit boolean
  disabled = false,
  label,
  subtext,
  thumbIcon: customThumbIcon,
  indicatorIcon: customIndicatorIcon,
  onChange,
  className = '',
  id,
  name,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  // Determine if discrete variant
  const isDiscrete = variant === 'discrete';
  const defaultStep = isDiscrete ? 10 : 1;
  const activeStep = step !== undefined ? step : defaultStep;

  // Manage internal value state if uncontrolled
  const [internalValue, setInternalValue] = useState(
    controlledValue !== undefined ? controlledValue : defaultValue
  );

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  // Compute active normalized value and percentage
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const clampedValue = Math.min(Math.max(currentValue, min), max);
  const percentage = max > min ? ((clampedValue - min) / (max - min)) * 100 : 0;

  // Determine state
  const isComponentDisabled = disabled || state === 'disabled' || state === 'Disabled';
  const normalizedState = isComponentDisabled ? 'disabled' : (state || 'enabled').toLowerCase();
  const shouldShowIndicator = showIndicator || state === 'Enabled with indicator' || state === 'enabled_with_indicator';
  const shouldShowTicks = showTicks !== undefined ? showTicks : isDiscrete;

  // Generate discrete tick marks
  const tickPositions = [];
  if (shouldShowTicks && max > min && activeStep > 0) {
    const totalSteps = Math.floor((max - min) / activeStep);
    for (let i = 0; i <= totalSteps; i++) {
      const stepVal = min + i * activeStep;
      const stepPercent = ((stepVal - min) / (max - min)) * 100;
      tickPositions.push({ value: stepVal, percent: stepPercent });
    }
  }

  // Handle native slider change
  const handleChange = (e) => {
    const val = Number(e.target.value);
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    if (onChange) {
      onChange(e, val);
    }
  };

  const containerClasses = [
    'kpmg-slider',
    `kpmg-slider--${variant}`,
    `kpmg-slider--state-${normalizedState}`,
    isComponentDisabled ? 'kpmg-slider--disabled' : '',
    shouldShowIndicator ? 'kpmg-slider--has-indicator' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Optional Label Header */}
      {(label || subtext) && (
        <div className="kpmg-slider__header">
          {label && <span className="kpmg-slider__label">{label}</span>}
          {subtext && <span className="kpmg-slider__subtext">{subtext}</span>}
        </div>
      )}

      {/* Main Track & Thumb Container */}
      <div className="kpmg-slider__wrapper">
        {/* Inactive Background Track */}
        <div className="kpmg-slider__track-bg">
          {/* Active Progress Track Fill */}
          <div
            className="kpmg-slider__track-fill"
            style={{ width: `${percentage}%` }}
          />

          {/* Discrete Step Tick Dots */}
          {shouldShowTicks && tickPositions.length > 0 && (
            <div className="kpmg-slider__ticks" aria-hidden="true">
              {tickPositions.map((tick) => (
                <span
                  key={tick.value}
                  className={`kpmg-slider__tick ${tick.percent <= percentage ? 'kpmg-slider__tick--active' : ''}`}
                  style={{ left: `${tick.percent}%` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating Tooltip Indicator Badge above Thumb */}
        {shouldShowIndicator && (
          <div
            className="kpmg-slider__indicator-container"
            style={{ left: `${percentage}%` }}
          >
            {customIndicatorIcon ? (
              customIndicatorIcon
            ) : (
              <SliderIndicatorBadgeSvg value={Math.round(clampedValue)} />
            )}
          </div>
        )}

        {/* Visual Thumb Circle / Focus Halo Container */}
        <div
          className="kpmg-slider__thumb"
          style={{ left: `${percentage}%` }}
          aria-hidden="true"
        >
          {customThumbIcon ? (
            customThumbIcon
          ) : (
            <SliderThumbIconSvg
              size={normalizedState === 'pressed' || normalizedState === 'hovered' ? 22 : 16}
              fill={isComponentDisabled ? 'var(--color-slider-disabled-thumb, #9090A2)' : 'var(--color-slider-thumb-fill, #1E49E2)'}
            />
          )}
        </div>

        {/* Hidden Accessible Native Range Input */}
        <input
          type="range"
          ref={ref}
          id={id}
          name={name}
          min={min}
          max={max}
          step={activeStep}
          value={clampedValue}
          disabled={isComponentDisabled}
          onChange={handleChange}
          aria-label={ariaLabel || (typeof label === 'string' ? label : 'Slider')}
          aria-valuenow={clampedValue}
          aria-valuemin={min}
          aria-valuemax={max}
          className="kpmg-slider__input"
          {...props}
        />
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';

Slider.propTypes = {
  /** Slider variant mode ('continuous' or 'discrete') */
  variant: PropTypes.oneOf(['continuous', 'discrete']),
  /** Controlled slider value (number 0-100) */
  value: PropTypes.number,
  /** Default uncontrolled initial value */
  defaultValue: PropTypes.number,
  /** Minimum slider value */
  min: PropTypes.number,
  /** Maximum slider value */
  max: PropTypes.number,
  /** Step increment value */
  step: PropTypes.number,
  /** Explicit Figma interactive state */
  state: PropTypes.oneOf(['enabled', 'disabled', 'hovered', 'pressed', 'Enabled with indicator', 'Enabled', 'Disabled', 'Hovered', 'Pressed']),
  /** Display floating value badge above thumb */
  showIndicator: PropTypes.bool,
  /** Display discrete step tick marks */
  showTicks: PropTypes.bool,
  /** Disabled state flag */
  disabled: PropTypes.bool,
  /** Optional label text or Node */
  label: PropTypes.node,
  /** Optional subtext / description */
  subtext: PropTypes.node,
  /** Custom SVG Icon to override thumb handle */
  thumbIcon: PropTypes.node,
  /** Custom SVG / Node to override indicator badge */
  indicatorIcon: PropTypes.node,
  /** Change callback handler `(event, value) => {}` */
  onChange: PropTypes.func,
  /** Custom CSS class name */
  className: PropTypes.string,
  /** HTML input id */
  id: PropTypes.string,
  /** HTML input name */
  name: PropTypes.string,
  /** Accessible ARIA label */
  'aria-label': PropTypes.string,
};

export default Slider;
