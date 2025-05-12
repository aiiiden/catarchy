declare namespace NodeJS {
  interface ProcessEnv {
    // General Settings
    ENV: 'dev' | 'prod';
    PORT: string;
    AUTH_CHAL_TTL_MIN: number;
    AUTH_JWT_EXP: string;
    AUTH_JWT_ISSUER: string;
  }
}
