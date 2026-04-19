/* eslint-env node */

import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

function resolveAllowedHosts(envValue) {
  if (!envValue) {
    return true
  }

  const hosts = envValue
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean)

  return hosts.length ? hosts : true
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '')
  const allowedHosts = resolveAllowedHosts(env.VITE_ALLOWED_HOSTS)

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: false,
      allowedHosts,
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
      strictPort: false,
      allowedHosts,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-lenis': ['lenis'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'lenis'],
    },
  }
})
