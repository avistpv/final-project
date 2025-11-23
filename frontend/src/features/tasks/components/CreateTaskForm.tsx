import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CreateTaskInput } from "../types";
import { TASK_STATUSES, TASK_PRIORITIES } from "../types";
import { Field } from "./Field";
import "./CreateTaskForm.css";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(TASK_STATUSES as unknown as [string, ...string[]]).optional(),
  priority: z
    .enum(TASK_PRIORITIES as unknown as [string, ...string[]])
    .optional(),
  deadline: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface CreateTaskFormProps {
  onSubmit: (data: CreateTaskInput) => Promise<void>;
  isLoading?: boolean;
}

export const CreateTaskForm = ({
  onSubmit,
  isLoading = false,
}: CreateTaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "all",
    defaultValues: {
      status: "todo",
      priority: "medium",
    },
  });

  const onFormSubmit = async (data: TaskFormData) => {
    await onSubmit({ ...data, userId: 1 } as CreateTaskInput);
  };

  return (
    <div className="form-section">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit(onFormSubmit)} className="task-form">
        <Field label="Task Name *" error={errors.title?.message}>
          <input
            id="title"
            type="text"
            {...register("title")}
            placeholder="Enter task name"
          />
        </Field>

        <Field label="Description" error={errors.description?.message}>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Enter task description"
          />
        </Field>

        <div className="form-row">
          <Field label="Status" error={errors.status?.message}>
            <select id="status" {...register("status")}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </Field>

          <Field label="Priority" error={errors.priority?.message}>
            <select id="priority" {...register("priority")}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </Field>
        </div>

        <Field label="Deadline" error={errors.deadline?.message}>
          <input
            id="deadline"
            type="datetime-local"
            {...register("deadline")}
          />
        </Field>

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="btn btn-primary btn-full"
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};
