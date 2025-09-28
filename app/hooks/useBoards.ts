'use client';
import { createBoardWithDefaultColumns } from '@/lib/services';
import { Board } from '@/lib/supabase/models';
import { useSupabase } from '@/lib/supabase/supabaseProvider';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export const useBoards = () => {
  const { user } = useUser();
console.log(user)
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();
  const [error, setError] = useState<string | null>(null);
  // if (!user) throw new Error('user is not logged in');
  const createBoard = async (boardData: {
    title: string;
    description?: string;
    color?: string;
  }) => {
    try {
      const newBoard = await createBoardWithDefaultColumns(supabase!, {
        ...boardData,
        userId: user.id,
      });
      setBoards((prev) => [newBoard, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create board');
    }
  };
  return { boards, loading, error, createBoard };
};
