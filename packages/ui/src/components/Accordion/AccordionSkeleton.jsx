import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { AccordionChevronIcon } from './AccordionItem';
import './Accordion.css';

/**
 * Loading placeholder for an Accordion. Shows `count` skeleton headings;
 * when `open` is true the first one is expanded and shows skeleton text lines.
 */
export const AccordionSkeleton = forwardRef(({
  count = 4,
  open = true,
  align = 'end',
  isFlush = false,
  className = '',
  ...restProps
}, ref) => {
  const classes = [
    'kpmg-accordion',
    'kpmg-accordion--skeleton',
    `kpmg-accordion--align-${align}`,
    'kpmg-accordion--md',
    isFlush ? 'kpmg-accordion--flush' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <ul ref={ref} className={classes} aria-busy="true" aria-label="Loading" {...restProps}>
      {Array.from({ length: count }, (_, index) => {
        const expanded = open && index === 0;
        return (
          <li
            key={index}
            className={`kpmg-accordion__item kpmg-accordion__item--skeleton${expanded ? ' kpmg-accordion__item--active' : ''}`}
          >
            <div className="kpmg-accordion__heading">
              <AccordionChevronIcon className="kpmg-accordion__chevron" />
              <span className="kpmg-accordion__title">
                <span className="kpmg-accordion__skeleton-bar kpmg-accordion__skeleton-bar--title" />
              </span>
            </div>
            {expanded && (
              <div className="kpmg-accordion__content">
                <span className="kpmg-accordion__skeleton-bar kpmg-accordion__skeleton-bar--lg" />
                <span className="kpmg-accordion__skeleton-bar kpmg-accordion__skeleton-bar--md" />
                <span className="kpmg-accordion__skeleton-bar kpmg-accordion__skeleton-bar--sm" />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
});

AccordionSkeleton.displayName = 'AccordionSkeleton';

AccordionSkeleton.propTypes = {
  /** Number of skeleton headings */
  count: PropTypes.number,
  /** Show the first skeleton item expanded */
  open: PropTypes.bool,
  /** Side of the heading where the chevron is placed */
  align: PropTypes.oneOf(['start', 'end']),
  /** Remove the horizontal padding (ignored when align is "start") */
  isFlush: PropTypes.bool,
  /** Additional CSS class names for the container */
  className: PropTypes.string,
};

export default AccordionSkeleton;
