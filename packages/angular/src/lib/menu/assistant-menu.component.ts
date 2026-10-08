import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output, signal, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AssistantCardComponent } from './assistant-card.component';
import { MenuComponent } from './menu.component';
import { MenuIconComponent } from './menu-icon.component';
import { AssistantSection, MenuPlacement, MenuTriggerContext } from './menu.types';

export const DEFAULT_ASSISTANT_SECTIONS: AssistantSection[] = [
  {
    title: 'Title',
    cards: [
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
    ],
  },
  {
    title: 'Title',
    cards: [
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
      { title: 'Header', subtitle: 'Supporting line text lorem ipsu...' },
    ],
  },
];

/**
 * WorkBench AssistantMenu — mirrors `AssistantMenu` in Menu.jsx: KPMG Trusted
 * AI menu with prompt bar, assistant cards, verification line and CTA, opened
 * from a robot-icon trigger (left or right aligned).
 *
 * Deviations: `children` → projected content, which replaces the `sections`
 * cards (prompt bar, verification line and CTA remain). `customTrigger` is a
 * `TemplateRef` receiving `{ open, toggle }`. `onClose` → `closed`,
 * `onCtaClick` → `ctaClick`, `onSearchSubmit` → `searchSubmit` (query string).
 * `open` is two-way bindable; `defaultOpen` seeds it.
 */
@Component({
  selector: 'kpmg-assistant-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MenuComponent, MenuIconComponent, AssistantCardComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="anchorClasses()" [style.width]="widthCss()">
      <kpmg-menu
        type="assistant"
        [open]="isOpen()"
        (closed)="onMenuClose()"
        [trigger]="triggerTpl"
        [closeOnSelect]="false"
        [placement]="resolvedPlacement()"
        [width]="width()"
      >
        <form class="kpmg-assistant-menu__search-bar" (submit)="onSearchSubmit($event)">
          <button type="button" class="kpmg-assistant-menu__search-icon-btn" aria-label="Attach file">
            <kpmg-menu-icon name="paperclip" [size]="16" />
          </button>
          <input
            type="text"
            class="kpmg-assistant-menu__search-input"
            [placeholder]="searchPlaceholder()"
            [value]="searchVal()"
            (input)="onSearchInput($event)"
          />
          <div class="kpmg-assistant-menu__search-actions">
            <button type="button" class="kpmg-assistant-menu__search-icon-btn" aria-label="Voice input">
              <kpmg-menu-icon name="mic" [size]="16" />
            </button>
            <button type="submit" class="kpmg-assistant-menu__search-icon-btn" aria-label="Send query">
              <kpmg-menu-icon name="send" [size]="16" />
            </button>
          </div>
        </form>

        @if (verifiedText()) {
          <div class="kpmg-assistant-menu__verification">{{ verifiedText() }}</div>
        }

        <hr class="kpmg-assistant-menu__divider" />

        <ng-content>
          @for (sec of sections(); track $index; let last = $last) {
            <div class="kpmg-assistant-menu__section">
              @if (sec.title) {
                <div class="kpmg-assistant-menu__section-title">{{ sec.title }}</div>
              }
              <div style="display: flex; flex-direction: column; gap: 12px">
                @for (card of sec.cards ?? []; track $index) {
                  <kpmg-assistant-card
                    [title]="card.title ?? 'Header'"
                    [subtitle]="card.subtitle ?? 'Supporting line text lorem ipsu...'"
                    [thumbnail]="card.thumbnail"
                    (cardClick)="card.onClick?.($event)"
                    (actionClick)="card.onActionClick?.($event)"
                  />
                }
              </div>
              @if (!last) {
                <hr class="kpmg-assistant-menu__divider" />
              }
            </div>
          }
        </ng-content>

        @if (ctaLabel()) {
          <div class="kpmg-assistant-menu__footer">
            <button type="button" class="kpmg-assistant-menu__cta-btn" (click)="ctaClick.emit($event)">{{ ctaLabel() }}</button>
          </div>
        }
      </kpmg-menu>
    </div>

    <ng-template #triggerTpl>
      @if (customTrigger(); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="triggerContext()" />
      } @else {
        <button
          type="button"
          [class]="triggerClasses()"
          aria-label="Open Assistant Menu"
          aria-haspopup="menu"
          [attr.aria-expanded]="isOpen()"
          (click)="onTriggerClick($event)"
        >
          <kpmg-menu-icon name="robot" [size]="24" />
        </button>
      }
    </ng-template>
  `,
})
export class AssistantMenuComponent {
  readonly alignment = input<'right' | 'left'>('right');
  /** Overrides the placement derived from `alignment`. */
  readonly placement = input<MenuPlacement | undefined>(undefined);
  readonly searchPlaceholder = input('Ask me anything');
  readonly verifiedText = input('Verified by KPMG Trusted AI');
  readonly ctaLabel = input('Longer action');
  readonly sections = input<AssistantSection[]>(DEFAULT_ASSISTANT_SECTIONS);
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  /** Open state. Two-way bindable: `[(open)]`. */
  readonly open = model<boolean | undefined>(undefined);
  readonly width = input<number | string>(400);
  readonly className = input('');
  readonly customTrigger = input<TemplateRef<MenuTriggerContext> | null>(null);

  readonly closed = output<void>();
  readonly ctaClick = output<MouseEvent>();
  /** Prompt bar submitted; emits the query text. */
  readonly searchSubmit = output<string>();

  protected readonly searchVal = signal('');
  private readonly current = linkedSignal(() => this.open() ?? this.defaultOpen());
  protected readonly isOpen = this.current.asReadonly();

  protected readonly resolvedPlacement = computed<MenuPlacement>(
    () => this.placement() || (this.alignment() === 'left' ? 'bottom-left' : 'bottom-right'),
  );
  protected readonly widthCss = computed(() => {
    const w = this.width();
    return typeof w === 'number' ? `${w}px` : w;
  });
  protected readonly anchorClasses = computed(
    () =>
      `kpmg-assistant-menu-anchor kpmg-assistant-menu-anchor--${this.alignment()} ${this.isOpen() ? 'kpmg-assistant-menu-anchor--open' : ''} ${this.className()}`,
  );
  protected readonly triggerClasses = computed(
    () => `kpmg-menu-assistant-trigger ${this.isOpen() ? 'kpmg-menu-assistant-trigger--open' : ''}`,
  );
  protected readonly triggerContext = computed<MenuTriggerContext>(() => ({
    open: this.isOpen(),
    toggle: () => this.toggle(),
  }));

  private setOpen(next: boolean): void {
    this.current.set(next);
    this.open.set(next);
  }

  protected toggle(): void {
    const next = !this.isOpen();
    this.setOpen(next);
    if (!next) this.closed.emit();
  }

  protected onTriggerClick(event: Event): void {
    event.stopPropagation();
    this.toggle();
  }

  protected onMenuClose(): void {
    this.setOpen(false);
    this.closed.emit();
  }

  protected onSearchInput(event: Event): void {
    this.searchVal.set((event.target as HTMLInputElement).value);
  }

  protected onSearchSubmit(event: Event): void {
    event.preventDefault();
    this.searchSubmit.emit(this.searchVal());
  }
}
