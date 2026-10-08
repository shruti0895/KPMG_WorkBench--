import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MenuIconComponent } from './menu-icon.component';
import { DropdownBaseSize, DropdownBaseState, DropdownBaseStyle, MenuSlot } from './menu.types';

/**
 * WorkBench DropdownBase — mirrors `DropdownBase` in Menu.jsx (the 24 canonical
 * dropdown trigger variants: default ghost/pill, gradient, branded, card).
 *
 * Deviations: `onClick` → `baseClick` output; `icon` is accepted for parity but,
 * as in React, is not rendered. `label` is a string.
 */
@Component({
  selector: 'kpmg-dropdown-base',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuIconComponent],
  host: { style: 'display: contents' },
  template: `
    <button
      type="button"
      [class]="classes()"
      [disabled]="disabled()"
      aria-haspopup="menu"
      [attr.aria-expanded]="open()"
      (click)="baseClick.emit($event)"
    >
      @if (isBranded()) {
        <span style="letter-spacing: 0.5px">{{ label() || 'KPMG' }}</span>
        <kpmg-menu-icon name="chevron" [direction]="open() ? 'up' : 'down'" [size]="18" />
      } @else {
        <span>{{ label() }}</span>
        <kpmg-menu-icon name="chevron" [direction]="open() ? 'up' : 'down'" [size]="chevronSize()" />
      }
    </button>
  `,
})
export class DropdownBaseComponent {
  readonly styleType = input<DropdownBaseStyle>('default');
  readonly size = input<DropdownBaseSize>('medium');
  /** true = pill / card container; false = ghost text. */
  readonly background = input(true, { transform: booleanAttribute });
  readonly state = input<DropdownBaseState>('enabled');
  /** Chevron points up when open. */
  readonly open = input(false, { transform: booleanAttribute });
  readonly label = input<string>('Options');
  /** Accepted for parity with React; not rendered. */
  readonly icon = input<MenuSlot>(undefined);
  readonly className = input('');
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly baseClick = output<MouseEvent>();

  private readonly isCard = computed(() => this.styleType() === 'card');
  protected readonly isBranded = computed(() => this.styleType() === 'branded' || this.size() === 'branded');
  protected readonly chevronSize = computed(() => (this.isCard() ? 20 : 16));

  protected readonly classes = computed(() => {
    let styleClass: string;
    if (this.isCard()) {
      styleClass = this.state() === 'filled' ? 'kpmg-dropdown-base--card-filled' : 'kpmg-dropdown-base--card-outlined';
    } else if (this.isBranded()) {
      styleClass = 'kpmg-dropdown-base--branded';
    } else if (this.styleType() === 'gradient') {
      styleClass = 'kpmg-dropdown-base--gradient';
    } else {
      styleClass = this.background() ? 'kpmg-dropdown-base--default-pill' : 'kpmg-dropdown-base--default-ghost';
    }
    const sizeClass = !this.isCard() && !this.isBranded() ? `kpmg-dropdown-base--size-${this.size()}` : '';
    return [
      'kpmg-dropdown-base',
      styleClass,
      sizeClass,
      this.open() ? 'kpmg-dropdown-base--open' : '',
      this.state() === 'pressed' ? 'kpmg-dropdown-base--pressed' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  });
}
