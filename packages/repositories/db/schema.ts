import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const testimonialsTable = sqliteTable("testimonials", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  avatarUrl: text("avatarUrl").notNull(),
  profileUrl: text("profileUrl").notNull(),
  description: text("description").notNull(),
});

export type InsertPost = typeof testimonialsTable.$inferInsert;
export type SelectPost = typeof testimonialsTable.$inferSelect;

//export const postsTable = sqliteTable("posts", {
//  id: integer("id").primaryKey(),
//  title: text("title").notNull(),
//  content: text("content").notNull(),
//  userId: integer("user_id")
//    .notNull()
//    .references(() => usersTable.id, { onDelete: "cascade" }),
//  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
//  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
//});
//
//export type InsertUser = typeof usersTable.$inferInsert;
//export type SelectUser = typeof usersTable.$inferSelect;
//
//export type InsertPost = typeof postsTable.$inferInsert;
//export type SelectPost = typeof postsTable.$inferSelect;
