import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Primary Button reference component for KPMG WorkBench Design System.
 * Fully aligned with Figma design tokens and component set specifications.
 */
export const Button = ({
  children = 'Button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  // Support both 'iconLeft' or shorthand 'icon'
  const leadingIcon = iconLeft || icon;

  const variantClass = `kpmg-button--${variant}`;
  const sizeClass = `kpmg-button--${size}`;
  const fullWidthClass = fullWidth ? 'kpmg-button--full-width' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={['kpmg-button', variantClass, sizeClass, fullWidthClass, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {leadingIcon && (
        <span className="kpmg-button__icon kpmg-button__icon--left" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children && <span className="kpmg-button__label">{children}</span>}
      {iconRight && (
        <span className="kpmg-button__icon kpmg-button__icon--right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  /** Button contents or label */
  children: PropTypes.node,
  /** Visual variant style matching Figma component set */
  variant: PropTypes.oneOf(['primary', 'tonal', 'secondary', 'outline', 'text', 'elevated']),
  /** Scale sizing matching Figma component set */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Full width block modifier */
  fullWidth: PropTypes.bool,
  /** Optional icon (SVG element or component) rendered before text */
  iconLeft: PropTypes.node,
  /** Optional icon (SVG element or component) rendered after text */
  iconRight: PropTypes.node,
  /** Shorthand for iconLeft */
  icon: PropTypes.node,
  /** Optional click handler */
  onClick: PropTypes.func,
  /** HTML button type attribute */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Additional custom CSS class names */
  className: PropTypes.string,
};

export default Button;
