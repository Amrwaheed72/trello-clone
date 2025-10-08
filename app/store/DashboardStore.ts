// store/useViewMode.ts
import { create } from 'zustand';

type ViewMode = 'grid' | 'list';
type Filters = {
  priority: string[];
  assignee: string[];
  dueDate: string | null;
};

interface ViewModeState {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  openEditBoard: boolean;
  setOpenEditBoard: (state: boolean) => void;
  openFilter: boolean;
  setOpenFilter: (state: boolean) => void;
  filterCount: number;
  // setFilterCount: () => void;
  openAddTask: boolean;
  setOpenAddTask: (state: boolean) => void;
  openAddColumn: boolean;
  setOpenAddColumn: (state: boolean) => void;
  openDeleteBoard: boolean;
  setOpenDeleteBoard: (state: boolean) => void;
  openDeleteColumn: boolean;
  setOpenDeleteColumn: (state: boolean) => void;
  openEditColumn: boolean;
  setOpenEditColumn: (state: boolean) => void;
  filteredColumn: [];
  setFilteredColumn: [];

  selectedColumn: { id: string; board_id: string; title?: string } | null;
  setSelectedColumn: (
    column: { id: string; board_id: string; title?: string } | null,
  ) => void;
}

export const DashboardStore = create<ViewModeState>((set) => ({
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
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
  openEditBoard: false,
  setOpenEditBoard: (state) => set({ openEditBoard: state }),
  openFilter: false,
  setOpenFilter: (state) => set({ openFilter: state }),
  filterCount: 3,
  // setFilterCount,
  openAddTask: false,
  setOpenAddTask: (state) => set({ openAddTask: state }),
  openAddColumn: false,
  setOpenAddColumn: (state) => set({ openAddColumn: state }),
  openDeleteBoard: false,
  setOpenDeleteBoard: (state) => set({ openDeleteBoard: state }),
  openDeleteColumn: false,
  setOpenDeleteColumn: (state) => set({ openDeleteColumn: state }),
  selectedColumn: null,
  setSelectedColumn: (column) => set({ selectedColumn: column }),
  openEditColumn: false,
  setOpenEditColumn: (state) => set({ openEditColumn: state }),
  filteredColumn: [],
  setFilteredColumn: [],
}));
