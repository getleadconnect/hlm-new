# Forgot Password Page Wireframe

## Overview
The forgot password page helps users regain access to their accounts through email or WhatsApp verification.

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
|  |              [🔐]                                |   |
|  |                                                  |   |
|  |           Forgot Your Password?                  |   |
|  |                                                  |   |
|  |    No worries! We'll send you instructions      |   |
|  |    to reset your password.                       |   |
|  |                                                  |   |
|  |  Choose recovery method:                         |   |
|  |                                                  |   |
|  |  ┌──────────────────┐ ┌──────────────────┐     |   |
|  |  │   📧 Email       │ │  💬 WhatsApp     │     |   |
|  |  │   Recovery       │ │   Recovery       │     |   |
|  |  └──────────────────┘ └──────────────────┘     |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Email Address                             | |   |
|  |  |  [________________________]               | |   |
|  |  |  Enter your registered email              | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |         [Send Reset Link]                  | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  [← Back to Login]                             |   |
|  |                                                  |   |
|  +--------------------------------------------------+   |
|                                                          |
+----------------------------------------------------------+
|                    Footer (60px)                         |
|  Privacy Policy | Terms of Service | Contact Support     |
+----------------------------------------------------------+
```

## Recovery Method Selection

### Email Recovery Tab (Default)
```
+--------------------------------------------------+
|  Email Address                                   |
|  [________________________]                      |
|  Enter your registered email                     |
+--------------------------------------------------+

[Send Reset Link]
```

### WhatsApp Recovery Tab
```
+--------------------------------------------------+
|  Phone Number                                    |
|  [+1] [_____________________]                    |
|  Enter your WhatsApp number                      |
+--------------------------------------------------+

[Send Code via WhatsApp]
```

## Success States

### Email Sent Success
```
+--------------------------------------------------+
|                                                  |
|                 [✉️]                              |
|                                                  |
|          Check Your Email!                       |
|                                                  |
|    We've sent password reset instructions       |
|    to: j***@company.com                         |
|                                                  |
|    The link will expire in 1 hour.              |
|                                                  |
|  +--------------------------------------------+ |
|  |         [Open Email App]                    | |
|  +--------------------------------------------+ |
|                                                  |
|  Didn't receive it? [Resend] (59s)              |
|                                                  |
|  [← Back to Login]                               |
|                                                  |
+--------------------------------------------------+
```

### WhatsApp Code Sent
```
+--------------------------------------------------+
|                                                  |
|                 [💬]                             |
|                                                  |
|        Check Your WhatsApp!                      |
|                                                  |
|    We've sent a 6-digit code to:                |
|    +1 *** *** 8900                              |
|                                                  |
|  Enter verification code:                        |
|                                                  |
|  [_] [_] [_] [_] [_] [_]                        |
|                                                  |
|  +--------------------------------------------+ |
|  |           [Verify Code]                     | |
|  +--------------------------------------------+ |
|                                                  |
|  Didn't receive it? [Resend] (59s)              |
|                                                  |
+--------------------------------------------------+
```

## Form Behavior

### Email Recovery Flow
1. User enters email address
2. System validates email exists
3. Send reset link to email
4. Show success message
5. Email contains secure reset link

### WhatsApp Recovery Flow
1. User enters phone number
2. System validates number exists
3. Send 6-digit code via WhatsApp
4. User enters code
5. Validate and proceed to reset

## Error States

### Account Not Found
```
┌─────────────────────────────────┐
│ ❌ Account not found             │
│ No account exists with this      │
│ email address.                   │
│ [Create Account] [Try Again]     │
└─────────────────────────────────┘
```

### Invalid Code
```
┌─────────────────────────────────┐
│ ❌ Invalid verification code     │
│ Please check the code and        │
│ try again.                       │
└─────────────────────────────────┘
```

### Too Many Attempts
```
┌─────────────────────────────────┐
│ ⚠️ Too many attempts            │
│ For security, please wait        │
│ 15 minutes before trying again.  │
│ [Contact Support]                │
└─────────────────────────────────┘
```

## Security Features

1. **Rate Limiting**
   - Max 3 attempts per hour
   - Progressive delays
   - IP-based tracking

2. **Email Masking**
   - Show partial email (j***@company.com)
   - Prevents email harvesting

3. **Code Expiration**
   - Email link: 1 hour
   - WhatsApp code: 10 minutes
   - Single use only

4. **Audit Trail**
   - Log all reset attempts
   - Alert on suspicious activity

## Responsive Design

### Mobile (<768px)
- Full width form
- Larger touch targets
- Tab buttons stack vertically
- Bottom sheet for success messages

### Desktop (≥768px)
- Centered 400px form
- Side-by-side tab buttons
- Modal-style success messages

## Loading States

### Sending Email
```
[Spinner] Sending reset link...
This may take a few seconds
```

### Verifying Code
```
[Spinner] Verifying code...
Please wait
```

## Additional Features

### Resend Functionality
- Disabled for 60 seconds after send
- Shows countdown timer
- Maximum 3 resends per session

### Alternative Options
```
Having trouble?
• [Contact Support]
• [Try a different email]
• [Use WhatsApp instead]
```

## Technical Specifications

### Email Recovery API
```javascript
POST /api/auth/forgot-password
{
  "method": "email",
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "Reset link sent",
  "masked_email": "u***@example.com"
}
```

### WhatsApp Recovery API
```javascript
POST /api/auth/forgot-password
{
  "method": "whatsapp",
  "phone": "+1234567890"
}

Response:
{
  "success": true,
  "message": "Code sent via WhatsApp",
  "masked_phone": "+1 *** *** 7890",
  "expires_in": 600
}
```

### Code Verification API
```javascript
POST /api/auth/verify-reset-code
{
  "phone": "+1234567890",
  "code": "123456"
}

Response:
{
  "success": true,
  "reset_token": "temporary_token",
  "redirect": "/reset-password"
}
```

## Email Template

Subject: Reset Your Password - HLM Support

```
Hi [Name],

You requested to reset your password. Click the link below:

[Reset Password Button]
Link: https://support.company.com/reset/[token]

This link expires in 1 hour.

If you didn't request this, please ignore this email.

Thanks,
HLM Support Team
```

## WhatsApp Message Template

```
Your HLM Support password reset code is:

[123456]

This code expires in 10 minutes.
Do not share this code with anyone.

If you didn't request this, please ignore.
```

## Accessibility

1. **Clear Labels**: All inputs properly labeled
2. **Error Announcements**: Screen reader friendly
3. **Keyboard Navigation**: Tab through options
4. **High Contrast**: Works in all modes
5. **Focus Management**: Logical flow

## Edge Cases

1. **Multiple Accounts**: Same email/phone
2. **Recently Changed**: Show last change date
3. **Deactivated Account**: Special message
4. **No Email Access**: Offer alternatives
5. **International Numbers**: Proper formatting