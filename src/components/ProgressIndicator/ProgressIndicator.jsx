import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './ProgressIndicator.css';

/* ==========================================================================
   EXPORTED SVG COMPONENTS FOR PROGRESS INDICATORS
   ========================================================================== */

/** Linear Progress Bar SVG Track */
export const LinearProgressBarSvg = ({
  progress = 0,
  type = 'determinate',
  trackColor = 'var(--color-progress-track-inactive, #E3E3E8)',
  fillColor = 'var(--color-progress-track-active, #1E49E2)',
  height = 4,
  ...props
}) => {
  const isIndeterminate = type === 'indeterminate';
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className={`kpmg-progress__linear-track ${isIndeterminate ? 'kpmg-progress__linear-track--indeterminate' : ''}`}
      style={{ height: `${height}px`, backgroundColor: trackColor }}
      {...props}
    >
      <div
        className={`kpmg-progress__linear-fill ${isIndeterminate ? 'kpmg-progress__linear-fill--indeterminate' : ''}`}
        style={{
          width: isIndeterminate ? '40%' : `${clampedProgress}%`,
          backgroundColor: fillColor,
        }}
      />
    </div>
  );
};

/** Circular Progress Bar SVG Ring */
export const CircularProgressBarSvg = ({
  size = 'large', // 'large' (88px) | 'medium' (48px) | 'small' (24px)
  progress = 0,
  type = 'determinate',
  trackColor = 'var(--color-progress-track-inactive, #E3E3E8)',
  fillColor = 'var(--color-progress-track-active, #1E49E2)',
  showValue = false,
  ...props
}) => {
  const normalizedSize = (size || 'large').toLowerCase();
  let diameter = 88;
  let strokeWidth = 6;

  if (normalizedSize === 'medium') {
    diameter = 48;
    strokeWidth = 4;
  } else if (normalizedSize === 'small') {
    diameter = 24;
    strokeWidth = 2.5;
  }

  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;
  const isIndeterminate = type === 'indeterminate';

  return (
    <div
      className={`kpmg-progress__circular-container kpmg-progress__circular-container--${normalizedSize} ${isIndeterminate ? 'kpmg-progress__circular-container--indeterminate' : ''}`}
      style={{ width: `${diameter}px`, height: `${diameter}px` }}
      {...props}
    >
      <svg
        viewBox={`0 0 ${diameter} ${diameter}`}
        width={diameter}
        height={diameter}
        className={`kpmg-progress__circular-svg ${isIndeterminate ? 'kpmg-progress__circular-svg--indeterminate' : ''}`}
      >
        {/* Background Track Circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress Fill Arc Circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isIndeterminate ? circumference * 0.3 : strokeDashoffset}
          strokeLinecap="round"
          className={`kpmg-progress__circular-arc ${isIndeterminate ? 'kpmg-progress__circular-arc--indeterminate' : ''}`}
        />
      </svg>

      {/* Center Value Percentage Text (Large & Medium sizes) */}
      {showValue && !isIndeterminate && normalizedSize !== 'small' && (
        <span className="kpmg-progress__circular-value">{Math.round(clampedProgress)}%</span>
      )}
    </div>
  );
};

/* ==========================================================================
   MAIN PROGRESS INDICATOR COMPONENT (33 FIGMA VARIANTS SUPPORT)
   ========================================================================== */

/**
 * ProgressIndicator Component - KPMG WorkBench Design System
 * Formatted directly to Figma Specs (Node 964:63787).
 * Supports Linear & Circular modes, Determinate & Indeterminate progress types,
 * 33 exact Figma variant combinations, labels, percentage text, and token-driven styles.
 */
export const ProgressIndicator = forwardRef(({
  variant = 'linear', // 'linear' | 'circular'
  type = 'determinate', // 'determinate' | 'indeterminate'
  progress = 0, // 0 to 100
  size = 'large', // 'large' | 'medium' | 'small'
  step, // Step 1..5 for indeterminate
  showValue = false,
  label,
  subtext,
  className = '',
  id,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const isLinear = variant === 'linear' || variant === 'Linear';
  const isIndeterminate = type === 'indeterminate' || type === 'Indeterminate';
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const normalizedSize = (size || 'large').toLowerCase();

  const containerClasses = [
    'kpmg-progress',
    `kpmg-progress--${isLinear ? 'linear' : 'circular'}`,
    `kpmg-progress--${isIndeterminate ? 'indeterminate' : 'determinate'}`,
    `kpmg-progress--size-${normalizedSize}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      ref={ref}
      id={id}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : Math.round(clampedProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel || (typeof label === 'string' ? label : `${variant} progress indicator`)}
      {...props}
    >
      {/* Optional Header (Label & Progress Percentage) */}
      {(label || showValue) && isLinear && (
        <div className="kpmg-progress__header">
          {label && <span className="kpmg-progress__label">{label}</span>}
          {showValue && !isIndeterminate && (
            <span className="kpmg-progress__value-text">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}

      {/* Main Visual Progress Render */}
      {isLinear ? (
        <LinearProgressBarSvg
          progress={clampedProgress}
          type={isIndeterminate ? 'indeterminate' : 'determinate'}
        />
      ) : (
        <div className="kpmg-progress__circular-wrapper">
          <CircularProgressBarSvg
            size={normalizedSize}
            progress={clampedProgress}
            type={isIndeterminate ? 'indeterminate' : 'determinate'}
            showValue={showValue}
          />
          {(label || subtext) && (
            <div className="kpmg-progress__circular-labels">
              {label && <span className="kpmg-progress__label">{label}</span>}
              {subtext && <span className="kpmg-progress__subtext">{subtext}</span>}
            </div>
          )}
        </div>
      )}

      {/* Optional Subtext for Linear Bar */}
      {subtext && isLinear && (
        <span className="kpmg-progress__subtext">{subtext}</span>
      )}
    </div>
  );
});

ProgressIndicator.displayName = 'ProgressIndicator';

ProgressIndicator.propTypes = {
  /** Progress indicator variant ('linear' or 'circular') */
  variant: PropTypes.oneOf(['linear', 'circular', 'Linear', 'Circular']),
  /** Progress type ('determinate' for fixed %, 'indeterminate' for loading loop) */
  type: PropTypes.oneOf(['determinate', 'indeterminate', 'Determinate', 'Indeterminate']),
  /** Progress percentage value (0 to 100) */
  progress: PropTypes.number,
  /** Size scale ('large', 'medium', 'small') */
  size: PropTypes.oneOf(['large', 'medium', 'small', 'Large', 'Medium', 'Small']),
  /** Indeterminate step property (Step 1..5 in Figma) */
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Display value percentage text */
  showValue: PropTypes.bool,
  /** Optional label text or Node */
  label: PropTypes.node,
  /** Optional subtext / description */
  subtext: PropTypes.node,
  /** Custom CSS class name */
  className: PropTypes.string,
  /** HTML element id */
  id: PropTypes.string,
  /** Accessible ARIA label */
  'aria-label': PropTypes.string,
};

export default ProgressIndicator;
