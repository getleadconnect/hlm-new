import React, { useState } from 'react';
import { 
    ArrowLeft, Send, Paperclip, MoreVertical, Clock,
    MessageCircle, User, Tag, ChevronDown, ChevronUp,
    Camera, Mic, Image as ImageIcon
} from 'lucide-react';
import { 
    Button, Badge, Sheet, SheetContent, SheetDescription,
    SheetHeader, SheetTitle, SheetTrigger, Textarea,
    PriorityBadge, StatusBadge, ChatBubble, Tabs,
    TabsContent, TabsList, TabsTrigger, Separator,
    Collapsible, CollapsibleContent, CollapsibleTrigger
} from '../ui';

export default function MobileTicketView({ ticket, onBack }) {
    const [message, setMessage] = useState('');
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('conversation');
    const [replyBoxHeight, setReplyBoxHeight] = useState('120px');

    const handleSend = () => {
        if (message.trim()) {
            console.log('Sending:', message);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Mobile Header */}
            <header className="flex-shrink-0 border-b bg-background">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onBack}
                            className="flex-shrink-0"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-sm font-medium">
                                    {ticket.id}
                                </span>
                                <StatusBadge status={ticket.status} size="sm" />
                                <PriorityBadge priority={ticket.priority} size="sm" />
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                                {ticket.subject}
                            </p>
                        </div>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-auto">
                            <SheetHeader>
                                <SheetTitle>Ticket Actions</SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-2 py-4">
                                <Button variant="outline" className="justify-start">
                                    <User className="mr-2 h-4 w-4" />
                                    View Customer
                                </Button>
                                <Button variant="outline" className="justify-start">
                                    <Tag className="mr-2 h-4 w-4" />
                                    Add Tags
                                </Button>
                                <Button variant="outline" className="justify-start">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Change Priority
                                </Button>
                                <Button variant="outline" className="justify-start text-destructive">
                                    Close Ticket
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Collapsible Details */}
                <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                    <CollapsibleTrigger asChild>
                        <button className="w-full px-4 pb-2 flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <span>Ticket Details</span>
                            {detailsOpen ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="px-4 pb-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-muted-foreground mb-1">Customer</p>
                                    <p className="font-medium">{ticket.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground mb-1">Agent</p>
                                    <p className="font-medium">{ticket.agent.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground mb-1">Created</p>
                                    <p className="font-medium">{ticket.created}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground mb-1">Updated</p>
                                    <p className="font-medium">{ticket.updated}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-muted-foreground mb-1 text-sm">Tags</p>
                                <div className="flex flex-wrap gap-1">
                                    {ticket.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                {/* Tabs */}
                <TabsList className="w-full justify-start px-4 h-10">
                    <TabsTrigger value="conversation" className="text-xs">
                        Messages
                        <Badge variant="secondary" className="ml-1 h-5 px-1">
                            {ticket.messages}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="text-xs">
                        Activity
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="text-xs">
                        Notes
                    </TabsTrigger>
                </TabsList>
            </header>

            {/* Content Area */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                {/* Conversation Tab */}
                <TabsContent value="conversation" className="flex-1 flex flex-col m-0 min-h-0">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                        {ticket.conversation.map((msg) => (
                            <div key={msg.id}>
                                {msg.type === 'system' ? (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                                        <Separator className="flex-1" />
                                        <span>{msg.message}</span>
                                        <Separator className="flex-1" />
                                    </div>
                                ) : (
                                    <ChatBubble
                                        type={msg.type}
                                        author={msg.author}
                                        avatar={msg.avatar}
                                        message={msg.message}
                                        timestamp={msg.timestamp}
                                        source={msg.source}
                                        attachments={msg.attachments}
                                        compact
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Reply Box */}
                    <div className="flex-shrink-0 border-t bg-background p-4 space-y-3">
                        <div className="relative">
                            <Textarea
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="pr-12 resize-none"
                                style={{ height: replyBoxHeight }}
                                onFocus={() => setReplyBoxHeight('160px')}
                                onBlur={() => !message && setReplyBoxHeight('120px')}
                            />
                            <div className="absolute bottom-2 right-2 flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Paperclip className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Camera className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    Photo
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Mic className="mr-2 h-4 w-4" />
                                    Voice
                                </Button>
                            </div>
                            <Button
                                size="sm"
                                onClick={handleSend}
                                disabled={!message.trim()}
                            >
                                <Send className="mr-2 h-4 w-4" />
                                Send
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="flex-1 overflow-y-auto m-0">
                    <div className="p-4 space-y-4">
                        {ticket.activities.map((activity) => (
                            <div key={activity.id} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.user} • {activity.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* Notes Tab */}
                <TabsContent value="notes" className="flex-1 overflow-y-auto m-0">
                    <div className="p-4">
                        <div className="text-center text-muted-foreground py-8">
                            <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p className="text-sm">No internal notes yet</p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}