import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: true, //开启热更新
    proxy: {  //配置代理,解决跨域问题
      '/v1/': {
        target: `http://www.hjwaihui.com/`,
        changeOrigin: true,
        // pathRewrite: {
        //     '^/' : ''
        // }
      },
      '/socket.io': {
        target: `http://www.hjwaihui.com/`, // target host
        ws: true,
        changeOrigin: true, // needed for virtual hosted sites
        // logLevel: 'debug'
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {  //配置@符
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
