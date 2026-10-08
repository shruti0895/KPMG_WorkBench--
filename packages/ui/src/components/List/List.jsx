import React, { createContext, useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './List.css';

/**
 * Context for passing List container configuration to nested ListItems
 */
export const ListContext = createContext({
  size: 'medium',
});

export const useListContext = () => useContext(ListContext);

/**
 * KPMG WorkBench Design System - List Component
 * 
 * Container component for organizing vertical collections of information,
 * navigation choices, settings, or interactive options.
 * 
 * Scalable Architecture:
 * - 3 Container Styles: Outlined, Elevated, Filled
 * - 3 Density Sizes: Small (1-line), Medium (2-line), Large (3-line)
 * - 4 Canonical Leading Types: Avatar, Image thumbnail, Checkbox, Radio button
 *   -> Giving rise to the 12 primary design system variant combinations
 * - Supports either declarative children composition (<ListItem />) or data-driven (items prop)
 */
export const List = forwardRef(({
  styleType = 'outlined',
  styleVariant,
  size = 'medium',
  divided = false,
  items,
  className = '',
  style = {},
  children,
  role = 'list',
  ...restProps
}, ref) => {
  // Normalize style type prop: outlined | elevated | filled
  const normalizedStyle = (styleVariant || styleType || 'outlined').toLowerCase();
  const normalizedSize = (size || 'medium').toLowerCase();

  const listClasses = [
    'kpmg-list',
    `kpmg-list--${normalizedStyle}`,
    divided ? 'kpmg-list--divided' : '',
    className,
  ].filter(Boolean).join(' ');

  const contextValue = {
    size: normalizedSize,
  };

  return (
    <ListContext.Provider value={contextValue}>
      <ul
        ref={ref}
        className={listClasses}
        style={style}
        role={role}
        {...restProps}
      >
        {items && Array.isArray(items)
          ? items.map((item, index) => (
              <ListItem
                key={item.id ?? item.key ?? index}
                size={item.size || normalizedSize}
                {...item}
              />
            ))
          : children}
      </ul>
    </ListContext.Provider>
  );
});

List.displayName = 'List';

List.propTypes = {
  /** Container visual style: outlined (bordered), elevated (shadow), filled (tinted background) */
  styleType: PropTypes.oneOf(['outlined', 'elevated', 'filled']),
  /** Alias for styleType */
  styleVariant: PropTypes.oneOf(['outlined', 'elevated', 'filled']),
  /** Default density size for child items: small (1-line), medium (2-line), large (3-line) */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Whether to render subtle horizontal dividers between items */
  divided: PropTypes.bool,
  /** Data-driven array of list item objects */
  items: PropTypes.arrayOf(PropTypes.object),
  /** Custom CSS class names */
  className: PropTypes.string,
  /** Inline CSS styles */
  style: PropTypes.object,
  /** Composable child elements (usually <ListItem />) */
  children: PropTypes.node,
  /** ARIA role */
  role: PropTypes.string,
};

export default List;
