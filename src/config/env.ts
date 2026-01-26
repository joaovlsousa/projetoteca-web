import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_URL: z.url(),
  VITE_API_URL: z.url(),
  VITE_GITHUB_OAUTH_CLIENT_ID: z.string(),
  VITE_GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.url(),
})

export const env = envSchema.parse(import.meta.env)
