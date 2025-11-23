import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { z } from "zod";
import {
  getAllTasks,
  getTask,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from "../controllers/task.controller.js";
import AppError from "../errors.js";
import { TASK_STATUSES, TASK_PRIORITIES } from "../types/task.types.js";

const router = Router();

const taskStatusEnum = z.enum(
  TASK_STATUSES as unknown as [string, ...string[]],
);
const taskPriorityEnum = z.enum(
  TASK_PRIORITIES as unknown as [string, ...string[]],
);

const queryParamsSchema = z.object({
  createdAt: z.string().optional(),
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
});

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  deadline: z.string().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  deadline: z.string().optional(),
});

function validateZodSchema(
  schema: z.ZodSchema,
  errorMessage?: string,
  useQuery = false,
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = useQuery ? req.query : req.body;
      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message =
          errorMessage || error.issues.map((e) => e.message).join(", ");
        return next(new AppError(message, 400));
      }
      next(error);
    }
  };
}

const validateQueryParams = validateZodSchema(
  queryParamsSchema,
  "Invalid query parameters",
  true,
);
const validateCreateTask = validateZodSchema(createTaskSchema);
const validateUpdateTask = validateZodSchema(updateTaskSchema);

router.get("/", validateQueryParams, getAllTasks);
router.get("/:id", getTask);
router.post("/", validateCreateTask, createTaskHandler);
router.put("/:id", validateUpdateTask, updateTaskHandler);
router.delete("/:id", deleteTaskHandler);

export default router;
