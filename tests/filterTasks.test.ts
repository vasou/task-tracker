import { filterTasks } from "@/modules/tasks/utils";
import { title } from "process";
import { describe, it, expect } from "vitest";

describe("filterTasks", () => {
  it("filter by status", () => {
    const tasks = [
      { id: "1", title: "Task A", status: "PENDING" },
      { id: "2", title: "Task B", status: "IN_PROGRESS" },
      { id: "3", title: "Task C", status: "COMPLETED" },
    ] as any; // Cast to any for simplicity

    const result = filterTasks(tasks, { status: "COMPLETED" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Task C");
  });

  it("filter by search", () => {
    const tasks = [
      { id: "1", title: "Fix login bug", status: "PENDING" },
      { id: "2", title: "Implement search feature", status: "IN_PROGRESS" },
      { id: "3", title: "Update user profile page", status: "COMPLETED" },
    ] as any; // Cast to any for simplicity

    const result = filterTasks(tasks, { search: "fix" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Fix login bug");
  });
});
