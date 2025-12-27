import z from 'zod';

export const signUpSchema = z.object({
  account: z.object({
    password: z
      .string()
      .min(8, 'Password should be equal or higher than 8 characthers'),
    email: z.string().min(1, 'Required is required').email('Invalid email'),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
