import { z } from "zod";

export const gradeSchema = z.object({
  score: z
    .number()
    .min(0, "Score must be at least 0")
    .max(100, "Score cannot exceed 100"),
  feedback: z.string().optional(),
});
