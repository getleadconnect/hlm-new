import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Plus, Search, Filter, Download, ChevronLeft, ChevronRight,
    ChevronsLeft, ChevronsRight, ArrowUpDown, Calendar,
    MoreHorizontal, Eye, MessageCircle, Trash2
} from 'lucide-react';
import { 
    Button, Input, Badge, Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue, DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger, Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow, Checkbox, Tabs, TabsContent, TabsList,
    TabsTrigger, PriorityBadge, StatusBadge, DatePickerWithRange,
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from '../../components/ui';

export default function TicketList() {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'created', direction: 'desc' });
    
    // Mock data
    const tickets = [
        {
            id: 'TKT-001234',
            subject: 'Unable to process refund for order #12345',
            status: 'open',
            priority: 'high',
            created: '2024-01-20 14:30',
            lastUpdate: '2024-01-20 16:45',
            agent: 'Sarah Chen',
            messages: 5
        },
        {
            id: 'TKT-001233',
            subject: 'WhatsApp integration not syncing messages',
            status: 'pending',
            priority: 'medium',
            created: '2024-01-19 10:15',
            lastUpdate: '2024-01-20 09:30',
            agent: 'James Rodriguez',
            messages: 8
        },
        {
            id: 'TKT-001232',
            subject: 'Account access issues after password reset',
            status: 'resolved',
            priority: 'low',
            created: '2024-01-17 16:20',
            lastUpdate: '2024-01-18 11:00',
            agent: 'Maria Santos',
            messages: 12
        },
        {
            id: 'TKT-001231',
            subject: 'Billing discrepancy in monthly invoice',
            status: 'open',
            priority: 'urgent',
            created: '2024-01-15 09:45',
            lastUpdate: '2024-01-19 15:20',
            agent: 'David Kim',
            messages: 15
        },
        {
            id: 'TKT-001230',
            subject: 'Feature request: Export data to CSV',
            status: 'closed',
            priority: 'low',
            created: '2024-01-14 13:00',
            lastUpdate: '2024-01-16 10:30',
            agent: 'Sarah Chen',
            messages: 6
        }
    ];

    const tabCounts = {
        all: 150,
        open: 45,
        pending: 23,
        resolved: 67,
        closed: 15
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSelectAll = () => {
        if (selectedTickets.length === tickets.length) {
            setSelectedTickets([]);
        } else {
            setSelectedTickets(tickets.map(t => t.id));
        }
    };

    const isSelected = (ticketId) => selectedTickets.includes(ticketId);

    const toggleSelection = (ticketId) => {
        if (isSelected(ticketId)) {
            setSelectedTickets(selectedTickets.filter(id => id !== ticketId));
        } else {
            setSelectedTickets([...selectedTickets, ticketId]);
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
                            <Link to="/customer/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                                Dashboard
                            </Link>
                            <Link to="/customer/tickets" className="text-foreground font-medium">
                                My Tickets
                            </Link>
                            <Link to="/customer/knowledge" className="text-muted-foreground hover:text-foreground transition-colors">
                                Help Center
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">My Tickets</h1>
                            <p className="text-muted-foreground">Manage and track your support requests</p>
                        </div>
                        <Button asChild>
                            <Link to="/customer/tickets/new">
                                <Plus className="mr-2 h-4 w-4" />
                                New Ticket
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search by ticket ID, subject, or content..."
                                    className="pl-9"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Select defaultValue="all-status">
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all-status">All Status</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="resolved">Resolved</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select defaultValue="all-priority">
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all-priority">All Priority</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                                <DatePickerWithRange className="w-[240px]" />
                                <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all">
                            All <Badge variant="secondary" className="ml-1.5">{tabCounts.all}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="open">
                            Open <Badge variant="secondary" className="ml-1.5">{tabCounts.open}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="pending">
                            Pending <Badge variant="secondary" className="ml-1.5">{tabCounts.pending}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="resolved">
                            Resolved <Badge variant="secondary" className="ml-1.5">{tabCounts.resolved}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="closed">
                            Closed <Badge variant="secondary" className="ml-1.5">{tabCounts.closed}</Badge>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-4">
                        {/* Selected Actions */}
                        {selectedTickets.length > 0 && (
                            <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                                <span className="text-sm font-medium">
                                    {selectedTickets.length} selected
                                </span>
                                <Button variant="outline" size="sm">
                                    Mark as Resolved
                                </Button>
                                <Button variant="outline" size="sm">
                                    Export
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setSelectedTickets([])}
                                >
                                    Clear
                                </Button>
                            </div>
                        )}

                        {/* Tickets Table */}
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40px]">
                                            <Checkbox
                                                checked={selectedTickets.length === tickets.length}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="-ml-3 h-8 data-[state=open]:bg-accent"
                                                onClick={() => handleSort('id')}
                                            >
                                                Ticket ID
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Agent</TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="-ml-3 h-8 data-[state=open]:bg-accent"
                                                onClick={() => handleSort('created')}
                                            >
                                                Created
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="-ml-3 h-8 data-[state=open]:bg-accent"
                                                onClick={() => handleSort('lastUpdate')}
                                            >
                                                Last Update
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="w-[60px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tickets.map((ticket) => (
                                        <TableRow key={ticket.id} className="group">
                                            <TableCell>
                                                <Checkbox
                                                    checked={isSelected(ticket.id)}
                                                    onCheckedChange={() => toggleSelection(ticket.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <Link
                                                    to={`/customer/tickets/${ticket.id}`}
                                                    className="hover:text-primary"
                                                >
                                                    {ticket.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        to={`/customer/tickets/${ticket.id}`}
                                                        className="hover:text-primary line-clamp-1 max-w-[300px]"
                                                    >
                                                        {ticket.subject}
                                                    </Link>
                                                    {ticket.messages > 0 && (
                                                        <Badge variant="secondary" className="gap-1">
                                                            <MessageCircle className="h-3 w-3" />
                                                            {ticket.messages}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={ticket.status} />
                                            </TableCell>
                                            <TableCell>
                                                <PriorityBadge priority={ticket.priority} />
                                            </TableCell>
                                            <TableCell>{ticket.agent}</TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {ticket.created}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {ticket.lastUpdate}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="opacity-0 group-hover:opacity-100"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link to={`/customer/tickets/${ticket.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <MessageCircle className="mr-2 h-4 w-4" />
                                                            Add Reply
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Close Ticket
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>

                        {/* Pagination */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing 1 to 5 of {tabCounts[activeTab]} tickets
                            </p>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" disabled>
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    1
                                </Button>
                                <Button variant="ghost" size="sm">
                                    2
                                </Button>
                                <Button variant="ghost" size="sm">
                                    3
                                </Button>
                                <span className="text-sm">...</span>
                                <Button variant="ghost" size="sm">
                                    30
                                </Button>
                                <Button variant="outline" size="sm">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}