import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Inbox, 
  Search, 
  FileX, 
  Users, 
  MessageSquare,
  AlertCircle,
  Zap,
  Package,
  FolderOpen,
  FileText
} from 'lucide-react';
import { Button } from './button';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className,
  children,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="mb-4 rounded-full bg-muted p-3">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      
      {title && (
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      )}
      
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

// Pre-built empty states for common scenarios
const EmptyStates = {
  NoTickets: ({ onCreateTicket }) => (
    <EmptyState
      icon={Inbox}
      title="No tickets yet"
      description="Start by creating your first support ticket to get help from our team."
      action={
        onCreateTicket && (
          <Button onClick={onCreateTicket}>
            Create Ticket
          </Button>
        )
      }
    />
  ),

  NoSearchResults: ({ searchTerm, onClearSearch }) => (
    <EmptyState
      icon={Search}
      title="No results found"
      description={searchTerm ? `No tickets matching "${searchTerm}"` : "Try adjusting your search or filters"}
      action={
        onClearSearch && (
          <Button variant="outline" onClick={onClearSearch}>
            Clear Search
          </Button>
        )
      }
    />
  ),

  NoAssignedTickets: () => (
    <EmptyState
      icon={Users}
      title="No tickets assigned"
      description="You don't have any tickets assigned to you at the moment."
    />
  ),

  NoMessages: () => (
    <EmptyState
      icon={MessageSquare}
      title="No messages yet"
      description="Start a conversation to communicate with the customer."
    />
  ),

  NoNotifications: () => (
    <EmptyState
      icon={AlertCircle}
      title="You're all caught up!"
      description="No new notifications at the moment."
    />
  ),

  NoActivity: () => (
    <EmptyState
      icon={Zap}
      title="No activity yet"
      description="Activity and updates will appear here."
    />
  ),

  NoAttachments: ({ onUpload }) => (
    <EmptyState
      icon={Package}
      title="No attachments"
      description="No files have been attached to this ticket."
      action={
        onUpload && (
          <Button variant="outline" onClick={onUpload}>
            Upload File
          </Button>
        )
      }
    />
  ),

  EmptyFolder: () => (
    <EmptyState
      icon={FolderOpen}
      title="This folder is empty"
      description="No items to display in this folder."
    />
  ),

  NoKnowledgeBase: ({ onCreate }) => (
    <EmptyState
      icon={FileText}
      title="No articles found"
      description="Create knowledge base articles to help customers find answers."
      action={
        onCreate && (
          <Button onClick={onCreate}>
            Create Article
          </Button>
        )
      }
    />
  ),

  ComingSoon: ({ feature }) => (
    <EmptyState
      icon={Zap}
      title="Coming Soon"
      description={`${feature || 'This feature'} is currently under development and will be available soon.`}
    />
  ),

  NoPermission: () => (
    <EmptyState
      icon={AlertCircle}
      title="Access Denied"
      description="You don't have permission to view this content. Please contact your administrator."
    />
  ),

  Custom: ({ icon, title, description, action }) => (
    <EmptyState
      icon={icon}
      title={title}
      description={description}
      action={action}
    />
  )
};

// Illustration component for more visual empty states
const EmptyStateIllustration = ({ 
  type = 'default',
  className 
}) => {
  const illustrations = {
    default: (
      <svg className={cn("h-48 w-48", className)} viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="80" className="fill-muted" />
        <path d="M70 90 Q100 70 130 90" className="stroke-muted-foreground/50" strokeWidth="3" fill="none" />
        <circle cx="80" cy="80" r="5" className="fill-muted-foreground/50" />
        <circle cx="120" cy="80" r="5" className="fill-muted-foreground/50" />
      </svg>
    ),
    search: (
      <svg className={cn("h-48 w-48", className)} viewBox="0 0 200 200" fill="none">
        <circle cx="85" cy="85" r="55" className="stroke-muted-foreground/30" strokeWidth="8" fill="none" />
        <path d="M125 125 L155 155" className="stroke-muted-foreground/30" strokeWidth="8" strokeLinecap="round" />
        <circle cx="85" cy="85" r="35" className="fill-muted" />
      </svg>
    ),
    error: (
      <svg className={cn("h-48 w-48", className)} viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="80" className="fill-red-100 dark:fill-red-900/20" />
        <path d="M70 70 L130 130 M130 70 L70 130" className="stroke-red-500" strokeWidth="8" strokeLinecap="round" />
      </svg>
    )
  };

  return illustrations[type] || illustrations.default;
};

// Empty state with illustration
const IllustratedEmptyState = ({
  illustration = 'default',
  title,
  description,
  action,
  className,
  ...props
}) => {
  return (
    <EmptyState className={className} {...props}>
      <EmptyStateIllustration type={illustration} className="mb-6" />
      {title && (
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      )}
      {description && (
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action}
    </EmptyState>
  );
};

export { 
  EmptyState, 
  EmptyStates, 
  EmptyStateIllustration,
  IllustratedEmptyState 
};