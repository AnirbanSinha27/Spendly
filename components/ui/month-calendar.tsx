'use client';

import * as React from 'react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MonthCalendarProps {
  value: string; // Format: 'yyyy-MM'
  onValueChange: (value: string) => void;
  className?: string;
}

export function MonthCalendar({ value, onValueChange, className }: MonthCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Convert 'yyyy-MM' string to Date object (first day of month)
  const selectedDate = value ? new Date(value + '-01') : new Date();
  
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const monthKey = format(date, 'yyyy-MM');
      onValueChange(monthKey);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-48 justify-start text-left font-normal bg-card/50 backdrop-blur-sm border-primary/20",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(selectedDate, 'MMMM yyyy') : <span>Pick a month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
          disabled={(date) => {
            // Disable dates more than 2 years in the past or future
            const now = new Date();
            const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), 1);
            const twoYearsFromNow = new Date(now.getFullYear() + 2, now.getMonth(), 1);
            return date < twoYearsAgo || date > twoYearsFromNow;
          }}
        />
      </PopoverContent>
    </Popover>
  );
} 