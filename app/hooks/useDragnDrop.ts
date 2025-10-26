import { useRouter } from 'next/navigation';
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { toast } from 'sonner';
import { ColumnsWithTasks, Task } from '../services/supabase/models';
import { moveTask } from '../services/actions/taskActions';

interface UseDragnDropProps {
  columns: ColumnsWithTasks[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnsWithTasks[]>>;
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>;
  boardId: string;
}

const useDragnDrop = ({
  columns,
  setColumns,
  setActiveTask,
  boardId,
}: UseDragnDropProps) => {
  const handleDragStart = (e: DragStartEvent) => {
    const taskId = e.active.id as string;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === taskId);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === activeId),
    );

    let targetColumn = columns.find((col) => col.id === overId);
    if (!targetColumn) {
      targetColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === overId),
      );
    }

    if (!sourceColumn || !targetColumn) return;

    if (sourceColumn.id === targetColumn.id) {
      const activeIndex = sourceColumn.tasks.findIndex(
        (task) => task.id === activeId,
      );
      const overIndex = targetColumn.tasks.findIndex(
        (task) => task.id === overId,
      );

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
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
    setActiveTask(null); // This will now work correctly
    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === taskId),
    );

    let targetColumn = columns.find((col) => col.id === overId);
    if (!targetColumn) {
      targetColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === overId),
      );
    }

    if (!sourceColumn || !targetColumn || sourceColumn.id === targetColumn.id) {
      return;
    }

    const originalColumns = columns; // Keep a copy for rollback
    // Optimistic UI update
    setColumns((prev) => {
      const sourceTasks =
        prev.find((c) => c.id === sourceColumn.id)?.tasks || [];
      const movedTask = sourceTasks.find((task) => task.id === taskId);

      if (!movedTask) return prev;

      const newColumns = prev.map((c) => {
        if (c.id === sourceColumn.id) {
          return { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) };
        }
        if (c.id === targetColumn!.id) {
          return { ...c, tasks: [...c.tasks, movedTask] };
        }
        return c;
      });

      return newColumns;
    });

    try {
      await moveTask(taskId, targetColumn.id, targetColumn.tasks.length,boardId);
      toast.success('Task moved successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Could not move the task');
      // Revert optimistic update on failure
      setColumns(originalColumns);
    }
  };

  // Remove activeTask from the return object
  return { handleDragStart, handleDragOver, handleDragEnd };
};

export default useDragnDrop;
