import { Op, type WhereOptions } from "sequelize";
import AppError from "../errors.js";
import { Task, type TaskAttributes } from "../models/task.model.js";
import type { TaskStatus, TaskPriority } from "../types/task.types.js";
import type {
  TaskFilters,
  TaskCreateInput,
  TaskUpdateInput,
} from "../types/task.types.js";

type AppliedFilters = WhereOptions<TaskAttributes>;

const TASK_INCLUDE_OPTIONS = { include: ["assignee"] };

const findTaskWithAssignee = async (id: number) => {
  return await Task.findByPk(id, TASK_INCLUDE_OPTIONS);
};

const buildAppliedFilters = (
  filters?: TaskFilters,
): AppliedFilters | undefined => {
  const whereClause: AppliedFilters = {};

  if (filters?.status) {
    whereClause.status = filters.status;
  }

  if (filters?.priority) {
    whereClause.priority = filters.priority;
  }

  if (filters?.createdAt) {
    const createdAt = new Date(filters.createdAt);
    (
      whereClause as WhereOptions<TaskAttributes> & {
        createdAt?: { [Op.gte]: Date };
      }
    ).createdAt = {
      [Op.gte]: createdAt,
    };
  }

  return Object.keys(whereClause).length > 0 ? whereClause : undefined;
};

export const getTasks = async (filters?: TaskFilters) => {
  const whereClause = buildAppliedFilters(filters);

  return await Task.findAll({
    ...(whereClause && { where: whereClause }),
    ...TASK_INCLUDE_OPTIONS,
  });
};

export const getTaskById = async (id: number) => {
  return await findTaskWithAssignee(id);
};

export const createTask = async (input: TaskCreateInput) => {
  const createData: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    userId: number;
    deadline?: Date;
  } = {
    title: input.title,
    status: input.status || "todo",
    priority: input.priority || "medium",
    userId: input.userId,
  };

  if (input.description !== undefined) {
    createData.description = input.description;
  }

  if (input.deadline !== undefined) {
    createData.deadline = new Date(input.deadline);
  }

  const newTask = await Task.create(createData);

  return await findTaskWithAssignee(newTask.id);
};

export const updateTask = async (id: number, input: TaskUpdateInput) => {
  const task = await Task.findByPk(id);
  if (!task) {
    return null;
  }

  const updateData: Partial<TaskAttributes> = {};

  if (input.title !== undefined) {
    updateData.title = input.title;
  }
  if (input.description !== undefined) {
    updateData.description = input.description;
  }
  if (input.status !== undefined) {
    updateData.status = input.status;
  }
  if (input.priority !== undefined) {
    updateData.priority = input.priority;
  }
  if (input.deadline !== undefined) {
    updateData.deadline = input.deadline ? new Date(input.deadline) : undefined;
  }
  if (input.userId !== undefined) {
    updateData.userId = input.userId;
  }

  await task.update(updateData);

  return await findTaskWithAssignee(id);
};

export const deleteTask = async (id: number) => {
  const task = await Task.findByPk(id);
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await task.destroy();
  return task;
};
