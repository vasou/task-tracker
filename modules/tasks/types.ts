export type TaskStatus = "PENDING" | "IN_PROGRESS" | "FOR_REVIEW" | "COMPLETED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string; // ISO date string
  status: TaskStatus;
  // createdAt: string; // ISO date string
  // updatedAt: string; // ISO date string
};

export type Filters = {
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
};
