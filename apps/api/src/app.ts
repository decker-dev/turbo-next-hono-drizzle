import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { healthRoute } from "./routes/health";

const app = new OpenAPIHono();

app.route("/", healthRoute);

app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    title: "API",
    version: "1.0.0",
  },
});

app.get(
  "/docs",
  apiReference({
    url: "/openapi.json",
    theme: "kepler",
  }),
);

export { app };
