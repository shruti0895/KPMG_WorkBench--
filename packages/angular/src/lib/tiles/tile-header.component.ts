import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TileArrowRightIconComponent, TileMoreVerticalIconComponent } from './tile-icons.component';

export type TileHeaderType = 'with-menu' | 'with-button';
export type TileHeaderStyle = 'default' | 'filled';

/**
 * WorkBench TileHeader — mirrors the `TileHeader` export of packages/ui/src/components/Tiles/Tiles.jsx.
 *
 * Deviations: React's `style` prop is `styleType` (Angular reserves `style` on
 * hosts); `onAction` is the `action` output.
 */
@Component({
  selector: 'kpmg-tile-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TileArrowRightIconComponent, TileMoreVerticalIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <h3 class="kpmg-tile-header__title">{{ title() }}</h3>
      <button type="button" class="kpmg-tile-header__action" (click)="action.emit($event)" [attr.aria-label]="computedAriaLabel()">
        @if (isMenu()) {
          <kpmg-tile-more-vertical-icon [size]="24" color="var(--color-on-surface, #454554)" />
        } @else {
          <kpmg-tile-arrow-right-icon [size]="24" color="var(--color-on-surface, #454554)" />
        }
      </button>
    </div>
  `,
})
export class TileHeaderComponent {
  readonly title = input('Header');
  /** 'with-menu' (3-dots overflow) or 'with-button' (arrow right). */
  readonly type = input<TileHeaderType>('with-menu');
  /** 'default' (44px) or 'filled' (76px). React prop: `style`. */
  readonly styleType = input<TileHeaderStyle>('default');
  readonly actionAriaLabel = input<string | undefined>(undefined);
  readonly className = input('');

  /** Action button click. React: `onAction`. */
  readonly action = output<MouseEvent>();

  protected readonly isMenu = computed(() => this.type() === 'with-menu');
  protected readonly computedAriaLabel = computed(
    () => this.actionAriaLabel() || (this.isMenu() ? 'Tile options menu' : 'Open tile details'),
  );
  protected readonly classes = computed(() =>
    ['kpmg-tile-header', `kpmg-tile-header--${this.styleType()}`, this.className()].filter(Boolean).join(' '),
  );
}
