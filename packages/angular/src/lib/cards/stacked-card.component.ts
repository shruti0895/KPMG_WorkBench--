import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CardToggleEvent } from './card-events';
import {
  HorizontalCardMoreIconComponent,
  StackedCardBookmarkIconComponent,
  StackedCardDocBadgeComponent,
  StackedCardHeartIconComponent,
  StackedCardShareIconComponent,
} from './cards-icons.component';

export type StackedCardType = 'Media' | 'Assistant' | 'Forum';
export type StackedCardStyle = 'Outline' | 'Outlined' | 'Elevated' | 'Filled';

/** Emitted when an Assistant chip is clicked. React: `onChipClick(e, chip, idx)`. */
export interface StackedCardChipClick {
  event: MouseEvent;
  chip: string;
  index: number;
}

/**
 * WorkBench StackedCard (alias `StackedCards`) — mirrors packages/ui/src/components/Cards/Cards.jsx
 * (18 Figma variants: Media/Assistant/Forum × Outline/Elevated/Filled × 1/2 images).
 *
 * Deviations: `onClick` presence is not detectable, so set `clickable` and listen to `cardClick`;
 * `mediaBadge` (ReactNode) is a `TemplateRef`; `isHearted`/`isBookmarked` are two-way models
 * (leave `undefined` for uncontrolled); `onHeartClick(e, next)`/`onBookmarkClick(e, next)` are the
 * `heartClick`/`bookmarkClick` outputs (`{ event, value }`); other `on*Click` callbacks are outputs of the same name
 * without the `on` prefix (`moreClick`, `primaryClick`, `secondaryClick`, `chipClick`, `shareClick`).
 */
@Component({
  selector: 'kpmg-stacked-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    HorizontalCardMoreIconComponent,
    StackedCardBookmarkIconComponent,
    StackedCardDocBadgeComponent,
    StackedCardHeartIconComponent,
    StackedCardShareIconComponent,
  ],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" (click)="cardClick.emit($event)">
      @if (hasHeader()) {
        <header class="stacked-card__header">
          <div class="stacked-card__user">
            <div class="stacked-card__avatar">
              @if (avatarSrc()) {
                <img [src]="avatarSrc()" [alt]="avatarAlt()" class="stacked-card__avatar-img" />
              } @else {
                <div class="stacked-card__avatar-placeholder">{{ authorName() ? authorName().charAt(0).toUpperCase() : 'U' }}</div>
              }
            </div>
            <div class="stacked-card__user-info">
              <span class="stacked-card__user-name">{{ authorName() }}</span>
              @if (authorSubhead()) {
                <span class="stacked-card__user-subhead">{{ authorSubhead() }}</span>
              }
            </div>
          </div>
          <button type="button" class="stacked-card__overflow-btn" (click)="onMore($event)" aria-label="More options">
            <kpmg-horizontal-card-more-icon [size]="20" />
          </button>
        </header>
      }

      @if (hasMedia()) {
        <div class="stacked-card__media-container">
          @if (numImages() === 1) {
            <div class="stacked-card__media-single">
              @if (imageSrc()) {
                <img [src]="imageSrc()" [alt]="imageAlt()" class="stacked-card__img" />
              } @else {
                <div class="stacked-card__gradient-box"></div>
              }
              @if (hasMediaBadge()) {
                <div class="stacked-card__media-badge">
                  @if (mediaBadge(); as tpl) {
                    <ng-container [ngTemplateOutlet]="tpl" />
                  } @else {
                    <kpmg-stacked-card-doc-badge />
                  }
                </div>
              }
            </div>
          } @else {
            <div class="stacked-card__media-double">
              <div class="stacked-card__media-item">
                @if (images()?.[0]; as first) {
                  <img [src]="first" [alt]="imageAlt() + ' 1'" class="stacked-card__img" />
                } @else {
                  <div class="stacked-card__gradient-box stacked-card__gradient-box--1"></div>
                }
              </div>
              <div class="stacked-card__media-item">
                @if (images()?.[1]; as second) {
                  <img [src]="second" [alt]="imageAlt() + ' 2'" class="stacked-card__img" />
                } @else {
                  <div class="stacked-card__gradient-box stacked-card__gradient-box--2"></div>
                }
              </div>
            </div>
          }
        </div>
      }

      <div class="stacked-card__content">
        <h4 class="stacked-card__title">{{ title() }}</h4>
        @if (subhead()) {
          <span class="stacked-card__subhead">{{ subhead() }}</span>
        }
        @if (bodyText()) {
          <p class="stacked-card__body">{{ bodyText() }}</p>
        }
      </div>

      @if (type() === 'Media' && hasButtons()) {
        <footer class="stacked-card__footer stacked-card__footer--media">
          <div class="stacked-card__buttons-row">
            @if (secondaryButtonText()) {
              <button type="button" class="stacked-card__btn stacked-card__btn--secondary" (click)="onSecondary($event)">{{ secondaryButtonText() }}</button>
            }
            @if (primaryButtonText()) {
              <button type="button" class="stacked-card__btn stacked-card__btn--primary" (click)="onPrimary($event)">{{ primaryButtonText() }}</button>
            }
          </div>
        </footer>
      }

      @if (type() === 'Assistant') {
        <footer class="stacked-card__footer stacked-card__footer--assistant">
          @if (chips() && chips().length > 0) {
            <div class="stacked-card__chips-row">
              @for (chip of chips(); track $index) {
                <button type="button" class="stacked-card__chip" (click)="onChip($event, chip, $index)">{{ chip }}</button>
              }
            </div>
          }
          @if (hasSocialActions()) {
            <div class="stacked-card__social-row">
              <button
                type="button"
                [class]="'stacked-card__social-item ' + (hearted() ? 'stacked-card__social-item--hearted' : '')"
                (click)="onHeart($event)"
                aria-label="Heart like"
              >
                <kpmg-stacked-card-heart-icon [filled]="hearted()" [size]="20" />
                <span class="stacked-card__social-count">{{ heartCount() }}</span>
              </button>
              <button
                type="button"
                [class]="'stacked-card__social-item ' + (bookmarked() ? 'stacked-card__social-item--bookmarked' : '')"
                (click)="onBookmark($event)"
                aria-label="Bookmark save"
              >
                <kpmg-stacked-card-bookmark-icon [filled]="bookmarked()" [size]="20" />
                <span class="stacked-card__social-count">{{ bookmarkCount() }}</span>
              </button>
              <button type="button" class="stacked-card__social-item" (click)="onShare($event)" aria-label="Share">
                <kpmg-stacked-card-share-icon [size]="20" />
                <span class="stacked-card__social-count">{{ shareCount() }}</span>
              </button>
            </div>
          }
        </footer>
      }

      @if (type() === 'Forum') {
        <footer class="stacked-card__footer stacked-card__footer--forum">
          <div class="stacked-card__avatar-group">
            @for (av of visibleAvatars(); track $index) {
              <div class="stacked-card__avatar-group-item" [style.z-index]="10 - $index">
                @if (isUrl(av)) {
                  <img [src]="av" alt="Participant" class="stacked-card__avatar-img" />
                } @else {
                  <div [class]="'stacked-card__avatar-placeholder stacked-card__avatar-placeholder--' + ($index % 3)">{{ letter($index) }}</div>
                }
              </div>
            }
            @if (participantLabel()) {
              <span class="stacked-card__participant-label">+{{ avatarCount() }} {{ participantLabel() }}</span>
            }
          </div>
        </footer>
      }
    </div>
  `,
})
export class StackedCardComponent {
  readonly type = input<StackedCardType>('Media');
  readonly styleVariant = input<StackedCardStyle>('Outline');
  readonly imageAmount = input<number | string>(1);

  readonly hasHeader = input(true, { transform: booleanAttribute });
  readonly authorName = input('Author Name');
  readonly authorSubhead = input('2 hours ago');
  readonly avatarSrc = input<string | undefined>(undefined);
  readonly avatarAlt = input('Author avatar');

  readonly hasMedia = input(true, { transform: booleanAttribute });
  readonly imageSrc = input<string | undefined>(undefined);
  readonly images = input<string[] | undefined>(undefined);
  readonly imageAlt = input('Card media');
  readonly hasMediaBadge = input(true, { transform: booleanAttribute });
  /** Custom badge overlay (default: Word document badge). */
  readonly mediaBadge = input<TemplateRef<unknown> | undefined>(undefined);

  readonly title = input('Header');
  readonly subhead = input('Supporting line text');
  readonly bodyText = input('Description text Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh');

  readonly hasButtons = input(true, { transform: booleanAttribute });
  readonly primaryButtonText = input('Action');
  readonly secondaryButtonText = input('Cancel');

  readonly chips = input<string[]>(['Tag 1', 'Tag 2']);
  readonly hasSocialActions = input(true, { transform: booleanAttribute });
  readonly heartCount = input<number | string>(24);
  /** Heart state (two-way); leave `undefined` for uncontrolled. */
  readonly isHearted = model<boolean | undefined>(undefined);
  readonly bookmarkCount = input<number | string>(12);
  readonly isBookmarked = model<boolean | undefined>(undefined);
  readonly shareCount = input<number | string>(5);

  readonly avatars = input<(string | number)[] | undefined>(undefined);
  readonly avatarCount = input(3);
  readonly participantLabel = input('participants');

  /** Adds `stacked-card--clickable` (React: inferred from `onClick`). */
  readonly clickable = input(false, { transform: booleanAttribute });
  readonly className = input('');

  readonly cardClick = output<MouseEvent>();
  readonly moreClick = output<MouseEvent>();
  readonly primaryClick = output<MouseEvent>();
  readonly secondaryClick = output<MouseEvent>();
  readonly chipClick = output<StackedCardChipClick>();
  readonly heartClick = output<CardToggleEvent>();
  readonly bookmarkClick = output<CardToggleEvent>();
  readonly shareClick = output<MouseEvent>();

  private readonly internalHearted = linkedSignal(() => this.isHearted() ?? false);
  private readonly internalBookmarked = linkedSignal(() => this.isBookmarked() ?? false);
  protected readonly hearted = computed(() => this.internalHearted());
  protected readonly bookmarked = computed(() => this.internalBookmarked());

  protected readonly numImages = computed(() => (Number(this.imageAmount()) === 2 ? 2 : 1));

  protected readonly visibleAvatars = computed<(string | number)[]>(() => (this.avatars() || [0, 1, 2]).slice(0, this.avatarCount()));

  protected readonly classes = computed(() => {
    const style = this.styleVariant().toLowerCase();
    return [
      'stacked-card',
      `stacked-card--type-${this.type().toLowerCase()}`,
      `stacked-card--style-${style === 'outlined' ? 'outline' : style}`,
      `stacked-card--images-${this.numImages()}`,
      this.clickable() ? 'stacked-card--clickable' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected isUrl(av: string | number): av is string {
    return typeof av === 'string' && !!av;
  }

  protected letter(idx: number): string {
    return String.fromCharCode(65 + idx);
  }

  protected onMore(e: MouseEvent): void {
    e.stopPropagation();
    this.moreClick.emit(e);
  }

  protected onPrimary(e: MouseEvent): void {
    e.stopPropagation();
    this.primaryClick.emit(e);
  }

  protected onSecondary(e: MouseEvent): void {
    e.stopPropagation();
    this.secondaryClick.emit(e);
  }

  protected onChip(e: MouseEvent, chip: string, index: number): void {
    e.stopPropagation();
    this.chipClick.emit({ event: e, chip, index });
  }

  protected onShare(e: MouseEvent): void {
    e.stopPropagation();
    this.shareClick.emit(e);
  }

  protected onHeart(e: MouseEvent): void {
    e.stopPropagation();
    const next = !this.hearted();
    this.internalHearted.set(next);
    this.isHearted.set(next);
    this.heartClick.emit({ event: e, value: next });
  }

  protected onBookmark(e: MouseEvent): void {
    e.stopPropagation();
    const next = !this.bookmarked();
    this.internalBookmarked.set(next);
    this.isBookmarked.set(next);
    this.bookmarkClick.emit({ event: e, value: next });
  }
}

/** Alias matching the React `StackedCards` export. */
export { StackedCardComponent as StackedCardsComponent };
