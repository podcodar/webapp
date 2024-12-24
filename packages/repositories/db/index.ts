import { createClient } from "@libsql/client";
import { raise } from "@packages/utils/typescript";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env" }); // or .env.local

const client = createClient({
	url:
		process.env.TURSO_CONNECTION_URL ?? raise("missing TURSO_CONNECTION_URL"),
	authToken: process.env.TURSO_AUTH_TOKEN ?? raise("missing TURSO_AUTH_TOKEN"),
});

export const db = drizzle(client);
