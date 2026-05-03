import { env as cfEnv } from "cloudflare:workers";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import { createApp } from "./app";
import { initAI } from "./infra/ai";
import { initDatabase } from "./infra/db";
import { initEmail } from "./infra/email/service";
import { type CloudflareBindings, initEnv } from "./lib/env";
import { scheduledHandler } from "./scheduled";

export type { App } from "./app";

// Env Initialization
const env = initEnv(cfEnv as Record<string, string> & CloudflareBindings);

// Init Singletons
const bindings = cfEnv as unknown as CloudflareBindings;
initDatabase(bindings.DB);
initAI({
  anthropicApiKey: env.ANTHROPIC_API_KEY,
  openaiApiKey: env.OPENAI_API_KEY,
  googleAiApiKey: env.GOOGLE_AI_API_KEY,
  mistralApiKey: env.MISTRAL_API_KEY,
  xaiApiKey: env.XAI_API_KEY,
  alibabaApiKey: env.ALIBABA_API_KEY,
});
initEmail(env.RESEND_API_KEY);

export const scheduled = scheduledHandler;

export default createApp({ adapter: CloudflareAdapter }).compile();
