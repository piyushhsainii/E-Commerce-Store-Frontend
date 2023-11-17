// vite.config.js
import { defineConfig } from "file:///E:/MERN/ECommerceSite/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///E:/MERN/ECommerceSite/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    rollupOptions: {
      external: ["@material-ui/lab/SpeedDial", "@material-ui/lab/SpeedDialAction", "@material-ui/lab/Rating"
      , "@material-ui/data-grid"]
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxNRVJOXFxcXEVDb21tZXJjZVNpdGVcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXE1FUk5cXFxcRUNvbW1lcmNlU2l0ZVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovTUVSTi9FQ29tbWVyY2VTaXRlL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcIkBtYXRlcmlhbC11aS9sYWIvU3BlZWREaWFsXCIsIFwiQG1hdGVyaWFsLXVpL2xhYi9TcGVlZERpYWxBY3Rpb25cIixcIkBtYXRlcmlhbC11aS9sYWIvUmF0aW5nXCJdLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgc2VydmVyOntcbiAgICBwcm94eTp7XG4gICAgICBcIi9hcGlcIjogXCJodHRwOi8vMTkyLjE2OC4xLjEwOjUwMDBcIlxuXG4gICAgfVxuICB9XG59KVxuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9SLFNBQVMsb0JBQW9CO0FBQ2pULE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsOEJBQThCLG9DQUFtQyx5QkFBeUI7QUFBQSxJQUN2RztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFPO0FBQUEsSUFDTCxPQUFNO0FBQUEsTUFDSixRQUFRO0FBQUEsSUFFVjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
