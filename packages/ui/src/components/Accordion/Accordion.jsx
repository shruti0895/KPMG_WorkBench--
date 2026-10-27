import React, { createContext, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import './Accordion.css';

/**
 * Context shared by Accordion with its AccordionItem children
 * (alignment, size and group-level disabled).
 */
export const AccordionContext = createContext({
  align: 'end',
  size: 'md',
  disabled: false,
});

export const useAccordionContext = () => useContext(AccordionContext);

/**
 * KPMG WorkBench Accordion
 *
 * A vertically stacked list of headings that each reveal or hide a panel of
 * related content. Compose it with `AccordionItem` children.
 */
export const Accordion = forwardRef(({
  align = 'end',
  isFlush = false,
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...restProps
}, ref) => {
  const classes = [
    'kpmg-accordion',
    `kpmg-accordion--align-${align}`,
    `kpmg-accordion--${size}`,
    isFlush ? 'kpmg-accordion--flush' : '',
    disabled ? 'kpmg-accordion--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <AccordionContext.Provider value={{ align, size, disabled }}>
      <ul ref={ref} className={classes} {...restProps}>
        {children}
      </ul>
    </AccordionContext.Provider>
  );
});

Accordion.displayName = 'Accordion';

Accordion.propTypes = {
  /** Side of the heading where the chevron is placed */
  align: PropTypes.oneOf(['start', 'end']),
  /** Remove the horizontal padding so the text lines up with surrounding content (ignored when align is "start") */
  isFlush: PropTypes.bool,
  /** Heading height: sm (32px), md (40px) or lg (48px) */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Disable every AccordionItem in the group */
  disabled: PropTypes.bool,
  /** Additional CSS class names for the container */
  className: PropTypes.string,
  /** AccordionItem elements */
  children: PropTypes.node,
};

export default Accordion;
