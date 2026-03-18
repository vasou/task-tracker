"use client";

import TaskBoard from "@/modules/tasks/components/TaskBoard";
import TaskFormModal from "@/modules/tasks/components/TaskFormModal";
import { useTaskStore } from "@/modules/tasks/store/useTaskStore";
import { Task } from "@/modules/tasks/types";
import { useEffect, useState } from "react";

export default function Home() {
  const init = useTaskStore((state) => state.init);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    init();
  }, [init]);

  const handleCreate = () => {
    setSelectedTask(null);
    setIsOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-svh">
      <main>
        <div className="p-6 min-h-svh">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-bold">Task Tracker</h1>
              <p>Welcome to the Task Tracker</p>
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleCreate}>
                + Add Task
              </button>
            </div>
          </div>
          <TaskBoard onEdit={handleEdit} />
          <TaskFormModal
            isOpen={isOpen}
            onClose={handleClose}
            existingTask={selectedTask}
          />
        </div>
      </main>
    </div>
  );
}
