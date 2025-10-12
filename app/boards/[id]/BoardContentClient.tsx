'use client';
import { useMemo, useState } from 'react';
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
import { ColumnsWithTasks, Task } from '@/services/supabase/models';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { DashboardStore } from '@/app/store/DashboardStore';
import EditColumnDialog from './EditColumnDialog';
import EditTaskDialog from './EditTaskDialog';
import DeleteDialog from '@/components/DeleteDialog';
import { moveTask } from '@/services/actions/taskActions';

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
  const filters = DashboardStore((state) => state.filters);

  const [columns, setColumns] = useState<ColumnsWithTasks[]>(columnsWithTasks);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const router = useRouter();

  const setOpenAddColumn = DashboardStore((state) => state.setOpenAddColumn);

  const setOpenEditColumn = DashboardStore((state) => state.setOpenEditColumn);
  const setOpenAddTask = DashboardStore((state) => state.setOpenAddTask);
  const setSelectedColumn = DashboardStore((state) => state.setSelectedColumn);
  const selectedColumn = DashboardStore((state) => state.selectedColumn);
  const selectedTask = DashboardStore((state) => state.selectedTask);
  const setSelectedTask = DashboardStore((state) => state.setSelectedTask);
  const setOpenEditTask = DashboardStore((state) => state.setOpenEditTask);
  const setSelectedDelete = DashboardStore((state) => state.setSelectedDelete);
  const selectedDelete = DashboardStore((state) => state.selectedDelete);
  const setOpenDeleteDialog = DashboardStore(
    (state) => state.setOpenDeleteDialog,
  );
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
    } catch (err) {
      console.error(err);
      toast.error('Could not move the task');
    }
  };
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
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant={'destructive'}
              onClick={() => {
                setSelectedDelete({
                  id: id,
                  type: 'board',
                });
                setOpenDeleteDialog(true);
              }}
              className="w-full sm:w-auto"
            >
              <Trash />
              Delete this Board
            </Button>
            <Button
              onClick={() => setOpenAddTask(true)}
              className="w-full sm:w-auto"
            >
              <Plus />
              Add Task
            </Button>
          </div>
          <AddTaskDialog id={id} columns={columns} />

          <EditColumnDialog
            title={selectedColumn?.title ?? ''}
            id={selectedColumn?.id ?? ''}
            boardId={id}
          />
          <DeleteDialog
            id={selectedDelete?.id ?? ''}
            boardId={selectedDelete?.boardId ?? ''}
            type={selectedDelete?.type ?? ''}
            board_column_id={selectedDelete?.board_column_id}
          />
          <EditTaskDialog selectedTask={selectedTask} />
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
              <Column
                onDelete={() => {
                  setSelectedDelete({
                    id: column.id,
                    boardId: column.board_id,
                    type: 'column',
                  });
                  setOpenDeleteDialog(true);
                }}
                onEdit={() => {
                  setSelectedColumn({
                    title: column.title,
                    id: column.id,
                    board_id: column.board_id,
                  });
                  setOpenEditColumn(true);
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
                      <TaskComponent
                        onEdit={() => {
                          setSelectedTask({
                            id: task.id,
                            board_column_id: task.board_column_id,
                            assignee: task.assignee,
                            priority: task.priority,
                            dueDate: task.due_date,
                            title: task.title,
                            description: task.description,
                          });
                          setOpenEditTask(true);
                        }}
                        onDelete={() => {
                          setSelectedDelete({
                            id: task.id,
                            type: 'task',
                            board_column_id: task.board_column_id,
                          });
                          setOpenDeleteDialog(true);
                        }}
                        task={task}
                        key={task.id}
                      />
                    ))}
                  </div>
                </SortableContext>
              </Column>
            ))}

            <div className="w-full flex-shrink-0 lg:w-80">
              <Button
                variant={'outline'}
                className="h-full min-h-[200px] w-full border-2 border-dashed text-gray-400"
                onClick={() => setOpenAddColumn(true)}
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
    </>
  );
};

export default BoardContentClient;
