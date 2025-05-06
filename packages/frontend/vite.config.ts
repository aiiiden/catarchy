import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Tailwind CSS Plugin
import tailwindcss from '@tailwindcss/vite';

// Tanstack Router Plugin
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    VITE_ENVIRONMENT: JSON.stringify(process.env.VITE_ENVIRONMENT),
    VITE_REOWN_APPKIT_PROJECT_ID: JSON.stringify(
      process.env.VITE_REOWN_APPKIT_PROJECT_ID,
    ),
    VITE_API_HOST: JSON.stringify(process.env.VITE_API_HOST),
  },
});
