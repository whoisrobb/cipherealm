import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { PostTable } from "./post-table";
import { LikeTable } from "./like";

export const CommentTable = pgTable("comment", {
    commentId: uuid("commentId").defaultRandom().primaryKey().notNull(),
    content: text("text").notNull(),
    userId: uuid("userId").references(() => UserTable.userId).notNull(),
    postId: uuid("postId").references(() => PostTable.postId).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
    // TODO: implement user relation
    // TODO: implement post relation
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
})

export type Comment = typeof CommentTable.$inferSelect;