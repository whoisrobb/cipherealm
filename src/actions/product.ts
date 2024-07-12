"use server";

import { Product, ProductTable } from "@/db/schema";
import { getErrorMessage } from "./util";
import db from "@/db/drizzle";

export type ProductFormData = {
    images: string[] | null;
    name: string;
    description: string;
    category: string;
    subcategory: string;
    price: string;
    discount: string;
    inventory: string;
    tags: string;
    gender: "male" | "female" | "unisex";
}

// CREATE NEW PRODUCT
export const handleCreateProduct = async (product: ProductFormData) => {
    try {
        const created = await db.insert(ProductTable)
            .values(product)
            .returning()

        return { data: created[0] }
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}