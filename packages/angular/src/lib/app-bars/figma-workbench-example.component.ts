import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { FigmaIconComponent, FigmaIconName } from './figma-icons.component';

interface NavItem {
  id: string;
  label: string;
  badge?: string;
  icon: FigmaIconName;
}
interface OverflowItem {
  id: string;
  label?: string;
  isDivider?: boolean;
}

/**
 * FigmaWorkbenchExample — mirrors packages/ui/src/components/AppBars/FigmaWorkbenchExample.jsx: the
 * self-contained Figma full-screen reference (top app bar, nav + overflow flyouts, hero with floating AI search).
 * It is a self-contained, interactive reference composition, not a configurable building block, so it is
 * published as a component for parity. `onSearchSubmit(value)` is the `searchSubmit` output.
 */
@Component({
  selector: 'kpmg-figma-workbench-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FigmaIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-figma-example-container ' + className()">
      @if (activeNotification(); as note) {
        <div style="padding: 8px 16px; border-radius: 8px; background-color: var(--color-blue-800, #e9eafc); color: var(--color-primary-action, #1a28c1); font-size: 13px; font-weight: 600">
          {{ note }}
        </div>
      }

      <div class="kpmg-figma-frame-full" data-node-id="1537:6788" data-name="Full">
        <header class="kpmg-figma-appbar" data-node-id="1537:6798" data-name="Top app bars full">
          <div class="kpmg-figma-appbar__left" data-node-id="I1537:6798;1313:64199">
            <button
              type="button"
              class="kpmg-figma-brand-pill"
              (click)="navMenuOpen.set(!navMenuOpen())"
              aria-haspopup="true"
              [attr.aria-expanded]="navMenuOpen()"
              aria-label="KPMG Navigation Menu"
              data-node-id="I1537:6798;1663:39698;1663:36987"
              data-name="Dropdown bases"
            >
              <span class="kpmg-figma-brand-pill__logo">KPMG</span>
              <span [class]="'kpmg-figma-brand-pill__chevron ' + (navMenuOpen() ? 'kpmg-figma-brand-pill__chevron--open' : '')">
                <kpmg-figma-icon name="chevron" [size]="16" />
              </span>
            </button>

            <nav aria-label="Breadcrumb" data-node-id="I1537:6798;1537:4980">
              <ol class="kpmg-figma-breadcrumbs">
                <li class="kpmg-figma-breadcrumb-item">
                  <a class="kpmg-figma-breadcrumb-link" href="#breadcrumb">Breadcrumb</a>
                  <span class="kpmg-figma-breadcrumb-slash"><kpmg-figma-icon name="slash" [size]="20" /></span>
                </li>
                <li class="kpmg-figma-breadcrumb-item">
                  <a class="kpmg-figma-breadcrumb-link" href="#breadcrumb">Breadcrumb</a>
                  <span class="kpmg-figma-breadcrumb-slash"><kpmg-figma-icon name="slash" [size]="20" /></span>
                </li>
                <li class="kpmg-figma-breadcrumb-item" aria-current="page">
                  <span class="kpmg-figma-breadcrumb-link" style="font-weight: 600">Breadcrumb</span>
                </li>
              </ol>
            </nav>
          </div>

          <div class="kpmg-figma-appbar__right" data-node-id="I1537:6798;1313:64206">
            <button type="button" class="kpmg-figma-icon-btn" aria-label="Assistant Menu" title="KPMG Trusted AI Assistant" data-node-id="I1537:6798;1313:64206;assistant">
              <kpmg-figma-icon name="sparkle-robot" [size]="20" color="var(--color-neutral-100, #454554)" />
            </button>

            <button type="button" class="kpmg-figma-icon-btn" aria-label="User Avatar and Settings" title="Settings & Profile" data-node-id="I1537:6798;1574:10977">
              <kpmg-figma-icon name="avatar-gear" [size]="24" />
            </button>

            <button
              type="button"
              [class]="'kpmg-figma-icon-btn ' + (overflowMenuOpen() ? 'kpmg-figma-icon-btn--overflow-active' : '')"
              (click)="overflowMenuOpen.set(!overflowMenuOpen())"
              aria-haspopup="true"
              [attr.aria-expanded]="overflowMenuOpen()"
              aria-label="More options"
              title="Overflow Menu"
              data-node-id="I1537:6798;1663:41924"
            >
              <kpmg-figma-icon name="more-vertical" [size]="24" [color]="overflowMenuOpen() ? 'var(--color-primary-action, #1a28c1)' : 'var(--color-neutral-100, #454554)'" />
            </button>

            <button type="button" class="kpmg-figma-icon-btn" (click)="dismissMenus()" aria-label="Dismiss view" title="Close or Dismiss" data-node-id="I1537:6798;1341:45797">
              <kpmg-figma-icon name="dismiss" [size]="24" color="var(--color-neutral-100, #454554)" />
            </button>
          </div>
        </header>

        @if (navMenuOpen()) {
          <aside class="kpmg-figma-nav-flyout" role="menu" aria-label="Navigation Menu" data-node-id="I1537:6798;1663:39698;1663:37112" data-name="Navigation menus">
            <div class="kpmg-figma-nav-header">Header</div>
            <div class="kpmg-figma-nav-divider" role="separator"></div>

            @for (item of navMenuItems; track item.id) {
              <button
                type="button"
                role="menuitem"
                [class]="'kpmg-figma-nav-item ' + (activeNav() === item.id ? 'kpmg-figma-nav-item--active' : '')"
                (click)="activeNav.set(item.id)"
                [attr.aria-current]="activeNav() === item.id ? 'page' : null"
              >
                <span class="kpmg-figma-nav-item__icon"><kpmg-figma-icon [name]="item.icon" [size]="16" /></span>
                <span class="kpmg-figma-nav-item__label">{{ item.label }}</span>
                @if (item.badge) {
                  <span class="kpmg-figma-nav-item__badge">{{ item.badge }}</span>
                }
              </button>
            }

            <div class="kpmg-figma-nav-divider" role="separator"></div>

            <div class="kpmg-figma-nav-group-title">Labels</div>
            @for (item of labelItems; track item.id) {
              <button type="button" role="menuitem" class="kpmg-figma-nav-item" (click)="activeNav.set(item.id)">
                <span class="kpmg-figma-nav-item__icon"><kpmg-figma-icon [name]="item.icon" [size]="16" /></span>
                <span class="kpmg-figma-nav-item__label">{{ item.label }}</span>
              </button>
            }
          </aside>
        }

        @if (overflowMenuOpen()) {
          <div class="kpmg-figma-overflow-flyout" role="menu" aria-label="Overflow options" data-node-id="I1537:6798;1663:41924;1663:37850" data-name="Dropdown item groups">
            @for (item of overflowItems; track $index) {
              @if (item.isDivider) {
                <div class="kpmg-figma-overflow-divider" role="separator"></div>
              } @else {
                @let isChecked = selectedOptions().includes(item.id);
                <button
                  type="button"
                  role="menuitemcheckbox"
                  [attr.aria-checked]="isChecked"
                  class="kpmg-figma-overflow-item"
                  (click)="toggleOption(item.id)"
                >
                  <span [class]="'kpmg-figma-overflow-circle-cb ' + (isChecked ? 'kpmg-figma-overflow-circle-cb--checked' : '')">
                    @if (isChecked) {
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                        <path d="M1 4L3 6L7 2" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    }
                  </span>
                  <span>{{ item.label }}</span>
                </button>
              }
            }
          </div>
        }

        <main class="kpmg-figma-content-canvas" data-node-id="1537:6789" data-name="Frame 2018777618">
          <div class="kpmg-figma-hero-section" data-node-id="1537:6790" data-name="Your design (Web)">
            <div class="kpmg-figma-hero-banner" data-node-id="1537:6791"></div>

            <form role="search" (submit)="handleSearchSubmit($event)" class="kpmg-figma-search-pill" data-node-id="1537:6795" data-name="Search text">
              <button type="button" class="kpmg-figma-search-pill__btn" aria-label="Attach file" title="Attach document or dataset" (click)="notify('Attachment button clicked')">
                <kpmg-figma-icon name="paperclip" [size]="28" color="var(--color-primary-action, #1a28c1)" />
              </button>

              <div class="kpmg-figma-search-pill__input-wrapper">
                <input
                  type="text"
                  [value]="searchValue()"
                  (input)="onSearchInput($event)"
                  placeholder="Ask me anything"
                  class="kpmg-figma-search-pill__input"
                  aria-label="Ask me anything"
                />
              </div>

              <div class="kpmg-figma-search-pill__actions">
                <button type="button" class="kpmg-figma-search-pill__btn" aria-label="Voice input" title="Voice search" (click)="notify('Voice input listening...')">
                  <kpmg-figma-icon name="mic" [size]="28" color="var(--color-primary-action, #1a28c1)" />
                </button>
                <button type="submit" class="kpmg-figma-search-pill__btn" aria-label="Send prompt" title="Submit prompt">
                  <kpmg-figma-icon name="arrow-up" [size]="28" color="var(--color-primary-action, #1a28c1)" />
                </button>
              </div>
            </form>
          </div>

          <div class="kpmg-figma-content-card" data-node-id="1537:6796" data-name="Your design (Web)"></div>
          <div class="kpmg-figma-content-card" data-node-id="1537:6797" data-name="Your design (Web)"></div>
        </main>
      </div>
    </div>
  `,
})
export class FigmaWorkbenchExampleComponent {
  readonly className = input('');
  /** Emits the submitted search text. */
  readonly searchSubmit = output<string>();

  protected readonly navMenuOpen = signal(true);
  protected readonly overflowMenuOpen = signal(true);
  protected readonly activeNav = signal('Inbox');
  protected readonly selectedOptions = signal<string[]>(['Option-1', 'Option-3', 'Option-4']);
  protected readonly searchValue = signal('');
  protected readonly activeNotification = signal<string | null>(null);

  protected readonly navMenuItems: NavItem[] = [
    { id: 'Inbox', label: 'Inbox', badge: '24', icon: 'mail-inbox' },
    { id: 'Outbox', label: 'Outbox', icon: 'send' },
    { id: 'Favorites', label: 'Favorites', icon: 'heart' },
    { id: 'Trash', label: 'Trash', icon: 'delete' },
  ];
  protected readonly labelItems: NavItem[] = [
    { id: 'Label1', label: 'Label', icon: 'folder' },
    { id: 'Label2', label: 'Label', icon: 'folder' },
    { id: 'Label3', label: 'Label', icon: 'folder' },
  ];
  protected readonly overflowItems: OverflowItem[] = [
    { id: 'Option-1', label: 'Option' },
    { id: 'divider-1', isDivider: true },
    { id: 'Option-2', label: 'Option' },
    { id: 'Option-3', label: 'Option' },
    { id: 'Option-4', label: 'Option' },
    { id: 'Option-5', label: 'Option' },
    { id: 'divider-2', isDivider: true },
    { id: 'Option-6', label: 'Option' },
  ];

  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected toggleOption(id: string): void {
    this.selectedOptions.update((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  protected dismissMenus(): void {
    this.navMenuOpen.set(false);
    this.overflowMenuOpen.set(false);
  }

  protected notify(message: string): void {
    this.activeNotification.set(message);
  }

  protected onSearchInput(event: Event): void {
    this.searchValue.set((event.target as HTMLInputElement).value);
  }

  protected handleSearchSubmit(event: Event): void {
    event.preventDefault();
    const value = this.searchValue();
    if (!value.trim()) return;
    this.activeNotification.set(`Searched: "${value}"`);
    this.searchSubmit.emit(value);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.activeNotification.set(null), 3000);
  }
}
