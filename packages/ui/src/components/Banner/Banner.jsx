import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Banner.css';

/**
 * KPMG WorkBench Design System - Robot Icon SVG
 * Faithful vector rendering from the design system specifications.
 */
export const BannerRobotSvg = ({ className = '', style = {}, ...props }) => (
  <svg
    viewBox="0 0 14.0579 18"
    width="14"
    height="18"
    fill="currentColor"
    className={className}
    style={style}
    aria-hidden="true"
    {...props}
  >
    <g>
      <path d="M3.03279 8.92737H11.0889C11.9279 8.92737 12.6109 8.24437 12.6109 7.40541V1.52195C12.6109 0.682997 11.9279 0 11.0889 0H3.03279C2.19384 0 1.51084 0.682997 1.51084 1.52195V7.40541C1.51084 8.24437 2.19384 8.92737 3.03279 8.92737ZM2.58643 1.52195C2.58643 1.27457 2.78541 1.07559 3.03279 1.07559H11.0889C11.3363 1.07559 11.5353 1.27457 11.5353 1.52195V7.40541C11.5353 7.6528 11.3363 7.85178 11.0889 7.85178H3.03279C2.78541 7.85178 2.58643 7.6528 2.58643 7.40541V1.52195Z" />
      <path d="M4.87184 5.27543C5.32359 5.27543 5.68929 4.90973 5.68929 4.45799C5.68929 4.00624 5.32359 3.64054 4.87184 3.64054C4.42009 3.64054 4.05439 4.00624 4.05439 4.45799C4.05439 4.90973 4.42009 5.27543 4.87184 5.27543Z" />
      <path d="M9.05016 5.27543C9.50191 5.27543 9.86761 4.90973 9.86761 4.45799C9.86761 4.00624 9.50191 3.64054 9.05016 3.64054C8.59841 3.64054 8.23271 4.00624 8.23271 4.45799C8.23271 4.90973 8.59841 5.27543 9.05016 5.27543Z" />
      <path d="M7.0666 10.8204C2.64056 10.8204 0 12.7619 0 16.0101V16.6447C0.00537793 17.403 0.693753 18 1.56498 18H12.4123C13.3265 18 14.0525 17.3761 14.0579 16.5748V15.9456C14.0579 12.735 11.4442 10.8204 7.07198 10.8204H7.0666ZM12.9769 16.5694C12.9769 16.7362 12.7296 16.9244 12.4069 16.9244H1.56498C1.28533 16.9244 1.08096 16.7738 1.07559 16.6394V16.0101C1.07559 13.3965 3.25903 11.896 7.0666 11.896C9.27155 11.896 12.9769 12.4231 12.9769 15.9456V16.5694Z" />
    </g>
  </svg>
);

BannerRobotSvg.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * KPMG WorkBench Design System - Close Icon SVG
 */
export const BannerCloseSvg = ({ className = '', style = {}, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    className={className}
    style={style}
    aria-hidden="true"
    {...props}
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

BannerCloseSvg.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * KPMG WorkBench Design System - Banner Component
 * 
 * Banners display prominent messages at the top of the screen or container,
 * providing important information, configuration updates, or system alerts
 * without disrupting ongoing user activity.
 * 
 * Scalable Architecture:
 * - 2 Core States: Default (static solid) and Animated (dynamic ambient gradient)
 * - 6 Semantic Color Variants: Primary, Neutral, Info, Success, Warning, Critical
 *   -> Yielding a complete matrix of 12 production-ready variants
 * - Linear Progress Bar: Determinate (0-100%) and Indeterminate streaming modes
 * - Extensible leading icon, trailing actions, and dismiss controls
 */
export const Banner = forwardRef(({
  state = 'default',
  variant = 'primary',
  title = 'Configuring',
  detail,
  progress,
  showProgress,
  progressType,
  icon = <BannerRobotSvg />,
  onIconClick,
  action,
  dismissible = false,
  onClose,
  role = 'status',
  ariaLive = 'polite',
  className = '',
  style = {},
  children,
  ...restProps
}, ref) => {
  // Normalize state & variant
  const normalizedState = (state || 'default').toLowerCase();
  const normalizedVariant = (variant || 'primary').toLowerCase();

  // Determine progress display and value
  const hasExplicitProgress = progress !== undefined && progress !== null;
  const isProgressVisible = showProgress !== undefined
    ? showProgress
    : (hasExplicitProgress || detail !== undefined);

  // Compute progress number
  let numericProgress = 0;
  if (hasExplicitProgress) {
    numericProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);
  } else if (typeof detail === 'string' && detail.endsWith('%')) {
    const parsed = parseFloat(detail);
    if (!isNaN(parsed)) {
      numericProgress = Math.min(Math.max(parsed, 0), 100);
    }
  }

  // Determine progress bar mode: determinate or indeterminate
  const isIndeterminate = progressType === 'indeterminate' || (!hasExplicitProgress && normalizedState === 'animated' && !detail);

  // Format detail string if not explicitly passed but progress is given
  const displayDetail = detail !== undefined ? detail : (hasExplicitProgress ? `${numericProgress}%` : null);

  const bannerClasses = [
    'kpmg-banner',
    `kpmg-banner--state-${normalizedState}`,
    `kpmg-banner--${normalizedVariant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={bannerClasses}
      style={style}
      role={normalizedVariant === 'critical' ? 'alert' : role}
      aria-live={ariaLive}
      {...restProps}
    >
      <div className="kpmg-banner__lead">
        {icon && (
          <div
            className={`kpmg-banner__icon-container ${onIconClick ? 'kpmg-banner__icon-container--clickable' : ''}`}
            onClick={onIconClick}
            role={onIconClick ? 'button' : undefined}
            tabIndex={onIconClick ? 0 : undefined}
            aria-label={onIconClick ? 'Banner leading icon' : undefined}
          >
            <div className="kpmg-banner__icon-wrapper">
              {icon}
            </div>
          </div>
        )}

        <div className="kpmg-banner__status-group">
          {title && <p className="kpmg-banner__text-title">{title}</p>}
          {displayDetail && <p className="kpmg-banner__text-detail">{displayDetail}</p>}
          {children}
        </div>
      </div>

      {(isProgressVisible || action || dismissible || onClose) && (
        <div className="kpmg-banner__trailing">
          {isProgressVisible && (
            <div
              className="kpmg-banner__progress-frame"
              role="progressbar"
              aria-valuenow={isIndeterminate ? undefined : numericProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${title} progress`}
            >
              <div
                className={`kpmg-banner__progress-track ${isIndeterminate ? 'kpmg-banner__progress-track--indeterminate' : ''}`}
              >
                <div
                  className="kpmg-banner__progress-fill"
                  style={{
                    width: isIndeterminate ? undefined : `${numericProgress}%`,
                  }}
                />
              </div>
            </div>
          )}

          {action && <div className="kpmg-banner__actions">{action}</div>}

          {(dismissible || onClose) && (
            <button
              type="button"
              className="kpmg-banner__close-btn"
              onClick={onClose}
              aria-label="Dismiss banner"
            >
              <BannerCloseSvg />
            </button>
          )}
        </div>
      )}
    </div>
  );
});

Banner.displayName = 'Banner';

Banner.propTypes = {
  /** Visual state: default static container or animated ambient gradient */
  state: PropTypes.oneOf(['default', 'animated']),
  /** Semantic theme variant */
  variant: PropTypes.oneOf(['primary', 'neutral', 'info', 'success', 'warning', 'critical']),
  /** Primary status message or title */
  title: PropTypes.node,
  /** Secondary detail or percentage display (e.g. '30%') */
  detail: PropTypes.node,
  /** Numeric progress value (0 to 100) */
  progress: PropTypes.number,
  /** Whether the linear progress bar is visible */
  showProgress: PropTypes.bool,
  /** Type of progress bar: determinate or indeterminate streaming animation */
  progressType: PropTypes.oneOf(['determinate', 'indeterminate']),
  /** Leading icon component */
  icon: PropTypes.node,
  /** Optional click handler for leading icon */
  onIconClick: PropTypes.func,
  /** Optional custom action component on the right */
  action: PropTypes.node,
  /** Whether the banner includes a dismiss/close button */
  dismissible: PropTypes.bool,
  /** Callback fired when dismiss button is clicked */
  onClose: PropTypes.func,
  /** ARIA role */
  role: PropTypes.string,
  /** ARIA live region policy */
  ariaLive: PropTypes.oneOf(['off', 'polite', 'assertive']),
  /** Custom CSS class names */
  className: PropTypes.string,
  /** Inline CSS styles */
  style: PropTypes.object,
  /** Custom child content inside status group */
  children: PropTypes.node,
};

export default Banner;
