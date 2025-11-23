import { useState, useMemo } from "react";
import type { Task } from "../types";

type SortOrder = "a-z" | "z-a" | null;

export const useTaskFilter = (tasks: Task[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    if (sortOrder) {
      filtered.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (sortOrder === "a-z") {
          return titleA.localeCompare(titleB);
        } else {
          return titleB.localeCompare(titleA);
        }
      });
    }

    return filtered;
  }, [tasks, searchQuery, sortOrder]);

  const toggleSort = () => {
    if (sortOrder === null) {
      setSortOrder("a-z");
    } else if (sortOrder === "a-z") {
      setSortOrder("z-a");
    } else {
      setSortOrder(null);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    sortOrder,
    toggleSort,
    filteredTasks,
  };
};
