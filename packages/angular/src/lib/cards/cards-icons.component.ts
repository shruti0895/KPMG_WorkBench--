import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Action arrow right (chevron) icon. */
@Component({
  selector: 'kpmg-horizontal-card-chevron-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.88 12l-4.59 4.59a.996.996 0 1 0 1.41 1.41l5.3-5.29a.996.996 0 0 0 0-1.41l-5.3-5.29a.996.996 0 0 0-1.41 0z" [attr.fill]="color()" />
    </svg>
  `,
})
export class HorizontalCardChevronIconComponent {
  readonly size = input(20);
  readonly color = input('currentColor');
  readonly className = input('');
}

/** Checkmark icon for square checkbox selection. */
@Component({
  selector: 'kpmg-horizontal-card-checkmark-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" [attr.fill]="color()" />
    </svg>
  `,
})
export class HorizontalCardCheckmarkIconComponent {
  readonly size = input(16);
  readonly color = input('#ffffff');
  readonly className = input('');
}

/** Circular checked icon (solid circle + inner tick). */
@Component({
  selector: 'kpmg-horizontal-card-circle-check-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <circle cx="12" cy="12" r="10" [attr.fill]="fill()" />
      <polyline points="8 12 11 15 16 9" fill="none" [attr.stroke]="tickColor()" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
})
export class HorizontalCardCircleCheckIconComponent {
  readonly size = input(24);
  readonly fill = input('#2f2f39');
  readonly tickColor = input('#ffffff');
  readonly className = input('');
}

/** Circular unchecked icon (outline circle). */
@Component({
  selector: 'kpmg-horizontal-card-circle-unchecked-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <circle cx="12" cy="12" r="9" [attr.stroke]="stroke()" [attr.stroke-width]="strokeWidth()" />
    </svg>
  `,
})
export class HorizontalCardCircleUncheckedIconComponent {
  readonly size = input(24);
  readonly stroke = input('#454554');
  readonly strokeWidth = input(2);
  readonly className = input('');
}

/** Circular light check icon (outline circle + inner tick). */
@Component({
  selector: 'kpmg-horizontal-card-circle-light-check-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <circle cx="12" cy="12" r="9" [attr.stroke]="stroke()" stroke-width="2" />
      <polyline points="8 12 11 15 16 9" fill="none" [attr.stroke]="stroke()" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
})
export class HorizontalCardCircleLightCheckIconComponent {
  readonly size = input(24);
  readonly stroke = input('#818aee');
  readonly className = input('');
}

/** 3-dots vertical overflow menu icon. */
@Component({
  selector: 'kpmg-horizontal-card-more-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" [attr.fill]="color()" />
    </svg>
  `,
})
export class HorizontalCardMoreIconComponent {
  readonly size = input(20);
  readonly color = input('currentColor');
  readonly className = input('');
}

/** Section action icon (chevron down). */
@Component({
  selector: 'kpmg-horizontal-card-chevron-down-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M4.21967 8.46967C4.51256 8.17678 4.98744 8.17678 5.28033 8.46967L12 15.1893L18.7197 8.46967C19.0126 8.17678 19.4874 8.17678 19.7803 8.46967C20.0732 8.76256 20.0732 9.23744 19.7803 9.53033L12.5303 16.7803C12.2374 17.0732 11.7626 17.0732 11.4697 16.7803L4.21967 9.53033C3.92678 9.23744 3.92678 8.76256 4.21967 8.46967Z" [attr.fill]="color()" />
    </svg>
  `,
})
export class HorizontalCardChevronDownIconComponent {
  readonly size = input(20);
  readonly color = input('currentColor');
  readonly className = input('');
}

/** Heart like icon, outline or filled. */
@Component({
  selector: 'kpmg-stacked-card-heart-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" [attr.fill]="filled() ? (color() || '#CF0E54') : 'none'" [attr.stroke]="filled() ? 'none' : (color() || 'currentColor')" [attr.stroke-width]="filled() ? 0 : 2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M12.8199 5.57959L11.9991 6.40209L11.1759 5.57884C9.07683 3.47978 5.67357 3.47978 3.5745 5.57884C1.47543 7.67791 1.47543 11.0812 3.5745 13.1802L11.4699 21.0756C11.7628 21.3685 12.2376 21.3685 12.5305 21.0756L20.432 13.1788C22.5264 11.0727 22.53 7.67904 20.4305 5.57959C18.3276 3.4767 14.9228 3.4767 12.8199 5.57959Z" />
    </svg>
  `,
})
export class StackedCardHeartIconComponent {
  readonly size = input(20);
  readonly filled = input(false);
  readonly color = input<string | undefined>(undefined);
  readonly className = input('');
}

/** Bookmark save icon, outline or filled. */
@Component({
  selector: 'kpmg-stacked-card-bookmark-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" [attr.fill]="filled() ? (color() || '#1e49e2') : 'none'" [attr.stroke]="filled() ? 'none' : (color() || 'currentColor')" [attr.stroke-width]="filled() ? 0 : 2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M6.19054 21.8539C5.6944 22.2109 5.00252 21.8563 5.00252 21.2451V6.24919C5.00252 4.45426 6.4576 2.99919 8.25252 2.99919H15.7509C17.5458 2.99919 19.0009 4.45426 19.0009 6.24919V21.2451C19.0009 21.8563 18.309 22.2109 17.8129 21.8539L12.0017 17.673L6.19054 21.8539Z" />
    </svg>
  `,
})
export class StackedCardBookmarkIconComponent {
  readonly size = input(20);
  readonly filled = input(false);
  readonly color = input<string | undefined>(undefined);
  readonly className = input('');
}

/** Share forward icon. */
@Component({
  selector: 'kpmg-stacked-card-share-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="currentColor" [attr.color]="color()" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M6.7467 4H10.2109C10.6251 4 10.9609 4.33579 10.9609 4.75C10.9609 5.1297 10.6788 5.44349 10.3127 5.49315L10.2109 5.5H6.7467C5.55584 5.5 4.58106 6.42516 4.50189 7.59595L4.4967 7.75V17.25C4.4967 18.4409 5.42187 19.4156 6.59266 19.4948L6.7467 19.5H16.2474C17.4383 19.5 18.4131 18.5748 18.4922 17.404L18.4974 17.25V16.7522C18.4974 16.338 18.8332 16.0022 19.2474 16.0022C19.6271 16.0022 19.9409 16.2844 19.9906 16.6504L19.9974 16.7522V17.25C19.9974 19.2543 18.4251 20.8913 16.4466 20.9948L16.2474 21H6.7467C4.74244 21 3.10543 19.4276 3.0019 17.4492L2.9967 17.25V7.75C2.9967 5.74574 4.56907 4.10873 6.54755 4.0052L6.7467 4H10.2109H6.7467ZM14.5007 6.54431V3.75C14.5007 3.12603 15.2075 2.78995 15.6877 3.1398L15.7699 3.20874L21.7645 8.95874C22.0442 9.22709 22.0697 9.65811 21.8408 9.95607L21.7646 10.0412L15.77 15.793C15.3197 16.2251 14.5878 15.9477 14.5078 15.3589L14.5007 15.2519V12.45L14.1799 12.4438C11.5224 12.4359 9.25084 13.5269 7.31507 15.745C6.81946 16.3129 5.8898 15.8769 6.00952 15.1327C6.83651 9.99233 9.60859 7.08828 14.1988 6.57443L14.5007 6.54431V3.75V6.54431Z" />
    </svg>
  `,
})
export class StackedCardShareIconComponent {
  readonly size = input(20);
  readonly color = input('currentColor');
  readonly className = input('');
}

/** Document / Microsoft Word badge overlay. */
@Component({
  selector: 'kpmg-stacked-card-doc-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <rect width="32" height="32" rx="6" fill="#185ABD" />
      <path d="M19.5 8H12C11.1716 8 10.5 8.67157 10.5 9.5V22.5C10.5 23.3284 11.1716 24 12 24H20C20.8284 24 21.5 23.3284 21.5 22.5V10L19.5 8Z" fill="#2374E1" />
      <path d="M19.5 8V10.5H21.5L19.5 8Z" fill="#A3D4FF" />
      <rect x="7" y="11" width="10" height="10" rx="2" fill="#103F91" />
      <text x="12" y="18.5" fill="#FFFFFF" font-size="8" font-weight="700" font-family="sans-serif" text-anchor="middle">W</text>
    </svg>
  `,
})
export class StackedCardDocBadgeComponent {
  readonly size = input(32);
  readonly className = input('');
}

/** AI sparkle / star icon. */
@Component({
  selector: 'kpmg-special-card-sparkle-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="currentColor" [attr.color]="color()" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M12 2L14.39 8.26L21 9.27L16.5 14.14L17.77 21L12 17.77L6.23 21L7.5 14.14L3 9.27L9.61 8.26L12 2Z" />
    </svg>
  `,
})
export class SpecialCardSparkleIconComponent {
  readonly size = input(24);
  readonly color = input('currentColor');
  readonly className = input('');
}

/** Copy code to clipboard icon. */
@Component({
  selector: 'kpmg-special-card-copy-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" [attr.stroke]="color()" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  `,
})
export class SpecialCardCopyIconComponent {
  readonly size = input(16);
  readonly color = input('currentColor');
  readonly className = input('');
}

/** External reference link icon. */
@Component({
  selector: 'kpmg-special-card-external-link-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" [attr.stroke]="color()" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  `,
})
export class SpecialCardExternalLinkIconComponent {
  readonly size = input(14);
  readonly color = input('currentColor');
  readonly className = input('');
}

/** Info tooltip icon. */
@Component({
  selector: 'kpmg-special-card-info-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" [attr.stroke]="color()" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  `,
})
export class SpecialCardInfoIconComponent {
  readonly size = input(18);
  readonly color = input('currentColor');
  readonly className = input('');
}

/** Chip dismiss / close icon. */
@Component({
  selector: 'kpmg-special-card-close-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" [attr.stroke]="color()" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  `,
})
export class SpecialCardCloseIconComponent {
  readonly size = input(12);
  readonly color = input('currentColor');
  readonly className = input('');
}

/** Task file upload arrow icon. */
@Component({
  selector: 'kpmg-task-card-upload-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" [attr.stroke]="color()" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" [attr.class]="className() || null">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  `,
})
export class TaskCardUploadIconComponent {
  readonly size = input(20);
  readonly color = input('currentColor');
  readonly className = input('');
}
