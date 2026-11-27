import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  define: { __BUILD__: JSON.stringify(new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })) },
  build: {
    rollupOptions: {
      output: {
        // traducerile explicațiilor (src/i18n/content/<limbă>/*.json) primesc prefixul „tr-”,
        // ca să nu intre în pachetul descărcat la fiecare actualizare (vezi globIgnores mai jos)
        chunkFileNames: (chunk) =>
          chunk.facadeModuleId && /[\\/]i18n[\\/]content[\\/]/.test(chunk.facadeModuleId)
            ? 'assets/tr-[name]-[hash].js'
            : 'assets/[name]-[hash].js',
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Poliglot — Spaniolă, Italiană, Japoneză',
        short_name: 'Poliglot',
        description: 'Învață spaniolă, italiană și japoneză, și offline.',
        lang: 'ro',
        theme_color: '#c2552d',
        background_color: '#1a1210',
        display: 'standalone',
        orientation: 'any',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
        // traducerile se descarcă doar pentru limba folosită (la prima nevoie) și rămân apoi în cache
        globIgnores: ['**/assets/tr-*.js'],
        // versiunea nouă preia controlul imediat ce s-a descărcat
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 32 * 1024 * 1024,
        // vocile înregistrate: salvate la prima redare; Safari cere fișierele „pe bucăți” (Range)
        runtimeCaching: [
          {
            // numele conțin amprenta conținutului, deci un fișier odată salvat nu se mai schimbă
            urlPattern: /\/assets\/tr-[^/]+\.js$/,
            handler: 'CacheFirst',
            options: { cacheName: 'poliglot-translations', expiration: { maxEntries: 4000, purgeOnQuotaError: true }, cacheableResponse: { statuses: [200] } },
          },
          {
            urlPattern: /\/rewards\/[a-z0-9-]+\.(jpg|png)$/,
            handler: 'CacheFirst',
            options: { cacheName: 'poliglot-rewards', cacheableResponse: { statuses: [200] } },
          },
          {
            urlPattern: /\/audio\/[a-z]+\/[0-9a-f]+\.mp3$/,
            handler: 'CacheFirst',
            options: { cacheName: 'poliglot-audio', rangeRequests: true, cacheableResponse: { statuses: [200] } },
          },
        ],
      },
    }),
  ],
})
