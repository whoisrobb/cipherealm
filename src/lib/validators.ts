import { z } from "zod";

export const storeSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
})

export const productSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
    category: z.string().min(3).max(255),
    subcategory: z.string().min(3).max(255),
    price: z.string().default('0'),
    discount: z.string().default('0'),
    inventory: z.string().default('0'),
    tags: z.string().min(3).max(50),
    gender: z.enum(["male", "female", "unisex"], {
        required_error: "You need to select a gender.",
    }),
})

export const categorySchema = z.object({
    title: z.string().min(3).max(50),
})

export const subcategorySchema = z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
});

export const searchParamsSchema = z.object({
    // page: z.coerce.number().default(1),
    // per_page: z.coerce.number().default(10),
    priceTo: z.string().optional(),
    priceFrom: z.string().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    order: z.string().optional(),
    orderBy: z.string().optional(),
})

export const signupSchema = z.object({
    firstName: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
})
    .superRefine(
    ({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords must match",
            path: ["confirmPassword"],
        });
        }
    }
);

export const signinSchema = z.object({
    email: z.string().min(3).max(255),
    password: z.string().min(6).max(100)
});