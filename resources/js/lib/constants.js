// Design System Constants

// Priority Colors
export const PRIORITY_COLORS = {
  low: {
    background: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-300 dark:border-gray-600',
    dot: 'bg-gray-500'
  },
  medium: {
    background: 'bg-blue-100 dark:bg-blue-900',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-600',
    dot: 'bg-blue-500'
  },
  high: {
    background: 'bg-orange-100 dark:bg-orange-900',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-300 dark:border-orange-600',
    dot: 'bg-orange-500'
  },
  urgent: {
    background: 'bg-red-100 dark:bg-red-900',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-300 dark:border-red-600',
    dot: 'bg-red-500'
  }
};

// Ticket Status Colors
export const STATUS_COLORS = {
  new: {
    background: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-300 dark:border-slate-600'
  },
  open: {
    background: 'bg-blue-100 dark:bg-blue-900',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-600'
  },
  pending: {
    background: 'bg-yellow-100 dark:bg-yellow-900',
    text: 'text-yellow-700 dark:text-yellow-300',
    border: 'border-yellow-300 dark:border-yellow-600'
  },
  resolved: {
    background: 'bg-green-100 dark:bg-green-900',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-300 dark:border-green-600'
  },
  closed: {
    background: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-300 dark:border-gray-600'
  }
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  AGENT: 'agent',
  SUPERVISOR: 'supervisor',
  ADMIN: 'admin'
};

// Ticket Sources
export const TICKET_SOURCES = {
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
  PORTAL: 'portal',
  API: 'api'
};