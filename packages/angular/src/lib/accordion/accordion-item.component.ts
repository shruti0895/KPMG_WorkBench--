import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, model, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ACCORDION_CONTEXT, AccordionHeadingClick } from './accordion-context';

let nextId = 0;

/**
 * WorkBench AccordionItem — mirrors `AccordionItem` in
 * packages/ui/src/components/Accordion/AccordionItem.jsx.
 *
 * The heading is the `title` string, a `titleTemplate`, or content projected
 * with the `accordionTitle` attribute (`<span accordionTitle>...</span>`); the
 * panel is the default `<ng-content />`. `open` is a model: bind `[(open)]` to control
 * it, or use `defaultOpen` for uncontrolled usage.
 */
@Component({
  selector: 'kpmg-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { style: 'display: contents' },
  template: `
    <li [class]="classes()">
      <button
        type="button"
        class="kpmg-accordion__heading"
        [attr.id]="headingId"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="panelId"
        [disabled]="isDisabled()"
        (click)="onClick($event)"
      >
        <svg class="kpmg-accordion__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M3.64645 5.64645C3.84171 5.45118 4.15829 5.45118 4.35355 5.64645L8 9.29289L11.6464 5.64645C11.8417 5.45118 12.1583 5.45118 12.3536 5.64645C12.5488 5.84171 12.5488 6.15829 12.3536 6.35355L8.35355 10.3536C8.15829 10.5488 7.84171 10.5488 7.64645 10.3536L3.64645 6.35355C3.45118 6.15829 3.45118 5.84171 3.64645 5.64645Z" fill="currentColor" />
        </svg>
        <span class="kpmg-accordion__title">{{ itemTitle() }}@if (titleTemplate(); as tpl) {<ng-container [ngTemplateOutlet]="tpl" />}<ng-content select="[accordionTitle]" /></span>
      </button>
      <div [attr.id]="panelId" role="region" [attr.aria-labelledby]="headingId" class="kpmg-accordion__content" [hidden]="!isOpen()">
        <ng-content />
      </div>
    </li>
  `,
})
export class AccordionItemComponent {
  /** Heading text. For richer headings use `titleTemplate` or an `accordionTitle` element. */
  readonly itemTitle = input<string>('', { alias: 'title' });
  /** Heading rendered from a template reference. */
  readonly titleTemplate = input<TemplateRef<unknown> | null>(null);
  /** Open state. Two-way bindable: `[(open)]`. */
  readonly open = model<boolean | undefined>(undefined);
  /** Initial open state when `open` is not bound. */
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  /** Disable this item: not focusable, cannot be toggled. */
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly className = input('');

  /** Fires when the heading is clicked, with the new open state: `{ isOpen, event }`. */
  readonly headingClick = output<AccordionHeadingClick>();

  private readonly context = inject(ACCORDION_CONTEXT, { optional: true });
  private readonly uid = `kpmg-accordion-${nextId++}`;
  protected readonly headingId = `${this.uid}-heading`;
  protected readonly panelId = `${this.uid}-panel`;

  private readonly current = linkedSignal(() => this.open() ?? this.defaultOpen());
  protected readonly isOpen = this.current.asReadonly();
  protected readonly isDisabled = computed(() => this.disabled() || !!this.context?.disabled());

  protected readonly classes = computed(() =>
    [
      'kpmg-accordion__item',
      this.isOpen() ? 'kpmg-accordion__item--active' : '',
      this.isDisabled() ? 'kpmg-accordion__item--disabled' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    const next = !this.isOpen();
    this.current.set(next);
    this.open.set(next);
    this.headingClick.emit({ isOpen: next, event });
  }
}
