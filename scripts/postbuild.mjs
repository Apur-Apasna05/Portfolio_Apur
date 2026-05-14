import { copyFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const dist = join(process.cwd(), "dist")
const index = join(dist, "index.html")

if (!existsSync(index)) {
  console.warn("postbuild: dist/index.html missing, skip 404 copy")
  process.exit(0)
}

copyFileSync(index, join(dist, "404.html"))
console.log("postbuild: copied index.html -> 404.html (GitHub Pages SPA fallback)")
