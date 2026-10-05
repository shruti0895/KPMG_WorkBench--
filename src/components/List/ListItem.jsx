import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './List.css';

/**
 * KPMG WorkBench Design System - List Checkmark Circle SVG
 */
export const ListCheckCircleSvg = ({ className = '', style = {}, ...props }) => (
  <svg
    viewBox="0 0 20 20"
    width="20"
    height="20"
    fill="none"
    className={className}
    style={style}
    aria-hidden="true"
    {...props}
  >
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path
      d="M6 10.2L8.7 13L14 7"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ListCheckCircleSvg.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * KPMG WorkBench Design System - Chevron Right Arrow SVG
 */
export const ListChevronSvg = ({ className = '', style = {}, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    className={className}
    style={style}
    aria-hidden="true"
    {...props}
  >
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
);

ListChevronSvg.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * KPMG WorkBench Design System - Avatar Component for List Items
 */
export const ListAvatar = ({
  initials = 'AZ',
  src,
  alt = '',
  className = '',
  style = {},
  ...props
}) => (
  <div className={`kpmg-list-avatar ${className}`} style={style} {...props}>
    {src ? <img src={src} alt={alt} /> : <span>{initials}</span>}
  </div>
);

ListAvatar.propTypes = {
  initials: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * KPMG WorkBench Design System - Thumbnail / Image Component for List Items
 */
export const ListThumbnail = ({
  src,
  alt = '',
  className = '',
  style = {},
  ...props
}) => (
  <div className={`kpmg-list-thumbnail ${className}`} style={style} {...props}>
    {src ? <img src={src} alt={alt} /> : null}
  </div>
);

ListThumbnail.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * KPMG WorkBench Design System - ListItem Component
 * 
 * Scalable individual list item row supporting:
 * - 3 Density Sizes: Small (1-line), Medium (2-line), Large (3-line)
 * - Leading elements: Avatar, Image thumbnail, Checkbox, Radio, Icon, or Custom JSX
 * - Trailing elements: Checkmark circle, Chevron arrow, Badges, or Custom actions
 */
export const ListItem = forwardRef(({
  size = 'medium',
  title = 'List item',
  supportingText,
  secondaryText,
  leading = 'none',
  leadingProps = {},
  trailing = 'none',
  trailingProps = {},
  selected = false,
  disabled = false,
  onClick,
  className = '',
  style = {},
  children,
  role = 'listitem',
  ...restProps
}, ref) => {
  const normalizedSize = (size || 'medium').toLowerCase();
  const isInteractive = Boolean(onClick) && !disabled;

  // Render Leading Element
  const renderLeading = () => {
    if (!leading || leading === 'none') return null;

    if (React.isValidElement(leading)) {
      return <div className="kpmg-list-item__leading">{leading}</div>;
    }

    if (leading === 'avatar') {
      return (
        <div className="kpmg-list-item__leading">
          <ListAvatar {...leadingProps} />
        </div>
      );
    }

    if (leading === 'image') {
      return (
        <div className="kpmg-list-item__leading">
          <ListThumbnail {...leadingProps} />
        </div>
      );
    }

    if (leading === 'checkbox') {
      const isChecked = leadingProps.checked ?? false;
      return (
        <div className="kpmg-list-item__leading kpmg-list-control">
          <ListCheckCircleSvg
            style={{
              color: isChecked ? 'var(--color-primary-action, #1e49e2)' : 'var(--color-neutral-100, #454554)',
              cursor: 'pointer',
            }}
            {...leadingProps}
          />
        </div>
      );
    }

    if (leading === 'radio') {
      const isChecked = leadingProps.checked ?? false;
      return (
        <div className="kpmg-list-item__leading kpmg-list-control">
          <div
            className={`kpmg-list-radio-indicator ${
              isChecked ? 'kpmg-list-radio-indicator--checked' : 'kpmg-list-radio-indicator--unchecked'
            }`}
            {...leadingProps}
          />
        </div>
      );
    }

    if (leading === 'icon') {
      return (
        <div className="kpmg-list-item__leading kpmg-list-icon">
          {leadingProps.icon || null}
        </div>
      );
    }

    return null;
  };

  // Render Trailing Element
  const renderTrailing = () => {
    if (!trailing || trailing === 'none') return null;

    if (React.isValidElement(trailing)) {
      return <div className="kpmg-list-item__trailing">{trailing}</div>;
    }

    if (trailing === 'checkbox') {
      const isChecked = trailingProps.checked ?? true;
      return (
        <div className="kpmg-list-item__trailing">
          <ListCheckCircleSvg
            style={{
              color: isChecked ? 'var(--color-neutral-100, #454554)' : 'var(--color-neutral-300, #b8b8c4)',
            }}
            {...trailingProps}
          />
        </div>
      );
    }

    if (trailing === 'arrow' || trailing === 'chevron') {
      return (
        <div className="kpmg-list-item__trailing kpmg-list-chevron">
          <ListChevronSvg {...trailingProps} />
        </div>
      );
    }

    return null;
  };

  const itemClasses = [
    'kpmg-list-item',
    `kpmg-list-item--${normalizedSize}`,
    isInteractive ? 'kpmg-list-item--interactive' : '',
    selected ? 'kpmg-list-item--selected' : '',
    disabled ? 'kpmg-list-item--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const handleKeyDown = (e) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <li
      ref={ref}
      className={itemClasses}
      style={style}
      role={role}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      aria-selected={selected ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      {...restProps}
    >
      <div className="kpmg-list-item__main">
        {renderLeading()}
        <div className="kpmg-list-item__content">
          {title && <div className="kpmg-list-item__title">{title}</div>}
          {normalizedSize !== 'small' && supportingText && (
            <div className="kpmg-list-item__supporting">{supportingText}</div>
          )}
          {normalizedSize === 'large' && secondaryText && (
            <div className="kpmg-list-item__secondary">{secondaryText}</div>
          )}
          {children}
        </div>
      </div>
      {renderTrailing()}
    </li>
  );
});

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  /** Density size: small (1-line), medium (2-line), large (3-line) */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Primary headline / title text */
  title: PropTypes.node,
  /** Supporting descriptive text (visible in medium and large sizes) */
  supportingText: PropTypes.node,
  /** Secondary detail text (visible in large size) */
  secondaryText: PropTypes.node,
  /** Leading element type */
  leading: PropTypes.oneOfType([
    PropTypes.oneOf(['avatar', 'image', 'checkbox', 'radio', 'icon', 'none']),
    PropTypes.node,
  ]),
  /** Props forwarded to leading element */
  leadingProps: PropTypes.object,
  /** Trailing element type */
  trailing: PropTypes.oneOfType([
    PropTypes.oneOf(['checkbox', 'arrow', 'chevron', 'none']),
    PropTypes.node,
  ]),
  /** Props forwarded to trailing element */
  trailingProps: PropTypes.object,
  /** Whether the row is selected / active */
  selected: PropTypes.bool,
  /** Whether the row is disabled */
  disabled: PropTypes.bool,
  /** Click handler (makes item keyboard-accessible and interactive) */
  onClick: PropTypes.func,
  /** Custom CSS class */
  className: PropTypes.string,
  /** Inline CSS styles */
  style: PropTypes.object,
  /** Custom children inside content container */
  children: PropTypes.node,
  /** ARIA role */
  role: PropTypes.string,
};

export default ListItem;
