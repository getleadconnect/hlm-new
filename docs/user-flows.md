# User Flow Diagrams

## Overview
This document outlines the key user flows for the HLM ticket management system. Each flow represents a critical user journey through the application.

## 1. Customer Flows

### 1.1 Submit New Ticket Flow
```
Start → Visit Support Portal
    ↓
Check if Logged In?
    ├─ No → Registration/Login Page
    │       ↓
    │   Create Account or Login
    │       ↓
    └─ Yes → Customer Dashboard
        ↓
    Click "Create New Ticket"
        ↓
    Ticket Form Page
        ├─ Enter Subject
        ├─ Select Category/Type
        ├─ Enter Description
        ├─ Attach Files (optional)
        └─ Set Priority (if allowed)
        ↓
    Submit Ticket
        ↓
    Confirmation Page (Ticket #)
        ↓
    Redirect to Ticket Detail
        ↓
    Can Track Status/Add Comments
```

### 1.2 Check Ticket Status Flow
```
Start → Customer Dashboard
    ↓
View "My Tickets" List
    ├─ Filter by Status
    ├─ Search by Keyword
    └─ Sort by Date/Priority
    ↓
Click on Ticket
    ↓
Ticket Detail Page
    ├─ View Current Status
    ├─ Read Agent Responses
    ├─ View Attachments
    └─ Add New Comment
```

### 1.3 WhatsApp Support Flow
```
Start → Customer sends WhatsApp message
    ↓
Bot/System receives message
    ↓
Check if existing customer?
    ├─ No → Request email/phone
    │       ↓
    │   Create customer profile
    │       ↓
    └─ Yes → Link to profile
        ↓
Create new ticket from message
    ↓
Auto-assign to available agent
    ↓
Agent receives notification
    ↓
Two-way WhatsApp conversation
    ├─ Messages logged to ticket
    └─ Attachments saved
    ↓
Resolution → Close ticket
```

## 2. Agent Flows

### 2.1 Handle New Ticket Flow
```
Start → Agent Dashboard
    ↓
View ticket queue/assigned tickets
    ↓
Click on new ticket
    ↓
Ticket Detail Page
    ├─ Read customer issue
    ├─ View customer history
    ├─ Check similar tickets
    └─ Review attachments
    ↓
Take Action:
    ├─ Reply to customer
    ├─ Change status
    ├─ Set/change priority
    ├─ Assign to other agent
    ├─ Add internal note
    └─ Request more info
    ↓
Update ticket
    ↓
Customer notified
```

### 2.2 WhatsApp Conversation Flow
```
Start → WhatsApp notification received
    ↓
Agent opens WhatsApp interface
    ↓
View conversation thread
    ├─ Customer info sidebar
    ├─ Ticket details
    └─ Previous messages
    ↓
Agent responds via WhatsApp
    ├─ Text message
    ├─ Send attachment
    ├─ Use canned response
    └─ Insert emoji
    ↓
Message sent to customer
    ↓
Logged in ticket history
    ↓
Update ticket status if needed
```

### 2.3 Escalation Flow
```
Start → Agent viewing complex ticket
    ↓
Click "Escalate"
    ↓
Escalation form
    ├─ Select supervisor/team
    ├─ Add escalation reason
    └─ Set urgency level
    ↓
Submit escalation
    ↓
Supervisor notified
    ↓
Ticket reassigned
    ↓
Original agent notified
```

## 3. Supervisor Flows

### 3.1 Monitor Team Performance Flow
```
Start → Supervisor Dashboard
    ↓
View team metrics
    ├─ Open tickets by agent
    ├─ Average response time
    ├─ Resolution rate
    └─ Customer satisfaction
    ↓
Click on agent name
    ↓
Agent detail view
    ├─ Current workload
    ├─ Recent tickets
    └─ Performance trends
    ↓
Take action:
    ├─ Reassign tickets
    ├─ Send feedback
    └─ Schedule training
```

### 3.2 Handle Escalated Tickets Flow
```
Start → Escalation notification
    ↓
Review escalated ticket
    ├─ Original issue
    ├─ Agent's notes
    └─ Escalation reason
    ↓
Decision:
    ├─ Handle personally
    ├─ Assign to senior agent
    ├─ Return with guidance
    └─ Escalate to admin
    ↓
Take appropriate action
    ↓
Update all parties
```

## 4. Admin Flows

### 4.1 System Configuration Flow
```
Start → Admin Dashboard
    ↓
Settings Menu
    ├─ Business Hours
    ├─ SLA Policies
    ├─ Ticket Categories
    ├─ Email Templates
    └─ WhatsApp Config
    ↓
Select configuration area
    ↓
Make changes
    ↓
Preview impact
    ↓
Save changes
    ↓
System updated
```

### 4.2 User Management Flow
```
Start → User Management
    ↓
View users list
    ├─ Filter by role
    ├─ Search by name
    └─ Sort by status
    ↓
Select action:
    ├─ Add new user
    │   ├─ Enter details
    │   ├─ Assign role
    │   └─ Set permissions
    ├─ Edit user
    │   ├─ Update info
    │   ├─ Change role
    │   └─ Reset password
    └─ Deactivate user
    ↓
Confirm action
    ↓
User notified (if applicable)
```

## 5. Critical Path Flows

### 5.1 Emergency Ticket Flow
```
Start → Urgent ticket created
    ↓
System detects "urgent" priority
    ↓
Immediate notifications:
    ├─ Available agents
    ├─ Supervisor
    └─ SMS/Push alerts
    ↓
First responder claims ticket
    ↓
15-minute SLA timer starts
    ↓
Agent responds
    ↓
Escalate if unresolved in 1 hour
```

### 5.2 Ticket Resolution Flow
```
Agent marks ticket "Resolved"
    ↓
Customer notified
    ↓
24-hour waiting period
    ↓
Customer can:
    ├─ Confirm resolution → Close
    ├─ Reopen with comment
    └─ No action → Auto-close
    ↓
If reopened:
    ├─ Return to original agent
    └─ Escalate if reopened 2+ times
```

## Flow Design Principles

1. **Minimize Steps**: Each flow should have the minimum steps necessary
2. **Clear Decision Points**: Yes/No branches should be obvious
3. **Error Handling**: Each flow should handle errors gracefully
4. **Notifications**: Keep all parties informed at key points
5. **Mobile First**: Flows should work on mobile devices
6. **WhatsApp Integration**: Seamless transition between WhatsApp and web

## Technical Considerations

- **Authentication**: Required at entry points
- **Permissions**: Role-based access throughout flows
- **Data Validation**: At each input step
- **Auto-save**: For long forms/conversations
- **Offline Handling**: Queue actions when offline
- **Analytics Tracking**: Log key flow points

## Next Steps

1. Create wireframes for each major flow
2. Design error states and edge cases
3. Plan notification touchpoints
4. Map data requirements for each step
5. Identify automation opportunities