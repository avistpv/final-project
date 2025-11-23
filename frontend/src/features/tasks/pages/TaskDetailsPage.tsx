import { useParams } from "react-router-dom";
import { TASK_STATUS_LABELS } from "../types";
import { BackButton } from "../../../shared/components/BackButton";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { useTask } from "../hooks";
import "./TaskDetailsPage.css";

export const TaskDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { task, loading, error } = useTask(id);

  if (loading) {
    return (
      <div className="task-details-page">
        <BackButton />
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-details-page">
        <BackButton />
        <ErrorState error={error} />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="task-details-page">
        <BackButton />
        <div className="not-found-state">
          <p>Task not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-details-page">
      <BackButton />
      <div className="task-details-card">
        <h1>
          {task.title}
          {task.status === "done" && <span className="completed-badge">✓</span>}
        </h1>
        {task.description && (
          <div className="description-section">
            <h3>Description</h3>
            <p>{task.description}</p>
          </div>
        )}
        <div className="task-details-meta">
          <div className="meta-item">
            <span className="meta-label">Status:</span>
            <span className={`task-status task-status-${task.status}`}>
              {TASK_STATUS_LABELS[task.status]}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Priority:</span>
            <span className={`task-priority task-priority-${task.priority}`}>
              {task.priority}
            </span>
          </div>
          {task.assignee && (
            <div className="meta-item">
              <span className="meta-label">Assignee:</span>
              <span className="task-assignee">
                {task.assignee.name} ({task.assignee.email})
              </span>
            </div>
          )}
          {task.createdAt && (
            <div className="meta-item">
              <span className="meta-label">Created:</span>
              <span className="task-date">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
          {task.updatedAt && (
            <div className="meta-item">
              <span className="meta-label">Updated:</span>
              <span className="task-date">
                {new Date(task.updatedAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
