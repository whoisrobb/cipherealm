import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const comment = pgTable("comment", {
    commentId: uuid("commentId").defaultRandom().primaryKey().notNull(),
    content: text("text").notNull(),
    // TODO: implement post relation
})

export type Comment = typeof comment.$inferSelect

/* const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);
*/