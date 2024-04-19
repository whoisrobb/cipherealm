import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { CommunityTable } from "./community";

export const CommunityMembershipTable = pgTable("communityMembership", {
    userId: varchar("userId").references(() => UserTable.userId),
    communityId: varchar("communityId").references(() => CommunityTable.communityId),
}, table => {
    return {
        pk: primaryKey({ columns: [table.userId, table.communityId] })
    }
})