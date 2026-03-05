import { z } from "zod";

export enum ENVIRONMENT {
  LOCAL = "local",
  PRODUCTION = "production",
}

export const envSchema = z.object({
  ENVIRONMENT: z.enum([ENVIRONMENT.LOCAL, ENVIRONMENT.PRODUCTION]),
  CORS_ORIGIN: z
    .string()
    .transform((v) => v.split(",").map((s) => s.trim()))
    .pipe(z.array(z.url())),
  RESEND_API_KEY: z.string(),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  REFRESH_JWT_SECRET: z
    .string()
    .min(32, "REFRESH_JWT_SECRET must be at least 32 characters"),
});

export type Env = z.infer<typeof envSchema>;

export type CloudflareBindings = {
  DB: D1Database;
  RESEND_API_KEY: string;
  JWT_SECRET: string;
  REFRESH_JWT_SECRET: string;
};

let _env: Env | null = null;

export function initEnv(raw: unknown): Env {
  if (_env) return _env;
  _env = envSchema.parse(raw);
  return _env;
}

export function getEnv(): Env {
  if (!_env) {
    // fallback: process.env (local dev without explicit initEnv call)
    _env = envSchema.parse(process.env);
  }
  return _env;
}
