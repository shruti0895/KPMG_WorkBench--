import { ChangeDetectionStrategy, Component, computed, inject, input, output, TemplateRef } from '@angular/core';
import { booleanAttribute } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LIST_CONTEXT } from './list-context';
import { ListAvatarComponent, ListCheckCircleComponent, ListChevronComponent, ListThumbnailComponent } from './list-parts.component';

export type ListItemSize = 'small' | 'medium' | 'large';
export type ListLeadingType = 'avatar' | 'image' | 'checkbox' | 'radio' | 'icon' | 'none';
export type ListTrailingType = 'checkbox' | 'arrow' | 'chevron' | 'none';

/** Props forwarded to the leading element (React: `leadingProps`). */
export interface ListLeadingProps {
  /** avatar */
  initials?: string;
  /** avatar / image */
  src?: string;
  /** avatar / image */
  alt?: string;
  /** checkbox / radio (default false) */
  checked?: boolean;
  /** icon: custom content */
  icon?: TemplateRef<unknown>;
}

/** Props forwarded to the trailing element (React: `trailingProps`). */
export interface ListTrailingProps {
  /** checkbox (default true) */
  checked?: boolean;
}

/**
 * WorkBench ListItem — mirrors packages/ui/src/components/List/ListItem.jsx.
 * The host element carries the `kpmg-list-item` classes and `listitem` role
 * itself (instead of a wrapping `<li>`) so the CSS `:last-child` divider rule works.
 *
 * Deviations: React's `title` prop is `itemTitle` (avoids the native `title`
 * tooltip on the host); `leading`/`trailing` accept a keyword or an
 * `<ng-template>` (React: ReactNode); `interactive` replaces React's presence of
 * `onClick`, and React `onClick` is the `itemClick` output; `size` falls back to
 * the parent list's size (React's list context was never consumed); arbitrary
 * SVG props in `leadingProps`/`trailingProps` are not forwarded; projected
 * content renders after the text lines inside the content container; Enter/Space
 * on interactive items emits `itemClick`.
 */
@Component({
  selector: 'kpmg-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, ListAvatarComponent, ListThumbnailComponent, ListCheckCircleComponent, ListChevronComponent],
  host: {
    '[class]': 'classes()',
    '[attr.role]': 'role()',
    '[attr.tabindex]': 'isInteractive() ? 0 : null',
    '[attr.aria-selected]': 'selected() ? true : null',
    '[attr.aria-disabled]': 'disabled() ? true : null',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
  },
  template: `
    <div class="kpmg-list-item__main">
      @if (leadingTemplate(); as tpl) {
        <div class="kpmg-list-item__leading"><ng-container [ngTemplateOutlet]="tpl" /></div>
      } @else {
        @switch (leadingType()) {
          @case ('avatar') {
            <div class="kpmg-list-item__leading">
              <kpmg-list-avatar [initials]="leadingProps().initials ?? 'AZ'" [src]="leadingProps().src" [alt]="leadingProps().alt ?? ''" />
            </div>
          }
          @case ('image') {
            <div class="kpmg-list-item__leading">
              <kpmg-list-thumbnail [src]="leadingProps().src" [alt]="leadingProps().alt ?? ''" />
            </div>
          }
          @case ('checkbox') {
            <div class="kpmg-list-item__leading kpmg-list-control">
              <kpmg-list-check-circle
                [color]="leadingProps().checked ? 'var(--color-primary-action, #1e49e2)' : 'var(--color-neutral-100, #454554)'"
                cursor="pointer"
              />
            </div>
          }
          @case ('radio') {
            <div class="kpmg-list-item__leading kpmg-list-control">
              <div [class]="'kpmg-list-radio-indicator ' + (leadingProps().checked ? 'kpmg-list-radio-indicator--checked' : 'kpmg-list-radio-indicator--unchecked')"></div>
            </div>
          }
          @case ('icon') {
            <div class="kpmg-list-item__leading kpmg-list-icon">
              @if (leadingProps().icon; as icon) {
                <ng-container [ngTemplateOutlet]="icon" />
              }
            </div>
          }
        }
      }
      <div class="kpmg-list-item__content">
        @if (itemTitle()) {
          <div class="kpmg-list-item__title">{{ itemTitle() }}</div>
        }
        @if (normalizedSize() !== 'small' && supportingText()) {
          <div class="kpmg-list-item__supporting">{{ supportingText() }}</div>
        }
        @if (normalizedSize() === 'large' && secondaryText()) {
          <div class="kpmg-list-item__secondary">{{ secondaryText() }}</div>
        }
        <ng-content />
      </div>
    </div>
    @if (trailingTemplate(); as tpl) {
      <div class="kpmg-list-item__trailing"><ng-container [ngTemplateOutlet]="tpl" /></div>
    } @else {
      @switch (trailingType()) {
        @case ('checkbox') {
          <div class="kpmg-list-item__trailing">
            <kpmg-list-check-circle [color]="(trailingProps().checked ?? true) ? 'var(--color-neutral-100, #454554)' : 'var(--color-neutral-300, #b8b8c4)'" />
          </div>
        }
        @case ('arrow') {
          <div class="kpmg-list-item__trailing kpmg-list-chevron"><kpmg-list-chevron /></div>
        }
        @case ('chevron') {
          <div class="kpmg-list-item__trailing kpmg-list-chevron"><kpmg-list-chevron /></div>
        }
      }
    }
  `,
})
export class ListItemComponent {
  /** Density: small (1-line), medium (2-line), large (3-line). Defaults to the parent list's size. */
  readonly size = input<ListItemSize | undefined>(undefined);
  /** Primary headline text. */
  readonly itemTitle = input<string | undefined>('List item');
  /** Visible in medium and large sizes. */
  readonly supportingText = input<string | undefined>(undefined);
  /** Visible in large size. */
  readonly secondaryText = input<string | undefined>(undefined);
  /** Leading element keyword, or a template for custom content. */
  readonly leading = input<ListLeadingType | TemplateRef<unknown>>('none');
  readonly leadingProps = input<ListLeadingProps>({});
  /** Trailing element keyword, or a template for custom content. */
  readonly trailing = input<ListTrailingType | TemplateRef<unknown>>('none');
  readonly trailingProps = input<ListTrailingProps>({});
  readonly selected = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Makes the row hoverable and keyboard-focusable (React: `onClick` provided). */
  readonly interactive = input(false, { transform: booleanAttribute });
  readonly role = input('listitem');
  readonly className = input('');

  /** Row click (or Enter/Space when interactive). Not fired when disabled. */
  readonly itemClick = output<Event>();

  private readonly list = inject(LIST_CONTEXT, { optional: true });

  protected readonly normalizedSize = computed(() => (this.size() ?? this.list?.size() ?? 'medium').toLowerCase());
  protected readonly isInteractive = computed(() => this.interactive() && !this.disabled());

  protected readonly leadingTemplate = computed(() => {
    const v = this.leading();
    return v instanceof TemplateRef ? v : null;
  });
  protected readonly leadingType = computed(() => {
    const v = this.leading();
    return v instanceof TemplateRef ? 'none' : v;
  });
  protected readonly trailingTemplate = computed(() => {
    const v = this.trailing();
    return v instanceof TemplateRef ? v : null;
  });
  protected readonly trailingType = computed(() => {
    const v = this.trailing();
    return v instanceof TemplateRef ? 'none' : v;
  });

  protected readonly classes = computed(() =>
    [
      'kpmg-list-item',
      `kpmg-list-item--${this.normalizedSize()}`,
      this.isInteractive() ? 'kpmg-list-item--interactive' : '',
      this.selected() ? 'kpmg-list-item--selected' : '',
      this.disabled() ? 'kpmg-list-item--disabled' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClick(event: Event): void {
    if (this.disabled()) return;
    this.itemClick.emit(event);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.isInteractive() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.itemClick.emit(event);
    }
  }
}
