'use client';
import { Grid3x3, List } from 'lucide-react';
import { Button } from './ui/button';
import { useViewModeStore } from '@/app/store/DashboardStore';

const ChangeViewButtons = () => {
  const viewMode = useViewModeStore((state) => state.viewMode);
  const setViewMode = useViewModeStore((state) => state.setViewMode);
  return (
    <div className="flex items-center space-x-2 border p-1">
      <Button
        size={'sm'}
        onClick={() => setViewMode('grid')}
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
      >
        <Grid3x3 />
      </Button>
      <Button
        size={'sm'}
        onClick={() => setViewMode('list')}
        variant={viewMode === 'list' ? 'default' : 'ghost'}
      >
        <List />
      </Button>
    </div>
  );
};

export default ChangeViewButtons;
