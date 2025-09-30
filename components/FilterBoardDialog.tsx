'use client';
import { DashboardStore } from '@/app/store/DashboardStore';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

const FilterBoardDialog = () => {
  const openFilter = DashboardStore((state) => state.openFilter);
  const setOpenFilter = DashboardStore((state) => state.setOpenFilter);
  return (
    <Dialog open={openFilter} onOpenChange={setOpenFilter}>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Tasks</DialogTitle>
          <DialogDescription>Filter tasks by priority, assignee, or due date</DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  );
};

export default FilterBoardDialog;
