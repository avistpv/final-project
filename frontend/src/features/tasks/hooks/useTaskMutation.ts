import { useState } from "react";
import { tasksApi } from "../api";
import type { CreateTaskInput, TaskStatus } from "../types";

export const useTaskMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTask = async (task: CreateTaskInput) => {
    try {
      setIsLoading(true);
      setError(null);
      return await tasksApi.create(task);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create task";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (
    id: string | number,
    updates: Partial<CreateTaskInput>,
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      return await tasksApi.update(id, updates);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update task";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: TaskStatus) => {
    return updateTask(taskId, { status: newStatus });
  };

  const deleteTask = async (id: string | number) => {
    try {
      setIsLoading(true);
      setError(null);
      await tasksApi.delete(id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete task";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isLoading,
    error,
  };
};
