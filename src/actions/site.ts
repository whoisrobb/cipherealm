"use server";

import db from "@/db/drizzle";
import { CategoryTable, SubcategoryTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "./util";


// GET ALL CATEGORIES
export const getCategories = async () => {
    try {
        const categories = await db.query.CategoryTable.findMany({
            with: {
                subcategories: true
            }
        });

        return { data: categories };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

// CREATE CATEGORY
export const handleCreateCategory = async (title: string) => {
    try {
        const category = await db.insert(CategoryTable)
            .values({
                title
            })
            .returning({
                title: CategoryTable.title
            })
            
            revalidatePath('/admin/site');

            return { data: category[0] };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

// CREATE SUBCATEGORY
export const handleCreateSubcategory = async (
    { title, description, categoryId }:
    { title: string, description: string, categoryId: string }
) => {
    try {
        const subcategory = await db.insert(SubcategoryTable)
            .values({ title, description, categoryId })
            .returning({
                title: SubcategoryTable.title
            });

            revalidatePath('/admin/site');

            return { data: subcategory[0] };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

// DELETE CATEGORY
export const handleDeleteSubcategory = async (subcategoryId: string) => {
    try {
        await db.delete(SubcategoryTable)
            .where(eq(SubcategoryTable.subcategoryId, subcategoryId))
            
            revalidatePath('/dashboard/site');

            return { data: "Deleted successfully" };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

// DELETE CATEGORY
export const deleteCategory = async (categoryId: string) => {
    try {
        await db.delete(CategoryTable)
            .where(eq(CategoryTable.categoryId, categoryId))
            
            revalidatePath('/dashboard/site');

            return { data: "Deleted successfully" };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};