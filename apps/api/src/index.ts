import { Hono } from "hono";
import { db, user, count } from "@repo/database";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/health", async (c) => {
  const [result] = await db.select({ count: count() }).from(user);
  return c.json({
    status: "healthy",
    database: "connected",
    userCount: result?.count ?? 0,
    timestamp: new Date().toISOString(),
  });
});

export default app;
