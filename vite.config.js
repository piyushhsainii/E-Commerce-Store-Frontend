import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["@mui/lab/SpeedDial", "@mui/lab/SpeedDialAction","@mui/lab/Rating"
    , "@mui/data-grid" , "@mui/core" , "@mui/icons"
    ],
    },
  },
  plugins: [react()],
  // server:{
  //   proxy:{
  //     "/api": "http://192.168.1.10:5000"

  //   }
  // }
})

