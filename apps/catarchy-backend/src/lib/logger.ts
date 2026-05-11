import { ENVIRONMENT, getEnv } from "./env";
import { AppError } from "./error";

export const logger = {
  request(requestId: string, method: string, path: string) {
    console.log(`[REQ] ${requestId} ${method} ${path}`);
  },
  response(requestId: string, status: number, method: string, path: string) {
    console.log(`[RES] ${requestId} ${status} ${method} ${path}`);
  },
  error(requestId: string, error: unknown) {
    const env = getEnv();
    const isLocal = env.ENVIRONMENT === ENVIRONMENT.LOCAL;

    if (error instanceof AppError) {
      console.log(`[ERR / APP] ${requestId} ${error.code}: ${error.message}`);
      return;
    }

    if (error instanceof Error) {
      console.log(`[ERR / NODE] ${requestId} ${error.name}: ${error.message}`);
      if (isLocal && error.stack) console.error(error.stack);
      return;
    }

    console.log(`[ERR] ${requestId}`, error);
  },
  info(message: string, ...args: unknown[]) {
    console.log(`[INF] ${message}`, ...args);
  },
};
