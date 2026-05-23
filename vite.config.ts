import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  // In dev mode base is '/' so local paths resolve normally.
  // In production (build) it becomes the GitHub Pages sub-path.
  base: command === 'build' ? '/botc-player-tool/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
