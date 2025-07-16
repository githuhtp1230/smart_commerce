import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["sonner"],
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "59eb69dcebbf.ngrok-free.app", 
    ],
  },
});
