'use client';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ColumnsWithTasks, Task } from '@/app/services/supabase/models';
import { Plus, Trash } from 'lucide-react';
import { useFilterStore } from '@/app/store/FilterStore';
import useDragnDrop from '@/app/hooks/useDragnDrop';
import dynamic from 'next/dynamic';
import TaskComponent from './TaskComponent';
import Column from './Column';
import TaskOverlay from './TaskOverlay';

const AddColumnDialog = dynamic(() => import('./AddColumnDialog'), {
  ssr: false,
});
const AddTaskDialog = dynamic(() => import('@/app/boards/[id]/AddTaskDialog'), {
  ssr: false,
});
const DeleteDialog = dynamic(() => import('@/components/DeleteDialog'), {
  ssr: false,
});
interface BoardClientViewProps {
  columnsWithTasks: ColumnsWithTasks[];
  tasks: Task[];
  id: string;
}

const BoardContentClient = ({
  columnsWithTasks,
  tasks,
  id,
}: BoardClientViewProps) => {
  const [columns, setColumns] = useState<ColumnsWithTasks[]>(columnsWithTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const { filters } = useFilterStore();
  const { handleDragStart, handleDragEnd, handleDragOver } = useDragnDrop({
    columns,
    setColumns,
    setActiveTask,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const filteredColumns = useMemo(() => {
    return columnsWithTasks.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => {
        if (
          filters.priority.length > 0 &&
          !filters.priority.includes(task.priority)
        ) {
          return false;
        }

        if (
          filters.dueDate &&
          new Date(task.due_date).toDateString() !==
            new Date(filters.dueDate).toDateString()
        ) {
          return false;
        }

        return true;
      }),
    }));
  }, [columnsWithTasks, filters]);
  return (
    <>
      <main className="container mx-auto px-2 py-4 sm:px-4 sm:py-6">
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="text-sm">
              <span className="font-medium">Total Tasks: {tasks.length}</span>
            </div>
          </div>
          <div className="flex w-full flex-col justify-end gap-2 sm:flex-row">
            <DeleteDialog id={id} type="board">
              <Button variant={'destructive'} className="w-full sm:w-auto">
                <Trash />
                Delete this Board
              </Button>
            </DeleteDialog>
            <AddTaskDialog id={id} columns={columns}>
              <Button className="w-full sm:w-auto">
                <Plus />
                Add Task
              </Button>
            </AddTaskDialog>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col space-y-4 lg:-mx-2 lg:flex-row lg:space-y-0 lg:space-x-6 lg:overflow-x-auto lg:px-2 lg:pb-6 lg:[&::-webkit-scrollbar]:h-2 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:lg:[&::-webkit-scrollbar-thumb]:bg-gray-700 lg:[&::-webkit-scrollbar-track]:bg-gray-100 dark:lg:[&::-webkit-scrollbar-track]:bg-gray-800">
            {filteredColumns.map((column) => (
              <Column column={column} key={column.id}>
                <SortableContext
                  items={column.tasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {column.tasks.map((task) => (
                      <TaskComponent task={task} key={task.id} />
                    ))}
                  </div>
                </SortableContext>
              </Column>
            ))}
            <AddColumnDialog columnsWithTasks={columnsWithTasks} id={id}>
              <div className="w-full flex-shrink-0 lg:w-80">
                <Button
                  variant={'outline'}
                  className="h-full min-h-[200px] w-full border-2 border-dashed text-gray-400"
                >
                  <Plus />
                  Add another list
                </Button>
              </div>
            </AddColumnDialog>
            <DragOverlay>
              {activeTask ? <TaskOverlay task={activeTask} /> : null}
            </DragOverlay>
          </div>
        </DndContext>
      </main>
    </>
  );
};

export default BoardContentClient;
