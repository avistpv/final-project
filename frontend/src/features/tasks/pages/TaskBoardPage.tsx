import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Task, TaskStatus } from "../types";
import { KanbanBoard } from "../components/KanbanBoard";
import { TaskListView } from "../components/TaskListView";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { useTasks, useTaskFilter } from "../hooks";
import { tasksApi } from "../api";
import "./TaskBoardPage.css";

type ViewMode = "kanban" | "list";

export const TaskBoardPage = () => {
  const { tasks, setTasks, loading, error, refetch } = useTasks();
  const { searchQuery, setSearchQuery, sortOrder, toggleSort, filteredTasks } =
    useTaskFilter(tasks);
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const navigate = useNavigate();

  const handleTaskClick = (id: number) => {
    navigate(`/tasks/${id}`);
  };

  const handleTaskMove = async (taskId: number, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === taskId);

    if (!task || task.status === newStatus) {
      return;
    }

    const previousTasks = tasks;
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );

    try {
      await tasksApi.update(taskId, { status: newStatus });
    } catch {
      setTasks(previousTasks);
    }
  };

  const handleTasksReorder = (reorderedTasks: Task[]) => {
    const newOrderMap = new Map(
      reorderedTasks.map((task, index) => [task.id, index]),
    );

    const reorderedAllTasks = [...tasks].sort((a, b) => {
      const aIndex = newOrderMap.get(a.id);
      const bIndex = newOrderMap.get(b.id);

      if (aIndex !== undefined && bIndex !== undefined) {
        return aIndex - bIndex;
      }
      if (aIndex !== undefined) return -1;
      if (bIndex !== undefined) return 1;
      return 0;
    });

    setTasks(reorderedAllTasks);
  };

  if (loading) {
    return (
      <div className="tasks-page">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="tasks-page">
        <ErrorState error={error} onRetry={refetch} />
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
            onClick={toggleSort}
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

      {filteredTasks.length === 0 ? (
        <EmptyState onAction={() => navigate("/tasks/create")} />
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
