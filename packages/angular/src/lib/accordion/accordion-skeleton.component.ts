import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { AccordionAlign } from './accordion-context';

/** WorkBench AccordionSkeleton — mirrors packages/ui/src/components/Accordion/AccordionSkeleton.jsx. */
@Component({
  selector: 'kpmg-accordion-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <ul [class]="classes()" aria-busy="true" aria-label="Loading">
      @for (i of indexes(); track i) {
        <li [class]="itemClasses(i)">
          <div class="kpmg-accordion__heading">
            <svg class="kpmg-accordion__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M3.64645 5.64645C3.84171 5.45118 4.15829 5.45118 4.35355 5.64645L8 9.29289L11.6464 5.64645C11.8417 5.45118 12.1583 5.45118 12.3536 5.64645C12.5488 5.84171 12.5488 6.15829 12.3536 6.35355L8.35355 10.3536C8.15829 10.5488 7.84171 10.5488 7.64645 10.3536L3.64645 6.35355C3.45118 6.15829 3.45118 5.84171 3.64645 5.64645Z" fill="currentColor" />
            </svg>
            <span class="kpmg-accordion__title"><span class="kpmg-accordion__skeleton-bar kpmg-accordion__skeleton-bar--title"></span></span>
          </div>
          @if (open() && i === 0) {
            <div class="kpmg-accordion__content">
              <span class="kpmg-accordion__skeleton-bar kpmg-accordion__skeleton-bar--lg"></span>
              <span class="kpmg-accordion__skeleton-bar kpmg-accordion__skeleton-bar--md"></span>
              <span class="kpmg-accordion__skeleton-bar kpmg-accordion__skeleton-bar--sm"></span>
            </div>
          }
        </li>
      }
    </ul>
  `,
})
export class AccordionSkeletonComponent {
  /** Number of skeleton headings. */
  readonly count = input(4, { transform: numberAttribute });
  /** Show the first skeleton item expanded. */
  readonly open = input(true, { transform: booleanAttribute });
  readonly align = input<AccordionAlign>('end');
  readonly isFlush = input(false, { transform: booleanAttribute });
  readonly className = input('');

  protected readonly indexes = computed(() => Array.from({ length: this.count() }, (_, i) => i));

  protected readonly classes = computed(() =>
    [
      'kpmg-accordion',
      'kpmg-accordion--skeleton',
      `kpmg-accordion--align-${this.align()}`,
      'kpmg-accordion--md',
      this.isFlush() ? 'kpmg-accordion--flush' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected itemClasses(index: number): string {
    return `kpmg-accordion__item kpmg-accordion__item--skeleton${this.open() && index === 0 ? ' kpmg-accordion__item--active' : ''}`;
  }
}
