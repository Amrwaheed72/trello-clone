'use server';
import { revalidatePath } from 'next/cache';
import { Board, BoardColumns, Task } from './supabase/models';
import { supabase } from './supabase/supabase';

export const getUserBoards = async (userId: string): Promise<Board[]> => {
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};
export const getBoard = async (boardId: string): Promise<Board> => {
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('id', boardId)
    .single();
  if (error) throw error;
  return data;
};
export const updateBoard = async (
  boardData: { title: string; color: string },
  boardId: string,
) => {
  const { data, error } = await supabase
    .from('boards')
    .update({
      ...boardData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', boardId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
export const createBoard = async (
  board: Omit<Board, 'id' | 'created_at' | 'updated_at'>,
): Promise<Board> => {
  const { data, error } = await supabase
    .from('boards')
    .insert(board)
    .select()
    .single();
  if (error) throw error;
  return data;
};

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
  column: Omit<BoardColumns, 'id' | 'created_at'>,
): Promise<BoardColumns> => {
  const { data, error } = await supabase
    .from('board_columns')
    .insert(column)
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
  userId: string;
}) => {
  const board = await createBoard({
    title: boardData.title,
    description: boardData.description || null,
    color: boardData.color || 'bg-blue-500',
    user_id: boardData.userId,
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
  return board;
};

export const getTasksForBoard = async (boardId: string): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*, column:board_columns!inner(board_id)')
    .eq('column.board_id', boardId)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data;
};

export const createTask = async (
  taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>,
) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert(taskData)
    .select()
    .single();

  if (error) throw error;
  return data;
};
export const moveTask = async (
  taskId: string,
  targetColumnId: string,
  newPosition: number,
) => {
  const { error: shiftError } = await supabase.rpc('shift_task_positions', {
    column_id_input: targetColumnId,
    from_position: newPosition,
  });

  if (shiftError)
    console.warn('Could not shift task positions:', shiftError.message);

  const { data, error } = await supabase
    .from('tasks')
    .update({
      board_column_id: targetColumnId,
      sort_order: newPosition,
    })
    .eq('id', taskId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBoard = async (boardId: string) => {
  const { error } = await supabase.from('boards').delete().eq('id', boardId);

  if (error) throw error;
  revalidatePath('/dashboard');
  return true;
};
export const deleteColumn = async ({
  ColumnId,
  boardId,
}: {
  ColumnId: string;
  boardId: string;
}) => {
  const { error } = await supabase
    .from('board_columns')
    .delete()
    .eq('id', ColumnId);

  revalidatePath(`/boards`);
  if (error) throw error;
  return true;
};

export const editColumn = async ({
  title,
  ColumnId,
}: {
  title: string;
  ColumnId: string;
}) => {
  const { data, error } = await supabase
    .from('board_columns')
    .update({ title: title })
    .eq('id', ColumnId)
    .select()
    .single();
  revalidatePath(`/boards`);
  if (error) throw error;
  return data;
};
