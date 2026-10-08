import React from 'react';
import { DataTableTooltip } from './DataTableTooltip';
import './DataTable.css';

/**
 * DataTableCell
 * Highly configurable cell component covering 100% of Figma states for Text and Chip types:
 * States: Enabled, Hovered, Pressed, Loading, Error, Missing, Error Pressed, With Tooltip.
 */
export const DataTableCell = ({
  type = 'Text', // 'Text' | 'Chip'
  state = 'Enabled', // 'Enabled' | 'Hovered' | 'Pressed' | 'Loading' | 'Error' | 'Missing' | 'Error pressed'
  cellText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  chipLabel = 'Label',
  errorText = 'Error!',
  missingText = 'Missing data!',
  withTooltip = false,
  tooltipProps = {},
  customTooltip,
  density = 'default', // 'default' | 'dense'
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
  style = {},
  children,
}) => {
  const normalizedType = (type || 'Text').toLowerCase();
  const normalizedState = (state || 'Enabled').toLowerCase();

  const isChip = normalizedType === 'chip';
  const isHovered = normalizedState === 'hovered';
  const isPressed = normalizedState === 'pressed';
  const isLoading = normalizedState === 'loading';
  const isError = normalizedState === 'error';
  const isMissing = normalizedState === 'missing';
  const isErrorPressed = normalizedState === 'error pressed' || normalizedState === 'errorpressed';
  const hasTooltip = withTooltip || isPressed || isErrorPressed;

  // Build state CSS class modifier
  let stateModifier = 'dt-cell--enabled';
  if (isHovered) stateModifier = 'dt-cell--hovered';
  else if (isPressed) stateModifier = 'dt-cell--pressed';
  else if (isLoading) stateModifier = 'dt-cell--loading';
  else if (isError) stateModifier = 'dt-cell--error';
  else if (isMissing) stateModifier = 'dt-cell--missing';
  else if (isErrorPressed) stateModifier = 'dt-cell--error-pressed';

  const densityModifier = density === 'dense' ? 'dt-cell--dense' : 'dt-cell--default';
  const typeModifier = isChip ? 'dt-cell--chip' : 'dt-cell--text';

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="dt-cell-animator" aria-label="Loading content">
          <div className="dt-cell-shimmer-gradient" />
        </div>
      );
    }

    if (isChip) {
      let chipClass = 'dt-cell-chip-badge';
      let displayLabel = chipLabel || 'Label';

      if (isError || isErrorPressed) {
        chipClass += ' dt-cell-chip-badge--error';
        displayLabel = errorText || 'Error!';
      } else if (isMissing) {
        chipClass += ' dt-cell-chip-badge--missing';
        displayLabel = missingText || 'Missing data!';
      }

      return (
        <div className={chipClass}>
          <span className="dt-cell-chip-text">{children || displayLabel}</span>
        </div>
      );
    }

    // Text type content
    if (isError || isErrorPressed) {
      return (
        <p className="dt-cell-text dt-cell-text--error" title={errorText}>
          {errorText}
        </p>
      );
    }

    if (isMissing) {
      return (
        <p className="dt-cell-text dt-cell-text--missing" title={missingText}>
          {missingText}
        </p>
      );
    }

    return (
      <p className="dt-cell-text" title={typeof cellText === 'string' ? cellText : undefined}>
        {children || cellText}
      </p>
    );
  };

  return (
    <div
      className={`dt-cell ${typeModifier} ${stateModifier} ${densityModifier} ${className}`}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="gridcell"
      tabIndex={onClick ? 0 : undefined}
    >
      {renderContent()}

      {withTooltip && (
        <div className="dt-cell-tooltip-anchor">
          {customTooltip || <DataTableTooltip {...tooltipProps} />}
        </div>
      )}
    </div>
  );
};

export default DataTableCell;
