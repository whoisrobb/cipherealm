import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const post = pgTable("post", {
    postId: uuid("postId").defaultRandom().primaryKey().notNull(),
    // TODO: implement user relations
    // TODO: implement comments
    // TODO: implement likes
    content: text("text"),
    fileUrl: text("fileUrl"),
    fileType: varchar("fileType"),
})

export type Post = typeof post.$inferSelect

/*
const postSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    fileUrl: {
      type: String,
      trim: true,
    },
    fileType: {
      type: String,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
*/