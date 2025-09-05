import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    include: [
      '@babel/runtime/helpers/createSuper',
      '@babel/runtime/helpers/inherits',
      '@babel/runtime/helpers/createClass',
      '@babel/runtime/helpers/assertThisInitialized',
      '@babel/runtime/helpers/getPrototypeOf',
      '@babel/runtime/helpers/possibleConstructorReturn',
      'react-swipeable-views',
      'react-swipeable-views-utils',
      'react-material-ui-carousel'
    ],
  },
  resolve: {
    alias: {
      '@babel/runtime': '@babel/runtime'
    }
  }
})