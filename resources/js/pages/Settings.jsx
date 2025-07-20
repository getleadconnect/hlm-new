import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, Bell, Moon, Sun, Monitor, Globe, Shield, 
    User, MessageCircle, Mail, Phone, Save, Check,
    ChevronRight, Palette, Volume2, Vibrate, Download,
    HelpCircle, LogOut, Trash2, AlertCircle
} from 'lucide-react';
import { 
    Button, Card, CardContent, CardDescription, CardHeader, 
    CardTitle, Tabs, TabsContent, TabsList, TabsTrigger,
    Label, Input, Switch, Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue, Separator, RadioGroup,
    RadioGroupItem, Slider, Alert, AlertDescription,
    Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '../components/ui';
import { ThemeToggle, useTheme } from '../components/ThemeProvider';

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const [notifications, setNotifications] = useState({
        email: true,
        whatsapp: true,
        browser: false,
        ticketUpdates: true,
        marketing: false,
        soundEnabled: true,
        volume: 70
    });
    
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+1 234 567 8900',
        company: 'Acme Corp',
        language: 'en',
        timezone: 'America/New_York'
    });

    const handleSaveProfile = () => {
        console.log('Saving profile:', profile);
        // Show success message
    };

    const handleSaveNotifications = () => {
        console.log('Saving notifications:', notifications);
        // Show success message
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-border bg-background">
                <div className="container flex h-16 items-center">
                    <Link to="/customer/dashboard" className="mr-4">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-semibold">Settings</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-6 max-w-4xl">
                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your account profile information and email address
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company</Label>
                                        <Input
                                            id="company"
                                            value={profile.company}
                                            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Language</Label>
                                        <Select value={profile.language} onValueChange={(value) => setProfile({ ...profile, language: value })}>
                                            <SelectTrigger id="language">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Spanish</SelectItem>
                                                <SelectItem value="fr">French</SelectItem>
                                                <SelectItem value="de">German</SelectItem>
                                                <SelectItem value="zh">Chinese</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Timezone</Label>
                                        <Select value={profile.timezone} onValueChange={(value) => setProfile({ ...profile, timezone: value })}>
                                            <SelectTrigger id="timezone">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="America/New_York">Eastern Time (US)</SelectItem>
                                                <SelectItem value="America/Chicago">Central Time (US)</SelectItem>
                                                <SelectItem value="America/Denver">Mountain Time (US)</SelectItem>
                                                <SelectItem value="America/Los_Angeles">Pacific Time (US)</SelectItem>
                                                <SelectItem value="Europe/London">London</SelectItem>
                                                <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button onClick={handleSaveProfile}>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Appearance Tab */}
                    <TabsContent value="appearance" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Theme</CardTitle>
                                <CardDescription>
                                    Select your preferred theme for the application
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <Label>Color Theme</Label>
                                    <RadioGroup value={theme} onValueChange={setTheme}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="light" id="light" />
                                            <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                                                <Sun className="h-4 w-4" />
                                                Light
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="dark" id="dark" />
                                            <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                                                <Moon className="h-4 w-4" />
                                                Dark
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="system" id="system" />
                                            <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                                                <Monitor className="h-4 w-4" />
                                                System
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <Label>Theme Preview</Label>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <button
                                            onClick={() => setTheme('light')}
                                            className={`relative rounded-lg border-2 p-4 text-left transition-colors ${
                                                theme === 'light' ? 'border-primary' : 'border-border'
                                            }`}
                                        >
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="h-2 w-2 rounded-full bg-gray-400" />
                                                <div className="h-2 w-16 rounded bg-gray-200" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 w-full rounded bg-gray-100" />
                                                <div className="h-2 w-3/4 rounded bg-gray-100" />
                                            </div>
                                            <p className="mt-3 text-xs font-medium">Light</p>
                                        </button>
                                        <button
                                            onClick={() => setTheme('dark')}
                                            className={`relative rounded-lg border-2 p-4 text-left transition-colors ${
                                                theme === 'dark' ? 'border-primary' : 'border-border'
                                            }`}
                                        >
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="h-2 w-2 rounded-full bg-gray-600" />
                                                <div className="h-2 w-16 rounded bg-gray-700" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 w-full rounded bg-gray-800" />
                                                <div className="h-2 w-3/4 rounded bg-gray-800" />
                                            </div>
                                            <p className="mt-3 text-xs font-medium">Dark</p>
                                        </button>
                                        <button
                                            onClick={() => setTheme('system')}
                                            className={`relative rounded-lg border-2 p-4 text-left transition-colors ${
                                                theme === 'system' ? 'border-primary' : 'border-border'
                                            }`}
                                        >
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-600" />
                                                <div className="h-2 w-16 rounded bg-gradient-to-r from-gray-200 to-gray-700" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 w-full rounded bg-gradient-to-r from-gray-100 to-gray-800" />
                                                <div className="h-2 w-3/4 rounded bg-gradient-to-r from-gray-100 to-gray-800" />
                                            </div>
                                            <p className="mt-3 text-xs font-medium">System</p>
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Display Preferences</CardTitle>
                                <CardDescription>
                                    Customize how content is displayed
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Compact Mode</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Show more content with reduced spacing
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Avatars</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Display user avatars in conversations
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Channels</CardTitle>
                                <CardDescription>
                                    Choose how you want to receive notifications
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                        <div className="space-y-0.5">
                                            <Label>Email Notifications</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive updates via email
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={notifications.email}
                                        onCheckedChange={(checked) => 
                                            setNotifications({ ...notifications, email: checked })
                                        }
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                                        <div className="space-y-0.5">
                                            <Label>WhatsApp Notifications</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get instant updates on WhatsApp
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={notifications.whatsapp}
                                        onCheckedChange={(checked) => 
                                            setNotifications({ ...notifications, whatsapp: checked })
                                        }
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Bell className="h-5 w-5 text-muted-foreground" />
                                        <div className="space-y-0.5">
                                            <Label>Browser Notifications</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Show desktop notifications
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={notifications.browser}
                                        onCheckedChange={(checked) => 
                                            setNotifications({ ...notifications, browser: checked })
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Types</CardTitle>
                                <CardDescription>
                                    Select which activities you want to be notified about
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Ticket Updates</Label>
                                        <p className="text-sm text-muted-foreground">
                                            New replies and status changes
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.ticketUpdates}
                                        onCheckedChange={(checked) => 
                                            setNotifications({ ...notifications, ticketUpdates: checked })
                                        }
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Marketing & Updates</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Product news and helpful tips
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.marketing}
                                        onCheckedChange={(checked) => 
                                            setNotifications({ ...notifications, marketing: checked })
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sound & Vibration</CardTitle>
                                <CardDescription>
                                    Configure audio and haptic feedback
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Volume2 className="h-5 w-5 text-muted-foreground" />
                                        <div className="space-y-0.5">
                                            <Label>Sound Notifications</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Play sound for new messages
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={notifications.soundEnabled}
                                        onCheckedChange={(checked) => 
                                            setNotifications({ ...notifications, soundEnabled: checked })
                                        }
                                    />
                                </div>
                                {notifications.soundEnabled && (
                                    <>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Volume Level</Label>
                                            <div className="flex items-center gap-4">
                                                <Slider
                                                    value={[notifications.volume]}
                                                    onValueChange={([value]) => 
                                                        setNotifications({ ...notifications, volume: value })
                                                    }
                                                    max={100}
                                                    step={10}
                                                    className="flex-1"
                                                />
                                                <span className="w-12 text-sm text-muted-foreground">
                                                    {notifications.volume}%
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <Separator />
                                <div className="flex justify-end">
                                    <Button onClick={handleSaveNotifications}>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Preferences
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Update your password to keep your account secure
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline">
                                    Change Password
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Two-Factor Authentication</CardTitle>
                                <CardDescription>
                                    Add an extra layer of security to your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <p className="font-medium">Status</p>
                                        <p className="text-sm text-muted-foreground">
                                            Two-factor authentication is currently disabled
                                        </p>
                                    </div>
                                    <Button>Enable 2FA</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Active Sessions</CardTitle>
                                <CardDescription>
                                    Manage your active login sessions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <p className="font-medium">Current Device</p>
                                            <p className="text-sm text-muted-foreground">
                                                Chrome on macOS • San Francisco, CA
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Active now
                                            </p>
                                        </div>
                                        <Badge variant="secondary">Current</Badge>
                                    </div>
                                    <Separator />
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <p className="font-medium">iPhone 13</p>
                                            <p className="text-sm text-muted-foreground">
                                                Safari on iOS • San Francisco, CA
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Last active 2 hours ago
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            Sign Out
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-destructive">
                            <CardHeader>
                                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                <CardDescription>
                                    Irreversible and destructive actions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Once you delete your account, there is no going back. Please be certain.
                                    </AlertDescription>
                                </Alert>
                                <Button variant="destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Account
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}