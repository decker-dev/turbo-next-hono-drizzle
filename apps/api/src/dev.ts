import { serve } from "@hono/node-server";
import { app } from "./app";

const port = 3011;

serve({ fetch: app.fetch, port }, () => {
  console.log(`API running on http://localhost:${port}`);
});
