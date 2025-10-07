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
import { deleteColumn } from '@/lib/services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
const DeleteColumnDialog = ({
  columnId,
  boardId,
}: {
  columnId: string;
  boardId: string;
}) => {
  const open = DashboardStore((state) => state.openDeleteColumn);
  const setOpen = DashboardStore((state) => state.setOpenDeleteColumn);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDeleteBoard = () => {
    startTransition(async () => {
      try {
        await deleteColumn({ ColumnId: columnId, boardId });
        toast.success('Column Deleted Successfully!');
        setOpen(false);
        router.refresh();
      } catch (err) {
        toast.error('Could not delete this Column');
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this Column?</DialogTitle>
          <DialogDescription>
            this action can not be undone, so be ware of what you are doing
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button size={'sm'} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeleteBoard} variant={'destructive'} size={'sm'}>
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

export default DeleteColumnDialog;
