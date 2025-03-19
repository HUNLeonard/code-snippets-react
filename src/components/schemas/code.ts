import { z } from "zod";

export const codeFormSchema = z.object({
  name: z.string().min(2, "Code name must be at least 2 character long!"),
  code: z.string(),
  desc: z.string(),
  categories: z
    .string()
    .array()
    .min(1, "Code must contain at least 1 category!"),
});

export type codeSchema = z.infer<typeof codeFormSchema>;
