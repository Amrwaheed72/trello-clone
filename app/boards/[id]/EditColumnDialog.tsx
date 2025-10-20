'use client';
import { editColumnFormSchema } from '@/app/utils/schemas';
import ReusableFormField from '@/components/ReusableFormField';
import { Button } from '@/components/ui/button';

import { Form } from '@/components/ui/form';
import { editColumn } from '@/app/services/actions/columnActions';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
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

const EditColumnDialog = memo(function EditColumnDialog({
  id,
  title,
  boardId,
  children,
}: {
  id: string;
  title: string;
  boardId: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof editColumnFormSchema>>({
    resolver: zodResolver(editColumnFormSchema),
    defaultValues: { title: '' },
  });

  useEffect(() => {
    if (title) {
      form.reset({ title });
    }
  }, [title, form]);
  if (!user) router.push('/');

  const onSubmit = async (values: z.infer<typeof editColumnFormSchema>) => {
    try {
      await editColumn(
        {
          title: values.title,
          ColumnId: id,
        },
        boardId,
      );
      router.refresh();
      setOpen(false);
      toast.success('Column Edited successfully!');
      form.reset({ title: values.title });
    } catch (error) {
      toast.error('Could not edit a Column');
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) form.reset({ title });
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Column</DialogTitle>
          <DialogDescription>
            You can edit the title of this column
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
              formLabel="Column Title"
            />
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant={'outline'}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
                type="submit"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner size="sm" variant="ring" /> Editing
                  </>
                ) : (
                  'Edit Column'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default EditColumnDialog;
