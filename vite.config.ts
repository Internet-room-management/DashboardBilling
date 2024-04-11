import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/scss/variables.scss' }
  })
],
  base: './',
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('src', import.meta.url))
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: ['./src/**/*.vue'],
  }
})
