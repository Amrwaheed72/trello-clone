'use client';
import { Button } from '@/components/ui/button';
import { DashboardStore } from '@/app/store/DashboardStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTransition } from 'react';
import { deleteBoard } from '@/lib/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
const DeleteBoardDialog = ({ boardId }: { boardId: string }) => {
  const open = DashboardStore((state) => state.openDeleteBoard);
  const setOpen = DashboardStore((state) => state.setOpenDeleteBoard);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDeleteBoard = () => {
    startTransition(async () => {
      try {
        await deleteBoard(boardId);
        router.push('/dashboard');
        toast.success('Board Deleted Successfully!');
        setOpen(false);
      } catch (err) {
        toast.error('Could not delete this board');
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this board?</DialogTitle>
          <DialogDescription>
            this action can not be undone, so be ware of what you are doing
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button size={'sm'} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant={'destructive'}
            size={'sm'}
            onClick={handleDeleteBoard}
          >
            {isPending ? (
              <>
                <Spinner size="sm" variant="ring" />
                Deleting
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBoardDialog;
