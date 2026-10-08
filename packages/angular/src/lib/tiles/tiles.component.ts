import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TileAlertCircleIconComponent } from './tile-icons.component';
import { TileHeaderComponent, TileHeaderStyle, TileHeaderType } from './tile-header.component';
import { TileProgressComponent } from './tile-progress.component';
import { TileReferenceCardComponent } from './tile-reference-card.component';
import { TileStackedCardComponent } from './tile-stacked-card.component';
import { TileTaskCardComponent } from './tile-task-card.component';

export type TileVariant = 'basic' | 'special';
export type TileStyle = 'outlined' | 'elevated' | 'filled';
export type TileType =
  | 'empty-with-missing'
  | 'empty'
  | 'empty-full'
  | 'configuring'
  | 'loading'
  | 'loading-full'
  | 'living-todo-list'
  | 'references'
  | 'learning-hub'
  | 'ai-forum'
  | 'project-tracker'
  | 'empty-state';

/**
 * WorkBench Tiles — mirrors packages/ui/src/components/Tiles/Tiles.jsx
 * (36 Figma variants: Basic and Special layouts × outlined/elevated/filled).
 *
 * Deviations: React's `style` prop is `styleType`; React `children` override is
 * projected via `<ng-content>` and requires `custom` to be set (Angular cannot
 * detect projected content); `onAction` / `onLoveToggle` / `onWishlistToggle` /
 * `onShareToggle` are the `action` / `loveToggle` / `wishlistToggle` / `shareToggle` outputs.
 */
@Component({
  selector: 'kpmg-tiles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TileAlertCircleIconComponent,
    TileHeaderComponent,
    TileProgressComponent,
    TileReferenceCardComponent,
    TileStackedCardComponent,
    TileTaskCardComponent,
  ],
  host: { style: 'display: contents' },
  template: `
    <div [class]="containerClasses()">
      @if (!isFullBleed()) {
        <kpmg-tile-header
          [title]="resolvedTitle()"
          [type]="resolvedHeaderType()"
          [styleType]="headerStyle()"
          (action)="action.emit($event)"
        />
      }

      @if (custom()) {
        <div class="kpmg-tile__body"><ng-content /></div>
      } @else {
        <div class="kpmg-tile__body">
          @switch (type()) {
            @case ('empty-with-missing') {
              <div class="kpmg-tile-alert">
                <span class="kpmg-tile-alert__text">{{ alertMessage() }}</span>
                <span class="kpmg-tile-alert__icon">
                  <kpmg-tile-alert-circle-icon [size]="24" />
                </span>
              </div>
              <div class="kpmg-tile-inner-card">
                <div class="kpmg-tile-thumb"></div>
                <div class="kpmg-tile-empty-text">{{ emptyMessage() }}</div>
              </div>
            }
            @case ('empty') {
              <div class="kpmg-tile-inner-card" style="margin-top: 14px">
                <div class="kpmg-tile-thumb"></div>
                <div class="kpmg-tile-empty-text">{{ emptyMessage() }}</div>
              </div>
            }
            @case ('empty-full') {
              <div class="kpmg-tile-inner-card kpmg-tile-inner-card--borderless">
                <div class="kpmg-tile-thumb"></div>
                <div class="kpmg-tile-empty-text">{{ emptyMessage() }}</div>
              </div>
            }
            @case ('configuring') {
              <div class="kpmg-tile-inner-card" style="margin-top: 14px">
                <div class="kpmg-tile-configuring">
                  <kpmg-tile-progress variant="circular" [progress]="progress()" size="large" />
                  <div>
                    <div class="kpmg-tile-configuring__label">Analysis in progress</div>
                    <div class="kpmg-tile-configuring__subtext">{{ progress() }}% complete</div>
                  </div>
                </div>
              </div>
            }
            @case ('loading') {
              <div style="flex: 1; margin-top: 14px">
                <div class="kpmg-tile-shimmer"></div>
              </div>
            }
            @case ('loading-full') {
              <div style="flex: 1; width: 100%; height: 100%">
                <div class="kpmg-tile-shimmer kpmg-tile-shimmer--full"></div>
              </div>
            }
            @case ('living-todo-list') {
              <div class="kpmg-tile-tabs" role="tablist">
                @for (idx of tabIndexes; track idx) {
                  <button
                    type="button"
                    role="tab"
                    [attr.aria-selected]="activeTab() === idx"
                    [class]="'kpmg-tile-tab-item ' + (activeTab() === idx ? 'kpmg-tile-tab-item--active' : '')"
                    (click)="activeTab.set(idx)"
                  >
                    <span>Tab</span>
                    <span class="kpmg-tile-tab-badge">4</span>
                  </button>
                }
              </div>
              <div class="kpmg-tile-task-list">
                @for (i of fourItems; track i) {
                  <kpmg-tile-task-card title="Header" [progress]="30" [completed]="true" />
                }
              </div>
            }
            @case ('references') {
              <div class="kpmg-tile-ref-list" style="margin-top: 12px">
                @for (i of fourItems; track i) {
                  <kpmg-tile-reference-card title="Header" supportingText="Supporting line text. Lorem ipsum dolor sit amet, consectetur." />
                }
              </div>
            }
            @case ('learning-hub') {
              <div class="kpmg-tile-stacked-grid" style="margin-top: 14px">
                @for (i of twoItems; track i) {
                  <kpmg-tile-stacked-card
                    authorInitials="AZ"
                    authorName="Header"
                    authorSubhead="Subhead"
                    title="Title"
                    subtitle="Subtitle"
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    [hasWordBadge]="true"
                    [showTags]="true"
                    [showReactions]="true"
                    [initialLoved]="!!initialLoved()"
                    [initialWishlisted]="!!initialWishlisted()"
                    [initialShared]="!!initialShared()"
                    (loveToggle)="loveToggle.emit($event)"
                    (wishlistToggle)="wishlistToggle.emit($event)"
                    (shareToggle)="shareToggle.emit($event)"
                  />
                }
              </div>
            }
            @case ('ai-forum') {
              <div class="kpmg-tile-stacked-grid" style="margin-top: 14px">
                @for (i of twoItems; track i) {
                  <kpmg-tile-stacked-card
                    authorInitials="AZ"
                    authorName="Header"
                    authorSubhead="Subhead"
                    title="Title"
                    subtitle="Subtitle"
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    [hasWordBadge]="false"
                    [showAvatarGroup]="true"
                  />
                }
              </div>
            }
            @case ('project-tracker') {
              <div class="kpmg-tile-panels-col" style="margin-top: 14px">
                <div class="kpmg-tile-panel kpmg-tile-panel--gradient"></div>
                <div class="kpmg-tile-panel kpmg-tile-panel--gradient"></div>
              </div>
            }
            @case ('empty-state') {
              <div class="kpmg-tile-panels-col" style="margin-top: 14px">
                @for (i of twoItems; track i) {
                  <div class="kpmg-tile-panel kpmg-tile-panel--empty">
                    <div class="kpmg-tile-thumb"></div>
                    <div class="kpmg-tile-empty-text">{{ emptyMessage() }}</div>
                  </div>
                }
              </div>
            }
          }
        </div>
      }
    </div>
  `,
})
export class TilesComponent {
  readonly variant = input<TileVariant>('basic');
  /** Surface style (React prop: `style`). */
  readonly styleType = input<TileStyle>('outlined');
  readonly type = input<TileType>('empty-with-missing');
  readonly title = input<string | undefined>(undefined);
  readonly headerStyle = input<TileHeaderStyle>('default');
  /** Auto-inferred when omitted. */
  readonly headerType = input<TileHeaderType | undefined>(undefined);
  readonly progress = input(80);
  readonly alertMessage = input('Project data missing');
  readonly emptyMessage = input('Empty state message');
  readonly fluid = input(false, { transform: booleanAttribute });
  /** Set when projecting custom body content (React: `children`). */
  readonly custom = input(false, { transform: booleanAttribute });
  readonly initialLoved = input<boolean | undefined>(undefined);
  readonly initialWishlisted = input<boolean | undefined>(undefined);
  readonly initialShared = input<boolean | undefined>(undefined);
  readonly className = input('');

  /** Header action button click. React: `onAction`. */
  readonly action = output<MouseEvent>();
  readonly loveToggle = output<boolean>();
  readonly wishlistToggle = output<boolean>();
  readonly shareToggle = output<boolean>();

  protected readonly activeTab = signal(0);
  protected readonly tabIndexes = [0, 1, 2];
  protected readonly twoItems = [1, 2];
  protected readonly fourItems = [1, 2, 3, 4];

  private readonly isSpecial = computed(() => this.variant() === 'special');
  protected readonly isFullBleed = computed(() => this.type() === 'empty-full' || this.type() === 'loading-full');

  protected readonly resolvedTitle = computed(() => {
    const title = this.title();
    if (title) return title;
    switch (this.type()) {
      case 'living-todo-list':
        return 'Living to do list';
      case 'references':
        return 'Tile title';
      case 'learning-hub':
        return 'Learning hub';
      case 'ai-forum':
        return 'AI forum';
      case 'project-tracker':
        return 'Project tracker';
      case 'empty-state':
        return 'Tile title';
      default:
        return 'Header';
    }
  });

  protected readonly resolvedHeaderType = computed<TileHeaderType>(
    () => this.headerType() || (this.type() === 'living-todo-list' || this.variant() === 'basic' ? 'with-menu' : 'with-button'),
  );

  protected readonly containerClasses = computed(() => {
    let dimensionClass = 'kpmg-tile--basic';
    if (this.isFullBleed()) dimensionClass = 'kpmg-tile--basic-full';
    else if (this.isSpecial()) dimensionClass = `kpmg-tile--special-${this.type()}`;
    return ['kpmg-tile', `kpmg-tile--${this.styleType()}`, dimensionClass, this.fluid() ? 'kpmg-tile--fluid' : '', this.className()]
      .filter(Boolean)
      .join(' ');
  });
}
