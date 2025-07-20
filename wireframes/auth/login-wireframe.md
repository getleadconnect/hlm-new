# Login Page Wireframe

## Overview
The login page is the primary entry point for all users (customers, agents, supervisors, admins). It should be simple, secure, and guide users to the right portal based on their role.

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
|  |              Welcome Back!                       |   |
|  |     Sign in to your support account              |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Email or Username                         | |   |
|  |  |  [________________________]               | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |  Password                                  | |   |
|  |  |  [________________________] [👁]           | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  [ ] Remember me          [Forgot Password?]    |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |           [Sign In]                        | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |              ─── OR ───                         |   |
|  |                                                  |   |
|  |  +--------------------------------------------+ |   |
|  |  |    [Continue with WhatsApp]                | |   |
|  |  +--------------------------------------------+ |   |
|  |                                                  |   |
|  |  Don't have an account? [Sign Up]              |   |
|  |                                                  |   |
|  +--------------------------------------------------+   |
|                                                          |
+----------------------------------------------------------+
|                    Footer (60px)                         |
|  Privacy Policy | Terms of Service | Contact Support     |
+----------------------------------------------------------+
```

## Component Details

### Header
- **Logo**: Company logo, links to landing page
- **Help**: Links to knowledge base
- **Login**: Current page (highlighted)

### Main Form Container
- **Width**: 400px (desktop), 100% - 32px padding (mobile)
- **Background**: White/Surface color
- **Border**: 1px border or subtle shadow
- **Padding**: 32px
- **Border radius**: 8px

### Form Elements

#### Email/Username Input
- **Label**: "Email or Username"
- **Type**: email/text (smart detection)
- **Placeholder**: "you@company.com"
- **Validation**: Required, email format if @ detected
- **Error state**: Red border, error message below

#### Password Input
- **Label**: "Password"
- **Type**: password (toggleable)
- **Placeholder**: "Enter your password"
- **Show/Hide toggle**: Eye icon on right
- **Validation**: Required, minimum 8 characters
- **Error state**: Red border, error message below

#### Remember Me
- **Type**: Checkbox
- **Label**: "Remember me"
- **Default**: Unchecked
- **Behavior**: Keeps user logged in for 30 days

#### Forgot Password Link
- **Position**: Right-aligned with remember me
- **Style**: Text link, primary color
- **Action**: Navigate to forgot password page

#### Sign In Button
- **Style**: Primary button, full width
- **Height**: 48px
- **Loading state**: Spinner + "Signing in..."
- **Disabled**: When form is invalid or loading

#### WhatsApp Login
- **Style**: Secondary button with WhatsApp icon
- **Text**: "Continue with WhatsApp"
- **Action**: Initiates WhatsApp authentication flow

### Sign Up Link
- **Position**: Below form
- **Text**: "Don't have an account? Sign Up"
- **Action**: Navigate to registration page

## Responsive Behavior

### Desktop (≥768px)
- Fixed width form (400px)
- Centered vertically and horizontally
- Background image or pattern

### Mobile (<768px)
- Full width form with 16px margins
- No background image
- Stacked layout
- Larger touch targets (48px minimum)

## States & Interactions

### Loading State
```
[Spinner] Signing in...
Please wait while we verify your credentials
```

### Error States
```
❌ Invalid email or password
Please check your credentials and try again
```

### Success State
```
✓ Login successful!
Redirecting to your dashboard...
```

### Role Detection
After successful authentication:
1. Detect user role from response
2. Redirect to appropriate dashboard:
   - Customer → /customer/dashboard
   - Agent → /agent/dashboard
   - Supervisor → /supervisor/dashboard
   - Admin → /admin/dashboard

## Security Features

1. **Rate Limiting**: Max 5 attempts per 15 minutes
2. **CAPTCHA**: After 3 failed attempts
3. **2FA Prompt**: If enabled for account
4. **Session Security**: HTTPS only, secure cookies
5. **CSRF Protection**: Token validation

## Accessibility

1. **Tab Order**: Logical flow through form
2. **ARIA Labels**: All inputs properly labeled
3. **Error Announcements**: Screen reader friendly
4. **Keyboard Navigation**: Full support
5. **Focus Indicators**: Visible focus states

## Technical Specifications

### Form Submission
```javascript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "********",
  "remember": true
}

Response:
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "role": "agent",
    "name": "John Doe"
  },
  "redirect": "/agent/dashboard"
}
```

### Validation Rules
- Email: Valid email format OR alphanumeric username
- Password: Minimum 8 characters
- Both fields required

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Design Notes

1. **Branding**: Customizable logo and colors
2. **Illustrations**: Optional side illustration for desktop
3. **Animations**: Subtle fade-in for form
4. **Loading**: Skeleton screen while checking auth status
5. **Deep Links**: Support redirect after login

## Edge Cases

1. **Already Logged In**: Redirect to dashboard
2. **Expired Session**: Show "Session expired" message
3. **Account Locked**: Show specific error with support link
4. **Maintenance Mode**: Show maintenance message
5. **Network Error**: Show retry option