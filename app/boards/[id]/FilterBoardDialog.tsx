'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFilterStore } from '@/app/store/FilterStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

const priorityOptions = ['low', 'medium', 'high'];
const FilterBoardDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { openFilter, setOpenFilter, filters, setFilters, clearFilters } =
    useFilterStore();

  const onPriorityFilter = (priority: string) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter((p) => p !== priority)
      : [...filters.priority, priority];
    setFilters({ ...filters, priority: newPriorities });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Tasks</DialogTitle>
          <DialogDescription>
            Filter tasks by priority, assignee, or due date
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex flex-wrap gap-2">
              {priorityOptions.map((priority, i) => (
                <Button
                  onClick={() => {
                    onPriorityFilter(priority);
                  }}
                  variant={
                    filters.priority.includes(priority) ? 'default' : 'outline'
                  }
                  size={'sm'}
                  key={i}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          {/* <div className="space-y-2">
            <Label>Assignee</Label>
            <div className="flex flex-wrap gap-2">
              {priorityOptions.map((priority, i) => (
                <Button variant={'outline'} size={'sm'} key={i}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Button>
              ))}
            </div>
          </div> */}
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input
              type="date"
              value={filters.dueDate || ''}
              onChange={(e) =>
                setFilters({ ...filters, dueDate: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button onClick={clearFilters} type="button" variant={'outline'}>
              Clear Filter
            </Button>
            <Button
              type="button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterBoardDialog;
