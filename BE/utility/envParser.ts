import { z } from "zod";

const envSchema = z.object({
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
    PORT: z.string().min(1),
    MONGO_URL: z.string().min(1),
    API_KEY: z.string(),
    REDIRECT_URI: z.string(),
    JWT_SECRET_KEY: z.string(),
    TEST_TOKEN: z.string(),
    TEST_SUB: z.string(),
    GOOGLE_TEST_TOKEN: z.string(),
  });

export const env = envSchema.parse(process.env);
  