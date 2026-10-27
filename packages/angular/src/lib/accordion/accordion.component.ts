import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, input } from '@angular/core';
import { ACCORDION_CONTEXT, AccordionAlign, AccordionContext, AccordionSize } from './accordion-context';

/**
 * WorkBench Accordion — mirrors packages/ui/src/components/Accordion/Accordion.jsx.
 * Place `<kpmg-accordion-item>` elements inside it.
 */
@Component({
  selector: 'kpmg-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ACCORDION_CONTEXT, useExisting: forwardRef(() => AccordionComponent) }],
  host: { style: 'display: contents' },
  template: `
    <ul [class]="classes()"><ng-content /></ul>
  `,
})
export class AccordionComponent implements AccordionContext {
  /** Side of the heading where the chevron is placed. */
  readonly align = input<AccordionAlign>('end');
  /** Remove the horizontal padding (ignored when `align` is "start"). */
  readonly isFlush = input(false, { transform: booleanAttribute });
  /** Heading height: sm (32px), md (40px) or lg (48px). */
  readonly size = input<AccordionSize>('md');
  /** Disable every item in the accordion. */
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly className = input('');

  protected readonly classes = computed(() =>
    [
      'kpmg-accordion',
      `kpmg-accordion--align-${this.align()}`,
      `kpmg-accordion--${this.size()}`,
      this.isFlush() ? 'kpmg-accordion--flush' : '',
      this.disabled() ? 'kpmg-accordion--disabled' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}
