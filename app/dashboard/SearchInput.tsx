'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDashboardStore } from '../store/DashboardStore';

const SearchInput = () => {
  const { query, setQuery } = useDashboardStore();
  return (
    <div className="relative mb-4 sm:mb-6">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <Input
        value={query ?? ''}
        onChange={(e) => setQuery(e.target.value)}
        id="search"
        placeholder="Search Boards..."
        className="pl-10"
      />
    </div>
  );
};

export default SearchInput;
