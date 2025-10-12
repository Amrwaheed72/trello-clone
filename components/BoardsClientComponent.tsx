'use client';

import { DashboardStore } from '@/app/store/DashboardStore';
import { Board } from '@/app/services/supabase/models';
import BoardsInGrid from './BoardsInGrid';
import BoardsInList from './BoardsInList';
import { useMemo } from 'react';

interface BoardsClientComponentProps {
  boards: Board[];
}

const BoardsClientComponent = ({ boards }: BoardsClientComponentProps) => {
  const viewMode = DashboardStore((state) => state.viewMode);
  const query = DashboardStore((state) => state.query);
  const searchedBoards = useMemo(() => {
    if (!query) return boards;
    return boards.filter((board) =>
      board.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, boards]);

  return (
    <div>
      {viewMode === 'grid' ? (
        <BoardsInGrid boards={searchedBoards} />
      ) : (
        <BoardsInList boards={searchedBoards} />
      )}
    </div>
  );
};

export default BoardsClientComponent;
