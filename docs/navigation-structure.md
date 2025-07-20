# Navigation Structure

## Navigation Components

### 1. Top Navigation Bar (Navbar)
- **Logo**: Links to role-based dashboard
- **Global Search**: Quick ticket/customer search
- **Notifications**: Bell icon with badge count
- **User Menu**: Avatar with dropdown
- **Role Indicator**: Shows current user role

### 2. Side Navigation (Sidebar)
- **Collapsible**: Can minimize to icons only
- **Role-specific**: Different items per user role
- **Active indicators**: Highlight current page
- **Nested items**: Expandable sub-menus
- **Quick actions**: Bottom section for common tasks

## Role-Based Navigation Items

### Customer Navigation
```
🏠 Dashboard
📋 My Tickets
  └── All Tickets
  └── Open
  └── Resolved
  └── Closed
➕ Create Ticket
📚 Knowledge Base
👤 My Profile
  └── Edit Profile
  └── Change Password
  └── Preferences
💬 Contact Support
```

### Agent Navigation
```
🏠 Dashboard
🎫 Tickets
  └── My Queue
  └── Unassigned
  └── All Tickets
  └── Search
💬 WhatsApp
  └── Active Chats
  └── All Conversations
📊 Reports
  └── My Performance
  └── Team Overview
📚 Resources
  └── Knowledge Base
  └── Canned Responses
  └── Guidelines
⚡ Quick Actions
  └── Create Ticket
  └── Find Customer
```

### Supervisor Navigation
```
🏠 Dashboard
👥 Team Management
  └── Agent List
  └── Workload
  └── Schedules
⚠️ Escalations
  └── Pending
  └── My Escalations
  └── History
📊 Reports
  └── Team Performance
  └── SLA Compliance
  └── Customer Satisfaction
  └── Agent Comparison
✅ Quality Assurance
  └── Review Queue
  └── Completed Reviews
  └── Feedback Given
🎫 All Tickets
  └── Search
  └── Filters
```

### Admin Navigation
```
🏠 Dashboard
👥 User Management
  └── All Users
  └── Roles & Permissions
  └── Access Logs
⚙️ Settings
  └── General
  └── Business Hours
  └── SLA Policies
  └── Categories & Types
  └── Email Templates
  └── WhatsApp Config
  └── Integrations
📊 Analytics
  └── System Overview
  └── Usage Reports
  └── Performance Metrics
  └── Export Data
🔧 System
  └── Logs
  └── Backups
  └── Maintenance
  └── API Settings
```

## Navigation Patterns

### Breadcrumb Navigation
```
Home > Tickets > #12345 - Login Issue
```
- Shows current location
- Clickable parent items
- Mobile: Shortened with "..."

### Tab Navigation (Within Pages)
Used in ticket detail pages:
```
[Overview] [Conversation] [Details] [History] [Files]
```

### Pagination Navigation
```
[First] [Previous] [1] [2] [3] ... [10] [Next] [Last]
Showing 1-20 of 200 results
```

### Filter Navigation
```
Status: [All] [Open] [Pending] [Resolved] [Closed]
Priority: [All] [Low] [Medium] [High] [Urgent]
Assignee: [All] [Me] [Unassigned] [Team]
Date: [Today] [This Week] [This Month] [Custom]
```

## Mobile Navigation

### Hamburger Menu
- Left side drawer
- Full height overlay
- Smooth slide animation
- Backdrop click to close

### Bottom Tab Bar (Mobile App)
```
[Home] [Tickets] [Create] [WhatsApp] [Profile]
```
- Fixed bottom position
- Icon + label
- Active state indication
- Badge support

### Mobile Gestures
- Swipe right: Open drawer
- Swipe left: Close drawer
- Pull down: Refresh
- Long press: Context menu

## Quick Actions

### Floating Action Button (FAB)
- Create new ticket
- Position: Bottom right
- Sub-actions on tap:
  - Create ticket
  - Start WhatsApp chat
  - Search customer

### Command Palette (Ctrl/Cmd + K)
- Global search
- Quick navigation
- Recent items
- Common actions

## Navigation States

### Visual Indicators
- **Active**: Primary color background
- **Hover**: Light background
- **Disabled**: Reduced opacity
- **Badge**: Count indicators
- **New**: Dot indicator

### Loading States
- Skeleton screens
- Progress indicators
- Smooth transitions

## Accessibility Features

### Keyboard Navigation
- Tab through items
- Enter to select
- Arrow keys for menus
- Escape to close

### Screen Reader Support
- Proper ARIA labels
- Role attributes
- Landmark regions
- Skip navigation links

### Focus Management
- Visible focus indicators
- Logical tab order
- Focus trap in modals
- Return focus on close

## Navigation Best Practices

1. **Consistency**: Same navigation across all pages
2. **Clarity**: Clear labels, no jargon
3. **Efficiency**: Maximum 3 clicks to any page
4. **Feedback**: Show current location
5. **Flexibility**: Multiple ways to navigate
6. **Performance**: Lazy load menu items
7. **Responsive**: Adapt to screen size

## Implementation Guidelines

### Component Structure
```javascript
<NavigationProvider>
  <Navbar />
  <div className="flex">
    <Sidebar />
    <main>
      <Breadcrumbs />
      {children}
    </main>
  </div>
</NavigationProvider>
```

### Route Guards
```javascript
<ProtectedRoute role={['agent', 'admin']}>
  <AgentDashboard />
</ProtectedRoute>
```

### Dynamic Menu Items
```javascript
const menuItems = getMenuItemsByRole(user.role);
const filteredItems = filterByPermissions(menuItems, user.permissions);
```

## Performance Optimizations

1. **Code Splitting**: Lazy load route components
2. **Prefetch**: Preload likely next pages
3. **Cache**: Store navigation state
4. **Minimize**: Reduce menu re-renders
5. **Icons**: Use icon fonts or SVG sprites