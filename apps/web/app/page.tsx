import { db } from "@repo/database";
import { user } from "@repo/database";
import { count } from "drizzle-orm";

export default async function Home() {
  const [result] = await db.select({ count: count() }).from(user);

  return (
    <div>
      <h1>Turbo + Next + Drizzle</h1>
      <p>Users in DB: {result?.count ?? 0}</p>
    </div>
  );
}
