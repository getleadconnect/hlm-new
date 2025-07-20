import React from 'react';
import { cn } from '@/lib/utils';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  ChevronUp,
  ChevronDown,
  Minus,
  Flag,
  Flame,
  Zap
} from 'lucide-react';
import { PRIORITY_COLORS } from '@/lib/constants';

// Priority indicator component - visual priority display
const PriorityIndicator = ({ 
  priority = 'medium',
  size = 'default',
  showLabel = false,
  showIcon = true,
  variant = 'default', // default, minimal, flag, dot
  className,
  ...props 
}) => {
  const sizes = {
    sm: {
      icon: 'h-3 w-3',
      container: 'h-5',
      text: 'text-xs',
      dot: 'h-2 w-2'
    },
    default: {
      icon: 'h-4 w-4',
      container: 'h-6',
      text: 'text-sm',
      dot: 'h-3 w-3'
    },
    lg: {
      icon: 'h-5 w-5',
      container: 'h-8',
      text: 'text-base',
      dot: 'h-4 w-4'
    }
  };

  const priorityIcons = {
    low: ChevronDown,
    medium: Minus,
    high: ChevronUp,
    urgent: AlertCircle
  };

  const priorityLabels = {
    low: 'Low Priority',
    medium: 'Medium Priority',
    high: 'High Priority',
    urgent: 'Urgent'
  };

  const colors = PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;
  const sizeConfig = sizes[size];
  const Icon = priorityIcons[priority];

  if (variant === 'dot') {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2",
          className
        )}
        title={priorityLabels[priority]}
        {...props}
      >
        <span 
          className={cn(
            "rounded-full",
            sizeConfig.dot,
            colors.background,
            colors.border,
            "border"
          )}
        />
        {showLabel && (
          <span className={cn(sizeConfig.text, "text-muted-foreground")}>
            {priorityLabels[priority]}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'flag') {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5",
          className
        )}
        title={priorityLabels[priority]}
        {...props}
      >
        <Flag 
          className={cn(
            sizeConfig.icon,
            priority === 'urgent' ? 'fill-current' : '',
            colors.text
          )}
        />
        {showLabel && (
          <span className={cn(sizeConfig.text, colors.text, "font-medium")}>
            {priorityLabels[priority]}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          "inline-flex items-center",
          className
        )}
        title={priorityLabels[priority]}
        {...props}
      >
        {showIcon && Icon && (
          <Icon className={cn(sizeConfig.icon, colors.text)} />
        )}
        {showLabel && (
          <span className={cn(
            sizeConfig.text, 
            colors.text,
            showIcon && "ml-1"
          )}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md",
        sizeConfig.container,
        colors.background,
        colors.border,
        "border",
        className
      )}
      title={priorityLabels[priority]}
      {...props}
    >
      {showIcon && Icon && (
        <Icon className={cn(sizeConfig.icon, colors.text)} />
      )}
      {showLabel && (
        <span className={cn(sizeConfig.text, colors.text, "font-medium")}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      )}
    </div>
  );
};

// Priority selector component
const PrioritySelector = ({ 
  value = 'medium',
  onChange,
  size = 'default',
  disabled = false,
  className,
  ...props 
}) => {
  const priorities = ['low', 'medium', 'high', 'urgent'];
  
  return (
    <div 
      className={cn(
        "inline-flex rounded-md shadow-sm",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      role="group"
      {...props}
    >
      {priorities.map((priority, index) => {
        const isSelected = value === priority;
        const colors = PRIORITY_COLORS[priority];
        
        return (
          <button
            key={priority}
            type="button"
            onClick={() => onChange && onChange(priority)}
            className={cn(
              "relative inline-flex items-center px-3 py-2 text-sm font-medium border",
              index === 0 && "rounded-l-md",
              index === priorities.length - 1 && "rounded-r-md",
              index !== 0 && "-ml-px",
              isSelected ? [
                colors.background,
                colors.text,
                colors.border,
                "z-10"
              ] : [
                "bg-background",
                "text-muted-foreground",
                "border-input",
                "hover:bg-accent",
                "hover:text-accent-foreground"
              ]
            )}
            disabled={disabled}
          >
            <PriorityIndicator 
              priority={priority} 
              size="sm" 
              variant="minimal"
              showLabel
            />
          </button>
        );
      })}
    </div>
  );
};

// Compact priority toggle
const PriorityToggle = ({ 
  value = 'medium',
  onChange,
  size = 'default',
  className,
  ...props 
}) => {
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const currentIndex = priorities.indexOf(value);
  
  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % priorities.length;
    if (onChange) {
      onChange(priorities[nextIndex]);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "transition-colors",
        className
      )}
      title="Click to change priority"
      {...props}
    >
      <PriorityIndicator 
        priority={value} 
        size={size}
        showLabel
      />
    </button>
  );
};

// Priority legend component
const PriorityLegend = ({ className, size = 'default' }) => {
  const priorities = ['low', 'medium', 'high', 'urgent'];
  
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {priorities.map(priority => (
        <PriorityIndicator
          key={priority}
          priority={priority}
          size={size}
          showLabel
        />
      ))}
    </div>
  );
};

// Priority filter chips
const PriorityFilter = ({ 
  selected = [],
  onChange,
  multiple = true,
  className,
  ...props 
}) => {
  const priorities = ['low', 'medium', 'high', 'urgent'];
  
  const handleToggle = (priority) => {
    if (!onChange) return;
    
    if (multiple) {
      const newSelected = selected.includes(priority)
        ? selected.filter(p => p !== priority)
        : [...selected, priority];
      onChange(newSelected);
    } else {
      onChange(selected.includes(priority) ? [] : [priority]);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {priorities.map(priority => {
        const isSelected = selected.includes(priority);
        const colors = PRIORITY_COLORS[priority];
        
        return (
          <button
            key={priority}
            onClick={() => handleToggle(priority)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              "border",
              isSelected ? [
                colors.background,
                colors.text,
                colors.border
              ] : [
                "border-input",
                "hover:bg-accent",
                "hover:text-accent-foreground"
              ]
            )}
          >
            <PriorityIndicator 
              priority={priority} 
              size="sm" 
              variant="minimal"
            />
            <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
          </button>
        );
      })}
    </div>
  );
};

export { 
  PriorityIndicator, 
  PrioritySelector, 
  PriorityToggle,
  PriorityLegend,
  PriorityFilter
};