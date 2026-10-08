import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ModalIconComponent } from './modal-icon.component';

export type ModalItemSize = 'small' | 'large' | 'Small' | 'Large';
export type ModalItemType = 'with-edit' | 'with-info' | 'with-exit' | 'With edit' | 'With info' | 'With exit';
export type ModalItemState = 'enabled' | 'hovered' | 'pressed' | 'Enabled' | 'Hovered' | 'Pressed';

/**
 * ModalItem — section header pill with icon action. Mirrors `ModalItem` in
 * packages/ui/src/components/Modal/Modal.jsx. `onActionClick` is the `actionClick` output;
 * `style` is not ported.
 */
@Component({
  selector: 'kpmg-modal-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <div class="kpmg-modal-item__content">
        <span class="kpmg-modal-item__label">{{ label() }}</span>
      </div>
      <button type="button" class="kpmg-modal-item__action-btn" (click)="actionClick.emit($event)" [attr.aria-label]="label() + ' action'">
        <kpmg-modal-icon [name]="iconName()" [size]="16" />
      </button>
    </div>
  `,
})
export class ModalItemComponent {
  readonly label = input('Section header');
  readonly size = input<ModalItemSize>('large');
  readonly type = input<ModalItemType>('with-edit');
  readonly selected = input(false, { transform: booleanAttribute });
  readonly state = input<ModalItemState>('enabled');
  readonly className = input('');

  readonly actionClick = output<Event>();

  private readonly normalizedState = computed(() => this.state()?.toLowerCase() || 'enabled');
  protected readonly iconName = computed(() => {
    const t = (this.type()?.toLowerCase() || 'with-edit').replace(/ /g, '-');
    return t === 'with-info' ? 'info' : t === 'with-exit' ? 'close' : 'edit';
  });

  protected readonly classes = computed(() =>
    [
      'kpmg-modal-item',
      `kpmg-modal-item--${this.size()?.toLowerCase() === 'small' ? 'small' : 'large'}`,
      this.selected() ? 'kpmg-modal-item--selected' : '',
      this.normalizedState() !== 'enabled' ? `kpmg-modal-item--${this.normalizedState()}` : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}
