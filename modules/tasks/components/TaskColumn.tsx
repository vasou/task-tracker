import { Task, TaskStatus } from "../types";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export default function TaskColumn({ title, tasks }: TaskColumnProps) {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
