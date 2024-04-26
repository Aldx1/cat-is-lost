import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.MAPBOX_TOKEN": JSON.stringify(env.MAPBOX_TOKEN),
      "process.env.SAS_TOKEN": JSON.stringify(env.SAS_TOKEN),
      "process.env.IMAGE_BASE_URL": JSON.stringify(env.IMAGE_BASE_URL),
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
    plugins: [react()],
  };
});
