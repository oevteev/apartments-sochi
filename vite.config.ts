import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * SSG Postbuild Plugin
 * 
 * This plugin runs after the build to generate static HTML for all routes.
 * It executes the prerender.js script which uses the server entry to render pages.
 */
function lovableSsgPostbuildPlugin(): Plugin {
  return {
    name: "lovable-ssg-postbuild",
    apply: "build",
    enforce: "post",
    closeBundle: {
      sequential: true,
      order: "post",
      async handler() {
        // Only run for client build, not SSR build
        if (process.env.SSR_BUILD === "true") {
          return;
        }

        const { spawn } = await import("child_process");
        
        console.log("\n🔄 Running SSG prerender...\n");
        
        return new Promise((resolve, reject) => {
          const child = spawn("node", ["prerender.js"], {
            stdio: "inherit",
            shell: true,
          });

          child.on("close", (code) => {
            if (code === 0) {
              resolve();
            } else {
              // Don't fail the build, just warn
              console.warn(`\n⚠️ SSG prerender exited with code ${code}`);
              resolve();
            }
          });

          child.on("error", (error) => {
            console.warn(`\n⚠️ SSG prerender error: ${error.message}`);
            resolve();
          });
        });
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    lovableSsgPostbuildPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
}));
