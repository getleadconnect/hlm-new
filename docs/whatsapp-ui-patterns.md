# WhatsApp Business UI Patterns Analysis

## Overview
This document analyzes WhatsApp Business UI patterns and interactions to inform our integration design. The goal is to create a seamless experience that feels native to WhatsApp users while leveraging business-specific features.

## Core WhatsApp UI Elements

### 1. Chat Interface

#### Message Bubbles
```
Incoming (Customer):
┌─────────────────┐
│ Message text    │ 
│ goes here       │
└─────────────────┘
  9:41 AM

Outgoing (Agent):
                ┌─────────────────┐
                │ Message text    │
                │ goes here    ✓✓ │
                └─────────────────┘
                           9:42 AM
```

**Key Patterns:**
- **Bubble tails** indicate message direction
- **Time stamps** below messages
- **Read receipts** (✓✓) for sent messages
- **Background colors**: Light gray (incoming), Green (outgoing)
- **Max width**: ~75% of screen width
- **Padding**: 8px horizontal, 6px vertical

#### Message Status Indicators
- `🕐` Clock: Sending
- `✓` Single check: Sent
- `✓✓` Double check: Delivered
- `✓✓` Blue double check: Read

### 2. Message Types

#### Text Messages
- Plain text with emoji support
- Links automatically detected and highlighted
- Phone numbers clickable
- Email addresses recognized

#### Media Messages
```
┌─────────────────┐
│  [Image/Video]  │
│                 │
│ Caption text    │
└─────────────────┘
```
- Thumbnail preview
- Download indicator for large files
- Caption below media
- Multiple media in single message (album)

#### Voice Messages
```
┌─────────────────────────┐
│ 🎙️ ▶️ ━━━━━●━━━ 0:45 │
└─────────────────────────┘
```
- Waveform visualization
- Play/pause button
- Duration indicator
- Speed control (1x, 1.5x, 2x)

#### Document Messages
```
┌─────────────────┐
│ 📄 invoice.pdf  │
│    2.4 MB       │
└─────────────────┘
```
- File icon based on type
- File name and size
- Download progress indicator

### 3. WhatsApp Business Specific Features

#### Business Profile
- Business name with verified badge ✓
- Business category
- Business description
- Business hours
- Catalog link
- Website link

#### Quick Replies
```
┌─────────────────────┐
│ Thanks for reaching │
│ out! How can I     │
│ help you today?    │
└─────────────────────┘
┌─────┐ ┌─────────┐ ┌──────┐
│ Sales│ │ Support │ │ Other│
└─────┘ └─────────┘ └──────┘
```
- Up to 3 quick reply buttons
- Button text limit: 20 characters
- Appear below message

#### Catalog Integration
```
┌─────────────────┐
│   [Product]     │
│   Item Name     │
│   $99.99        │
│ View Catalog >  │
└─────────────────┘
```
- Product cards in chat
- Price and description
- Direct catalog links

#### Automated Messages
- Welcome messages
- Away messages
- Quick replies
- Labels for organization

### 4. Chat List View

```
┌─────────────────────────┐
│ John Doe            2:30│
│ Last message preview... │
│                      2  │
├─────────────────────────┤
│ Jane Smith      12:45 PM│
│ ✓✓ Thanks for your help │
│                         │
├─────────────────────────┤
│ Mike Johnson    Yesterday│
│ 📷 Photo               │
│                      1  │
└─────────────────────────┘
```

**Elements:**
- Contact name/number
- Last message preview
- Time/date stamp
- Unread count badge
- Message type indicator
- Read receipt status

### 5. Input Area

```
┌─────────────────────────────┐
│ 😊 │ Type a message...  │ 🎙️ │
└─────────────────────────────┘
     📎  📷                  ➤
```

**Components:**
- Emoji picker
- Text input field
- Voice message button (changes to send when typing)
- Attachment options (expand on tap)
- Camera quick access

### 6. WhatsApp Business API Features

#### Message Templates
- Pre-approved message formats
- Variable placeholders {{1}}, {{2}}
- Header, body, footer structure
- Call-to-action buttons
- Quick reply options

#### Session Messages
- 24-hour window for conversations
- Customer-initiated sessions
- Template messages outside session
- Session expiry notifications

#### Labels
```
🏷️ New Customer
🏷️ Pending Payment
🏷️ VIP
🏷️ Issue Resolved
```
- Color-coded labels
- Multiple labels per chat
- Quick filter by label
- Custom label creation

### 7. Interactive Messages

#### List Messages
```
┌─────────────────────┐
│ Select an option:   │
│                     │
│ [Menu Button ▼]     │
└─────────────────────┘
```
- Header text
- Body text
- Footer text (optional)
- Button with menu indicator
- Up to 10 list items

#### Reply Buttons
```
┌─────────────────────┐
│ Please confirm:     │
│                     │
│ [Yes] [No] [Maybe]  │
└─────────────────────┘
```
- Up to 3 buttons
- Button text limit
- Single selection only

### 8. Status Indicators

#### Contact Status
- Online (shown in header)
- Last seen timestamp
- Typing... indicator
- Recording audio... indicator

#### Business Indicators
- Business account badge
- Response time indicator
- Available/Away status
- Business hours display

### 9. Media Handling

#### Image/Video
- Compression options
- Caption support
- Multi-select gallery
- Edit before sending
- View once option

#### Documents
- File type restrictions
- Size limitations (100MB)
- Preview generation
- Download management

### 10. Search Functionality

```
┌─────────────────────┐
│ 🔍 Search messages  │
└─────────────────────┘
```
- Search within chat
- Global search
- Media/links/docs filter
- Date-based search

## Design Recommendations for Integration

### 1. Maintain WhatsApp Aesthetics
- Use familiar green color (#25D366)
- Keep bubble design consistent
- Preserve message grouping logic
- Match typography (Helvetica Neue/Roboto)

### 2. Enhance Business Features
- Quick ticket creation from chat
- Inline ticket status display
- Agent assignment indicators
- SLA timer integration
- Internal notes (not sent to customer)

### 3. Custom Business Elements
```
┌─────────────────────────┐
│ 🎫 Ticket #1234 Created │
│ Status: Open            │
│ Priority: High          │
└─────────────────────────┘
```

### 4. Agent Interface Additions
- Customer context sidebar
- Previous ticket history
- Suggested responses
- Template insertion
- Translation tools

### 5. Notification Integration
- WhatsApp notification style
- Desktop notifications
- Mobile push notifications
- In-app indicators

### 6. Performance Considerations
- Message pagination
- Lazy loading media
- Offline message queue
- Sync indicators
- Retry mechanisms

## Technical Implementation Notes

### Message Structure
```javascript
{
  id: "message_id",
  type: "text|image|document|audio|video|location",
  from: "phone_number",
  timestamp: "unix_timestamp",
  status: "sent|delivered|read|failed",
  content: {
    text: "message text",
    caption: "media caption",
    media_url: "https://...",
    mime_type: "image/jpeg"
  }
}
```

### Webhook Events
- Message received
- Message status update
- Message deleted
- User typing
- User online status

### API Capabilities
- Send text messages
- Send media messages
- Send template messages
- Send interactive messages
- Manage labels
- Update business profile

## UI Component Mapping

| WhatsApp Element | Our Component | Notes |
|-----------------|---------------|-------|
| Chat Bubble | ChatBubble | Already created |
| Status Indicator | StatusIcon | Use existing icons |
| Quick Reply | Button | Use secondary variant |
| List Message | DropdownMenu | Adapt for WhatsApp |
| Media Preview | Card | With media support |
| Voice Player | Custom | Need to build |
| Labels | Badge | Use ColorBadge |

## Accessibility Considerations

1. **Screen Readers**
   - Announce message sender
   - Read message status
   - Describe media content
   - Navigate by conversation

2. **Keyboard Navigation**
   - Tab through messages
   - Enter to play media
   - Shortcuts for actions
   - Quick reply selection

3. **Visual Accessibility**
   - High contrast mode
   - Larger text option
   - Color blind friendly
   - Focus indicators

## Conclusion

WhatsApp Business provides a rich set of UI patterns and features that we should closely mirror in our integration. The key is maintaining familiarity for users while adding business-specific enhancements that improve agent efficiency and customer service quality.