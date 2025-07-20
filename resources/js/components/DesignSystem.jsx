import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge, PriorityBadge, StatusBadge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback, AvatarWithStatus } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/ui/navbar';
import { Sidebar } from '@/components/ui/sidebar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, MoreActionsDropdown } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SearchFilter } from '@/components/ui/search-filter';
import { Pagination, PaginationInfo } from '@/components/ui/pagination';
import { Edit, Trash, Eye, Archive, Plus, Send } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { ToastProvider, useToast } from '@/components/ui/toast';
import { FileUpload, FileAttachment } from '@/components/ui/file-upload';
import { ChatBubble, SystemMessage, TypingIndicator, DateSeparator } from '@/components/ui/chat-bubble';
import { Timeline, TimelineItem, ActivityFeed } from '@/components/ui/timeline';
import { EmptyStates, IllustratedEmptyState } from '@/components/ui/empty-state';
import { ErrorStates, ErrorBoundary } from '@/components/ui/error-state';
import { Skeleton, SkeletonCard, SkeletonTable, Spinner, PageLoading } from '@/components/ui/skeleton';
import { DatePicker, TimePicker, DateTimePicker } from '@/components/ui/date-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/dialog';
import { EditorToolbar, MinimalToolbar, EmojiPicker } from '@/components/ui/editor-toolbar';
import { PriorityIndicator, PrioritySelector, PriorityToggle, PriorityFilter } from '@/components/ui/priority-indicator';

function DesignSystem() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState(new Date());
  const [selectedDateTime, setSelectedDateTime] = React.useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [selectedPriority, setSelectedPriority] = React.useState('medium');
  const [selectedPriorities, setSelectedPriorities] = React.useState(['high', 'urgent']);

  const [toastQueue, setToastQueue] = React.useState([]);

  const showToast = (variant) => {
    const messages = {
      success: { title: 'Success!', description: 'Your action was completed successfully.' },
      error: { title: 'Error', description: 'Something went wrong. Please try again.' },
      warning: { title: 'Warning', description: 'Please review this information carefully.' },
      info: { title: 'Info', description: 'Here\'s some helpful information for you.' }
    };
    
    // For demo purposes, just show an alert
    alert(`${messages[variant].title}: ${messages[variant].description}`);
  };

  return (
    <TooltipProvider>
      <ToastProvider>
        <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Design System Components</h1>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Badges Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges</h2>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Priority Badges</h3>
          <div className="flex gap-4 flex-wrap">
            <PriorityBadge priority="low" />
            <PriorityBadge priority="medium" />
            <PriorityBadge priority="high" />
            <PriorityBadge priority="urgent" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Status Badges</h3>
          <div className="flex gap-4 flex-wrap">
            <StatusBadge status="new" />
            <StatusBadge status="open" />
            <StatusBadge status="pending" />
            <StatusBadge status="resolved" />
            <StatusBadge status="closed" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Regular Badges</h3>
          <div className="flex gap-4 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
      </section>

      {/* Avatars Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Avatars</h2>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          
          <AvatarWithStatus 
            src="https://github.com/shadcn.png" 
            alt="User" 
            fallback="JD"
            status="online"
          />
          
          <AvatarWithStatus 
            fallback="AB"
            status="busy"
          />
          
          <AvatarWithStatus 
            fallback="CD"
            status="away"
          />
          
          <AvatarWithStatus 
            fallback="EF"
            status="offline"
          />
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket #1234</CardTitle>
              <CardDescription>Customer needs help with login</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <StatusBadge status="open" />
                <PriorityBadge priority="high" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">2 hours ago</span>
              <Button size="sm">View Details</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket #1235</CardTitle>
              <CardDescription>WhatsApp integration issue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <StatusBadge status="pending" />
                <PriorityBadge priority="medium" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">5 hours ago</span>
              <Button size="sm" variant="outline">View Details</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Forms Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Elements</h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Create New Ticket</CardTitle>
            <CardDescription>Fill in the details below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter ticket subject" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select id="priority">
                <SelectOption value="">Select priority</SelectOption>
                <SelectOption value="low">Low</SelectOption>
                <SelectOption value="medium">Medium</SelectOption>
                <SelectOption value="high">High</SelectOption>
                <SelectOption value="urgent">Urgent</SelectOption>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the issue in detail..."
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Submit Ticket</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Navigation Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Navigation Components</h2>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Navbar</h3>
          <div className="border rounded-lg overflow-hidden">
            <Navbar 
              user={{ name: "John Doe", email: "john@example.com" }}
              notifications={5}
              onMenuClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tabs</h3>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Your ticket overview and statistics</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="tickets">
              <Card>
                <CardHeader>
                  <CardTitle>Tickets</CardTitle>
                  <CardDescription>Manage your support tickets</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Search & Filters</h2>
        <SearchFilter 
          placeholder="Search tickets..."
          onSearch={(term) => console.log('Search:', term)}
          onFilterChange={(filters) => console.log('Filters:', filters)}
        />
      </section>

      {/* Table Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Table Component</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#1234</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Login issue with account</TableCell>
                  <TableCell><StatusBadge status="open" /></TableCell>
                  <TableCell><PriorityBadge priority="high" /></TableCell>
                  <TableCell className="text-right">
                    <MoreActionsDropdown>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </MoreActionsDropdown>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#1235</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Payment processing error</TableCell>
                  <TableCell><StatusBadge status="pending" /></TableCell>
                  <TableCell><PriorityBadge priority="urgent" /></TableCell>
                  <TableCell className="text-right">
                    <MoreActionsDropdown>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </MoreActionsDropdown>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <PaginationInfo 
              currentPage={currentPage}
              totalPages={10}
              pageSize={10}
              totalItems={95}
            />
            <Pagination 
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </CardFooter>
        </Card>
      </section>

      {/* Dropdown Menu */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dropdown Menus</h2>
        <div className="flex gap-4">
          <DropdownMenu 
            trigger={<Button variant="outline">Options Menu</Button>}
          >
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenu>

          <MoreActionsDropdown>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
          </MoreActionsDropdown>
        </div>
      </section>

      {/* Sidebar Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sidebar Component</h2>
        <div className="border rounded-lg overflow-hidden h-96 relative">
          <Sidebar className="absolute left-0 top-0 h-full" />
          <div className="ml-64 p-4">
            <p className="text-sm text-muted-foreground">
              The sidebar component is shown here. It includes navigation items with badges,
              collapsible sections, and status indicators.
            </p>
          </div>
        </div>
      </section>

      {/* Tooltips Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tooltips</h2>
        <div className="flex gap-4 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a helpful tooltip</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Add new item</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      {/* Toast Notifications */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Toast Notifications</h2>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => showToast('success')} variant="outline">Show Success</Button>
          <Button onClick={() => showToast('error')} variant="outline">Show Error</Button>
          <Button onClick={() => showToast('warning')} variant="outline">Show Warning</Button>
          <Button onClick={() => showToast('info')} variant="outline">Show Info</Button>
        </div>
      </section>

      {/* File Upload */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">File Upload</h2>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>Drag and drop or click to upload</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              multiple
              files={uploadedFiles}
              onFilesSelected={(files) => {
                setUploadedFiles([...uploadedFiles, ...files]);
                showToast('success');
              }}
              onFileRemove={(index) => {
                setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
              }}
            />
          </CardContent>
        </Card>
      </section>

      {/* Chat Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Chat Components</h2>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>WhatsApp Chat Interface</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DateSeparator date={new Date()} />
            
            <ChatBubble
              message="Hello! I need help with my order."
              timestamp={new Date()}
              isOutgoing={false}
              avatar={{ fallback: 'JD' }}
              userName="John Doe"
            />
            
            <ChatBubble
              message="Of course! I'd be happy to help you with your order. Can you please provide your order number?"
              timestamp={new Date()}
              isOutgoing={true}
              status="read"
            />
            
            <SystemMessage message="Agent joined the conversation" timestamp={new Date()} />
            
            <ChatBubble
              message="My order number is #12345"
              timestamp={new Date()}
              isOutgoing={false}
              avatar={{ fallback: 'JD' }}
              userName="John Doe"
            />
            
            <TypingIndicator userName="Agent" />
          </CardContent>
        </Card>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Timeline / Activity Feed</h2>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Ticket Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed
              activities={[
                {
                  type: 'TicketCreated',
                  data: {
                    ticket: { id: '1234', subject: 'Login issue' },
                    time: '2 hours ago',
                    user: { name: 'John Doe', avatar: null }
                  }
                },
                {
                  type: 'StatusChanged',
                  data: {
                    from: 'New',
                    to: 'Open',
                    time: '1 hour ago',
                    user: { name: 'Agent Smith' }
                  }
                },
                {
                  type: 'CommentAdded',
                  data: {
                    comment: 'I\'ve reviewed the issue and will investigate further.',
                    time: '45 minutes ago',
                    user: { name: 'Agent Smith' },
                    isInternal: true
                  }
                },
                {
                  type: 'CustomerReplied',
                  data: {
                    message: 'Thank you for looking into this!',
                    channel: 'whatsapp',
                    time: '30 minutes ago',
                    user: { name: 'John Doe' }
                  }
                }
              ]}
            />
          </CardContent>
        </Card>
      </section>

      {/* Empty States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Empty States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-0">
              <EmptyStates.NoTickets onCreateTicket={() => showToast('info')} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              <EmptyStates.NoSearchResults searchTerm="invoice" onClearSearch={() => {}} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              <IllustratedEmptyState
                illustration="search"
                title="No results found"
                description="Try adjusting your filters"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Error States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Error States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-0">
              <ErrorStates.NetworkError onRetry={() => showToast('info')} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              <ErrorStates.NotFound onGoHome={() => {}} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Date & Time Pickers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Date & Time Pickers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Date Picker</Label>
            <DatePicker 
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Select a date"
            />
            <p className="text-sm text-muted-foreground">
              Selected: {selectedDate.toLocaleDateString()}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Time Picker</Label>
            <TimePicker 
              value={selectedTime}
              onChange={setSelectedTime}
              placeholder="Select time"
            />
            <p className="text-sm text-muted-foreground">
              Selected: {selectedTime.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Date & Time Picker</Label>
            <DateTimePicker 
              value={selectedDateTime}
              onChange={setSelectedDateTime}
            />
            <p className="text-sm text-muted-foreground">
              Selected: {selectedDateTime.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Dialogs & Modals */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dialogs & Modals</h2>
        <div className="flex gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Ticket</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new support ticket.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="Enter ticket subject" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe your issue..." rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Create Ticket</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Ticket</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the ticket
                  and remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => showToast('error')}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* Rich Text Editor Toolbar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Editor Toolbars</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Full Editor Toolbar</CardTitle>
            <CardDescription>Complete toolbar for rich text editing</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <EditorToolbar 
              onAction={(action, data) => console.log('Editor action:', action, data)}
            />
            <div className="p-4">
              <Textarea 
                placeholder="Start typing your message..."
                rows={4}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Minimal Toolbar</CardTitle>
            <CardDescription>Compact toolbar for simple formatting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <MinimalToolbar 
                onAction={(action) => console.log('Minimal action:', action)}
              />
              <Input placeholder="Type a quick reply..." />
            </div>
          </CardContent>
        </Card>

        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Emoji Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <EmojiPicker 
              onSelect={(emoji) => showToast('info')}
            />
          </CardContent>
        </Card>
      </section>

      {/* Priority Indicators */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Priority Components</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Priority Indicators</h3>
            <div className="flex flex-wrap gap-4">
              <PriorityIndicator priority="low" showLabel />
              <PriorityIndicator priority="medium" showLabel />
              <PriorityIndicator priority="high" showLabel />
              <PriorityIndicator priority="urgent" showLabel />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Priority Variants</h3>
            <div className="space-y-2">
              <div className="flex gap-4">
                <PriorityIndicator priority="high" variant="default" showLabel />
                <PriorityIndicator priority="high" variant="minimal" showLabel />
                <PriorityIndicator priority="high" variant="flag" showLabel />
                <PriorityIndicator priority="high" variant="dot" showLabel />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Priority Selector</h3>
            <PrioritySelector 
              value={selectedPriority}
              onChange={setSelectedPriority}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedPriority}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Priority Toggle</h3>
            <div className="flex items-center gap-4">
              <PriorityToggle 
                value={selectedPriority}
                onChange={setSelectedPriority}
              />
              <span className="text-sm text-muted-foreground">
                Click to cycle through priorities
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Priority Filter</h3>
            <PriorityFilter 
              selected={selectedPriorities}
              onChange={setSelectedPriorities}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedPriorities.join(', ') || 'none'}
            </p>
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Loading States</h2>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Skeleton Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonCard />
            <SkeletonCard showFooter={false} />
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <SkeletonTable rows={3} columns={5} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Loading Spinners</h3>
          <div className="flex items-center gap-4">
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" />
            <PageLoading title="Loading tickets..." />
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Color System</h2>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Priority Colors</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2"></div>
              <p className="text-sm">Low</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-blue-100 dark:bg-blue-900 rounded-lg mb-2"></div>
              <p className="text-sm">Medium</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-orange-100 dark:bg-orange-900 rounded-lg mb-2"></div>
              <p className="text-sm">High</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-red-100 dark:bg-red-900 rounded-lg mb-2"></div>
              <p className="text-sm">Urgent</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Status Colors</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg mb-2"></div>
              <p className="text-sm">New</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-blue-100 dark:bg-blue-900 rounded-lg mb-2"></div>
              <p className="text-sm">Open</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-yellow-100 dark:bg-yellow-900 rounded-lg mb-2"></div>
              <p className="text-sm">Pending</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-green-100 dark:bg-green-900 rounded-lg mb-2"></div>
              <p className="text-sm">Resolved</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2"></div>
              <p className="text-sm">Closed</p>
            </div>
          </div>
        </div>
      </section>
        </div>
      </ToastProvider>
    </TooltipProvider>
  );
}

export default DesignSystem;