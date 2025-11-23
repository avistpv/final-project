import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task, TaskStatus } from "../types";
import { TaskCard } from "./TaskCard";
import { TASK_STATUS_LABELS } from "../types";
import "./TaskColumn.css";

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (taskId: number) => void;
}

export const TaskColumn = ({ status, tasks, onTaskClick }: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const taskIds = tasks.map((task) => task.id);

  return (
    <div className="task-column">
      <div className="task-column-header">
        <h2 className="task-column-title">{TASK_STATUS_LABELS[status]}</h2>
        <span className="task-column-count">{tasks.length}</span>
      </div>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="task-column-content">
          {tasks.length === 0 ? (
            <div className="task-column-empty">No tasks</div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task.id)}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};
