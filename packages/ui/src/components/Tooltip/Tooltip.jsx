import { useState, useRef, useEffect, useId, useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { DropdownItemGroup } from '../Menu/Menu';
import './Tooltip.css';

/* ==========================================================================
   ICONS
   ========================================================================== */

/** Check Icon (16x16) */
export const TooltipCheckIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/** Circle Check Icon (16x16) */
export const TooltipCircleCheckIcon = ({ size = 16, className = '', ...props }) => (
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
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/** Star Icon (16x16) */
export const TooltipStarIcon = ({ size = 16, className = '', filled = false, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/** More Vertical Icon (16x16) */
export const TooltipMoreIcon = ({ size = 16, className = '', ...props }) => (
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
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

/** Dropdown Checkbox Icon (20x20) matching Figma 1539:60254 */
export const TooltipCheckboxIcon = ({ checked = false, size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-tooltip-checkbox-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    {checked ? (
      <>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="var(--color-primary-action, #1e49e2)" />
        <path d="M7 12.5L10.5 16L17 9.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="var(--color-neutral-300, #b8b8c4)" strokeWidth="1.5" fill="none" />
    )}
  </svg>
);

/* ==========================================================================
   CARET ARROW COMPONENT (Vector 292 from Figma 1536:6318 / 1536:6315 / 1536:6311)
   ========================================================================== */

export const TooltipCaret = ({
  position = 'top',
  size = 'md',
  alignment = 'center',
  color = 'var(--color-tooltip-elevated-bg, #ffffff)',
  className = '',
}) => {
  const isSide = position === 'side-l' || position === 'side-r';

  let w = 18;
  let h = 9;
  if (size === 'sm') {
    w = 12;
    h = 6;
  } else if (size === 'lg') {
    w = 24;
    h = 12;
  }

  const svgWidth = isSide ? h : w;
  const svgHeight = isSide ? w : h;

  let pathD = '';
  if (position === 'top') {
    // Caret at top of tooltip, pointing UP
    pathD = `M0 ${h} L${w / 2} 0 L${w} ${h} Z`;
  } else if (position === 'bottom') {
    // Caret at bottom of tooltip, pointing DOWN
    pathD = `M0 0 L${w / 2} ${h} L${w} 0 Z`;
  } else if (position === 'side-l') {
    // Caret on left of tooltip, pointing LEFT
    pathD = `M${h} 0 L0 ${w / 2} L${h} ${w} Z`;
  } else if (position === 'side-r') {
    // Caret on right of tooltip, pointing RIGHT
    pathD = `M0 0 L${h} ${w / 2} L0 ${w} Z`;
  }

  return (
    <div
      className={`kpmg-tooltip__caret-slot kpmg-tooltip__caret-slot--${position} kpmg-tooltip__caret-slot--align-${alignment} ${className}`}
      aria-hidden="true"
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="kpmg-tooltip__caret-svg"
      >
        <path d={pathD} fill={color} />
      </svg>
    </div>
  );
};

TooltipCaret.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom', 'side-l', 'side-r']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  alignment: PropTypes.oneOf(['left', 'center', 'right', 'top', 'middle', 'bottom']),
  color: PropTypes.string,
  className: PropTypes.string,
};

/* ==========================================================================
   TOOLTIP COMPONENT - KPMG WorkBench Design System 2026 (Figma 1359:5192)
   ========================================================================== */

export const Tooltip = forwardRef(({
  children,
  type,
  variant,
  position,
  placement,
  alignment,
  align,
  theme = 'elevated',
  caret = true,
  caretSize,
  title,
  description,
  content,
  text,
  secondaryText,
  actions,
  items,
  onItemClick,
  menuDensity = 'small',
  menuType = 'checklist',
  selectedValues,
  defaultSelectedValues,
  onSelect,
  menuProps = {},
  trigger = 'hover',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delay = 150,
  closeDelay = 150,
  static: isStatic = false,
  width,
  minWidth,
  maxWidth,
  className = '',
  style = {},
  id: explicitId,
  ...restProps
}, ref) => {
  const generatedId = useId();
  const tooltipId = explicitId || `kpmg-tooltip-${generatedId}`;

  // Internal open state for uncontrolled trigger mode
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const timerRef = useRef(null);
  const wrapperRef = useRef(null);

  const setOpenState = useCallback(
    (nextOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      if (onOpenChange) {
        onOpenChange(nextOpen);
      }
    },
    [isControlled, onOpenChange]
  );

  const handleMouseEnter = () => {
    if (trigger !== 'hover' || isStatic) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOpenState(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (trigger !== 'hover' || isStatic) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOpenState(false);
    }, closeDelay);
  };

  const handleClick = (e) => {
    if (trigger !== 'click' || isStatic) return;
    e.stopPropagation();
    setOpenState(!isOpen);
  };

  const handleFocus = () => {
    if (trigger === 'hover' && !isStatic) {
      setOpenState(true);
    }
  };

  const handleBlur = () => {
    if (trigger === 'hover' && !isStatic) {
      setOpenState(false);
    }
  };

  // Close on outside click if click trigger
  useEffect(() => {
    if (trigger !== 'click' || !isOpen || isStatic) return;

    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenState(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [trigger, isOpen, isStatic, setOpenState]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // 1. Resolve canonical Type ('base-small' | 'base-large' | 'rich' | 'menu')
  const rawType = (type || variant || 'base-small').toLowerCase();
  let resolvedType = 'base-small';
  if (rawType === 'base-large' || rawType === 'multi-line') {
    resolvedType = 'base-large';
  } else if (
    rawType === 'rich' ||
    rawType === 'rich-action' ||
    rawType === 'rich-source' ||
    rawType === 'rich-alert-small' ||
    rawType === 'rich-alert-large'
  ) {
    resolvedType = 'rich';
  } else if (rawType === 'menu' || rawType === 'menu-list' || rawType === 'menu-icon') {
    resolvedType = 'menu';
  }

  // 2. Resolve canonical Position ('top' | 'bottom' | 'side-l' | 'side-r')
  let resolvedPosition = 'top';
  if (position) {
    const normPos = position.toLowerCase();
    if (normPos === 'bottom') resolvedPosition = 'bottom';
    else if (normPos === 'side-l' || normPos === 'left') resolvedPosition = 'side-l';
    else if (normPos === 'side-r' || normPos === 'right') resolvedPosition = 'side-r';
    else resolvedPosition = 'top';
  } else if (placement) {
    // Invert placement to caret edge position for anchored trigger mode
    const normPlacement = placement.toLowerCase();
    if (normPlacement === 'top') resolvedPosition = 'bottom';
    else if (normPlacement === 'bottom') resolvedPosition = 'top';
    else if (normPlacement === 'left') resolvedPosition = 'side-r';
    else if (normPlacement === 'right') resolvedPosition = 'side-l';
  }

  // 3. Resolve canonical Alignment ('left' | 'center' | 'right' | 'top' | 'middle' | 'bottom')
  const rawAlign = (alignment || align || '').toLowerCase();
  const isSide = resolvedPosition === 'side-l' || resolvedPosition === 'side-r';
  let resolvedAlignment;

  if (isSide) {
    if (rawAlign === 'top') resolvedAlignment = 'top';
    else if (rawAlign === 'bottom') resolvedAlignment = 'bottom';
    else resolvedAlignment = 'middle';
  } else {
    if (rawAlign === 'left') resolvedAlignment = 'left';
    else if (rawAlign === 'right') resolvedAlignment = 'right';
    else resolvedAlignment = 'center';
  }

  // 4. Resolve Caret Size ('sm' | 'md' | 'lg')
  const resolvedCaretSize = caretSize || (
    resolvedType === 'base-small' ? 'sm' :
    resolvedType === 'rich' ? 'lg' : 'md'
  );

  // 5. Caret Fill Color based on theme
  const caretColor = theme === 'filled'
    ? 'var(--color-tooltip-filled-bg, #f5f5fe)'
    : 'var(--color-tooltip-elevated-bg, #ffffff)';

  // 6. Interactive Anchor Placement Class for absolute positioning
  const interactivePlacementClass = !isStatic && children
    ? (placement ? `kpmg-tooltip--placement-${placement}` : `kpmg-tooltip--anchor-for-${resolvedPosition}`)
    : '';

  const tooltipClasses = [
    'kpmg-tooltip',
    `kpmg-tooltip--${resolvedType}`,
    `kpmg-tooltip--pos-${resolvedPosition}`,
    `kpmg-tooltip--align-${resolvedAlignment}`,
    `kpmg-tooltip--theme-${theme}`,
    (isOpen || isStatic || !children) ? 'kpmg-tooltip--visible' : '',
    (isStatic || !children) ? 'kpmg-tooltip--static' : '',
    interactivePlacementClass,
    className,
  ].filter(Boolean).join(' ');

  const combinedStyles = {
    ...(width ? { width, maxWidth: width } : {}),
    ...(minWidth ? { minWidth } : {}),
    ...(maxWidth ? { maxWidth } : {}),
    ...style,
  };

  // 7. Render Body Content according to canonical Figma specs
  const renderBody = () => {
    switch (resolvedType) {
      /* ===================================================================
         TYPE 1: BASE SMALL (Single-line compact label, Figma 1359:5193)
         =================================================================== */
      case 'base-small': {
        const displayText = content || text || description || title || 'Tooltip text';
        return (
          <div className="kpmg-tooltip__base-small">
            <span className="kpmg-tooltip__base-small-text">{displayText}</span>
          </div>
        );
      }

      /* ===================================================================
         TYPE 2: BASE LARGE (Multi-line description, Figma 1359:12283)
         =================================================================== */
      case 'base-large': {
        const displayText = content || description || text || (
          'Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        );
        return (
          <div className="kpmg-tooltip__base-large">
            <p className="kpmg-tooltip__base-large-text">{displayText}</p>
          </div>
        );
      }

      /* ===================================================================
         TYPE 3: RICH (Title, description, actions, Figma 1359:5195)
         =================================================================== */
      case 'rich': {
        const displayTitle = title !== undefined ? title : 'Title';
        const displayDesc = description || content || (
          'Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        );

        const defaultActions = [
          { label: 'Label', variant: 'primary' },
          { label: 'Label', variant: 'outline' },
        ];
        const actionItems = actions !== undefined ? actions : defaultActions;

        return (
          <div className="kpmg-tooltip__rich">
            <div className="kpmg-tooltip__rich-header">
              {displayTitle && <h4 className="kpmg-tooltip__rich-title">{displayTitle}</h4>}
              {displayDesc && <p className="kpmg-tooltip__rich-desc">{displayDesc}</p>}
            </div>

            {secondaryText && (
              <>
                <div className="kpmg-tooltip__divider" />
                <p className="kpmg-tooltip__rich-secondary">{secondaryText}</p>
              </>
            )}

            {actionItems && (
              <div className="kpmg-tooltip__rich-actions">
                {Array.isArray(actionItems) ? (
                  actionItems.map((act, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={act.onClick}
                      className={`kpmg-tooltip__rich-btn kpmg-tooltip__rich-btn--${act.variant || 'primary'}`}
                    >
                      {act.label || 'Label'}
                    </button>
                  ))
                ) : (
                  actionItems
                )}
              </div>
            )}
          </div>
        );
      }

      /* ===================================================================
         TYPE 4: MENU (Dropdown item groups, checkmarks, Figma 1359:5186)
         =================================================================== */
      case 'menu': {
        const defaultMenuItems = [
          { label: 'Option', value: 'Option 1', selected: true },
          { type: 'divider' },
          { label: 'Option', value: 'Option 2', selected: true },
          { label: 'Option', value: 'Option 3', selected: true },
          { label: 'Option', value: 'Option 4', selected: true },
          { label: 'Option', value: 'Option 5', selected: true },
          { type: 'divider' },
          { label: 'Option', value: 'Option 6', selected: true },
        ];

        // Normalize items so either legacy or DropdownItemGroup format works seamlessly
        const normalizedItems = items
          ? items.map((item, idx) => {
              if (item.type === 'divider' || item.divider) {
                return { type: 'divider' };
              }
              const itemVal = item.value || item.id || `opt-${idx}`;
              const isSelected = item.selected !== undefined ? item.selected : (item.checked ?? true);
              return {
                label: item.label || 'Option',
                value: itemVal,
                selected: isSelected,
                disabled: item.disabled,
                onClick: item.onClick,
              };
            })
          : defaultMenuItems;

        return (
          <div className="kpmg-tooltip__menu" role="menu">
            <DropdownItemGroup
              density={menuDensity}
              type={menuType}
              items={normalizedItems}
              selectedValues={selectedValues}
              defaultSelectedValues={defaultSelectedValues}
              onSelect={(val, nextSelected, item, e) => {
                if (onItemClick) onItemClick(item, e);
                if (onSelect) onSelect(val, nextSelected, item, e);
              }}
              {...menuProps}
            />
          </div>
        );
      }

      default:
        return null;
    }
  };

  // 8. Render Complete Tooltip (Caret + Body container with unified drop shadow)
  const tooltipNode = (
    <div
      ref={ref}
      id={tooltipId}
      role={resolvedType === 'menu' ? 'menu' : 'tooltip'}
      aria-hidden={!isOpen && !isStatic && Boolean(children)}
      className={tooltipClasses}
      style={combinedStyles}
      {...restProps}
    >
      {/* Position Top: Caret at top pointing up */}
      {caret && resolvedPosition === 'top' && (
        <TooltipCaret
          position="top"
          size={resolvedCaretSize}
          alignment={resolvedAlignment}
          color={caretColor}
        />
      )}

      {/* Position Side L: Caret at left pointing left */}
      {caret && resolvedPosition === 'side-l' && (
        <TooltipCaret
          position="side-l"
          size={resolvedCaretSize}
          alignment={resolvedAlignment}
          color={caretColor}
        />
      )}

      {/* Body Frame */}
      <div className="kpmg-tooltip__body-wrap">
        {renderBody()}
      </div>

      {/* Position Bottom: Caret at bottom pointing down */}
      {caret && resolvedPosition === 'bottom' && (
        <TooltipCaret
          position="bottom"
          size={resolvedCaretSize}
          alignment={resolvedAlignment}
          color={caretColor}
        />
      )}

      {/* Position Side R: Caret at right pointing right */}
      {caret && resolvedPosition === 'side-r' && (
        <TooltipCaret
          position="side-r"
          size={resolvedCaretSize}
          alignment={resolvedAlignment}
          color={caretColor}
        />
      )}
    </div>
  );

  // If standalone static usage (e.g. story preview, documentation)
  if (isStatic || !children) {
    return tooltipNode;
  }

  // Wrapped around an anchor trigger element (interactive hover/click trigger)
  return (
    <div
      ref={wrapperRef}
      className="kpmg-tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div
        className="kpmg-tooltip-target"
        onClick={handleClick}
        aria-describedby={resolvedType !== 'menu' ? tooltipId : undefined}
        aria-haspopup={resolvedType === 'menu' ? 'true' : undefined}
        aria-expanded={resolvedType === 'menu' ? (isOpen ? 'true' : 'false') : undefined}
      >
        {children}
      </div>

      {tooltipNode}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  /** The anchor trigger element that invokes the tooltip */
  children: PropTypes.node,
  /** Canonical Figma variant type: 'base-small' | 'base-large' | 'rich' | 'menu' */
  type: PropTypes.oneOf(['base-small', 'base-large', 'rich', 'menu']),
  /** Backward-compatible alias for type */
  variant: PropTypes.string,
  /** Edge of tooltip where caret is positioned: 'top' | 'bottom' | 'side-l' | 'side-r' */
  position: PropTypes.oneOf(['top', 'bottom', 'side-l', 'side-r']),
  /** Placement relative to target trigger element in interactive mode: 'top' | 'bottom' | 'left' | 'right' */
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Alignment of caret along the edge: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom' */
  alignment: PropTypes.oneOf(['left', 'center', 'right', 'top', 'middle', 'bottom']),
  /** Backward-compatible alias for alignment */
  align: PropTypes.oneOf(['left', 'center', 'right', 'top', 'middle', 'bottom']),
  /** Surface color theme: 'elevated' (pure white) or 'filled' (lavender container) */
  theme: PropTypes.oneOf(['elevated', 'filled']),
  /** Whether to render the directional caret arrow */
  caret: PropTypes.bool,
  /** Size of caret arrow: sm (12x6), md (18x9), lg (24x12) */
  caretSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Title text for rich tooltips */
  title: PropTypes.node,
  /** Description text for rich or base-large tooltips */
  description: PropTypes.node,
  /** Content text or node for tooltips */
  content: PropTypes.node,
  /** Shorthand text string for tooltips */
  text: PropTypes.node,
  /** Secondary section text for rich tooltips */
  secondaryText: PropTypes.node,
  /** Action buttons array or custom node for rich tooltips */
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  /** Items list array for menu tooltips */
  items: PropTypes.arrayOf(PropTypes.object),
  /** Callback fired when a menu item is clicked */
  onItemClick: PropTypes.func,
  /** Menu density for menu tooltip variant ('small' | 'medium' | 'large') */
  menuDensity: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Menu type for menu tooltip variant ('checklist' | 'item-list') */
  menuType: PropTypes.oneOf(['checklist', 'item-list']),
  /** Selected values array for menu tooltip */
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  /** Default selected values array for menu tooltip */
  defaultSelectedValues: PropTypes.arrayOf(PropTypes.string),
  /** Callback fired when a menu item selection changes */
  onSelect: PropTypes.func,
  /** Additional props passed to DropdownItemGroup */
  menuProps: PropTypes.object,
  /** Interaction mode to trigger tooltip visibility: 'hover' | 'click' | 'manual' */
  trigger: PropTypes.oneOf(['hover', 'click', 'manual']),
  /** Controlled open state */
  open: PropTypes.bool,
  /** Initial open state when uncontrolled */
  defaultOpen: PropTypes.bool,
  /** Callback fired when open state changes */
  onOpenChange: PropTypes.func,
  /** Milliseconds delay before opening on hover */
  delay: PropTypes.number,
  /** Milliseconds delay before closing on mouseleave */
  closeDelay: PropTypes.number,
  /** Render as a static inline element without target wrapper */
  static: PropTypes.bool,
  /** Explicit container width override */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Explicit container min-width override */
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Explicit container max-width override */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Additional CSS class */
  className: PropTypes.string,
  /** Inline style overrides */
  style: PropTypes.object,
  /** Explicit HTML ID */
  id: PropTypes.string,
};

export default Tooltip;
