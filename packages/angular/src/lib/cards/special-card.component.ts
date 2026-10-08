import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output, signal } from '@angular/core';
import { CardToggleEvent } from './card-events';
import {
  HorizontalCardCheckmarkIconComponent,
  HorizontalCardChevronDownIconComponent,
  SpecialCardCloseIconComponent,
  SpecialCardCopyIconComponent,
  SpecialCardExternalLinkIconComponent,
  SpecialCardInfoIconComponent,
  SpecialCardSparkleIconComponent,
} from './cards-icons.component';

export type SpecialCardType = 'Slider' | 'Chips' | 'References' | 'Code' | 'Loading' | 'Rich';
export type SpecialCardStyle = 'Outline' | 'Outlined' | 'Elevated' | 'Filled';
export type SpecialCardChipsType = 'Filter' | 'Assistive' | 'Input';
export type SpecialCardCodeSize = 'Small' | 'Large';
export type SpecialCardLoadingSize = 'Small' | 'Medium' | 'Large';
export type SpecialCardMode = 'Light' | 'Dark';

export interface SpecialCardReference {
  title: string;
  source?: string;
  url?: string;
}

export interface SpecialCardNestedSlider {
  title: string;
  description?: string;
  value: number;
}

export interface SpecialCardSliderChange {
  event: Event;
  value: number;
}

/** React: `onChipClick(e, chip, selected, idx)`. */
export interface SpecialCardChipClick {
  event: MouseEvent;
  chip: string;
  selected: boolean;
  index: number;
}

/** React: `onRemoveChip(e, chip, idx)`. */
export interface SpecialCardChipRemove {
  event: MouseEvent;
  chip: string;
  index: number;
}

/** React: `onReferenceClick(e, ref, idx)`. */
export interface SpecialCardReferenceClick {
  event: MouseEvent;
  reference: SpecialCardReference;
  index: number;
}

/** React: `onCopyCode(e, code)`. */
export interface SpecialCardCopyCode {
  event: MouseEvent;
  code: string;
}

const DEFAULT_CHIPS = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer', 'Aerospace'];
const DEFAULT_REFERENCES: SpecialCardReference[] = [
  { title: 'Global Fiscal Reporting Standards 2026', source: 'KPMG Advisory', url: '#' },
  { title: 'Enterprise AI Governance Framework', source: 'Regulatory Council', url: '#' },
  { title: 'Cloud Infrastructure Economics Analysis', source: 'Tech Insights', url: '#' },
  { title: 'ESG Disclosure Alignment Benchmarks', source: 'Sustainability Forum', url: '#' },
];
const DEFAULT_NESTED_SLIDERS: SpecialCardNestedSlider[] = [
  { title: 'Temperature', description: 'Randomness & Creativity', value: 70 },
  { title: 'Top-P', description: 'Nucleus sampling threshold', value: 85 },
  { title: 'Penalty', description: 'Frequency penalty coefficient', value: 20 },
];
const DEFAULT_CODE = `// Calculate risk variance\nconst variance = calculateMetrics(auditData);\nconsole.log('Result:', variance);`;

/**
 * WorkBench SpecialCard (alias `SpecialCards`) — mirrors packages/ui/src/components/Cards/Cards.jsx
 * (6 Figma variants: Slider, Chips, References, Code, Loading, Rich).
 *
 * Deviations: `onClick` presence is not detectable, so set `clickable` and listen to `cardClick`;
 * `onReferenceClick` presence decides whether the link is intercepted (preventDefault) in React, so set
 * `interceptReferenceClick` when handling `referenceClick`; controlled values (`sliderValue`, `selectedChips`,
 * `isOpen`) are two-way models (leave `undefined` for uncontrolled, seeded by `defaultSliderValue` /
 * `defaultSelectedChips` / `defaultOpen`); React `on*` callbacks are outputs without the `on` prefix
 * (`headerActionClick`, `sliderChange`, `chipClick`, `removeChip`, `referenceClick`, `copyCode`, `toggleOpen`),
 * each emitting an object that includes the DOM `event`.
 */
@Component({
  selector: 'kpmg-special-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HorizontalCardCheckmarkIconComponent,
    HorizontalCardChevronDownIconComponent,
    SpecialCardCloseIconComponent,
    SpecialCardCopyIconComponent,
    SpecialCardExternalLinkIconComponent,
    SpecialCardInfoIconComponent,
    SpecialCardSparkleIconComponent,
  ],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" (click)="cardClick.emit($event)">
      @if (hasHeader() && type() !== 'Loading') {
        <header class="special-card__header">
          <div class="special-card__header-text">
            <div class="special-card__title-row">
              <h4 class="special-card__title">{{ effectiveTitle() }}</h4>
              @if (withTooltip()) {
                <span class="special-card__tooltip-wrapper" [attr.title]="tooltipText()" [attr.aria-label]="tooltipText()">
                  <kpmg-special-card-info-icon [size]="18" />
                </span>
              }
            </div>
            @if (effectiveDescription()) {
              <p class="special-card__description">{{ effectiveDescription() }}</p>
            }
          </div>

          @if (headerActionText()) {
            <button type="button" class="special-card__header-action" (click)="onHeaderAction($event)">{{ headerActionText() }}</button>
          }

          @if (type() === 'Rich') {
            <button
              type="button"
              class="special-card__accordion-toggle"
              (click)="onToggleOpen($event)"
              [attr.aria-label]="open() ? 'Collapse parameters' : 'Expand parameters'"
            >
              <kpmg-horizontal-card-chevron-down-icon
                [size]="20"
                [className]="'special-card__accordion-chevron ' + (open() ? 'special-card__accordion-chevron--open' : '')"
              />
            </button>
          }
        </header>
        <hr class="special-card__divider" />
      }

      @switch (type()) {
        @case ('Slider') {
          <div class="special-card__slider-container">
            <div class="special-card__slider-track-wrap">
              <input
                type="range"
                [attr.min]="min()"
                [attr.max]="max()"
                [attr.step]="step()"
                [value]="currentSliderVal()"
                (input)="onSliderInput($event)"
                class="special-card__range-input"
                [attr.aria-label]="effectiveTitle()"
              />
              <div class="special-card__slider-track">
                <div class="special-card__slider-fill" [style.width.%]="sliderPercentage()"></div>
                <div class="special-card__slider-thumb" [style.left.%]="sliderPercentage()">
                  @if (showSliderIndicator()) {
                    <div class="special-card__slider-indicator">{{ currentSliderVal() }}</div>
                  }
                </div>
              </div>
            </div>
            <div class="special-card__slider-labels">
              <span>{{ min() }}</span>
              <span class="special-card__slider-current-label">{{ sliderLabel() }}: {{ currentSliderVal() }}</span>
              <span>{{ max() }}</span>
            </div>
          </div>
        }

        @case ('Chips') {
          <div class="special-card__chips-grid">
            @for (chip of chipList(); track $index) {
              <button
                type="button"
                [class]="'special-card__chip special-card__chip--' + chipsType().toLowerCase() + ' ' + (isSelected(chip) ? 'special-card__chip--selected' : '')"
                (click)="onChipClick($event, chip, $index)"
              >
                @if (chipsType() === 'Filter' && isSelected(chip)) {
                  <kpmg-horizontal-card-checkmark-icon [size]="14" color="#ffffff" className="special-card__chip-icon" />
                }
                @if (chipsType() === 'Assistive') {
                  <span class="special-card__chip-assistive-dot"></span>
                }
                <span class="special-card__chip-label">{{ chip }}</span>
                @if (chipsType() === 'Input') {
                  <span class="special-card__chip-dismiss" (click)="onRemoveChip($event, chip, $index)" [attr.aria-label]="'Remove ' + chip">
                    <kpmg-special-card-close-icon [size]="12" />
                  </span>
                }
              </button>
            }
          </div>
        }

        @case ('References') {
          <div class="special-card__references-list">
            @for (refItem of references(); track $index) {
              @if ($index > 0) {
                <hr class="special-card__divider special-card__divider--item" />
              }
              <a
                [attr.href]="refItem.url || '#'"
                class="special-card__reference-item"
                (click)="onReferenceClick($event, refItem, $index)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="special-card__reference-left">
                  <span class="special-card__reference-badge">[{{ $index + 1 }}]</span>
                  <span class="special-card__reference-title">{{ refItem.title }}</span>
                </div>
                <div class="special-card__reference-right">
                  <span class="special-card__reference-source">{{ refItem.source }}</span>
                  <kpmg-special-card-external-link-icon [size]="14" className="special-card__reference-icon" />
                </div>
              </a>
            }
          </div>
        }

        @case ('Code') {
          <div class="special-card__code-container">
            <div class="special-card__code-header">
              <span class="special-card__code-lang">{{ language() }}</span>
              <button type="button" class="special-card__copy-btn" (click)="onCopyCode($event)" aria-label="Copy code to clipboard">
                @if (copied()) {
                  <kpmg-horizontal-card-checkmark-icon [size]="14" color="#10b981" />
                  <span>Copied!</span>
                } @else {
                  <kpmg-special-card-copy-icon [size]="14" />
                  <span>Copy</span>
                }
              </button>
            </div>
            <pre class="special-card__code-pre"><code>{{ code() }}</code></pre>
          </div>
        }

        @case ('Loading') {
          <div [class]="'special-card__loading-container special-card__loading-container--' + loadingSize().toLowerCase()">
            @switch (loadingSize()) {
              @case ('Small') {
                <div class="special-card__loading-small">
                  <kpmg-special-card-sparkle-icon [size]="20" className="special-card__shimmer-sparkle" />
                  <span class="special-card__loading-text">{{ effectiveLoadingText() }}</span>
                  <div class="special-card__shimmer-line special-card__shimmer-line--flex"></div>
                </div>
              }
              @case ('Medium') {
                <div class="special-card__loading-medium">
                  <kpmg-special-card-sparkle-icon [size]="48" className="special-card__shimmer-sparkle" />
                  <span class="special-card__loading-text">{{ effectiveLoadingText() }}</span>
                  <div class="special-card__shimmer-bar"></div>
                </div>
              }
              @case ('Large') {
                <div class="special-card__loading-large">
                  <div class="special-card__loading-header-row">
                    <kpmg-special-card-sparkle-icon [size]="28" className="special-card__shimmer-sparkle" />
                    <span class="special-card__loading-text">{{ effectiveLoadingText() }}</span>
                  </div>
                  <div class="special-card__skeleton-blocks">
                    <div class="special-card__skeleton-block special-card__skeleton-block--line-lg"></div>
                    <div class="special-card__skeleton-block special-card__skeleton-block--line-md"></div>
                    <div class="special-card__skeleton-block special-card__skeleton-block--line-sm"></div>
                    <div class="special-card__skeleton-block special-card__skeleton-block--card"></div>
                  </div>
                </div>
              }
            }
          </div>
        }

        @case ('Rich') {
          @if (open()) {
            <div class="special-card__rich-body">
              @for (item of nestedSliders(); track $index) {
                <div class="special-card__rich-nested-item">
                  <div class="special-card__rich-nested-header">
                    <span class="special-card__rich-nested-title">{{ item.title }}</span>
                    @if (item.description) {
                      <span class="special-card__rich-nested-subhead">{{ item.description }}</span>
                    }
                  </div>
                  <div class="special-card__slider-track-wrap">
                    <div class="special-card__slider-track">
                      <div class="special-card__slider-fill" [style.width.%]="item.value"></div>
                      <div class="special-card__slider-thumb" [style.left.%]="item.value"></div>
                    </div>
                  </div>
                  <div class="special-card__rich-nested-labels">
                    <span>0</span>
                    <span>{{ item.value }}%</span>
                    <span>100</span>
                  </div>
                </div>
              }
            </div>
          }
        }
      }
    </div>
  `,
})
export class SpecialCardComponent {
  readonly type = input<SpecialCardType>('Slider');
  readonly styleVariant = input<SpecialCardStyle>('Outline');

  readonly hasHeader = input(true, { transform: booleanAttribute });
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly headerActionText = input<string | undefined>(undefined);

  // Slider
  /** Slider value (two-way); leave `undefined` for uncontrolled. */
  readonly sliderValue = model<number | undefined>(undefined);
  readonly defaultSliderValue = input(50);
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(5);
  readonly sliderLabel = input('Value');
  readonly showSliderIndicator = input(true, { transform: booleanAttribute });

  // Chips
  readonly chipsType = input<SpecialCardChipsType>('Filter');
  readonly chips = input<string[]>(DEFAULT_CHIPS);
  /** Selected chips (two-way); leave `undefined` for uncontrolled. */
  readonly selectedChips = model<string[] | undefined>(undefined);
  readonly defaultSelectedChips = input<string[]>(['Technology']);

  // References
  readonly references = input<SpecialCardReference[]>(DEFAULT_REFERENCES);
  /** Prevent default navigation on reference links (React: set when `onReferenceClick` is passed). */
  readonly interceptReferenceClick = input(false, { transform: booleanAttribute });

  // Code
  readonly codeSize = input<SpecialCardCodeSize>('Small');
  readonly code = input(DEFAULT_CODE);
  readonly language = input('TypeScript');

  // Loading
  readonly loadingSize = input<SpecialCardLoadingSize>('Medium');
  readonly mode = input<SpecialCardMode>('Light');
  readonly loadingText = input<string | undefined>(undefined);

  // Rich
  /** Accordion open state (two-way); leave `undefined` for uncontrolled. */
  readonly isOpen = model<boolean | undefined>(undefined);
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly withTooltip = input(false, { transform: booleanAttribute });
  readonly tooltipText = input('Configure discrete parameters across all micro-models simultaneously.');
  readonly nestedSliders = input<SpecialCardNestedSlider[]>(DEFAULT_NESTED_SLIDERS);

  /** Adds `special-card--clickable` (React: inferred from `onClick`). */
  readonly clickable = input(false, { transform: booleanAttribute });
  readonly className = input('');

  readonly cardClick = output<MouseEvent>();
  readonly headerActionClick = output<MouseEvent>();
  readonly sliderChange = output<SpecialCardSliderChange>();
  readonly chipClick = output<SpecialCardChipClick>();
  readonly removeChip = output<SpecialCardChipRemove>();
  readonly referenceClick = output<SpecialCardReferenceClick>();
  readonly copyCode = output<SpecialCardCopyCode>();
  readonly toggleOpen = output<CardToggleEvent>();

  private readonly internalSliderVal = linkedSignal(() => this.sliderValue() ?? this.defaultSliderValue());
  protected readonly currentSliderVal = computed(() => this.internalSliderVal());

  private readonly internalSelectedChips = linkedSignal(() => this.selectedChips() ?? this.defaultSelectedChips());
  protected readonly selectedChipsList = computed(() => this.internalSelectedChips());
  /** Local copy of the chips list so Input chips can be dismissed. */
  protected readonly chipList = linkedSignal(() => this.chips());

  private readonly internalOpen = linkedSignal(() => this.isOpen() ?? this.defaultOpen());
  protected readonly open = computed(() => this.internalOpen());

  protected readonly copied = signal(false);

  protected readonly sliderPercentage = computed(() =>
    Math.min(100, Math.max(0, ((this.currentSliderVal() - this.min()) / (this.max() - this.min() || 1)) * 100)),
  );

  protected readonly effectiveTitle = computed(() => {
    const title = this.title();
    if (title !== undefined) return title;
    switch (this.type()) {
      case 'Slider':
        return 'Model Creativity (Temperature)';
      case 'Chips':
        return 'Filter By Category';
      case 'References':
        return 'Cited References';
      case 'Code':
        return 'Source Implementation';
      case 'Rich':
        return 'Model Hyperparameters';
      default:
        return 'Special Card';
    }
  });

  protected readonly effectiveDescription = computed(() => {
    const description = this.description();
    if (description !== undefined) return description;
    switch (this.type()) {
      case 'Slider':
        return 'Fine-tune deterministic versus creative generation';
      case 'Chips':
        return 'Select one or multiple classification tags';
      case 'Code':
        return 'Production code sample with syntax formatting';
      case 'Rich':
        return 'Advanced generation parameters';
      default:
        return '';
    }
  });

  protected readonly effectiveLoadingText = computed(() => {
    const text = this.loadingText();
    if (text !== undefined) return text;
    const size = this.loadingSize();
    return size === 'Small'
      ? 'Generating response...'
      : size === 'Medium'
        ? 'AI assistant is analyzing request...'
        : 'Synthesizing document insights and models...';
  });

  protected readonly classes = computed(() => {
    const style = this.styleVariant().toLowerCase();
    let sizeModifier = '';
    if (this.type() === 'Code') sizeModifier = `special-card--code-${this.codeSize().toLowerCase()}`;
    if (this.type() === 'Loading')
      sizeModifier = `special-card--loading-${this.loadingSize().toLowerCase()} special-card--mode-${this.mode().toLowerCase()}`;
    if (this.type() === 'Rich') sizeModifier = this.open() ? 'special-card--rich-open' : 'special-card--rich-closed';
    return [
      'special-card',
      `special-card--type-${this.type().toLowerCase()}`,
      `special-card--style-${style === 'outlined' ? 'outline' : style}`,
      sizeModifier,
      this.clickable() ? 'special-card--clickable' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected isSelected(chip: string): boolean {
    return this.selectedChipsList().includes(chip);
  }

  protected onHeaderAction(e: MouseEvent): void {
    e.stopPropagation();
    this.headerActionClick.emit(e);
  }

  protected onSliderInput(e: Event): void {
    const val = Number((e.target as HTMLInputElement).value);
    this.internalSliderVal.set(val);
    this.sliderValue.set(val);
    this.sliderChange.emit({ event: e, value: val });
  }

  protected onChipClick(e: MouseEvent, chip: string, index: number): void {
    e.stopPropagation();
    if (this.chipsType() === 'Filter') {
      const list = this.selectedChipsList();
      const wasSelected = list.includes(chip);
      const next = wasSelected ? list.filter((c) => c !== chip) : [...list, chip];
      this.internalSelectedChips.set(next);
      this.selectedChips.set(next);
      this.chipClick.emit({ event: e, chip, selected: !wasSelected, index });
    } else {
      this.chipClick.emit({ event: e, chip, selected: true, index });
    }
  }

  protected onRemoveChip(e: MouseEvent, chip: string, index: number): void {
    e.stopPropagation();
    this.chipList.set(this.chipList().filter((_, i) => i !== index));
    this.removeChip.emit({ event: e, chip, index });
  }

  protected onReferenceClick(e: MouseEvent, reference: SpecialCardReference, index: number): void {
    if (this.interceptReferenceClick()) {
      e.preventDefault();
      this.referenceClick.emit({ event: e, reference, index });
    }
  }

  protected onCopyCode(e: MouseEvent): void {
    e.stopPropagation();
    const code = this.code();
    if (typeof navigator !== 'undefined' && navigator.clipboard && code) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          this.copied.set(true);
          setTimeout(() => this.copied.set(false), 2000);
        })
        .catch(() => {});
    }
    this.copyCode.emit({ event: e, code });
  }

  protected onToggleOpen(e: MouseEvent): void {
    e.stopPropagation();
    const next = !this.open();
    this.internalOpen.set(next);
    this.isOpen.set(next);
    this.toggleOpen.emit({ event: e, value: next });
  }
}

/** Alias matching the React `SpecialCards` export. */
export { SpecialCardComponent as SpecialCardsComponent };
