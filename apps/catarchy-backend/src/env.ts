import { z } from "zod";

export const envSchema = z.object({
  CORS_ORIGIN: z
    .string()
    .transform((v) => v.split(",").map((s) => s.trim()))
    .pipe(z.array(z.url())),
});

export type Env = z.infer<typeof envSchema>;
