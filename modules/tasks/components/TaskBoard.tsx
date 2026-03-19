"use client";

import { useMemo } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { TASK_STATUSES } from "../constants";
import { filterTasks } from "../utils";
import TaskColumn from "./TaskColumn";
import { Task } from "../types";

type TaskBoardProps = {
  onEdit: (task: Task) => void;
};

export default function TaskBoard({ onEdit }: TaskBoardProps) {
  const tasks = useTaskStore((s) => s.tasks);
  const filters = useTaskStore((s) => s.filters);

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filters);
  }, [tasks, filters]);

  return (
    <div className="overflow-x-auto" tabIndex={-1}>
      <div className="grid grid-flow-col auto-cols-[340px] xl:grid-cols-4 xl:auto-cols-auto gap-4 max-h-[calc(100vh-120px)]">
        {TASK_STATUSES.map((status) => (
          <TaskColumn
            key={status.value}
            title={status.label}
            tasks={filteredTasks.filter((task) => task.status === status.value)}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
