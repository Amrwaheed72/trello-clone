'use client';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteBoard } from '@/app/services/actions/boardActions';
import { deleteColumn } from '@/app/services/actions/columnActions';
import { deleteTask } from '@/app/services/actions/taskActions';
import { useDeleteDialogStore } from '@/app/store/DeleteDialogStore';
import dynamic from 'next/dynamic';

const Spinner = dynamic(
  () => import('@/components/ui/spinner').then((mod) => mod.Spinner),
  {
    ssr: false,
  },
);
const Dialog = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.Dialog),
  {
    ssr: false,
  },
);

const DialogContent = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.DialogContent),
  {
    ssr: false,
  },
);

const DialogDescription = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.DialogDescription),
  {
    ssr: false,
  },
);

const DialogHeader = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.DialogHeader),
  {
    ssr: false,
  },
);

const DialogTitle = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.DialogTitle),
  {
    ssr: false,
  },
);
const DeleteDialog = ({
  id,
  type,
  boardId,
  board_column_id,
}: {
  id: string;
  type: string;
  boardId?: string;
  board_column_id?: string;
}) => {
  const { openDeleteDialog, setOpenDeleteDialog } = useDeleteDialogStore();
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
        setOpenDeleteDialog(false);
      } catch (err) {
        toast.error(`Could not delete this ${type}`);
      }
    });
  };

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this {type}?</DialogTitle>
          <DialogDescription>
            this action can not be undone, so be ware of what you are doing
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button size={'sm'} onClick={() => setOpenDeleteDialog(false)}>
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

export default DeleteDialog;
