'use client';
import { DashboardStore } from '@/app/store/DashboardStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateBoard } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { BoardColors } from '@/lib/constants';
const EditBoardDialog = ({
  boardTitle,
  boardColor,
  boardId,
}: {
  boardTitle: string;
  boardColor: string;
  boardId: string;
}) => {
  const open = DashboardStore((state) => state.openEditBoard);
  const setOpen = DashboardStore((state) => state.setOpenEditBoard);
  const router = useRouter();

  const formSchema = z.object({
    boardTitle: z
      .string()
      .min(1, { message: 'You must give this board a Title' })
      .max(50, { message: 'Too long Title' }),
    boardColor: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardTitle: boardTitle,
      boardColor: boardColor,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateBoard(
        {
          title: values.boardTitle,
          color: values.boardColor,
        },
        boardId,
      );
      router.refresh();
      toast.success('Board Updated Successfully!');
      form.reset({
        boardTitle: values.boardTitle,
        boardColor: values.boardColor,
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update board!');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mx-auto w-[95vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6 sm:space-y-8"
          >
            <FormField
              control={form.control}
              name="boardTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write a Title for the Board"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="boardColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Color</FormLabel>
                  <FormDescription></FormDescription>
                  <FormControl>
                    <div className="flex w-full flex-wrap gap-4 sm:gap-8">
                      {BoardColors.map((color) => (
                        <button
                          title="nothing"
                          type="button"
                          key={color.id}
                          className={`h-8 w-8 rounded-full ${color.color} ${field.value === color.color ? 'ring-2 ring-black ring-offset-2 dark:ring-white dark:ring-offset-black' : ''} `}
                          onClick={() => field.onChange(color.color)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setOpen(false)}
                variant={'outline'}
                type="button"
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
                type="submit"
                className="cursor-pointer"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner variant="ring" size="sm" />
                    Updating
                  </>
                ) : (
                  'Update'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBoardDialog;
