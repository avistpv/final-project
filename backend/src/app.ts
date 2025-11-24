import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import taskRoutes from "./routes/task.routes.js";
import AppError from "./errors.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/tasks", taskRoutes);

app.use(
  (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    if (err instanceof AppError) {
      if (process.env.NODE_ENV !== "test") {
        console.error(err);
      }
      return res.status(err.statusCode).send(err.message);
    }

    console.error(err);
    res.status(500).send("Internal server error");
  },
);

export default app;
