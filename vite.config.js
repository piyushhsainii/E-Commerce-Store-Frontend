import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["@material-ui/lab,country-state-city"],
    },
  },
  plugins: [react()],
  server:{
    proxy:{
      "/api": "http://192.168.1.10:5000"

    }
  }
})

