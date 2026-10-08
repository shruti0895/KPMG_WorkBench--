import React from 'react';
import { DataTableCaretIcon, DataTableMoreIcon } from './DataTableIcons';
import './DataTable.css';

/**
 * DataTableTooltip
 * Rich popover container adhering to Figma specification (300px popover with caret, title, text, divider, and mini-card preview)
 */
export const DataTableTooltip = ({
  title = 'Title',
  supportingText = 'Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  secondaryText = 'Secondary text',
  cardTitle = 'Header',
  cardImage = null,
  onMoreClick,
  customContent,
  className = '',
  style = {},
  children,
}) => {
  if (customContent) {
    return (
      <div className={`dt-tooltip-container ${className}`} style={style}>
        <div className="dt-tooltip-caret-wrapper">
          <DataTableCaretIcon width={24} height={12} color="#ffffff" />
        </div>
        <div className="dt-tooltip-card">
          {customContent}
        </div>
      </div>
    );
  }

  return (
    <div className={`dt-tooltip-container ${className}`} style={style}>
      <div className="dt-tooltip-caret-wrapper">
        <DataTableCaretIcon width={24} height={12} color="#ffffff" />
      </div>
      <div className="dt-tooltip-card">
        {title && (
          <div className="dt-tooltip-title-section">
            <h4 className="dt-tooltip-title">{title}</h4>
          </div>
        )}
        {supportingText && (
          <div className="dt-tooltip-text-section">
            <p className="dt-tooltip-supporting-text">{supportingText}</p>
          </div>
        )}
        <div className="dt-tooltip-divider" />
        {secondaryText && (
          <div className="dt-tooltip-text-section">
            <p className="dt-tooltip-secondary-text">{secondaryText}</p>
          </div>
        )}
        <div className="dt-tooltip-mini-card">
          <div className="dt-tooltip-mini-card-thumb">
            {cardImage ? (
              <img src={cardImage} alt="" className="dt-tooltip-thumb-img" />
            ) : (
              <div className="dt-tooltip-thumb-gradient" />
            )}
          </div>
          <div className="dt-tooltip-mini-card-body">
            <span className="dt-tooltip-mini-card-title">{cardTitle}</span>
          </div>
          <button
            type="button"
            className="dt-tooltip-mini-card-more-btn"
            onClick={onMoreClick}
            aria-label="More options"
          >
            <DataTableMoreIcon size={16} color="#454554" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DataTableTooltip;
