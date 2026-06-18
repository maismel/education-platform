import z from "zod";

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password length should be more than 6"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  bio: z.string().optional(),
});
