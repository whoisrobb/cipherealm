import { generateUUID } from "@/lib/utils/utils";
import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const CommunityTable = pgTable("community", {
    communityId: varchar("communityId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    name: varchar("name").notNull(),
    description: text("description").notNull(),
    banner: varchar("banner").default(""),
    icon: varchar("icon").default(""),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
    // TODO: implement community moderators with users relations
    // TODO: implement community members with users relations
})

export type Community = typeof CommunityTable.$inferSelect;