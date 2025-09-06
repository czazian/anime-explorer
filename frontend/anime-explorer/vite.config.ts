import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ['@babel/plugin-transform-runtime']
    }
  })],
  build: {
    commonjsOptions: {
      include: [/node_modules/, /@babel\/runtime/],
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['@babel/runtime']
  }
})