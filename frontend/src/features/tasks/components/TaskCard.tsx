import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types";
import { ProgressBar } from "./ProgressBar";
import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card ${isDragging ? "dragging" : ""}`}
      onClick={onClick}
    >
      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <span className={`task-priority task-priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}
      {task.assignee && (
        <div className="task-card-assignee">
          <span>{task.assignee.name}</span>
        </div>
      )}
      <ProgressBar task={task} />
    </div>
  );
};
