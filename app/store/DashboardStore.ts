// store/useViewMode.ts
import { create } from 'zustand';

type ViewMode = 'grid' | 'list';

interface ViewModeState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  openEditBoard: boolean;
  setOpenEditBoard: (state: boolean) => void;
  toggleOpenEditBoard: () => void;
  openFilter: boolean;
  setOpenFilter: (state: boolean) => void;
  toggleOpenFilter: () => void;
  filterCount: number;
  openAddTask: boolean;
  setOpenAddTask: (state: boolean) => void;
  toggleOpenAddTask: () => void;
  openAddColumn: boolean;
  setOpenAddColumn: (state: boolean) => void;
  openDeleteBoard: boolean;
  setOpenDeleteBoard: (state: boolean) => void;
  openDeleteColumn: boolean;
  setOpenDeleteColumn: (state: boolean) => void;
  openEditColumn: boolean;
  setOpenEditColumn: (state: boolean) => void;

  selectedColumn: { id: string; board_id: string; title?: string } | null;
  setSelectedColumn: (
    column: { id: string; board_id: string; title?: string } | null,
  ) => void;
}

export const DashboardStore = create<ViewModeState>((set) => ({
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
  openEditBoard: false,
  setOpenEditBoard: (state) => set({ openEditBoard: state }),
  toggleOpenEditBoard: () => set((prev) => ({ openEditBoard: !prev.openEditBoard })),
  openFilter: false,
  setOpenFilter: (state) => set({ openFilter: state }),
  toggleOpenFilter: () => set((prev) => ({ openFilter: !prev.openFilter })),
  filterCount: 3,
  openAddTask:false,
  setOpenAddTask:(state) => set({ openAddTask: state }),
  toggleOpenAddTask:() => set((prev) => ({ openAddTask: !prev.openAddTask })),
  openAddColumn: false,
  setOpenAddColumn: (state) => set({ openAddColumn: state }),
  toggleOpenAddColumn: () =>
    set((prev) => ({ openAddColumn: !prev.openAddColumn })),
  openDeleteBoard: false,
  setOpenDeleteBoard: (state) => set({ openDeleteBoard: state }),
  toggleOpenDeleteBoard: () =>
    set((prev) => ({ openDeleteBoard: !prev.openDeleteBoard })),
  openDeleteColumn: false,
  setOpenDeleteColumn: (state) => set({ openDeleteColumn: state }),
  toggleOpenDeleteColumn: () =>
    set((prev) => ({ openDeleteColumn: !prev.openDeleteColumn })),
  selectedColumn: null,
  setSelectedColumn: (column) => set({ selectedColumn: column }),
  openEditColumn: false,
  setOpenEditColumn: (state) => set({ openEditColumn: state }),
}));
