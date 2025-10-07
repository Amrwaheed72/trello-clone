import { getBoardWithColumns, getTasksForBoard } from '@/lib/services';
import BoardContentClient from './BoardContentClient';
const BoardContent = async ({ id }: { id: string }) => {
  
  const tasks = await getTasksForBoard(id);
  const { columns } = await getBoardWithColumns(id);

  const columnsWithTasks = columns.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.board_column_id === column.id),
  }));
  return <BoardContentClient columnsWithTasks={columnsWithTasks} tasks={tasks} />;
};

export default BoardContent;
