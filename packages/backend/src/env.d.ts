declare namespace NodeJS {
  interface ProcessEnv {
    // General Settings
    ENV: 'dev' | 'prod';
    PORT: string;
  }
}
