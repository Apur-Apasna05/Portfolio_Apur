import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

/**
 * GitHub Project Pages: site is at https://USERNAME.github.io/REPO-NAME/
 * Set VITE_BASE_PATH=/REPO-NAME/ in .env.production (leading and trailing slashes optional).
 * User Pages (username.github.io from the special repo): use VITE_BASE_PATH=/
 */
function normalizeBase(path: string | undefined): string {
  if (!path || path === "/") return "/"
  const p = path.replace(/^\/+|\/+$/g, "")
  return `/${p}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const base = mode === "production" ? normalizeBase(env.VITE_BASE_PATH) : "/"

  const siteRoot = env.VITE_SITE_URL?.trim().replace(/\/+$/, "") ?? ""

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "inject-site-url-for-meta",
        transformIndexHtml(html) {
          if (!siteRoot) return html
          return html.replaceAll("__SITE_ROOT__", siteRoot)
        },
      },
    ],
    base,
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor"
            }
          },
        },
      },
    },
  }
})
