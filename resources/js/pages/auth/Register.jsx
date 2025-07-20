import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, MessageCircle, Check, X } from 'lucide-react';
import { Button, Input, Label, Checkbox, Alert, AlertDescription, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        countryCode: '+1',
        phone: '',
        company: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        marketingConsent: false
    });
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Password validation requirements
    const passwordRequirements = [
        { label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
        { label: 'Contains uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
        { label: 'Contains number', test: (pwd) => /\d/.test(pwd) },
        { label: 'Contains special character', test: (pwd) => /[!@#$%^&*]/.test(pwd) }
    ];

    const checkPasswordStrength = (password) => {
        const passedRequirements = passwordRequirements.filter(req => req.test(password)).length;
        setPasswordStrength(passedRequirements);
        return passedRequirements;
    };

    const handlePasswordChange = (password) => {
        setFormData({ ...formData, password });
        checkPasswordStrength(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password strength
        if (passwordStrength < 4) {
            setError('Password does not meet all requirements');
            return;
        }

        // Validate terms accepted
        if (!formData.termsAccepted) {
            setError('You must accept the terms and conditions');
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Handle registration logic here
            console.log('Registration attempt:', formData);
            
            // Redirect to success page
            window.location.href = '/registration-success';
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleWhatsAppRegister = () => {
        console.log('WhatsApp registration initiated');
        // Handle WhatsApp registration flow
    };

    const getPasswordStrengthLabel = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength === 1) return 'Weak';
        if (passwordStrength === 2) return 'Fair';
        if (passwordStrength === 3) return 'Good';
        return 'Strong';
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0) return 'bg-gray-200';
        if (passwordStrength === 1) return 'bg-red-500';
        if (passwordStrength === 2) return 'bg-orange-500';
        if (passwordStrength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
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
                        <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                            Login
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
                <div className="w-full max-w-[400px] my-8">
                    <div className="bg-card border border-border rounded-lg shadow-sm p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
                            <p className="text-muted-foreground">Get started with our support platform</p>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                    autoComplete="name"
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
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
                                <Label htmlFor="phone">Phone Number (WhatsApp) *</Label>
                                <div className="flex gap-2">
                                    <Select
                                        value={formData.countryCode}
                                        onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                                    >
                                        <SelectTrigger className="w-24 h-11">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="+1">+1</SelectItem>
                                            <SelectItem value="+44">+44</SelectItem>
                                            <SelectItem value="+91">+91</SelectItem>
                                            <SelectItem value="+86">+86</SelectItem>
                                            <SelectItem value="+81">+81</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="234 567 8900"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="flex-1 h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company Name (Optional)</Label>
                                <Input
                                    id="company"
                                    type="text"
                                    placeholder="Your Company"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    autoComplete="organization"
                                    className="h-11"
                                />
                                <p className="text-xs text-muted-foreground">Helps us provide better support</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password *</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        required
                                        autoComplete="new-password"
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
                                
                                {formData.password && (
                                    <>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-medium">{getPasswordStrengthLabel()}</span>
                                        </div>
                                        
                                        <div className="space-y-1 text-xs">
                                            {passwordRequirements.map((req, idx) => (
                                                <div key={idx} className="flex items-center gap-1">
                                                    {req.test(formData.password) ? (
                                                        <Check className="h-3 w-3 text-green-600" />
                                                    ) : (
                                                        <X className="h-3 w-3 text-muted-foreground" />
                                                    )}
                                                    <span className={req.test(formData.password) ? 'text-green-600' : 'text-muted-foreground'}>
                                                        {req.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                        autoComplete="new-password"
                                        className="h-11 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password && (
                                    <div className="flex items-center gap-1 text-xs">
                                        {formData.password === formData.confirmPassword ? (
                                            <>
                                                <Check className="h-3 w-3 text-green-600" />
                                                <span className="text-green-600">Passwords match</span>
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-3 w-3 text-red-600" />
                                                <span className="text-red-600">Passwords do not match</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={formData.termsAccepted}
                                        onCheckedChange={(checked) => 
                                            setFormData({ ...formData, termsAccepted: checked })
                                        }
                                        className="mt-1"
                                    />
                                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                                        I agree to the{' '}
                                        <Link to="/terms" className="text-primary hover:underline">
                                            Terms of Service
                                        </Link>
                                        {' '}and{' '}
                                        <Link to="/privacy" className="text-primary hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                </div>

                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="marketing"
                                        checked={formData.marketingConsent}
                                        onCheckedChange={(checked) => 
                                            setFormData({ ...formData, marketingConsent: checked })
                                        }
                                        className="mt-1"
                                    />
                                    <Label htmlFor="marketing" className="text-sm font-normal cursor-pointer">
                                        Send me tips and updates via WhatsApp
                                    </Label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
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
                                onClick={handleWhatsAppRegister}
                            >
                                <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
                                Sign up with WhatsApp
                            </Button>
                        </form>

                        <p className="text-center mt-6 text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Sign In
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