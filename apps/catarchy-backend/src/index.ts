import { env as cfEnv } from "cloudflare:workers";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import { createApp } from "./app";
import { initAI } from "./infra/ai";
import { initDatabase } from "./infra/db";
import { initEmail } from "./infra/email/service";
import { initKV } from "./infra/kv";
import { initEnv, type CloudflareBindings } from "./lib/env";

export type { App } from "./app";

// Env Initialization
const env = initEnv(cfEnv as Record<string, string> & CloudflareBindings);

// Init Singletons
initDatabase((cfEnv as unknown as CloudflareBindings).DB);
initKV((cfEnv as unknown as CloudflareBindings).CONSENSUS_CACHE);
initAI(env.ANTHROPIC_API_KEY);
initEmail(env.RESEND_API_KEY);

export default createApp({ adapter: CloudflareAdapter }).compile();
