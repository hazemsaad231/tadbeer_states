// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from "path"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"), // أضف هذا السطر
//     },
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://fip.tadbeer.sa',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '/public/fip_origin/fip/fip/public/api'),
//       },
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite" // 1. استيراد المحرك الجديد

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss() // 2. إضافة Tailwind كـ Plugin لـ Vite مباشرة
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://fip.tadbeer.sa',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/public/fip_origin/fip/fip/public/api'),
      },
    },
  },
})