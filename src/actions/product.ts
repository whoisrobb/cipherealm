"use server";

import { Product, ProductTable } from "@/db/schema";
import { getErrorMessage } from "./util";
import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export type ProductFormData = {
    images: string[] | null;
    name: string;
    description: string;
    category: string;
    subcategory: string;
    price: string;
    discount: number;
    inventory: number;
    tags: string[];
    gender: "male" | "female" | "unisex";
}

// CREATE NEW PRODUCT
export const handleCreateProduct = async (product: ProductFormData) => {
    try {
        const created = await db.insert(ProductTable)
            .values(product)
            .returning()
        
        revalidatePath('/admin/products')

        return { data: created[0] }
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}

// FETCH ALL PRODUCTS
export const handleFetchAllProducts = async () => {
    try {
        const products = await db.query
            .ProductTable
            .findMany()

        return { data: products }
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}

// FETCH SINGLE PRODUCT
export const handleFetchSingleProduct = async (productId: string) => {
    try {
        const product = await db.query
            .ProductTable
            .findFirst({
                where: eq(ProductTable.productId, productId)
            });

        return { data: product }
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}