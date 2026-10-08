import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** WorkBench TileReferenceCard — mirrors the `TileReferenceCard` export of packages/ui/src/components/Tiles/Tiles.jsx. */
@Component({
  selector: 'kpmg-tile-reference-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      <div class="kpmg-tile-ref-card__thumb" [style.background]="thumbGradient() || null"></div>
      <div class="kpmg-tile-ref-card__info">
        <h4 class="kpmg-tile-ref-card__title">{{ title() }}</h4>
        <p class="kpmg-tile-ref-card__desc">{{ supportingText() }}</p>
      </div>
    </div>
  `,
})
export class TileReferenceCardComponent {
  readonly title = input('Header');
  readonly supportingText = input('Supporting line text. Lorem ipsum dolor sit amet, consectetur.');
  /** CSS background value for the thumbnail. */
  readonly thumbGradient = input<string | undefined>(undefined);
  readonly className = input('');

  protected readonly classes = computed(() => ['kpmg-tile-ref-card', this.className()].filter(Boolean).join(' '));
}
