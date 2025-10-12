import BoardContentClient from './BoardContentClient';
import AddColumnDialog from './AddColumnDialog';
import { getTasksForBoard } from '@/app/services/actions/taskActions';
import { getColumns } from '@/app/services/actions/columnActions';
const BoardContent = async ({ id }: { id: string }) => {
  const tasks = await getTasksForBoard(id);
  const columns = await getColumns(id);

  const columnsWithTasks = columns.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.board_column_id === column.id),
  }));
  return (
    <>
      <BoardContentClient
        id={id}
        columnsWithTasks={columnsWithTasks}
        tasks={tasks}
      />
      <AddColumnDialog columnsWithTasks={columnsWithTasks} id={id} />
    </>
  );
};

export default BoardContent;
