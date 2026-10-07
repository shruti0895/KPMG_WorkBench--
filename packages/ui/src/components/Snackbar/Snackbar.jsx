import React, { useState, useEffect, useRef, forwardRef, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import './Snackbar.css';

/**
 * Close / Dismiss Icon (X)
 */
export const SnackbarCloseIcon = ({ size = 16, className = '', ...props }) => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

SnackbarCloseIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

/**
 * More Actions (Vertical Ellipsis) Icon
 */
export const SnackbarMoreIcon = ({ size = 16, className = '', ...props }) => (
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

SnackbarMoreIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

/**
 * KPMG WorkBench Snackbar Component
 *
 * Highly scalable, token-driven notification snackbar supporting:
 * - 10 Canonical Variants (5 Layout Sizes x 2 Outlines)
 * - Sizes: Single-line (64px), Two-line (76px), Extended (154px), Extended with header (194px), Extended with media (464px)
 * - Outline Treatments: Elevated (outline=false, resting shadow) & Outlined (outline=true, border stroke)
 * - Action buttons ("Action", "Longer action", or custom label) & dismiss close icon
 * - Up to 3 interactive media cards for rich content previews
 * - Timer auto-hide duration with pause on hover
 * - Full WAI-ARIA accessibility compliance (role="status" / role="alert")
 */
export const Snackbar = forwardRef(({
  open = true,
  message,
  header,
  description,
  size = 'single-line',
  outlined = false,
  action,
  actionLabel,
  onAction,
  closeable = true,
  onClose,
  autoHideDuration = null,
  items,
  role = 'status',
  className = '',
  style = {},
  ...restProps
}, ref) => {
  const [isVisible, setIsVisible] = useState(open);
  const timerRef = useRef(null);

  useEffect(() => {
    setIsVisible(open);
  }, [open]);

  // Auto-hide timer
  useEffect(() => {
    if (!isVisible || !autoHideDuration) return;

    timerRef.current = setTimeout(() => {
      handleClose();
    }, autoHideDuration);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isVisible, autoHideDuration]);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isVisible && autoHideDuration) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, autoHideDuration);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  // Derive effective action label & handler
  const resolvedActionLabel = actionLabel || (typeof action === 'string' ? action : (action?.label || null));
  const resolvedActionHandler = onAction || (action?.onClick || (() => {}));

  // Resolve size modifier
  const resolvedSizeClass = `kpmg-snackbar--${size}`;
  const resolvedOutlineClass = outlined ? 'kpmg-snackbar--outlined' : 'kpmg-snackbar--elevated';

  const snackbarClasses = [
    'kpmg-snackbar',
    resolvedSizeClass,
    resolvedOutlineClass,
    className,
  ].filter(Boolean).join(' ');

  // Default items for extended-media if none passed
  const mediaItems = items || (size === 'extended-media' ? [
    { id: '1', title: 'Header' },
    { id: '2', title: 'Header' },
    { id: '3', title: 'Header' },
  ] : []);

  // Action elements node
  const renderActions = () => {
    if (!resolvedActionLabel && !closeable && !React.isValidElement(action)) {
      return null;
    }

    return (
      <div className="kpmg-snackbar__actions">
        {React.isValidElement(action) ? (
          action
        ) : resolvedActionLabel ? (
          <button
            type="button"
            className="kpmg-snackbar__action-btn"
            onClick={resolvedActionHandler}
          >
            {resolvedActionLabel}
          </button>
        ) : null}

        {closeable && (
          <button
            type="button"
            className="kpmg-snackbar__close-btn"
            onClick={handleClose}
            aria-label="Dismiss notification"
          >
            <SnackbarCloseIcon size={16} />
          </button>
        )}
      </div>
    );
  };

  // Render layouts
  switch (size) {
    case 'single-line':
    case 'two-line':
      return (
        <div
          ref={ref}
          role={role}
          aria-live="polite"
          className={snackbarClasses}
          style={style}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...restProps}
        >
          <p className="kpmg-snackbar__message">
            {message || 'Snackbar text goes here'}
          </p>
          {renderActions()}
        </div>
      );

    case 'extended':
      return (
        <div
          ref={ref}
          role={role}
          aria-live="polite"
          className={snackbarClasses}
          style={style}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...restProps}
        >
          <div className="kpmg-snackbar__content">
            <p className="kpmg-snackbar__description">
              {description || message || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </p>
          </div>
          {renderActions()}
        </div>
      );

    case 'extended-header':
      return (
        <div
          ref={ref}
          role={role}
          aria-live="polite"
          className={snackbarClasses}
          style={style}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...restProps}
        >
          <div className="kpmg-snackbar__content">
            <h4 className="kpmg-snackbar__header">
              {header || 'Header'}
            </h4>
            <p className="kpmg-snackbar__description">
              {description || message || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </p>
          </div>
          {renderActions()}
        </div>
      );

    case 'extended-media':
      return (
        <div
          ref={ref}
          role={role}
          aria-live="polite"
          className={snackbarClasses}
          style={style}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...restProps}
        >
          <div className="kpmg-snackbar__content">
            <h4 className="kpmg-snackbar__header">
              {header || 'Header'}
            </h4>
            {(description || message) && (
              <p className="kpmg-snackbar__description">
                {description || message || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
              </p>
            )}
            <div className="kpmg-snackbar__media-list">
              {mediaItems.map((item, idx) => (
                <div key={item.id || idx} className="kpmg-snackbar__media-item">
                  <div className="kpmg-snackbar__media-thumb" />
                  <div className="kpmg-snackbar__media-info">
                    <span className="kpmg-snackbar__media-title">{item.title}</span>
                    {item.subtitle && <span className="kpmg-snackbar__media-subtitle">{item.subtitle}</span>}
                  </div>
                  <button
                    type="button"
                    className="kpmg-snackbar__media-action"
                    onClick={item.onAction}
                    aria-label="More media options"
                  >
                    <SnackbarMoreIcon size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {renderActions()}
        </div>
      );

    default:
      return (
        <div
          ref={ref}
          role={role}
          className={snackbarClasses}
          style={style}
          {...restProps}
        >
          <p className="kpmg-snackbar__message">{message}</p>
          {renderActions()}
        </div>
      );
  }
});

Snackbar.displayName = 'Snackbar';

Snackbar.propTypes = {
  /** Controls visibility of the snackbar */
  open: PropTypes.bool,
  /** Primary message text */
  message: PropTypes.node,
  /** Header title for extended variants */
  header: PropTypes.node,
  /** Detailed description text for extended variants */
  description: PropTypes.node,
  /** Size / layout form factor */
  size: PropTypes.oneOf([
    'single-line',
    'two-line',
    'extended',
    'extended-header',
    'extended-media',
  ]),
  /** Whether the snackbar has a border stroke (outline=true) or resting elevation shadow (outline=false) */
  outlined: PropTypes.bool,
  /** Action button configuration or custom React node */
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ]),
  /** Action button text label (e.g. "Action", "Longer action") */
  actionLabel: PropTypes.string,
  /** Callback fired when action button is clicked */
  onAction: PropTypes.func,
  /** Whether the dismiss close (X) icon button is shown */
  closeable: PropTypes.bool,
  /** Callback fired when snackbar is closed or autoHide expires */
  onClose: PropTypes.func,
  /** Duration in milliseconds after which snackbar automatically closes (null to disable) */
  autoHideDuration: PropTypes.number,
  /** Media cards list for extended-media variant */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      subtitle: PropTypes.string,
      onAction: PropTypes.func,
    })
  ),
  /** ARIA accessibility role */
  role: PropTypes.string,
  /** Additional CSS class */
  className: PropTypes.string,
  /** Inline style overrides */
  style: PropTypes.object,
};

/* ==========================================================================
   Snackbar Viewport Container & Provider for Imperative Usage
   ========================================================================== */
export const SnackbarContext = createContext({
  showSnackbar: () => {},
  hideSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarContainer = ({
  position = 'bottom-left',
  children,
  className = '',
}) => {
  return (
    <div className={`kpmg-snackbar-container kpmg-snackbar-container--${position} ${className}`}>
      {children}
    </div>
  );
};

SnackbarContainer.propTypes = {
  position: PropTypes.oneOf([
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'top-left',
    'top-center',
    'top-right',
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
};

export const SnackbarProvider = ({ children, defaultPosition = 'bottom-left' }) => {
  const [snackbars, setSnackbars] = useState([]);

  const showSnackbar = (options) => {
    const id = options.id || Date.now().toString();
    setSnackbars((prev) => [...prev, { ...options, id, open: true }]);
    return id;
  };

  const hideSnackbar = (id) => {
    setSnackbars((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <SnackbarContainer position={defaultPosition}>
        {snackbars.map((s) => (
          <Snackbar
            key={s.id}
            {...s}
            onClose={() => {
              hideSnackbar(s.id);
              if (s.onClose) s.onClose();
            }}
          />
        ))}
      </SnackbarContainer>
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.node,
  defaultPosition: PropTypes.string,
};

export default Snackbar;
