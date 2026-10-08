import React from 'react';
import {
  DataTableCheckmarkIcon,
  DataTableStarIcon,
  DataTableRobotIcon,
  DataTableSortIcon,
} from './DataTableIcons';
import './DataTable.css';

/**
 * DataTableHeader
 * Column header component supporting Checkmark, Star, Robot, and Sort types across Enabled and Pressed states.
 */
export const DataTableHeader = ({
  title = 'Header',
  type = 'Checkmark', // 'Checkmark' | 'Star' | 'Robot' | 'Sort' | 'None'
  state = 'Enabled', // 'Enabled' | 'Pressed'
  pressed = false,
  sortDirection = null, // 'asc' | 'desc' | null
  onActionClick,
  onSort,
  onClick,
  className = '',
  style = {},
  children,
}) => {
  const isPressed = pressed || state === 'Pressed' || state === 'pressed';
  const normalizedType = (type || 'None').toLowerCase();

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (normalizedType === 'sort' && onSort) {
      onSort(e);
    } else if (onActionClick) {
      onActionClick(e);
    }
  };

  const renderIcon = () => {
    const iconColor = isPressed ? '#ffffff' : '#454554';
    const iconSize = 16;

    switch (normalizedType) {
      case 'checkmark':
        return <DataTableCheckmarkIcon size={iconSize} color={iconColor} />;
      case 'star':
        return <DataTableStarIcon size={iconSize} color={iconColor} />;
      case 'robot':
        return <DataTableRobotIcon size={iconSize} color={iconColor} />;
      case 'sort':
        return <DataTableSortIcon size={iconSize} direction={sortDirection} color={iconColor} />;
      default:
        return null;
    }
  };

  const hasActionButton = normalizedType !== 'none';

  return (
    <div
      className={`dt-header-cell ${isPressed ? 'dt-header-cell--pressed' : 'dt-header-cell--enabled'} ${className}`}
      style={style}
      onClick={onClick}
      role="columnheader"
    >
      <div className="dt-header-content">
        <span className="dt-header-text" title={typeof title === 'string' ? title : undefined}>
          {children || title}
        </span>
        {hasActionButton && (
          <button
            type="button"
            className={`dt-header-action-btn ${isPressed ? 'dt-header-action-btn--pressed' : 'dt-header-action-btn--enabled'}`}
            onClick={handleButtonClick}
            aria-pressed={isPressed}
            aria-label={`${title} action`}
          >
            {renderIcon()}
          </button>
        )}
      </div>
    </div>
  );
};

export default DataTableHeader;
