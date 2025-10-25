import { getTasksForBoard } from '@/app/services/actions/taskActions';
import { getColumns } from '@/app/services/actions/columnActions';
import BoardContentClient from './BoardContentClient';
import { useMemo } from 'react';

const BoardContent = async ({ id }: { id: string }) => {
  const tasks = await getTasksForBoard(id);
  const columns = await getColumns(id);

  const columnsWithTasks = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      tasks: tasks.filter((task) => task.board_column_id === column.id),
    }));
  }, [tasks, columns]);
  return (
    <BoardContentClient
      id={id}
      columnsWithTasks={columnsWithTasks}
      tasks={tasks}
    />
  );
};

export default BoardContent;
