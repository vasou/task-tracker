import {
  extractValues,
  filterTasks,
  getTaskLabel,
} from "@/modules/tasks/utils";
import { describe, it, expect } from "vitest";

describe("filterTasks", () => {
  it("filter by status", () => {
    const tasks = [
      { id: "1", title: "Task A", status: "BACKLOG" },
      { id: "2", title: "Task B", status: "IN_PROGRESS" },
      { id: "3", title: "Task C", status: "DONE" },
    ] as any; // Cast to any for simplicity

    const result = filterTasks(tasks, { status: "DONE" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Task C");
  });

  it("filter by search", () => {
    const tasks = [
      { id: "1", title: "Fix login bug", status: "BACKLOG" },
      { id: "2", title: "Implement search feature", status: "IN_PROGRESS" },
      { id: "3", title: "Update user profile page", status: "DONE" },
    ] as any; // Cast to any for simplicity

    const result = filterTasks(tasks, { search: "fix" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Fix login bug");
  });

  it("filters by priority", () => {
    const tasks = [
      { id: "1", title: "Low", status: "BACKLOG", priority: "LOW" },
      { id: "2", title: "High", status: "BACKLOG", priority: "HIGH" },
    ] as any;

    const result = filterTasks(tasks, { priority: "HIGH" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("High");
  });

  it("filters by assignee (case-insensitive, partial match)", () => {
    const tasks = [
      { id: "1", title: "Task 1", status: "BACKLOG", assignee: "Alice Smith" },
      { id: "2", title: "Task 2", status: "BACKLOG", assignee: "Bob" },
    ] as any;

    const result = filterTasks(tasks, { assignee: "alice" });
    expect(result).toHaveLength(1);
    expect(result[0].assignee).toBe("Alice Smith");
  });

  it("applies multiple filters together", () => {
    const tasks = [
      {
        id: "1",
        title: "Fix bug",
        status: "IN_PROGRESS",
        priority: "HIGH",
        assignee: "Eve",
      },
      {
        id: "2",
        title: "Fix doc",
        status: "IN_PROGRESS",
        priority: "LOW",
        assignee: "Eve",
      },
      {
        id: "3",
        title: "Feature",
        status: "BACKLOG",
        priority: "HIGH",
        assignee: "Sam",
      },
    ] as any;

    const result = filterTasks(tasks, {
      status: "IN_PROGRESS",
      priority: "HIGH",
      search: "fix",
      assignee: "eve",
    });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Fix bug");
  });

  it("returns all tasks when no filters provided", () => {
    const tasks = [
      { id: "1", title: "A", status: "BACKLOG" },
      { id: "2", title: "B", status: "DONE" },
    ] as any;

    const result = filterTasks(tasks, {});
    expect(result).toHaveLength(2);
  });

  it("handles tasks missing optional fields without throwing", () => {
    const tasks = [
      { id: "1", title: "A", status: "BACKLOG" }, // no assignee, no priority
      { id: "2", title: "B", status: "BACKLOG", assignee: undefined },
    ] as any;

    const result = filterTasks(tasks, {
      assignee: "someone",
      priority: "HIGH",
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });
});

describe("utils: extractValues & getTaskLabel", () => {
  it("extractValues returns values array", () => {
    const options = [{ value: "a" }, { value: "b" }] as const;
    const values = extractValues(options);
    expect(values).toEqual(["a", "b"]);
  });

  it("getTaskLabel returns the label for known value and falls back to value", () => {
    const options = [
      { value: "low", label: "Low" },
      { value: "high", label: "High" },
    ] as const;

    expect(getTaskLabel(options, "high")).toBe("High");
    expect(getTaskLabel(options, "unknown")).toBe("unknown");
    expect(getTaskLabel(options, undefined)).toBeUndefined();
  });
});
