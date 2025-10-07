'use client';
import { useState } from 'react';
import Column from '@/app/boards/[id]/Column';
import TaskComponent from '@/app/boards/[id]/TaskComponent';
import AddTaskDialog from './AddTaskDialog';
import TaskOverlay from './TaskOverlay';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ColumnsWithTasks, Task } from '@/lib/supabase/models';
import { moveTask } from '@/lib/services';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AddColumnDialog from './AddColumnDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DashboardStore } from '@/app/store/DashboardStore';
import DeleteBoardDialog from './DeleteBoardDialog';
import DeleteColumnDialog from './DeleteColumnDialog';

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
  const router = useRouter();
  const setOpen = DashboardStore((state) => state.setOpenDeleteColumn);
  const setSelectedColumn = DashboardStore((state) => state.setSelectedColumn);
  const selectedColumn = DashboardStore((state) => state.selectedColumn);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  const handleDragStart = (e: DragStartEvent) => {
    const taskId = e.active.id as string;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === taskId);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === activeId),
    );
    const targetColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === overId),
    );

    if (!sourceColumn || !targetColumn) return;

    if (sourceColumn.id === targetColumn.id) {
      const activeIndex = sourceColumn.tasks.findIndex(
        (task) => task.id === activeId,
      );
      const overIndex = targetColumn.tasks.findIndex(
        (task) => task.id === overId,
      );

      if (activeIndex !== overIndex) {
        setColumns((prev) => {
          const newColumns = [...prev];
          const column = newColumns.find((col) => col.id === sourceColumn.id);
          if (column) {
            const tasks = [...column.tasks];
            const [movedTask] = tasks.splice(activeIndex, 1);
            tasks.splice(overIndex, 0, movedTask);
            column.tasks = tasks;
          }
          return newColumns;
        });
      }
    }
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    const targetColumn = columns.find((col) => col.id === overId);
    if (!targetColumn) return;

    const sourceColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === taskId),
    );

    if (!sourceColumn || sourceColumn.id === targetColumn.id) return;

    // Optimistic UI update
    setColumns((prev) => {
      const updated = prev.map((col) => {
        // Remove task from source column
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== taskId),
          };
        }

        // Add task to target column
        if (col.id === targetColumn.id) {
          const movedTask = sourceColumn.tasks.find(
            (task) => task.id === taskId,
          );
          return {
            ...col,
            tasks: movedTask ? [...col.tasks, movedTask] : col.tasks,
          };
        }

        return col;
      });

      return updated;
    });

    try {
      await moveTask(taskId, targetColumn.id, targetColumn.tasks.length);
      router.refresh();
      toast.success('Task moved successfully');
    } catch (err) {
      console.error(err);
      toast.error('Could not move the task');
    }
  };

  return (
    <>
      <main className="container mx-auto px-2 py-4 sm:px-4 sm:py-6">
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="text-sm">
              <span className="font-medium">Total Tasks: {tasks.length}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <DeleteBoardDialog boardId={id} />
            <AddTaskDialog columns={columns} />
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col space-y-4 lg:-mx-2 lg:flex-row lg:space-y-0 lg:space-x-6 lg:overflow-x-auto lg:px-2 lg:pb-6 lg:[&::-webkit-scrollbar]:h-2 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:bg-gray-300 lg:[&::-webkit-scrollbar-track]:bg-gray-100">
            {columns.map((column) => (
              <Column
                onDelete={() => {
                  setSelectedColumn({
                    id: column.id,
                    board_id: column.board_id,
                  });
                  setOpen(true);
                }}
                column={column}
                key={column.id}
              >
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
            <DeleteColumnDialog
              columnId={selectedColumn?.id ?? ''}
              boardId={selectedColumn?.board_id ?? ''}
            />
            <div className="w-full flex-shrink-0 lg:w-80">
              <Button
                variant={'outline'}
                className="h-full min-h-[200px] w-full border-2 border-dashed text-gray-400"
                onClick={() => setOpen(true)}
              >
                <Plus />
                Add another list
              </Button>
            </div>
            <DragOverlay>
              {activeTask ? <TaskOverlay task={activeTask} /> : null}
            </DragOverlay>
          </div>
        </DndContext>
      </main>
      <AddColumnDialog columnsWithTasks={columnsWithTasks} id={id} />
    </>
  );
};

export default BoardContentClient;
