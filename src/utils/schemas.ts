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
