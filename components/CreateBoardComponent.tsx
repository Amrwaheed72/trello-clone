'use client';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useBoards } from '@/app/hooks/useBoards';

const CreateBoardComponent = () => {
  const { createBoard } = useBoards();
  const handleCreateBoard = async () => {
    await createBoard({ title: 'New Board' });
  };
  return (
    <Button onClick={handleCreateBoard} className="w-full sm:w-auto">
      <Plus className="mr-2 h-4 w-4" />
      Create Board
    </Button>
  );
};

export default CreateBoardComponent;
