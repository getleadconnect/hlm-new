import React from 'react';
import { cn } from '@/lib/utils';
import { Check, CheckCheck, Clock, AlertCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

const ChatBubble = ({ 
  message,
  timestamp,
  isOutgoing = false,
  status = 'sent', // sent, delivered, read, failed
  avatar,
  userName,
  className,
  children,
  ...props 
}) => {
  const statusIcons = {
    sending: <Clock className="h-3 w-3 text-muted-foreground" />,
    sent: <Check className="h-3 w-3 text-muted-foreground" />,
    delivered: <CheckCheck className="h-3 w-3 text-muted-foreground" />,
    read: <CheckCheck className="h-3 w-3 text-blue-500" />,
    failed: <AlertCircle className="h-3 w-3 text-destructive" />,
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div
      className={cn(
        "flex gap-2 mb-4",
        isOutgoing ? "flex-row-reverse" : "flex-row",
        className
      )}
      {...props}
    >
      {/* Avatar for incoming messages */}
      {!isOutgoing && avatar && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          {avatar.image ? (
            <AvatarImage src={avatar.image} alt={userName || "User"} />
          ) : (
            <AvatarFallback>{avatar.fallback || userName?.charAt(0) || "U"}</AvatarFallback>
          )}
        </Avatar>
      )}

      <div className={cn(
        "flex flex-col max-w-[70%]",
        isOutgoing ? "items-end" : "items-start"
      )}>
        {/* User name for incoming messages */}
        {!isOutgoing && userName && (
          <span className="text-xs text-muted-foreground mb-1 px-3">
            {userName}
          </span>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            "relative px-4 py-2 rounded-2xl",
            isOutgoing 
              ? "bg-primary text-primary-foreground rounded-tr-sm" 
              : "bg-muted rounded-tl-sm"
          )}
        >
          {/* Message content */}
          <div className="text-sm whitespace-pre-wrap break-words">
            {children || message}
          </div>

          {/* Timestamp and status */}
          <div className={cn(
            "flex items-center gap-1 mt-1",
            isOutgoing ? "justify-end" : "justify-start"
          )}>
            <span className={cn(
              "text-xs",
              isOutgoing ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
              {formatTime(timestamp)}
            </span>
            {isOutgoing && status && statusIcons[status]}
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat message group component for grouping messages by sender
const ChatMessageGroup = ({ messages = [], sender, isOutgoing = false }) => {
  if (messages.length === 0) return null;

  return (
    <div className="mb-6">
      {messages.map((msg, index) => (
        <ChatBubble
          key={msg.id || index}
          message={msg.content}
          timestamp={msg.timestamp}
          isOutgoing={isOutgoing}
          status={msg.status}
          avatar={index === 0 ? sender?.avatar : null}
          userName={index === 0 ? sender?.name : null}
          className={index > 0 ? "mt-1" : ""}
        />
      ))}
    </div>
  );
};

// System message component
const SystemMessage = ({ message, timestamp, className, ...props }) => {
  return (
    <div 
      className={cn(
        "flex justify-center my-4",
        className
      )}
      {...props}
    >
      <div className="bg-muted/50 rounded-full px-3 py-1 text-xs text-muted-foreground">
        {message}
        {timestamp && (
          <span className="ml-2">
            {new Date(timestamp).toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit' 
            })}
          </span>
        )}
      </div>
    </div>
  );
};

// Typing indicator component
const TypingIndicator = ({ userName, className }) => {
  return (
    <div className={cn("flex items-center gap-2 mb-4", className)}>
      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1">
          {userName && (
            <span className="text-xs text-muted-foreground mr-2">{userName} is typing</span>
          )}
          <div className="flex gap-1">
            <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// WhatsApp style date separator
const DateSeparator = ({ date, className }) => {
  const formatDate = (date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (today.toDateString() === messageDate.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === messageDate.toDateString()) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: messageDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className={cn("flex justify-center my-4", className)}>
      <div className="bg-muted rounded-full px-3 py-1 text-xs text-muted-foreground">
        {formatDate(date)}
      </div>
    </div>
  );
};

export { 
  ChatBubble, 
  ChatMessageGroup, 
  SystemMessage, 
  TypingIndicator,
  DateSeparator 
};