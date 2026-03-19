import { create } from "zustand";
import { Filters, Task } from "../types";
import { taskService } from "../services/taskService";

type TaskState = {
  tasks: Task[];
  filters: Filters;
  init: () => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filters: {},
  init: () => {
    const tasks = taskService.getTasks();
    set({ tasks });
  },
  addTask: (task) => {
    const updatedTasks = [...get().tasks, task];
    set({ tasks: updatedTasks });
    taskService.saveTasks(updatedTasks);
  },
  updateTask: (task) => {
    const updatedTasks = get().tasks.map((t) => (t.id === task.id ? task : t));
    set({ tasks: updatedTasks });
    taskService.saveTasks(updatedTasks);
  },
  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter((t) => t.id !== id);
    set({ tasks: updatedTasks });
    taskService.saveTasks(updatedTasks);
  },
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },
  clearFilters: () => {
    set({ filters: {} });
  },
}));
