export const TASK_STATUSES = ["todo", "in-progress", "review", "done"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export interface TaskBaseFields {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  deadline?: string;
}

export interface TaskFilters
  extends Pick<TaskBaseFields, "status" | "priority"> {
  createdAt?: string;
}

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
}

export interface TaskCreateInput
  extends Required<Pick<TaskBaseFields, "title">> {
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  userId: number;
  deadline?: string;
}

export interface TaskUpdateInput extends TaskBaseFields {
  userId?: number;
  deadline?: string;
}

export interface TaskRequestBody extends TaskBaseFields {
  userId?: number | string;
}

export type TaskQueryParams = TaskFilters;
