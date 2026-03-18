import { TASK_PRIORITIES, TASK_STATUSES } from "./constants";

export type TaskStatus = (typeof TASK_STATUSES)[number]["value"];
export type TaskPriority = (typeof TASK_PRIORITIES)[number]["value"];

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string; // ISO date string
  status: TaskStatus;
};

export type Filters = {
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
};
