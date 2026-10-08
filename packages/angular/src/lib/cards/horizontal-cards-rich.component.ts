import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CardToggleEvent } from './card-events';
import { HorizontalCardChevronDownIconComponent } from './cards-icons.component';
import {
  HORIZONTAL_CARD_DEFAULTS,
  HorizontalCardComponent,
  HorizontalCardItem,
  HorizontalCardStyle,
  ResolvedHorizontalCardItem,
} from './horizontal-card.component';

export type HorizontalCardsRichType = 'Default' | 'List' | 'Attachment';
export type HorizontalCardsRichStyle = 'Outlined' | 'Elevated' | 'Filled';

const SUPPORTING = 'Supporting line text Lorem ipsum dolor sit amet, consectetuer';

const DEFAULT_RICH_ITEMS_G1: HorizontalCardItem[] = [
  { id: 'g1-1', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
  { id: 'g1-2', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
];

const DEFAULT_RICH_ITEMS_G2: HorizontalCardItem[] = [
  { id: 'g2-1', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
  { id: 'g2-2', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
];

const DEFAULT_RICH_ITEMS_LIST: HorizontalCardItem[] = [
  { id: 'list-1', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
  { id: 'list-2', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
  { id: 'list-3', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
  { id: 'list-4', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
  { id: 'list-5', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
];

const DEFAULT_RICH_ITEMS_ATTACHMENT: HorizontalCardItem[] = [
  { id: 'att-1', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
  { id: 'att-2', size: 'Medium', type: 'Image and arrow icon', styleVariant: 'Outlined', title: 'Header', supportingText: SUPPORTING },
];

/**
 * WorkBench HorizontalCardsRich — mirrors packages/ui/src/components/Cards/Cards.jsx (`HorizontalCardsRich`, 9 Figma variants).
 *
 * Deviations: section open state uses `open1`/`open2` models (two-way) with `defaultOpen1/2`;
 * `onToggle1/2(next)` are the `toggle1`/`toggle2` outputs and `onSectionAction1/2(e, next)`
 * the `sectionAction1`/`sectionAction2` outputs. React `children` (which replaces the
 * List/Attachment item stack) is projected via `<ng-content>` and requires `custom` to be set.
 */
@Component({
  selector: 'kpmg-horizontal-cards-rich',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, HorizontalCardComponent, HorizontalCardChevronDownIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      @if (type() === 'Attachment') {
        <div class="horizontal-cards-rich__body">
          <ng-container [ngTemplateOutlet]="sectionHeader" [ngTemplateOutletContext]="{ title: sectionTitle1(), open: isSection1Open(), idx: 1 }" />
          @if (isSection1Open()) {
            <div class="horizontal-cards-rich__cards-stack">
              @if (custom()) {
                <ng-container [ngTemplateOutlet]="projected" />
              } @else {
                @for (card of attachment(); track $index) {
                  <ng-container [ngTemplateOutlet]="cardTpl" [ngTemplateOutletContext]="{ $implicit: card }" />
                }
              }
            </div>
          }
        </div>
      } @else if (type() === 'List') {
        <div class="horizontal-cards-rich__body">
          <ng-container [ngTemplateOutlet]="headerTpl" />
          <hr class="horizontal-cards-rich__divider" />
          <ng-container [ngTemplateOutlet]="sectionHeader" [ngTemplateOutletContext]="{ title: sectionTitle1(), open: isSection1Open(), idx: 1 }" />
          @if (isSection1Open()) {
            <div class="horizontal-cards-rich__cards-stack">
              @if (custom()) {
                <ng-container [ngTemplateOutlet]="projected" />
              } @else {
                @for (card of list(); track $index) {
                  <ng-container [ngTemplateOutlet]="cardTpl" [ngTemplateOutletContext]="{ $implicit: card }" />
                }
              }
            </div>
          }
        </div>
      } @else {
        <div class="horizontal-cards-rich__body">
          <ng-container [ngTemplateOutlet]="headerTpl" />
          <hr class="horizontal-cards-rich__divider" />

          <ng-container [ngTemplateOutlet]="sectionHeader" [ngTemplateOutletContext]="{ title: sectionTitle1(), open: isSection1Open(), idx: 1 }" />
          @if (isSection1Open()) {
            <div class="horizontal-cards-rich__cards-stack">
              @for (card of group1(); track $index) {
                <ng-container [ngTemplateOutlet]="cardTpl" [ngTemplateOutletContext]="{ $implicit: card }" />
              }
            </div>
          }

          <hr class="horizontal-cards-rich__divider" />

          <ng-container [ngTemplateOutlet]="sectionHeader" [ngTemplateOutletContext]="{ title: sectionTitle2(), open: isSection2Open(), idx: 2 }" />
          @if (isSection2Open()) {
            <div class="horizontal-cards-rich__cards-stack">
              @for (card of group2(); track $index) {
                <ng-container [ngTemplateOutlet]="cardTpl" [ngTemplateOutletContext]="{ $implicit: card }" />
              }
            </div>
          }
        </div>
      }
    </div>

    <ng-template #projected><ng-content /></ng-template>

    <ng-template #headerTpl>
      <header class="horizontal-cards-rich__header">
        <h3 class="horizontal-cards-rich__title">{{ title() }}</h3>
        @if (subhead()) {
          <p class="horizontal-cards-rich__subhead">{{ subhead() }}</p>
        }
      </header>
    </ng-template>

    <ng-template #sectionHeader let-title="title" let-open="open" let-idx="idx">
      <div
        [class]="'horizontal-cards-rich__section-header ' + (!open ? 'horizontal-cards-rich__section-header--collapsed' : '')"
        role="button"
        tabindex="0"
        [attr.aria-expanded]="open"
        (click)="toggleSection(idx, $event)"
        (keydown)="onSectionKeydown(idx, $event)"
      >
        <span class="horizontal-cards-rich__section-title">{{ title }}</span>
        <button
          type="button"
          [class]="'horizontal-cards-rich__section-btn ' + (!open ? 'horizontal-cards-rich__section-btn--collapsed' : '')"
          (click)="toggleSection(idx, $event)"
          [attr.aria-label]="title + ' toggle'"
          [attr.aria-expanded]="open"
          tabindex="-1"
        >
          <kpmg-horizontal-card-chevron-down-icon [size]="20" />
        </button>
      </div>
    </ng-template>

    <ng-template #cardTpl let-c>
      <kpmg-horizontal-card
        [size]="c.size"
        [type]="c.type"
        [styleVariant]="c.styleVariant"
        [title]="c.title"
        [supportingText]="c.supportingText"
        [bodyText]="c.bodyText"
        [imageSrc]="c.imageSrc"
        [imageAlt]="c.imageAlt"
        [hasImage]="c.hasImage"
        [checked]="c.checked"
        [checkVariant]="c.checkVariant"
        [checkState]="c.checkState"
        [checkboxShape]="c.checkboxShape"
        [checkColor]="c.checkColor"
        [tickColor]="c.tickColor"
        [showChip]="c.showChip"
        [statusChip]="c.statusChip"
        [statusText1]="c.statusText1"
        [statusText2]="c.statusText2"
        [progress]="c.progress"
        [hasProgress]="c.hasProgress"
        [progressColor]="c.progressColor"
      />
    </ng-template>
  `,
})
export class HorizontalCardsRichComponent {
  readonly type = input<HorizontalCardsRichType>('Default');
  readonly styleVariant = input<HorizontalCardsRichStyle>('Outlined');
  readonly title = input('Header');
  readonly subhead = input('Supporting line text Lorem ipsum dolor sit amet, consectetuer adipiscing elit');
  readonly sectionTitle1 = input('Title');
  readonly sectionTitle2 = input('Title');
  readonly defaultOpen1 = input(true, { transform: booleanAttribute });
  readonly defaultOpen2 = input(true, { transform: booleanAttribute });
  /** Controlled/two-way open state of section 1 (leave `undefined` for uncontrolled). */
  readonly open1 = model<boolean | undefined>(undefined);
  readonly open2 = model<boolean | undefined>(undefined);
  readonly itemsGroup1 = input<HorizontalCardItem[] | undefined>(undefined);
  readonly itemsGroup2 = input<HorizontalCardItem[] | undefined>(undefined);
  readonly listItems = input<HorizontalCardItem[] | undefined>(undefined);
  readonly attachmentItems = input<HorizontalCardItem[] | undefined>(undefined);
  /** Set when projecting custom cards into the List/Attachment stack (React: `children`). */
  readonly custom = input(false, { transform: booleanAttribute });
  readonly className = input('');

  /** React: `onToggle1(next)`. */
  readonly toggle1 = output<boolean>();
  /** React: `onToggle2(next)`. */
  readonly toggle2 = output<boolean>();
  /** React: `onSectionAction1(e, next)`. */
  readonly sectionAction1 = output<CardToggleEvent>();
  /** React: `onSectionAction2(e, next)`. */
  readonly sectionAction2 = output<CardToggleEvent>();

  private readonly internalOpen1 = linkedSignal(() => this.open1() ?? this.defaultOpen1());
  private readonly internalOpen2 = linkedSignal(() => this.open2() ?? this.defaultOpen2());
  protected readonly isSection1Open = computed(() => this.internalOpen1());
  protected readonly isSection2Open = computed(() => this.internalOpen2());

  protected readonly classes = computed(() =>
    [
      'horizontal-cards-rich',
      `horizontal-cards-rich--type-${this.type().toLowerCase()}`,
      `horizontal-cards-rich--style-${this.styleVariant().toLowerCase()}`,
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  private resolve(card: HorizontalCardItem): ResolvedHorizontalCardItem {
    const style: HorizontalCardStyle =
      this.styleVariant() === 'Filled' ? 'Outlined' : card.styleVariant || (this.styleVariant() as HorizontalCardStyle);
    const merged = { ...HORIZONTAL_CARD_DEFAULTS, ...stripUndefined(card), styleVariant: style };
    return merged as unknown as ResolvedHorizontalCardItem;
  }

  protected readonly group1 = computed(() => (this.itemsGroup1() || DEFAULT_RICH_ITEMS_G1).map((c) => this.resolve(c)));
  protected readonly group2 = computed(() => (this.itemsGroup2() || DEFAULT_RICH_ITEMS_G2).map((c) => this.resolve(c)));
  protected readonly list = computed(() => (this.listItems() || DEFAULT_RICH_ITEMS_LIST).map((c) => this.resolve(c)));
  protected readonly attachment = computed(() => (this.attachmentItems() || DEFAULT_RICH_ITEMS_ATTACHMENT).map((c) => this.resolve(c)));

  protected toggleSection(idx: number, e: Event): void {
    e.stopPropagation();
    if (idx === 1) {
      const next = !this.isSection1Open();
      this.internalOpen1.set(next);
      this.open1.set(next);
      this.sectionAction1.emit({ event: e, value: next });
      this.toggle1.emit(next);
    } else {
      const next = !this.isSection2Open();
      this.internalOpen2.set(next);
      this.open2.set(next);
      this.sectionAction2.emit({ event: e, value: next });
      this.toggle2.emit(next);
    }
  }

  protected onSectionKeydown(idx: number, e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggleSection(idx, e);
    }
  }
}

function stripUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;
}
