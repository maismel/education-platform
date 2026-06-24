import { courseSchema } from "@/features/courses/schemas/courseSchema";
import z from "zod";

export const adminCourseSchema = courseSchema.extend({
  teacherId: z.string().min(1, "Teacher is required"),
});
