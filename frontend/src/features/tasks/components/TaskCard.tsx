import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types";
import { ProgressBar } from "./ProgressBar";
import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  draggable?: boolean;
}

export const TaskCard = ({
  task,
  onClick,
  draggable = true,
}: TaskCardProps) => {
  const sortable = useSortable({ id: task.id, disabled: !draggable });

  const attributes = draggable ? sortable.attributes : {};
  const listeners = draggable ? sortable.listeners : {};
  const setNodeRef = sortable.setNodeRef;
  const transform = sortable.transform;
  const transition = sortable.transition;
  const isDragging = draggable ? sortable.isDragging : false;

  const style = draggable
    ? {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? "none" : transition,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={draggable ? setNodeRef : undefined}
      style={style}
      {...(draggable ? attributes : {})}
      {...(draggable ? listeners : {})}
      className={`task-card ${draggable && isDragging ? "dragging" : ""}`}
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
