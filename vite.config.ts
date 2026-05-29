/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command }) => ({
  // Served from a subpath on GitHub Pages (project site); root in dev.
  // Must match the repo name exactly — GitHub Pages paths are case-sensitive.
  base: command === 'build' ? '/SlackWater/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Slack Water — Calm Breathwork',
        short_name: 'Slack Water',
        description:
          'Calm, dry-land breath-awareness practice for beginner freedivers.',
        theme_color: '#33485a',
        background_color: '#f7f4ee',
        display: 'standalone',
        orientation: 'portrait',
        // Relative so it resolves correctly under the GitHub Pages subpath.
        start_url: '.',
        scope: '.',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
}));
