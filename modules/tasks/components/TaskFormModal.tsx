"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import { Task, TaskPriority, TaskStatus } from "../types";
import { useTaskStore } from "../store/useTaskStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  existingTask?: Task | null;
};

type FormValues = {
  title: string;
  description?: string;
  priority: TaskPriority;
  assignee?: string;
  dueDate: string;
  status: TaskStatus;
};

export default function TaskFormModal({
  isOpen,
  onClose,
  existingTask,
}: Props) {
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // Prefill when editing
  useEffect(() => {
    if (existingTask) {
      reset(existingTask);
    } else {
      reset({
        title: "",
        description: "",
        priority: "MEDIUM",
        assignee: "",
        dueDate: "",
        status: "PENDING",
      });
    }
  }, [existingTask, reset]);

  const onSubmit = (data: FormValues) => {
    if (existingTask) {
      updateTask({ ...existingTask, ...data });
    } else {
      addTask({
        id: uuidv4(),
        ...data,
      });
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-semibold text-lg mb-4">
          {existingTask ? "Edit Task" : "Create Task"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="label">Title</label>
            <input
              className="input input-bordered w-full"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-error text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              {...register("description")}
            />
          </div>

          {/* Priority */}
          <div>
            <label className="label">Priority</label>
            <select
              className="select select-bordered w-full"
              {...register("priority", {
                required: "Priority is required",
              })}
            >
              <option value="">Select priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            {errors.priority && (
              <p className="text-error text-xs mt-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Assignee */}
          <div>
            <label className="label">Assignee</label>
            <input
              className="input input-bordered w-full"
              {...register("assignee")}
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="label">Due Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("dueDate", {
                validate: (value) =>
                  !value ||
                  dayjs(value).isAfter(dayjs().subtract(1, "day")) ||
                  "Due date cannot be in the past",
              })}
            />

            {errors.dueDate && (
              <p className="text-error text-xs mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="label">Status</label>
            <select
              className="select select-bordered w-full"
              {...register("status")}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="FOR_REVIEW">For Review</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              {existingTask ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
