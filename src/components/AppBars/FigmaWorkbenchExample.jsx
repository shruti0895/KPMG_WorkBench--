import React, { useState } from 'react';
import './FigmaWorkbenchExample.css';

/* ==========================================================================
   EXACT FIGMA SVG ICONS (Downloaded directly from Figma Node 1537:6788 assets)
   ========================================================================== */

export const FigmaMailInboxIcon = ({ size = 16, color = '#2F2F39', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M4.5 2C3.11929 2 2 3.11929 2 4.5V11.5C2 12.8807 3.11929 14 4.5 14H11.5C12.8807 14 14 12.8807 14 11.5V4.5C14 3.11929 12.8807 2 11.5 2H4.5ZM13 8H10.5L10.4101 8.00806C10.1769 8.05039 10 8.25454 10 8.5C10 8.55217 9.99216 8.66189 9.96774 8.80843C9.92659 9.05536 9.85276 9.30145 9.74029 9.52639C9.43156 10.1439 8.89734 10.5 8 10.5C7.10266 10.5 6.56844 10.1439 6.25971 9.52639C6.14724 9.30145 6.07341 9.05536 6.03226 8.80843C6.00784 8.66189 6 8.55217 6 8.5C6 8.22386 5.77614 8 5.5 8H3V4.5C3 3.67157 3.67157 3 4.5 3H11.5C12.3284 3 13 3.67157 13 4.5V8ZM3 9H5.044L5.0794 9.17401C5.1363 9.42568 5.22762 9.69828 5.36529 9.97361C5.83781 10.9186 6.70984 11.5 8 11.5C9.29016 11.5 10.1622 10.9186 10.6347 9.97361L10.7295 9.76791C10.8159 9.56329 10.8779 9.36276 10.9206 9.17401L10.955 9H13V11.5C13 12.3284 12.3284 13 11.5 13H4.5C3.67157 13 3 12.3284 3 11.5V9Z"
      fill={color}
    />
  </svg>
);

export const FigmaSendIcon = ({ size = 16, color = '#2F2F39', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M1.17683 1.1185C1.32953 0.989145 1.54464 0.963297 1.72363 1.05279L14.7236 7.55279C14.893 7.63748 15 7.81061 15 8C15 8.18939 14.893 8.36252 14.7236 8.44721L1.72363 14.9472C1.54464 15.0367 1.32953 15.0109 1.17683 14.8815C1.02414 14.7522 0.96328 14.5442 1.02213 14.353L2.97688 8L1.02213 1.64705C0.96328 1.45578 1.02414 1.24785 1.17683 1.1185ZM3.8693 8.5L2.32155 13.5302L13.382 8L2.32155 2.46979L3.8693 7.5H9.50001C9.77615 7.5 10 7.72386 10 8C10 8.27614 9.77615 8.5 9.50001 8.5H3.8693Z"
      fill={color}
    />
  </svg>
);

export const FigmaHeartIcon = ({ size = 16, color = '#2F2F39', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M7.54119 3.94746C6.2695 2.67577 4.21214 2.66959 2.94594 3.93579C1.67975 5.20198 1.68593 7.25934 2.95762 8.53103L7.66512 13.2385C7.86038 13.4338 8.17696 13.4338 8.37222 13.2385L13.0553 8.55825C14.3185 7.28794 14.3145 5.23635 13.0426 3.96443C11.7686 2.69046 9.71031 2.68428 8.44185 3.95274L7.99458 4.40086L7.54119 3.94746ZM12.3462 7.85312L8.01867 12.1779L3.66473 7.82392C2.78261 6.94181 2.77834 5.51761 3.65305 4.64289C4.52777 3.76818 5.95197 3.77246 6.83408 4.65457L7.64344 5.46393C7.84203 5.66252 8.1652 5.65863 8.35896 5.45531L9.14896 4.65984C10.0259 3.78286 11.4511 3.78714 12.3355 4.67154C13.2178 5.55388 13.2206 6.97382 12.3462 7.85312Z"
      fill={color}
    />
  </svg>
);

export const FigmaDeleteIcon = ({ size = 16, color = '#2F2F39', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M7 3H9C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3ZM6 3C6 1.89543 6.89543 1 8 1C9.10457 1 10 1.89543 10 3H14C14.2761 3 14.5 3.22386 14.5 3.5C14.5 3.77614 14.2761 4 14 4H13.4364L12.2313 12.8378C12.0624 14.0765 11.0044 15 9.75422 15H6.24578C4.99561 15 3.93762 14.0765 3.76871 12.8378L2.56355 4H2C1.72386 4 1.5 3.77614 1.5 3.5C1.5 3.22386 1.72386 3 2 3H6ZM7 6.5C7 6.22386 6.77614 6 6.5 6C6.22386 6 6 6.22386 6 6.5V11.5C6 11.7761 6.22386 12 6.5 12C6.77614 12 7 11.7761 7 11.5V6.5ZM9.5 6C9.77614 6 10 6.22386 10 6.5V11.5C10 11.7761 9.77614 12 9.5 12C9.22386 12 9 11.7761 9 11.5V6.5C9 6.22386 9.22386 6 9.5 6ZM4.75954 12.7027C4.86089 13.4459 5.49568 14 6.24578 14H9.75422C10.5043 14 11.1391 13.4459 11.2405 12.7027L12.4272 4H3.57281L4.75954 12.7027Z"
      fill={color}
    />
  </svg>
);

export const FigmaFolderIcon = ({ size = 16, color = '#2F2F39', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M2 4.5V6H5.58579C5.71839 6 5.84557 5.94732 5.93934 5.85355L7.29289 4.5L5.93934 3.14645C5.84557 3.05268 5.71839 3 5.58579 3H3.5C2.67157 3 2 3.67157 2 4.5ZM1 4.5C1 3.11929 2.11929 2 3.5 2H5.58579C5.98361 2 6.36514 2.15804 6.64645 2.43934L8.20711 4H12.5C13.8807 4 15 5.11929 15 6.5V11.5C15 12.8807 13.8807 14 12.5 14H3.5C2.11929 14 1 12.8807 1 11.5V4.5ZM2 7V11.5C2 12.3284 2.67157 13 3.5 13H12.5C13.3284 13 14 12.3284 14 11.5V6.5C14 5.67157 13.3284 5 12.5 5H8.20711L6.64645 6.56066C6.36514 6.84197 5.98361 7 5.58579 7H2Z"
      fill={color}
    />
  </svg>
);

export const FigmaAvatarGearIcon = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="10" fill="url(#figma_avatar_grad)" />
    <defs>
      <linearGradient id="figma_avatar_grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0.36" stopColor="#7213EA" />
        <stop offset="0.73" stopColor="#1E49E2" />
        <stop offset="0.9" stopColor="#00338D" />
      </linearGradient>
    </defs>
  </svg>
);

export const FigmaDismissIcon = ({ size = 24, color = '#454554', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M4.39705 4.55379L4.46967 4.46967C4.73594 4.2034 5.1526 4.1792 5.44621 4.39705L5.53033 4.46967L12 10.939L18.4697 4.46967C18.7626 4.17678 19.2374 4.17678 19.5303 4.46967C19.8232 4.76256 19.8232 5.23744 19.5303 5.53033L13.061 12L19.5303 18.4697C19.7966 18.7359 19.8208 19.1526 19.6029 19.4462L19.5303 19.5303C19.2641 19.7966 18.8474 19.8208 18.5538 19.6029L18.4697 19.5303L12 13.061L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303C4.17678 19.2374 4.17678 18.7626 4.46967 18.4697L10.939 12L4.46967 5.53033C4.2034 5.26406 4.1792 4.8474 4.39705 4.55379L4.46967 4.46967L4.39705 4.55379Z"
      fill={color}
    />
  </svg>
);

export const FigmaMoreVerticalIcon = ({ size = 24, color = '#454554', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M12 7.75C11.0335 7.75 10.25 6.9665 10.25 6C10.25 5.0335 11.0335 4.25 12 4.25C12.9665 4.25 13.75 5.0335 13.75 6C13.75 6.9665 12.9665 7.75 12 7.75ZM12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75ZM10.25 18C10.25 18.9665 11.0335 19.75 12 19.75C12.9665 19.75 13.75 18.9665 13.75 18C13.75 17.0335 12.9665 16.25 12 16.25C11.0335 16.25 10.25 17.0335 10.25 18Z"
      fill={color}
    />
  </svg>
);

export const FigmaChevronIcon = ({ size = 16, color = 'white', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z"
      fill={color}
    />
  </svg>
);

export const FigmaSlashIcon = ({ size = 20, color = '#454554', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M12.6581 2.02566C12.9201 2.11298 13.0617 2.39614 12.9743 2.65811L7.97434 17.6581C7.88702 17.9201 7.60386 18.0617 7.34189 17.9743C7.07991 17.887 6.93833 17.6039 7.02566 17.3419L12.0257 2.34189C12.113 2.07991 12.3961 1.93833 12.6581 2.02566Z"
      fill={color}
    />
  </svg>
);

export const FigmaPaperclipIcon = ({ size = 28, color = '#1a28c1', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M19.8333 13.4167L12.5417 20.7083C10.5898 22.6602 7.42686 22.6602 5.47498 20.7083C3.52309 18.7565 3.52309 15.5935 5.47498 13.6417L12.7667 6.35C14.068 5.04873 16.1766 5.04873 17.4778 6.35C18.7791 7.65127 18.7791 9.7599 17.4778 11.0612L10.1861 18.3529C9.53549 19.0035 8.48117 19.0035 7.83053 18.3529C7.17988 17.7022 7.17988 16.6479 7.83053 15.9972L14.3889 9.43889"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FigmaMicIcon = ({ size = 28, color = '#1a28c1', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M14 17.5C16.3012 17.5 18.0833 15.7179 18.0833 13.4167V7C18.0833 4.69881 16.3012 2.91667 14 2.91667C11.6988 2.91667 9.91667 4.69881 9.91667 7V13.4167C9.91667 15.7179 11.6988 17.5 14 17.5Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.1667 11.6667V13.4167C22.1667 17.9271 18.5104 21.5833 14 21.5833C9.48959 21.5833 5.83333 17.9271 5.83333 13.4167V11.6667"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 21.5833V25.0833"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FigmaArrowUpIcon = ({ size = 28, color = '#1a28c1', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M14 22.1667V5.83333M14 5.83333L6.41667 13.4167M14 5.83333L21.5833 13.4167"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FigmaSparkleRobotIcon = ({ size = 20, color = '#454554', className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true" {...props}>
    <path
      d="M10 2.5L11.545 6.45501L15.5 8L11.545 9.54499L10 13.5L8.45499 9.54499L4.5 8L8.45499 6.45501L10 2.5Z"
      fill={color}
    />
    <path
      d="M15.5 13L16.2725 14.7275L18 15.5L16.2725 16.2725L15.5 18L14.7275 16.2725L13 15.5L14.7275 14.7275L15.5 13Z"
      fill={color}
    />
    <path
      d="M4.5 13L5.27249 14.7275L7 15.5L5.27249 16.2725L4.5 18L3.72751 16.2725L2 15.5L3.72751 14.7275L4.5 13Z"
      fill={color}
    />
  </svg>
);


/* ==========================================================================
   MAIN COMPONENT: FigmaWorkbenchExample
   Reference: https://www.figma.com/design/aSsNB00kNvBMA56DlnC2XZ/KPMG_WorkBench_Design_System-2026?node-id=1537-6788
   ========================================================================== */
export function FigmaWorkbenchExample({ className = '', onSearchSubmit }) {
  // Navigation & Menu Interactive States
  const [navMenuOpen, setNavMenuOpen] = useState(true);
  const [overflowMenuOpen, setOverflowMenuOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('Inbox');
  const [selectedOptions, setSelectedOptions] = useState(['Option-1', 'Option-3', 'Option-4']);
  const [searchValue, setSearchValue] = useState('');
  const [activeNotification, setActiveNotification] = useState(null);

  // Toggle option selection in right overflow menu
  const toggleOption = (id) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset to exact Figma screen default states
  const resetToFigmaState = () => {
    setNavMenuOpen(true);
    setOverflowMenuOpen(true);
    setActiveNav('Inbox');
    setSelectedOptions(['Option-1', 'Option-3', 'Option-4']);
    setSearchValue('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setActiveNotification(`Searched: "${searchValue}"`);
    if (onSearchSubmit) onSearchSubmit(searchValue);
    setTimeout(() => setActiveNotification(null), 3000);
  };

  const navMenuItems = [
    { id: 'Inbox', label: 'Inbox', badge: '24', icon: <FigmaMailInboxIcon size={16} /> },
    { id: 'Outbox', label: 'Outbox', icon: <FigmaSendIcon size={16} /> },
    { id: 'Favorites', label: 'Favorites', icon: <FigmaHeartIcon size={16} /> },
    { id: 'Trash', label: 'Trash', icon: <FigmaDeleteIcon size={16} /> },
  ];

  const labelItems = [
    { id: 'Label1', label: 'Label', icon: <FigmaFolderIcon size={16} /> },
    { id: 'Label2', label: 'Label', icon: <FigmaFolderIcon size={16} /> },
    { id: 'Label3', label: 'Label', icon: <FigmaFolderIcon size={16} /> },
  ];

  const overflowItems = [
    { id: 'Option-1', label: 'Option' },
    { id: 'divider-1', isDivider: true },
    { id: 'Option-2', label: 'Option' },
    { id: 'Option-3', label: 'Option' },
    { id: 'Option-4', label: 'Option' },
    { id: 'Option-5', label: 'Option' },
    { id: 'divider-2', isDivider: true },
    { id: 'Option-6', label: 'Option' },
  ];

  return (
    <div className={`kpmg-figma-example-container ${className}`}>
      {/* Top Demo Helper Toolbar for Quick Interactivity & State Toggles */}
      <div className="kpmg-figma-example-toolbar" role="region" aria-label="Demo controls">
        <div className="kpmg-figma-example-toolbar__info">
          <span className="kpmg-figma-example-toolbar__badge">Figma Reference (1537:6788)</span>
          <span>Full Workbench Layout with Live Overlay Menus</span>
        </div>
        <div className="kpmg-figma-example-toolbar__actions">
          <button
            type="button"
            className={`kpmg-figma-example-toolbar__btn ${navMenuOpen ? 'kpmg-figma-example-toolbar__btn--active' : ''}`}
            onClick={() => setNavMenuOpen((v) => !v)}
            aria-pressed={navMenuOpen}
          >
            {navMenuOpen ? 'Hide Nav Flyout' : 'Show Nav Flyout'}
          </button>
          <button
            type="button"
            className={`kpmg-figma-example-toolbar__btn ${overflowMenuOpen ? 'kpmg-figma-example-toolbar__btn--active' : ''}`}
            onClick={() => setOverflowMenuOpen((v) => !v)}
            aria-pressed={overflowMenuOpen}
          >
            {overflowMenuOpen ? 'Hide Overflow Menu' : 'Show Overflow Menu'}
          </button>
          <button
            type="button"
            className="kpmg-figma-example-toolbar__btn"
            onClick={resetToFigmaState}
          >
            Reset to Figma Defaults
          </button>
        </div>
      </div>

      {activeNotification && (
        <div style={{
          padding: '8px 16px',
          borderRadius: '8px',
          backgroundColor: 'var(--color-blue-800, #e9eafc)',
          color: 'var(--color-primary-action, #1a28c1)',
          fontSize: '13px',
          fontWeight: 600,
        }}>
          {activeNotification}
        </div>
      )}

      {/* ============================================================
          EXACT FIGMA SCREEN CANVAS (Frame node-id="1537:6788")
          ============================================================ */}
      <div className="kpmg-figma-frame-full" data-node-id="1537:6788" data-name="Full">

        {/* 1. TOP APP BAR FULL (node-id="1537:6798") */}
        <header className="kpmg-figma-appbar" data-node-id="1537:6798" data-name="Top app bars full">
          {/* Left Brand Menu Pill & Breadcrumbs */}
          <div className="kpmg-figma-appbar__left" data-node-id="I1537:6798;1313:64199">
            <button
              type="button"
              className="kpmg-figma-brand-pill"
              onClick={() => setNavMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={navMenuOpen}
              aria-label="KPMG Navigation Menu"
              data-node-id="I1537:6798;1663:39698;1663:36987"
              data-name="Dropdown bases"
            >
              <span className="kpmg-figma-brand-pill__logo">KPMG</span>
              <span className={`kpmg-figma-brand-pill__chevron ${navMenuOpen ? 'kpmg-figma-brand-pill__chevron--open' : ''}`}>
                <FigmaChevronIcon size={16} />
              </span>
            </button>

            {/* Breadcrumbs (node-id="I1537:6798;1537:4980") */}
            <nav aria-label="Breadcrumb" data-node-id="I1537:6798;1537:4980">
              <ol className="kpmg-figma-breadcrumbs">
                <li className="kpmg-figma-breadcrumb-item">
                  <a className="kpmg-figma-breadcrumb-link" href="#breadcrumb">Breadcrumb</a>
                  <span className="kpmg-figma-breadcrumb-slash"><FigmaSlashIcon size={20} /></span>
                </li>
                <li className="kpmg-figma-breadcrumb-item">
                  <a className="kpmg-figma-breadcrumb-link" href="#breadcrumb">Breadcrumb</a>
                  <span className="kpmg-figma-breadcrumb-slash"><FigmaSlashIcon size={20} /></span>
                </li>
                <li className="kpmg-figma-breadcrumb-item" aria-current="page">
                  <span className="kpmg-figma-breadcrumb-link" style={{ fontWeight: 600 }}>Breadcrumb</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Right Action Icons (node-id="I1537:6798;1313:64206") */}
          <div className="kpmg-figma-appbar__right" data-node-id="I1537:6798;1313:64206">
            {/* Assistant Trigger */}
            <button
              type="button"
              className="kpmg-figma-icon-btn"
              aria-label="Assistant Menu"
              title="KPMG Trusted AI Assistant"
              data-node-id="I1537:6798;1313:64206;assistant"
            >
              <FigmaSparkleRobotIcon size={20} color="var(--color-neutral-100, #454554)" />
            </button>

            {/* Avatar / Settings Trigger (node-id="I1537:6798;1574:10977") */}
            <button
              type="button"
              className="kpmg-figma-icon-btn"
              aria-label="User Avatar and Settings"
              title="Settings & Profile"
              data-node-id="I1537:6798;1574:10977"
            >
              <FigmaAvatarGearIcon size={24} />
            </button>

            {/* Overflow Trigger (node-id="I1537:6798;1663:41924") */}
            <button
              type="button"
              className={`kpmg-figma-icon-btn ${overflowMenuOpen ? 'kpmg-figma-icon-btn--overflow-active' : ''}`}
              onClick={() => setOverflowMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={overflowMenuOpen}
              aria-label="More options"
              title="Overflow Menu"
              data-node-id="I1537:6798;1663:41924"
            >
              <FigmaMoreVerticalIcon size={24} color={overflowMenuOpen ? 'var(--color-primary-action, #1a28c1)' : 'var(--color-neutral-100, #454554)'} />
            </button>

            {/* Dismiss X Trigger (node-id="I1537:6798;1341:45797") */}
            <button
              type="button"
              className="kpmg-figma-icon-btn"
              onClick={() => {
                setNavMenuOpen(false);
                setOverflowMenuOpen(false);
              }}
              aria-label="Dismiss view"
              title="Close or Dismiss"
              data-node-id="I1537:6798;1341:45797"
            >
              <FigmaDismissIcon size={24} color="var(--color-neutral-100, #454554)" />
            </button>
          </div>
        </header>

        {/* 2. LEFT FLYOUT NAVIGATION MENU (node-id="I1537:6798;1663:39698;1663:37112") */}
        {navMenuOpen && (
          <aside
            className="kpmg-figma-nav-flyout"
            role="menu"
            aria-label="Navigation Menu"
            data-node-id="I1537:6798;1663:39698;1663:37112"
            data-name="Navigation menus"
          >
            <div className="kpmg-figma-nav-header">Header</div>
            <div className="kpmg-figma-nav-divider" role="separator" />

            {/* Primary Navigation Items */}
            {navMenuItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  className={`kpmg-figma-nav-item ${isActive ? 'kpmg-figma-nav-item--active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="kpmg-figma-nav-item__icon">{item.icon}</span>
                  <span className="kpmg-figma-nav-item__label">{item.label}</span>
                  {item.badge && <span className="kpmg-figma-nav-item__badge">{item.badge}</span>}
                </button>
              );
            })}

            <div className="kpmg-figma-nav-divider" role="separator" />

            {/* Labels Group */}
            <div className="kpmg-figma-nav-group-title">Labels</div>
            {labelItems.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                className="kpmg-figma-nav-item"
                onClick={() => setActiveNav(item.id)}
              >
                <span className="kpmg-figma-nav-item__icon">{item.icon}</span>
                <span className="kpmg-figma-nav-item__label">{item.label}</span>
              </button>
            ))}
          </aside>
        )}

        {/* 3. RIGHT FLYOUT OVERFLOW MENU (node-id="I1537:6798;1663:41924;1663:37850") */}
        {overflowMenuOpen && (
          <div
            className="kpmg-figma-overflow-flyout"
            role="menu"
            aria-label="Overflow options"
            data-node-id="I1537:6798;1663:41924;1663:37850"
            data-name="Dropdown item groups"
          >
            {overflowItems.map((item, idx) => {
              if (item.isDivider) {
                return <div key={`div-${idx}`} className="kpmg-figma-overflow-divider" role="separator" />;
              }

              const isChecked = selectedOptions.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  role="menuitemcheckbox"
                  aria-checked={isChecked}
                  className="kpmg-figma-overflow-item"
                  onClick={() => toggleOption(item.id)}
                >
                  <span className={`kpmg-figma-overflow-circle-cb ${isChecked ? 'kpmg-figma-overflow-circle-cb--checked' : ''}`}>
                    {isChecked && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                        <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 4. MAIN CANVAS CONTENT AREA (node-id="1537:6789") */}
        <main className="kpmg-figma-content-canvas" data-node-id="1537:6789" data-name="Frame 2018777618">

          {/* Hero Banner Section with Floating AI Search Bar (node-id="1537:6790") */}
          <div className="kpmg-figma-hero-section" data-node-id="1537:6790" data-name="Your design (Web)">
            {/* Top Lavender Hero Container (node-id="1537:6791") */}
            <div className="kpmg-figma-hero-banner" data-node-id="1537:6791" />

            {/* Large Floating AI Search Text Pill (node-id="1537:6795") */}
            <form
              role="search"
              onSubmit={handleSearchSubmit}
              className="kpmg-figma-search-pill"
              data-node-id="1537:6795"
              data-name="Search text"
            >
              {/* Left Paperclip / Attachment Button (size 52px, node-id="1363:88064") */}
              <button
                type="button"
                className="kpmg-figma-search-pill__btn"
                aria-label="Attach file"
                title="Attach document or dataset"
                onClick={() => setActiveNotification('Attachment button clicked')}
              >
                <FigmaPaperclipIcon size={28} color="var(--color-primary-action, #1a28c1)" />
              </button>

              {/* Text Input with Placeholder "Ask me anything" */}
              <div className="kpmg-figma-search-pill__input-wrapper">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Ask me anything"
                  className="kpmg-figma-search-pill__input"
                  aria-label="Ask me anything"
                />
              </div>

              {/* Right Action Icons (Microphone & Send Arrow Up, 52px each) */}
              <div className="kpmg-figma-search-pill__actions">
                <button
                  type="button"
                  className="kpmg-figma-search-pill__btn"
                  aria-label="Voice input"
                  title="Voice search"
                  onClick={() => setActiveNotification('Voice input listening...')}
                >
                  <FigmaMicIcon size={28} color="var(--color-primary-action, #1a28c1)" />
                </button>

                <button
                  type="submit"
                  className="kpmg-figma-search-pill__btn"
                  aria-label="Send prompt"
                  title="Submit prompt"
                >
                  <FigmaArrowUpIcon size={28} color="var(--color-primary-action, #1a28c1)" />
                </button>
              </div>
            </form>
          </div>

          {/* Secondary Content Card 1 (node-id="1537:6796") */}
          <div
            className="kpmg-figma-content-card"
            data-node-id="1537:6796"
            data-name="Your design (Web)"
          />

          {/* Secondary Content Card 2 (node-id="1537:6797") */}
          <div
            className="kpmg-figma-content-card"
            data-node-id="1537:6797"
            data-name="Your design (Web)"
          />

        </main>
      </div>
    </div>
  );
}

export default FigmaWorkbenchExample;
