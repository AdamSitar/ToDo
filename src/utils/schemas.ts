import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, { message: "Field cannot be empty!" }),
  description: z.string(),
  deadline: z.string(),
});

export type NoteSchemaType = z.infer<typeof noteSchema>;

export const listSchema = z.object({
  title: z.string().min(1, { message: "Field cannot be empty!" }),
});

export type ListSchemaType = z.infer<typeof listSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Field cannot be empty!" }),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters!" }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
