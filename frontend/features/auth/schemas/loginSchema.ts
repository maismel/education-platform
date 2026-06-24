import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password length can not be less than 6"),
});
