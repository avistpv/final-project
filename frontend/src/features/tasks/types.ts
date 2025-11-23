export const TASK_STATUSES = ["todo", "in-progress", "review", "done"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export interface BaseTask {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  userId: number;
  deadline?: string;
}

export type CreateTaskInput = BaseTask;

export interface Task extends BaseTask {
  id: number;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt?: string;
  updatedAt?: string;
  assignee?: {
    id: number;
    name: string;
    email: string;
  };
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};
