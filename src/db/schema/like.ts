import { pgTable, uuid } from "drizzle-orm/pg-core";

const like = pgTable("like", {
    likeId: uuid("likeId").defaultRandom().primaryKey(),
    // TODO: implement user relations
    // TODO: implement post relations
    // TODO: implement comment relations
})

export type Like = typeof like.$inferSelect