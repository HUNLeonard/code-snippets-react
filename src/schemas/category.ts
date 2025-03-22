import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 character long!"),
  image: z.string(),
});

export type categorySchema = z.infer<typeof categoryFormSchema>;
