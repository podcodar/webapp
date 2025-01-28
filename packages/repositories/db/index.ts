import { createClient } from "@libsql/client";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import type { AppLoadContext } from "react-router";
import { membersTable, testimonialsTable } from "./schema";

config({ path: ".env" }); // or .env.local

export class Database {
  private db: ReturnType<typeof drizzle>;

  constructor(
    url = process.env.TURSO_CONNECTION_URL ?? "",
    authToken = process.env.TURSO_AUTH_TOKEN ?? "",
  ) {
    const client = createClient({ url, authToken });
    this.db = drizzle(client);
  }

  get testimonials() {
    return this.db.select().from(testimonialsTable);
  }

  get members() {
    return this.db.select().from(membersTable);
  }
}

export function getDatabase(context: AppLoadContext) {
  return new Database(
    context.cloudflare.env.TURSO_CONNECTION_URL,
    context.cloudflare.env.TURSO_AUTH_TOKEN,
  );
}
