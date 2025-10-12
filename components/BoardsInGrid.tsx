import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { Plus } from 'lucide-react';
import { Board } from '@/services/supabase/models';

interface BoardsClientComponentProps {
  boards: Board[];
}

const BoardsInGrid = ({ boards }: BoardsClientComponentProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {boards.map((board) => (
        <Link key={board.id} href={`/boards/${board.id}`}>
          <Card className="group cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`h-4 w-4 ${board.color} rounded`} />
                <Badge variant={'secondary'} className="text-xs">
                  New
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <CardTitle className="mb-2 text-base transition-colors group-hover:text-blue-600 sm:text-lg dark:group-hover:text-blue-400">
                {board.title}
              </CardTitle>
              <CardDescription className="mb-4 text-sm">
                {board.description}
              </CardDescription>
              <div className="flex flex-col space-y-1 text-xs text-gray-500 sm:items-center sm:justify-between sm:space-y-0 lg:flex-row">
                <span>
                  Created {new Date(board.created_at).toLocaleDateString()}
                </span>
                <span>
                  Updated at {new Date(board.updated_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      <Card className="group cursor-pointer border-2 border-dashed border-gray-300 transition-colors hover:border-blue-400">
        <CardContent className="flex h-full flex-col items-center justify-center p-4 sm:p-6">
          <Plus className="mb-2 h-6 w-6 text-gray-400 transition-all group-hover:scale-125 group-hover:text-blue-400 sm:h-8 sm:w-8" />
          <p className="text-sm font-medium text-gray-600 transition-colors group-hover:text-blue-400 sm:text-base">
            Create New Board
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardsInGrid;
