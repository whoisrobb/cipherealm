import { pgTable, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { PostTable } from "./post-table";
import { CommentTable } from "./comment";
import { relations } from "drizzle-orm";
import { generateUUID } from "../../lib/utils";

export const LikeTable = pgTable("like", {
    likeId: varchar("likeId").$defaultFn(() => generateUUID()).primaryKey(),
    userId: varchar("userId").references(() => UserTable.userId).notNull(),
    postId: varchar("postId").references(() => PostTable.postId),
    commentId: varchar("commentId").references(() => CommentTable.commentId)
});

export const LikeTableRelations = relations(LikeTable, ({ one }) => {
    return ({
        user: one(UserTable, {
            fields: [LikeTable.userId],
            references: [UserTable.userId]
        }),
        post: one(PostTable, {
            fields: [LikeTable.postId],
            references: [PostTable.postId]
        }),
        comment: one(CommentTable, {
            fields: [LikeTable.commentId],
            references: [CommentTable.commentId]
        }),
    })
});

export type Like = typeof LikeTable.$inferSelect;