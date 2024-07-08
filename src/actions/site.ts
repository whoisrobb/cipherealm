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
        })

        const temp = [{
            categoryId: '827e2-o92id-23u20-jd023ud0',
            title: 'Exhibit',
            subcategories: [{
                categoryId: '827e2-o92id-23u20-jd023ud0',
                title: 'Efdens',
                description: 'Efdens iko kwa kalatas',
                subcategoryId: 'k25e2-o9s87c-23u20-0kw9qd81'
            }]
        }]

        return { data: temp };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

// CREATE CATEGORY
export const createCategory = async (title: string) => {
    try {
        const category = await db.insert(CategoryTable)
            .values({
                title
            })
            .returning({
                title: CategoryTable.title
            })
            
            revalidatePath('/dashboard/site');

            return { data: category };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

// CREATE SUBCATEGORY
export const createSubcategory = async (
    { title, description, categoryId }:
    { title: string, description: string, categoryId: string }
) => {
    try {
        const subcategory = db.insert(SubcategoryTable)
            .values({ title, description, categoryId })
            .returning({
                title: SubcategoryTable.title
            });

            revalidatePath('/dashboard/site');

            return { data: subcategory };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};

// DELETE CATEGORY
export const deleteSubcategory = async (subcategoryId: string) => {
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