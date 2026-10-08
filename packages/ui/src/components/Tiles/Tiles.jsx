import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import './Tiles.css';

/* ==========================================================================
   CANONICAL FIGMA SVG COMPONENTS
   ========================================================================== */

/** Error / Alert Circle Icon (24x24) - Exact Figma Vector */
export const TileAlertCircleIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12 2C17.523 2 22 6.478 22 12C22 17.522 17.523 22 12 22C6.477 22 2 17.522 2 12C2 6.478 6.477 2 12 2ZM12 3.667C7.405 3.667 3.667 7.405 3.667 12C3.667 16.595 7.405 20.333 12 20.333C16.595 20.333 20.333 16.595 20.333 12C20.333 7.405 16.595 3.667 12 3.667ZM11.9987 14.5022C12.5502 14.5022 12.9973 14.9494 12.9973 15.5009C12.9973 16.0524 12.5502 16.4996 11.9987 16.4996C11.4471 16.4996 11 16.0524 11 15.5009C11 14.9494 11.4471 14.5022 11.9987 14.5022ZM11.9945 7C12.3742 6.9997 12.6882 7.2816 12.7381 7.64764L12.7451 7.7494L12.7487 12.251C12.749 12.6652 12.4135 13.0013 11.9993 13.0016C11.6196 13.0019 11.3055 12.72 11.2556 12.354L11.2487 12.2522L11.2451 7.7506C11.2447 7.33639 11.5802 7.00033 11.9945 7Z"
      fill={color}
    />
  </svg>
);

/** Action Arrow Right Icon (24x24) - Exact Figma Vector */
export const TileArrowRightIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M13.2673 4.20926C12.9674 3.92357 12.4926 3.93511 12.2069 4.23504C11.9212 4.53497 11.9328 5.0097 12.2327 5.29539L18.4841 11.25H3.75C3.33579 11.25 3 11.5858 3 12C3 12.4142 3.33579 12.75 3.75 12.75H18.4842L12.2327 18.7047C11.9328 18.9904 11.9212 19.4651 12.2069 19.7651C12.4926 20.065 12.9674 20.0765 13.2673 19.7908L20.6862 12.7241C20.8551 12.5632 20.9551 12.358 20.9861 12.1446C20.9952 12.0978 21 12.0495 21 12C21 11.9504 20.9952 11.902 20.986 11.8551C20.955 11.6419 20.855 11.4368 20.6862 11.276L13.2673 4.20926Z"
      fill={color}
    />
  </svg>
);

/** More Vertical 3-Dots Menu Icon (24x24) - Exact Figma Vector */
export const TileMoreVerticalIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12 7.75C11.0335 7.75 10.25 6.9665 10.25 6C10.25 5.0335 11.0335 4.25 12 4.25C12.9665 4.25 13.75 5.0335 13.75 6C13.75 6.9665 12.9665 7.75 12 7.75ZM12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75ZM10.25 18C10.25 18.9665 11.0335 19.75 12 19.75C12.9665 19.75 13.75 18.9665 13.75 18C13.75 17.0335 12.9665 16.25 12 16.25C11.0335 16.25 10.25 17.0335 10.25 18Z"
      fill={color}
    />
  </svg>
);

/** Action Checkbox Checked Icon (24x24) - Exact Figma Vector */
export const TileCheckboxIcon = ({ size = 24, color = '#454554', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12.0283 2.2937C17.5512 2.2937 22.0283 6.77085 22.0283 12.2937C22.0283 17.8165 17.5512 22.2937 12.0283 22.2937C6.50547 22.2937 2.02832 17.8165 2.02832 12.2937C2.02832 6.77085 6.50547 2.2937 12.0283 2.2937ZM15.248 9.26337L10.7783 13.733L8.80865 11.7634C8.51576 11.4705 8.04088 11.4705 7.74799 11.7634C7.4551 12.0563 7.4551 12.5311 7.74799 12.824L10.248 15.324C10.5409 15.6169 11.0158 15.6169 11.3087 15.324L16.3087 10.324C16.6015 10.0311 16.6015 9.55626 16.3087 9.26337C16.0158 8.97048 15.5409 8.97048 15.248 9.26337Z"
      fill={color}
    />
  </svg>
);

/** Word Document Badge Icon (28x28) */
export const TileWordDocIcon = ({ size = 28, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <rect width="28" height="28" rx="4" fill="#185ABD" />
    <path
      d="M19.5 6.5H12C11.1716 6.5 10.5 7.17157 10.5 8V10.5H19.5C20.3284 10.5 21 11.1716 21 12V20C21.8284 20 22.5 19.3284 22.5 18.5V9.5L19.5 6.5Z"
      fill="#2B7CD3"
    />
    <rect x="5.5" y="8" width="12" height="12" rx="2" fill="#103F91" />
    <text
      x="11.5"
      y="17.2"
      fontFamily="Open Sans, sans-serif"
      fontSize="10"
      fontWeight="700"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      W
    </text>
  </svg>
);

/** Heart Reaction Icon (20x20) */
export const TileHeartIcon = ({ size = 20, color = '#CF0E54', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12.8199 5.57959L11.9991 6.40209L11.1759 5.57884C9.07683 3.47978 5.67357 3.47978 3.5745 5.57884C1.47543 7.67791 1.47543 11.0812 3.5745 13.1802L11.4699 21.0756C11.7628 21.3685 12.2376 21.3685 12.5305 21.0756L20.432 13.1788C22.5264 11.0727 22.53 7.67904 20.4305 5.57959C18.3276 3.4767 14.9228 3.4767 12.8199 5.57959Z"
      fill={color}
    />
  </svg>
);

/** Bookmark Reaction Icon (20x20) */
export const TileBookmarkIcon = ({ size = 20, color = '#F4D533', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M6.19054 21.8539C5.6944 22.2109 5.00252 21.8563 5.00252 21.2451V6.24919C5.00252 4.45426 6.4576 2.99919 8.25252 2.99919H15.7509C17.5458 2.99919 19.0009 4.45426 19.0009 6.24919V21.2451C19.0009 21.8563 18.309 22.2109 17.8129 21.8539L12.0017 17.673L6.19054 21.8539Z"
      fill={color}
    />
  </svg>
);

/** Share Reaction Icon (20x20) */
export const TileShareIcon = ({ size = 20, color = '#1A28C1', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M6.7467 4H10.2109C10.6251 4 10.9609 4.33579 10.9609 4.75C10.9609 5.1297 10.6788 5.44349 10.3127 5.49315L10.2109 5.5H6.7467C5.55584 5.5 4.58106 6.42516 4.50189 7.59595L4.4967 7.75V17.25C4.4967 18.4409 5.42187 19.4156 6.59266 19.4948L6.7467 19.5H16.2474C17.4383 19.5 18.4131 18.5748 18.4922 17.404L18.4974 17.25V16.7522C18.4974 16.338 18.8332 16.0022 19.2474 16.0022C19.6271 16.0022 19.9409 16.2844 19.9906 16.6504L19.9974 16.7522V17.25C19.9974 19.2543 18.4251 20.8913 16.4466 20.9948L16.2474 21H6.7467C4.74244 21 3.10543 19.4276 3.0019 17.4492L2.9967 17.25V7.75C2.9967 5.74574 4.56907 4.10873 6.54755 4.0052L6.7467 4H10.2109ZM14.5007 6.54431V3.75C14.5007 3.12603 15.2075 2.78995 15.6877 3.1398L15.7699 3.20874L21.7645 8.95874C22.0442 9.22709 22.0697 9.65811 21.8408 9.95607L21.7646 10.0412L15.77 15.793C15.3197 16.2251 14.5878 15.9477 14.5078 15.3589L14.5007 15.2519V12.45L14.1799 12.4438C11.5224 12.4359 9.25084 13.5269 7.31507 15.745C6.81946 16.3129 5.8898 15.8769 6.00952 15.1327C6.83651 9.99233 9.60859 7.08828 14.1988 6.57443L14.5007 6.54431V3.75Z"
      fill={color}
    />
  </svg>
);

/* ==========================================================================
   SUBCOMPONENT: TILE HEADER
   ========================================================================== */

/**
 * TileHeader - Standard or filled header bar for tiles.
 * Supports 'with-menu' (3-dots overflow button) and 'with-button' (Arrow right action).
 */
export const TileHeader = forwardRef(({
  title = 'Header',
  type = 'with-menu', // 'with-menu' | 'with-button'
  style = 'default', // 'default' (44px) | 'filled' (76px)
  onAction,
  actionAriaLabel,
  className = '',
  ...props
}, ref) => {
  const isMenu = type === 'with-menu';

  return (
    <div
      ref={ref}
      className={`kpmg-tile-header kpmg-tile-header--${style} ${className}`}
      {...props}
    >
      <h3 className="kpmg-tile-header__title">{title}</h3>
      <button
        type="button"
        className="kpmg-tile-header__action"
        onClick={onAction}
        aria-label={actionAriaLabel || (isMenu ? 'Tile options menu' : 'Open tile details')}
      >
        {isMenu ? (
          <TileMoreVerticalIcon size={24} color="var(--color-on-surface, #454554)" />
        ) : (
          <TileArrowRightIcon size={24} color="var(--color-on-surface, #454554)" />
        )}
      </button>
    </div>
  );
});

TileHeader.displayName = 'TileHeader';

TileHeader.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(['with-menu', 'with-button']),
  style: PropTypes.oneOf(['default', 'filled']),
  onAction: PropTypes.func,
  actionAriaLabel: PropTypes.string,
  className: PropTypes.string,
};

/* ==========================================================================
   SUBCOMPONENT: TILE TASK CARD (Living to do list)
   ========================================================================== */

export const TileTaskCard = ({
  title = 'Header',
  supportingText = 'Supporting line text lorem ipsum\nSupporting line text lorem ipsum',
  progress = 30,
  completed = true,
  onToggle,
  className = '',
}) => {
  const [isChecked, setIsChecked] = useState(completed);

  const handleToggle = () => {
    const nextVal = !isChecked;
    setIsChecked(nextVal);
    if (onToggle) onToggle(nextVal);
  };

  return (
    <div className={`kpmg-tile-task-card ${className}`}>
      <div className="kpmg-tile-task-card__header">
        <h4 className="kpmg-tile-task-card__title">{title}</h4>
        <button
          type="button"
          className="kpmg-tile-task-card__checkbox"
          onClick={handleToggle}
          aria-label={`Mark ${title} as ${isChecked ? 'incomplete' : 'complete'}`}
        >
          <TileCheckboxIcon
            size={24}
            color={isChecked ? 'var(--color-primary-action, #1e49e2)' : '#454554'}
          />
        </button>
      </div>
      <div className="kpmg-tile-task-card__body">
        {supportingText.split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <div className="kpmg-tile-task-card__progress">
        <ProgressIndicator
          variant="linear"
          progress={isChecked ? 100 : progress}
          height={4}
        />
      </div>
    </div>
  );
};

TileTaskCard.propTypes = {
  title: PropTypes.string,
  supportingText: PropTypes.string,
  progress: PropTypes.number,
  completed: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

/* ==========================================================================
   SUBCOMPONENT: TILE REFERENCE CARD (References)
   ========================================================================== */

export const TileReferenceCard = ({
  title = 'Header',
  supportingText = 'Supporting line text. Lorem ipsum dolor sit amet, consectetur.',
  thumbGradient,
  className = '',
}) => (
  <div className={`kpmg-tile-ref-card ${className}`}>
    <div
      className="kpmg-tile-ref-card__thumb"
      style={thumbGradient ? { background: thumbGradient } : undefined}
    />
    <div className="kpmg-tile-ref-card__info">
      <h4 className="kpmg-tile-ref-card__title">{title}</h4>
      <p className="kpmg-tile-ref-card__desc">{supportingText}</p>
    </div>
  </div>
);

TileReferenceCard.propTypes = {
  title: PropTypes.string,
  supportingText: PropTypes.string,
  thumbGradient: PropTypes.string,
  className: PropTypes.string,
};

/* ==========================================================================
   SUBCOMPONENT: TILE STACKED CARD (Learning Hub & AI Forum)
   ========================================================================== */

export const TileStackedCard = ({
  authorInitials = 'AZ',
  authorName = 'Header',
  authorSubhead = 'Subhead',
  title = 'Title',
  subtitle = 'Subtitle',
  desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  hasWordBadge = false,
  showTags = false,
  showReactions = false,
  showAvatarGroup = false,
  initialLoved = false,
  initialWishlisted = false,
  initialShared = false,
  isLoved: controlledLoved,
  isWishlisted: controlledWishlisted,
  isShared: controlledShared,
  onLoveToggle,
  onWishlistToggle,
  onShareToggle,
  loveCount = '2.4K',
  wishlistCount = '2.4K',
  shareCount = '2.4K',
  className = '',
}) => {
  const [internalLoved, setInternalLoved] = useState(initialLoved);
  const [internalWishlisted, setInternalWishlisted] = useState(initialWishlisted);
  const [internalShared, setInternalShared] = useState(initialShared);

  const isLoved = controlledLoved !== undefined ? controlledLoved : internalLoved;
  const isWishlisted = controlledWishlisted !== undefined ? controlledWishlisted : internalWishlisted;
  const isShared = controlledShared !== undefined ? controlledShared : internalShared;

  const handleLoveClick = (e) => {
    e.stopPropagation();
    const nextVal = !isLoved;
    if (controlledLoved === undefined) setInternalLoved(nextVal);
    if (onLoveToggle) onLoveToggle(nextVal);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    const nextVal = !isWishlisted;
    if (controlledWishlisted === undefined) setInternalWishlisted(nextVal);
    if (onWishlistToggle) onWishlistToggle(nextVal);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const nextVal = !isShared;
    if (controlledShared === undefined) setInternalShared(nextVal);
    if (onShareToggle) onShareToggle(nextVal);
  };

  return (
    <div className={`kpmg-tile-stacked-card ${className}`}>
      {/* Author Row */}
      <div className="kpmg-tile-stacked-card__author">
        <div className="kpmg-tile-stacked-card__author-info">
          <div className="kpmg-tile-avatar">{authorInitials}</div>
          <div className="kpmg-tile-stacked-card__author-text">
            <span className="kpmg-tile-stacked-card__author-name">{authorName}</span>
            <span className="kpmg-tile-stacked-card__author-sub">{authorSubhead}</span>
          </div>
        </div>
        <button
          type="button"
          className="kpmg-tile-header__action"
          aria-label="Post options"
        >
          <TileMoreVerticalIcon size={20} color="var(--color-on-surface, #454554)" />
        </button>
      </div>

      {/* Media Banner */}
      <div className="kpmg-tile-stacked-card__banner">
        {hasWordBadge && (
          <div className="kpmg-tile-stacked-card__badge">
            <TileWordDocIcon size={28} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="kpmg-tile-stacked-card__content">
        <h4 className="kpmg-tile-stacked-card__title">{title}</h4>
        <div className="kpmg-tile-stacked-card__subhead">{subtitle}</div>
        <p className="kpmg-tile-stacked-card__desc">{desc}</p>

        {/* Optional Tags */}
        {showTags && (
          <div className="kpmg-tile-tags-row">
            <span className="kpmg-tile-tag-pill">Optional tag</span>
            <span className="kpmg-tile-tag-pill">Optional tag</span>
          </div>
        )}

        {/* Reactions Row (Learning Hub) */}
        {showReactions && (
          <div className="kpmg-tile-reactions-row" role="group" aria-label="Social reactions">
            <button
              type="button"
              className={`kpmg-tile-reaction-item ${isLoved ? 'kpmg-tile-reaction-item--active kpmg-tile-reaction-item--loved' : ''}`}
              onClick={handleLoveClick}
              aria-label={isLoved ? 'Unlike' : 'Like'}
              aria-pressed={isLoved}
            >
              <TileHeartIcon size={20} color={isLoved ? '#CF0E54' : '#9090a2'} />
              <span>{loveCount}</span>
            </button>
            <button
              type="button"
              className={`kpmg-tile-reaction-item ${isWishlisted ? 'kpmg-tile-reaction-item--active kpmg-tile-reaction-item--wishlisted' : ''}`}
              onClick={handleWishlistClick}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={isWishlisted}
            >
              <TileBookmarkIcon size={20} color={isWishlisted ? '#F4D533' : '#9090a2'} />
              <span>{wishlistCount}</span>
            </button>
            <button
              type="button"
              className={`kpmg-tile-reaction-item ${isShared ? 'kpmg-tile-reaction-item--active kpmg-tile-reaction-item--shared' : ''}`}
              onClick={handleShareClick}
              aria-label={isShared ? 'Unshare' : 'Share'}
              aria-pressed={isShared}
            >
              <TileShareIcon size={20} color={isShared ? '#1A28C1' : '#9090a2'} />
              <span>{shareCount}</span>
            </button>
          </div>
        )}

        {/* Avatar Group Cluster (AI Forum) */}
        {showAvatarGroup && (
          <div className="kpmg-tile-avatar-group">
            {['AZ', 'AZ', 'AZ', 'AZ', 'AZ'].map((initials, idx) => (
              <div key={idx} className="kpmg-tile-avatar-group__item">
                {initials}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

TileStackedCard.propTypes = {
  authorInitials: PropTypes.string,
  authorName: PropTypes.string,
  authorSubhead: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  desc: PropTypes.string,
  hasWordBadge: PropTypes.bool,
  showTags: PropTypes.bool,
  showReactions: PropTypes.bool,
  showAvatarGroup: PropTypes.bool,
  initialLoved: PropTypes.bool,
  initialWishlisted: PropTypes.bool,
  initialShared: PropTypes.bool,
  isLoved: PropTypes.bool,
  isWishlisted: PropTypes.bool,
  isShared: PropTypes.bool,
  onLoveToggle: PropTypes.func,
  onWishlistToggle: PropTypes.func,
  onShareToggle: PropTypes.func,
  loveCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wishlistCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shareCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

/* ==========================================================================
   MAIN COMPONENT: TILES (36 FIGMA VARIANTS + SUBCOMPONENTS)
   ========================================================================== */

/**
 * Tiles Component - KPMG WorkBench Design System 2026
 *
 * Implements all 36 Figma canonical variants across Basic and Special layouts:
 * - Surfaces: 'outlined' | 'elevated' | 'filled'
 * - Basic Types:
 *   1. 'empty-with-missing'
 *   2. 'empty'
 *   3. 'empty-full'
 *   4. 'configuring'
 *   5. 'loading'
 *   6. 'loading-full'
 * - Special Types:
 *   1. 'living-todo-list'
 *   2. 'references'
 *   3. 'learning-hub'
 *   4. 'ai-forum'
 *   5. 'project-tracker'
 *   6. 'empty-state'
 */
export const Tiles = forwardRef(({
  variant = 'basic', // 'basic' | 'special'
  style = 'outlined', // 'outlined' | 'elevated' | 'filled'
  type = 'empty-with-missing',
  title,
  headerStyle = 'default', // 'default' | 'filled'
  headerType, // 'with-menu' | 'with-button' (auto-inferred if omitted)
  progress = 80,
  alertMessage = 'Project data missing',
  emptyMessage = 'Empty state message',
  fluid = false,
  onAction,
  initialLoved,
  initialWishlisted,
  initialShared,
  onLoveToggle,
  onWishlistToggle,
  onShareToggle,
  children,
  className = '',
  ...props
}, ref) => {
  const [activeTab, setActiveTab] = useState(0);

  // Inferred defaults based on variant & type
  const isSpecial = variant === 'special';
  const isFullBleed = type === 'empty-full' || type === 'loading-full';

  // Inferred header title
  const resolvedTitle = title || (
    type === 'living-todo-list' ? 'Living to do list' :
    type === 'references' ? 'Tile title' :
    type === 'learning-hub' ? 'Learning hub' :
    type === 'ai-forum' ? 'AI forum' :
    type === 'project-tracker' ? 'Project tracker' :
    type === 'empty-state' ? 'Tile title' :
    'Header'
  );

  // Inferred header type
  const resolvedHeaderType = headerType || (
    type === 'living-todo-list' || variant === 'basic' ? 'with-menu' : 'with-button'
  );

  // Tile dimensions class name
  let dimensionClass = 'kpmg-tile--basic';
  if (isFullBleed) {
    dimensionClass = 'kpmg-tile--basic-full';
  } else if (isSpecial) {
    dimensionClass = `kpmg-tile--special-${type}`;
  }

  const containerClasses = [
    'kpmg-tile',
    `kpmg-tile--${style}`,
    dimensionClass,
    fluid ? 'kpmg-tile--fluid' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={containerClasses} {...props}>
      {/* 1. Header (Unless Full-Bleed) */}
      {!isFullBleed && (
        <TileHeader
          title={resolvedTitle}
          type={resolvedHeaderType}
          style={headerStyle}
          onAction={onAction}
        />
      )}

      {/* 2. Custom Children Override */}
      {children ? (
        <div className="kpmg-tile__body">{children}</div>
      ) : (
        /* 3. Canonical Figma Layouts */
        <div className="kpmg-tile__body">
          {/* BASIC: Empty with missing */}
          {type === 'empty-with-missing' && (
            <>
              <div className="kpmg-tile-alert">
                <span className="kpmg-tile-alert__text">{alertMessage}</span>
                <span className="kpmg-tile-alert__icon">
                  <TileAlertCircleIcon size={24} />
                </span>
              </div>
              <div className="kpmg-tile-inner-card">
                <div className="kpmg-tile-thumb" />
                <div className="kpmg-tile-empty-text">{emptyMessage}</div>
              </div>
            </>
          )}

          {/* BASIC: Empty */}
          {type === 'empty' && (
            <div className="kpmg-tile-inner-card" style={{ marginTop: '14px' }}>
              <div className="kpmg-tile-thumb" />
              <div className="kpmg-tile-empty-text">{emptyMessage}</div>
            </div>
          )}

          {/* BASIC: Empty Full */}
          {type === 'empty-full' && (
            <div className="kpmg-tile-inner-card kpmg-tile-inner-card--borderless">
              <div className="kpmg-tile-thumb" />
              <div className="kpmg-tile-empty-text">{emptyMessage}</div>
            </div>
          )}

          {/* BASIC: Configuring (Circular Progress) */}
          {type === 'configuring' && (
            <div className="kpmg-tile-inner-card" style={{ marginTop: '14px' }}>
              <div className="kpmg-tile-configuring">
                <ProgressIndicator
                  variant="circular"
                  progress={progress}
                  size="large"
                />
                <div>
                  <div className="kpmg-tile-configuring__label">Analysis in progress</div>
                  <div className="kpmg-tile-configuring__subtext">{progress}% complete</div>
                </div>
              </div>
            </div>
          )}

          {/* BASIC: Loading (Skeleton Shimmer) */}
          {type === 'loading' && (
            <div style={{ flex: 1, marginTop: '14px' }}>
              <div className="kpmg-tile-shimmer" />
            </div>
          )}

          {/* BASIC: Loading Full (Skeleton Shimmer) */}
          {type === 'loading-full' && (
            <div style={{ flex: 1, width: '100%', height: '100%' }}>
              <div className="kpmg-tile-shimmer kpmg-tile-shimmer--full" />
            </div>
          )}

          {/* SPECIAL: Living to do list */}
          {type === 'living-todo-list' && (
            <>
              {/* Tab Bar */}
              <div className="kpmg-tile-tabs" role="tablist">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === idx}
                    className={`kpmg-tile-tab-item ${activeTab === idx ? 'kpmg-tile-tab-item--active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    <span>Tab</span>
                    <span className="kpmg-tile-tab-badge">4</span>
                  </button>
                ))}
              </div>

              {/* 4 Task Cards */}
              <div className="kpmg-tile-task-list">
                {[1, 2, 3, 4].map((i) => (
                  <TileTaskCard
                    key={i}
                    title="Header"
                    progress={30}
                    completed={true}
                  />
                ))}
              </div>
            </>
          )}

          {/* SPECIAL: References */}
          {type === 'references' && (
            <div className="kpmg-tile-ref-list" style={{ marginTop: '12px' }}>
              {[1, 2, 3, 4].map((i) => (
                <TileReferenceCard
                  key={i}
                  title="Header"
                  supportingText="Supporting line text. Lorem ipsum dolor sit amet, consectetur."
                />
              ))}
            </div>
          )}

          {/* SPECIAL: Learning hub */}
          {type === 'learning-hub' && (
            <div className="kpmg-tile-stacked-grid" style={{ marginTop: '14px' }}>
              <TileStackedCard
                authorInitials="AZ"
                authorName="Header"
                authorSubhead="Subhead"
                title="Title"
                subtitle="Subtitle"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                hasWordBadge={true}
                showTags={true}
                showReactions={true}
                initialLoved={initialLoved}
                initialWishlisted={initialWishlisted}
                initialShared={initialShared}
                onLoveToggle={onLoveToggle}
                onWishlistToggle={onWishlistToggle}
                onShareToggle={onShareToggle}
              />
              <TileStackedCard
                authorInitials="AZ"
                authorName="Header"
                authorSubhead="Subhead"
                title="Title"
                subtitle="Subtitle"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                hasWordBadge={true}
                showTags={true}
                showReactions={true}
                initialLoved={initialLoved}
                initialWishlisted={initialWishlisted}
                initialShared={initialShared}
                onLoveToggle={onLoveToggle}
                onWishlistToggle={onWishlistToggle}
                onShareToggle={onShareToggle}
              />
            </div>
          )}

          {/* SPECIAL: AI forum */}
          {type === 'ai-forum' && (
            <div className="kpmg-tile-stacked-grid" style={{ marginTop: '14px' }}>
              <TileStackedCard
                authorInitials="AZ"
                authorName="Header"
                authorSubhead="Subhead"
                title="Title"
                subtitle="Subtitle"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                hasWordBadge={false}
                showAvatarGroup={true}
              />
              <TileStackedCard
                authorInitials="AZ"
                authorName="Header"
                authorSubhead="Subhead"
                title="Title"
                subtitle="Subtitle"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                hasWordBadge={false}
                showAvatarGroup={true}
              />
            </div>
          )}

          {/* SPECIAL: Project tracker */}
          {type === 'project-tracker' && (
            <div className="kpmg-tile-panels-col" style={{ marginTop: '14px' }}>
              <div className="kpmg-tile-panel kpmg-tile-panel--gradient" />
              <div className="kpmg-tile-panel kpmg-tile-panel--gradient" />
            </div>
          )}

          {/* SPECIAL: Empty state */}
          {type === 'empty-state' && (
            <div className="kpmg-tile-panels-col" style={{ marginTop: '14px' }}>
              <div className="kpmg-tile-panel kpmg-tile-panel--empty">
                <div className="kpmg-tile-thumb" />
                <div className="kpmg-tile-empty-text">{emptyMessage}</div>
              </div>
              <div className="kpmg-tile-panel kpmg-tile-panel--empty">
                <div className="kpmg-tile-thumb" />
                <div className="kpmg-tile-empty-text">{emptyMessage}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

Tiles.displayName = 'Tiles';

Tiles.propTypes = {
  variant: PropTypes.oneOf(['basic', 'special']),
  style: PropTypes.oneOf(['outlined', 'elevated', 'filled']),
  type: PropTypes.oneOf([
    'empty-with-missing',
    'empty',
    'empty-full',
    'configuring',
    'loading',
    'loading-full',
    'living-todo-list',
    'references',
    'learning-hub',
    'ai-forum',
    'project-tracker',
    'empty-state',
  ]),
  title: PropTypes.string,
  headerStyle: PropTypes.oneOf(['default', 'filled']),
  headerType: PropTypes.oneOf(['with-menu', 'with-button']),
  progress: PropTypes.number,
  alertMessage: PropTypes.string,
  emptyMessage: PropTypes.string,
  fluid: PropTypes.bool,
  onAction: PropTypes.func,
  initialLoved: PropTypes.bool,
  initialWishlisted: PropTypes.bool,
  initialShared: PropTypes.bool,
  onLoveToggle: PropTypes.func,
  onWishlistToggle: PropTypes.func,
  onShareToggle: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Tiles;
