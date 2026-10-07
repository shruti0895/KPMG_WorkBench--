import React, { useState, useEffect, useRef, forwardRef, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import './Menu.css';

/* ==========================================================================
   ICONS
   ========================================================================== */

/**
 * Checkmark Tick Icon (Trailing checkmark)
 */
export const MenuCheckIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M13.8639 3.65609C14.0533 3.85704 14.0439 4.17348 13.8429 4.36288L5.91309 11.8368C5.67573 12.0605 5.30311 12.0536 5.07417 11.8213L2.39384 9.10093C2.20003 8.90422 2.20237 8.58765 2.39907 8.39384C2.59578 8.20003 2.91235 8.20237 3.10616 8.39907L5.51192 10.8407L13.1571 3.63516C13.358 3.44577 13.6745 3.45513 13.8639 3.65609Z" />
  </svg>
);

/**
 * Checklist Circular Checkbox Icon
 */
export const MenuCheckboxCircleIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M8.02832 1.81787C11.342 1.81787 14.0283 4.50416 14.0283 7.81787C14.0283 11.1316 11.342 13.8179 8.02832 13.8179C4.71461 13.8179 2.02832 11.1316 2.02832 7.81787C2.02832 4.50416 4.71461 1.81787 8.02832 1.81787ZM9.96012 5.99967L7.27832 8.68148L6.09652 7.49967C5.92078 7.32394 5.63586 7.32394 5.46012 7.49967C5.28439 7.67541 5.28439 7.96033 5.46012 8.13607L6.96012 9.63607C7.13586 9.81181 7.42078 9.81181 7.59652 9.63607L10.5965 6.63607C10.7723 6.46033 10.7723 6.17541 10.5965 5.99967C10.4208 5.82394 10.1359 5.82394 9.96012 5.99967Z" />
  </svg>
);

/**
 * Checklist Circular Unchecked Icon (Outline Circle)
 */
export const MenuCheckboxUncheckedIcon = ({ size = 16, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <circle
      cx="8.028"
      cy="7.818"
      r="5.25"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);

/**
 * Chevron Down / Up Icon
 */
export const MenuChevronIcon = ({ direction = 'down', size = 16, className = '', ...props }) => (
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
    className={className}
    style={{ transform: direction === 'up' ? 'rotate(180deg)' : 'none', transition: 'transform 160ms ease' }}
    {...props}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/**
 * Vertical Ellipsis (3 dots) Icon
 */
/**
 * Contextual More Vertical Icon (Exact Fluent More Vertical icon from Figma)
 */
export const MenuEllipsisIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      d="M12 7.75C11.0335 7.75 10.25 6.9665 10.25 6C10.25 5.0335 11.0335 4.25 12 4.25C12.9665 4.25 13.75 5.0335 13.75 6C13.75 6.9665 12.9665 7.75 12 7.75ZM12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75ZM10.25 18C10.25 18.9665 11.0335 19.75 12 19.75C12.9665 19.75 13.75 18.9665 13.75 18C13.75 17.0335 12.9665 16.25 12 16.25C11.0335 16.25 10.25 17.0335 10.25 18Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Star / Favorite Icon (Leading star)
 */
export const MenuStarIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      d="M7.1939 2.1017C7.52403 1.43278 8.47789 1.43277 8.80802 2.1017L10.3291 5.18375L13.7304 5.67798C14.4685 5.78525 14.7633 6.69242 14.2291 7.2131L11.768 9.61215L12.349 12.9997C12.4751 13.7349 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7349 3.65294 12.9997L4.23394 9.61215L1.77277 7.2131C1.23861 6.69242 1.53336 5.78525 2.27156 5.67798L5.67281 5.18375L7.1939 2.1017ZM8.00096 2.72596L6.54628 5.67346C6.41519 5.93909 6.16178 6.1232 5.86864 6.1658L2.61588 6.63845L4.9696 8.93276C5.18171 9.13952 5.27851 9.43742 5.22843 9.72938L4.6728 12.969L7.58215 11.4395C7.84434 11.3016 8.15758 11.3016 8.41977 11.4395L11.3291 12.969L10.7735 9.72938C10.7234 9.43742 10.8202 9.13952 11.0323 8.93276L13.386 6.63845L10.1333 6.1658C9.84014 6.1232 9.58673 5.93909 9.45564 5.67346L8.00096 2.72596Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Plus Icon
 */
export const MenuPlusIcon = ({ size = 16, className = '', ...props }) => (
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
    className={className}
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/**
 * Assistant Robot Icon (Exact Fluent robot icon from Figma)
 */
export const MenuRobotIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <g transform="translate(4.97, 3)">
      <path
        d="M3.03279 8.92737H11.0889C11.9279 8.92737 12.6109 8.24437 12.6109 7.40541V1.52195C12.6109 0.682997 11.9279 0 11.0889 0H3.03279C2.19384 0 1.51084 0.682997 1.51084 1.52195V7.40541C1.51084 8.24437 2.19384 8.92737 3.03279 8.92737ZM2.58643 1.52195C2.58643 1.27457 2.78541 1.07559 3.03279 1.07559H11.0889C11.3363 1.07559 11.5353 1.27457 11.5353 1.52195V7.40541C11.5353 7.6528 11.3363 7.85178 11.0889 7.85178H3.03279C2.78541 7.85178 2.58643 7.6528 2.58643 7.40541V1.52195Z"
        fill="currentColor"
      />
      <path
        d="M4.87184 5.27543C5.32359 5.27543 5.68929 4.90973 5.68929 4.45799C5.68929 4.00624 5.32359 3.64054 4.87184 3.64054C4.42009 3.64054 4.05439 4.00624 4.05439 4.45799C4.05439 4.90973 4.42009 5.27543 4.87184 5.27543Z"
        fill="currentColor"
      />
      <path
        d="M9.05016 5.27543C9.50191 5.27543 9.86761 4.90973 9.86761 4.45799C9.86761 4.00624 9.50191 3.64054 9.05016 3.64054C8.59841 3.64054 8.23271 4.00624 8.23271 4.45799C8.23271 4.90973 8.59841 5.27543 9.05016 5.27543Z"
        fill="currentColor"
      />
      <path
        d="M7.0666 10.8204C2.64056 10.8204 0 12.7619 0 16.0101V16.6447C0.00537793 17.403 0.693753 18 1.56498 18H12.4123C13.3265 18 14.0525 17.3761 14.0579 16.5748V15.9456C14.0579 12.735 11.4442 10.8204 7.07198 10.8204H7.0666ZM12.9769 16.5694C12.9769 16.7362 12.7296 16.9244 12.4069 16.9244H1.56498C1.28533 16.9244 1.08096 16.7738 1.07559 16.6394V16.0101C1.07559 13.3965 3.25903 11.896 7.0666 11.896C9.27155 11.896 12.9769 12.4231 12.9769 15.9456V16.5694Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

/**
 * Assistant Sparkle / Bot Icon
 */
export const MenuSparkleIcon = ({ size = 20, className = '', ...props }) => (
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
    className={className}
    {...props}
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

/**
 * Paperclip Icon (Exact Fluent Attach icon from Figma)
 */
export const MenuPaperclipIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      d="M2.2832 7.975C2.2832 8.251 2.5072 8.475 2.7832 8.475C2.9112 8.475 3.0392 8.426 3.1372 8.329L7.7322 3.732C8.2202 3.244 8.8602 3 9.5002 3C10.8812 3 12.0002 4.119 12.0002 5.5C12.0002 6.14 11.7562 6.78 11.2682 7.268L5.9652 12.571C5.7702 12.766 5.5142 12.864 5.2582 12.864C4.7062 12.864 4.2582 12.416 4.2582 11.864C4.2582 11.608 4.3562 11.352 4.5512 11.157L9.8542 5.854C9.9522 5.756 10.0002 5.628 10.0002 5.5C10.0002 5.224 9.7762 5 9.5002 5C9.3722 5 9.2442 5.049 9.1462 5.146L3.8432 10.45C3.4522 10.841 3.2572 11.352 3.2572 11.864C3.2572 12.969 4.1522 13.864 5.2572 13.864C5.7692 13.864 6.2812 13.669 6.6712 13.278L11.9742 7.975C12.6572 7.292 12.9992 6.396 12.9992 5.5C12.9992 3.567 11.4322 2 9.4992 2C8.6032 2 7.7082 2.342 7.0242 3.025L2.4292 7.621C2.3312 7.719 2.2832 7.847 2.2832 7.975Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Microphone Icon (Exact Fluent Mic icon from Figma)
 */
export const MenuMicIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      d="M5.5 4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8V4.5ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5V8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8V4.5C9.5 3.67157 8.82843 3 8 3ZM4 7.5C4.27614 7.5 4.5 7.72386 4.5 8C4.5 9.933 6.067 11.5 8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8C12.5 10.3163 10.75 12.2238 8.5 12.4725V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V12.4725C5.25002 12.2238 3.5 10.3163 3.5 8C3.5 7.72386 3.72386 7.5 4 7.5Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Send / Up Arrow Icon (Exact Fluent Arrow Up icon from Figma)
 */
export const MenuSendIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      d="M7.5 13.5C7.5 13.7761 7.72386 14 8 14C8.27614 14 8.5 13.7761 8.5 13.5V3.80298L12.1283 7.83448C12.3131 8.03974 12.6292 8.05638 12.8345 7.87165C13.0397 7.68692 13.0564 7.37077 12.8716 7.16552L8.37165 2.16552C8.27683 2.06016 8.14174 2 8 2C7.85826 2 7.72317 2.06016 7.62835 2.16552L3.12836 7.16552C2.94363 7.37077 2.96027 7.68692 3.16552 7.87165C3.37078 8.05638 3.68692 8.03974 3.87165 7.83448L7.5 3.80298V13.5Z"
      fill="currentColor"
    />
  </svg>
);

/* ==========================================================================
   MENU CONTEXT
   ========================================================================== */
const MenuContext = createContext({
  closeOnSelect: true,
  onItemSelect: () => {},
  density: 'medium',
  type: 'dropdown',
});

/* ==========================================================================
   2. CORE MENU COMPONENT
   ========================================================================== */

/**
 * KPMG WorkBench Core Menu Component
 *
 * Scalable container supporting popover positioning, keyboard navigation,
 * click-outside dismiss, and token-driven design.
 */
export const Menu = forwardRef(({
  open = true,
  onClose,
  trigger,
  placement = 'bottom-left',
  type = 'dropdown', // 'dropdown' | 'navigation' | 'overflow' | 'assistant'
  density = 'medium', // 'small' | 'medium' | 'large' | 'navigation'
  header,
  width,
  elevation = true,
  inline = false,
  closeOnSelect = true,
  onSelect,
  className = '',
  style = {},
  children,
  role = 'menu',
  ...restProps
}, ref) => {
  const [isOpen, setIsOpen] = useState(open);
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Click outside listener
  useEffect(() => {
    if (inline || !isOpen) return;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, inline, onClose]);

  const handleItemSelect = (value, event) => {
    if (onSelect) onSelect(value, event);
    if (!inline && closeOnSelect) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState && onClose) onClose();
  };

  // Menu keyboard navigation
  const handleKeyDownMenu = (e) => {
    if (!menuRef.current) return;
    const focusableItems = Array.from(
      menuRef.current.querySelectorAll('.kpmg-menu-item:not(:disabled):not(.kpmg-menu-item--disabled)')
    );
    if (!focusableItems.length) return;

    const currentIndex = focusableItems.indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = currentIndex < focusableItems.length - 1 ? currentIndex + 1 : 0;
      focusableItems[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableItems.length - 1;
      focusableItems[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusableItems[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      focusableItems[focusableItems.length - 1]?.focus();
    }
  };

  const menuClasses = [
    'kpmg-menu',
    `kpmg-menu--${type}`,
    inline ? 'kpmg-menu--inline' : `kpmg-menu--popover kpmg-menu--placement-${placement}`,
    !elevation && 'kpmg-menu--flat',
    className,
  ].filter(Boolean).join(' ');

  const mergedStyle = {
    ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...style,
  };

  const menuContent = (
    <div
      ref={(node) => {
        menuRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={menuClasses}
      style={mergedStyle}
      role={role}
      tabIndex={-1}
      onKeyDown={handleKeyDownMenu}
      {...restProps}
    >
      {header && (
        <div className="kpmg-menu__header">
          {header}
        </div>
      )}
      <MenuContext.Provider value={{ closeOnSelect, onItemSelect: handleItemSelect, density, type }}>
        {children}
      </MenuContext.Provider>
    </div>
  );

  if (inline) {
    return menuContent;
  }

  return (
    <div className="kpmg-menu-wrapper" ref={containerRef}>
      {trigger && (
        typeof trigger === 'function'
          ? trigger({ open: isOpen, toggle: handleToggle })
          : (
            <div onClick={handleToggle} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle()}>
              {trigger}
            </div>
          )
      )}
      {isOpen && menuContent}
    </div>
  );
});

Menu.displayName = 'Menu';

Menu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  placement: PropTypes.oneOf([
    'bottom-left',
    'bottom-right',
    'bottom-center',
    'top-left',
    'top-right',
    'top-center',
  ]),
  type: PropTypes.oneOf(['dropdown', 'navigation', 'overflow', 'assistant']),
  density: PropTypes.oneOf(['small', 'medium', 'large', 'navigation']),
  header: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  elevation: PropTypes.bool,
  inline: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  role: PropTypes.string,
};

/* ==========================================================================
   3. MENU ITEM COMPONENT
   ========================================================================== */

/**
 * KPMG WorkBench Menu Item Component
 *
 * Supports densities (small, medium, large, navigation),
 * types (checklist, icon, item, navigation),
 * states (enabled, hovered, pressed, disabled, error, selected).
 */
export const MenuItem = forwardRef(({
  children,
  label,
  description,
  icon,
  prefix,
  suffix,
  density, // inherits from MenuContext if not provided
  type = 'item', // 'item' | 'checklist' | 'icon' | 'navigation'
  selected = false,
  state = 'enabled', // 'enabled' | 'hovered' | 'pressed' | 'disabled' | 'error'
  disabled = false,
  error = false,
  destructive = false,
  badge,
  actionButton,
  onClick,
  value,
  className = '',
  style = {},
  role,
  showCheckmark = true,
  showLeadingIcon = true,
  showTrailingIcon = true,
  ...restProps
}, ref) => {
  const context = useContext(MenuContext);
  const resolvedDensity = density || (context.type === 'navigation' ? 'navigation' : context.density) || 'medium';

  const isChecklist = type === 'checklist';
  const isSelected = Boolean(selected);
  const isHovered = state === 'hovered';
  const isPressed = state === 'pressed';
  const isDisabled = Boolean(disabled || state === 'disabled');
  const isError = Boolean(error || destructive || state === 'error');
  const itemPrefix = prefix !== undefined ? prefix : icon;

  const itemRole = role || (isChecklist ? 'menuitemcheckbox' : 'menuitem');

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
    if (context.onItemSelect) context.onItemSelect(value !== undefined ? value : label, e);
  };

  const itemClasses = [
    'kpmg-menu-item',
    `kpmg-menu-item--${resolvedDensity}`,
    `kpmg-menu-item--type-${type}`,
    isSelected && 'kpmg-menu-item--selected',
    isHovered && 'kpmg-menu-item--hovered',
    isPressed && 'kpmg-menu-item--pressed',
    isDisabled && 'kpmg-menu-item--disabled',
    isError && 'kpmg-menu-item--error',
    className,
  ].filter(Boolean).join(' ');

  const renderPrefix = () => {
    if (isChecklist) {
      if (!showCheckmark) return null;
      return (
        <span className="kpmg-menu-item__checkbox-indicator" aria-hidden="true">
          {isSelected ? <MenuCheckboxCircleIcon size={16} /> : <MenuCheckboxUncheckedIcon size={16} />}
        </span>
      );
    }
    if (type === 'icon') {
      if (!showLeadingIcon) return null;
      return (
        <span className="kpmg-menu-item__prefix" aria-hidden="true">
          {itemPrefix || <MenuStarIcon size={16} />}
        </span>
      );
    }
    if (itemPrefix) {
      return (
        <span className="kpmg-menu-item__prefix" aria-hidden="true">
          {itemPrefix}
        </span>
      );
    }
    return null;
  };

  const renderSuffix = () => {
    if (badge !== undefined) {
      return <span className="kpmg-menu-item__badge">{badge}</span>;
    }
    if (actionButton) {
      return (
        <span
          className="kpmg-menu-item__action-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof actionButton === 'function') actionButton(e);
          }}
        >
          {typeof actionButton === 'boolean' ? <MenuPlusIcon size={16} /> : actionButton}
        </span>
      );
    }
    if (suffix) {
      return <span className="kpmg-menu-item__suffix" aria-hidden="true">{suffix}</span>;
    }
    if (type === 'icon' && showTrailingIcon) {
      if (!isSelected) return null;
      return (
        <span className="kpmg-menu-item__suffix" aria-hidden="true">
          <MenuCheckIcon size={16} />
        </span>
      );
    }
    return null;
  };

  return (
    <button
      ref={ref}
      type="button"
      className={itemClasses}
      style={style}
      disabled={isDisabled}
      aria-checked={isChecklist ? isSelected : undefined}
      aria-disabled={isDisabled}
      role={itemRole}
      onClick={handleClick}
      tabIndex={isDisabled ? -1 : 0}
      {...restProps}
    >
      {renderPrefix()}

      {/* Main Content: Label & Optional Supporting Description */}
      <span className="kpmg-menu-item__content">
        <span className="kpmg-menu-item__label">{label || children}</span>
        {description && <span className="kpmg-menu-item__description">{description}</span>}
      </span>

      {renderSuffix()}
    </button>
  );
});

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  description: PropTypes.node,
  icon: PropTypes.node,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  density: PropTypes.oneOf(['small', 'medium', 'large', 'navigation']),
  type: PropTypes.oneOf(['item', 'checklist', 'icon', 'navigation']),
  selected: PropTypes.bool,
  state: PropTypes.oneOf(['enabled', 'hovered', 'pressed', 'disabled', 'error']),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  destructive: PropTypes.bool,
  showTrailingIcon: PropTypes.bool,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  actionButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.node, PropTypes.func]),
  onClick: PropTypes.func,
  value: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  role: PropTypes.string,
};

/* ==========================================================================
   4. MENU GROUP & DIVIDER
   ========================================================================== */

/**
 * KPMG WorkBench Menu Group Component
 */
export const MenuGroup = ({ title, children, className = '', ...props }) => (
  <div className={`kpmg-menu-group ${className}`} role="group" {...props}>
    {title && <div className="kpmg-menu__group-header">{title}</div>}
    {children}
  </div>
);

MenuGroup.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};

/**
 * KPMG WorkBench Menu Divider Component
 */
export const MenuDivider = ({ className = '', ...props }) => (
  <hr className={`kpmg-menu-divider ${className}`} role="separator" {...props} />
);

MenuDivider.propTypes = {
  className: PropTypes.string,
};

/* ==========================================================================
   5. SPECIALIZED MENU 1: DROPDOWN MENU & BASES
   ========================================================================== */

/**
 * Dropdown Base Trigger Component
 *
 * Implements all 24 Canonical Base variants from Figma:
 * - Styles: 'default' (ghost or pill), 'gradient' (blue text), 'branded' (KPMG gradient pill), 'card' (outlined or filled)
 * - Sizes: 'small' (32px), 'medium' (36px), 'large' (40px), 'branded' (40px x 100px), 'none' (60px card)
 * - Backgrounds: true (filled/container) vs false (ghost)
 * - States: 'enabled', 'pressed', 'filled'
 * - Open: true (chevron points up) vs false (chevron points down)
 */
export const DropdownBase = forwardRef(({
  styleType = 'default', // 'default' | 'gradient' | 'branded' | 'card'
  size = 'medium',       // 'small' | 'medium' | 'large' | 'branded' | 'none'
  background = true,     // boolean (true = pill / card container; false = ghost text)
  state = 'enabled',     // 'enabled' | 'pressed' | 'filled'
  open = false,          // boolean
  label = 'Options',
  icon,
  onClick,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const isCard = styleType === 'card';
  const isBranded = styleType === 'branded' || size === 'branded';
  const isGradient = styleType === 'gradient';

  let baseStyleClass = '';
  if (isCard) {
    baseStyleClass = state === 'filled' ? 'kpmg-dropdown-base--card-filled' : 'kpmg-dropdown-base--card-outlined';
  } else if (isBranded) {
    baseStyleClass = 'kpmg-dropdown-base--branded';
  } else if (isGradient) {
    baseStyleClass = 'kpmg-dropdown-base--gradient';
  } else {
    baseStyleClass = background ? 'kpmg-dropdown-base--default-pill' : 'kpmg-dropdown-base--default-ghost';
  }

  const baseSizeClass = !isCard && !isBranded ? `kpmg-dropdown-base--size-${size}` : '';

  const classes = [
    'kpmg-dropdown-base',
    baseStyleClass,
    baseSizeClass,
    open && 'kpmg-dropdown-base--open',
    state === 'pressed' && 'kpmg-dropdown-base--pressed',
    className,
  ].filter(Boolean).join(' ');

  const chevronSize = isCard ? 20 : 16;

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-haspopup="menu"
      aria-expanded={open}
      {...props}
    >
      {isBranded ? (
        <>
          <span style={{ letterSpacing: '0.5px' }}>{label || 'KPMG'}</span>
          <MenuChevronIcon direction={open ? 'up' : 'down'} size={18} />
        </>
      ) : (
        <>
          <span>{label}</span>
          <MenuChevronIcon direction={open ? 'up' : 'down'} size={chevronSize} />
        </>
      )}
    </button>
  );
});

DropdownBase.displayName = 'DropdownBase';

DropdownBase.propTypes = {
  styleType: PropTypes.oneOf(['default', 'gradient', 'branded', 'card']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'branded', 'none']),
  background: PropTypes.bool,
  state: PropTypes.oneOf(['enabled', 'pressed', 'filled']),
  open: PropTypes.bool,
  label: PropTypes.node,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

/**
 * Dropdown Item Group Component
 *
 * Implements the 6 canonical item group variants from Figma:
 * - Densities: 'small' (250px), 'medium' (298px), 'large' (322px)
 * - Types: 'checklist' (circle checks), 'item-list' (star + checkmark)
 * - Anatomy: Top item + Divider + Middle items (4 items) + Divider + Bottom item
 */
export const DropdownItemGroup = forwardRef(({
  density = 'medium', // 'small' | 'medium' | 'large'
  type = 'checklist', // 'checklist' | 'item-list'
  items,
  selectedValues: controlledSelectedValues,
  defaultSelectedValues,
  onSelect,
  className = '',
  ...props
}, ref) => {
  const isItemList = type === 'item-list';

  const defaultItems = [
    { label: 'Option 1', value: 'Option 1', selected: true },
    { type: 'divider' },
    { label: 'Option 2', value: 'Option 2', selected: true },
    { label: 'Option 3', value: 'Option 3', selected: true },
    { label: 'Option 4', value: 'Option 4', selected: true },
    { label: 'Option 5', value: 'Option 5', selected: true },
    { type: 'divider' },
    { label: 'Option 6', value: 'Option 6', selected: true },
  ];

  const groupItems = items || defaultItems;

  const initialSelection = defaultSelectedValues !== undefined
    ? defaultSelectedValues
    : groupItems
        .filter((item) => item.type !== 'divider' && !item.disabled && item.selected !== false)
        .map((item) => item.value || item.label);

  const [internalSelectedValues, setInternalSelectedValues] = useState(initialSelection);

  const isControlled = controlledSelectedValues !== undefined;
  const currentSelectedValues = isControlled ? controlledSelectedValues : internalSelectedValues;

  const handleItemClick = (val, item, e) => {
    if (item.disabled) return;

    const isCurrentlySelected = currentSelectedValues.includes(val);
    const nextSelected = isCurrentlySelected
      ? currentSelectedValues.filter((v) => v !== val)
      : [...currentSelectedValues, val];

    if (!isControlled) {
      setInternalSelectedValues(nextSelected);
    }

    if (onSelect) {
      onSelect(val, nextSelected, item, e);
    }
    if (item.onClick) {
      item.onClick(e);
    }
  };

  return (
    <div
      ref={ref}
      className={`kpmg-dropdown-item-group kpmg-dropdown-item-group--${density} ${className}`}
      role="group"
      {...props}
    >
      {groupItems.map((item, idx) => {
        if (item.type === 'divider') {
          return <MenuDivider key={`group-divider-${idx}`} />;
        }

        const itemVal = item.value || item.label;
        const isSelected = currentSelectedValues.includes(itemVal);

        return (
          <MenuItem
            key={itemVal || idx}
            label={item.label}
            value={itemVal}
            density={density}
            type={isItemList ? 'icon' : 'checklist'}
            prefix={isItemList ? <MenuStarIcon size={16} /> : undefined}
            suffix={isItemList && isSelected ? <MenuCheckIcon size={16} /> : undefined}
            showTrailingIcon={isItemList}
            selected={isSelected}
            disabled={item.disabled}
            error={item.error}
            onClick={(e) => handleItemClick(itemVal, item, e)}
          />
        );
      })}
    </div>
  );
});

DropdownItemGroup.displayName = 'DropdownItemGroup';

DropdownItemGroup.propTypes = {
  density: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['checklist', 'item-list']),
  items: PropTypes.arrayOf(PropTypes.object),
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedValues: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Dropdown Menu Component
 *
 * Supports Button Trigger ("Options v"), Card Trigger ("Header v"),
 * Gradient Trigger, Branded Pill Trigger, or Custom Trigger.
 * Supports Orientation (Top/Bottom) and Alignment (Left/Right/Center).
 */
export const DropdownMenu = ({
  triggerLabel = 'Options',
  triggerType, // backward compatibility: 'default' | 'card' | 'custom'
  triggerDensity, // backward compatibility: 'small' | 'medium' | 'large'
  baseStyle = 'default', // 'default' | 'gradient' | 'branded' | 'card'
  baseSize = 'medium', // 'small' | 'medium' | 'large' | 'branded' | 'none'
  baseBackground = true, // boolean
  baseState = 'enabled', // 'enabled' | 'pressed' | 'filled'
  orientation = 'bottom', // 'bottom' | 'top'
  alignment = 'left', // 'left' | 'right' | 'center'
  customTrigger,
  density = 'medium',
  items = [],
  selectedValues = [],
  onSelect,
  placement,
  width,
  header,
  open,
  defaultOpen = false,
  closeOnSelect = true,
  onClose,
  className = '',
  children,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open !== undefined ? open : internalOpen;

  const resolvedStyle = triggerType === 'card' ? 'card' : (baseStyle || 'default');
  const resolvedSize = triggerDensity || baseSize || (resolvedStyle === 'card' ? 'none' : 'medium');
  const isCard = resolvedStyle === 'card';

  // Compute popover placement from orientation + alignment if not manually specified
  const computedPlacement = placement || `${orientation}-${alignment}`;

  const handleToggle = () => {
    const next = !isOpen;
    setInternalOpen(next);
    if (!next && onClose) onClose();
  };

  const renderTrigger = () => {
    if (customTrigger) {
      return typeof customTrigger === 'function' ? customTrigger({ open: isOpen, toggle: handleToggle }) : customTrigger;
    }

    return (
      <DropdownBase
        styleType={resolvedStyle}
        size={resolvedSize}
        background={baseBackground}
        state={isOpen ? 'pressed' : baseState}
        open={isOpen}
        label={triggerLabel || (isCard ? 'Header' : 'Options')}
        onClick={handleToggle}
      />
    );
  };

  return (
    <Menu
      open={isOpen}
      onClose={() => {
        setInternalOpen(false);
        if (onClose) onClose();
      }}
      trigger={renderTrigger()}
      type="dropdown"
      density={density}
      placement={computedPlacement}
      width={width || (isCard ? 450 : undefined)}
      header={header}
      className={isCard ? `kpmg-menu--dropdown-card ${className}`.trim() : className}
      closeOnSelect={closeOnSelect}
      {...props}
    >
      {children || items.map((item, idx) => {
        if (item.type === 'divider') {
          return <MenuDivider key={`divider-${idx}`} />;
        }
        const isSelected = selectedValues.includes(item.value || item.label);
        return (
          <MenuItem
            key={item.value || item.label || idx}
            label={item.label}
            description={item.description}
            type={item.type || 'checklist'}
            prefix={item.prefix || item.icon || (item.type === 'icon' ? <MenuStarIcon size={16} /> : undefined)}
            suffix={item.suffix || (item.type === 'icon' && isSelected ? <MenuCheckIcon size={16} /> : undefined)}
            showTrailingIcon={item.type === 'icon'}
            selected={isSelected}
            disabled={item.disabled}
            error={item.error}
            onClick={(e) => {
              if (item.onClick) item.onClick(e);
              if (onSelect) onSelect(item.value || item.label, item);
            }}
          />
        );
      })}
    </Menu>
  );
};

DropdownMenu.propTypes = {
  triggerLabel: PropTypes.node,
  triggerType: PropTypes.oneOf(['default', 'card', 'custom']),
  triggerDensity: PropTypes.oneOf(['small', 'medium', 'large']),
  baseStyle: PropTypes.oneOf(['default', 'gradient', 'branded', 'card']),
  baseSize: PropTypes.oneOf(['small', 'medium', 'large', 'branded', 'none']),
  baseBackground: PropTypes.bool,
  baseState: PropTypes.oneOf(['enabled', 'pressed', 'filled']),
  orientation: PropTypes.oneOf(['bottom', 'top']),
  alignment: PropTypes.oneOf(['left', 'right', 'center']),
  customTrigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  density: PropTypes.oneOf(['small', 'medium', 'large']),
  items: PropTypes.arrayOf(PropTypes.object),
  selectedValues: PropTypes.array,
  onSelect: PropTypes.func,
  placement: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  header: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

/* ==========================================================================
   6. SPECIALIZED MENU 2: NAVIGATION MENU
   ========================================================================== */

/**
 * Navigation Menu Component
 *
 * Vertical navigation panel or dropdown menu with KPMG pill trigger,
 * notification badges, and section dividers.
 */
export const NavigationMenu = ({
  brandLabel = 'KPMG',
  triggerType = 'brand-pill', // 'brand-pill' | 'custom' | 'none' (inline)
  customTrigger,
  header = 'Header',
  inline = false,
  open,
  defaultOpen = false,
  closeOnSelect = true,
  onClose,
  items = [],
  activeItem,
  onSelect,
  placement = 'bottom-left',
  width = 263,
  className = '',
  children,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open !== undefined ? open : internalOpen;

  const handleToggle = () => {
    const next = !isOpen;
    setInternalOpen(next);
    if (!next && onClose) onClose();
  };

  const renderTrigger = () => {
    if (inline || triggerType === 'none') return null;

    if (customTrigger) {
      return typeof customTrigger === 'function' ? customTrigger({ open: isOpen, toggle: handleToggle }) : customTrigger;
    }

    return (
      <button
        type="button"
        className="kpmg-nav-brand-pill"
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span>{brandLabel}</span>
        <MenuChevronIcon direction={isOpen ? 'up' : 'down'} size={18} />
      </button>
    );
  };

  return (
    <Menu
      open={inline ? true : isOpen}
      onClose={() => {
        setInternalOpen(false);
        if (onClose) onClose();
      }}
      trigger={renderTrigger()}
      inline={inline}
      type="navigation"
      density="navigation"
      placement={placement}
      width={width}
      header={header}
      className={className}
      closeOnSelect={closeOnSelect}
      {...props}
    >
      {children || items.map((item, idx) => {
        if (item.type === 'divider') {
          return <MenuDivider key={`nav-divider-${idx}`} />;
        }
        if (item.type === 'group') {
          return (
            <MenuGroup key={`nav-group-${idx}`} title={item.title}>
              {item.items?.map((subItem, sIdx) => {
                const isSelected = activeItem === (subItem.value || subItem.label);
                return (
                  <MenuItem
                    key={subItem.value || subItem.label || sIdx}
                    label={subItem.label}
                    icon={subItem.icon}
                    prefix={subItem.prefix || subItem.icon}
                    suffix={subItem.suffix}
                    badge={subItem.badge}
                    actionButton={subItem.actionButton}
                    selected={isSelected}
                    disabled={subItem.disabled}
                    density="navigation"
                    onClick={(e) => {
                      if (subItem.onClick) subItem.onClick(e);
                      if (onSelect) onSelect(subItem.value || subItem.label, subItem);
                    }}
                  />
                );
              })}
            </MenuGroup>
          );
        }

        const isSelected = activeItem === (item.value || item.label);
        return (
          <MenuItem
            key={item.value || item.label || idx}
            label={item.label}
            icon={item.icon}
            prefix={item.prefix || item.icon}
            suffix={item.suffix}
            badge={item.badge}
            actionButton={item.actionButton}
            selected={isSelected}
            disabled={item.disabled}
            density="navigation"
            onClick={(e) => {
              if (item.onClick) item.onClick(e);
              if (onSelect) onSelect(item.value || item.label, item);
            }}
          />
        );
      })}
    </Menu>
  );
};

NavigationMenu.propTypes = {
  brandLabel: PropTypes.node,
  triggerType: PropTypes.oneOf(['brand-pill', 'custom', 'none']),
  customTrigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  header: PropTypes.node,
  inline: PropTypes.bool,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  onClose: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object),
  activeItem: PropTypes.any,
  onSelect: PropTypes.func,
  placement: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  children: PropTypes.node,
};

/* ==========================================================================
   7. SPECIALIZED MENU 3: OVERFLOW MENU
   ========================================================================== */

/**
 * Overflow Menu Component
 *
 * Triggered by 3-dots vertical ellipsis icon button (`⋮`), supporting
 * small (24px) and large (40px) triggers, left/right alignments.
 * Opens the canonical Dropdown Item Groups menu (Checklist or Item-List).
 */
export const OverflowMenu = forwardRef(({
  size = 'large', // 'small' | 'large'
  density = 'medium', // 'small' | 'medium' | 'large'
  groupType = 'checklist', // 'checklist' | 'item-list'
  type, // alias for groupType
  disabled = false,
  items,
  selectedValues,
  defaultSelectedValues,
  onSelect,
  placement = 'bottom-left',
  open,
  defaultOpen = false,
  closeOnSelect = false,
  onClose,
  className = '',
  ariaLabel = 'More options',
  children,
  ...props
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open !== undefined ? open : internalOpen;
  const containerRef = useRef(null);

  const resolvedGroupType = type || groupType || 'checklist';

  useEffect(() => {
    if (open !== undefined) setInternalOpen(open);
  }, [open]);

  // Click outside and Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setInternalOpen(false);
        if (onClose) onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setInternalOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOpen;
    setInternalOpen(next);
    if (!next && onClose) onClose();
  };

  const handleItemSelect = (val, nextSelected, item, e) => {
    if (onSelect) onSelect(val, nextSelected, item, e);
    if (closeOnSelect) {
      setInternalOpen(false);
      if (onClose) onClose();
    }
  };

  return (
    <div className={`kpmg-menu-wrapper ${className}`} ref={containerRef} {...props}>
      <button
        ref={ref}
        type="button"
        className={`kpmg-menu-overflow-trigger kpmg-menu-overflow-trigger--${size} ${isOpen ? 'kpmg-menu-overflow-trigger--open' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <MenuEllipsisIcon size={size === 'small' ? 16 : 20} />
      </button>

      {isOpen && (
        <div className={`kpmg-menu-overflow-popover kpmg-menu--placement-${placement}`}>
          {children || (
            <DropdownItemGroup
              density={density}
              type={resolvedGroupType}
              items={items}
              selectedValues={selectedValues}
              defaultSelectedValues={defaultSelectedValues}
              onSelect={handleItemSelect}
            />
          )}
        </div>
      )}
    </div>
  );
});

OverflowMenu.displayName = 'OverflowMenu';

OverflowMenu.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  density: PropTypes.oneOf(['small', 'medium', 'large']),
  groupType: PropTypes.oneOf(['checklist', 'item-list']),
  type: PropTypes.oneOf(['checklist', 'item-list']),
  disabled: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedValues: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  placement: PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
};

/* ==========================================================================
   8. SPECIALIZED MENU 4: ASSISTANT MENU
   ========================================================================== */

/**
 * Assistant Card Component (used in Assistant Menu)
 */
export const AssistantCard = ({
  title = 'Header',
  subtitle = 'Supporting line text lorem ipsu...',
  thumbnail,
  onActionClick,
  onClick,
  className = '',
  ...props
}) => (
  <div
    className={`kpmg-assistant-card ${className}`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick && onClick(e)}
    {...props}
  >
    <div className="kpmg-assistant-card__thumbnail">
      {thumbnail}
    </div>
    <div className="kpmg-assistant-card__info">
      <span className="kpmg-assistant-card__title">{title}</span>
      <span className="kpmg-assistant-card__subtitle">{subtitle}</span>
    </div>
    <button
      type="button"
      className="kpmg-assistant-card__action"
      aria-label="Card options"
      onClick={(e) => {
        e.stopPropagation();
        if (onActionClick) onActionClick(e);
      }}
    >
      <MenuEllipsisIcon size={24} />
    </button>
  </div>
);

AssistantCard.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  thumbnail: PropTypes.node,
  onActionClick: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Canonical default sections for Assistant Menu
 */
const DEFAULT_ASSISTANT_SECTIONS = [
  {
    title: 'Title',
    cards: [
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
    ],
  },
  {
    title: 'Title',
    cards: [
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
    ],
  },
];

/**
 * Assistant Menu Component
 *
 * KPMG Trusted AI assistant menu with prompt bar, assistant cards,
 * verified badge, and primary action CTA.
 *
 * Supports 'left' and 'right' trigger variants with the official KPMG robot icon.
 */
export const AssistantMenu = ({
  alignment = 'right', // 'right' | 'left'
  placement,
  searchPlaceholder = 'Ask me anything',
  verifiedText = 'Verified by KPMG Trusted AI',
  ctaLabel = 'Longer action',
  onCtaClick,
  onSearchSubmit,
  sections = DEFAULT_ASSISTANT_SECTIONS,
  defaultOpen = false,
  open,
  onClose,
  width = 400,
  className = '',
  customTrigger,
  children,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [searchVal, setSearchVal] = useState('');
  const isOpen = open !== undefined ? open : internalOpen;

  useEffect(() => {
    if (open !== undefined) {
      setInternalOpen(open);
    }
  }, [open]);

  const handleToggle = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const next = !isOpen;
    if (open === undefined) {
      setInternalOpen(next);
    }
    if (!next && onClose) onClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(searchVal);
  };

  const resolvedPlacement = placement || (alignment === 'left' ? 'bottom-left' : 'bottom-right');

  const triggerRender = () => {
    if (customTrigger) {
      return typeof customTrigger === 'function' ? customTrigger({ open: isOpen, toggle: handleToggle }) : customTrigger;
    }

    return (
      <button
        type="button"
        className={`kpmg-menu-assistant-trigger ${isOpen ? 'kpmg-menu-assistant-trigger--open' : ''}`}
        onClick={handleToggle}
        aria-label="Open Assistant Menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <MenuRobotIcon size={24} />
      </button>
    );
  };

  return (
    <div
      className={`kpmg-assistant-menu-anchor kpmg-assistant-menu-anchor--${alignment} ${isOpen ? 'kpmg-assistant-menu-anchor--open' : ''} ${className}`}
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
    >
      <Menu
        open={isOpen}
        onClose={() => {
          setInternalOpen(false);
          if (onClose) onClose();
        }}
        trigger={triggerRender}
        closeOnSelect={false}
        type="assistant"
        placement={resolvedPlacement}
        width={width}
        {...props}
      >
        {/* 1. Top Prompt Bar */}
        <form className="kpmg-assistant-menu__search-bar" onSubmit={handleSearchSubmit}>
          <button
            type="button"
            className="kpmg-assistant-menu__search-icon-btn"
            aria-label="Attach file"
          >
            <MenuPaperclipIcon size={16} />
          </button>
          <input
            type="text"
            className="kpmg-assistant-menu__search-input"
            placeholder={searchPlaceholder}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <div className="kpmg-assistant-menu__search-actions">
            <button
              type="button"
              className="kpmg-assistant-menu__search-icon-btn"
              aria-label="Voice input"
            >
              <MenuMicIcon size={16} />
            </button>
            <button
              type="submit"
              className="kpmg-assistant-menu__search-icon-btn"
              aria-label="Send query"
            >
              <MenuSendIcon size={16} />
            </button>
          </div>
        </form>

        {/* 2. Verification Badge */}
        {verifiedText && (
          <div className="kpmg-assistant-menu__verification">
            {verifiedText}
          </div>
        )}

        {/* Divider */}
        <hr className="kpmg-assistant-menu__divider" />

        {/* 3. Cards Content */}
        {children || (
          sections.map((sec, sIdx) => (
            <div key={sec.title || sIdx} className="kpmg-assistant-menu__section">
              {sec.title && (
                <div className="kpmg-assistant-menu__section-title">
                  {sec.title}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sec.cards?.map((card, cIdx) => (
                  <AssistantCard
                    key={card.title || cIdx}
                    title={card.title}
                    subtitle={card.subtitle}
                    thumbnail={card.thumbnail}
                    onClick={card.onClick}
                    onActionClick={card.onActionClick}
                  />
                ))}
              </div>
              {sIdx < sections.length - 1 && (
                <hr className="kpmg-assistant-menu__divider" />
              )}
            </div>
          ))
        )}

        {/* 4. Bottom Action CTA */}
        {ctaLabel && (
          <div className="kpmg-assistant-menu__footer">
            <button
              type="button"
              className="kpmg-assistant-menu__cta-btn"
              onClick={onCtaClick}
            >
              {ctaLabel}
            </button>
          </div>
        )}
      </Menu>
    </div>
  );
};

AssistantMenu.propTypes = {
  alignment: PropTypes.oneOf(['left', 'right']),
  searchPlaceholder: PropTypes.string,
  verifiedText: PropTypes.string,
  ctaLabel: PropTypes.node,
  onCtaClick: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  sections: PropTypes.arrayOf(PropTypes.object),
  defaultOpen: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  placement: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  customTrigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
};

export default Menu;
