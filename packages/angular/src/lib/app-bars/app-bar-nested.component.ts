import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { AppBarIconComponent } from './app-bar-icons.component';
import { AppBarStatusItemComponent, AppBarStatusType } from './app-bar-status-item.component';
import { AppBarBreadcrumbClick, AppBarBreadcrumbProps, AppBarCrumb, toBreadcrumbItems } from './app-bar-breadcrumbs';

export type AppBarNestedSize = 'small' | 'large';
export type AppBarNestedState = 'default' | 'filled';
export type AppBarNavIconType = 'menu' | 'back';

/** Emitted when a filter chip is clicked (React: `onChipClick(idx, chip)`). */
export interface AppBarChipClick {
  index: number;
  chip: string;
}

/**
 * AppBarNested — mirrors `AppBarNested` in AppBars.jsx (small 64px / large hero, default / filled).
 *
 * Deviations: ReactNode props are TemplateRefs (`navIcon`, `rightActions`; `breadcrumbs`,
 * `subheader` and `topBreadcrumbs` may be crumb arrays or a TemplateRef). React `children`
 * (hero content slot, large size) is projected via `<ng-content />`; since projected content cannot be
 * detected, set `hasContent` to render the `.kpmg-appbar-nested__content` wrapper.
 * `onNavClick`/`onBackClick` both map to `navClick`. Other callbacks are outputs
 * (`chipClick`, `breadcrumbClick`, `listClick`, `flowChartClick`, `overflowClick`, `speakerClick`,
 * `bookmarkClick`, `shareClick`). `ref`/`...props` are omitted.
 */
@Component({
  selector: 'kpmg-app-bar-nested',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, BreadcrumbsComponent, AppBarIconComponent, AppBarStatusItemComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <div class="kpmg-appbar-nested__top-bar">
        <div class="kpmg-appbar-nested__left">
          <button
            type="button"
            class="kpmg-appbar-icon-btn kpmg-appbar-icon-btn--nav"
            (click)="navClick.emit($event)"
            [attr.aria-label]="navIconType() === 'back' ? 'Go back' : 'Navigation menu'"
          >
            @if (navIcon(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else if (navIconType() === 'back') {
              <kpmg-app-bar-icon name="chevron-left" [size]="20" />
            } @else {
              <kpmg-app-bar-icon name="menu" [size]="20" />
            }
          </button>

          @if (hasTopBreadcrumbs()) {
            @if (topBreadcrumbsTemplate(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else if (topCrumbItems().length > 0) {
              <kpmg-breadcrumbs
                [items]="topCrumbItems()"
                [separator]="chevronSeparator"
                [size]="bcProps().size ?? 'md'"
                [className]="bcProps().className ?? 'kpmg-appbar-breadcrumbs kpmg-appbar-nested__top-breadcrumbs'"
                [maxItems]="bcProps().maxItems"
                [itemsBeforeCollapse]="bcProps().itemsBeforeCollapse"
                [itemsAfterCollapse]="bcProps().itemsAfterCollapse ?? 1"
                [overflowTrigger]="bcProps().overflowTrigger ?? 'click'"
              />
            }
          } @else {
            @if (topTitle() || (!isLarge() && title())) {
              <span class="kpmg-appbar-nested__title">{{ topTitle() || title() }}</span>
            }
            @if (statusType()) {
              <kpmg-app-bar-status-item [type]="statusType()!" [progress]="statusProgress()" />
            }
          }
        </div>

        <div class="kpmg-appbar-nested__right">
          @if (rightActions(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else if (isLarge()) {
            <button type="button" class="kpmg-appbar-icon-btn" (click)="speakerClick.emit($event)" aria-label="Speaker audio">
              <kpmg-app-bar-icon name="speaker" [size]="20" />
            </button>
            <button type="button" class="kpmg-appbar-icon-btn" (click)="bookmarkClick.emit($event)" aria-label="Bookmark">
              <kpmg-app-bar-icon name="bookmark" [size]="20" />
            </button>
            <button type="button" class="kpmg-appbar-icon-btn" (click)="shareClick.emit($event)" aria-label="Share">
              <kpmg-app-bar-icon name="share" [size]="20" />
            </button>
          } @else {
            <button type="button" class="kpmg-appbar-icon-btn" (click)="listClick.emit($event)" aria-label="List view">
              <kpmg-app-bar-icon name="bullet-list" [size]="20" />
            </button>
            <button type="button" class="kpmg-appbar-icon-btn" (click)="flowChartClick.emit($event)" aria-label="Flowchart view">
              <kpmg-app-bar-icon name="flow-chart" [size]="20" />
            </button>
            <button type="button" class="kpmg-appbar-icon-btn" (click)="overflowClick.emit($event)" aria-label="More options">
              <kpmg-app-bar-icon name="more-vertical" [size]="20" />
            </button>
          }
        </div>
      </div>

      @if (isLarge()) {
        <div class="kpmg-appbar-nested__hero">
          @if (heroTemplate(); as tpl) {
            <div class="kpmg-appbar-nested__breadcrumbs-wrapper"><ng-container [ngTemplateOutlet]="tpl" /></div>
          } @else if (heroCrumbItems().length > 0) {
            <div class="kpmg-appbar-nested__breadcrumbs-wrapper">
              <kpmg-breadcrumbs
                [items]="heroCrumbItems()"
                [separator]="slashSeparator"
                [size]="bcProps().size ?? 'md'"
                [className]="bcProps().className ?? 'kpmg-appbar-breadcrumbs kpmg-appbar-nested__breadcrumbs'"
                [maxItems]="bcProps().maxItems"
                [itemsBeforeCollapse]="bcProps().itemsBeforeCollapse"
                [itemsAfterCollapse]="bcProps().itemsAfterCollapse ?? 1"
                [overflowTrigger]="bcProps().overflowTrigger ?? 'click'"
              />
            </div>
          }
          @if (title()) {
            <h1 class="kpmg-appbar-nested__header">{{ title() }}</h1>
          }

          @if (filterChips() && filterChips().length > 0) {
            <div class="kpmg-appbar-nested__chips" role="tablist">
              @for (chip of filterChips(); track $index) {
                <button
                  type="button"
                  role="tab"
                  [attr.aria-selected]="selectedChip() === $index"
                  [class]="'kpmg-appbar-chip ' + (selectedChip() === $index ? 'kpmg-appbar-chip--active' : '')"
                  (click)="handleChipClick($index, chip)"
                >{{ chip }}</button>
              }
            </div>
          }

          @if (hasContent()) {
            <div class="kpmg-appbar-nested__content"><ng-content /></div>
          }
        </div>
      }
    </div>

    <ng-template #slashSeparator>
      <kpmg-app-bar-icon name="slash-forward" [size]="20" />
    </ng-template>
    <ng-template #chevronSeparator>
      <kpmg-app-bar-icon name="chevron-forward" [size]="20" />
    </ng-template>
  `,
})
export class AppBarNestedComponent {
  readonly size = input<AppBarNestedSize>('small');
  readonly state = input<AppBarNestedState>('default');
  readonly title = input<string | undefined>('Header');
  readonly topTitle = input<string | undefined>(undefined);
  /** Hero breadcrumbs: crumbs or a TemplateRef. Takes precedence over `subheader`. */
  readonly breadcrumbs = input<AppBarCrumb[] | TemplateRef<unknown> | undefined>(undefined);
  readonly breadcrumbProps = input<AppBarBreadcrumbProps>({});
  /** Hero category: crumb array, a single label, a TemplateRef, or `null`/`false` to hide. Defaults to two "Subheader" crumbs. */
  readonly subheader = input<AppBarCrumb[] | string | TemplateRef<unknown> | null | false | undefined>(undefined);
  /** Top-row breadcrumbs (replaces title + status when set). */
  readonly topBreadcrumbs = input<AppBarCrumb[] | TemplateRef<unknown> | null | false | undefined>(undefined);
  readonly navIcon = input<TemplateRef<unknown> | null>(null);
  readonly navIconType = input<AppBarNavIconType>('menu');
  readonly statusType = input<AppBarStatusType | undefined>(undefined);
  readonly statusProgress = input(30);
  readonly filterChips = input<string[]>(['All', 'Active', 'Archived']);
  readonly activeChip = input(0);
  readonly rightActions = input<TemplateRef<unknown> | null>(null);
  /** Render the hero content slot (`<ng-content />`) — React infers this from `children`. */
  readonly hasContent = input(false, { transform: booleanAttribute });
  readonly className = input('');

  readonly navClick = output<MouseEvent>();
  readonly chipClick = output<AppBarChipClick>();
  readonly breadcrumbClick = output<AppBarBreadcrumbClick>();
  readonly listClick = output<MouseEvent>();
  readonly flowChartClick = output<MouseEvent>();
  readonly overflowClick = output<MouseEvent>();
  readonly speakerClick = output<MouseEvent>();
  readonly bookmarkClick = output<MouseEvent>();
  readonly shareClick = output<MouseEvent>();

  protected readonly isLarge = computed(() => this.size() === 'large');
  protected readonly selectedChip = linkedSignal(() => this.activeChip());
  protected readonly bcProps = computed(() => this.breadcrumbProps() ?? {});
  protected readonly classes = computed(
    () => `kpmg-appbar kpmg-appbar-nested kpmg-appbar-nested--${this.size()} kpmg-appbar-nested--state-${this.state()} ${this.className()}`,
  );

  private readonly emitCrumb = (crumb: AppBarCrumb, index: number, event: Event) =>
    this.breadcrumbClick.emit({ crumb, index, event });

  /** Raw hero breadcrumbs (React `renderHeroBreadcrumbs` fallback chain). */
  private readonly heroRaw = computed<AppBarCrumb[] | TemplateRef<unknown> | null>(() => {
    const own = this.breadcrumbs();
    if (own !== undefined) return own;
    const sub = this.subheader();
    if (Array.isArray(sub)) return sub;
    if (sub instanceof TemplateRef) return sub;
    if (typeof sub === 'string' && sub.length > 0) return sub === 'Subheader' ? ['Subheader', 'Subheader'] : [sub];
    if (sub !== null && sub !== false) return ['Subheader', 'Subheader'];
    return null;
  });
  protected readonly heroTemplate = computed(() => {
    const r = this.heroRaw();
    return r instanceof TemplateRef ? r : null;
  });
  protected readonly heroCrumbItems = computed(() => {
    const r = this.heroRaw();
    return Array.isArray(r) && r.length > 0 ? toBreadcrumbItems(r, 'nested-crumb', this.emitCrumb) : [];
  });

  protected readonly hasTopBreadcrumbs = computed(() => {
    const t = this.topBreadcrumbs();
    return t !== undefined && t !== null && t !== false;
  });
  protected readonly topBreadcrumbsTemplate = computed(() => {
    const t = this.topBreadcrumbs();
    return t instanceof TemplateRef ? t : null;
  });
  protected readonly topCrumbItems = computed(() => {
    const t = this.topBreadcrumbs();
    return Array.isArray(t) && t.length > 0 ? toBreadcrumbItems(t, 'top-crumb', this.emitCrumb) : [];
  });

  protected handleChipClick(index: number, chip: string): void {
    this.selectedChip.set(index);
    this.chipClick.emit({ index, chip });
  }
}
