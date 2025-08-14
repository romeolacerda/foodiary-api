import { z, ZodError } from "zod";

export const envSchema = z.object({
  COGNITO_CLIENT_ID: z.string().min(1)
})

export type Env = z.infer<typeof envSchema>

function getEnv() {
  try {
    return envSchema.parse(process.env)

  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(JSON.stringify(error, null, 2))
    }

    throw error
  }
}

export const env = getEnv()
