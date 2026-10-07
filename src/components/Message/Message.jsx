import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import './Message.css';

/* ==========================================================================
   CANONICAL FIGMA SVG COMPONENTS
   Exact vectors extracted from Figma Node 1364:49461
   ========================================================================== */

/** Thumbs Up (Like) Icon (24x24) - Exact Figma Vector */
export const MessageThumbsUpIcon = ({ size = 24, color = 'currentColor', ...props }) => (
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
      d="M16.4996 5.20259C16.4996 2.76065 15.3595 1.00391 13.4932 1.00391C12.467 1.00391 12.1149 1.60527 11.747 3.00348C11.6719 3.29233 11.635 3.43297 11.596 3.57157C11.495 3.93031 11.3192 4.54106 11.069 5.40258C11.0623 5.42566 11.0524 5.44741 11.0396 5.46749L8.17281 9.95315C7.49476 11.0141 6.49429 11.8296 5.31841 12.2798L4.84513 12.461C3.5984 12.9384 2.87457 14.2421 3.1287 15.5527L3.53319 17.6388C3.77462 18.8839 4.71828 19.8748 5.9501 20.1767L13.5778 22.0462C16.109 22.6666 18.6674 21.1317 19.3113 18.6064L20.7262 13.0572C21.1697 11.3179 20.1192 9.54845 18.3799 9.10498C18.1175 9.03807 17.8478 9.00422 17.5769 9.00422H15.7536C16.2497 7.37133 16.4996 6.11155 16.4996 5.20259ZM4.60127 15.2672C4.48576 14.6715 4.81477 14.0788 5.38147 13.8619L5.85475 13.6806C7.33036 13.1157 8.58585 12.0923 9.43674 10.7609L12.3035 6.27526C12.3935 6.13437 12.4629 5.98131 12.5095 5.82074C12.7608 4.95574 12.9375 4.34175 13.0399 3.97786C13.083 3.82461 13.1239 3.66916 13.1976 3.38519C13.3875 2.66348 13.4809 2.50391 13.4932 2.50391C14.3609 2.50391 14.9996 3.48797 14.9996 5.20259C14.9996 6.08708 14.6738 7.53803 14.0158 9.51766C13.8544 10.0032 14.2158 10.5042 14.7275 10.5042H17.5769C17.7228 10.5042 17.868 10.5224 18.0093 10.5585C18.9459 10.7973 19.5115 11.7501 19.2727 12.6866L17.8578 18.2357C17.4172 19.9636 15.6668 21.0138 13.9349 20.5893L6.30718 18.7198C5.64389 18.5572 5.13577 18.0237 5.00577 17.3532L4.60127 15.2672Z"
      fill={color}
    />
  </svg>
);

/** Thumbs Down (Dislike) Icon (24x24) - Exact Figma Vector */
export const MessageThumbsDownIcon = ({ size = 24, color = 'currentColor', ...props }) => (
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
      d="M16.4996 17.9852C16.4996 20.4271 15.3595 22.1838 13.4932 22.1838C12.5183 22.1838 12.1518 21.6411 11.8021 20.3881L11.596 19.6162C11.495 19.2574 11.3192 18.6467 11.069 17.7852C11.0623 17.7621 11.0524 17.7403 11.0396 17.7203L8.17281 13.2346C7.49476 12.1736 6.49429 11.3581 5.31841 10.9079L4.84513 10.7267C3.5984 10.2494 2.87457 8.94562 3.1287 7.63505L3.53319 5.54897C3.77462 4.30388 4.71828 3.31298 5.9501 3.01106L13.5778 1.14153C16.109 0.521138 18.6674 2.05607 19.3113 4.5814L20.7262 10.1306C21.1697 11.8698 20.1192 13.6393 18.3799 14.0828C18.1175 14.1497 17.8478 14.1835 17.5769 14.1835H15.7536C16.2497 15.8164 16.4996 17.0762 16.4996 17.9852ZM4.60127 7.92059C4.48576 8.5163 4.81477 9.10893 5.38147 9.3259L5.85475 9.5071C7.33036 10.0721 8.58585 11.0954 9.43674 12.4268L12.3035 16.9125C12.3935 17.0534 12.4629 17.2064 12.5095 17.367L13.0614 19.2873L13.2731 20.0786C13.4125 20.5666 13.4827 20.6838 13.4932 20.6838C14.3609 20.6838 14.9996 19.6998 14.9996 17.9852C14.9996 17.1007 14.6738 15.6497 14.0158 13.6701C13.8544 13.1846 14.2158 12.6835 14.7275 12.6835H17.5769C17.7228 12.6835 17.868 12.6653 18.0093 12.6293C18.9459 12.3905 19.5115 11.4377 19.2727 10.5012L17.8578 4.952C17.4172 3.22415 15.6668 2.17393 13.9349 2.59841L6.30718 4.46794C5.64389 4.63051 5.13577 5.16407 5.00577 5.83451L4.60127 7.92059Z"
      fill={color}
    />
  </svg>
);

/** Speaker (Audio) Icon (24x24) - Exact Figma Vector */
export const MessageSpeakerIcon = ({ size = 24, color = 'currentColor', ...props }) => (
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
      d="M15 4.24999C15 3.17137 13.7255 2.59913 12.9195 3.31581L8.42794 7.30908C8.29065 7.43114 8.11333 7.49857 7.92961 7.49857H4.25C3.00736 7.49857 2 8.50593 2 9.74857V14.2465C2 15.4891 3.00736 16.4965 4.25 16.4965H7.92956C8.11329 16.4965 8.29063 16.5639 8.42793 16.686L12.9194 20.6797C13.7255 21.3965 15 20.8242 15 19.7456V4.24999ZM9.4246 8.43009L13.5 4.80677V19.1888L9.42465 15.565C9.01275 15.1988 8.48074 14.9965 7.92956 14.9965H4.25C3.83579 14.9965 3.5 14.6607 3.5 14.2465V9.74857C3.5 9.33436 3.83579 8.99857 4.25 8.99857H7.92961C8.48075 8.99857 9.01272 8.79629 9.4246 8.43009ZM18.9916 5.89731C19.3244 5.65078 19.7941 5.72075 20.0407 6.05361C21.2717 7.71569 22 9.77388 22 12C22 14.2261 21.2717 16.2843 20.0407 17.9464C19.7941 18.2793 19.3244 18.3492 18.9916 18.1027C18.6587 17.8562 18.5888 17.3865 18.8353 17.0536C19.8815 15.6411 20.5 13.8938 20.5 12C20.5 10.1062 19.8815 8.35895 18.8353 6.9464C18.5888 6.61354 18.6587 6.14385 18.9916 5.89731ZM17.143 8.36931C17.5072 8.17212 17.9624 8.30756 18.1596 8.67182C18.6958 9.66243 19 10.7968 19 12C19 13.2032 18.6958 14.3375 18.1596 15.3281C17.9624 15.6924 17.5072 15.8279 17.143 15.6307C16.7787 15.4335 16.6432 14.9783 16.8404 14.6141C17.2609 13.8373 17.5 12.9477 17.5 12C17.5 11.0523 17.2609 10.1627 16.8404 9.38592C16.6432 9.02165 16.7787 8.5665 17.143 8.36931Z"
      fill={color}
    />
  </svg>
);

/** Document Copy Icon (24x24) - Exact Figma Vector */
export const MessageCopyIcon = ({ size = 24, color = 'currentColor', ...props }) => (
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
      d="M5.5028 4.62704L5.5 6.75V17.2542C5.5 19.0491 6.95507 20.5042 8.75 20.5042L17.3663 20.5045C17.0573 21.3782 16.224 22.0042 15.2444 22.0042H8.75C6.12665 22.0042 4 19.8776 4 17.2542V6.75C4 5.76929 4.62745 4.93512 5.5028 4.62704ZM13.1284 2C13.7254 2 14.2979 2.23723 14.7199 2.65947L19.3383 7.28054C19.7599 7.70246 19.9968 8.27455 19.9968 8.87107V17.2542C19.9968 18.4969 18.9895 19.5042 17.7468 19.5042H8.75241C7.50977 19.5042 6.50241 18.4969 6.50241 17.2542V4.25C6.50241 3.00736 7.50977 2 8.75241 2H13.1284ZM12.9994 3.5H8.75241C8.33819 3.5 8.00241 3.83579 8.00241 4.25V17.2542C8.00241 17.6684 8.33819 18.0042 8.75241 18.0042H17.7468C18.161 18.0042 18.4968 17.6684 18.4968 17.2542L18.4964 9.003L15.25 9.00389C14.0591 9.00389 13.0844 8.07873 13.0052 6.90794L13 6.75389L12.9994 3.5ZM14.4994 4.561L14.5 6.75389C14.5 7.13359 14.7822 7.44738 15.1482 7.49704L15.25 7.50389L17.4404 7.503L14.4994 4.561Z"
      fill={color}
    />
  </svg>
);

/** Regenerate (Refresh / Replay) Icon (24x24) - Exact Figma Vector */
export const MessageRegenerateIcon = ({ size = 24, color = 'currentColor', ...props }) => (
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
      d="M3.2521 7.62551L3.25229 3.876C3.25229 3.53086 3.53208 3.25107 3.87721 3.25107C4.22235 3.25107 4.50214 3.53086 4.50214 3.876V5.38471C5.55439 4.19113 6.89396 3.24304 8.43223 2.65708C9.32061 2.31749 10.2699 2.10094 11.2592 2.02835C12.3471 1.9465 13.412 2.04372 14.4228 2.29646C18.7749 3.37903 22 7.3129 22 12C22 12.0363 21.9998 12.0726 21.9994 12.1088C21.9952 12.5511 21.9616 12.9882 21.9003 13.4178C21.563 15.7935 20.3908 17.9004 18.6903 19.432C18.0532 20.0065 17.3395 20.5019 16.5626 20.9001C15.3708 21.5122 14.0401 21.8918 12.6302 21.9794C11.3488 22.0616 10.1009 21.8958 8.93735 21.5207C7.94586 21.2018 7.02189 20.7324 6.19238 20.1393C4.05276 18.6121 2.5163 16.2495 2.10667 13.449C2.10219 13.4184 2.09785 13.3877 2.09364 13.357C2.00096 12.6805 1.97828 12.0099 2.02026 11.3527C2.04226 11.0083 2.33931 10.7469 2.68375 10.7689C3.02818 10.7909 3.28956 11.0879 3.26756 11.4324C3.25671 11.6024 3.25079 11.7735 3.24995 11.9456C3.2515 11.9635 3.25229 11.9817 3.25229 12C3.25229 15.8748 5.77124 19.1613 9.26094 20.3112C10.1229 20.5953 11.0441 20.749 12.0012 20.749C12.1841 20.749 12.3657 20.7434 12.5459 20.7323C12.7587 20.7188 12.9726 20.6974 13.1873 20.668C14.2335 20.5247 15.2111 20.2019 16.0932 19.735C19.2471 18.0656 21.1803 14.5536 20.6679 10.8126C20.1667 7.15366 17.4709 4.33476 14.0905 3.5021C13.421 3.33806 12.7213 3.25107 12.0012 3.25107C11.7822 3.25107 11.565 3.25912 11.3501 3.27493C11.1715 3.2884 10.9923 3.30737 10.8125 3.332C10.1616 3.42117 9.53726 3.57974 8.946 3.79924C7.26623 4.42525 5.83039 5.55273 4.82041 7.00058H7.00183C7.34697 7.00058 7.62675 7.28041 7.62675 7.62554C7.62675 7.97068 7.34697 8.25047 7.00183 8.25047H3.87721C3.83269 8.25047 3.78925 8.24581 3.74736 8.23696C3.46445 8.17727 3.2521 7.92619 3.2521 7.62551ZM8.8766 9.4591C8.8766 8.29594 10.1022 7.54067 11.1412 8.06353L16.1904 10.6044C17.3371 11.1815 17.3371 12.8185 16.1904 13.3956L11.1412 15.9365C10.1022 16.4593 8.8766 15.7041 8.8766 14.5409V9.4591ZM10.5794 9.17998C10.3716 9.07541 10.1264 9.22646 10.1264 9.4591V14.5409C10.1264 14.7735 10.3716 14.9246 10.5794 14.82L15.6286 12.2791C15.8579 12.1637 15.8579 11.8363 15.6286 11.7209L10.5794 9.17998Z"
      fill={color}
    />
  </svg>
);

/** Chevron Down Icon (24x24) - Exact Figma Vector */
export const MessageChevronDownIcon = ({ size = 24, color = 'currentColor', ...props }) => (
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
      d="M4.21967 8.46967C4.51256 8.17678 4.98744 8.17678 5.28033 8.46967L12 15.1893L18.7197 8.46967C19.0126 8.17678 19.4874 8.17678 19.7803 8.46967C20.0732 8.76256 20.0732 9.23744 19.7803 9.53033L12.5303 16.7803C12.2374 17.0732 11.7626 17.0732 11.4697 16.7803L4.21967 9.53033C3.92678 9.23744 3.92678 8.76256 4.21967 8.46967Z"
      fill={color}
    />
  </svg>
);

/** Chevron Up Icon (24x24) - Exact Figma Vector */
export const MessageChevronUpIcon = ({ size = 24, color = 'currentColor', ...props }) => (
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
      d="M4.21967 15.5303C4.51256 15.8232 4.98744 15.8232 5.28033 15.5303L12 8.81066L18.7197 15.5303C19.0126 15.8232 19.4874 15.8232 19.7803 15.5303C20.0732 15.2374 20.0732 14.7626 19.7803 14.4697L12.5303 7.21967C12.2374 6.92678 11.7626 6.92678 11.4697 7.21967L4.21967 14.4697C3.92678 14.7626 3.92678 15.2374 4.21967 15.5303Z"
      fill={color}
    />
  </svg>
);

/** More Vertical 3-Dots Menu Icon (24x24) */
export const MessageMoreVerticalIcon = ({ size = 24, color = 'currentColor', ...props }) => (
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

/** Step Checkmark Completed Icon (24x24) - Exact Figma Vector */
export const MessageStepCheckIcon = ({ size = 24, color = '#2f2f39', ...props }) => (
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
      d="M12.0283 2.2937C17.5512 2.2937 22.0283 6.77085 22.0283 12.2937C22.0283 17.8165 17.5512 22.2937 12.0283 22.2937C6.50547 22.2937 2.02832 17.8165 2.02832 12.2937C2.02832 6.77085 6.50547 2.2937 12.0283 2.2937ZM15.248 9.26337L10.7783 13.733L8.80865 11.7634C8.51576 11.4705 8.04088 11.4705 7.74799 11.7634C7.4551 12.0563 7.4551 12.5311 7.74799 12.824L10.248 15.324C10.5409 15.6169 11.0158 15.6169 11.3087 15.324L16.3087 10.324C16.6015 10.0311 16.6015 9.55626 16.3087 9.26337C16.0158 8.97048 15.5409 8.97048 15.248 9.26337Z"
      fill={color}
    />
  </svg>
);

/** Star Outline Icon (16x16) */
export const MessageStarIcon = ({ size = 16, color = '#454554', ...props }) => (
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
      d="M8 1.5L9.955 5.56L14.43 6.21L11.19 9.37L11.95 13.83L8 11.75L4.05 13.83L4.81 9.37L1.57 6.21L6.045 5.56L8 1.5Z"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Arrow Up Send Icon (16x16 / 24x24) - Exact Figma Vector */
export const MessageArrowUpIcon = ({ size = 16, color = 'currentColor', ...props }) => (
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
      d="M7.5 13.5C7.5 13.7761 7.72386 14 8 14C8.27614 14 8.5 13.7761 8.5 13.5V3.80298L12.1283 7.83448C12.3131 8.03974 12.6292 8.05638 12.8345 7.87165C13.0397 7.68692 13.0564 7.37077 12.8716 7.16552L8.37165 2.16552C8.27683 2.06016 8.14174 2 8 2C7.85826 2 7.72317 2.06016 7.62835 2.16552L3.12836 7.16552C2.94363 7.37077 2.96027 7.68692 3.16552 7.87165C3.37078 8.05638 3.68692 8.03974 3.87165 7.83448L7.5 3.80298V13.5Z"
      fill={color}
    />
  </svg>
);

/** Reorder Drag Handle Icon (24x24) - Exact Figma Vector */
export const MessageReorderIcon = ({ size = 24, color = 'currentColor', ...props }) => (
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
      d="M2.75254 17.9997H21.2525C21.6668 17.9997 22.0025 18.3355 22.0025 18.7497C22.0025 19.1294 21.7204 19.4432 21.3543 19.4928L21.2525 19.4997H2.75254C2.33832 19.4997 2.00254 19.1639 2.00254 18.7497C2.00254 18.37 2.28469 18.0562 2.65077 18.0065L2.75254 17.9997H21.2525H2.75254ZM2.75254 11.5027H21.2525C21.6668 11.5027 22.0025 11.8385 22.0025 12.2527C22.0025 12.6324 21.7204 12.9462 21.3543 12.9959L21.2525 13.0027H2.75254C2.33832 13.0027 2.00254 12.6669 2.00254 12.2527C2.00254 11.873 2.28469 11.5592 2.65077 11.5095L2.75254 11.5027H21.2525H2.75254ZM2.75168 5.00293H21.2517C21.6659 5.00293 22.0017 5.33872 22.0017 5.75293C22.0017 6.13263 21.7195 6.44642 21.3535 6.49608L21.2517 6.50293H2.75168C2.33746 6.50293 2.00168 6.16714 2.00168 5.75293C2.00168 5.37323 2.28383 5.05944 2.64991 5.00978L2.75168 5.00293H21.2517H2.75168Z"
      fill={color}
    />
  </svg>
);

/** Attach Icon (16x16 / 24x24) - Exact Figma Vector */
export const MessageAttachIcon = ({ size = 16, color = 'currentColor', ...props }) => (
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
      d="M2.2832 7.975C2.2832 8.251 2.5072 8.475 2.7832 8.475C2.9112 8.475 3.0392 8.426 3.1372 8.329L7.7322 3.732C8.2202 3.244 8.8602 3 9.5002 3C10.8812 3 12.0002 4.119 12.0002 5.5C12.0002 6.14 11.7562 6.78 11.2682 7.268L5.9652 12.571C5.7702 12.766 5.5142 12.864 5.2582 12.864C4.7062 12.864 4.2582 12.416 4.2582 11.864C4.2582 11.608 4.3562 11.352 4.5512 11.157L9.8542 5.854C9.9522 5.756 10.0002 5.628 10.0002 5.5C10.0002 5.224 9.7762 5 9.5002 5C9.3722 5 9.2442 5.049 9.1462 5.146L3.8432 10.45C3.4522 10.841 3.2572 11.352 3.2572 11.864C3.2572 12.969 4.1522 13.864 5.2572 13.864C5.7692 13.864 6.2812 13.669 6.6712 13.278L11.9742 7.975C12.6572 7.292 12.9992 6.396 12.9992 5.5C12.9992 3.567 11.4322 2 9.4992 2C8.6032 2 7.7082 2.342 7.0242 3.025L2.4292 7.621C2.3312 7.719 2.2832 7.847 2.2832 7.975Z"
      fill={color}
    />
  </svg>
);

/** Microphone Icon (16x16 / 24x24) - Exact Figma Vector */
export const MessageMicIcon = ({ size = 16, color = 'currentColor', ...props }) => (
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

/* ==========================================================================
   SUBCOMPONENTS
   ========================================================================== */

/** Citation Footnote Badge (16x16 circle pill) */
export const MessageCitation = ({ number = '2', onClick }) => (
  <span
    className="kpmg-message__citation"
    onClick={onClick}
    title={`Citation reference ${number}`}
    role="button"
    tabIndex={0}
  >
    {number}
  </span>
);

MessageCitation.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};

/** Action Icon Bar Component */
export const MessageActionIconBar = ({
  onLike,
  onDislike,
  onSpeak,
  onCopy,
  onRegenerate,
  className = '',
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) setDisliked(false);
    onLike && onLike(!liked);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (!disliked) setLiked(false);
    onDislike && onDislike(!disliked);
  };

  const handleSpeak = () => {
    setSpeaking(!speaking);
    onSpeak && onSpeak(!speaking);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy && onCopy();
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => setRegenerating(false), 800);
    onRegenerate && onRegenerate();
  };

  return (
    <div className={`kpmg-message__action-bar ${className}`} role="toolbar" aria-label="Message actions">
      <button
        type="button"
        className={`kpmg-message__action-btn ${liked ? 'kpmg-message__action-btn--active' : ''}`}
        onClick={handleLike}
        title="Good response"
        aria-label="Good response"
      >
        <MessageThumbsUpIcon size={20} />
      </button>

      <button
        type="button"
        className={`kpmg-message__action-btn ${disliked ? 'kpmg-message__action-btn--active' : ''}`}
        onClick={handleDislike}
        title="Bad response"
        aria-label="Bad response"
      >
        <MessageThumbsDownIcon size={20} />
      </button>

      <button
        type="button"
        className={`kpmg-message__action-btn ${speaking ? 'kpmg-message__action-btn--active' : ''}`}
        onClick={handleSpeak}
        title="Read aloud"
        aria-label="Read aloud"
      >
        <MessageSpeakerIcon size={20} />
      </button>

      <button
        type="button"
        className={`kpmg-message__action-btn ${copied ? 'kpmg-message__action-btn--active' : ''}`}
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
        aria-label="Copy to clipboard"
      >
        <MessageCopyIcon size={20} />
      </button>

      <button
        type="button"
        className="kpmg-message__action-btn"
        onClick={handleRegenerate}
        title="Regenerate response"
        aria-label="Regenerate response"
        style={{ transform: regenerating ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s ease' }}
      >
        <MessageRegenerateIcon size={20} />
      </button>
    </div>
  );
};

MessageActionIconBar.propTypes = {
  onLike: PropTypes.func,
  onDislike: PropTypes.func,
  onSpeak: PropTypes.func,
  onCopy: PropTypes.func,
  onRegenerate: PropTypes.func,
  className: PropTypes.string,
};

/** Horizontal Attachment Card */
export const MessageAttachmentCard = ({
  title = 'Attachment',
  onAction,
  className = '',
}) => (
  <div className={`kpmg-message__attachment ${className}`}>
    <div className="kpmg-message__attachment-thumb" />
    <div className="kpmg-message__attachment-content">
      <p className="kpmg-message__attachment-title">{title}</p>
    </div>
    <button
      type="button"
      className="kpmg-message__attachment-action"
      onClick={onAction}
      title="Attachment options"
      aria-label="Attachment options"
    >
      <MessageMoreVerticalIcon size={20} />
    </button>
  </div>
);

MessageAttachmentCard.propTypes = {
  title: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

/** Interactive Media Card with Popover Menu */
export const MessageMediaCard = ({
  state = 'enabled',
  open = false,
  orientation = 'left',
  onClick,
  options = ['Option', 'Option', 'Option', 'Option', 'Option', 'Option'],
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClick = (e) => {
    if (state === 'disabled') return;
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    onClick && onClick(nextOpen, e);
  };

  return (
    <div
      className={`kpmg-message__media-card ${state === 'disabled' ? 'kpmg-message__media-card--disabled' : ''} ${state === 'pressed' ? 'kpmg-message__media-card--pressed' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={state === 'disabled' ? -1 : 0}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      {isOpen && (
        <div
          className={`kpmg-message__media-popover kpmg-message__media-popover--${orientation}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="kpmg-message__media-popover-caret" />
          <h4 className="kpmg-message__media-popover-title">Title</h4>
          <p className="kpmg-message__media-popover-desc">
            Supporting text. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="kpmg-message__divider" />
          <div className="kpmg-message__media-popover-list">
            {options.map((opt, idx) => (
              <div key={idx} className="kpmg-message__media-popover-item">
                <MessageStarIcon size={16} />
                <span>{opt}</span>
                <span className="kpmg-message__media-popover-item-check">✓</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

MessageMediaCard.propTypes = {
  state: PropTypes.oneOf(['enabled', 'hovered', 'disabled', 'pressed']),
  open: PropTypes.bool,
  orientation: PropTypes.oneOf(['left', 'right', 'default']),
  onClick: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
};

/** Media Gallery Container */
export const MessageMediaGallery = ({
  cards = [
    { state: 'enabled' },
    { state: 'enabled' },
    { state: 'enabled' },
  ],
}) => (
  <div className="kpmg-message__media-gallery">
    {cards.map((c, idx) => (
      <MessageMediaCard key={idx} {...c} />
    ))}
  </div>
);

MessageMediaGallery.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
};

/** Workflow Status Card (Task cards rich) */
export const MessageStatusCard = ({
  title = 'Status',
  header = 'Header',
  subhead = 'Subhead',
  progress = 30,
  steps = [
    { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
    { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
    { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'pending' },
    { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'in-progress' },
  ],
  code = 'Some code',
  sources = [
    { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
    { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
  ],
  collapsible = true,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="kpmg-message__status-card">
      <div className="kpmg-message__status-top">
        <span className="kpmg-message__status-top-title">{title}</span>
        {collapsible && (
          <button
            type="button"
            className="kpmg-message__status-top-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse status' : 'Expand status'}
          >
            {isExpanded ? <MessageChevronUpIcon size={18} /> : <MessageChevronDownIcon size={18} />}
          </button>
        )}
      </div>

      {isExpanded && (
        <>
          <div className="kpmg-message__divider" />

          {/* Header Row */}
          <div className="kpmg-message__status-header-row">
            <div className="kpmg-message__status-header-info">
              <h4 className="kpmg-message__status-header-title">{header}</h4>
              <span className="kpmg-message__status-header-subhead">{subhead}</span>
            </div>
            <button
              type="button"
              className="kpmg-message__attachment-action"
              title="More options"
              aria-label="More options"
            >
              <MessageMoreVerticalIcon size={20} />
            </button>
          </div>

          <div className="kpmg-message__divider" />

          {/* Steps Track Section */}
          <div className="kpmg-message__steps-section">
            <h5 className="kpmg-message__steps-title">Steps</h5>
            {/* Reuse ProgressIndicator linear bar */}
            <ProgressIndicator
              variant="linear"
              type="determinate"
              progress={progress}
              aria-label={`Workflow completion: ${progress}%`}
            />

            <div className="kpmg-message__steps-list">
              {steps.map((st, idx) => (
                <div key={idx} className="kpmg-message__step-item">
                  <div className="kpmg-message__step-info">
                    <span className="kpmg-message__step-name">{st.name}</span>
                    <span className="kpmg-message__step-desc">{st.desc}</span>
                  </div>
                  <div className="kpmg-message__step-indicator">
                    {st.status === 'completed' && <MessageStepCheckIcon size={22} />}
                    {st.status === 'pending' && <div className="kpmg-message__step-circle-pending" />}
                    {st.status === 'in-progress' && (
                      <ProgressIndicator
                        variant="circular"
                        size="small"
                        type="indeterminate"
                        aria-label="Step in progress"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Code block */}
            {code && (
              <div className="kpmg-message__code-card">
                <h5 className="kpmg-message__code-title">Header</h5>
                <div className="kpmg-message__code-box">
                  <code>{code}</code>
                </div>
              </div>
            )}
          </div>

          {/* Sources Section */}
          {sources && sources.length > 0 && (
            <div className="kpmg-message__sources-section">
              <div className="kpmg-message__divider" />
              <h5 className="kpmg-message__sources-title">Sources</h5>
              {sources.map((src, idx) => (
                <div key={idx} className="kpmg-message__source-card">
                  <div className="kpmg-message__source-thumb" />
                  <div className="kpmg-message__source-content">
                    <span className="kpmg-message__source-header">{src.header}</span>
                    <span className="kpmg-message__source-subhead">{src.subhead}</span>
                  </div>
                  <button
                    type="button"
                    className="kpmg-message__attachment-action"
                    title="Source options"
                    aria-label="Source options"
                  >
                    <MessageMoreVerticalIcon size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

MessageStatusCard.propTypes = {
  title: PropTypes.string,
  header: PropTypes.string,
  subhead: PropTypes.string,
  progress: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.oneOf(['completed', 'pending', 'in-progress']),
  })),
  code: PropTypes.string,
  sources: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string,
    subhead: PropTypes.string,
  })),
  collapsible: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
};

/** Audio / Voice Message Transcript Component */
export const MessageAudioRich = ({
  mode = 'light',
  withProjectDropdown = false,
  projectHeadline = 'Project headline',
  transcript = 'This is a multi-line text string that captures a transcript of the audio message from your AI assistant. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit.',
  onProjectClick,
  className = '',
}) => (
  <div className={`kpmg-message-audio kpmg-message-audio--${mode} ${className}`}>
    {withProjectDropdown && (
      <div className="kpmg-message-audio__dropdown-row">
        <span className="kpmg-message-audio__label">Working on</span>
        <button
          type="button"
          className="kpmg-message-audio__pill"
          onClick={onProjectClick}
          aria-label={`Select project: ${projectHeadline}`}
        >
          <span>{projectHeadline}</span>
          <MessageChevronDownIcon size={16} />
        </button>
      </div>
    )}
    <p className="kpmg-message-audio__transcript">{transcript}</p>
  </div>
);

MessageAudioRich.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
  withProjectDropdown: PropTypes.bool,
  projectHeadline: PropTypes.string,
  transcript: PropTypes.string,
  onProjectClick: PropTypes.func,
  className: PropTypes.string,
};

/** Centered Expand Button (136x40) - Exact Figma Symbol 1687:42584 */
export const MessageExpandButton = ({ onClick, className = '', ...props }) => (
  <div className={`kpmg-message__toggle-container ${className}`} {...props}>
    <button
      type="button"
      className="kpmg-message__toggle-btn"
      onClick={onClick}
      title="Expand message"
      aria-label="Expand message"
    >
      <MessageChevronDownIcon size={24} />
    </button>
  </div>
);

MessageExpandButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

/** Centered Minimize Button (136x40) - Exact Figma Symbol 1687:42604 */
export const MessageMinimizeButton = ({ onClick, className = '', ...props }) => (
  <div className={`kpmg-message__toggle-container ${className}`} {...props}>
    <button
      type="button"
      className="kpmg-message__toggle-btn"
      onClick={onClick}
      title="Minimize message"
      aria-label="Minimize message"
    >
      <MessageChevronUpIcon size={24} />
    </button>
  </div>
);

MessageMinimizeButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

/* ==========================================================================
   PRIMARY MESSAGE COMPONENT
   ========================================================================== */

/**
 * Message Component - KPMG WorkBench Design System
 * 
 * Supports both Bot Reply and Human Sent states, with full fidelity:
 * headline, body, citation footnotes, collapsible secondary text,
 * attachment cards, 3-image media gallery, workflow status cards,
 * and bottom action icon bars.
 * 
 * Directly accepts canonical Figma component properties:
 * - type: "Message reply" | "Message sent"
 * - state: "Minimized" | "Expanded"
 * - header: boolean
 * - supporting: boolean
 * - citationBar: boolean
 * - divider: boolean
 * - secondaryText: boolean | string
 * - expandIcon: boolean
 * - attachmentBar: boolean (attachment1, attachment2)
 * - mediaBar: boolean (media1, media2, media3)
 * - card: boolean
 * - iconBar: boolean
 */
export const Message = forwardRef(({
  // Canonical Figma props & ergonomic aliases
  type,
  sender = 'bot',
  layout = 'default',
  state = 'minimized',

  // Header / Headline
  header = true,
  headlineText,
  headline = 'This headline text',

  // Supporting / Body
  supporting = true,
  supportingText,
  body = 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.',

  // Citations / Badges
  citationBar = true,
  citations = ['2', '2', '2', '2'],

  // Divider
  divider = true,
  showDivider = true,

  // Secondary text & toggle
  secondaryText = true,
  secondaryTextContent,
  expandIcon = true,
  showToggle = true,

  // Attachments
  attachmentBar = true,
  attachment1 = true,
  attachment2 = true,
  attachments = ['Attachment'],

  // Media
  mediaBar = true,
  media1 = true,
  media2 = true,
  media3 = true,
  mediaCards = [
    { state: 'enabled' },
    { state: 'enabled' },
    { state: 'enabled' },
  ],

  // Workflow Status Card
  card = true,
  statusCard = null,

  // Action Icon Bar
  iconBar = true,
  showActions = true,

  className = '',
  ...props
}, ref) => {
  const isReply = type ? type === 'Message reply' : sender !== 'user';
  const isCard = layout === 'card';
  const normalizedState = (state || 'minimized').toLowerCase();
  const [isExpanded, setIsExpanded] = useState(normalizedState === 'expanded');

  useEffect(() => {
    setIsExpanded(normalizedState === 'expanded');
  }, [normalizedState]);

  // Toggle handler
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine active headline
  const isHeaderVisible = header !== false && Boolean(headlineText || headline);
  const activeHeadline = headlineText !== undefined ? headlineText : headline;

  // Determine active body
  const isSupportingVisible = supporting !== false && Boolean(supportingText || body);
  const activeBody = supportingText !== undefined ? supportingText : body;

  // Determine secondary text
  let activeSecondary = null;
  if (secondaryText !== false) {
    if (typeof secondaryText === 'string') {
      activeSecondary = secondaryText;
    } else if (secondaryTextContent) {
      activeSecondary = secondaryTextContent;
    } else if (isReply) {
      activeSecondary = isExpanded
        ? 'Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.'
        : 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consecte...';
    } else {
      activeSecondary = isExpanded
        ? '"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit."'
        : '"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit, sit amet, consectetur adipiscing elit."';
    }
  }

  // Determine displayed attachments
  let activeAttachments = [];
  if (attachmentBar !== false && attachments && attachments.length > 0) {
    if (isExpanded) {
      if (attachment1 && attachment2) {
        activeAttachments = attachments.length > 1 ? attachments.slice(0, 2) : [attachments[0], 'Attachment'];
      } else if (attachment1) {
        activeAttachments = [attachments[0]];
      } else if (attachment2) {
        activeAttachments = [attachments[1] || 'Attachment'];
      }
    } else {
      activeAttachments = attachment1 ? [attachments[0]] : [];
    }
  }

  // Determine displayed media
  let activeMedia = [];
  if (mediaBar !== false && mediaCards && mediaCards.length > 0) {
    if (media1) activeMedia.push(mediaCards[0] || { state: 'enabled' });
    if (media2) activeMedia.push(mediaCards[1] || { state: 'enabled' });
    if (media3) activeMedia.push(mediaCards[2] || { state: 'enabled' });
  }

  const isCitationsVisible = citationBar !== false && isReply && citations && citations.length > 0;
  const isDividerVisible = divider !== false && showDivider !== false && (isSupportingVisible || isHeaderVisible) && Boolean(activeSecondary);
  const isToggleVisible = expandIcon !== false && showToggle !== false && Boolean(activeSecondary);
  const isStatusVisible = card !== false && isReply && Boolean(statusCard);
  const isActionsVisible = iconBar !== false && showActions !== false && isReply;

  const contentBlock = (
    <>
      {/* Bot Avatar Dot */}
      {isReply && (
        <div className="kpmg-message__avatar">
          <div className="kpmg-message__avatar-dot" />
        </div>
      )}

      {/* Headline Text */}
      {isHeaderVisible && <h3 className="kpmg-message__headline">{activeHeadline}</h3>}

      {/* Message Body Text */}
      {isSupportingVisible && <p className="kpmg-message__body">{activeBody}</p>}

      {/* Citations Badges (Primary) */}
      {isCitationsVisible && (
        <div className="kpmg-message__citations">
          {citations.map((c, idx) => (
            <MessageCitation key={idx} number={c} />
          ))}
        </div>
      )}

      {/* Divider */}
      {isDividerVisible && <div className="kpmg-message__divider" />}

      {/* Secondary Text */}
      {activeSecondary && (
        <div className="kpmg-message__secondary-container">
          <p className={`kpmg-message__secondary ${!isExpanded ? 'kpmg-message__secondary--minimized' : ''}`}>
            {activeSecondary}
          </p>
          {isExpanded && isCitationsVisible && (
            <div className="kpmg-message__citations kpmg-message__secondary-citations">
              {citations.map((c, idx) => (
                <MessageCitation key={idx} number={c} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Toggle Expand / Minimize Button */}
      {isToggleVisible && (
        <div className="kpmg-message__toggle-container">
          <button
            type="button"
            className="kpmg-message__toggle-btn"
            onClick={handleToggle}
            title={isExpanded ? 'Minimize message' : 'Expand message'}
            aria-label={isExpanded ? 'Minimize message' : 'Expand message'}
          >
            {isExpanded ? <MessageChevronUpIcon size={24} /> : <MessageChevronDownIcon size={24} />}
          </button>
        </div>
      )}
    </>
  );

  return (
    <div
      ref={ref}
      className={`kpmg-message ${isReply ? 'kpmg-message--reply' : 'kpmg-message--sent'} ${isCard ? 'kpmg-message--card' : ''} ${className}`}
      {...props}
    >
      {/* Render bubble for sent message, or direct content for reply */}
      {!isReply ? (
        <div className="kpmg-message__bubble">
          {contentBlock}
        </div>
      ) : (
        contentBlock
      )}

      {/* Attachments Section */}
      {activeAttachments && activeAttachments.length > 0 && (
        <div className="kpmg-message__attachments">
          {activeAttachments.map((att, idx) => (
            <MessageAttachmentCard key={idx} title={typeof att === 'string' ? att : att?.title || 'Attachment'} />
          ))}
        </div>
      )}

      {/* 3-Image Media Gallery */}
      {activeMedia && activeMedia.length > 0 && (
        <MessageMediaGallery cards={activeMedia} />
      )}

      {/* Workflow Status Card (Only for Reply) */}
      {isStatusVisible && (
        <MessageStatusCard {...statusCard} />
      )}

      {/* Action Bar (Only for Reply) */}
      {isActionsVisible && (
        <MessageActionIconBar />
      )}
    </div>
  );
});

Message.displayName = 'Message';

Message.propTypes = {
  type: PropTypes.oneOf(['Message reply', 'Message sent']),
  sender: PropTypes.oneOf(['bot', 'user']),
  layout: PropTypes.oneOf(['default', 'card']),
  state: PropTypes.oneOf(['minimized', 'expanded', 'Minimized', 'Expanded']),
  header: PropTypes.bool,
  headlineText: PropTypes.string,
  headline: PropTypes.string,
  supporting: PropTypes.bool,
  supportingText: PropTypes.string,
  body: PropTypes.string,
  citationBar: PropTypes.bool,
  citations: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  divider: PropTypes.bool,
  showDivider: PropTypes.bool,
  secondaryText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  secondaryTextContent: PropTypes.string,
  expandIcon: PropTypes.bool,
  showToggle: PropTypes.bool,
  attachmentBar: PropTypes.bool,
  attachment1: PropTypes.bool,
  attachment2: PropTypes.bool,
  attachments: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  mediaBar: PropTypes.bool,
  media1: PropTypes.bool,
  media2: PropTypes.bool,
  media3: PropTypes.bool,
  mediaCards: PropTypes.arrayOf(PropTypes.object),
  card: PropTypes.bool,
  statusCard: PropTypes.object,
  iconBar: PropTypes.bool,
  showActions: PropTypes.bool,
  className: PropTypes.string,
};

/* ==========================================================================
   CONVERSATION THREAD CONTAINER
   ========================================================================== */

/**
 * MessageThread - Conversation Stream Container
 * Renders all 4 Figma conversation stream types:
 * - default-bot-first
 * - card-bot-first
 * - default-human-first
 * - card-human-first
 */
export const MessageThread = ({
  type = 'default-bot-first',
  className = '',
}) => {
  const defaultStatusCardProps = {
    title: 'Status',
    header: 'Header',
    subhead: 'Subhead',
    progress: 30,
    steps: [
      { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
      { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
      { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'pending' },
      { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'in-progress' },
    ],
    code: 'Some code',
    sources: [
      { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
      { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
    ],
  };

  const renderBotMessage = (isCard = false) => (
    <Message
      sender="bot"
      layout={isCard ? 'card' : 'default'}
      state="minimized"
      headline="This headline text"
      body="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur."
      secondaryText="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consecte..."
      citations={['2', '2', '2', '2']}
      attachments={['Attachment']}
      mediaCards={[{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]}
      statusCard={isCard ? null : defaultStatusCardProps}
      showActions={true}
    />
  );

  const renderUserMessage = () => (
    <Message
      sender="user"
      state="minimized"
      headline="This headline text"
      body="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur."
      secondaryText='"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit, sit amet, consectetur adipiscing elit."'
      citations={[]}
      attachments={['Attachment']}
      mediaCards={[{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]}
      statusCard={null}
      showActions={false}
    />
  );

  return (
    <div className={`kpmg-message-thread ${className}`}>
      {type === 'default-bot-first' && (
        <>
          {renderBotMessage(false)}
          {renderUserMessage()}
          {renderBotMessage(false)}
          {renderUserMessage()}
        </>
      )}

      {type === 'card-bot-first' && (
        <>
          {renderBotMessage(true)}
          <MessageStatusCard {...defaultStatusCardProps} />
          {renderUserMessage()}
        </>
      )}

      {type === 'default-human-first' && (
        <>
          {renderUserMessage()}
          {renderBotMessage(false)}
          {renderUserMessage()}
          {renderBotMessage(false)}
        </>
      )}

      {type === 'card-human-first' && (
        <>
          {renderUserMessage()}
          {renderBotMessage(true)}
          <MessageStatusCard {...defaultStatusCardProps} />
        </>
      )}
    </div>
  );
};

MessageThread.propTypes = {
  type: PropTypes.oneOf([
    'default-bot-first',
    'card-bot-first',
    'default-human-first',
    'card-human-first',
  ]),
  className: PropTypes.string,
};

/* ==========================================================================
   CHAT ASSISTANT WINDOW (Full Interface)
   Canonical Figma Node 1924:155337 Specification
   ========================================================================== */

/**
 * Chat Assistant Window - KPMG WorkBench Design System
 * 
 * Standalone chat assistant container matching canonical Figma specifications (Node 1924:155337).
 * Features:
 * - Top App Bar (66px) with drag handle, more options, and minimize trigger
 * - Inner Chat Message Stream Card containing multi-turn conversation
 * - Bottom App Bar (176px) with project dropdown pill, rounded input box, arrow send button, and KPMG Trusted AI verification subtitle
 */
export const MessageChatWindow = ({
  projectHeadline = 'Project headline',
  inputPlaceholder = 'Ask me anything',
  onSendMessage,
  onProjectClick,
  onClose,
  onMenuClick,
  className = '',
  messages,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');

  const defaultMessages = [
    {
      sender: 'bot',
      headline: '',
      body: 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.',
      header: false,
    },
    {
      sender: 'user',
      headline: 'This headline text',
      body: 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.',
      header: true,
    },
    {
      sender: 'bot',
      headline: 'This headline text',
      body: 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.',
      header: true,
    },
    {
      sender: 'user',
      headline: 'This headline text',
      body: 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.',
      header: true,
    },
  ];

  const activeMessages = messages || defaultMessages;

  const handleSend = (e) => {
    e && e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage && onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={`kpmg-message-chat-window ${className}`} {...props}>
      {/* Top App Bar (66px) */}
      <div className="kpmg-message-chat-window__top-bar">
        <div className="kpmg-message-chat-window__drag-handle" title="Drag to reposition">
          <MessageReorderIcon size={24} />
        </div>
        <div className="kpmg-message-chat-window__top-actions">
          <button
            type="button"
            className="kpmg-message-chat-window__icon-btn"
            onClick={onMenuClick}
            title="More options"
            aria-label="More options"
          >
            <MessageMoreVerticalIcon size={20} />
          </button>
          <button
            type="button"
            className="kpmg-message-chat-window__icon-btn"
            onClick={onClose}
            title="Minimize window"
            aria-label="Minimize window"
          >
            <MessageChevronDownIcon size={24} />
          </button>
        </div>
      </div>

      {/* Middle Chat Message Stream Card */}
      <div className="kpmg-message-chat-window__body">
        <div className="kpmg-message-chat-window__stream-card">
          {activeMessages.map((msg, idx) => (
            <Message
              key={idx}
              sender={msg.sender}
              header={msg.header !== false}
              headlineText={msg.headline}
              supportingText={msg.body}
              citationBar={false}
              divider={false}
              secondaryText={false}
              expandIcon={false}
              attachmentBar={false}
              mediaBar={false}
              card={false}
              iconBar={false}
            />
          ))}
        </div>
      </div>

      {/* Bottom App Bar */}
      <div className="kpmg-message-chat-window__bottom-bar">
        <div className="kpmg-message-chat-window__project-row">
          <span>Working on</span>
          <button
            type="button"
            className="kpmg-message-chat-window__project-pill"
            onClick={onProjectClick}
            aria-label={`Select project: ${projectHeadline}`}
          >
            <span>{projectHeadline}</span>
            <MessageChevronDownIcon size={16} />
          </button>
        </div>

        <form className="kpmg-message-chat-window__input-box" onSubmit={handleSend}>
          <input
            type="text"
            className="kpmg-message-chat-window__input"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Ask assistant a question"
          />
          <button
            type="submit"
            className="kpmg-message-chat-window__send-btn"
            title="Send message"
            aria-label="Send message"
          >
            <MessageArrowUpIcon size={16} />
          </button>
        </form>

        <p className="kpmg-message-chat-window__footer-label">
          Verified by KPMG Trusted AI
        </p>
      </div>
    </div>
  );
};

MessageChatWindow.propTypes = {
  projectHeadline: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  onSendMessage: PropTypes.func,
  onProjectClick: PropTypes.func,
  onClose: PropTypes.func,
  onMenuClick: PropTypes.func,
  className: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape({
    sender: PropTypes.oneOf(['bot', 'user']),
    header: PropTypes.bool,
    headline: PropTypes.string,
    body: PropTypes.string,
  })),
};

export default Message;
