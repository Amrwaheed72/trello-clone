import BoardNavbar from './BoardNavbar';
import BoardContent from './BoardContent';
import NotFound from './not-found';
import { getBoard } from '@/app/services/actions/boardActions';

interface Params {
  params: Promise<{ id: string }>;
}
export const metadata = {
  title: 'Board',
};

const Page = async ({ params }: Params) => {
  const { id } = await params;
  const board = await getBoard(id);
  if (!board) {
    NotFound();
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-black dark:to-purple-950">
      <BoardNavbar
        boardTitle={board.title}
        boardColor={board.color}
        boardId={board.id}
      />
      <BoardContent id={id} />
    </div>
  );
};

export default Page;
