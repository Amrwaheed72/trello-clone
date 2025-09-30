import { getBoardWithColumns } from '@/lib/services';
import BoardNavbar from './BoardNavbar';
import EditBoardDialog from '@/components/EditBoardDialog';
import FilterBoardDialog from '@/components/FilterBoardDialog';

interface Params {
  params: Promise<{ id: string }>;
}
const Page = async ({ params }: Params) => {
  const { id } = await params;
  const { board, columns } = await getBoardWithColumns(id);
  return (
    <div>
      <BoardNavbar boardTitle={board.title} />
      <EditBoardDialog
        boardColor={board.color}
        boardTitle={board.title}
        boardId={board.id}
      />
      <FilterBoardDialog />
    </div>
  );
};

export default Page;
