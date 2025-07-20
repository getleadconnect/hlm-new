import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Priority variants
        priorityLow:
          "border-transparent bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        priorityMedium:
          "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        priorityHigh:
          "border-transparent bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
        priorityUrgent:
          "border-transparent bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        // Status variants
        statusNew:
          "border-transparent bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        statusOpen:
          "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        statusPending:
          "border-transparent bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        statusResolved:
          "border-transparent bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        statusClosed:
          "border-transparent bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
})
Badge.displayName = "Badge"

// Priority Badge Component
const PriorityBadge = ({ priority, className, ...props }) => {
  const variantMap = {
    low: "priorityLow",
    medium: "priorityMedium",
    high: "priorityHigh",
    urgent: "priorityUrgent",
  }
  
  return (
    <Badge 
      variant={variantMap[priority] || "default"} 
      className={cn("gap-1", className)}
      {...props}
    >
      <span className={cn(
        "h-2 w-2 rounded-full",
        priority === "low" && "bg-gray-500",
        priority === "medium" && "bg-blue-500",
        priority === "high" && "bg-orange-500",
        priority === "urgent" && "bg-red-500"
      )} />
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  )
}

// Status Badge Component
const StatusBadge = ({ status, className, ...props }) => {
  const variantMap = {
    new: "statusNew",
    open: "statusOpen",
    pending: "statusPending",
    resolved: "statusResolved",
    closed: "statusClosed",
  }
  
  return (
    <Badge 
      variant={variantMap[status] || "default"} 
      className={className}
      {...props}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export { Badge, badgeVariants, PriorityBadge, StatusBadge }