import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';

/**
 * Standalone Icon Button component for KPMG WorkBench Design System.
 * Scaffolded directly from the Figma "Icon buttons" component set.
 */
export const IconButton = ({
  icon,
  children,
  variant = 'filled',
  size = 'md',
  shape = 'circle',
  selected = false,
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  type = 'button',
  className = '',
  ...props
}) => {
  const iconContent = icon || children;

  const variantClass = `kpmg-icon-button--${variant}`;
  const sizeClass = `kpmg-icon-button--${size}`;
  const shapeClass = `kpmg-icon-button--${shape}`;
  const selectedClass = selected ? 'kpmg-icon-button--selected' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || 'Icon button'}
      aria-pressed={selected}
      className={['kpmg-icon-button', variantClass, sizeClass, shapeClass, selectedClass, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {iconContent}
    </button>
  );
};

IconButton.propTypes = {
  /** SVG element or icon component */
  icon: PropTypes.node,
  /** Alternative children node for icon */
  children: PropTypes.node,
  /** Visual variant style matching Figma Icon buttons */
  variant: PropTypes.oneOf(['filled', 'outline', 'standard', 'neutral']),
  /** Scale sizing (sm: 32px, md: 40px, lg: 52px) */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Button shape */
  shape: PropTypes.oneOf(['circle', 'square']),
  /** Toggle/selected state */
  selected: PropTypes.bool,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Accessible label for screen readers */
  'aria-label': PropTypes.string,
  /** Click handler */
  onClick: PropTypes.func,
  /** HTML button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default IconButton;
