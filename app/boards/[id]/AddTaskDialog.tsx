'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ColumnsWithTasks } from '@/app/services/supabase/models';
import { useRouter } from 'next/navigation';
import { createTask } from '@/app/services/actions/taskActions';
import { addTaskFormSchema } from '@/app/utils/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

const priorityOptions = ['low', 'medium', 'high'];

const AddTaskDialog = memo(function AddTaskDialog({
  columns,
  id,
  children,
}: {
  columns: ColumnsWithTasks[];
  id: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof addTaskFormSchema>>({
    resolver: zodResolver(addTaskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      assignee: '',
      priority: 'medium',
      due_date: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof addTaskFormSchema>) => {
    const firstColumn = columns[0];
    if (!firstColumn) {
      toast.error('No columns found to add a task.');
      return;
    }

    const currentTasks = firstColumn.tasks ?? [];
    const nextSortOrder =
      currentTasks.length > 0
        ? Math.max(...currentTasks.map((t) => t.sort_order)) + 1
        : 0;
    try {
      await createTask(
        {
          board_column_id: firstColumn.id,
          title: values.title,
          description: values.description ?? null,
          assignee: values.assignee ?? null,
          due_date: values.due_date
            ? values.due_date.toISOString().split('T')[0]
            : null,
          priority: values.priority ?? 'medium',
          sort_order: nextSortOrder,
        },
        id,
      );
      setOpen(false);
      router.refresh();
      toast.success('Task created successfully!');
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error('Could not create the task, please try again later.');
    }
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a task To the board</DialogDescription>
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
              placeholder="Enter task title"
              formLabel="Title"
            />
            <ReusableFormField
              control={form.control}
              type="textarea"
              name="description"
              placeholder="Enter task description"
              formLabel="Description"
            />

            <div className="flex flex-col gap-2 sm:flex-row">
              <ReusableFormField
                name="assignee"
                control={form.control}
                formLabel="Assignee"
                placeholder="Who should do this?"
                type="input"
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? 'medium'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityOptions.map((option) => (
                            <SelectItem
                              defaultValue={'medium'}
                              key={option}
                              value={option}
                            >
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val ? new Date(val) : undefined);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button onClick={handleReset} variant={'outline'}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner size="sm" variant="ring" /> Creating
                  </>
                ) : (
                  'Create Task'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default AddTaskDialog;
