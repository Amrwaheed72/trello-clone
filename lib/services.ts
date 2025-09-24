import { createClient } from './supabase/client';
import { Board } from './supabase/models';

const supabase = createClient();

export const getUserBoards = async (userId: string): Promise<Board[]> => {
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
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
