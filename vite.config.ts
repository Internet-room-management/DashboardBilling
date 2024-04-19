import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url';
import vuetify from 'vite-plugin-vuetify';
import path from 'path';

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
    // alias: {
    //     '@': fileURLToPath(new URL('src', import.meta.url)),
        
    // }
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    hmr: {
      overlay: false
    },
    watch: {
      ignored: ['node_modules/**'], // Loại trừ thư mục hoặc tệp không cần theo dõi
      usePolling: true,
    }
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: ['./src/**/*.vue', './src/**/**/*.vue'],
  }
})
