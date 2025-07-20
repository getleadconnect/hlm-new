import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
    Menu, X, Bell, Search, User, LogOut, Settings,
    ChevronDown, Home, Ticket, HelpCircle, Users,
    BarChart3, Shield, MessageCircle
} from 'lucide-react';
import {
    Button, Input, Badge, DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger, Avatar, AvatarFallback, AvatarImage,
    Sheet, SheetContent, SheetDescription, SheetHeader,
    SheetTitle, SheetTrigger, ScrollArea, Separator
} from '../components/ui';

export default function ResponsiveLayout({ userRole = 'customer' }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Navigation items based on user role
    const getNavItems = () => {
        switch (userRole) {
            case 'customer':
                return [
                    { label: 'Dashboard', href: '/customer/dashboard', icon: Home },
                    { label: 'My Tickets', href: '/customer/tickets', icon: Ticket },
                    { label: 'Help Center', href: '/customer/help', icon: HelpCircle }
                ];
            case 'agent':
                return [
                    { label: 'Workspace', href: '/agent/workspace', icon: Home },
                    { label: 'My Tickets', href: '/agent/tickets', icon: Ticket },
                    { label: 'Knowledge Base', href: '/agent/knowledge', icon: HelpCircle },
                    { label: 'Reports', href: '/agent/reports', icon: BarChart3 }
                ];
            case 'admin':
                return [
                    { label: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
                    { label: 'Agents', href: '/admin/agents', icon: Users },
                    { label: 'Tickets', href: '/admin/tickets', icon: Ticket },
                    { label: 'Settings', href: '/admin/settings', icon: Settings },
                    { label: 'Security', href: '/admin/security', icon: Shield }
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
                <div className="container flex h-14 items-center">
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link to="/" className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                                            H
                                        </div>
                                        <span className="text-xl font-semibold">HLM Support</span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                                <div className="flex flex-col space-y-2">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                            >
                                                <Icon className="h-4 w-4" />
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                                <Separator className="my-4" />
                                <div className="flex flex-col space-y-2">
                                    <Link
                                        to="/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <User className="h-4 w-4" />
                                        Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            // Handle logout
                                        }}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground w-full text-left"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Log out
                                    </button>
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>

                    <Link to="/" className="flex items-center">
                        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                            H
                        </div>
                    </Link>

                    <div className="flex flex-1 items-center justify-end space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Avatar className="h-7 w-7">
                                        <AvatarImage src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
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
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {searchOpen && (
                    <div className="border-t px-4 py-2">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full"
                            autoFocus
                        />
                    </div>
                )}
            </header>

            {/* Desktop Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden lg:block">
                <div className="container flex h-16 items-center">
                    <Link to="/" className="flex items-center space-x-2 mr-8">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                            H
                        </div>
                        <span className="text-xl font-semibold">HLM Support</span>
                    </Link>

                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="flex items-center gap-2 transition-colors hover:text-foreground/80 text-foreground/60"
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="ml-auto flex items-center space-x-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="pl-9"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
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
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation for Key Actions */}
            {userRole === 'customer' && (
                <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background lg:hidden">
                    <div className="grid grid-cols-3 h-16">
                        <Link
                            to="/customer/dashboard"
                            className="flex flex-col items-center justify-center gap-1 text-xs font-medium"
                        >
                            <Home className="h-5 w-5" />
                            Home
                        </Link>
                        <Link
                            to="/customer/tickets/new"
                            className="flex flex-col items-center justify-center gap-1 text-xs font-medium"
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-primary rounded-full" />
                                <Ticket className="h-5 w-5 relative text-primary-foreground" />
                            </div>
                            New Ticket
                        </Link>
                        <button
                            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                            className="flex flex-col items-center justify-center gap-1 text-xs font-medium"
                        >
                            <MessageCircle className="h-5 w-5" />
                            WhatsApp
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}