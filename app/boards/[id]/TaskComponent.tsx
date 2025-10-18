'use client';
import { Task } from '@/app/services/supabase/models';
import { Calendar, MoreHorizontalIcon, Trash, User } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const Card = dynamic(
  () => import('@/components/ui/card').then((mod) => mod.Card),
  {
    ssr: false,
  },
);
const CardContent = dynamic(
  () => import('@/components/ui/card').then((mod) => mod.CardContent),
  {
    ssr: false,
  },
);

const TaskComponent = memo(function TaskComponent({
  task,
  onDelete,
  onEdit,
}: {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
  const {
    assignee,
    description,
    due_date,
    priority,
    sort_order,
    title,
    created_at,
  } = task;

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={setNodeRef} style={styles} {...listeners} {...attributes}>
      <Card className="cursor-pointer transition-shadow hover:shadow-md dark:shadow-gray-700">
        <CardContent className="p-3 sm:p-4">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start justify-between">
              <h4 className="min-w-0 flex-1 pr-2 text-sm leading-tight font-medium">
                {title}
              </h4>
              <div>
                <Button onClick={onDelete} size={'sm'} variant={'ghost'}>
                  <Trash />
                </Button>
                <Button onClick={onEdit} size={'sm'} variant={'ghost'}>
                  <MoreHorizontalIcon />
                </Button>
              </div>
            </div>
            <p className="line-clamp-2 text-xs">
              {description || 'No Description.'}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center space-x-1 sm:space-x-2">
                {assignee && (
                  <div className="flex items-center space-x-1 text-xs">
                    <User className="h-3 w-3" />
                    <span className="truncate">{assignee}</span>
                  </div>
                )}
                {due_date && (
                  <div className="flex items-center space-x-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span className="truncate">{due_date}</span>
                  </div>
                )}
              </div>
              <div
                className={`h-2 w-2 flex-shrink-0 rounded-full ${getPriorityColor(priority)}`}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default TaskComponent;
