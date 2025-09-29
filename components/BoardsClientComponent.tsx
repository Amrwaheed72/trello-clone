'use client';

import { useViewModeStore } from '@/app/store/DashboardStore';
import { Board } from '@/lib/supabase/models';
import BoardsInGrid from './BoardsInGrid';
import BoardsInList from './BoardsInList';

interface BoardsClientComponentProps {
  boards: Board[];
}

const BoardsClientComponent = ({ boards }: BoardsClientComponentProps) => {
  const viewMode = useViewModeStore((state) => state.viewMode);
  return (
    <div>
      {viewMode === 'grid' ? (
        <BoardsInGrid boards={boards} />
      ) : (
        <BoardsInList boards={boards} />
      )}
    </div>
  );
};

export default BoardsClientComponent;
