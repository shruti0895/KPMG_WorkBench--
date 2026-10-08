import { ChangeDetectionStrategy, Component, computed, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

/**
 * WorkBench MenuGroup — mirrors `MenuGroup` in Menu.jsx. Items are projected.
 * Deviation: `title` is a string; use `titleTemplate` for rich titles.
 */
@Component({
  selector: 'kpmg-menu-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()" role="group">
      @if (titleTemplate(); as tpl) {
        <div class="kpmg-menu__group-header"><ng-container [ngTemplateOutlet]="tpl" /></div>
      } @else if (title()) {
        <div class="kpmg-menu__group-header">{{ title() }}</div>
      }
      <ng-content />
    </div>
  `,
})
export class MenuGroupComponent {
  readonly title = input<string | undefined>(undefined);
  readonly titleTemplate = input<TemplateRef<unknown> | null>(null);
  readonly className = input('');

  protected readonly classes = computed(() => `kpmg-menu-group ${this.className()}`);
}
