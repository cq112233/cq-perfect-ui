/*
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-10-12 18:18:33
 * @Description: ~
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
import pkg from './package.json'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      overlay: true,
      // 解决热更新不同步的问题
      port: 3000
    },
    proxy: {
      // 使用 proxy 实例
      '/api': {
        target: 'http://localhost:3100',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        },
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    WindiCSS({
      scan: {
        dirs: ['.'], // 当前目录下所有文件
        fileExtensions: ['vue', 'js', 'ts'] // 同时启用扫描vue/js/ts
      }
    })
  ],
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
      }
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  }
})
