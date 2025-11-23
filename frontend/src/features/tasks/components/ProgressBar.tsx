import { useState, useEffect } from "react";
import type { Task } from "../types";
import "./ProgressBar.css";

interface ProgressBarProps {
  task: Task;
}

export const ProgressBar = ({ task }: ProgressBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    if (!task.deadline) return;

    // Update every hour to show progress changes
    const interval = setInterval(
      () => {
        setCurrentTime(new Date().getTime());
      },
      60 * 60 * 1000,
    ); // Update every hour

    return () => clearInterval(interval);
  }, [task.deadline]);

  if (!task.deadline) {
    return null;
  }

  const now = currentTime;
  const created = task.createdAt ? new Date(task.createdAt).getTime() : now;
  const deadlineDate = new Date(task.deadline);
  // Set deadline to end of day (23:59:59.999) so it's valid for the entire day
  deadlineDate.setHours(23, 59, 59, 999);
  const deadline = deadlineDate.getTime();

  if (deadline <= created) {
    return null;
  }

  const totalDuration = deadline - created;
  const elapsed = now - created;
  const isOverdue = now > deadline;
  const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60));

  // Calculate progress with enhanced sensitivity for final days
  let progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

  // Enhance visual difference for 1-3 days remaining
  // Add more granular progress steps in the final days
  if (daysRemaining <= 3 && daysRemaining > 0 && !isOverdue) {
    const hoursInDay = 24;
    const hoursLeft = (deadline - now) / (1000 * 60 * 60);

    // Create more distinct progress values:
    // 3 days = ~80-85%, 2 days = ~88-92%, 1 day = ~95-98%
    const baseProgress = 80 + (4 - daysRemaining) * 5;
    const hourAdjustment =
      ((hoursInDay - (hoursLeft % hoursInDay)) / hoursInDay) * 3;
    progress = Math.max(progress, baseProgress + hourAdjustment);
  }

  // Determine color based on progress with gradient
  const getProgressColor = () => {
    if (isOverdue) return "overdue";
    if (progress >= 100) return "complete";
    if (progress >= 80) return "high";
    if (progress >= 60) return "medium-high";
    if (progress >= 40) return "medium";
    if (progress >= 20) return "low";
    return "start";
  };

  const getTimeRemainingText = () => {
    if (isOverdue) {
      const hoursOverdue = Math.ceil((now - deadline) / (1000 * 60 * 60));
      const daysOverdue = Math.floor((now - deadline) / (1000 * 60 * 60 * 24));

      if (daysOverdue === 0) {
        return `${hoursOverdue} ${hoursOverdue === 1 ? "hour" : "hours"} overdue`;
      }
      return `${daysOverdue} ${daysOverdue === 1 ? "day" : "days"} overdue`;
    }
    // Show hours if less than 24 hours remaining
    if (hoursRemaining < 24 && hoursRemaining > 0) {
      return `${hoursRemaining} ${hoursRemaining === 1 ? "hour" : "hours"} left`;
    }
    if (daysRemaining > 0) {
      return `${daysRemaining} ${daysRemaining === 1 ? "day" : "days"} left`;
    }
    return "Less than 1 hour left";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const createdDate = task.createdAt ? new Date(task.createdAt) : new Date();
  // Use original deadline for display (before we modified it to end of day)
  const deadlineDisplayDate = new Date(task.deadline);
  const dateRange = `${formatDate(createdDate)} - ${formatDate(deadlineDisplayDate)}`;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-wrapper">
        <div
          className={`progress-bar-fill ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        >
          <span className="progress-bar-text-filled">{dateRange}</span>
        </div>
        <span className="progress-bar-text-unfilled">{dateRange}</span>
        <span className="progress-percentage">{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar-label">
        <span
          className={`progress-remaining ${isOverdue ? "progress-overdue" : ""}`}
        >
          {getTimeRemainingText()}
        </span>
      </div>
    </div>
  );
};
