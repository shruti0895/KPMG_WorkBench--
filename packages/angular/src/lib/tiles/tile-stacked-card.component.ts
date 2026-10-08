import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, output } from '@angular/core';
import {
  TileBookmarkIconComponent,
  TileHeartIconComponent,
  TileMoreVerticalIconComponent,
  TileShareIconComponent,
  TileWordDocIconComponent,
} from './tile-icons.component';

/**
 * WorkBench TileStackedCard — mirrors the `TileStackedCard` export of packages/ui/src/components/Tiles/Tiles.jsx.
 *
 * Reactions are controlled when `isLoved` / `isWishlisted` / `isShared` is
 * provided, otherwise uncontrolled starting from `initial*`. Deviation:
 * `on*Toggle` callbacks are the `loveToggle` / `wishlistToggle` / `shareToggle` outputs.
 */
@Component({
  selector: 'kpmg-tile-stacked-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TileBookmarkIconComponent, TileHeartIconComponent, TileMoreVerticalIconComponent, TileShareIconComponent, TileWordDocIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <div class="kpmg-tile-stacked-card__author">
        <div class="kpmg-tile-stacked-card__author-info">
          <div class="kpmg-tile-avatar">{{ authorInitials() }}</div>
          <div class="kpmg-tile-stacked-card__author-text">
            <span class="kpmg-tile-stacked-card__author-name">{{ authorName() }}</span>
            <span class="kpmg-tile-stacked-card__author-sub">{{ authorSubhead() }}</span>
          </div>
        </div>
        <button type="button" class="kpmg-tile-header__action" aria-label="Post options">
          <kpmg-tile-more-vertical-icon [size]="20" color="var(--color-on-surface, #454554)" />
        </button>
      </div>

      <div class="kpmg-tile-stacked-card__banner">
        @if (hasWordBadge()) {
          <div class="kpmg-tile-stacked-card__badge">
            <kpmg-tile-word-doc-icon [size]="28" />
          </div>
        }
      </div>

      <div class="kpmg-tile-stacked-card__content">
        <h4 class="kpmg-tile-stacked-card__title">{{ title() }}</h4>
        <div class="kpmg-tile-stacked-card__subhead">{{ subtitle() }}</div>
        <p class="kpmg-tile-stacked-card__desc">{{ desc() }}</p>

        @if (showTags()) {
          <div class="kpmg-tile-tags-row">
            <span class="kpmg-tile-tag-pill">Optional tag</span>
            <span class="kpmg-tile-tag-pill">Optional tag</span>
          </div>
        }

        @if (showReactions()) {
          <div class="kpmg-tile-reactions-row" role="group" aria-label="Social reactions">
            <button
              type="button"
              [class]="'kpmg-tile-reaction-item ' + (loved() ? 'kpmg-tile-reaction-item--active kpmg-tile-reaction-item--loved' : '')"
              (click)="onLove($event)"
              [attr.aria-label]="loved() ? 'Unlike' : 'Like'"
              [attr.aria-pressed]="loved()"
            >
              <kpmg-tile-heart-icon [size]="20" [color]="loved() ? '#CF0E54' : '#9090a2'" />
              <span>{{ loveCount() }}</span>
            </button>
            <button
              type="button"
              [class]="'kpmg-tile-reaction-item ' + (wishlisted() ? 'kpmg-tile-reaction-item--active kpmg-tile-reaction-item--wishlisted' : '')"
              (click)="onWishlist($event)"
              [attr.aria-label]="wishlisted() ? 'Remove from wishlist' : 'Add to wishlist'"
              [attr.aria-pressed]="wishlisted()"
            >
              <kpmg-tile-bookmark-icon [size]="20" [color]="wishlisted() ? '#F4D533' : '#9090a2'" />
              <span>{{ wishlistCount() }}</span>
            </button>
            <button
              type="button"
              [class]="'kpmg-tile-reaction-item ' + (shared() ? 'kpmg-tile-reaction-item--active kpmg-tile-reaction-item--shared' : '')"
              (click)="onShare($event)"
              [attr.aria-label]="shared() ? 'Unshare' : 'Share'"
              [attr.aria-pressed]="shared()"
            >
              <kpmg-tile-share-icon [size]="20" [color]="shared() ? '#1A28C1' : '#9090a2'" />
              <span>{{ shareCount() }}</span>
            </button>
          </div>
        }

        @if (showAvatarGroup()) {
          <div class="kpmg-tile-avatar-group">
            @for (initials of avatarInitials; track $index) {
              <div class="kpmg-tile-avatar-group__item">{{ initials }}</div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class TileStackedCardComponent {
  readonly authorInitials = input('AZ');
  readonly authorName = input('Header');
  readonly authorSubhead = input('Subhead');
  readonly title = input('Title');
  readonly subtitle = input('Subtitle');
  readonly desc = input('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor');
  readonly hasWordBadge = input(false, { transform: booleanAttribute });
  readonly showTags = input(false, { transform: booleanAttribute });
  readonly showReactions = input(false, { transform: booleanAttribute });
  readonly showAvatarGroup = input(false, { transform: booleanAttribute });
  readonly initialLoved = input(false, { transform: booleanAttribute });
  readonly initialWishlisted = input(false, { transform: booleanAttribute });
  readonly initialShared = input(false, { transform: booleanAttribute });
  /** Controlled values; leave `undefined` for uncontrolled. */
  readonly isLoved = input<boolean | undefined>(undefined);
  readonly isWishlisted = input<boolean | undefined>(undefined);
  readonly isShared = input<boolean | undefined>(undefined);
  readonly loveCount = input<string | number>('2.4K');
  readonly wishlistCount = input<string | number>('2.4K');
  readonly shareCount = input<string | number>('2.4K');
  readonly className = input('');

  /** React: `onLoveToggle(next)`. */
  readonly loveToggle = output<boolean>();
  /** React: `onWishlistToggle(next)`. */
  readonly wishlistToggle = output<boolean>();
  /** React: `onShareToggle(next)`. */
  readonly shareToggle = output<boolean>();

  protected readonly avatarInitials = ['AZ', 'AZ', 'AZ', 'AZ', 'AZ'];

  private readonly internalLoved = linkedSignal(() => this.initialLoved());
  private readonly internalWishlisted = linkedSignal(() => this.initialWishlisted());
  private readonly internalShared = linkedSignal(() => this.initialShared());

  protected readonly loved = computed(() => this.isLoved() ?? this.internalLoved());
  protected readonly wishlisted = computed(() => this.isWishlisted() ?? this.internalWishlisted());
  protected readonly shared = computed(() => this.isShared() ?? this.internalShared());

  protected readonly classes = computed(() => ['kpmg-tile-stacked-card', this.className()].filter(Boolean).join(' '));

  protected onLove(e: Event): void {
    e.stopPropagation();
    const next = !this.loved();
    if (this.isLoved() === undefined) this.internalLoved.set(next);
    this.loveToggle.emit(next);
  }

  protected onWishlist(e: Event): void {
    e.stopPropagation();
    const next = !this.wishlisted();
    if (this.isWishlisted() === undefined) this.internalWishlisted.set(next);
    this.wishlistToggle.emit(next);
  }

  protected onShare(e: Event): void {
    e.stopPropagation();
    const next = !this.shared();
    if (this.isShared() === undefined) this.internalShared.set(next);
    this.shareToggle.emit(next);
  }
}
