/// <reference types="jest" />
import db from "../src/config/database.js";
import { Task } from "../src/models/task.model.js";
import { User } from "../src/models/user.model.js";

beforeAll(async () => {
  // Sync database before all tests
  await db.sync({ force: true });
});

beforeEach(async () => {
  // Clear all data before each test
  await Task.destroy({ where: {}, force: true });
  await User.destroy({ where: {}, force: true });
});

afterAll(async () => {
  // Close database connection after all tests
  await db.close();
});
