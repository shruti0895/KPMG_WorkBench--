import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** WorkBench MenuDivider — mirrors `MenuDivider` in Menu.jsx. */
@Component({
  selector: 'kpmg-menu-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `<hr [class]="classes()" role="separator" />`,
})
export class MenuDividerComponent {
  readonly className = input('');

  protected readonly classes = computed(() => `kpmg-menu-divider ${this.className()}`);
}
