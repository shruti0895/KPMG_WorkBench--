import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ModalIconComponent } from './modal-icon.component';

export interface ModalAgentReactions {
  heart: string;
  bookmark: string;
  share: string;
}

/** Agent preview card — mirrors `ModalAgentCard`. `onMenuClick` → `menuClick`. */
@Component({
  selector: 'kpmg-modal-agent-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <div class="kpmg-modal__agent-top">
        <div class="kpmg-modal__agent-avatar">{{ avatar() }}</div>
        <div class="kpmg-modal__agent-meta">
          <h4 class="kpmg-modal__agent-header">{{ title() }}</h4>
          <p class="kpmg-modal__agent-subhead">{{ subhead() }}</p>
        </div>
        <button type="button" class="kpmg-modal__agent-menu-btn" (click)="menuClick.emit($event)" aria-label="Agent options">
          <kpmg-modal-icon name="more-vertical" [size]="20" />
        </button>
      </div>
      <div class="kpmg-modal__agent-details">
        <div class="kpmg-modal__agent-badge-row">
          <span class="kpmg-modal__agent-badge">{{ badgeText() }}</span>
          <p class="kpmg-modal__agent-desc">{{ description() }}</p>
        </div>
        <div class="kpmg-modal__agent-reactions">
          <div class="kpmg-modal__agent-reaction-item">
            <span class="kpmg-modal__agent-reaction-icon"><kpmg-modal-icon name="heart" [size]="20" /></span>
            <span>{{ reactions().heart }}</span>
          </div>
          <div class="kpmg-modal__agent-reaction-item">
            <span class="kpmg-modal__agent-reaction-icon"><kpmg-modal-icon name="bookmark" [size]="20" /></span>
            <span>{{ reactions().bookmark }}</span>
          </div>
          <div class="kpmg-modal__agent-reaction-item">
            <span class="kpmg-modal__agent-reaction-icon"><kpmg-modal-icon name="share" [size]="20" /></span>
            <span>{{ reactions().share }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalAgentCardComponent {
  readonly avatar = input('AZ');
  readonly title = input('Header');
  readonly subhead = input('Subhead');
  readonly badgeText = input('Assistant');
  readonly description = input('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor');
  readonly reactions = input<ModalAgentReactions>({ heart: '2.4K', bookmark: '2.4K', share: '2.4K' });
  readonly className = input('');

  readonly menuClick = output<Event>();

  protected readonly classes = computed(() => `kpmg-modal__agent-card ${this.className()}`);
}

/**
 * Selectable model/voice card — mirrors `ModalCard`. `thumbnail` accepts text or a
 * TemplateRef (React: node); `onClick` → `cardClick`.
 */
@Component({
  selector: 'kpmg-modal-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" role="button" tabindex="0" (click)="cardClick.emit($event)" (keydown)="onKeydown($event)">
      @if (thumbnail()) {
        <div class="kpmg-modal-card__thumb">
          @if (thumbnailTemplate(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            {{ thumbnail() }}
          }
        </div>
      }
      <div class="kpmg-modal-card__content">
        <div class="kpmg-modal-card__header-row">
          <h4 class="kpmg-modal-card__title">{{ title() }}</h4>
          @if (showCheck()) {
            <div class="kpmg-modal-card__check"></div>
          }
        </div>
        <p class="kpmg-modal-card__desc">{{ description() }}</p>
      </div>
    </div>
  `,
})
export class ModalCardComponent {
  readonly title = input('Header');
  readonly description = input('Supporting line text. Lorem ipsum dolor sit amet, consectetur.');
  readonly thumbnail = input<string | TemplateRef<unknown> | undefined>(undefined);
  readonly selected = input(false, { transform: booleanAttribute });
  readonly showCheck = input(true, { transform: booleanAttribute });
  readonly className = input('');

  readonly cardClick = output<Event>();

  protected readonly thumbnailTemplate = computed(() => {
    const t = this.thumbnail();
    return t instanceof TemplateRef ? t : null;
  });

  protected readonly classes = computed(
    () => `kpmg-modal-card ${this.selected() ? 'kpmg-modal-card--selected' : ''} ${this.className()}`,
  );

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cardClick.emit(event);
    }
  }
}

/** Prompt template row — mirrors `ModalPromptItem`. `onMenuClick` → `menuClick`. */
@Component({
  selector: 'kpmg-modal-prompt-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <div class="kpmg-modal__prompt-content">
        <h4 class="kpmg-modal__prompt-title">{{ title() }}</h4>
        <p class="kpmg-modal__prompt-desc">{{ description() }}</p>
      </div>
      <button type="button" class="kpmg-modal__agent-menu-btn" (click)="menuClick.emit($event)" aria-label="Prompt options">
        <kpmg-modal-icon name="more-vertical" [size]="20" />
      </button>
    </div>
  `,
})
export class ModalPromptItemComponent {
  readonly title = input('Header');
  readonly description = input('Supporting line text. Lorem ipsum dolor sit amet, consectetur.');
  readonly className = input('');

  readonly menuClick = output<Event>();

  protected readonly classes = computed(() => `kpmg-modal__prompt-item ${this.className()}`);
}
