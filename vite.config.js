import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      devOptions: {
        // Disable PWA in development mode
        enabled: false,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        globDirectory: 'dist',
        globIgnores: ['**/node_modules/**/*']
      },
      manifest: {
        name: 'Expenso',
        short_name: 'Expenso',
        description: 'Track your expenses and budgets',
        theme_color: '#0061a4',
        background_color: '#fdfcff',
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
        ],
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait'
      }
    })
  ],
  server: {
    port: 3000
  },
  // Add base config for production deployments
  base: './'
});
