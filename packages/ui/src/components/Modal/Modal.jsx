import React, { useState, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import './Modal.css';

/* ==========================================================================
   CANONICAL FIGMA SVG COMPONENTS
   ========================================================================== */

/** Dismiss / Close X Icon (24x24) */
export const ModalCloseIcon = ({ size = 24, color = '#454554', ...props }) => (
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
      d="M4.39705 4.55379L4.46967 4.46967C4.73594 4.2034 5.1526 4.1792 5.44621 4.39705L5.53033 4.46967L12 10.939L18.4697 4.46967C18.7626 4.17678 19.2374 4.17678 19.5303 4.46967C19.8232 4.76256 19.8232 5.23744 19.5303 5.53033L13.061 12L19.5303 18.4697C19.7966 18.7359 19.8208 19.1526 19.6029 19.4462L19.5303 19.5303C19.2641 19.7966 18.8474 19.8208 18.5538 19.6029L18.4697 19.5303L12 13.061L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303C4.17678 19.2374 4.17678 18.7626 4.46967 18.4697L10.939 12L4.46967 5.53033C4.2034 5.26406 4.1792 4.8474 4.39705 4.55379L4.46967 4.46967L4.39705 4.55379Z"
      fill={color}
    />
  </svg>
);

/** Edit Pencil Icon (16x16) */
export const ModalEditIcon = ({ size = 16, color = '#454554', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M14.236 1.76386C13.2123 0.740172 11.5525 0.740171 10.5289 1.76386L2.65722 9.63549C2.28304 10.0097 2.01623 10.4775 1.88467 10.99L1.01571 14.3755C0.971767 14.5467 1.02148 14.7284 1.14646 14.8534C1.27144 14.9783 1.45312 15.028 1.62432 14.9841L5.00978 14.1151C5.52234 13.9836 5.99015 13.7168 6.36433 13.3426L14.236 5.47097C15.2596 4.44728 15.2596 2.78755 14.236 1.76386ZM11.236 2.47097C11.8691 1.8378 12.8957 1.8378 13.5288 2.47097C14.162 3.10413 14.162 4.1307 13.5288 4.76386L12.75 5.54269L10.4571 3.24979L11.236 2.47097ZM9.75002 3.9569L12.0429 6.24979L5.65722 12.6355C5.40969 12.883 5.10023 13.0595 4.76117 13.1465L2.19447 13.8053L2.85327 11.2386C2.9403 10.8996 3.1168 10.5901 3.36433 10.3426L9.75002 3.9569Z"
      fill={color}
    />
  </svg>
);

/** Info Circle Icon (16x16) */
export const ModalInfoIcon = ({ size = 16, color = '#454554', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M8.49902 7.49998C8.49902 7.22384 8.27517 6.99998 7.99902 6.99998C7.72288 6.99998 7.49902 7.22384 7.49902 7.49998V10.5C7.49902 10.7761 7.72288 11 7.99902 11C8.27517 11 8.49902 10.7761 8.49902 10.5V7.49998ZM8.74807 5.50001C8.74807 5.91369 8.41271 6.24905 7.99903 6.24905C7.58535 6.24905 7.25 5.91369 7.25 5.50001C7.25 5.08633 7.58535 4.75098 7.99903 4.75098C8.41271 4.75098 8.74807 5.08633 8.74807 5.50001ZM8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8Z"
      fill={color}
    />
  </svg>
);

/** Heart Icon (24x24) */
export const ModalHeartIcon = ({ size = 24, color = '#CF0E54', ...props }) => (
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

/** Bookmark Icon (24x24) */
export const ModalBookmarkIcon = ({ size = 24, color = '#F4D533', ...props }) => (
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

/** Share Icon (24x24) */
export const ModalShareIcon = ({ size = 24, color = '#1A28C1', ...props }) => (
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

/** Mic Icon (16x16) */
export const ModalMicIcon = ({ size = 16, color = '#454554', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M5.5 4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8V4.5ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5V8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8V4.5C9.5 3.67157 8.82843 3 8 3ZM4 7.5C4.27614 7.5 4.5 7.72386 4.5 8C4.5 9.933 6.067 11.5 8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8C12.5 10.3163 10.75 12.2238 8.5 12.4725V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V12.4725C5.25002 12.2238 3.5 10.3163 3.5 8C3.5 7.72386 3.72386 7.5 4 7.5Z"
      fill={color}
    />
  </svg>
);

/** More Vertical 3-Dots Menu Icon (24x24) */
export const ModalMoreVerticalIcon = ({ size = 24, color = '#454554', ...props }) => (
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

/** File Upload Arrow Icon (24x24) */
export const ModalUploadIcon = ({ size = 24, color = '#454554', ...props }) => (
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
      d="M12 3L6 9H10V16H14V9H18L12 3ZM4 19H20V21H4V19Z"
      fill={color}
    />
  </svg>
);

/* ==========================================================================
   SUBCOMPONENT: MODAL ITEM (PILL SECTION HEADER)
   ========================================================================== */

/**
 * ModalItem - Section header pill with icon action.
 * Corresponds to Figma subcomponent set:
 * Size: 'small' (42px) | 'large' (52px)
 * Selected: boolean
 * State: 'enabled' | 'hovered' | 'pressed'
 * Type: 'with-edit' | 'with-info' | 'with-exit'
 */
export const ModalItem = forwardRef(({
  label = 'Section header',
  size = 'large',
  type = 'with-edit',
  selected = false,
  state = 'enabled',
  onActionClick,
  className = '',
  style = {},
  ...props
}, ref) => {
  const normalizedSize = size?.toLowerCase() === 'small' ? 'small' : 'large';
  const normalizedState = state?.toLowerCase() || 'enabled';
  const normalizedType = type?.toLowerCase() || 'with-edit';

  const classNames = [
    'kpmg-modal-item',
    `kpmg-modal-item--${normalizedSize}`,
    selected ? 'kpmg-modal-item--selected' : '',
    normalizedState !== 'enabled' ? `kpmg-modal-item--${normalizedState}` : '',
    className,
  ].filter(Boolean).join(' ');

  const renderIcon = () => {
    if (normalizedType === 'with-info') {
      return <ModalInfoIcon size={16} />;
    }
    if (normalizedType === 'with-exit') {
      return <ModalCloseIcon size={16} />;
    }
    return <ModalEditIcon size={16} />;
  };

  return (
    <div className={classNames} ref={ref} style={style} {...props}>
      <div className="kpmg-modal-item__content">
        <span className="kpmg-modal-item__label">{label}</span>
      </div>
      <button
        type="button"
        className="kpmg-modal-item__action-btn"
        onClick={onActionClick}
        aria-label={`${label} action`}
      >
        {renderIcon()}
      </button>
    </div>
  );
});

ModalItem.displayName = 'ModalItem';

ModalItem.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large', 'Small', 'Large']),
  type: PropTypes.oneOf(['with-edit', 'with-info', 'with-exit', 'With edit', 'With info', 'With exit']),
  selected: PropTypes.bool,
  state: PropTypes.oneOf(['enabled', 'hovered', 'pressed', 'Enabled', 'Hovered', 'Pressed']),
  onActionClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

/* ==========================================================================
   SUBCOMPONENT: AGENT PREVIEW CARD
   ========================================================================== */

export const ModalAgentCard = ({
  avatar = 'AZ',
  title = 'Header',
  subhead = 'Subhead',
  badgeText = 'Assistant',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  reactions = { heart: '2.4K', bookmark: '2.4K', share: '2.4K' },
  onMenuClick,
  className = '',
  ...props
}) => (
  <div className={`kpmg-modal__agent-card ${className}`} {...props}>
    <div className="kpmg-modal__agent-top">
      <div className="kpmg-modal__agent-avatar">{avatar}</div>
      <div className="kpmg-modal__agent-meta">
        <h4 className="kpmg-modal__agent-header">{title}</h4>
        <p className="kpmg-modal__agent-subhead">{subhead}</p>
      </div>
      <button
        type="button"
        className="kpmg-modal__agent-menu-btn"
        onClick={onMenuClick}
        aria-label="Agent options"
      >
        <ModalMoreVerticalIcon size={20} />
      </button>
    </div>
    <div className="kpmg-modal__agent-details">
      <div className="kpmg-modal__agent-badge-row">
        <span className="kpmg-modal__agent-badge">{badgeText}</span>
        <p className="kpmg-modal__agent-desc">{description}</p>
      </div>
      <div className="kpmg-modal__agent-reactions">
        <div className="kpmg-modal__agent-reaction-item">
          <span className="kpmg-modal__agent-reaction-icon">
            <ModalHeartIcon size={20} />
          </span>
          <span>{reactions.heart}</span>
        </div>
        <div className="kpmg-modal__agent-reaction-item">
          <span className="kpmg-modal__agent-reaction-icon">
            <ModalBookmarkIcon size={20} />
          </span>
          <span>{reactions.bookmark}</span>
        </div>
        <div className="kpmg-modal__agent-reaction-item">
          <span className="kpmg-modal__agent-reaction-icon">
            <ModalShareIcon size={20} />
          </span>
          <span>{reactions.share}</span>
        </div>
      </div>
    </div>
  </div>
);

ModalAgentCard.displayName = 'ModalAgentCard';

/* ==========================================================================
   SUBCOMPONENT: MODAL CARD (FOR MODELS / VOICES)
   ========================================================================== */

export const ModalCard = ({
  title = 'Header',
  description = 'Supporting line text. Lorem ipsum dolor sit amet, consectetur.',
  thumbnail,
  selected = false,
  showCheck = true,
  onClick,
  className = '',
  ...props
}) => (
  <div
    className={`kpmg-modal-card ${selected ? 'kpmg-modal-card--selected' : ''} ${className}`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    }}
    {...props}
  >
    {thumbnail && <div className="kpmg-modal-card__thumb">{thumbnail}</div>}
    <div className="kpmg-modal-card__content">
      <div className="kpmg-modal-card__header-row">
        <h4 className="kpmg-modal-card__title">{title}</h4>
        {showCheck && <div className="kpmg-modal-card__check" />}
      </div>
      <p className="kpmg-modal-card__desc">{description}</p>
    </div>
  </div>
);

ModalCard.displayName = 'ModalCard';

/* ==========================================================================
   SUBCOMPONENT: PROMPT TEMPLATE ITEM
   ========================================================================== */

export const ModalPromptItem = ({
  title = 'Header',
  description = 'Supporting line text. Lorem ipsum dolor sit amet, consectetur.',
  onMenuClick,
  className = '',
  ...props
}) => (
  <div className={`kpmg-modal__prompt-item ${className}`} {...props}>
    <div className="kpmg-modal__prompt-content">
      <h4 className="kpmg-modal__prompt-title">{title}</h4>
      <p className="kpmg-modal__prompt-desc">{description}</p>
    </div>
    <button
      type="button"
      className="kpmg-modal__agent-menu-btn"
      onClick={onMenuClick}
      aria-label="Prompt options"
    >
      <ModalMoreVerticalIcon size={20} />
    </button>
  </div>
);

ModalPromptItem.displayName = 'ModalPromptItem';

/* ==========================================================================
   MAIN MODAL COMPONENT
   ========================================================================== */

/**
 * Modal Component - KPMG WorkBench Design System 2026
 *
 * Implements canonical modular dialog layout with all Figma modules:
 * - Header with title & 24px dismiss button
 * - Reusable Linear Progress Indicator
 * - Agent preview card with avatar and reaction metrics
 * - Name input module
 * - Purpose input module with mic action
 * - Knowledge base file drag & drop dropzone
 * - Prompt templates input & card list
 * - Model 2x2 selection grid
 * - Voice 2x2 selection grid
 * - Outlined Back & Filled Next action footer
 */
export const Modal = forwardRef(({
  isOpen = true,
  inline = false,
  title = 'Create an assistant',
  onClose,
  withProgress = false,
  progress = 80,
  agentModule = false,
  inputModule1 = false,
  inputModule2 = false,
  fileUploaderModule = false,
  inputModule3 = false,
  cardModule1 = false,
  cardModule2 = false,
  backLabel = 'Back',
  nextLabel = 'Next',
  onBack,
  onNext,
  showFooter = true,
  nameValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  purposeValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  promptValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  className = '',
  style = {},
  children,
  ...props
}, ref) => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen || inline) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, inline, onClose]);

  if (!isOpen) return null;

  // Model cards data
  const defaultModels = [
    { title: 'KPMG Private LLM', desc: 'Secure enterprise language model tailored for proprietary audits and advisory data.' },
    { title: 'GPT-4o Enterprise', desc: 'High capability model for multimodal analytical reasoning and summarization.' },
    { title: 'Claude 3.5 Sonnet', desc: 'Strong instruction adherence and nuanced context synthesis for complex workflows.' },
    { title: 'Gemini 1.5 Pro', desc: 'Massive context processing for enterprise repository indexing and research.' },
  ];

  // Voice cards data
  const defaultVoices = [
    { title: 'Breeze', desc: 'Warm and conversational voice optimized for customer-facing client dialogues.' },
    { title: 'Echo', desc: 'Clear, crisp cadence ideal for executive briefings and synthesized summaries.' },
    { title: 'Alloy', desc: 'Neutral, professional tone balanced for analytical reports and documentation.' },
    { title: 'Onyx', desc: 'Deep, resonant timbre suitable for structured walkthroughs and compliance.' },
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((f) => f.name);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (idx, e) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const modalDialog = (
    <div
      className={`kpmg-modal ${inline ? 'kpmg-modal--inline' : ''} ${className}`}
      ref={ref}
      style={style}
      role="dialog"
      aria-modal={!inline}
      aria-labelledby="kpmg-modal-title"
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      <div className="kpmg-modal__inner">
        {/* Header */}
        <div className="kpmg-modal__header">
          <div className="kpmg-modal__header-bar">
            <h2 id="kpmg-modal-title" className="kpmg-modal__title">
              {title}
            </h2>
            <button
              type="button"
              className="kpmg-modal__close-btn"
              onClick={onClose}
              aria-label="Close modal dialog"
            >
              <ModalCloseIcon size={24} />
            </button>
          </div>
          <div className="kpmg-modal__divider" />
        </div>

        {/* Modal Body */}
        <div className="kpmg-modal__body">
          {/* Progress Indicator (reuses ProgressIndicator) */}
          {withProgress && (
            <div className="kpmg-modal__progress-wrapper">
              <ProgressIndicator
                variant="linear"
                type="determinate"
                progress={progress}
                aria-label={`Step progress: ${progress}%`}
              />
            </div>
          )}

          {/* Module: Agent Preview Card */}
          {agentModule && (
            <>
              <ModalAgentCard />
              <div className="kpmg-modal__divider" />
            </>
          )}

          {/* Module: Name Input */}
          {inputModule1 && (
            <>
              <ModalItem label="Name" type="with-edit" size="large" />
              <div className="kpmg-modal__textarea-container">
                <textarea
                  className="kpmg-modal__textarea"
                  defaultValue={nameValue}
                  placeholder="Enter assistant name..."
                  rows={4}
                />
              </div>
              <div className="kpmg-modal__divider" />
            </>
          )}

          {/* Module: Purpose Input */}
          {inputModule2 && (
            <>
              <ModalItem label="Purpose" type="with-edit" size="large" />
              <div className="kpmg-modal__textarea-container">
                <textarea
                  className="kpmg-modal__textarea"
                  defaultValue={purposeValue}
                  placeholder="Describe the purpose of this assistant..."
                  rows={4}
                />
                <button
                  type="button"
                  className="kpmg-modal__textarea-mic-btn"
                  aria-label="Voice dictation for purpose"
                >
                  <ModalMicIcon size={16} />
                </button>
              </div>
              <div className="kpmg-modal__divider" />
            </>
          )}

          {/* Module: Knowledge Base File Uploader */}
          {fileUploaderModule && (
            <>
              <ModalItem label="Knowledge base" type="with-info" size="large" />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple
                onChange={handleFileInput}
              />
              <div
                className={`kpmg-modal__dropzone ${isDragOver ? 'kpmg-modal__dropzone--dragover' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
              >
                <div className="kpmg-modal__dropzone-icon">
                  <ModalUploadIcon size={24} />
                </div>
                <p className="kpmg-modal__dropzone-text">
                  Drag and drop files or{' '}
                  <span className="kpmg-modal__dropzone-link">browse on computer</span>
                </p>
                {files.length > 0 && (
                  <div className="kpmg-modal__file-list">
                    {files.map((file, idx) => (
                      <span key={idx} className="kpmg-modal__file-tag">
                        {file}
                        <button
                          type="button"
                          className="kpmg-modal__file-remove-btn"
                          onClick={(e) => removeFile(idx, e)}
                          aria-label={`Remove file ${file}`}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="kpmg-modal__divider" />
            </>
          )}

          {/* Module: Prompt Templates */}
          {inputModule3 && (
            <>
              <ModalItem label="Prompt templates" type="with-edit" size="large" />
              <div className="kpmg-modal__textarea-container">
                <textarea
                  className="kpmg-modal__textarea"
                  defaultValue={promptValue}
                  placeholder="Enter prompt templates..."
                  rows={4}
                />
              </div>
              <div className="kpmg-modal__prompt-list">
                <ModalPromptItem
                  title="Header"
                  description="Supporting line text. Lorem ipsum dolor sit amet, consectetur."
                />
                <ModalPromptItem
                  title="Header"
                  description="Supporting line text. Lorem ipsum dolor sit amet, consectetur."
                />
              </div>
              <div className="kpmg-modal__divider" />
            </>
          )}

          {/* Module: Model Selection Grid */}
          {cardModule1 && (
            <>
              <ModalItem label="Model" type="with-info" size="large" />
              <div className="kpmg-modal__card-grid">
                {defaultModels.map((model, idx) => (
                  <ModalCard
                    key={idx}
                    title={model.title}
                    description={model.desc}
                    selected={selectedModel === idx}
                    onClick={() => setSelectedModel(idx)}
                  />
                ))}
              </div>
              <div className="kpmg-modal__divider" />
            </>
          )}

          {/* Module: Voice Selection Grid */}
          {cardModule2 && (
            <>
              <ModalItem label="Voice" type="with-info" size="large" />
              <div className="kpmg-modal__card-grid">
                {defaultVoices.map((voice, idx) => (
                  <ModalCard
                    key={idx}
                    title={voice.title}
                    description={voice.desc}
                    thumbnail={voice.title.slice(0, 2).toUpperCase()}
                    selected={selectedVoice === idx}
                    onClick={() => setSelectedVoice(idx)}
                  />
                ))}
              </div>
              <div className="kpmg-modal__divider" />
            </>
          )}

          {/* Custom Slot / Children */}
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="kpmg-modal__footer">
            <button
              type="button"
              className="kpmg-modal__btn kpmg-modal__btn--back"
              onClick={onBack}
            >
              {backLabel}
            </button>
            <button
              type="button"
              className="kpmg-modal__btn kpmg-modal__btn--next"
              onClick={onNext}
            >
              {nextLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (inline) {
    return modalDialog;
  }

  return (
    <div className="kpmg-modal-overlay" onClick={onClose} role="presentation">
      {modalDialog}
    </div>
  );
});

Modal.displayName = 'Modal';

Modal.propTypes = {
  /** Controls visibility of the modal dialog */
  isOpen: PropTypes.bool,
  /** Renders modal inline without fixed viewport overlay (ideal for Storybook and embedded views) */
  inline: PropTypes.bool,
  /** Modal header display title */
  title: PropTypes.string,
  /** Callback fired when dismiss button, Escape key, or overlay backdrop is clicked */
  onClose: PropTypes.func,
  /** Displays top linear progress indicator */
  withProgress: PropTypes.bool,
  /** Linear progress value percentage (0 to 100) */
  progress: PropTypes.number,
  /** Displays assistant avatar profile card with reactions metrics */
  agentModule: PropTypes.bool,
  /** Displays Name input section with editable pill header and textarea */
  inputModule1: PropTypes.bool,
  /** Displays Purpose input section with editable pill header, textarea, and mic icon */
  inputModule2: PropTypes.bool,
  /** Displays Knowledge base file uploader module with drag-and-drop dropzone */
  fileUploaderModule: PropTypes.bool,
  /** Displays Prompt templates module with prompt textarea and 2 side sheets card items */
  inputModule3: PropTypes.bool,
  /** Displays 2x2 Model selection grid with detailed cards */
  cardModule1: PropTypes.bool,
  /** Displays 2x2 Voice selection grid with gradient avatars */
  cardModule2: PropTypes.bool,
  /** Text label for the secondary outlined back button */
  backLabel: PropTypes.string,
  /** Text label for the primary filled next button */
  nextLabel: PropTypes.string,
  /** Callback fired when Back button is clicked */
  onBack: PropTypes.func,
  /** Callback fired when Next button is clicked */
  onNext: PropTypes.func,
  /** Whether to render action footer buttons */
  showFooter: PropTypes.bool,
  /** Initial or controlled value for the Name input textarea */
  nameValue: PropTypes.string,
  /** Initial or controlled value for the Purpose input textarea */
  purposeValue: PropTypes.string,
  /** Initial or controlled value for the Prompt templates textarea */
  promptValue: PropTypes.string,
  /** Optional custom CSS class name applied to modal container */
  className: PropTypes.string,
  /** Optional inline CSS styles applied to modal container */
  style: PropTypes.object,
  /** Custom children rendered in modal body slot */
  children: PropTypes.node,
};

Modal.defaultProps = {
  isOpen: true,
  inline: false,
  title: 'Create an assistant',
  withProgress: false,
  progress: 80,
  agentModule: false,
  inputModule1: false,
  inputModule2: false,
  fileUploaderModule: false,
  inputModule3: false,
  cardModule1: false,
  cardModule2: false,
  backLabel: 'Back',
  nextLabel: 'Next',
  showFooter: true,
  nameValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  purposeValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  promptValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  className: '',
  style: {},
};
