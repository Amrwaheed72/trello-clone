'use client';
import { addColumnFormSchema } from '@/app/utils/schemas';
import { createColumn } from '@/app/services/actions/columnActions';
import { ColumnsWithTasks } from '@/app/services/supabase/models';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Form } from '@/components/ui/form';
import ReusableFormField from '@/components/ReusableFormField';
import { memo, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

const AddColumnDialog = memo(function AddColumnDialog({
  id,
  columnsWithTasks,
  children,
}: {
  id: string;
  columnsWithTasks: ColumnsWithTasks[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
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
      setOpen(false);
      router.refresh();
      toast.success('Column Created successfully!');
    } catch (error) {
      toast.error('Could not create a Column');
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) form.reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
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
              <DialogClose asChild>
                <Button type="button" variant={'outline'}>
                  Cancel
                </Button>
              </DialogClose>
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
});

export default AddColumnDialog;
