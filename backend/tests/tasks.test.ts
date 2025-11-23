import request from "supertest";
import app from "../src/app.js";
import { Task } from "../src/models/task.model.js";
import { User } from "../src/models/user.model.js";

describe("Tasks API", () => {
  let testUser: User;

  beforeAll(async () => {
    testUser = await User.findOrCreate({
      where: { email: "test@example.com" },
      defaults: {
        name: "Test User",
        email: "test@example.com",
      },
    }).then(([user]) => user);
  });

  beforeEach(async () => {
    await Task.destroy({ where: {}, force: true });
    // Ensure user exists
    testUser = await User.findOrCreate({
      where: { email: "test@example.com" },
      defaults: {
        name: "Test User",
        email: "test@example.com",
      },
    }).then(([user]) => user);
  });

  describe("GET /tasks", () => {
    it("should return 200 and empty array when no tasks exist", async () => {
      const response = await request(app).get("/tasks");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return 200 and all tasks", async () => {
      const task1 = await Task.create({
        title: "Task 1",
        description: "Description 1",
        status: "todo",
        priority: "high",
        userId: testUser.id,
      });

      const task2 = await Task.create({
        title: "Task 2",
        description: "Description 2",
        status: "in-progress",
        priority: "medium",
        userId: testUser.id,
      });

      const response = await request(app).get("/tasks");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe(task1.title);
      expect(response.body[1].title).toBe(task2.title);
    });

    it("should return 200 and filter tasks by status", async () => {
      await Task.create({
        title: "Todo Task",
        status: "todo",
        priority: "high",
        userId: testUser.id,
      });

      await Task.create({
        title: "In Progress Task",
        status: "in-progress",
        priority: "medium",
        userId: testUser.id,
      });

      const response = await request(app).get("/tasks?status=todo");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].status).toBe("todo");
    });

    it("should return 200 and filter tasks by priority", async () => {
      await Task.create({
        title: "High Priority Task",
        status: "todo",
        priority: "high",
        userId: testUser.id,
      });

      await Task.create({
        title: "Low Priority Task",
        status: "todo",
        priority: "low",
        userId: testUser.id,
      });

      const response = await request(app).get("/tasks?priority=high");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].priority).toBe("high");
    });

    it("should return 200 and filter tasks by createdAt", async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      await Task.create({
        title: "Old Task",
        status: "todo",
        priority: "medium",
        userId: testUser.id,
        createdAt: yesterday,
      });

      const today = new Date();
      await Task.create({
        title: "New Task",
        status: "todo",
        priority: "medium",
        userId: testUser.id,
        createdAt: today,
      });

      const filterDate = new Date();
      filterDate.setHours(0, 0, 0, 0);
      const filterDateString = filterDate.toISOString().split("T")[0];

      const response = await request(app).get(
        `/tasks?createdAt=${filterDateString}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it("should return 400 for invalid status filter", async () => {
      const response = await request(app).get("/tasks?status=invalid");

      expect(response.status).toBe(400);
    });

    it("should return 400 for invalid priority filter", async () => {
      const response = await request(app).get("/tasks?priority=invalid");

      expect(response.status).toBe(400);
    });
  });

  describe("GET /tasks/:id", () => {
    it("should return 200 and task details", async () => {
      const task = await Task.create({
        title: "Test Task",
        description: "Test Description",
        status: "todo",
        priority: "high",
        userId: testUser.id,
      });

      const response = await request(app).get(`/tasks/${task.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(task.id);
      expect(response.body.title).toBe("Test Task");
      expect(response.body.description).toBe("Test Description");
      expect(response.body.status).toBe("todo");
      expect(response.body.priority).toBe("high");
      expect(response.body.assignee).toBeDefined();
      expect(response.body.assignee.id).toBe(testUser.id);
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).get("/tasks/99999");

      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid task ID", async () => {
      const response = await request(app).get("/tasks/invalid");

      expect(response.status).toBe(400);
    });
  });

  describe("POST /tasks", () => {
    it("should return 201 and create a new task", async () => {
      const newTask = {
        title: "New Task",
        description: "New Description",
        status: "todo",
        priority: "medium",
        userId: testUser.id,
      };

      const response = await request(app).post("/tasks").send(newTask);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe("New Task");
      expect(response.body.description).toBe("New Description");
      expect(response.body.status).toBe("todo");
      expect(response.body.priority).toBe("medium");
      expect(response.body.userId).toBe(testUser.id);
      expect(response.body.id).toBeDefined();
    });

    it("should return 201 and create task with default values", async () => {
      const newTask = {
        title: "Task with Defaults",
        userId: testUser.id,
      };

      const response = await request(app).post("/tasks").send(newTask);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe("todo");
      expect(response.body.priority).toBe("medium");
    });

    it("should return 400 when title is missing", async () => {
      const newTask = {
        description: "Description without title",
        userId: testUser.id,
      };

      const response = await request(app).post("/tasks").send(newTask);

      expect(response.status).toBe(400);
    });

    it("should return 400 when title is empty", async () => {
      const newTask = {
        title: "",
        userId: testUser.id,
      };

      const response = await request(app).post("/tasks").send(newTask);

      expect(response.status).toBe(400);
    });

    it("should return 400 when userId is missing", async () => {
      const newTask = {
        title: "Task without userId",
      };

      const response = await request(app).post("/tasks").send(newTask);

      expect(response.status).toBe(400);
    });

    it("should return 400 for invalid status", async () => {
      const newTask = {
        title: "Task",
        status: "invalid-status",
        userId: testUser.id,
      };

      const response = await request(app).post("/tasks").send(newTask);

      expect(response.status).toBe(400);
    });

    it("should return 400 for invalid priority", async () => {
      const newTask = {
        title: "Task",
        priority: "invalid-priority",
        userId: testUser.id,
      };

      const response = await request(app).post("/tasks").send(newTask);

      expect(response.status).toBe(400);
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should return 200 and update task", async () => {
      const task = await Task.create({
        title: "Original Title",
        description: "Original Description",
        status: "todo",
        priority: "low",
        userId: testUser.id,
      });

      const updateData = {
        title: "Updated Title",
        description: "Updated Description",
        status: "in-progress",
        priority: "high",
      };

      const response = await request(app)
        .put(`/tasks/${task.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Updated Title");
      expect(response.body.description).toBe("Updated Description");
      expect(response.body.status).toBe("in-progress");
      expect(response.body.priority).toBe("high");
    });

    it("should return 200 and partially update task", async () => {
      const task = await Task.create({
        title: "Original Title",
        status: "todo",
        priority: "medium",
        userId: testUser.id,
      });

      const updateData = {
        status: "done",
      };

      const response = await request(app)
        .put(`/tasks/${task.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Original Title");
      expect(response.body.status).toBe("done");
    });

    it("should return 404 for non-existent task", async () => {
      const updateData = {
        title: "Updated Title",
      };

      const response = await request(app).put("/tasks/99999").send(updateData);

      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid task ID", async () => {
      const updateData = {
        title: "Updated Title",
      };

      const response = await request(app)
        .put("/tasks/invalid")
        .send(updateData);

      expect(response.status).toBe(400);
    });

    it("should return 400 for invalid status", async () => {
      const task = await Task.create({
        title: "Task",
        status: "todo",
        priority: "medium",
        userId: testUser.id,
      });

      const updateData = {
        status: "invalid-status",
      };

      const response = await request(app)
        .put(`/tasks/${task.id}`)
        .send(updateData);

      expect(response.status).toBe(400);
    });

    it("should return 400 for invalid priority", async () => {
      const task = await Task.create({
        title: "Task",
        status: "todo",
        priority: "medium",
        userId: testUser.id,
      });

      const updateData = {
        priority: "invalid-priority",
      };

      const response = await request(app)
        .put(`/tasks/${task.id}`)
        .send(updateData);

      expect(response.status).toBe(400);
    });

    it("should return 400 when title is empty", async () => {
      const task = await Task.create({
        title: "Task",
        status: "todo",
        priority: "medium",
        userId: testUser.id,
      });

      const updateData = {
        title: "",
      };

      const response = await request(app)
        .put(`/tasks/${task.id}`)
        .send(updateData);

      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should return 204 and delete task", async () => {
      const task = await Task.create({
        title: "Task to Delete",
        status: "todo",
        priority: "medium",
        userId: testUser.id,
      });

      const response = await request(app).delete(`/tasks/${task.id}`);

      expect(response.status).toBe(204);

      const deletedTask = await Task.findByPk(task.id);
      expect(deletedTask).toBeNull();
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).delete("/tasks/99999");

      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid task ID", async () => {
      const response = await request(app).delete("/tasks/invalid");

      expect(response.status).toBe(400);
    });
  });
});
