// store/useViewMode.ts
import { create } from 'zustand';

type ViewMode = 'grid' | 'list';

interface ViewModeState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  open: boolean;
  setOpen: (state: boolean) => void;
  toggleOpen: () => void;
  openFilter: boolean;
  setOpenFilter: (state: boolean) => void;
  toggleOpenFilter: () => void;
  filterCount: number;
  openAddColumn: boolean;
  setOpenAddColumn: (state: boolean) => void;
  openDeleteBoard: boolean;
  setOpenDeleteBoard: (state: boolean) => void;
  openDeleteColumn: boolean;
  setOpenDeleteColumn: (state: boolean) => void;

  selectedColumn: { id: string; board_id: string } | null;
  setSelectedColumn: (column: { id: string; board_id: string } | null) => void;
}

export const DashboardStore = create<ViewModeState>((set) => ({
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
  open: false,
  setOpen: (state) => set({ open: state }),
  toggleOpen: () => set((prev) => ({ open: !prev.open })),
  openFilter: false,
  setOpenFilter: (state) => set({ openFilter: state }),
  toggleOpenFilter: () => set((prev) => ({ openFilter: !prev.openFilter })),
  filterCount: 3,
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
}));
