import { create } from 'zustand';

type DeleteDialog = 'board' | 'column' | 'task';

interface DeleteDialogState {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (state: boolean) => void;
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
}

export const useDeleteDialogStore = create<DeleteDialogState>((set) => ({
  openDeleteDialog: false,
  setOpenDeleteDialog: (state) => set({ openDeleteDialog: state }),
  selectedDelete: null,
  setSelectedDelete: (deletedThing) => set({ selectedDelete: deletedThing }),
}));
