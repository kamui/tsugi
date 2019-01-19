const { join } = require("path")

// Keys are static paths, values are headers
const ROOT_STATIC_FILES = {
  "/browserconfig.xml": {
    "Cache-Control": "max-age=2592000", // 1 month
  },
  "/robots.txt": {
    "Cache-Control": "max-age=60",
  },
  "/sitemap.xml": {
    "Cache-Control": "max-age=60",
  },
}

function filePath(requestPath) {
  return join(__dirname, "..", "static", requestPath)
}

function staticRoot(app) {
  return async (ctx, next) => {
    if (typeof ROOT_STATIC_FILES[ctx.request.path] !== "undefined") {
      const path = filePath(ctx.request.path)
      ctx.response.set(ROOT_STATIC_FILES[ctx.request.path])
      return app.serveStatic(ctx.req, ctx.res, path)
    }
    await next()
  }
}

module.exports = staticRoot
