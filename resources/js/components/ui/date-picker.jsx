import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

// Date picker component
const DatePicker = ({ 
  value,
  onChange,
  placeholder = "Select date",
  minDate,
  maxDate,
  disabled = false,
  className,
  ...props 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(value || new Date());
  const inputRef = React.useRef(null);
  const calendarRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (onChange) onChange(newDate);
    setIsOpen(false);
  };

  const handleMonthChange = (increment) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + increment, 1));
  };

  const isDateDisabled = (date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9" />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const isSelected = value && value.toDateString() === date.toDateString();
      const isToday = new Date().toDateString() === date.toDateString();
      const isDisabled = isDateDisabled(date);
      
      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
          className={cn(
            "h-9 w-9 rounded-md text-sm font-normal flex items-center justify-center hover:bg-accent hover:text-accent-foreground",
            isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            isToday && !isSelected && "border border-primary",
            isDisabled && "text-muted-foreground cursor-not-allowed hover:bg-transparent"
          )}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="relative" ref={calendarRef}>
      <div className="relative" ref={inputRef}>
        <Input
          value={formatDate(value)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className={cn("cursor-pointer pr-10", className)}
          {...props}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-auto p-3 bg-popover border rounded-md shadow-md animate-in fade-in-0 zoom-in-95">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleMonthChange(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-sm font-medium">
              {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleMonthChange(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="h-9 w-9 flex items-center justify-center text-xs text-muted-foreground font-medium">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
          
          {/* Today button */}
          <div className="mt-3 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                const today = new Date();
                if (onChange) onChange(today);
                setIsOpen(false);
              }}
            >
              Today
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Time picker component
const TimePicker = ({ 
  value,
  onChange,
  placeholder = "Select time",
  format = "12", // 12 or 24
  minuteStep = 15,
  disabled = false,
  className,
  ...props 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hours, setHours] = React.useState(value ? value.getHours() : 0);
  const [minutes, setMinutes] = React.useState(value ? value.getMinutes() : 0);
  const [period, setPeriod] = React.useState(hours >= 12 ? 'PM' : 'AM');
  const pickerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (date) => {
    if (!date) return '';
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    
    if (format === '12') {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleTimeSelect = () => {
    let finalHours = hours;
    if (format === '12') {
      if (period === 'PM' && hours !== 12) finalHours += 12;
      if (period === 'AM' && hours === 12) finalHours = 0;
    }
    
    const newDate = value ? new Date(value) : new Date();
    newDate.setHours(finalHours, minutes);
    
    if (onChange) onChange(newDate);
    setIsOpen(false);
  };

  const generateHours = () => {
    const max = format === '12' ? 12 : 23;
    const start = format === '12' ? 1 : 0;
    return Array.from({ length: max - start + 1 }, (_, i) => start + i);
  };

  const generateMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += minuteStep) {
      minutes.push(i);
    }
    return minutes;
  };

  return (
    <div className="relative" ref={pickerRef}>
      <div className="relative">
        <Input
          value={formatTime(value)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className={cn("cursor-pointer pr-10", className)}
          {...props}
        />
        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-popover border rounded-md shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="flex gap-2">
            {/* Hours */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Hour</label>
              <select
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="h-9 w-20 rounded-md border bg-background px-3 text-sm"
              >
                {generateHours().map(h => (
                  <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>
                ))}
              </select>
            </div>
            
            {/* Minutes */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Minute</label>
              <select
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value))}
                className="h-9 w-20 rounded-md border bg-background px-3 text-sm"
              >
                {generateMinutes().map(m => (
                  <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
                ))}
              </select>
            </div>
            
            {/* AM/PM for 12-hour format */}
            {format === '12' && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Period</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="h-9 w-20 rounded-md border bg-background px-3 text-sm"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleTimeSelect}
            >
              Set Time
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Combined DateTime picker
const DateTimePicker = ({ 
  value,
  onChange,
  dateProps = {},
  timeProps = {},
  className,
  ...props 
}) => {
  const handleDateChange = (date) => {
    const newDateTime = value ? new Date(value) : new Date();
    newDateTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    if (onChange) onChange(newDateTime);
  };

  const handleTimeChange = (time) => {
    const newDateTime = value ? new Date(value) : new Date();
    newDateTime.setHours(time.getHours(), time.getMinutes());
    if (onChange) onChange(newDateTime);
  };

  return (
    <div className={cn("flex gap-2", className)} {...props}>
      <DatePicker
        value={value}
        onChange={handleDateChange}
        className="flex-1"
        {...dateProps}
      />
      <TimePicker
        value={value}
        onChange={handleTimeChange}
        className="w-32"
        {...timeProps}
      />
    </div>
  );
};

export { DatePicker, TimePicker, DateTimePicker };