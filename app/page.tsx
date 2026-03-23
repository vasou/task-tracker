"use client";

import { useEffect, useState } from "react";
import TaskFilters from "@/modules/tasks/components/TaskFilter";
import TaskSearch from "@/modules/tasks/components/TaskSearch";
import { useTaskStore } from "@/modules/tasks/store/useTaskStore";
import { Task } from "@/modules/tasks/types";
import dynamic from "next/dynamic";

const TaskBoard = dynamic(
  () => import("@/modules/tasks/components/TaskBoard"),
  {
    loading: () => <p>Loading tasks...</p>,
  },
);
const TaskFormModal = dynamic(
  () => import("@/modules/tasks/components/TaskFormModal"),
  {
    ssr: false,
  },
);

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
            <div></div>
          </div>
          <div className="flex items-center max-md:flex-col-reverse max-md:items-end justify-between gap-4 py-8">
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 w-[85%] max-md:w-full max-w-300">
              <TaskSearch />
              <div className="">
                <TaskFilters />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleCreate}>
              + Add Task
            </button>
          </div>
          <TaskBoard onEdit={handleEdit} />
          {isOpen && (
            <TaskFormModal
              isOpen={isOpen}
              onClose={handleClose}
              existingTask={selectedTask}
            />
          )}
        </div>
      </main>
    </div>
  );
}
