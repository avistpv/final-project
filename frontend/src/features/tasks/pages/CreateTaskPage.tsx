import { useNavigate } from "react-router-dom";
import type { CreateTaskInput } from "../types";
import { CreateTaskForm } from "../components/CreateTaskForm";
import { BackButton } from "../../../shared/components/BackButton";
import { useTaskMutation } from "../hooks";
import "./CreateTaskPage.css";

export const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { createTask, isLoading, error } = useTaskMutation();

  const handleSubmit = async (data: CreateTaskInput) => {
    try {
      await createTask(data);
      navigate("/tasks");
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <div className="create-task-page">
      {error && <div className="error-message-container">{error}</div>}

      <div className="create-task-content-wrapper">
        <CreateTaskForm onSubmit={handleSubmit} isLoading={isLoading} />
        <div className="create-task-back-button">
          <BackButton />
        </div>
      </div>
    </div>
  );
};
