import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Basic skeleton component
const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
};

// Skeleton variants for common UI patterns
const SkeletonText = ({ lines = 1, className, ...props }) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 && lines > 1 && "w-3/4"
          )}
        />
      ))}
    </div>
  );
};

const SkeletonAvatar = ({ size = "default", className, ...props }) => {
  const sizes = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12"
  };

  return (
    <Skeleton
      className={cn(
        "rounded-full",
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

const SkeletonButton = ({ size = "default", className, ...props }) => {
  const sizes = {
    sm: "h-8 w-20",
    default: "h-10 w-24",
    lg: "h-12 w-32"
  };

  return (
    <Skeleton
      className={cn(
        "rounded",
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

// Loading spinner component
const Spinner = ({ size = "default", className, ...props }) => {
  const sizes = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <Loader2 
      className={cn(
        "animate-spin",
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

// Loading overlay component
const LoadingOverlay = ({ 
  visible = true, 
  message = "Loading...",
  className,
  ...props 
}) => {
  if (!visible) return null;

  return (
    <div 
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        {message && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
};

// Pre-built skeleton templates
const SkeletonCard = ({ showFooter = true, className, ...props }) => {
  return (
    <div 
      className={cn(
        "rounded-lg border bg-card p-6",
        className
      )}
      {...props}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <SkeletonAvatar size="sm" />
        </div>
        
        <SkeletonText lines={3} />
        
        {showFooter && (
          <div className="flex items-center justify-between pt-4">
            <Skeleton className="h-4 w-24" />
            <SkeletonButton size="sm" />
          </div>
        )}
      </div>
    </div>
  );
};

const SkeletonTable = ({ rows = 5, columns = 5, className, ...props }) => {
  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Table header */}
      <div className="border-b">
        <div className="flex p-4">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="flex-1 px-2">
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="border-b">
          <div className="flex p-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="flex-1 px-2">
                <Skeleton 
                  className={cn(
                    "h-4",
                    colIndex === 0 && "w-16",
                    colIndex === columns - 1 && "w-20"
                  )} 
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const SkeletonList = ({ items = 5, showAvatar = true, className, ...props }) => {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          {showAvatar && <SkeletonAvatar />}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

const SkeletonForm = ({ fields = 4, className, ...props }) => {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="flex gap-2 pt-4">
        <SkeletonButton />
        <SkeletonButton />
      </div>
    </div>
  );
};

const SkeletonChat = ({ messages = 4, className, ...props }) => {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {Array.from({ length: messages }).map((_, i) => (
        <div 
          key={i} 
          className={cn(
            "flex gap-2",
            i % 2 === 0 ? "justify-start" : "justify-end"
          )}
        >
          {i % 2 === 0 && <SkeletonAvatar size="sm" />}
          <div className={cn(
            "max-w-[70%] space-y-2",
            i % 2 === 0 ? "items-start" : "items-end"
          )}>
            <Skeleton className={cn(
              "h-16 rounded-lg",
              i % 2 === 0 ? "w-48" : "w-56"
            )} />
          </div>
        </div>
      ))}
    </div>
  );
};

// Page-level loading states
const PageLoading = ({ title = "Loading...", className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[400px] gap-4", className)}>
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};

const InlineLoading = ({ className, ...props }) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Spinner size="sm" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  );
};

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  Spinner,
  LoadingOverlay,
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  SkeletonForm,
  SkeletonChat,
  PageLoading,
  InlineLoading
};