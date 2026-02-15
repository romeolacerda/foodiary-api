import z from 'zod';

export const confirmForgotPasswordSchema = z.object({
  email: z.string().min(1, '"email" is required').email('Invalid email'),
  confirmationCode: z.string().min(1, '"confirmationCode" is required'),
  password: z
    .string()
    .min(8, '"passowrd" should be equal or higher than 8 characthers'),
});

export type ConfirmForgotPasswordBody = z.infer<
  typeof confirmForgotPasswordSchema
>;
