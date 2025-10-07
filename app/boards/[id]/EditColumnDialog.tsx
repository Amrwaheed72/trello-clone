'use client';
import { DashboardStore } from '@/app/store/DashboardStore';
import ReusableFormField from '@/components/ReusableFormField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { editColumn } from '@/lib/services';
import { editColumnFormSchema } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const EditColumnDialog = ({ id, title }: { id: string; title: string }) => {
  console.log(title);
  const open = DashboardStore((state) => state.openEditColumn);
  const setOpen = DashboardStore((state) => state.setOpenEditColumn);
  const { user } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof editColumnFormSchema>>({
    resolver: zodResolver(editColumnFormSchema),
    defaultValues: { title: '' },
  });

  useEffect(() => {
    if (open && title) {
      form.reset({ title });
    }
  }, [open, title, form]);
  if (!user) throw new Error('You must login');

  const onSubmit = async (values: z.infer<typeof editColumnFormSchema>) => {
    try {
      await editColumn({
        title: values.title,
        ColumnId: id,
      });
      toast.success('Column Edited successfully!');
      router.refresh();
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error('Could not edit a Column');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Column</DialogTitle>
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
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant={'outline'}
              >
                Cancel
              </Button>
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
};

export default EditColumnDialog;
