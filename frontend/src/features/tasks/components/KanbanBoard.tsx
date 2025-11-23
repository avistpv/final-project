import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { Task, TaskStatus } from "../types";
import { TASK_STATUSES } from "../types";
import { TaskColumn } from "./TaskColumn";
import { TaskCard } from "./TaskCard";
import "./KanbanBoard.css";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (taskId: number) => void;
  onTaskMove: (taskId: number, newStatus: TaskStatus) => void;
}

export const KanbanBoard = ({
  tasks,
  onTaskClick,
  onTaskMove,
}: KanbanBoardProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
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

    // Check if we're dropping on a column (status) or on another task
    const isColumnDrop = TASK_STATUSES.includes(overId as TaskStatus);

    if (!isColumnDrop) {
      // Dropped on another task - find which column that task belongs to
      const targetTask = tasks.find((t) => t.id === overId);
      if (!targetTask) return;

      const task = tasks.find((t) => t.id === taskId);
      if (task && task.status !== targetTask.status) {
        onTaskMove(taskId, targetTask.status);
      }
      return;
    }

    // Dropped on a column
    const newStatus = overId as TaskStatus;
    const task = tasks.find((t) => t.id === taskId);

    // Only move if status actually changed
    if (task && task.status !== newStatus) {
      onTaskMove(taskId, newStatus);
    }
  };

  const tasksByStatus = TASK_STATUSES.reduce(
    (acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status);
      return acc;
    },
    {} as Record<TaskStatus, Task[]>,
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="kanban-board">
        {TASK_STATUSES.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status]}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
      <DragOverlay
        dropAnimation={{
          duration: 0,
          easing: "ease",
        }}
      >
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
