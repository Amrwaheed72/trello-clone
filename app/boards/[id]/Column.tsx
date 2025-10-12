'use client';
import { ColumnsWithTasks } from '@/app/services/supabase/models';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { MoreHorizontalIcon, Trash } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';

interface ColProps {
  column: ColumnsWithTasks;
  children: React.ReactNode;
  onDelete: () => void;
  onEdit: () => void;
  // onCreateTask: (taskData: any) => Promise<void>;
  // onEditColumn: (column: ColumnsWithTasks) => void;
}

const Column = ({ column, children, onDelete, onEdit }: ColProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  return (
    <div
      ref={setNodeRef}
      className={`w-full lg:w-80 lg:flex-shrink-0 ${isOver ? 'rounded-lg bg-blue-50 dark:bg-blue-950' : ''}`}
    >
      <div
        className={`rounded-lg border shadow-sm ${isOver ? 'ring-2 ring-blue-300' : ''}`}
      >
        <div className="border-b p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center space-x-2">
              <h3 className="truncate text-sm font-semibold sm:text-base">
                {column.title}
              </h3>
              <Badge variant={'secondary'} className="flex-shrink-0 text-xs">
                {column.tasks.length}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onDelete}
                variant="outline"
                size={'sm'}
                className="flex-shrink-0"
              >
                <Trash />
              </Button>
              <Button
                onClick={onEdit}
                variant={'outline'}
                size={'sm'}
                className="flex-shrink-0"
              >
                <MoreHorizontalIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default Column;
