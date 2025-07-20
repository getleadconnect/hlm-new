import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

const ToastContext = React.createContext({})

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([])

  const addToast = React.useCallback((toast) => {
    const id = Date.now()
    const newToast = { ...toast, id }
    
    setToasts((prev) => [...prev, newToast])

    // Auto dismiss after duration (default 5 seconds)
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }

    return id
  }, [])

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const contextValue = React.useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  const toast = React.useCallback((options) => {
    return context.addToast(options)
  }, [context])

  const dismiss = React.useCallback((id) => {
    context.removeToast(id)
  }, [context])

  return { toast, dismiss, toasts: context.toasts }
}

const ToastContainer = () => {
  const { toasts } = React.useContext(ToastContext)

  return (
    <div className="fixed bottom-0 right-0 z-50 m-4 flex max-h-screen w-full max-w-sm flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

const Toast = ({ id, title, description, variant = "default", action }) => {
  const { removeToast } = React.useContext(ToastContext)

  const icons = {
    default: null,
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    info: <Info className="h-5 w-5 text-blue-600" />,
  }

  const variantClasses = {
    default: "bg-background border",
    success: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
    error: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
    warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
    info: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
  }

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg p-4 shadow-lg transition-all",
        "animate-in slide-in-from-bottom-5",
        variantClasses[variant]
      )}
    >
      {icons[variant] && <div className="flex-shrink-0">{icons[variant]}</div>}
      
      <div className="flex-1 space-y-1">
        {title && <p className="text-sm font-semibold leading-none">{title}</p>}
        {description && (
          <p className="text-sm leading-none text-muted-foreground">
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>

      <button
        onClick={() => removeToast(id)}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// Simple toast functions for common use cases
const toast = {
  success: (title, description, options = {}) => {
    const { toast } = useToast()
    return toast({ title, description, variant: "success", ...options })
  },
  error: (title, description, options = {}) => {
    const { toast } = useToast()
    return toast({ title, description, variant: "error", ...options })
  },
  warning: (title, description, options = {}) => {
    const { toast } = useToast()
    return toast({ title, description, variant: "warning", ...options })
  },
  info: (title, description, options = {}) => {
    const { toast } = useToast()
    return toast({ title, description, variant: "info", ...options })
  },
}

export { ToastProvider, useToast, toast }