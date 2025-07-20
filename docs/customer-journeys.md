# Customer Journey Maps - HLM Ticket Management System

## Overview
These journey maps detail the end-to-end experience of customers interacting with our support system, highlighting touchpoints, emotions, and opportunities for improvement.

---

## Journey 1: Submit Support Ticket via WhatsApp

### Scenario
Sarah needs help with a billing issue affecting her marketing campaign budget.

### Journey Stages

#### 1. Problem Recognition
**Touchpoints**: Invoice email, accounting software
**Actions**: 
- Notices incorrect charge on invoice
- Tries to understand the issue herself
- Decides she needs support

**Emotions**: 😟 Confused, slightly frustrated
**Thoughts**: "Why was I charged extra? I need to fix this quickly."

#### 2. Seek Support
**Touchpoints**: Company website, WhatsApp
**Actions**:
- Looks for support contact on website
- Finds WhatsApp support number
- Opens WhatsApp and saves number
- Sends first message

**Emotions**: 😊 Relieved to find WhatsApp option
**Thoughts**: "Great, I can use WhatsApp instead of calling!"

#### 3. Initial Contact
**Touchpoints**: WhatsApp Business chat
**Actions**:
- Receives automated welcome message
- Sees quick reply options
- Selects "Billing Issue"
- Types problem description
- Attaches invoice screenshot

**Emotions**: 😌 Hopeful
**Thoughts**: "The automated response was quick. Hope a real person responds soon."

```
Customer: "Hi, I have a billing issue"
Bot: "Hello! Thanks for contacting support. Please select your issue type:"
[Billing] [Technical] [Other]
Customer: [Taps Billing]
Bot: "I'll connect you with our billing team. Please describe your issue:"
Customer: "I was charged $299 instead of $199 for my plan. See attached invoice."
```

#### 4. Ticket Creation
**Touchpoints**: Support system (backend), WhatsApp
**Actions**:
- System creates ticket automatically
- Receives ticket number
- Gets estimated response time

**Emotions**: 😊 Satisfied with quick acknowledgment
**Thoughts**: "Good, they've logged my issue. Ticket #1234."

#### 5. Agent Response
**Touchpoints**: WhatsApp chat
**Actions**:
- Receives notification of agent response
- Reads agent's message
- Provides additional information
- Continues conversation

**Emotions**: 😃 Happy with personal response
**Thoughts**: "James seems knowledgeable. He's asking the right questions."

```
Agent: "Hi Sarah, I'm James from billing support. I see the charge discrepancy. Let me check your account."
Customer: "Thank you! I need this resolved before my monthly report."
Agent: "I understand the urgency. I can see the issue - you were accidentally charged for the premium plan. I'll process a refund now."
```

#### 6. Resolution
**Touchpoints**: WhatsApp, Email (refund confirmation)
**Actions**:
- Receives solution explanation
- Gets refund confirmation
- Rates the service
- Saves conversation

**Emotions**: 😄 Very satisfied
**Thoughts**: "That was so easy! Much better than phone support."

#### 7. Follow-up
**Touchpoints**: WhatsApp, Email
**Actions**:
- Receives follow-up message
- Confirms issue is resolved
- Gets survey link (optional)

**Emotions**: 😊 Impressed with service
**Thoughts**: "They actually followed up. I'll definitely use this again."

### Pain Points & Opportunities

| Pain Point | Opportunity |
|------------|-------------|
| Finding correct WhatsApp number | Add WhatsApp QR code to all touchpoints |
| Uncertainty about response time | Show real-time queue position |
| Repeating information | Pre-populate customer data |
| No visibility of refund status | Send proactive updates |

---

## Journey 2: Track Existing Ticket Status

### Scenario
Sarah submitted a ticket yesterday and wants to check its progress.

### Journey Stages

#### 1. Remember Ticket
**Touchpoints**: Email, memory
**Actions**:
- Recalls submitting ticket
- Looks for ticket number
- Checks email for confirmation

**Emotions**: 🤔 Curious, slightly anxious
**Thoughts**: "I wonder if they've made progress on my issue."

#### 2. Access Support Channel
**Touchpoints**: WhatsApp, Web portal
**Actions**:
- Opens WhatsApp conversation
- Scrolls to find ticket number
- OR visits web portal
- Logs in to account

**Emotions**: 😐 Neutral
**Thoughts**: "Should I message them again or check online?"

#### 3. Check Status (WhatsApp)
**Touchpoints**: WhatsApp chat
**Actions**:
- Types "Status of ticket #1234"
- Receives automated status update
- Sees last agent update
- Views estimated resolution time

**Emotions**: 😊 Satisfied with quick response
**Thoughts**: "Good, it's being worked on."

```
Customer: "Hi, can I check the status of ticket #1234?"
Bot: "Ticket #1234 Status: In Progress 
Last Update: Agent working on configuration (2 hours ago)
Estimated Resolution: Today by 5 PM"
```

#### 4. Check Status (Web Portal)
**Touchpoints**: Customer portal
**Actions**:
- Navigates to "My Tickets"
- Finds ticket in list
- Clicks for details
- Reads status and updates

**Emotions**: 😌 Informed
**Thoughts**: "Nice to see all the details and timeline."

#### 5. Additional Action
**Touchpoints**: WhatsApp or portal
**Actions**:
- Adds comment if needed
- Uploads additional files
- Changes priority (if allowed)
- Requests escalation

**Emotions**: 😊 Empowered
**Thoughts**: "I can add more info without creating a new ticket."

### Pain Points & Opportunities

| Pain Point | Opportunity |
|------------|-------------|
| Finding old ticket number | Auto-suggest recent tickets |
| Switching between channels | Unified view across channels |
| No proactive updates | Push notifications for status changes |
| Limited self-service options | Add more customer controls |

---

## Journey 3: Escalate Urgent Issue

### Scenario
Sarah's entire website is down, affecting active marketing campaigns.

### Journey Stages

#### 1. Crisis Recognition
**Touchpoints**: Website, monitoring tools
**Actions**:
- Discovers website is down
- Checks if it's widespread
- Realizes revenue impact

**Emotions**: 😱 Panicked, stressed
**Thoughts**: "This is costing us money every minute!"

#### 2. Urgent Support Contact
**Touchpoints**: WhatsApp
**Actions**:
- Opens WhatsApp immediately
- Types "URGENT: Website down"
- Sends multiple messages
- Attaches error screenshots

**Emotions**: 😰 Very anxious
**Thoughts**: "I need help NOW!"

#### 3. Priority Recognition
**Touchpoints**: Support system, WhatsApp
**Actions**:
- System detects urgency keywords
- Auto-escalates to priority queue
- Receives immediate acknowledgment
- Gets direct agent assignment

**Emotions**: 😌 Slightly relieved
**Thoughts**: "OK, they understand this is urgent."

```
Customer: "URGENT: Our entire website is down! This is critical!"
Bot: "I've marked this as URGENT. An agent will respond within 5 minutes."
Agent (2 min later): "Hi Sarah, I'm escalating this to our technical team immediately. Can you share your website URL?"
```

#### 4. Real-time Support
**Touchpoints**: WhatsApp, Phone (if needed)
**Actions**:
- Engages in rapid message exchange
- Shares technical details
- Accepts phone call if offered
- Follows troubleshooting steps

**Emotions**: 😟 Anxious but hopeful
**Thoughts**: "They're taking this seriously. Good response time."

#### 5. Resolution & Recovery
**Touchpoints**: WhatsApp, Email, Monitoring
**Actions**:
- Receives fix confirmation
- Verifies website is working
- Gets incident report
- Discusses prevention

**Emotions**: 😅 Relieved, grateful
**Thoughts**: "Crisis averted. They handled that well."

### Pain Points & Opportunities

| Pain Point | Opportunity |
|------------|-------------|
| Manual urgency declaration | Auto-detect critical issues |
| Anxiety during wait | Real-time queue position |
| Context switching to phone | Screen sharing in app |
| Post-incident communication | Automated incident reports |

---

## Journey 4: Self-Service Knowledge Search

### Scenario
Sarah wants to learn how to set up team accounts without contacting support.

### Journey Stages

#### 1. Information Need
**Touchpoints**: Product interface
**Actions**:
- Tries to add team member
- Gets confused by options
- Decides to find help

**Emotions**: 🤔 Curious
**Thoughts**: "There must be a guide for this."

#### 2. Search for Help
**Touchpoints**: Help center, WhatsApp
**Actions**:
- Clicks help icon in product
- Searches knowledge base
- OR messages WhatsApp
- Gets automated suggestions

**Emotions**: 😊 Optimistic
**Thoughts**: "Let me try to figure this out myself first."

#### 3. Find Solution
**Touchpoints**: Knowledge base article
**Actions**:
- Reads step-by-step guide
- Views screenshots
- Watches video tutorial
- Follows instructions

**Emotions**: 😃 Satisfied
**Thoughts**: "This is exactly what I needed!"

#### 4. Apply Solution
**Touchpoints**: Product interface
**Actions**:
- Returns to product
- Applies learned steps
- Successfully adds team member
- Bookmarks article

**Emotions**: 😄 Accomplished
**Thoughts**: "I did it myself! That saves time."

### Pain Points & Opportunities

| Pain Point | Opportunity |
|------------|-------------|
| Finding relevant articles | AI-powered search |
| Outdated documentation | Version-specific guides |
| No interactive help | In-app tutorials |
| Can't save for later | Personal knowledge library |

---

## Key Insights Across All Journeys

### Emotional Patterns
1. **Initial Contact**: Anxiety → Relief (when WhatsApp available)
2. **Waiting**: Uncertainty → Satisfaction (with updates)
3. **Resolution**: Relief → Loyalty (with good service)

### Critical Moments
1. First response time
2. Issue acknowledgment
3. Resolution communication
4. Follow-up interaction

### Channel Preferences
- **WhatsApp**: For urgent issues, quick questions
- **Web Portal**: For detailed history, documentation
- **Email**: For confirmations, records

### Success Factors
1. Response speed
2. Channel consistency
3. Proactive communication
4. Easy escalation
5. Self-service options

## Design Recommendations

### Improve Onboarding
- Clear WhatsApp QR codes
- Set expectations upfront
- Educate on self-service

### Enhance Communication
- Real-time status updates
- Proactive notifications
- Context preservation

### Empower Customers
- More self-service options
- Ticket control features
- Transparent processes

### Reduce Friction
- Smart routing
- Auto-categorization
- Suggested solutions

These journey maps should guide our design decisions to create a support experience that anticipates and addresses customer needs at every stage.