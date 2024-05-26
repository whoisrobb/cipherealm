import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { PostTable } from "./post-table";
import { LikeTable } from "./like";
import { generateUUID } from "../../lib/utils";

export const CommentTable = pgTable("comment", {
    commentId: varchar("commentId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    content: text("text").notNull(),
    userId: varchar("userId").references(() => UserTable.userId).notNull(),
    postId: varchar("postId").references(() => PostTable.postId).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const CommentTableRelations = relations(CommentTable, ({ one, many }) => {
    return ({
        creator: one(UserTable, {
            fields: [CommentTable.userId],
            references: [UserTable.userId]
        }),
        post: one(PostTable, {
            fields: [CommentTable.postId],
            references: [PostTable.postId]
        }),
        likes: many(LikeTable)
    })
});

export type Comment = typeof CommentTable.$inferSelect;