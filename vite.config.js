import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['robots.txt', 'sitemap.xml'],
      workbox: {
        // Make sure these files are never replaced by index.html
        navigateFallbackDenylist: [/^\/(robots\.txt|sitemap\.xml)$/],
        runtimeCaching: [
          {
            urlPattern: /\/(robots\.txt|sitemap\.xml)$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'root-static-files',
              expiration: { maxEntries: 4, maxAgeSeconds: 24 * 60 * 60 }
            }
          }
        ]
      },
      manifest: {
        name: 'Shropshine Cleaning',
        short_name: 'Shropshine',
        description: 'Shropshine Cleaning Services',
        theme_color: '#0f766e',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
