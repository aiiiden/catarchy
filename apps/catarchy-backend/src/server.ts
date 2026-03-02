import { createApp } from "./app";
import { envSchema } from "./env";

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid environment variables:");
  for (const issue of result.error.issues) {
    console.error(`  ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

const app = createApp({ env: result.data }).listen(3000);

console.log(
  `🦊 Catarchy Backend is running at ${app.server?.hostname}:${app.server?.port}`,
);
console.log(
  `📖 OpenAPI docs available at http://localhost:${app.server?.port}/openapi`,
);
