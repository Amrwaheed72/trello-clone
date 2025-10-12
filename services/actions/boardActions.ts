'use server';
import { revalidatePath } from 'next/cache';
import { Board } from '../supabase/models';
import { supabase } from '../supabase/supabase';


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
  revalidatePath(`/boards/${boardId}`);

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

export const deleteBoard = async (boardId: string) => {
  const { error } = await supabase.from('boards').delete().eq('id', boardId);

  if (error) throw error;
  return true;
};
