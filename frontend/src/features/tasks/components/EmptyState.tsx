import "./EmptyState.css";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title = "No tasks yet",
  subtitle = "Create your first task to get started",
  actionLabel = "Create Task",
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <p>{title}</p>
      {subtitle && <p className="empty-state-subtitle">{subtitle}</p>}
      {onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};
