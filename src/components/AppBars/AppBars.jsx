import React, { forwardRef, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Menu, MenuItem, MenuDivider } from '../Menu';
import './AppBars.css';

/* ==========================================================================
   SVG ICONS - HIGH FIDELITY ASSETS (COPIED EXACTLY FROM FIGMA SPEC)
   ========================================================================== */

/** Slash Forward Separator Icon (Exact SVG vector path from Figma) */
export const AppBarSlashForwardIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon kpmg-appbar-separator ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12.6581 2.02566C12.9201 2.11298 13.0617 2.39614 12.9743 2.65811L7.97434 17.6581C7.88702 17.9201 7.60386 18.0617 7.34189 17.9743C7.07991 17.887 6.93833 17.6039 7.02566 17.3419L12.0257 2.34189C12.113 2.07991 12.3961 1.93833 12.6581 2.02566Z"
      fill="currentColor"
    />
  </svg>
);

/** Chevron Forward Separator Icon (Exact SVG vector path from Figma) */
export const AppBarChevronForwardIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M13.2923 12L8.69225 7.4L9.4 6.69225L14.7078 12L9.4 17.3078L8.69225 16.6L13.2923 12Z"
      fill="currentColor"
    />
  </svg>
);

export const AppBarChevronRightIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AppBarChevronLeftIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M15 6L9 12L15 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AppBarChevronDownIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AppBarMoreVerticalIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="5" r="1.75" fill="currentColor" />
    <circle cx="12" cy="12" r="1.75" fill="currentColor" />
    <circle cx="12" cy="19" r="1.75" fill="currentColor" />
  </svg>
);

export const AppBarDismissIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AppBarRobotIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="8.5" cy="11.5" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="11.5" r="1.5" fill="currentColor" />
    <path d="M9 15H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 2V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="2" r="1" fill="currentColor" />
    <path d="M1 12H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M21 12H23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const AppBarAvatarIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const AppBarSearchIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20L16.2 16.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AppBarBellIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21A2 2 0 0 1 10.27 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AppBarBulletListIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <circle cx="5" cy="7" r="1.5" fill="currentColor" />
    <path d="M9 7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    <path d="M9 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="5" cy="17" r="1.5" fill="currentColor" />
    <path d="M9 17H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AppBarFlowChartIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <rect x="15" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <rect x="9" y="15" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <path d="M6 9V12H18V9M12 12V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/** Paperclip / Attachment Icon from Figma specification */
export const AppBarAttachIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M2.2832 7.975C2.2832 8.251 2.5072 8.475 2.7832 8.475C2.9112 8.475 3.0392 8.426 3.1372 8.329L7.7322 3.732C8.2202 3.244 8.8602 3 9.5002 3C10.8812 3 12.0002 4.119 12.0002 5.5C12.0002 6.14 11.7562 6.78 11.2682 7.268L5.9652 12.571C5.7702 12.766 5.5142 12.864 5.2582 12.864C4.7062 12.864 4.2582 12.416 4.2582 11.864C4.2582 11.608 4.3562 11.352 4.5512 11.157L9.8542 5.854C9.9522 5.756 10.0002 5.628 10.0002 5.5C10.0002 5.224 9.7762 5 9.5002 5C9.3722 5 9.2442 5.049 9.1462 5.146L3.8432 10.45C3.4522 10.841 3.2572 11.352 3.2572 11.864C3.2572 12.969 4.1522 13.864 5.2572 13.864C5.7692 13.864 6.2812 13.669 6.6712 13.278L11.9742 7.975C12.6572 7.292 12.9992 6.396 12.9992 5.5C12.9992 3.567 11.4322 2 9.4992 2C8.6032 2 7.7082 2.342 7.0242 3.025L2.4292 7.621C2.3312 7.719 2.2832 7.847 2.2832 7.975Z"
      fill="currentColor"
    />
  </svg>
);

/** Microphone Audio Search Icon from Figma specification */
export const AppBarMicIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M5.5 4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8V4.5ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5V8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8V4.5C9.5 3.67157 8.82843 3 8 3ZM4 7.5C4.27614 7.5 4.5 7.72386 4.5 8C4.5 9.933 6.067 11.5 8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8C12.5 10.3163 10.75 12.2238 8.5 12.4725V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V12.4725C5.25002 12.2238 3.5 10.3163 3.5 8C3.5 7.72386 3.72386 7.5 4 7.5Z"
      fill="currentColor"
    />
  </svg>
);

/** Send / Arrow Up Icon from Figma specification */
export const AppBarArrowUpIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M7.5 13.5C7.5 13.7761 7.72386 14 8 14C8.27614 14 8.5 13.7761 8.5 13.5V3.80298L12.1283 7.83448C12.3131 8.03974 12.6292 8.05638 12.8345 7.87165C13.0397 7.68692 13.0564 7.37077 12.8716 7.16552L8.37165 2.16552C8.27683 2.06016 8.14174 2 8 2C7.85826 2 7.72317 2.06016 7.62835 2.16552L3.12836 7.16552C2.94363 7.37077 2.96027 7.68692 3.16552 7.87165C3.37078 8.05638 3.68692 8.03974 3.87165 7.83448L7.5 3.80298V13.5Z"
      fill="currentColor"
    />
  </svg>
);

/** Circular Checkmark Badge Icon from Figma specification */
export const AppBarCheckmarkCircleIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12.0283 2.2937C17.5512 2.2937 22.0283 6.77085 22.0283 12.2937C22.0283 17.8165 17.5512 22.2937 12.0283 22.2937C6.50547 22.2937 2.02832 17.8165 2.02832 12.2937C2.02832 6.77085 6.50547 2.2937 12.0283 2.2937ZM15.248 9.26337L10.7783 13.733L8.80865 11.7634C8.51576 11.4705 8.04088 11.4705 7.74799 11.7634C7.4551 12.0563 7.4551 12.5311 7.74799 12.824L10.248 15.324C10.5409 15.6169 11.0158 15.6169 11.3087 15.324L16.3087 10.324C16.6015 10.0311 16.6015 9.55626 16.3087 9.26337C16.0158 8.97048 15.5409 8.97048 15.248 9.26337Z"
      fill="currentColor"
    />
  </svg>
);

export const AppBarCheckmarkIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M3.5 8.5L6.5 11.5L12.5 4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AppBarSavedIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M3.5 3C3.5 2.44772 3.94772 2 4.5 2H11.5C12.0523 2 12.5 2.44772 12.5 3V14L8 11.5L3.5 14V3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/** Navigation Menu Icon (3 horizontal bars from Figma spec) */
export const AppBarMenuIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M2.75254 17.9997H21.2525C21.6668 17.9997 22.0025 18.3355 22.0025 18.7497C22.0025 19.1294 21.7204 19.4432 21.3543 19.4928L21.2525 19.4997H2.75254C2.33832 19.4997 2.00254 19.1639 2.00254 18.7497C2.00254 18.37 2.28469 18.0562 2.65077 18.0065L2.75254 17.9997H21.2525H2.75254ZM2.75254 11.5027H21.2525C21.6668 11.5027 22.0025 11.8385 22.0025 12.2527C22.0025 12.6324 21.7204 12.9462 21.3543 12.9959L21.2525 13.0027H2.75254C2.33832 13.0027 2.00254 12.6669 2.00254 12.2527C2.00254 11.873 2.28469 11.5592 2.65077 11.5095L2.75254 11.5027H21.2525H2.75254ZM2.75168 5.00293H21.2517C21.6659 5.00293 22.0017 5.33872 22.0017 5.75293C22.0017 6.13263 21.7195 6.44642 21.3535 6.49608L21.2517 6.50293H2.75168C2.33746 6.50293 2.00168 6.16714 2.00168 5.75293C2.00168 5.37323 2.28383 5.05944 2.64991 5.00978L2.75168 5.00293H21.2517H2.75168Z"
      fill="currentColor"
    />
  </svg>
);

/** Speaker / Audio Icon (from Figma spec) */
export const AppBarSpeakerIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M15 4.24999C15 3.17137 13.7255 2.59913 12.9195 3.31581L8.42794 7.30908C8.29065 7.43114 8.11333 7.49857 7.92961 7.49857H4.25C3.00736 7.49857 2 8.50593 2 9.74857V14.2465C2 15.4891 3.00736 16.4965 4.25 16.4965H7.92956C8.11329 16.4965 8.29063 16.5639 8.42793 16.686L12.9194 20.6797C13.7255 21.3965 15 20.8242 15 19.7456V4.24999ZM9.4246 8.43009L13.5 4.80677V19.1888L9.42465 15.565C9.01275 15.1988 8.48074 14.9965 7.92956 14.9965H4.25C3.83579 14.9965 3.5 14.6607 3.5 14.2465V9.74857C3.5 9.33436 3.83579 8.99857 4.25 8.99857H7.92961C8.48075 8.99857 9.01272 8.79629 9.4246 8.43009ZM18.9916 5.89731C19.3244 5.65078 19.7941 5.72075 20.0407 6.05361C21.2717 7.71569 22 9.77388 22 12C22 14.2261 21.2717 16.2843 20.0407 17.9464C19.7941 18.2793 19.3244 18.3492 18.9916 18.1027C18.6587 17.8562 18.5888 17.3865 18.8353 17.0536C19.8815 15.6411 20.5 13.8938 20.5 12C20.5 10.1062 19.8815 8.35895 18.8353 6.9464C18.5888 6.61354 18.6587 6.14385 18.9916 5.89731ZM17.143 8.36931C17.5072 8.17212 17.9624 8.30756 18.1596 8.67182C18.6958 9.66243 19 10.7968 19 12C19 13.2032 18.6958 14.3375 18.1596 15.3281C17.9624 15.6924 17.5072 15.8279 17.143 15.6307C16.7787 15.4335 16.6432 14.9783 16.8404 14.6141C17.2609 13.8373 17.5 12.9477 17.5 12C17.5 11.0523 17.2609 10.1627 16.8404 9.38592C16.6432 9.02165 16.7787 8.5665 17.143 8.36931Z"
      fill="currentColor"
    />
  </svg>
);

/** Bookmark Outline Icon (from Figma spec) */
export const AppBarBookmarkIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M6.19054 21.8539C5.6944 22.2109 5.00252 21.8563 5.00252 21.2451V6.24919C5.00252 4.45426 6.4576 2.99919 8.25252 2.99919H15.7509C17.5458 2.99919 19.0009 4.45426 19.0009 6.24919V21.2451C19.0009 21.8563 18.309 22.2109 17.8129 21.8539L12.0017 17.673L6.19054 21.8539ZM17.5009 6.24919C17.5009 5.28269 16.7174 4.49919 15.7509 4.49919H8.25252C7.28603 4.49919 6.50252 5.28269 6.50252 6.24919V19.7816L11.5637 16.1402C11.8254 15.952 12.1781 15.952 12.4397 16.1402L17.5009 19.7816V6.24919Z"
      fill="currentColor"
    />
  </svg>
);

/** Share Arrow Icon (from Figma spec) */
export const AppBarShareIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`kpmg-appbar-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M6.7467 4H10.2109C10.6251 4 10.9609 4.33579 10.9609 4.75C10.9609 5.1297 10.6788 5.44349 10.3127 5.49315L10.2109 5.5H6.7467C5.55584 5.5 4.58106 6.42516 4.50189 7.59595L4.4967 7.75V17.25C4.4967 18.4409 5.42187 19.4156 6.59266 19.4948L6.7467 19.5H16.2474C17.4383 19.5 18.4131 18.5748 18.4922 17.404L18.4974 17.25V16.7522C18.4974 16.338 18.8332 16.0022 19.2474 16.0022C19.6271 16.0022 19.9409 16.2844 19.9906 16.6504L19.9974 16.7522V17.25C19.9974 19.2543 18.4251 20.8913 16.4466 20.9948L16.2474 21H6.7467C4.74244 21 3.10543 19.4276 3.0019 17.4492L2.9967 17.25V7.75C2.9967 5.74574 4.56907 4.10873 6.54755 4.0052L6.7467 4H10.2109H6.7467ZM14.5007 6.51985V3.75C14.5007 3.12603 15.2075 2.78995 15.6877 3.1398L15.7699 3.20874L21.7645 8.95874C22.0442 9.22709 22.0697 9.65811 21.8408 9.95607L21.7646 10.0412L15.77 15.793C15.3197 16.2251 14.5878 15.9477 14.5078 15.3589L14.5007 15.2519V12.5265L14.1572 12.5566C11.7575 12.807 9.45748 13.8879 7.24265 15.8174C6.72354 16.2696 5.92041 15.842 6.00579 15.1588C6.67058 9.8393 9.45245 6.9073 14.2013 6.5395L14.5007 6.51985V3.75V6.51985ZM16.0007 5.50864V7.25C16.0007 7.66421 15.6649 8 15.2507 8C11.3773 8 8.97667 9.67613 7.93943 13.1572L7.86037 13.4358L8.21256 13.1989C10.449 11.7372 12.7985 11 15.2507 11C15.6304 11 15.9442 11.2822 15.9939 11.6482L16.0007 11.75V13.4928L20.1619 9.50009L16.0007 5.50864Z"
      fill="currentColor"
    />
  </svg>
);


/* ==========================================================================
   STATUS ITEM COMPONENT (Top app bar items)
   ========================================================================== */

/**
 * AppBarStatusItem Component
 *
 * Used inside Nested Top App Bars to indicate task or process state.
 * Variants:
 * - 'configuring': Shows "Configuring", percentage (default "30%"), and linear progress bar
 * - 'completed': Shows "Completed" and 100% progress indicator
 * - 'saved': Shows "Saved" with bookmark/saved check icon
 * - 'reviewed': Shows action review status ("Review complete, longer action")
 */
export const AppBarStatusItem = forwardRef(({
  type = 'configuring', // 'configuring' | 'completed' | 'saved' | 'reviewed'
  progress = 30,
  label,
  className = '',
  ...props
}, ref) => {
  const getRenderDetails = () => {
    switch (type) {
      case 'completed':
        return {
          title: label || 'Completed',
          hasBar: true,
          barWidth: '100%',
          showPercent: false,
          icon: <AppBarCheckmarkIcon size={14} className="kpmg-appbar-status__icon" />,
        };
      case 'saved':
        return {
          title: label || 'Saved',
          hasBar: false,
          showPercent: false,
          icon: <AppBarSavedIcon size={14} className="kpmg-appbar-status__icon" />,
        };
      case 'reviewed':
        return {
          title: label || 'Review complete, longer action',
          hasBar: false,
          showPercent: false,
          icon: null,
        };
      case 'configuring':
      default:
        return {
          title: label || 'Configuring',
          hasBar: true,
          barWidth: `${Math.min(100, Math.max(0, progress))}%`,
          showPercent: true,
          percentText: `${progress}%`,
          icon: null,
        };
    }
  };

  const details = getRenderDetails();

  return (
    <div
      ref={ref}
      className={`kpmg-appbar-status kpmg-appbar-status--${type} ${className}`}
      {...props}
    >
      {details.icon}
      <span className="kpmg-appbar-status__label">{details.title}</span>
      {details.showPercent && (
        <span className="kpmg-appbar-status__percent">{details.percentText}</span>
      )}
      {details.hasBar && (
        <div className="kpmg-appbar-status__progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="kpmg-appbar-status__progress-fill"
            style={{ width: details.barWidth }}
          />
        </div>
      )}
    </div>
  );
});

AppBarStatusItem.displayName = 'AppBarStatusItem';
AppBarStatusItem.propTypes = {
  type: PropTypes.oneOf(['configuring', 'completed', 'saved', 'reviewed']),
  progress: PropTypes.number,
  label: PropTypes.node,
  className: PropTypes.string,
};


/* ==========================================================================
   TOP APP BAR - FULL
   ========================================================================== */

/**
 * AppBarFull Component
 *
 * Standard primary application header bar.
 * Height: 64px (Default) or 128px (With action).
 * Includes left Brand Pill, breadcrumbs, right assistant trigger,
 * notification/toggle icon buttons, overflow menu, and avatar.
 */
export const AppBarFull = forwardRef(({
  type = 'default', // 'default' | 'with-action'
  brandLabel = 'KPMG',
  onBrandClick,
  breadcrumbs = ['Home', 'Projects', 'Analytics'],
  breadcrumbProps = {},
  onBreadcrumbClick,
  showBreadcrumbs = true,
  pageTitle,
  actionButtonLabel = 'Save changes',
  actionButtonSecondary = 'Cancel',
  onActionClick,
  onSecondaryActionClick,
  actionsSlot,
  rightActions,
  onAssistantClick,
  onNotificationsClick,
  onOverflowClick,
  onAvatarClick,
  avatarSrc,
  avatarAlt = 'User Profile',
  className = '',
  children,
  ...props
}, ref) => {
  const isWithAction = type === 'with-action' || type === 'With action';

  // Format and render breadcrumbs using the system Breadcrumbs component
  const renderBreadcrumbs = () => {
    if (!showBreadcrumbs || !breadcrumbs) return null;

    if (React.isValidElement(breadcrumbs)) {
      return breadcrumbs;
    }

    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      const items = breadcrumbs.map((crumb, idx) => {
        if (typeof crumb === 'string') {
          const isLast = idx === breadcrumbs.length - 1;
          return {
            id: `crumb-${idx}`,
            label: crumb,
            isCurrent: isLast,
            onClick: (e) => onBreadcrumbClick && onBreadcrumbClick(crumb, idx, e),
          };
        }
        return {
          ...crumb,
          onClick: crumb.onClick || ((e) => onBreadcrumbClick && onBreadcrumbClick(crumb, idx, e)),
        };
      });

      return (
        <Breadcrumbs
          items={items}
          separator={<AppBarSlashForwardIcon size={20} />}
          size="md"
          className="kpmg-appbar-breadcrumbs"
          {...breadcrumbProps}
        />
      );
    }

    return null;
  };

  return (
    <header
      ref={ref}
      role="banner"
      className={`kpmg-appbar kpmg-appbar-full kpmg-appbar-full--${type} ${className}`}
      {...props}
    >
      {/* Primary Top Row (64px) */}
      <div className="kpmg-appbar-full__row">
        {/* Left Side: Brand Pill & Breadcrumbs / Title */}
        <div className="kpmg-appbar-full__left">
          <button
            type="button"
            className="kpmg-appbar-brand-pill"
            onClick={onBrandClick}
            aria-label={`${brandLabel} navigation menu`}
          >
            <span className="kpmg-appbar-brand-pill__text">{brandLabel}</span>
            <AppBarChevronDownIcon size={16} className="kpmg-appbar-brand-pill__chevron" />
          </button>

          {pageTitle && (
            <div className="kpmg-appbar-full__title-group">
              <AppBarChevronForwardIcon size={20} className="kpmg-appbar-full__title-chevron" />
              <span className="kpmg-appbar-full__title">{pageTitle}</span>
            </div>
          )}

          {renderBreadcrumbs()}
        </div>

        {/* Right Side: Quick Action Triggers */}
        <div className="kpmg-appbar-full__right">
          {rightActions || (
            <>
              {/* Assistant Trigger */}
              <button
                type="button"
                className="kpmg-appbar-icon-btn kpmg-appbar-icon-btn--assistant"
                onClick={onAssistantClick}
                aria-label="Open Assistant"
              >
                <AppBarRobotIcon size={20} />
              </button>

              {/* Notifications */}
              <button
                type="button"
                className="kpmg-appbar-icon-btn"
                onClick={onNotificationsClick}
                aria-label="Notifications"
              >
                <AppBarBellIcon size={20} />
              </button>

              {/* Overflow Menu */}
              <button
                type="button"
                className="kpmg-appbar-icon-btn"
                onClick={onOverflowClick}
                aria-label="More options"
              >
                <AppBarMoreVerticalIcon size={20} />
              </button>

              {/* User Avatar */}
              <button
                type="button"
                className="kpmg-appbar-icon-btn kpmg-appbar-icon-btn--avatar"
                onClick={onAvatarClick}
                aria-label={avatarAlt}
              >
                {avatarSrc ? (
                  <img src={avatarSrc} alt={avatarAlt} className="kpmg-appbar-avatar-img" />
                ) : (
                  <AppBarAvatarIcon size={20} />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Secondary Bottom Row for 'with-action' variant (64px, Total 128px) */}
      {isWithAction && (
        <div className="kpmg-appbar-full__action-row">
          {actionsSlot || (
            <div className="kpmg-appbar-full__action-buttons">
              {actionButtonSecondary && (
                <button
                  type="button"
                  className="kpmg-appbar-btn kpmg-appbar-btn--secondary"
                  onClick={onSecondaryActionClick}
                >
                  {actionButtonSecondary}
                </button>
              )}
              {actionButtonLabel && (
                <button
                  type="button"
                  className="kpmg-appbar-btn kpmg-appbar-btn--primary"
                  onClick={onActionClick}
                >
                  {actionButtonLabel}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {children}
    </header>
  );
});

AppBarFull.displayName = 'AppBarFull';
AppBarFull.propTypes = {
  type: PropTypes.oneOf(['default', 'with-action', 'Default', 'With action']),
  brandLabel: PropTypes.node,
  onBrandClick: PropTypes.func,
  breadcrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object])
    ),
    PropTypes.node,
  ]),
  breadcrumbProps: PropTypes.object,
  onBreadcrumbClick: PropTypes.func,
  showBreadcrumbs: PropTypes.bool,
  pageTitle: PropTypes.node,
  actionButtonLabel: PropTypes.node,
  actionButtonSecondary: PropTypes.node,
  onActionClick: PropTypes.func,
  onSecondaryActionClick: PropTypes.func,
  actionsSlot: PropTypes.node,
  rightActions: PropTypes.node,
  onAssistantClick: PropTypes.func,
  onNotificationsClick: PropTypes.func,
  onOverflowClick: PropTypes.func,
  onAvatarClick: PropTypes.func,
  avatarSrc: PropTypes.string,
  avatarAlt: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};


/* ==========================================================================
   TOP APP BAR - NESTED
   ========================================================================== */

/**
 * AppBarNested Component
 *
 * Contextual nested app bar.
 * Sizes:
 * - 'small' (h=64px): Compact header with navigation/back button, page title or breadcrumbs, status item, actions
 * - 'large' (h=472px or custom): Rich hero section with reused Breadcrumbs, display title, filter chips, and card layout slot
 * States:
 * - 'default': Surface white background
 * - 'filled': Subtle container background
 */
export const AppBarNested = forwardRef(({
  size = 'small', // 'small' | 'large'
  state = 'default', // 'default' | 'filled'
  title = 'Header',
  topTitle,
  breadcrumbs,
  breadcrumbProps = {},
  onBreadcrumbClick,
  subheader,
  topBreadcrumbs,
  navIcon,
  navIconType = 'menu', // 'menu' | 'back'
  onNavClick,
  onBackClick,
  statusType, // 'configuring' | 'completed' | 'saved' | 'reviewed'
  statusProgress = 30,
  filterChips = ['All', 'Active', 'Archived'],
  activeChip = 0,
  onChipClick,
  rightActions,
  onListClick,
  onFlowChartClick,
  onOverflowClick,
  onSpeakerClick,
  onBookmarkClick,
  onShareClick,
  children,
  className = '',
  ...props
}, ref) => {
  const isLarge = size === 'large';
  const [selectedChip, setSelectedChip] = useState(activeChip);

  const handleChipClick = (idx, chip) => {
    setSelectedChip(idx);
    if (onChipClick) onChipClick(idx, chip);
  };

  const handleNavClick = onNavClick || onBackClick;
  const defaultNavIcon = navIconType === 'back'
    ? <AppBarChevronLeftIcon size={20} />
    : <AppBarMenuIcon size={20} />;

  // Render hero section breadcrumbs reusing the built-out Breadcrumbs component
  const renderHeroBreadcrumbs = () => {
    let rawItems = breadcrumbs;
    if (rawItems === undefined) {
      if (Array.isArray(subheader)) {
        rawItems = subheader;
      } else if (typeof subheader === 'string' && subheader.length > 0) {
        rawItems = subheader === 'Subheader' ? ['Subheader', 'Subheader'] : [subheader];
      } else if (subheader !== null && subheader !== false) {
        rawItems = ['Subheader', 'Subheader'];
      }
    }

    if (!rawItems) return null;

    if (React.isValidElement(rawItems)) {
      return (
        <div className="kpmg-appbar-nested__breadcrumbs-wrapper">
          {rawItems}
        </div>
      );
    }

    if (Array.isArray(rawItems) && rawItems.length > 0) {
      const items = rawItems.map((crumb, idx) => {
        if (typeof crumb === 'string') {
          const isLast = idx === rawItems.length - 1;
          return {
            id: `nested-crumb-${idx}`,
            label: crumb,
            isCurrent: isLast,
            onClick: (e) => onBreadcrumbClick && onBreadcrumbClick(crumb, idx, e),
          };
        }
        return {
          ...crumb,
          onClick: crumb.onClick || ((e) => onBreadcrumbClick && onBreadcrumbClick(crumb, idx, e)),
        };
      });

      return (
        <div className="kpmg-appbar-nested__breadcrumbs-wrapper">
          <Breadcrumbs
            items={items}
            separator={<AppBarSlashForwardIcon size={20} />}
            size="md"
            className="kpmg-appbar-breadcrumbs kpmg-appbar-nested__breadcrumbs"
            {...breadcrumbProps}
          />
        </div>
      );
    }

    return null;
  };

  // Render top row breadcrumbs when passed
  const renderTopBreadcrumbs = () => {
    if (!topBreadcrumbs) return null;
    if (React.isValidElement(topBreadcrumbs)) {
      return topBreadcrumbs;
    }
    if (Array.isArray(topBreadcrumbs) && topBreadcrumbs.length > 0) {
      const items = topBreadcrumbs.map((crumb, idx) => {
        if (typeof crumb === 'string') {
          const isLast = idx === topBreadcrumbs.length - 1;
          return {
            id: `top-crumb-${idx}`,
            label: crumb,
            isCurrent: isLast,
            onClick: (e) => onBreadcrumbClick && onBreadcrumbClick(crumb, idx, e),
          };
        }
        return {
          ...crumb,
          onClick: crumb.onClick || ((e) => onBreadcrumbClick && onBreadcrumbClick(crumb, idx, e)),
        };
      });

      return (
        <Breadcrumbs
          items={items}
          separator={<AppBarChevronForwardIcon size={20} />}
          size="md"
          className="kpmg-appbar-breadcrumbs kpmg-appbar-nested__top-breadcrumbs"
          {...breadcrumbProps}
        />
      );
    }
    return null;
  };

  return (
    <div
      ref={ref}
      className={`kpmg-appbar kpmg-appbar-nested kpmg-appbar-nested--${size} kpmg-appbar-nested--state-${state} ${className}`}
      {...props}
    >
      {/* Top 64px Navigation Bar */}
      <div className="kpmg-appbar-nested__top-bar">
        {/* Left Side: Navigation / Back button + Title + Status */}
        <div className="kpmg-appbar-nested__left">
          <button
            type="button"
            className="kpmg-appbar-icon-btn kpmg-appbar-icon-btn--nav"
            onClick={handleNavClick}
            aria-label={navIconType === 'back' ? 'Go back' : 'Navigation menu'}
          >
            {navIcon || defaultNavIcon}
          </button>

          {topBreadcrumbs ? (
            renderTopBreadcrumbs()
          ) : (
            <>
              {(topTitle || (!isLarge && title)) && (
                <span className="kpmg-appbar-nested__title">{topTitle || title}</span>
              )}
              {statusType && (
                <AppBarStatusItem type={statusType} progress={statusProgress} />
              )}
            </>
          )}
        </div>

        {/* Right Side: Action icons */}
        <div className="kpmg-appbar-nested__right">
          {rightActions || (
            isLarge ? (
              <>
                <button
                  type="button"
                  className="kpmg-appbar-icon-btn"
                  onClick={onSpeakerClick}
                  aria-label="Speaker audio"
                >
                  <AppBarSpeakerIcon size={20} />
                </button>
                <button
                  type="button"
                  className="kpmg-appbar-icon-btn"
                  onClick={onBookmarkClick}
                  aria-label="Bookmark"
                >
                  <AppBarBookmarkIcon size={20} />
                </button>
                <button
                  type="button"
                  className="kpmg-appbar-icon-btn"
                  onClick={onShareClick}
                  aria-label="Share"
                >
                  <AppBarShareIcon size={20} />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="kpmg-appbar-icon-btn"
                  onClick={onListClick}
                  aria-label="List view"
                >
                  <AppBarBulletListIcon size={20} />
                </button>
                <button
                  type="button"
                  className="kpmg-appbar-icon-btn"
                  onClick={onFlowChartClick}
                  aria-label="Flowchart view"
                >
                  <AppBarFlowChartIcon size={20} />
                </button>
                <button
                  type="button"
                  className="kpmg-appbar-icon-btn"
                  onClick={onOverflowClick}
                  aria-label="More options"
                >
                  <AppBarMoreVerticalIcon size={20} />
                </button>
              </>
            )
          )}
        </div>
      </div>

      {/* Large Hero Body (when size === 'large') */}
      {isLarge && (
        <div className="kpmg-appbar-nested__hero">
          {renderHeroBreadcrumbs()}
          {title && <h1 className="kpmg-appbar-nested__header">{title}</h1>}

          {/* Filter Chips */}
          {filterChips && filterChips.length > 0 && (
            <div className="kpmg-appbar-nested__chips" role="tablist">
              {filterChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={selectedChip === idx}
                  className={`kpmg-appbar-chip ${selectedChip === idx ? 'kpmg-appbar-chip--active' : ''}`}
                  onClick={() => handleChipClick(idx, chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Content Slot / Cards */}
          {children && (
            <div className="kpmg-appbar-nested__content">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

AppBarNested.displayName = 'AppBarNested';
AppBarNested.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  state: PropTypes.oneOf(['default', 'filled']),
  title: PropTypes.node,
  topTitle: PropTypes.node,
  breadcrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object])
    ),
    PropTypes.node,
  ]),
  breadcrumbProps: PropTypes.object,
  onBreadcrumbClick: PropTypes.func,
  subheader: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object])
    ),
    PropTypes.node,
  ]),
  topBreadcrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object])
    ),
    PropTypes.node,
  ]),
  navIcon: PropTypes.node,
  navIconType: PropTypes.oneOf(['menu', 'back']),
  onNavClick: PropTypes.func,
  onBackClick: PropTypes.func,
  statusType: PropTypes.oneOf(['configuring', 'completed', 'saved', 'reviewed']),
  statusProgress: PropTypes.number,
  filterChips: PropTypes.arrayOf(PropTypes.node),
  activeChip: PropTypes.number,
  onChipClick: PropTypes.func,
  rightActions: PropTypes.node,
  onListClick: PropTypes.func,
  onFlowChartClick: PropTypes.func,
  onOverflowClick: PropTypes.func,
  onSpeakerClick: PropTypes.func,
  onBookmarkClick: PropTypes.func,
  onShareClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};


/* ==========================================================================
   TOP APP BAR - SEARCH PILL & SPECIAL COMPONENTS
   ========================================================================== */

/**
 * AppBarSearchPill Component
 *
 * Dedicated AI Search Pill input matching Figma "Search text" specifications.
 * Sizes:
 * - 'small' (400px x 40px): 24px icon buttons, 16px icons, 14px font
 * - 'large' (711px x 68px): 52px icon buttons, 28px icons, 16px font
 */
export const AppBarSearchPill = forwardRef(({
  size = 'small', // 'small' | 'large'
  value,
  defaultValue = '',
  placeholder = 'Ask me anything',
  onChange,
  onSubmit,
  onAttachClick,
  onMicClick,
  onSendClick,
  showAttachment,
  enableAttachment = true,
  showMicrophone,
  enableMic = true,
  showSend,
  enableSend = true,
  showExpand,
  enableExpand = true,
  floating = false,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onExpandToggle,
  className = '',
  ...props
}, ref) => {
  const canAttach = showAttachment !== undefined ? showAttachment : enableAttachment;
  const canMic = showMicrophone !== undefined ? showMicrophone : enableMic;
  const canSend = showSend !== undefined ? showSend : enableSend;
  const canExpand = showExpand !== undefined ? showExpand : enableExpand;

  const [internalVal, setInternalVal] = useState(defaultValue);
  const currentVal = value !== undefined ? value : internalVal;

  const isExpandControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = isExpandControlled ? controlledExpanded : internalExpanded;

  const hasUserManuallyCollapsed = useRef(false);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check if text cannot fit into the first line
  useEffect(() => {
    if (!currentVal) {
      setIsOverflowing(false);
      return;
    }
    if (currentVal.includes('\n')) {
      setIsOverflowing(true);
      return;
    }
    if (inputRef.current) {
      const el = inputRef.current;
      const overflows = el.scrollWidth > el.clientWidth + 2 || currentVal.length > 32;
      setIsOverflowing(overflows);
    } else {
      setIsOverflowing(currentVal.length > 32);
    }
  }, [currentVal]);

  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    } else if (!isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleToggleExpand = () => {
    const nextState = !isExpanded;
    if (!nextState) {
      hasUserManuallyCollapsed.current = true;
    } else {
      hasUserManuallyCollapsed.current = false;
    }
    if (!isExpandControlled) {
      setInternalExpanded(nextState);
    }
    if (onExpandToggle) onExpandToggle(nextState);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (value === undefined) setInternalVal(val);
    if (onChange) onChange(e);

    const el = e.target;
    const overflows = Boolean(val && (val.includes('\n') || el.scrollWidth > el.clientWidth + 2 || val.length > 32));
    setIsOverflowing(overflows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(currentVal, e);
    if (onSendClick) onSendClick(currentVal, e);
    if (!isExpandControlled) {
      setInternalExpanded(false);
    }
    hasUserManuallyCollapsed.current = false;
  };

  const isLarge = size === 'large';
  const iconSize = isLarge ? 28 : 16;

  return (
    <form
      ref={ref}
      role="search"
      onSubmit={handleSubmit}
      className={`kpmg-appbar-search-pill kpmg-appbar-search-pill--${size} ${floating ? 'kpmg-appbar-search-pill--floating' : ''} ${isExpanded ? 'kpmg-appbar-search-pill--expanded' : ''} ${className}`}
      {...props}
    >
      {!isExpanded ? (
        <>
          {canAttach && (
            <button
              type="button"
              className="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--attach"
              onClick={onAttachClick}
              aria-label="Attach file"
              title="Attach file"
            >
              <AppBarAttachIcon size={iconSize} />
            </button>
          )}

          <div className="kpmg-appbar-search-pill__input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={currentVal}
              onChange={handleChange}
              placeholder={placeholder}
              className="kpmg-appbar-search-pill__input"
              aria-label={placeholder}
            />
          </div>

          <div className="kpmg-appbar-search-pill__actions">
            {canMic && (
              <button
                type="button"
                className="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--mic"
                onClick={onMicClick}
                aria-label="Voice search"
                title="Voice search"
              >
                <AppBarMicIcon size={iconSize} />
              </button>
            )}
            {canSend && (
              <button
                type="submit"
                className="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--send"
                aria-label="Send query"
                title="Send query"
              >
                <AppBarArrowUpIcon size={iconSize} />
              </button>
            )}
            {canExpand && isOverflowing && (
              <button
                type="button"
                className="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--expand"
                onClick={handleToggleExpand}
                aria-label="Expand editor (300px)"
                title="Expand editor (300px)"
              >
                <BottomAppBarExpandIcon size={iconSize} />
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <textarea
            ref={textareaRef}
            value={currentVal}
            onChange={handleChange}
            placeholder={placeholder}
            className="kpmg-appbar-search-pill__textarea"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            aria-label={placeholder}
          />

          <div className="kpmg-appbar-search-pill__expanded-footer">
            <div className="kpmg-appbar-search-pill__actions">
              {canAttach && (
                <button
                  type="button"
                  className="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--attach"
                  onClick={onAttachClick}
                  aria-label="Attach file"
                  title="Attach file"
                >
                  <AppBarAttachIcon size={iconSize} />
                </button>
              )}
            </div>

            <div className="kpmg-appbar-search-pill__actions">
              {canMic && (
                <button
                  type="button"
                  className="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--mic"
                  onClick={onMicClick}
                  aria-label="Voice search"
                  title="Voice search"
                >
                  <AppBarMicIcon size={iconSize} />
                </button>
              )}
              {canSend && (
                <button
                  type="submit"
                  className="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--send"
                  aria-label="Send query"
                  title="Send query"
                >
                  <AppBarArrowUpIcon size={iconSize} />
                </button>
              )}
              {canExpand && (
                <button
                  type="button"
                  className="kpmg-appbar-search-pill__btn kpmg-appbar-search-pill__btn--expand"
                  onClick={handleToggleExpand}
                  aria-label="Collapse editor (thin & slim mode)"
                  title="Collapse editor (thin & slim mode)"
                >
                  <BottomAppBarMinimizeIcon size={iconSize} />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </form>
  );
});


AppBarSearchPill.displayName = 'AppBarSearchPill';
AppBarSearchPill.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onAttachClick: PropTypes.func,
  onMicClick: PropTypes.func,
  onSendClick: PropTypes.func,
  showAttachment: PropTypes.bool,
  showMicrophone: PropTypes.bool,
  showSend: PropTypes.bool,
  floating: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * AppBarSpecialCard Component
 *
 * Glassmorphic horizontal card matching Figma "Horizontal card" specification (308px x 136px).
 * Features frosted glass background, header with checkmark badge, 2 supporting lines,
 * and linear progress track indicator.
 */
export const AppBarSpecialCard = ({
  header = 'Header',
  supportingText = 'Supporting line text',
  supportingTextSecondary = 'Supporting line text',
  progress = 31,
  isChecked = true,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`kpmg-appbar-special-card ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="kpmg-appbar-special-card__top">
        <span className="kpmg-appbar-special-card__header">{header}</span>
        {isChecked && (
          <div className="kpmg-appbar-special-card__badge" aria-label="Completed badge">
            <AppBarCheckmarkCircleIcon size={24} />
          </div>
        )}
      </div>

      <div className="kpmg-appbar-special-card__body">
        {supportingText && (
          <p className="kpmg-appbar-special-card__text">{supportingText}</p>
        )}
        {supportingTextSecondary && (
          <p className="kpmg-appbar-special-card__text">{supportingTextSecondary}</p>
        )}
      </div>

      <div className="kpmg-appbar-special-card__progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="kpmg-appbar-special-card__progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

AppBarSpecialCard.displayName = 'AppBarSpecialCard';
AppBarSpecialCard.propTypes = {
  header: PropTypes.node,
  supportingText: PropTypes.node,
  supportingTextSecondary: PropTypes.node,
  progress: PropTypes.number,
  isChecked: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

/* ==========================================================================
   TOP APP BAR - SPECIAL (Dashboard / Search)
   ========================================================================== */

/**
 * AppBarSpecial Component
 *
 * Dashboard landing / special top bar with search integration.
 * The 4 canonical Figma variants:
 * 1. 'extra-small' (h=64px, with search)
 * 2. 'small' (h=88px, with search)
 * 3. 'large' without search (h=434px)
 * 4. 'large' with search (h=466px + 711px floating search bar)
 */
export const AppBarSpecial = forwardRef(({
  size = 'small', // 'extra-small' | 'small' | 'large'
  withSearch = true, // boolean or 'Default' | 'True' | 'False'
  greeting = 'Greeting, name',
  welcomeHeader = 'Welcome',
  searchValue,
  placeholder,
  searchPlaceholder = 'Ask me anything',
  onSearchChange,
  onSearchSubmit,
  onAttachClick,
  onMicClick,
  onSendClick,
  filterChips = ['Project tag', 'Project tag', 'Project tag'],
  activeChip = 0,
  onChipClick,
  cards,
  rightSlot,
  children,
  className = '',
  ...props
}, ref) => {
  const effectivePlaceholder = placeholder || searchPlaceholder;
  const [selectedChip, setSelectedChip] = useState(activeChip);

  const handleChipClick = (idx, chip) => {
    setSelectedChip(idx);
    if (onChipClick) onChipClick(idx, chip);
  };

  const isLarge = size === 'large';
  const isExtraSmall = size === 'extra-small';
  const isSmall = size === 'small';

  // Determine if search pill should be rendered based on boolean or Figma string values
  const hasSearch = isLarge
    ? (withSearch === true || withSearch === 'True' || withSearch === 'default' || withSearch === 'Default')
    : (withSearch !== false && withSearch !== 'False');

  // Default 4 glassmorphic cards from Figma specification
  const defaultCards = cards || [
    { id: '1', header: 'Header', supportingText: 'Supporting line text', supportingTextSecondary: 'Supporting line text', progress: 31, isChecked: true },
    { id: '2', header: 'Header', supportingText: 'Supporting line text', supportingTextSecondary: 'Supporting line text', progress: 31, isChecked: true },
    { id: '3', header: 'Header', supportingText: 'Supporting line text', supportingTextSecondary: 'Supporting line text', progress: 31, isChecked: true },
    { id: '4', header: 'Header', supportingText: 'Supporting line text', supportingTextSecondary: 'Supporting line text', progress: 31, isChecked: true },
  ];

  return (
    <div
      ref={ref}
      className={`kpmg-appbar kpmg-appbar-special kpmg-appbar-special--${size} ${hasSearch ? 'kpmg-appbar-special--with-search' : 'kpmg-appbar-special--no-search'} ${className}`}
      {...props}
    >
      {/* Top Header Row for XS (64px) & Small (88px) */}
      {!isLarge ? (
        <div className="kpmg-appbar-special__row">
          <div className="kpmg-appbar-special__left">
            <span className="kpmg-appbar-special__greeting">{greeting}</span>
          </div>

          <div className="kpmg-appbar-special__right">
            {hasSearch && (
              <AppBarSearchPill
                size="small"
                value={searchValue}
                placeholder={effectivePlaceholder}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                onAttachClick={onAttachClick}
                onMicClick={onMicClick}
                onSendClick={onSendClick}
              />
            )}
            {rightSlot}
          </div>
        </div>
      ) : (
        /* Large Hero View (434px without search or 466px with floating search) */
        <div className="kpmg-appbar-special__hero">
          <div className="kpmg-appbar-special__greeting-row">
            <span className="kpmg-appbar-special__greeting">{greeting}</span>
          </div>

          <h1 className="kpmg-appbar-special__welcome-title">{welcomeHeader}</h1>

          {/* Filter Chips Row */}
          {filterChips && filterChips.length > 0 && (
            <div className="kpmg-appbar-special__chips" role="tablist">
              {filterChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={selectedChip === idx}
                  className={`kpmg-appbar-special-chip ${selectedChip === idx ? 'kpmg-appbar-special-chip--active' : ''}`}
                  onClick={() => handleChipClick(idx, chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Content Slot / Horizontal Cards */}
          {children || (
            <div className="kpmg-appbar-special__cards-row">
              {defaultCards.map((card, idx) => (
                <AppBarSpecialCard
                  key={card.id || idx}
                  header={card.header}
                  supportingText={card.supportingText}
                  supportingTextSecondary={card.supportingTextSecondary}
                  progress={card.progress}
                  isChecked={card.isChecked}
                />
              ))}
            </div>
          )}

          {/* Floating AI Search Bar (Anchored bottom center, 711px x 68px) */}
          {hasSearch && (
            <AppBarSearchPill
              size="large"
              floating={true}
              value={searchValue}
              placeholder={effectivePlaceholder}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
              onAttachClick={onAttachClick}
              onMicClick={onMicClick}
              onSendClick={onSendClick}
            />
          )}
        </div>
      )}
    </div>
  );
});

AppBarSpecial.displayName = 'AppBarSpecial';
AppBarSpecial.propTypes = {
  size: PropTypes.oneOf(['extra-small', 'small', 'large']),
  withSearch: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  greeting: PropTypes.node,
  welcomeHeader: PropTypes.node,
  searchValue: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  onAttachClick: PropTypes.func,
  onMicClick: PropTypes.func,
  onSendClick: PropTypes.func,
  filterChips: PropTypes.arrayOf(PropTypes.node),
  activeChip: PropTypes.number,
  onChipClick: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object),
  rightSlot: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};


/* ==========================================================================
   SVG ICONS - EXACT VECTOR ASSETS EXTRACTED FROM FIGMA (NODE 964:15496)
   ========================================================================== */

/** Muted Microphone Icon (Exact SVG vector from Figma node 1427:11389) */
export const BottomAppBarMuteIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M3.28034 2.21968C2.98745 1.92678 2.51257 1.92677 2.21968 2.21966C1.92678 2.51255 1.92677 2.98743 2.21966 3.28032L8 9.06078V12C8 14.2091 9.79086 16 12 16C12.8335 16 13.6074 15.7451 14.2481 15.309L15.394 16.4549C14.5176 17.1112 13.4292 17.5 12.25 17.5H11.75L11.5336 17.4956C8.73445 17.3821 6.5 15.077 6.5 12.25V11.75L6.49315 11.6482C6.44349 11.2822 6.1297 11 5.75 11C5.33579 11 5 11.3358 5 11.75V12.25L5.00406 12.4863C5.12283 15.938 7.83323 18.7316 11.25 18.9818L11.25 21.25L11.2568 21.3518C11.3065 21.7178 11.6203 22 12 22C12.4142 22 12.75 21.6642 12.75 21.25L12.751 18.9817C14.15 18.8791 15.4305 18.35 16.4631 17.5241L20.7194 21.7805C21.0123 22.0734 21.4872 22.0734 21.7801 21.7805C22.073 21.4876 22.073 21.0127 21.7801 20.7198L3.28034 2.21968ZM13.1562 14.2171C12.8105 14.3978 12.4172 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12V10.5608L13.1562 14.2171ZM14.5 6V11.3182L15.9301 12.7483C15.976 12.5059 16 12.2558 16 12V6C16 3.79086 14.2091 2 12 2C10.1521 2 8.59692 3.25302 8.13768 4.95575L9.5 6.3181V6C9.5 4.61929 10.6193 3.5 12 3.5C13.3807 3.5 14.5 4.61929 14.5 6ZM17.1962 14.0144L18.3421 15.1604C18.7638 14.2791 19 13.2921 19 12.25V11.75L18.9932 11.6482C18.9435 11.2822 18.6297 11 18.25 11C17.8358 11 17.5 11.3358 17.5 11.75V12.25L17.4956 12.4664C17.4737 13.0075 17.3698 13.5276 17.1962 14.0144Z"
      fill="currentColor"
    />
  </svg>
);

/** Active Microphone Icon (Exact SVG vector from Figma node 1427:7844) */
export const BottomAppBarMicIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M5.5 4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8V4.5ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5V8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8V4.5C9.5 3.67157 8.82843 3 8 3ZM4 7.5C4.27614 7.5 4.5 7.72386 4.5 8C4.5 9.933 6.067 11.5 8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8C12.5 10.3163 10.75 12.2238 8.5 12.4725V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V12.4725C5.25002 12.2238 3.5 10.3163 3.5 8C3.5 7.72386 3.72386 7.5 4 7.5Z"
      fill="currentColor"
    />
  </svg>
);

/** Attach / Paperclip Icon (Exact SVG vector from Figma node 1569:7493) */
export const BottomAppBarAttachIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M2.2832 7.975C2.2832 8.251 2.5072 8.475 2.7832 8.475C2.9112 8.475 3.0392 8.426 3.1372 8.329L7.7322 3.732C8.2202 3.244 8.8602 3 9.5002 3C10.8812 3 12.0002 4.119 12.0002 5.5C12.0002 6.14 11.7562 6.78 11.2682 7.268L5.9652 12.571C5.7702 12.766 5.5142 12.864 5.2582 12.864C4.7062 12.864 4.2582 12.416 4.2582 11.864C4.2582 11.608 4.3562 11.352 4.5512 11.157L9.8542 5.854C9.9522 5.756 10.0002 5.628 10.0002 5.5C10.0002 5.224 9.7762 5 9.5002 5C9.3722 5 9.2442 5.049 9.1462 5.146L3.8432 10.45C3.4522 10.841 3.2572 11.352 3.2572 11.864C3.2572 12.969 4.1522 13.864 5.2572 13.864C5.7692 13.864 6.2812 13.669 6.6712 13.278L11.9742 7.975C12.6572 7.292 12.9992 6.396 12.9992 5.5C12.9992 3.567 11.4322 2 9.4992 2C8.6032 2 7.7082 2.342 7.0242 3.025L2.4292 7.621C2.3312 7.719 2.2832 7.847 2.2832 7.975Z"
      fill="currentColor"
    />
  </svg>
);

/** Arrow Up / Send Icon (Exact SVG vector from Figma node 1569:7500) */
export const BottomAppBarArrowUpIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M7.5 13.5C7.5 13.7761 7.72386 14 8 14C8.27614 14 8.5 13.7761 8.5 13.5V3.80298L12.1283 7.83448C12.3131 8.03974 12.6292 8.05638 12.8345 7.87165C13.0397 7.68692 13.0564 7.37077 12.8716 7.16552L8.37165 2.16552C8.27683 2.06016 8.14174 2 8 2C7.85826 2 7.72317 2.06016 7.62835 2.16552L3.12836 7.16552C2.94363 7.37077 2.96027 7.68692 3.16552 7.87165C3.37078 8.05638 3.68692 8.03974 3.87165 7.83448L7.5 3.80298V13.5Z"
      fill="currentColor"
    />
  </svg>
);

/** Chevron Icon (Exact SVG vector from Figma node 1322:156070) */
export const BottomAppBarChevronIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z"
      fill="currentColor"
    />
  </svg>
);

/** Checkmark Icon (Exact SVG vector from Figma node 1537:11156) */
export const BottomAppBarCheckmarkIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M8.02832 1.81787C11.342 1.81787 14.0283 4.50416 14.0283 7.81787C14.0283 11.1316 11.342 13.8179 8.02832 13.8179C4.71461 13.8179 2.02832 11.1316 2.02832 7.81787C2.02832 4.50416 4.71461 1.81787 8.02832 1.81787ZM9.96012 5.99967L7.27832 8.68148L6.09652 7.49967C5.92078 7.32394 5.63586 7.32394 5.46012 7.49967C5.28439 7.67541 5.28439 7.96033 5.46012 8.13607L6.96012 9.63607C7.13586 9.81181 7.42078 9.81181 7.59652 9.63607L10.5965 6.63607C10.7723 6.46033 10.7723 6.17541 10.5965 5.99967C10.4208 5.82394 10.1359 5.82394 9.96012 5.99967Z"
      fill="currentColor"
    />
  </svg>
);

/** More Vertical Icon (Exact SVG vector from Figma node 1744:66008) */
export const BottomAppBarMoreVerticalIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12 7.75C11.0335 7.75 10.25 6.9665 10.25 6C10.25 5.0335 11.0335 4.25 12 4.25C12.9665 4.25 13.75 5.0335 13.75 6C13.75 6.9665 12.9665 7.75 12 7.75ZM12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75ZM10.25 18C10.25 18.9665 11.0335 19.75 12 19.75C12.9665 19.75 13.75 18.9665 13.75 18C13.75 17.0335 12.9665 16.25 12 16.25C11.0335 16.25 10.25 17.0335 10.25 18Z"
      fill="currentColor"
    />
  </svg>
);

/** Expand / Floating Window Icon (Figma node 1663:44071 / 1569:7501) */
export const BottomAppBarExpandIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M15 3H21V9M21 3L13.5 10.5M9 21H3V15M3 21L10.5 13.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Minimize / Collapse Icon */
export const BottomAppBarMinimizeIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M4 14H10V20M10 14L3 21M20 10H14V4M14 10L21 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Close Icon */
export const BottomAppBarCloseIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ==========================================================================
   DEFAULT MOCK DATA
   ========================================================================== */
export const DEFAULT_BOTTOM_PROMPTS = [
  'Prompt suggestion',
  'Prompt suggestion',
  'Prompt'
];

export const DEFAULT_BOTTOM_PROJECTS = [
  'Project headline',
  'Audit Automation 2026',
  'Tax Analytics Engine',
  'Advisory Intelligence'
];

/* ==========================================================================
   BOTTOM APP BARS TEXT COMPONENT (Figma Node 1380:6133)
   Variants:
   - 'default': 100px min-height
   - 'with-verification': 126px min-height ("Verified by KPMG Trusted AI")
   - 'with-project': 176px min-height ("Working on [Project headline ▼]")
   - 'with-button': 176px min-height (White Action Pill Button with checkmark)
   - 'with-project-and-button': 176px min-height (Project Dropdown + Action Button)
   - 'with-prompts': 226px min-height (Prompt Suggestion Chips + Project & Button)
   ========================================================================== */
export const BottomAppBarsText = forwardRef(function BottomAppBarsText(
  {
    state = 'default',
    placeholder = 'Ask me anything',
    value,
    defaultValue = '',
    onChange,
    onSend,
    onMicClick,
    onExpandClick,
    selectedProject: controlledProject,
    projects = DEFAULT_BOTTOM_PROJECTS,
    onSelectProject,
    buttonLabel = 'Label',
    onButtonClick,
    prompts = DEFAULT_BOTTOM_PROMPTS,
    suggestions,
    suggestionList,
    onSelectPrompt,
    showVerification = false,
    enableFilePicker = true,
    enableAttachment = true,
    showAttachment,
    enableMic = true,
    showMicrophone,
    enableSend = true,
    showSend,
    enableExpand = true,
    showExpand,
    initialFiles = [],
    className = '',
    style = {},
    expanded: controlledExpanded,
    defaultExpanded = false,
    onExpandToggle,
    ...props
  },
  ref
) {
  const canAttach = (showAttachment !== undefined ? showAttachment : enableAttachment) && enableFilePicker;
  const canMic = showMicrophone !== undefined ? showMicrophone : enableMic;
  const canSend = showSend !== undefined ? showSend : enableSend;
  const canExpand = showExpand !== undefined ? showExpand : enableExpand;
  const promptsList = suggestions || suggestionList || prompts || DEFAULT_BOTTOM_PROMPTS;

  // Input text state
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentText = isControlled ? value : internalValue;

  // 300px expanded editor state vs thin & slim first view mode
  const isExpandControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = isExpandControlled ? controlledExpanded : internalExpanded;

  const hasUserManuallyCollapsed = useRef(false);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check if text cannot fit in the first line (overflows single line view)
  const checkOverflow = () => {
    if (!currentText) {
      setIsOverflowing(false);
      return;
    }
    if (currentText.includes('\n')) {
      setIsOverflowing(true);
      return;
    }
    if (inputRef.current) {
      const el = inputRef.current;
      const overflows = el.scrollWidth > el.clientWidth + 2 || currentText.length > 32;
      setIsOverflowing(overflows);
    } else {
      setIsOverflowing(currentText.length > 32);
    }
  };

  useEffect(() => {
    checkOverflow();
  }, [currentText]);

  useEffect(() => {
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [currentText]);

  // Maintain focus on transition between input and textarea
  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    } else if (!isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleToggleExpand = () => {
    const nextState = !isExpanded;
    if (!nextState) {
      // User clicked to return to thin & slim
      hasUserManuallyCollapsed.current = true;
    } else {
      hasUserManuallyCollapsed.current = false;
    }
    if (!isExpandControlled) {
      setInternalExpanded(nextState);
    }
    if (onExpandToggle) onExpandToggle(nextState);
    if (onExpandClick) onExpandClick(nextState);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    if (onChange) onChange(e);

    const el = e.target;
    const overflows = Boolean(val && (val.includes('\n') || el.scrollWidth > el.clientWidth + 2 || val.length > 32));
    setIsOverflowing(overflows);
  };

  // Project dropdown state
  const [selectedProject, setSelectedProject] = useState(controlledProject || projects[0] || 'Project headline');
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const projectMenuRef = useRef(null);

  useEffect(() => {
    if (controlledProject !== undefined) {
      setSelectedProject(controlledProject);
    }
  }, [controlledProject]);

  // Close project menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (projectMenuRef.current && !projectMenuRef.current.contains(e.target)) {
        setIsProjectMenuOpen(false);
      }
    };
    if (isProjectMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProjectMenuOpen]);

  // Filepicker state & ref
  const fileInputRef = useRef(null);
  const [attachedFiles, setAttachedFiles] = useState(initialFiles);

  const handlePaperclipClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      }));
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setAttachedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Send action
  const handleSend = () => {
    if (onSend) {
      onSend(currentText, attachedFiles);
    }
    if (!isControlled) {
      setInternalValue('');
    }
    if (!isExpandControlled) {
      setInternalExpanded(false);
    }
    hasUserManuallyCollapsed.current = false;
  };

  // Suggestion click directly triggers content as payload and sends right away
  const handleSuggestionClick = (promptText) => {
    if (!isControlled) {
      setInternalValue(promptText);
    }
    if (onSelectPrompt) {
      onSelectPrompt(promptText);
    }
    if (onSend) {
      onSend(promptText, attachedFiles);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Determine which rows to show based on state variant
  const hasVerification = state === 'with-verification' || showVerification;
  const hasProject = state === 'with-project' || state === 'with-project-and-button' || state === 'with-prompts';
  const hasButton = state === 'with-button' || state === 'with-project-and-button' || state === 'with-prompts';
  const hasPrompts = state === 'with-prompts';

  // Compute modifier class
  const variantClass = `kpmg-bottom-appbar--${state} ${isExpanded ? 'kpmg-bottom-appbar--expanded-input' : ''}`;

  return (
    <div
      ref={ref}
      className={`kpmg-bottom-appbar ${variantClass} ${className}`}
      style={style}
      role="region"
      aria-label="Bottom Application Bar"
      {...props}
    >
      {/* Hidden File Picker Input */}
      {canAttach && (
        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
          aria-hidden="true"
        />
      )}

      {/* Row 1: Suggestion Chips (Visible on 'with-prompts') */}
      {hasPrompts && promptsList && promptsList.length > 0 && (
        <div className="kpmg-bottom-appbar__prompts-row" role="group" aria-label="Suggested prompts">
          {promptsList.map((promptText, idx) => (
            <button
              key={idx}
              type="button"
              className="kpmg-bottom-appbar__suggestion-chip"
              onClick={() => handleSuggestionClick(promptText)}
              title={`Send: "${promptText}"`}
            >
              {promptText}
            </button>
          ))}
        </div>
      )}

      {/* Row 2: Top Auxiliary Row (Project headline dropdown and/or Action button) */}
      {(hasProject || hasButton) && (
        <div
          className={`kpmg-bottom-appbar__header-row ${hasProject && hasButton
              ? ''
              : hasProject
                ? ''
                : 'kpmg-bottom-appbar__header-row--end'
            }`}
        >
          {/* Project Dropdown */}
          {hasProject && (
            <div className="kpmg-bottom-appbar__project-group" ref={projectMenuRef}>
              <span className="kpmg-bottom-appbar__project-label">Working on</span>
              <div className="kpmg-bottom-appbar__project-anchor" style={{ position: 'relative', display: 'inline-flex' }}>
                <button
                  type="button"
                  className="kpmg-bottom-appbar__project-pill"
                  onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                  aria-expanded={isProjectMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="kpmg-bottom-appbar__project-pill-text">{selectedProject}</span>
                  <span
                    className={`kpmg-bottom-appbar__project-chevron ${isProjectMenuOpen ? 'kpmg-bottom-appbar__project-chevron--open' : ''
                      }`}
                  >
                    <BottomAppBarChevronIcon size={16} />
                  </span>
                </button>

                {/* Dropdown Menu (Inline View) */}
                {isProjectMenuOpen && (
                  <div className="kpmg-bottom-appbar__project-dropdown-container">
                    <Menu inline type="dropdown" width={240}>
                      {projects.map((proj, idx) => {
                        if (proj === '-' || proj?.type === 'divider') {
                          return <MenuDivider key={`divider-${idx}`} />;
                        }
                        const label = typeof proj === 'string' ? proj : proj.label || proj.name;
                        const isSelected = label === selectedProject;
                        return (
                          <MenuItem
                            key={label || idx}
                            type="checklist"
                            selected={isSelected}
                            label={label}
                            onClick={() => {
                              setSelectedProject(label);
                              setIsProjectMenuOpen(false);
                              if (onSelectProject) onSelectProject(label);
                            }}
                          />
                        );
                      })}
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button (White Pill with checkmark) */}
          {hasButton && (
            <button
              type="button"
              className="kpmg-bottom-appbar__action-btn"
              onClick={onButtonClick}
            >
              <span className="kpmg-bottom-appbar__action-btn-icon">
                <BottomAppBarCheckmarkIcon size={16} />
              </span>
              <span className="kpmg-bottom-appbar__action-btn-text">{buttonLabel}</span>
            </button>
          )}
        </div>
      )}

      {/* Row 3: Attached Files Preview Chips */}
      {canAttach && attachedFiles && attachedFiles.length > 0 && (
        <div className="kpmg-bottom-appbar__files-row" aria-label="Attached files">
          {attachedFiles.map((file, idx) => (
            <div key={idx} className="kpmg-bottom-appbar__file-chip">
              <BottomAppBarAttachIcon size={14} />
              <span>{file.name}</span>
              <button
                type="button"
                className="kpmg-bottom-appbar__file-chip-remove"
                onClick={() => handleRemoveFile(idx)}
                aria-label={`Remove file ${file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Row 4: Main Input Field: Thin & Slim Pill (52px) OR Expanded Editor (300px) */}
      {!isExpanded ? (
        <div className="kpmg-bottom-appbar__input-pill">
          {/* Paperclip / Attach Filepicker button */}
          {canAttach && (
            <button
              type="button"
              className="kpmg-bottom-appbar__pill-btn"
              onClick={handlePaperclipClick}
              title="Attach file"
              aria-label="Attach file"
            >
              <BottomAppBarAttachIcon size={20} />
            </button>
          )}

          {/* Text Input (Thin and slim mode) */}
          <div className="kpmg-bottom-appbar__pill-input-wrap">
            <input
              ref={inputRef}
              type="text"
              className="kpmg-bottom-appbar__pill-input"
              placeholder={placeholder}
              value={currentText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              aria-label={placeholder}
            />
          </div>

          {/* Action icons: Microphone, Send, Expand to 300px */}
          <div className="kpmg-bottom-appbar__pill-actions">
            {canMic && (
              <button
                type="button"
                className="kpmg-bottom-appbar__pill-btn"
                onClick={onMicClick}
                title="Voice input"
                aria-label="Voice input"
              >
                <BottomAppBarMicIcon size={20} />
              </button>
            )}

            {canSend && (
              <button
                type="button"
                className="kpmg-bottom-appbar__pill-btn"
                onClick={handleSend}
                title="Send prompt"
                aria-label="Send prompt"
              >
                <BottomAppBarArrowUpIcon size={20} />
              </button>
            )}

            {/* Expand button: ONLY visible when text cannot fit in the first line! */}
            {canExpand && isOverflowing && (
              <button
                type="button"
                className="kpmg-bottom-appbar__pill-btn kpmg-bottom-appbar__pill-btn--expand"
                onClick={handleToggleExpand}
                title="Expand editor (300px)"
                aria-label="Expand editor to 300px"
              >
                <BottomAppBarExpandIcon size={20} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="kpmg-bottom-appbar__input-pill kpmg-bottom-appbar__input-pill--expanded">
          {/* Multi-line Textarea (Expanded 300px mode) */}
          <textarea
            ref={textareaRef}
            className="kpmg-bottom-appbar__pill-textarea"
            placeholder={placeholder}
            value={currentText}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            aria-label={placeholder}
          />

          {/* Bottom Action Bar inside 300px Expanded Pill */}
          <div className="kpmg-bottom-appbar__pill-expanded-footer">
            <div className="kpmg-bottom-appbar__pill-expanded-left">
              {canAttach && (
                <button
                  type="button"
                  className="kpmg-bottom-appbar__pill-btn"
                  onClick={handlePaperclipClick}
                  title="Attach file"
                  aria-label="Attach file"
                >
                  <BottomAppBarAttachIcon size={20} />
                </button>
              )}
              {canAttach && attachedFiles && attachedFiles.length > 0 && (
                <span style={{ fontSize: '12px', color: 'var(--color-primary-action, #1a28c1)', fontWeight: 600 }}>
                  {attachedFiles.length} file{attachedFiles.length > 1 ? 's' : ''} attached
                </span>
              )}
            </div>

            <div className="kpmg-bottom-appbar__pill-expanded-right">
              {canMic && (
                <button
                  type="button"
                  className="kpmg-bottom-appbar__pill-btn"
                  onClick={onMicClick}
                  title="Voice input"
                  aria-label="Voice input"
                >
                  <BottomAppBarMicIcon size={20} />
                </button>
              )}

              {canSend && (
                <button
                  type="button"
                  className="kpmg-bottom-appbar__pill-btn"
                  onClick={handleSend}
                  title="Send prompt"
                  aria-label="Send prompt"
                >
                  <BottomAppBarArrowUpIcon size={20} />
                </button>
              )}

              {/* Collapse button: returns to thin & slim first view mode */}
              {canExpand && (
                <button
                  type="button"
                  className="kpmg-bottom-appbar__pill-btn kpmg-bottom-appbar__pill-btn--collapse"
                  onClick={handleToggleExpand}
                  title="Collapse editor (thin & slim mode)"
                  aria-label="Collapse editor to thin & slim mode"
                >
                  <BottomAppBarMinimizeIcon size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Row 5: Verification Footnote */}
      {hasVerification && (
        <div className="kpmg-bottom-appbar__verification">
          Verified by KPMG Trusted AI
        </div>
      )}
    </div>
  );
});


BottomAppBarsText.propTypes = {
  state: PropTypes.oneOf([
    'default',
    'with-verification',
    'with-project',
    'with-button',
    'with-project-and-button',
    'with-prompts',
  ]),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onSend: PropTypes.func,
  onMicClick: PropTypes.func,
  onExpandClick: PropTypes.func,
  selectedProject: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.string),
  onSelectProject: PropTypes.func,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
  prompts: PropTypes.arrayOf(PropTypes.string),
  suggestions: PropTypes.arrayOf(PropTypes.string),
  suggestionList: PropTypes.arrayOf(PropTypes.string),
  onSelectPrompt: PropTypes.func,
  showVerification: PropTypes.bool,
  enableFilePicker: PropTypes.bool,
  enableAttachment: PropTypes.bool,
  showAttachment: PropTypes.bool,
  enableMic: PropTypes.bool,
  showMicrophone: PropTypes.bool,
  enableSend: PropTypes.bool,
  showSend: PropTypes.bool,
  enableExpand: PropTypes.bool,
  showExpand: PropTypes.bool,
  initialFiles: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  style: PropTypes.object,
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  onExpandToggle: PropTypes.func,
};

/* ==========================================================================
   BOTTOM APP BARS VOICE COMPONENT (Figma Node 1883:52191)
   States:
   - mute: false (Active voice mode with glowing gradient & active mic)
   - mute: true (Muted voice mode with muted gradient & mute icon)
   ========================================================================== */
export const BottomAppBarsVoice = forwardRef(function BottomAppBarsVoice(
  {
    mute = false,
    onToggleMute,
    voiceText = 'Touch to return to search',
    onReturnToSearch,
    onExpandClick,
    className = '',
    style = {},
    ...props
  },
  ref
) {
  const [isVoice, setIsVoice] = useState(true);
  const isMuted = Boolean(mute);

  if (!isVoice) {
    return (
      <BottomAppBarsText
        ref={ref}
        state="default"
        placeholder="Ask me anything"
        onMicClick={() => setIsVoice(true)}
        className={className}
        style={style}
        {...props}
      />
    );
  }

  const handleReturnToSearch = (e) => {
    if (onReturnToSearch) {
      onReturnToSearch(e);
    }
    setIsVoice(false);
  };

  return (
    <div
      ref={ref}
      className={`kpmg-bottom-appbar kpmg-bottom-appbar--voice ${className}`}
      style={style}
      role="region"
      aria-label="Voice Bottom Bar"
      {...props}
    >
      <div
        className={`kpmg-bottom-appbar__voice-pill ${isMuted ? 'kpmg-bottom-appbar__voice-pill--muted' : ''
          }`}
      >
        {/* Toggle Mute / Mic Button */}
        <button
          type="button"
          className={`kpmg-bottom-appbar__voice-btn ${!isMuted ? 'kpmg-bottom-appbar__voice-btn--pulse' : ''
            }`}
          onClick={onToggleMute}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          aria-pressed={isMuted}
        >
          {isMuted ? (
            <BottomAppBarMuteIcon size={24} />
          ) : (
            <BottomAppBarMicIcon size={22} />
          )}
        </button>

        {/* Center Text Action: Touch to return to search */}
        <button
          type="button"
          className="kpmg-bottom-appbar__voice-text-btn"
          onClick={handleReturnToSearch}
        >
          {voiceText}
        </button>

        {/* Expand / Minimize Button */}
        <button
          type="button"
          className="kpmg-bottom-appbar__voice-btn"
          onClick={onExpandClick}
          title="Expand Voice UI"
          aria-label="Expand Voice UI"
        >
          <BottomAppBarExpandIcon size={20} />
        </button>
      </div>
    </div>
  );
});

BottomAppBarsVoice.propTypes = {
  mute: PropTypes.bool,
  onToggleMute: PropTypes.func,
  voiceText: PropTypes.string,
  onReturnToSearch: PropTypes.func,
  onExpandClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

/* ==========================================================================
   UNIFIED BOTTOM APP BAR COMPONENT
   Easily switches between mode="text" and mode="voice"
   ========================================================================== */
export const BottomAppBar = forwardRef(function BottomAppBar(
  {
    mode = 'text',
    onModeChange,
    mute = false,
    onToggleMute,
    state = 'default',
    ...textProps
  },
  ref
) {
  if (mode === 'voice') {
    return (
      <BottomAppBarsVoice
        ref={ref}
        mute={mute}
        onToggleMute={onToggleMute}
        onReturnToSearch={() => {
          if (onModeChange) onModeChange('text');
        }}
        {...textProps}
      />
    );
  }

  return (
    <BottomAppBarsText
      ref={ref}
      state={state}
      onMicClick={() => {
        if (onModeChange) onModeChange('voice');
      }}
      {...textProps}
    />
  );
});

BottomAppBar.propTypes = {
  mode: PropTypes.oneOf(['text', 'voice']),
  onModeChange: PropTypes.func,
  mute: PropTypes.bool,
  onToggleMute: PropTypes.func,
  state: PropTypes.string,
  enableMic: PropTypes.bool,
  showMicrophone: PropTypes.bool,
  enableAttachment: PropTypes.bool,
  showAttachment: PropTypes.bool,
  enableSend: PropTypes.bool,
  showSend: PropTypes.bool,
  enableExpand: PropTypes.bool,
  showExpand: PropTypes.bool,
  prompts: PropTypes.arrayOf(PropTypes.string),
  suggestions: PropTypes.arrayOf(PropTypes.string),
  suggestionList: PropTypes.arrayOf(PropTypes.string),
};

/* ==========================================================================
   CHAT DOCKED PANEL (Figma Node 1324:157533 & Node 1451:12212)
   Provides the expanded chat or voice docked panel!
   ========================================================================== */
export const ChatDockedUI = forwardRef(function ChatDockedUI(
  {
    mode = 'text', // 'text' or 'voice'
    onClose,
    onModeToggle,
    bottomAppBarProps = {},
    initialMessages = [
      { id: 1, sender: 'assistant', text: 'Hello! I am your KPMG Workbench AI Assistant. How can I help you today?' },
      { id: 2, sender: 'user', text: 'Can you summarize the recent audit compliance requirements?' },
      { id: 3, sender: 'assistant', text: 'Certainly! According to the 2026 guidelines, compliance requires automated trail auditing and end-to-end data encryption.' },
    ],
    className = '',
    style = {},
    ...props
  },
  ref
) {
  const [messages, setMessages] = useState(initialMessages);
  const [dockedMode, setDockedMode] = useState(mode);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);

  useEffect(() => {
    setDockedMode(mode);
  }, [mode]);

  const handleSendMessage = (text, files) => {
    if (!text && (!files || files.length === 0)) return;
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: text + (files && files.length > 0 ? ` [Attached: ${files.map(f => f.name).join(', ')}]` : ''),
    };
    setMessages((prev) => [...prev, newMsg]);

    // Simulated assistant response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: `Processed your request regarding "${text.slice(0, 30)}...". All checks passed.`,
        },
      ]);
    }, 600);
  };

  const isVoice = dockedMode === 'voice';

  return (
    <div
      ref={ref}
      className={`kpmg-bottom-docked-panel ${isVoice ? 'kpmg-bottom-docked-panel--voice' : ''} ${className}`}
      style={style}
      role="dialog"
      aria-label={isVoice ? 'Voice Assistant' : 'Chat Assistant'}
      {...props}
    >
      {/* Docked Header (66px) */}
      <div className="kpmg-bottom-docked-header">
        <div className="kpmg-bottom-docked-header__drag" aria-hidden="true" />

        <div className="kpmg-bottom-docked-header__actions">
          <button
            type="button"
            className="kpmg-bottom-appbar__pill-btn"
            style={{ width: 32, height: 32 }}
            onClick={() => {
              const nextMode = dockedMode === 'text' ? 'voice' : 'text';
              setDockedMode(nextMode);
              if (onModeToggle) onModeToggle(nextMode);
            }}
            title={isVoice ? 'Switch to Chat' : 'Switch to Voice'}
            aria-label={isVoice ? 'Switch to Chat' : 'Switch to Voice'}
          >
            {isVoice ? <BottomAppBarAttachIcon size={16} /> : <BottomAppBarMicIcon size={16} />}
          </button>

          <button
            type="button"
            className="kpmg-bottom-appbar__pill-btn"
            style={{ width: 32, height: 32 }}
            title="More Options"
            aria-label="More Options"
          >
            <BottomAppBarMoreVerticalIcon size={16} />
          </button>

          {onClose && (
            <button
              type="button"
              className="kpmg-bottom-appbar__pill-btn"
              style={{ width: 32, height: 32 }}
              onClick={onClose}
              title="Close panel"
              aria-label="Close panel"
            >
              <BottomAppBarCloseIcon size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Docked Body: Chat Stream or Voice Audio Visualizer */}
      {!isVoice ? (
        <div className="kpmg-bottom-docked-body">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`kpmg-bottom-docked-message ${m.sender === 'user'
                  ? 'kpmg-bottom-docked-message--user'
                  : 'kpmg-bottom-docked-message--assistant'
                }`}
            >
              {m.text}
            </div>
          ))}
        </div>
      ) : (
        <div className="kpmg-bottom-docked-transcript">
          <div className="kpmg-bottom-docked-audio-bars">
            <span className="kpmg-bottom-docked-audio-bar" style={{ animationDelay: '0.1s' }} />
            <span className="kpmg-bottom-docked-audio-bar" style={{ animationDelay: '0.3s' }} />
            <span className="kpmg-bottom-docked-audio-bar" style={{ animationDelay: '0.5s' }} />
            <span className="kpmg-bottom-docked-audio-bar" style={{ animationDelay: '0.2s' }} />
            <span className="kpmg-bottom-docked-audio-bar" style={{ animationDelay: '0.4s' }} />
            <span className="kpmg-bottom-docked-audio-bar" style={{ animationDelay: '0.6s' }} />
          </div>
          <p className="kpmg-bottom-docked-transcript__text">
            This is a multi-line text string that captures a transcript of the audio message from your AI assistant. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit.
          </p>
        </div>
      )}

      {/* Docked Footer (Bottom App Bar) */}
      <div className="kpmg-bottom-docked-footer">
        {isVoice ? (
          <BottomAppBarsVoice
            mute={isVoiceMuted}
            onToggleMute={() => setIsVoiceMuted(!isVoiceMuted)}
            onReturnToSearch={() => setDockedMode('text')}
            {...bottomAppBarProps}
          />
        ) : (
          <BottomAppBarsText
            state="with-project"
            onSend={handleSendMessage}
            onMicClick={() => setDockedMode('voice')}
            {...bottomAppBarProps}
          />
        )}
      </div>
    </div>
  );
});

ChatDockedUI.propTypes = {
  mode: PropTypes.oneOf(['text', 'voice']),
  onClose: PropTypes.func,
  onModeToggle: PropTypes.func,
  bottomAppBarProps: PropTypes.object,
  initialMessages: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  style: PropTypes.object,
};


/* ==========================================================================
   POLYMORPHIC / UNIFIED APPBAR EXPORT
   ========================================================================== */

/**
 * AppBars Unified Component
 *
 * Scalable entry point supporting Figma variant categories:
 * - variant="full": Standard primary header (type="default" | "with-action")
 * - variant="nested": Contextual header (size="small" | "large", state="default" | "filled")
 * - variant="special": Search / landing header (size="extra-small" | "small" | "large")
 * - variant="bottom": Bottom App Bar (mode="text" | "voice", state="default" | "with-verification" | "with-project" | "with-button" | "with-project-and-button" | "with-prompts")
 * - variant="bottom-docked": Expanded chat or voice docked panel
 */
export const AppBars = forwardRef(({
  variant = 'full', // 'full' | 'nested' | 'special' | 'bottom' | 'bottom-docked'
  ...props
}, ref) => {
  switch (variant) {
    case 'nested':
      return <AppBarNested ref={ref} {...props} />;
    case 'special':
      return <AppBarSpecial ref={ref} {...props} />;
    case 'bottom':
    case 'bottom-bar':
      return <BottomAppBar ref={ref} {...props} />;
    case 'bottom-text':
      return <BottomAppBarsText ref={ref} {...props} />;
    case 'bottom-voice':
      return <BottomAppBarsVoice ref={ref} {...props} />;
    case 'bottom-docked':
    case 'chat-docked':
      return <ChatDockedUI ref={ref} {...props} />;
    case 'full':
    default:
      return <AppBarFull ref={ref} {...props} />;
  }
});

AppBars.displayName = 'AppBars';
AppBars.propTypes = {
  /** Primary app bar category variant (Figma component family) */
  variant: PropTypes.oneOf([
    'full',
    'nested',
    'special',
    'bottom',
    'bottom-bar',
    'bottom-text',
    'bottom-voice',
    'bottom-docked',
    'chat-docked',
  ]),
  /** Bar layout type (used by "full" variant: "default" 64px or "with-action" 128px) */
  type: PropTypes.oneOf(['default', 'with-action']),
  /** Size scale (used by "nested": "small" | "large"; "special": "extra-small" | "small" | "large") */
  size: PropTypes.oneOf(['extra-small', 'small', 'large']),
  /** Visual state across nested, bottom, and voice variants */
  state: PropTypes.string,
  /** Brand wordmark or label in primary header */
  brandLabel: PropTypes.node,
  /** Breadcrumb trail items (array of route strings or item objects) */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
  /** Toggle breadcrumbs hierarchy vs single page title mode */
  showBreadcrumbs: PropTypes.bool,
  /** Page title displayed when breadcrumbs are hidden or in compact nested view */
  pageTitle: PropTypes.node,
  /** Display title in nested hero bar */
  title: PropTypes.node,
  /** Subheader category label displayed above nested hero title */
  subheader: PropTypes.node,
  /** Status badge type in nested bars */
  statusType: PropTypes.oneOf(['configuring', 'completed', 'saved', 'reviewed']),
  /** Linear progress percentage for configuring status (0-100) */
  statusProgress: PropTypes.number,
  /** Personalized dashboard greeting text */
  greeting: PropTypes.node,
  /** Hero display welcome title in special bar */
  welcomeHeader: PropTypes.node,
  /** Search/prompt input placeholder text across special and bottom bars */
  placeholder: PropTypes.string,
  /** Search placeholder alias */
  searchPlaceholder: PropTypes.string,
  /** Whether search pill is visible in special landing bar */
  withSearch: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Category or project filter pill tags */
  filterChips: PropTypes.arrayOf(PropTypes.string),
  /** Enables or disables microphone voice input button */
  enableMic: PropTypes.bool,
  /** Enables or disables file attachment button */
  enableAttach: PropTypes.bool,
  /** Contextual action button label in bottom app bar */
  buttonLabel: PropTypes.string,
  /** Working project headline in bottom app bar project selector */
  projectLabel: PropTypes.string,
  /** Bottom app bar or docked panel mode */
  mode: PropTypes.oneOf(['text', 'voice']),
  /** Mute toggle state for voice mode */
  isMuted: PropTypes.bool,
  /** Expanded/collapsed state for docked chat/voice panel */
  isOpen: PropTypes.bool,
  /** Additional custom CSS classes */
  className: PropTypes.string,
};

AppBars.defaultProps = {
  variant: 'full',
  type: 'default',
  size: 'small',
  state: 'default',
  brandLabel: 'KPMG',
  showBreadcrumbs: true,
  greeting: 'Greeting, name',
  welcomeHeader: 'Welcome',
  placeholder: 'Ask me anything',
  withSearch: true,
  enableMic: true,
  enableAttach: true,
  buttonLabel: 'Review Changes',
  projectLabel: 'Working on project headline',
  mode: 'text',
  isMuted: false,
  isOpen: true,
};

/* Unified Component Aliases */
export const AppBarBottom = BottomAppBar;
export const AppBarBottomText = BottomAppBarsText;
export const AppBarBottomVoice = BottomAppBarsVoice;
export const AppBarBottomDocked = ChatDockedUI;

export default AppBars;
