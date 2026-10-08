import { ChangeDetectionStrategy, Component, computed, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MenuIconComponent } from './menu-icon.component';

/**
 * WorkBench AssistantCard — mirrors `AssistantCard` in Menu.jsx (card used in
 * the Assistant Menu).
 *
 * Deviations: `thumbnail` is a `TemplateRef` (React: a node).
 * `onClick` → `cardClick`, `onActionClick` → `actionClick`.
 */
@Component({
  selector: 'kpmg-assistant-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MenuIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" role="button" tabindex="0" (click)="cardClick.emit($event)" (keydown)="onKeydown($event)">
      <div class="kpmg-assistant-card__thumbnail">
        @if (thumbnail(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        }
      </div>
      <div class="kpmg-assistant-card__info">
        <span class="kpmg-assistant-card__title">{{ title() }}</span>
        <span class="kpmg-assistant-card__subtitle">{{ subtitle() }}</span>
      </div>
      <button type="button" class="kpmg-assistant-card__action" aria-label="Card options" (click)="onActionClick($event)">
        <kpmg-menu-icon name="ellipsis" [size]="24" />
      </button>
    </div>
  `,
})
export class AssistantCardComponent {
  readonly title = input('Header');
  readonly subtitle = input('Supporting line text lorem ipsu...');
  readonly thumbnail = input<TemplateRef<unknown> | null | undefined>(undefined);
  readonly className = input('');

  /** Card clicked, or activated with Enter / Space (React: `onClick`). */
  readonly cardClick = output<Event>();
  /** Options button clicked (React: `onActionClick`). */
  readonly actionClick = output<Event>();

  protected readonly classes = computed(() => `kpmg-assistant-card ${this.className()}`);

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') this.cardClick.emit(event);
  }

  protected onActionClick(event: Event): void {
    event.stopPropagation();
    this.actionClick.emit(event);
  }
}
