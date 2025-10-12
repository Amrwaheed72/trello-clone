// store/useViewMode.ts
import { create } from 'zustand';

type ViewMode = 'grid' | 'list';
type Filters = {
  priority: string[];
  assignee: string[];
  dueDate: string | null;
};

type DeleteDialog = 'board' | 'column' | 'task';
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
  openEditColumn: boolean;
  setOpenEditColumn: (state: boolean) => void;
  filteredColumn: [];
  setFilteredColumn: [];
  openUpgradeDialog: boolean;
  setOpenUpgradeDialog: (state: boolean) => void;
  query: string | null;
  setQuery: (query: string | null) => void;

  openEditTask: boolean;
  setOpenEditTask: (state: boolean) => void;

  selectedTask: {
    id: string;
    board_column_id?: string;
    title?: string | null;
    description?: string | null;
    dueDate?: string | null;
    assignee?: string | null;
    priority?: string | null;
  } | null;
  setSelectedTask: (
    task: {
      id: string;
      board_column_id: string;
      title?: string;
      description?: string | null;
      dueDate?: string | null;
      assignee?: string | null;
      priority?: string | null;
    } | null,
  ) => void;

  selectedColumn: {
    id: string;
    board_id: string;
    title?: string;
  } | null;
  setSelectedColumn: (
    column: {
      id: string;
      board_id: string;
      title?: string;
    } | null,
  ) => void;
  selectedDelete: {
    id: string;
    boardId?: string;
    type: DeleteDialog;
    board_column_id?: string;
  } | null;
  setSelectedDelete: (
    deletedThing: {
      id: string;
      boardId?: string;
      type: DeleteDialog;
      board_column_id?: string;
    } | null,
  ) => void;

  openDeleteDialog: boolean;
  setOpenDeleteDialog: (state: boolean) => void;
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
  selectedColumn: null,
  setSelectedColumn: (column) => set({ selectedColumn: column }),
  openEditColumn: false,
  setOpenEditColumn: (state) => set({ openEditColumn: state }),
  filteredColumn: [],
  setFilteredColumn: [],
  openUpgradeDialog: false,
  setOpenUpgradeDialog: (state) => set({ openUpgradeDialog: state }),
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),
  query: '',
  setQuery: (query) => set({ query: query }),
  openEditTask: false,
  setOpenEditTask: (state) => set({ openEditTask: state }),
  openDeleteDialog: false,
  setOpenDeleteDialog: (state) => set({ openDeleteDialog: state }),
  selectedDelete: null,
  setSelectedDelete: (deletedThing) => set({ selectedDelete: deletedThing }),
}));
