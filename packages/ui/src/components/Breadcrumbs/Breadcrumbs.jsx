import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Breadcrumbs.css';

/* ==========================================================================
   EXPORTED SVG ICONS (Available to pass as props or use as defaults)
   ========================================================================== */

/** Circle Checkbox Icon (Dark circle with inner white checkmark tick) */
export const CircleCheckboxIconSvg = ({ checked = true, color = '#3D405B', tickColor = '#FFFFFF', size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
    {checked ? (
      <>
        <circle cx="12" cy="12" r="10" fill={color} />
        <polyline points="8 12 11 15 16 9" fill="none" stroke={tickColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <circle cx="12" cy="12" r="9" fill="none" stroke="#9090A2" strokeWidth="2" />
    )}
  </svg>
);

/** Star Outline Icon (Unbookmarked) */
export const StarOutlineIconSvg = ({ size = 18, color = '#5D5D6A', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/** Star Filled Icon (Bookmarked) */
export const StarFilledIconSvg = ({ size = 18, color = '#F4D533', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} stroke={color} strokeWidth="1" aria-hidden="true" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/** Trailing Checkmark Icon */
export const CheckmarkIconSvg = ({ size = 16, color = '#454554', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/** Slash Forward Separator Icon (Exact SVG vector path from Figma) */
export const SlashForwardIconSvg = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-breadcrumbs__slash-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12.6581 2.02566C12.9201 2.11298 13.0617 2.39614 12.9743 2.65811L7.97434 17.6581C7.88702 17.9201 7.60386 18.0617 7.34189 17.9743C7.07991 17.887 6.93833 17.6039 7.02566 17.3419L12.0257 2.34189C12.113 2.07991 12.3961 1.93833 12.6581 2.02566Z"
      fill="currentColor"
    />
  </svg>
);

/** Chevron Forward Separator Icon (Exact SVG vector path from Figma) */
export const ChevronForwardIconSvg = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-breadcrumbs__chevron-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M13.2923 12L8.69225 7.4L9.4 6.69225L14.7078 12L9.4 17.3078L8.69225 16.6L13.2923 12Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Breadcrumbs Component - KPMG WorkBench Design System
 * Formatted directly to match the design card spec.
 * Features 3-dots (...) positioned before last link, top-left pointer caret dropdown card on click,
 * route enabling/checking via Circle Checkbox, bookmark starring/unstarring with toast popup, and custom SVG props.
 */
export const Breadcrumbs = ({
  items = [],
  maxItems,
  itemsBeforeCollapse,
  itemsAfterCollapse = 1,
  separator,
  size = 'md',
  overflowTrigger = 'click', // Default to onclick trigger
  circleCheckboxIcon,
  starIcon,
  checkIcon,
  onRouteToggle,
  onBookmarkToggle,
  onItemClick,
  className = '',
  ...props
}) => {
  const normalize = (list) => (list || []).map((item, idx) => {
    if (typeof item === 'string') {
      return { id: `item-${idx}`, label: item };
    }
    return item;
  });

  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [itemsState, setItemsState] = useState(() => normalize(items));
  const [toastMessage, setToastMessage] = useState(null);
  const overflowRef = useRef(null);
  const activeSeparator = separator !== undefined ? separator : <SlashForwardIconSvg size={size === 'sm' ? 16 : 20} />;

  // Sync prop changes to local state for interactivity
  useEffect(() => {
    setItemsState(normalize(items));
  }, [items]);

  // Close overflow dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overflowRef.current && !overflowRef.current.contains(event.target)) {
        setIsOverflowOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show auto-hiding toast popup
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Determine collapsed vs visible items (3 dots right before last link)
  const totalItems = itemsState.length;
  const shouldCollapse = maxItems && totalItems > maxItems && totalItems > (1 + itemsAfterCollapse);

  let startItems = itemsState;
  let collapsedItems = [];
  let endItems = [];

  if (shouldCollapse) {
    const endCount = itemsAfterCollapse || 1;
    const startCount = typeof itemsBeforeCollapse === 'number'
      ? itemsBeforeCollapse
      : Math.max(1, totalItems - endCount - (totalItems - maxItems));

    startItems = itemsState.slice(0, startCount);
    collapsedItems = itemsState.slice(startCount, totalItems - endCount);
    endItems = itemsState.slice(totalItems - endCount);
  }

  // Toggle Route Enablement / Checkbox
  const handleCircleCheckClick = (e, item) => {
    e.stopPropagation();
    const updated = [...itemsState];
    const targetIdx = itemsState.findIndex((i) => (i.id ? i.id === item.id : i.label === item.label));
    if (targetIdx !== -1) {
      const newCheckedState = updated[targetIdx].isChecked === false ? true : false;
      updated[targetIdx] = {
        ...updated[targetIdx],
        isChecked: newCheckedState,
      };
      setItemsState(updated);
      if (onRouteToggle) onRouteToggle(updated[targetIdx], newCheckedState);
    }
  };

  // Toggle Bookmark / Star
  const handleBookmarkClick = (e, item) => {
    e.stopPropagation();
    const updated = [...itemsState];
    const targetIdx = itemsState.findIndex((i) => (i.id ? i.id === item.id : i.label === item.label));
    if (targetIdx !== -1) {
      const newStarState = !updated[targetIdx].isStar;
      updated[targetIdx] = {
        ...updated[targetIdx],
        isStar: newStarState,
      };
      setItemsState(updated);
      showToast(newStarState ? `★ Bookmarked "${item.label}"` : `Removed bookmark for "${item.label}"`);
      if (onBookmarkToggle) onBookmarkToggle(updated[targetIdx], newStarState);
    }
  };

  const renderSeparator = (key) => (
    <li className="kpmg-breadcrumbs__separator" aria-hidden="true" key={`sep-${key}`}>
      {activeSeparator}
    </li>
  );

  const renderItemLink = (item, isLast) => {
    const isCurrent = isLast || item.isCurrent;
    const handleClick = (e) => {
      if (item.onClick) item.onClick(e);
      if (onItemClick) onItemClick(item, e);
    };

    if (isCurrent) {
      return (
        <span className="kpmg-breadcrumbs__link kpmg-breadcrumbs__link--current" aria-current="page">
          {item.label}
        </span>
      );
    }

    if (item.href) {
      return (
        <a href={item.href} onClick={handleClick} className="kpmg-breadcrumbs__link">
          {item.label}
        </a>
      );
    }

    return (
      <button type="button" onClick={handleClick} className="kpmg-breadcrumbs__link">
        {item.label}
      </button>
    );
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={['kpmg-breadcrumbs', `kpmg-breadcrumbs--${size}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      {/* Toast Popup Notification for Bookmark Actions */}
      {toastMessage && (
        <div className="kpmg-breadcrumbs__toast" role="status">
          {toastMessage}
        </div>
      )}

      <ol className="kpmg-breadcrumbs__list">
        {/* Render Starting Visible Items */}
        {startItems.map((item, index) => {
          const isLast = !shouldCollapse && index === startItems.length - 1;
          return (
            <React.Fragment key={item.id || index}>
              <li className="kpmg-breadcrumbs__item">
                {renderItemLink(item, isLast)}
              </li>
              {(!isLast || shouldCollapse) && renderSeparator(`start-${index}`)}
            </React.Fragment>
          );
        })}

        {/* Render 3 Dots (...) Overflow Trigger right before the last link */}
        {shouldCollapse && (
          <>
            <li
              className="kpmg-breadcrumbs__item"
              ref={overflowRef}
              onMouseEnter={() => overflowTrigger === 'hover' && setIsOverflowOpen(true)}
              onMouseLeave={() => overflowTrigger === 'hover' && setIsOverflowOpen(false)}
            >
              <button
                type="button"
                aria-label="Show collapsed breadcrumbs"
                aria-expanded={isOverflowOpen}
                onClick={() => setIsOverflowOpen((prev) => !prev)}
                className={`kpmg-breadcrumbs__overflow-trigger ${isOverflowOpen ? 'kpmg-breadcrumbs__overflow-trigger--open' : ''}`}
              >
                ...
              </button>

              {/* Floating Dropdown Card with Top-Left Tooltip Pointer Arrow Pin */}
              {isOverflowOpen && (
                <ul className="kpmg-breadcrumbs__dropdown-card" role="menu">
                  {collapsedItems.map((collapsedItem, cIndex) => {
                    const isBookmarked = collapsedItem.isStar;
                    const isChecked = collapsedItem.isChecked !== false;

                    // Determine Front/Leading Icon (Circle Checkbox, Star/Bookmark, or Custom SVG)
                    let leadingIcon = collapsedItem.leadingIcon;
                    if (!leadingIcon) {
                      if (collapsedItem.useCircleCheckbox || collapsedItem.isCheckbox) {
                        leadingIcon = circleCheckboxIcon || <CircleCheckboxIconSvg checked={isChecked} />;
                      } else {
                        leadingIcon = starIcon || (isBookmarked ? <StarFilledIconSvg /> : <StarOutlineIconSvg />);
                      }
                    }

                    // Determine Trailing Icon (Checkmark or Custom SVG)
                    let trailingIcon = collapsedItem.trailingIcon;
                    if (!trailingIcon && isChecked && !collapsedItem.useCircleCheckbox) {
                      trailingIcon = checkIcon || <CheckmarkIconSvg />;
                    }

                    return (
                      <React.Fragment key={collapsedItem.id || cIndex}>
                        {/* Divider before item if specified */}
                        {collapsedItem.hasDivider && <li className="kpmg-breadcrumbs__dropdown-divider" aria-hidden="true" />}
                        <li role="none">
                          <a
                            href={collapsedItem.href || '#'}
                            onClick={(e) => {
                              if (collapsedItem.onClick) collapsedItem.onClick(e);
                              setIsOverflowOpen(false);
                            }}
                            className="kpmg-breadcrumbs__dropdown-item"
                            role="menuitem"
                          >
                            <span className="kpmg-breadcrumbs__dropdown-left">
                              {/* Left Icon (Circle Checkbox or Star Bookmark) */}
                              {collapsedItem.useCircleCheckbox || collapsedItem.isCheckbox ? (
                                <span
                                  className="kpmg-breadcrumbs__circle-checkbox"
                                  onClick={(e) => handleCircleCheckClick(e, collapsedItem)}
                                  title={isChecked ? 'Uncheck route' : 'Check route'}
                                >
                                  {leadingIcon}
                                </span>
                              ) : (
                                <span
                                  className={`kpmg-breadcrumbs__star-button ${isBookmarked ? 'kpmg-breadcrumbs__star-button--active' : ''}`}
                                  onClick={(e) => handleBookmarkClick(e, collapsedItem)}
                                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark route'}
                                >
                                  {leadingIcon}
                                </span>
                              )}
                              <span>{collapsedItem.label}</span>
                            </span>

                            {/* Right Trailing Icon (Checkmark) */}
                            {trailingIcon && (
                              <span className="kpmg-breadcrumbs__dropdown-right">
                                <span className="kpmg-breadcrumbs__trailing-check">{trailingIcon}</span>
                              </span>
                            )}
                          </a>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              )}
            </li>
            {endItems.length > 0 && renderSeparator('overflow')}
          </>
        )}

        {/* Render Ending Visible Items (Last Link) */}
        {endItems.map((item, index) => {
          const isLast = index === endItems.length - 1;
          return (
            <React.Fragment key={item.id || index}>
              <li className="kpmg-breadcrumbs__item">
                {renderItemLink(item, isLast)}
              </li>
              {!isLast && renderSeparator(`end-${index}`)}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  /** Array of breadcrumb items (strings or item objects) */
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.node.isRequired,
        href: PropTypes.string,
        isCurrent: PropTypes.bool,
        leadingIcon: PropTypes.node,
        trailingIcon: PropTypes.node,
        useCircleCheckbox: PropTypes.bool,
        isCheckbox: PropTypes.bool,
        isStar: PropTypes.bool,
        isChecked: PropTypes.bool,
        hasDivider: PropTypes.bool,
        onClick: PropTypes.func,
      }),
    ])
  ).isRequired,
  /** Maximum number of visible items before collapsing into ... overflow */
  maxItems: PropTypes.number,
  /** Number of visible items before collapse point */
  itemsBeforeCollapse: PropTypes.number,
  /** Number of visible items after collapse point */
  itemsAfterCollapse: PropTypes.number,
  /** Separator character or node (default: exact Figma SlashForwardIconSvg) */
  separator: PropTypes.node,
  /** Size scale (sm: 12px, md: 14px) */
  size: PropTypes.oneOf(['sm', 'md']),
  /** Overflow trigger mode ('click' or 'hover') */
  overflowTrigger: PropTypes.oneOf(['click', 'hover']),
  /** Custom SVG for Circle Checkbox */
  circleCheckboxIcon: PropTypes.node,
  /** Custom SVG for Star / Bookmark */
  starIcon: PropTypes.node,
  /** Custom SVG for Trailing Checkmark */
  checkIcon: PropTypes.node,
  /** Callback when route check status toggled */
  onRouteToggle: PropTypes.func,
  /** Callback when bookmark star toggled */
  onBookmarkToggle: PropTypes.func,
  /** Callback when item clicked */
  onItemClick: PropTypes.func,
  /** Custom CSS class names */
  className: PropTypes.string,
};

export default Breadcrumbs;
