import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { db } from "@repo/database";
import { user } from "@repo/database";
import { count } from "drizzle-orm";
import { z } from "zod";

const healthResponse = z.object({
  status: z.string(),
  database: z.string(),
  userCount: z.number(),
  timestamp: z.string(),
});

const route = createRoute({
  method: "get",
  path: "/health",
  tags: ["System"],
  responses: {
    200: {
      content: { "application/json": { schema: healthResponse } },
      description: "Service is healthy",
    },
  },
});

const healthRoute = new OpenAPIHono();

healthRoute.openapi(route, async (c) => {
  const [result] = await db.select({ count: count() }).from(user);
  return c.json(
    {
      status: "healthy",
      database: "connected",
      userCount: result?.count ?? 0,
      timestamp: new Date().toISOString(),
    },
    200,
  );
});

export { healthRoute };
