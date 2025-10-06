import { getBoardWithColumns } from '@/lib/services';
import BoardNavbar from './BoardNavbar';
import EditBoardDialog from '@/components/EditBoardDialog';
import FilterBoardDialog from '@/components/FilterBoardDialog';
import BoardContent from './BoardContent';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

interface Params {
  params: Promise<{ id: string }>;
}
const Page = async ({ params }: Params) => {
  const { id } = await params;
  const { board } = await getBoardWithColumns(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-black dark:to-purple-950">
      <BoardNavbar boardTitle={board.title} />
      <EditBoardDialog
        boardColor={board.color}
        boardTitle={board.title}
        boardId={board.id}
      />
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
