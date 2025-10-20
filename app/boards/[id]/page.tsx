import BoardNavbar from './BoardNavbar';
import BoardContent from './BoardContent';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import NotFound from './not-found';
import { getBoard } from '@/app/services/actions/boardActions';
import dynamic from 'next/dynamic';

const FilterBoardDialog = dynamic(() => import('./FilterBoardDialog'));
const EditBoardDialog = dynamic(() => import('./EditBoardDialog'));

interface Params {
  params: Promise<{ id: string }>;
}
export const generateMetadata = async ({ params }: Params) => {
  const { id } = await params;
  const { title } = await getBoard(id);
  return {
    title: `${title}`,
  };
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
      {/* <EditBoardDialog
        boardColor={board.color}
        boardTitle={board.title}
        boardId={board.id}
      
      /> */}
      <FilterBoardDialog />
      <Suspense
        fallback={
          <div className="flex h-[50vh] items-center justify-center">
            <Spinner variant="ring" size="xl" />
          </div>
        }
      >
        <BoardContent id={id} />
      </Suspense>
    </div>
  );
};

export default Page;
