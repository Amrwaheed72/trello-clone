import { create } from 'zustand';

interface ColumnState {
  openAddColumn: boolean;
  setOpenAddColumn: (state: boolean) => void;
  openEditColumn: boolean;
  setOpenEditColumn: (state: boolean) => void;
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
}

export const useColumnStore = create<ColumnState>((set) => ({
  openAddColumn: false,
  setOpenAddColumn: (state) => set({ openAddColumn: state }),
  selectedColumn: null,
  setSelectedColumn: (column) => set({ selectedColumn: column }),
  openEditColumn: false,
  setOpenEditColumn: (state) => set({ openEditColumn: state }),
}));
