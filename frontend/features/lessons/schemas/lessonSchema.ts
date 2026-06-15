import { mergeDateAndTime } from "@/features/lessons/helpers/mergeDateAndTime";
import z from "zod";

export const lessonSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),

    startsAtDate: z.date({
      message: "Start date is required",
    }),

    startsAtTime: z.date({
      message: "Start time is required",
    }),

    endsAtTime: z.date({
      message: "End time is required",
    }),
  })
  .refine(
    (data) => {
      const start = mergeDateAndTime(data.startsAtDate, data.startsAtTime);
      const end = mergeDateAndTime(data.startsAtDate, data.endsAtTime);

      if (!start || !end) return false;

      return end > start;
    },
    {
      message: "End date must be after start date",
      path: ["endsAtDate"],
    },
  );
