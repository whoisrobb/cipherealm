import { z } from "zod";

export const postInputSchema = z.object({
    content: z.string().min(3).max(255)
})