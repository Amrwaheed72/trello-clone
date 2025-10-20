'use client';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteBoard } from '@/app/services/actions/boardActions';
import { deleteColumn } from '@/app/services/actions/columnActions';
import { deleteTask } from '@/app/services/actions/taskActions';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
const DeleteDialog = ({
  id,
  type,
  boardId,
  board_column_id,
  children,
}: {
  id: string;
  type: string;
  boardId?: string;
  board_column_id?: string;
  children?: React.ReactNode;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        if (type === 'board') {
          await deleteBoard(id);
          router.push('/dashboard');
        } else if (type === 'column') {
          await deleteColumn(id, boardId);
          router.refresh();
        } else if (type === 'task') {
          await deleteTask(id);
          router.refresh();
        }

        toast.success(`${type} deleted successfully!`);
      } catch (err) {
        toast.error(`Could not delete this ${type}`);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this {type}?</DialogTitle>
          <DialogDescription>
            this action can not be undone, so be ware of what you are doing
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button size={'sm'}>Cancel</Button>
          </DialogClose>
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

export default DeleteDialog;
