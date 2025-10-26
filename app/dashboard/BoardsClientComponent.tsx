'use client';

import { Board } from '@/app/services/supabase/models';
import { useMemo } from 'react';
import BoardsInGrid from './BoardsInGrid';
import BoardsInList from './BoardsInList';
import { useDashboardStore } from '../store/DashboardStore';

interface BoardsClientComponentProps {
  boards: Board[];
}

const BoardsClientComponent = ({ boards }: BoardsClientComponentProps) => {
  const { viewMode, query } = useDashboardStore();
  const searchedBoards = useMemo(() => {
    if (!query) return boards;
    return boards.filter((board) =>
      board.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, boards]);

  return (
    <div>
      {viewMode === 'grid' ? (
        <BoardsInGrid boards={searchedBoards} viewMode={viewMode} />
      ) : (
        <BoardsInList boards={searchedBoards} viewMode={viewMode} />
      )}
    </div>
  );
};

export default BoardsClientComponent;
