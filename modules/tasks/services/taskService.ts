import { storage } from "@/lib/storage";
import { Task } from "../types";

const STORAGE_KEY = "tt_tasks";

export const taskService = {
  getTasks: (): Task[] => {
    return storage.get(STORAGE_KEY) || [];
  },
  saveTasks: (tasks: Task[]) => {
    storage.set(STORAGE_KEY, tasks);
  },
};
