import { pgTable, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { PostTable } from "./post-table";
import { CommentTable } from "./comment";
import { relations } from "drizzle-orm";

export const LikeTable = pgTable("like", {
    likeId: uuid("likeId").defaultRandom().primaryKey(),
    userId: uuid("userId").references(() => UserTable.userId).notNull(),
    postId: uuid("postId").references(() => PostTable.postId),
    commentId: uuid("commentId").references(() => CommentTable.commentId)
    // TODO: implement user relations
    // TODO: implement post relations
    // TODO: implement comment relations
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
})

export type Like = typeof LikeTable.$inferSelect;