import { getTasksForBoard } from '@/app/services/actions/taskActions';
import { getColumns } from '@/app/services/actions/columnActions';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const BoardContentClient = dynamic(() => import('./BoardContentClient'));
const Spinner = dynamic(() =>
  import('@/components/ui/spinner').then((mod) => mod.Spinner),
);
const BoardContent = async ({ id }: { id: string }) => {
  const tasks = await getTasksForBoard(id);
  const columns = await getColumns(id);

  const columnsWithTasks = columns.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.board_column_id === column.id),
  }));
  return (
    <Suspense
      fallback={
        <>
          <div className="flex items-center justify-center">
            <Spinner variant="ring" size="xl" />
          </div>
        </>
      }
    >
      <BoardContentClient
        id={id}
        columnsWithTasks={columnsWithTasks}
        tasks={tasks}
      />
    </Suspense>
  );
};

export default BoardContent;
