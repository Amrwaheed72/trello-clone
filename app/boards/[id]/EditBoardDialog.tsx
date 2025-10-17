'use client';

import dynamic from 'next/dynamic';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { BoardColors } from '@/app/utils/constants';
import { updateBoard } from '@/app/services/actions/boardActions';
import { useBoardStore } from '@/app/store/BoardStore';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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

const Input = dynamic(
  () => import('@/components/ui/input').then((mod) => mod.Input),
  { ssr: false },
);

const Spinner = dynamic(
  () => import('@/components/ui/spinner').then((mod) => mod.Spinner),
  { ssr: false },
);
const EditBoardDialog = ({
  boardTitle,
  boardColor,
  boardId,
}: {
  boardTitle: string;
  boardColor: string;
  boardId: string;
}) => {
  const { openEditBoard, setOpenEditBoard } = useBoardStore();
  const router = useRouter();

  const formSchema = z.object({
    boardTitle: z
      .string()
      .min(1, { message: 'You must give this board a Title' })
      .max(15, { message: 'Too long Title' }),
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
      setOpenEditBoard(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update board!');
    }
  };
  return (
    <Dialog open={openEditBoard} onOpenChange={setOpenEditBoard}>
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
                  {/* <FormDescription></FormDescription> */}
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
                onClick={() => setOpenEditBoard(false)}
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
