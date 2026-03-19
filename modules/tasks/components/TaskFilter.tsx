"use client";

import { useTaskStore } from "../store/useTaskStore";
import { TASK_STATUSES, TASK_PRIORITIES } from "../constants";
import { TaskPriority, TaskStatus } from "../types";
import SelectField from "@/components/common/form/SelectField";
import InputField from "@/components/common/form/InputField";

export default function TaskFilters() {
  const filters = useTaskStore((s) => s.filters);
  const setFilters = useTaskStore((s) => s.setFilters);
  const clearFilters = useTaskStore((s) => s.clearFilters);

  const hasFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== "",
  );

  return (
    <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-3 items-center">
      <SelectField
        label="Status"
        options={TASK_STATUSES}
        value={filters.status || ""}
        onChange={(value) =>
          setFilters({
            status: value ? (value as TaskStatus) : undefined,
          })
        }
      />
      <SelectField
        label="Priority"
        options={TASK_PRIORITIES}
        value={filters.priority || ""}
        onChange={(value) =>
          setFilters({
            priority: value ? (value as TaskPriority) : undefined,
          })
        }
      />
      <InputField
        name="assignee"
        label="Assignee"
        value={filters.assignee || ""}
        onChange={(value) => {
          setFilters({ assignee: value ? (value as string) : undefined });
        }}
      />
      {hasFilters && (
        <p
          className="pt-6 underline text-sm cursor-pointer"
          onClick={clearFilters}
        >
          Clear filter
        </p>
      )}
    </div>
  );
}
