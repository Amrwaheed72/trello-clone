import { getUserBoards } from '@/app/services/actions/boardActions';
import Empty from '@/components/Empty';
import BoardsClientComponent from './BoardsClientComponent';

const BoardsComponent = async () => {
  const boards = await getUserBoards();
  if (!boards || boards.length === 0) {
    return <Empty message="No Boards Found, try to create some" />;
  }

  return <BoardsClientComponent boards={boards} />;
};

export default BoardsComponent;
