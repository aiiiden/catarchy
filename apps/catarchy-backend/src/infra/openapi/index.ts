import { openapi } from "@elysiajs/openapi";

export const openapiPlugin = () =>
  openapi({
    // enabled: getEnv().ENVIRONMENT === ENVIRONMENT.LOCAL,
    documentation: {
      info: {
        title: "Catarchy API",
        version: "1.0.0",
        description: "API documentation for Catarchy Backend",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });
