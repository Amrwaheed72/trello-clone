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
import { useDeleteDialogStore } from '@/app/store/DeleteDialogStore';
import { useFilterStore } from '@/app/store/FilterStore';
import { useColumnStore } from '@/app/store/ColumnStore';
import { useTaskStore } from '@/app/store/TaskStore';
import useDragnDrop from '@/app/hooks/useDragnDrop';
import dynamic from 'next/dynamic';

const Column = dynamic(() => import('@/app/boards/[id]/Column'), {
  ssr: false,
});
const TaskComponent = dynamic(() => import('@/app/boards/[id]/TaskComponent'), {
  ssr: false,
});
const AddTaskDialog = dynamic(() => import('@/app/boards/[id]/AddTaskDialog'), {
  ssr: false,
});
const EditColumnDialog = dynamic(
  () => import('@/app/boards/[id]/EditColumnDialog'),
  {
    ssr: false,
  },
);
const EditTaskDialog = dynamic(
  () => import('@/app/boards/[id]/EditTaskDialog'),
  {
    ssr: false,
  },
);
const DeleteDialog = dynamic(() => import('@/components/DeleteDialog'), {
  ssr: false,
});
const TaskOverlay = dynamic(() => import('@/app/boards/[id]/TaskOverlay'), {
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

  const {
    setOpenAddColumn,
    setOpenEditColumn,
    setSelectedColumn,
    selectedColumn,
  } = useColumnStore();

  const { setOpenAddTask, selectedTask, setSelectedTask, setOpenEditTask } =
    useTaskStore();

  const { setSelectedDelete, selectedDelete, setOpenDeleteDialog } =
    useDeleteDialogStore();

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
