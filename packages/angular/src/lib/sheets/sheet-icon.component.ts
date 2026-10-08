import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SheetIconName = 'star' | 'edit' | 'more-vertical' | 'upload' | 'word-doc' | 'close' | 'chevron-down';

const DEFAULT_SIZE: Record<SheetIconName, number> = {
  star: 20,
  edit: 16,
  'more-vertical': 24,
  upload: 24,
  'word-doc': 18,
  close: 16,
  'chevron-down': 18,
};

/**
 * Sheet icon set — mirrors SheetStarIcon, SheetEditIcon, SheetMoreVerticalIcon, SheetUploadIcon,
 * SheetWordDocIcon, SheetCloseIcon and SheetChevronDownIcon in Sheets.jsx. Deviation: a single
 * component selected by `name`.
 */
@Component({
  selector: 'kpmg-sheet-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @switch (name()) {
      @case ('star') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 4.248L14.062 8.426L18.674 9.096L15.337 12.349L16.125 16.942L12 14.77L7.875 16.942L8.663 12.349L5.326 9.096L9.938 8.426L12 4.248Z" [attr.stroke]="color()" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      }
      @case ('edit') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14.236 1.76386C13.2123 0.740172 11.5525 0.740171 10.5289 1.76386L2.65722 9.63549C2.28304 10.0097 2.01623 10.4775 1.88467 10.99L1.01571 14.3755C0.971767 14.5467 1.02148 14.7284 1.14646 14.8534C1.27144 14.9783 1.45312 15.028 1.62432 14.9841L5.00978 14.1151C5.52234 13.9836 5.99015 13.7168 6.36433 13.3426L14.236 5.47097C15.2596 4.44728 15.2596 2.78755 14.236 1.76386ZM11.236 2.47097C11.8691 1.8378 12.8957 1.8378 13.5288 2.47097C14.162 3.10413 14.162 4.1307 13.5288 4.76386L12.75 5.54269L10.4571 3.24979L11.236 2.47097ZM9.75002 3.9569L12.0429 6.24979L5.65722 12.6355C5.40969 12.883 5.10023 13.0595 4.76117 13.1465L2.19447 13.8053L2.85327 11.2386C2.9403 10.8996 3.1168 10.5901 3.36433 10.3426L9.75002 3.9569Z" [attr.fill]="color()" />
        </svg>
      }
      @case ('more-vertical') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 7.75C11.0335 7.75 10.25 6.9665 10.25 6C10.25 5.0335 11.0335 4.25 12 4.25C12.9665 4.25 13.75 5.0335 13.75 6C13.75 6.9665 12.9665 7.75 12 7.75ZM12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75ZM10.25 18C10.25 18.9665 11.0335 19.75 12 19.75C12.9665 19.75 13.75 18.9665 13.75 18C13.75 17.0335 12.9665 16.25 12 16.25C11.0335 16.25 10.25 17.0335 10.25 18Z" [attr.fill]="color()" />
        </svg>
      }
      @case ('upload') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18.2498 3.50871C18.664 3.50883 19 3.17314 19 2.75892C19 2.34471 18.6644 2.00883 18.2502 2.00871L5.25022 2.00494C4.836 2.00482 4.5 2.34051 4.5 2.75473C4.5 3.16894 4.83557 3.50482 5.24978 3.50494L18.2498 3.50871ZM11.6482 21.9969L11.75 22.0038C12.1297 22.0038 12.4435 21.7216 12.4932 21.3555L12.5 21.2538L12.499 7.56876L16.2208 11.2891C16.4871 11.5553 16.9038 11.5795 17.1974 11.3616L17.2815 11.289C17.5477 11.0227 17.5719 10.606 17.354 10.3124L17.2814 10.2283L12.2837 5.23171C12.0176 4.96562 11.6012 4.94131 11.3076 5.15888L11.2235 5.2314L6.22003 10.228C5.92694 10.5207 5.92661 10.9956 6.21931 11.2887C6.48539 11.5551 6.90204 11.5796 7.1958 11.362L7.27997 11.2894L10.999 7.57576L11 21.2538C11 21.6335 11.2822 21.9473 11.6482 21.9969Z" [attr.fill]="color()" />
        </svg>
      }
      @case ('word-doc') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="20" height="20" rx="3" fill="#185ABD" />
          <path d="M14 4.5H8.5C7.94772 4.5 7.5 4.94772 7.5 5.5V7.5H14C14.5523 7.5 15 7.94772 15 8.5V14.5C15.5523 14.5 16 14.0523 16 13.5V6.5L14 4.5Z" fill="#2B7CD3" />
          <rect x="4" y="5.5" width="8.5" height="8.5" rx="1.5" fill="#103F91" />
          <text x="8.2" y="12" font-family="Open Sans, sans-serif" font-size="7" font-weight="700" fill="#FFFFFF" text-anchor="middle">W</text>
        </svg>
      }
      @case ('close') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3.29289 3.29289C3.68342 2.90237 4.31658 2.90237 4.70711 3.29289L8 6.58579L11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289C13.0976 3.68342 13.0976 4.31658 12.7071 4.70711L9.41421 8L12.7071 11.2929C13.0976 11.6834 13.0976 12.3166 12.7071 12.7071C12.3166 13.0976 11.6834 13.0976 11.2929 12.7071L8 9.41421L4.70711 12.7071C4.31658 13.0976 3.68342 13.0976 3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929L6.58579 8L3.29289 4.70711C2.90237 4.31658 2.90237 3.68342 3.29289 3.29289Z" [attr.fill]="color()" />
        </svg>
      }
      @case ('chevron-down') {
        <svg [attr.width]="px()" [attr.height]="px()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 9L12 15L18 9" [attr.stroke]="color()" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      }
    }
  `,
})
export class SheetIconComponent {
  readonly name = input.required<SheetIconName>();
  /** Pixel size; defaults to the React icon's default size. */
  readonly size = input<number | undefined>(undefined);
  readonly color = input('currentColor');

  protected readonly px = computed(() => this.size() ?? DEFAULT_SIZE[this.name()]);
}
