import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  define: { __BUILD__: JSON.stringify(new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })) },
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
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      },
    }),
  ],
})
