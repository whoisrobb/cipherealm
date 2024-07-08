import { relations, sql } from "drizzle-orm";
import { decimal, integer, json, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { DownloadVerificationTable } from "./download-verification-table";


export const ProductTable = pgTable("product", {
    productId: uuid("productId").defaultRandom().primaryKey().notNull(),
    name: varchar("name").notNull(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    images: json("images").$type<string[] | null>().default(null),
    size: json("size").$type<string[] | null>().default(null),
    gender: varchar("gender"),
    discount: integer("discount").notNull().default(0),
    inventory: integer("inventory").notNull().default(0),
    category: varchar("category"),
    subcategory: varchar("subcategory"),
    rating: integer("rating").notNull().default(0),
    tags: json("tags").$type<string[] | null>().default(null),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const ProductTableRelations = relations(
    ProductTable, ({ many }) => {
        return {
            downloadVerifications: many(DownloadVerificationTable),
        }
    }
);

export type Product = typeof ProductTable.$inferSelect;