import { ColumnsWithTasks } from '@/lib/supabase/models';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MoreHorizontalIcon } from 'lucide-react';

interface ColProps {
  column: ColumnsWithTasks;
  children: React.ReactNode;
  // onCreateTask: (taskData: any) => Promise<void>;
  // onEditColumn: (column: ColumnsWithTasks) => void;
}

const Column = ({ column, children }: ColProps) => {
  return (
    <div className="w-full lg:w-80 lg:flex-shrink-0">
      <div className="rounded-lg border shadow-sm">
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
            <Button variant={'ghost'} size={'sm'} className="flex-shrink-0">
              <MoreHorizontalIcon />
            </Button>
          </div>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default Column;
