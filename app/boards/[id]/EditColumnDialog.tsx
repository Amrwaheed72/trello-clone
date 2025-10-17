'use client';
import { useColumnStore } from '@/app/store/ColumnStore';
import { editColumnFormSchema } from '@/app/utils/schemas';
import ReusableFormField from '@/components/ReusableFormField';
import { Button } from '@/components/ui/button';

import { Form } from '@/components/ui/form';
import { editColumn } from '@/app/services/actions/columnActions';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import dynamic from 'next/dynamic';

const Dialog = dynamic(() =>
  import('@/components/ui/dialog').then((mod) => mod.Dialog),
);
const DialogContent = dynamic(() =>
  import('@/components/ui/dialog').then((mod) => mod.DialogContent),
);
const DialogHeader = dynamic(() =>
  import('@/components/ui/dialog').then((mod) => mod.DialogHeader),
);
const DialogTitle = dynamic(() =>
  import('@/components/ui/dialog').then((mod) => mod.DialogTitle),
);
const Spinner = dynamic(
  () => import('@/components/ui/spinner').then((mod) => mod.Spinner),
  { ssr: false },
);

const EditColumnDialog = ({
  id,
  title,
  boardId,
}: {
  id: string;
  title: string;
  boardId: string;
}) => {
  const { openEditColumn, setOpenEditColumn } = useColumnStore();
  const { user } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof editColumnFormSchema>>({
    resolver: zodResolver(editColumnFormSchema),
    defaultValues: { title: '' },
  });

  useEffect(() => {
    if (openEditColumn && title) {
      form.reset({ title });
    }
  }, [openEditColumn, title, form]);
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
      toast.success('Column Edited successfully!');
      form.reset({ title: values.title });
      setOpenEditColumn(false);
    } catch (error) {
      toast.error('Could not edit a Column');
    }
  };
  return (
    <Dialog open={openEditColumn} onOpenChange={setOpenEditColumn}>
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
                onClick={() => setOpenEditColumn(false)}
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
