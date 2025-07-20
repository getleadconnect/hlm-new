# Site Map - HLM Ticket Management System

## Structure Overview

```
/
├── Public Pages
│   ├── Landing Page (/)
│   ├── Login (/login)
│   ├── Register (/register)
│   ├── Forgot Password (/forgot-password)
│   ├── Reset Password (/reset-password/:token)
│   └── Knowledge Base (/kb)
│       ├── Categories (/kb/categories)
│       ├── Article (/kb/article/:id)
│       └── Search Results (/kb/search)
│
├── Customer Portal (/customer)
│   ├── Dashboard (/customer/dashboard)
│   ├── Tickets (/customer/tickets)
│   │   ├── My Tickets List (/customer/tickets)
│   │   ├── Create Ticket (/customer/tickets/new)
│   │   └── Ticket Detail (/customer/tickets/:id)
│   ├── Profile (/customer/profile)
│   │   ├── Edit Profile (/customer/profile/edit)
│   │   └── Change Password (/customer/profile/password)
│   └── Help (/customer/help)
│
├── Agent Portal (/agent)
│   ├── Dashboard (/agent/dashboard)
│   ├── Tickets (/agent/tickets)
│   │   ├── Queue View (/agent/tickets/queue)
│   │   ├── My Tickets (/agent/tickets/assigned)
│   │   ├── Ticket Detail (/agent/tickets/:id)
│   │   └── Search (/agent/tickets/search)
│   ├── WhatsApp (/agent/whatsapp)
│   │   ├── Conversations (/agent/whatsapp/conversations)
│   │   └── Chat View (/agent/whatsapp/chat/:id)
│   ├── Reports (/agent/reports)
│   │   ├── My Performance (/agent/reports/performance)
│   │   └── Team Stats (/agent/reports/team)
│   ├── Knowledge Base (/agent/kb)
│   │   ├── Internal Articles (/agent/kb/internal)
│   │   └── Canned Responses (/agent/kb/responses)
│   └── Profile (/agent/profile)
│
├── Supervisor Portal (/supervisor)
│   ├── Dashboard (/supervisor/dashboard)
│   ├── Team Management (/supervisor/team)
│   │   ├── Agents List (/supervisor/team/agents)
│   │   ├── Agent Profile (/supervisor/team/agent/:id)
│   │   └── Workload View (/supervisor/team/workload)
│   ├── Escalations (/supervisor/escalations)
│   │   ├── Pending (/supervisor/escalations/pending)
│   │   └── History (/supervisor/escalations/history)
│   ├── Reports (/supervisor/reports)
│   │   ├── Team Performance (/supervisor/reports/performance)
│   │   ├── SLA Compliance (/supervisor/reports/sla)
│   │   └── Customer Satisfaction (/supervisor/reports/csat)
│   └── Quality Assurance (/supervisor/qa)
│       ├── Review Queue (/supervisor/qa/queue)
│       └── Feedback History (/supervisor/qa/feedback)
│
└── Admin Portal (/admin)
    ├── Dashboard (/admin/dashboard)
    ├── Users (/admin/users)
    │   ├── All Users (/admin/users)
    │   ├── Create User (/admin/users/new)
    │   ├── Edit User (/admin/users/:id/edit)
    │   └── Roles & Permissions (/admin/users/roles)
    ├── Settings (/admin/settings)
    │   ├── General (/admin/settings/general)
    │   ├── Business Hours (/admin/settings/hours)
    │   ├── SLA Policies (/admin/settings/sla)
    │   ├── Ticket Categories (/admin/settings/categories)
    │   ├── Email Templates (/admin/settings/emails)
    │   ├── WhatsApp Config (/admin/settings/whatsapp)
    │   └── Integrations (/admin/settings/integrations)
    ├── Reports (/admin/reports)
    │   ├── System Overview (/admin/reports/overview)
    │   ├── Analytics (/admin/reports/analytics)
    │   └── Export Data (/admin/reports/export)
    └── System (/admin/system)
        ├── Logs (/admin/system/logs)
        ├── Backups (/admin/system/backups)
        └── Maintenance (/admin/system/maintenance)
```

## Page Details

### Public Pages

#### Landing Page (/)
- Marketing content
- Feature highlights
- Login/Register CTAs
- Knowledge base link

#### Authentication Pages
- **Login**: Email/password, remember me, social login options
- **Register**: Name, email, password, company (optional)
- **Forgot Password**: Email input for reset link
- **Reset Password**: New password form with token validation

#### Knowledge Base
- **Categories**: Grid/list of help categories
- **Article View**: Full article with related articles
- **Search**: Full-text search with filters

### Customer Portal

#### Dashboard
- Recent tickets summary
- Quick actions (new ticket, view all)
- Announcements/notifications
- Knowledge base shortcuts

#### Tickets Section
- **List View**: Table with filters, search, pagination
- **Create Ticket**: Multi-step form with file upload
- **Ticket Detail**: Full conversation, status, actions

#### Profile
- View/edit personal information
- Change password
- Notification preferences

### Agent Portal

#### Dashboard
- Assigned tickets count
- SLA warnings
- Recent activity
- Quick stats

#### Tickets Management
- **Queue View**: Unassigned tickets pool
- **My Tickets**: Personal workload
- **Ticket Detail**: Full view with all actions
- **Search**: Advanced search across all tickets

#### WhatsApp Integration
- **Conversations**: Active WhatsApp threads
- **Chat View**: Real-time messaging interface

#### Reports
- Personal performance metrics
- Team comparison
- Goal tracking

### Supervisor Portal

#### Dashboard
- Team overview
- Escalation alerts
- Performance summary
- SLA status

#### Team Management
- Agent list with status
- Individual agent views
- Workload distribution
- Reassignment tools

#### Quality Assurance
- Random ticket reviews
- Feedback system
- Training recommendations

### Admin Portal

#### Dashboard
- System health
- Usage statistics
- Critical alerts
- Quick actions

#### User Management
- CRUD operations for users
- Role assignment
- Bulk operations
- Access logs

#### System Settings
- Business configuration
- Communication templates
- Automation rules
- Integration setup

## Navigation Structure

### Primary Navigation (Role-based)

#### Customer
- Dashboard
- My Tickets
- Create Ticket
- Knowledge Base
- Profile

#### Agent
- Dashboard
- Tickets
- WhatsApp
- Reports
- Knowledge Base

#### Supervisor
- Dashboard
- Team
- Escalations
- Reports
- QA

#### Admin
- Dashboard
- Users
- Settings
- Reports
- System

### Secondary Navigation
- Notifications (bell icon)
- User menu (avatar dropdown)
- Search (global search bar)
- Help (context-sensitive)

## Mobile Considerations

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile-Specific Features
- Simplified navigation (hamburger menu)
- Touch-optimized controls
- Swipe actions for tickets
- Native app deep linking
- Push notifications

## URL Structure Guidelines

1. **RESTful patterns**: Use standard REST conventions
2. **Readable URLs**: Human-friendly paths
3. **Consistent naming**: Plural for collections, singular for items
4. **Hierarchical**: Reflect information architecture
5. **SEO-friendly**: For public pages only

## Access Control Matrix

| Page/Section | Guest | Customer | Agent | Supervisor | Admin |
|--------------|-------|----------|-------|------------|-------|
| Public Pages | ✓ | ✓ | ✓ | ✓ | ✓ |
| Customer Portal | - | ✓ | View | View | ✓ |
| Agent Portal | - | - | ✓ | ✓ | ✓ |
| Supervisor Portal | - | - | - | ✓ | ✓ |
| Admin Portal | - | - | - | - | ✓ |

## Technical Implementation Notes

1. **Authentication**: JWT tokens with refresh mechanism
2. **Authorization**: Role-based with granular permissions
3. **State Management**: Redux/Context for complex states
4. **Routing**: React Router with protected routes
5. **Data Loading**: Lazy loading for performance
6. **Caching**: Strategic caching for static content