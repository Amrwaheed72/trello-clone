'use client';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { createTask } from '@/lib/services';
import { toast } from 'sonner';
import { Spinner } from './ui/spinner';
import { ColumnsWithTasks } from '@/lib/supabase/models';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const priorityOptions = ['low', 'medium', 'high'];
const AddTaskDialog = ({ columns }: { columns: ColumnsWithTasks[] }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: 'a Task must have a Title' })
      .max(50, { message: 'Task Title is Too long' }),
    description: z.string().optional(),
    assignee: z.string().optional(),
    due_date: z
      .date()
      .optional()
      .refine(
        (date) => !date || date >= new Date(new Date().setHours(0, 0, 0, 0)),
        {
          message: 'Due date cannot be in the past',
        },
      ),
    priority: z.enum(['low', 'medium', 'high']).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      assignee: '',
      priority: 'medium',
      due_date: undefined,
    },
  });
  const firstColumn = columns[0];
  if (!firstColumn) {
    toast.error('No columns found in this board');
    return;
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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

      const data = await createTask({
        board_column_id: firstColumn.id,
        title: values.title,
        description: values.description ?? null,
        assignee: values.assignee ?? null,
        due_date: values.due_date
          ? values.due_date.toISOString().split('T')[0]
          : null,
        priority: values.priority ?? 'medium',
        sort_order: nextSortOrder,
      });

      toast.success('Task created successfully!');
      router.refresh();
      form.reset();
      setOpen(false)
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not create the task, please try again later.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="w-full sm:w-auto">
          <Plus />
          Add Task
        </Button>
      </DialogTrigger>
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter task description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 sm:flex-row">
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <FormControl>
                      <Input placeholder="Who should do this?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
            <div className="flex justify-end">
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
};

export default AddTaskDialog;
