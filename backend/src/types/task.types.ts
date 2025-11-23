export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high";

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
