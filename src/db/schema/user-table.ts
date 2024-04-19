import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { PostTable } from "./post-table";

export const UserTable = pgTable("user", {
    userId: uuid("userId").primaryKey().notNull(),
    username: varchar("username").notNull(),
    bio: text("bio").default(""),
    avatar: varchar("avatar").default(""),
    createdAt: timestamp("createdAt").defaultNow().notNull()
    // TODO: implement followers, user relations 
    // TODO: implement following, user relations 
    // TODO: implement saved posts, post relations 
});

export const UserTableRelations = relations(UserTable, ({ many }) => {
  return ({
    posts: many(PostTable)
  })
})

export type User = typeof UserTable.$inferSelect