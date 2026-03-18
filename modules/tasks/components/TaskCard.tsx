import { Task } from "../types";
import { useTaskStore } from "../store/useTaskStore";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const deleteTask = useTaskStore((s) => s.deleteTask);

  return (
    <div className="card bg-base-100 shadow-sm border">
      <div className="card-body p-3">
        <div className="flex justify-between items-start">
          <h3 className="card-title text-sm">{task.title}</h3>

          <button
            onClick={() => deleteTask(task.id)}
            className="btn btn-xs btn-error btn-outline"
          >
            Delete
          </button>
        </div>

        {task.description && (
          <p className="text-xs opacity-70">{task.description}</p>
        )}

        <div className="flex justify-between text-xs mt-2">
          <span className="badge badge-outline">{task.priority}</span>

          <span className="badge badge-ghost">
            {task.assignee || "Unassigned"}
          </span>
        </div>
      </div>
    </div>
  );
}
