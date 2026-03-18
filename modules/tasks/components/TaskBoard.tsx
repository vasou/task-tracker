"use client";

import { useMemo } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { TASK_STATUSES } from "../constants";
import { filterTasks } from "../utils";
import TaskColumn from "./TaskColumn";

export default function TaskBoard() {
  const tasks = useTaskStore((s) => s.tasks);
  const filters = useTaskStore((s) => s.filters);

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filters);
  }, [tasks, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {TASK_STATUSES.map((status) => (
        <TaskColumn
          key={status.key}
          status={status.key}
          title={status.label}
          tasks={filteredTasks.filter((task) => task.status === status.key)}
        />
      ))}
    </div>
  );
}
