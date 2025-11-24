import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateTaskForm } from "../components/CreateTaskForm";

describe("CreateTaskForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnSubmit.mockResolvedValue(undefined);
  });

  describe("Submit button state", () => {
    it("has submit button disabled when form is empty", async () => {
      render(<CreateTaskForm onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole("button", { name: /create task/i });
      expect(submitButton).toBeDisabled();
    });

    it("enables submit button when form is valid", async () => {
      const user = userEvent.setup();
      render(<CreateTaskForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/task name/i);

      await user.type(titleInput, "Valid Task Name");

      const submitButton = screen.getByRole("button", { name: /create task/i });

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe("Validation errors", () => {
    it("shows validation error message when title is empty", async () => {
      const user = userEvent.setup();
      render(<CreateTaskForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/task name/i);

      await user.clear(titleInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      });

      const submitButton = screen.getByRole("button", { name: /create task/i });
      expect(submitButton).toBeDisabled();
    });

    it("shows validation error message when title is empty and touched", async () => {
      const user = userEvent.setup();
      render(<CreateTaskForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/task name/i);

      await user.click(titleInput);
      await user.clear(titleInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      });

      const submitButton = screen.getByRole("button", { name: /create task/i });
      expect(submitButton).toBeDisabled();
    });

    it("clears error message when field becomes valid", async () => {
      const user = userEvent.setup();
      render(<CreateTaskForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/task name/i);

      await user.clear(titleInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      });

      await user.type(titleInput, "Valid Title");

      await waitFor(() => {
        expect(
          screen.queryByText(/title is required/i),
        ).not.toBeInTheDocument();
      });
    });
  });

  it("submits form with correct data when valid", async () => {
    const user = userEvent.setup();
    render(<CreateTaskForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/task name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const statusSelect = screen.getByLabelText(/status/i);
    const prioritySelect = screen.getByLabelText(/priority/i);

    await user.type(titleInput, "New Task");
    await user.type(descriptionInput, "Task description");
    await user.selectOptions(statusSelect, "in-progress");
    await user.selectOptions(prioritySelect, "high");

    const submitButton = screen.getByRole("button", { name: /create task/i });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "New Task",
          description: "Task description",
          status: "in-progress",
          priority: "high",
          userId: 1,
        }),
      );
    });
  });

  it("disables submit button when isLoading is true", () => {
    render(<CreateTaskForm onSubmit={mockOnSubmit} isLoading={true} />);

    const submitButton = screen.getByRole("button", { name: /creating/i });
    expect(submitButton).toBeDisabled();
  });

  it("renders all form fields", () => {
    render(<CreateTaskForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/task name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
  });

  it("has default values for status and priority", () => {
    render(<CreateTaskForm onSubmit={mockOnSubmit} />);

    const statusSelect = screen.getByLabelText(/status/i) as HTMLSelectElement;
    const prioritySelect = screen.getByLabelText(
      /priority/i,
    ) as HTMLSelectElement;

    expect(statusSelect.value).toBe("todo");
    expect(prioritySelect.value).toBe("medium");
  });
});
