import React, { forwardRef, useId, useState } from 'react';
import PropTypes from 'prop-types';
import { useAccordionContext } from './Accordion';
import './Accordion.css';

/** Chevron (16x16) used in every accordion heading. */
export const AccordionChevronIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      d="M3.64645 5.64645C3.84171 5.45118 4.15829 5.45118 4.35355 5.64645L8 9.29289L11.6464 5.64645C11.8417 5.45118 12.1583 5.45118 12.3536 5.64645C12.5488 5.84171 12.5488 6.15829 12.3536 6.35355L8.35355 10.3536C8.15829 10.5488 7.84171 10.5488 7.64645 10.3536L3.64645 6.35355C3.45118 6.15829 3.45118 5.84171 3.64645 5.64645Z"
      fill="currentColor"
    />
  </svg>
);

AccordionChevronIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

/**
 * AccordionItem: one heading (a button) and its collapsible panel.
 *
 * Uncontrolled by default (`defaultOpen` sets the initial state). Pass `open` to
 * control it: the heading then only reports the requested state through
 * `onHeadingClick({ isOpen, event })` and the parent decides what to render.
 */
export const AccordionItem = forwardRef(({
  title,
  open,
  defaultOpen = false,
  disabled = false,
  onHeadingClick,
  className = '',
  children,
  ...restProps
}, ref) => {
  const context = useAccordionContext();
  const uid = useId();
  const headingId = `${uid}-heading`;
  const panelId = `${uid}-panel`;

  // Controlled (open) vs uncontrolled (defaultOpen), same pattern as Switch and Tab
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? Boolean(open) : internalOpen;

  const isDisabled = disabled || context.disabled;

  const handleClick = (event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    const next = !isOpen;
    if (!isControlled) {
      setInternalOpen(next);
    }
    if (onHeadingClick) {
      onHeadingClick({ isOpen: next, event });
    }
  };

  const classes = [
    'kpmg-accordion__item',
    isOpen ? 'kpmg-accordion__item--active' : '',
    isDisabled ? 'kpmg-accordion__item--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <li ref={ref} className={classes} {...restProps}>
      <button
        type="button"
        id={headingId}
        className="kpmg-accordion__heading"
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={isDisabled}
        onClick={handleClick}
      >
        <AccordionChevronIcon className="kpmg-accordion__chevron" />
        <span className="kpmg-accordion__title">{title}</span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className="kpmg-accordion__content"
        hidden={!isOpen}
      >
        {children}
      </div>
    </li>
  );
});

AccordionItem.displayName = 'AccordionItem';

AccordionItem.propTypes = {
  /** Heading content. Can be a string or any node. */
  title: PropTypes.node,
  /** Controlled open state. When set, the item only changes through this prop */
  open: PropTypes.bool,
  /** Initial open state when `open` is not provided */
  defaultOpen: PropTypes.bool,
  /** Disable this item: not focusable, cannot be toggled */
  disabled: PropTypes.bool,
  /** Called when the heading is clicked: ({ isOpen, event }) => void, isOpen is the new state */
  onHeadingClick: PropTypes.func,
  /** Additional CSS class names for the item */
  className: PropTypes.string,
  /** Panel content */
  children: PropTypes.node,
};

export default AccordionItem;
