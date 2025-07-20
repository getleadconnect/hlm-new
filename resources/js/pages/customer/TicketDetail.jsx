import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, Send, Paperclip, Download, Clock, User, Tag,
    Calendar, MessageCircle, AlertCircle, MoreVertical,
    Phone, Mail, Globe, FileText, Image, File, X, CheckCircle,
    Edit2, Trash2, Reply, Forward, Star, Flag
} from 'lucide-react';
import { 
    Button, Input, Badge, Card, CardContent, CardDescription,
    CardHeader, CardTitle, Tabs, TabsContent, TabsList,
    TabsTrigger, Separator, Textarea, PriorityBadge, StatusBadge,
    ChatBubble, Timeline, FileUpload, RichTextEditor, Tooltip,
    TooltipContent, TooltipProvider, TooltipTrigger, DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger, Avatar, AvatarFallback,
    AvatarImage, Alert, AlertDescription, Label, Select, SelectContent,
    SelectItem, SelectTrigger, SelectValue
} from '../../components/ui';

export default function TicketDetail() {
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock ticket data
    const ticket = {
        id: 'TKT-001234',
        subject: 'Unable to process refund for order #12345',
        status: 'open',
        priority: 'high',
        created: '2024-01-20 14:30',
        updated: '2024-01-20 16:45',
        source: 'whatsapp',
        customer: {
            name: 'John Doe',
            email: 'john.doe@company.com',
            phone: '+1 234 567 8900',
            company: 'Acme Corp',
            avatar: '/placeholder-avatar.jpg'
        },
        agent: {
            name: 'Sarah Chen',
            avatar: '/placeholder-agent.jpg',
            status: 'online'
        },
        tags: ['refund', 'payment', 'urgent'],
        description: 'I tried to process a refund for order #12345 but the system is showing an error. The customer has been waiting for 5 days and is getting frustrated. Please help resolve this urgently.'
    };

    const conversation = [
        {
            id: 1,
            type: 'customer',
            author: 'John Doe',
            avatar: '/placeholder-avatar.jpg',
            message: 'I tried to process a refund for order #12345 but the system is showing an error. The customer has been waiting for 5 days and is getting frustrated. Please help resolve this urgently.',
            timestamp: '2024-01-20 14:30',
            source: 'whatsapp',
            attachments: [
                { name: 'error-screenshot.png', type: 'image', size: '245 KB' }
            ]
        },
        {
            id: 2,
            type: 'agent',
            author: 'Sarah Chen',
            avatar: '/placeholder-agent.jpg',
            message: 'Hello John, I understand your concern about the refund issue. Let me look into this right away. Can you please provide the customer\'s email address associated with order #12345?',
            timestamp: '2024-01-20 14:45',
            source: 'web'
        },
        {
            id: 3,
            type: 'customer',
            author: 'John Doe',
            avatar: '/placeholder-avatar.jpg',
            message: 'The customer email is customer@example.com. They made the purchase on January 15th.',
            timestamp: '2024-01-20 15:00',
            source: 'whatsapp'
        },
        {
            id: 4,
            type: 'agent',
            author: 'Sarah Chen',
            avatar: '/placeholder-agent.jpg',
            message: 'Thank you for the information. I\'ve checked our system and found that the refund was blocked due to a payment gateway issue. I\'ve manually processed the refund now. The customer should receive their money within 3-5 business days.',
            timestamp: '2024-01-20 15:30',
            source: 'web',
            attachments: [
                { name: 'refund-confirmation.pdf', type: 'file', size: '128 KB' }
            ]
        },
        {
            id: 5,
            type: 'system',
            message: 'Status changed from New to Open',
            timestamp: '2024-01-20 14:31'
        },
        {
            id: 6,
            type: 'system',
            message: 'Priority changed from Medium to High',
            timestamp: '2024-01-20 14:35'
        }
    ];

    const activities = [
        {
            id: 1,
            type: 'created',
            description: 'Ticket created via WhatsApp',
            timestamp: '2024-01-20 14:30',
            user: 'John Doe'
        },
        {
            id: 2,
            type: 'assigned',
            description: 'Assigned to Sarah Chen',
            timestamp: '2024-01-20 14:31',
            user: 'System'
        },
        {
            id: 3,
            type: 'status',
            description: 'Status changed from New to Open',
            timestamp: '2024-01-20 14:31',
            user: 'Sarah Chen'
        },
        {
            id: 4,
            type: 'priority',
            description: 'Priority changed from Medium to High',
            timestamp: '2024-01-20 14:35',
            user: 'Sarah Chen'
        },
        {
            id: 5,
            type: 'note',
            description: 'Internal note added',
            timestamp: '2024-01-20 15:15',
            user: 'Sarah Chen'
        }
    ];

    const handleSendMessage = async () => {
        if (!message.trim() && attachments.length === 0) return;
        
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Sending message:', message, attachments);
        setMessage('');
        setAttachments([]);
        setIsSubmitting(false);
    };

    const handleFileSelect = (files) => {
        setAttachments([...attachments, ...files]);
    };

    const removeAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-border bg-background">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link to="/customer/tickets">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Ticket</span>
                            <span className="font-mono text-sm font-medium">{ticket.id}</span>
                            <StatusBadge status={ticket.status} />
                            <PriorityBadge priority={ticket.priority} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Star className="mr-2 h-4 w-4" />
                            Follow
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Edit2 className="mr-2 h-4 w-4" />
                                    Edit Ticket
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Forward className="mr-2 h-4 w-4" />
                                    Forward
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Flag className="mr-2 h-4 w-4" />
                                    Flag as Spam
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Close Ticket
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Conversation */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Subject */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        {isEditing ? (
                                            <Input
                                                defaultValue={ticket.subject}
                                                className="text-xl font-semibold"
                                                autoFocus
                                            />
                                        ) : (
                                            <CardTitle className="text-xl">{ticket.subject}</CardTitle>
                                        )}
                                        <CardDescription>
                                            Created on {ticket.created} • Last updated {ticket.updated}
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Conversation Tabs */}
                        <Tabs defaultValue="conversation" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="conversation">
                                    Conversation
                                    <Badge variant="secondary" className="ml-1.5">4</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="internal">
                                    Internal Notes
                                    <Badge variant="secondary" className="ml-1.5">2</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="activity">
                                    Activity
                                    <Badge variant="secondary" className="ml-1.5">5</Badge>
                                </TabsTrigger>
                            </TabsList>

                            {/* Conversation Tab */}
                            <TabsContent value="conversation" className="space-y-4">
                                {conversation.map((item) => {
                                    if (item.type === 'system') {
                                        return (
                                            <div key={item.id} className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex-1 border-t border-border" />
                                                <span>{item.message}</span>
                                                <span>•</span>
                                                <span>{item.timestamp}</span>
                                                <div className="flex-1 border-t border-border" />
                                            </div>
                                        );
                                    }

                                    return (
                                        <ChatBubble
                                            key={item.id}
                                            type={item.type}
                                            author={item.author}
                                            avatar={item.avatar}
                                            message={item.message}
                                            timestamp={item.timestamp}
                                            source={item.source}
                                            attachments={item.attachments}
                                            onReply={() => console.log('Reply to:', item.id)}
                                        />
                                    );
                                })}

                                {/* Reply Box */}
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="space-y-4">
                                            <RichTextEditor
                                                value={message}
                                                onChange={setMessage}
                                                placeholder="Type your message..."
                                                disabled={isSubmitting}
                                            />
                                            
                                            {/* Attachments */}
                                            {attachments.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {attachments.map((file, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-2 rounded-md border bg-muted px-3 py-1.5 text-sm"
                                                        >
                                                            <FileText className="h-4 w-4" />
                                                            <span>{file.name}</span>
                                                            <button
                                                                onClick={() => removeAttachment(index)}
                                                                className="text-muted-foreground hover:text-foreground"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FileUpload
                                                        onFileSelect={handleFileSelect}
                                                        multiple
                                                        accept="image/*,.pdf,.doc,.docx,.txt"
                                                    >
                                                        <Button variant="ghost" size="sm">
                                                            <Paperclip className="h-4 w-4" />
                                                        </Button>
                                                    </FileUpload>
                                                    
                                                    <Select defaultValue="reply">
                                                        <SelectTrigger className="w-[140px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="reply">Reply</SelectItem>
                                                            <SelectItem value="reply-close">Reply & Close</SelectItem>
                                                            <SelectItem value="reply-pending">Reply & Pending</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                
                                                <Button
                                                    onClick={handleSendMessage}
                                                    disabled={isSubmitting || (!message.trim() && attachments.length === 0)}
                                                >
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Send
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Internal Notes Tab */}
                            <TabsContent value="internal" className="space-y-4">
                                <Alert>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Internal notes are only visible to support agents and not to customers.
                                    </AlertDescription>
                                </Alert>
                                <Card>
                                    <CardContent className="p-4">
                                        <p className="text-center text-muted-foreground py-8">
                                            No internal notes yet
                                        </p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Activity Tab */}
                            <TabsContent value="activity" className="space-y-4">
                                <Timeline activities={activities} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={ticket.customer.avatar} />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{ticket.customer.name}</p>
                                        <p className="text-sm text-muted-foreground">{ticket.customer.company}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <a href={`mailto:${ticket.customer.email}`} className="hover:underline">
                                            {ticket.customer.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <a href={`tel:${ticket.customer.phone}`} className="hover:underline">
                                            {ticket.customer.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                        <a 
                                            href={`https://wa.me/${ticket.customer.phone.replace(/\s+/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                                <Separator />
                                <Button variant="outline" size="sm" className="w-full">
                                    View Customer Profile
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Ticket Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Ticket Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Status</span>
                                        <StatusBadge status={ticket.status} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Priority</span>
                                        <PriorityBadge priority={ticket.priority} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Source</span>
                                        <Badge variant="outline">
                                            <MessageCircle className="mr-1 h-3 w-3" />
                                            WhatsApp
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Created</span>
                                        <span>{ticket.created}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Updated</span>
                                        <span>{ticket.updated}</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label className="text-sm">Tags</Label>
                                    <div className="flex flex-wrap gap-1">
                                        {ticket.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                <Tag className="mr-1 h-3 w-3" />
                                                {tag}
                                            </Badge>
                                        ))}
                                        <Button variant="ghost" size="sm" className="h-6 px-2">
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Assigned Agent */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Assigned Agent</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={ticket.agent.avatar} />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{ticket.agent.name}</p>
                                        <p className="text-sm text-muted-foreground">Online</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Tickets */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Related Tickets</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">No related tickets found</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}