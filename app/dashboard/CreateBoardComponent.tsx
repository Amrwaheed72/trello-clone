'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useTransition } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { DashboardStore } from '../store/DashboardStore';
import { createBoardWithDefaultColumns } from '@/services/actions/columnActions';

const CreateBoardComponent = ({
  canCreateBoard,
}: {
  canCreateBoard: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const setOpenUpgradeDialog = DashboardStore(
    (state) => state.setOpenUpgradeDialog,
  );
  const router = useRouter();
  const { user } = useUser();
  if (!user) router.push('/');
  const handleCreateBoard = async () => {
    if (!canCreateBoard) {
      setOpenUpgradeDialog(true);
    } else {
      startTransition(async () => {
        await createBoardWithDefaultColumns({
          title: 'New Board',
          userId: user.id,
        });
        router.refresh();
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
