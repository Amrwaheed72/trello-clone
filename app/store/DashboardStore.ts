import { create } from 'zustand';

type ViewMode = 'grid' | 'list';

interface ViewModeState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  openUpgradeDialog: boolean;
  setOpenUpgradeDialog: (state: boolean) => void;
  query: string | null;
  setQuery: (query: string | null) => void;
}

export const useDashboardStore = create<ViewModeState>((set) => ({
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),

  openUpgradeDialog: false,
  setOpenUpgradeDialog: (state) => set({ openUpgradeDialog: state }),
  query: '',
  setQuery: (query) => set({ query: query }),
}));
