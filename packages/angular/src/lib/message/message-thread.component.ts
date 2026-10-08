import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MessageIconComponent } from './message-icons.component';
import { MessageComponent, MessageSender } from './message.component';
import { MessageStatusCardComponent, MessageStatusCardProps } from './message-parts.component';

export type MessageThreadType = 'default-bot-first' | 'card-bot-first' | 'default-human-first' | 'card-human-first';

const DEFAULT_STATUS_CARD_PROPS: MessageStatusCardProps = {
  title: 'Status',
  header: 'Header',
  subhead: 'Subhead',
  progress: 30,
  steps: [
    { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
    { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'completed' },
    { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'pending' },
    { name: 'Item', desc: 'Supporting line text lorem ipsum', status: 'in-progress' },
  ],
  code: 'Some code',
  sources: [
    { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
    { header: 'Header', subhead: 'Supporting line text lorem ipsum dolor sit' },
  ],
};

const BOT_BODY = 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.';
const BOT_SECONDARY =
  'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consecte...';
const USER_SECONDARY =
  '"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit, sit amet, consectetur adipiscing elit."';

/**
 * Conversation stream container — mirrors `MessageThread` in Message.jsx
 * (default-bot-first, card-bot-first, default-human-first, card-human-first).
 */
@Component({
  selector: 'kpmg-message-thread',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MessageComponent, MessageStatusCardComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-message-thread ' + className()">
      @switch (type()) {
        @case ('default-bot-first') {
          <ng-container [ngTemplateOutlet]="bot" [ngTemplateOutletContext]="{ card: false }" />
          <ng-container [ngTemplateOutlet]="user" />
          <ng-container [ngTemplateOutlet]="bot" [ngTemplateOutletContext]="{ card: false }" />
          <ng-container [ngTemplateOutlet]="user" />
        }
        @case ('card-bot-first') {
          <ng-container [ngTemplateOutlet]="bot" [ngTemplateOutletContext]="{ card: true }" />
          <ng-container [ngTemplateOutlet]="status" />
          <ng-container [ngTemplateOutlet]="user" />
        }
        @case ('default-human-first') {
          <ng-container [ngTemplateOutlet]="user" />
          <ng-container [ngTemplateOutlet]="bot" [ngTemplateOutletContext]="{ card: false }" />
          <ng-container [ngTemplateOutlet]="user" />
          <ng-container [ngTemplateOutlet]="bot" [ngTemplateOutletContext]="{ card: false }" />
        }
        @case ('card-human-first') {
          <ng-container [ngTemplateOutlet]="user" />
          <ng-container [ngTemplateOutlet]="bot" [ngTemplateOutletContext]="{ card: true }" />
          <ng-container [ngTemplateOutlet]="status" />
        }
      }
    </div>

    <ng-template #bot let-card="card">
      <kpmg-message
        sender="bot"
        [layout]="card ? 'card' : 'default'"
        state="minimized"
        headline="This headline text"
        [body]="botBody"
        [secondaryText]="botSecondary"
        [citations]="['2', '2', '2', '2']"
        [attachments]="['Attachment']"
        [mediaCards]="mediaCards"
        [statusCard]="card ? null : statusProps"
        [showActions]="true"
      />
    </ng-template>

    <ng-template #user>
      <kpmg-message
        sender="user"
        state="minimized"
        headline="This headline text"
        [body]="botBody"
        [secondaryText]="userSecondary"
        [citations]="[]"
        [attachments]="['Attachment']"
        [mediaCards]="mediaCards"
        [statusCard]="null"
        [showActions]="false"
      />
    </ng-template>

    <ng-template #status>
      <kpmg-message-status-card
        [title]="statusProps.title"
        [header]="statusProps.header"
        [subhead]="statusProps.subhead"
        [progress]="statusProps.progress"
        [steps]="statusProps.steps"
        [code]="statusProps.code"
        [sources]="statusProps.sources"
      />
    </ng-template>
  `,
})
export class MessageThreadComponent {
  readonly type = input<MessageThreadType>('default-bot-first');
  readonly className = input('');

  protected readonly statusProps = DEFAULT_STATUS_CARD_PROPS;
  protected readonly botBody = BOT_BODY;
  protected readonly botSecondary = BOT_SECONDARY;
  protected readonly userSecondary = USER_SECONDARY;
  protected readonly mediaCards = [{ state: 'enabled' as const }, { state: 'enabled' as const }, { state: 'enabled' as const }];
}

export interface MessageChatWindowMessage {
  sender?: MessageSender;
  header?: boolean;
  headline?: string;
  body?: string;
}

const DEFAULT_CHAT_MESSAGES: MessageChatWindowMessage[] = [
  { sender: 'bot', headline: '', body: BOT_BODY, header: false },
  { sender: 'user', headline: 'This headline text', body: BOT_BODY, header: true },
  { sender: 'bot', headline: 'This headline text', body: BOT_BODY, header: true },
  { sender: 'user', headline: 'This headline text', body: BOT_BODY, header: true },
];

/**
 * Chat Assistant Window — mirrors `MessageChatWindow` in Message.jsx.
 * Callbacks become outputs: `onSendMessage(text)` -> `sendMessage`, `onProjectClick` -> `projectClick`,
 * `onClose` -> `closeClick`, `onMenuClick` -> `menuClick`. The `...props` rest passthrough is omitted.
 */
@Component({
  selector: 'kpmg-message-chat-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MessageComponent, MessageIconComponent],
  host: { style: 'display: contents' },
  template: `
    <div [class]="'kpmg-message-chat-window ' + className()">
      <div class="kpmg-message-chat-window__top-bar">
        <div class="kpmg-message-chat-window__drag-handle" title="Drag to reposition">
          <kpmg-message-icon name="reorder" [size]="24" />
        </div>
        <div class="kpmg-message-chat-window__top-actions">
          <button type="button" class="kpmg-message-chat-window__icon-btn" (click)="menuClick.emit($event)" title="More options" aria-label="More options">
            <kpmg-message-icon name="more-vertical" [size]="20" />
          </button>
          <button type="button" class="kpmg-message-chat-window__icon-btn" (click)="closeClick.emit($event)" title="Minimize window" aria-label="Minimize window">
            <kpmg-message-icon name="chevron-down" [size]="24" />
          </button>
        </div>
      </div>

      <div class="kpmg-message-chat-window__body">
        <div class="kpmg-message-chat-window__stream-card">
          @for (msg of activeMessages(); track $index) {
            <kpmg-message
              [sender]="msg.sender ?? 'bot'"
              [header]="msg.header !== false"
              [headlineText]="msg.headline"
              [supportingText]="msg.body"
              [citationBar]="false"
              [divider]="false"
              [secondaryText]="false"
              [expandIcon]="false"
              [attachmentBar]="false"
              [mediaBar]="false"
              [card]="false"
              [iconBar]="false"
            />
          }
        </div>
      </div>

      <div class="kpmg-message-chat-window__bottom-bar">
        <div class="kpmg-message-chat-window__project-row">
          <span>Working on</span>
          <button type="button" class="kpmg-message-chat-window__project-pill" (click)="projectClick.emit($event)" [attr.aria-label]="'Select project: ' + projectHeadline()">
            <span>{{ projectHeadline() }}</span>
            <kpmg-message-icon name="chevron-down" [size]="16" />
          </button>
        </div>

        <form class="kpmg-message-chat-window__input-box" (submit)="handleSend($event)">
          <input
            type="text"
            class="kpmg-message-chat-window__input"
            [attr.placeholder]="inputPlaceholder()"
            [value]="inputValue()"
            (input)="onInput($event)"
            aria-label="Ask assistant a question"
          />
          <button type="submit" class="kpmg-message-chat-window__send-btn" title="Send message" aria-label="Send message">
            <kpmg-message-icon name="arrow-up" [size]="16" />
          </button>
        </form>

        <p class="kpmg-message-chat-window__footer-label">Verified by KPMG Trusted AI</p>
      </div>
    </div>
  `,
})
export class MessageChatWindowComponent {
  readonly projectHeadline = input('Project headline');
  readonly inputPlaceholder = input('Ask me anything');
  /** Conversation to render; defaults to the Figma sample stream. */
  readonly messages = input<MessageChatWindowMessage[] | undefined>(undefined);
  readonly className = input('');

  readonly sendMessage = output<string>();
  readonly projectClick = output<MouseEvent>();
  readonly closeClick = output<MouseEvent>();
  readonly menuClick = output<MouseEvent>();

  protected readonly inputValue = signal('');
  protected readonly activeMessages = () => this.messages() || DEFAULT_CHAT_MESSAGES;

  protected onInput(event: Event): void {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  protected handleSend(event: Event): void {
    event.preventDefault();
    if (this.inputValue().trim()) {
      this.sendMessage.emit(this.inputValue());
      this.inputValue.set('');
    }
  }
}
