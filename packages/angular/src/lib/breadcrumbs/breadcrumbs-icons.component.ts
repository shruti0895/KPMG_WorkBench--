import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Circle checkbox icon (mirrors `CircleCheckboxIconSvg`). */
@Component({
  selector: 'kpmg-circle-checkbox-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" aria-hidden="true">
      @if (checked()) {
        <circle cx="12" cy="12" r="10" [attr.fill]="color()" />
        <polyline points="8 12 11 15 16 9" fill="none" [attr.stroke]="tickColor()" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      } @else {
        <circle cx="12" cy="12" r="9" fill="none" stroke="#9090A2" stroke-width="2" />
      }
    </svg>
  `,
})
export class CircleCheckboxIconComponent {
  readonly checked = input(true);
  readonly color = input('#3D405B');
  readonly tickColor = input('#FFFFFF');
  readonly size = input(18);
}

/** Star outline icon (mirrors `StarOutlineIconSvg`). */
@Component({
  selector: 'kpmg-star-outline-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" [attr.stroke]="color()" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  `,
})
export class StarOutlineIconComponent {
  readonly color = input('#5D5D6A');
  readonly size = input(18);
}

/** Star filled icon (mirrors `StarFilledIconSvg`). */
@Component({
  selector: 'kpmg-star-filled-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" [attr.fill]="color()" [attr.stroke]="color()" stroke-width="1" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  `,
})
export class StarFilledIconComponent {
  readonly color = input('#F4D533');
  readonly size = input(18);
}

/** Trailing checkmark icon (mirrors `CheckmarkIconSvg`). */
@Component({
  selector: 'kpmg-checkmark-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" [attr.stroke]="color()" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  `,
})
export class CheckmarkIconComponent {
  readonly color = input('#454554');
  readonly size = input(16);
}

/** Slash separator icon (mirrors `SlashForwardIconSvg`). */
@Component({
  selector: 'kpmg-slash-forward-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="kpmg-breadcrumbs__slash-icon" aria-hidden="true">
      <path d="M12.6581 2.02566C12.9201 2.11298 13.0617 2.39614 12.9743 2.65811L7.97434 17.6581C7.88702 17.9201 7.60386 18.0617 7.34189 17.9743C7.07991 17.887 6.93833 17.6039 7.02566 17.3419L12.0257 2.34189C12.113 2.07991 12.3961 1.93833 12.6581 2.02566Z" fill="currentColor" />
    </svg>
  `,
})
export class SlashForwardIconComponent {
  readonly size = input(20);
}

/** Chevron separator icon (mirrors `ChevronForwardIconSvg`). */
@Component({
  selector: 'kpmg-chevron-forward-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="kpmg-breadcrumbs__chevron-icon" aria-hidden="true">
      <path d="M13.2923 12L8.69225 7.4L9.4 6.69225L14.7078 12L9.4 17.3078L8.69225 16.6L13.2923 12Z" fill="currentColor" />
    </svg>
  `,
})
export class ChevronForwardIconComponent {
  readonly size = input(20);
}
