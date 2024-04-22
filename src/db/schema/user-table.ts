import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { PostTable } from "./post-table";
import { generateUUID } from "@/lib/utils/utils";

export const UserTable = pgTable("user", {
    userId: varchar("userId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    username: varchar("username").notNull(),
    email: varchar("email").notNull(),
    bio: text("bio").default(""),
    avatar: varchar("avatar").default(""),
    createdAt: timestamp("createdAt").defaultNow().notNull()
});

export const UserTableRelations = relations(UserTable, ({ many }) => {
  return ({
    posts: many(PostTable)
  })
})

export type User = typeof UserTable.$inferSelect