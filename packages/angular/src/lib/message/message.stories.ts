import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { MessageComponent } from './message.component';
import { MessageChatWindowComponent, MessageThreadComponent } from './message-thread.component';
import { MessageIconComponent } from './message-icons.component';
import {
  MessageActionIconBarComponent,
  MessageAttachmentCardComponent,
  MessageAudioRichComponent,
  MessageCitationComponent,
  MessageExpandButtonComponent,
  MessageMediaCardComponent,
  MessageMediaGalleryComponent,
  MessageMinimizeButtonComponent,
  MessageStatusCardComponent,
  MessageStatusCardProps,
} from './message-parts.component';

const defaultStatusCardProps: MessageStatusCardProps = {
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

const threeCards = [{ state: 'enabled' as const }, { state: 'enabled' as const }, { state: 'enabled' as const }];
const BODY = 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.';

const meta: Meta<MessageComponent> = {
  title: 'Components/Message',
  component: MessageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Message Component Family

The **Message** component family powers conversational, assistant, and human messaging interfaces across WorkBench applications.
Engineered according to canonical KPMG WorkBench Design System specifications with 100% tokenized CSS and zero hardcoding:

- **Participant Variations**:
  - **Assistant Reply**: Clean, uncontained or card surface with brand gradient avatar dot, headline, message body, citation footnote badges, divider, collapsible secondary text, attachments, media gallery, workflow status tracking card, and bottom action icon bar.
  - **Human Sent**: Elevated tinted container bubble with headline, message text, secondary text, attachments, and media gallery.
- **Collapsible States**:
  - **Minimized**: Truncated 2-line secondary text, single attachment preview, centered Chevron Down toggle.
  - **Expanded**: Full multi-line secondary text, secondary citation chips bar, dual attachments preview, centered Chevron Up toggle.
- **Workflow Status Integration**:
  - Reuses **Linear ProgressIndicator** track for multi-step task progress.
  - Reuses **Circular Indeterminate ProgressIndicator** for in-progress step items.
  - Step items with completed checkmarks, pending circle outlines, and active loading spinners.
  - Monospace code execution block and source citation cards.
- **Chat Assistant Window**:
  - Full assistant window featuring top app bar with drag handle and window actions, multi-turn conversation stream card, and bottom input bar with project dropdown pill, rounded query input, send action button, and KPMG Trusted AI verification subtitle.
- **Action Icon Bar**: Thumbs Up, Thumbs Down, Read Aloud Speaker, Copy to Clipboard, and Regenerate Response.
- **Media Gallery**: 3-card square image gallery supporting enabled, hovered, disabled, and pressed states with contextual popover options menus.
- **Thread Orchestration**: Conversational streams supporting Default bot-first, Card bot-first, Default human-first, and Card human-first layouts.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Message reply', 'Message sent'],
      description: 'Canonical message type: Message reply (Assistant bot) or Message sent (Human user)',
      table: {
        type: {
          summary: "'Message reply' | 'Message sent'",
        },
        defaultValue: {
          summary: "'Message reply'",
        },
      },
    },
    layout: {
      control: 'select',
      options: ['default', 'card'],
      description: 'Surface presentation treatment: Default conversational stream or Card container',
      table: {
        type: {
          summary: "'default' | 'card'",
        },
        defaultValue: {
          summary: "'default'",
        },
      },
    },
    state: {
      control: 'select',
      options: ['Minimized', 'Expanded'],
      description: 'Collapsible state for secondary content and attachment count: Minimized or Expanded',
      table: {
        type: {
          summary: "'Minimized' | 'Expanded'",
        },
        defaultValue: {
          summary: "'Minimized'",
        },
      },
    },
    header: {
      control: 'boolean',
      description: 'Toggles visibility of the message headline text',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    headlineText: {
      control: 'text',
      description: 'Headline text displayed at the top of the message',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'This headline text'",
        },
      },
    },
    supporting: {
      control: 'boolean',
      description: 'Toggles visibility of the primary chat body paragraph',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    supportingText: {
      control: 'text',
      description: 'Primary message body paragraph',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.'",
        },
      },
    },
    citationBar: {
      control: 'boolean',
      description: 'Toggles visibility of footnote citation badges (Reply only)',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    divider: {
      control: 'boolean',
      description: 'Toggles the horizontal separator line between message sections',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    secondaryText: {
      control: 'boolean',
      description: 'Toggles or provides secondary contextual text block supporting collapse/expansion',
      table: {
        type: {
          summary: 'boolean | string',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    expandIcon: {
      control: 'boolean',
      description: 'Toggles the Chevron expand/minimize collapse trigger button',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    attachmentBar: {
      control: 'boolean',
      description: 'Toggles visibility of the attachment card section',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    mediaBar: {
      control: 'boolean',
      description: 'Toggles visibility of the 3-image media grid section',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    card: {
      control: 'boolean',
      description: 'Toggles visibility of the Task cards rich workflow status card (Reply only)',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    iconBar: {
      control: 'boolean',
      description: 'Toggles visibility of the bottom 5-icon action bar (Reply only)',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        MessageComponent,
        MessageChatWindowComponent,
        MessageThreadComponent,
        MessageIconComponent,
        MessageActionIconBarComponent,
        MessageAttachmentCardComponent,
        MessageAudioRichComponent,
        MessageCitationComponent,
        MessageExpandButtonComponent,
        MessageMediaCardComponent,
        MessageMediaGalleryComponent,
        MessageMinimizeButtonComponent,
        MessageStatusCardComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<MessageComponent>;

const wrap = (inner: string, max = 600) => `<div style="max-width: ${max}px; margin: 0 auto">${inner}</div>`;

export const Basic: Story = {
  args: {
    type: 'Message reply',
    state: 'Minimized',
    layout: 'default',
    header: true,
    headlineText: 'This headline text',
    supporting: true,
    supportingText: BODY,
    citationBar: true,
    divider: true,
    secondaryText: true,
    expandIcon: true,
    attachmentBar: true,
    mediaBar: true,
    card: true,
    iconBar: true,
  },
  render: (args) => ({
    props: { ...args, statusCard: args.card ? defaultStatusCardProps : null },
    template: wrap(`<kpmg-message ${argsToTemplate(args)} [statusCard]="statusCard" />`),
  }),
};

/* ----- Chat assistant window ----- */

export const ChatAssistantWindow: Story = {
  name: 'Chat Assistant Window',
  render: () => ({
    template: `<div style="display: flex; justify-content: center; padding: 24px 0">
      <kpmg-message-chat-window projectHeadline="Project headline" inputPlaceholder="Ask me anything" />
    </div>`,
  }),
};

export const ChatAssistantDesktop: Story = {
  name: 'Chat Assistant Desktop',
  render: () => ({
    template: `<div style="display: flex; justify-content: center; padding: 24px 0"><div style="width: 486px">
      <kpmg-message-chat-window projectHeadline="Audit Engagement 2026" inputPlaceholder="Ask about cross-border compliance..." />
    </div></div>`,
  }),
};

export const ChatAssistantMobile: Story = {
  name: 'Chat Assistant Mobile',
  render: () => ({
    template: `<div style="display: flex; justify-content: center; padding: 24px 0"><div style="width: 360px">
      <kpmg-message-chat-window projectHeadline="Tax Review" inputPlaceholder="Message..." />
    </div></div>`,
  }),
};

/* ----- Canonical variants ----- */

export const MessageReplyMinimized: Story = {
  name: 'Message Reply Minimized',
  render: () => ({
    props: { statusCard: defaultStatusCardProps, mediaCards: threeCards },
    template: wrap(`<kpmg-message type="Message reply" state="Minimized" headlineText="This headline text"
      supportingText="${BODY}" [citations]="['2','2','2','2']"
      secondaryText="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consecte..."
      [attachment2]="false" [attachments]="['Attachment']" [mediaCards]="mediaCards" [statusCard]="statusCard" />`),
  }),
};

export const MessageReplyExpanded: Story = {
  name: 'Message Reply Expanded',
  render: () => ({
    props: { statusCard: defaultStatusCardProps, mediaCards: threeCards },
    template: wrap(`<kpmg-message type="Message reply" state="Expanded" headlineText="This headline text"
      supportingText="${BODY}" [citations]="['2','2','2','2']"
      secondaryText="Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua."
      [attachments]="['Attachment', 'Attachment']" [mediaCards]="mediaCards" [statusCard]="statusCard" />`),
  }),
};

export const MessageSentMinimized: Story = {
  name: 'Message Sent Minimized',
  render: () => ({
    props: { mediaCards: threeCards },
    template: wrap(`<kpmg-message type="Message sent" state="Minimized" headlineText="This headline text"
      supportingText="${BODY}"
      secondaryText='"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit, sit amet, consectetur adipiscing elit."'
      [attachment2]="false" [attachments]="['Attachment']" [mediaCards]="mediaCards" />`),
  }),
};

export const MessageSentExpanded: Story = {
  name: 'Message Sent Expanded',
  render: () => ({
    props: { mediaCards: threeCards },
    template: wrap(`<kpmg-message type="Message sent" state="Expanded" headlineText="This headline text"
      supportingText="${BODY}"
      secondaryText='"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit."'
      [attachments]="['Attachment', 'Attachment']" [mediaCards]="mediaCards" />`),
  }),
};

/* ----- Modular boolean configurations ----- */

export const TextOnlyAssistantReply: Story = {
  name: 'Text Only Assistant Reply',
  render: () => ({
    template: wrap(`<kpmg-message type="Message reply" headlineText="Financial Performance Summary"
      supportingText="Based on your quarterly financial records, EBITDA grew by 14.2% across North American operations with notable cost optimizations."
      [citationBar]="false" [divider]="false" [secondaryText]="false" [expandIcon]="false"
      [attachmentBar]="false" [mediaBar]="false" [card]="false" [iconBar]="true" />`),
  }),
};

export const TextOnlyUserQuery: Story = {
  name: 'Text Only User Query',
  render: () => ({
    template: wrap(`<kpmg-message type="Message sent" headlineText="Regulatory Inquiry"
      supportingText="Can you please review the compliance disclosure report and flag any cross-border transfer tax anomalies?"
      [divider]="false" [secondaryText]="false" [expandIcon]="false" [attachmentBar]="false" [mediaBar]="false" />`),
  }),
};

export const ReplyWithCitationsOnly: Story = {
  name: 'Reply With Citations Only',
  render: () => ({
    template: wrap(`<kpmg-message type="Message reply" headlineText="Statutory Audit Findings"
      supportingText="Cross-border tax treaties were ratified according to Section 404 guidelines with four major amendment disclosures."
      [citations]="['1','2','3','4']"
      secondaryText="Source treaties indexed from the International Revenue Bulletin Vol. 48 and Treasury Regulation § 1.861-8."
      [expandIcon]="false" [attachmentBar]="false" [mediaBar]="false" [card]="false" />`),
  }),
};

export const ReplyWithAttachmentsOnly: Story = {
  name: 'Reply With Attachments Only',
  render: () => ({
    template: wrap(`<kpmg-message type="Message reply" headlineText="Generated Deliverables"
      supportingText="Here are the generated financial audit statements and balance sheet models for your review:"
      [citationBar]="false" [divider]="false" [secondaryText]="false" [expandIcon]="false"
      [attachments]="['Q3_Consolidated_Balance_Sheet.xlsx', 'Statutory_Tax_Opinion_2026.pdf']"
      [mediaBar]="false" [card]="false" />`),
  }),
};

export const ReplyWithMediaGalleryOnly: Story = {
  name: 'Reply With Media Gallery Only',
  render: () => ({
    props: { mediaCards: threeCards },
    template: wrap(`<kpmg-message type="Message reply" headlineText="Visual Analytics Charts"
      supportingText="Generated chart representations depicting regional branch revenue comparisons over the past three fiscal quarters:"
      [citationBar]="false" [divider]="false" [secondaryText]="false" [expandIcon]="false"
      [attachmentBar]="false" [mediaCards]="mediaCards" [card]="false" />`),
  }),
};

export const ReplyWithWorkflowStatusOnly: Story = {
  name: 'Reply With Workflow Status Only',
  render: () => ({
    props: { statusCard: defaultStatusCardProps },
    template: wrap(`<kpmg-message type="Message reply" headlineText="Agent Automation Pipeline"
      supportingText="Autonomous compliance validation script is executing across ERP databases. Step 4 is validating active security certificates:"
      [citationBar]="false" [divider]="false" [secondaryText]="false" [expandIcon]="false"
      [attachmentBar]="false" [mediaBar]="false" [card]="true" [statusCard]="statusCard" />`),
  }),
};

export const ReplyCardLayout: Story = {
  name: 'Reply Card Layout',
  render: () => ({
    props: { mediaCards: threeCards },
    template: wrap(`<kpmg-message type="Message reply" layout="card" state="Minimized" headlineText="Contained Card Surface"
      supportingText="This message uses the enclosed white bordered card presentation treatment, designed for structured card layouts."
      [citations]="['2','2','2','2']"
      secondaryText="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consecte..."
      [attachments]="['Financial_Model.xlsx']" [mediaCards]="mediaCards" [card]="false" />`),
  }),
};

/* ----- Threads ----- */

export const ConversationThreadDefaultBotFirst: Story = {
  name: 'Conversation Thread Default Bot First',
  render: () => ({ template: wrap('<kpmg-message-thread type="default-bot-first" />', 700) }),
};
export const ConversationThreadCardBotFirst: Story = {
  name: 'Conversation Thread Card Bot First',
  render: () => ({ template: wrap('<kpmg-message-thread type="card-bot-first" />', 700) }),
};
export const ConversationThreadDefaultHumanFirst: Story = {
  name: 'Conversation Thread Default Human First',
  render: () => ({ template: wrap('<kpmg-message-thread type="default-human-first" />', 700) }),
};
export const ConversationThreadCardHumanFirst: Story = {
  name: 'Conversation Thread Card Human First',
  render: () => ({ template: wrap('<kpmg-message-thread type="card-human-first" />', 700) }),
};

/* ----- Atomic subcomponents ----- */

export const ActionIconBar: Story = {
  name: 'Action Icon Bar',
  render: () => ({
    template: `<div style="display: flex; flex-direction: column; gap: 16px; align-items: center">
      <p style="font-size: 13px; color: #9090a2; margin: 0">Interactive 5-action bar featuring Like, Dislike, Speaker, Copy, and Regenerate:</p>
      <kpmg-message-action-icon-bar />
    </div>`,
  }),
};

export const ExpandMinimizeToggleButtons: Story = {
  name: 'Expand Minimize Toggle Buttons',
  render: () => ({
    template: `<div style="display: flex; flex-direction: column; gap: 20px; align-items: center">
      <p style="font-size: 13px; color: #9090a2; margin: 0">Standalone 136x40 rounded pill toggle buttons:</p>
      <div style="display: flex; gap: 24px">
        <div><span style="font-size: 12px; color: #9090a2; display: block; text-align: center; margin-bottom: 8px">Expand (Chevron Down)</span><kpmg-message-expand-button /></div>
        <div><span style="font-size: 12px; color: #9090a2; display: block; text-align: center; margin-bottom: 8px">Minimize (Chevron Up)</span><kpmg-message-minimize-button /></div>
      </div>
    </div>`,
  }),
};

export const MediaCardStateGallery: Story = {
  name: 'Media Card State Gallery',
  render: () => ({
    template: `<div style="display: flex; flex-direction: column; gap: 32px; align-items: center; min-height: 620px; padding: 24px 24px 380px 24px; overflow: visible">
      <p style="font-size: 13px; color: #9090a2; margin: 0; text-align: center">Click any media card to toggle its popover menu.</p>
      <div style="display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap; justify-content: center; width: 100%; overflow: visible">
        <div style="display: flex; flex-direction: column; align-items: center">
          <span style="font-size: 12px; font-weight: 600; color: #454554; margin-bottom: 10px">Enabled (Click to open)</span>
          <div style="width: 172px; position: relative"><kpmg-message-media-card state="enabled" /></div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
          <span style="font-size: 12px; font-weight: 600; color: #454554; margin-bottom: 10px">Disabled</span>
          <div style="width: 172px; position: relative"><kpmg-message-media-card state="disabled" /></div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
          <span style="font-size: 12px; font-weight: 600; color: #454554; margin-bottom: 10px">Left Popover (Active)</span>
          <div style="width: 172px; position: relative"><kpmg-message-media-card state="pressed" [open]="true" orientation="left" /></div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
          <span style="font-size: 12px; font-weight: 600; color: #454554; margin-bottom: 10px">Right Popover (Active)</span>
          <div style="width: 172px; position: relative"><kpmg-message-media-card state="pressed" [open]="true" orientation="right" /></div>
        </div>
      </div>
    </div>`,
  }),
};

export const StandaloneWorkflowStatusCard: Story = {
  name: 'Standalone Workflow Status Card',
  render: () => ({
    props: { p: defaultStatusCardProps },
    template: wrap(`<kpmg-message-status-card [title]="p.title" [header]="p.header" [subhead]="p.subhead"
      [progress]="p.progress" [steps]="p.steps" [code]="p.code" [sources]="p.sources" />`),
  }),
};


