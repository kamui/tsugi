const fs = require("fs")
const path = require("path")

const STATIC_FILE = /^\/static\/(public|fonts|favicons)\//
const NEXT_OR_STATIC_FILES = /^(\/_next\/|\/static\/)/

function cacheHeaders() {
  return (ctx: any, next: any) => {
    // We need to set X-FRAME-OPTIONS for all requests (excluding _next or static requests) to prevent clickjacking attempts
    if (!NEXT_OR_STATIC_FILES.test(ctx.request.path)) {
      ctx.response.set("X-FRAME-OPTIONS", "SAMEORIGIN")
    }

    if (STATIC_FILE.test(ctx.request.path)) {
      // cache static files
      ctx.response.set("Access-Control-Allow-Origin", "*")

      // Set cache-headers to 1year if file exist else 2min
      try {
        const filePath = path.join(process.cwd(), ctx.request.path)
        fs.accessSync(filePath)
        ctx.response.set("Cache-Control", "public, max-age=31536000, immutable")
      } catch (err) {
        ctx.response.set("Cache-Control", "public, max-age=20")
      }
    } else {
      // set default header for dynamic CDN
      ctx.response.set("Cache-Control", "public, max-age=120, s-maxage=30") // Client: 2m, CDN/WAF: 30s
    }

    next()
  }
}

module.exports = cacheHeaders
