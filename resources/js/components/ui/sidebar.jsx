import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { 
  Home, 
  Inbox, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, badge, active, onClick, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const hasChildren = !!children;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <button
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          active 
            ? "bg-secondary text-secondary-foreground" 
            : "hover:bg-secondary/50"
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-5 w-5" />}
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {badge !== undefined && (
            <Badge variant="secondary" className="h-5 px-2">
              {badge}
            </Badge>
          )}
          {hasChildren && (
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              isOpen ? "rotate-180" : ""
            )} />
          )}
        </div>
      </button>
      {hasChildren && isOpen && (
        <div className="ml-5 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ className, role = 'agent', collapsed = false, ...props }) => {
  const [activeItem, setActiveItem] = React.useState('dashboard');

  const agentMenuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { 
      id: 'tickets', 
      icon: Inbox, 
      label: 'Tickets',
      badge: 12,
      children: [
        { id: 'tickets-all', icon: Inbox, label: 'All Tickets', badge: 45 },
        { id: 'tickets-open', icon: Clock, label: 'Open', badge: 12 },
        { id: 'tickets-pending', icon: MessageSquare, label: 'Pending', badge: 8 },
        { id: 'tickets-resolved', icon: CheckCircle, label: 'Resolved', badge: 15 },
        { id: 'tickets-closed', icon: XCircle, label: 'Closed', badge: 10 },
      ]
    },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'knowledge-base', icon: HelpCircle, label: 'Knowledge Base' },
  ];

  const adminMenuItems = [
    ...agentMenuItems,
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : agentMenuItems;

  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-col border-r bg-card",
        collapsed && "w-16",
        className
      )}
      {...props}
    >
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={!collapsed ? item.label : ''}
              badge={!collapsed ? item.badge : undefined}
              active={activeItem === item.id}
              onClick={() => !item.children && setActiveItem(item.id)}
              defaultOpen={item.id === 'tickets'}
            >
              {item.children && !collapsed && item.children.map((child) => (
                <SidebarItem
                  key={child.id}
                  icon={child.icon}
                  label={child.label}
                  badge={child.badge}
                  active={activeItem === child.id}
                  onClick={() => setActiveItem(child.id)}
                />
              ))}
            </SidebarItem>
          ))}
        </nav>
      </div>

      {/* User info section */}
      {!collapsed && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <div className="text-sm">
              <p className="font-medium">Online</p>
              <p className="text-xs text-muted-foreground">Available for tickets</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export { Sidebar, SidebarItem };