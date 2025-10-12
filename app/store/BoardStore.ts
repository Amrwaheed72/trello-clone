import { create } from 'zustand';

interface BoardState {
  openEditBoard: boolean;
  setOpenEditBoard: (state: boolean) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  openEditBoard: false,
  setOpenEditBoard: (state) => set({ openEditBoard: state }),
}));
