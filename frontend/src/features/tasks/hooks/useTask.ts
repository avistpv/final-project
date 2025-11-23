import { useEffect, useState } from "react";
import { tasksApi } from "../api";
import type { Task } from "../types";

export const useTask = (id: string | undefined) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Task ID is required");
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tasksApi.getById(id);
        setTask(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  return { task, loading, error };
};
