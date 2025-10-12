import { create } from 'zustand';

interface TaskState {
  openAddTask: boolean;
  setOpenAddTask: (state: boolean) => void;
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
}

export const useTaskStore = create<TaskState>((set) => ({
  openAddTask: false,
  setOpenAddTask: (state) => set({ openAddTask: state }),
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),
  openEditTask: false,
  setOpenEditTask: (state) => set({ openEditTask: state }),
}));
