import React from 'react';
import {
  Message,
  MessageChatWindow,
  MessageThread,
  MessageActionIconBar,
  MessageAttachmentCard,
  MessageMediaCard,
  MessageMediaGallery,
  MessageStatusCard,
  MessageExpandButton,
  MessageMinimizeButton,
  MessageThumbsUpIcon,
  MessageThumbsDownIcon,
  MessageSpeakerIcon,
  MessageCopyIcon,
  MessageRegenerateIcon,
  MessageChevronDownIcon,
  MessageChevronUpIcon,
  MessageMoreVerticalIcon,
  MessageStepCheckIcon,
  MessageArrowUpIcon,
  MessageReorderIcon,
  MessageAttachIcon,
  MessageMicIcon,
} from './Message';

export default {
  title: 'Components/Message',
  component: Message,
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
  tags: ['autodocs'],
  argTypes: {
    type: {
      name: 'type',
      description: 'Canonical message type: Message reply (Assistant bot) or Message sent (Human user)',
      control: 'select',
      options: ['Message reply', 'Message sent'],
      table: {
        type: { summary: "'Message reply' | 'Message sent'" },
        defaultValue: { summary: "'Message reply'" },
      },
    },
    state: {
      name: 'state',
      description: 'Collapsible state for secondary content and attachment count: Minimized or Expanded',
      control: 'select',
      options: ['Minimized', 'Expanded'],
      table: {
        type: { summary: "'Minimized' | 'Expanded'" },
        defaultValue: { summary: "'Minimized'" },
      },
    },
    layout: {
      name: 'layout',
      description: 'Surface presentation treatment: Default conversational stream or Card container',
      control: 'select',
      options: ['default', 'card'],
      table: {
        type: { summary: "'default' | 'card'" },
        defaultValue: { summary: "'default'" },
      },
    },
    header: {
      name: 'header',
      description: 'Toggles visibility of the message headline text',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    headlineText: {
      name: 'headlineText',
      description: 'Headline text displayed at the top of the message',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'This headline text'" },
      },
    },
    supporting: {
      name: 'supporting',
      description: 'Toggles visibility of the primary chat body paragraph',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    supportingText: {
      name: 'supportingText',
      description: 'Primary message body paragraph',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.'" },
      },
    },
    citationBar: {
      name: 'citationBar',
      description: 'Toggles visibility of footnote citation badges (Reply only)',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    divider: {
      name: 'divider',
      description: 'Toggles the horizontal separator line between message sections',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    secondaryText: {
      name: 'secondaryText',
      description: 'Toggles or provides secondary contextual text block supporting collapse/expansion',
      control: 'boolean',
      table: {
        type: { summary: 'boolean | string' },
        defaultValue: { summary: 'true' },
      },
    },
    expandIcon: {
      name: 'expandIcon',
      description: 'Toggles the Chevron expand/minimize collapse trigger button',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    attachmentBar: {
      name: 'attachmentBar',
      description: 'Toggles visibility of the attachment card section',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    mediaBar: {
      name: 'mediaBar',
      description: 'Toggles visibility of the 3-image media grid section',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    card: {
      name: 'card',
      description: 'Toggles visibility of the Task cards rich workflow status card (Reply only)',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    iconBar: {
      name: 'iconBar',
      description: 'Toggles visibility of the bottom 5-icon action bar (Reply only)',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

const defaultStatusCardProps = {
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

/* ==========================================================================
   1. BASIC INTERACTIVE PLAYGROUND
   ========================================================================== */
export const Basic = {
  args: {
    type: 'Message reply',
    state: 'Minimized',
    layout: 'default',
    header: true,
    headlineText: 'This headline text',
    supporting: true,
    supportingText: 'More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur.',
    citationBar: true,
    divider: true,
    secondaryText: true,
    expandIcon: true,
    attachmentBar: true,
    mediaBar: true,
    card: true,
    iconBar: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        {...args}
        statusCard={args.card ? defaultStatusCardProps : null}
      />
    </div>
  ),
};

/* ==========================================================================
   2. CHAT ASSISTANT WINDOW (Full Application Interface)
   ========================================================================== */

export const ChatAssistantWindow = {
  name: 'Chat Assistant Window',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
      <MessageChatWindow
        projectHeadline="Project headline"
        inputPlaceholder="Ask me anything"
      />
    </div>
  ),
};

export const ChatAssistantDesktop = {
  name: 'Chat Assistant Desktop',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
      <div style={{ width: '486px' }}>
        <MessageChatWindow
          projectHeadline="Audit Engagement 2026"
          inputPlaceholder="Ask about cross-border compliance..."
        />
      </div>
    </div>
  ),
};

export const ChatAssistantMobile = {
  name: 'Chat Assistant Mobile',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
      <div style={{ width: '360px' }}>
        <MessageChatWindow
          projectHeadline="Tax Review"
          inputPlaceholder="Message..."
        />
      </div>
    </div>
  ),
};

/* ==========================================================================
   3. CANONICAL MESSAGE COMPONENT VARIANTS
   ========================================================================== */

export const MessageReplyMinimized = {
  name: 'Message Reply Minimized',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message reply"
        state="Minimized"
        header={true}
        headlineText="This headline text"
        supporting={true}
        supportingText="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur."
        citationBar={true}
        citations={['2', '2', '2', '2']}
        divider={true}
        secondaryText="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consecte..."
        expandIcon={true}
        attachmentBar={true}
        attachment1={true}
        attachment2={false}
        attachments={['Attachment']}
        mediaBar={true}
        mediaCards={[{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]}
        card={true}
        statusCard={defaultStatusCardProps}
        iconBar={true}
      />
    </div>
  ),
};

export const MessageReplyExpanded = {
  name: 'Message Reply Expanded',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message reply"
        state="Expanded"
        header={true}
        headlineText="This headline text"
        supporting={true}
        supportingText="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur."
        citationBar={true}
        citations={['2', '2', '2', '2']}
        divider={true}
        secondaryText="Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua."
        expandIcon={true}
        attachmentBar={true}
        attachment1={true}
        attachment2={true}
        attachments={['Attachment', 'Attachment']}
        mediaBar={true}
        mediaCards={[{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]}
        card={true}
        statusCard={defaultStatusCardProps}
        iconBar={true}
      />
    </div>
  ),
};

export const MessageSentMinimized = {
  name: 'Message Sent Minimized',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message sent"
        state="Minimized"
        header={true}
        headlineText="This headline text"
        supporting={true}
        supportingText="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur."
        divider={true}
        secondaryText='"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit, sit amet, consectetur adipiscing elit."'
        expandIcon={true}
        attachmentBar={true}
        attachment1={true}
        attachment2={false}
        attachments={['Attachment']}
        mediaBar={true}
        mediaCards={[{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]}
      />
    </div>
  ),
};

export const MessageSentExpanded = {
  name: 'Message Sent Expanded',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message sent"
        state="Expanded"
        header={true}
        headlineText="This headline text"
        supporting={true}
        supportingText="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur."
        divider={true}
        secondaryText='"Secondary text. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit."'
        expandIcon={true}
        attachmentBar={true}
        attachment1={true}
        attachment2={true}
        attachments={['Attachment', 'Attachment']}
        mediaBar={true}
        mediaCards={[{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]}
      />
    </div>
  ),
};

/* ==========================================================================
   4. MODULAR BOOLEAN CONFIGURATIONS (Real-World Variations)
   ========================================================================== */

export const TextOnlyAssistantReply = {
  name: 'Text Only Assistant Reply',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message reply"
        header={true}
        headlineText="Financial Performance Summary"
        supporting={true}
        supportingText="Based on your quarterly financial records, EBITDA grew by 14.2% across North American operations with notable cost optimizations."
        citationBar={false}
        divider={false}
        secondaryText={false}
        expandIcon={false}
        attachmentBar={false}
        mediaBar={false}
        card={false}
        iconBar={true}
      />
    </div>
  ),
};

export const TextOnlyUserQuery = {
  name: 'Text Only User Query',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message sent"
        header={true}
        headlineText="Regulatory Inquiry"
        supporting={true}
        supportingText="Can you please review the compliance disclosure report and flag any cross-border transfer tax anomalies?"
        divider={false}
        secondaryText={false}
        expandIcon={false}
        attachmentBar={false}
        mediaBar={false}
      />
    </div>
  ),
};

export const ReplyWithCitationsOnly = {
  name: 'Reply With Citations Only',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message reply"
        header={true}
        headlineText="Statutory Audit Findings"
        supporting={true}
        supportingText="Cross-border tax treaties were ratified according to Section 404 guidelines with four major amendment disclosures."
        citationBar={true}
        citations={['1', '2', '3', '4']}
        divider={true}
        secondaryText="Source treaties indexed from the International Revenue Bulletin Vol. 48 and Treasury Regulation § 1.861-8."
        expandIcon={false}
        attachmentBar={false}
        mediaBar={false}
        card={false}
        iconBar={true}
      />
    </div>
  ),
};

export const ReplyWithAttachmentsOnly = {
  name: 'Reply With Attachments Only',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message reply"
        header={true}
        headlineText="Generated Deliverables"
        supporting={true}
        supportingText="Here are the generated financial audit statements and balance sheet models for your review:"
        citationBar={false}
        divider={false}
        secondaryText={false}
        expandIcon={false}
        attachmentBar={true}
        attachment1={true}
        attachment2={true}
        attachments={['Q3_Consolidated_Balance_Sheet.xlsx', 'Statutory_Tax_Opinion_2026.pdf']}
        mediaBar={false}
        card={false}
        iconBar={true}
      />
    </div>
  ),
};

export const ReplyWithMediaGalleryOnly = {
  name: 'Reply With Media Gallery Only',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message reply"
        header={true}
        headlineText="Visual Analytics Charts"
        supporting={true}
        supportingText="Generated chart representations depicting regional branch revenue comparisons over the past three fiscal quarters:"
        citationBar={false}
        divider={false}
        secondaryText={false}
        expandIcon={false}
        attachmentBar={false}
        mediaBar={true}
        mediaCards={[{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]}
        card={false}
        iconBar={true}
      />
    </div>
  ),
};

export const ReplyWithWorkflowStatusOnly = {
  name: 'Reply With Workflow Status Only',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message reply"
        header={true}
        headlineText="Agent Automation Pipeline"
        supporting={true}
        supportingText="Autonomous compliance validation script is executing across ERP databases. Step 4 is validating active security certificates:"
        citationBar={false}
        divider={false}
        secondaryText={false}
        expandIcon={false}
        attachmentBar={false}
        mediaBar={false}
        card={true}
        statusCard={defaultStatusCardProps}
        iconBar={true}
      />
    </div>
  ),
};

export const ReplyCardLayout = {
  name: 'Reply Card Layout',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Message
        type="Message reply"
        layout="card"
        state="Minimized"
        header={true}
        headlineText="Contained Card Surface"
        supporting={true}
        supportingText="This message uses the enclosed white bordered card presentation treatment, designed for structured card layouts."
        citationBar={true}
        citations={['2', '2', '2', '2']}
        divider={true}
        secondaryText="More than single line chat message. Lorem ipsum dolor sit amet, labore consectetur adipiscing elit. Lorem ipsum dolor sit amet, labore consecte..."
        expandIcon={true}
        attachmentBar={true}
        attachments={['Financial_Model.xlsx']}
        mediaBar={true}
        mediaCards={[{ state: 'enabled' }, { state: 'enabled' }, { state: 'enabled' }]}
        card={false}
        iconBar={true}
      />
    </div>
  ),
};

/* ==========================================================================
   5. CANONICAL CONVERSATION STREAM THREADS
   ========================================================================== */

export const ConversationThreadDefaultBotFirst = {
  name: 'Conversation Thread Default Bot First',
  render: () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <MessageThread type="default-bot-first" />
    </div>
  ),
};

export const ConversationThreadCardBotFirst = {
  name: 'Conversation Thread Card Bot First',
  render: () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <MessageThread type="card-bot-first" />
    </div>
  ),
};

export const ConversationThreadDefaultHumanFirst = {
  name: 'Conversation Thread Default Human First',
  render: () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <MessageThread type="default-human-first" />
    </div>
  ),
};

export const ConversationThreadCardHumanFirst = {
  name: 'Conversation Thread Card Human First',
  render: () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <MessageThread type="card-human-first" />
    </div>
  ),
};

/* ==========================================================================
   6. ATOMIC SUBCOMPONENTS & MEDIA CARD GALLERY
   ========================================================================== */

export const ActionIconBar = {
  name: 'Action Icon Bar',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <p style={{ fontSize: '13px', color: '#9090a2', margin: 0 }}>
        Interactive 5-action bar featuring Like, Dislike, Speaker, Copy, and Regenerate:
      </p>
      <MessageActionIconBar />
    </div>
  ),
};

export const ExpandMinimizeToggleButtons = {
  name: 'Expand Minimize Toggle Buttons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <p style={{ fontSize: '13px', color: '#9090a2', margin: 0 }}>
        Standalone 136x40 rounded pill toggle buttons:
      </p>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', textAlign: 'center', marginBottom: '8px' }}>
            Expand (Chevron Down)
          </span>
          <MessageExpandButton />
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#9090a2', display: 'block', textAlign: 'center', marginBottom: '8px' }}>
            Minimize (Chevron Up)
          </span>
          <MessageMinimizeButton />
        </div>
      </div>
    </div>
  ),
};

export const MediaCardStateGallery = {
  name: 'Media Card State Gallery',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center',
        minHeight: '620px',
        padding: '24px 24px 380px 24px',
        overflow: 'visible',
      }}
    >
      <p style={{ fontSize: '13px', color: '#9090a2', margin: 0, textAlign: 'center' }}>
        Click any media card to toggle its popover menu. The container is spacious so all dropdowns and items fit smoothly without clipping or scrollbars:
      </p>
      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%',
          overflow: 'visible',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#454554', marginBottom: '10px' }}>
            Enabled (Click to open)
          </span>
          <div style={{ width: '172px', position: 'relative' }}>
            <MessageMediaCard state="enabled" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#454554', marginBottom: '10px' }}>
            Disabled
          </span>
          <div style={{ width: '172px', position: 'relative' }}>
            <MessageMediaCard state="disabled" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#454554', marginBottom: '10px' }}>
            Left Popover (Active)
          </span>
          <div style={{ width: '172px', position: 'relative' }}>
            <MessageMediaCard state="pressed" open={true} orientation="left" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#454554', marginBottom: '10px' }}>
            Right Popover (Active)
          </span>
          <div style={{ width: '172px', position: 'relative' }}>
            <MessageMediaCard state="pressed" open={true} orientation="right" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const StandaloneWorkflowStatusCard = {
  name: 'Standalone Workflow Status Card',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <MessageStatusCard {...defaultStatusCardProps} />
    </div>
  ),
};
