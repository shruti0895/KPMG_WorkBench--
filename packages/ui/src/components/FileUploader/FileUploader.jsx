import React, { forwardRef, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './FileUploader.css';

/* ==========================================================================
   EXPORTED SVG COMPONENTS FOR FILE UPLOADERS
   ========================================================================== */

/** Small/Medium Upload Icon (Up Arrow with Top Line) */
export const FileUploaderArrowIconSvg = ({
  size = 20,
  color = '#454554',
  ...props
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <line x1="12" y1="19" x2="12" y2="7" />
    <polyline points="5 12 12 5 19 12" />
    <line x1="5" y1="2" x2="19" y2="2" />
  </svg>
);

/** Large Upload Card Illustration (Blue/Purple Soft Gradient Box) */
export const FileUploaderIllustrationIconSvg = ({
  width = 64,
  height = 64,
  ...props
}) => (
  <svg viewBox="0 0 64 64" width={width} height={height} fill="none" aria-hidden="true" {...props}>
    <defs>
      <linearGradient id="kpmg-uploader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AAB0F4" />
        <stop offset="50%" stopColor="#818AEE" />
        <stop offset="100%" stopColor="#5965E9" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#kpmg-uploader-grad)" />
  </svg>
);

/* ==========================================================================
   MAIN FILE UPLOADER COMPONENT (9 FIGMA VARIANTS: 3 SIZES × 3 STATES)
   ========================================================================== */

/**
 * FileUploader Component - KPMG WorkBench Design System
 * Formatted directly to Figma Specs (Node 1003:54273).
 * Supports Small, Medium, Large sizes; Outline, Elevated, Filled states;
 * Drag & Drop file handling, custom SVG props, and token-driven design.
 */
export const FileUploader = forwardRef(({
  size = 'medium', // 'small' | 'medium' | 'large'
  state = 'outline', // 'outline' | 'elevated' | 'filled'
  label = 'Drag and drop files or ',
  browseText = 'browse on computer',
  subtext,
  accept,
  multiple = true,
  disabled = false,
  icon: customIconProp,
  onFileSelect,
  onDrop,
  className = '',
  id,
  name,
  ...props
}, ref) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const internalInputRef = useRef(null);

  const normalizedSize = (size || 'medium').toLowerCase();
  const normalizedState = (state || 'outline').toLowerCase();

  const handleBrowseClick = () => {
    if (disabled) return;
    if (internalInputRef.current) {
      internalInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    if (onFileSelect) {
      onFileSelect(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files || []);
    if (onDrop) {
      onDrop(e, files);
    }
    if (onFileSelect) {
      onFileSelect(files);
    }
  };

  // Render icon according to size variant or custom prop
  const renderIcon = () => {
    if (customIconProp) return customIconProp;

    if (normalizedSize === 'large') {
      return <FileUploaderIllustrationIconSvg width={64} height={64} />;
    }
    if (normalizedSize === 'small') {
      return <FileUploaderArrowIconSvg size={18} color="#454554" />;
    }
    return <FileUploaderArrowIconSvg size={24} color="#3D405B" />;
  };

  const containerClasses = [
    'kpmg-uploader',
    `kpmg-uploader--size-${normalizedSize}`,
    `kpmg-uploader--state-${normalizedState}`,
    isDragOver ? 'kpmg-uploader--drag-over' : '',
    disabled ? 'kpmg-uploader--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleBrowseClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}
    >
      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={(node) => {
          internalInputRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        id={id}
        name={name}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="kpmg-uploader__input"
        aria-hidden="true"
      />

      {/* Visual Icon Container */}
      <div className="kpmg-uploader__icon-wrapper" aria-hidden="true">
        {renderIcon()}
      </div>

      {/* Text Prompt Container */}
      <div className="kpmg-uploader__content">
        <span className="kpmg-uploader__prompt">
          <span className="kpmg-uploader__label-text">{label}</span>
          <span className="kpmg-uploader__link-text">{browseText}</span>
        </span>
        {subtext && <span className="kpmg-uploader__subtext">{subtext}</span>}
      </div>
    </div>
  );
});

FileUploader.displayName = 'FileUploader';

FileUploader.propTypes = {
  /** Size scale ('small': 128px, 'medium': 128px, 'large': 202px) */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'Small', 'Medium', 'Large']),
  /** Surface visual state ('outline', 'elevated', 'filled') */
  state: PropTypes.oneOf(['outline', 'elevated', 'filled', 'Outline', 'Elevated', 'Filled']),
  /** Main prompt text preceding the browse link */
  label: PropTypes.node,
  /** Clickable link text */
  browseText: PropTypes.string,
  /** Optional subtext (e.g. file size/format limits) */
  subtext: PropTypes.node,
  /** Accepted file formats string (e.g. '.png,.jpg,.pdf') */
  accept: PropTypes.string,
  /** Enable multiple file selections */
  multiple: PropTypes.bool,
  /** Disabled state flag */
  disabled: PropTypes.bool,
  /** Custom SVG icon prop override */
  icon: PropTypes.node,
  /** Callback fired when files are selected or dropped `(files) => {}` */
  onFileSelect: PropTypes.func,
  /** Drop event callback `(event, files) => {}` */
  onDrop: PropTypes.func,
  /** Custom CSS class name */
  className: PropTypes.string,
  /** HTML input id */
  id: PropTypes.string,
  /** HTML input name */
  name: PropTypes.string,
};

export default FileUploader;
