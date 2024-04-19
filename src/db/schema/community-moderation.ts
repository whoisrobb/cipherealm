import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { CommunityTable } from "./community";

export const CommunityModerationTable = pgTable("communityModerator", {
    userId: varchar("userId").references(() => UserTable.userId),
    communityId: varchar("communityId").references(() => CommunityTable.communityId),
}, table => {
    return {
        pk: primaryKey({ columns: [table.userId, table.communityId] })
    }
})