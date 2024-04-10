import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const community = pgTable("community", {
    communityId: uuid("communityId").defaultRandom().primaryKey().notNull(),
    description: text("description").notNull(),
    // TODO: implement community moderators with users relations
    // TODO: implement community members with users relations
    // TODO: implement community banner
    // TODO: implement community mascot/image
})

export type Community = typeof community.$inferSelect

/*
const communitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    banner: {
      type: String,
    },

    moderators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    bannedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
*/