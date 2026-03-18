import { extractValues } from "./utils";

export const TASK_STATUSES = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "FOR_REVIEW", label: "For Review" },
  { value: "COMPLETED", label: "Completed" },
] as const;

export const TASK_PRIORITIES = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
] as const;

export const PRIORITY_VALUES = extractValues(TASK_PRIORITIES);
export const STATUS_VALUES = extractValues(TASK_STATUSES);
