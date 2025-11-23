import "./LoadingState.css";

export const LoadingState = ({
  message = "Loading...",
}: {
  message?: string;
}) => {
  return (
    <div className="loading-state">
      <p>{message}</p>
    </div>
  );
};
