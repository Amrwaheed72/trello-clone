'use client';
import { createBoardWithDefaultColumns, getUserBoards } from '@/lib/services';
import { Board } from '@/lib/supabase/models';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export const useBoards = () => {
  const { user } = useUser();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (user) {
      loadBoards();
    }
  }, [user]);
  const loadBoards = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getUserBoards(user.id);
      setBoards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load board');
    } finally {
      setLoading(false);
    }
  };
  // if (!user) throw new Error('user is not logged in');
  const createBoard = async (boardData: {
    title: string;
    description?: string;
    color?: string;
  }) => {
    try {
      const newBoard = await createBoardWithDefaultColumns({
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
