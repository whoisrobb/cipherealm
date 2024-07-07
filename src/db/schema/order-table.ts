import { generateUUID } from "@/lib/utils";
import { relations, sql } from "drizzle-orm";
import { boolean, decimal, json, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Product, ProductTable } from "./product-table";


export const OrderTable = pgTable("order", {
    orderId: uuid("orderId").defaultRandom().primaryKey().notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    isPaid: boolean("isPaid").default(false),
    products: json("products").$type<any | null>().default(null),
    address: text("address").default(""),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const OrderTableRelations = relations(
    OrderTable, ({ many }) => {
        return {
            products: many(ProductTable),
        }
    }
);

export type Order = typeof OrderTable.$inferSelect;