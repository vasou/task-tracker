import { Filters, Task } from "./types";

export const filterTasks = (tasks: Task[], filters: Filters) => {
  return tasks.filter((task) => {
    const matchesSearch =
      !filters.search ||
      task.title.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus = !filters.status || task.status === filters.status;

    const matchesPriority =
      !filters.priority || task.priority === filters.priority;

    const matchesAssignee =
      !filters.assignee ||
      task.assignee?.toLowerCase().includes(filters.assignee.toLowerCase());

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });
};
