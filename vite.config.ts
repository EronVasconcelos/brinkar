import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          id: 'brinkar-ia-app', // ID único para o PWA
          name: 'Brinkar.IA - Brincadeiras Inteligentes',
          short_name: 'Brinkar.IA',
          description: 'Um assistente inteligente especializado em criar brincadeiras personalizadas, seguras e educativas.',
          theme_color: '#e0f2fe',
          background_color: '#e0f2fe',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
        }
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});