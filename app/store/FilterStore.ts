import { create } from 'zustand';

type Filters = {
  priority: string[];
  assignee: string[];
  dueDate: string | null;
};
interface FilterState {
  openFilter: boolean;
  setOpenFilter: (state: boolean) => void;
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
  openFilter: false,
  setOpenFilter: (state) => set({ openFilter: state }),
  filterCount: 3,
  // setFilterCount,
  filteredColumn: [],
  setFilteredColumn: [],
}));
