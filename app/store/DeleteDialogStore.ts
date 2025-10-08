import { create } from 'zustand';

type DeleteType = 'board' | 'column' | 'task' | null;

interface DeleteDialogState {
  open: boolean;
  type: DeleteType;
  id: string | null;
  name: string | null;
  setOpen: (open: boolean) => void;
  openDialog: (type: DeleteType, id: string, name?: string) => void;
  closeDialog: () => void;
}
export const useDeleteDialogStore = create<DeleteDialogState>((set) => ({
  open: false,
  type: null,
  id: null,
  name: null,
  setOpen: (open) => set({ open }),
  openDialog: (type, id, name) => set({ open: true, type, id, name }),
  closeDialog: () => set({ open: false, type: null, id: null, name: null }),
}));
