"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import Modal from "@/components/common/Modal";

import InputField from "@/components/common/form/InputField";
import TextareaField from "@/components/common/form/TextareaField";
import SelectField from "@/components/common/form/SelectField";
import DateField from "@/components/common/form/DateField";

import { Task, TaskPriority, TaskStatus } from "../types";
import { useTaskStore } from "../store/useTaskStore";
import { Option } from "@/components/common/form/types";
import { TASK_PRIORITIES, TASK_STATUSES } from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormValues, taskSchema } from "../schema/task.schema";

type TaskFormModalProps = {
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

const defaultValues: FormValues = {
  title: "",
  description: "",
  priority: TASK_PRIORITIES[0].value,
  assignee: "",
  dueDate: "",
  status: TASK_STATUSES[0].value,
};

export default function TaskFormModal({
  isOpen,
  onClose,
  existingTask,
}: TaskFormModalProps) {
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  // Prefill for edit
  useEffect(() => {
    if (existingTask) {
      reset(existingTask);
    } else {
      reset(defaultValues);
    }
  }, [existingTask, reset]);

  const onSubmit = (data: TaskFormValues) => {
    console.log("data", data);
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

  const handleDelete = () => {
    if (!existingTask) return;

    deleteTask(existingTask.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={existingTask ? "Edit Task" : "Create Task"}
      actions={
        <div className="w-full flex items-center justify-between gap-4">
          <div>
            {existingTask && (
              <button
                type="button"
                className="btn btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
          <div className="flex gap-4">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" form="task-form" className="btn btn-primary">
              {existingTask ? "Update" : "Create"}
            </button>
          </div>
        </div>
      }
    >
      <form
        id="task-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <InputField
          label="Title"
          name="title"
          register={register}
          error={errors.title}
        />

        <TextareaField
          label="Description"
          name="description"
          register={register}
          error={errors.description}
        />

        <SelectField
          label="Priority"
          name="priority"
          register={register}
          error={errors.priority}
          options={TASK_PRIORITIES.map((p: Option) => ({
            label: p.label,
            value: p.value,
          }))}
        />

        <InputField
          label="Assignee"
          name="assignee"
          register={register}
          error={errors.assignee}
        />

        <DateField
          label="Due Date"
          name="dueDate"
          register={register}
          error={errors.dueDate}
        />

        <SelectField
          label="Status"
          name="status"
          register={register}
          error={errors.status}
          options={TASK_STATUSES.map((s: Option) => ({
            label: s.label,
            value: s.value,
          }))}
        />
      </form>
    </Modal>
  );
}
