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
import { Spinner } from '@/components/ui/spinner';
import { useTransition } from 'react';
import { deleteTask } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DeleteTaskDialog = ({ taskId }: { taskId: string }) => {
  const open = DashboardStore((state) => state.openDeleteTask);
  const setOpen = DashboardStore((state) => state.setOpenDeleteTask);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTask(taskId);
        router.refresh();
        toast.success('Task Deleted Successfully');
        setOpen(false);
      } catch (error) {
        toast.error('Could not delete this Task');
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this Task?</DialogTitle>
          <DialogDescription>
            this action can not be undone, so be ware of what you are doing
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button size={'sm'} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant={'destructive'} size={'sm'} onClick={handleDelete}>
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

export default DeleteTaskDialog;
