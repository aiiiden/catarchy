import { openapi } from "@elysiajs/openapi";
// import { ENVIRONMENT, getEnv } from "../../lib/env";

export const openapiPlugin = () =>
  openapi({
    // enabled: getEnv().ENVIRONMENT === ENVIRONMENT.LOCAL,
    documentation: {
      info: {
        title: "Catarchy API",
        version: "1.0.0",
        description: "API documentation for Catarchy Backend",
      },
    },
  });
