import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CardToggleEvent } from './card-events';
import { HorizontalCardCheckmarkIconComponent } from './cards-icons.component';

/**
 * WorkBench HorizontalCardCheckbox (alias `TaskCardCheckbox`) — mirrors the
 * square selection checkbox export of packages/ui/src/components/Cards/Cards.jsx.
 *
 * Deviations: `onCheckChange(e, next)` is the `checkChange` output (`{ event, value }`);
 * `onClick(e)` is the `checkboxClick` output. `checkVariant` is accepted but unused (as in React).
 */
@Component({
  selector: 'kpmg-horizontal-card-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HorizontalCardCheckmarkIconComponent],
  host: { style: 'display: contents' },
  template: `
    <button
      type="button"
      [class]="classes()"
      role="checkbox"
      [attr.aria-checked]="checked()"
      aria-label="Toggle card selection"
      [disabled]="disabled()"
      (click)="onClick($event)"
    >
      @if (checked()) {
        <kpmg-horizontal-card-checkmark-icon [size]="14" [color]="tickColor()" />
      }
    </button>
  `,
})
export class HorizontalCardCheckboxComponent {
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly checkVariant = input('primary');
  readonly tickColor = input('#ffffff');
  readonly state = input<'enabled' | 'hovered' | 'pressed' | 'disabled'>('enabled');
  readonly className = input('');

  readonly checkChange = output<CardToggleEvent>();
  readonly checkboxClick = output<MouseEvent>();

  protected readonly classes = computed(() =>
    [
      'horizontal-card__checkbox',
      this.checked() ? 'horizontal-card__checkbox--checked' : '',
      this.state() !== 'enabled' ? `horizontal-card__checkbox--state-${this.state()}` : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClick(e: MouseEvent): void {
    if (this.disabled()) return;
    this.checkChange.emit({ event: e, value: !this.checked() });
    this.checkboxClick.emit(e);
  }
}

/** Alias matching the React `TaskCardCheckbox` export. */
export { HorizontalCardCheckboxComponent as TaskCardCheckboxComponent };
