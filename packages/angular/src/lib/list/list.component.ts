import { ChangeDetectionStrategy, Component, computed, forwardRef, input } from '@angular/core';
import { booleanAttribute } from '@angular/core';
import { LIST_CONTEXT, ListContext } from './list-context';
import {
  ListItemComponent,
  ListItemSize,
  ListLeadingProps,
  ListLeadingType,
  ListTrailingProps,
  ListTrailingType,
} from './list-item.component';

export type ListStyleType = 'outlined' | 'elevated' | 'filled';

/** Data-driven list item for the `items` input. */
export interface ListItemData {
  id?: string | number;
  key?: string | number;
  size?: ListItemSize;
  title?: string;
  supportingText?: string;
  secondaryText?: string;
  leading?: ListLeadingType;
  leadingProps?: ListLeadingProps;
  trailing?: ListTrailingType;
  trailingProps?: ListTrailingProps;
  selected?: boolean;
  disabled?: boolean;
  /** Presence makes the row interactive. */
  onClick?: (event: Event) => void;
}

/**
 * WorkBench List — mirrors packages/ui/src/components/List/List.jsx.
 * Project `<kpmg-list-item>` children, or pass the data-driven `items` input.
 *
 * Deviations: data items use the same `title` key as React (mapped to the
 * item's `itemTitle` input); data items accept keyword leading/trailing only
 * (use `<kpmg-list-item>` children for templates).
 */
@Component({
  selector: 'kpmg-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListItemComponent],
  providers: [{ provide: LIST_CONTEXT, useExisting: forwardRef(() => ListComponent) }],
  host: { style: 'display: contents' },
  template: `
    <ul [class]="classes()" [attr.role]="role()">
      @if (items(); as list) {
        @for (item of list; track item.id ?? item.key ?? $index) {
          <kpmg-list-item
            [size]="item.size ?? normalizedSize()"
            [itemTitle]="item.title ?? 'List item'"
            [supportingText]="item.supportingText"
            [secondaryText]="item.secondaryText"
            [leading]="item.leading ?? 'none'"
            [leadingProps]="item.leadingProps ?? {}"
            [trailing]="item.trailing ?? 'none'"
            [trailingProps]="item.trailingProps ?? {}"
            [selected]="!!item.selected"
            [disabled]="!!item.disabled"
            [interactive]="!!item.onClick"
            (itemClick)="item.onClick?.($event)"
          />
        }
      } @else {
        <ng-content />
      }
    </ul>
  `,
})
export class ListComponent implements ListContext {
  /** Container style: outlined (border), elevated (shadow), filled (tinted). */
  readonly styleType = input<ListStyleType>('outlined');
  /** Alias for `styleType` (wins when set). */
  readonly styleVariant = input<ListStyleType | undefined>(undefined);
  /** Default density for child items. */
  readonly size = input<ListItemSize>('medium');
  /** Subtle dividers between items. */
  readonly divided = input(false, { transform: booleanAttribute });
  /** Data-driven items; omit to project `<kpmg-list-item>` children. */
  readonly items = input<ListItemData[] | undefined>(undefined);
  readonly role = input('list');
  readonly className = input('');

  protected readonly normalizedStyle = computed(() => (this.styleVariant() || this.styleType() || 'outlined').toLowerCase());
  protected readonly normalizedSize = computed(() => (this.size() || 'medium').toLowerCase() as ListItemSize);

  protected readonly classes = computed(() =>
    ['kpmg-list', `kpmg-list--${this.normalizedStyle()}`, this.divided() ? 'kpmg-list--divided' : '', this.className()]
      .filter(Boolean)
      .join(' '),
  );
}
