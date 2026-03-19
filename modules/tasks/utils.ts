import { Filters, Task } from "./types";

export const filterTasks = (tasks: Task[], filters: Filters) => {
  const search = filters.search?.toLowerCase();
  const assignee = filters.assignee?.toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch = !search || task.title.toLowerCase().includes(search);

    const matchesStatus = !filters.status || task.status === filters.status;

    const matchesPriority =
      !filters.priority || task.priority === filters.priority;

    const matchesAssignee =
      !assignee ||
      (task.assignee && task.assignee?.toLowerCase().includes(assignee));

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });
};

export const extractValues = <T extends readonly { value: string }[]>(arr: T) =>
  arr.map((item) => item.value) as [
    T[number]["value"],
    ...T[number]["value"][],
  ];
