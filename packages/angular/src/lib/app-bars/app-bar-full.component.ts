import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { AppBarIconComponent } from './app-bar-icons.component';
import { AppBarBreadcrumbClick, AppBarBreadcrumbProps, AppBarCrumb, toBreadcrumbItems } from './app-bar-breadcrumbs';

export type AppBarFullType = 'default' | 'with-action' | 'Default' | 'With action';

/**
 * AppBarFull — mirrors `AppBarFull` in AppBars.jsx (64px default / 128px with action row).
 *
 * Deviations: ReactNode props are TemplateRefs (`breadcrumbs` may be a string[]/object[] or a
 * TemplateRef, `rightActions`, `actionsSlot`); `children` is projected via `<ng-content />` at the end
 * of the header; callbacks are outputs (`brandClick`, `breadcrumbClick`, `actionClick`,
 * `secondaryActionClick`, `assistantClick`, `notificationsClick`, `overflowClick`, `avatarClick`);
 * `breadcrumbProps` supports a typed subset; `ref`/`...props` are omitted.
 */
@Component({
  selector: 'kpmg-app-bar-full',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, BreadcrumbsComponent, AppBarIconComponent],
  host: { style: 'display: contents' },
  template: `
    <header role="banner" [class]="classes()">
      <div class="kpmg-appbar-full__row">
        <div class="kpmg-appbar-full__left">
          <button type="button" class="kpmg-appbar-brand-pill" (click)="brandClick.emit($event)" [attr.aria-label]="brandLabel() + ' navigation menu'">
            <span class="kpmg-appbar-brand-pill__text">{{ brandLabel() }}</span>
            <kpmg-app-bar-icon name="chevron-down" [size]="16" className="kpmg-appbar-brand-pill__chevron" />
          </button>

          @if (pageTitle()) {
            <div class="kpmg-appbar-full__title-group">
              <kpmg-app-bar-icon name="chevron-forward" [size]="20" className="kpmg-appbar-full__title-chevron" />
              <span class="kpmg-appbar-full__title">{{ pageTitle() }}</span>
            </div>
          }

          @if (showBreadcrumbs()) {
            @if (breadcrumbsTemplate(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else if (crumbItems().length > 0) {
              <kpmg-breadcrumbs
                [items]="crumbItems()"
                [separator]="slashSeparator"
                [size]="bcProps().size ?? 'md'"
                [className]="bcProps().className ?? 'kpmg-appbar-breadcrumbs'"
                [maxItems]="bcProps().maxItems"
                [itemsBeforeCollapse]="bcProps().itemsBeforeCollapse"
                [itemsAfterCollapse]="bcProps().itemsAfterCollapse ?? 1"
                [overflowTrigger]="bcProps().overflowTrigger ?? 'click'"
              />
            }
          }
        </div>

        <div class="kpmg-appbar-full__right">
          @if (rightActions(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            <button type="button" class="kpmg-appbar-icon-btn kpmg-appbar-icon-btn--assistant" (click)="assistantClick.emit($event)" aria-label="Open Assistant">
              <kpmg-app-bar-icon name="robot" [size]="20" />
            </button>
            <button type="button" class="kpmg-appbar-icon-btn" (click)="notificationsClick.emit($event)" aria-label="Notifications">
              <kpmg-app-bar-icon name="bell" [size]="20" />
            </button>
            <button type="button" class="kpmg-appbar-icon-btn" (click)="overflowClick.emit($event)" aria-label="More options">
              <kpmg-app-bar-icon name="more-vertical" [size]="20" />
            </button>
            <button type="button" class="kpmg-appbar-icon-btn kpmg-appbar-icon-btn--avatar" (click)="avatarClick.emit($event)" [attr.aria-label]="avatarAlt()">
              @if (avatarSrc()) {
                <img [src]="avatarSrc()" [alt]="avatarAlt()" class="kpmg-appbar-avatar-img" />
              } @else {
                <kpmg-app-bar-icon name="avatar" [size]="20" />
              }
            </button>
          }
        </div>
      </div>

      @if (isWithAction()) {
        <div class="kpmg-appbar-full__action-row">
          @if (actionsSlot(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            <div class="kpmg-appbar-full__action-buttons">
              @if (actionButtonSecondary()) {
                <button type="button" class="kpmg-appbar-btn kpmg-appbar-btn--secondary" (click)="secondaryActionClick.emit($event)">{{ actionButtonSecondary() }}</button>
              }
              @if (actionButtonLabel()) {
                <button type="button" class="kpmg-appbar-btn kpmg-appbar-btn--primary" (click)="actionClick.emit($event)">{{ actionButtonLabel() }}</button>
              }
            </div>
          }
        </div>
      }

      <ng-content />
    </header>

    <ng-template #slashSeparator>
      <kpmg-app-bar-icon name="slash-forward" [size]="20" />
    </ng-template>
  `,
})
export class AppBarFullComponent {
  readonly type = input<AppBarFullType>('default');
  readonly brandLabel = input('KPMG');
  /** Route strings / item objects, or a TemplateRef for custom breadcrumbs. */
  readonly breadcrumbs = input<AppBarCrumb[] | TemplateRef<unknown> | null | undefined>(['Home', 'Projects', 'Analytics']);
  readonly breadcrumbProps = input<AppBarBreadcrumbProps>({});
  readonly showBreadcrumbs = input(true, { transform: booleanAttribute });
  readonly pageTitle = input<string | undefined>(undefined);
  readonly actionButtonLabel = input<string | null>('Save changes');
  readonly actionButtonSecondary = input<string | null>('Cancel');
  readonly actionsSlot = input<TemplateRef<unknown> | null>(null);
  readonly rightActions = input<TemplateRef<unknown> | null>(null);
  readonly avatarSrc = input<string | undefined>(undefined);
  readonly avatarAlt = input('User Profile');
  readonly className = input('');

  readonly brandClick = output<MouseEvent>();
  readonly breadcrumbClick = output<AppBarBreadcrumbClick>();
  readonly actionClick = output<MouseEvent>();
  readonly secondaryActionClick = output<MouseEvent>();
  readonly assistantClick = output<MouseEvent>();
  readonly notificationsClick = output<MouseEvent>();
  readonly overflowClick = output<MouseEvent>();
  readonly avatarClick = output<MouseEvent>();

  protected readonly isWithAction = computed(() => this.type() === 'with-action' || this.type() === 'With action');
  protected readonly bcProps = computed(() => this.breadcrumbProps() ?? {});
  protected readonly classes = computed(() => `kpmg-appbar kpmg-appbar-full kpmg-appbar-full--${this.type()} ${this.className()}`);

  protected readonly breadcrumbsTemplate = computed(() => {
    const b = this.breadcrumbs();
    return b instanceof TemplateRef ? b : null;
  });
  protected readonly crumbItems = computed(() => {
    const b = this.breadcrumbs();
    if (!Array.isArray(b) || b.length === 0) return [];
    return toBreadcrumbItems(b, 'crumb', (crumb, index, event) => this.breadcrumbClick.emit({ crumb, index, event }));
  });
}
