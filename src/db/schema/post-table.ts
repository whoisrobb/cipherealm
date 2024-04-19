import { relations, sql } from "drizzle-orm";
import { json, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { LikeTable } from "./like";
import { CommentTable } from "./comment";

export const PostTable = pgTable("post", {
    postId: uuid("postId").defaultRandom().primaryKey().notNull(),
    creatorId: uuid("creatorId").references(() => UserTable.userId).notNull(),
    // TODO: implement user relations
    // TODO: implement comments
    // TODO: implement likes
    content: text("text"),
    images: json("fileUrl").$type<string[] | null>().default(null),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
})

export const PostTableRelations = relations(PostTable, ({ one, many }) => {
  return ({
    user: one(UserTable, {
      fields: [PostTable.creatorId],
      references: [UserTable.userId]
    }),
    comment: many(CommentTable),
    like: many(LikeTable),
  })
})

export type Post = typeof PostTable.$inferSelect