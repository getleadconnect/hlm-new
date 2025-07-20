# Two-Factor Authentication Wireframe

## Overview
The two-factor authentication (2FA) page provides an additional security layer after successful password authentication, supporting both email and WhatsApp verification methods.

## Layout Structure

```
+----------------------------------------------------------+
|                      Header (80px)                        |
|  [Logo]                                        [Help] [X] |
+----------------------------------------------------------+
|                                                          |
|                    Main Content Area                     |
|                                                          |
|  +--------------------------------------------------+   |
|  |                                                  |   |
|  |              [🔐]                                |   |
|  |                                                  |   |
|  |         Two-Factor Authentication                |   |
|  |                                                  |   |
|  |    Enter the verification code sent to your      |   |
|  |    registered device                             |   |
|  |                                                  |   |
|  |  Select verification method:                     |   |
|  |                                                  |   |
|  |  ┌──────────────────┐ ┌──────────────────┐     |   |
|  |  │ ✓ WhatsApp       │ │   Email          │     |   |
|  |  │   +1***8900      │ │   j***@email.com │     |   |
|  |  └──────────────────┘ └──────────────────┘     |   |
|  |                                                  |   |
|  |  Enter your 6-digit code:                       |   |
|  |                                                  |   |
|  |  [_] [_] [_] [_] [_] [_]                        |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |           [Verify Code]                     | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  [ ] Trust this device for 30 days              |   |
|  |                                                  |   |
|  |  Didn't receive code? [Resend] (58s)            |   |
|  |                                                  |   |
|  |  [Try another method] | [Back to login]         |   |
|  |                                                  |   |
|  +--------------------------------------------------+   |
|                                                          |
+----------------------------------------------------------+
|                    Footer (60px)                         |
|  Privacy Policy | Terms of Service | Contact Support     |
+----------------------------------------------------------+
```

## Component Details

### Method Selection Tabs
Visual selection between WhatsApp and Email:

```
Selected State:
┌──────────────────┐
│ ✓ WhatsApp       │  <- Primary color background
│   +1***8900      │  <- Masked phone number
└──────────────────┘

Unselected State:
┌──────────────────┐
│   Email          │  <- Default background
│   j***@email.com │  <- Masked email
└──────────────────┘
```

### Code Input Fields
Six separate input fields for better UX:

```
+---+ +---+ +---+ +---+ +---+ +---+
| 1 | | 2 | | 3 | | 4 | | 5 | | 6 |
+---+ +---+ +---+ +---+ +---+ +---+
```

#### Input Behavior
- **Auto-advance**: Move to next field on input
- **Backspace**: Move to previous field when empty
- **Paste support**: Handle 6-digit paste
- **Numeric only**: Mobile numeric keyboard
- **Large font**: 24px for visibility

### Trust Device Option
```
□ Trust this device for 30 days
  Skip verification on this browser
```

## States & Interactions

### Loading State
```
[Spinner] Verifying code...
Please wait while we authenticate
```

### Success State
```
+--------------------------------------------------+
|                                                  |
|                    [✓]                           |
|                                                  |
|         Verification Successful!                 |
|                                                  |
|    You're all set. Redirecting to                |
|    your dashboard...                             |
|                                                  |
|  [Continue to Dashboard]                         |
|                                                  |
+--------------------------------------------------+
```

### Error States

#### Invalid Code
```
┌─────────────────────────────────┐
│ ❌ Invalid code                  │
│ The code you entered is          │
│ incorrect. Please try again.     │
│ (2 attempts remaining)           │
└─────────────────────────────────┘
```

#### Code Expired
```
┌─────────────────────────────────┐
│ ⏰ Code expired                  │
│ This code has expired.           │
│ Please request a new one.        │
│ [Send New Code]                  │
└─────────────────────────────────┘
```

#### Too Many Attempts
```
┌─────────────────────────────────┐
│ 🚫 Too many attempts             │
│ For security, your account has   │
│ been temporarily locked.         │
│ Please try again in 15 minutes.  │
│ [Contact Support]                │
└─────────────────────────────────┘
```

## Alternative Methods

### Backup Codes
```
+--------------------------------------------------+
|                                                  |
|         Use Backup Code Instead                  |
|                                                  |
|  If you can't access your primary method,        |
|  enter one of your backup codes:                 |
|                                                  |
|  +--------------------------------------------+ |
|  |  Backup Code                                | |
|  |  [________________________]               | |
|  |  Format: XXXX-XXXX-XXXX                   | |
|  +--------------------------------------------+ |
|                                                  |
|  +--------------------------------------------+ |
|  |         [Verify Backup Code]               | |
|  +--------------------------------------------+ |
|                                                  |
|  [Back to verification methods]                  |
|                                                  |
+--------------------------------------------------+
```

### Recovery Options
```
Lost access to your verification methods?

• [Send code to recovery email]
• [Contact support for help]
• [Account recovery process]
```

## WhatsApp Verification Flow

### WhatsApp Message Format
```
🔐 HLM Support Security Code

Your verification code is:
**123456**

This code expires in 5 minutes.
Do not share this code with anyone.

Not you? Reply STOP
```

### Auto-Read Permission
```
┌─────────────────────────────────┐
│ 📱 Enable WhatsApp Auto-Read?    │
│                                  │
│ Allow us to automatically read   │
│ verification codes from WhatsApp │
│ for faster login.                │
│                                  │
│ [Enable] [Not Now]               │
└─────────────────────────────────┘
```

## Email Verification Flow

### Email Template
```
Subject: Your HLM Support Verification Code

Hi [Name],

Your verification code is:

[123456]

This code will expire in 10 minutes.

If you didn't request this code, please secure your account immediately.

Thanks,
HLM Support Security Team
```

## Setup & Management

### Enable 2FA Flow
```
+--------------------------------------------------+
|                                                  |
|         Secure Your Account                      |
|                                                  |
|  Add an extra layer of security with             |
|  two-factor authentication                       |
|                                                  |
|  Choose your primary method:                     |
|                                                  |
|  ○ WhatsApp (Recommended)                        |
|     Quick and secure verification                |
|                                                  |
|  ○ Email                                         |
|     Receive codes via email                      |
|                                                  |
|  +--------------------------------------------+ |
|  |           [Continue Setup]                  | |
|  +--------------------------------------------+ |
|                                                  |
|  [Maybe Later]                                   |
|                                                  |
+--------------------------------------------------+
```

### Backup Codes Generation
```
+--------------------------------------------------+
|                                                  |
|         Save Your Backup Codes                   |
|                                                  |
|  Keep these codes safe. Each can be used         |
|  once if you lose access to your phone.          |
|                                                  |
|  ┌────────────────────────────────┐             |
|  │ 1. ABCD-EFGH-IJKL              │             |
|  │ 2. MNOP-QRST-UVWX              │             |
|  │ 3. YZAB-CDEF-GHIJ              │             |
|  │ 4. KLMN-OPQR-STUV              │             |
|  │ 5. WXYZ-0123-4567              │             |
|  │ 6. 8901-ABCD-EFGH              │             |
|  │ 7. IJKL-MNOP-QRST              │             |
|  │ 8. UVWX-YZ01-2345              │             |
|  └────────────────────────────────┘             |
|                                                  |
|  [📋 Copy] [🖨️ Print] [⬇️ Download]              |
|                                                  |
|  [ ] I've saved my backup codes                  |
|                                                  |
|  +--------------------------------------------+ |
|  |         [Continue to Dashboard]             | |
|  +--------------------------------------------+ |
|                                                  |
+--------------------------------------------------+
```

## Security Features

### Session Information
```
Signing in from new device:
📍 Location: San Francisco, CA
🖥️ Device: Chrome on Windows
🕐 Time: 2:34 PM PST
```

### Risk-Based Authentication
Different 2FA requirements based on:
- New device/location
- Unusual activity patterns
- Account sensitivity
- Time since last verification

### Security Notifications

#### New Device Alert (WhatsApp)
```
⚠️ New Login to HLM Support

Device: Chrome on Windows
Location: San Francisco, CA
Time: 2:34 PM

Was this you?
Reply YES to confirm or NO to secure account
```

#### New Device Alert (Email)
```
Subject: New Device Login Alert

A new device just signed into your account:

Device: Chrome on Windows
Location: San Francisco, CA
IP: 192.168.*.* 
Time: Dec 20, 2:34 PM PST

If this wasn't you:
[Secure My Account]
```

## Mobile Considerations

### Input Optimization
- Large touch targets (48px minimum)
- Numeric keyboard for code entry
- Auto-zoom prevention
- Clear field focus states

### Biometric Option
```
┌─────────────────────────────────┐
│ Use Face ID for verification?    │
│                                  │
│ [Enable Face ID] [Use Code]      │
└─────────────────────────────────┘
```

## Technical Specifications

### Verify Code API
```javascript
POST /api/auth/2fa/verify
Headers: {
  "Authorization": "Bearer [temp_token]"
}
Body: {
  "code": "123456",
  "method": "whatsapp",
  "trust_device": true
}

Response:
{
  "success": true,
  "token": "full_access_jwt_token",
  "user": {
    "id": 123,
    "role": "agent"
  },
  "redirect": "/agent/dashboard"
}
```

### Send Code API
```javascript
POST /api/auth/2fa/send
Headers: {
  "Authorization": "Bearer [temp_token]"
}
Body: {
  "method": "email"
}

Response:
{
  "success": true,
  "message": "Code sent to j***@email.com",
  "expires_in": 300,
  "resend_after": 60
}
```

## Accessibility Features

1. **Screen Reader Support**
   - Code input announcements
   - Timer updates for resend
   - Error message association

2. **Keyboard Navigation**
   - Tab through inputs
   - Enter to submit
   - Escape to cancel

3. **Visual Indicators**
   - High contrast mode support
   - Clear focus states
   - Error color not sole indicator

## Edge Cases

1. **Multiple Methods**: User has both email and WhatsApp
2. **Changed Phone**: Provide alternative verification
3. **International Numbers**: Handle formatting
4. **Clock Skew**: Server-side time validation
5. **Network Issues**: Offline code entry support

## Best Practices

1. **Clear Instructions**: Explain where to find code
2. **Time Indicators**: Show code expiration
3. **Progress Feedback**: Loading states
4. **Error Recovery**: Clear next steps
5. **Security Education**: Explain why 2FA matters