import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AppBarIconName =
  | 'slash-forward'
  | 'chevron-forward'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'more-vertical'
  | 'dismiss'
  | 'robot'
  | 'avatar'
  | 'search'
  | 'bell'
  | 'bullet-list'
  | 'flow-chart'
  | 'attach'
  | 'mic'
  | 'arrow-up'
  | 'checkmark-circle'
  | 'checkmark'
  | 'saved'
  | 'menu'
  | 'speaker'
  | 'bookmark'
  | 'share'
  | 'bottom-mute'
  | 'bottom-mic'
  | 'bottom-attach'
  | 'bottom-arrow-up'
  | 'bottom-chevron'
  | 'bottom-checkmark'
  | 'bottom-more-vertical'
  | 'bottom-expand'
  | 'bottom-minimize'
  | 'bottom-close';

interface IconMeta { size: number; base: string; }

const ICONS: Record<AppBarIconName, IconMeta> = {
  'slash-forward': { size: 20, base: 'kpmg-appbar-icon kpmg-appbar-separator' },
  'chevron-forward': { size: 20, base: 'kpmg-appbar-icon' },
  'chevron-right': { size: 20, base: 'kpmg-appbar-icon' },
  'chevron-left': { size: 20, base: 'kpmg-appbar-icon' },
  'chevron-down': { size: 20, base: 'kpmg-appbar-icon' },
  'more-vertical': { size: 20, base: 'kpmg-appbar-icon' },
  'dismiss': { size: 20, base: 'kpmg-appbar-icon' },
  'robot': { size: 20, base: 'kpmg-appbar-icon' },
  'avatar': { size: 20, base: 'kpmg-appbar-icon' },
  'search': { size: 20, base: 'kpmg-appbar-icon' },
  'bell': { size: 20, base: 'kpmg-appbar-icon' },
  'bullet-list': { size: 20, base: 'kpmg-appbar-icon' },
  'flow-chart': { size: 20, base: 'kpmg-appbar-icon' },
  'attach': { size: 16, base: 'kpmg-appbar-icon' },
  'mic': { size: 16, base: 'kpmg-appbar-icon' },
  'arrow-up': { size: 16, base: 'kpmg-appbar-icon' },
  'checkmark-circle': { size: 24, base: 'kpmg-appbar-icon' },
  'checkmark': { size: 16, base: 'kpmg-appbar-icon' },
  'saved': { size: 16, base: 'kpmg-appbar-icon' },
  'menu': { size: 20, base: 'kpmg-appbar-icon' },
  'speaker': { size: 20, base: 'kpmg-appbar-icon' },
  'bookmark': { size: 20, base: 'kpmg-appbar-icon' },
  'share': { size: 20, base: 'kpmg-appbar-icon' },
  'bottom-mute': { size: 24, base: '' },
  'bottom-mic': { size: 20, base: '' },
  'bottom-attach': { size: 20, base: '' },
  'bottom-arrow-up': { size: 20, base: '' },
  'bottom-chevron': { size: 16, base: '' },
  'bottom-checkmark': { size: 16, base: '' },
  'bottom-more-vertical': { size: 20, base: '' },
  'bottom-expand': { size: 20, base: '' },
  'bottom-minimize': { size: 20, base: '' },
  'bottom-close': { size: 20, base: '' },
};

/**
 * App bar icons — mirrors every `AppBar*Icon` and `BottomAppBar*Icon` export of AppBars.jsx
 * (e.g. AppBarBellIcon -> name="bell", BottomAppBarMicIcon -> name="bottom-mic").
 *
 * Deviation: one component selected by `name` instead of ~33 separate icon components. `size` defaults
 * per icon; `className` is appended after the base class (`kpmg-appbar-icon` for AppBar icons).
 */
@Component({
  selector: 'kpmg-app-bar-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @switch (name()) {
      @case ('slash-forward') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M12.6581 2.02566C12.9201 2.11298 13.0617 2.39614 12.9743 2.65811L7.97434 17.6581C7.88702 17.9201 7.60386 18.0617 7.34189 17.9743C7.07991 17.887 6.93833 17.6039 7.02566 17.3419L12.0257 2.34189C12.113 2.07991 12.3961 1.93833 12.6581 2.02566Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('chevron-forward') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M13.2923 12L8.69225 7.4L9.4 6.69225L14.7078 12L9.4 17.3078L8.69225 16.6L13.2923 12Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('chevron-right') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M9 6L15 12L9 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
        </svg>
      }
      @case ('chevron-left') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M15 6L9 12L15 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
        </svg>
      }
      @case ('chevron-down') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M6 9L12 15L18 9"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
        </svg>
      }
      @case ('more-vertical') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <circle cx="12" cy="5" r="1.75" fill="currentColor" />
          <circle cx="12" cy="12" r="1.75" fill="currentColor" />
          <circle cx="12" cy="19" r="1.75" fill="currentColor" />
        </svg>
      }
      @case ('dismiss') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
        </svg>
      }
      @case ('robot') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" stroke-width="1.8" />
          <circle cx="8.5" cy="11.5" r="1.5" fill="currentColor" />
          <circle cx="15.5" cy="11.5" r="1.5" fill="currentColor" />
          <path d="M9 15H15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          <path d="M12 2V6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          <circle cx="12" cy="2" r="1" fill="currentColor" />
          <path d="M1 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          <path d="M21 12H23" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      }
      @case ('avatar') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8" />
          <path
          d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          />
        </svg>
      }
      @case ('search') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
          <path d="M20 20L16.2 16.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      }
      @case ('bell') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
          <path
          d="M13.73 21A2 2 0 0 1 10.27 21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
        </svg>
      }
      @case ('bullet-list') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <circle cx="5" cy="7" r="1.5" fill="currentColor" />
          <path d="M9 7H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <circle cx="5" cy="12" r="1.5" fill="currentColor" />
          <path d="M9 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <circle cx="5" cy="17" r="1.5" fill="currentColor" />
          <path d="M9 17H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      }
      @case ('flow-chart') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <rect x="3" y="4" width="6" height="5" rx="1" stroke="currentColor" stroke-width="1.8" />
          <rect x="15" y="4" width="6" height="5" rx="1" stroke="currentColor" stroke-width="1.8" />
          <rect x="9" y="15" width="6" height="5" rx="1" stroke="currentColor" stroke-width="1.8" />
          <path d="M6 9V12H18V9M12 12V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      }
      @case ('attach') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M2.2832 7.975C2.2832 8.251 2.5072 8.475 2.7832 8.475C2.9112 8.475 3.0392 8.426 3.1372 8.329L7.7322 3.732C8.2202 3.244 8.8602 3 9.5002 3C10.8812 3 12.0002 4.119 12.0002 5.5C12.0002 6.14 11.7562 6.78 11.2682 7.268L5.9652 12.571C5.7702 12.766 5.5142 12.864 5.2582 12.864C4.7062 12.864 4.2582 12.416 4.2582 11.864C4.2582 11.608 4.3562 11.352 4.5512 11.157L9.8542 5.854C9.9522 5.756 10.0002 5.628 10.0002 5.5C10.0002 5.224 9.7762 5 9.5002 5C9.3722 5 9.2442 5.049 9.1462 5.146L3.8432 10.45C3.4522 10.841 3.2572 11.352 3.2572 11.864C3.2572 12.969 4.1522 13.864 5.2572 13.864C5.7692 13.864 6.2812 13.669 6.6712 13.278L11.9742 7.975C12.6572 7.292 12.9992 6.396 12.9992 5.5C12.9992 3.567 11.4322 2 9.4992 2C8.6032 2 7.7082 2.342 7.0242 3.025L2.4292 7.621C2.3312 7.719 2.2832 7.847 2.2832 7.975Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('mic') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M5.5 4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8V4.5ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5V8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8V4.5C9.5 3.67157 8.82843 3 8 3ZM4 7.5C4.27614 7.5 4.5 7.72386 4.5 8C4.5 9.933 6.067 11.5 8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8C12.5 10.3163 10.75 12.2238 8.5 12.4725V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V12.4725C5.25002 12.2238 3.5 10.3163 3.5 8C3.5 7.72386 3.72386 7.5 4 7.5Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('arrow-up') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M7.5 13.5C7.5 13.7761 7.72386 14 8 14C8.27614 14 8.5 13.7761 8.5 13.5V3.80298L12.1283 7.83448C12.3131 8.03974 12.6292 8.05638 12.8345 7.87165C13.0397 7.68692 13.0564 7.37077 12.8716 7.16552L8.37165 2.16552C8.27683 2.06016 8.14174 2 8 2C7.85826 2 7.72317 2.06016 7.62835 2.16552L3.12836 7.16552C2.94363 7.37077 2.96027 7.68692 3.16552 7.87165C3.37078 8.05638 3.68692 8.03974 3.87165 7.83448L7.5 3.80298V13.5Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('checkmark-circle') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M12.0283 2.2937C17.5512 2.2937 22.0283 6.77085 22.0283 12.2937C22.0283 17.8165 17.5512 22.2937 12.0283 22.2937C6.50547 22.2937 2.02832 17.8165 2.02832 12.2937C2.02832 6.77085 6.50547 2.2937 12.0283 2.2937ZM15.248 9.26337L10.7783 13.733L8.80865 11.7634C8.51576 11.4705 8.04088 11.4705 7.74799 11.7634C7.4551 12.0563 7.4551 12.5311 7.74799 12.824L10.248 15.324C10.5409 15.6169 11.0158 15.6169 11.3087 15.324L16.3087 10.324C16.6015 10.0311 16.6015 9.55626 16.3087 9.26337C16.0158 8.97048 15.5409 8.97048 15.248 9.26337Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('checkmark') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M3.5 8.5L6.5 11.5L12.5 4.5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
        </svg>
      }
      @case ('saved') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M3.5 3C3.5 2.44772 3.94772 2 4.5 2H11.5C12.0523 2 12.5 2.44772 12.5 3V14L8 11.5L3.5 14V3Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
          />
        </svg>
      }
      @case ('menu') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M2.75254 17.9997H21.2525C21.6668 17.9997 22.0025 18.3355 22.0025 18.7497C22.0025 19.1294 21.7204 19.4432 21.3543 19.4928L21.2525 19.4997H2.75254C2.33832 19.4997 2.00254 19.1639 2.00254 18.7497C2.00254 18.37 2.28469 18.0562 2.65077 18.0065L2.75254 17.9997H21.2525H2.75254ZM2.75254 11.5027H21.2525C21.6668 11.5027 22.0025 11.8385 22.0025 12.2527C22.0025 12.6324 21.7204 12.9462 21.3543 12.9959L21.2525 13.0027H2.75254C2.33832 13.0027 2.00254 12.6669 2.00254 12.2527C2.00254 11.873 2.28469 11.5592 2.65077 11.5095L2.75254 11.5027H21.2525H2.75254ZM2.75168 5.00293H21.2517C21.6659 5.00293 22.0017 5.33872 22.0017 5.75293C22.0017 6.13263 21.7195 6.44642 21.3535 6.49608L21.2517 6.50293H2.75168C2.33746 6.50293 2.00168 6.16714 2.00168 5.75293C2.00168 5.37323 2.28383 5.05944 2.64991 5.00978L2.75168 5.00293H21.2517H2.75168Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('speaker') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M15 4.24999C15 3.17137 13.7255 2.59913 12.9195 3.31581L8.42794 7.30908C8.29065 7.43114 8.11333 7.49857 7.92961 7.49857H4.25C3.00736 7.49857 2 8.50593 2 9.74857V14.2465C2 15.4891 3.00736 16.4965 4.25 16.4965H7.92956C8.11329 16.4965 8.29063 16.5639 8.42793 16.686L12.9194 20.6797C13.7255 21.3965 15 20.8242 15 19.7456V4.24999ZM9.4246 8.43009L13.5 4.80677V19.1888L9.42465 15.565C9.01275 15.1988 8.48074 14.9965 7.92956 14.9965H4.25C3.83579 14.9965 3.5 14.6607 3.5 14.2465V9.74857C3.5 9.33436 3.83579 8.99857 4.25 8.99857H7.92961C8.48075 8.99857 9.01272 8.79629 9.4246 8.43009ZM18.9916 5.89731C19.3244 5.65078 19.7941 5.72075 20.0407 6.05361C21.2717 7.71569 22 9.77388 22 12C22 14.2261 21.2717 16.2843 20.0407 17.9464C19.7941 18.2793 19.3244 18.3492 18.9916 18.1027C18.6587 17.8562 18.5888 17.3865 18.8353 17.0536C19.8815 15.6411 20.5 13.8938 20.5 12C20.5 10.1062 19.8815 8.35895 18.8353 6.9464C18.5888 6.61354 18.6587 6.14385 18.9916 5.89731ZM17.143 8.36931C17.5072 8.17212 17.9624 8.30756 18.1596 8.67182C18.6958 9.66243 19 10.7968 19 12C19 13.2032 18.6958 14.3375 18.1596 15.3281C17.9624 15.6924 17.5072 15.8279 17.143 15.6307C16.7787 15.4335 16.6432 14.9783 16.8404 14.6141C17.2609 13.8373 17.5 12.9477 17.5 12C17.5 11.0523 17.2609 10.1627 16.8404 9.38592C16.6432 9.02165 16.7787 8.5665 17.143 8.36931Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('bookmark') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M6.19054 21.8539C5.6944 22.2109 5.00252 21.8563 5.00252 21.2451V6.24919C5.00252 4.45426 6.4576 2.99919 8.25252 2.99919H15.7509C17.5458 2.99919 19.0009 4.45426 19.0009 6.24919V21.2451C19.0009 21.8563 18.309 22.2109 17.8129 21.8539L12.0017 17.673L6.19054 21.8539ZM17.5009 6.24919C17.5009 5.28269 16.7174 4.49919 15.7509 4.49919H8.25252C7.28603 4.49919 6.50252 5.28269 6.50252 6.24919V19.7816L11.5637 16.1402C11.8254 15.952 12.1781 15.952 12.4397 16.1402L17.5009 19.7816V6.24919Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('share') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M6.7467 4H10.2109C10.6251 4 10.9609 4.33579 10.9609 4.75C10.9609 5.1297 10.6788 5.44349 10.3127 5.49315L10.2109 5.5H6.7467C5.55584 5.5 4.58106 6.42516 4.50189 7.59595L4.4967 7.75V17.25C4.4967 18.4409 5.42187 19.4156 6.59266 19.4948L6.7467 19.5H16.2474C17.4383 19.5 18.4131 18.5748 18.4922 17.404L18.4974 17.25V16.7522C18.4974 16.338 18.8332 16.0022 19.2474 16.0022C19.6271 16.0022 19.9409 16.2844 19.9906 16.6504L19.9974 16.7522V17.25C19.9974 19.2543 18.4251 20.8913 16.4466 20.9948L16.2474 21H6.7467C4.74244 21 3.10543 19.4276 3.0019 17.4492L2.9967 17.25V7.75C2.9967 5.74574 4.56907 4.10873 6.54755 4.0052L6.7467 4H10.2109H6.7467ZM14.5007 6.51985V3.75C14.5007 3.12603 15.2075 2.78995 15.6877 3.1398L15.7699 3.20874L21.7645 8.95874C22.0442 9.22709 22.0697 9.65811 21.8408 9.95607L21.7646 10.0412L15.77 15.793C15.3197 16.2251 14.5878 15.9477 14.5078 15.3589L14.5007 15.2519V12.5265L14.1572 12.5566C11.7575 12.807 9.45748 13.8879 7.24265 15.8174C6.72354 16.2696 5.92041 15.842 6.00579 15.1588C6.67058 9.8393 9.45245 6.9073 14.2013 6.5395L14.5007 6.51985V3.75V6.51985ZM16.0007 5.50864V7.25C16.0007 7.66421 15.6649 8 15.2507 8C11.3773 8 8.97667 9.67613 7.93943 13.1572L7.86037 13.4358L8.21256 13.1989C10.449 11.7372 12.7985 11 15.2507 11C15.6304 11 15.9442 11.2822 15.9939 11.6482L16.0007 11.75V13.4928L20.1619 9.50009L16.0007 5.50864Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('bottom-mute') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M3.28034 2.21968C2.98745 1.92678 2.51257 1.92677 2.21968 2.21966C1.92678 2.51255 1.92677 2.98743 2.21966 3.28032L8 9.06078V12C8 14.2091 9.79086 16 12 16C12.8335 16 13.6074 15.7451 14.2481 15.309L15.394 16.4549C14.5176 17.1112 13.4292 17.5 12.25 17.5H11.75L11.5336 17.4956C8.73445 17.3821 6.5 15.077 6.5 12.25V11.75L6.49315 11.6482C6.44349 11.2822 6.1297 11 5.75 11C5.33579 11 5 11.3358 5 11.75V12.25L5.00406 12.4863C5.12283 15.938 7.83323 18.7316 11.25 18.9818L11.25 21.25L11.2568 21.3518C11.3065 21.7178 11.6203 22 12 22C12.4142 22 12.75 21.6642 12.75 21.25L12.751 18.9817C14.15 18.8791 15.4305 18.35 16.4631 17.5241L20.7194 21.7805C21.0123 22.0734 21.4872 22.0734 21.7801 21.7805C22.073 21.4876 22.073 21.0127 21.7801 20.7198L3.28034 2.21968ZM13.1562 14.2171C12.8105 14.3978 12.4172 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12V10.5608L13.1562 14.2171ZM14.5 6V11.3182L15.9301 12.7483C15.976 12.5059 16 12.2558 16 12V6C16 3.79086 14.2091 2 12 2C10.1521 2 8.59692 3.25302 8.13768 4.95575L9.5 6.3181V6C9.5 4.61929 10.6193 3.5 12 3.5C13.3807 3.5 14.5 4.61929 14.5 6ZM17.1962 14.0144L18.3421 15.1604C18.7638 14.2791 19 13.2921 19 12.25V11.75L18.9932 11.6482C18.9435 11.2822 18.6297 11 18.25 11C17.8358 11 17.5 11.3358 17.5 11.75V12.25L17.4956 12.4664C17.4737 13.0075 17.3698 13.5276 17.1962 14.0144Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('bottom-mic') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M5.5 4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8V4.5ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5V8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8V4.5C9.5 3.67157 8.82843 3 8 3ZM4 7.5C4.27614 7.5 4.5 7.72386 4.5 8C4.5 9.933 6.067 11.5 8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8C12.5 10.3163 10.75 12.2238 8.5 12.4725V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V12.4725C5.25002 12.2238 3.5 10.3163 3.5 8C3.5 7.72386 3.72386 7.5 4 7.5Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('bottom-attach') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M2.2832 7.975C2.2832 8.251 2.5072 8.475 2.7832 8.475C2.9112 8.475 3.0392 8.426 3.1372 8.329L7.7322 3.732C8.2202 3.244 8.8602 3 9.5002 3C10.8812 3 12.0002 4.119 12.0002 5.5C12.0002 6.14 11.7562 6.78 11.2682 7.268L5.9652 12.571C5.7702 12.766 5.5142 12.864 5.2582 12.864C4.7062 12.864 4.2582 12.416 4.2582 11.864C4.2582 11.608 4.3562 11.352 4.5512 11.157L9.8542 5.854C9.9522 5.756 10.0002 5.628 10.0002 5.5C10.0002 5.224 9.7762 5 9.5002 5C9.3722 5 9.2442 5.049 9.1462 5.146L3.8432 10.45C3.4522 10.841 3.2572 11.352 3.2572 11.864C3.2572 12.969 4.1522 13.864 5.2572 13.864C5.7692 13.864 6.2812 13.669 6.6712 13.278L11.9742 7.975C12.6572 7.292 12.9992 6.396 12.9992 5.5C12.9992 3.567 11.4322 2 9.4992 2C8.6032 2 7.7082 2.342 7.0242 3.025L2.4292 7.621C2.3312 7.719 2.2832 7.847 2.2832 7.975Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('bottom-arrow-up') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M7.5 13.5C7.5 13.7761 7.72386 14 8 14C8.27614 14 8.5 13.7761 8.5 13.5V3.80298L12.1283 7.83448C12.3131 8.03974 12.6292 8.05638 12.8345 7.87165C13.0397 7.68692 13.0564 7.37077 12.8716 7.16552L8.37165 2.16552C8.27683 2.06016 8.14174 2 8 2C7.85826 2 7.72317 2.06016 7.62835 2.16552L3.12836 7.16552C2.94363 7.37077 2.96027 7.68692 3.16552 7.87165C3.37078 8.05638 3.68692 8.03974 3.87165 7.83448L7.5 3.80298V13.5Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('bottom-chevron') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('bottom-checkmark') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M8.02832 1.81787C11.342 1.81787 14.0283 4.50416 14.0283 7.81787C14.0283 11.1316 11.342 13.8179 8.02832 13.8179C4.71461 13.8179 2.02832 11.1316 2.02832 7.81787C2.02832 4.50416 4.71461 1.81787 8.02832 1.81787ZM9.96012 5.99967L7.27832 8.68148L6.09652 7.49967C5.92078 7.32394 5.63586 7.32394 5.46012 7.49967C5.28439 7.67541 5.28439 7.96033 5.46012 8.13607L6.96012 9.63607C7.13586 9.81181 7.42078 9.81181 7.59652 9.63607L10.5965 6.63607C10.7723 6.46033 10.7723 6.17541 10.5965 5.99967C10.4208 5.82394 10.1359 5.82394 9.96012 5.99967Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('bottom-more-vertical') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M12 7.75C11.0335 7.75 10.25 6.9665 10.25 6C10.25 5.0335 11.0335 4.25 12 4.25C12.9665 4.25 13.75 5.0335 13.75 6C13.75 6.9665 12.9665 7.75 12 7.75ZM12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75ZM10.25 18C10.25 18.9665 11.0335 19.75 12 19.75C12.9665 19.75 13.75 18.9665 13.75 18C13.75 17.0335 12.9665 16.25 12 16.25C11.0335 16.25 10.25 17.0335 10.25 18Z"
          fill="currentColor"
          />
        </svg>
      }
      @case ('bottom-expand') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M15 3H21V9M21 3L13.5 10.5M9 21H3V15M3 21L10.5 13.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
        </svg>
      }
      @case ('bottom-minimize') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M4 14H10V20M10 14L3 21M20 10H14V4M14 10L21 3"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
        </svg>
      }
      @case ('bottom-close') {
        <svg [attr.width]="resolvedSize()" [attr.height]="resolvedSize()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="classes()" aria-hidden="true">
          <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          />
        </svg>
      }
    }
  `,
})
export class AppBarIconComponent {
  readonly name = input.required<AppBarIconName>();
  /** Defaults to the icon's native size. */
  readonly size = input<number | undefined>(undefined);
  readonly className = input('');

  private readonly meta = computed(() => ICONS[this.name()]);
  protected readonly resolvedSize = computed(() => this.size() ?? this.meta().size);
  protected readonly classes = computed(() => [this.meta().base, this.className()].filter(Boolean).join(' '));
}
