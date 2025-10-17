'use client';
import { useColumnStore } from '@/app/store/ColumnStore';
import { addColumnFormSchema } from '@/app/utils/schemas';
import { createColumn } from '@/app/services/actions/columnActions';
import { ColumnsWithTasks } from '@/app/services/supabase/models';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import dynamic from 'next/dynamic';
import { Form } from '@/components/ui/form';
import ReusableFormField from '@/components/ReusableFormField';


const Button = dynamic(
  () => import('@/components/ui/button').then((mod) => mod.Button),
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
const Spinner = dynamic(
  () => import('@/components/ui/spinner').then((mod) => mod.Spinner),
  {
    ssr: false,
  },
);

const AddColumnDialog = ({
  id,
  columnsWithTasks,
}: {
  id: string;
  columnsWithTasks: ColumnsWithTasks[];
}) => {
  const { openAddColumn, setOpenAddColumn } = useColumnStore();
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
      setOpenAddColumn(false);
    } catch (error) {
      toast.error('Could not create a Column');
    }
  };
  return (
    <Dialog open={openAddColumn} onOpenChange={setOpenAddColumn}>
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
                onClick={() => setOpenAddColumn(false)}
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
