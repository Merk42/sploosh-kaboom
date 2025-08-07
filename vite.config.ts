import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Sploosh Kaboom',
        short_name: 'Sploosh',
        description: 'Squid Hunt game from The Legend of Zelda: The Wind Waker',
        icons: [
          {
            src: '/etc/sploosh-kaboom/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/etc/sploosh-kaboom/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/etc/sploosh-kaboom/icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/etc/sploosh-kaboom/icons/monochrome.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'monochrome maskable',
          },
        ],
        theme_color: '#001e34',
        background_color: '#001e34',
        display: 'standalone',
        scope: '/etc/sploosh-kaboom',
        start_url: '/etc/sploosh-kaboom/index.html',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/etc/sploosh-kaboom/',
})
