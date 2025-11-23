import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tasksApi } from "../api";
import type { Task, TaskStatus } from "../types";
import { KanbanBoard } from "../components/KanbanBoard";
import { TaskListView } from "../components/TaskListView";
import "./TaskBoardPage.css";

type ViewMode = "kanban" | "list";
type SortOrder = "a-z" | "z-a" | null;

export const TaskBoardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tasksApi.getAll();
        setTasks(data);
        setFilteredTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
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

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, sortOrder]);

  const handleTaskClick = (id: number) => {
    navigate(`/tasks/${id}`);
  };

  const handleTaskMove = async (taskId: number, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === taskId);

    // Don't do anything if status hasn't changed
    if (!task || task.status === newStatus) {
      return;
    }

    // Optimistically update the UI immediately
    const previousTasks = tasks;
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );

    try {
      // Then sync with the server
      await tasksApi.update(taskId, { status: newStatus });
    } catch (err) {
      // Revert on error
      setTasks(previousTasks);
      setError(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  const handleTasksReorder = (reorderedTasks: Task[]) => {
    // Create a map of new positions
    const newOrderMap = new Map(
      reorderedTasks.map((task, index) => [task.id, index]),
    );

    // Update tasks array to match the new order
    const reorderedAllTasks = [...tasks].sort((a, b) => {
      const aIndex = newOrderMap.get(a.id);
      const bIndex = newOrderMap.get(b.id);

      // If both tasks are in the reordered list, use their new order
      if (aIndex !== undefined && bIndex !== undefined) {
        return aIndex - bIndex;
      }
      // If only one is in the list, put it in its new position
      if (aIndex !== undefined) return -1;
      if (bIndex !== undefined) return 1;
      // If neither is in the list, maintain original order
      return 0;
    });

    setTasks(reorderedAllTasks);
    setFilteredTasks(reorderedTasks);
  };

  if (loading) {
    return (
      <div className="tasks-page">
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tasks-page">
        <div className="error-state">
          <p>Error: {error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1>Overview of tasks</h1>
        <div className="tasks-header-actions">
          <div className="search-container">
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14L11.1 11.1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className={`sort-btn ${sortOrder ? "active" : ""} ${sortOrder === "z-a" ? "sort-desc" : ""}`}
            onClick={() => {
              if (sortOrder === null) {
                setSortOrder("a-z");
              } else if (sortOrder === "a-z") {
                setSortOrder("z-a");
              } else {
                setSortOrder(null);
              }
            }}
            aria-label="Sort"
            title={
              sortOrder === "a-z"
                ? "Sort Z-A"
                : sortOrder === "z-a"
                  ? "Clear sort"
                  : "Sort A-Z"
            }
          >
            <span className="sort-text">Sort</span>
            {sortOrder === null ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 2L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 10L8 14L12 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : sortOrder === "a-z" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 2L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10L8 14L12 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === "kanban" ? "active" : ""}`}
              onClick={() => setViewMode("kanban")}
              aria-label="Kanban view"
              title="Kanban view"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <rect
                  x="11"
                  y="2"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <rect
                  x="2"
                  y="11"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <rect
                  x="11"
                  y="11"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </button>
            <button
              className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
              title="List view"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="3"
                  width="16"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="2"
                  y="9"
                  width="16"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="2"
                  y="15"
                  width="16"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/tasks/create")}
          >
            Create Task
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 && !loading ? (
        <div className="empty-state">
          <p>No tasks yet</p>
          <p className="empty-state-subtitle">
            Create your first task to get started
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/tasks/create")}
          >
            Create Task
          </button>
        </div>
      ) : (
        <>
          {viewMode === "kanban" ? (
            <KanbanBoard
              tasks={filteredTasks}
              onTaskClick={handleTaskClick}
              onTaskMove={handleTaskMove}
            />
          ) : (
            <TaskListView
              tasks={filteredTasks}
              onTaskClick={handleTaskClick}
              onTaskMove={handleTaskMove}
              onTasksReorder={handleTasksReorder}
            />
          )}
        </>
      )}
    </div>
  );
};
