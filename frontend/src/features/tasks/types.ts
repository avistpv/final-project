export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  userId: number;
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
  assignee?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  userId: number;
  deadline?: string;
}

export const TASK_STATUSES: TaskStatus[] = [
  "todo",
  "in-progress",
  "review",
  "done",
];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};
