'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { createBoardWithDefaultColumns } from '@/app/services/actions/columnActions';
import { Spinner } from '@/components/ui/spinner';
import { useDashboardStore } from '../store/DashboardStore';

const CreateBoardComponent = ({
  canCreateBoard,
}: {
  canCreateBoard: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const { setOpenUpgradeDialog } = useDashboardStore();

  const handleCreateBoard = async () => {
    if (!canCreateBoard) {
      setOpenUpgradeDialog(true);
    } else {
      startTransition(async () => {
        await createBoardWithDefaultColumns({
          title: 'New Board',
        });
        toast.success('board created successfully');
      });
    }
  };
  return (
    <Button
      onClick={handleCreateBoard}
      variant={'outline'}
      className="w-full sm:w-48"
    >
      {isPending ? (
        <>
          <Spinner size="sm" variant="ring" />
          Creating Board
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          Create Board
        </>
      )}
    </Button>
  );
};

export default CreateBoardComponent;
