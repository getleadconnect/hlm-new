import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, MessageCircle } from 'lucide-react';
import { Button, Input, Label, Checkbox, Alert, AlertDescription } from '../../components/ui';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Handle login logic here
            console.log('Login attempt:', formData);
            
            // Redirect based on role
            window.location.href = '/agent/dashboard';
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleWhatsAppLogin = () => {
        console.log('WhatsApp login initiated');
        // Handle WhatsApp login flow
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="h-20 border-b border-border bg-background">
                <div className="container h-full flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                            H
                        </div>
                        <span className="text-xl font-semibold">HLM Support</span>
                    </Link>
                    <nav className="flex items-center space-x-6">
                        <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                            Help
                        </Link>
                        <Link to="/login" className="text-primary font-medium">
                            Login
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
                <div className="w-full max-w-[400px]">
                    <div className="bg-card border border-border rounded-lg shadow-sm p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
                            <p className="text-muted-foreground">Sign in to your support account</p>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email or Username</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    autoComplete="email"
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        autoComplete="current-password"
                                        className="h-11 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formData.remember}
                                        onCheckedChange={(checked) => 
                                            setFormData({ ...formData, remember: checked })
                                        }
                                    />
                                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                                        Remember me
                                    </Label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-12"
                                onClick={handleWhatsAppLogin}
                            >
                                <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
                                Continue with WhatsApp
                            </Button>
                        </form>

                        <p className="text-center mt-6 text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary hover:underline font-medium">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="h-16 border-t border-border bg-background">
                <div className="container h-full flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                    <Link to="/privacy" className="hover:text-foreground transition-colors">
                        Privacy Policy
                    </Link>
                    <span>|</span>
                    <Link to="/terms" className="hover:text-foreground transition-colors">
                        Terms of Service
                    </Link>
                    <span>|</span>
                    <Link to="/contact" className="hover:text-foreground transition-colors">
                        Contact Support
                    </Link>
                </div>
            </footer>
        </div>
    );
}