// vite.config.js
import { defineConfig } from "file:///E:/MERN/ECommerceSite/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///E:/MERN/ECommerceSite/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    rollupOptions: {
      external: [
        "@mui/lab/SpeedDial",
        "@mui/lab/SpeedDialAction",
        "@mui/lab/Rating",
        "@mui/x-data-grid"
      ]
    }
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://192.168.1.10:5000"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxNRVJOXFxcXEVDb21tZXJjZVNpdGVcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXE1FUk5cXFxcRUNvbW1lcmNlU2l0ZVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovTUVSTi9FQ29tbWVyY2VTaXRlL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcIkBtYXRlcmlhbC11aS9sYWIvU3BlZWREaWFsXCIsIFwiQG1hdGVyaWFsLXVpL2xhYi9TcGVlZERpYWxBY3Rpb25cIixcIkBtYXRlcmlhbC11aS9sYWIvUmF0aW5nXCJcbiAgICAsIFwiQG1hdGVyaWFsLXVpL2RhdGEtZ3JpZFwiXG4gICAgXSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjp7XG4gICAgcHJveHk6e1xuICAgICAgXCIvYXBpXCI6IFwiaHR0cDovLzE5Mi4xNjguMS4xMDo1MDAwXCJcblxuICAgIH1cbiAgfVxufSlcblxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUixTQUFTLG9CQUFvQjtBQUNqVCxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQUM7QUFBQSxRQUE4QjtBQUFBLFFBQW1DO0FBQUEsUUFDNUU7QUFBQSxNQUNGO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFPO0FBQUEsSUFDTCxPQUFNO0FBQUEsTUFDSixRQUFRO0FBQUEsSUFFVjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
