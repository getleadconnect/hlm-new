import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, MoreHorizontal, MoreVertical } from "lucide-react"
import { Button } from "./button"

const DropdownMenu = ({ children, trigger, align = "end", ...props }) => {
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef} {...props}>
      <div onClick={() => setOpen(!open)}>
        {trigger}
      </div>
      {open && (
        <div
          className={cn(
            "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            "animate-in fade-in-0 zoom-in-95",
            align === "end" ? "right-0" : "left-0",
            "mt-2"
          )}
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { onClick: () => setOpen(false) })
          )}
        </div>
      )}
    </div>
  )
}

const DropdownMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

// Pre-built dropdown triggers
const DropdownMenuTrigger = ({ children, variant = "ghost", ...props }) => (
  <Button variant={variant} className="flex items-center gap-1" {...props}>
    {children}
    <ChevronDown className="h-4 w-4" />
  </Button>
)

const MoreActionsDropdown = ({ children, ...props }) => (
  <DropdownMenu
    trigger={
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    }
    {...props}
  >
    {children}
  </DropdownMenu>
)

export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  MoreActionsDropdown,
}