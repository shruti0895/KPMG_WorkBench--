import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Checkmark circle (React: `ListCheckCircleSvg`). Colour comes from `color` / currentColor. */
@Component({
  selector: 'kpmg-list-check-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" [class]="className()" [style.color]="color()" [style.cursor]="cursor()" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M6 10.2L8.7 13L14 7" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
})
export class ListCheckCircleComponent {
  readonly className = input('');
  readonly color = input<string | undefined>(undefined);
  readonly cursor = input<string | undefined>(undefined);
}

/** Chevron right arrow (React: `ListChevronSvg`). */
@Component({
  selector: 'kpmg-list-chevron',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" [class]="className()" aria-hidden="true">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </svg>
  `,
})
export class ListChevronComponent {
  readonly className = input('');
}

/** Avatar for list items (React: `ListAvatar`). Shows `src` when set, otherwise `initials`. */
@Component({
  selector: 'kpmg-list-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-list-avatar' + (className() ? ' ' + className() : '')">
      @if (src()) {
        <img [src]="src()" [alt]="alt()" />
      } @else {
        <span>{{ initials() }}</span>
      }
    </div>
  `,
})
export class ListAvatarComponent {
  readonly initials = input('AZ');
  readonly src = input<string | undefined>(undefined);
  readonly alt = input('');
  readonly className = input('');
}

/** Thumbnail / image for list items (React: `ListThumbnail`). */
@Component({
  selector: 'kpmg-list-thumbnail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-list-thumbnail' + (className() ? ' ' + className() : '')">
      @if (src()) {
        <img [src]="src()" [alt]="alt()" />
      }
    </div>
  `,
})
export class ListThumbnailComponent {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input('');
  readonly className = input('');
}
