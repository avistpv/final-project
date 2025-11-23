import app from "./app.js";
import db from "./config/database.js";
import { User } from "./models/user.model.js";

const PORT = 3000;

async function main() {
  try {
    await db.authenticate();
    console.log("Database connected successfully.");

    await db.sync({ alter: true });
    console.log("Database synced");

    // Create default user if it doesn't exist
    const [defaultUser] = await User.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: "Default User",
        email: "user@example.com",
      },
    });
    console.log("Default user ready:", defaultUser.name);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

main();
