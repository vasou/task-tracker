import { z } from "zod";
import { PRIORITY_VALUES, STATUS_VALUES } from "../constants";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  assignee: z.string().min(1, "Please enter assignee name"),
  priority: z.enum(PRIORITY_VALUES),
  status: z.enum(STATUS_VALUES),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine(
      (date) => {
        const today = new Date();
        const selectedDate = new Date(date);

        today.setHours(0, 0, 0, 0);

        return selectedDate > today;
      },
      {
        message: "Due date must be in the future",
      },
    ),
  description: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
