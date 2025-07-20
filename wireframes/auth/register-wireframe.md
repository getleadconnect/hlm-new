# Registration Page Wireframe

## Overview
The registration page allows new users to create accounts. It should collect necessary information while maintaining a simple, non-intimidating flow.

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
|  |           Create Your Account                    |   |
|  |    Get started with our support platform         |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Full Name *                               | |   |
|  |  |  [________________________]               | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Email Address *                           | |   |
|  |  |  [________________________]               | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Phone Number (WhatsApp) *                 | |   |
|  |  |  [+1] [_____________________]             | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Company Name (Optional)                   | |   |
|  |  |  [________________________]               | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Password *                                | |   |
|  |  |  [________________________] [👁]           | |   |
|  |  |  ⓘ At least 8 characters                  | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Confirm Password *                        | |   |
|  |  |  [________________________] [👁]           | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  [ ] I agree to the [Terms] and [Privacy]     |   |
|  |  [ ] Send me tips and updates via WhatsApp    |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |         [Create Account]                   | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |              ─── OR ───                         |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |    [Sign up with WhatsApp]                 | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  Already have an account? [Sign In]            |   |
|  |                                                  |   |
|  +--------------------------------------------------+   |
|                                                          |
+----------------------------------------------------------+
|                    Footer (60px)                         |
|  Privacy Policy | Terms of Service | Contact Support     |
+----------------------------------------------------------+
```

## Component Details

### Form Container
- **Width**: 400px (desktop), 100% - 32px (mobile)
- **Sections**: Single page (no multi-step for simplicity)

### Form Fields

#### Full Name
- **Label**: "Full Name *"
- **Type**: text
- **Placeholder**: "John Doe"
- **Validation**: Required, min 2 characters
- **Auto-capitalize**: Words

#### Email Address
- **Label**: "Email Address *"
- **Type**: email
- **Placeholder**: "you@company.com"
- **Validation**: Required, valid email, unique
- **Real-time**: Check availability after blur

#### Phone Number
- **Label**: "Phone Number (WhatsApp) *"
- **Type**: tel
- **Country Code**: Dropdown selector
- **Placeholder**: Based on country
- **Validation**: Valid phone format
- **Purpose**: WhatsApp communication

#### Company Name
- **Label**: "Company Name (Optional)"
- **Type**: text
- **Placeholder**: "Your Company"
- **Validation**: None (optional)
- **Help text**: "Helps us provide better support"

#### Password
- **Label**: "Password *"
- **Type**: password (toggleable)
- **Requirements**: 
  - Minimum 8 characters
  - At least one uppercase
  - At least one number
  - At least one special character
- **Strength meter**: Visual indicator
- **Real-time validation**: Show requirements

#### Confirm Password
- **Label**: "Confirm Password *"
- **Type**: password (toggleable)
- **Validation**: Must match password
- **Real-time**: Check on blur

### Password Strength Indicator
```
Weak    [====                    ]
Medium  [============            ]
Strong  [====================    ]
```

### Checkboxes

#### Terms Agreement
- **Required**: Yes
- **Text**: "I agree to the Terms of Service and Privacy Policy"
- **Links**: Open in new tab/modal

#### Marketing Consent
- **Required**: No
- **Default**: Unchecked
- **Text**: "Send me tips and updates via WhatsApp"

## Progressive Disclosure

### Email Verification Flow
```
After email entry:
┌─────────────────────────────────┐
│ ✓ Email available               │
│   you@company.com is available  │
└─────────────────────────────────┘

If taken:
┌─────────────────────────────────┐
│ ❌ Email already registered      │
│   [Sign in instead?]            │
└─────────────────────────────────┘
```

### WhatsApp Verification
```
After phone entry:
┌─────────────────────────────────┐
│ We'll send a verification code  │
│ to your WhatsApp                │
└─────────────────────────────────┘
```

## Alternative Registration

### WhatsApp Registration
1. Click "Sign up with WhatsApp"
2. Scan QR code or enter phone
3. Receive verification code
4. Auto-fill profile from WhatsApp
5. Set password
6. Complete registration

## Success State

```
+--------------------------------------------------+
|                                                  |
|                    ✓                             |
|                                                  |
|         Account Created Successfully!            |
|                                                  |
|    We've sent a verification email to:          |
|           you@company.com                        |
|                                                  |
|    And a welcome message to your WhatsApp:      |
|           +1 234 567 8900                        |
|                                                  |
|  +--------------------------------------------+ |
|  |        [Go to Dashboard]                   | |
|  +--------------------------------------------+ |
|                                                  |
|  Didn't receive the email? [Resend]             |
|                                                  |
+--------------------------------------------------+
```

## Responsive Behavior

### Mobile Optimizations
- Stacked layout
- Larger input fields (48px height)
- Numeric keyboard for phone
- Simplified country code selector
- Bottom-sheet for terms/privacy

## Validation & Error Handling

### Field-Level Validation
```
┌─────────────────────────────────┐
│ Email Address *                 │
│ [john@]                         │
│ ❌ Please enter a valid email   │
└─────────────────────────────────┘
```

### Form-Level Errors
```
⚠️ Please fix the following errors:
• Enter a valid email address
• Password must be at least 8 characters
• You must agree to the terms
```

## Security Measures

1. **Email Verification**: Required before full access
2. **Phone Verification**: OTP via WhatsApp
3. **CAPTCHA**: For suspicious activity
4. **Rate Limiting**: Max 3 registrations per IP/hour
5. **Password Requirements**: Enforced complexity

## Post-Registration Flow

1. **Email Verification**
   - Send verification email
   - Allow resend after 60 seconds
   - Limited access until verified

2. **WhatsApp Verification**
   - Send OTP to WhatsApp
   - 6-digit code entry
   - Auto-verify if possible

3. **Welcome Flow**
   - Brief onboarding tour
   - Set up profile
   - Choose notification preferences
   - First ticket prompt

## Technical Specifications

### API Endpoint
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@company.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "password": "SecurePass123!",
  "terms_accepted": true,
  "marketing_consent": false
}

Response:
{
  "user": {
    "id": 123,
    "email": "john@company.com",
    "verification_required": true
  },
  "message": "Registration successful. Please verify your email."
}
```

## Design Considerations

1. **Trust Signals**: Security badges, testimonials
2. **Progress Indication**: Show field completion
3. **Help Tooltips**: Explain why we need information
4. **Social Proof**: "Join 10,000+ users"
5. **Loading States**: Prevent double submission

## Edge Cases

1. **Existing User**: Suggest login with password reset
2. **Invalid Phone**: Explain WhatsApp requirement
3. **Corporate Email**: Special handling for domains
4. **Disposable Email**: Block with friendly message
5. **Network Error**: Save form data locally