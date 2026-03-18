"use client";

import TaskBoard from "@/modules/tasks/components/TaskBoard";
import TaskFormModal from "@/modules/tasks/components/TaskFormModal";
import { useTaskStore } from "@/modules/tasks/store/useTaskStore";
import { useEffect, useState } from "react";

export default function Home() {
  const init = useTaskStore((state) => state.init);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
      <main>
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1>Task Tracker</h1>
              <p>Welcome to the Task Tracker!</p>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => setIsOpen(true)}
              >
                + Add Task
              </button>
            </div>
          </div>
          <TaskBoard />
          <TaskFormModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            existingTask={null}
          />
        </div>
      </main>
    </div>
  );
}
