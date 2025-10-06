import AddTaskDialog from '@/components/AddTaskDialog';
import Column from '@/components/Column';
import TaskComponent from '@/components/TaskComponent';
import { getBoardWithColumns, getTasksForBoard } from '@/lib/services';

const BoardContent = async ({ id }: { id: string }) => {
  const tasks = await getTasksForBoard(id);
  const { columns } = await getBoardWithColumns(id);

  const columnsWithTasks = columns.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.board_column_id === column.id),
  }));
  return (
    <main className="container mx-auto px-2 py-4 sm:px-4 sm:py-6">
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Tasks: {tasks.length}</span>
          </div>
        </div>
        <AddTaskDialog columns={columnsWithTasks} />
      </div>
      <div className="flex flex-col space-y-4 lg:-mx-2 lg:flex-row lg:space-y-0 lg:space-x-6 lg:overflow-x-auto lg:px-2 lg:pb-6 lg:[&::-webkit-scrollbar]:h-2 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:bg-gray-300 lg:[&::-webkit-scrollbar-track]:bg-gray-100">
        {columnsWithTasks.map((column, i) => (
          <Column column={column} key={i}>
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <TaskComponent task={task} key={task.id} />
              ))}
            </div>
          </Column>
        ))}
      </div>
    </main>
  );
};

export default BoardContent;
