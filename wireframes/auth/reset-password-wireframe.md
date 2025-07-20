# Reset Password Page Wireframe

## Overview
The reset password page allows users to create a new password after verification through email link or WhatsApp code.

## Layout Structure

```
+----------------------------------------------------------+
|                      Header (80px)                        |
|  [Logo]                                    [Help] [Login] |
+----------------------------------------------------------+
|                                                          |
|                    Main Content Area                     |
|                                                          |
|  +--------------------------------------------------+   |
|  |                                                  |   |
|  |              [🔒]                                |   |
|  |                                                  |   |
|  |           Create New Password                    |   |
|  |                                                  |   |
|  |    Please create a strong password for           |   |
|  |    your account: j***@company.com                |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  New Password *                            | |   |
|  |  |  [________________________] [👁]           | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  Password Strength: [===========    ] Strong   |   |
|  |                                                  |   |
|  |  ✓ At least 8 characters                       |   |
|  |  ✓ Contains uppercase letter                   |   |
|  |  ✓ Contains number                             |   |
|  |  ✓ Contains special character                  |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Confirm Password *                        | |   |
|  |  |  [________________________] [👁]           | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  ✓ Passwords match                             |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |         [Reset Password]                   | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  Password Tips:                                 |   |
|  |  • Use a unique password                        |   |
|  |  • Avoid common words                           |   |
|  |  • Consider a password manager                  |   |
|  |                                                  |   |
|  +--------------------------------------------------+   |
|                                                          |
+----------------------------------------------------------+
|                    Footer (60px)                         |
|  Privacy Policy | Terms of Service | Contact Support     |
+----------------------------------------------------------+
```

## Component Details

### Password Requirements Display
Real-time validation with visual feedback:

```
❌ At least 8 characters (6/8)
✓ Contains uppercase letter
❌ Contains number
❌ Contains special character (!@#$%^&*)
```

### Password Strength Meter
Visual indicator with colors:

```
Weak     [====                    ] 🔴
Fair     [==========              ] 🟡
Good     [================        ] 🟡
Strong   [====================    ] 🟢
```

### Form Fields

#### New Password
- **Type**: password (toggleable)
- **Validation**: Real-time requirements check
- **Auto-complete**: new-password
- **Min length**: 8 characters
- **Max length**: 128 characters

#### Confirm Password
- **Type**: password (toggleable)
- **Validation**: Must match new password
- **Real-time**: Check on keyup with debounce
- **Visual feedback**: Green check when matching

## Success State

```
+--------------------------------------------------+
|                                                  |
|                    [✓]                           |
|                                                  |
|         Password Reset Successfully!             |
|                                                  |
|    Your password has been updated.               |
|    You can now sign in with your new password.  |
|                                                  |
|  +--------------------------------------------+ |
|  |           [Sign In Now]                     | |
|  +--------------------------------------------+ |
|                                                  |
|  For security, we've logged you out of          |
|  all other devices.                             |
|                                                  |
+--------------------------------------------------+
```

## Security Notifications

### Post-Reset Email
```
Subject: Your Password Was Reset

Hi [Name],

Your password was successfully reset on [Date] at [Time].

Device: [Browser] on [OS]
Location: [City, Country]
IP: [Partial IP]

If this wasn't you, please contact support immediately.

[Contact Support Button]
```

### WhatsApp Notification
```
🔐 HLM Support Security Alert

Your password was just reset.
Time: [Time]
Location: [City]

Wasn't you? Reply HELP for support.
```

## Token Validation

### Invalid/Expired Token
```
+--------------------------------------------------+
|                                                  |
|                 [⏰]                              |
|                                                  |
|           Link Expired                           |
|                                                  |
|    This password reset link has expired          |
|    or has already been used.                    |
|                                                  |
|    For security, reset links are only valid      |
|    for 1 hour and can only be used once.        |
|                                                  |
|  +--------------------------------------------+ |
|  |        [Request New Link]                   | |
|  +--------------------------------------------+ |
|                                                  |
|  [← Back to Login]                               |
|                                                  |
+--------------------------------------------------+
```

## Additional Security Features

### Password History Check
```
⚠️ You've used this password recently
Please choose a different password for security.
```

### Common Password Warning
```
⚠️ This password is too common
Your password appears in breach databases.
Please choose a more unique password.
```

### Session Management
```
□ Log out from all other devices
   For extra security, sign out everywhere else
```

## Loading States

### Checking Token
```
[Spinner] Verifying reset link...
Please wait while we validate your request
```

### Resetting Password
```
[Spinner] Updating your password...
This will just take a moment
```

## Password Generation

### Suggest Strong Password
```
+--------------------------------------------+
|  💡 Suggest a strong password              |
|                                            |
|  [Correct-Horse-Battery-Staple-2024!]      |
|                                            |
|  [Use This] [Generate Another]             |
+--------------------------------------------+
```

## Error Handling

### Network Error
```
┌─────────────────────────────────┐
│ ❌ Connection error              │
│ Please check your internet       │
│ connection and try again.        │
│ [Retry]                          │
└─────────────────────────────────┘
```

### Server Error
```
┌─────────────────────────────────┐
│ ❌ Something went wrong          │
│ We couldn't update your password.│
│ Please try again or contact      │
│ support if the issue persists.   │
│ [Try Again] [Contact Support]    │
└─────────────────────────────────┘
```

## Mobile Considerations

### Touch-Friendly Design
- Larger input fields (48px height)
- Bigger toggle buttons for password visibility
- Full-width buttons
- Increased spacing between elements

### Keyboard Behavior
- Auto-focus on first field
- "Next" button advances to confirm field
- "Done" button submits form
- No auto-correct or auto-capitalize

## Technical Specifications

### Reset Password API
```javascript
POST /api/auth/reset-password
Headers: {
  "Authorization": "Bearer [reset_token]"
}
Body: {
  "password": "NewSecurePass123!",
  "password_confirmation": "NewSecurePass123!",
  "logout_other_devices": true
}

Response:
{
  "success": true,
  "message": "Password reset successfully",
  "redirect": "/login"
}
```

### Password Validation Rules
```javascript
{
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventCommon: true,
  preventReuse: 3 // Can't reuse last 3 passwords
}
```

## Accessibility Features

1. **Password Announcements**: Screen reader updates
2. **Strength Feedback**: ARIA live regions
3. **Error Messages**: Associated with fields
4. **Keyboard Navigation**: Full support
5. **Color Independence**: Not just color coding

## Best Practices

1. **No Password Hints**: Don't store or display
2. **Secure Transport**: HTTPS only
3. **Client Validation**: For UX only
4. **Server Validation**: Always validate server-side
5. **Timing Attacks**: Consistent response times

## Edge Cases

1. **Simultaneous Resets**: Last one wins
2. **Account Locked**: Show appropriate message
3. **Password Manager**: Compatible attributes
4. **Browser Warnings**: Avoid triggering
5. **Copy/Paste**: Allow for password managers