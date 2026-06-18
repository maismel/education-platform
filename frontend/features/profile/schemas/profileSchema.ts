import z from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(15),
  lastName: z.string().min(1, "Last Name is required").max(15),
  bio: z.string().max(150),
});
