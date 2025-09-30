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
}));
