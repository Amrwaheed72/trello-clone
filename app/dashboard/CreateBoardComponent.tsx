'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { DashboardStore } from '../store/DashboardStore';
import { createBoardWithDefaultColumns } from '@/app/services/actions/columnActions';
import dynamic from 'next/dynamic';

const Spinner = dynamic(() =>
  import('@/components/ui/spinner').then((mod) => mod.Spinner),
);

const CreateBoardComponent = ({
  canCreateBoard,
}: {
  canCreateBoard: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const { setOpenUpgradeDialog } = DashboardStore();
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
