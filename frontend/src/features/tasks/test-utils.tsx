import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import type { Task } from "./types";

export const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Test Task 1",
    description: "Test description 1",
    status: "todo",
    priority: "high",
    userId: 1,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    title: "Test Task 2",
    description: "Test description 2",
    status: "in-progress",
    priority: "medium",
    userId: 1,
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    title: "Completed Task",
    description: "Completed description",
    status: "done",
    priority: "low",
    userId: 1,
    createdAt: "2024-01-03T00:00:00Z",
  },
];
