'use server';
import { revalidatePath } from 'next/cache';
import { Task } from '../supabase/models';
import { supabase } from '../supabase/supabase';

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
  id: string,
) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert(taskData)
    .select()
    .single();

  if (error) throw error;
  revalidatePath(`/boards/${id}`);
  return data;
};
export const moveTask = async (
  taskId: string,
  targetColumnId: string,
  newPosition: number,
  boardId: string,
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
  revalidatePath(`/boards/${boardId}`);
  return data;
};

export const deleteTask = async (
  taskId: string,
  boardId: string | undefined,
) => {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) throw error;
  revalidatePath(`/boards/${boardId}`);
  return true;
};

export const updateTask = async (
  values: Omit<
    Task,
    'id' | 'board_column_id' | 'sort_order' | 'created_at' | 'updated_at'
  >,
  taskId: string,
  boardId: string,
) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq('id', taskId)
    .select();
  if (error) throw error;
  revalidatePath(`/boards/${boardId}`);

  return data;
};
