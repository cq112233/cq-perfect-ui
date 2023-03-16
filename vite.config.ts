/*
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-15 21:28:17
 * @Description: ~
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import pkg from './package.json' 
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: true,
    port:3000
  },
  plugins: [vue()],
  build: {
    outDir: './lib',
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: `${pkg.name}`,
      fileName: (format) => `${pkg.name}.${format}.js` 
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      },
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  }
})
