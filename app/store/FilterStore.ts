import { create } from 'zustand';

type Filters = {
  priority: string[];
  assignee: string[];
  dueDate: string | null;
};
interface FilterState {
  filterCount: number;
  // setFilterCount: () => void;

  filters: Filters;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
  filteredColumn: [];
  setFilteredColumn: [];
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: {
    priority: [],
    assignee: [],
    dueDate: null,
  },
  setFilters: (filters) => set({ filters }),
  clearFilters: () =>
    set({
      filters: { priority: [], assignee: [], dueDate: null },
    }),
  filterCount: 3,
  // setFilterCount,
  filteredColumn: [],
  setFilteredColumn: [],
}));
