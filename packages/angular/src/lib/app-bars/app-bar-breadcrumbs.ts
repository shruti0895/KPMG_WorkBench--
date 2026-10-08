import { BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';

/** A breadcrumb entry: a plain label or a full item object (React: string | object). */
export type AppBarCrumb = string | BreadcrumbItem;

/** Emitted when a breadcrumb is clicked (React: `onBreadcrumbClick(crumb, idx, e)`). */
export interface AppBarBreadcrumbClick {
  crumb: AppBarCrumb;
  index: number;
  event: Event;
}

/** Subset of Breadcrumbs inputs that React lets callers override through `breadcrumbProps`. */
export interface AppBarBreadcrumbProps {
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  overflowTrigger?: 'click' | 'hover';
  size?: 'sm' | 'md';
  className?: string;
}

/** Maps AppBar crumbs to Breadcrumbs items exactly like the React `renderBreadcrumbs` helpers. */
export function toBreadcrumbItems(
  crumbs: AppBarCrumb[],
  idPrefix: string,
  onClick: (crumb: AppBarCrumb, index: number, event: Event) => void,
): BreadcrumbItem[] {
  return crumbs.map((crumb, idx) => {
    if (typeof crumb === 'string') {
      return {
        id: `${idPrefix}-${idx}`,
        label: crumb,
        isCurrent: idx === crumbs.length - 1,
        onClick: (e: Event) => onClick(crumb, idx, e),
      };
    }
    return { ...crumb, onClick: crumb.onClick || ((e: Event) => onClick(crumb, idx, e)) };
  });
}
