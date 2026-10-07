import React, { useState, useRef, useEffect, useId, forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css';

/**
 * Icons used within Tooltip variants
 */
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

/**
 * KPMG WorkBench Tooltip Component
 *
 * Highly scalable, token-driven tooltip system supporting:
 * - 2 Themes: Elevated (White surface + Elevation shadow) and Filled (Lavender tinted + Shadow)
 * - Content Variants: Single-line, Multi-line, Rich Action, Rich Source, Rich Alert (Small/Large), Menu List, Menu Icon
 * - 3 Caret Dimensions: Small (12x6), Medium (18x9), Large (24x12)
 * - 12 Positional Alignments: Top (L/C/R), Bottom (L/C/R), Left (T/M/B), Right (T/M/B)
 * - Interactive Triggers: Hover, Click, and Manual/Controlled modes
 * - Full WAI-ARIA accessibility compliance
 */
export const Tooltip = forwardRef(({
  children,
  title,
  content,
  theme = 'elevated',
  variant = 'single-line',
  placement = 'top',
  align,
  caret = true,
  caretSize,
  trigger = 'hover',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delay = 150,
  closeDelay = 150,
  actions,
  items,
  sectionLabel,
  static: isStatic = false,
  className = '',
  style = {},
  id: explicitId,
  ...restProps
}, ref) => {
  const generatedId = useId();
  const tooltipId = explicitId || `kpmg-tooltip-${generatedId}`;

  // Internal open state for uncontrolled usage
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const timerRef = useRef(null);
  const wrapperRef = useRef(null);

  const setOpenState = (nextOpen) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    if (onOpenChange) {
      onOpenChange(nextOpen);
    }
  };

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
  }, [trigger, isOpen, isStatic]);

  // Cleanup timer
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // Determine caret size based on variant if not explicitly provided
  const resolvedCaretSize = caretSize || (
    variant === 'single-line' ? 'sm' :
    variant === 'multi-line' ? 'md' : 'lg'
  );

  // Default alignment per placement
  const effectiveAlign = align || (
    ['top', 'bottom'].includes(placement) ? 'center' : 'middle'
  );

  // Normalize placement name
  const normalizedPlacement = placement === 'side-l' ? 'left' : placement === 'side-r' ? 'right' : placement;

  // Determine category for styling
  const isRichVariant = ['rich-action', 'rich-source', 'rich-alert-small', 'rich-alert-large'].includes(variant);
  const isMenuVariant = ['menu-list', 'menu-icon'].includes(variant);
  const baseCategory = isRichVariant ? 'rich' : isMenuVariant ? 'menu' : variant;

  const tooltipClasses = [
    'kpmg-tooltip',
    `kpmg-tooltip--${theme}`,
    `kpmg-tooltip--${baseCategory}`,
    !isStatic ? `kpmg-tooltip--placement-${normalizedPlacement}` : '',
    !isStatic ? `kpmg-tooltip--align-${effectiveAlign}` : '',
    (isOpen || isStatic) ? 'kpmg-tooltip--visible' : '',
    isStatic ? 'kpmg-tooltip--static' : '',
    className,
  ].filter(Boolean).join(' ');

  // Render tooltip inner contents based on variant
  const renderContent = () => {
    if (content && typeof content !== 'string') {
      return content;
    }

    switch (variant) {
      case 'rich-action':
        return (
          <>
            <div className="kpmg-tooltip__header">
              {title && <h4 className="kpmg-tooltip__title">{title}</h4>}
              {content && <p className="kpmg-tooltip__body">{content}</p>}
            </div>
            <div className="kpmg-tooltip__actions">
              {actions ? (
                Array.isArray(actions) ? (
                  actions.map((act, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={act.onClick}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '1000px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        border: act.variant === 'outline' ? '1px solid var(--color-blue-200)' : 'none',
                        background: act.variant === 'outline' ? 'transparent' : 'var(--color-primary-action)',
                        color: act.variant === 'outline' ? 'var(--color-blue-200)' : '#ffffff',
                      }}
                    >
                      {act.label}
                    </button>
                  ))
                ) : (
                  actions
                )
              ) : (
                <>
                  <button
                    type="button"
                    style={{
                      padding: '6px 16px',
                      borderRadius: '1000px',
                      fontSize: '12px',
                      fontWeight: '500',
                      border: 'none',
                      background: 'var(--color-primary-action)',
                      color: '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    Label
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: '6px 16px',
                      borderRadius: '1000px',
                      fontSize: '12px',
                      fontWeight: '500',
                      border: '1px solid var(--color-blue-200)',
                      background: 'transparent',
                      color: 'var(--color-blue-200)',
                      cursor: 'pointer',
                    }}
                  >
                    Label
                  </button>
                </>
              )}
            </div>
          </>
        );

      case 'rich-source':
        return (
          <>
            <div className="kpmg-tooltip__header">
              {title && <h4 className="kpmg-tooltip__title">{title}</h4>}
              {content && <p className="kpmg-tooltip__body">{content}</p>}
            </div>
            <div className="kpmg-tooltip__card-list">
              {(items || [
                { id: '1', label: 'Option', checked: true, isStar: true },
                { id: '2', label: 'Option', checked: true, isStar: true },
                { id: '3', label: 'Option', checked: true, isStar: true },
                { id: '4', label: 'Option', checked: true, isStar: true },
              ]).map((it, idx) => (
                <div
                  key={it.id || idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    fontSize: '13px',
                    borderBottom: idx < 3 ? '1px solid var(--color-neutral-600)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TooltipStarIcon size={14} />
                    <span>{it.label}</span>
                  </div>
                  {it.checked && <TooltipCheckIcon size={14} style={{ color: 'var(--color-neutral-200)' }} />}
                </div>
              ))}
            </div>
          </>
        );

      case 'rich-alert-small':
      case 'rich-alert-large': {
        const defaultAlertItems = variant === 'rich-alert-large'
          ? [
              { id: '1', title: 'Header', subtitle: 'Supporting line...' },
              { id: '2', title: 'Header', subtitle: 'Supporting line...' },
            ]
          : [
              { id: '1', title: 'Header', subtitle: 'Supporting line...' },
            ];
        const cardItems = items || defaultAlertItems;

        return (
          <>
            <div className="kpmg-tooltip__header">
              {title && <h4 className="kpmg-tooltip__title">{title}</h4>}
              {content && <p className="kpmg-tooltip__body">{content}</p>}
            </div>
            {sectionLabel && <div className="kpmg-tooltip__section-label">{sectionLabel}</div>}
            <div className="kpmg-tooltip__card-list">
              {cardItems.map((item, idx) => (
                <div key={item.id || idx} className="kpmg-tooltip__card-item">
                  <div className="kpmg-tooltip__card-thumb" />
                  <div className="kpmg-tooltip__card-info">
                    <span className="kpmg-tooltip__card-title">{item.title}</span>
                    {item.subtitle && <span className="kpmg-tooltip__card-subtitle">{item.subtitle}</span>}
                  </div>
                  <button type="button" className="kpmg-tooltip__card-action" aria-label="More options">
                    <TooltipMoreIcon size={16} />
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      }

      case 'menu-list': {
        const menuItems = items || [
          { id: '1', label: 'Option', checked: true },
          { id: '2', label: 'Option', checked: true, divider: true },
          { id: '3', label: 'Option', checked: true },
          { id: '4', label: 'Option', checked: true },
          { id: '5', label: 'Option', checked: true, divider: true },
          { id: '6', label: 'Option', checked: true },
        ];

        return (
          <ul className="kpmg-tooltip__menu-list" role="menu">
            {menuItems.map((item, idx) => (
              <React.Fragment key={item.id || idx}>
                <li className="kpmg-tooltip__menu-item" role="menuitem">
                  <div className="kpmg-tooltip__menu-left">
                    <TooltipCircleCheckIcon size={16} style={{ color: 'var(--color-neutral-000)' }} />
                    <span>{item.label}</span>
                  </div>
                </li>
                {item.divider && <li className="kpmg-tooltip__menu-divider" role="separator" />}
              </React.Fragment>
            ))}
          </ul>
        );
      }

      case 'menu-icon': {
        const iconItems = items || [
          { id: '1', label: 'Option', checked: true },
          { id: '2', label: 'Option', checked: true, divider: true },
          { id: '3', label: 'Option', checked: true },
          { id: '4', label: 'Option', checked: true },
          { id: '5', label: 'Option', checked: true, divider: true },
          { id: '6', label: 'Option', checked: true },
        ];

        return (
          <ul className="kpmg-tooltip__menu-list" role="menu">
            {iconItems.map((item, idx) => (
              <React.Fragment key={item.id || idx}>
                <li className="kpmg-tooltip__menu-item" role="menuitem">
                  <div className="kpmg-tooltip__menu-left">
                    <TooltipStarIcon size={16} style={{ color: 'var(--color-neutral-200)' }} />
                    <span>{item.label}</span>
                  </div>
                  {item.checked && <TooltipCheckIcon size={14} style={{ color: 'var(--color-neutral-200)' }} />}
                </li>
                {item.divider && <li className="kpmg-tooltip__menu-divider" role="separator" />}
              </React.Fragment>
            ))}
          </ul>
        );
      }

      case 'multi-line':
        return (
          <div className="kpmg-tooltip__body">
            {content || 'Supporting text. Body text string goes here. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt.'}
          </div>
        );

      case 'single-line':
      default:
        return <span>{content || title || 'Supporting text'}</span>;
    }
  };

  const tooltipNode = (
    <div
      ref={ref}
      id={tooltipId}
      role={isMenuVariant ? 'menu' : 'tooltip'}
      aria-hidden={!isOpen && !isStatic}
      className={tooltipClasses}
      style={style}
      {...restProps}
    >
      {renderContent()}

      {caret && (
        <span
          className={`kpmg-tooltip__caret kpmg-tooltip__caret--${resolvedCaretSize}`}
          aria-hidden="true"
        />
      )}
    </div>
  );

  // If used as a static standalone component (e.g. documentation, stories, preview cards)
  if (isStatic || !children) {
    return tooltipNode;
  }

  // Wrapped around an anchor trigger element
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
        aria-describedby={!isMenuVariant ? tooltipId : undefined}
        aria-haspopup={isMenuVariant ? 'true' : undefined}
        aria-expanded={isMenuVariant ? (isOpen ? 'true' : 'false') : undefined}
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
  /** Header title displayed inside rich tooltips */
  title: PropTypes.node,
  /** Text content or custom React node inside the tooltip */
  content: PropTypes.node,
  /** Surface color treatment: elevated (white + shadow) or filled (lavender tint + shadow) */
  theme: PropTypes.oneOf(['elevated', 'filled']),
  /** Structural format of tooltip content */
  variant: PropTypes.oneOf([
    'single-line',
    'multi-line',
    'rich-action',
    'rich-source',
    'rich-alert-small',
    'rich-alert-large',
    'menu-list',
    'menu-icon',
    'custom',
  ]),
  /** Placement direction relative to target element */
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'side-l', 'side-r']),
  /** Alignment of tooltip along the placement axis */
  align: PropTypes.oneOf(['center', 'left', 'right', 'middle', 'top', 'bottom']),
  /** Whether to render the directional caret arrow */
  caret: PropTypes.bool,
  /** Size of caret arrow: sm (12x6), md (18x9), lg (24x12). Auto-derived if omitted */
  caretSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Interaction mode to trigger tooltip visibility */
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
  /** Action buttons array or custom node for rich-action variant */
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  /** Items array for menu or alert card variants */
  items: PropTypes.array,
  /** Section heading label for rich alerts (e.g. 'Secondary text') */
  sectionLabel: PropTypes.string,
  /** Render as a static inline element without target wrapper */
  static: PropTypes.bool,
  /** Additional CSS class */
  className: PropTypes.string,
  /** Inline style overrides */
  style: PropTypes.object,
  /** Explicit HTML ID */
  id: PropTypes.string,
};

export default Tooltip;
