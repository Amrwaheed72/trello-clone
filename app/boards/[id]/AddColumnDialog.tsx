'use client';
import { useColumnStore } from '@/app/store/ColumnStore';
import { addColumnFormSchema } from '@/app/utils/schemas';
import ReusableFormField from '@/components/ReusableFormField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { createColumn } from '@/app/services/actions/columnActions';
import { ColumnsWithTasks } from '@/app/services/supabase/models';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const AddColumnDialog = ({
  id,
  columnsWithTasks,
}: {
  id: string;
  columnsWithTasks: ColumnsWithTasks[];
}) => {
  const open = useColumnStore((state) => state.openAddColumn);
  const setOpen = useColumnStore((state) => state.setOpenAddColumn);
  const { user } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof addColumnFormSchema>>({
    resolver: zodResolver(addColumnFormSchema),
    defaultValues: {
      title: '',
    },
  });
  if (!user) router.push('/');
  const nextSortOrder =
    columnsWithTasks.length > 0
      ? Math.max(...columnsWithTasks.map((t) => t.sort_order)) + 1
      : 0;
  const onSubmit = async (values: z.infer<typeof addColumnFormSchema>) => {
    try {
      await createColumn({
        board_id: id,
        title: values.title,
        sort_order: nextSortOrder,
        user_id: user?.id,
      });
      router.refresh();
      toast.success('Column Created successfully!');
      setOpen(false);
    } catch (error) {
      toast.error('Could not create a Column');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Column</DialogTitle>
          <DialogDescription>
            Add new column to organize your tasks
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 sm:space-y-6"
          >
            <ReusableFormField
              control={form.control}
              type="input"
              name="title"
              placeholder="Enter Column title"
              formLabel="Title"
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant={'outline'}
              >
                Cancel
              </Button>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner size="sm" variant="ring" /> Creating
                  </>
                ) : (
                  'Create Column'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddColumnDialog;
