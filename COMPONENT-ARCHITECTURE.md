# Component Architecture Quick Reference

## 🎯 Core Principle: Single Source of Truth

Every UI component has **ONE definition** that is used **EVERYWHERE** in the application.

## 📁 File Structure

```
/resources/js/components/ui/
├── index.js          # ← ALWAYS import from here
├── button.jsx        # ← NEVER import directly
├── card.jsx          # ← NEVER import directly
├── dialog.jsx        # ← NEVER import directly
└── ... (all other components)
```

## ✅ Correct Usage

```javascript
// In ANY page or component file:
import { Button, Card, Dialog } from '@/components/ui';

// That's it! You now have access to all components
```

## ❌ Wrong Usage

```javascript
// NEVER do this:
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

## 🔧 Making Changes

### Need to modify a component?

1. Go to `/resources/js/components/ui/[component].jsx`
2. Make your changes
3. Run `npm run build`
4. ✨ Changes automatically reflect EVERYWHERE

### Example: Changing Button colors

```javascript
// In /resources/js/components/ui/button.jsx
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground", // ← Change here
        // ... other variants
      }
    }
  }
)
```

After saving and building, ALL buttons in the ENTIRE app update automatically!

## 🚫 Common Mistakes to Avoid

### ❌ Creating duplicate components
```javascript
// WRONG: Creating TicketButton in pages/Tickets.jsx
const TicketButton = ({ children }) => (
  <button className="bg-blue-500">{children}</button>
);
```

### ✅ Using existing components with props
```javascript
// RIGHT: Use the existing Button with appropriate props
<Button variant="primary">{children}</Button>
```

### ❌ Page-specific component versions
```javascript
// WRONG: Creating AdminButton in pages/Admin.jsx
const AdminButton = () => <Button className="admin-specific" />;
```

### ✅ Using variants or composition
```javascript
// RIGHT: Add variant to existing Button component
<Button variant="admin">Admin Action</Button>
```

## 🎨 Component Variants

Instead of creating new components, use variants:

```javascript
// In the component file:
variant: {
  default: "...",
  secondary: "...",
  destructive: "...",
  admin: "...",  // ← Add new variants here
}

// In your pages:
<Button variant="admin">Admin Only</Button>
```

## 📋 Quick Checklist

Before creating ANY component code, ask yourself:

1. ✓ Does this component already exist in `/components/ui/`?
2. ✓ Can I use an existing component with different props?
3. ✓ Can I add a variant to an existing component?
4. ✓ Am I importing from `@/components/ui` (not individual files)?

## 🚀 Benefits

- **Consistency**: Same component everywhere = consistent UI
- **Maintainability**: Change once, update everywhere
- **Efficiency**: No duplicate code to maintain
- **Scalability**: Easy to add new variants/features
- **Debugging**: One place to fix issues

## 📖 More Information

- Full component list: See `COMPONENT-GUIDE.md`
- Implementation details: See `claude.md`
- Live examples: http://localhost/hlm-new/public/app