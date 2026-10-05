import React, { createContext, useContext, forwardRef, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Tab.css';

/**
 * Context for coordinating active tab state and configuration between Tab and Tab.Item
 */
export const TabContext = createContext({
  activeId: undefined,
  onSelect: () => {},
  size: 'small',
});

export const useTabContext = () => useContext(TabContext);

/**
 * Default Icons for Large Top Bar trailing actions
 */
const DefaultListIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const DefaultLinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

/**
 * Tab.Item (TabItem) Component
 * 
 * Represents an individual interactive navigation tab item.
 * Supports plain text labels, numeric/text badges, disabled states, and custom state previews.
 */
export const TabItem = forwardRef(({
  id,
  value,
  label,
  badge,
  disabled = false,
  selected,
  state,
  onClick,
  onKeyDown,
  className = '',
  style = {},
  children,
  role = 'tab',
  tabIndex,
  'aria-controls': ariaControls,
  ...restProps
}, ref) => {
  const context = useTabContext();
  const tabId = id !== undefined ? id : value;
  
  // Determine selected state: explicit prop takes precedence, otherwise use context
  const isSelected = selected !== undefined 
    ? Boolean(selected) 
    : (context.activeId !== undefined && context.activeId === tabId);

  const hasBadge = badge !== undefined && badge !== null && badge !== '';

  // Handle explicit state overrides for design system showcases and test harnesses
  const stateClass = state ? `kpmg-tab__item--state-${state.toLowerCase()}` : '';

  const itemClasses = [
    'kpmg-tab__item',
    hasBadge ? 'kpmg-tab__item--with-badge' : '',
    isSelected ? 'kpmg-tab__item--selected' : '',
    disabled ? 'kpmg-tab__item--disabled' : '',
    stateClass,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (context.onSelect) {
      context.onSelect(tabId, { id: tabId, label, badge, disabled }, e);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      role={role}
      className={itemClasses}
      style={style}
      disabled={disabled}
      aria-selected={isSelected}
      aria-disabled={disabled}
      aria-controls={ariaControls}
      tabIndex={tabIndex !== undefined ? tabIndex : (isSelected ? 0 : -1)}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      data-tab-id={tabId}
      {...restProps}
    >
      <span className="kpmg-tab__item-label">
        {children || label}
      </span>
      {hasBadge && (
        <span className="kpmg-tab__badge" aria-hidden="true">
          {badge}
        </span>
      )}
    </button>
  );
});

TabItem.displayName = 'Tab.Item';

TabItem.propTypes = {
  /** Unique identifier for the tab */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Value alias for identifier */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Display label for the tab */
  label: PropTypes.node,
  /** Optional badge content (number or text string) */
  badge: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.node]),
  /** Whether the tab is disabled */
  disabled: PropTypes.bool,
  /** Whether the tab is active/selected */
  selected: PropTypes.bool,
  /** Design system visual state override: 'enabled' | 'hovered' | 'pressed' | 'disabled' */
  state: PropTypes.oneOf(['enabled', 'hovered', 'pressed', 'disabled']),
  /** Click event handler */
  onClick: PropTypes.func,
  /** Keydown event handler */
  onKeyDown: PropTypes.func,
  /** Custom CSS class names */
  className: PropTypes.string,
  /** Custom inline styles */
  style: PropTypes.object,
  /** React children */
  children: PropTypes.node,
  /** ARIA role */
  role: PropTypes.string,
  /** TabIndex attribute */
  tabIndex: PropTypes.number,
  /** ID of corresponding panel controlled by this tab */
  'aria-controls': PropTypes.string,
};

/**
 * KPMG WorkBench Design System - Tab (Tabs / Tab Bar) Component
 * 
 * Scalable, production-ready navigation component built to strict design system standards.
 * Features 100% design-token integration, accessible tablist semantics, keyboard navigation,
 * and support for both compact tiles and full-width application top bars.
 */
export const Tab = forwardRef(({
  size = 'small',
  value,
  defaultValue,
  onChange,
  items,
  actions,
  bordered = true,
  fullWidth = false,
  className = '',
  style = {},
  children,
  role = 'tablist',
  'aria-label': ariaLabel = 'Navigation Tabs',
  ...restProps
}, ref) => {
  const normalizedSize = size.toLowerCase();

  // Internal active state for uncontrolled usage
  const [internalActiveId, setInternalActiveId] = useState(() => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;
    if (items && items.length > 0) return items[0].id ?? items[0].value ?? 0;
    return undefined;
  });

  const activeId = value !== undefined ? value : internalActiveId;
  const listRef = useRef(null);

  // Sync internal active id if controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalActiveId(value);
    }
  }, [value]);

  const handleSelect = (tabId, tabItem, event) => {
    if (value === undefined) {
      setInternalActiveId(tabId);
    }
    if (onChange) {
      onChange(tabId, tabItem, event);
    }
  };

  // Keyboard navigation across tabs (ArrowLeft, ArrowRight, Home, End)
  const handleKeyDown = (event) => {
    if (!listRef.current) return;
    const tabButtons = Array.from(listRef.current.querySelectorAll('.kpmg-tab__item:not(:disabled)'));
    if (!tabButtons.length) return;

    const currentIndex = tabButtons.findIndex(btn => btn === document.activeElement);

    let nextIndex = -1;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = tabButtons.length - 1;
    }

    if (nextIndex !== -1 && tabButtons[nextIndex]) {
      tabButtons[nextIndex].focus();
      tabButtons[nextIndex].click();
    }
  };

  const containerClasses = [
    'kpmg-tab',
    `kpmg-tab--${normalizedSize}`,
    (normalizedSize === 'large' && bordered) ? 'kpmg-tab--bordered' : '',
    fullWidth ? 'kpmg-tab--full-width' : '',
    className,
  ].filter(Boolean).join(' ');

  const contextValue = {
    activeId,
    onSelect: handleSelect,
    size: normalizedSize,
  };

  return (
    <TabContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={containerClasses}
        style={style}
        {...restProps}
      >
        <div className="kpmg-tab__nav">
          <div
            ref={listRef}
            className="kpmg-tab__list"
            role={role}
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
          >
            {items && Array.isArray(items)
              ? items.map((item, index) => {
                  const itemId = item.id !== undefined ? item.id : (item.value !== undefined ? item.value : index);
                  return (
                    <TabItem
                      key={itemId}
                      id={itemId}
                      label={item.label}
                      badge={item.badge}
                      disabled={item.disabled}
                      selected={item.selected}
                      state={item.state}
                      aria-controls={item.ariaControls || item['aria-controls']}
                      onClick={item.onClick}
                    />
                  );
                })
              : children}
          </div>
        </div>

        {/* Trailing Actions for Large Top Bar or custom injected actions */}
        {(actions || normalizedSize === 'large') && (
          <div className="kpmg-tab__actions">
            {actions ? (
              typeof actions === 'function' ? actions() : actions
            ) : (
              <>
                <button
                  type="button"
                  className="kpmg-tab__action-btn"
                  aria-label="List view"
                  title="List view"
                >
                  <span className="kpmg-tab__action-icon">
                    <DefaultListIcon />
                  </span>
                </button>
                <button
                  type="button"
                  className="kpmg-tab__action-btn"
                  aria-label="Link actions"
                  title="Link actions"
                >
                  <span className="kpmg-tab__action-icon">
                    <DefaultLinkIcon />
                  </span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </TabContext.Provider>
  );
});

Tab.displayName = 'Tab';

Tab.propTypes = {
  /** Size variant: 'small' (compact for tiles/dialogs) | 'large' (app bar with trailing actions) */
  size: PropTypes.oneOf(['small', 'large']),
  /** Controlled active tab id */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Uncontrolled default active tab id */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback fired on tab change: (activeId, tabItem, event) => void */
  onChange: PropTypes.func,
  /** Data-driven tab items list */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node.isRequired,
      badge: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.node]),
      disabled: PropTypes.bool,
      selected: PropTypes.bool,
      state: PropTypes.oneOf(['enabled', 'hovered', 'pressed', 'disabled']),
      onClick: PropTypes.func,
      ariaControls: PropTypes.string,
    })
  ),
  /** Custom trailing actions element or renderer for Large Top Bar */
  actions: PropTypes.node,
  /** Whether to show divider/bottom border in large size */
  bordered: PropTypes.bool,
  /** Whether to occupy 100% container width */
  fullWidth: PropTypes.bool,
  /** Custom CSS classes */
  className: PropTypes.string,
  /** Custom inline styles */
  style: PropTypes.object,
  /** Declarative tab items children composition (<Tab.Item />) */
  children: PropTypes.node,
  /** ARIA role for tablist */
  role: PropTypes.string,
  /** Accessible label for the tablist */
  'aria-label': PropTypes.string,
};

// Subcomponent attachment for idiomatic <Tab.Item /> syntax
Tab.Item = TabItem;

// Aliased exports for developer ergonomics and backward compatibility
export const Tabs = Tab;
export const TB = Tab;
export const TBItem = TabItem;
export const TBContext = TabContext;
export const useTBContext = useTabContext;

export default Tab;
