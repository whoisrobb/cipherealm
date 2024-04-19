import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { CommunityTable } from "./community";

export const CommunityMembershipTable = pgTable("communityMembership", {
    userId: uuid("userId").references(() => UserTable.userId),
    communityId: uuid("communityId").references(() => CommunityTable.communityId),
}, table => {
    return {
        pk: primaryKey({ columns: [table.userId, table.communityId] })
    }
})