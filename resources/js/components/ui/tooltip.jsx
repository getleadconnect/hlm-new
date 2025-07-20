import * as React from "react"
import { cn } from "@/lib/utils"

const TooltipContext = React.createContext({})

const TooltipProvider = ({ children, delayDuration = 700 }) => {
  return (
    <TooltipContext.Provider value={{ delayDuration }}>
      {children}
    </TooltipContext.Provider>
  )
}

const Tooltip = ({ children, ...props }) => {
  const [open, setOpen] = React.useState(false)
  
  return (
    <div className="relative inline-block" {...props}>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { open, setOpen })
          : child
      )}
    </div>
  )
}

const TooltipTrigger = React.forwardRef(({ children, open, setOpen, asChild, ...props }, ref) => {
  const { delayDuration = 700 } = React.useContext(TooltipContext)
  const timeoutRef = React.useRef(null)

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(true)
    }, delayDuration)
  }

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current)
    setOpen(false)
  }

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const triggerProps = {
    ref,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
    ...props
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps)
  }

  return (
    <div {...triggerProps}>
      {children}
    </div>
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef(({ 
  className, 
  sideOffset = 4,
  side = "top",
  open,
  ...props 
}, ref) => {
  if (!open) return null

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        positionClasses[side],
        className
      )}
      style={{ marginTop: `${sideOffset}px` }}
      {...props}
    >
      {props.children}
      <div 
        className={cn(
          "absolute h-0 w-0 border-[5px] border-popover",
          arrowClasses[side]
        )}
      />
    </div>
  )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }