import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AppBarIconComponent } from './app-bar-icons.component';

export type AppBarStatusType = 'configuring' | 'completed' | 'saved' | 'reviewed';

/**
 * AppBarStatusItem — mirrors `AppBarStatusItem` in AppBars.jsx (configuring / completed / saved / reviewed).
 * Deviation: `label` is a string (React: node); `ref`/`...props` are omitted.
 */
@Component({
  selector: 'kpmg-app-bar-status-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppBarIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-appbar-status kpmg-appbar-status--' + type() + ' ' + className()">
      @if (details().icon === 'checkmark') {
        <kpmg-app-bar-icon name="checkmark" [size]="14" className="kpmg-appbar-status__icon" />
      } @else if (details().icon === 'saved') {
        <kpmg-app-bar-icon name="saved" [size]="14" className="kpmg-appbar-status__icon" />
      }
      <span class="kpmg-appbar-status__label">{{ details().title }}</span>
      @if (details().showPercent) {
        <span class="kpmg-appbar-status__percent">{{ details().percentText }}</span>
      }
      @if (details().hasBar) {
        <div class="kpmg-appbar-status__progress-track" role="progressbar" [attr.aria-valuenow]="progress()" aria-valuemin="0" aria-valuemax="100">
          <div class="kpmg-appbar-status__progress-fill" [style.width]="details().barWidth"></div>
        </div>
      }
    </div>
  `,
})
export class AppBarStatusItemComponent {
  readonly type = input<AppBarStatusType>('configuring');
  readonly progress = input(30);
  readonly label = input<string | undefined>(undefined);
  readonly className = input('');

  protected readonly details = computed(() => {
    const label = this.label();
    const progress = this.progress();
    switch (this.type()) {
      case 'completed':
        return { title: label || 'Completed', hasBar: true, barWidth: '100%', showPercent: false, percentText: '', icon: 'checkmark' as const };
      case 'saved':
        return { title: label || 'Saved', hasBar: false, barWidth: '', showPercent: false, percentText: '', icon: 'saved' as const };
      case 'reviewed':
        return { title: label || 'Review complete, longer action', hasBar: false, barWidth: '', showPercent: false, percentText: '', icon: null };
      case 'configuring':
      default:
        return {
          title: label || 'Configuring',
          hasBar: true,
          barWidth: `${Math.min(100, Math.max(0, progress))}%`,
          showPercent: true,
          percentText: `${progress}%`,
          icon: null,
        };
    }
  });
}
