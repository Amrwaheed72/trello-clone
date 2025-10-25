import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserBoards } from '@/app/services/actions/boardActions';
import Empty from '@/components/Empty';
import BoardsClientComponent from './BoardsClientComponent';

const BoardsComponent = async () => {
  const user = await currentUser();
  if (!user) redirect('/');
  const boards = await getUserBoards(user.id);
  if (!boards || boards.length === 0) {
    return <Empty message="No Boards Found, try to create some" />;
  }

  return <BoardsClientComponent boards={boards} />;
};

export default BoardsComponent;
