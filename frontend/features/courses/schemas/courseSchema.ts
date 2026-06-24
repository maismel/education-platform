import z from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.url("Invalid URL").optional().or(z.literal("")),
  teacherId: z.string().optional(),
});
