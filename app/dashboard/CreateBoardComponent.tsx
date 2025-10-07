'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createBoardWithDefaultColumns } from '@/lib/services';
import { redirect, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useTransition } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

const CreateBoardComponent = () => {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();
  if (!user) redirect('/');
  const router = useRouter();
  const handleCreateBoard = async () => {
    startTransition(async () => {
      await createBoardWithDefaultColumns({
        title: 'New Board',
        userId: user.id,
      });
      router.refresh();
      toast.success('board created successfully');
    });
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
