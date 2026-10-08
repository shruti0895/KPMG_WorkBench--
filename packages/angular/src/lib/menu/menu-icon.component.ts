import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type MenuIconName =
  | 'check'
  | 'checkbox-circle'
  | 'checkbox-unchecked'
  | 'chevron'
  | 'ellipsis'
  | 'star'
  | 'plus'
  | 'robot'
  | 'sparkle'
  | 'paperclip'
  | 'mic'
  | 'send';

/**
 * Inline icons used across the Menu family — mirrors the Menu* icon exports of
 * packages/ui/src/components/Menu/Menu.jsx (MenuCheckIcon, MenuChevronIcon, …)
 * as a single component selected by `name`.
 */
@Component({
  selector: 'kpmg-menu-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @switch (name()) {
      @case ('check') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" [attr.class]="cls()">
          <path d="M13.8639 3.65609C14.0533 3.85704 14.0439 4.17348 13.8429 4.36288L5.91309 11.8368C5.67573 12.0605 5.30311 12.0536 5.07417 11.8213L2.39384 9.10093C2.20003 8.90422 2.20237 8.58765 2.39907 8.39384C2.59578 8.20003 2.91235 8.20237 3.10616 8.39907L5.51192 10.8407L13.1571 3.63516C13.358 3.44577 13.6745 3.45513 13.8639 3.65609Z" />
        </svg>
      }
      @case ('checkbox-circle') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" [attr.class]="cls()">
          <path d="M8.02832 1.81787C11.342 1.81787 14.0283 4.50416 14.0283 7.81787C14.0283 11.1316 11.342 13.8179 8.02832 13.8179C4.71461 13.8179 2.02832 11.1316 2.02832 7.81787C2.02832 4.50416 4.71461 1.81787 8.02832 1.81787ZM9.96012 5.99967L7.27832 8.68148L6.09652 7.49967C5.92078 7.32394 5.63586 7.32394 5.46012 7.49967C5.28439 7.67541 5.28439 7.96033 5.46012 8.13607L6.96012 9.63607C7.13586 9.81181 7.42078 9.81181 7.59652 9.63607L10.5965 6.63607C10.7723 6.46033 10.7723 6.17541 10.5965 5.99967C10.4208 5.82394 10.1359 5.82394 9.96012 5.99967Z" />
        </svg>
      }
      @case ('checkbox-unchecked') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 16 16" fill="none" aria-hidden="true" [attr.class]="cls()">
          <circle cx="8.028" cy="7.818" r="5.25" stroke="currentColor" [attr.stroke-width]="strokeWidth()" />
        </svg>
      }
      @case ('chevron') {
        <svg
          [attr.width]="px()"
          [attr.height]="px()"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          [attr.class]="cls()"
          [style.transform]="direction() === 'up' ? 'rotate(180deg)' : 'none'"
          style="transition: transform 160ms ease"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      }
      @case ('ellipsis') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="cls()">
          <path d="M12 7.75C11.0335 7.75 10.25 6.9665 10.25 6C10.25 5.0335 11.0335 4.25 12 4.25C12.9665 4.25 13.75 5.0335 13.75 6C13.75 6.9665 12.9665 7.75 12 7.75ZM12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75ZM10.25 18C10.25 18.9665 11.0335 19.75 12 19.75C12.9665 19.75 13.75 18.9665 13.75 18C13.75 17.0335 12.9665 16.25 12 16.25C11.0335 16.25 10.25 17.0335 10.25 18Z" fill="currentColor" />
        </svg>
      }
      @case ('star') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 16 16" fill="none" aria-hidden="true" [attr.class]="cls()">
          <path d="M7.1939 2.1017C7.52403 1.43278 8.47789 1.43277 8.80802 2.1017L10.3291 5.18375L13.7304 5.67798C14.4685 5.78525 14.7633 6.69242 14.2291 7.2131L11.768 9.61215L12.349 12.9997C12.4751 13.7349 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7349 3.65294 12.9997L4.23394 9.61215L1.77277 7.2131C1.23861 6.69242 1.53336 5.78525 2.27156 5.67798L5.67281 5.18375L7.1939 2.1017ZM8.00096 2.72596L6.54628 5.67346C6.41519 5.93909 6.16178 6.1232 5.86864 6.1658L2.61588 6.63845L4.9696 8.93276C5.18171 9.13952 5.27851 9.43742 5.22843 9.72938L4.6728 12.969L7.58215 11.4395C7.84434 11.3016 8.15758 11.3016 8.41977 11.4395L11.3291 12.969L10.7735 9.72938C10.7234 9.43742 10.8202 9.13952 11.0323 8.93276L13.386 6.63845L10.1333 6.1658C9.84014 6.1232 9.58673 5.93909 9.45564 5.67346L8.00096 2.72596Z" fill="currentColor" />
        </svg>
      }
      @case ('plus') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" [attr.class]="cls()">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      }
      @case ('robot') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.class]="cls()" aria-hidden="true">
          <g transform="translate(4.97, 3)">
            <path d="M3.03279 8.92737H11.0889C11.9279 8.92737 12.6109 8.24437 12.6109 7.40541V1.52195C12.6109 0.682997 11.9279 0 11.0889 0H3.03279C2.19384 0 1.51084 0.682997 1.51084 1.52195V7.40541C1.51084 8.24437 2.19384 8.92737 3.03279 8.92737ZM2.58643 1.52195C2.58643 1.27457 2.78541 1.07559 3.03279 1.07559H11.0889C11.3363 1.07559 11.5353 1.27457 11.5353 1.52195V7.40541C11.5353 7.6528 11.3363 7.85178 11.0889 7.85178H3.03279C2.78541 7.85178 2.58643 7.6528 2.58643 7.40541V1.52195Z" fill="currentColor" />
            <path d="M4.87184 5.27543C5.32359 5.27543 5.68929 4.90973 5.68929 4.45799C5.68929 4.00624 5.32359 3.64054 4.87184 3.64054C4.42009 3.64054 4.05439 4.00624 4.05439 4.45799C4.05439 4.90973 4.42009 5.27543 4.87184 5.27543Z" fill="currentColor" />
            <path d="M9.05016 5.27543C9.50191 5.27543 9.86761 4.90973 9.86761 4.45799C9.86761 4.00624 9.50191 3.64054 9.05016 3.64054C8.59841 3.64054 8.23271 4.00624 8.23271 4.45799C8.23271 4.90973 8.59841 5.27543 9.05016 5.27543Z" fill="currentColor" />
            <path d="M7.0666 10.8204C2.64056 10.8204 0 12.7619 0 16.0101V16.6447C0.00537793 17.403 0.693753 18 1.56498 18H12.4123C13.3265 18 14.0525 17.3761 14.0579 16.5748V15.9456C14.0579 12.735 11.4442 10.8204 7.07198 10.8204H7.0666ZM12.9769 16.5694C12.9769 16.7362 12.7296 16.9244 12.4069 16.9244H1.56498C1.28533 16.9244 1.08096 16.7738 1.07559 16.6394V16.0101C1.07559 13.3965 3.25903 11.896 7.0666 11.896C9.27155 11.896 12.9769 12.4231 12.9769 15.9456V16.5694Z" fill="currentColor" />
          </g>
        </svg>
      }
      @case ('sparkle') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" [attr.class]="cls()">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      }
      @case ('paperclip') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="cls()">
          <path d="M2.2832 7.975C2.2832 8.251 2.5072 8.475 2.7832 8.475C2.9112 8.475 3.0392 8.426 3.1372 8.329L7.7322 3.732C8.2202 3.244 8.8602 3 9.5002 3C10.8812 3 12.0002 4.119 12.0002 5.5C12.0002 6.14 11.7562 6.78 11.2682 7.268L5.9652 12.571C5.7702 12.766 5.5142 12.864 5.2582 12.864C4.7062 12.864 4.2582 12.416 4.2582 11.864C4.2582 11.608 4.3562 11.352 4.5512 11.157L9.8542 5.854C9.9522 5.756 10.0002 5.628 10.0002 5.5C10.0002 5.224 9.7762 5 9.5002 5C9.3722 5 9.2442 5.049 9.1462 5.146L3.8432 10.45C3.4522 10.841 3.2572 11.352 3.2572 11.864C3.2572 12.969 4.1522 13.864 5.2572 13.864C5.7692 13.864 6.2812 13.669 6.6712 13.278L11.9742 7.975C12.6572 7.292 12.9992 6.396 12.9992 5.5C12.9992 3.567 11.4322 2 9.4992 2C8.6032 2 7.7082 2.342 7.0242 3.025L2.4292 7.621C2.3312 7.719 2.2832 7.847 2.2832 7.975Z" fill="currentColor" />
        </svg>
      }
      @case ('mic') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="cls()">
          <path d="M5.5 4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8V4.5ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5V8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8V4.5C9.5 3.67157 8.82843 3 8 3ZM4 7.5C4.27614 7.5 4.5 7.72386 4.5 8C4.5 9.933 6.067 11.5 8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8C12.5 10.3163 10.75 12.2238 8.5 12.4725V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V12.4725C5.25002 12.2238 3.5 10.3163 3.5 8C3.5 7.72386 3.72386 7.5 4 7.5Z" fill="currentColor" />
        </svg>
      }
      @case ('send') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="cls()">
          <path d="M7.5 13.5C7.5 13.7761 7.72386 14 8 14C8.27614 14 8.5 13.7761 8.5 13.5V3.80298L12.1283 7.83448C12.3131 8.03974 12.6292 8.05638 12.8345 7.87165C13.0397 7.68692 13.0564 7.37077 12.8716 7.16552L8.37165 2.16552C8.27683 2.06016 8.14174 2 8 2C7.85826 2 7.72317 2.06016 7.62835 2.16552L3.12836 7.16552C2.94363 7.37077 2.96027 7.68692 3.16552 7.87165C3.37078 8.05638 3.68692 8.03974 3.87165 7.83448L7.5 3.80298V13.5Z" fill="currentColor" />
        </svg>
      }
    }
  `,
})
export class MenuIconComponent {
  readonly name = input.required<MenuIconName>();
  /** Pixel size; defaults per icon like React (20 for ellipsis/robot/sparkle, otherwise 16). */
  readonly size = input<number | undefined>(undefined);
  readonly className = input('');
  /** Chevron only. */
  readonly direction = input<'down' | 'up'>('down');
  /** Unchecked-circle only. */
  readonly strokeWidth = input(1.5);

  protected readonly px = computed(
    () => this.size() ?? (['ellipsis', 'robot', 'sparkle'].includes(this.name()) ? 20 : 16),
  );
  protected readonly cls = computed(() => this.className() || null);
}
