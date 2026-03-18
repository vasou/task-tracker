import { Task } from "../types";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
};

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  console.log("task", task);
  return (
    <div
      className="card bg-base-100 shadow-sm border cursor-pointer hover:shadow-md transition"
      onClick={() => onEdit(task)}
    >
      <div className="card-body p-3 gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="card-title text-sm">{task.title}</h3>
          <span className="badge badge-ghost shrink-0">
            {task.assignee || "Unassigned"}
          </span>
        </div>

        {task.description && (
          <p className="text-xs opacity-70 line-clamp-2">{task.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-2 text-xs">
          <span className="badge badge-outline">{task.priority}</span>
          <span className="badge badge-info badge-outline">{task.status}</span>
        </div>

        <div className="flex justify-between items-center text-xs mt-2 opacity-70">
          <span>Due by: {task.dueDate || "No due date"}</span>
        </div>
      </div>
    </div>
  );
}
