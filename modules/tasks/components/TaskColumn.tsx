import { Task } from "../types";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
}

export default function TaskColumn({ title, tasks, onEdit }: TaskColumnProps) {
  return (
    <div className="bg-base-300 p-4 rounded-xl">
      <h2 className="border-0 border-b border-white/15 pb-2">{title}</h2>
      <div className="py-4">
        <div className="flex flex-col gap-4 overflow-y-auto min-h-[calc(100vh-210px)] max-h-[calc(100vh-210px)]">
          {tasks.length === 0 ? (
            <p className="text-center opacity-50">No tasks</p>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={onEdit} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
