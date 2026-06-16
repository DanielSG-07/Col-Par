import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const COUNTER_API_KEY = process.env.VITE_COUNTER_API_KEY || '';

  return {
    plugins: [react(), tailwindcss()],
    base: '/Col-Par/',
    server: {
      proxy: {
        // Proxy /api/counter to Counter API v2 to avoid CORS during development
        '/api/counter': {
          target: 'https://api.counterapi.dev',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/counter/, '/v2/daniel-garcias-team-4475/first-counter-4475'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              if (COUNTER_API_KEY) {
                proxyReq.setHeader('Authorization', `Bearer ${COUNTER_API_KEY}`);
              }
            });
          },
        },
      },
    },
  };
});
