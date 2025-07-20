# CLAUDE.md - Project Context and Documentation

## Overview
This document serves as the primary reference for Claude AI to understand the project structure, conventions, and ongoing development process. Always refer to this document along with `status.md` and `tasks.md` when working on the project.

## Project Information
- **Project Name**: HLM New - Customer Support Ticket Management System
- **Project Type**: Help Desk / Ticket Management (Similar to Freshdesk/Zoho Desk)
- **Framework**: Laravel 12.0 with React 19.1.0
- **UI Library**: shadcn/ui with Tailwind CSS v4
- **Build Tool**: Vite 6.2.4
- **Language Requirements**: PHP 8.2+, Node.js
- **Primary Communication Channel**: WhatsApp Business API (No live chat)

## Project Structure

### Backend (Laravel)
```
app/                 # Core application code
├── Http/           # HTTP layer (Controllers, Middleware, Requests)
├── Models/         # Eloquent ORM models
└── Providers/      # Service providers

config/             # Configuration files
database/           # Migrations, factories, seeders
routes/             # Application routes
├── web.php        # Web routes (/ and /app)
└── console.php    # Console commands
```

### Frontend (React + shadcn/ui)
```
resources/
├── css/
│   └── app.css       # Tailwind CSS with shadcn/ui theme variables
├── js/
│   ├── components/
│   │   ├── ui/       # All reusable UI components (centralized)
│   │   │   └── index.js  # Centralized exports for all UI components
│   │   ├── App.jsx   # Main React component
│   │   └── DesignSystem.jsx # Component showcase/documentation
│   ├── lib/
│   │   ├── utils.js  # Utility functions (cn helper)
│   │   └── constants.js # Shared constants (colors, statuses, etc.)
│   └── app.jsx       # React entry point
└── views/            # Blade templates
```

## Technology Stack
- **Backend**: Laravel 12.0 (PHP 8.2+)
- **Frontend**: React 19.1.0 with TypeScript support
- **Styling**: Tailwind CSS v4 with shadcn/ui design system
- **Database**: SQLite (default, configurable)
- **Development**: Vite, Laravel Sail (Docker), Composer, NPM

## Key Files to Reference
1. **vite.config.js** - Build configuration with React and Tailwind plugins
2. **tailwind.config.js** - Tailwind configuration with shadcn/ui theme
3. **package.json** - Frontend dependencies
4. **composer.json** - Backend dependencies
5. **.env** - Environment configuration

## Development Conventions

### Frontend Conventions
- Use TypeScript for type safety
- Components go in `resources/js/components/`
- UI components (shadcn/ui style) in `resources/js/components/ui/`
- Use the `cn()` utility for className merging
- Follow shadcn/ui patterns for component variants

### Component Architecture Guidelines

#### 1. Centralized Component Management
- **ALL UI components** must be placed in `/resources/js/components/ui/`
- **Single source of truth**: Each component has ONE file that defines it
- **Centralized exports**: Use `/resources/js/components/ui/index.js` for all exports
- **No duplicate components**: Never create multiple versions of the same component

#### 2. Component Import Pattern
```javascript
// ✅ CORRECT - Import from centralized index
import { Button, Card, Dialog, PriorityBadge } from '@/components/ui';

// ❌ WRONG - Don't import from individual files in pages
import { Button } from '@/components/ui/button';
```

#### 3. Making Component Changes
- **Always modify the original component** in `/resources/js/components/ui/`
- **Never create page-specific versions** of existing components
- **Changes automatically reflect everywhere** due to centralized architecture
- **Test impact**: After changing a component, verify it works across all pages

#### 4. Component Variants
- Use the `variant` prop pattern for different styles
- Don't create separate components for style variations
- Example:
```javascript
// ✅ CORRECT - Single component with variants
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="destructive" />

// ❌ WRONG - Multiple components
<PrimaryButton />
<SecondaryButton />
<DeleteButton />
```

#### 5. Shared Constants
- Colors, statuses, and other constants go in `/resources/js/lib/constants.js`
- Import constants in components that need them
- This ensures consistency across the application

#### 6. Component Documentation
- Each component should have JSDoc comments
- Props should be clearly defined with types
- See DesignSystem.jsx for usage examples

### Backend Conventions
- Follow Laravel best practices
- Use Eloquent ORM for database operations
- Keep controllers thin, business logic in services
- Use Laravel's validation and authorization features

### Routing
- Traditional web routes serve Blade views
- `/` - Welcome page (Blade)
- `/app` - React SPA mount point
- API routes (when needed) should go in `routes/api.php`

## Important Project Files

### Documentation Files
- **CLAUDE.md** (this file) - AI context and project overview
- **status.md** - Daily progress tracking and project status
- **tasks.md** - Complete list of project tasks and requirements

### How to Use These Files
1. **Before starting work**: Read all three documentation files
2. **During development**: 
   - Update `tasks.md` when completing tasks
   - Log daily progress in `status.md`
   - Update this file if project structure changes
3. **Project planning**: Refer to these files for context and requirements

## Commands Reference

### Development
```bash
# Start all development servers
composer dev

# Or individually:
php artisan serve          # Laravel server
npm run dev               # Vite dev server
php artisan queue:listen  # Queue worker
php artisan pail          # Log viewer
```

### Build
```bash
npm run build            # Build frontend assets
composer install --no-dev # Production PHP deps
npm install --production # Production JS deps
```

### Component Development
```bash
# After creating/modifying a component:
1. npm run build          # Build to test changes
2. Check DesignSystem page # Verify component works
3. Test in actual pages   # Ensure no breaking changes
```

## Current Project State
- Laravel installed with React integration
- shadcn/ui set up with Tailwind CSS
- Basic routing configured
- **Complete Design System implemented** (20/20 components)
- Development environment ready (MAMP compatible)

### Implemented Components
1. **Core**: Button, Input, Label, Textarea, Select, Card, Alert, Separator
2. **Navigation**: Navbar, Sidebar, Tabs, DropdownMenu
3. **Data Display**: Table, Pagination, Badge, Avatar, Timeline
4. **Forms**: DatePicker, TimePicker, FileUpload, SearchFilter, EditorToolbar
5. **Feedback**: Tooltip, Toast, Dialog, Skeleton, EmptyState, ErrorState
6. **Communication**: ChatBubble (WhatsApp style)
7. **Indicators**: PriorityIndicator, StatusBadge

### Component Usage
- View all components: http://localhost/hlm-new/public/app
- Import from: `import { ComponentName } from '@/components/ui'`
- Reference: `/resources/js/components/DesignSystem.jsx`

## Notes for Claude
- Always check `status.md` for the latest project status
- Refer to `tasks.md` for pending work items
- Update documentation files as the project evolves
- Follow established conventions and patterns
- Test changes before marking tasks complete

### Component Development Rules
1. **NEVER duplicate components** - Always use existing ones from `/components/ui/`
2. **Modify at source** - Change components in their original files only
3. **Use centralized imports** - Import from `@/components/ui` index
4. **Test globally** - Verify changes work across all pages
5. **Document changes** - Update this file if component APIs change

### When Building Pages
1. **First check** if a component exists in `/components/ui/`
2. **Use existing components** with appropriate props/variants
3. **If new variant needed**, add it to the existing component
4. **If new component needed**, create it in `/components/ui/` and add to index.js
5. **Never create inline components** for functionality that could be reused