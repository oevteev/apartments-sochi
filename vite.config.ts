import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

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

        // Step 1: Build server entry for SSR
        console.log("\n🔨 Building server entry for SSG...\n");
        
        await new Promise<void>((resolve) => {
          const buildServer = spawn(
            "npx",
            ["vite", "build", "--ssr", "src/entry-server.tsx", "--outDir", "dist/server"],
            {
              stdio: "inherit",
              shell: true,
              env: { ...process.env, SSR_BUILD: "true" },
            }
          );

          buildServer.on("close", (code) => {
            if (code === 0) {
              console.log("\n✓ Server entry built successfully\n");
              resolve();
            } else {
              console.warn(`\n⚠️ Server build exited with code ${code}`);
              resolve(); // Don't fail, continue anyway
            }
          });

          buildServer.on("error", (error) => {
            console.warn(`\n⚠️ Server build error: ${error.message}`);
            resolve();
          });
        });

        // Step 2: Run prerender script
        console.log("\n🔄 Running SSG prerender...\n");

        await new Promise<void>((resolve) => {
          const child = spawn("node", ["prerender.js"], {
            stdio: "inherit",
            shell: true,
          });

          child.on("close", (code) => {
            if (code === 0) {
              console.log("\n✓ SSG prerender completed\n");
            } else {
              console.warn(`\n⚠️ SSG prerender exited with code ${code}`);
            }
            resolve();
          });

          child.on("error", (error) => {
            console.warn(`\n⚠️ SSG prerender error: ${error.message}`);
            resolve();
          });
        });

        // Step 3: Generate sitemap
        console.log("\n📄 Generating sitemap.xml...\n");

        await new Promise<void>((resolve) => {
          const generateSitemap = spawn("node", ["generate-sitemap.js"], {
            stdio: "inherit",
            shell: true,
          });

          generateSitemap.on("close", (code) => {
            if (code === 0) {
              console.log("\n✓ Sitemap generated successfully\n");
            } else {
              console.warn(`\n⚠️ Sitemap generation exited with code ${code}`);
            }
            resolve();
          });

          generateSitemap.on("error", (error) => {
            console.warn(`\n⚠️ Sitemap generation error: ${error.message}`);
            resolve();
          });
        });
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools(),
    mode === "development" && componentTagger(),
    mcpPlugin(),
    lovableSsgPostbuildPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020', // Target modern browsers for smaller bundles
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        // Apply manualChunks only for client build, not for SSR
        manualChunks: isSsrBuild ? undefined : {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
          ],
          'vendor-carousel': ['embla-carousel-react'],
        },
      },
    },
  },
  ssr: {
    noExternal: ["react-helmet-async"],
    external: ["vite-imagetools"],
  },
}));
