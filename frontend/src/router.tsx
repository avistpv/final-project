import { createBrowserRouter } from "react-router-dom";
import { TaskBoardPage } from "./features/tasks/pages/TaskBoardPage";
import { TaskDetailsPage } from "./features/tasks/pages/TaskDetailsPage";
import { CreateTaskPage } from "./features/tasks/pages/CreateTaskPage";
import Layout from "./shared/components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TaskBoardPage />,
      },
      {
        path: "/tasks",
        element: <TaskBoardPage />,
      },
      {
        path: "/tasks/create",
        element: <CreateTaskPage />,
      },
      {
        path: "/tasks/:id",
        element: <TaskDetailsPage />,
      },
    ],
  },
]);

export default router;
