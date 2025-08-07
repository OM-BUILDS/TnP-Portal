import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '88.222.242.177', // or use your local IP address
    port: 5173, // ensure this port is open and not blocked by firewall
    hmr: {
      host: 'localhost', // or your local IP address
      protocol: 'ws', // WebSocket protocol
    },
  },
});