# project.md - Customer Support Ticket Management System

## Project Overview
A comprehensive customer support ticket management system similar to Freshdesk/Zoho Desk, with WhatsApp Business API as the primary communication channel. The system will handle ticket creation, assignment, tracking, and resolution with robust reporting capabilities.

## Project Timeline
- **Phase 1**: Design & Planning (Weeks 1-4)
- **Phase 2**: Frontend Development (Weeks 5-8)
- **Phase 3**: Backend Development (Weeks 9-12)
- **Phase 4**: Integration & Testing (Weeks 13-14)
- **Phase 5**: Deployment & Launch (Weeks 15-16)

---

## System Architecture

### User Roles & Permissions

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Customer** | End users submitting tickets | Create tickets, view own tickets, access knowledge base |
| **Agent** | Support staff handling tickets | Manage assigned tickets, use canned responses, view reports |
| **Supervisor** | Team leads managing agents | Reassign tickets, view team analytics, handle escalations |
| **Admin** | System administrators | Full system access, configuration, user management |

### Core Modules

#### 1. Ticket Management System
- **Ticket Lifecycle**: New → Open → Pending → Resolved → Closed
- **Priority Levels**: Low, Medium, High, Urgent
- **Assignment**: Manual and automatic (rule-based)
- **Categories & Tags**: Hierarchical categorization
- **Merge & Split**: Handle related/duplicate tickets
- **Attachments**: File uploads with preview

#### 2. Communication Channels
- **Primary**: WhatsApp Business API
- **Secondary**: Email integration
- **Future**: Social media integration
- **No Live Chat**: Excluded from current scope

#### 3. WhatsApp Integration
- **Inbound**: Auto-ticket creation from messages
- **Outbound**: Template messages, quick replies
- **Media Support**: Images, documents, voice notes
- **Delivery Tracking**: Read receipts, delivery status
- **Business Hours**: Auto-responders

#### 4. Customer Portal
- Self-service ticket submission
- Ticket tracking and history
- Knowledge base access
- Profile management
- WhatsApp number verification

#### 5. Agent Workspace
- Unified ticket queue
- Quick actions and shortcuts
- Canned responses library
- Performance dashboard
- WhatsApp conversation view

#### 6. Analytics & Reporting
- Real-time dashboards
- SLA compliance tracking
- Agent performance metrics
- Customer satisfaction scores
- WhatsApp message analytics

---

## Detailed Page Structure

### Public Pages
```
/                           # Landing page
/login                      # Authentication (Customers & Agents)
/register                   # Customer registration
/forgot-password            # Password recovery
/help                       # Public knowledge base
/help/article/:id           # Knowledge base article
/help/search                # KB search results
```

### Customer Portal (`/portal`)
```
/portal/dashboard           # Customer overview
/portal/tickets             # Ticket list with filters
/portal/tickets/new         # Create new ticket
/portal/tickets/:id         # Ticket detail view
/portal/profile             # Profile & preferences
/portal/profile/whatsapp    # WhatsApp verification
```

### Agent Portal (`/agent`)
```
/agent/dashboard            # Agent performance overview
/agent/tickets              # Ticket queue (list/kanban)
/agent/tickets/:id          # Comprehensive ticket detail
/agent/tickets/search       # Advanced search
/agent/whatsapp            # WhatsApp conversations
/agent/whatsapp/:phone     # Specific conversation
/agent/reports             # Personal performance
/agent/canned-responses    # Response templates
/agent/settings            # Agent preferences
```

### Supervisor Portal (`/supervisor`)
```
/supervisor/dashboard       # Team overview
/supervisor/tickets        # All team tickets
/supervisor/assignments    # Reassignment interface
/supervisor/escalations    # Escalated tickets
/supervisor/agents         # Agent management
/supervisor/reports        # Team analytics
```

### Admin Portal (`/admin`)
```
/admin/dashboard           # System overview
/admin/users              # User management
/admin/users/roles        # Role & permission management
/admin/teams              # Team structure
/admin/departments        # Department management

/admin/tickets            # Global ticket view
/admin/tickets/analytics  # Ticket analytics
/admin/tickets/sla        # SLA policies

/admin/whatsapp           # WhatsApp configuration
/admin/whatsapp/config    # API settings
/admin/whatsapp/templates # Message templates
/admin/whatsapp/logs      # Message logs
/admin/whatsapp/numbers   # Phone number management

/admin/workflows          # Automation rules
/admin/workflows/new      # Create workflow
/admin/workflows/:id      # Edit workflow

/admin/settings           # System settings
/admin/settings/email     # Email configuration
/admin/settings/business  # Business hours
/admin/settings/security  # Security settings
```

---

## Ticket Detail Page Specification

### Layout Structure
The ticket detail page (`/agent/tickets/:id`) is the core of the agent experience:

#### Header Section
- Ticket ID (e.g., #TKT-2024-001)
- Subject line (editable by agents)
- Priority indicator with color coding
- Status dropdown for quick updates
- Action buttons: Assign, Merge, Print, Delete
- Created timestamp and last updated

#### Main Content (Two-Column Layout)

**Left Column - Conversation Thread (60%)**
- Chronological message display
- Customer messages (left-aligned)
- Agent responses (right-aligned)
- System events (centered, muted)
- WhatsApp message indicators
- Attachment previews
- Message timestamps
- Reply box with:
  - Rich text editor
  - Attachment button
  - Template selector
  - Send via WhatsApp/Email toggle
  - Internal note option

**Right Column - Ticket Information (40%)**

1. **Customer Card**
   - Avatar/Profile picture
   - Full name (editable)
   - Email address
   - WhatsApp number (verified badge)
   - Location/Timezone
   - Customer since date
   - Total tickets: X
   - Quick actions: View all tickets, Block/Unblock

2. **Ticket Properties**
   - Type dropdown
   - Category (hierarchical)
   - Tags (add/remove)
   - Priority selector
   - Department assignment
   - Source icon (WhatsApp/Email/Portal)
   - Custom fields

3. **Assignment Section**
   - Current assignee (avatar + name)
   - Assign button
   - Assignment history:
     - Previous agents
     - Assignment timestamps
     - Time spent per agent
     - Transfer reasons

4. **Activity Timeline**
   - Status changes
   - Assignments
   - Priority changes
   - SLA events
   - Escalations
   - Internal notes
   - Related tickets
   - Merged tickets

5. **SLA Tracker**
   - First response time
   - Resolution time
   - Current SLA status
   - Time remaining

#### Bottom Action Bar
- Primary: Send & Close
- Secondary: Send & Keep Open
- Other: Save Draft, Add Note, More Options

---

## WhatsApp Integration Details

### Configuration Requirements
- WhatsApp Business API access
- Verified business account
- Phone number verification
- Webhook configuration
- Template message approval

### Message Flow
1. **Incoming Messages**
   - Webhook receives message
   - Check for existing ticket
   - Create new or append to existing
   - Auto-assign based on rules
   - Send acknowledgment

2. **Outgoing Messages**
   - Agent composes response
   - Select template if outside 24hr window
   - Add personalization
   - Send via API
   - Track delivery status

### WhatsApp-Specific Features
- Template message library
- Quick reply buttons
- Media handling (10MB limit)
- Session management (24-hour window)
- Opt-in/Opt-out management
- Business profile integration

---

## Database Schema Overview

### Core Tables
- `users` - All system users
- `tickets` - Main ticket data
- `ticket_messages` - Conversation history
- `ticket_assignments` - Assignment tracking
- `ticket_status_history` - Status changes
- `customers` - Customer profiles
- `agents` - Agent-specific data
- `teams` - Team structure
- `departments` - Department organization
- `whatsapp_conversations` - WhatsApp session tracking
- `whatsapp_templates` - Approved templates
- `attachments` - File storage references
- `canned_responses` - Response templates
- `workflows` - Automation rules
- `sla_policies` - SLA configurations

---

## Design System Guidelines

### UI Components (using shadcn/ui)
- **Color Scheme**
  - Primary: Blue (#3B82F6)
  - Success: Green (#10B981)
  - Warning: Amber (#F59E0B)
  - Danger: Red (#EF4444)
  - Priority colors: Low (Gray), Medium (Blue), High (Orange), Urgent (Red)

- **Typography**
  - Headers: Inter/System font
  - Body: Inter/System font
  - Monospace: Source Code Pro (ticket IDs)

- **Component Library**
  - Cards for ticket items
  - Tables for lists
  - Modals for quick actions
  - Toast notifications
  - Skeleton loaders
  - Status badges
  - Priority indicators

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly interfaces
- Collapsible sidebars
- Stacked layouts on mobile

---

## Performance Requirements

### Response Times
- Page load: < 2 seconds
- API responses: < 500ms
- Search results: < 1 second
- Real-time updates: < 100ms

### Scalability
- Support 10,000+ tickets/month
- Handle 100+ concurrent agents
- WhatsApp message queue processing
- Horizontal scaling capability

### Caching Strategy
- Redis for session management
- API response caching
- Static asset CDN
- Database query optimization

---

## Security Considerations

### Authentication & Authorization
- Multi-factor authentication
- Role-based access control
- API token management
- Session timeout policies

### Data Protection
- Encryption at rest
- HTTPS enforcement
- GDPR compliance
- Data retention policies
- Audit logging

### WhatsApp Security
- Webhook signature verification
- Message encryption
- Secure token storage
- Rate limiting

---

## Development Phases

### Phase 1: Design (Current)
- [x] Project planning
- [x] Information architecture
- [ ] Wireframes creation
- [ ] UI/UX design
- [ ] Design system setup
- [ ] Prototype development

### Phase 2: Frontend Development
- [ ] Setup React project structure
- [ ] Implement routing
- [ ] Create component library
- [ ] Build customer portal
- [ ] Build agent interface
- [ ] Build admin panel
- [ ] Responsive design implementation

### Phase 3: Backend Development
- [ ] Database design
- [ ] API architecture
- [ ] Authentication system
- [ ] Ticket management APIs
- [ ] WhatsApp integration
- [ ] Workflow engine
- [ ] Reporting system

### Phase 4: Integration
- [ ] Frontend-Backend integration
- [ ] WhatsApp API integration
- [ ] Email service integration
- [ ] Real-time updates (WebSockets)
- [ ] File upload system

### Phase 5: Testing & Deployment
- [ ] Unit testing
- [ ] Integration testing
- [ ] Performance testing
- [ ] Security audit
- [ ] Deployment setup
- [ ] Documentation
- [ ] Training materials

---

## Success Metrics

### Key Performance Indicators
- Average first response time < 2 hours
- Average resolution time < 24 hours
- Customer satisfaction score > 85%
- Agent productivity: 50+ tickets/day
- System uptime: 99.9%

### Business Goals
- Reduce support costs by 30%
- Improve customer satisfaction
- Scale support operations
- Enable data-driven decisions

---

## Future Enhancements

### Phase 2 Features
- AI-powered ticket categorization
- Sentiment analysis
- Predictive routing
- Advanced analytics dashboard
- Mobile applications
- Voice call integration
- Social media channels

### Long-term Vision
- Multi-language support
- AI chatbot integration
- Video support sessions
- Community forums
- Self-service automation
- Advanced reporting APIs

---

## Notes
- This document is the source of truth for project planning
- Updates should be reflected in tasks.md for execution
- Daily progress tracked in status.md
- Technical decisions documented in CLAUDE.md