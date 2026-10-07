import React, { useState, useId, forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Textarea.css';

/**
 * Trailing Action Icon: Speech-to-Text Microphone
 */
export const MicIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`kpmg-textarea__action-icon ${className}`}
    {...props}
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

MicIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

/**
 * Trailing Action Icon: Alert Circle
 */
export const AlertCircleIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`kpmg-textarea__action-icon ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

AlertCircleIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

/**
 * KPMG WorkBench Textarea Component
 *
 * Highly scalable, token-driven multi-line input supporting:
 * - 20 Canonical Figma variants (2 Header Bar Layouts x 2 Styles x 5 States)
 * - Container variants: Outlined & Filled
 * - Visual & interactive states: Enabled, Hovered, Focused/Pressed, Error, Disabled
 * - Live character/word count counter with custom formatting
 * - Trailing interactive action slot (default Speech-to-Text microphone button)
 * - Controlled & uncontrolled operation with ARIA accessibility compliance
 */
export const Textarea = forwardRef(({
  id: explicitId,
  label,
  value,
  defaultValue = '',
  onChange,
  onFocus,
  onBlur,
  placeholder = 'Enter text...',
  variant = 'outlined',
  state = 'enabled',
  error = false,
  helperText,
  disabled = false,
  readOnly = false,
  required = false,
  maxLength,
  showCount,
  countFormatter,
  rows = 3,
  resize = 'vertical',
  showAction = true,
  trailingAction,
  actionAriaLabel = 'Voice input',
  onActionClick,
  fullWidth = true,
  className = '',
  style = {},
  ...restProps
}, ref) => {
  const generatedId = useId();
  const inputId = explicitId || `kpmg-textarea-${generatedId}`;
  const helperId = `${inputId}-helper`;
  const countId = `${inputId}-count`;

  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value ?? '') : internalValue;
  const currentCount = String(currentValue).length;

  // Determine effective state
  const isExplicitError = state === 'error' || Boolean(error);
  const isExplicitDisabled = state === 'disabled' || disabled;
  const isExplicitHovered = state === 'hovered';
  const isExplicitFocused = state === 'focused' || state === 'pressed' || isFocused;

  // Header display logic: shown if label is provided or if showCount is explicitly true
  const shouldShowCount = showCount !== undefined ? showCount : (Boolean(maxLength) && Boolean(label));
  const hasHeader = Boolean(label) || shouldShowCount;

  // Format count display (e.g., "0/100" or custom)
  const renderCount = () => {
    if (!shouldShowCount) return null;
    if (typeof countFormatter === 'function') {
      return countFormatter(currentCount, maxLength);
    }
    if (maxLength !== undefined) {
      return `${currentCount}/${maxLength}`;
    }
    return `${currentCount}`;
  };

  const handleChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  // Determine error / helper text
  const errorMessage = typeof error === 'string' ? error : null;
  const displayHelper = errorMessage || helperText;

  // Modifier classes for wrapper
  const wrapperClasses = [
    'kpmg-textarea-wrapper',
    fullWidth ? 'kpmg-textarea-wrapper--full-width' : 'kpmg-textarea-wrapper--inline',
    isExplicitFocused ? 'kpmg-textarea-wrapper--focused' : '',
    isExplicitHovered ? 'kpmg-textarea-wrapper--hovered' : '',
    isExplicitError ? 'kpmg-textarea-wrapper--error' : '',
    isExplicitDisabled ? 'kpmg-textarea-wrapper--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  // Modifier classes for container box
  const containerClasses = [
    'kpmg-textarea__container',
    `kpmg-textarea__container--${variant}`,
    isExplicitFocused ? 'kpmg-textarea__container--focused' : '',
    isExplicitHovered ? 'kpmg-textarea__container--hovered' : '',
    isExplicitError ? 'kpmg-textarea__container--error' : '',
    isExplicitDisabled ? 'kpmg-textarea__container--disabled' : '',
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'kpmg-textarea__input',
    !showAction ? 'kpmg-textarea__input--no-action' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} style={style}>
      {hasHeader && (
        <div className="kpmg-textarea__header">
          {label ? (
            <label htmlFor={inputId} className="kpmg-textarea__label">
              {label}
              {required && <span aria-hidden="true" style={{ color: 'var(--color-textarea-label-error)', marginLeft: '4px' }}>*</span>}
            </label>
          ) : <span />}

          {shouldShowCount && (
            <span id={countId} className="kpmg-textarea__count" aria-live="polite">
              {renderCount()}
            </span>
          )}
        </div>
      )}

      <div className={containerClasses}>
        <textarea
          ref={ref}
          id={inputId}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={isExplicitDisabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          rows={rows}
          style={{ resize }}
          className={inputClasses}
          aria-invalid={isExplicitError ? 'true' : 'false'}
          aria-describedby={
            [
              displayHelper ? helperId : null,
              shouldShowCount ? countId : null,
            ].filter(Boolean).join(' ') || undefined
          }
          {...restProps}
        />

        {showAction && (
          <div className="kpmg-textarea__action-wrapper">
            {trailingAction ? (
              trailingAction
            ) : (
              <button
                type="button"
                className="kpmg-textarea__action-btn"
                onClick={onActionClick}
                disabled={isExplicitDisabled}
                aria-label={actionAriaLabel}
                tabIndex={isExplicitDisabled ? -1 : 0}
              >
                {isExplicitError ? <AlertCircleIcon /> : <MicIcon />}
              </button>
            )}
          </div>
        )}
      </div>

      {displayHelper && (
        <div
          id={helperId}
          className={`kpmg-textarea__helper ${isExplicitError ? 'kpmg-textarea__helper--error' : ''}`}
          role={isExplicitError ? 'alert' : 'status'}
        >
          {displayHelper}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  /** HTML ID for the textarea element. Auto-generated if omitted */
  id: PropTypes.string,
  /** Label displayed above the textarea in the header bar */
  label: PropTypes.node,
  /** Controlled value of the textarea */
  value: PropTypes.string,
  /** Initial value for uncontrolled usage */
  defaultValue: PropTypes.string,
  /** Callback fired when textarea content changes */
  onChange: PropTypes.func,
  /** Callback fired on focus */
  onFocus: PropTypes.func,
  /** Callback fired on blur */
  onBlur: PropTypes.func,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Visual variant style: outlined (with border stroke) or filled (tinted background) */
  variant: PropTypes.oneOf(['outlined', 'filled']),
  /** Explicit interaction state for static documentation or forced state */
  state: PropTypes.oneOf(['enabled', 'hovered', 'focused', 'pressed', 'error', 'disabled']),
  /** Error state flag or string error message displayed beneath */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Helper text displayed beneath the textarea */
  helperText: PropTypes.node,
  /** Whether the textarea is disabled */
  disabled: PropTypes.bool,
  /** Whether the textarea is read-only */
  readOnly: PropTypes.bool,
  /** Whether the input is required */
  required: PropTypes.bool,
  /** Maximum number of characters allowed */
  maxLength: PropTypes.number,
  /** Whether to show the character counter in the header bar */
  showCount: PropTypes.bool,
  /** Custom formatter for the counter (currentCount, maxLength) => string */
  countFormatter: PropTypes.func,
  /** Default visible rows */
  rows: PropTypes.number,
  /** CSS resize behavior */
  resize: PropTypes.oneOf(['none', 'vertical', 'horizontal', 'both']),
  /** Whether to show the trailing action button at bottom-right */
  showAction: PropTypes.bool,
  /** Custom trailing action element (replaces default microphone button) */
  trailingAction: PropTypes.node,
  /** ARIA label for the default trailing action button */
  actionAriaLabel: PropTypes.string,
  /** Callback fired when trailing action button is clicked */
  onActionClick: PropTypes.func,
  /** Whether the textarea takes up 100% of container width */
  fullWidth: PropTypes.bool,
  /** Additional custom CSS class */
  className: PropTypes.string,
  /** Inline style overrides */
  style: PropTypes.object,
};

export default Textarea;
