'use server';
import { revalidatePath } from 'next/cache';
import { BoardColumns } from '../supabase/models';
import { supabase } from '../supabase/supabase';
import { createBoard, getBoard } from './boardActions';
import { auth } from '@clerk/nextjs/server';

export const getColumns = async (boardId: string): Promise<BoardColumns[]> => {
  const { data, error } = await supabase
    .from('board_columns')
    .select('*')
    .eq('board_id', boardId)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
};

export const createColumn = async (
  column: Omit<BoardColumns, 'id' | 'created_at' | 'user_id'>,
) => {
  const { userId } = await auth();
  const { data, error } = await supabase
    .from('board_columns')
    .insert({ ...column, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  revalidatePath(`/boards/${column.board_id}`);

  return data;
};

export const getBoardWithColumns = async (boardId: string) => {
  const [board, columns] = await Promise.all([
    getBoard(boardId),
    getColumns(boardId),
  ]);
  if (!board) throw new Error('Board not found');
  return {
    board,
    columns,
  };
};

export const createBoardWithDefaultColumns = async (boardData: {
  title: string;
  description?: string;
  color?: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error('User not authenticated');
  const board = await createBoard({
    title: boardData.title,
    description: boardData.description || null,
    color: boardData.color || 'bg-blue-500',
    user_id: userId,
  });
  const defaultColumns = [
    { title: 'To Do', sort_order: 0 },
    { title: 'In Progress', sort_order: 1 },
    { title: 'Review', sort_order: 2 },
    { title: 'Done', sort_order: 3 },
  ];

  await Promise.all(
    defaultColumns.map((column) =>
      createColumn({
        ...column,
        board_id: board.id,
        user_id: boardData.userId,
      }),
    ),
  );
  // revalidatePath(`/boards/${boardData}`);
  return board;
};

export const deleteColumn = async (
  columnId: string,
  boardId: string | undefined,
) => {
  const { error } = await supabase
    .from('board_columns')
    .delete()
    .eq('id', columnId);

  if (error) throw error;
  revalidatePath(`boards/${boardId}`);
  return true;
};

export const editColumn = async (
  {
    title,
    ColumnId,
  }: {
    title: string;
    ColumnId: string;
  },
  boardId: string,
) => {
  const { data, error } = await supabase
    .from('board_columns')
    .update({ title: title })
    .eq('id', ColumnId)
    .select()
    .single();
  if (error) throw error;
  revalidatePath(`/boards/${boardId}`);

  return data;
};
