# Component Usage Guide

## Quick Reference

### Import Pattern
```javascript
// ✅ ALWAYS import from the centralized index
import { 
  Button, 
  Card, 
  Dialog, 
  PriorityBadge,
  ChatBubble,
  Timeline 
} from '@/components/ui';

// ❌ NEVER import from individual files
import { Button } from '@/components/ui/button';
```

## Available Components

### 1. Core Components

#### Button
```jsx
<Button variant="default|secondary|destructive|outline|ghost|link" size="default|sm|lg">
  Click me
</Button>
```

#### Input
```jsx
<Input type="text" placeholder="Enter text..." disabled={false} />
```

#### Card
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### 2. Navigation

#### Navbar
```jsx
<Navbar 
  user={{ name: "John Doe", email: "john@example.com" }}
  notifications={5}
  onMenuClick={() => {}}
/>
```

#### Sidebar
```jsx
<Sidebar className="w-64" />
```

#### Tabs
```jsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### 3. Data Display

#### Table
```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Badges
```jsx
<Badge variant="default|secondary|destructive|outline">Label</Badge>
<PriorityBadge priority="low|medium|high|urgent" />
<StatusBadge status="new|open|pending|resolved|closed" />
```

#### Timeline
```jsx
<ActivityFeed activities={[
  {
    type: 'TicketCreated',
    data: {
      ticket: { id: '1234', subject: 'Issue' },
      time: '2 hours ago',
      user: { name: 'John Doe' }
    }
  }
]} />
```

### 4. Forms & Input

#### Date/Time Pickers
```jsx
<DatePicker value={date} onChange={setDate} />
<TimePicker value={time} onChange={setTime} format="12|24" />
<DateTimePicker value={dateTime} onChange={setDateTime} />
```

#### File Upload
```jsx
<FileUpload 
  multiple={true}
  accept="image/*"
  maxSize={10485760}
  onFilesSelected={(files) => {}}
  files={uploadedFiles}
/>
```

#### Search & Filter
```jsx
<SearchFilter 
  placeholder="Search..."
  onSearch={(term) => {}}
  onFilterChange={(filters) => {}}
/>
```

### 5. Feedback

#### Tooltips
```jsx
<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip text</TooltipContent>
</Tooltip>
```

#### Toasts
```jsx
// In component:
const { toast } = useToast();

// Show toast:
toast({
  title: "Success",
  description: "Action completed",
  variant: "default|success|error|warning|info"
});
```

#### Dialogs
```jsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Action</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 6. Communication

#### Chat Bubbles
```jsx
<ChatBubble
  message="Hello!"
  timestamp={new Date()}
  isOutgoing={false}
  status="sent|delivered|read"
  avatar={{ fallback: 'JD' }}
  userName="John Doe"
/>
```

#### Editor Toolbar
```jsx
<EditorToolbar 
  onAction={(action, data) => {}}
  features={{
    formatting: true,
    lists: true,
    alignment: true,
    links: true,
    mentions: true,
    attachments: true,
    emoji: true,
    undo: true
  }}
/>
```

### 7. States

#### Empty States
```jsx
<EmptyStates.NoTickets onCreateTicket={() => {}} />
<EmptyStates.NoSearchResults searchTerm="term" />
```

#### Error States
```jsx
<ErrorStates.NetworkError onRetry={() => {}} />
<ErrorStates.NotFound onGoHome={() => {}} />
```

#### Loading States
```jsx
<Skeleton className="h-4 w-full" />
<SkeletonCard />
<Spinner size="sm|default|lg" />
<PageLoading title="Loading..." />
```

### 8. Priority Indicators

```jsx
<PriorityIndicator 
  priority="low|medium|high|urgent"
  size="sm|default|lg"
  variant="default|minimal|flag|dot"
  showLabel={true}
/>

<PrioritySelector 
  value={priority}
  onChange={setPriority}
/>

<PriorityFilter 
  selected={['high', 'urgent']}
  onChange={setSelected}
  multiple={true}
/>
```

## Component Modification Rules

1. **Need to change a component?**
   - Go to `/resources/js/components/ui/[component-name].jsx`
   - Make your changes there
   - Run `npm run build`
   - Changes will reflect everywhere automatically

2. **Need a new variant?**
   - Add it to the existing component's variant options
   - Don't create a new component

3. **Need a new component?**
   - Create it in `/resources/js/components/ui/`
   - Export it in `/resources/js/components/ui/index.js`
   - Follow existing component patterns

## Best Practices

1. **Always use semantic props**
   ```jsx
   // ✅ Good
   <Button variant="destructive" onClick={handleDelete}>Delete</Button>
   
   // ❌ Bad
   <Button className="bg-red-500 text-white" onClick={handleDelete}>Delete</Button>
   ```

2. **Use provided variants instead of custom styles**
   ```jsx
   // ✅ Good
   <Badge variant="secondary">Status</Badge>
   
   // ❌ Bad
   <div className="px-2 py-1 bg-gray-100 rounded">Status</div>
   ```

3. **Compose components, don't modify**
   ```jsx
   // ✅ Good
   <Card>
     <CardHeader>
       <PriorityBadge priority="high" />
     </CardHeader>
   </Card>
   
   // ❌ Bad - Creating a new HighPriorityCard component
   ```

## Testing Components

1. View all components: `http://localhost/hlm-new/public/app`
2. Test in DesignSystem.jsx for isolated testing
3. Test in actual pages for integration testing

## Need Help?

- Check component source: `/resources/js/components/ui/[component].jsx`
- View examples: `/resources/js/components/DesignSystem.jsx`
- Constants: `/resources/js/lib/constants.js`
- Utilities: `/resources/js/lib/utils.js`