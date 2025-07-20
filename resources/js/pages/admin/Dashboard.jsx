import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Users, Ticket, Clock, TrendingUp, ArrowUp, ArrowDown,
    BarChart3, LineChart, PieChart, Calendar, Download,
    Settings, Shield, Activity, AlertCircle, CheckCircle,
    XCircle, MessageCircle, Mail, Phone, Globe, Filter,
    MoreVertical, ChevronRight, Eye, Edit, Trash2, Plus,
    UserPlus, Building, CreditCard, Zap, Database, Bell
} from 'lucide-react';
import { 
    Button, Card, CardContent, CardDescription, CardHeader, 
    CardTitle, Tabs, TabsContent, TabsList, TabsTrigger,
    Progress, Badge, Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow, Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue, Avatar, AvatarFallback,
    AvatarImage, DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger, DatePickerWithRange, Sidebar, Navbar,
    StatusBadge, PriorityBadge, Input, Switch, Label,
    AreaChart, Area, BarChart, Bar, LineChart as RechartsLineChart,
    Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis,
    CartesianGrid, Tooltip as RechartsTooltip, Legend,
    ResponsiveContainer
} from '../../components/ui';

export default function AdminDashboard() {
    const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
    const [selectedMetric, setSelectedMetric] = useState('tickets');

    // Mock data for charts
    const ticketTrend = [
        { date: 'Mon', tickets: 45, resolved: 40 },
        { date: 'Tue', tickets: 52, resolved: 48 },
        { date: 'Wed', tickets: 61, resolved: 55 },
        { date: 'Thu', tickets: 58, resolved: 52 },
        { date: 'Fri', tickets: 67, resolved: 60 },
        { date: 'Sat', tickets: 35, resolved: 33 },
        { date: 'Sun', tickets: 28, resolved: 27 }
    ];

    const channelDistribution = [
        { name: 'WhatsApp', value: 45, color: '#22c55e' },
        { name: 'Email', value: 30, color: '#3b82f6' },
        { name: 'Web', value: 20, color: '#f59e0b' },
        { name: 'Phone', value: 5, color: '#8b5cf6' }
    ];

    const agentPerformance = [
        {
            id: 1,
            name: 'Sarah Chen',
            avatar: '/placeholder-agent1.jpg',
            status: 'online',
            ticketsResolved: 45,
            avgResponseTime: '12m',
            satisfaction: 4.8,
            currentLoad: 5
        },
        {
            id: 2,
            name: 'James Rodriguez',
            avatar: '/placeholder-agent2.jpg',
            status: 'online',
            ticketsResolved: 38,
            avgResponseTime: '15m',
            satisfaction: 4.6,
            currentLoad: 7
        },
        {
            id: 3,
            name: 'Maria Santos',
            avatar: '/placeholder-agent3.jpg',
            status: 'away',
            ticketsResolved: 42,
            avgResponseTime: '10m',
            satisfaction: 4.9,
            currentLoad: 3
        },
        {
            id: 4,
            name: 'David Kim',
            avatar: '/placeholder-agent4.jpg',
            status: 'offline',
            ticketsResolved: 35,
            avgResponseTime: '18m',
            satisfaction: 4.5,
            currentLoad: 0
        }
    ];

    const recentActivities = [
        {
            id: 1,
            type: 'user',
            message: 'New agent Sarah Chen joined the team',
            timestamp: '10 minutes ago',
            icon: UserPlus
        },
        {
            id: 2,
            type: 'system',
            message: 'System backup completed successfully',
            timestamp: '1 hour ago',
            icon: Database
        },
        {
            id: 3,
            type: 'alert',
            message: 'High ticket volume detected - 25% above average',
            timestamp: '2 hours ago',
            icon: AlertCircle
        },
        {
            id: 4,
            type: 'payment',
            message: 'Monthly subscription renewed - Premium Plan',
            timestamp: '3 hours ago',
            icon: CreditCard
        }
    ];

    // Summary stats
    const stats = {
        totalTickets: 2847,
        totalTicketsChange: 12.5,
        activeAgents: 24,
        activeAgentsChange: -2.3,
        avgResponseTime: '14m',
        avgResponseTimeChange: -18.2,
        customerSatisfaction: 4.7,
        customerSatisfactionChange: 3.2
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            case 'offline': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Admin Sidebar */}
            <Sidebar>
                <div className="p-4 space-y-6">
                    <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Analytics
                        </h3>
                        <nav className="space-y-1">
                            <Link to="/admin/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground">
                                <BarChart3 className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link to="/admin/reports" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
                                <LineChart className="h-4 w-4" />
                                Reports
                            </Link>
                            <Link to="/admin/analytics" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
                                <PieChart className="h-4 w-4" />
                                Analytics
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Management
                        </h3>
                        <nav className="space-y-1">
                            <Link to="/admin/agents" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
                                <Users className="h-4 w-4" />
                                Agents
                            </Link>
                            <Link to="/admin/customers" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
                                <Building className="h-4 w-4" />
                                Customers
                            </Link>
                            <Link to="/admin/tickets" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
                                <Ticket className="h-4 w-4" />
                                Tickets
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            System
                        </h3>
                        <nav className="space-y-1">
                            <Link to="/admin/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                            <Link to="/admin/integrations" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
                                <Zap className="h-4 w-4" />
                                Integrations
                            </Link>
                            <Link to="/admin/security" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
                                <Shield className="h-4 w-4" />
                                Security
                            </Link>
                        </nav>
                    </div>
                </div>
            </Sidebar>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navigation */}
                <Navbar>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                            <p className="text-sm text-muted-foreground">
                                Monitor your support system performance
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <DatePickerWithRange />
                            <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Bell className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Navbar>

                {/* Dashboard Content */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Tickets
                                </CardTitle>
                                <Ticket className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalTickets.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className={stats.totalTicketsChange > 0 ? 'text-green-600' : 'text-red-600'}>
                                        {stats.totalTicketsChange > 0 ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                                        {Math.abs(stats.totalTicketsChange)}%
                                    </span>
                                    {' '}from last week
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Active Agents
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.activeAgents}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className={stats.activeAgentsChange > 0 ? 'text-green-600' : 'text-red-600'}>
                                        {stats.activeAgentsChange > 0 ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                                        {Math.abs(stats.activeAgentsChange)}%
                                    </span>
                                    {' '}from last week
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Avg Response Time
                                </CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className={stats.avgResponseTimeChange < 0 ? 'text-green-600' : 'text-red-600'}>
                                        {stats.avgResponseTimeChange < 0 ? <ArrowDown className="inline h-3 w-3" /> : <ArrowUp className="inline h-3 w-3" />}
                                        {Math.abs(stats.avgResponseTimeChange)}%
                                    </span>
                                    {' '}from last week
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Satisfaction Score
                                </CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.customerSatisfaction}/5.0</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className={stats.customerSatisfactionChange > 0 ? 'text-green-600' : 'text-red-600'}>
                                        {stats.customerSatisfactionChange > 0 ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                                        {Math.abs(stats.customerSatisfactionChange)}%
                                    </span>
                                    {' '}from last week
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Row */}
                    <div className="grid gap-6 md:grid-cols-7">
                        {/* Ticket Trend Chart */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Ticket Volume & Resolution</CardTitle>
                                <CardDescription>
                                    Daily tickets created vs resolved
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={ticketTrend}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <RechartsTooltip />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="tickets"
                                            stackId="1"
                                            stroke="#3b82f6"
                                            fill="#3b82f6"
                                            fillOpacity={0.6}
                                            name="Created"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="resolved"
                                            stackId="2"
                                            stroke="#22c55e"
                                            fill="#22c55e"
                                            fillOpacity={0.6}
                                            name="Resolved"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Channel Distribution */}
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Ticket Sources</CardTitle>
                                <CardDescription>
                                    Distribution by communication channel
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RechartsPieChart>
                                        <Pie
                                            data={channelDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={(entry) => `${entry.name}: ${entry.value}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {channelDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Agent Performance Table */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Agent Performance</CardTitle>
                                    <CardDescription>
                                        Real-time agent metrics and status
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder="Search agents..."
                                        className="w-64"
                                    />
                                    <Button variant="outline" size="sm">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                    <Button size="sm">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Add Agent
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Agent</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tickets Resolved</TableHead>
                                        <TableHead>Avg Response</TableHead>
                                        <TableHead>Satisfaction</TableHead>
                                        <TableHead>Current Load</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {agentPerformance.map((agent) => (
                                        <TableRow key={agent.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={agent.avatar} />
                                                            <AvatarFallback>
                                                                {agent.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-background ${getStatusColor(agent.status)}`} />
                                                    </div>
                                                    <span className="font-medium">{agent.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={agent.status === 'online' ? 'default' : 'secondary'}>
                                                    {agent.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{agent.ticketsResolved}</TableCell>
                                            <TableCell>{agent.avgResponseTime}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <span>⭐</span>
                                                    <span>{agent.satisfaction}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={(agent.currentLoad / 10) * 100} className="w-16" />
                                                    <span className="text-sm">{agent.currentLoad}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <MessageCircle className="mr-2 h-4 w-4" />
                                                            Send Message
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Remove Agent
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Recent Activity</CardTitle>
                                <Button variant="outline" size="sm">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => {
                                    const Icon = activity.icon;
                                    return (
                                        <div key={activity.id} className="flex items-center gap-4">
                                            <div className={`rounded-full p-2 ${
                                                activity.type === 'alert' ? 'bg-orange-100 text-orange-600' :
                                                activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                                                activity.type === 'system' ? 'bg-green-100 text-green-600' :
                                                'bg-purple-100 text-purple-600'
                                            }`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{activity.message}</p>
                                                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Settings</CardTitle>
                            <CardDescription>
                                Manage system preferences and configurations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="auto-assign">Auto-assign tickets</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically distribute new tickets to available agents
                                        </p>
                                    </div>
                                    <Switch id="auto-assign" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="sla-alerts">SLA breach alerts</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Send notifications when tickets are close to SLA breach
                                        </p>
                                    </div>
                                    <Switch id="sla-alerts" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="whatsapp-auto">WhatsApp auto-reply</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Send automatic acknowledgment for WhatsApp messages
                                        </p>
                                    </div>
                                    <Switch id="whatsapp-auto" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}