import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AppBarFullComponent, AppBarFullType } from './app-bar-full.component';
import { AppBarNestedComponent, AppBarNestedState } from './app-bar-nested.component';
import { AppBarSpecialComponent } from './app-bar-special.component';
import { AppBarStatusType } from './app-bar-status-item.component';
import { AppBarCrumb } from './app-bar-breadcrumbs';
import {
  BottomAppBarComponent,
  BottomAppBarMode,
  BottomAppBarState,
  BottomAppBarTextComponent,
  BottomAppBarTextProps,
  BottomAppBarVoiceComponent,
  ChatDockedUiComponent,
} from './bottom-app-bar.component';

export type AppBarsVariant =
  | 'full'
  | 'nested'
  | 'special'
  | 'bottom'
  | 'bottom-bar'
  | 'bottom-text'
  | 'bottom-voice'
  | 'bottom-docked'
  | 'chat-docked';

/**
 * AppBars — polymorphic entry point mirroring `AppBars` in AppBars.jsx. Renders the matching bar for `variant`
 * (`full`, `nested`, `special`, `bottom` | `bottom-bar`, `bottom-text`, `bottom-voice`, `bottom-docked` | `chat-docked`)
 * and forwards the documented shared props (including React's `defaultProps`, e.g. `buttonLabel = 'Review Changes'`).
 *
 * Deviations: React forwards arbitrary `...props` to the chosen bar; here only the props declared below are
 * forwarded (use the dedicated components such as `kpmg-app-bar-full` for the complete API, outputs and slots).
 * `size="extra-small"` on `nested` renders as `small`. `enableAttach`, `projectLabel`, `isMuted` and `isOpen`
 * are accepted for parity but, as in React, are not consumed by any bar (`mute` drives the voice bar).
 */
@Component({
  selector: 'kpmg-app-bars',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppBarFullComponent,
    AppBarNestedComponent,
    AppBarSpecialComponent,
    BottomAppBarComponent,
    BottomAppBarTextComponent,
    BottomAppBarVoiceComponent,
    ChatDockedUiComponent,
  ],
  host: { style: 'display: contents' },
  template: `
    @switch (variant()) {
      @case ('nested') {
        <kpmg-app-bar-nested
          [size]="nestedSize()"
          [state]="nestedState()"
          [title]="title() ?? 'Header'"
          [breadcrumbs]="crumbs()"
          [subheader]="subheader()"
          [statusType]="statusType()"
          [statusProgress]="statusProgress()"
          [filterChips]="filterChips() ?? defaultNestedChips"
          [className]="className()"
        />
      }
      @case ('special') {
        <kpmg-app-bar-special
          [size]="specialSize()"
          [withSearch]="withSearch()"
          [greeting]="greeting()"
          [welcomeHeader]="welcomeHeader()"
          [placeholder]="placeholder()"
          [searchPlaceholder]="searchPlaceholder() ?? 'Ask me anything'"
          [filterChips]="filterChips() ?? defaultSpecialChips"
          [className]="className()"
        />
      }
      @case ('bottom') {
        <kpmg-bottom-app-bar [mode]="mode()" [mute]="mute()" [state]="bottomState()" [textProps]="textProps()" />
      }
      @case ('bottom-bar') {
        <kpmg-bottom-app-bar [mode]="mode()" [mute]="mute()" [state]="bottomState()" [textProps]="textProps()" />
      }
      @case ('bottom-text') {
        <kpmg-bottom-app-bar-text
          [state]="bottomState()"
          [placeholder]="placeholder()"
          [enableMic]="enableMic()"
          [buttonLabel]="buttonLabel()"
          [className]="className()"
        />
      }
      @case ('bottom-voice') {
        <kpmg-bottom-app-bar-voice [mute]="mute()" [className]="className()" />
      }
      @case ('bottom-docked') {
        <kpmg-chat-docked-ui [mode]="mode()" [className]="className()" />
      }
      @case ('chat-docked') {
        <kpmg-chat-docked-ui [mode]="mode()" [className]="className()" />
      }
      @default {
        <kpmg-app-bar-full
          [type]="fullType()"
          [brandLabel]="brandLabel()"
          [breadcrumbs]="crumbs() ?? defaultCrumbs"
          [showBreadcrumbs]="showBreadcrumbs()"
          [pageTitle]="pageTitle()"
          [className]="className()"
        />
      }
    }
  `,
})
export class AppBarsComponent {
  readonly variant = input<AppBarsVariant>('full');
  /** Bar layout type (`full`: 'default' 64px or 'with-action' 128px). */
  readonly type = input<AppBarFullType>('default');
  readonly size = input<'extra-small' | 'small' | 'large'>('small');
  readonly state = input<string>('default');
  readonly brandLabel = input('KPMG');
  readonly breadcrumbs = input<AppBarCrumb[] | undefined>(undefined);
  readonly showBreadcrumbs = input(true, { transform: booleanAttribute });
  readonly pageTitle = input<string | undefined>(undefined);
  readonly title = input<string | undefined>(undefined);
  readonly subheader = input<string | string[] | null | false | undefined>(undefined);
  readonly statusType = input<AppBarStatusType | undefined>(undefined);
  readonly statusProgress = input(30);
  readonly greeting = input('Greeting, name');
  readonly welcomeHeader = input('Welcome');
  readonly placeholder = input('Ask me anything');
  readonly searchPlaceholder = input<string | undefined>(undefined);
  readonly withSearch = input<boolean | string>(true);
  readonly filterChips = input<string[] | undefined>(undefined);
  readonly enableMic = input(true, { transform: booleanAttribute });
  readonly enableAttach = input(true, { transform: booleanAttribute });
  readonly buttonLabel = input('Review Changes');
  readonly projectLabel = input('Working on project headline');
  readonly mode = input<BottomAppBarMode>('text');
  /** Voice-bar mute state. */
  readonly mute = input(false, { transform: booleanAttribute });
  readonly isMuted = input(false, { transform: booleanAttribute });
  readonly isOpen = input(true, { transform: booleanAttribute });
  /** Extra text-bar props for `bottom` (merged over `placeholder`, `enableMic`, `buttonLabel`). */
  readonly bottomProps = input<BottomAppBarTextProps>({});
  readonly className = input('');

  protected readonly defaultCrumbs: AppBarCrumb[] = ['Home', 'Projects', 'Analytics'];
  protected readonly defaultNestedChips = ['All', 'Active', 'Archived'];
  protected readonly defaultSpecialChips = ['Project tag', 'Project tag', 'Project tag'];

  protected readonly crumbs = computed(() => this.breadcrumbs());
  protected readonly fullType = computed<AppBarFullType>(() => this.type());
  protected readonly nestedSize = computed(() => (this.size() === 'large' ? 'large' : 'small'));
  protected readonly nestedState = computed(() => (this.state() === 'filled' ? 'filled' : 'default') as AppBarNestedState);
  protected readonly specialSize = computed(() => this.size());
  protected readonly bottomState = computed(() => this.state() as BottomAppBarState);
  protected readonly textProps = computed<BottomAppBarTextProps>(() => ({
    placeholder: this.placeholder(),
    enableMic: this.enableMic(),
    buttonLabel: this.buttonLabel(),
    ...this.bottomProps(),
  }));
}
