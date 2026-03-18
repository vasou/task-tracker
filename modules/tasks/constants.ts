import { TaskStatus } from "./types";

export const TASK_STATUSES: { key: TaskStatus; label: string }[] = [
  { key: "PENDING", label: "Pending" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "FOR_REVIEW", label: "For Review" },
  { key: "COMPLETED", label: "Completed" },
];
