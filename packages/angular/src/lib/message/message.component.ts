import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MessageIconComponent } from './message-icons.component';
import {
  MessageActionIconBarComponent,
  MessageAttachmentCardComponent,
  MessageCitationComponent,
  MessageMediaCardConfig,
  MessageMediaGalleryComponent,
  MessageStatusCardComponent,
  MessageStatusCardProps,
} from './message-parts.component';

export type MessageType = 'Message reply' | 'Message sent';
export type MessageSender = 'bot' | 'user';
export type MessageLayout = 'default' | 'card';
export type MessageState = 'minimized' | 'expanded' | 'Minimized' | 'Expanded';
export type MessageAttachment = string | { title?: string };

/**
 * WorkBench Message — mirrors packages/ui/src/components/Message/Message.jsx.
 *
 * Related parts live in message-parts.component.ts (Citation, ActionIconBar, AttachmentCard,
 * MediaCard, MediaGallery, StatusCard, AudioRich, Expand/Minimize buttons),
 * message-thread.component.ts (Thread, ChatWindow) and message-icons.component.ts.
 *
 * Deviations: React `ref` forwarding and the `...props` rest passthrough are omitted.
 * Boolean toggles (`header`, `supporting`, `citationBar`, ...) default to `true` and are hidden
 * with `[header]="false"` as in React. `secondaryText` accepts `boolean | string`.
 */
@Component({
  selector: 'kpmg-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    MessageIconComponent,
    MessageCitationComponent,
    MessageAttachmentCardComponent,
    MessageMediaGalleryComponent,
    MessageStatusCardComponent,
    MessageActionIconBarComponent,
  ],
  host: { style: 'display: contents' },
  template: `
    <div [class]="classes()">
      @if (!isReply()) {
        <div class="kpmg-message__bubble">
          <ng-container [ngTemplateOutlet]="contentBlock" />
        </div>
      } @else {
        <ng-container [ngTemplateOutlet]="contentBlock" />
      }

      @if (activeAttachments().length > 0) {
        <div class="kpmg-message__attachments">
          @for (att of activeAttachments(); track $index) {
            <kpmg-message-attachment-card [title]="attachmentTitle(att)" />
          }
        </div>
      }

      @if (activeMedia().length > 0) {
        <kpmg-message-media-gallery [cards]="activeMedia()" />
      }

      @if (isStatusVisible()) {
        @let sc = statusCard()!;
        <kpmg-message-status-card
          [title]="sc.title"
          [header]="sc.header"
          [subhead]="sc.subhead"
          [progress]="sc.progress"
          [steps]="sc.steps"
          [code]="sc.code"
          [sources]="sc.sources"
          [collapsible]="sc.collapsible"
          [defaultExpanded]="sc.defaultExpanded"
        />
      }

      @if (isActionsVisible()) {
        <kpmg-message-action-icon-bar />
      }
    </div>

    <ng-template #contentBlock>
      @if (isReply()) {
        <div class="kpmg-message__avatar">
          <div class="kpmg-message__avatar-dot"></div>
        </div>
      }

      @if (isHeaderVisible()) {
        <h3 class="kpmg-message__headline">{{ activeHeadline() }}</h3>
      }

      @if (isSupportingVisible()) {
        <p class="kpmg-message__body">{{ activeBody() }}</p>
      }

      @if (isCitationsVisible()) {
        <div class="kpmg-message__citations">
          @for (c of citations(); track $index) {
            <kpmg-message-citation [number]="c" />
          }
        </div>
      }

      @if (isDividerVisible()) {
        <div class="kpmg-message__divider"></div>
      }

      @if (activeSecondary(); as secondary) {
        <div class="kpmg-message__secondary-container">
          <p [class]="'kpmg-message__secondary ' + (!isExpanded() ? 'kpmg-message__secondary--minimized' : '')">{{ secondary }}</p>
          @if (isExpanded() && isCitationsVisible()) {
            <div class="kpmg-message__citations kpmg-message__secondary-citations">
              @for (c of citations(); track $index) {
                <kpmg-message-citation [number]="c" />
              }
            </div>
          }
        </div>
      }

      @if (isToggleVisible()) {
        <div class="kpmg-message__toggle-container">
          <button
            type="button"
            class="kpmg-message__toggle-btn"
            (click)="handleToggle()"
            [attr.title]="isExpanded() ? 'Minimize message' : 'Expand message'"
            [attr.aria-label]="isExpanded() ? 'Minimize message' : 'Expand message'"
          >
            @if (isExpanded()) {
              <kpmg-message-icon name="chevron-up" [size]="24" />
            } @else {
              <kpmg-message-icon name="chevron-down" [size]="24" />
            }
          </button>
        </div>
      }
    </ng-template>
  `,
})
export class MessageComponent {
  // Canonical Figma props & ergonomic aliases
  readonly type = input<MessageType | undefined>(undefined);
  readonly sender = input<MessageSender>('bot');
  readonly layout = input<MessageLayout>('default');
  readonly state = input<MessageState>('minimized');

  readonly header = input(true, { transform: booleanAttribute });
  readonly headlineText = input<string | undefined>(undefined);
  readonly headline = input('This headline text');

  readonly supporting = input(true, { transform: booleanAttribute });
  readonly supportingText = input<string | undefined>(undefined);
  readonly body = input('More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.');

  readonly citationBar = input(true, { transform: booleanAttribute });
  readonly citations = input<(string | number)[]>(['2', '2', '2', '2']);

  readonly divider = input(true, { transform: booleanAttribute });
  readonly showDivider = input(true, { transform: booleanAttribute });

  /** `false` hides it, a string overrides it, `true` shows a default sample. */
  readonly secondaryText = input<boolean | string>(true);
  readonly secondaryTextContent = input<string | undefined>(undefined);
  readonly expandIcon = input(true, { transform: booleanAttribute });
  readonly showToggle = input(true, { transform: booleanAttribute });

  readonly attachmentBar = input(true, { transform: booleanAttribute });
  readonly attachment1 = input(true, { transform: booleanAttribute });
  readonly attachment2 = input(true, { transform: booleanAttribute });
  readonly attachments = input<MessageAttachment[]>(['Attachment']);

  readonly mediaBar = input(true, { transform: booleanAttribute });
  readonly media1 = input(true, { transform: booleanAttribute });
  readonly media2 = input(true, { transform: booleanAttribute });
  readonly media3 = input(true, { transform: booleanAttribute });
  readonly mediaCards = input<MessageMediaCardConfig[]>([{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]);

  readonly card = input(true, { transform: booleanAttribute });
  readonly statusCard = input<MessageStatusCardProps | null>(null);

  readonly iconBar = input(true, { transform: booleanAttribute });
  readonly showActions = input(true, { transform: booleanAttribute });

  readonly className = input('');

  protected readonly isReply = computed(() => (this.type() ? this.type() === 'Message reply' : this.sender() !== 'user'));
  private readonly isCard = computed(() => this.layout() === 'card');
  private readonly normalizedState = computed(() => (this.state() || 'minimized').toLowerCase());

  /** User override; reset whenever the `state` input changes (as in React). */
  private readonly userExpanded = linkedSignal<string, boolean | null>({
    source: this.normalizedState,
    computation: () => null,
  });
  protected readonly isExpanded = computed(() => {
    const user = this.userExpanded();
    return user !== null ? user : this.normalizedState() === 'expanded';
  });

  protected handleToggle(): void {
    this.userExpanded.set(!this.isExpanded());
  }

  protected readonly classes = computed(
    () =>
      `kpmg-message ${this.isReply() ? 'kpmg-message--reply' : 'kpmg-message--sent'} ${this.isCard() ? 'kpmg-message--card' : ''} ${this.className()}`,
  );

  protected readonly isHeaderVisible = computed(() => this.header() && Boolean(this.headlineText() || this.headline()));
  protected readonly activeHeadline = computed(() => (this.headlineText() !== undefined ? this.headlineText() : this.headline()));

  protected readonly isSupportingVisible = computed(() => this.supporting() && Boolean(this.supportingText() || this.body()));
  protected readonly activeBody = computed(() => (this.supportingText() !== undefined ? this.supportingText() : this.body()));

  protected readonly activeSecondary = computed<string | null>(() => {
    const secondary = this.secondaryText();
    if (secondary === false) return null;
    if (typeof secondary === 'string') return secondary;
    const content = this.secondaryTextContent();
    if (content) return content;
    const expanded = this.isExpanded();
    if (this.isReply()) {
      return expanded
        ? 'Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.'
        : 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consecte...';
    }
    return expanded
      ? '"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit."'
      : '"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit, sit amet, consectetur adipiscing elit."';
  });

  protected readonly activeAttachments = computed<MessageAttachment[]>(() => {
    const attachments = this.attachments();
    if (!this.attachmentBar() || !attachments || attachments.length === 0) return [];
    if (this.isExpanded()) {
      if (this.attachment1() && this.attachment2()) {
        return attachments.length > 1 ? attachments.slice(0, 2) : [attachments[0], 'Attachment'];
      }
      if (this.attachment1()) return [attachments[0]];
      if (this.attachment2()) return [attachments[1] || 'Attachment'];
      return [];
    }
    return this.attachment1() ? [attachments[0]] : [];
  });

  protected readonly activeMedia = computed<MessageMediaCardConfig[]>(() => {
    const cards = this.mediaCards();
    if (!this.mediaBar() || !cards || cards.length === 0) return [];
    const out: MessageMediaCardConfig[] = [];
    if (this.media1()) out.push(cards[0] || { state: 'enabled' });
    if (this.media2()) out.push(cards[1] || { state: 'enabled' });
    if (this.media3()) out.push(cards[2] || { state: 'enabled' });
    return out;
  });

  protected readonly isCitationsVisible = computed(
    () => this.citationBar() && this.isReply() && !!this.citations() && this.citations().length > 0,
  );
  protected readonly isDividerVisible = computed(
    () =>
      this.divider() &&
      this.showDivider() &&
      (this.isSupportingVisible() || this.isHeaderVisible()) &&
      Boolean(this.activeSecondary()),
  );
  protected readonly isToggleVisible = computed(() => this.expandIcon() && this.showToggle() && Boolean(this.activeSecondary()));
  protected readonly isStatusVisible = computed(() => this.card() && this.isReply() && Boolean(this.statusCard()));
  protected readonly isActionsVisible = computed(() => this.iconBar() && this.showActions() && this.isReply());

  protected attachmentTitle(att: MessageAttachment): string {
    return typeof att === 'string' ? att : att?.title || 'Attachment';
  }
}
