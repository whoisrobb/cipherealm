"use server";

import { Product, ProductTable } from "@/db/schema";
import { getErrorMessage } from "./util";
import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { and, asc, desc, eq, gte, lte } from "drizzle-orm";
import { SearchParams } from "@/lib/types";
import { searchParamsSchema } from "@/lib/validators";

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
export const handleCreateOrUpdateProduct = async (product: ProductFormData, productId?: string) => {
    try {
        let data;

        if (productId) {
            data = await updateProduct(product, productId);
        } else {
            data = await createProduct(product);
        }
        
        revalidatePath('/admin/products');

        return { data }
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}

// CREATE NEW PRODUCT
const createProduct = async (product: ProductFormData) => {
    const data = await db.insert(ProductTable)
        .values(product)
        .returning({
            name: ProductTable.name,
        })
        .then((res) => res[0])
    
    return data
}

// UPDATE PRODUCT
const updateProduct = async (product: ProductFormData, productId: string) => {
    const data = await db
        .update(ProductTable)
        .set(product)
        .where(eq(ProductTable.productId, productId))
        .returning({
            name: ProductTable.name,
        })
        .then((res) => res[0])

    return data
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

// FETCH FILTERED PRODUCTS
export const handleFetchFilteredProducts = async (searchParams: SearchParams) => {
    try {
        const search = searchParamsSchema.parse(searchParams)
        const category = search.category?.split(".").toString() ?? null
        const subCategory = search.subcategory?.split(".").toString() ?? null
        const priceFrom = search.priceFrom?.split(".").toString() ?? null
        const priceTo = search.priceTo?.split(".").toString() ?? null
        const order = search.order?.split(".").toString() ?? "desc"
        const orderBy = search.orderBy?.split(".").toString() ?? "createdAt"
        const products = await db.select()
            .from(ProductTable)
            .where(
              and(
                category
                  ? eq(ProductTable.category, category)
                  : undefined,
                subCategory
                  ? eq(ProductTable.subcategory, subCategory)
                  : undefined,
                priceFrom ? gte(ProductTable.price, priceFrom) : undefined,
                priceTo ? lte(ProductTable.price, priceTo) : undefined
              )
            )
            .orderBy(
                orderBy === "price"
                    ? order === "asc"
                        ? asc(ProductTable.price)
                        : desc(ProductTable.price)
                : order === "asc"
                    ? asc(ProductTable.createdAt)
                    : desc(ProductTable.createdAt)
            )

        return { data: products };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

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

// DELETE PRODUCT
export const handleDeleteProduct = async (productId: string) => {
    try {
        await db.delete(ProductTable).where(eq(ProductTable.productId, productId));
        revalidatePath('/admin/products')

        return { resp: 'Product deleted successfully' }
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}