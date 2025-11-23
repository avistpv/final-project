import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task, TaskStatus } from "../types";
import { TASK_STATUSES } from "../types";
import { ProgressBar } from "./ProgressBar";
import "./TaskListView.css";

interface TaskListViewProps {
  tasks: Task[];
  onTaskClick: (taskId: number) => void;
  onTaskMove: (taskId: number, newStatus: TaskStatus) => void;
  onTasksReorder?: (reorderedTasks: Task[]) => void;
}

interface TaskListItemProps {
  task: Task;
  onTaskClick: (taskId: number) => void;
}

const TaskListItem = ({ task, onTaskClick }: TaskListItemProps) => {
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
      onClick={() => !isDragging && onTaskClick(task.id)}
      className={`task-list-item ${isDragging ? "dragging" : ""}`}
    >
      <div className="task-list-col task-list-col-name">
        <span className="task-list-item-title">
          {task.title}
          {task.status === "done" && <span className="completed-badge">✓</span>}
        </span>
      </div>
      <div className="task-list-col task-list-col-description">
        {task.description ? (
          <span className="task-list-item-description">{task.description}</span>
        ) : (
          <span className="task-list-item-description-empty">—</span>
        )}
      </div>
      <div className="task-list-col task-list-col-deadline">
        {task.deadline ? (
          <ProgressBar task={task} />
        ) : (
          <span className="task-list-item-description-empty">—</span>
        )}
      </div>
      <div className="task-list-col task-list-col-status">
        <span className={`task-status task-status-${task.status}`}>
          {task.status.replace("-", " ")}
        </span>
      </div>
      <div className="task-list-col task-list-col-priority">
        <span className={`task-priority task-priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>
      <div className="task-list-col task-list-col-assignee">
        {task.assignee ? (
          <span className="task-list-item-assignee">{task.assignee.name}</span>
        ) : (
          <span className="task-list-item-description-empty">—</span>
        )}
      </div>
    </div>
  );
};

export const TaskListView = ({
  tasks,
  onTaskClick,
  onTaskMove,
  onTasksReorder,
}: TaskListViewProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as number;
    const overId = over.id;

    // Check if we're dropping on a status column header
    const isStatusDrop = TASK_STATUSES.includes(overId as TaskStatus);

    if (isStatusDrop) {
      const newStatus = overId as TaskStatus;
      const task = tasks.find((t) => t.id === taskId);
      if (task && task.status !== newStatus) {
        onTaskMove(taskId, newStatus);
      }
      return;
    }

    // Dropped on another task
    const targetTask = tasks.find((t) => t.id === overId);
    if (!targetTask) return;

    const draggedTask = tasks.find((t) => t.id === taskId);
    if (!draggedTask) return;

    // If status is different, change status
    if (draggedTask.status !== targetTask.status) {
      onTaskMove(taskId, targetTask.status);
      return;
    }

    // Same status - reorder tasks
    const oldIndex = tasks.findIndex((t) => t.id === taskId);
    const newIndex = tasks.findIndex((t) => t.id === overId);

    if (oldIndex !== newIndex && onTasksReorder) {
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      onTasksReorder(reorderedTasks);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks yet</p>
        <p className="task-list-empty-subtitle">
          Create your first task to get started
        </p>
      </div>
    );
  }

  const taskIds = tasks.map((task) => task.id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="task-list-view">
        <div className="task-list-header">
          <div className="task-list-col task-list-col-name">Name</div>
          <div className="task-list-col task-list-col-description">
            Description
          </div>
          <div className="task-list-col task-list-col-deadline">Deadline</div>
          <div className="task-list-col task-list-col-status">Status</div>
          <div className="task-list-col task-list-col-priority">Priority</div>
          <div className="task-list-col task-list-col-assignee">Assignee</div>
        </div>
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskListItem key={task.id} task={task} onTaskClick={onTaskClick} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <div style={{ opacity: 0.8 }}>
            <TaskListItem task={activeTask} onTaskClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
