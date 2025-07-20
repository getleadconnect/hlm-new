import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  MessageSquare, 
  UserPlus, 
  Tag, 
  AlertCircle,
  CheckCircle,
  Edit,
  FileText,
  Mail,
  Phone,
  User
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Badge } from './badge';

const Timeline = ({ children, className, ...props }) => {
  return (
    <div className={cn("space-y-0", className)} {...props}>
      {children}
    </div>
  );
};

const TimelineItem = ({ 
  icon: Icon,
  iconBackground,
  time,
  title,
  description,
  user,
  isFirst = false,
  isLast = false,
  highlight = false,
  children,
  className,
  ...props 
}) => {
  return (
    <div className={cn("flex gap-4 relative", className)} {...props}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-border" />
      )}

      {/* Icon */}
      <div className="flex-shrink-0 relative z-10">
        <div className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center border-2",
          highlight ? "border-primary" : "border-background",
          iconBackground || "bg-muted"
        )}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            {/* Title with time */}
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={cn(
                "text-sm font-medium",
                highlight && "text-primary"
              )}>
                {title}
              </h4>
              {time && (
                <span className="text-xs text-muted-foreground">
                  {time}
                </span>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}

            {/* Children content */}
            {children && (
              <div className="mt-2">
                {children}
              </div>
            )}
          </div>

          {/* User avatar */}
          {user && (
            <Avatar className="h-8 w-8">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback>
                  {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

// Pre-built timeline events for common ticket activities
const TimelineEvents = {
  TicketCreated: ({ ticket, time, user }) => (
    <TimelineItem
      icon={FileText}
      iconBackground="bg-green-100 dark:bg-green-900/20 text-green-600"
      title="Ticket created"
      description={`#${ticket.id} - ${ticket.subject}`}
      time={time}
      user={user}
      highlight
    />
  ),

  StatusChanged: ({ from, to, time, user }) => (
    <TimelineItem
      icon={Tag}
      iconBackground="bg-blue-100 dark:bg-blue-900/20 text-blue-600"
      title="Status changed"
      time={time}
      user={user}
    >
      <div className="flex items-center gap-2 text-sm">
        <Badge variant="outline">{from}</Badge>
        <span className="text-muted-foreground">→</span>
        <Badge>{to}</Badge>
      </div>
    </TimelineItem>
  ),

  PriorityChanged: ({ from, to, time, user }) => (
    <TimelineItem
      icon={AlertCircle}
      iconBackground="bg-orange-100 dark:bg-orange-900/20 text-orange-600"
      title="Priority changed"
      time={time}
      user={user}
    >
      <div className="flex items-center gap-2 text-sm">
        <Badge variant="outline">{from}</Badge>
        <span className="text-muted-foreground">→</span>
        <Badge>{to}</Badge>
      </div>
    </TimelineItem>
  ),

  AssigneeChanged: ({ from, to, time, user }) => (
    <TimelineItem
      icon={UserPlus}
      iconBackground="bg-purple-100 dark:bg-purple-900/20 text-purple-600"
      title="Assignee changed"
      description={from ? `From ${from} to ${to}` : `Assigned to ${to}`}
      time={time}
      user={user}
    />
  ),

  CommentAdded: ({ comment, time, user, isInternal = false }) => (
    <TimelineItem
      icon={MessageSquare}
      iconBackground="bg-gray-100 dark:bg-gray-900/20 text-gray-600"
      title={isInternal ? "Internal note added" : "Comment added"}
      time={time}
      user={user}
    >
      <div className={cn(
        "text-sm p-3 rounded-lg",
        isInternal ? "bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800" : "bg-muted"
      )}>
        {comment}
      </div>
    </TimelineItem>
  ),

  CustomerReplied: ({ message, channel = 'email', time, user }) => {
    const channelIcons = {
      email: Mail,
      whatsapp: MessageSquare,
      phone: Phone
    };
    const ChannelIcon = channelIcons[channel] || MessageSquare;
    
    return (
      <TimelineItem
        icon={ChannelIcon}
        iconBackground="bg-green-100 dark:bg-green-900/20 text-green-600"
        title={`Customer replied via ${channel}`}
        time={time}
        user={user}
      >
        <div className="text-sm p-3 rounded-lg bg-muted">
          {message}
        </div>
      </TimelineItem>
    );
  },

  AgentReplied: ({ message, channel = 'email', time, user }) => {
    const channelIcons = {
      email: Mail,
      whatsapp: MessageSquare,
      phone: Phone
    };
    const ChannelIcon = channelIcons[channel] || MessageSquare;
    
    return (
      <TimelineItem
        icon={ChannelIcon}
        iconBackground="bg-blue-100 dark:bg-blue-900/20 text-blue-600"
        title={`Agent replied via ${channel}`}
        time={time}
        user={user}
      >
        <div className="text-sm p-3 rounded-lg bg-muted">
          {message}
        </div>
      </TimelineItem>
    );
  },

  TicketResolved: ({ resolution, time, user }) => (
    <TimelineItem
      icon={CheckCircle}
      iconBackground="bg-green-100 dark:bg-green-900/20 text-green-600"
      title="Ticket resolved"
      description={resolution}
      time={time}
      user={user}
      highlight
    />
  ),

  CustomEvent: ({ icon: Icon = Clock, title, description, time, user, iconBackground, children }) => (
    <TimelineItem
      icon={Icon}
      iconBackground={iconBackground}
      title={title}
      description={description}
      time={time}
      user={user}
    >
      {children}
    </TimelineItem>
  )
};

// Activity feed component that uses timeline
const ActivityFeed = ({ activities = [], className }) => {
  return (
    <Timeline className={className}>
      {activities.map((activity, index) => {
        const EventComponent = TimelineEvents[activity.type] || TimelineEvents.CustomEvent;
        
        return (
          <EventComponent
            key={activity.id || index}
            {...activity.data}
            isFirst={index === 0}
            isLast={index === activities.length - 1}
          />
        );
      })}
    </Timeline>
  );
};

export { Timeline, TimelineItem, TimelineEvents, ActivityFeed };