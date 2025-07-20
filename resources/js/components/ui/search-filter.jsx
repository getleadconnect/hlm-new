import React from 'react';
import { cn } from '@/lib/utils';
import { Search, Filter, X } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Input } from './input';
import { Select, SelectOption } from './select';

const SearchFilter = ({ 
  className, 
  onSearch, 
  onFilterChange,
  filters = {},
  placeholder = "Search...",
  showFilters = true,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState({
    status: '',
    priority: '',
    assignee: '',
    dateRange: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilter = (filterType) => {
    handleFilterChange(filterType, '');
  };

  const activeFilterCount = Object.values(activeFilters).filter(v => v).length;

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Search Bar */}
      <div className="flex gap-2">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </form>
        
        {showFilters && (
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => 
            value ? (
              <Badge key={key} variant="secondary" className="flex items-center gap-1">
                <span className="capitalize">{key}:</span>
                <span>{value}</span>
                <button
                  onClick={() => clearFilter(key)}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilters({
              status: '',
              priority: '',
              assignee: '',
              dateRange: ''
            })}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {isFilterOpen && showFilters && (
        <div className="rounded-lg border bg-card p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select
                value={activeFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <SelectOption value="">All Status</SelectOption>
                <SelectOption value="new">New</SelectOption>
                <SelectOption value="open">Open</SelectOption>
                <SelectOption value="pending">Pending</SelectOption>
                <SelectOption value="resolved">Resolved</SelectOption>
                <SelectOption value="closed">Closed</SelectOption>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <Select
                value={activeFilters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <SelectOption value="">All Priorities</SelectOption>
                <SelectOption value="low">Low</SelectOption>
                <SelectOption value="medium">Medium</SelectOption>
                <SelectOption value="high">High</SelectOption>
                <SelectOption value="urgent">Urgent</SelectOption>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Assignee</label>
              <Select
                value={activeFilters.assignee}
                onChange={(e) => handleFilterChange('assignee', e.target.value)}
              >
                <SelectOption value="">All Assignees</SelectOption>
                <SelectOption value="me">Assigned to me</SelectOption>
                <SelectOption value="unassigned">Unassigned</SelectOption>
                <SelectOption value="team">My team</SelectOption>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Select
                value={activeFilters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <SelectOption value="">All time</SelectOption>
                <SelectOption value="today">Today</SelectOption>
                <SelectOption value="week">This week</SelectOption>
                <SelectOption value="month">This month</SelectOption>
                <SelectOption value="quarter">This quarter</SelectOption>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchFilter };