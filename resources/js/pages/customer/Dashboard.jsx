import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Plus, Search, Filter, Clock, CheckCircle, AlertCircle, 
    XCircle, MessageCircle, ChevronRight, FileText, HelpCircle,
    User, LogOut, Settings, Bell
} from 'lucide-react';
import { 
    Button, Input, Badge, Card, CardContent, CardDescription, 
    CardHeader, CardTitle, DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger, Avatar, AvatarFallback, AvatarImage,
    PriorityBadge, StatusBadge
} from '../../components/ui';
import { PRIORITY_COLORS, STATUS_COLORS } from '../../lib/constants';

export default function CustomerDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    
    // Mock data for demonstration
    const stats = {
        total: 24,
        open: 5,
        pending: 3,
        resolved: 16
    };

    const recentTickets = [
        {
            id: 'TKT-001234',
            subject: 'Unable to process refund for order #12345',
            status: 'open',
            priority: 'high',
            created: '2 hours ago',
            lastUpdate: '30 minutes ago',
            agent: 'Sarah Chen'
        },
        {
            id: 'TKT-001233',
            subject: 'WhatsApp integration not syncing messages',
            status: 'pending',
            priority: 'medium',
            created: '1 day ago',
            lastUpdate: '4 hours ago',
            agent: 'James Rodriguez'
        },
        {
            id: 'TKT-001232',
            subject: 'Account access issues after password reset',
            status: 'resolved',
            priority: 'low',
            created: '3 days ago',
            lastUpdate: '2 days ago',
            agent: 'Maria Santos'
        },
        {
            id: 'TKT-001231',
            subject: 'Billing discrepancy in monthly invoice',
            status: 'open',
            priority: 'urgent',
            created: '5 days ago',
            lastUpdate: '1 day ago',
            agent: 'David Kim'
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'open':
                return <AlertCircle className="h-4 w-4" />;
            case 'pending':
                return <Clock className="h-4 w-4" />;
            case 'resolved':
                return <CheckCircle className="h-4 w-4" />;
            case 'closed':
                return <XCircle className="h-4 w-4" />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-border bg-background">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                                H
                            </div>
                            <span className="text-xl font-semibold">HLM Support</span>
                        </Link>
                        
                        <nav className="hidden md:flex items-center gap-6">
                            <Link to="/customer/dashboard" className="text-foreground font-medium">
                                Dashboard
                            </Link>
                            <Link to="/customer/tickets" className="text-muted-foreground hover:text-foreground transition-colors">
                                My Tickets
                            </Link>
                            <Link to="/customer/knowledge" className="text-muted-foreground hover:text-foreground transition-colors">
                                Help Center
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder-avatar.jpg" alt="John Doe" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">John Doe</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            john.doe@company.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
                    <p className="text-muted-foreground">Here's an overview of your support requests</p>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button asChild className="flex-1 sm:flex-none">
                        <Link to="/customer/tickets/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Ticket
                        </Link>
                    </Button>
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search tickets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open</CardTitle>
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.open}</div>
                            <p className="text-xs text-muted-foreground">Awaiting response</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending}</div>
                            <p className="text-xs text-muted-foreground">In progress</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.resolved}</div>
                            <p className="text-xs text-muted-foreground">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Tickets */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Recent Tickets</CardTitle>
                                <CardDescription>Your latest support requests</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link to="/customer/tickets">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentTickets.map((ticket) => (
                                <Link
                                    key={ticket.id}
                                    to={`/customer/tickets/${ticket.id}`}
                                    className="block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="font-medium text-foreground">
                                                    {ticket.id}
                                                </span>
                                                <span>•</span>
                                                <span>{ticket.created}</span>
                                            </div>
                                            <h3 className="font-medium line-clamp-1">
                                                {ticket.subject}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {ticket.agent}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    Updated {ticket.lastUpdate}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <PriorityBadge priority={ticket.priority} />
                                            <StatusBadge status={ticket.status} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Help Section */}
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5" />
                                Need Quick Help?
                            </CardTitle>
                            <CardDescription>
                                Connect with us instantly via WhatsApp
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full" asChild>
                                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
                                    Chat on WhatsApp
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5" />
                                Knowledge Base
                            </CardTitle>
                            <CardDescription>
                                Find answers to common questions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full" asChild>
                                <Link to="/customer/knowledge">
                                    Browse Help Articles
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}