import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AppBarChipClick } from './app-bar-nested.component';
import { AppBarSearchPillComponent, AppBarSearchSubmit, AppBarSpecialCardComponent } from './app-bar-search-pill.component';

export type AppBarSpecialSize = 'extra-small' | 'small' | 'large';

export interface AppBarSpecialCardConfig {
  id?: string | number;
  header?: string;
  supportingText?: string | null;
  supportingTextSecondary?: string | null;
  progress?: number;
  isChecked?: boolean;
}

const DEFAULT_CARDS: AppBarSpecialCardConfig[] = [1, 2, 3, 4].map((n) => ({
  id: String(n),
  header: 'Header',
  supportingText: 'Supporting line text',
  supportingTextSecondary: 'Supporting line text',
  progress: 31,
  isChecked: true,
}));

/**
 * AppBarSpecial — mirrors `AppBarSpecial` in AppBars.jsx (extra-small 64px, small 88px, large hero with/without search).
 *
 * Deviations: `rightSlot` is a TemplateRef. React `children` (replaces the default card row, large size)
 * is projected via `<ng-content />`; set `hasContent` to use it instead of `cards`. Callbacks are outputs
 * (`searchChange` string, `searchSubmit`, `attachClick`, `micClick`, `sendClick`, `chipClick`).
 * `withSearch` accepts boolean or the Figma strings ('Default' | 'True' | 'False'). `ref`/`...props` are omitted.
 */
@Component({
  selector: 'kpmg-app-bar-special',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, AppBarSearchPillComponent, AppBarSpecialCardComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      @if (!isLarge()) {
        <div class="kpmg-appbar-special__row">
          <div class="kpmg-appbar-special__left">
            <span class="kpmg-appbar-special__greeting">{{ greeting() }}</span>
          </div>

          <div class="kpmg-appbar-special__right">
            @if (hasSearch()) {
              <kpmg-app-bar-search-pill
                size="small"
                [value]="searchValue()"
                [placeholder]="effectivePlaceholder()"
                (valueChange)="searchChange.emit($event)"
                (searchSubmit)="searchSubmit.emit($event)"
                (attachClick)="attachClick.emit($event)"
                (micClick)="micClick.emit($event)"
                (sendClick)="sendClick.emit($event)"
              />
            }
            @if (rightSlot(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            }
          </div>
        </div>
      } @else {
        <div class="kpmg-appbar-special__hero">
          <div class="kpmg-appbar-special__greeting-row">
            <span class="kpmg-appbar-special__greeting">{{ greeting() }}</span>
          </div>

          <h1 class="kpmg-appbar-special__welcome-title">{{ welcomeHeader() }}</h1>

          @if (filterChips() && filterChips().length > 0) {
            <div class="kpmg-appbar-special__chips" role="tablist">
              @for (chip of filterChips(); track $index) {
                <button
                  type="button"
                  role="tab"
                  [attr.aria-selected]="selectedChip() === $index"
                  [class]="'kpmg-appbar-special-chip ' + (selectedChip() === $index ? 'kpmg-appbar-special-chip--active' : '')"
                  (click)="handleChipClick($index, chip)"
                >{{ chip }}</button>
              }
            </div>
          }

          @if (hasContent()) {
            <ng-content />
          } @else {
            <div class="kpmg-appbar-special__cards-row">
              @for (card of resolvedCards(); track card.id ?? $index) {
                <kpmg-app-bar-special-card
                  [header]="card.header ?? 'Header'"
                  [supportingText]="card.supportingText === undefined ? 'Supporting line text' : card.supportingText"
                  [supportingTextSecondary]="card.supportingTextSecondary === undefined ? 'Supporting line text' : card.supportingTextSecondary"
                  [progress]="card.progress ?? 31"
                  [isChecked]="card.isChecked ?? true"
                />
              }
            </div>
          }

          @if (hasSearch()) {
            <kpmg-app-bar-search-pill
              size="large"
              [floating]="true"
              [value]="searchValue()"
              [placeholder]="effectivePlaceholder()"
              (valueChange)="searchChange.emit($event)"
              (searchSubmit)="searchSubmit.emit($event)"
              (attachClick)="attachClick.emit($event)"
              (micClick)="micClick.emit($event)"
              (sendClick)="sendClick.emit($event)"
            />
          }
        </div>
      }
    </div>
  `,
})
export class AppBarSpecialComponent {
  readonly size = input<AppBarSpecialSize>('small');
  readonly withSearch = input<boolean | string>(true);
  readonly greeting = input('Greeting, name');
  readonly welcomeHeader = input('Welcome');
  readonly searchValue = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly searchPlaceholder = input('Ask me anything');
  readonly filterChips = input<string[]>(['Project tag', 'Project tag', 'Project tag']);
  readonly activeChip = input(0);
  readonly cards = input<AppBarSpecialCardConfig[] | undefined>(undefined);
  readonly rightSlot = input<TemplateRef<unknown> | null>(null);
  /** Project `<ng-content />` in place of the default card row (large size). */
  readonly hasContent = input(false, { transform: booleanAttribute });
  readonly className = input('');

  readonly searchChange = output<string>();
  readonly searchSubmit = output<AppBarSearchSubmit>();
  readonly attachClick = output<MouseEvent>();
  readonly micClick = output<MouseEvent>();
  readonly sendClick = output<AppBarSearchSubmit>();
  readonly chipClick = output<AppBarChipClick>();

  protected readonly selectedChip = linkedSignal(() => this.activeChip());
  protected readonly isLarge = computed(() => this.size() === 'large');
  protected readonly effectivePlaceholder = computed(() => this.placeholder() || this.searchPlaceholder());
  protected readonly resolvedCards = computed(() => this.cards() || DEFAULT_CARDS);

  protected readonly hasSearch = computed(() => {
    const w = this.withSearch();
    return this.isLarge() ? w === true || w === 'True' || w === 'default' || w === 'Default' : w !== false && w !== 'False';
  });

  protected readonly classes = computed(
    () =>
      `kpmg-appbar kpmg-appbar-special kpmg-appbar-special--${this.size()} ${this.hasSearch() ? 'kpmg-appbar-special--with-search' : 'kpmg-appbar-special--no-search'} ${this.className()}`,
  );

  protected handleChipClick(index: number, chip: string): void {
    this.selectedChip.set(index);
    this.chipClick.emit({ index, chip });
  }
}
