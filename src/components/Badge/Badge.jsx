import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Badge.css';

/**
 * KPMG Design System - Badge Component
 * 
 * Scalable, accessible badge component supporting 12 variants:
 * - 3 Sizes: Small (6px dot), Medium (16px count/pill), Large (24px count/pill)
 * - 2 Styles: Primary, Neutral
 * - 2 States / Intensities: Quiet, Loud
 * 
 * Can be used standalone or wrapped around interactive elements (buttons, icons, avatars).
 */
export const Badge = forwardRef(({
  size = 'medium',
  styleType = 'primary',
  variant,
  state = 'loud',
  intensity,
  count,
  maxCount = 99,
  showZero = false,
  dot = false,
  label,
  children,
  placement = 'top-right',
  overlap,
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...restProps
}, ref) => {
  // Normalize size, style, and intensity props
  const normalizedSize = (size || 'medium').toLowerCase();
  const normalizedStyle = (variant || styleType || 'primary').toLowerCase();
  const normalizedState = (intensity || state || 'loud').toLowerCase();

  // Determine if badge should render as a dot
  const isDot = dot || normalizedSize === 'small' || (count === undefined && label === undefined && !children);

  // Calculate display content for count/label
  let displayContent = null;
  if (!isDot && normalizedSize !== 'small') {
    if (label !== undefined && label !== null) {
      displayContent = label;
    } else if (typeof count === 'number') {
      if (count === 0 && !showZero) {
        return children ? <div className="kpmg-badge-container">{children}</div> : null;
      }
      displayContent = count > maxCount ? `${maxCount}+` : count;
    } else if (count !== undefined && count !== null) {
      displayContent = count;
    }
  }

  // Determine if this badge is attached to a child element
  const isOverlapping = overlap !== undefined ? overlap : Boolean(children);

  // Construct modifier classes
  const badgeClasses = [
    'kpmg-badge',
    `kpmg-badge--${normalizedSize}`,
    `kpmg-badge--${normalizedStyle}-${normalizedState}`,
    isOverlapping ? 'kpmg-badge--overlap' : '',
    isOverlapping ? `kpmg-badge--overlap-${placement}` : '',
    className,
  ].filter(Boolean).join(' ');

  // Compute accessible label
  const accessibleLabel = ariaLabel || (
    typeof count === 'number'
      ? `${count} notifications`
      : typeof label === 'string'
        ? label
        : isDot
          ? 'New notification'
          : undefined
  );

  const badgeElement = (
    <span
      ref={ref}
      className={badgeClasses}
      style={style}
      role={accessibleLabel ? 'status' : undefined}
      aria-label={accessibleLabel}
      {...restProps}
    >
      {normalizedSize !== 'small' && !isDot ? displayContent : null}
    </span>
  );

  // If wrapping a child component, render in a relative container
  if (children) {
    return (
      <span className="kpmg-badge-container">
        {children}
        {badgeElement}
      </span>
    );
  }

  return badgeElement;
});

Badge.displayName = 'Badge';

Badge.propTypes = {
  /** Size of badge: 'small' (6px dot), 'medium' (16px compact), 'large' (24px prominent) */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'Small', 'Medium', 'Large']),
  /** Color theme style: 'primary' (brand blue) or 'neutral' (grayscale) */
  styleType: PropTypes.oneOf(['primary', 'neutral', 'Primary', 'Neutral']),
  /** Alias for styleType */
  variant: PropTypes.oneOf(['primary', 'neutral', 'Primary', 'Neutral']),
  /** Visual intensity/state: 'loud' (high contrast fill) or 'quiet' (subtle tint) */
  state: PropTypes.oneOf(['loud', 'quiet', 'Loud', 'Quiet']),
  /** Alias for state */
  intensity: PropTypes.oneOf(['loud', 'quiet', 'Loud', 'Quiet']),
  /** Numeric count to display */
  count: PropTypes.node,
  /** Maximum number to show before displaying ${maxCount}+ */
  maxCount: PropTypes.number,
  /** Whether to show badge when count is zero */
  showZero: PropTypes.bool,
  /** Render as a compact dot without text */
  dot: PropTypes.bool,
  /** Custom label content */
  label: PropTypes.node,
  /** Child component to anchor the badge onto */
  children: PropTypes.node,
  /** Position of overlapping badge when wrapping children */
  placement: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
  /** Force overlapping mode */
  overlap: PropTypes.bool,
  /** Additional CSS class name */
  className: PropTypes.string,
  /** Inline style overrides */
  style: PropTypes.object,
  /** ARIA label for screen readers */
  'aria-label': PropTypes.string,
};

export default Badge;
