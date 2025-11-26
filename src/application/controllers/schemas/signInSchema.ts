import z from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Required is required").email("Invalid email"),
  password: z.string().min(8, "Password should be equal or higher than 8 characthers"),
});

export type SignInBody = z.infer<typeof signInSchema>;
