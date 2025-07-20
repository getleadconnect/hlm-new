import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Search, Filter, MoreHorizontal, Clock, CheckCircle, AlertCircle,
    XCircle, User, Calendar, Tag, MessageCircle, ArrowRight, Timer,
    TrendingUp, Target, Award, Coffee, Phone, Mail, Globe, Send,
    Paperclip, Bold, Italic, List, Quote, Code, Link2, Smile,
    ChevronDown, Star, Flag, Archive, Trash2, Forward
} from 'lucide-react';
import { 
    Button, Input, Badge, Card, CardContent, CardDescription,
    CardHeader, CardTitle, Tabs, TabsContent, TabsList,
    TabsTrigger, Separator, Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue, Avatar, AvatarFallback, AvatarImage,
    Progress, PriorityBadge, StatusBadge, ChatBubble, Sidebar,
    Navbar, Textarea, DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger, Tooltip, TooltipContent, TooltipProvider,
    TooltipTrigger
} from '../../components/ui';

export default function AgentWorkspace() {
    const [selectedTicket, setSelectedTicket] = useState('TKT-001234');
    const [message, setMessage] = useState('');
    const [quickReplies] = useState([
        'Thank you for contacting support. How can I help you today?',
        'I understand your concern. Let me look into this for you.',
        'I\'ve resolved the issue. Please check and confirm.',
        'Is there anything else I can help you with?'
    ]);

    // Mock data
    const stats = {
        resolved: 12,
        avgResponseTime: '15m',
        satisfaction: 4.8,
        firstResponseRate: 95
    };

    const myTickets = [
        {
            id: 'TKT-001234',
            subject: 'Unable to process refund for order #12345',
            customer: 'John Doe',
            status: 'open',
            priority: 'high',
            waitingTime: '2h',
            messages: 5,
            lastMessage: '30m ago'
        },
        {
            id: 'TKT-001235',
            subject: 'Login issues with 2FA enabled',
            customer: 'Jane Smith',
            status: 'pending',
            priority: 'medium',
            waitingTime: '1h',
            messages: 3,
            lastMessage: '1h ago'
        },
        {
            id: 'TKT-001236',
            subject: 'Feature request for bulk export',
            customer: 'Mike Johnson',
            status: 'open',
            priority: 'low',
            waitingTime: '4h',
            messages: 2,
            lastMessage: '2h ago'
        }
    ];

    const ticketQueue = [
        {
            id: 'TKT-001237',
            subject: 'Payment failed but amount deducted',
            customer: 'Sarah Wilson',
            priority: 'urgent',
            waitingTime: '10m',
            source: 'whatsapp'
        },
        {
            id: 'TKT-001238',
            subject: 'Account suspended without notice',
            customer: 'Robert Brown',
            priority: 'high',
            waitingTime: '25m',
            source: 'email'
        }
    ];

    const currentTicket = {
        id: 'TKT-001234',
        subject: 'Unable to process refund for order #12345',
        customer: {
            name: 'John Doe',
            email: 'john.doe@company.com',
            phone: '+1 234 567 8900',
            avatar: '/placeholder-avatar.jpg'
        },
        conversation: [
            {
                id: 1,
                type: 'customer',
                author: 'John Doe',
                message: 'I tried to process a refund but getting an error. Order #12345.',
                timestamp: '10:30 AM',
                source: 'whatsapp'
            },
            {
                id: 2,
                type: 'agent',
                author: 'You',
                message: 'I understand your concern. Let me check the order details.',
                timestamp: '10:32 AM'
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <Sidebar>
                <div className="p-4 space-y-4">
                    {/* Agent Stats */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Today's Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Resolved</span>
                                <span className="font-medium">{stats.resolved}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Avg Response</span>
                                <span className="font-medium">{stats.avgResponseTime}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Satisfaction</span>
                                <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                    <span className="font-medium">{stats.satisfaction}</span>
                                </div>
                            </div>
                            <Progress value={stats.firstResponseRate} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                                {stats.firstResponseRate}% First Response Rate
                            </p>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                            <Coffee className="mr-2 h-4 w-4" />
                            Take a Break
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <Phone className="mr-2 h-4 w-4" />
                            Make a Call
                        </Button>
                    </div>
                </div>
            </Sidebar>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navigation */}
                <Navbar>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            <h1 className="text-lg font-semibold">Agent Workspace</h1>
                            <Badge variant="secondary">
                                <div className="h-2 w-2 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                                Available
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Target className="mr-2 h-4 w-4" />
                                My Goals
                            </Button>
                            <Button variant="outline" size="sm">
                                <Award className="mr-2 h-4 w-4" />
                                Achievements
                            </Button>
                        </div>
                    </div>
                </Navbar>

                {/* Workspace Content */}
                <div className="flex-1 flex">
                    {/* Tickets Panel */}
                    <div className="w-80 border-r border-border bg-muted/30">
                        <Tabs defaultValue="my-tickets" className="h-full flex flex-col">
                            <div className="p-4 border-b border-border">
                                <TabsList className="w-full">
                                    <TabsTrigger value="my-tickets" className="flex-1">
                                        My Tickets
                                        <Badge variant="secondary" className="ml-1.5">
                                            {myTickets.length}
                                        </Badge>
                                    </TabsTrigger>
                                    <TabsTrigger value="queue" className="flex-1">
                                        Queue
                                        <Badge variant="secondary" className="ml-1.5">
                                            {ticketQueue.length}
                                        </Badge>
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="my-tickets" className="flex-1 p-0 m-0">
                                <div className="p-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            placeholder="Search tickets..."
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1 px-2">
                                    {myTickets.map((ticket) => (
                                        <button
                                            key={ticket.id}
                                            onClick={() => setSelectedTicket(ticket.id)}
                                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                                                selectedTicket === ticket.id
                                                    ? 'bg-background border border-border shadow-sm'
                                                    : 'hover:bg-muted'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <span className="font-medium text-sm">{ticket.id}</span>
                                                <div className="flex items-center gap-1">
                                                    <PriorityBadge priority={ticket.priority} size="sm" />
                                                    <StatusBadge status={ticket.status} size="sm" />
                                                </div>
                                            </div>
                                            <p className="text-sm line-clamp-2 mb-2">{ticket.subject}</p>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>{ticket.customer}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {ticket.waitingTime}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MessageCircle className="h-3 w-3" />
                                                        {ticket.messages}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="queue" className="flex-1 p-0 m-0">
                                <div className="p-4 space-y-2">
                                    <p className="text-sm text-muted-foreground mb-3">
                                        New tickets waiting to be assigned
                                    </p>
                                    {ticketQueue.map((ticket) => (
                                        <div
                                            key={ticket.id}
                                            className="p-3 rounded-lg border bg-background space-y-2"
                                        >
                                            <div className="flex items-start justify-between">
                                                <span className="font-medium text-sm">{ticket.id}</span>
                                                <PriorityBadge priority={ticket.priority} size="sm" />
                                            </div>
                                            <p className="text-sm line-clamp-2">{ticket.subject}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">
                                                    {ticket.customer}
                                                </span>
                                                <Button size="sm" variant="outline">
                                                    <ArrowRight className="mr-1 h-3 w-3" />
                                                    Assign to me
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Ticket Detail */}
                    <div className="flex-1 flex flex-col">
                        {/* Ticket Header */}
                        <div className="p-4 border-b border-border bg-background">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h2 className="font-semibold">{currentTicket.id}</h2>
                                    <StatusBadge status="open" />
                                    <PriorityBadge priority="high" />
                                    <Badge variant="outline">
                                        <Timer className="mr-1 h-3 w-3" />
                                        SLA: 2h remaining
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <Star className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Follow ticket</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Forward className="mr-2 h-4 w-4" />
                                                Forward to Team
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Flag className="mr-2 h-4 w-4" />
                                                Flag for Review
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Archive className="mr-2 h-4 w-4" />
                                                Archive
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {currentTicket.subject}
                            </p>
                        </div>

                        {/* Conversation Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {currentTicket.conversation.map((msg) => (
                                <ChatBubble
                                    key={msg.id}
                                    type={msg.type}
                                    author={msg.author}
                                    message={msg.message}
                                    timestamp={msg.timestamp}
                                    source={msg.source}
                                />
                            ))}
                        </div>

                        {/* Reply Box */}
                        <div className="border-t border-border bg-background p-4">
                            {/* Quick Replies */}
                            <div className="mb-3">
                                <Select onValueChange={(value) => setMessage(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose a quick reply..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {quickReplies.map((reply, idx) => (
                                            <SelectItem key={idx} value={reply}>
                                                {reply}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Message Input */}
                            <div className="space-y-3">
                                <Textarea
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="min-h-[100px]"
                                />
                                
                                {/* Toolbar */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Bold className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Italic className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <List className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Link2 className="h-4 w-4" />
                                        </Button>
                                        <Separator orientation="vertical" className="h-6 mx-1" />
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Paperclip className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Smile className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Select defaultValue="open">
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="open">Send & Open</SelectItem>
                                                <SelectItem value="pending">Send & Pending</SelectItem>
                                                <SelectItem value="resolved">Send & Resolve</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info Panel */}
                    <div className="w-80 border-l border-border bg-muted/30 p-4 space-y-4">
                        {/* Customer Details */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Customer Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={currentTicket.customer.avatar} />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{currentTicket.customer.name}</p>
                                        <p className="text-sm text-muted-foreground">Premium Customer</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="truncate">{currentTicket.customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{currentTicket.customer.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <span>San Francisco, CA</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Previous Tickets */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Previous Tickets</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <p className="font-medium">TKT-001230</p>
                                        <p className="text-xs text-muted-foreground">
                                            Login issues - Resolved 3 days ago
                                        </p>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium">TKT-001225</p>
                                        <p className="text-xs text-muted-foreground">
                                            Billing inquiry - Resolved 1 week ago
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Internal Notes */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Internal Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    placeholder="Add internal notes..."
                                    className="min-h-[80px] text-sm"
                                />
                                <Button size="sm" className="mt-2">Save Note</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}