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
        name: 'ShropShine Cleaning',
        short_name: 'ShropShine',
        description: 'Family-run domestic and commercial cleaners in Shropshire',
        theme_color: '#003049',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
