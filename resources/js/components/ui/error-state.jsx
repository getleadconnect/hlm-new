import React from 'react';
import { cn } from '@/lib/utils';
import { 
  AlertTriangle, 
  AlertCircle, 
  XCircle,
  WifiOff,
  ServerCrash,
  FileX,
  UserX,
  Ban,
  RefreshCw,
  Home
} from 'lucide-react';
import { Button } from './button';
import { Alert, AlertDescription, AlertTitle } from './alert';

const ErrorState = ({
  icon: Icon = AlertCircle,
  title = "Something went wrong",
  description,
  action,
  variant = "error", // error, warning, info
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    error: {
      iconClass: "text-destructive",
      bgClass: "bg-destructive/10"
    },
    warning: {
      iconClass: "text-yellow-600",
      bgClass: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    info: {
      iconClass: "text-blue-600",
      bgClass: "bg-blue-100 dark:bg-blue-900/20"
    }
  };

  const styles = variantStyles[variant];

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
      {...props}
    >
      <div className={cn("mb-4 rounded-full p-3", styles.bgClass)}>
        <Icon className={cn("h-12 w-12", styles.iconClass)} />
      </div>
      
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      
      {description && (
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      
      {action && (
        <div className="flex gap-2">
          {action}
        </div>
      )}
      
      {children}
    </div>
  );
};

// Pre-built error states for common scenarios
const ErrorStates = {
  NetworkError: ({ onRetry }) => (
    <ErrorState
      icon={WifiOff}
      title="Connection Error"
      description="Unable to connect to the server. Please check your internet connection and try again."
      action={
        onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        )
      }
    />
  ),

  ServerError: ({ onRetry, onGoHome }) => (
    <ErrorState
      icon={ServerCrash}
      title="Server Error"
      description="Our servers are experiencing issues. Please try again later."
      action={
        <>
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          {onGoHome && (
            <Button onClick={onGoHome} variant="ghost">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          )}
        </>
      }
    />
  ),

  NotFound: ({ onGoBack, onGoHome }) => (
    <ErrorState
      icon={FileX}
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved."
      variant="warning"
      action={
        <>
          {onGoBack && (
            <Button onClick={onGoBack} variant="outline">
              Go Back
            </Button>
          )}
          {onGoHome && (
            <Button onClick={onGoHome}>
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          )}
        </>
      }
    />
  ),

  AccessDenied: ({ onLogin, onGoHome }) => (
    <ErrorState
      icon={Ban}
      title="Access Denied"
      description="You don't have permission to access this resource."
      variant="warning"
      action={
        <>
          {onLogin && (
            <Button onClick={onLogin}>
              Sign In
            </Button>
          )}
          {onGoHome && (
            <Button onClick={onGoHome} variant="outline">
              Go Home
            </Button>
          )}
        </>
      }
    />
  ),

  LoadingError: ({ error, onRetry }) => (
    <ErrorState
      icon={AlertCircle}
      title="Failed to Load"
      description={error || "We couldn't load the content. Please try again."}
      action={
        onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        )
      }
    />
  ),

  ValidationError: ({ errors = [] }) => (
    <ErrorState
      icon={AlertTriangle}
      title="Validation Error"
      description="Please fix the following errors:"
      variant="warning"
    >
      {errors.length > 0 && (
        <ul className="mt-4 text-left text-sm text-muted-foreground space-y-1">
          {errors.map((error, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <span>{error}</span>
            </li>
          ))}
        </ul>
      )}
    </ErrorState>
  ),

  RateLimitError: ({ retryAfter }) => (
    <ErrorState
      icon={AlertTriangle}
      title="Rate Limit Exceeded"
      description={`Too many requests. Please try again ${retryAfter ? `in ${retryAfter} seconds` : 'later'}.`}
      variant="warning"
    />
  ),

  MaintenanceMode: () => (
    <ErrorState
      icon={AlertCircle}
      title="Under Maintenance"
      description="We're currently performing scheduled maintenance. We'll be back shortly."
      variant="info"
    />
  )
};

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { fallback, onReset } = this.props;
      
      if (fallback) {
        return fallback;
      }

      return (
        <ErrorState
          icon={XCircle}
          title="Application Error"
          description="An unexpected error occurred. Please refresh the page."
          action={
            <Button 
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (onReset) onReset();
              }}
              variant="outline"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

// Inline error message component
const ErrorMessage = ({ 
  message, 
  variant = "error",
  className,
  ...props 
}) => {
  const variants = {
    error: "text-destructive",
    warning: "text-yellow-600",
    info: "text-blue-600"
  };

  return (
    <p 
      className={cn(
        "text-sm mt-1",
        variants[variant],
        className
      )}
      {...props}
    >
      {message}
    </p>
  );
};

// Error alert component
const ErrorAlert = ({ 
  title, 
  description, 
  variant = "destructive",
  onDismiss,
  className,
  ...props 
}) => {
  return (
    <Alert variant={variant} className={cn("relative", className)} {...props}>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute right-2 top-2 rounded-md p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export { 
  ErrorState, 
  ErrorStates, 
  ErrorBoundary,
  ErrorMessage,
  ErrorAlert
};