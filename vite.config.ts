/*
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-14 09:28:41
 * @Description: ~
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import pkg from './package.json' 
// https://vitejs.dev/config/
export default defineConfig({
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
