'use client';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Task } from '@/app/services/supabase/models';
import { useRouter } from 'next/navigation';
import ReusableFormField from '@/components/ReusableFormField';
import { memo, useEffect } from 'react';
import { updateTask } from '@/app/services/actions/taskActions';
import { addTaskFormSchema } from '@/app/utils/schemas';
import { useTaskStore } from '@/app/store/TaskStore';
import dynamic from 'next/dynamic';
const priorityOptions = ['low', 'medium', 'high'];
const Select = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.Select),
  {
    ssr: false,
  },
);
const SelectContent = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.SelectContent),
  {
    ssr: false,
  },
);
const SelectItem = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.SelectItem),
  {
    ssr: false,
  },
);
const SelectTrigger = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.SelectTrigger),
  {
    ssr: false,
  },
);
const SelectValue = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.SelectValue),
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
const DialogTrigger = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.DialogTrigger),
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
  { ssr: false },
);
const EditTaskDialog = memo(function EditTaskDialog({
  selectedTask,
}: {
  selectedTask: Task;
}) {
  const { openEditTask, setOpenEditTask } = useTaskStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof addTaskFormSchema>>({
    resolver: zodResolver(addTaskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      assignee: '',
      priority: 'low',
      due_date: undefined,
    },
  });
  useEffect(() => {
    if (selectedTask) {
      form.reset({
        title: selectedTask.title ?? '',
        description: selectedTask.description ?? '',
        assignee: selectedTask.assignee ?? '',
        priority: selectedTask.priority ?? 'low',
        due_date: selectedTask.due_date
          ? new Date(selectedTask.due_date)
          : undefined,
      });
    }
  }, [selectedTask, form]);

  const onSubmit = async (values: z.infer<typeof addTaskFormSchema>) => {
    try {
      await updateTask(values, selectedTask.id);
      router.refresh();
      toast.success('Task updated successfully!');
      form.reset();
      setOpenEditTask(false);
    } catch (error) {
      console.error(error);
      toast.error('Could not create the task, please try again later.');
    }
  };

  return (
    <Dialog open={openEditTask} onOpenChange={setOpenEditTask}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
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
              <Button variant={'outline'} size={'sm'}>
                Cancel
              </Button>
              <Button
                size={'sm'}
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
                type="submit"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner size="sm" variant="ring" /> Updating
                  </>
                ) : (
                  'Update Task'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default EditTaskDialog;
